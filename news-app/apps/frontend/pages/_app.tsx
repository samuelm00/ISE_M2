import './styles.css';
import { AppProps } from 'next/app';
import Navbar from '../modules/Navigation/Navbar';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
