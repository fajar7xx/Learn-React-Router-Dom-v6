import { Form, useLoaderData } from 'react-router-dom';
import './styles/editcontact.css';

const ContactEdit = () => {
	const { contact } = useLoaderData();

	return (
		<Form method="post" id="contact-form" className="contact-form">
			<div className="form-group">
				<label>
					<span>Name</span>
					<div className="name-inputs">
						<input
							placeholder="First"
							aria-label="First name"
							type="text"
							name="first"
							defaultValue={contact?.first}
							className="input-field"
						/>
						<input
							placeholder="Last"
							aria-label="Last name"
							type="text"
							name="last"
							defaultValue={contact?.last}
							className="input-field"
						/>
					</div>
				</label>
			</div>

			<div className="form-group">
				<label>
					<span>Twitter</span>
					<input
						type="text"
						name="twitter"
						placeholder="@jack"
						defaultValue={contact?.twitter}
						className="input-field"
					/>
				</label>
			</div>

			<div className="form-group">
				<label>
					<span>Avatar URL</span>
					<input
						placeholder="https://example.com/avatar.jpg"
						aria-label="Avatar URL"
						type="text"
						name="avatar"
						defaultValue={contact?.avatar}
						className="input-field"
					/>
				</label>
			</div>

			<div className="form-group">
				<label>
					<span>Notes</span>
					<textarea
						name="notes"
						defaultValue={contact?.notes}
						rows={6}
						className="textarea-field"
					/>
				</label>
			</div>

			<div className="button-group">
				<button type="submit" className="btn">Save</button>
				<button type="button" className="btn">Cancel</button>
			</div>
		</Form>
	);
};

export default ContactEdit;