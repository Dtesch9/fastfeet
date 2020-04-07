import User from '../models/User';

class UserController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const { count } = await User.findAndCountAll();

    const users = await User.findAll({
      order: ['created_at'],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit: 10,
      offset: (page - 1) * 10,
    });

    if (!users) return res.status(401).json({ error: 'There is no users yet' });

    res.header('X-Total-Count', count);

    return res.json(users);
  }

  async store(req, res) {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user) return res.status(401).json({ error: 'User already exists' });

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists)
        return res.status(401).json({ error: 'User alreary exists' });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, email: userEmail } = await user.update(req.body);

    return res.json({
      id,
      name,
      userEmail,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    if (id === 1)
      return res.status(401).json({ error: 'User can not be deleted' });

    const user = await User.findByPk(id);

    if (!user) return res.status(401).json({ error: 'User not found!' });

    await user.destroy();

    return res.status(200).json({ success: 'Deleted successfully' });
  }
}

export default new UserController();
