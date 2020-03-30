import React, { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import produce from 'immer';
import { parseISO, format } from 'date-fns';
import { pt } from 'date-fns/locale';

import api from '~/services/api';

import Background from '~/components/Background';
import EmptyList from '~/components/EmptyList';

import {
  Container,
  Label,
  ProblemList,
  Box,
  Description,
  Problem,
  Date,
  Awaiting,
} from './styles';

export default function ShowProblem() {
  const route = useRoute();

  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState([]);
  const [toggle, setToggle] = useState({});

  const { packId } = route.params;

  const dataFormater = useCallback(
    data =>
      data.map(d => ({
        id: d.id,
        description: d.description,
        date: format(parseISO(d.created_at), 'dd/MM/yyyy', { locale: pt }),
      })),
    []
  );

  useEffect(() => {
    async function loadProblems() {
      try {
        setLoading(true);

        const response = await api.get(`delivery/${packId}/problems`);

        const data = dataFormater(response.data);

        setProblems(data);
        setLoading(false);
      } catch (error) {
        Alert.alert(
          'Erro inesperado',
          'Erro ao carregar dados, tente novamente mais tarde'
        );

        setLoading(false);
      }
    }

    loadProblems();
  }, [dataFormater, packId]);

  function handleToggle(id) {
    setToggle(
      produce(toggle, draft => {
        draft[id] = !toggle[id];
      })
    );
  }

  return (
    <Background>
      <Container>
        <Label>Encomenta {packId < 10 ? `0${packId}` : packId}</Label>

        {loading ? (
          <Awaiting />
        ) : (
          <ProblemList
            data={problems}
            extraData={problems}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Box>
                <Description item={item}>
                  <Problem
                    switcher={toggle[item.id]}
                    onPress={() => handleToggle(item.id)}
                  >
                    {item.description}
                  </Problem>
                  <Date>{item.date}</Date>
                </Description>
              </Box>
            )}
            ListEmptyComponent={() => (
              <EmptyList text="Sem problemas até aqui" />
            )}
          />
        )}
      </Container>
    </Background>
  );
}
