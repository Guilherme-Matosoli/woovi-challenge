import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  .info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  .description {
    font-family: var(--primary-font);
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .strong {
    font-family: var(--primary-font);
    font-size: 18px;
    font-weight: 800;
    color: var(--primary-text-color);
  }
`;