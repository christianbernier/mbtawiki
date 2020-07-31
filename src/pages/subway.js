import React from "react";
import { css } from "@emotion/core";
import Header from "../components/Header";
import GlobalCSS from "../components/GlobalCSS";
import LineButton from "../components/LineButton";
import RedLineTrainGlyph from "../../images/RedLineTrainGlyph.png";
import GreenLineTrainGlyph from "../../images/GreenLineTrainGlyph.png";
import OrangeLineTrainGlyph from "../../images/OrangeLineTrainGlyph.png";
import BlueLineTrainGlyph from "../../images/BlueLineTrainGlyph.png";
import SilverLineBus from "../../images/SilverLineBus.png";
import MattapanTrolleyGlyph from "../../images/MattapanTrolleyGlyph.png";

export default () => {
  const subwayLines = [
    "Red Line",
    "Green Line",
    "Orange Line",
    "Blue Line",
    "Silver Line",
    "Mattapan Line"
  ];
  const subwayLinks = [
    "line?l=Red",
    "lines?l=Green",
    "line?l=Orange",
    "line?l=Blue",
    "lines?l=Silver",
    "line?l=Mattapan"
  ];
  const subwayColors = [
    "#FFC7C7",
    "#AFEAC7",
    "#FFDCA7",
    "#B1DAFF",
    "#D4D7DA",
    "#FFC7C7"
  ];
  const subwayHoverColors = [
    "#FF9D9D",
    "#4FD785",
    "#FEC36A",
    "#57AEFF",
    "#BCBEC0",
    "#FF9D9D"
  ];
  const subwayImages = [
    RedLineTrainGlyph,
    GreenLineTrainGlyph,
    OrangeLineTrainGlyph,
    BlueLineTrainGlyph,
    SilverLineBus,
    MattapanTrolleyGlyph
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
          Subway
        </p>
        {subwayLines.map((line, index) => {
          return (
            <LineButton
              color={subwayColors[index]}
              hoverColor={subwayHoverColors[index]}
              text={line}
              image={subwayImages[index]}
              textColor="var(--dark-background)"
              whenPressed={subwayLinks[index]}
              mode="multi-line"
            />
          );
        })}
      </div>
    </>
  );
};
