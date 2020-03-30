import React from 'react';
import { FaSpinner } from 'react-icons/fa';

import { Container } from './styles';

export default function Loading() {
  return (
    <Container>
      <FaSpinner />
    </Container>
  );
}
