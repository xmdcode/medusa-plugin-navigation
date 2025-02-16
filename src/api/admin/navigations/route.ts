// @ts-nocheck
import { createNestedNavigation } from './../../../modules/navigation/utils/utils';

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

  const { id, name, items } = req.body;

  try {
    const navigationExists = await navigationModuleService.retrieveNavigation(
      id
    );
  } catch (error) {
    const newNavigation = createNestedNavigation(
      navigationModuleService,
      name,
      items
    );

    return res.json('ok');
  }

  // const newNavigation = await navigationModuleService.updateNavigationTree(
  //   req.body['id'],
  //   {
  //     name: req.body['name'],
  //     items: req.body['items'],
  //   }
  // );

  // if (req.body['deletedItems'].length > 0) {
  //   for (let deletedItem of req.body['deletedItems']) {
  //     await navigationModuleService.deleteItem(deletedItem.id);
  //   }
  // }
  // res.json({ newNavigation });
  res.json('hello');
}
