import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;

  & select {
    width: 100%;

    padding: 20px;

    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    font-size: 18px;
    color: #4D4D4D;

    border: 2px solid #e5e5e5;
    border-radius: 8px;
    outline: none;

    appearance: none;
    cursor: pointer;
    transition: all .3s;
  }

  & select:hover {
    border: 2px solid black;
  }

  & select:focus {
    border: 2px solid #0c8ce9;
  }

  & select option {
    width: 100%;
  }

  & label {
    position: absolute;
    bottom: 100%;

    transform: translate(20px, 10px);

    font-family: 'Nunito';
    font-weight: 600;
    font-size: 14px;
    color: #4d4d4d;

    padding: 0 2px;
    background: white;
  }

  & img {
    position: absolute;
    right: 20px;
    top: 50%;

    transform: translateY(-50%);
    transition: all .3s;
  }

  &:has(select:focus) img {
    transform: rotate(180deg);
  }

  &:has(select:focus) label {
    color: #0c8ce9;
  }
`;