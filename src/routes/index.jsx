import { lazy } from 'react';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import NotFound from '../components/common/NotFound';
import { contactService } from '../services/contact';

const Contact = lazy(() => import('../pages/Contact'));
const ContactEdit = lazy(() => import('../pages/Contact/edit'));

// loader
export const rootLoader = async () => {
	const contacts = await contactService.getAll();
	return { contacts };
};

export const rootAction = async () => {
	const contact = await contactService.create();
	// return { contact };
	return redirect(`/contacts/${contact.id}/edit`);
};

export const contactLoader = async ({ params }) => {
	const contact = await contactService.getById(params.contactId);
	return { contact };
};

export const editContactAction = async ({ request, params }) => {
	const formData = await request.formData();
	const updates = Object.fromEntries(formData);
	await contactService.update(params.contactId, updates);
	return redirect(`/contacts/${params.contactId}`);
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <NotFound />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				path: 'contacts/:contactId',
				element: <Contact />,
				loader: contactLoader
			},
			{
				path: 'contacts/:contactId/edit',
				element: <ContactEdit />,
				loader: contactLoader,
				action: editContactAction
			}
		]
	}
]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;