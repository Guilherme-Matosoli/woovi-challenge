import styled from "styled-components";

export const Input = styled.input`
  position: relative;
  width: 26px;

  &:checked::before {
    content: url("/checked-icon.svg");

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    left: 50%;
    top: 50%;

    transform: translate(-50%, -50%);

    width: 26px;
    height: 26px;

    background-color: var(--primary-color);
    border: 1px solid var(--primary-color);
    border-radius: 50%;
  }
`;