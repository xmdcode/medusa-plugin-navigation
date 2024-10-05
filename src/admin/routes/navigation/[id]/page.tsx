import React from 'react';
import { useParams } from 'react-router-dom';

const NavigationItem = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default NavigationItem;
