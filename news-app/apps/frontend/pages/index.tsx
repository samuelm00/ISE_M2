import { useAuthProvider } from '../provider/Auth/hook.auth';

export function Home() {
  const [user] = useAuthProvider();

  return (
    <div className="flex bg-black justify-center items-center">
      <div>Hello World</div>
    </div>
  );
}

export default Home;
