import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  list() {
    return this.productsService.listProducts();
  }

  @Post()
  create(
    @Body()
    body: { artistId?: string; title: string; description?: string; priceInINR: number; stockQty?: number; imageUrl?: string },
  ) {
    return this.productsService.createProduct(body);
  }
}