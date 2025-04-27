import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from '../../domain/entities/delivery.entity';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
  ) {}

  findAll(): Promise<Delivery[]> {
    return this.deliveryRepository.find();
  }

  findOne(id: number): Promise<Delivery> {
    return this.deliveryRepository.findOneBy({ id }).then((delivery) => {
      if (!delivery) {
        throw new Error(`Delivery with id ${id} not found`);
      }
      return delivery;
    });
  }

  create(delivery: Partial<Delivery>): Promise<Delivery> {
    const newDelivery = this.deliveryRepository.create(delivery);
    return this.deliveryRepository.save(newDelivery);
  }

  update(id: number, delivery: Partial<Delivery>): Promise<Delivery> {
    return this.deliveryRepository.save({ ...delivery, id });
  }

  delete(id: number): Promise<void> {
    return this.deliveryRepository.delete(id).then(() => undefined);
  }
}
