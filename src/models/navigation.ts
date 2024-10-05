import { BaseEntity, generateEntityId } from '@medusajs/medusa';
import {
  Entity,
  Column,
  OneToMany,
  BeforeInsert,
  PrimaryColumn,
} from 'typeorm';
import { NavigationItem } from './navigation-item'; // Import NavigationItem explicitly

@Entity()
export class Navigation extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  // A Navigation can have many NavigationItems
  @OneToMany(() => NavigationItem, (item) => item.navigation, { cascade: true })
  items: NavigationItem[];

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'nav');
  }
}
