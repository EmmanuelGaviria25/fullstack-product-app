import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryService } from './delivery.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Delivery } from '../../domain/entities/delivery.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('DeliveryService', () => {
  let service: DeliveryService;
  let repository: Repository<Delivery>;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeliveryService,
        {
          provide: getRepositoryToken(Delivery),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DeliveryService>(DeliveryService);
    repository = module.get<Repository<Delivery>>(getRepositoryToken(Delivery));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of deliveries', async () => {
      const deliveries = [{ id: 1, address: '123 Street' }];
      mockRepository.find.mockResolvedValue(deliveries);

      expect(await service.findAll()).toEqual(deliveries);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a delivery if found', async () => {
      const delivery = { id: 1, address: '123 Street' };
      mockRepository.findOne.mockResolvedValue(delivery);

      expect(await service.findOne(1)).toEqual(delivery);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['transaction'] });
    });

    it('should throw NotFoundException if delivery not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a delivery', async () => {
      const product = { id: 1, name: 'Product A', price: 100, stock: 10 };
      const customer = { id: 1, name: 'John Doe', email: 'john@example.com', address: '456 Avenue' };
      const transaction = { id: 1, product, customer, amount: 100, status: 'COMPLETED' };
      const delivery = { id: 1, address: '123 Street', transaction, deliveryDate: new Date(), status: 'PENDING' };
      mockRepository.save.mockResolvedValue(delivery);

      expect(await service.create(delivery as Delivery)).toEqual(delivery);
      expect(mockRepository.save).toHaveBeenCalledWith(delivery);
    });
  });

  describe('update', () => {
    it('should update and return the updated delivery', async () => {
      const product = { id: 1, name: 'Product A', price: 100, stock: 10 };
      const customer = { id: 1, name: 'John Doe', email: 'john@example.com', address: '456 Avenue' };
      const transaction = { id: 1, product, customer, amount: 100, status: 'COMPLETED' };
      const delivery = { id: 1, address: '123 Street', transaction, deliveryDate: new Date(), status: 'PENDING' };
      mockRepository.update.mockResolvedValue(undefined);
      jest.spyOn(service, 'findOne').mockResolvedValue(delivery as Delivery);

      expect(await service.update(1, delivery as Delivery)).toEqual(delivery);
      expect(mockRepository.update).toHaveBeenCalledWith(1, delivery);
    });
  });

  describe('delete', () => {
    it('should delete a delivery', async () => {
      mockRepository.delete.mockResolvedValue(undefined);

      expect(await service.delete(1)).toBeUndefined();
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});