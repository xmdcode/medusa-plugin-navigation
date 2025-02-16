import { Button, usePrompt } from '@medusajs/ui';
import { FC } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { sdk } from '../../lib/config';
import { useNavigationData } from '../context/NavigationItemsContext';
import { ArrowLeft } from '@medusajs/icons';
import { useNavigate } from 'react-router-dom';

export interface ActionsProps {
  page: 'new' | 'edit';
  id?: string;
}
const Actions: FC<ActionsProps> = (props) => {
  const { id, page } = props;
  const dialog = usePrompt();
  const navigate = useNavigate();

  const { deletedItems, navigationName, items } = useNavigationData();

  const { mutateAsync: mutate } = useMutation({
    mutationFn: (payload: any) =>
      sdk.client.fetch(`/admin/navigations`, {
        method: 'POST',
        body: { ...payload },
      }),
    // onSuccess: () => navigate('/navigation'),
  });

  const { mutateAsync: deleteMutate } = useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/admin/navigations/${id}`, {
        method: 'DELETE',
        body: {},
      }),
    onSuccess: () => alert('updated product'),
  });

  const handleClick = () => {
    mutate({ id: id ?? '', name: navigationName, items, deletedItems });
  };

  const handleDelete = async () => {
    const userHasConfirmed = await dialog({
      title: 'Please confirm',
      description: 'Are you sure you want to delete this Menu?',
    });
    if (userHasConfirmed) {
      deleteMutate(void 0, {
        onSuccess: () => {
          // navigate('/navigations');
        },
      });
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        type="button"
        onClick={() => navigate('/navigation')}
        variant="transparent">
        <ArrowLeft />
        Back To Navigations
      </Button>
      <div className="flex items-center space-x-3">
        <Button onClick={handleDelete} variant="danger">
          Delete
        </Button>
        <Button onClick={handleClick} variant="primary">
          Save
        </Button>
      </div>
    </div>
  );
};

export default Actions;
