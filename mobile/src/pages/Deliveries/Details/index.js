import React, { useMemo } from 'react';
import { useRoute } from '@react-navigation/native';
import { parseISO, format } from 'date-fns';
import { pt } from 'date-fns/locale';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Actions from '~/components/DetailsActions';

import {
  Information,
  Label,
  Text,
  Title,
  Description,
  Situation,
  DateBox,
  Date,
} from './styles';

export default function Details() {
  const route = useRoute();

  const { pack } = route.params;

  const data = useMemo(() => {
    const { recipient } = pack;

    return {
      product: pack.product,
      name: recipient.name,
      address: `${recipient.street}, ${recipient.number}, ${recipient.city} - ${
        recipient.state
      }, ${recipient.postal_code
        .toString()
        .slice(0, 5)}-${recipient.postal_code % 1000}`,
      start: pack.start_date
        ? format(parseISO(pack.start_date), 'dd/MM/yyyy', { locale: pt })
        : '- - / - - / - -',
      end: pack.end_date
        ? format(parseISO(pack.end_date), 'dd/MM/yyyy', { locale: pt })
        : '- - / - - / - -',
    };
  }, [pack]);

  return (
    <Background>
      <Information>
        <Label>
          <Icon name="local-shipping" size={24} color="#7D40E7" />
          <Text>Informações da entrega</Text>
        </Label>

        <Title>Destinatário</Title>
        <Description>{data.name}</Description>

        <Title>Endereço de entrega</Title>
        <Description>{data.address}</Description>

        <Title>Produto</Title>
        <Description>{data.product}</Description>
      </Information>

      <Situation>
        <Label>
          <Icon name="event" size={24} color="#7D40E7" />
          <Text>Situação da entrega</Text>
        </Label>

        <Title>Status</Title>
        <Description>{pack.end_date ? 'Entregue' : 'Pendente'}</Description>

        <DateBox>
          <Date>
            <Title>Data de retirada</Title>
            <Description>{data.start}</Description>
          </Date>

          <Date>
            <Title>Data de entrega</Title>
            <Description>{data.end}</Description>
          </Date>
        </DateBox>
      </Situation>

      <Actions
        packId={pack.id}
        started={!!pack.start_date}
        delivered={!!pack.end_date}
      />
    </Background>
  );
}
