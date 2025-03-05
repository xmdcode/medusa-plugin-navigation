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
    enabled: !!id,
  });

  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<MinimalTreeItemData>();
  const [page, setPage] = useState('');
  const [navigationName, setNavigationName] = useState<string>('');

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
      }}>
      {children}
    </NavigationContext.Provider>
  );
};
const fitems = [
  {
    id: '01JMESPQSTCKE77SE269775GC2',
    name: 'Nav2',
    url: 'Nav2',
    index: 0,
    navigation_id: '01JMESPQSDNB0YT4EN9W3PJ7GF',
    parent_id: null,
    parent: null,
    created_at: '2025-02-19T09:47:56.603Z',
    updated_at: '2025-02-19T09:47:56.603Z',
    deleted_at: null,
    children: [
      {
        id: '01JMESPQT3DXG389DVT3E7W44F',
        name: 'nav3',
        url: 'nav3',
        index: 0,
        navigation_id: '01JMESPQSDNB0YT4EN9W3PJ7GF',
        parent_id: '01JMESPQSTCKE77SE269775GC2',
        parent: null,
        created_at: '2025-02-19T09:47:56.611Z',
        updated_at: '2025-02-19T09:47:56.611Z',
        deleted_at: null,
        children: [],
        parentId: '01JMESPQSTCKE77SE269775GC2',
        depth: 1,
        isLast: true,
        canHaveChildren: true,
      },
    ],
    parentId: null,
    depth: 0,
    isLast: false,
    canHaveChildren: true,
  },
  {
    id: 'f1749161-8f93-461f-ac14-f8c5b5823394',
    name: 'Item3',
    url: 'Item4',
    parentId: null,
    depth: 0,
    index: 1,
    isLast: false,
    parent: null,
    children: [
      {
        id: 'db00d86e-6593-4146-bf81-90bca6a70672',
        name: 'Item2',
        url: 'Item2',
        parentId: 'f1749161-8f93-461f-ac14-f8c5b5823394',
        depth: 1,
        index: 0,
        isLast: false,
        parent: null,
        children: [
          {
            id: '63d2e973-1670-403e-bd8b-348dd1d09852',
            name: 'Item5',
            url: 'Item5',
            parentId: 'db00d86e-6593-4146-bf81-90bca6a70672',
            depth: 2,
            index: 1,
            isLast: true,
            parent: null,
            children: [],
            canHaveChildren: false,
          },
        ],
        canHaveChildren: true,
      },
    ],
    canHaveChildren: true,
  },
  {
    id: 'd2947d4c-fe71-417d-b4b2-0ab5c1f3e620',
    name: 'Item6',
    url: 'Item7',
    parentId: null,
    depth: 0,
    index: 2,
    isLast: true,
    parent: null,
    children: [],
    canHaveChildren: true,
  },
];
