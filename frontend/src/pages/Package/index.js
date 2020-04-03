/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import produce from 'immer';
import {
  MdMoreHoriz,
  MdDeleteForever,
  MdCreate,
  MdVisibility,
} from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import StatusFilter from '~/utils/StatusFilter';

import Loading from '~/components/Loading';
import AboveContent from '~/components/AboveContent';
import Content from '~/components/Content';
import ActionButton from '~/components/Action/ActionButton';
import Action from '~/components/Action';
import Modal from '~/components/Modal';
import Pagination from '~/components/Pagination';

import { Container, Grid, Status } from './styles';

export default function Package() {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [toggle, setToggle] = useState({});
  const [modalInfo, setModalInfo] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(false);

  function formatData(data) {
    return data.map(pack => ({
      id: pack.id,
      formatedId: pack.id < 10 ? `0${pack.id}` : pack.id,
      product: pack.product,
      status: StatusFilter(pack.start_date, pack.end_date, pack.canceled_at),

      recipient: {
        id: pack.recipient.id,
        name: pack.recipient.name,
        street: pack.recipient.street,
        number: pack.recipient.number,
        complement: pack.recipient.complement,
        postal_code: pack.recipient.postal_code,
        city: pack.recipient.city,
        state: pack.recipient.state,
        signature_url: pack.signature && pack.signature.url,
      },

      deliveryman: {
        id: pack.delivery_man.id,
        name: pack.delivery_man.name,
        avatar: {
          id: pack.delivery_man.avatar.id,
          url: pack.delivery_man.avatar.url,
        },
      },

      dates: {
        withdraw: pack.start_date,
        delivered: pack.end_date,
      },
    }));
  }

  useEffect(() => {
    async function loadPackages() {
      try {
        setLoading(true);

        const response = await api.get('packages', {
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
          setPackages(data);
        } else {
          setLoading(false);
          setError(!!filter && true);
        }
      } catch (err) {
        toast.error('Erro inesperado, tente novamente');

        setLoading(false);
      }
    }

    loadPackages();
  }, [filter, page]);

  function handleToggle(id) {
    const newToggle = produce(toggle, draft => {
      draft[id] = !draft[id];
    });

    setToggle(newToggle);
  }

  function editPage(editable, id) {
    if (!editable) {
      toast.error('Permitido apenas edição de pacotes pendentes');

      return;
    }

    history.push({ pathname: '/dashboard/packages/edit', state: { id } });
  }

  async function handleDelete(id) {
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm('Tem certeza que deseja deleter? ');

    if (confirmation) {
      await api.delete(`packages/${id}`);

      setPackages(packages.filter(pack => pack.id !== id));
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
        title="Gerenciando encomendas"
        placeholder="Buscar por encomenda"
        path="/dashboard/packages/create"
        error={error}
      />
      <Content>
        <Grid>
          <ul>
            <li>
              <strong>ID</strong>
            </li>
            <li>
              <strong>Destinatário</strong>
            </li>
            <li>
              <strong>Entregador</strong>
            </li>
            <li>
              <strong>Cidade</strong>
            </li>
            <li>
              <strong>Estado</strong>
            </li>
            <li>
              <strong>Status</strong>
            </li>
            <li>
              <strong>Ações</strong>
            </li>
          </ul>

          {packages.map(pack => (
            <ul key={pack.id}>
              <li>
                <p>{`#${pack.formatedId}`}</p>
              </li>
              <li>
                <p>{pack.recipient.name}</p>
              </li>
              <li>
                <div>
                  <img
                    src={
                      pack.deliveryman.avatar.url ||
                      'https://api.adorable.io/avatars/55/abott@adorable.png'
                    }
                    alt=""
                  />
                  <p>{pack.deliveryman.name}</p>
                </div>
              </li>
              <li>
                <p>{pack.recipient.city}</p>
              </li>
              <li>
                <p>{pack.recipient.state}</p>
              </li>
              <li>
                <Status
                  background={pack.status.background}
                  color={pack.status.color}
                >
                  <span />
                  <strong>{pack.status.label}</strong>
                </Status>
              </li>
              <li>
                <ActionButton
                  onClick={() => handleToggle(pack.id)}
                  active={toggle[pack.id]}
                >
                  <button type="button">
                    <MdMoreHoriz className="active" size={24} color="#C6C6C6" />
                  </button>

                  <Action visible={toggle[pack.id]}>
                    <button type="button" onClick={() => setModalInfo(pack)}>
                      <MdVisibility size={24} color="#8E5BE8" />
                      Vizualizar
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        editPage(pack.status.label === 'PENDENTE', pack.id)
                      }
                    >
                      <MdCreate size={24} color="#4D85EE" />
                      Editar
                    </button>

                    <button type="button" onClick={() => handleDelete(pack.id)}>
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

      <Modal data={modalInfo} cleanModal={setModalInfo} />

      <Pagination
        count={totalPages}
        onChange={paginate}
        variant="outlined"
        shape="rounded"
      />
    </Container>
  );
}
