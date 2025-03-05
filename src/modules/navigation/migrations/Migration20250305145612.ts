import { Migration } from '@mikro-orm/migrations';

export class Migration20250305145612 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "navigation_item" drop constraint if exists "navigation_item_navigation_id_foreign";`);

    this.addSql(`alter table if exists "navigation_item" add constraint "navigation_item_navigation_id_foreign" foreign key ("navigation_id") references "navigation" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "navigation_item" drop constraint if exists "navigation_item_navigation_id_foreign";`);

    this.addSql(`alter table if exists "navigation_item" add constraint "navigation_item_navigation_id_foreign" foreign key ("navigation_id") references "navigation" ("id") on update cascade;`);
  }

}
