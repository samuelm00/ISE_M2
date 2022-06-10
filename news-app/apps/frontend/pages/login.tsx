import { IUserProps } from '@news-app/api-model';
import { GetServerSideProps } from 'next';
import React from 'react';
import { getAllUsers } from '../modules/Api/user/api.user';
import AvatarCard, { avatarCardVariants } from '../modules/Card/AvatarCard';
import PageHeader from '../modules/Page/header/PageHeader';
import { motion } from 'framer-motion';

interface LoginPageProps {
  possibleUsers: IUserProps[];
}

export default function LoginPage({ possibleUsers }: LoginPageProps) {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="space-y-5">
        <PageHeader title="Choose your user:" />
        <motion.div
          variants={avatarCardVariants}
          transition={{ staggerChildren: 0.2, delayChildren: 0.2 }}
          initial="initial"
          animate="animate"
          className="flex justify-center items-center space-x-5"
        >
          {possibleUsers.map((user, index) => (
            <AvatarCard user={user} key={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const users = await getAllUsers(true);

  return {
    props: {
      possibleUsers: users,
    },
  };
};
