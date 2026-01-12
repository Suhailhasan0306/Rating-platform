module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(60), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    address: { type: DataTypes.STRING(400), allowNull: true },
    role: { type: DataTypes.ENUM('ADMIN','USER','STORE_OWNER'), allowNull: false, defaultValue: 'USER' }
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: true
  });
  return User;
};
