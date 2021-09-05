
module.exports = function (sequelize, DataTypes) {
    const movieViews =  sequelize.define(
      "movieViews",
      {
        movie_views_id: {
          type: DataTypes.INTEGER(10),
          primaryKey: true,
          autoIncrement: true,
        },
        movie_views_movie_id: {
          type: DataTypes.INTEGER(10),
        },
        movie_views_account_id: {
          type: DataTypes.INTEGER(10),
        }
      },
      {
        tableName: "movie_views",
        timestamps: false,
      }
    );

    movieViews.associate = function (models) {
        movieViews.belongsTo(models.movie, {
          foreignKey: 'movie_views_movie_id'
        });
        movieViews.belongsTo(models.account, {
          foreignKey: 'movie_views_account_id',
        });
    };
    return movieViews
  };
  