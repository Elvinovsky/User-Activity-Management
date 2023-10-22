import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', 'sa', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433,
});

export const runDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log('DB is connected.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;
