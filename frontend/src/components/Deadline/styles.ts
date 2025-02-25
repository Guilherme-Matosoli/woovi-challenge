import styled from "styled-components";


export const Container = styled.div`
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
`;