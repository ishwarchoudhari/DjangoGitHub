import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  list() {
    return this.bookingsService.listBookings();
  }

  @Post()
  create(
    @Body()
    body: {
      userId: string;
      artistId: string;
      serviceId: string;
      startTime: string;
      endTime: string;
      notes?: string;
    },
  ) {
    return this.bookingsService.createBooking(body);
  }
}