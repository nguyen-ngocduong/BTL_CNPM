import { Attribute } from '../../attribute/entities/attribute.entity';
import { Variant } from './../../variant/entities/variant.entity';
export declare class AttributeValue {
    id: number;
    value: string;
    attribute: Attribute;
    variants: Variant[];
}
