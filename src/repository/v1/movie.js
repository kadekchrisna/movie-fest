const { filter, now, isArray } = require("lodash");

class MovieRepository {

  constructor(db) {
    this.db = db;
  }

  
  async Get(params) {
    try {
      const where = {}
      if (params.id > 0) {
        where.movie_id = params.id
      }
        
      return this.db.movie.findOne({
          where: where,
      });
    } catch (error) {
        return error
    }
  }

  async Select(params) {
    try {
      let where = {}
      let include = []
      if (params.id > 0) {
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
    try {
      params.movie_created_at = now()
      return this.db.movie.create(params);
    } catch (error) {
        return error
    } 
  }
  
  async Update(params) {
    try {
      return this.db.movie.update(params,{
        where: {
          movie_id: params.movie_id
        }
      });
    } catch (error) {
        return error
    } 
  }
}


module.exports = MovieRepository;