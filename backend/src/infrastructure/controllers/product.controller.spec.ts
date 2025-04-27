
import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from '../../application/services/product.service';
import { Product } from '../../domain/entities/product.entity';
import { NotFoundException } from '@nestjs/common';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [{ id: 1, name: 'Product A', price: 100 }];
      mockService.findAll.mockResolvedValue(products);

      expect(await controller.findAll()).toEqual(products);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product if found', async () => {
      const product = { id: 1, name: 'Product A', price: 100 };
      mockService.findOne.mockResolvedValue(product);

      expect(await controller.findOne(1)).toEqual(product);
      expect(mockService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if product not found', async () => {
      mockService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a product', async () => {
      const product = { id: 1, name: 'Product A', price: 100 };
      mockService.create.mockResolvedValue(product);

      expect(await controller.create(product as Product)).toEqual(product);
      expect(mockService.create).toHaveBeenCalledWith(product);
    });
  });

  describe('update', () => {
    it('should update and return the updated product', async () => {
      const product = { id: 1, name: 'Product A', price: 100 };
      mockService.update.mockResolvedValue(product);

      expect(await controller.update(1, product as Product)).toEqual(product);
      expect(mockService.update).toHaveBeenCalledWith(1, product);
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      mockService.delete.mockResolvedValue(undefined);

      expect(await controller.delete(1)).toBeUndefined();
      expect(mockService.delete).toHaveBeenCalledWith(1);
    });
  });
});