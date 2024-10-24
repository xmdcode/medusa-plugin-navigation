import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const navService = req.scope.resolve('navigationService');
  const navigations = await navService.list();
  res.json({ navigations });
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const navService = req.scope.resolve('navigationService');

  const navigationExists = await navService.retrieve(req.body['id']);

  if (!navigationExists) {
    const newNavigation = await navService.createNavigation({
      name: req.body['name'],
      items: req.body['items'],
    });

    return res.json({ newNavigation });
  }

  const newNavigation = await navService.updateNavigationTree(req.body['id'], {
    name: req.body['name'],
    items: req.body['items'],
  });

  if (req.body['deletedItems'].length > 0) {
    for (let deletedItem of req.body['deletedItems']) {
      await navService.deleteItem(deletedItem.id);
    }
  }
  res.json({ newNavigation });
}
