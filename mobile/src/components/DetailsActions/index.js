import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { openCamera } from '~/store/modules/camera/action';

import { Container, Appearance, Action, Text } from './styles';

export default function DetailsActions({ started, delivered, packId }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function activeCamera() {
    dispatch(openCamera(true));
  }

  return (
    <Container>
      <Appearance>
        <Action
          enabled={!(delivered || !started)}
          onPress={() => navigation.navigate('PostProblem', { packId })}
        >
          <Icon name="highlight-off" size={24} color="#E74040" />
          <Text>Informar Problema</Text>
        </Action>
      </Appearance>

      <Appearance>
        <Action onPress={() => navigation.navigate('ShowProblem', { packId })}>
          <Icon name="info-outline" size={24} color="#E7BA40" />
          <Text>Visualizar Problemas</Text>
        </Action>
      </Appearance>

      <Appearance borderBreak>
        <Action
          enabled={!(delivered || !started)}
          onPress={() => {
            activeCamera();
            navigation.navigate('Confirm', { packId });
          }}
        >
          <Icon name="add-a-photo" size={24} color="#7D40E7" />
          <Text>Confirmar Entrega</Text>
        </Action>
      </Appearance>
    </Container>
  );
}

DetailsActions.propTypes = {
  packId: PropTypes.number.isRequired,
  started: PropTypes.bool,
  delivered: PropTypes.bool,
};

DetailsActions.defaultProps = {
  started: false,
  delivered: false,
};
