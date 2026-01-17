import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { PageWrapper } from './components/Layout';
import { Home, ModuleView, Community, Settings } from './pages';

/**
 * App - Root component with routing configuration
 * Provides consistent layout across all pages
 */
function App() {
  return (
    <>
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#1f2937',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#28A745',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#DC3545',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Main App with Layout */}
      <PageWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/module/:id" element={<ModuleView />} />
          <Route path="/community" element={<Community />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </PageWrapper>
    </>
  );
}

export default App;
