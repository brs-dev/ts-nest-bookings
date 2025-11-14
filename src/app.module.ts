import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [DatabaseModule, BookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
