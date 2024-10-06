import { Button, Drawer, Text } from '@medusajs/ui';

export interface ModalProps {
  open: boolean;
  close(): void;
  setNewItem(arg0: any): void;
}
const AddNewItem: React.FC<ModalProps> = (props) => {
  const { open, close, setNewItem } = props;
  return (
    <Drawer open={open}>
      <Drawer.Content
        onInteractOutside={close}
        className="max-w-[560px] h-full rounded-none inset-0 right-0 top-0 bottom-0 left-auto z-[10]">
        <Drawer.Header onClick={close}>
          <Drawer.Title>Edit Variant</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className="p-4">
          <Text>This is where you edit the variant&apos;s details</Text>
        </Drawer.Body>
        <Drawer.Footer>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button onClick={() => setNewItem('hi')}>Save</Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
};

export default AddNewItem;
