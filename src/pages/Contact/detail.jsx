import { Form, useLoaderData } from 'react-router-dom';
import ContactFavorite from './components/ContactFavorite';

const ContactDetail = () => {
	const { contact } = useLoaderData();

	const handleDelete = (e) => {
		console.log('handleDelete');
		if (!confirm('Please confirm you want to delete this record.')) {
			e.preventDefault();
		}
	};

	return (
		<div id="contact">
			<div>
				<img
					key={contact.avatar}
					src={contact.avatar || `https://robohash.org/${contact.id}.png?size=200x200`}
					alt={`${contact.first} ${contact.last}`}
				/>
			</div>

			<div>
				<h1>
					{contact.first || contact.last ? (
						<>
							{contact.first} {contact.last}
						</>
					) : (
						<i>No Name</i>
					)}{' '}
					<ContactFavorite contact={contact} />
				</h1>

				{contact.twitter && (
					<p>
						<a
							target="_blank"
							href={`https://twitter.com/${contact.twitter}`}
							rel="noopener noreferrer"
						>
							{contact.twitter}
						</a>
					</p>
				)}

				{contact.notes && <p>{contact.notes}</p>}

				<div>
					<Form action="edit">
						<button type="submit">Edit</button>
					</Form>
					<Form
						method="post"
						action="destroy"
						onSubmit={handleDelete}
					>
						<button type="submit">Delete</button>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default ContactDetail;