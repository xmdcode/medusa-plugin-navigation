import { dataSource } from '@medusajs/medusa/dist/loaders/database';

import { Navigation } from '../models/navigation';

export const NavigationRepository = dataSource.getRepository(Navigation);
