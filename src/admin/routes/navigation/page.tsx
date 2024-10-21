import { RouteConfig } from '@medusajs/admin';
import { Route, Routes, Outlet } from 'react-router-dom';
import { BarsThree } from '@medusajs/icons';
import { NavigationsPage } from './pages/Navigations';
import { NavigationContextProvider } from './components/context/NavigationItemsContext';
import NewNavigation from './pages/NewNavigation';
import ExistingNavigation from './pages/ExistingNavigation';

const NavigationPage = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <NavigationContextProvider>
            <Outlet />
          </NavigationContextProvider>
        }>
        <Route index element={<NavigationsPage />} />
        <Route path="new" element={<NewNavigation />} />
        <Route path="/:id" element={<ExistingNavigation />} />
      </Route>
    </Routes>
  );
};
export const config: RouteConfig = {
  link: {
    icon: BarsThree,
    label: 'Navigation Menu',
  },
};

export default NavigationPage;
