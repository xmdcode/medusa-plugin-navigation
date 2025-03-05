//@ts-nocheck
import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import NavigationModuleService from '../../../../modules/navigation/service';
import { NAVIGATION_MODULE } from '../../../../modules/navigation';
import { buildNavigationTree } from '../../../../modules/navigation/utils/utils';

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  // const navigationModuleService: NavigationModuleService =
  //   req.scope.resolve(NAVIGATION_MODULE);
  const query = req.scope.resolve('query');

  const { id } = req.params;
  const { data } = await query.graph({
    entity: 'navigation',
    fields: ['*', 'items.*'],
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

export async function PUT(req: MedusaRequest, res: MedusaResponse) {
  const navigationModuleService: NavigationModuleService =
    req.scope.resolve(NAVIGATION_MODULE);
  // const navService = req.scope.resolve('navigationService');
  // await navigationModuleService.deleteNavigation(req.params.id);
  // res.json({ deleted: 'ok' });
  res.json('hello');
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const navigationModuleService: NavigationModuleService =
    req.scope.resolve(NAVIGATION_MODULE);
  // const navService = req.scope.resolve('navigationService');
  await navigationModuleService.deleteNavigations(req.params.id);
  // res.json({ deleted: 'ok' });
  res.json('hello');
}
