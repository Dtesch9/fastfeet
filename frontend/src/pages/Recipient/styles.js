import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Grid = styled.div`
  ul {
    grid-template-columns: 120px 200px 2fr 100px;
  }
`;
