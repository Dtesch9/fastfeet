/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import produce from 'immer';
import { toast } from 'react-toastify';
import { MdMoreHoriz, MdDeleteForever, MdVisibility } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import Loading from '~/components/Loading';
import Content from '~/components/Content';
import ActionButton from '~/components/Action/ActionButton';
import Action from '~/components/Action';
import Modal from '~/components/Modal';
import Pagination from '~/components/Pagination';

import { Grid } from './styles';

export default function Problem() {
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState([]);
  const [toggle, setToggle] = useState({});
  const [modalInfo, setModalInfo] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadProblems() {
      try {
        setLoading(true);

        const response = await api.get('/delivery/problems', {
          params: { page },
        });

        const pageLimit = Math.ceil(response.headers['x-total-count'] / 10);

        setTotalPages(pageLimit);

        const data = response.data.map(problem => ({
          problem_id: problem.id,
          pack_id: problem.delivery.id,
          filteredPackId:
            problem.delivery.id < 10
              ? `0${problem.delivery.id}`
              : problem.delivery.id,
          description: problem.description,
        }));

        setLoading(false);
        setProblems(data);
      } catch (err) {
        toast.error('Erro inesperado, tente novamente');

        setLoading(false);
      }
    }

    loadProblems();
  }, [page]);

  function handleToggle(id) {
    const newToggle = produce(toggle, draft => {
      draft[id] = !draft[id];
    });

    setToggle(newToggle);
  }

  async function handleDelete(id) {
    try {
      // eslint-disable-next-line no-restricted-globals
      const confirmation = confirm(
        'Tem certeza que deseja cancelar a encomenda? '
      );

      if (confirmation) {
        await api.delete(`/problem/${id}/cancel-delivery`);

        toast.success('Entrega cancelada com sucesso');

        history.go(0);
      }
    } catch (error) {
      toast.error('Erro inesperado, tente novamente');
    }
  }

  function paginate(_, newPage) {
    setPage(newPage);
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      <Content>
        <Grid>
          <ul>
            <li>
              <strong>Encomenda</strong>
            </li>
            <li>
              <strong>Problema</strong>
            </li>
            <li>
              <strong>Ações</strong>
            </li>
          </ul>

          {problems.map(problem => (
            <ul key={problem.problem_id}>
              <li>
                <p>{`#${problem.filteredPackId}`}</p>
              </li>
              <li>
                <p>{problem.description}</p>
              </li>
              <li>
                <ActionButton
                  onClick={() => handleToggle(problem.problem_id)}
                  active={toggle[problem.problem_id]}
                >
                  <button type="button">
                    <MdMoreHoriz className="active" size={24} color="#C6C6C6" />
                  </button>

                  <Action
                    className="problem-action"
                    visible={toggle[problem.problem_id]}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setModalInfo({ problem: problem.description })
                      }
                    >
                      <MdVisibility size={24} color="#8E5BE8" />
                      Vizualizar
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(problem.problem_id)}
                    >
                      <MdDeleteForever size={24} color="#f00" />
                      Cancelar encomenda
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
        page={page}
        onChange={paginate}
        variant="outlined"
        shape="rounded"
      />
    </>
  );
}
