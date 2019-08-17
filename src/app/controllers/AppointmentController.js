import * as Yup from 'yup';
import Appointments from '../models/Appointments';
import User from '../models/User';

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });
    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can create appointments with providers' });
    }

    const appointment = await Appointments.create({
      user_id: req.UserId,
      provider_id,
      date,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
