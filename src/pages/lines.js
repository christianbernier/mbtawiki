import React from "react";
import { css } from "@emotion/core";
import GlobalCSS from "../components/GlobalCSS";
import Header from "../components/Header";
import LineButton from "../components/LineButton";

export default () => {
  function getUrlVars() {
    let vars = {};
    if(typeof window !== "undefined"){
      let parts = window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        function(m, key, value) {
          vars[key] = value;
        }
      );
    } else{
      return {
        l: "Green"
      }
    }
    return vars;
  }
  const line = getUrlVars().l;
  let lineFullName,
    lineMutedColor,
    subLines,
    subLineTitles;

  switch (line) {
    case "Green":
      lineFullName = "Green Line";
      lineMutedColor = "#AFEAC7";
      subLines = ["Green-B", "Green-C", "Green-D", "Green-E"];
      subLineTitles = ["B Branch", "C Branch", "D Branch", "E Branch"];
      break;
    case "Silver":
      lineFullName = "Silver Line";
      lineMutedColor = "#D4D7DA";
      subLines = ["741", "742", "743", "751", "749"];
      subLineTitles = ["SL1", "SL2", "SL3", "SL4", "SL5"];
      break;
    default:
      lineFullName = "Invalid lines code.";
  }

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
            padding: 0 15px;
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
          {lineFullName}
        </p>
        {subLines.map((l, i) => {
          return (
            <LineButton
              color={lineMutedColor}
              text={subLineTitles[i]}
              textColor="var(--dark-background)"
              whenPressed={"line?l=" + l}
              mode="multi-line"
            />
          );
        })}
      </div>
    </>
  );
};
