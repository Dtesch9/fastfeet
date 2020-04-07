import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { page = 1, filter = '' } = req.query;

    const { count } = await Recipient.findAndCountAll({
      where: { name: { [Op.iLike]: `%${filter}%` } },
      limit: 10,
      offset: (page - 1) * 10,
    });

    const recipients = await Recipient.findAll({
      where: { name: { [Op.iLike]: `%${filter}%` } },
      order: [['updated_at', 'DESC']],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit: 10,
      offset: (page - 1) * 10,
    });

    res.header('X-Total-Count', count);

    return res.json(recipients);
  }

  async store(req, res) {
    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async show(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient not found' });
    }

    return res.json(recipient);
  }

  async update(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient)
      return res.status(401).json({ error: 'recipient not found' });

    await recipient.update(req.body);

    return res.status(200).json({ success: 'Recipiente updated successfully' });
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient)
      return res.status(401).json({ error: 'Recipient not found' });

    await recipient.destroy();

    return res.status(200).json({ success: 'Deleted successfully' });
  }
}

export default new RecipientController();
