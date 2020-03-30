import styled from 'styled-components';
import { colors } from '~/styles/colors';

export const Container = styled.div`
  width: 100%;
  padding: 0 20px;
  background: #ffffff;
  border: 1px solid ${colors.dd};
`;

export const Content = styled.div`
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;

  img {
    width: 135px;
    height: 26px;
    margin-right: 30px;
  }

  nav {
    padding-left: 30px;
    border-left: 1px solid ${colors.dd};

    a {
      text-transform: uppercase;
      line-height: 32px;
      font-size: 15px;
      font-weight: bold;
      text-align: left;
      color: #999999;

      & + a {
        margin-left: 20px;
      }

      &:hover {
        color: #444444;
      }
    }
  }
`;

export const Account = styled.div`
  margin-left: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  strong {
    text-transform: uppercase;
    text-align: center;
    color: #666;
    opacity: 1;
    font-size: 14px;
    font-weight: bold;
  }

  button {
    width: 172px;
    height: 28px;
    padding: 4px;
    border-radius: 2px;
    color: black;
    font-size: 14px;
    font-weight: normal;
    background: white;
    border: 2px solid ${colors.fastfeet};
    transition: background 300ms;

    &:hover {
      padding: 6px 5px;
      color: white;
      background: ${colors.fastfeet};
      text-transform: uppercase;
      font-size: 12px;
      font-weight: bold;
    }
  }
`;
