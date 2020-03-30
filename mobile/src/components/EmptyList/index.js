import React from 'react';
import PropTypes from 'prop-types';

import { EmptyComponent, Logo, Description } from './styles';

export default function EmptyList({ text }) {
  return (
    <EmptyComponent>
      <Logo />
      <Description>{text}</Description>
    </EmptyComponent>
  );
}

EmptyList.propTypes = {
  text: PropTypes.string,
};

EmptyList.defaultProps = {
  text: '',
};
