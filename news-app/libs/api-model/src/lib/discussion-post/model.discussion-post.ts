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
import { IUserVoteProps } from '../user-vote/model.user-vote';
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
  extends Omit<IDiscussionPostComplete, 'user' | 'userVotes'> {}

/**
 * SQL
 */
export class DiscussionPost
  extends Model<
    InferAttributes<DiscussionPost>,
    InferCreationAttributes<DiscussionPost>
  >
  implements IDiscussionPostComplete
{
  declare id: CreationOptional<number>;
  declare text: string;
  declare datetime: Date;
  // @ts-ignore
  declare discussionTheme: ForeignKey<DiscussionTopic['id']>;
  // @ts-ignore
  declare user: ForeignKey<User['id']>;
}

export async function initDiscussionPostTableSQL(sequelize: Sequelize) {
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
    },
    { sequelize, tableName: 'discussionPosts' }
  );
  await DiscussionPost.sync({ force: true });
}
/**
 * NOSQL
 */
