import { Role } from '@modules/role/role.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({ name: 'name', unique: true })
  public name: string;

  @Column({ name: 'priority', unique: true, type: 'smallint' })
  public priority: number;

  @ManyToMany(() => Role, (role) => role.permissions)
  public roles: Role[];
}
