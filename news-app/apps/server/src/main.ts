/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { apiRouter } from './app/routes';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.get('/halo', (req, res) => {
  console.log('hrejdklfjlks');
  return res.json({
    message: 'Halo',
  });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
