import { Router } from 'express'

const routes = Router()

routes.post('/', (req, res) => {
	const { name, email } = req.body

	const user = {
		name,
		email,
	}

	return res.json({ message: user })
})

export default routes
