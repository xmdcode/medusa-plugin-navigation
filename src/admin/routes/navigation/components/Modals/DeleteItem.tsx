import { Prompt } from '@medusajs/ui';
import { useNavigationData } from '../context/NavigationItemsContext';
import { removeItemById } from '../utils/list-utils';

const DeleteItem = () => {
  const {
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    items,
    activeItem,
    setItems,
    setDeletedItems,
    deletedItems,
  } = useNavigationData();

  const closeModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    setItems(removeItemById(items, activeItem.id));
    setDeletedItems([...deletedItems, { id: activeItem.id }]);
    closeModal();
  };

  return (
    <Prompt open={isDeleteModalOpen}>
      <Prompt.Content>
        <Prompt.Header>
          <Prompt.Title>Delete something</Prompt.Title>
          <Prompt.Description>
            Are you sure? This cannot be undone.
          </Prompt.Description>
        </Prompt.Header>
        <Prompt.Footer>
          <Prompt.Cancel onClick={closeModal}>Cancel</Prompt.Cancel>
          <Prompt.Action onClick={handleDelete}>Delete</Prompt.Action>
        </Prompt.Footer>
      </Prompt.Content>
    </Prompt>
  );
};

export default DeleteItem;
