import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 34px;
  flex: 1;

  padding-top: 40px;
  padding-bottom: 40px;

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 34px;

    width: 100%;
  }

  .oneTime {
    width: 100%;
  }

  .installments {
    width: 100%;
    min-height: 100%;
  }
`;
