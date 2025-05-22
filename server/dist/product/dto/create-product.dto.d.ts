declare class CategoryDto {
    id: number;
}
declare class AttributeDto {
    id: number;
}
declare class ImageDto {
    id: number;
    publicId: string;
    url: string;
}
declare class VariantDto {
    id: number;
    price: number;
    quantity: number;
    attributeValues: AttributeDto[];
}
declare class AttributeValueDto {
    id: number;
}
export declare class CreateProductDto {
    name: string;
    slug: string;
    description: string;
    images: ImageDto[];
    variants: VariantDto[];
    isNew: boolean;
    isActive: boolean;
    isPopular: boolean;
    category: CategoryDto;
    attributeValues: AttributeValueDto[];
}
export {};
