import React from "react";
import {css} from "@emotion/core";

export default ({ bgColor, hlColor, values, selectedValue, changeSelectedValue }) => {
  return(
    <div
      css={css`
        background-color: ${bgColor};
        width: auto;
        height: 50px;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 15px;
        cursor: pointer;
      `}
    >
      {values.map(v => {
        return(
          <div
            key={v}
            css={css`
              background-color: ${(v === selectedValue) ? hlColor : bgColor};
              width: 50%;
              height: 100%;
              display: flex;
              justify-content: center;
              border-radius: 10px;
              align-items: center;

              :hover{
                background-color: ${hlColor}
              }
            `}
            onClick={() => changeSelectedValue(v)}
          >
            <p
              css={css`
                font-size: 24px;
                font-weight: 800;
              `}
            >
              {(v === "Wickford Junction") ? "Providence" : v}
            </p>
          </div>
        )
      })}
    </div>
  )
}