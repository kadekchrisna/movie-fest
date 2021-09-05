const { filter, now } = require("lodash");
const { Op } = require("sequelize");
const artist = require("../../../config/database/model/artist");

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
      if (params.id > 0) {
        where = {
          ...where,
          ...{movie_id :params.id}
        }
      }


      if (params.search != '') {
        where = {
          ...where,
          ...{
            [Op.or]: [
              {
                movie_title: {
                  [Op.substring]: params.search
                }
              },{
                movie_desc: {
                  [Op.substring]: params.search
                }
              }
            ]
          }
        }
      }
        
      return this.db.movie.findAll({
          offset: params.offset,
          limit: params.limit,
          where: where,
      });
    } catch (error) {
        return error
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