import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config();

export const dataBase = knex({
	client: 'pg',
	connection: {
		host: 'fanny.db.elephantsql.com',
		port: 5432,
		user: process.env.user,
		password: process.env.password,
		database: 'vuegyehy',
	},
});
