import {
  IsNumber,
  IsNotEmpty,
  Min,
  IsSemVer,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSensorDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(-273.15, { message: 'Temperature must be above absolute zero' })
  temperature: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Humidity must be a non-negative number' })
  humidity: number;
}

export class IdParamDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  id: string;
}
