import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
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
