import {
  initDiscussionCategoryTableSQL,
  initDiscussionPostTableSQL,
  initDiscussionTopicTable,
  initUserTableSQL,
  initUserVoteTableSQL,
} from '@news-app/api-model';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('news_app', 'root', 'password', {
  host: 'mysql',
  dialect: 'mysql',
  port: 3306,
  define: {
    freezeTableName: true,
  },
});

export async function initSqlDb() {
  initUserTableSQL(sequelize);
  initDiscussionCategoryTableSQL(sequelize);
  initDiscussionTopicTable(sequelize);
  initDiscussionPostTableSQL(sequelize);
  initUserVoteTableSQL(sequelize);

  await sequelize.sync({ force: true });
}

export async function initNoSqlDb() {
  console.log('Nosql not yet defined');
}
