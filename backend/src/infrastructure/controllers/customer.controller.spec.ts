import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from '../../application/services/customer.service';
import { Customer } from '../../domain/entities/customer.entity';
import { NotFoundException } from '@nestjs/common';

describe('CustomerController', () => {
  let controller: CustomerController;
  let service: CustomerService;

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const customers = [{ id: 1, name: 'John Doe' }];
      mockService.findAll.mockResolvedValue(customers);

      expect(await controller.findAll()).toEqual(customers);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a customer if found', async () => {
      const customer = { id: 1, name: 'John Doe' };
      mockService.findOne.mockResolvedValue(customer);

      expect(await controller.findOne(1)).toEqual(customer);
      expect(mockService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if customer not found', async () => {
      mockService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a customer', async () => {
      const customer = { id: 1, name: 'John Doe' };
      mockService.create.mockResolvedValue(customer);

      expect(await controller.create(customer as Customer)).toEqual(customer);
      expect(mockService.create).toHaveBeenCalledWith(customer);
    });
  });

  describe('update', () => {
    it('should update and return the updated customer', async () => {
      const customer = { id: 1, name: 'John Doe' };
      mockService.update.mockResolvedValue(customer);

      expect(await controller.update(1, customer as Customer)).toEqual(customer);
      expect(mockService.update).toHaveBeenCalledWith(1, customer);
    });
  });

  describe('delete', () => {
    it('should delete a customer', async () => {
      mockService.delete.mockResolvedValue(undefined);

      expect(await controller.delete(1)).toBeUndefined();
      expect(mockService.delete).toHaveBeenCalledWith(1);
    });
  });
});