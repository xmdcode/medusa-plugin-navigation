import {
  SimpleTreeItemWrapper,
  TreeItemComponentProps,
} from 'dnd-kit-sortable-tree';
import React from 'react';
import { MinimalTreeItemData } from './TreeNavigation';
import { Button } from '@medusajs/ui';

export const TreeItem = React.forwardRef<
  HTMLDivElement,
  TreeItemComponentProps<MinimalTreeItemData>
>((props, ref) => {
  const [sample, setSample] = React.useState('');

  const handleEdit = (e) => {
    e.stopPropagation();
  };
  const handleDelete = (e) => {
    e.stopPropagation();
  };
  return (
    <SimpleTreeItemWrapper
      {...props}
      ref={ref}
      className="w-full"
      contentClassName="w-full">
      <div className="w-full flex items-center justify-between">
        <div>{props.item.value}</div>
        <div className="flex items-center">
          <Button type="button" onClick={handleEdit} variant="secondary">
            Edit
          </Button>
          <Button type="button" onClick={handleDelete} variant="secondary">
            Delete
          </Button>
        </div>
      </div>
    </SimpleTreeItemWrapper>
  );
});
