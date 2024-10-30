// global layout
import { Form, Link, Outlet, useLoaderData } from 'react-router-dom';
import ContactList from '../pages/Contact/components/ContactList';
// import { getContacts } from '../services/contact.js';


const Root = () => {
	const { contacts } = useLoaderData();
	console.log('loader data', contacts);

	return (
		<>
			<div id="sidebar">
				<h1>
					<Link to="/">
						Contact
					</Link>
				</h1>
				<div>
					<Form id="search-form" role="search">
						<input
							id="q"
							aria-label="Search contacts"
							placeholder="Search"
							type="search"
							name="q"
						/>
						<div
							id="search-spinner"
							aria-hidden
							hidden={true}
						/>
						<div
							className="sr-only"
							aria-live="polite"
						></div>
					</Form>
					<Form method='post'>
						<button type="submit">New</button>
					</Form>
				</div>
				<nav>
					<ContactList contacts={contacts} />
				</nav>
			</div>
			<div id="detail">
				<Outlet />
			</div>
		</>
	);
};

export default Root;