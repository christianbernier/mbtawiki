import React from "react";
import { Link } from "gatsby";
import { css } from "@emotion/core";

export default ({ color, hoverColor, text, link }) => {
  return (
    <Link
      to={"/" + link}
      css={css`
        text-decoration: none;
      `}
    >
      <div
        css={css`
          background-color: ${color};
          border-radius: 15px;
          min-height: 65px;
          margin-top: 20px;
          padding-left: 18px;
          padding-right: 18px;
          padding-top: 10px;
          padding-bottom: 10px;
          display: flex;
          justify-content: center;
          align-items: center;

          :hover{
            background-color: ${hoverColor}
          }
        `}
      >
        <div
          css={css`
            height: 100%;
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: stretch;
            flex-direction: row;
          `}
        >
          <p
            css={css`
              font-size: 36px;
              font-weight: 800;
              padding: 0;
              margin: 0;
            `}
          >
            {text}
          </p>
        </div>
      </div>
    </Link>
  );
};
