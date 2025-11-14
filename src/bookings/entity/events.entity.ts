import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BookingEntity } from './bookings.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('events')
export class EventEntity {
  @ApiProperty({ description: 'ID события', example: 1 })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    description: 'Наименование события',
    example: 'Vasya123',
    maximum: 100,
  })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({
    description: 'Общее количество мест',
    example: 100,
    minimum: 0,
  })
  @Column({ name: 'total_seats', type: 'smallint' })
  totalSeats: number;

  @OneToMany(() => BookingEntity, (booking) => booking.event)
  bookings: BookingEntity[];
}
