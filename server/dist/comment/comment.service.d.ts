import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Product } from 'src/product/entities/product.entity';
import { CreateCommentDto } from './dto/create-comment';
export declare class CommentService {
    private readonly commentRepository;
    private readonly productRepository;
    constructor(commentRepository: Repository<Comment>, productRepository: Repository<Product>);
    create(productId: number, dto: CreateCommentDto): Promise<Comment>;
    findByProduct(productId: number): Promise<Comment[]>;
}
