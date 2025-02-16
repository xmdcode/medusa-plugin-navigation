import { model } from '@medusajs/framework/utils';
import { Navigation } from './navigation';

// Define the NavigationItem model with the table name "navigation_item"
export const NavigationItem = model.define('navigation_item', {
  id: model.id().primaryKey(),
  name: model.text(),
  // A text field for the URL (nullable if needed)
  url: model.text().nullable(),
  // An integer field for ordering/index
  index: model.number(),
  // The foreign key reference to the Navigation model
  navigation: model.belongsTo(() => Navigation, { mappedBy: 'items' }),
  // Optionally, if you need to reference a parent NavigationItem (for tree structures), add:
  parent: model
    .belongsTo(() => NavigationItem, {
      mappedBy: 'children',
    })
    .nullable(),
  children: model.hasMany(() => NavigationItem, {
    mappedBy: 'parent',
  }),
});
