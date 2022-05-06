import { IUserProps } from '@news-app/api-model';

export function Home() {
  const a: IUserProps = {
    email: 'test',
    id: 1,
  };
  return (
    <div className="flex bg-black justify-center items-center">
      <div>Hello World</div>
    </div>
  );
}

export default Home;
