import './styles.css';
import { AppProps } from 'next/app';
import Navbar from '../modules/Navigation/Navbar';
import PageLayout from '../modules/Page/layout/PageLayout';
import { RoutePath } from '../modules/Navigation/common/constants/constant.route';
import AuthProvider from '../provider/Auth/AuthProvider';
import DbProvider from '../provider/Db/DbProvider';

function CustomApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <DbProvider>
        <AuthProvider>
          {router.route !== RoutePath.Login ? (
            <nav>
              <Navbar />
            </nav>
          ) : null}
          <main>
            {router.route === RoutePath.Login ? (
              <Component {...pageProps} />
            ) : (
              <PageLayout>
                <Component {...pageProps} />
              </PageLayout>
            )}
          </main>
        </AuthProvider>
      </DbProvider>
    </>
  );
}

export default CustomApp;
