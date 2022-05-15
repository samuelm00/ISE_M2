import { IUserProps } from '@news-app/api-model';
import React from 'react';

interface AvatarCardProps {
  user: IUserProps;
}

export default function AvatarCard({ user: { email } }: AvatarCardProps) {
  return (
    <div className="avatar hover:scale-110 duration-300">
      <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <div className="w-full h-full flex justify-center items-center text-2xl">
          {email.substring(0, 2).toUpperCase()}
        </div>
      </div>
    </div>
  );
}
