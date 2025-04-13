import { defineRouteConfig } from '@medusajs/admin-sdk';
import { BarsThree } from '@medusajs/icons';
import { Button, Container, Table, Text } from '@medusajs/ui';
import { PlusMini } from '@medusajs/icons';
import { useNavigate, Link } from 'react-router-dom';
import { sdk } from '../../lib/config';
import { useQuery } from '@tanstack/react-query';

const NavigationsPage = () => {
  // const { setDeletedItems, setItems } = useNavigationData();
  const {
    data: navigationsData,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => sdk.client.fetch(`/admin/navigations`),
    queryKey: ['navigations'],
  });

  const navigate = useNavigate();

  const tableData = navigationsData?.navigations?.map((navitem) => {
    const itemOnlyTitle = navitem.items
      .map((navitemitem) => navitemitem.name)
      .join(', ');
    return { ...navitem, items: itemOnlyTitle };
  });

  const handleAddNew = () => {
    navigate('/navigation/new');
  };

  return (
    <>
      <Container className="flex flex-col">
        <div className="w-full h-full flex items-center justify-between">
          <div className="flex flex-col">
            <Text size="xlarge" weight="plus" family="sans" className="mt-2">
              Navigation Menus
            </Text>
            <Text size="base" weight="plus" family="sans" className="mt-2 mb-8">
              Here you can create all your menus in tree form so you can have
              them on you frontend application
            </Text>
          </div>
          <div className="flex items-center">
            <Button onClick={handleAddNew} variant="secondary">
              <PlusMini />
              Add New Menu
            </Button>
          </div>
        </div>
        {!isLoading && tableData?.length > 0 ? (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className="w-[250px]">Title</Table.HeaderCell>
                <Table.HeaderCell>Menu Items</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {!isLoading &&
                tableData?.map((navigation) => {
                  return (
                    <Table.Row key={navigation.id}>
                      <Table.Cell className="w-[250px]">
                        <Link
                          to={`/navigation/${navigation.id}`}
                          className="underline hover:text-blue-60 duration-100 transition ease-in-out">
                          {navigation.name}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{navigation.items}</Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        ) : (
          <Container className="flex items-center justify-center space-x-1">
            <Text>You haven't added any navigations</Text>
          </Container>
        )}
      </Container>
    </>
  );
};

export const config = defineRouteConfig({
  icon: BarsThree,
  label: 'Navigation Menu',
});

export default NavigationsPage;
