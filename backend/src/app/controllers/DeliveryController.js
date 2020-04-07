import { Op } from 'sequelize';

import Package from '../models/Package';
import Recipient from '../models/Recipient';
import File from '../models/File';

import CreateDeliveryService from '../services/Delivery/CreateDeliveryService';

import Cache from '../../lib/Cache';

class DeliveryController {
  async index(req, res) {
    const { page = 1 } = req.query;

    /**
     * Cache
     */
    const cacheKey = `user:${req.params.id}:packages:${page}`;
    const cached = await Cache.get(cacheKey);

    if (cached) {
      const count = await Cache.get(`${cacheKey}:count`);

      res.header('X-Total-Count', count);

      return res.json(cached);
    }

    /**
     * Gether information
     */
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

    /**
     * Store Cache
     */
    await Cache.set(cacheKey, deliveries);
    await Cache.set(`${cacheKey}:count`, count);

    return res.json(deliveries);
  }

  async show(req, res) {
    const { page = 1 } = req.query;

    /**
     * Cache
     */
    const cacheKey = `user:${req.params.id}:packages:${page}:delivered:${page}`;
    const cached = await Cache.get(cacheKey);

    if (cached) {
      const count = await Cache.get(`${cacheKey}:count`);

      res.header('X-Total-Count', count);

      return res.json(cached);
    }

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

    /**
     * Store Cache
     */
    await Cache.set(cacheKey, deliveries);
    await Cache.set(`${cacheKey}:count`, count);

    return res.json(deliveries);
  }

  async store(req, res) {
    await CreateDeliveryService.run({
      deliveryman_id: req.body.deliveryman_id,
      package_id: req.body.id,
    });

    return res.status(200).json({ success: 'Package withdrew successfully' });
  }

  async update(req, res) {
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

    await Cache.invalidatePrefix(
      `user:${deliveryPackage.deliveryman_id}:packages`
    );

    return res.status(200).json({ success: 'Package delivered successfully' });
  }
}

export default new DeliveryController();
