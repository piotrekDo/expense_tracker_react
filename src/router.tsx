import { createBrowserRouter } from 'react-router-dom';
import { ReportPage } from './pages/ReportPage';
import { App } from './pages/App';
import { CategoryPage } from './pages/CategoryPage';
import { CategoryGroupPage } from './pages/CategoryGroupPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { NewTransactionsPage } from './pages/NewTransactionsPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <ReportPage /> },
      { path: '/report', element: <ReportPage /> },
      { path: '/transactions', element: <TransactionsPage /> },
      { path: '/transactions-new', element: <NewTransactionsPage /> },
      { path: '/categories', element: <CategoryPage /> },
      { path: '/groups', element: <CategoryGroupPage /> },
    ],
  },
]);

export default router;