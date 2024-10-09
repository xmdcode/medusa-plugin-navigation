import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useAdminCustomQuery } from 'medusa-react';
import { NavigationItem } from 'src/models/navigation-item';

const ExistingNavigation = () => {
  const { id } = useParams();
  const { data, isLoading } = useAdminCustomQuery(`/navigations/${id}`, [
    'navigations',
  ]);

  return (
    <>
      {!isLoading && (
        <Navigation navigationTitle={data.name} data={data.items} />
      )}
    </>
  );
};

export default ExistingNavigation;
