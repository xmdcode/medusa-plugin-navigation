import { model } from '@medusajs/framework/utils';
import { NavigationItem } from './navigationitem';

export const Navigation = model.define('navigation', {
  id: model.id().primaryKey(),
  name: model.text(),
  items: model.hasMany(() => NavigationItem),
});
