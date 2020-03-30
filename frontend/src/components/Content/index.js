import styled from 'styled-components';

const Content = styled.div`
  margin: 50px 0 50px;
  width: 100%;

  ul {
    display: flex;
    width: 100%;
    margin-top: 10px;
    padding: 18px 12px;
    border-radius: 4px;
    background: #fff;

    display: grid;

    &:first-child {
      background: none;

      li {
        strong {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }

  li {
    display: flex;
    align-items: center;

    &:last-child {
      justify-content: center;
    }

    div {
      display: flex;
      align-items: center;

      img {
        margin-right: 8px;

        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
    }

    p {
      font-size: 16px;
      font-weight: 300;
      color: #666666;
    }
  }
`;

export default Content;
