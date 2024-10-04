const yargs = require("yargs");
const { addNote, printNotes, removeNote, editNote } = require("./notes.controller");

yargs.command({
	command: 'add',
	describe: 'Add new note to list',
	builder: {
		title: {
			type: 'string',
			describe: 'Note title',
			demandOption: true,
		}
	},
	handler: async ({ title }) => {
		await addNote(title);
	},
});

yargs.command({
	command: 'list',
	describe: 'Print all notes',
	handler: async () => {
		await printNotes();
	},
});

yargs.command({
	command: 'remove',
	describe: 'Remove note by id',
	builder: {
		id: {
			type: 'number',
			describe: 'Remove note by id',
			demandOption: true,
		}
	},
	handler: async ({ id }) => {
		await removeNote(id);
	},
});

yargs.command({
	command: 'edit',
	describe: 'Edit note by id',
	builder: {
		id: {
			type: 'number',
			describe: 'Note id',
			demandOption: true,
		},
		title: {
			type: 'string',
			describe: 'New title',
			demandOption: true,
		}
	},
	handler: async ({ id, title }) => {
		await editNote(id, title);
	},
});

yargs.parse();