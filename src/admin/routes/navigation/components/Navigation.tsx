import React, { FC, useState } from 'react';
import { Container, Button, Text, Input, usePrompt } from '@medusajs/ui';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusMini, Sparkles } from '@medusajs/icons';

import { useNavigationData } from '../components/context/NavigationItemsContext';

import {
  MinimalTreeItemData,
  TreeNavigation,
} from '../components/TreeNavigation';
import AddNewItem from '../components/Modals/AddNewItem';
import EditItem from '../components/Modals/EditItem';
import { useAdminCustomDelete, useAdminCustomPost } from 'medusa-react';
import DeleteItem from './Modals/DeleteItem';

export interface NavigationProps {
  id?: string;
}
const Navigation: React.FC<NavigationProps> = (props) => {
  const { id } = props;

  const navigate = useNavigate();
  const dialog = usePrompt();

  const {
    setIsNewModalOpen,
    page,
    setItems,
    items,
    navigationName,
    setNavigationName,
    deletedItems,
  } = useNavigationData();

  const handleAddNew = () => {
    setIsNewModalOpen(true);
  };

  const { mutate } = useAdminCustomPost('/navigations', ['navigationsadd']);

  const { mutate: deleteMutate } = useAdminCustomDelete(`/navigations/${id}`, [
    ['navigationDelete'],
  ]);

  const handleClick = () => {
    mutate(
      { id: id ?? '', name: navigationName, items, deletedItems },
      {
        onSuccess: () => {
          navigate('/a/navigation');
        },
      }
    );
  };

  const handleDelete = async () => {
    const userHasConfirmed = await dialog({
      title: 'Please confirm',
      description: 'Are you sure you want to delete this Menu?',
    });
    if (userHasConfirmed) {
      deleteMutate(void 0, {
        onSuccess: () => {
          navigate('/a/navigation');
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
            onClick={() => navigate('/a/navigation')}
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
      <AddNewItem setNewItem={(item) => setItems((prev) => [...prev, item])} />
      <EditItem />
      <DeleteItem />
    </>
  );
};

export default Navigation;
