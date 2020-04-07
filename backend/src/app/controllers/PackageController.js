import { Op } from 'sequelize';

import Package from '../models/Package';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

import CreatePackageService from '../services/CreatePackageService';

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
    const pack = await CreatePackageService.run({
      recipientId: req.body.recipient_id,
      deliverymanId: req.body.deliveryman_id,
      data: req.body,
    });

    return res.json(pack);
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
