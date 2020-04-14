import React, { useState, useEffect, memo } from 'react';
import { isWithinInterval } from 'date-fns';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import api from '~/services/api';

import CardContent from './CardContent';
import EmptyList from '~/components/EmptyList';

import {
  Container,
  Header,
  Label,
  Actions,
  ActionButton,
  TextButton,
  Card,
  Awaiting,
} from './styles';

function Deliveries({ loading, data, loadingList, handlePacks, ...rest }) {
  const navigation = useNavigation();

  const userId = useSelector(state => state.user.profile.id);

  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    handlePacks(toggle);
  }, [handlePacks, toggle]);

  async function handleDelivery(packId) {
    try {
      const currentHour = new Date().getHours();

      if (!isWithinInterval(currentHour, { start: 8, end: 18 })) {
        Alert.alert(
          'Acesso negado',
          'Retirada de pacotes permitida entre as 8hs e 18hs'
        );
        return;
      }

      await api.post('delivery', {
        id: packId,
        deliveryman_id: userId,
      });

      navigation.reset({
        index: 0,
        routes: [{ name: 'Deliveries' }],
      });
    } catch (error) {
      Alert.alert(
        'Erro inesperado',
        'Ocorreu um erro na retirada do pacote, tente novamente mais tarde'
      );
    }
  }

  return (
    <Container>
      <Header>
        <Label>Entregas</Label>

        <Actions>
          <ActionButton onPress={() => toggle || setToggle(!toggle)}>
            <TextButton active={toggle}>Pendentes</TextButton>
          </ActionButton>

          <ActionButton onPress={() => !toggle || setToggle(!toggle)}>
            <TextButton active={!toggle}>Entregues</TextButton>
          </ActionButton>
        </Actions>
      </Header>

      {loading ? (
        <Awaiting size={100} />
      ) : (
        <Card
          data={data}
          extraData={data}
          keyExtractor={item => String(item.id)}
          {...rest}
          renderItem={({ item }) => (
            <CardContent item={item} withDraw={handleDelivery} />
          )}
          ListEmptyComponent={() => <EmptyList />}
          ListFooterComponent={() => loadingList && <Awaiting size={50} />}
        />
      )}
    </Container>
  );
}

export default memo(Deliveries);

Deliveries.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadingList: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  handlePacks: PropTypes.func.isRequired,
};
