import express, { Router } from 'express'
import appointmentsRouter from './appointments'
import usersRouter from './users'
import sessionsRouter from './sessions'
import uploadConfig from '../config/upload'

const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/files', express.static(uploadConfig.directory))

export default routes
