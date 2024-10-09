import { MedusaError } from 'medusa-core-utils';
import { Lifetime } from 'awilix';
import {
  buildQuery,
  FindConfig,
  Selector,
  TransactionBaseService,
} from '@medusajs/medusa';
import { buildTreeStructure } from '../utils/tree-builder'; // Assuming you create a utility to build trees
import { NavigationRepository } from 'src/repositories/navigation';

import { NavigationItemRepository } from 'src/repositories/navigationItem';

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

    const query = buildQuery(
      {
        id,
      },
      config
    );

    const navigation = await navigationsRepo.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!navigation) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        'Navigation was not found'
      );
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
        const { name, url, children = [] } = itemData;

        // Create the navigation item
        const navigationItem = navigationItemRepo.create({
          url,
          name,
          parent,
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
  // async updateNavigation(navigationId: string, data) {
  //   const navigationRepo = this.activeManager_.withRepository(
  //     this.navigationRepository_
  //   );

  //   const navigation = await this.getNavigationById(navigationId);
  //   const { name, items } = data;

  //   if (name) {
  //     navigation.name = name;
  //   }

  //   // Update the navigation
  //   await navigationRepo.save(navigation);

  //   // If items are provided, handle item updates
  //   if (items && items.length > 0) {
  //     await this.addNavigationItems(navigationId, items);
  //   }

  //   return navigation;
  // }

  // /**
  //  * Delete a navigation and all related navigation items
  //  */
  // async deleteNavigation(navigationId: string) {
  //   const navigationRepo = this.activeManager_.withRepository(
  //     this.navigationRepository_
  //   );
  //   const navigation = await this.getNavigationById(navigationId);

  //   // Remove the navigation
  //   return await navigationRepo.remove(navigation);
  // }

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
}

export default NavigationService;
