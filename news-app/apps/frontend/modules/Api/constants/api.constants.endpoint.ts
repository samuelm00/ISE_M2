export enum Endpoints {
  getAllUsers = '/users',
  getAllTopics = '/topic',
}

export enum EndpointBasePath {
  Sql = '/api/sql',
  NoSql = '/api/nosql',
}

export type SqlEndpoint = `${EndpointBasePath.Sql}${Endpoints}`;

export type NoSqlEndpoint = `${EndpointBasePath.NoSql}${Endpoints}`;

export type ApiEndpoint = SqlEndpoint | NoSqlEndpoint;

export const serverUrl = 'http://localhost:3333';

export const defaultPageSize = 100;
