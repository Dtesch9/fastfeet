import styled from 'styled-components';

export const Content = styled.div`
  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: bold;
    color: #444444;
  }

  input {
    height: 45px;
    padding: 12px 25px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    font-weight: normal;
    color: #666666;

    &::placeholder {
      opacity: 0.7;
    }
  }
`;

export const Name = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Email = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
`;
