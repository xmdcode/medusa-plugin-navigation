import React, { useState } from 'react';
import { Container, Button, Text, Input } from '@medusajs/ui';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusMini, Sparkles } from '@medusajs/icons';
import { TreeNavigation } from '../components/TreeNavigation';
import AddNewItem from '../components/Modals/AddNewItem';
import EditItem from '../components/Modals/EditItem';
import {
  NavigationContext,
  useNavigationData,
} from '../components/context/NavigationItemsContext';

const NewNavigation = () => {
  const navigate = useNavigate();
  const {
    isNewModalOpen,
    setIsEditModalOpen,
    isEditModalOpen,
    setIsNewModalOpen,
  } = useNavigationData();

  const items1 = [
    {
      id: crypto.randomUUID(),
      name: '1',
      url: '1',
    },
    {
      id: crypto.randomUUID(),
      name: '2',
      url: '2',
    },
    {
      id: crypto.randomUUID(),
      name: '3',
      url: '3',
    },
    {
      id: crypto.randomUUID(),
      name: '4',
      url: '4',
    },
    {
      id: crypto.randomUUID(),
      name: '5',
      url: '5',
      canHaveChildren: false,
    },
  ];
  const [items, setItems] = React.useState(items1);

  const handleAddNew = () => {
    setIsNewModalOpen(true);
  };

  return (
    <>
      <Container>
        <Button onClick={() => navigate(-1)} variant="transparent">
          <ArrowLeft />
          Back To Navigations
        </Button>

        <div className="flex flex-col">
          <div className="flex flex-col space-y-4">
            <Text>Title of New Navigation</Text>
            <Input
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
            {items.length === 0 ? (
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
    </>
  );
};

export default NewNavigation;
