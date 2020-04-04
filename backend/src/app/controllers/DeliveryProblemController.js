import { Op } from 'sequelize';

import DeliveryProblem from '../models/DeliveryProblem';
import Package from '../models/Package';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Recipient from '../models/Recipient';

class DeliveryProblemController {
  async index(req, res) {
    const problems = await DeliveryProblem.findAll({
      attributes: ['id', 'description'],
      include: [
        {
          model: Package,
          as: 'delivery',
          where: { canceled_at: { [Op.is]: null } },
          attributes: {
            exclude: [
              'deliveryman_id',
              'recipient_id',
              'createdAt',
              'updatedAt',
            ],
          },
          include: [
            {
              model: Deliveryman,
              as: 'delivery_man',
              attributes: { exclude: ['createdAt', 'updatedAt'] },
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
              ],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
          ],
        },
      ],
    });

    return res.json(problems);
  }

  async show(req, res) {
    const problem = await DeliveryProblem.findAll({
      where: { delivery_id: req.params.id },
      attributes: ['id', 'description', 'created_at'],
      include: [
        {
          model: Package,
          as: 'delivery',
          attributes: {
            exclude: [
              'deliveryman_id',
              'recipient_id',
              'createdAt',
              'updatedAt',
            ],
          },
          include: [
            {
              model: Deliveryman,
              as: 'delivery_man',
              attributes: { exclude: ['createdAt', 'updatedAt'] },
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
              ],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
          ],
        },
      ],
    });

    return res.json(problem);
  }
}

export default new DeliveryProblemController();
