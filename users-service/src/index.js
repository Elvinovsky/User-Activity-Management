import { listenServer } from './app.js';
import { runDb } from './runDB.js';

const startApp = async () => {
  try {
    await runDb();
    await listenServer();
  } catch {
    console.log('error startApp');
  }
};

startApp();
