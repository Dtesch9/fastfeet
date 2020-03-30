import * as Yup from 'yup';
import { Op } from 'sequelize';

import Package from '../models/Package';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

import DeliveryNotificationMail from '../jobs/DeliveryNotificationMail';
import Queue from '../../lib/Queue';

class PackageController {
  async index(req, res) {
    const { page = 1, filter = '' } = req.query;

    const { count } = await Package.findAndCountAll({
      where: { product: { [Op.iLike]: `%${filter}%` } },
      limit: 10,
      offset: (page - 1) * 10,
    });

    const packages = await Package.findAll({
      where: { product: { [Op.iLike]: `%${filter}%` } },
      order: [['updated_at', 'DESC']],
      attributes: [
        'id',
        'product',
        'signature_id',
        'canceled_at',
        'start_date',
        'end_date',
      ],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: Deliveryman,
          as: 'delivery_man',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    res.header('X-Total-Count', count);

    return res.json(packages);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    /**
     * Check all informations before create package
     */
    const recipient = await Recipient.findByPk(req.body.recipient_id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient does not exists' });
    }

    const deliveryman = await Deliveryman.findByPk(req.body.deliveryman_id);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Delivery man does not exists' });
    }

    /**
     * Send email to delivery man after package creation
     */
    const { id, product, recipient_id, deliveryman_id } = await Package.create(
      req.body
    );

    await Queue.add(DeliveryNotificationMail.key, {
      deliveryman,
      id,
      product,
      recipient,
    });

    return res.json({
      id,
      product,
      recipient_id,
      deliveryman_id,
    });
  }

  async show(req, res) {
    const { id } = req.params;

    const pack = await Package.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: Deliveryman,
          as: 'delivery_man',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!pack) return res.status(401).json({ error: 'Package not found' });

    return res.json(pack);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const deliveryPackage = await Package.findOne({
      where: { id: req.params.id, start_date: null },
    });

    if (!deliveryPackage) {
      return res.status(401).json({ error: 'Package inaccessible' });
    }

    deliveryPackage.update(req.body);

    return res.json(deliveryPackage);
  }

  async delete(req, res) {
    const deliveryPackage = await Package.findOne({
      where: { id: req.params.id, start_date: null },
    });

    if (!deliveryPackage) {
      return res.status(401).json({ error: 'Package not found' });
    }

    await deliveryPackage.destroy();

    return res.status(200).json({ success: 'Deleted successfully' });
  }
}

export default new PackageController();
