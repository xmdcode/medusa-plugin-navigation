import React, { useState } from 'react';
import { Container, Button, Text, Input } from '@medusajs/ui';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusMini, Sparkles } from '@medusajs/icons';
import { TreeNavigation } from '../components/TreeNavigation';
import AddNewItem from '../components/Modals/AddNewItem';

const NewMenu = () => {
  const navigate = useNavigate();
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);
  const [items, setItems] = React.useState([]);

  const handleAddNew = () => {
    setIsNewModalOpen(true);
  };

  console.log(items);
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
              <TreeNavigation
                items={items}
                setItems={(newItems) => setItems(newItems)}
              />
            )}
          </div>
        </div>
      </Container>
      <AddNewItem
        open={isNewModalOpen}
        close={() => setIsNewModalOpen(false)}
        setNewItem={(item) => setItems((prev) => ({ ...prev, item }))}
      />
    </>
  );
};

export default NewMenu;
