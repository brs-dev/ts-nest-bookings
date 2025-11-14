import {
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateEventDto } from './dto/database.dto';
import { EventsService } from './events.service';
import { IBookingsPayload } from './interfaces';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get('all')
  async eventList(): Promise<IBookingsPayload> {
    const events = await this.eventService.findAll();
    return {
      status: 'success',
      message: 'Список событий',
      payload: events,
    };
  }

  @Get(':id')
  async findEvent(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IBookingsPayload> {
    const event = await this.eventService.findOne(id);

    if (!event) {
      return {
        status: 'error',
        message: `Мероприятия с ID ${id} не существует`,
      };
    }

    return {
      status: 'success',
      message: `Событие c ID ${id} найдено`,
      payload: event,
    };
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createEvent(
    @Body()
    createEventDto: CreateEventDto,
  ): Promise<IBookingsPayload> {
    const event = await this.eventService.create(createEventDto);

    if (!event) {
      return {
        status: 'error',
        message: 'Мероприятие с таким наименованием уже существует',
      };
    }

    return {
      status: 'success',
      message: 'Событие успешно создано!',
      payload: event,
    };
  }
}
