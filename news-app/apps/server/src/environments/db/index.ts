import {
  initDiscussionCategoryTableSQL,
  initDiscussionTopicTable,
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
  await initUserTableSQL(sequelize);
  await initDiscussionCategoryTableSQL(sequelize);
  await initDiscussionTopicTable(sequelize);
}

export async function initNoSqlDb() {
  console.log('Nosql not yet defined');
}
