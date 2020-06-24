import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'

import CreateUserService from '../services/CreateUser'
import UpdateUserAvatarService from '../services/UpdateUserAvatar'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body
  const createUser = new CreateUserService()
  const user = await createUser.run({ name, email, password })
  delete user.password

  return response.json(user)
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService()

    const user = await updateUserAvatar.run({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    delete user.password

    return response.status(201).json(user)
  }
)

export default usersRouter
