import { useContext } from 'react';
import { DbProviderContext, DbVariant } from './DbProvider';

/**
 *
 */
export function useDbVariant(): [
  dbVariant: DbVariant,
  setDbVariant: React.Dispatch<React.SetStateAction<DbVariant>>
] {
  const { value, setValue } = useContext(DbProviderContext);
  return [value, setValue];
}
