import styled, { css } from 'styled-components';

export const ModalOverlay = styled.div`
  visibility: ${props => (props.visible ? 'initial' : 'hidden')};
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
`;

export const Content = styled.div`
  ${props =>
    props.isProblem
      ? css`
          width: 450px;
          height: 425px;
          top: calc(50% - 212px);
          left: calc(50% - 225px);
        `
      : css`
          top: calc(50% - 177px);
          left: calc(50% - 225px);
          width: 450px;
          height: 355px;
        `}

  z-index: 1;
  position: fixed;
  visibility: ${props => (props.visible ? 'initial' : 'hidden')};
  background: #fff;
  padding: 25px;
  box-shadow: 0 0 10px #00000033;
  border-radius: 4px;

  h4 {
    font-size: 14px;
    color: #444444;
    margin-bottom: ${props => (props.isProblem ? 0 : '5px')};
  }
`;

export const Info = styled.div`
  ${props =>
    props.isProblem
      ? css`
          h4 {
            text-transform: uppercase;
          }

          p {
            line-height: 25px;
          }
        `
      : css`
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
          margin-bottom: 10px;
        `}

  p {
    font-size: 16px;
    font-weight: normal;
    color: #666666;
    margin-top: 5px;
  }
`;

export const Date = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;

  strong,
  span {
    font-size: 16px;
    color: #666666;
  }

  strong {
    margin-top: 5px;
  }

  span {
    font-weight: normal;
  }
`;

export const Signature = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  img {
    margin-top: 15px;
    align-self: center;
    width: 234px;
    height: 75px;
  }

  strong {
    align-self: center;
    margin-top: 48px;
    font-size: 18px;
    text-transform: uppercase;
    color: #fab0b0;
    position: relative;

    &::after,
    &::before {
      content: '';
      position: absolute;
      background: #de3b3b;
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }

    &::after {
      right: -20px;
    }

    &::before {
      left: -20px;
    }
  }
`;
