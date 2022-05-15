import { privateRoutes, RoutePath } from '../constants/constant.route';
import { Route } from '../types/type.route';

/**
 *
 * @returns
 */
export function getPrivateRoutes(): Route[] {
  return privateRoutes.map((route) => {
    return {
      href: route,
      label: getLabel(route),
    };
  });
}

/**
 *
 * @param href
 * @returns
 */
export function getLabel(href: RoutePath) {
  switch (href) {
    case RoutePath.Home:
      return 'Home';
    case RoutePath.Profile:
      return 'Profile';
    case RoutePath.Login:
      return 'Login';
    case RoutePath.Topics:
      return 'Topics';
    case RoutePath.Posts:
      return 'Posts';
    default:
      return '';
  }
}
