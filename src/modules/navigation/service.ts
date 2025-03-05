import { MedusaService } from '@medusajs/framework/utils';
import { Navigation } from './models/navigation';
import { NavigationItem } from './models/navigationitem';
import { InferTypeOf } from '@medusajs/framework/types';

type NavigationItemType = InferTypeOf<typeof Navigation>;
export default class NavigationModuleService extends MedusaService({
  Navigation,
  NavigationItem,
}) {
  constructor() {
    super(...arguments);
  }

  async createNestedNavigation(
    navigationService: any,
    navigationName: string,
    navigationData: any
  ) {
    const navigation = await navigationService.createNavigations({
      name: navigationName,
    });

    for (const item of navigationData) {
      if (item.children && item.children.length > 0) {
        const navigationItem = await navigationService.createNavigationItems({
          name: item.name,
          url: item.url,
          parent_id: null,
          navigation: navigation.id,
          index: item?.index ?? 0, // Include the index property HERE
        });
        for (const itemData of item.children) {
          await NavigationModuleService.createNavigationItemRecursively(
            navigationService,
            itemData,
            navigationItem.id,
            navigation.id
          );
        }
      } else {
        const navigationItem = await navigationService.createNavigationItems({
          name: item.name,
          url: item.url,
          parent_id: null,
          navigation: navigation.id,
          index: item?.index ?? 0, // Include the index property HERE
        });
      }
    }

    return navigation;
  }

  static async createNavigationItemRecursively(
    navigationService: any,
    itemData: any,
    parentId: string | null,
    navigationId: string
  ) {
    const navigationItem = await navigationService.createNavigationItems({
      name: itemData.name,
      url: itemData.url,
      parent_id: parentId,
      navigation: navigationId,
      index: itemData.index, // Include the index property HERE
    });

    if (itemData.children && itemData.children.length > 0) {
      for (const childData of itemData.children) {
        await this.createNavigationItemRecursively(
          navigationService,
          childData,
          navigationItem.id,
          navigationId
        );
      }
    }

    return navigationItem;
  }

  async updateNestedNavigation(
    navigationService: NavigationModuleService,
    navigationId: string,
    NavigationName: string,
    navigationData: any
  ) {
    const navigation = await navigationService.retrieveNavigation(
      navigationId,
      {
        relations: ['items'],
      }
    );

    if (!navigation) {
      throw new Error('Navigation not found');
    }

    // Update main navigation properties
    await navigationService.updateNavigations({
      id: navigationId,
      name: NavigationName,
    });

    for (const item of navigationData) {
      if (item.children && item.children.length > 0) {
        const navigationItem = await navigationService.updateOrCreateMyNavItem({
          id: item.id,
          name: item.name,
          url: item.url,
          parent_id: null,
          navigation: navigation.id,
          index: item.index ?? 0, // Include the index property HERE
        });

        for (const itemData of item.children) {
          await NavigationModuleService.updateNavigationItemsRecursively(
            navigationService,
            itemData,
            navigationItem.id ?? '',
            navigation.id
          );
        }
      } else {
        const navigationItem = await navigationService.updateOrCreateMyNavItem({
          id: item.id,
          name: item.name,
          url: item.url,
          parent_id: null,
          navigation: navigationId,
          index: item.index ?? 0, // Include the index property HERE
        });
      }
    }
    return navigation;
  }

  static async updateNavigationItemsRecursively(
    navigationService: NavigationModuleService,
    itemData: any,
    parentId: string | null,
    navigationId: string
  ) {
    const navigationItem = await navigationService.updateOrCreateMyNavItem({
      id: itemData.id,
      name: itemData.name,
      url: itemData.url,
      parent_id: parentId,
      navigation: navigationId,
      index: itemData.index ?? 0, // Include the index property HERE
    });

    if (itemData.children && itemData.children.length > 0) {
      for (const childData of itemData.children) {
        await this.updateNavigationItemsRecursively(
          navigationService,
          childData,
          navigationItem.id ?? '',
          navigationId
        );
      }
    }

    return navigationItem;
  }

  async updateOrCreateMyNavItem(data: any) {
    const { id, name, url, parent_id, index, navigation } = data;
    try {
      // Attempt to update the record
      const updateNavItem = await this.updateNavigationItems(data);
      return updateNavItem;
    } catch (error) {
      // If update fails, create a new record
      const newNavItem = await this.createNavigationItems({
        name,
        url,
        parent_id,
        navigation,
        index,
      });
      return newNavItem;
    }
  }

  async deleteNavItems(
    navigationService: NavigationModuleService,
    deletedItems: { id: string }[]
  ) {
    try {
      for (const delItem of deletedItems) {
        const itemWithChildren = await navigationService.listNavigationItems({
          parent_id: delItem,
        });
        if (itemWithChildren && itemWithChildren.length > 0) {
          for (const childItem of itemWithChildren) {
            await NavigationModuleService.deleteItemsRecursively(
              navigationService,
              childItem
            );
          }
          await navigationService.deleteNavigationItems(delItem);
        } else {
          await navigationService.deleteNavigationItems(delItem);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteItemsRecursively(
    navigationService: NavigationModuleService,
    itemData: any
  ) {
    try {
      const itemWithChildren = await navigationService.listNavigationItems({
        parent_id: itemData.id,
      });
      if (itemWithChildren && itemWithChildren.length > 0) {
        for (const childItem of itemWithChildren) {
          await this.deleteItemsRecursively(navigationService, childItem);
        }
        await navigationService.deleteNavigationItems(itemData.id);
      } else {
        await navigationService.deleteNavigationItems(itemData.id);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
