import { useEffect } from 'react';
import { useContacts } from '../../hooks/useContacts.js';

const Contact = () => {
	const {
		contacts,
		loading,
		error,
		loadContacts,
		addContact,
		updateContact,
		deleteContact
	} = useContacts();

	useEffect(() => {
		loadContacts();
	}, [loadContacts]);

	if (loading) return <div>Loading.....</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<>
			<div>
				<h1>Contacts</h1>
				<button onClick={addContact}>Add Contact</button>

				<div>
					{contacts.map(contact => (
						<div key={contact.id}>
							<span>{contact.first} {contact.last}</span>
							<button onClick={() => deleteContact(contact.id)}>
								Delete
							</button>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Contact;