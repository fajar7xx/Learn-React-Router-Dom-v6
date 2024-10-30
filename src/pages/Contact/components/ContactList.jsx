import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ContactList = ({ contacts }) => {
	if (!contacts.length) {
		return <p>
			<i>No Contacts</i>
		</p>;
	}

	return (
		<ul>
			{contacts.map(({ id, first, last, favorite }) => (
				<li key={id}>
					<Link to={`contacts/${id}`}>
						{first || last ? `${first || ''} ${last || ''}` : <i>No Name</i>}{''}
						{favorite && <span>*</span>}
					</Link>
				</li>
			))}
		</ul>
	);
};

// Menambahkan PropTypes untuk validasi
ContactList.propTypes = {
	contacts: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			first: PropTypes.string,
			last: PropTypes.string,
			favorite: PropTypes.bool
		})
	).isRequired // contacts harus ada dan merupakan array
};

export default ContactList;