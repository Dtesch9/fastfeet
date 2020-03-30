import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  min-height: 100vh;
  background: #7d40e7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  background: #fff;
  width: 360px;
  height: 425px;
  box-shadow: 0px 0px -4px 10px #00000033;
  border-radius: 4px;
  opacity: 1;
  padding: 64px 32px;
  display: flex;
  flex-direction: column;

  img {
    align-self: center;
    width: 90%;
    margin-bottom: 20px;
  }

  form {
    margin-top: 5px;

    strong {
      display: block;
      margin-bottom: 10px;
      font-size: 14px;
      text-align: left;
      font-weight: 600;
      color: #444444;
      margin-top: 15px;
    }

    input {
      display: block;
      width: 100%;
      height: 45px;
      border: 1px solid #dddddd;
      border-radius: 4px;
      padding-left: 10px;
      opacity: 1;

      &::placeholder {
        margin-left: 10px;
        font-size: 16px;
        color: #999999;
      }
    }

    span {
      background: #8650e4;
      font-size: 14px;
      color: white;
      display: block;
      width: 100%;
      padding: 4px 4px;
      border-radius: 2px;
    }

    button {
      margin-top: 15px;
      width: 100%;
      height: 45px;
      background: #7d40e7;
      border: none;
      border-radius: 4px;
      color: white;
      font-weight: bold;
      font-size: 14px;
      opacity: 1;

      &:hover {
        background: ${darken(0.04, '#7d40e7')};
      }
    }
  }
`;
