import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from '../../application/services/transaction.service';
import { Transaction } from '../../domain/entities/transaction.entity';
import { NotFoundException } from '@nestjs/common';

describe('TransactionController', () => {
  let controller: TransactionController;
  let service: TransactionService;

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of transactions', async () => {
      const transactions = [{ id: 1, amount: 100 }];
      mockService.findAll.mockResolvedValue(transactions);

      expect(await controller.findAll()).toEqual(transactions);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a transaction if found', async () => {
      const transaction = { id: 1, amount: 100 };
      mockService.findOne.mockResolvedValue(transaction);

      expect(await controller.findOne(1)).toEqual(transaction);
      expect(mockService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if transaction not found', async () => {
      mockService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a transaction', async () => {
      const transaction = { id: 1, amount: 100 };
      mockService.create.mockResolvedValue(transaction);

      expect(await controller.create(transaction as Transaction)).toEqual(transaction);
      expect(mockService.create).toHaveBeenCalledWith(transaction);
    });
  });

  describe('update', () => {
    it('should update and return the updated transaction', async () => {
      const transaction = { id: 1, amount: 100 };
      mockService.update.mockResolvedValue(transaction);

      expect(await controller.update(1, transaction as Transaction)).toEqual(transaction);
      expect(mockService.update).toHaveBeenCalledWith(1, transaction);
    });
  });

  describe('delete', () => {
    it('should delete a transaction', async () => {
      mockService.delete.mockResolvedValue(undefined);

      expect(await controller.delete(1)).toBeUndefined();
      expect(mockService.delete).toHaveBeenCalledWith(1);
    });
  });
});