import {
  Controller,
  Post,
  Get,
  HttpCode,
  Body,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/database.dto';
import { BookingService } from './bookings.service';
import { IBookingsPayload } from './interfaces';
import { ReserveService } from './reserve.service';

@Controller('bookings')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingService,
    private readonly reserverService: ReserveService,
  ) {}

  @Get('user/all')
  async userList(): Promise<IBookingsPayload> {
    const users = await this.bookingsService.findAll();

    return {
      status: 'success',
      message: 'Список пользователей',
      payload: users,
    };
  }

  @Get('user/:id')
  async findUser(@Param('userId') userId: string): Promise<IBookingsPayload> {
    const user = await this.bookingsService.findOne(userId);

    if (!user) {
      return {
        status: 'error',
        message: `Пользователя с ID ${userId} не существует`,
      };
    }

    return {
      status: 'success',
      message: `Найден пользователь c ID ${userId}`,
      payload: user,
    };
  }

  @Post('user/create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body()
    createUserDto: CreateBookingDto,
  ): Promise<IBookingsPayload> {
    const user = await this.bookingsService.create(createUserDto);

    if (!user) {
      return {
        status: 'error',
        message: `Пользователь с таким User ID уже существует`,
      };
    }

    return {
      status: 'success',
      message: 'Пользователь успешно создано!',
      payload: user,
    };
  }

  @Post('reserve')
  async reserve(
    @Body()
    body: {
      eventId: number;
      userId: string;
    },
  ): Promise<IBookingsPayload> {
    const { eventId, userId } = body;
    const result = await this.reserverService.reserve(eventId, userId);

    switch (result) {
      case 'EVENT_NOT_FOUND': {
        return {
          status: 'error',
          message: 'Событие не найдено',
        };
      }

      case 'NO_AVAILABLE_SEATS': {
        return {
          status: 'error',
          message: 'Не осталось свободных мест',
        };
      }
      case 'ALREADY_RESERVED': {
        return {
          status: 'error',
          message: 'Пользователь уже участвует в мероприятие',
        };
      }
      default: {
        return {
          status: 'success',
          message: 'Пользователь успешно записан',
          payload: result,
        };
      }
    }
  }
}
