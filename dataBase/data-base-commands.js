import cli from 'cli-command';
import {employeesConnect} from './employee.js';

cli().command('create_employee').action(employeesConnect.tableCreate());
cli().command('drop_employee').action(employeesConnect.tableDrop());
