import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingEntity } from './entity/bookings.entity';
import { CreateBookingDto } from './dto/database.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private bookingRepository: Repository<BookingEntity>,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const isExistingUser = await this.bookingRepository.findOne({
      where: { userId: createBookingDto.userId },
    });

    if (isExistingUser) {
      return null;
    }

    const user = this.bookingRepository.create(createBookingDto);
    return await this.bookingRepository.save(user);
  }

  async findAll() {
    // На боевом сервере рекомендуется использовать поле take...
    return await this.bookingRepository.find();
  }

  async findOne(userId: string): Promise<BookingEntity | null> {
    const user = await this.bookingRepository.findOne({
      where: { userId: userId },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
