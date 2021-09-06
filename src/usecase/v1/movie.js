const Pagination = require('../../../config/util/pagination')

class MovieUsecase {
  constructor(
    movieRepo,
    movieViewsRepo,
    ) {
    this.movieRepo = movieRepo;
    this.movieViewsRepo = movieViewsRepo;
  }
    
  async ViewMovieDetail(id) {
    try {
      const movie = await this.movieRepo.Get({id: id})
      return movie
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
    
  async ViewMovieList(params) {
    try {
      const baseFilter = Pagination.util.defaultPaginate(params)
      const movies = await this.movieRepo.Select({
        limit: baseFilter.limit,
        offset: baseFilter.offset,
        search: params.search,
        isWithGenre: true,
        isWithArtist: true,
      })

      return Pagination.util.paginate({data: movies, limit: baseFilter.limit, page: baseFilter.page})
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
    
  async CreateMovie(params) {
    try {
      return this.movieRepo.Create(params)
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
    
  async UpdateMovie(params) {
    try {
      return this.movieRepo.Update(params)
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
    
  async ViewTrendingMovie() {
    try {
      const orderdMovies = await this.movieViewsRepo.CountMovie({
        group: 'movie_views_movie_id',
        limit: 10,
        offset: 0
      })

      let orderedMovieIDs = []
      orderdMovies.forEach(movie => {
        orderedMovieIDs.push(movie.movie_views_movie_id)
      });

      const movies = await this.movieRepo.Select({
        noLimit: true,
        isWithGenre: true,
        movieIDs: orderedMovieIDs,
        isCustomOrder: true
      })

      let result = {
        movie: movies,
        genre: []
      }

      let trendingGenre = []
      movies.forEach(movieDetails => {
        movieDetails.genres.forEach(movieDetail => {
          trendingGenre.push({
            genre_id: movieDetail.genre_id,
            genre_name: movieDetail.genre_name
          })
        });
      });

      var flags = [], l = trendingGenre.length, i;
      const uniqueGenre = []
      for( i=0; i<l; i++) {
        if( flags[trendingGenre[i].genre_id]) continue;
        flags[trendingGenre[i].genre_id] = true;
        uniqueGenre.push(trendingGenre[i]);

      };

      result.genre = uniqueGenre
      return  result
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
    
  async ViewWatchedMovie(params) {
    try {
      const watchedMovies = await this.movieViewsRepo.Select({
        accountID: +params.accountID,
      })

      let watchedMovieIDs = []
      watchedMovies.forEach(movie => {
        watchedMovieIDs.push(movie.movie_views_movie_id)
      });

      const movies = await this.movieRepo.Select({
        noLimit: true,
        movieIDs: watchedMovieIDs,
      })

      return  movies
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = MovieUsecase;