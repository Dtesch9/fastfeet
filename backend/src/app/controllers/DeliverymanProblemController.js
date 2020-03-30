import * as Yup from 'yup';

import Package from '../models/Package';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliverymanProblemController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const deliveryPackage = await Package.findOne({
      where: { id: req.params.id },
    });

    if (!deliveryPackage) {
      return res.status(401).json({ error: 'Package not found' });
    }

    const { delivery_id, description } = await DeliveryProblem.create({
      delivery_id: req.params.id,
      description: req.body.description,
    });

    return res.json({
      delivery_id,
      description,
    });
  }
}

export default new DeliverymanProblemController();
