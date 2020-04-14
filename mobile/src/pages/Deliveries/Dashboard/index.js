import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { StatusBar, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import { signOut } from '~/store/modules/auth/actions';

import Deliveries from '~/components/Deliveries';

import {
  Container,
  Header,
  Info,
  Avatar,
  Title,
  Label,
  Name,
  LogoutButton,
} from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  const [loading, setLoading] = useState(false);
  const [switcher, setSwitcher] = useState(true);
  const [packages, setPackages] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const url = useMemo(() => {
    setPage(1);

    return switcher
      ? `delivery/deliveryman/${profile.id}/deliveries`
      : `delivery/deliveryman/${profile.id}/delivered`;
  }, [profile.id, switcher]);

  function handleSignOut() {
    dispatch(signOut());
  }

  const loadPackages = useCallback(async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.get(url, { params: { page } });

      setPackages(page > 1 ? [...packages, ...response.data] : response.data);
      setTotal(Number(response.headers['x-total-count']));
      setRefreshing(false);
      setLoadingList(false);
      setLoading(false);
    } catch (error) {
      Alert.alert(
        'Erro inesperado',
        'Houve um erro ao carregar as informações, tente novamente mais tarde'
      );

      setRefreshing(false);
      setLoadingList(false);
      setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing, page, url]);

  useEffect(() => {
    loadPackages();
  }, [loadPackages]);

  function refreshList() {
    if (loading) {
      return;
    }

    setPage(1);
    setRefreshing(true);
  }

  function loadMore() {
    if (loading) {
      return;
    }

    if (total > 0 && packages.length === total) {
      return;
    }

    setLoadingList(true);
    setPage(page + 1);
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Header>
        <Info>
          <Avatar
            source={{
              uri: profile.avatar
                ? profile.avatar.url
                : `https://api.adorable.io/avatars/55/${profile.name}.png`,
            }}
          />
          <Title>
            <Label>Bem vindo de volta,</Label>
            <Name>{profile.name}</Name>
          </Title>
        </Info>
        <LogoutButton onPress={handleSignOut}>
          <Icon name="exit-to-app" size={24} color="#E74040" />
        </LogoutButton>
      </Header>

      <Deliveries
        loading={loading && !loadingList}
        data={packages}
        loadingList={loadingList}
        handlePacks={setSwitcher}
        onRefresh={refreshList}
        refreshing={refreshing}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
      />
    </Container>
  );
}
