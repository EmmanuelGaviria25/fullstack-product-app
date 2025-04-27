import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from '../../application/services/delivery.service';
import { Delivery } from '../../domain/entities/delivery.entity';
import { NotFoundException } from '@nestjs/common';

describe('DeliveryController', () => {
  let controller: DeliveryController;
  let service: DeliveryService;

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryController],
      providers: [
        {
          provide: DeliveryService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<DeliveryController>(DeliveryController);
    service = module.get<DeliveryService>(DeliveryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of deliveries', async () => {
      const deliveries = [{ id: 1, address: '123 Street' }];
      mockService.findAll.mockResolvedValue(deliveries);

      expect(await controller.findAll()).toEqual(deliveries);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a delivery if found', async () => {
      const delivery = { id: 1, address: '123 Street', transaction: null, deliveryDate: new Date(), status: 'PENDING' };
      mockService.findOne.mockResolvedValue(delivery);

      expect(await controller.findOne(1)).toEqual(delivery);
      expect(mockService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if delivery not found', async () => {
      mockService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a delivery', async () => {
      const product = { id: 1, name: 'Product A', price: 100, stock: 10 };
      const customer = { id: 1, name: 'John Doe', email: 'john@example.com', address: '456 Avenue' };
      const transaction = { id: 1, product, customer, amount: 100, status: 'COMPLETED' };
      const delivery = { id: 1, address: '123 Street', transaction, deliveryDate: new Date(), status: 'PENDING' };
      mockService.create.mockResolvedValue(delivery);

      expect(await controller.create(delivery as Delivery)).toEqual(delivery);
      expect(mockService.create).toHaveBeenCalledWith(delivery);
    });
  });

  describe('update', () => {
    it('should update and return the updated delivery', async () => {
      const product = { id: 1, name: 'Product A', price: 100, stock: 10 };
      const customer = { id: 1, name: 'John Doe', email: 'john@example.com', address: '456 Avenue' };
      const transaction = { id: 1, product, customer, amount: 100, status: 'COMPLETED' };
      const delivery = { id: 1, address: '123 Street', transaction, deliveryDate: new Date(), status: 'PENDING' };
      mockService.update.mockResolvedValue(delivery);

      expect(await controller.update(1, delivery as Delivery)).toEqual(delivery);
      expect(mockService.update).toHaveBeenCalledWith(1, delivery);
    });
  });

  describe('delete', () => {
    it('should delete a delivery', async () => {
      mockService.delete.mockResolvedValue(undefined);

      expect(await controller.delete(1)).toBeUndefined();
      expect(mockService.delete).toHaveBeenCalledWith(1);
    });
  });
});