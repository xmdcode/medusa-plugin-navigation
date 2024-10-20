import React, { useState } from 'react';
import { SortableTree, TreeItems } from 'dnd-kit-sortable-tree';
import { TreeItem } from './TreeItem';
import { FlattenedItem } from 'dnd-kit-sortable-tree/dist/types';
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

