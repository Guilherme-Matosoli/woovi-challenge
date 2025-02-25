import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  width: 100%;
  height: 33px;

  display: flex;
  align-items: center;

  background-color: #133A6F;
  background-image: url("/flag-background.svg");
  border-radius: 5px;

  padding: 7px 10px;
  margin-top: 4px;

  &::after {
    content: "";

    position: absolute;
    top: 50%;
    right: 0;

    transform: translateY(-50%);

    width: 0;
    height: 0;

    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-right: 12px solid white;
  }

  abbr{
    text-decoration: none;
  }

  .text {
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: white;

    overflow: hidden;

    max-width: 90%;
    text-wrap: nowrap;
    text-overflow: ellipsis;
  }
`;