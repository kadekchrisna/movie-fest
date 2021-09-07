const { filter, now, isArray } = require("lodash");

class MovieRepository {

  constructor(db) {
    this.db = db;
  }

  
  async Get(params) {
    try {
      const where = {}
      if (typeof params.id == "number" && params.id > 0) {
        where.movie_id = params.id
      }
        
      return this.db.movie.findOne({
          where: where,
      });
    } catch (error) {
      throw error
    }
  }

  async Select(params) {
    try {
      let where = {}
      let include = []
      if (typeof params.id == "number" && params.id > 0) {
        where = {
          ...where,
          ...{movie_id :params.id}
        }
      }


      if (typeof params.search == "string" && params.search != '' ) {
        const orSearch = []
        orSearch.push(
          {
            movie_title: {
              [this.db.Sequelize.Op.substring]: params.search
            }
          },{
            movie_desc: {
              [this.db.Sequelize.Op.substring]: params.search
            }
          }
        )

        if (typeof params.isWithGenre == "boolean" ) {
          orSearch.push({
            '$genres.genre_name$': {
              [this.db.Sequelize.Op.substring]: params.search
            }
          })
        }

        if (typeof params.isWithArtist == "boolean" ) {
          orSearch.push({
            '$artists.artist_name$': {
              [this.db.Sequelize.Op.substring]: params.search
            }
          })
        }


        where = {
          ...where,
          ...{
            [this.db.Sequelize.Op.or]: orSearch
          }
        }
      }

      if (isArray(params.movieIDs) && params.movieIDs.length > 0 ) {
        where = {
          ...where,
          ...{
            movie_id: {
              [this.db.Sequelize.Op.in]: params.movieIDs
            }
          }
        }
      }

      if (typeof params.isWithArtist == "boolean") {
        include.push(
          {
            model: this.db.artist,
            as: "artists",
            required: true,
            through:{
              attributes: [],
            },
          })
      }

      let order = [['movie_title', 'ASC']]
      if (typeof params.isCustomOrder == "boolean") {
        if (isArray(params.movieIDs) && params.movieIDs.length > 0 ) {
          order = this.db.Sequelize.literal("FIELD(movie_id,"+params.movieIDs.join(',')+")")
        }
      }

      if (typeof params.isWithGenre == "boolean") {
        include.push(
          {
            model: this.db.genre,
            as: "genres",
            required: true,
            through:{
              attributes: [],
            },
          })
      }
        
      const query = {
        where: where,
        include: include,
        order: order
      }

      if (typeof params.noLimit != "boolean") {
        query.offset = params.offset
        query.limit = params.limit
      }

      return this.db.movie.findAll(query);
    } catch (error) {
        throw error
    }
  }
  
  async Create(params) {
    const t = await this.db.sequelize.transaction()
    try {
      params.movie_created_at = now()
      const movie = await this.db.movie.create(params.movie, {
        transaction: t,
        returning: true,
      })

      const genres = await this.db.genre.bulkCreate(params.genre, {
        transaction: t,
        returning: true,
      });
      const artists = await this.db.artist.bulkCreate(params.artist, {
        transaction: t,
        returning: true,
      });
      
      const movieGenres = []
      genres.forEach(genre => {
        movieGenres.push({
          movie_genre_movie_id: movie.movie_id,
          movie_genre_genre_id: genre.genre_id
        })
      })
      
      const movieArtist = []
      artists.forEach(artist => {
        movieArtist.push({
          movie_artist_movie_id: movie.movie_id,
          movie_artist_artist_id: artist.artist_id
        })
      })

      await Promise.all([
        this.db.movieGenre.bulkCreate(movieGenres, {transaction: t}),
        this.db.movieArtist.bulkCreate(movieArtist, {transaction: t})
      ])

      await t.commit()
      return null
    } catch (error) {
        await t.rollback()
        throw error
    } 
  }
  
  async Update(params) {
    const t = await this.db.sequelize.transaction()
    try {
      params.movie.movie_updated_at = now()
      await this.db.movie.update(params.movie, {
        where: {
          movie_id: params.movie.movie_id
        },
        transaction: t,
      })

      await Promise.all([
        this.db.genre.bulkCreate(params.genres, {
          transaction: t, 
          updateOnDuplicate: ["genre_name"], 
        }),
        this.db.artist.bulkCreate(params.artists, {
          transaction: t,
          updateOnDuplicate: ["artist_name"],
        })
      ])

      await t.commit()
      return null
    } catch (error) {
      await t.rollback()
      console.log(error);
      throw error
    } 
  }
}


module.exports = MovieRepository;