import React, { useRef } from 'react';
import { Keyboard, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import api from '~/services/api';

import Background from '~/components/Background';

import { KeyboardDismiss, Container, Input, SubmitButton } from './styles';

export default function PostProblem() {
  const formRef = useRef(null);

  const route = useRoute();
  const { packId } = route.params;

  async function handleSubmit(data) {
    try {
      formRef.current.reset();

      const schema = Yup.object().shape({
        problem: Yup.string().required(),
      });

      await schema.validate(data);

      await api.post(`delivery/${packId}/problems`, {
        description: data.problem,
      });

      Alert.alert('Sucesso', 'Problema informado com sucesso');
    } catch (error) {
      Alert.alert('Ocorreu um Erro', 'Verifique seu texto');
    }
  }

  return (
    <KeyboardDismiss activeOpacity={1} onPress={() => Keyboard.dismiss()}>
      <Background>
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="problem"
              multiline
              placeholder="Inclua aqui o problema que ocorreu na entrega."
              keyboardAppearance="dark"
              blurOnSubmit
              returnKeyLabel="send"
              onSubmitEditing={() => formRef.current.submitForm()}
            />

            <SubmitButton
              onPress={() => {
                formRef.current.submitForm();
                Keyboard.dismiss();
              }}
            >
              Enviar
            </SubmitButton>
          </Form>
        </Container>
      </Background>
    </KeyboardDismiss>
  );
}
