import './styles.css';
import { AppProps } from 'next/app';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav></nav>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
