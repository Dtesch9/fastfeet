import DeliveryProlem from '../models/DeliveryProblem';
import Package from '../models/Package';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class CancelDeliveryController {
  async delete(req, res) {
    const deliveryPackage = await DeliveryProlem.findOne({
      where: { id: req.params.id },
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
      return res.status(401).json({ error: 'Package does not exists' });
    }

    /**
     * Check if package has already been cancelled
     */
    if (deliveryPackage.delivery.canceled_at) {
      return res
        .status(200)
        .json({ success: 'Package has already been cancelled' });
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

    return res.status(200).json({ success: 'Delivery cancelled successfully' });
  }
}

export default new CancelDeliveryController();
