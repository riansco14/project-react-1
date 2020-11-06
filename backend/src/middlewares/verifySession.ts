import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import sessionConfig from '../config/session'

export default function verifySession (request: Request, response: Response, next: NextFunction): void {
	const authHeader = request.headers.authorization

	if (!authHeader) { throw new Error('Token is missing') }

	// Bearer as324dko4saToken
	const [_, token] = authHeader.split(' ')

	try {
		const decoded = verify(token, sessionConfig.jwt.secret)
		console.log(decoded)
		return next()
	} catch (error) {
		throw new Error('Token invalido')
	}
}
