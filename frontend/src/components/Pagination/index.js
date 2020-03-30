import styled from 'styled-components';
import { lighten, darken } from 'polished';
import { Pagination as PaginationUi } from '@material-ui/lab';

const Pagination = styled(PaginationUi)`
  margin-top: auto;
  margin-bottom: 35px;
  align-self: center;

  button.MuiPaginationItem-page.Mui-selected {
    color: white;
    background: rgba(0, 0, 0, 0.9);

    &.MuiPaginationItem-outlined {
      color: #fff;
    }
  }

  li {
    button {
      background: ${darken(0.15, '#7d40e7')};
      color: #fff;

      &:hover {
        background: ${lighten(0.1, '#000')};
        color: #fff;
      }
    }
  }
`;

export default Pagination;
