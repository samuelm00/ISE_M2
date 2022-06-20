import {
    Model, Sequelize,
  } from 'sequelize';

export class Subscription extends Model {};

export function initSubscriptionTableSQL(sequelize: Sequelize) {
    Subscription.init(
      {},
      { sequelize, tableName: 'subscriptions' }
    );
  }