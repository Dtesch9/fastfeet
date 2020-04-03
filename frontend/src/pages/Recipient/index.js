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

export default function Recipient() {
  const [loading, setLoading] = useState(false);
  const [recipients, setRecipients] = useState([]);
  const [toggle, setToggle] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(false);

  function formatData(data) {
    return data.map(reci => ({
      id: reci.id,
      formatedId: reci.id < 10 ? `0${reci.id}` : reci.id,
      name: reci.name,
      address: `${reci.street}, ${reci.number} ${reci.complement}, ${reci.city} - ${reci.state}`,
      postal_code: reci.postal_code,
    }));
  }

  useEffect(() => {
    async function loadRecipients() {
      try {
        setLoading(true);

        const response = await api.get('recipients', {
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
          setRecipients(data);
        } else {
          setLoading(false);
          setError(!!filter && true);
        }
      } catch (err) {
        toast.error('Erro inesperado, tente novamente');

        setLoading(false);
      }
    }

    loadRecipients();
  }, [filter, page]);

  function handleToggle(id) {
    const newToggle = produce(toggle, draft => {
      draft[id] = !draft[id];
    });

    setToggle(newToggle);
  }

  function editPage(id, postal_code) {
    history.push('/dashboard/recipients/edit', { id, postal_code });
  }

  async function handleDelete(id) {
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm('Tem certeza que deseja deleter? ');

    if (confirmation) {
      await api.delete(`recipients/${id}`);

      setRecipients(recipients.filter(reci => reci.id !== id));
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
        title="Gerenciando destinatários"
        placeholder="Buscar por Destinatário"
        path="/dashboard/recipients/create"
        error={error}
      />
      <Content>
        <Grid>
          <ul>
            <li>
              <strong>ID</strong>
            </li>
            <li>
              <strong>Nome</strong>
            </li>
            <li>
              <strong>Endereço</strong>
            </li>
            <li>
              <strong>Ações</strong>
            </li>
          </ul>

          {recipients.map(reci => (
            <ul key={reci.id}>
              <li>
                <p>{`#${reci.formatedId}`}</p>
              </li>
              <li>
                <p>{reci.name}</p>
              </li>
              <li>
                <p>{reci.address}</p>
              </li>
              <li>
                <ActionButton
                  onClick={() => handleToggle(reci.id)}
                  active={toggle[reci.id]}
                >
                  <button type="button">
                    <MdMoreHoriz className="active" size={24} color="#C6C6C6" />
                  </button>

                  <Action visible={toggle[reci.id]}>
                    <button
                      type="button"
                      onClick={() => editPage(reci.id, reci.postal_code)}
                    >
                      <MdCreate size={24} color="#4D85EE" />
                      Editar
                    </button>
                    <button type="button" onClick={() => handleDelete(reci.id)}>
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
