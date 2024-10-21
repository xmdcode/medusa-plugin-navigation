import { BaseEntity, generateEntityId } from '@medusajs/medusa';
import {
  Entity,
  Column,
  Tree,
  TreeChildren,
  TreeParent,
  ManyToOne,
  BeforeInsert,
  PrimaryColumn,
} from 'typeorm';
import { Navigation } from './navigation'; // Import Navigation explicitly

@Entity()
@Tree('materialized-path')
export class NavigationItem extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  url: string;

  // Each NavigationItem can have multiple children (self-referencing tree structure)
  @TreeChildren()
  children: NavigationItem[];

  // New field for ordering
  @Column({ type: 'int', default: 0 })
  index: number;

  // Each NavigationItem can have a parent (self-referencing tree structure)
  @TreeParent({ onDelete: 'CASCADE' })
  parent: NavigationItem;

  // Each NavigationItem belongs to a Navigation
  @ManyToOne(() => Navigation, (navigation) => navigation.items, {
    onDelete: 'CASCADE',
  })
  navigation: Navigation;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'navitem');
  }
}
