import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const navService = req.scope.resolve('navigationService');
  const newItem = await navService.createItem(req.params.id, req.body);
  res.json(newItem);
}
