import Mail from '../../lib/Mail';

class DeliveryNotificationMail {
  get key() {
    return 'DeliveryNotificationMail';
  }

  async handle({ data }) {
    const { deliveryman, id, product, recipient } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova encomenda',
      template: 'e-mail',
      context: {
        message: 'Nova encomenda a ser retirada anexada ao seu cadastro',
        deliveryman: deliveryman.name,
        deliverymanId: deliveryman.id,
        packageId: id,
        name: recipient.name,
        email: recipient.email,
        city: recipient.city,
        state: recipient.state,
        postal_code: recipient.postal_code,
        product,
      },
    });
  }
}

export default new DeliveryNotificationMail();
