import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TransactionService } from '../../application/services/transaction.service';
import { Transaction } from '../../domain/entities/transaction.entity';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  findAll(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Transaction> {
    return this.transactionService.findOne(id);
  }

  @Post()
  async createTransaction(@Body() createTransactionDto: Partial<Transaction>) {
    return this.transactionService.create(createTransactionDto);
  }

  @Put(':id')
  async updateTransaction(
    @Param('id') id: number,
    @Body() updateTransactionDto: any,
  ) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.transactionService.delete(id);
  }
}
