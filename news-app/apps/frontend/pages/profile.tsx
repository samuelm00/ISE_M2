import { useRouter } from 'next/router';
import React from 'react';
import Button from '../modules/Button/Button';
import { RoutePath } from '../modules/Navigation/common/constants/constant.route';
import { useAuthProvider } from '../provider/Auth/hook.auth';
import { useDbVariant } from '../provider/Db/hook.db-provider';

export default function ProfilePage() {
  const [dbVariant, setDbVariant] = useDbVariant();
  const router = useRouter();
  const [_, setUser] = useAuthProvider();

  return (
    <div>
      <Button
        className="btn-primary"
        onClick={() => {
          setDbVariant((prev) => (prev === 'sql' ? 'nosql' : 'sql'));
          setUser(undefined);
          router.push(RoutePath.Login);
        }}
      >
        SwitchDB
      </Button>
    </div>
  );
}
