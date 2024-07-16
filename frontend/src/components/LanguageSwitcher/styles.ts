import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  h3{
    font-family: var(--primary-font);
    font-weight: 600px;
    color: var(--primary-text-color);
  }

  div{
    display: flex;
    gap: 10px;
  }

  button{
    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    cursor: pointer;
    transition: all .3s;

    &:hover{
      transform: scale(1.1);
    }
  }

  button img{
    max-width: 30px;
  }
`;
