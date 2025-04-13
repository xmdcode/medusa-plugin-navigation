import React from 'react';
import { Container, Button, Text, Input } from '@medusajs/ui';
import { PlusMini, Sparkles } from '@medusajs/icons';

import { TreeNavigation } from '../TreeNavigation';
import AddNewItem from '../Modals/AddNewItem';
import EditItem from '../Modals/EditItem';
import DeleteItem from '../Modals/DeleteItem';
import { useNavigationData } from '../context/NavigationItemsContext';
import Actions, { ActionsProps } from './Actions';
import CommandCopy from './CommandCopy';

export interface NavigationWrapperProps {
  page: ActionsProps['page'];
}
const NavigationWrapper: React.FC<NavigationWrapperProps> = (props) => {
  const { page } = props;

  const {
    setIsNewModalOpen,
    setItems,
    items,
    navigationName,
    setNavigationName,
    navigationNameError,
    navigationId,
  } = useNavigationData();

  const handleAddNew = () => {
    setIsNewModalOpen(true);
  };

  const url = window?.location?.host;
  return (
    <>
      <Container className="flex flex-col space-y-3">
        <Actions />
        <div className="flex flex-col">
          <div className="flex flex-col space-y-4">
            <Text>Title of {page === 'new' && 'New'} Navigation</Text>
            <Input
              value={navigationName}
              onChange={(e) => setNavigationName(e.target.value)}
              placeholder="Add Title for Navigation"
              id="navigation-title"
              aria-invalid={navigationNameError}
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
        {page !== 'new' && (
          <CommandCopy url={url} navigationId={navigationId} />
        )}
      </Container>

      <AddNewItem setNewItem={(item) => setItems((prev) => [...prev, item])} />
      <EditItem />
      <DeleteItem />
    </>
  );
};

export default NavigationWrapper;
