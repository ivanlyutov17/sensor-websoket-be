import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateSensorDto } from './dtos/create-sensor.dto';
import { SensorsService } from './sensor.service';

@WebSocketGateway()
export class SensorsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly sensorsService: SensorsService) {}

  @SubscribeMessage('sensorData')
  async handleSensorData(@MessageBody() data: CreateSensorDto): Promise<void> {
    if (
      typeof data.temperature !== 'number' ||
      typeof data.humidity !== 'number'
    ) {
      return;
    }

    await this.sensorsService.create(data);
    this.server.emit('sensorDataReceived', data);
  }

  @SubscribeMessage('getAllSensors')
  async handleGetAllSensors(): Promise<any> {
    return await this.sensorsService.findAll();
  }
}
