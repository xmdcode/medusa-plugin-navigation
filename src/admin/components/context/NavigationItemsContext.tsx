import {
  createContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { sdk } from '../../lib/config';
import { useParams } from 'react-router-dom';
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
  refetchNavigation(): void;
  navigationNameError: boolean;
  setNavigationNameError: Dispatch<SetStateAction<boolean>>;
}

export const NavigationContext = createContext(null);

export const useNavigationData = (): NavigationContextProvider => {
  const navigationcontext = useContext(NavigationContext);
  if (!navigationcontext) throw new Error('not inside navigationContext');
  return navigationcontext;
};

export const NavigationContextProvider = ({ children }: PropsWithChildren) => {
  const { id } = useParams();

  const { data, refetch: refetchNavigation } = useQuery({
    queryFn: () => sdk.client.fetch(`/admin/navigations/${id}`),
    queryKey: ['navigation', id],
    refetchOnMount: 'always',
    enabled: !!id,
  });

  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<MinimalTreeItemData>();
  const [page, setPage] = useState('');
  const [navigationName, setNavigationName] = useState<string>('');
  const [navigationNameError, setNavigationNameError] =
    useState<boolean>(false);

  const [items, setItems] = useState<MinimalTreeItemData[]>([]);
  const [deletedItems, setDeletedItems] = useState([]);

  useEffect(() => {
    if (data) {
      setItems(data.items);
      setNavigationName(data.name);
    }
  }, [data]);

  return (
    <NavigationContext.Provider
      value={{
        navigationId: id,
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
        navigationName,
        setNavigationName,
        deletedItems,
        setDeletedItems,
        refetchNavigation,
        navigationNameError,
        setNavigationNameError,
      }}>
      {children}
    </NavigationContext.Provider>
  );
};
