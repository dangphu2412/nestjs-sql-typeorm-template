import { Role } from '@modules/role/role.entity';
import { User } from '@modules/user/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({ name: 'name', unique: true })
  public name: string;

  @Column({ name: 'priority', type: 'smallint' })
  public priority: number;

  @ManyToOne(() => Role, (role) => role.permissions)
  public role: Role;

  @ManyToMany(() => User, (user) => user.permissions)
  public users: User[];
}
