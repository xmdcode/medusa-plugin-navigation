import { MedusaError } from 'medusa-core-utils';
import { Lifetime } from 'awilix';
import {
  buildQuery,
  FindConfig,
  Selector,
  TransactionBaseService,
} from '@medusajs/medusa';
import { buildTreeStructure } from '../utils/tree-builder'; // Assuming you create a utility to build trees
import { NavigationRepository } from '../repositories/navigation';

import { NavigationItemRepository } from '../repositories/navigationItem';

import { Navigation } from '../models/navigation';
import { NavigationItem } from '../models/navigation-item';

class NavigationService extends TransactionBaseService {
  // protected manager_: EntityManager;
  protected navigationRepository_: typeof NavigationRepository;
  protected navigationItemRepository_: typeof NavigationItemRepository;
  static LIFE_TIME = Lifetime.TRANSIENT;
  constructor(container) {
    super(container);
    // this.manager_ = manager;
    this.navigationRepository_ = container.navigationRepository;
    this.navigationItemRepository_ = container.navigationItemRepository;
  }

  // /**
  //  * Retrieve all navigations
  //  */
  async list(): Promise<Navigation[]> {
    const navigationsRepo = this.activeManager_.withRepository(
      this.navigationRepository_
    );
    const items = await navigationsRepo.find({ relations: ['items'] });

    return items;
  }

  // /**
  //  * Retrieve a single navigation by ID
  //  */

  async retrieve(
    id: string,
    config?: FindConfig<Navigation>
  ): Promise<Navigation> {
    const navigationsRepo = this.activeManager_.withRepository(
      this.navigationRepository_
    );

    const navigation = await navigationsRepo.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!navigation) {
      return undefined;
    }

    return navigation;
  }

  // /**
  //  * Create a new navigation with nested items
  //  */
  async createNavigation(data) {
    const navigationRepo = this.activeManager_.withRepository(
      this.navigationRepository_
    );

    const { name, items } = data;

    // Create the navigation
    const newNavigation = navigationRepo.create({ name });
    const createdNavigation = await navigationRepo.save(newNavigation);

    if (items && items.length > 0) {
      await this.addNavigationItems(createdNavigation.id, items);
    }

    return createdNavigation;
  }

  // /**
  //  * Add nested navigation items to a specific navigation
  //  */
  async addNavigationItems(navigationId: string, items) {
    const navigationItemRepo = this.activeManager_.withRepository(
      this.navigationItemRepository_
    );

    const createItemsRecursively = async (items, parent = null) => {
      for (const itemData of items) {
        const { name, url, index, children = [] } = itemData;

        // Create the navigation item
        const navigationItem = navigationItemRepo.create({
          url,
          name,
          parent,
          index,
          navigation: { id: navigationId }, // Link to the navigation
        });
        const savedItem = await this.navigationItemRepository_.save(
          navigationItem
        );

        if (children.length > 0) {
          await createItemsRecursively(children, savedItem);
        }
      }
    };

    await createItemsRecursively(items);
  }

  // /**
  //  * Update a navigation's name and/or items
  //  */
  async updateNavigationTree(navigationId: string, updatedTree: any) {
    const navigationRepo = this.manager_.getRepository(Navigation);
    const navigationItemRepo = this.manager_.getRepository(NavigationItem);

    // First, find the navigation by its ID
    let navigation = await navigationRepo.findOne({
      where: { id: navigationId },
    });
    if (updatedTree.name) {
      navigation.name = updatedTree.name;
      await navigationRepo.save(navigation); // Save the updated navigation
    }
    // Recursive function to upsert the items (update or insert)
    async function upsertItems(items, parentId: string | null) {
      for (let i = 0; i < items.length; i++) {
        const currentItem = items[i];

        // Check if the item already exists in the database
        let item = await navigationItemRepo.findOne({
          where: { id: currentItem.id },
        });

        if (item) {
          // If the item exists, update its fields (order, title, url, and parent)
          item.index = currentItem.index;
          item.name = currentItem.name; // Update the name (title)
          item.url = currentItem.url; // Update the URL
        } else {
          // If the item doesn't exist, create a new one
          item = navigationItemRepo.create({
            name: currentItem.name,
            url: currentItem.url,
            index: currentItem.index,
            navigation: { id: navigationId }, // Link to the navigation
          });
        }

        // Update the parent reference (if applicable)
        if (parentId) {
          const parent = await navigationItemRepo.findOne({
            where: { id: parentId },
          });
          item.parent = parent || null;
        } else {
          item.parent = null; // Root-level items
        }

        // Save the updated or newly created item
        const savedItem = await navigationItemRepo.save(item);

        // If the item has children, recursively upsert them
        if (currentItem.children && currentItem.children.length > 0) {
          await upsertItems(currentItem.children, savedItem.id); // Pass the new item's ID as parentId
        }
      }
    }

    // Start updating the tree from root-level items
    if (updatedTree.items && updatedTree.items.length > 0) {
      await upsertItems(updatedTree.items, null); // No parent for root items
    }

    return { success: true, message: 'Tree upserted successfully' };
  }

  /**
   * Delete a navigation and all related navigation items
   */
  async deleteNavigation(navigationId: string) {
    const navigationRepo = this.manager_.getRepository(Navigation);

    const navigation = await this.retrieve(navigationId);

    // Remove the navigation
    return await navigationRepo.remove(navigation);
  }

  /**
   * Build a nested tree structure for the navigation
   */

  async getNavigationTree(navigationId: string) {
    // Fetch the navigation entity by ID, ensuring we get its root items
    const navigationRepo = this.activeManager_.withRepository(
      this.navigationRepository_
    );
    const navigation = await navigationRepo.findOne({
      where: { id: navigationId },
      relations: ['items'],
    });

    if (!navigation) {
      throw new Error('Navigation not found');
    }

    // Fetch the tree repository for NavigationItem
    const navigationItemRepo = this.manager_.getTreeRepository(NavigationItem);

    // Get root items (i.e., items with no parent) for the specific navigation
    const rootItems = await this.manager_
      .createQueryBuilder(NavigationItem, 'item')
      .where('item.parentId IS NULL') // Only root items (no parent)
      .andWhere('item.navigationId = :navigationId', { navigationId }) // Filter by navigation ID
      .getMany();

    // Build the tree structure for each root item
    const treePromises = rootItems.map((root) =>
      navigationItemRepo.findDescendantsTree(root)
    );

    const tree = await Promise.all(treePromises);

    // Return the navigation along with its tree of items
    return {
      ...navigation,
      items: tree,
    };
  }

  // /**
  //  * Delete a navigation Item
  //  */

  async deleteItem(id: string) {
    const navigationItemRepo = this.activeManager_.withRepository(
      this.navigationItemRepository_
    );

    try {
      const itemToDelete = await navigationItemRepo.findOne({
        where: { id: id },
        relations: ['children', 'children.children'], // Load children to delete them
      });

      if (!itemToDelete) {
        throw new Error(`Navigation item with ID ${id} not found.`);
      }

      // Recursively delete all children first
      async function deleteChildrenRecursively(item) {
        if (item.children && item.children.length > 0) {
          for (let child of item.children) {
            // Recursively delete the child's children first
            await deleteChildrenRecursively(child);
            // Then delete the child
            await navigationItemRepo.delete(child.id);
          }
        }
      }

      // Start by deleting all the children
      await deleteChildrenRecursively(itemToDelete);

      // Finally, delete the parent item
      await navigationItemRepo.delete(itemToDelete.id);

      return {
        success: true,
        message: `Item and its children deleted successfully.`,
      };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}

export default NavigationService;
