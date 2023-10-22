import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT_USER,
  REMOTE_DB_URI:
    'postgres://Elvinovsky:nXHKtfSpU1g3@ep-hidden-wood-23954592.us-east-2.aws.neon.tech/neondb',
  dialectOptions: {
    ssl: {
      require: true, // Включение SSL
      rejectUnauthorized: false, // Временное решение для самоподписанных сертификатов
    },
  },
};
