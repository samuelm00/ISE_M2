import { IUserProps } from '@news-app/api-model';
import { GetServerSideProps } from 'next';
import React from 'react';

interface LoginPageProps {
  possibleUsers: IUserProps[];
}

export default function LoginPage({ possibleUsers }: LoginPageProps) {
  console.log(possibleUsers);

  return <div className="h-screen w-full"></div>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};
