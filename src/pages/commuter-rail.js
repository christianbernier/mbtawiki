import React from "react";
import { css } from "@emotion/core";
import Header from "../components/Header";
import GlobalCSS from "../components/GlobalCSS";
import LineButton from "../components/LineButton";
import CommuterRailTrainGlyph from "../../images/CommuterRailTrainGlyph.png";

export default () => {
  const crLines = [
    "Fairmount Line",
    "Fitchburg Line",
    "Framingham/ Worcester Line",
    "Franklin Line/ Foxboro Pilot",
    "Greenbush Line",
    "Haverhill Line",
    "Kingston/ Plymouth Line",
    "Lowell Line",
    "Middleborough/ Lakeville Line",
    "Needham Line",
    "Newburyport/ Rockport Line",
    "Providence/ Stoughton Line"
  ];
  const crLinks = [
    "line?l=CR-Fairmount",
    "line?l=CR-Fitchburg",
    "line?l=CR-Worcester",
    "line?l=CR-Franklin",
    "line?l=CR-Greenbush",
    "line?l=CR-Haverhill",
    "line?l=CR-Kingston",
    "line?l=CR-Lowell",
    "line?l=CR-Middleborough",
    "line?l=CR-Needham",
    "line?l=CR-Newburyport",
    "line?l=CR-Providence"
  ];

  return (
    <>
      <Header />
      <GlobalCSS />
      <div
        css={css`
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 100px;
          min-height: 90vh;
          padding-bottom: 100px;

          @media only screen and (max-width: 1310px) {
            padding: 0 15px;
            padding-bottom: 30px;
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
          <img
            css={css`
              height: 50px;
              margin-right: 10px;

              @media only screen and (max-width: 1310px) {
                display: none;
              }
            `}
            src={CommuterRailTrainGlyph}
            alt={"Commuter Rail Train Glyph"}
          />
          Commuter Rail
        </p>
        {crLines.map((line, index) => {
          return (
            <LineButton
              key={line}
              color="#F5B6FF"
              text={line}
              image={null}
              textColor="var(--dark-background)"
              whenPressed={crLinks[index]}
              mode="multi-line"
            />
          );
        })}
      </div>
    </>
  );
};
