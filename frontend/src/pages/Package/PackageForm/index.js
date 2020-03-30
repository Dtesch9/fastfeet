import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';

import api from '~/services/api';
import history from '~/services/history';

import { filterOptions, filterDefault } from '~/utils/FilterOptions';

import { Input, Select } from '~/components/Form';

import ManagementControl from '~/components/Management';
import ManagementBox from '~/components/Management/ManagementBox';

import { Content, Selectors, Recipient, Deliveryman, Package } from './styles';

export default function CreatePackage({ isEdit }) {
  const location = useLocation();

  if (isEdit && !location.state) {
    history.goBack();
  }

  const id = location.state?.id;
  const [recipientsOP, setRecipientsOp] = useState([]);
  const [deliverymanOp, setDeliverymanOp] = useState([]);
  const [initialData, setInitialData] = useState();

  useEffect(() => {
    async function loadPackages() {
      if (isEdit) {
        const response = await api.get(`packages/${id}`);

        const recipient = filterDefault(response.data.recipient);
        const deliveryman = filterDefault(response.data.delivery_man);

        setInitialData({
          recipient_id: recipient,
          deliveryman_id: deliveryman,
          product: response.data.product,
        });
      } else {
        setInitialData(true);
      }
    }

    loadPackages();
  }, [id, isEdit]);

  async function loadOptions(route) {
    const response = await api.get(route);
    return filterOptions(response.data);
  }

  useEffect(() => {
    setRecipientsOp(loadOptions('recipients'));
    setDeliverymanOp(loadOptions('deliveryman'));
  }, []);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        product: Yup.string().required('Informe o produto'),
        recipient_id: Yup.number('Informe o destinatário').required(
          'Este campo é indispensável'
        ),
        deliveryman_id: Yup.number('Informe o entregador').required(
          'Este campo é indispensável'
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { product, recipient_id, deliveryman_id } = data;

      if (!isEdit) {
        await api.post('packages', {
          product,
          recipient_id,
          deliveryman_id,
        });

        toast.success('Pacote cadastrado com sucesso!');

        history.push('/dashboard/packages');
      } else {
        await api.put(`packages/${id}`, {
          product,
          recipient_id,
          deliveryman_id,
        });

        toast.success('Pacote atualizado com sucesso!');
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        toast.error('Preencha todos os campos corretamente');
      } else {
        toast.error('Erro inesperado, Tente novamente.');
      }
    }
  }

  return (
    <>
      <ManagementControl title="Cadastro de Encomendas" />
      <ManagementBox>
        <Content>
          {initialData && (
            <Form initialData={initialData} onSubmit={handleSubmit} id="form">
              <Selectors>
                <Recipient>
                  <label htmlFor="recipient">Destinatário</label>
                  <Select
                    name="recipient_id"
                    id="recipient"
                    defaultOptions
                    loadOptions={() => recipientsOP}
                  />
                </Recipient>

                <Deliveryman>
                  <label htmlFor="deliveryman">Entregador</label>
                  <Select
                    name="deliveryman_id"
                    id="deliveryman"
                    defaultOptions
                    loadOptions={() => deliverymanOp}
                  />
                </Deliveryman>
              </Selectors>

              <Package>
                <label htmlFor="product">Nome do produto</label>
                <Input
                  name="product"
                  id="product"
                  placeholder="Informe o produto"
                  autoComplete="off"
                />
              </Package>
            </Form>
          )}
        </Content>
      </ManagementBox>
    </>
  );
}

CreatePackage.propTypes = {
  isEdit: PropTypes.bool,
};

CreatePackage.defaultProps = {
  isEdit: false,
};
