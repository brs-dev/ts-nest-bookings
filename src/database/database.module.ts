import { Module } from '@nestjs/common';
import { typeOrmConfigProvider } from './database.ormconfig';

@Module({
  imports: [typeOrmConfigProvider],
})
export class DatabaseModule {}
