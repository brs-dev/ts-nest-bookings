import { BookingEntity } from './entity/bookings.entity';
import { EventEntity } from './entity/events.entity';

export interface IBookingsPayload {
  status: TBookingsStatus;
  message: string;
  payload?: EventEntity | BookingEntity | EventEntity[] | BookingEntity[];
}

type TBookingsStatus = 'error' | 'success';
