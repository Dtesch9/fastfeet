import React, { useMemo } from 'react';
import { StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO, format } from 'date-fns';
import { pt } from 'date-fns/locale';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Avatar, Info, Label, Name, LogoutButton } from './styles';

export default function Profile() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  const date = useMemo(() => {
    return format(parseISO(profile.createdAt), 'dd/MM/yyyy', { locale: pt });
  }, [profile.createdAt]);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Avatar
        source={{
          uri: profile.avatar
            ? profile.avatar.url
            : `https://api.adorable.io/avatars/55/${profile.name}.png`,
        }}
      />
      <Info>
        <Label>Nome completo</Label>
        <Name>{profile.name}</Name>

        <Label>Email</Label>
        <Name>{profile.email}</Name>

        <Label>Data de cadastro</Label>
        <Name>{date}</Name>

        <LogoutButton onPress={handleSignOut}>Logout</LogoutButton>
      </Info>
    </Container>
  );
}
