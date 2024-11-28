import { createBrowserRouter } from 'react-router-dom';
import { ReportPage } from './pages/ReportPage';
import { App } from './pages/App';
import { CategoryPage } from './pages/CategoryPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <ReportPage /> },
      { path: '/report', element: <ReportPage /> },
      { path: '/categories', element: <CategoryPage /> },
    ],
  },
]);

export default router;