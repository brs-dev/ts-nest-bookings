import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './entity/events.entity';
import { CreateEventDto } from './dto/database.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<EventEntity | null> {
    const isExistingEvent = await this.eventRepository.findOne({
      where: { name: createEventDto.name },
    });

    if (isExistingEvent) {
      return null;
    }

    const event = this.eventRepository.create(createEventDto);
    return await this.eventRepository.save(event);
  }

  async findAll(): Promise<EventEntity[]> {
    // На боевом сервере рекомендуется использовать поле take...
    return await this.eventRepository.find();
  }

  async findOne(id: number): Promise<EventEntity | null> {
    const event = await this.eventRepository.findOne({
      where: { id },
    });

    if (!event) {
      return null;
    }

    return event;
  }
}
