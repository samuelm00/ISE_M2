import { model, Schema, Model as MongoModel } from 'mongoose';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
  DataTypes,
} from 'sequelize';
import { IDiscussionTopicProps } from '../discussion-topic/model.discussion-topic';
import { Subscription } from '../subscription/model.subscription';
import { IUserComplete, User } from '../user/model.user';

/**
 * Contains the user model with all its attributes and relations.
 */
export interface IDiscussionCategoryComplete {
  id: number | string;
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

export function initDiscussionCategoryTableSQL(sequelize: Sequelize) {
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

  DiscussionCategory.belongsToMany(User, { through: Subscription });
  User.belongsToMany(DiscussionCategory, { through: Subscription });
}

/**
 * NOSQL
 */
export function initDiscussionCategoryTableNoSql() {
  const discussionSchema = new Schema<
    Omit<IDiscussionCategoryProps, 'id'>
  >({
    description: { type: String, required: true },
    //users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    name: { type: String, required: true, unique: true },
  });
  discussionSchema.index({ name: 1 });
  DiscussionCategoryNoSql = model<
    Omit<IDiscussionCategoryProps, 'id'>
  >('DiscussionCategories', discussionSchema);
}

export let DiscussionCategoryNoSql: MongoModel<
  Omit<IDiscussionCategoryProps, 'id'>,
  {},
  {},
  {}
> = undefined as any;
