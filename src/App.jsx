import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste'; 
import { useSelector } from 'react-redux';

function AppRoutes() {
  const selectedPaste = useSelector((state) => state.paste.viewedPaste);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div>
          <Navbar />
          <Home />
        </div>
      ),
    },
    {
      path: '/pastes',
      element: (
        <div>
          <Navbar />
          <Paste />
        </div>
      ),
    },
    {
      path: '/pastes/:id',
      element: selectedPaste ? (
        <div>
          <Navbar />
          <ViewPaste />
        </div>
      ) : (
        <Navigate to="/" />  // If no paste selected, redirect to Home
      ),
    },
    {
      path: '*',  // 404 page for invalid URLs
      element: (
        <div className="flex flex-col items-center justify-center h-screen">
          <Navbar />
          <h1 className="text-3xl font-bold text-red-500 mt-10">404 - Page Not Found</h1>
        </div>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default AppRoutes;
