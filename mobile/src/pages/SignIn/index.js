import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Logo, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const [id, setId] = useState(null);
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(id));
  }

  return (
    <Container>
      <Logo source={logo} />
      <Form>
        <FormInput
          placeholder="Inform seu ID de cadastro"
          keyboardType="numeric"
          keyboardAppearance="dark"
          returnKeyLabel="send"
          onSubmitEditing={handleSubmit}
          value={id}
          onChangeText={setId}
        />
        <SubmitButton onPress={handleSubmit} loading={loading}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
