import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';
import { IDiscussionPostProps } from '../discussion-post/model.discussion-post';
import { IUserProps, User } from '../user/model.user';

/**
 * Contains the user model with all its attributes and relations.
 */
export interface IUserVote {
  id: number;
  datetime: Date;
  isUpvote: boolean;
  discussionPost: IDiscussionPostProps;
  user: IUserProps;
}

/**
 * Contains only the user model attributes without the relations.
 */
export interface IUserVoteProps
  extends Omit<IUserVote, 'user' | 'discussionPost'> {}

/**
 * SQL
 */
export class UserVote
  extends Model<InferAttributes<UserVote>, InferCreationAttributes<UserVote>>
  implements IUserVote
{
  declare id: CreationOptional<number>;
  declare datetime: Date;
  declare isUpvote: boolean;
  // @ts-ignore
  declare discussionPost: ForeignKey<UserVote['id']>;
  // @ts-ignore
  declare user: ForeignKey<User['id']>;
}

export async function initUserVoteTableSQL(sequelize: Sequelize) {
  UserVote.init(
    {
      isUpvote: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      datetime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,

      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    { sequelize, tableName: 'userVotes' }
  );
  await UserVote.sync({ force: true });
}

/**
 * NOSQL
 */
