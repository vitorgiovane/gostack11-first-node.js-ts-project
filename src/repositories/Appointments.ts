import { EntityRepository, Repository } from 'typeorm'

import Appointment from '../models/Appointment'

@EntityRepository(Appointment)
class Appointments extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const foundAppointment = await this.findOne({
      where: { date }
    })

    return foundAppointment || null
  }
}

export default Appointments
