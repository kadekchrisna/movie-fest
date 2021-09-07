const Pagination = require('../../../config/util/pagination')

class MovieUsecase {
  constructor(
    movieRepo,
    movieViewsRepo,
    storageRepo,
    ) {
    this.movieRepo = movieRepo;
    this.movieViewsRepo = movieViewsRepo;
    this.storageRepo = storageRepo;
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
      const data = {
        movie: {
          movie_title:params.title,
          movie_desc:params.desc,
          movie_file:params.file,
          movie_duration:params.duration,
        },
        genre: [],
        artist: [],
      }

      params.genre.forEach(genre => {
        data.genre.push({
          genre_name: genre
        })
      });

      params.artist.forEach(artist => {
        data.artist.push({
          artist_name: artist
        })
      });

      return this.movieRepo.Create(data)
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
    
  async UpdateMovie(params) {
    try {
      const movies = await this.movieRepo.Select({
        noLimit: true,
        isWithGenre: true,
        isWithArtist: true,
        id: params.movie_id,
      })

      if (movies.length == 0) {
        throw Error("movie not found")
      }
      const movie = movies[0]
      const updateGenre = []
      const updateArtist = []
      movie.genres.forEach(existingGenre => {
        params.genres.forEach(updatedGenre => {
          if (updatedGenre.genre_id == existingGenre.genre_id) {
            updateGenre.push(
              {
                genre_id: updatedGenre.genre_id,
                genre_name: updatedGenre.genre_name,
              }
            )
          }
        })
      });

      movie.artists.forEach(existingArtist => {
        params.artists.forEach(updatedArtist => {
          if (updatedArtist.artist_id == existingArtist.artist_id) {
            updateArtist.push(
              {
                artist_id: updatedArtist.artist_id,
                artist_name: updatedArtist.artist_name,
              }
            )
          }
        })
      });


      const data = {
        movie: {
          movie_title:params.movie_title,
          movie_desc:params.movie_desc,
          movie_file:params.movie_file,
          movie_duration:params.movie_duration,
          movie_id: movie.movie_id
        },
        genres: updateGenre,
        artists: updateArtist
      }

      
      return this.movieRepo.Update(data)
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
        accountID: +params.account_id,
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
    
  async GenerateUploadSignedUrl(params) {
    try {
      const url = await this.storageRepo.generateUploadSignedUrl({
        duration: 5*60,
        bucketName: process.env.BUCKET_NAME,
        fileName: 'movie/'+params.file_name 
      })

      return {
        upload_url: url,
        file_url: 'https://storage.cloud.google.com/'+process.env.BUCKET_NAME+'/movie/' + params.file_name
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = MovieUsecase;