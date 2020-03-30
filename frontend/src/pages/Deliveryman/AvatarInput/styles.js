import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 150px;
      width: 150px;
      border-radius: 50%;
      border: 3px dashed #ddd;

      span {
        font-size: 16px;
        font-weight: bold;
        color: #dddddd;
      }
    }

    img {
      height: 148px;
      width: 148px;
      border-radius: 50%;
    }

    input {
      display: none;
    }
  }
`;
