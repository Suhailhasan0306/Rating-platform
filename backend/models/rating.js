module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    store_id: { type: DataTypes.BIGINT, allowNull: false },
    rating: { type: DataTypes.TINYINT, allowNull: false, validate: { min: 1, max: 5 } }
  }, {
    tableName: 'ratings',
    underscored: true,
    timestamps: true,
    indexes: [{ unique: true, fields: ['user_id', 'store_id'] }]
  });
  return Rating;
};
