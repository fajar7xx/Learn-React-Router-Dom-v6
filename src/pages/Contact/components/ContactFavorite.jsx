import { Form, useFetcher } from 'react-router-dom';
import PropTypes from 'prop-types';

const ContactFavorite = ({ contact }) => {
	console.log('contact', contact);
	// const favorite = contact.favorite;
	const fetcher = useFetcher();

	const favorite = fetcher.formData
		? fetcher.formData.get('favorite') === 'true'
		: contact.favorite;

	return (
		<fetcher.Form method="POST">
			<button
				name="favorite"
				value={favorite ? 'false' : 'true'}
				aria-label={
					favorite
						? 'Remove from favorites'
						: 'Add to favorites'
				}
			>
				{favorite ? '★' : '☆'}
			</button>
		</fetcher.Form>
	);
};

// Menambahkan PropTypes untuk validasi
ContactFavorite.propTypes = {
	contact: PropTypes.shape({
		first: PropTypes.string,
		last: PropTypes.string,
		avatar: PropTypes.string,
		twitter: PropTypes.string,
		notes: PropTypes.string,
		favorite: PropTypes.bool.isRequired // Harus ada dan bertipe boolean
	}).isRequired // contact harus ada
};

export default ContactFavorite;