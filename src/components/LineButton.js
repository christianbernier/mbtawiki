import React from "react";
import { Link } from "gatsby";
import { css } from "@emotion/core";

export default ({ color, text, image, whenPressed, textColor, centerText, mode }) => {
  let width;

  switch(mode){
    case "bus": width = "200px"; break;
    case "multi-line": width = "500px"; break;
    default: width = "350px";
  }

  return (
    <Link
      to={whenPressed}
      css={css`
        text-decoration: none;
        margin: 10px;
      `}
    >
      <div
        css={css`
          height: 100px;
          width: ${width};
          background-color: ${color};
          border-radius: 15px;
          display: grid;
          grid-template-areas: ${image ? "img text" : "text"};
          grid-template-rows: auto;
          grid-template-columns: ${image ? "90px auto" : "auto"};

          @media only screen and (max-width: 1300px){
            width: 350px;
          }

        `}
      >
        <div
          css={css`
            grid-area: "img";
            text-align: center;
            margin-left: ${(mode === "bus") ? "0" : "10px"};
            display: ${image ? "" : "none"};
          `}
        >
          <img
            css={css`
              height: 75px;
              margin-top: 12.5px;
            `}
            src={image}
            alt={text + " glyph"}
          />
        </div>
        <div
          css={css`
            grid-area: "text";
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: ${(centerText) ? "center" : "left"};
          `}
        >
          <p
            css={css`
              margin-left: ${(mode === "bus") ? "0" : "15px"};
              font-size: 32px;
              font-weight: 800;
              color: ${textColor};
              margin-top: 0;
              margin-bottom: 0;
            `}
          >
            {text}
          </p>
        </div>
      </div>
    </Link>
  );
};
