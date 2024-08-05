import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SensorsService } from './sensor.service';
import { CreateSensorDto, IdParamDTO } from './dtos/create-sensor.dto';
import { Sensor } from './schemas/sensor.schema';

@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  // Create a new sensor
  @Post()
  async create(@Body() createSensorDto: CreateSensorDto): Promise<Sensor> {
    return this.sensorsService.create(createSensorDto);
  }

  // Get all sensors
  @Get()
  async findAll(): Promise<Sensor[]> {
    return this.sensorsService.findAll();
  }

  // Get a sensor by ID
  @Get(':id')
  async findOne(@Param('id') { id }: IdParamDTO): Promise<Sensor> {
    return this.sensorsService.findOne(id);
  }

  // Update a sensor by ID
  @Put(':id')
  async update(
    @Param('id') { id }: IdParamDTO,
    @Body() updateSensorDto: CreateSensorDto,
  ): Promise<Sensor> {
    return this.sensorsService.update(id, updateSensorDto);
  }

  // Delete a sensor by ID
  @Delete(':id')
  async remove(@Param('id') { id }: IdParamDTO): Promise<void> {
    return this.sensorsService.remove(id);
  }
}
