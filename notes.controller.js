const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');


const addNote = async (title) => {
	const notes = await getNotes();

	const note = {
		title,
		id: Date.now().toString(),
	}

	notes.push(note);

	await fs.writeFile(notesPath, JSON.stringify(notes));

	console.log(chalk.bgGreen(' Note was added! '));
};


const getNotes = async () => {
	const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });

	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
};


const printNotes = async () => {
	const notes = await getNotes();
	
	console.log(chalk.blue('Note list'));

	notes.forEach(note => {
		console.log(chalk.green(note.id, note.title));
	});
};


const removeNote = async (id) => {
	const notes = await getNotes();

	const removingNote = notes.find(note => +note.id === id);

	console.log(removingNote);

	if (!removingNote) {
		console.log(chalk.red(`Note id: ${id} not finded`));

		return;
	}

	const newNotes = notes.filter(note => +note.id !== id);

	await fs.writeFile(notesPath, JSON.stringify(newNotes));

	console.log(chalk.green(`Note id: ${id} removed`));
};


module.exports = {
	addNote, printNotes, removeNote
}