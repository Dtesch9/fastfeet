import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Grid = styled.div`
  ul {
    grid-template-columns: 100px repeat(5, 1fr) 100px;
  }
`;

export const Status = styled.div`
  background: ${props => props.background};
  border-radius: 12px;
  padding: 5px 8px;

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props => props.color};
    margin-right: 6px;
  }

  strong {
    text-transform: uppercase;
    color: ${props => props.color};
    font-size: 14px;
    font-weight: bold;
  }
`;
