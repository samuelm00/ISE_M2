import React, { useMemo } from 'react';
import { RoutePath } from './common/constants/constant.route';
import { getPrivateRoutes } from './common/utils/util.route';

export default function Navbar() {
  const privateRoutes = useMemo(() => getPrivateRoutes(), []);

  return (
    <>
      <div id="navbar" className="fixed top-0 right-5 left-5">
        <div className="navbar bg-neutral rounded-2xl">
          <div className="flex-1">
            <a
              href={RoutePath.Home}
              className="btn btn-ghost normal-case text-xl"
            >
              News-App
            </a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal p-0">
              {privateRoutes.map((route, index) => (
                <li key={index}>
                  <a href={route.href}>{route.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="h-[64px]" />
    </>
  );
}
