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
