import {
  createContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from 'react';
import { useNavigation } from 'react-router-dom';
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
  deletedItems: { id: string }[];
  setDeletedItems: Dispatch<SetStateAction<{ id: string }[]>>;
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  navigationId: string;
  setNavigationId: Dispatch<SetStateAction<string>>;
  navigationName: string;
  setNavigationName: Dispatch<SetStateAction<string>>;
}

export const NavigationContext = createContext(null);

export const useNavigationData = (): NavigationContextProvider => {
  const navigationcontext = useContext(NavigationContext);
  if (!navigationcontext) throw new Error('not inside navigationContext');
  return navigationcontext;
};

export const NavigationContextProvider = ({ children }: PropsWithChildren) => {
  const navigation = useNavigation();

  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<MinimalTreeItemData>();
  const [page, setPage] = useState('');
  const [navigationId, setNavigationId] = useState<string>('');
  const [items, setItems] = useState<MinimalTreeItemData[]>([]);
  const [deletedItems, setDeletedItems] = useState([]);
  const [navigationName, setNavigationName] = useState<string>('');

  return (
    <NavigationContext.Provider
      value={{
        isNewModalOpen,
        setIsNewModalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        activeItem,
        setActiveItem,
        items,
        setItems,
        page,
        setPage,
        navigationId,
        setNavigationId,
        navigationName,
        setNavigationName,
        deletedItems,
        setDeletedItems,
      }}>
      {children}
    </NavigationContext.Provider>
  );
};
