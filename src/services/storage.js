import localforage from 'localforage';

export const storage = {
	getItem: (key) => localforage.getItem(key),
	setItem: (key, value) => localforage.setItem(key, value)
};