import { Router } from 'express'

import CreateUserService from '../services/CreateUser'

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body
  const createUser = new CreateUserService()
  const user = await createUser.run({ name, email, password })
  delete user.password

  return response.json(user)
})

export default usersRouter
