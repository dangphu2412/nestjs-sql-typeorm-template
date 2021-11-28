import { Role } from '@modules/role/role.entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('permissions')
export class Permission {
  @PrimaryColumn()
  public id: string;

  @Column({ name: 'name', unique: true })
  public name: string;

  @Column({ name: 'priority', unique: true, type: 'smallint' })
  public priority: number;

  @ManyToMany(() => Role, (role) => role.permissions)
  public roles: Role[];
}
