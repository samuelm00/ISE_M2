import Link from 'next/link';
import React, { useMemo } from 'react';
import { RoutePath } from './common/constants/constant.route';
import { getNavbarRoutes } from './common/utils/util.route';
import clsx from 'clsx';
import { useRouter } from 'next/router';

export default function Navbar() {
  const privateRoutes = useMemo(() => getNavbarRoutes(), []);
  const router = useRouter();

  return (
    <>
      <div id="navbar" className="fixed top-0 right-5 left-5">
        <div className="navbar bg-neutral rounded-2xl">
          <div className="flex-1">
            <Link href={RoutePath.Home}>
              <button className="btn btn-ghost normal-case text-xl">
                News-App
              </button>
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal p-0">
              {privateRoutes.map((route, index) => (
                <li
                  className={clsx({
                    'bg-primary rounded-lg': route.href === router.pathname,
                  })}
                  key={index}
                >
                  <Link href={route.href}>{route.label}</Link>
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
