// Assuming your services are named navigationService and navigationItemService

// 1. List all navigations:

export const listNavigations = async (navigationService: any) => {
  return navigationService.listNavigations();
};

// 2. Create a nested navigation:

export const createNestedNavigation = async (
  navigationService: any,
  navigationName: string,
  navigationData: any
) => {
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
        index: item.index, // Include the index property HERE
      });
      for (const itemData of item.children) {
        await createNavigationItemRecursively(
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
        index: item.index, // Include the index property HERE
      });
    }
  }

  return navigation;
};

const createNavigationItemRecursively = async (
  navigationService: any,
  itemData: any,
  parentId: string | null,
  navigationId: string
) => {
  const navigationItem = await navigationService.createNavigationItems({
    name: itemData.name,
    url: itemData.url,
    parent_id: parentId,
    navigation: navigationId,
    index: itemData.index, // Include the index property HERE
  });

  if (itemData.children && itemData.children.length > 0) {
    for (const childData of itemData.children) {
      await createNavigationItemRecursively(
        navigationService,
        childData,
        navigationItem.id,
        navigationId
      );
    }
  }

  return navigationItem;
};

// 3. Update a nested navigation:

export const updateNestedNavigation = async (
  navigationService: any,
  navigationItemService: any,
  navigationId: string,
  navigationData: any
) => {
  const navigation = await navigationService.retrieveNavigation(navigationId, {
    relations: ['items'],
  });

  if (!navigation) {
    throw new Error('Navigation not found');
  }

  // Update main navigation properties
  if (navigationData.name) {
    await navigationService.updateNavigation(navigation.id, {
      name: navigationData.name,
    });
  }

  // Update or add items
  if (navigationData.items) {
    // First, delete items that are no longer present
    const existingItemIds = navigation.items.map((item) => item.id);
    const newItemIds = navigationData.items
      .map((item) => item.id)
      .filter((id) => id !== undefined);
    const itemsToDelete = navigation.items.filter(
      (item) => !newItemIds.includes(item.id)
    );
    for (const item of itemsToDelete) {
      await navigationItemService.deleteNavigationItem(item.id);
    }

    // Then, update or create items
    for (const itemData of navigationData.items) {
      if (itemData.id) {
        await navigationItemService.updateNavigationItem(itemData.id, {
          ...itemData,
          index: itemData.index, // Update the index HERE
        });
      } else {
        await navigationItemService.createNavigationItem({
          ...itemData,
          navigation_id: navigationId,
          index: itemData.index, // Include the index HERE
        });
      }
    }
  }

  return navigation;
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
