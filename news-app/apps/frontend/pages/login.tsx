import { IUserProps } from '@news-app/api-model';
import { GetServerSideProps } from 'next';
import React from 'react';
import { getAllUsers } from '../modules/Api/user/api.user';
import AvatarCard from '../modules/Card/AvatarCard';
import PageHeader from '../modules/Page/header/PageHeader';

interface LoginPageProps {
  possibleUsers: IUserProps[];
}

export default function LoginPage({ possibleUsers }: LoginPageProps) {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="space-y-5">
        <PageHeader title="Choose your user:" />
        <div className="flex justify-center items-center space-x-5">
          {possibleUsers.map((user, index) => (
            <AvatarCard user={user} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const users = await getAllUsers();

  return {
    props: {
      possibleUsers: users,
    },
  };
};
