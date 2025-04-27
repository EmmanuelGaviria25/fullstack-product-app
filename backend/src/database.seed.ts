import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductService } from './application/services/product.service';
import { Product } from './domain/entities/product.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const productService = app.get(ProductService);

  // Datos dummy para productos
  const products: Partial<Product>[] = [
    { name: 'Producto 1', price: 100, stock: 10 },
    { name: 'Producto 2', price: 200, stock: 20 },
    { name: 'Producto 3', price: 300, stock: 30 },
  ];

  for (const product of products) {
    await productService.create(product as Product);
  }

  console.log('Datos iniciales insertados correctamente.');
  await app.close();
}

bootstrap();
