import { Permission } from '@modules/permission/permission.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({ name: 'name', unique: true })
  public name: string;

  @Column({ name: 'updated_by', nullable: true })
  public updatedBy: string;

  @OneToMany(() => Permission, (per) => per.role, { cascade: ['insert'] })
  public permissions: Permission[];
}
