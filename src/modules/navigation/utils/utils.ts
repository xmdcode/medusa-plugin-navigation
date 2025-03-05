import { Navigation } from './../models/navigation';
// Assuming your services are named navigationService and navigationItemService

import NavigationModuleService from '../service';

// 1. List all navigations:

export const listNavigations = async (navigationService: any) => {
  return navigationService.listNavigations();
};

// 3. Update a nested navigation:

export const updateNestedNavigation = async (
  navigationService: NavigationModuleService,
  navigationId: string,
  NavigationName: string,
  navigationData: any
) => {
  const navigation = await navigationService.retrieveNavigation(navigationId, {
    relations: ['items'],
  });

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
      const navigationItem = await navigationService.updateNavigationItems({
        name: item.name,
        url: item.url,
        parent_id: null,
        navigation: navigation.id,
        index: item.index, // Include the index property HERE
      });
      for (const itemData of item.children) {
        await updateNavigationItemsRecursively(
          navigationService,
          itemData,
          navigationItem.id ?? '',
          navigation.id
        );
      }
    } else {
      const navigationItem = await navigationService.updateNavigationItems({
        name: item.name,
        url: item.url,
        parent_id: null,
        navigation: navigation.id,
        index: item.index, // Include the index property HERE
      });
    }
  }
  // // Update or add items
  // if (navigationData) {
  //   // First, delete items that are no longer present
  //   const existingItemIds = navigation.items.map((item) => item.id);
  //   const newItemIds = navigationData
  //     .map((item) => item.id)
  //     .filter((id) => id !== undefined);
  //   const itemsToDelete = navigation.items.filter(
  //     (item) => !newItemIds.includes(item.id)
  //   );
  //   for (const item of itemsToDelete) {
  //     await navigationService.deleteNavigationItems(item.id);
  //   }

  //   // Then, update or create items
  //   for (const itemData of navigationData) {
  //     console.log(itemData);
  //     if (itemData.id) {
  //       await navigationService.updateNavigationItems(itemData.id, {
  //         ...itemData,
  //         index: itemData.index, // Update the index HERE
  //       });
  //     } else {
  //       await navigationService.createNavigationItems({
  //         ...itemData,
  //         navigation_id: navigationId,
  //         index: itemData.index, // Include the index HERE
  //       });
  //     }
  //   }
  // }

  return navigation;
};

const updateNavigationItemsRecursively = async (
  navigationService: NavigationModuleService,
  itemData: any,
  parentId: string | null,
  navigationId: string
) => {
  const navigationItem = await navigationService.updateNavigationItems({
    name: itemData.name,
    url: itemData.url,
    parent_id: parentId,
    navigation: navigationId ?? '',
    index: itemData.index, // Include the index property HERE
  });

  if (itemData.children && itemData.children.length > 0) {
    for (const childData of itemData.children) {
      await updateNavigationItemsRecursively(
        navigationService,
        childData,
        navigationItem.id ?? '',
        navigationId
      );
    }
  }

  return navigationItem;
};

// 4. Delete a navigation:

export const deleteNavigation = async (
  navigationService: any,
  navigationId: string
) => {
  return navigationService.deleteNavigation(navigationId);
};

export const buildNavigationTree = (data: any[]): any[] => {
  const navigationItems: any[] = [];

  // Create a map to store items by their id for easy lookup
  const itemMap = new Map<string, any>();

  // First, create all items and store them in the map
  for (const itemData of data) {
    const navigationItem = { ...itemData, children: [] }; // Initialize children
    itemMap.set(itemData.id, navigationItem);
    navigationItems.push(navigationItem); // Add to the main array (for top-level items)
  }

  // Then, establish parent-child relationships using the map
  for (const item of navigationItems) {
    if (item.parent_id) {
      const parentItem = itemMap.get(item.parent_id);
      if (parentItem) {
        parentItem.children.push(item);
      }
    }
  }

  // Filter out items that are not top-level (i.e., have a parent)
  const topLevelItems = navigationItems.filter((item) => !item.parent_id);

  return topLevelItems;
};
