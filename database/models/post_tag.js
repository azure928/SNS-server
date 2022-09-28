const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'post_tag',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'posts',
          key: 'id',
        },
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'tags',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'post_tag',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'post_id',
          using: 'BTREE',
          fields: [{ name: 'post_id' }],
        },
        {
          name: 'tag_id',
          using: 'BTREE',
          fields: [{ name: 'tag_id' }],
        },
      ],
    }
  );
};
