import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from '../../domain/entities/customer.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('CustomerService', () => {
  let service: CustomerService;
  let repository: Repository<Customer>;

  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    repository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const customers = [{ id: 1, name: 'John Doe' }];
      mockRepository.find.mockResolvedValue(customers);

      expect(await service.findAll()).toEqual(customers);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a customer if found', async () => {
      const customer = { id: 1, name: 'John Doe' };
      mockRepository.findOneBy.mockResolvedValue(customer);

      expect(await service.findOne(1)).toEqual(customer);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw NotFoundException if customer not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a customer', async () => {
      const customer = { id: 1, name: 'John Doe' };
      mockRepository.save.mockResolvedValue(customer);

      expect(await service.create(customer as Customer)).toEqual(customer);
      expect(mockRepository.save).toHaveBeenCalledWith(customer);
    });
  });

  describe('update', () => {
    it('should update and return the updated customer', async () => {
      const customer = { id: 1, name: 'John Doe' };
      mockRepository.update.mockResolvedValue(undefined);
      jest.spyOn(service, 'findOne').mockResolvedValue(customer as Customer);

      expect(await service.update(1, customer as Customer)).toEqual(customer);
      expect(mockRepository.update).toHaveBeenCalledWith(1, customer);
    });
  });

  describe('delete', () => {
    it('should delete a customer', async () => {
      mockRepository.delete.mockResolvedValue(undefined);

      expect(await service.delete(1)).toBeUndefined();
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});