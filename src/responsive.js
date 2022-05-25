import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 767px) {
      ${props}
    }
  `;
};

export const landscapeAndroid = (props) => {
  return css`
  @media (max-width: 767px) and (orientation: landscape)  {
      ${props}
    }
  `;
};

export const landscapeIphone = (props) => {
  return css`
  @media screen and (min-width: 768px) and (max-width: 992px) {
      ${props}
    }
  `;
};
