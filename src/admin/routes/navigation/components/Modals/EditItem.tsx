import { useState } from 'react';
import { Button, Drawer, Input, Label } from '@medusajs/ui';
import { ModalProps } from './AddNewItem';
import { useNavigationData } from '../context/NavigationItemsContext';

const EditItem = () => {
  const { isEditModalOpen, setIsEditModalOpen, activeItem } =
    useNavigationData();
  const handleClose = () => {
    setIsEditModalOpen(false);
  };

  const [errors, SetErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const url = e.target.url.value;

    if (!title) {
      SetErrors((prev) => ({ ...prev, title: true }));
    } else {
      SetErrors((prev) => ({ ...prev, title: false }));
    }

    if (!url) {
      SetErrors((prev) => ({ ...prev, url: true }));
    } else {
      SetErrors((prev) => ({ ...prev, url: false }));
    }

    if (title && url) {
      handleClose();
    }
  };

  return (
    <Drawer open={isEditModalOpen}>
      <Drawer.Content
        onInteractOutside={handleClose}
        className="max-w-[560px] h-full rounded-none inset-0 right-0 top-0 bottom-0 left-auto z-[10]">
        <form onSubmit={handleSubmit}>
          <Drawer.Header onClick={handleClose}>
            <Drawer.Title>Edit Variant</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body className="p-4 space-y-4 flex flex-col">
            <div className="w-full flex flex-col space-y-2">
              <Label size="base" weight="plus">
                Navigation Item Name
              </Label>
              <Input
                placeholder="ex. Menu Item 1"
                defaultValue={activeItem?.title}
                id="name"
                name="title"
                aria-invalid={errors['title'] ? true : false}
              />
            </div>
            <div className="w-full flex flex-col space-y-2">
              <Label size="base" weight="plus">
                Url For Item
              </Label>
              <Input
                placeholder="ex. /shoes"
                defaultValue={activeItem?.url}
                id="shoes"
                name="url"
                aria-invalid={errors['url'] ? true : false}
              />
            </div>
          </Drawer.Body>
          <Drawer.Footer>
            <Button variant="secondary" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Drawer.Footer>
        </form>
      </Drawer.Content>
    </Drawer>
  );
};

export default EditItem;
