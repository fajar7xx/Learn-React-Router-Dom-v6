import {useRouteError, Link} from 'react-router-dom';

const NotFound = () => {
	const error = useRouteError();
	// cetak errornya aja
	console.error(error);

	// Handle jika error undefined
	const errorMessage = error?.statusText || error?.message || 'Page not found';


	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occured.</p>
			<p>
				<i>{errorMessage}</i>
			</p>
			<p>
				<Link to='/'>Back to Home</Link>
			</p>
		</div>
	);
};

export default NotFound;