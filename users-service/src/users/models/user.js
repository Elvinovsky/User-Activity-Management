import Sequelize from 'sequelize';
import db from '../../runDB.js';

export const User = db.define(
  'User',
  {
    id: {
      type: Sequelize.UUID,
      default: Sequelize.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);
