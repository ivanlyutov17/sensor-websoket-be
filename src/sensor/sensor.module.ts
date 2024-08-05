import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorsController } from './sensor.controller';
import { SensorsService } from './sensor.service';
import { Sensor, SensorSchema } from './schemas/sensor.schema';
import { SensorsGateway } from './sensor.gateway'; // Import the gateway

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sensor.name, schema: SensorSchema }]),
  ],
  controllers: [SensorsController],
  providers: [SensorsService, SensorsGateway],
})
export class SensorsModule {}
