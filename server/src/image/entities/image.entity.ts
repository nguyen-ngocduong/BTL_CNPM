import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './../../product/entities/product.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  publicId: string;

  @Column({ nullable: false })
  url: string;

  @ManyToOne(() => Product, (product) => product.images, {
<<<<<<< HEAD
    cascade: true,
=======
    // Removed cascade to avoid duplicate key error on save
>>>>>>> triuduongg
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  product: Product;
}
