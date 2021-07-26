import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { createMovieDto } from './dto/create-movie.dto'
import { updateMovieDto } from './dto/update-movie.dto'
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
  getOneMoive(@Param('id') movieId: number): Movie {
    return this.moviesService.getOneMovie(movieId)
  }

  @Post()
  createMovie(@Body() movie: createMovieDto) {
    return this.moviesService.createMovie(movie)
  }

  @Delete(':id')
  deleteMoive(@Param('id') movieId: number) {
    return this.moviesService.deleteMovie(movieId)
  }

  @Patch(':id')
  updateMovie(@Param('id') movieId: number, @Body() movieData: updateMovieDto) {
    return this.moviesService.updateMovie(movieId, movieData)
  }
}
