export enum Endpoints {
  getAllUsers = '/users',
}

export enum EndpointBasePath {
  Sql = '/api/sql',
  NoSql = '/api/nosql',
}

export type SqlEndpoint = `${EndpointBasePath.Sql}${Endpoints}`;

export type NoSqlEndpoint = `${EndpointBasePath.NoSql}${Endpoints}`;
