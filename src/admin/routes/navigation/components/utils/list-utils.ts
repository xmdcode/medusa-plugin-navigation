import { TreeItemComponentProps } from 'dnd-kit-sortable-tree';
import { MinimalTreeItemData } from 'src/admin/routes/navigation/components/TreeNavigation';

export const removeItemById = (arr: MinimalTreeItemData[], id: string) => {
  return arr.reduce((acc, item) => {
    // If the item's id does not match, include it in the result
    if (item.id !== id) {
      // Recursively check if there are any nested children to process
      if (item.children && item.children.length) {
        item.children = removeItemById(item.children, id);
      }
      acc.push(item);
    }
    return acc;
  }, []);
};

export const handleChildrenDepth = (items) => {
  return items?.map((item) => {
    return {
      ...item,
      canHaveChildren: item.depth >= 2 ? false : true,
      children:
        item?.children?.length > 0
          ? handleChildrenDepth(item?.children)
          : item.children,
    };
  });
};

// Recursive function to find and update an item by id and return the updated item(s)
export const updateItemById = (tree, itemId, updatedData) => {
  // Initialize an empty array to store updated items
  return tree?.map((item) => {
    if (item.id === itemId) {
      return { ...item, name: updatedData.name, url: updatedData.url };
    }

    if (item.children.length > 0) {
      return {
        ...item,
        children: updateItemById(item.children, itemId, updatedData),
      };
    } else {
      return item;
    }
  });
};

export const updateItemById1 = (tree, itemId, updatedData) => {
  return tree.map((item) => {
    // If the current item's ID matches, update the fields
    if (item.id === itemId) {
      return {
        ...item,
        name: updatedData.name || item.name,
        url: updatedData.url || item.url,
        index: updatedData.index || item.index,
      };
    }

    // If the item has children, recursively update them
    if (item.children && item.children.length > 0) {
      return {
        ...item,
        children: updateItemById(item.children, itemId, updatedData),
      };
    }

    // Return the unchanged item
    return item;
  });
};
