import {
  SimpleTreeItemWrapper,
  TreeItemComponentProps,
} from 'dnd-kit-sortable-tree';
import React from 'react';
import { MinimalTreeItemData } from './TreeNavigation';
import { Button } from '@medusajs/ui';
import { useNavigationData } from './context/NavigationItemsContext';

export const TreeItem = React.forwardRef<
  HTMLDivElement,
  TreeItemComponentProps<MinimalTreeItemData>
>((props, ref) => {
  const { setIsEditModalOpen, setActiveItem } = useNavigationData();
  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
    setActiveItem({ title: props.item.title, url: props.item.url });
  };
  const handleDelete = (e) => {
    e.stopPropagation();
  };

  return (
    <SimpleTreeItemWrapper
      {...props}
      ref={ref}
      className="w-full"
      disableSorting={props.depth >= 2}
      contentClassName="w-full">
      <div className="w-full flex items-center justify-between">
        <div>{props.item.title}</div>
        <div className="flex items-center space-x-2">
          <Button variant="secondary" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </SimpleTreeItemWrapper>
  );
});
