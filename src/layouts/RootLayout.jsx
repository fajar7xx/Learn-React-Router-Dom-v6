// global layout
import { Form, Link, Outlet, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
import ContactList from '../pages/Contact/components/ContactList';
import { useCallback, useEffect, useState } from 'react';
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

	const debounceSubmit = useCallback(
		debounce((form) => {
			submit(form);
		}, 500),
		[submit]
	);

	const handleSearch = useCallback((e) => {
		console.log('menjalankan handleserach dengan usecallback');
		const value = e.target.value;
		setSearchText(value);

		const form = e.currentTarget.form;

		const submitForm = () => {
			if(form){
				debounceSubmit(form);
			}
		};

		if (value.length >= 3) {
			setTimeout(submitForm, 500);
		} else if (value.length === 0) {
			setTimeout(submitForm, 200);
		}
	}, [debounceSubmit]);

	const searching = navigation.location &&
		new URLSearchParams(navigation.location.search).has(
			'q'
		);

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
							className={searching ? 'loading' : ''}
							name="q"
							value={searchText}
							onChange={handleSearch}
						/>
						<div
							id="search-spinner"
							aria-hidden
							hidden={!searching}
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