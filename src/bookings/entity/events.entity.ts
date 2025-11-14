import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BookingEntity } from './bookings.entity';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'total_seats', type: 'smallint' })
  totalSeats: number;

  @OneToMany(() => BookingEntity, (booking) => booking.event)
  bookings: BookingEntity[];
}
