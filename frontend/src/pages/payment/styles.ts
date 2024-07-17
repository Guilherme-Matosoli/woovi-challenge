import styled from "styled-components";

export const Container = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  padding: 40px 0;

  .fee {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    font-family: 'Nunito', sans-serif;
    font-weight: 600;

    border-bottom: 2px solid #E5E5E5;
    padding-bottom: 20px;

    & .info {
      font-size: 14px;
    }

    & .value {
      font-size: 18px;
    }
  }

  .paymentId {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & span {
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 600;
      color: #B2B2B2;
    }

    & strong {
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 800;
      color: #4D4D4D;
    }
  }
`;
