// src/timetables/schemas/timetable.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TimetableDocument = Timetable & Document;

@Schema()
export class Timetable {
    @Prop({ required: true })
    classroomId: string;

    @Prop({ required: true })
    subject: string;

    @Prop({ required: true })
    teacherId: string;

    @Prop({ required: true })
    startTime: string;

    @Prop({ required: true })
    endTime: string;

    @Prop({ required: true })
    day: string;  // e.g., Monday, Tuesday, etc.
}

export const TimetableSchema = SchemaFactory.createForClass(Timetable);
