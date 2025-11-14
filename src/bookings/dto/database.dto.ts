import {
  IsString,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    description: 'Наименование события',
    example: 'Рой Джонс vs Майк Тайсон',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, {
    message: 'Заголовок события не должен превышать 100 символов',
  })
  name: string;

  @ApiProperty({
    description: 'Указать количество мест',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1, { message: 'Минимальное количество мест не меньше 1' })
  @Max(100, { message: 'Максимальное количество месте не более 100' })
  totalSeats: number;
}

export class CreateBookingDto {
  @ApiProperty({
    description: 'Никнейм пользователя',
    example: 'Vasya123',
    maxLength: 16,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(16, { message: 'ID пользователя не должен превышать 16 символов' })
  userId: string;
}

export class ReserveDto {
  @ApiProperty({
    description: 'ID мероприятия',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  eventId: number;

  @ApiProperty({
    description: 'Никнейм пользователя',
    example: 'Vasya123',
    maxLength: 16,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(16, { message: 'ID пользователя не должен превышать 16 символов' })
  userId: string;
}
