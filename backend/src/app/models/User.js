import Sequelize, { Model } from 'sequelize';
import { compare, hash } from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return compare(password, this.password_hash);
  }
}

export default User;
