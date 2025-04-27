import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Customer } from './customer.entity';
import { Product } from './product.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string; // PENDING, SUCCESS, FAILED

  @Column('decimal')
  amount: number;

  @ManyToOne(() => Customer, (customer) => customer.transactions)
  customer: Customer;

  @ManyToOne(() => Product, (product) => product.transactions)
  product: Product;
}
