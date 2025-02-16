import { NavigationContextProvider } from '../../../components/context/NavigationItemsContext';
import Navigation from '../../../components/Navigation';

const NewNavigation = () => {
  return (
    <NavigationContextProvider>
      <Navigation />
    </NavigationContextProvider>
  );
};

export default NewNavigation;
