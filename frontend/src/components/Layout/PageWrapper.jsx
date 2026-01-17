import Navbar from './Navbar';
import Sidebar from './Sidebar';

/**
 * PageWrapper - Main layout wrapper
 * Off-white background (#F9F9F9) - Udemy Style
 */
const PageWrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-u-bg">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
