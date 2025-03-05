// @ts-nocheck

import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import NavigationModuleService from '../../../modules/navigation/service';
import { NAVIGATION_MODULE } from '../../../modules/navigation';

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve('query');
  // const navigations = await navigationModuleService.listNavigations({
  //   relations: ['navigation-item'],
  // });

  const { data: navigations } = await query.graph({
    entity: 'navigation',
    fields: ['*', 'items.*'],
  });
  res.json({ navigations });
  // res.json('hello');
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const navigationModuleService: NavigationModuleService =
    req.scope.resolve(NAVIGATION_MODULE);

  const { name, items } = req.body;

  const newNavigation = navigationModuleService.createNestedNavigation(
    navigationModuleService,
    name,
    items
  );

  return res.json('ok');
}

export async function PUT(req: MedusaRequest, res: MedusaResponse) {
  const navigationModuleService: NavigationModuleService =
    req.scope.resolve(NAVIGATION_MODULE);

  const { id, name, items, deletedItems } = req.body;

  try {
    const deletedNavItems = navigationModuleService.deleteNavItems(
      navigationModuleService,
      deletedItems
    );
    // console.log(items);
    const newNavigation = navigationModuleService.updateNestedNavigation(
      navigationModuleService,
      id,
      name,
      items
    );

    return res.json('ok');
  } catch (error) {
    return res.json('not ok');
  }
}
