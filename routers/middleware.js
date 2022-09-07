// Access token
// Authorization : Bearer <access token>y
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secret = process.env.secret;

export function verifyTokenForm(request, response, next) {
	const bearerHeader = request.headers.authorization;
	if (typeof bearerHeader === undefined) {
		response.sendStatus(403);
	} else {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		request.token = bearerToken;
		next();
	}
}

export function verifyToken(request, response, next) {
	jwt.verify(request.token, secret, error => {
		if (error) {
			response.sendStatus(403);
		} else {
			next();
		}
	});
}

