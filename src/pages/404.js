import React from "react";
import { css } from "@emotion/core";
import GlobalCSS from "../components/GlobalCSS";
import Header from "../components/Header";

export default () => {
  return (
    <>
      <GlobalCSS />
      <Header />
      <div
        css={css`
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 100px;
          min-height: 90vh;
          padding-bottom: 100px;

          @media only screen and (max-width: 1310px) {
            padding: 0 30px 30px 15px;
          }
        `}
      >
        <p
          css={css`
            font-size: 54px;
            font-weight: 900;
            margin-bottom: 0;
          `}
        >
          Page not found!
        </p>
      </div>
    </>
  );
};
