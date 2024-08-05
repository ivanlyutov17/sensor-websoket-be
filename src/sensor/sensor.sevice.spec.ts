import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sensor } from './schemas/sensor.schema';
import { SensorsService } from './sensor.service';

describe('SensorsService', () => {
  let service: SensorsService;
  let model: Model<Sensor>;

  const mockSensor = {
    temperature: 25,
    humidity: 60,
    timestamp: new Date(),
  };

  const mockSensor2 = {
    temperature: 251,
    humidity: 60,
    timestamp: new Date(),
  };

  const sensorsArray = [mockSensor, mockSensor2];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SensorsService,
        {
          provide: getModelToken(Sensor.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockSensor),
            constructor: jest.fn().mockResolvedValue(mockSensor),
            find: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValueOnce(sensorsArray),
            }),
            create: jest.fn().mockResolvedValue(mockSensor),
          },
        },
      ],
    }).compile();

    service = module.get<SensorsService>(SensorsService);
    model = module.get<Model<Sensor>>(getModelToken(Sensor.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new sensor record', async () => {
    expect(await service.create(mockSensor)).toEqual(mockSensor);
  });

  it('should return all sensor records', async () => {
    expect(await service.findAll()).toEqual(sensorsArray);
  });
});
