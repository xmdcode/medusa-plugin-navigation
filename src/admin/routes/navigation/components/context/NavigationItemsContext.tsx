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
  items: MinimalTreeItemData[];
  setItems: Dispatch<SetStateAction<MinimalTreeItemData[]>>;
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
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
  const [items, setItems] = useState<MinimalTreeItemData[]>([]);
  const [page, setPage] = useState('');

  return (
    <NavigationContext.Provider
      value={{
        isNewModalOpen,
        setIsNewModalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        activeItem,
        setActiveItem,
        items,
        setItems,
        page,
        setPage,
      }}>
      {children}
    </NavigationContext.Provider>
  );
};
