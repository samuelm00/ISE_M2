import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { OptionalBaseProviderType } from '../type.provider';
import { IUserProps } from '@news-app/api-model';
import LoadingSpinner from 'apps/frontend/modules/Spinner/LoadingSpinner';

export const AuthContext = createContext<OptionalBaseProviderType<IUserProps>>({
  setValue: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<IUserProps | undefined>();

  if (!user) {
    return (
      <div className={'w-screen h-screen flex justify-center items-center'}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ value: user, setValue: setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
