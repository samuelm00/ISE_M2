import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { OptionalBaseProviderType } from '../type.provider';
import { IUserProps } from '@news-app/api-model';
import LoadingSpinner from 'apps/frontend/modules/Spinner/LoadingSpinner';
import {
  privateRoutes,
  RoutePath,
} from 'apps/frontend/modules/Navigation/common/constants/constant.route';

export const AuthContext = createContext<OptionalBaseProviderType<IUserProps>>({
  setValue: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<IUserProps | undefined>();

  useEffect(() => {
    if (!user && privateRoutes.some((route) => route === router.pathname)) {
      router.push(RoutePath.Login);
    }
  }, [router.pathname]);

  if (!user && router.pathname !== RoutePath.Login) {
    return (
      <div className={'w-screen h-screen flex justify-center items-center'}>
        <LoadingSpinner className="h-24 w-24" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ value: user, setValue: setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
