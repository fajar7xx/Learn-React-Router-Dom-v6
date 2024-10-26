import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import Root from '../pages/Root/index.jsx';
import NotFound from '../components/common/NotFound.jsx';

const RootLayout = lazy(() => import('../pages/Root'));


const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <NotFound />
	}
]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;