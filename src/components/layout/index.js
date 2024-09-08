import { AuthProvider } from '../AuthProvider';
import Footer from './footer';
import Main from './main';
import Navbar from './navbar';

const Layout = ({ children }) => {
  return (
    <AuthProvider>
      <div className='bg-[#f8f9fa]'>
        <Navbar />
        <Main>{children}</Main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default Layout;