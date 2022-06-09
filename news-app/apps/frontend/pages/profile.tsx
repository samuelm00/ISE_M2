import React from 'react';
import Button from '../modules/Button/Button';
import { useDbVariant } from '../provider/Db/hook.db-provider';

export default function ProfilePage() {
  const [dbVariant, setDbVariant] = useDbVariant();
  console.log(dbVariant);

  return (
    <div>
      <Button
        className="btn-primary"
        onClick={() =>
          setDbVariant((prev) => (prev === 'sql' ? 'nosql' : 'sql'))
        }
      >
        SwitchDB
      </Button>
    </div>
  );
}
