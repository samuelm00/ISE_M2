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
  DiscussionTopic,
  IDiscussionTopicProps,
} from '../discussion-topic/model.discussion-topic';
import { IUserVoteProps, userVoteSchema } from '../user-vote/model.user-vote';
import { IUserProps, User } from '../user/model.user';

/**
 * Contains the user model with all its attributes and relations.
 */
export interface IDiscussionPostComplete {
  id: number;
  text: string;
  datetime: Date;
  discussionTheme: IDiscussionTopicProps;
  user: IUserProps;
  userVotes: IUserVoteProps[];
}

/**
 * Contains only the user model attributes without the relations.
 */
export interface IDiscussionPostProps
  extends Omit<
    IDiscussionPostComplete,
    'user' | 'userVotes' | 'discussionTheme'
  > {}

export interface IDiscussionPostCompleteNoSql
  extends Omit<IDiscussionPostComplete, 'id' | 'discussionTheme' | 'user'> {
  discussionThemeId: string;
  parentPostId: string;
}

/**
 * Model that is used to create a new discussion post.
 */
export interface IDiscussionPostPropsCreate
  extends Omit<IDiscussionPostProps, 'id'> {
  userId: number | string;
  discussionThemeId: number;
  parentPostId?: number;
}

/**
 * SQL
 */
export class DiscussionPost
  extends Model<
    InferAttributes<DiscussionPost>,
    InferCreationAttributes<DiscussionPost>
  >
  implements IDiscussionPostProps
{
  declare id: CreationOptional<number>;
  declare text: string;
  declare datetime: Date;
  declare parentPostId: ForeignKey<DiscussionPost['id']>;
  // @ts-ignore
  declare discussionThemeId: ForeignKey<DiscussionTopic['id']>;
  // @ts-ignore
  declare userId: ForeignKey<User['id']>;
}

export function initDiscussionPostTableSQL(sequelize: Sequelize) {
  DiscussionPost.init(
    {
      text: {
        type: DataTypes.STRING,
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
      parentPostId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: DiscussionPost,
          key: 'id',
        },
      },
      discussionThemeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: DiscussionTopic,
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
    { sequelize, tableName: 'discussionPosts' }
  );

  DiscussionPost.belongsTo(User, { foreignKey: 'userId' });
  User.hasMany(DiscussionPost, { foreignKey: 'userId' });
  DiscussionPost.belongsTo(DiscussionTopic, {
    foreignKey: 'discussionThemeId',
  });
  DiscussionTopic.hasMany(DiscussionPost, { foreignKey: 'discussionThemeId' });
  DiscussionPost.belongsTo(DiscussionPost, { foreignKey: 'parentPostId' });
}
/**
 * NOSQL
 */
export function initDiscussionPostTableNOSQL() {
  const discussionPostSchema = new Schema<IDiscussionPostCompleteNoSql>({
    text: { type: Schema.Types.String, required: true },
    datetime: { type: Schema.Types.Date, default: Date.now },
    discussionThemeId: { type: Schema.Types.String, required: true },
    parentPostId: { type: Schema.Types.String, required: false },
    userVotes: [userVoteSchema],
  });
  DiscussionPostModel = model<IDiscussionPostCompleteNoSql>(
    'discussionPost',
    discussionPostSchema
  );
}

export let DiscussionPostModel: MongoModel<IDiscussionPostCompleteNoSql>;
