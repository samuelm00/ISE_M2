import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from 'sequelize';
import { model, Schema, Model as MongoModel } from 'mongoose';
import { IDiscussionCategoryProps } from '../discussion-category/model.discussion-category';

/**
 * Contains the user model with all its attributes and relations.
 */
export interface IUserComplete {
  id: number | string;
  email: string;
  password: string;
}

/**
 * Contains only the user model attributes without the relations.
 */
export interface IUserProps
  extends Omit<IUserComplete, 'userVotes' | 'password'> {}

export interface IUserCompleteNoSql extends IUserComplete {
  subscriptions: IDiscussionCategoryProps[]
}

/**
 * SQL
 */
export class User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>>
  implements IUserComplete
{
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
}

export function initUserTableSQL(sequelize: Sequelize) {
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    { sequelize, tableName: 'users' }
  );
}

/**
 * NOSQL
 */
export function initUserTableNoSQL() {
  const userSchema = new Schema<Omit<IUserCompleteNoSql, 'id'>>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscriptions: [{ type: Schema.Types.ObjectId, ref: 'DiscussionCategories', required: true }]
  });
  UserNoSql = model<Omit<IUserCompleteNoSql, 'id'>>('User', userSchema);
}

export let UserNoSql: MongoModel<
  Omit<IUserCompleteNoSql, 'id'>,
  {},
  {},
  {}
> = undefined as any;
