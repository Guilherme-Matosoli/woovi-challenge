import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  width: 100%;

  .input {
    width: 100%;

    border-radius: 8px;
  }

  .input input {
    font-size: 18px;
    font-family: var(--primary-font);
    font-weight: 600;
    color: var(--primary-text-color);

    padding: 20px 15px;
  }

  .input fieldset {
    border: 2px solid var(--grey-border);
    border-radius: 8px;

    transition: all .3s;

    & legend span {
      display: none;
    }
  }

  .input label {
    font-size: 18px;
    font-family: var(--primary-font);
    font-weight: 600;
    color: var(--primary-text-color);

    background: white;

    transform: translate(20px, 20px);

    & span {
      display: none;
    }
  }

  .error {
    font-family: var(--primary-font);
    font-weight: 400;
    font-size: 14px;

    color: red;

    padding-left: 20px;
  }
`;