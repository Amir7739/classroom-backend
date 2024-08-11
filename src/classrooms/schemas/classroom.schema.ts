import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClassroomDocument = Classroom & Document;

@Schema()
export class Classroom {
    @Prop({ required: true })
    name: string;

    @Prop({ type: String })
    teacher: string;

    @Prop({ type: [String], default: [] })
    students: string[];

    @Prop({ required: true })
    startTime: string;

    @Prop({ required: true })
    endTime: string;

    @Prop({ type: [String], required: true })
    days: string[];
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);
