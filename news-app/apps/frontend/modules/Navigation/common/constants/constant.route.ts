export enum RoutePath {
  Home = '/',
  Profile = '/profile',
  Login = '/login',
  Topics = '/topics',
  Posts = '/topic/[slug]',
}

export const privateRoutes = [
  RoutePath.Home,
  RoutePath.Topics,
  RoutePath.Profile,
  RoutePath.Posts,
];
