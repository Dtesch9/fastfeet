import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { deliveryPackage } = data;

    await Mail.sendMail({
      to: `${deliveryPackage.delivery.delivery_man.name} <${deliveryPackage.delivery.delivery_man.email}>`,
      subject: 'Cancelamento',
      template: 'e-mail',
      context: {
        message:
          'Houve um cancelamento de entrega, segue as informações abaixo',
        deliveryman: deliveryPackage.delivery.delivery_man.name,
        deliverymanId: deliveryPackage.delivery.delivery_man.id,
        packageId: deliveryPackage.delivery.id,
        product: deliveryPackage.delivery.product,
        name: deliveryPackage.delivery.recipient.name,
        email: deliveryPackage.delivery.recipient.email,
        city: deliveryPackage.delivery.recipient.city,
        state: deliveryPackage.delivery.recipient.state,
        postal_code: deliveryPackage.delivery.recipient.postal_code,
      },
    });
  }
}

export default new CancellationMail();
