import { Router } from 'express'
import { parseISO } from 'date-fns'

import CreateAppointment from '../services/CreateAppointment'
import AppointmentsRepository from '../repositories/Appointments'

const appointmentsRouter = Router()
const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all()
  return response.json(appointments)
})

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body

  const parsedDatetime = parseISO(date)

  const createAppointment = new CreateAppointment(appointmentsRepository)
  try {
    const appointment = createAppointment.run({
      provider,
      date: parsedDatetime
    })
    return response.json(appointment)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

export default appointmentsRouter
