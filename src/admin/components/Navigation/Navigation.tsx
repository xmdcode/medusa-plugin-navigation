import { FC } from 'react';
import { NavigationContextProvider } from '../context/NavigationItemsContext';
import NavigationWrapper from './NavigationWrapper';

export interface NavigationProps {
  page: 'new' | 'edit';
}
const Navigation: FC<NavigationProps> = (props) => {
  const { page } = props;
  return (
    <NavigationContextProvider>
      <NavigationWrapper page={page} />
    </NavigationContextProvider>
  );
};

export default Navigation;
