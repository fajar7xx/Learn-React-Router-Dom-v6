import { lazy } from 'react';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import NotFound from '../components/common/NotFound';
import {contactService} from '../services/contact';

const Contact = lazy(() => import('../pages/Contact'));
// const ContactEdit = lazy(() => import('../pages/Contact/edit.jsx'));

// loader
export const rootLoader = async() => {
	const contacts = await contactService.getAll();
	return { contacts };
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <NotFound />,
		loader: rootLoader,
		children: [
			{
				path: 'contacts/:contactId',
				element: <Contact />
			}
		]
	}
]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;