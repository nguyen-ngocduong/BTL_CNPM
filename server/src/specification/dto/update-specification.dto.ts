import { IsOptional, IsString } from 'class-validator';

export class UpdateSpecificationDto {
  @IsOptional()
  @IsString()
  product_name?: string;
<<<<<<< HEAD

  @IsOptional()
  screen?: Record<string, any>;

  @IsOptional()
  camera_rear?: Record<string, any>;

  @IsOptional()
  camera_front?: Record<string, any>;

  @IsOptional()
  battery?: Record<string, any>;
=======
  
  @IsOptional()
  @IsString()
  refresh_rate?: string;
  
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

  @IsOptional()
  @IsString()
  features?: string;

  @IsOptional()
  @IsString()
  capacity?: string;

  @IsOptional()
  @IsString()
  fast_charge?: string;

  @IsOptional()
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
