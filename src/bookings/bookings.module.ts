import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { BookingEntity } from './entity/bookings.entity';
import { EventEntity } from './entity/events.entity';
import { EventsService } from './events.service';
import { BookingsController } from './bookings.controller';
import { BookingService } from './bookings.service';
import { ReserveService } from './reserve.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity, EventEntity])],
  controllers: [EventsController, BookingsController],
  providers: [EventsService, BookingService, ReserveService],
})
export class BookingsModule {}
