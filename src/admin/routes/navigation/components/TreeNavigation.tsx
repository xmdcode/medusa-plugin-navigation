import React, { useState } from 'react';
import { SortableTree, TreeItems } from 'dnd-kit-sortable-tree';
import { TreeItem } from './TreeItem';

interface TreeNavigationProps {
  items: any;
  setItems: React.Dispatch<any>;
}

export const TreeNavigation: React.FC<TreeNavigationProps> = (props) => {
  const { items, setItems } = props;
  // const [items, setItems] = useState(initialViableMinimalData);

  return (
    <SortableTree
      items={items}
      onItemsChanged={(newItems) => setItems(newItems)}
      TreeItemComponent={TreeItem}
    />
  );
};

export type MinimalTreeItemData = {
  value: string;
};
/*
 * Here's the component that will render a single row of your tree
 */

/*
 * Configure the tree data.
 */
const initialViableMinimalData: TreeItems<MinimalTreeItemData> = [
  {
    id: 1,
    value: 'Jane',
    children: [
      { id: 4, value: 'John' },
      { id: 5, value: 'Sally' },
    ],
  },
  { id: 2, value: 'Fred', children: [{ id: 6, value: 'Eugene' }] },
  { id: 3, value: 'Helen' },
];
