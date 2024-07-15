import styled from "styled-components";


export const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;

  width: 100%;

  h3 {
    font-family: var(--primary-font);
    font-weight: 800;
    font-size: 24px;
    color: var(--primary-color);
  }

  .circle {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 150px;
    height: 150px;

    background: var(--red-color);
    border-radius: 50%;
  }
`;