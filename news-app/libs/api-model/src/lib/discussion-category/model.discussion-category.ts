import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
  DataTypes,
} from 'sequelize';
import { IDiscussionTopicProps } from '../discussion-topic/model.discussion-topic';
import { IUserComplete, User } from '../user/model.user';

/**
 * Contains the user model with all its attributes and relations.
 */
export interface IDiscussionCategoryComplete {
  id: number;
  description: string;
  name: string;
  users: IUserComplete[];
  discussionThemes: IDiscussionTopicProps[];
}

/**
 * Contains only the user model attributes without the relations.
 */
export interface IDiscussionCategoryProps
  extends Omit<IDiscussionCategoryComplete, 'users' | 'discussionThemes'> {}

/**
 * SQL
 */
export class DiscussionCategory
  extends Model<
    InferAttributes<DiscussionCategory>,
    InferCreationAttributes<DiscussionCategory>
  >
  implements IDiscussionCategoryProps
{
  declare id: CreationOptional<number>;
  declare description: string;
  declare name: string;
}

export async function initDiscussionCategoryTableSQL(sequelize: Sequelize) {
  DiscussionCategory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    { sequelize, tableName: 'discussionCategories' }
  );

  DiscussionCategory.belongsToMany(User, { through: 'subscriptions' });
  User.belongsToMany(DiscussionCategory, { through: 'subscriptions' });

  await DiscussionCategory.sync({ force: true });
}

/**
 * NOSQL
 */
