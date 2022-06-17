import React, { createContext, ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import { BaseProviderType } from '../type.provider';

export const DbProviderContext = createContext<BaseProviderType<DbVariant>>({
  value: 'sql',
  setValue: () => {},
});

export type DbVariant = 'sql' | 'nosql';

interface DbProviderProps {
  children: ReactNode;
}

export default function DbProvider({ children }: DbProviderProps) {
  const router = useRouter();
  const [variant, setVariant] = useState<DbVariant>('sql');

  return (
    <DbProviderContext.Provider
      value={{ value: variant, setValue: setVariant }}
    >
      {children}
    </DbProviderContext.Provider>
  );
}
