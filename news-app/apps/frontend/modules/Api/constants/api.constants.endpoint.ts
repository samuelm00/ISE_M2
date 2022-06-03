export enum Endpoints {
  getAllUsers = '/users',
  getTopics = '/topic',
  getAllCategories = '/categories',
  createTopics = '/topic',
  getPosts = '/posts',
}

export enum EndpointBasePath {
  Sql = '/api/sql',
  NoSql = '/api/nosql',
}

export type SqlEndpoint = `${EndpointBasePath.Sql}${Endpoints}${string}`;

export type NoSqlEndpoint = `${EndpointBasePath.NoSql}${Endpoints}${string}`;

export type ApiEndpoint = SqlEndpoint | NoSqlEndpoint;

export const serverUrl = 'http://localhost:3333';

export const defaultPageSize = 100;
