import styled from "styled-components";

export const Container = styled.article`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  min-height: 95px;

  border: 2px solid var(--grey-border);

  transition: background .3s;

  padding: 21px;

  &.first{
    border-radius: 10px 10px 0 0;
    border-bottom: none;
  }

  &.middle {
    border-radius: 0;
    border-bottom: none;
  }

  &.last {
    border-radius: 0 0 10px 10px;
  }

  .paymentInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .total {
    font-family: var(--primary-font);
    font-weight: 600;
    font-size: 24px;
    color: var(--primary-text-color);
  }

  .installment {
    font-family: var(--primary-font);
    font-weight: 600;
    font-size: 16px;
    color: var(--secondary-text-color);
  }

  .link {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 50px;
    height: 50px;

    border-radius: 50%;
    background: var(--primary-color);

    transition: all .3s;
    cursor: pointer;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;