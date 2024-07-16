import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background: #03D69D;
  border-radius: 50%;
  border: none;

  width: 200px;
  height: 200px;

  .svg {
    width: 110px;
    height: 90px;
  }

  .svg path {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    animation: draw 2s forwards ease-in-out;
    stroke-width: 0.2px;

    transition: all .3s;

    fill: white;
    fill-opacity: 0;
  }

  @keyframes draw {
    to {
      fill-opacity: 1;
      stroke-dashoffset: 0;
    }
  }
`;