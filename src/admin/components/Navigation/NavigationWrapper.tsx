import React, { useEffect, useState } from 'react';
import { Container, Button, Text, Input } from '@medusajs/ui';
import { PlusMini, Sparkles } from '@medusajs/icons';

import { MinimalTreeItemData, TreeNavigation } from '../TreeNavigation';
import AddNewItem from '../Modals/AddNewItem';
import EditItem from '../Modals/EditItem';
import DeleteItem from '../Modals/DeleteItem';
import { useQuery } from '@tanstack/react-query';
import { sdk } from '../../lib/config';
import { useNavigationData } from '../context/NavigationItemsContext';
import Actions, { ActionsProps } from './Actions';

export interface NavigationWrapperProps {
  id?: string;
  page: ActionsProps['page'];
}
const NavigationWrapper: React.FC<NavigationWrapperProps> = (props) => {
  const { id, page } = props;
  const { setIsNewModalOpen } = useNavigationData();

  const {} = useQuery({
    queryFn: () => sdk.client.fetch(`/admin/navigations/${id}`),
    queryKey: ['navigation'],
    select: (data) => {
      setItems(data?.items);
      setNavigationName(data?.name);
      return data;
    },
  });

  const [items, setItems] = useState<MinimalTreeItemData[]>([]);
  const [navigationName, setNavigationName] = useState<string>('');

  const handleAddNew = () => {
    setIsNewModalOpen(true);
  };

  // const { mutate } = useAdminCustomPost('/navigations', ['navigationsadd']);

  return (
    <>
      <Container className="flex flex-col space-y-3">
        <Actions page={page} />
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

export default NavigationWrapper;
