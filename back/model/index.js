import dotenv from 'dotenv';

import pkg from 'sequelize';

dotenv.config();

const createConnectionPool = () => {
  const { Sequelize } = pkg;

  return new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.PASSWORD,
    {
      host: process.env.HOST,
      dialect: process.env.DATABASE_DIALECT,
      port: process.env.PORT,
      pool: {
        max: Number(process.env.MAX_CONNECTION_COUNT),
        min: Number(process.env.MIN_CONNECTION_COUNT),
        acquire: process.env.ACQUIRE_MILESECOND,
        idle: process.env.IDEL_MILESECOND,
      },
    },
  );
};

const getConnectionPool = () => {
  return createConnectionPool();
};

export default getConnectionPool;