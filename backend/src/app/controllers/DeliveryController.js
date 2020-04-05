import { isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import * as Yup from 'yup';
import { Op } from 'sequelize';

import Package from '../models/Package';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveryController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const { count } = await Package.findAndCountAll({
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        end_date: null,
      },
    });

    const deliveries = await Package.findAll({
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        end_date: null,
      },
      attributes: ['id', 'product', 'start_date', ['created_at', 'createdAt']],
      order: [['start_date', 'ASC']],
      limit: 5,
      offset: (page - 1) * 5,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: { exclude: ['updatedAt', 'createdAt'] },
        },
      ],
    });

    res.header('X-Total-Count', count);

    return res.json(deliveries);
  }

  async show(req, res) {
    const { page = 1 } = req.query;

    const { count } = await Package.findAndCountAll({
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        end_date: { [Op.not]: null },
      },
    });

    const deliveries = await Package.findAll({
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        end_date: { [Op.not]: null },
      },
      attributes: { exclude: ['signature_id', 'updatedAt'] },
      order: ['updated_at'],
      limit: 5,
      offset: (page - 1) * 5,
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'name', 'path', 'url'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: { exclude: ['updatedAt', 'createdAt'] },
        },
      ],
    });

    res.header('X-Total-Count', count);

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Check if delivary man achieve max package withdraw
     */
    const day = new Date();

    const { count: allDeliveries } = await Package.findAndCountAll({
      where: {
        deliveryman_id: req.body.deliveryman_id,
        canceled_at: null,
        start_date: {
          [Op.between]: [startOfDay(day), endOfDay(day)],
        },
      },
    });

    if (allDeliveries > 5) {
      return res
        .status(401)
        .json({ error: 'You can not exceed 5 withdraw per day' });
    }

    /**
     * Check Package status to be delivered
     */
    const deliveryPackage = await Package.findByPk(req.body.id);

    if (!deliveryPackage) {
      return res.status(401).json({ error: 'Package not found' });
    }

    if (deliveryPackage.canceled_at) {
      return res.status(401).json({ error: 'Delivery has been cancelled' });
    }

    if (deliveryPackage.end_date) {
      return res
        .status(401)
        .json({ error: 'Package has already been delivered' });
    }

    if (deliveryPackage.start_date) {
      return res.status(401).json({ error: 'Delivery is already happening' });
    }

    /**
     * Check if withdrew time is between 8 and 18 hours
     */
    // const currentHour = new Date().getHours();

    if (!isWithinInterval(18, { start: 8, end: 18 })) {
      return res
        .status(401)
        .json({ error: 'Package can not get picked up our of time' });
    }

    await deliveryPackage.update({
      start_date: new Date(),
    });

    return res.status(200).json({ success: 'Package withdrew successfully' });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ errro: 'Validation fails' });
    }

    /**
     * Check package status to finish delivery
     */
    const deliveryPackage = await Package.findByPk(req.body.id);

    if (!deliveryPackage) {
      return res.status(401).json({ error: 'Package not found' });
    }

    if (!deliveryPackage.start_date) {
      return res.status(401).json({ error: 'Package has not been picked up' });
    }

    if (deliveryPackage.canceled_at) {
      return res.status(401).json({ error: 'Delivery has been cancelled' });
    }

    if (deliveryPackage.end_date) {
      return res
        .status(401)
        .json({ error: 'Package has already been delivered' });
    }

    await deliveryPackage.update({
      signature_id: req.body.signature_id,
      end_date: new Date(),
    });

    return res.status(200).json({ success: 'Package delivered successfully' });
  }
}

export default new DeliveryController();
