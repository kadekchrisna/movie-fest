

module.exports = function (sequelize, DataTypes) {
    const movieVotes = sequelize.define(
      "movieVotes",
      {
        movie_votes_id: {
          type: DataTypes.INTEGER(10),
          primaryKey: true,
          autoIncrement: true,
        },
        movie_votes_account_id: {
          type: DataTypes.INTEGER(10),
        },
        movie_votes_movie_id: {
          type: DataTypes.INTEGER(10),
        }
      },
      {
        tableName: "movie_votes",
        timestamps: false,
      }
    );
    movieVotes.associate = function (models) {
        movieVotes.belongsTo(models.movie, {
          foreignKey: 'movie_votes_movie_id'
        });
        movieVotes.belongsTo(models.account, {
          foreignKey: 'movie_votes_account_id',
        });
    };
    return movieVotes
  };
  