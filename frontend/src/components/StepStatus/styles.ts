import styled from "styled-components";

export const Container = styled.div`
  width: 16px;
  aspect-ratio: 1/1;

  border: 2px solid #E5E5E5;
  border-radius: 50%;
  background: white;

  &.actual {
    border: 2px solid #03D69D;
  }

  &.next {
    position: relative;

    &::before {
      content: "";

      position: absolute;
      z-index: -1;
      left: 50%;
      top: 100%;

      transform: translateX(-50%);

      width: 2px;
      height: 30px;

      background: #E5E5E5;
    }
  }

  &.checked {
    display: flex;
    align-items: center;
    justify-content: center;

    background: #03D69D;
    border: 2px solid #03D69D;

    & img {
      max-width: 7px;
    }
  }
`;