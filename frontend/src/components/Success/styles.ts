import styled from "styled-components";

export const Container = styled.article`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;

  background: rgb(255, 255, 255);

  width: 100vw;
  height: 100dvh;

  h2 {
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    color: #4d4d4d;
  }
`;