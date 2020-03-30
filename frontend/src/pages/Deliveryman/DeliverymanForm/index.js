import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';

import api from '~/services/api';
import history from '~/services/history';

import { Input } from '~/components/Form';

import AvatarInput from '../AvatarInput';

import ManagementControl from '~/components/Management';
import ManagementBox from '~/components/Management/ManagementBox';

import { Content, Name, Email } from './styles';

export default function CreateDeliveryman({ isEdit }) {
  const location = useLocation();

  if (isEdit && !location.state) {
    history.goBack();
  }

  const id = location.state?.id;
  const ava_id = location.state?.ava_id;
  const url = location.state?.url;

  const [deliveryman, setDeliveryman] = useState({
    avatar: { url, id: ava_id },
  });

  useEffect(() => {
    async function loadDeliverymen() {
      if (isEdit) {
        const response = await api.get(`deliveryman/${id}`);

        setDeliveryman(response.data);
      }
    }

    loadDeliverymen();
  }, [id, isEdit]);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Este campo é indispensável'),
        email: Yup.string()
          .email('Confira seu email')
          .required('Este campo é indispensável'),
        avatar_id: Yup.number().required('Este campo é indispensável'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, email, avatar_id } = data;

      if (!isEdit) {
        await api.post('deliveryman', {
          name,
          avatar_id,
          email,
        });

        history.push('/dashboard/deliveries');
      } else {
        await api.put(`deliveryman/${id}`, {
          name,
          avatar_id,
          email,
        });

        toast.success('Entregador atualizado com sucesso!');
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        toast.error('Peencha todos os campos corretamente');
      } else {
        toast.error('Erro inesperado, tente novamente');
      }
    }
  }

  return (
    <>
      <ManagementControl title="Cadastro de entregadores" />
      <ManagementBox>
        <Content>
          <Form initialData={deliveryman} onSubmit={handleSubmit} id="form">
            <AvatarInput name="avatar_id" />

            <Name>
              <label htmlFor="name">Nome</label>
              <Input
                name="name"
                id="name"
                placeholder="Nome do entregador"
                autoComplete="off"
              />
            </Name>

            <Email>
              <label htmlFor="email">Email</label>
              <Input
                name="email"
                type="email"
                id="email"
                placeholder="example@fastfeet.com"
                autoComplete="off"
              />
            </Email>
          </Form>
        </Content>
      </ManagementBox>
    </>
  );
}

CreateDeliveryman.propTypes = {
  isEdit: PropTypes.bool,
};

CreateDeliveryman.defaultProps = {
  isEdit: false,
};
