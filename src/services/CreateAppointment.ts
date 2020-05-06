import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/Appointments'
import { startOfHour } from 'date-fns'

interface Request {
  provider: string
  date: Date
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository
  }

  public run({ provider, date }: Request): Appointment {
    const appointmentDatetime = startOfHour(date)

    const isRepeatedSchedule = this.appointmentsRepository.findByDate(
      appointmentDatetime
    )

    if (isRepeatedSchedule)
      throw new Error('This appointment is already booked.')

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDatetime
    })

    return appointment
  }
}

export default CreateAppointmentService
