import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSensorDto } from './dtos/create-sensor.dto';
import { Sensor, SensorDocument } from './schemas/sensor.schema';

@Injectable()
export class SensorsService {
  constructor(
    @InjectModel(Sensor.name)
    private readonly sensorModel: Model<SensorDocument>,
  ) {}

  async create(createSensorDto: CreateSensorDto): Promise<Sensor> {
    try {
      return await this.sensorModel.create(createSensorDto);
    } catch (error) {
      console.error('Error during data creation:', error);
      throw error; // Re-throw to be handled by the caller
    }
  }

  async findAll(): Promise<Sensor[]> {
    try {
      return await this.sensorModel.find().exec();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw to be handled by the caller
    }
  }

  // Get a sensor by ID
  async findOne(id: string): Promise<Sensor> {
    const sensor = await this.sensorModel.findById(id).exec();
    if (!sensor) {
      throw new NotFoundException(`Sensor with ID ${id} not found`);
    }
    return sensor;
  }

  // Update a sensor by ID
  async update(id: string, updateSensorDto: CreateSensorDto): Promise<Sensor> {
    const updatedSensor = await this.sensorModel.findById(id).exec();
    if (!updatedSensor) {
      throw new NotFoundException(`Sensor with ID ${id} not found`);
    }
    await this.sensorModel.updateOne({ id: updatedSensor.id }, updateSensorDto);
    return updatedSensor;
  }

  // Delete a sensor by ID
  async remove(id: string): Promise<void> {
    const result = await this.sensorModel.findById(id).exec();
    if (!result) {
      throw new NotFoundException(`Sensor with ID ${id} not found`);
    }
    await this.sensorModel.findByIdAndDelete(id);
  }
}
