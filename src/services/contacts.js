import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';
import { fakeNetwork } from '../utils/network';
import { storage } from './storage';

const STORAGE_KEY = 'contacts';

const set = async (contacts) => {
	return storage.setItem(STORAGE_KEY, contacts);
};

export const getContacts = async (query) => {
	await fakeNetwork(`getContacts:${query}`);
	let contacts = await storage.getItem(STORAGE_KEY);
	if (!contacts) contacts = [];
	if (query) {
		contacts = matchSorter(contacts, query, { keys: ['first', 'last'] });
	}
	return contacts.sort(sortBy('last', 'createdAt'));
};

export const createContact = async () => {
	await fakeNetwork();
	let id = Math.random().toString(36).substring(2, 9);
	let contact = { id, createdAt: Date.now() };
	let contacts = await getContacts();
	contacts.unshift(contact);
	await set(contacts);
	return contact;
};

export const getContact = async (id) => {
	await fakeNetwork(`contact:${id}`);
	let contacts = await storage.getItem(STORAGE_KEY);
	let contact = contacts.find(contact => contact.id === id);
	return contact ?? null;
};

export const updateContact = async (id, updates) => {
	await fakeNetwork();
	let contacts = await storage.getItem(STORAGE_KEY);
	let contact = contacts.find(contact => contact.id === id);
	if (!contact) throw new Error('No contact found for', id);
	Object.assign(contact, updates);
	await set(contacts);
	return contact;
};

export const deleteContact = async (id) => {
	let contacts = await storage.getItem(STORAGE_KEY);
	let index = contacts.findIndex(contact => contact.id === id);
	if (index > -1) {
		contacts.splice(index, 1);
		await set(contacts);
		return true;
	}
	return false;
};

export const getDefaultContact =  () => {
	return {
		first: 'Your',
		last: 'Name',
		avatar: 'https://robohash.org/you.png?size=200x200',
		twitter: 'your_handle',
		notes: 'Some notes',
		favorite: true
	};
};

