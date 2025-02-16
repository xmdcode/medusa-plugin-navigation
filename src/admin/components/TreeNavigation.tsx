import React from 'react';
import { SortableTree } from 'dnd-kit-sortable-tree';
import { TreeItem } from './TreeItem';
import { handleChildrenDepth } from './utils/list-utils';

interface TreeNavigationProps {
  items: any;
  setItems: React.Dispatch<any>;
}

export const TreeNavigation: React.FC<TreeNavigationProps> = (props) => {
  const { items, setItems } = props;

  return (
    <SortableTree
      items={items}
      onItemsChanged={(newItems) => setItems(handleChildrenDepth(newItems))}
      TreeItemComponent={TreeItem}
    />
  );
};

export interface MinimalTreeItemData {
  name: string;
  url: string;
  id?: string;
  children?: any;
}
