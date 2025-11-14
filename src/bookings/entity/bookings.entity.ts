import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';
import { EventEntity } from './events.entity';

@Entity('bookings')
@Unique(['eventId', 'userId'])
export class BookingEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'event_id', type: 'int', nullable: true })
  eventId: number | null;

  @Column({ name: 'user_id', type: 'varchar', length: 100 })
  userId: string;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => EventEntity, (event) => event.bookings)
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;
}
