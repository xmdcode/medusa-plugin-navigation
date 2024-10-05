import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const navService = req.scope.resolve('navigationService');
  const navigations = await navService.list();
  res.json({ navigations });
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const navService = req.scope.resolve('navigationService');
  const newNavigation = await navService.createNavigation({
    name: req.body['name'],
    items: req.body['items'],
  });
  res.json({ newNavigation });
}
