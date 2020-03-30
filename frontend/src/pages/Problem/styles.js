import styled from 'styled-components';

export const Grid = styled.div`
  ul {
    grid-template-columns: 1fr 3fr 100px;

    li {
      &:nth-child(2) {
        max-width: 500px;

        @media (max-width: 860px) {
          max-width: 300px;
        }

        p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      div.problem-action {
        width: 210px;
        left: calc(50% - 105px);
      }
    }
  }
`;
