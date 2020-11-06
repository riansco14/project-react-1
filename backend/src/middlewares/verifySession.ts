import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import sessionConfig from '../config/session'

interface TokenJWT{
	iat: number
	exp: number
	sub: string
}

export default function verifySession (request: Request, response: Response, next: NextFunction): void {
	const authHeader = request.headers.authorization

	if (!authHeader) { throw new Error('Falta o Token') }

	// Bearer as324dko4saToken
	const [_, token] = authHeader.split(' ')

	try {
		const decoded = verify(token, sessionConfig.jwt.secret)
		const { sub } = decoded as TokenJWT
		request.user = {
			id: sub
		}
		return next()
	} catch (error) {
		throw new Error('Token invalido')
	}
}
