module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: true },
    address: { type: DataTypes.STRING(400), allowNull: true },
    owner_id: { type: DataTypes.BIGINT, allowNull: true }
  }, {
    tableName: 'stores',
    underscored: true,
    timestamps: true
  });
  return Store;
};
