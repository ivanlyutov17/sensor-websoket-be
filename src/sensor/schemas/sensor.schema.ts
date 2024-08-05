import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SensorDocument = Sensor & Document;

@Schema()
export class Sensor {
  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  humidity: number;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const SensorSchema = SchemaFactory.createForClass(Sensor);
