/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import produce from 'immer';
import { toast } from 'react-toastify';
import { MdMoreHoriz, MdDeleteForever, MdCreate } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import Loading from '~/components/Loading';
import AboveContent from '~/components/AboveContent';
import Content from '~/components/Content';
import ActionButton from '~/components/Action/ActionButton';
import Action from '~/components/Action';
import Pagination from '~/components/Pagination';

import { Container, Grid } from './styles';

export default function Deliveryman() {
  const [loading, setLoading] = useState(false);
  const [deliverymen, setDeliverymen] = useState([]);
  const [toggle, setToggle] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(false);

  function formatData(data) {
    return data.map(person => ({
      formatedId: person.id < 10 ? `#0${person.id}` : person.id,
      ...person,
    }));
  }

  useEffect(() => {
    async function loadDeliverymen() {
      try {
        setLoading(true);

        const response = await api.get('deliveryman', {
          params: {
            page,
            filter,
          },
        });

        const pageLimit = Math.ceil(response.headers['x-total-count'] / 10);

        setTotalPages(pageLimit);

        const { length } = response.data;

        if (length > 0) {
          const data = formatData(response.data);

          setLoading(false);
          setError(false);
          setDeliverymen(data);
        } else {
          setLoading(false);
          setError(!!filter && true);
        }
      } catch (err) {
        toast.error('Erro inesperado, tente novamente');

        setLoading(false);
      }
    }

    loadDeliverymen();
  }, [filter, page]);

  function handleToggle(id) {
    const newToggle = produce(toggle, draft => {
      draft[id] = !draft[id];
    });

    setToggle(newToggle);
  }

  function editPage(id, avatarURL, avatarId) {
    history.push('/dashboard/deliveries/edit', {
      id,
      ava_id: avatarId,
      url: avatarURL,
    });
  }

  async function handleDelete(id) {
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm('Tem certeza que deseja deleter? ');

    if (confirmation) {
      await api.delete(`deliveryman/${id}`);

      setDeliverymen(deliverymen.filter(dmen => dmen.id !== id));
    }
  }

  async function searchBar(newFilter) {
    setPage(newFilter ? 1 : page);
    setFilter(newFilter);
  }

  function paginate(_, newPage) {
    setPage(newPage);
  }

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <AboveContent
        getFilter={searchBar}
        title="Gerenciando entregadores"
        placeholder="Buscar por entregadores"
        path="/dashboard/deliveries/create"
        error={error}
      />
      <Content>
        <Grid>
          <ul>
            <li>
              <strong>ID</strong>
            </li>
            <li>
              <strong>Foto</strong>
            </li>
            <li>
              <strong>Nome</strong>
            </li>
            <li>
              <strong>Email</strong>
            </li>
            <li>
              <strong>Ações</strong>
            </li>
          </ul>

          {deliverymen.map(person => (
            <ul key={person.id}>
              <li>
                <p>{person.formatedId}</p>
              </li>
              <li>
                <div>
                  <img
                    src={
                      person?.avatar?.url ||
                      'https://api.adorable.io/avatars/55/abott@adorable.png'
                    }
                    alt=""
                  />
                </div>
              </li>
              <li>
                <p>{person.name}</p>
              </li>
              <li>
                <p>{person.email}</p>
              </li>
              <li>
                <ActionButton
                  onClick={() => handleToggle(person.id)}
                  active={toggle[person.id]}
                >
                  <button type="button">
                    <MdMoreHoriz className="active" size={24} color="#C6C6C6" />
                  </button>

                  <Action visible={toggle[person.id]}>
                    <button
                      type="button"
                      onClick={() =>
                        editPage(person.id, person.avatar.url, person.avatar.id)
                      }
                    >
                      <MdCreate size={24} color="#4D85EE" />
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(person.id)}
                    >
                      <MdDeleteForever size={24} color="#f00" />
                      Excluir
                    </button>
                  </Action>
                </ActionButton>
              </li>
            </ul>
          ))}
        </Grid>
      </Content>
      <Pagination
        count={totalPages}
        page={page}
        onChange={paginate}
        variant="outlined"
        shape="rounded"
      />
    </Container>
  );
}
