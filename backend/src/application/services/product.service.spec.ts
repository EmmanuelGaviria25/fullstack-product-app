import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../../domain/entities/product.entity';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let service: ProductService;

  const mockProductRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    describe('findAll', () => {
      it('should return an array of products', async () => {
        const products = [{ id: 1, name: 'Product A', price: 100 }];
        mockProductRepository.find.mockResolvedValue(products);

        expect(await service.findAll()).toEqual(products);
        expect(mockProductRepository.find).toHaveBeenCalled();
      });
    });

    describe('findOne', () => {
      it('should return a product if found', async () => {
        const product = { id: 1, name: 'Product A', price: 100 };
        mockProductRepository.findOneBy.mockResolvedValue(product);

        expect(await service.findOne(1)).toEqual(product);
        expect(mockProductRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      });

      it('should throw NotFoundException if product not found', async () => {
        mockProductRepository.findOneBy.mockResolvedValue(null);

        await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
      });
    });

    describe('create', () => {
      it('should create and return a product', async () => {
        const product = { id: 1, name: 'Product A', price: 100 };
        mockProductRepository.save.mockResolvedValue(product);

        expect(await service.create(product as Product)).toEqual(product);
        expect(mockProductRepository.save).toHaveBeenCalledWith(product);
      });
    });

    describe('update', () => {
      it('should update and return the updated product', async () => {
        const product = { id: 1, name: 'Product A', price: 100 };
        mockProductRepository.update.mockResolvedValue(undefined);
        jest.spyOn(service, 'findOne').mockResolvedValue(product as Product);

        expect(await service.update(1, product as Product)).toEqual(product);
        expect(mockProductRepository.update).toHaveBeenCalledWith(1, product);
      });
    });

    describe('delete', () => {
      it('should delete a product', async () => {
        mockProductRepository.delete.mockResolvedValue(undefined);

        expect(await service.delete(1)).toBeUndefined();
        expect(mockProductRepository.delete).toHaveBeenCalledWith(1);
      });
    });

    it('should return all products', async () => {
      const products = [{ id: 1, name: 'Test Product', price: 100, stock: 10 }];
      mockProductRepository.find.mockResolvedValue(products);

      expect(await service.findAll()).toEqual(products);
    });
  });
});
