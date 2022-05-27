import { IUserProps } from '@news-app/api-model';
import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';

/**
 *
 */
export function useAuthProvider(): [
  user: IUserProps | undefined,
  setUser: React.Dispatch<React.SetStateAction<IUserProps | undefined>>
] {
  const { value, setValue } = useContext(AuthContext);
  return [value, setValue];
}
