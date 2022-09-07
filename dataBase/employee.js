import {dataBase} from './data-base-connector.js';

export class employeesConnect {
	static #tableName = 'employees';

	static tableCreate() {
		dataBase.schema.createTableIfNotExists(employeesConnect.#tableName, t => {
			t.increments('id').primary();
			t.string('name');
			t.string('surname');
			t.date('date_of_birth');
			t.string('position');
			t.integer('salary');
		}).then(row => ({status: 200, value: row})).catch(error => ({status: 500, value: error}));
	}

	static tableDrop() {
		dataBase.schema.dropTable(employeesConnect.#tableName).then(() => console.log('table dropped'))
			.catch(error => {
				console.log(error);
				throw error;
			})
			.finally(() => {
				dataBase.destroy().then();
			});
	}
}
