import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';
import {
  DiscussionCategory,
  IDiscussionCategoryProps,
} from '../discussion-category/model.discussion-category';
import { IDiscussionPostProps } from '../discussion-post/model.discussion-post';
import { IUserProps, User } from '../user/model.user';

/**
 * Contains the user model with all its attributes and relations.
 */
export interface IDiscussionThemeComplete {
  id: number;
  text: string;
  datetime: Date;
  title: string;
  discussionPosts: IDiscussionPostProps[];
  discussionCategory: IDiscussionCategoryProps;
  user: IUserProps;
}

/**
 * Contains only the user model attributes without the relations.
 */
export interface IDiscussionThemeProps
  extends Omit<
    IDiscussionThemeComplete,
    'user' | 'discussionPosts' | 'discussionCategory'
  > {}

/**
 * SQL
 */
export class DiscussionTheme
  extends Model<
    InferAttributes<DiscussionTheme>,
    InferCreationAttributes<DiscussionTheme>
  >
  implements IDiscussionThemeComplete
{
  declare id: CreationOptional<number>;
  declare text: string;
  declare datetime: Date;
  declare title: string;
  // @ts-ignore
  declare user: ForeignKey<User['id']>;
  // @ts-ignore
  declare discussionCategory: ForeignKey<DiscussionCategory['id']>;
}

/**
 * NOSQL
 */
