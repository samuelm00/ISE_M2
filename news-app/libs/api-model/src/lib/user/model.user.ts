import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

/**
 * Contains the user model with all its attributes and relations.
 */
export interface IUserComplete {
  id: number;
  email: string;
  password: string;
}

/**
 * Contains only the user model attributes without the relations.
 */
export interface IUserProps
  extends Omit<IUserComplete, 'userVotes' | 'password'> {}

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

/**
 * NOSQL
 */
