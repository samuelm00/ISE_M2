import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  Sequelize,
  DataTypes,
} from 'sequelize';
import { IUserProps, User } from '../user/model.user';

/**
 * Contains the user model with all its attributes and relations.
 */
export interface IDiscussionTopicComplete {
  id: number;
  text: string;
  datetime: Date;
  title: string;
  userId: IUserProps;
}

/**
 * Contains only the user model attributes without the relations.
 */
export interface IDiscussionTopicProps extends IDiscussionTopicComplete {}

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
}

export async function initDiscussionTopicTable(sequelize: Sequelize) {
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
    },
    { sequelize, tableName: 'discussion_topics' }
  );
  User.hasMany(DiscussionTopic, { foreignKey: 'userId' });
  DiscussionTopic.belongsTo(User, { foreignKey: 'userId' });
  await DiscussionTopic.sync({ force: true });
}

/**
 * NOSQL
 */
