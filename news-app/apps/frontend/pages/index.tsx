import TypeAnimation from 'react-type-animation';

export function Home() {
  return (
    <div className="h-screen w-full flex justify-center items-center text-4xl font-bold">
      <TypeAnimation
        cursor={true}
        wrapper="h1"
        sequence={['Welcome!', 1000, '']}
        repeat={Infinity}
      />
    </div>
  );
}

export default Home;
