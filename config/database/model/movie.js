/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const movie =  sequelize.define(
    "movie",
    {
      movie_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
      movie_title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      movie_desc: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      movie_file: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      movie_duration: {
        type: DataTypes.INTEGER(100),
        allowNull: false,
      },
      movie_created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      movie_updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "movie",
      timestamps: false,
    }
  );

  movie.associate = function (models) {
    movie.belongsToMany(models.artist, {
      as: 'artists',
      through: 'movieArtist',
      foreignKey: 'movie_artist_movie_id',
      otherKey: 'movie_artist_artist_id',
    });

    movie.belongsToMany(models.genre, {
      as: 'genres',
      through: 'movieGenre',
      foreignKey: 'movie_genre_movie_id',
      otherKey: 'movie_genre_genre_id',
    });
  };
  return movie
};
