import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import CreateAppointment from '../services/CreateAppointment'
import AppointmentsRepository from '../repositories/Appointments'

const appointmentsRouter = Router()

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find()
  return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
  const { provider, date } = request.body

  const parsedDatetime = parseISO(date)

  const createAppointment = new CreateAppointment()
  try {
    const appointment = await createAppointment.run({
      provider,
      date: parsedDatetime
    })
    return response.json(appointment)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

export default appointmentsRouter
