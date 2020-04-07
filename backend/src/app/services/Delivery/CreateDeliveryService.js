import { isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Package from '../../models/Package';

import Cache from '../../../lib/Cache';

class CreateDeliveryService {
  async run({ deliveryman_id, package_id }) {
    /**
     * Check if delivary man achieve max package withdraw
     */
    const day = new Date();

    const { count: allDeliveries } = await Package.findAndCountAll({
      where: {
        deliveryman_id,
        canceled_at: null,
        start_date: {
          [Op.between]: [startOfDay(day), endOfDay(day)],
        },
      },
    });

    if (allDeliveries > 5) {
      throw new Error('You can not exceed 5 withdraw per day');
    }

    /**
     * Check Package status to be delivered
     */
    const deliveryPackage = await Package.findByPk(package_id);

    if (!deliveryPackage) {
      throw new Error('Package not found');
    }

    if (deliveryPackage.canceled_at) {
      throw new Error('Delivery has been cancelled');
    }

    if (deliveryPackage.end_date) {
      throw new Error('Package has already been delivered');
    }

    if (deliveryPackage.start_date) {
      throw new Error('Delivery is already happening');
    }

    /**
     * Check if withdrew time is between 8 and 18 hours
     */
    const currentHour = new Date().getHours();

    if (!isWithinInterval(currentHour, { start: 8, end: 18 })) {
      throw new Error('Package can not get picked up out of time');
    }

    await deliveryPackage.update({
      start_date: new Date(),
    });

    await Cache.invalidatePrefix(`user:${deliveryman_id}:packages`);
  }
}

export default new CreateDeliveryService();
