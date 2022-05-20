import {
  initDiscussionCategoryTableSQL,
  initUserTableSQL,
} from '@news-app/api-model';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('news_app', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  define: {
    freezeTableName: true,
  },
});

export async function initSqlDb() {
  await Promise.all([
    initUserTableSQL(sequelize),
    initDiscussionCategoryTableSQL(sequelize),
  ]);
}

export async function initNoSqlDb() {
  console.log('Nosql not yet defined');
}
