import './styles.css';
import { AppProps } from 'next/app';
import Navbar from '../modules/Navigation/Navbar';
import PageLayout from '../modules/Page/layout/PageLayout';
import { RoutePath } from '../modules/Navigation/common/constants/constant.route';

function CustomApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      {router.route !== RoutePath.Login ? (
        <nav>
          <Navbar />
        </nav>
      ) : null}
      <main>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </main>
    </>
  );
}

export default CustomApp;
