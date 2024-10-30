import { lazy } from 'react';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import NotFound from '../components/common/NotFound';
import { contactService } from '../services/contact';

const Contact = lazy(() => import('../pages/Contact'));
const ContactEdit = lazy(() => import('../pages/Contact/edit'));
const ContactDetail = lazy(() => import('../pages/Contact/detail'));

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

export const destroyContactAction = async ({ params }) => {
	// throw new Error("oh my god")
	console.info(`destroy contact ${params.contactId}`);
	await contactService.delete(params.contactId);
	return redirect('/');
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
				index: true,
				element: <Contact />
			},
			{
				path: 'contacts/:contactId',
				element: <ContactDetail />,
				loader: contactLoader
			},
			{
				path: 'contacts/:contactId/edit',
				element: <ContactEdit />,
				loader: contactLoader,
				action: editContactAction
			},
			{
				path: 'contacts/:contactId/destroy',
				action: destroyContactAction,
				errorElement: <div>Oops! There was an error.</div>
			}
		]
	}
]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;