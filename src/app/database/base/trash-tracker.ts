import { DeleteDateColumn } from 'typeorm';

export class TrashTracker {
  @DeleteDateColumn({ name: 'deleted_at' })
  deleted: Date;
}
