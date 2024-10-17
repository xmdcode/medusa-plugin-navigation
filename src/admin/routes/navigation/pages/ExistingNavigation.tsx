import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useNavigationData } from '../components/context/NavigationItemsContext';
import { useAdminCustomQuery } from 'medusa-react';

const ExistingNavigation = () => {
  const { id } = useParams();
  const { setItems, setNavigationName } = useNavigationData();

  const { data, isLoading, isError } = useAdminCustomQuery(
    `/navigations/${id}`,
    ['navigations']
  );

  useEffect(() => {
    if (!isError && !isLoading) {
      setItems(data?.items);
      setNavigationName(data?.name);
    }
  }, [isError, isLoading]);

  return (
    <>
      <Navigation />
    </>
  );
};

export default ExistingNavigation;
