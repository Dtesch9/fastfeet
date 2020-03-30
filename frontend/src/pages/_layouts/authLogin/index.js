import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';

export default function authLogin({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}

authLogin.propTypes = {
  children: PropTypes.element.isRequired,
};
