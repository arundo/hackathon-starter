import styled from 'styled-components';

export const TitleBoard = styled.div`
  text-align: left;
  @media (max-width: 700px) {
    text-align: center;
  }
  h3 {
    color: #0182c8;
  }
  span {
    color: #fafafa;
    font-size: 0.5rem;
    margin: 0.5rem;
    background-color: #ef5350;
    padding: 0.3rem;
    border-radius: 0.3rem;
    cursor: pointer;
    transition: all 0.5s;
  }
  span:hover {
    background-color: #d32f2f
    transition: all 0.5s;
  }
  div {
    display: flex;
    margin: 0.5rem 0;
    @media (max-width: 700px) {
      align-items: center;
      justify-content: center;
    }
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 0.2rem;
    font-size: 1rem;
    transition: all 0.5s;
    background-color: #ef5350;
    color: #fafafa;
    cursor: pointer;
  }
  button:hover {
    background-color: #d32f2f;
    transition: all 0.5s;
  }
  button:focus {
    outline: 0;
  }
  input {
    height: 2rem;
    border-radius: 0.2rem;
    border-style: solid;
    border: 0.5px solid lightgray;
    text-align: center;
    font-size: 1rem;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px 20px;
  border-radius: 0.5rem;
  @media (max-width: 700px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 65%;
  @media (max-width: 700px) {
    height: 50%;
  }
`;

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: 90%;
  max-width: 100rem;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
`;
