import { Form } from 'react-router-dom';
import PropTypes from 'prop-types';

const FavoriteContact = ({ contact }) => {
	const favorite = contact?.favorite || false;
	return (
		<Form method="post">
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
		</Form>
	);
};

// prop validation
FavoriteContact.propTypes = {
	contact: PropTypes.shape({
		first: PropTypes.string,
		last: PropTypes.string,
		avatar: PropTypes.string,
		twitter: PropTypes.string,
		notes: PropTypes.string,
		favorite: PropTypes.bool
	}).isRequired
};


export default FavoriteContact;