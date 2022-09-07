import {dataBase} from '../dataBase/data-base-connector.js';

export class Employee {
	static #tableName = 'employees';

	static async getEmployeeById(id) {
		const [employee] = await dataBase(Employee.#tableName).select('*').where({id}).returning('*');
		return employee;
	}

	static async createEmployee(data) {
		const [employee] = await dataBase(Employee.#tableName).insert(data).returning('*');
		return employee;
	}

	static async updateEmployee(id, data) {
		let employee = await Employee.getEmployeeById(id);
		if (employee) {
			[employee] = await dataBase(Employee.#tableName).where({id}).update(data).returning('*');
			return employee;
		}

		return null;
	}

	static async deleteEmployee(id) {
		let employee = await Employee.getEmployeeById(id);
		if (employee) {
			[employee] = await dataBase(Employee.#tableName).del().where({id}).returning('*');
			return employee;
		}

		return null;
	}

	static async getAllEmployeesFilterSort(name = undefined, surname = undefined, sortedBy = 'id', sortOrder = 'ASC', pageNumber = undefined) {
		const query = dataBase(Employee.#tableName).select('*');
		let [allCount] = await dataBase(Employee.#tableName).count('*');
		allCount = Number.parseInt(allCount.count);
		const pageSize = 25;
		if (name) {
			query.whereRaw(`LOWER(name) LIKE '%${name.toLowerCase()}%'`);
		}

		if (surname) {
			query.whereRaw(`LOWER(surname) LIKE '%${surname.toLowerCase()}%'`);
		}

		query.orderBy(sortedBy, sortOrder);

		if (pageNumber) {
			query.limit(pageSize);
			query.offset(pageSize * (pageNumber - 1));
		}

		return {employees: await query, pageCount: Math.ceil(allCount/pageSize), allCount: allCount};;
	}
}
