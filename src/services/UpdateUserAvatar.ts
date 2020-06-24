import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'

import uploadConfig from '../config/upload'
import User from '../models/User'
import AppError from '../errors/AppError'

interface Request {
  user_id: string
  avatarFilename: string
}

class UpdateUserAvatar {
  public async run({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change the avatar', 401)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        try {
          await fs.promises.unlink(userAvatarFilePath)
        } catch {}
      }
    }

    user.avatar = avatarFilename

    await usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatar
