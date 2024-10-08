import React, { useState } from 'react';
import { SortableTree, TreeItems } from 'dnd-kit-sortable-tree';
import { TreeItem } from './TreeItem';
import { FlattenedItem } from 'dnd-kit-sortable-tree/dist/types';

interface TreeNavigationProps {
  items: any;
  setItems: React.Dispatch<any>;
}

export const TreeNavigation: React.FC<TreeNavigationProps> = (props) => {
  const { items, setItems } = props;

  const handleChildrenDepth = (items) => {
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

  return (
    <SortableTree
      items={items}
      onItemsChanged={(newItems) => setItems(handleChildrenDepth(newItems))}
      TreeItemComponent={TreeItem}
    />
  );
};

export interface MinimalTreeItemData {
  title: string;
  url: string;
}
