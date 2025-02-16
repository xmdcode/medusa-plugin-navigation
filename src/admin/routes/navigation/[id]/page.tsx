import { useParams } from 'react-router-dom';
import Navigation from '../../../components/Navigation';
import { NavigationContextProvider } from '../../../components/context/NavigationItemsContext';

const ExistingNavigation = () => {
  const { id } = useParams();

  return (
    <>
      <NavigationContextProvider>
        <Navigation id={id} />
      </NavigationContextProvider>
    </>
  );
};

export default ExistingNavigation;

// const Id = () => {
//   return <div>id</div>;
// };

// export default Id;
