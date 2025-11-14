import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';
import { EventEntity } from './events.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('bookings')
@Unique(['eventId', 'userId'])
export class BookingEntity {
  @ApiProperty({ description: 'ID пользователя', example: 1 })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: 'ID события', example: 1 })
  @Column({ name: 'event_id', type: 'int', nullable: true })
  eventId: number | null;

  @ApiProperty({ description: 'Никнейм пользователя', example: 'Vasya123' })
  @Column({ name: 'user_id', type: 'varchar', length: 100 })
  userId: string;

  @ApiProperty({
    description: 'Дата создания',
    example: '2024-01-15T10:30:00.000Z',
  })
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
