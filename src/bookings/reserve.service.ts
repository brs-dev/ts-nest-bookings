import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from './entity/bookings.entity';
import { EventEntity } from './entity/events.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ReserveService {
  constructor(
    @InjectRepository(BookingEntity)
    private bookingRepository: Repository<BookingEntity>,
  ) {}

  async reserve(eventId: number, userId: string) {
    return await this.bookingRepository.manager.transaction(
      async (txEntityManager) => {
        const event = await this.eventTx(eventId, txEntityManager);

        if (!event) {
          return 'EVENT_NOT_FOUND';
        }

        if (event.totalSeats <= 0) {
          return 'NO_AVAILABLE_SEATS';
        }

        const booking = await this.existingReserve(
          eventId,
          userId,
          txEntityManager,
        );

        if (booking) {
          return 'ALREADY_RESERVED';
        }

        const reservation = txEntityManager.create(BookingEntity, {
          eventId,
          userId,
        });

        const saveReserve = await txEntityManager.save(reservation);
        await txEntityManager.decrement(
          EventEntity,
          { id: eventId },
          'totalSeats',
          1,
        );

        return saveReserve;
      },
    );
  }

  private async eventTx(eventId: number, txEntityManager: EntityManager) {
    return await txEntityManager
      .createQueryBuilder(EventEntity, 'events')
      .setLock('pessimistic_write')
      .where('events.id= :id', { id: eventId })
      .getOne();
  }

  private async existingReserve(
    eventId: number,
    userId: string,
    txEntityManager: EntityManager,
  ) {
    return await txEntityManager
      .createQueryBuilder(BookingEntity, 'bookings')
      .where('bookings.eventId = :eventId AND bookings.userId = :userId', {
        eventId,
        userId,
      })
      .getOne();
  }
}
