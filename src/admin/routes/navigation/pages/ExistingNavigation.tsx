import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useAdminCustomQuery } from 'medusa-react';

const ExistingNavigation = () => {
  const { id } = useParams();
  const { data, isLoading } = useAdminCustomQuery(`/navigations/${id}`, [
    'navigations',
  ]);

  return <>{!isLoading && <Navigation data={data.items} />}</>;
};

export default ExistingNavigation;
