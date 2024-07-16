import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  #root {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-block-size: 100dvh;
    width: min(100vw, 900px);
    margin: 0 auto;

    padding: 36px 19px 27px;

    padding-top: 36px;
    padding-bottom: 27px;
  }

  :root{
    --primary-color: #03D69D;
    --dark-blue: #133A6F;
    --red-color: #D60336;
    --bg-opacity: rgba(3, 214, 157, .05);

    --primary-text-color: #4D4D4D;
    --secondary-text-color: #AFAFAF;

    --grey-border: #e5e5e5;

    --primary-font: 'Nunito', sans-serif;
  }
`;


export const MainText = styled.h1`
  width: 100%;

  text-wrap: wrap;
  text-align: center;

  font-family: var(--primary-font);
  font-weight: 800;
  font-size: 24px;
  color: var(--primary-text-color);
`;