import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const navService = req.scope.resolve('navigationService');
  // const tree = await navService.getNavigationTree(req.params.id);
  const tree = await navService.getNavigationTree(req.params.id);
  res.json(tree);
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const navService = req.scope.resolve('navigationService');
  await navService.deleteNavigation(req.params.id);
  res.json({ deleted: 'ok' });
}
