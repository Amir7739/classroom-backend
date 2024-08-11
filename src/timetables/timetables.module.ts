// src/timetables/timetables.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimetablesService } from './timetables.service';
import { TimetablesController } from './timetables.controller';
import { Timetable, TimetableSchema } from './schemas/timetable.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Timetable.name, schema: TimetableSchema }])],
  controllers: [TimetablesController],
  providers: [TimetablesService],
})
export class TimetablesModule { }
