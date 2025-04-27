import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../../domain/entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find({ relations: ['transactions'] });
  }

  findOne(id: number): Promise<Customer> {
    return this.customerRepository
      .findOne({
        where: { id },
        relations: ['transactions'],
      })
      .then((customer) => {
        if (!customer) {
          throw new Error(`Customer with id ${id} not found`);
        }
        return customer;
      });
  }

  create(customer: Partial<Customer>): Promise<Customer> {
    const newCustomer = this.customerRepository.create(customer);
    return this.customerRepository.save(newCustomer);
  }

  update(id: number, customer: Partial<Customer>): Promise<Customer> {
    return this.customerRepository.save({ ...customer, id });
  }

  delete(id: number): Promise<void> {
    return this.customerRepository.delete(id).then(() => undefined);
  }
}
