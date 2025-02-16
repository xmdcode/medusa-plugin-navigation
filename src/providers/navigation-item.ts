import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  BeforeCreate,
  ManyToOne,
  Cascade,
  Collection,
} from '@mikro-orm/core';
import { generateEntityId } from '@medusajs/utils';
// import { Navigation } from './navigation';

@Entity()
export class Navigation {
  @PrimaryKey()
  id: string;

  @Property()
  name: string;

  @OneToMany(() => NavigationItem, (item) => item.navigation) // Define the relation
  items = new Collection<NavigationItem>(this); // Initialize as a Collection
}

@Entity()
export class NavigationItem {
  @PrimaryKey()
  id: string;

  @Property()
  name: string;

  @Property({ nullable: true })
  url?: string;

  @OneToMany(() => NavigationItem, (item) => item.parent, {
    cascade: [Cascade.PERSIST, Cascade.MERGE],
  })
  children = new Collection<NavigationItem>(this);

  @Property({ type: 'number', default: 0 })
  index: number;

  @ManyToOne(() => NavigationItem, { nullable: true, deleteRule: 'CASCADE' })
  parent?: NavigationItem | null; // Correct type here

  @ManyToOne(() => Navigation, { nullable: true, deleteRule: 'CASCADE' })
  navigation: Navigation;
}
