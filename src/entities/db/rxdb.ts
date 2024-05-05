import { addRxPlugin, createRxDatabase, type RxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { RxDBMigrationPlugin } from "rxdb/plugins/migration-schema";

addRxPlugin(RxDBMigrationPlugin);
addRxPlugin(RxDBDevModePlugin);

let db: RxDatabase;

export async function initDatabase() {
	db = await createRxDatabase({
		name: "mydatabase21",
		storage: getRxStorageDexie(),
	});

	await db.addCollections({
		todos: {
			schema: {
				version: 0,
				primaryKey: "id",
				type: "object",
				properties: {
					id: {
						type: "string",
						maxLength: 100, // <- the primary key must have set maxLength
					},
					name: {
						type: "string",
					},
					photo: {
						type: "File",
					},
				},
				required: ["id", "name"],
			},
		},
	});

	return db;
}

type Todo = {
	id: string;
	name: string;
	photo: File;
};

export function addValueToDB(value: Todo) {
	return db.todos.upsert(value);
}

export function readValuesFromDB() {
	return db.todos
		.find()
		.exec()
		.then((todos) => todos.map((todo) => todo.toJSON()));
}

export function removeValueFromDB(id: string) {
	// find the document by id
	const todo = db.todos.findOne({
		selector: {
			id,
		},
	});

	// remove the document
	return todo.remove();
}
