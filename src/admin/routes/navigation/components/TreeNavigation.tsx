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
  name: string;
  url: string;
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
    name: 'Jane',
    url: '#',
    children: [
      { id: 4, url: '#', name: 'John' },
      { id: 5, url: '#', name: 'Sally' },
    ],
  },
  {
    id: 2,
    url: '#',
    name: 'Fred',
    children: [{ id: 6, url: '#', name: 'Eugene' }],
  },
  { id: 3, url: '#', name: 'Helen' },
];
