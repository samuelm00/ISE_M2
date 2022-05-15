import { IUserProps } from '@news-app/api-model';
import { GetServerSideProps } from 'next';
import React from 'react';
import { getAllUsers } from '../modules/Api/user/api.user';

interface LoginPageProps {
  possibleUsers: IUserProps[];
}

export default function LoginPage({ possibleUsers }: LoginPageProps) {
  console.log(possibleUsers);

  return <div className="h-screen w-full"></div>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const users = await getAllUsers();

  return {
    props: {
      possibleUsers: users,
    },
  };
};
