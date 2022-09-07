import express from 'express';
import {employeesRouter} from './routers/employee.js';
import {usersRouter} from './routers/user.js';

const app = express();
const port = 3000;

app.get('/', (request, response) => {
	response.send('Hello World');
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

app.use('/employees', employeesRouter);
app.use('/users', usersRouter);
