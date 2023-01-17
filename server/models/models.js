import sequelize from '../db.js';
import {DataTypes} from 'sequelize';

export const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  role: {type: DataTypes.STRING, defaultValue: 'CLIENT'},
  login: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  firstName: {type: DataTypes.STRING, allowNull: false},
  lastName: {type: DataTypes.STRING, allowNull: false},
  phone: {type: DataTypes.INTEGER, allowNull: false},
  email: {type: DataTypes.STRING, allowNull: false},
});

export const Order = sequelize.define('order', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  date: {type: DataTypes.STRING, allowNull: false},
  userId:{type: DataTypes.INTEGER, allowNull: false},
  workerId: {type: DataTypes.INTEGER, allowNull: false},
});

export const Review = sequelize.define('review', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  userId: {type: DataTypes.INTEGER, allowNull: false},
  text: {type: DataTypes.STRING, allowNull: false},
});

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

export default {User, Review, Order};
