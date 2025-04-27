import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id }).then((product) => {
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    });
  }

  create(product: Partial<Product>): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  update(id: number, product: Partial<Product>): Promise<Product> {
    return this.productRepository.save({ ...product, id });
  }

  delete(id: number): Promise<void> {
    return this.productRepository.delete(id).then(() => undefined);
  }
}
