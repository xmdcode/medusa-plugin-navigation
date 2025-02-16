import { Migration } from '@mikro-orm/migrations';

export class Migration20250216171957 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "navigation" ("id" text not null, "name" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "navigation_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_navigation_deleted_at" ON "navigation" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "navigation_item" ("id" text not null, "name" text not null, "url" text null, "index" integer not null, "navigation_id" text not null, "parent_id" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "navigation_item_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_navigation_item_navigation_id" ON "navigation_item" (navigation_id) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_navigation_item_parent_id" ON "navigation_item" (parent_id) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_navigation_item_deleted_at" ON "navigation_item" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`alter table if exists "navigation_item" add constraint "navigation_item_navigation_id_foreign" foreign key ("navigation_id") references "navigation" ("id") on update cascade;`);
    this.addSql(`alter table if exists "navigation_item" add constraint "navigation_item_parent_id_foreign" foreign key ("parent_id") references "navigation_item" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "navigation_item" drop constraint if exists "navigation_item_navigation_id_foreign";`);

    this.addSql(`alter table if exists "navigation_item" drop constraint if exists "navigation_item_parent_id_foreign";`);

    this.addSql(`drop table if exists "navigation" cascade;`);

    this.addSql(`drop table if exists "navigation_item" cascade;`);
  }

}
