import Appointment from '../models/Appointment'
import { isEqual } from 'date-fns'

interface CreateAppointmentDTO {
  provider: string
  date: Date
}
class Appointments {
  private appointments: Array<Appointment>

  constructor() {
    this.appointments = []
  }

  public findByDate(date: Date): Appointment | null {
    const foundAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date)
    )

    return foundAppointment || null
  }

  public all(): Array<Appointment> {
    return this.appointments
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date })

    this.appointments.push(appointment)

    return appointment
  }
}

export default Appointments
