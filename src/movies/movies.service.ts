import { Injectable } from '@nestjs/common'
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
}
