import styled from 'styled-components';

export const Content = styled.div`
  form {
    label {
      font-size: 14px;
      font-weight: bold;
    }

    .react-select__control {
      height: 45px;
    }

    .react-select__single-value {
      color: #999999;
      font-size: 16px;
      font-weight: normal;
    }

    .react-select__menu {
      color: #534f4f;
    }
  }
`;

export const Selectors = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Recipient = styled.div`
  width: 405px;

  #recipient {
    margin-top: 10px;
  }
`;

export const Deliveryman = styled.div`
  width: 405px;

  #deliveryman {
    margin-top: 10px;
  }
`;

export const Package = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;

  input {
    margin-top: 10px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    height: 45px;
    color: #999999;
    font-size: 16px;
    font-weight: normal;
    padding: 12px 15px;

    &::placeholder {
      opacity: 0.5;
    }
  }
`;
