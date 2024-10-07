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

  console.log(props);
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
        <div>{props.item.name}</div>
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
