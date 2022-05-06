import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { IUserComplete } from '../user/model.user';

/**
 * Contains the user model with all its attributes and relations.
 */
export interface IDiscussionCategoryComplete {
  id: number;
  description: string;
  name: string;
  users: IUserComplete[];
  discussionTheme: any[];
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
  implements IDiscussionCategoryComplete
{
  declare id: CreationOptional<number>;
  declare description: string;
  declare name: string;
  declare users: IUserComplete[];
  declare discussionTheme: any[];
}

/**
 * NOSQL
 */
