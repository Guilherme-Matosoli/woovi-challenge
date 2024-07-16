import styled from "styled-components";

export const Container = styled.div`
  width: 20px;
  height: 20px;

  border: 2px solid white;
  border-top: 2px solid var(--primary-color);
  border-radius: 50%;

  animation: loop 1s linear infinite;

  @keyframes loop {
    from {
      transform: rotate(0deg)
    }

    to {
      transform: rotate(360deg);
    }
  }
`;