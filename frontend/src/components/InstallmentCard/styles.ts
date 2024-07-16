import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  width: 100%;
  min-height: 95px;

  border: 2px solid var(--grey-border);

  transition: background .3s;

  padding: 21px;

  &.solo{
    border-radius: 10px;
  }

  &.first{
    border-radius: 10px 10px 0 0;
  }

  &.middle{
    border-radius: none;
    border-top: none;
  }

  &.last{
    border-radius: 0 0 10px 10px;
    border-top: none;
  }

  &:has(input:checked){
    background-color: var(--bg-opacity);
  }

  &:has(input:checked)::before,
  &.middle:has(input:checked)::before{
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;

    z-index: 0;

    width: 100%;
    height: 100%;

    border: 2px solid var(--primary-color);
    border-bottom: 2px solid var(--primary-color);
    border-radius: inherit;

    pointer-events: none;
  }

  &.first:has(input:checked)::before{
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;

    width: 100%;
    height: 100%;

    border: 2px solid var(--primary-color);
    border-bottom: 2px solid var(--primary-color);
    border-radius: inherit;
  }

  &.last:has(input:checked)::before{
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;

    width: 100%;
    height: 100%;

    border: 2px solid var(--primary-color);
    border-radius: inherit;
  }

  .mainCardInfo {
    position: absolute;
    bottom: 100%;
    left: 20px;

    transform: translateY(50%);

    background-color: #E5E5E5;
    border-radius: 100px;
    padding: 0 20px;

    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    font-size: 18px;
    color: #4D4D4D;
  }

  .hidden {
    display: none;
  }

  .topSide {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }



  .installmentInfo {
    font-family: 'Nunito', sans-serif;
    font-size: 24px;
    font-weight: 600;
    color: #4D4D4D;

    line-height: 32.74px;

    & span {
      font-weight: 800;
    }
  }

  .bonusInfo {
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #03D69D;

    line-height: 20px;
    margin-top: 1px;

    & strong {
      font-weight: 800;
    }
  }

  .total {
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #AFAFAF;

    line-height: 21.82px;

    & strong {
      font-weight: 800;
    }
  }
`;