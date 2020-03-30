import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';

import { Container, Layout } from './styles';

export default function Background({ children }) {
  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Layout />
      {children}
    </Container>
  );
}

Background.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};
