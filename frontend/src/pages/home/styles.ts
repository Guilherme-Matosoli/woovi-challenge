import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 34px;

  padding-bottom: 34px;

  .inputWrapper {
    display: flex;
    align-items: center;
    gap: 20px;

    width: 100%;
    height: 65px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 34px;

    width: 100%;
  }

  .buttonNew {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100px;
    height: 100%;

    background: #133A6F;
    border-radius: 8px;

    font-family: var(--primary-font);
    font-weight: 600;
    font-size: 18px;
    text-decoration: none;
    color: white;
  }
`;
