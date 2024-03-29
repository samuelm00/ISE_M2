/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { apiRouter } from './app/routes';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { initNoSqlDb, initSqlDb } from './environments/db';
import { fillSqlDb } from './app/db-filler/sql';

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

const port = process.env.port || 3333;
const server = app.listen(port, async () => {
  await initSqlDb();
  console.log('SQL DB initialized');
  await fillSqlDb();
  console.log('Finished filling the SQL DB');

  await initNoSqlDb();
  console.log('NoSQL DB initialized');

  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
