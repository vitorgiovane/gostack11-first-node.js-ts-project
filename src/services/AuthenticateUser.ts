import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../models/User'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

class AuthenticateUser {
  public async run({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User)
    const user = await userRepository.findOne({ email })

    if (!user) {
      throw new Error('Incorrect email/password combination.')
    }

    const passwordMatched = await compare(password, user.password)
    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.')
    }

    const tokenSecret = 'bfffdc901f726eb554f82713cb78a2e3b7a00c260e5e84dcdfb14c'

    const token = sign({}, tokenSecret, { subject: user.id, expiresIn: '1d' })

    return { user, token }
  }
}

export default AuthenticateUser
