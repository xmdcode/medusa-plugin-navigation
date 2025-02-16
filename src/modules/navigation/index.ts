import { Module } from '@medusajs/framework/utils';
import NavigationService from './service'; // Import the factory

export const NAVIGATION_MODULE = 'navigation';

export default Module(NAVIGATION_MODULE, {
  service: NavigationService,
});
