import { dataSource } from '@medusajs/medusa/dist/loaders/database';

import { NavigationItem } from '../models/navigation-item';

export const NavigationItemRepository =
  dataSource.getRepository(NavigationItem);
