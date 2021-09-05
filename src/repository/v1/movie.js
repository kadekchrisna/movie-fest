const { filter } = require("lodash");

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
}


module.exports = MovieRepository;