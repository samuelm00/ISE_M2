import { Schema, Model as MongoModel, model } from 'mongoose';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  Sequelize,
  DataTypes,
} from 'sequelize';
import {
  DiscussionCategory,
  IDiscussionCategoryProps,
} from '../discussion-category/model.discussion-category';
import { IUserProps, User } from '../user/model.user';

/**
 * Contains the user model with all its attributes and relations.
 */
export interface IDiscussionTopicComplete {
  id: number | string;
  text: string;
  datetime: Date;
  title: string;
  userId: number | string;
  discussionCategoryId: number | string;
}

export interface IDiscussionTopicCompleteNoSql
  extends Omit<
    IDiscussionTopicComplete,
    'userId' | 'id' | 'discussionCategoryId'
  > {
  discussionCategory: IDiscussionCategoryProps;
  userId: string;
  postsCount:number;
}

/**
 * Contains only the user model attributes without the relations.
 */
export interface IDiscussionTopicProps extends IDiscussionTopicComplete {}

export interface IDiscussionTopicPropsWithCategory
  extends Omit<IDiscussionTopicProps, 'discussionCategoryId'> {
  category: IDiscussionCategoryProps;
}

/**
 * SQL
 */
export class DiscussionTopic
  extends Model<
    InferAttributes<DiscussionTopic>,
    InferCreationAttributes<DiscussionTopic>
  >
  implements IDiscussionTopicComplete
{
  declare id: CreationOptional<number>;
  declare text: string;
  declare datetime: Date;
  declare title: string;
  // @ts-ignore
  declare userId: ForeignKey<User['id']>;
  declare discussionCategoryId: ForeignKey<DiscussionCategory['id']>;
}

export function initDiscussionTopicTable(sequelize: Sequelize) {
  DiscussionTopic.init(
    {
      datetime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
      },
      discussionCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: DiscussionCategory,
          key: 'id',
        },
      },
    },
    { sequelize, tableName: 'discussion_topics' }
  );
  User.hasMany(DiscussionTopic, { foreignKey: 'userId' });
  DiscussionTopic.belongsTo(User, { foreignKey: 'userId' });
  DiscussionCategory.hasMany(DiscussionTopic, {
    foreignKey: 'discussionCategoryId',
  });
  DiscussionTopic.belongsTo(DiscussionCategory, {
    foreignKey: 'discussionCategoryId',
  });
}

/**
 * NOSQL
 */
export function initDiscussionTopicTableNoSql() {
  const discussionTopicSchema = new Schema<IDiscussionTopicCompleteNoSql>({
    datetime: { type: Schema.Types.Date, default: Date.now },
    discussionCategory: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'DiscussionCategories',
    },
    text: { type: Schema.Types.String, required: true },
    title: { type: Schema.Types.String, required: true },
    userId: { type: Schema.Types.String, required: true },
    postsCount: {type: Schema.Types.Number, default: 0}
  });
  discussionTopicSchema.index({userId:1});
  discussionTopicSchema.index({datetime: 1}, {expireAfterSeconds : 31536000})
  DiscussionTopicNoSql = model<IDiscussionTopicCompleteNoSql>(
    'DiscussionTopic',
    discussionTopicSchema
  );
}

export let DiscussionTopicNoSql: MongoModel<IDiscussionTopicCompleteNoSql>;
