import {
  IsString,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, {
    message: 'Заголовок события не должен превышать 100 символов',
  })
  name: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1, { message: 'Минимальное количество мест не меньше 1' })
  @Max(100, { message: 'Максимальное количество месте не более 100' })
  totalSeats: number;
}

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(16, { message: 'ID пользователя не должен превышать 16 символов' })
  userId: string;
}
