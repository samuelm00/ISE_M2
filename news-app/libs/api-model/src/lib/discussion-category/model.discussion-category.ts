import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { IDiscussionThemeProps } from '../discussion-theme/model.discussion-theme';
import { IUserComplete } from '../user/model.user';

/**
 * Contains the user model with all its attributes and relations.
 */
export interface IDiscussionCategoryComplete {
  id: number;
  description: string;
  name: string;
  users: IUserComplete[];
  discussionThemes: IDiscussionThemeProps[];
}

/**
 * Contains only the user model attributes without the relations.
 */
export interface IDiscussionCategoryProps
  extends Omit<IDiscussionCategoryComplete, 'users' | 'discussionTheme'> {}

/**
 * SQL
 */
export class DiscussionCategory
  extends Model<
    InferAttributes<DiscussionCategory>,
    InferCreationAttributes<DiscussionCategory>
  >
  implements Omit<IDiscussionCategoryComplete, 'discussionThemes'>
{
  declare id: CreationOptional<number>;
  declare description: string;
  declare name: string;
  declare users: IUserComplete[];
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
  await DiscussionCategory.sync({ force: true });
}

/**
 * NOSQL
 */
