import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { parseISO, format } from 'date-fns';
import { pt } from 'date-fns/locale';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  CardBox,
  CardLabel,
  Text,
  StatusBox,
  LongPressButton,
  PointOne,
  PointText,
  PointTwo,
  PointThree,
  Line,
  Footer,
  DateBox,
  Info,
  Label,
  CityBox,
  Details,
  TextButton,
} from './styles';

export default function CardContent({ item, withDraw }) {
  const navigation = useNavigation();

  const date = useMemo(() => {
    return format(parseISO(item.createdAt), 'dd/MM/yyyy', { locale: pt });
  }, [item]);

  return (
    <CardBox>
      <CardLabel>
        <Icon name="local-shipping" size={24} color="#7D40E7" />
        <Text>Encomenda {item.id}</Text>
      </CardLabel>

      <StatusBox>
        <LongPressButton
          accessibilityRole="button"
          delayLongPress={2000}
          onLongPress={() =>
            !item.end_date && !item.start_date ? withDraw(item.id) : null
          }
        >
          <PointOne />
        </LongPressButton>
        <PointText position={-25}>Aguardando Retirada</PointText>
        <Line />

        <PointTwo isChecked={!!item.start_date} />
        <PointText position={108}>Retirada</PointText>
        <Line />

        <PointThree isChecked={!!item.end_date} />
        <PointText position={240}>Entregue</PointText>
      </StatusBox>

      <Footer>
        <DateBox>
          <Label>Data</Label>
          <Info>{date}</Info>
        </DateBox>

        <CityBox>
          <Label>Cidade</Label>
          <Info>{item.recipient.city}</Info>
        </CityBox>

        <Details onPress={() => navigation.navigate('Details', { pack: item })}>
          <TextButton>Ver detalhes</TextButton>
        </Details>
      </Footer>
    </CardBox>
  );
}

CardContent.propTypes = {
  withDraw: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number,
    createdAt: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    recipient: PropTypes.shape({
      city: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
