import { Injectable, NotFoundException } from '@nestjs/common'
import { createMovieDto } from './dto/create-movie.dto'
import { updateMovieDto } from './dto/update-movie.dto'
import { Movie } from './entity/movies.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  getAllMovies(): Promise<Movie[]> {
    return this.moviesRepository.find()
  }

  async getOneMovie(movieId: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOne(movieId)
    if (!movie)
      throw new NotFoundException(`movie not found with the id ${movieId}`)
    return movie
  }

  async createMovie(movie: createMovieDto) {
    await this.moviesRepository.save(movie)
  }

  deleteMovie(movieId: number) {
    this.moviesRepository.delete(movieId)
  }

  updateMovie(movieId: number, movieData: updateMovieDto) {
    this.moviesRepository.update({ id: movieId }, { ...movieData })
  }
}
