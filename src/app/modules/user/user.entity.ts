import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  public id: string;

  @Column({ name: 'username', unique: true })
  public username: string;

  @Column({ name: 'full_name' })
  public fullName: string;

  @Column({ name: 'email', unique: true })
  public email: string;

  @Column({ name: 'password', nullable: false })
  public password: string;

  @Column({ name: 'avatar' })
  public avatar: string;
}
