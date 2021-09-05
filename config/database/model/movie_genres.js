
module.exports = function (sequelize, DataTypes) {
    const movieGenre =  sequelize.define(
      "movieGenre",
      {
        movie_genre_id: {
          type: DataTypes.INTEGER(10),
          primaryKey: true,
          autoIncrement: true,
        },
        movie_genre_movie_id: {
          type: DataTypes.INTEGER(10),
        },
        movie_genre_genre_id: {
          type: DataTypes.INTEGER(10),
        }
      },
      {
        tableName: "movie_genre",
        timestamps: false,
      }
    );

    movieGenre.associate = function (models) {
        movieGenre.belongsTo(models.movie, {
          foreignKey: 'movie_genre_movie_id'
        });
        movieGenre.belongsTo(models.genre, {
          foreignKey: 'movie_genre_genre_id',
        });
    };
    return movieGenre
  };
  