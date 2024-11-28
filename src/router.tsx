import { createBrowserRouter } from 'react-router-dom';
import { ReportPage } from './pages/ReportPage';
import { App } from './pages/App';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <ReportPage /> },
      { path: '/report', element: <ReportPage /> },
    ],
  },
]);

export default router;