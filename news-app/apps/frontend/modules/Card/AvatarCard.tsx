import { IUserProps } from '@news-app/api-model';
import { useAuthProvider } from 'apps/frontend/provider/Auth/hook.auth';
import { useRouter } from 'next/router';
import React from 'react';
import { RoutePath } from '../Navigation/common/constants/constant.route';

interface AvatarCardProps {
  user: IUserProps;
}

export default function AvatarCard({ user }: AvatarCardProps) {
  const [_, setUser] = useAuthProvider();
  const router = useRouter();

  const handleOnClick = () => {
    setUser(user);
    router.push(RoutePath.Home);
  };

  return (
    <div
      onClick={handleOnClick}
      className="avatar hover:scale-110 duration-300 cursor-pointer"
    >
      <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <div className="w-full h-full flex justify-center items-center text-2xl">
          {user.email.substring(0, 2).toUpperCase()}
        </div>
      </div>
    </div>
  );
}
