import React from "react";
import { Link } from "gatsby";
import { css } from "@emotion/core";

export default () => {
  return (
    <div
      css={css`
        background-color: var(--dark-background);
        height: 50px;
        width: auto;
        padding: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        @media only screen and (max-width: 1310px) {
          width: 100vw;
          flex-direction: column;
          padding: 0;
          height: auto;
        }
      `}
    >
      <Link
        to="/"
        css={css`
          text-decoration: none;
        `}
      >
        <p
          css={css`
            color: var(--font-white);
            font-size: 36px;
            font-weight: 900;
            margin-left: 60px;

            @media only screen and (max-width: 1310px) {
              margin-left: 0;
            }
          `}
        >
          MBTA Wiki
        </p>
      </Link>

      <div
        css={css`
          display: flex;
          flex-direction: row;
          margin-right: 60px;

          @media only screen and (max-width: 1310px) {
            display: none;
          }
        `}
      >
        {["Subway", "Commuter Rail", "Bus"].map(e => {
          return (
            <Link
              to={e.replace(" ", "-").toLowerCase()}
              css={css`
                text-decoration: none;
              `}
            >
              <p
                key={e}
                css={css`
                  color: var(--font-white);
                  font-size: 22px;
                  font-weight: 800;
                  margin-right: 40px;
                `}
              >
                {e}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
