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
        <p
          css={css`
            font-size: 21px;
            font-weight: 450;
            margin-bottom: 0;
            margin-top: 15px;
          `}
        >
          I'm sorry—we couldn't find the page you were looking for. Please check the URL or return to the homepage.
          <br/><br/>If this was a problem with a built-in link, please report the bug by emailing bug@cbernier.com. Thank you.
        </p>
      </div>
    </>
  );
};
