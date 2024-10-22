import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const navService = req.scope.resolve('navigationService');
  try {
    const tree = await navService.getNavigationTree(req.params.id);
    res.status(200).json(tree);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
