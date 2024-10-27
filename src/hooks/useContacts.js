// src/hooks/useContacts.js
import { useState, useCallback } from 'react';
import * as contactsService from '../services/contacts';

export const useContacts = () => {
	const [contacts, setContacts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const loadContacts = useCallback(async (query) => {
		try {
			setLoading(true);
			const data = await contactsService.getContacts(query);
			setContacts(data);
			setError(null);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}, []);

	const addContact = async () => {
		try {
			const newContact = await contactsService.createContact();
			setContacts(prev => [newContact, ...prev]);
			return newContact;
		} catch (err) {
			setError(err);
			throw err;
		}
	};

	const updateContact = async (id, updates) => {
		try {
			const updated = await contactsService.updateContact(id, updates);
			setContacts(prev =>
				prev.map(contact =>
					contact.id === id ? updated : contact
				)
			);
			return updated;
		} catch (err) {
			setError(err);
			throw err;
		}
	};

	const deleteContact = async (id) => {
		try {
			await contactsService.deleteContact(id);
			setContacts(prev => prev.filter(contact => contact.id !== id));
		} catch (err) {
			setError(err);
			throw err;
		}
	};

	return {
		contacts,
		loading,
		error,
		loadContacts,
		addContact,
		updateContact,
		deleteContact,
		getDefaultContact: contactsService.getDefaultContact
	};
};