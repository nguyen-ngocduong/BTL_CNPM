import { Category } from './../../category/entities/category.entity';
import { Image } from './../../image/entities/image.entity';
import { CartItem } from './../../user/entities/cartItem.entity';
import { Variant } from './../../variant/entities/variant.entity';
import { Specification } from 'src/specification/entities/specification.entity';
import { Comment } from 'src/comment/entities/comment.entity';
export declare class Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    isNew: boolean;
    isActive: boolean;
    isPopular: boolean;
    category: Category;
    images: Image[];
    variants: Variant[];
    cartItems: CartItem[];
    createdDate: Date;
    updatedDate: Date;
    Specifications: Specification[];
    comments: Comment[];
}
