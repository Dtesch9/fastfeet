import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { page = 1, filter = '' } = req.query;

    const { count } = await Deliveryman.findAndCountAll({
      where: { name: { [Op.iLike]: `%${filter}%` } },
      limit: 10,
      offset: (page - 1) * 10,
    });

    const deliverymen = await Deliveryman.findAll({
      where: { name: { [Op.iLike]: `%${filter}%` } },
      order: [['updated_at', 'DESC']],
      attributes: ['id', 'name', 'email'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    res.header('X-Total-Count', count);

    return res.json(deliverymen);
  }

  async store(req, res) {
    const hasDeliveryMan = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (hasDeliveryMan) {
      return res.status(401).json({ error: 'Delivery man Already exists' });
    }

    const { id, name, email } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id, {
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman does not existes' });
    }

    return res.json(deliveryman);
  }

  async update(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Delivery man does not exists' });
    }

    const { id, name, avatar_id, email } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Delivery man not found' });
    }

    await deliveryman.destroy();

    return res.status(200).json({ success: 'Deleted successfully' });
  }
}

export default new DeliverymanController();
