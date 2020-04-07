import Package from '../models/Package';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import DeliveryNotificationMail from '../jobs/DeliveryNotificationMail';
import Queue from '../../lib/Queue';

class CreatePackageService {
  async run({ recipientId, deliverymanId, data }) {
    /**
     * Check all informations before create package
     */
    const recipient = await Recipient.findByPk(recipientId);

    if (!recipient) {
      throw new Error('Recipient does not exists');
    }

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) {
      throw new Error('Delivery man does not exists');
    }

    /**
     * Send email to delivery man after package creation
     */
    const { id, product, recipient_id, deliveryman_id } = await Package.create(
      data
    );

    await Queue.add(DeliveryNotificationMail.key, {
      deliveryman,
      id,
      product,
      recipient,
    });

    return {
      id,
      product,
      recipient_id,
      deliveryman_id,
    };
  }
}

export default new CreatePackageService();
