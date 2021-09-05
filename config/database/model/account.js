/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      "account",
      {
        account_id: {
          type: DataTypes.INTEGER(10),
          primaryKey: true,
          autoIncrement: true,
        },
        account_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        account_email: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        account_password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        account_created_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        tableName: "account",
        timestamps: false,
      }
    );
  };
  