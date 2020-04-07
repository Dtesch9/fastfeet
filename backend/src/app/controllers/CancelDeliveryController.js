import CancelDeliveryService from '../services/Delivery/CancelDeliveryService';

class CancelDeliveryController {
  async delete(req, res) {
    await CancelDeliveryService.run({
      problem_id: req.params.id,
    });

    return res.status(200).json({ success: 'Delivery cancelled successfully' });
  }
}

export default new CancelDeliveryController();
