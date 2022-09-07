import bodyParser from 'body-parser';
import express from 'express';

import {Employee} from '../controllers/employee.js';
import {schemas} from './schemas.js';
import {verifyTokenForm} from './middleware.js';
import {verifyToken} from './middleware.js';

const parser = bodyParser.json();
export const employeesRouter = express();

employeesRouter.get('/', parser, async (request, response) => {
	const {error} = schemas.filterSortGET.validate(request.query, {convert: true});

	if (error) {
		response.status(400).json({data: request.query, error: error});
	} else {
		const {name, surname, sortedBy, sortOrder, pageNumber} = request.query;
		const employees = await Employee.getAllEmployeesFilterSort(name, surname, sortedBy, sortOrder, pageNumber);
		response.status(200).json(employees);
	}
});

employeesRouter.get('/:id', parser, async (request, response) => {
	const id = request.params.id;
	const employee = await Employee.getEmployeeById(Number.parseInt(id, 10));
	if (employee) {
		response.status(200).json(employee);
	} else {
		response.status(404).json({error: `Employee with id ${id} not found`});
	}
});

employeesRouter.post('/', parser, verifyTokenForm, verifyToken, async (request, response) => {
	const data = request.body;

	const {error} = schemas.employeePOST.validate(data, {convert: true});
	if (error) {
		response.status(400).json({data, error: error});
	} else {
		const employee = await Employee.createEmployee(data);
		response.status(200).json(employee);
	}

});

employeesRouter.put('/:id', parser, verifyTokenForm, verifyToken, async (request, response) => {
	const data = request.body;
	const id = request.params.id;

	const {error} = schemas.employeePUT.validate(data, {convert: true});
	if (error) {
		response.status(400).json({data, error: error});
	} else {
		const employee = await Employee.updateEmployee(Number.parseInt(id, 10), data);
		if (employee) {
			response.status(200).json(employee);
		} else {
			response.status(404).json({error: `Employee with id ${id} not found`});
		}
	}

});

employeesRouter.delete('/:id', parser, verifyTokenForm, verifyToken, async (request, response) => {
	const id = request.params.id;

	const employee = await Employee.deleteEmployee(Number.parseInt(id, 10));
	if (employee) {
		response.status(200).json(employee);
	} else {
		response.status(404).json({error: `Employee with id ${id} not found`});
	}

});
