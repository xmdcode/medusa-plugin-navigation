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
  const [items, setItems] = useState<MinimalTreeItemData[]>([
    {
      id: '8a75b1cb-19be-4262-bb8e-adf06f429487',
      name: 'Nav1',
      url: 'Nav1',
      parentId: null,
      depth: 0,
      index: 0,
      isLast: false,
      parent: null,
      children: [
        {
          id: 'f57ab33a-fa20-49b6-a94c-0842a3ce905e',
          name: 'Nav2',
          url: 'Nav2',
          parentId: '8a75b1cb-19be-4262-bb8e-adf06f429487',
          depth: 1,
          index: 0,
          isLast: true,
          parent: null,
          children: [
            {
              id: '8100b578-e377-428d-acaa-77ebc2f42594',
              name: 'Nav3',
              url: 'Nav4',
              parentId: 'f57ab33a-fa20-49b6-a94c-0842a3ce905e',
              depth: 2,
              index: 0,
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
      id: '28790121-9990-4447-9eab-836db3ed362b',
      name: 'Nav5',
      url: 'Nav5',
      parentId: null,
      depth: 0,
      index: 1,
      isLast: false,
      parent: null,
      children: [
        {
          id: '902e25a6-1fe2-42f3-aec9-458f60ae2627',
          name: 'nav6',
          url: 'nav6',
          parentId: '28790121-9990-4447-9eab-836db3ed362b',
          depth: 1,
          index: 2,
          isLast: false,
          parent: null,
          children: [],
          canHaveChildren: true,
        },
      ],
      canHaveChildren: true,
    },
    {
      id: '0c7f6a38-5b23-41e6-8831-596fc11ca142',
      name: 'nav7',
      url: 'nav7',
      parentId: null,
      depth: 0,
      index: 3,
      isLast: true,
      parent: null,
      children: [],
      canHaveChildren: true,
    },
  ]);
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
