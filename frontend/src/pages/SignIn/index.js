import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/fastfeet-logo.png';

export default function SignIn() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required('Este campo é indispensável'),
    password: Yup.string()
      .min(6, 'Mínimo permitido 6 caracteres')
      .required('Este campo é indispensável'),
  });

  async function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="" />
      <Form onSubmit={handleSubmit} schema={schema}>
        <strong>SEU E-MAIL</strong>
        <Input name="email" type="email" placeholder="email@email.com" />

        <strong>SUA SENHA</strong>
        <Input name="password" type="password" placeholder="Digite sua senha" />

        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
      </Form>
    </>
  );
}
