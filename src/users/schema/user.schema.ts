import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../common/enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: Role })
    role: Role;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    age: string;

    @Prop({ required: true, enum: ['Male', 'Female', 'Other'] })
    gender: string;

    @Prop({ required: true })
    contact: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
