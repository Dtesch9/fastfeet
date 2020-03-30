import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { Container, Content } from './styles';

function AboveContent({ getFilter, title, placeholder, path, error }) {
  function handleSubmit(data) {
    const { filter } = data;

    getFilter(filter);
  }

  return (
    <Container>
      <h1>{title}</h1>

      <Content error={error}>
        <Form onSubmit={handleSubmit}>
          <div>
            <button type="submit">
              <MdSearch size={24} color="#999" />
            </button>
            <Input name="filter" placeholder={placeholder} autoComplete="off" />
          </div>
        </Form>
        <Link to={path}>
          <MdAdd size={24} color="#fff" />
          Cadastrar
        </Link>
      </Content>
    </Container>
  );
}

export default memo(AboveContent);

AboveContent.propTypes = {
  getFilter: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
};
