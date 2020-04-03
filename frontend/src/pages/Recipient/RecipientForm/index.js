import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';

import api from '~/services/api';
import history from '~/services/history';

import { Input, InputMask } from '~/components/Form';

import ManagementControl from '~/components/Management';
import ManagementBox from '~/components/Management/ManagementBox';

import {
  Content,
  Name,
  Street,
  Number,
  Complement,
  City,
  State,
  PostalCode,
} from './styles';

export default function CreateRecipient({ isEdit }) {
  const location = useLocation();

  const postal_code = location.state?.postal_code;
  const id = location.state?.id;

  const [recipient, setRecipient] = useState({ postal_code });

  if (isEdit && !location.state) {
    history.goBack();
  }

  useEffect(() => {
    async function loadRecipient() {
      if (isEdit) {
        const response = await api.get(`recipients/${id}`);

        setRecipient(response.data);
      }
    }

    loadRecipient();
  }, [id, isEdit, postal_code]);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Este campo é indispensável'),
        street: Yup.string().required('Este campo é indispensável'),
        number: Yup.number().required('Este campo é indispensável'),
        complement: Yup.string().required('Este campo é indispensável'),
        state: Yup.string().required('Este campo é indispensável'),
        city: Yup.string().required('Este campo é indispensável'),
        postal_code: Yup.string().required('Este campo é indispensável'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const {
        name,
        street,
        number,
        complement,
        state,
        city,
        postal_code: newPostal_code,
      } = data;

      if (!isEdit) {
        await api.post('recipients', {
          name,
          street,
          number,
          complement,
          state,
          city,
          postal_code: newPostal_code.replace('-', ''),
        });

        toast.success('Destinatário cadastrado com sucesso!');

        history.push('/dashboard/recipients');
      } else {
        await api.put(`recipients/${id}`, {
          name,
          street,
          number,
          complement,
          state,
          city,
          postal_code: newPostal_code.replace('-', ''),
        });

        toast.success('Destinatário atualizado com sucesso!');
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        toast.error('Preencha todos os campos');
      } else {
        toast.error('Erro inesperado, tente novamente');
      }
    }
  }

  return (
    <>
      <ManagementControl title="Cadastro de destinatário" />
      <ManagementBox>
        <Content>
          <Form initialData={recipient} onSubmit={handleSubmit} id="form">
            <Name>
              <label htmlFor="name">Nome</label>
              <Input
                name="name"
                id="name"
                placeholder="Nome do destinatário"
                autoComplete="off"
              />
            </Name>

            <div className="levelOne">
              <Street>
                <label htmlFor="street">Rua</label>
                <Input
                  name="street"
                  id="street"
                  placeholder="Rua exemplo"
                  autoComplete="off"
                />
              </Street>
              <Number>
                <label htmlFor="number">Número</label>
                <Input
                  name="number"
                  id="number"
                  placeholder="99"
                  autoComplete="off"
                />
              </Number>
              <Complement>
                <label htmlFor="complement">Complemento</label>
                <Input
                  name="complement"
                  id="complement"
                  placeholder="A - Z"
                  autoComplete="off"
                />
              </Complement>
            </div>

            <div className="levelTwo">
              <City>
                <label htmlFor="city">Cidade</label>
                <Input
                  name="city"
                  id="city"
                  placeholder="Cidade exemplo"
                  autoComplete="off"
                />
              </City>
              <State>
                <label htmlFor="state">Estado</label>
                <Input
                  name="state"
                  id="state"
                  placeholder="Estado exemplo"
                  autoComplete="off"
                />
              </State>
              <PostalCode>
                <label htmlFor="postal_code">CEP</label>
                <InputMask
                  mask="99999-999"
                  name="postal_code"
                  id="postal_code"
                  placeholder="99999-999"
                  autoComplete="off"
                />
              </PostalCode>
            </div>
          </Form>
        </Content>
      </ManagementBox>
    </>
  );
}

CreateRecipient.propTypes = {
  isEdit: PropTypes.bool,
};

CreateRecipient.defaultProps = {
  isEdit: false,
};
