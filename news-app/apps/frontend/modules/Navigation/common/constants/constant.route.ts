export enum RoutePath {
  Home = '/',
  Profile = '/profile',
  Login = '/login',
  Topics = '/topics',
  Posts = '/topics/[topicId]/posts',
}

export const privateRoutes = [
  RoutePath.Home,
  RoutePath.Topics,
  RoutePath.Profile,
];
