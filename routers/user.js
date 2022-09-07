import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

const parser = bodyParser.json();
export const usersRouter = express();

// TO access the token
usersRouter.post('/Login', parser, (request, response) => {
	const user = {
		user: request.body.user,
	};
	const secret = request.body.secret;
	jwt.sign({user}, secret, {expiresIn: '300s'}, (error, token) => {
		response.json({token});
	});
});

// Access token
// Authorization : Bearer <access token>y
