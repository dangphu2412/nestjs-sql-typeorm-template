import { TimeEntityGenerator } from '@database/base/time-entity';
import { Permission } from '@modules/permission/permission.entity';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User extends TimeEntityGenerator() {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({ name: 'username', unique: true })
  @Index()
  public username: string;

  @Column({ name: 'full_name' })
  public fullName: string;

  @Index()
  @Column({ name: 'email', unique: true })
  public email: string;

  @Column({ name: 'password', nullable: false })
  public password: string;

  @Column({ name: 'avatar' })
  public avatar: string;

  @ManyToMany(() => Permission, (per) => per.users)
  @JoinTable({
    name: 'users_permissions',
    joinColumn: {
      name: 'users_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permissions_id',
      referencedColumnName: 'id',
    },
  })
  public permissions: Permission[];

  static create(partials: Partial<User>) {
    const i = new User();
    Object.assign(i, partials);
    return i;
  }
}
