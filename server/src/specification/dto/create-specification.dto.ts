import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  ValidateNested,
  IsBoolean,
} from 'class-validator';

<<<<<<< HEAD
class ScreenDto {
  @IsOptional()
  @IsString()
  refresh_rate?: string;

=======
export class CreateSpecificationDto {
  @IsOptional()
  @IsString()
  product_name?: string;

  @IsOptional()
  productId?: number;
  
  @IsOptional()
  @IsString()
  refresh_rate?: string;
  
>>>>>>> triuduongg
  @IsOptional()
  @IsString()
  technology?: string;

  @IsOptional()
  @IsString()
  resolution?: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsString()
  brightness?: string;
<<<<<<< HEAD
}

class CameraDto {
  @IsOptional()
  @IsString()
  resolution?: string;

  @IsOptional()
  @IsString({ each: true })
  features?: string[];
}

class BatteryDto {
  @IsOptional()
=======

  @IsOptional()
  @IsString()
  features?: string;

  @IsOptional()
>>>>>>> triuduongg
  @IsString()
  capacity?: string;

  @IsOptional()
  @IsString()
  fast_charge?: string;

  @IsOptional()
<<<<<<< HEAD
  @IsBoolean()
  wireless_charge?: boolean;
}

export class CreateSpecificationDto {
  @IsString()
  product_name: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ScreenDto)
  screen?: ScreenDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CameraDto)
  camera_rear?: CameraDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CameraDto)
  camera_front?: CameraDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => BatteryDto)
  battery?: BatteryDto;
=======
  @IsString()
  wireless_charge?: string;

  @IsOptional()
  @IsString()
  chipset?: string;

  @IsOptional()
  @IsString()
  ram?: string;

  @IsOptional()
  @IsString()
  storage?: string;

  @IsOptional()
  @IsString()
  name?: string; // Hệ điều hành (VD: iOS 17)

  @IsOptional()
  @IsString()
  version?: string;

  @IsOptional()
  @IsString()
  sim?: string;
  
  @IsOptional()
  @IsString()
  wifi?: string;

  @IsOptional()
  @IsString()
  bluetooth?: string;

  @IsOptional()
  @IsString()
  gps?: string;

  @IsOptional()
  @IsString()
  nfc?: string;

  @IsOptional()
  @IsString()
  material?: string;

  @IsOptional()
  @IsString()
  weight?: string;

  @IsOptional()
  @IsString()
  dimensions?: string;

  @IsOptional()
  @IsString()
  waterproof?: string;

  @IsOptional()
  @IsString()
  speaker?: string;

  @IsOptional()
  @IsString()
  jack?: string;

  @IsOptional()
  @IsString()
  sensors?: string;
>>>>>>> triuduongg
}
