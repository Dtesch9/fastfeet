import DeliveryProlem from '../../models/DeliveryProblem';
import Package from '../../models/Package';
import Deliveryman from '../../models/Deliveryman';
import Recipient from '../../models/Recipient';

import Queue from '../../../lib/Queue';
import Cache from '../../../lib/Cache';

import CancellationMail from '../../jobs/CancellationMail';

class CancelDeliveryService {
  async run({ problem_id }) {
    const deliveryPackage = await DeliveryProlem.findOne({
      where: { id: problem_id },
      include: [
        {
          model: Package,
          as: 'delivery',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
            {
              model: Deliveryman,
              as: 'delivery_man',
            },
            {
              model: Recipient,
              as: 'recipient',
            },
          ],
        },
      ],
    });

    if (!deliveryPackage) {
      throw new Error('Package does not exists');
    }

    /**
     * Check if package has already been cancelled
     */
    if (deliveryPackage.delivery.canceled_at) {
      throw new Error('Package has already been cancelled');
    }

    await Package.update(
      { canceled_at: new Date() },
      { where: { id: deliveryPackage.delivery.id } }
    );

    /**
     * Cancelation e-mail
     */
    await Queue.add(CancellationMail.key, {
      deliveryPackage,
    });

    /**
     * Invalidate cache
     */ await Cache.invalidatePrefix(
      `user:${deliveryPackage.deliveryman_id}:packages`
    );
  }
}

export default new CancelDeliveryService();
