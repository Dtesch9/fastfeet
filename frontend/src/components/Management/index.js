import React, { memo } from 'react';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import PropTypes from 'prop-types';
import history from '~/services/history';

import { Container, Actions } from './styles';

function ManagementControl({ title }) {
  return (
    <Container>
      <h1>{title}</h1>
      <Actions>
        <button type="button" onClick={() => history.goBack()}>
          <MdKeyboardArrowLeft size={24} color="#fff" />
          VOLTAR
        </button>
        <button type="submit" form="form">
          <MdDone size={24} color="#fff" />
          SALVAR
        </button>
      </Actions>
    </Container>
  );
}

export default memo(ManagementControl);

ManagementControl.propTypes = {
  title: PropTypes.string.isRequired,
};
