declare class ScreenDto {
    refresh_rate?: string;
    technology?: string;
    resolution?: string;
    size?: string;
    brightness?: string;
}
declare class CameraDto {
    resolution?: string;
    features?: string[];
}
declare class BatteryDto {
    capacity?: string;
    fast_charge?: string;
    wireless_charge?: boolean;
}
export declare class CreateSpecificationDto {
    product_name: string;
    screen?: ScreenDto;
    camera_rear?: CameraDto;
    camera_front?: CameraDto;
    battery?: BatteryDto;
}
export {};
