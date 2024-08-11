// src/timetables/timetables.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Timetable, TimetableDocument } from './schemas/timetable.schema';

@Injectable()
export class TimetablesService {
  constructor(
    @InjectModel(Timetable.name) private timetableModel: Model<TimetableDocument>,
  ) { }

  async create(createTimetableDto: any): Promise<Timetable> {
    const newTimetable = new this.timetableModel(createTimetableDto);
    return newTimetable.save();
  }

  async findAll(): Promise<Timetable[]> {
    return this.timetableModel.find().exec();
  }

  async findByClassroom(classroomId: string): Promise<Timetable[]> {
    return this.timetableModel.find({ classroomId }).exec();
  }

  async update(id: string, updateTimetableDto: any): Promise<Timetable> {
    return this.timetableModel.findByIdAndUpdate(id, updateTimetableDto, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.timetableModel.findByIdAndDelete(id).exec();
  }
}
