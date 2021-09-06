


class MovieRepository {

    constructor(db) {
      this.db = db;
    }


    async Select(params) {

        try {
            let where = {}

            if (typeof params.accountID == "number" && params.accountID > 0) {
                where = {
                    ...where,
                    ...{movie_views_account_id :params.accountID}
                }
            }

            const query = {
                where: where
            }
            return this.db.movieViews.findAll(query);
        } catch (error) {
            throw error
        }
    }

    async CountMovie(params) {

        try {
            const where = {}
            let group = ''

            if (params.group != '') {
                group = params.group
            }
            
            return this.db.movieViews.findAll({
                attributes:[ 
                    'movie_views_movie_id', 
                    [this.db.Sequelize.fn('COUNT', this.db.Sequelize.fn('DISTINCT', this.db.Sequelize.col('movie_views_account_id'))), 'count']
                ],
                offset: params.offset,
                limit: params.limit,
                where: where,
                group: group,
                order: [
                    [this.db.Sequelize.literal('count DESC')]
                ]
            });
        } catch (error) {
            throw error
        }
    }
}

module.exports = MovieRepository