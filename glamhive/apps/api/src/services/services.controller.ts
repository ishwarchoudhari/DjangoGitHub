import { Body, Controller, Get, Post } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  list() {
    return this.servicesService.listServices();
  }

  @Post()
  create(
    @Body()
    body: { artistId: string; name: string; description?: string; priceInINR: number; durationMin: number },
  ) {
    return this.servicesService.createService(body);
  }
}