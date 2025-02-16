import { useParams } from 'react-router-dom';
import { NavigationContextProvider } from '../../../components/context/NavigationItemsContext';
import Navigation from '../../../components/Navigation/Navigation';

const ExistingNavigation = () => {
  const { id } = useParams();

  return (
    <>
      <NavigationContextProvider>
        <Navigation page="edit" id={id} />
      </NavigationContextProvider>
    </>
  );
};

export default ExistingNavigation;

// const Id = () => {
//   return <div>id</div>;
// };

// export default Id;
