import { Injectable, NotFoundException } from '@nestjs/common'
import { createMovieDto } from './dto/create-movie.dto'
import { Movie } from './entity/movies.entitiy'

const movies = [
  {
    id: 1,
    title: 'test',
    year: 1996,
    genres: ['sd', 'sadf'],
  },
]

@Injectable()
export class MoviesService {
  getAllMovies(): Movie[] {
    return movies
  }

  getOneMovie(movieId: number): Movie {
    const movie = movies.find((movie) => movie.id === movieId)
    if (!movie)
      throw new NotFoundException(`movie not found with the id ${movieId}`)
    return movie
  }

  createMovie(movie: createMovieDto) {
    movies.push({
      id: movies.length + 1,
      ...movie,
    })
  }
}
