import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout.jsx';
import NotFound from '../components/common/NotFound.jsx';
import { getContacts } from '../services/contacts.js';

const Contact = lazy(() => import('../pages/Contact'));

const contactLoader = async () => {
	const contacts = await getContacts();
	return { contacts };
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <NotFound />,
		loader: contactLoader,
		children: [
			{
				path: '/contacts/:contactId',
				element: <Contact />
			}
		]
	}

]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;