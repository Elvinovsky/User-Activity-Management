import express from 'express';
import { config } from './users/infrastructure/config/configuration.js';
import { usersRouter } from './users/api/users.router.js';

const bodyParser = express.json();
const app = express();
const port = config.PORT;

app.use(bodyParser);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const listenServer = async () => {
  await app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
};
export { app, listenServer };
