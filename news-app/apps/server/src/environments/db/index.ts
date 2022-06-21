import {
  initDiscussionCategoryTableNoSql,
  initDiscussionCategoryTableSQL,
  initDiscussionPostTableNOSQL,
  initDiscussionPostTableSQL,
  initDiscussionTopicTable,
  initDiscussionTopicTableNoSql,
  initSubscriptionTableSQL,
  initUserTableNoSQL,
  initUserTableSQL,
  initUserVoteTableSQL,
} from '@news-app/api-model';
import { Sequelize } from 'sequelize';
import { connect, connection } from 'mongoose';

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
  initSubscriptionTableSQL(sequelize)
  initDiscussionCategoryTableSQL(sequelize);
  initDiscussionTopicTable(sequelize);
  initDiscussionPostTableSQL(sequelize);
  initUserVoteTableSQL(sequelize);

  await sequelize.sync({ force: true });
}

export async function initNoSqlDb() {
  await connect('mongodb://mongo:27017', {
    dbName: 'news_app',
    user: 'user',
    pass: 'password',
  });
  initUserTableNoSQL();
  initDiscussionCategoryTableNoSql();
  initDiscussionTopicTableNoSql();
  initDiscussionPostTableNOSQL();
}