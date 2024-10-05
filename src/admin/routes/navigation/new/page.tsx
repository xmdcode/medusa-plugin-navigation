import React from 'react';
import { Container, Button, Text, Input } from '@medusajs/ui';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@medusajs/icons';
import { TreeNavigation } from '../components/TreeNavigation';

const NewMenu = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Button onClick={() => navigate(-1)} variant="transparent">
        <ArrowLeft />
        Back To Navigations
      </Button>

      <div className="flex flex-col">
        <div className="flex flex-col space-y-4">
          <Text>Title of New Navigation</Text>
          <Input placeholder="Add Title for Navigation" id="navigation-title" />
        </div>
        <Text className="mb-5">Menu Items</Text>
        <div className="w-full">
          <TreeNavigation />
        </div>
      </div>
    </Container>
  );
};

export default NewMenu;
