import { Injectable, NotFoundException } from '@nestjs/common'
import { createMovieDto } from './dto/create-movie.dto'
import { updateMovieDto } from './dto/update-movie.dto'
import { Movie } from './entity/movies.entitiy'

@Injectable()
export class MoviesService {
  private movies: Movie[] = []

  getAllMovies(): Movie[] {
    return this.movies
  }

  getOneMovie(movieId: number): Movie {
    const movie = this.movies.find((movie) => movie.id === movieId)
    if (!movie)
      throw new NotFoundException(`movie not found with the id ${movieId}`)
    return movie
  }

  createMovie(movie: createMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movie,
    })
  }

  deleteMovie(movieId: number) {
    this.movies = this.movies.filter((movie) => movie.id !== movieId)
  }

  updateMovie(movieId: number, movieData: updateMovieDto) {
    const movie = this.getOneMovie(movieId)
    this.deleteMovie(movieId)
    this.movies.push({
      ...movie,
      ...movieData,
    })
  }
}
