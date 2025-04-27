import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { DeliveryService } from '../../application/services/delivery.service';
import { Delivery } from '../../domain/entities/delivery.entity';

@Controller('deliveries')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get()
  findAll(): Promise<Delivery[]> {
    return this.deliveryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Delivery> {
    return this.deliveryService.findOne(id);
  }

  @Post()
  create(@Body() delivery: Partial<Delivery>): Promise<Delivery> {
    return this.deliveryService.create(delivery);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() delivery: Partial<Delivery>,
  ): Promise<Delivery> {
    return this.deliveryService.update(id, delivery);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.deliveryService.delete(id);
  }
}
