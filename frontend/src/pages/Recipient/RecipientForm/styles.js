import styled from 'styled-components';

export const Content = styled.div`
  label {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #444444;
  }

  input {
    height: 45px;
    padding: 12px 15px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    font-size: 16px;
    font-weight: normal;
    color: #999999;

    &::placeholder {
      opacity: 0.7;
    }
  }

  div.levelOne,
  div.levelTwo {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
`;

export const Name = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Street = styled.div`
  display: flex;
  flex-direction: column;
  width: 518px;
`;

export const Number = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
`;

export const Complement = styled.div`
  display: flex;
  flex-direction: column;
  width: 140px;
`;

export const City = styled.div`
  display: flex;
  flex-direction: column;
  width: 269px;
`;

export const State = styled.div`
  display: flex;
  flex-direction: column;
  width: 269px;
`;

export const PostalCode = styled.div`
  display: flex;
  flex-direction: column;
  width: 269px;
`;
