import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/Appointments'

interface Request {
  user_id: string
  date: Date
}

class CreateAppointmentService {
  public async run({ user_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointmentDatetime = startOfHour(date)

    const isRepeatedSchedule = await appointmentsRepository.findByDate(
      appointmentDatetime
    )

    if (isRepeatedSchedule)
      throw new Error('This appointment is already booked.')

    const appointment = appointmentsRepository.create({
      user_id,
      date: appointmentDatetime
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
