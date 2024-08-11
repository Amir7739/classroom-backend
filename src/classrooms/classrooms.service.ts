import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Classroom, ClassroomDocument } from './schemas/classroom.schema';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectModel(Classroom.name) private classroomModel: Model<ClassroomDocument>,
  ) { }

  async create(createClassroomDto: any): Promise<Classroom> {
    const createdClassroom = new this.classroomModel(createClassroomDto);
    return createdClassroom.save();
  }

  async findAll(): Promise<Classroom[]> {
    return this.classroomModel.find().exec();
  }

  async assignTeacher(classroomId: string, teacherId: string): Promise<Classroom> {
    return this.classroomModel.findByIdAndUpdate(
      classroomId,
      { teacher: teacherId },
      { new: true },
    ).exec();
  }

  async assignStudent(classroomId: string, studentId: string): Promise<Classroom> {
    return this.classroomModel.findByIdAndUpdate(
      classroomId,
      { $push: { students: studentId } },
      { new: true },
    ).exec();
  }
}
