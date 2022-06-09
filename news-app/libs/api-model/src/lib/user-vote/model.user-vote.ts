import { Schema, Model as MongoModel, model } from 'mongoose';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
  Sequelize,
} from 'sequelize';
import {
  DiscussionPost,
  IDiscussionPostProps,
} from '../discussion-post/model.discussion-post';
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
  implements IUserVoteProps
{
  declare id: CreationOptional<number>;
  declare datetime: Date;
  declare isUpvote: boolean;
  // @ts-ignore
  declare discussionPostId: ForeignKey<DiscussionPost['id']>;
  // @ts-ignore
  declare userId: ForeignKey<User['id']>;
}

export function initUserVoteTableSQL(sequelize: Sequelize) {
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
      discussionPostId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: DiscussionPost,
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
      },
    },
    { sequelize, tableName: 'userVotes' }
  );

  UserVote.belongsTo(DiscussionPost, { foreignKey: 'discussionPostId' });
  DiscussionPost.hasMany(UserVote, { foreignKey: 'discussionPostId' });
  UserVote.belongsTo(User, { foreignKey: 'userId' });
  User.hasMany(UserVote, { foreignKey: 'userId' });
}

/**
 * NOSQL
 */
export const userVoteSchema = new Schema<IUserVoteProps>({
  datetime: { type: Schema.Types.Date, default: Date.now },
  isUpvote: { type: Schema.Types.Boolean, allowNull: false },
});
