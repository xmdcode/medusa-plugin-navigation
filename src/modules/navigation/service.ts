import { MedusaService } from '@medusajs/framework/utils';
import { Navigation } from './models/navigation';
import { NavigationItem } from './models/navigationitem';

export default class NavigationModuleService extends MedusaService({
  Navigation,
  NavigationItem,
}) {}
