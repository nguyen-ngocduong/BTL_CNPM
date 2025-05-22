import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    createComment(productId: number, dto: CreateCommentDto): Promise<import("./entities/comment.entity").Comment>;
    getComments(productId: number): Promise<import("./entities/comment.entity").Comment[]>;
}
