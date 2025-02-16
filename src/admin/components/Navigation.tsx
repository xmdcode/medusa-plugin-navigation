import React, { useEffect } from 'react';
import { Container, Button, Text, Input, usePrompt } from '@medusajs/ui';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusMini, Sparkles } from '@medusajs/icons';

import { TreeNavigation } from './TreeNavigation';
import AddNewItem from './Modals/AddNewItem';
import EditItem from './Modals/EditItem';
import DeleteItem from './Modals/DeleteItem';
import { useMutation, useQuery } from '@tanstack/react-query';
import { sdk } from '../lib/config';
import { useNavigationData } from './context/NavigationItemsContext';

export interface NavigationProps {
  id?: string;
}
const Navigation: React.FC<NavigationProps> = (props) => {
  const { id } = props;

  const { data, isError, isLoading } = useQuery({
    queryFn: () => sdk.client.fetch(`/admin/navigations/${id}`),
    queryKey: ['navigation'],
  });

  useEffect(() => {
    if (!isError && !isLoading) {
      setItems(data?.items);
      setNavigationName(data?.name);
    }
  }, [isError, isLoading]);
  const {
    setIsNewModalOpen,
    deletedItems,
    navigationName,
    setNavigationName,
    items,
    setItems,
    page,
  } = useNavigationData();

  const navigate = useNavigate();
  const dialog = usePrompt();

  const handleAddNew = () => {
    setIsNewModalOpen(true);
  };

  // const { mutate } = useAdminCustomPost('/navigations', ['navigationsadd']);

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

  console.log(items);

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
          navigate('/navigations');
        },
      });
    }
  };

  return (
    <>
      <Container className="flex flex-col space-y-3">
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

        <div className="flex flex-col">
          <div className="flex flex-col space-y-4">
            <Text>Title of {page === 'new' && 'New'} Navigation</Text>
            <Input
              value={navigationName}
              onChange={(e) => setNavigationName(e.target.value)}
              placeholder="Add Title for Navigation"
              id="navigation-title"
            />
          </div>
          <div className="flex items-center justify-between my-5">
            <Text className="">Navigation Items</Text>
            <Button onClick={handleAddNew} variant="secondary">
              <PlusMini />
              Add New Item
            </Button>
          </div>
          <div className="w-full">
            {items?.length === 0 ? (
              <Container className="flex items-center justify-center space-x-1">
                <Text>Add Some Items to see the magic!</Text>
                <Sparkles />
              </Container>
            ) : (
              <>
                <TreeNavigation
                  items={items}
                  setItems={(newItems) => setItems(newItems)}
                />
              </>
            )}
          </div>
        </div>
      </Container>
      <AddNewItem
        // isOpen={isNewModalOpen}
        // close={() => setIsNewModalOpen(false)}
        setNewItem={(item) => setItems((prev) => [...prev, item])}
      />
      <EditItem />
      <DeleteItem />
    </>
  );
};

export default Navigation;
