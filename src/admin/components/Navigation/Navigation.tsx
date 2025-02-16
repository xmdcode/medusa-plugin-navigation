import { FC } from 'react';
import { NavigationContextProvider } from '../context/NavigationItemsContext';
import NavigationWrapper from './NavigationWrapper';

export interface NavigationProps {
  page: 'new' | 'edit';
  id?: string;
}
const Navigation: FC<NavigationProps> = (props) => {
  const { page, id } = props;
  return (
    <NavigationContextProvider>
      <NavigationWrapper id={id} page={page} />
    </NavigationContextProvider>
  );
};

export default Navigation;
