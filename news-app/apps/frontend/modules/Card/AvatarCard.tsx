import { IUserProps } from '@news-app/api-model';
import { useAuthProvider } from 'apps/frontend/provider/Auth/hook.auth';
import { useRouter } from 'next/router';
import React from 'react';
import { RoutePath } from '../Navigation/common/constants/constant.route';
import { motion } from 'framer-motion';

interface AvatarCardProps {
  user: IUserProps;
}

export const avatarCardVariants = {
  animate: { opacity: 1, x: 0 },
  initial: {
    opacity: 0,
    x: -15,
  },
};

export default function AvatarCard({ user }: AvatarCardProps) {
  const [_, setUser] = useAuthProvider();
  const router = useRouter();

  const handleOnClick = () => {
    setUser(user);
    router.push(RoutePath.Home);
  };

  return (
    <motion.div
      variants={avatarCardVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleOnClick}
      className="avatar cursor-pointer"
    >
      <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <div className="w-full h-full flex justify-center items-center text-2xl">
          {user.email.substring(0, 2).toUpperCase()}
        </div>
      </div>
    </motion.div>
  );
}
