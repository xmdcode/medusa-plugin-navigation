import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const navService = req.scope.resolve('navigationService');
  // const tree = await navService.getNavigationTree(req.params.id);
  const tree = await navService.getNavigationTree(req.params.id);
  res.json(tree);
}
