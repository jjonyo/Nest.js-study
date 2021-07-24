import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { Movie } from './entity/movies.entitiy'
import { MoviesService } from './movies.service'

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAllMovies(): Movie[] {
    return this.moviesService.getAllMovies()
  }

  @Get(':id')
  getOneMoive(@Param('id') movieId: string) {
    return `get movie with the id ${movieId}`
  }

  @Post()
  createMovie(@Body() MovieInfo) {
    return 'create Movie'
  }

  @Delete(':id')
  deleteMoive(@Param('id') movieId: string) {
    return `delete movie with the id ${movieId}`
  }
}
