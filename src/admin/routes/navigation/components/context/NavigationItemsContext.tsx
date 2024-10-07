import {
  createContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import { MinimalTreeItemData } from '../TreeNavigation';

interface NavigationContextProvider extends PropsWithChildren {
  isNewModalOpen: boolean;
  setIsNewModalOpen: Dispatch<SetStateAction<boolean>>;
  isEditModalOpen: boolean;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  activeItem: MinimalTreeItemData;
  setActiveItem: Dispatch<SetStateAction<MinimalTreeItemData>>;
}

export const NavigationContext = createContext(null);

export const useNavigationData = (): NavigationContextProvider => {
  const navigationcontext = useContext(NavigationContext);
  if (!navigationcontext) throw new Error('not inside navigationContext');
  return navigationcontext;
};

export const NavigationContextProvider = ({ children }: PropsWithChildren) => {
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<MinimalTreeItemData>();

  return (
    <NavigationContext.Provider
      value={{
        isNewModalOpen,
        setIsNewModalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        activeItem,
        setActiveItem,
      }}>
      {children}
    </NavigationContext.Provider>
  );
};
