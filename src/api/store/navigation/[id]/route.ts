import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { buildNavigationTree } from '../../../../modules/navigation/utils/utils';

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  // const navigationModuleService: NavigationModuleService =
  //   req.scope.resolve(NAVIGATION_MODULE);
  const query = req.scope.resolve('query');

  const { id } = req.params;
  const { data } = await query.graph({
    entity: 'navigation',
    fields: [
      '*',
      'items.id',
      'items.name',
      'items.url',
      'items.index',
      'items.navigation_id',
      'items.parent_id',
    ],
    filters: {
      id,
    },
  });
  const tree = buildNavigationTree(data[0].items);

  const navigationItem = {
    name: data[0].name,
    items: tree,
  };
  // const tree = await navService.getNavigationTree(req.params.id);
  // res.json(tree);
  res.json(navigationItem);
}
