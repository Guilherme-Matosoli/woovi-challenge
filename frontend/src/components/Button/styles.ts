import styled from "styled-components";

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 100%;

  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: white;

  border: none;
  background-color: #133A6F;
  border-radius: 8px;

  padding: 7px;

  cursor: pointer;
  transition: all .3s;

  &:hover {
    filter: brightness(1.3);
  }


  &:disabled {
    background: grey;
  }
`;