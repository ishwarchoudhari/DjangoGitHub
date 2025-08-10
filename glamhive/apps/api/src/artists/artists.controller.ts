import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArtistsService } from './artists.service';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  list() {
    return this.artistsService.listArtists();
  }

  @Post()
  create(@Body() body: { userId: string; displayName: string; bio?: string }) {
    return this.artistsService.createArtist(body);
  }
}