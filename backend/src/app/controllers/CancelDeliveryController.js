import CancelDeliveryService from '../services/Delivery/CancelDeliveryService';

class CancelDeliveryController {
  async delete(req, res) {
    try {
      await CancelDeliveryService.run({
        problem_id: req.params.id,
      });

      return res
        .status(200)
        .json({ success: 'Delivery cancelled successfully' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new CancelDeliveryController();
