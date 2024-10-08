import React, { FC, useState } from 'react';
import { Container, Button, Text, Input } from '@medusajs/ui';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusMini, Sparkles } from '@medusajs/icons';

import { useNavigationData } from '../components/context/NavigationItemsContext';

import {
  MinimalTreeItemData,
  TreeNavigation,
} from '../components/TreeNavigation';
import AddNewItem from '../components/Modals/AddNewItem';
import EditItem from '../components/Modals/EditItem';

export interface NavigationProps {
  data?: MinimalTreeItemData[];
}
const Navigation: FC<NavigationProps> = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  const [items, setItems] = useState<MinimalTreeItemData[]>(data ?? []);
  const { setIsNewModalOpen, page } = useNavigationData();

  const handleAddNew = () => {
    setIsNewModalOpen(true);
  };

  console.log(data);
  return (
    <>
      <Container>
        <Button onClick={() => navigate('/a/navigation')} variant="transparent">
          <ArrowLeft />
          Back To Navigations
        </Button>

        <div className="flex flex-col">
          <div className="flex flex-col space-y-4">
            <Text>Title of {page === 'new' && 'New'} Navigation</Text>
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

export default Navigation;
