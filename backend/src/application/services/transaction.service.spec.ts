import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transaction } from '../../domain/entities/transaction.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('TransactionService', () => {
  let service: TransactionService;
  let repository: Repository<Transaction>;

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
        TransactionService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    repository = module.get<Repository<Transaction>>(getRepositoryToken(Transaction));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of transactions', async () => {
      const transactions = [{ id: 1, amount: 100 }];
      mockRepository.find.mockResolvedValue(transactions);

      expect(await service.findAll()).toEqual(transactions);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a transaction if found', async () => {
      const transaction = { id: 1, amount: 100 };
      mockRepository.findOne.mockResolvedValue(transaction);

      expect(await service.findOne(1)).toEqual(transaction);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['product', 'customer'] });
    });

    it('should throw NotFoundException if transaction not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a transaction', async () => {
      const transaction = { id: 1, amount: 100 };
      mockRepository.save.mockResolvedValue(transaction);

      expect(await service.create(transaction as Transaction)).toEqual(transaction);
      expect(mockRepository.save).toHaveBeenCalledWith(transaction);
    });
  });

  describe('update', () => {
    it('should update and return the updated transaction', async () => {
      const transaction = { id: 1, amount: 100 };
      mockRepository.update.mockResolvedValue(undefined);
      jest.spyOn(service, 'findOne').mockResolvedValue(transaction as Transaction);

      expect(await service.update(1, transaction as Transaction)).toEqual(transaction);
      expect(mockRepository.update).toHaveBeenCalledWith(1, transaction);
    });
  });

  describe('delete', () => {
    it('should delete a transaction', async () => {
      mockRepository.delete.mockResolvedValue(undefined);

      expect(await service.delete(1)).toBeUndefined();
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});