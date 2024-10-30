// global layout
import { Form, Link, Outlet, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
import ContactList from '../pages/Contact/components/ContactList';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

const Root = () => {
	const { contacts, searchQuery } = useLoaderData();
	console.log('loader data', contacts);
	const navigation = useNavigation();
	const submit = useSubmit();
	const [searchText, setSearchText] = useState(searchQuery || '');

	useEffect(() => {
		document.getElementById('q').value = searchQuery;
	}, [searchQuery]);

	const debounceSubmit = debounce((form) => {
		submit(form);
	}, 500);

	const handleSearch = (e) => {
		const value = e.target.value;
		setSearchText(value);

		if (value >= 3) {
			debounceSubmit(e.currentTarget.form);
		}
	};

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
							value={searchText}
							onChange={handleSearch}
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
					<Form method="post">
						<button type="submit">New</button>
					</Form>
				</div>
				<nav>
					<ContactList contacts={contacts} />
				</nav>
			</div>
			<div
				id="detail"
				className={
					navigation.state === 'loading' ? 'loading' : ''
				}
				>
				<Outlet />
			</div>
		</>
	);
};

export default Root;