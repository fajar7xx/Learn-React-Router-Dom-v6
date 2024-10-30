import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';
import { fakeNetwork } from '../utils/network';
import localforage from 'localforage';

const STORAGE_KEY = 'contacts';

export const contactService = {
	// private method
	_set: async (contacts) => localforage.setItem(STORAGE_KEY, contacts),

	getAll: async (query) => {
		await fakeNetwork(`getContacts:${query}`);
		let contacts = await localforage.getItem('contacts') || [];

		if(query){
			contacts = matchSorter(contacts, query, {
				keys: ['first', 'last']
			});
		}

		return contacts.sort(sortBy('last', 'createdAt'));
	},

	getById: async (id) => {
		await fakeNetwork(`contact:${id}`);
		let contacts = await localforage.getItem(STORAGE_KEY);
		return contacts?.find(contact => contact.id === id) || null;
	},

	create: async () => {
		await fakeNetwork();
		const contact = {
			id : Math.random().toString(36).substring(2, 9),
			createdAt: Date.now()
		};

		const contacts = await contact.getAll();
		contacts.unshift(contact);
		await contact._set(contacts);

		return contact;
	},

	update: async (id, payload) => {
		await fakeNetwork();
		const contacts = await localforage.getItem(STORAGE_KEY);
		const contact = contacts.find(contact => contact.id === id);

		if(!contact){
			throw new Error('Could not find contact');
		}

		Object.assign(contact, payload);
		await contact._set(contacts);

		return contact;
	},

	delete: async () => {
		const contacts = await localforage.getItem(STORAGE_KEY);
		const index = contacts.findIndex(contact => contact.id === id);

		if(index > -1){
			contacts.splice(index, 1);
			await contact._set(contacts);
			return true;
		}
		return false;
	}
};

