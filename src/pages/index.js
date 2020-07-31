import React from "react";
import { css } from "@emotion/core";
import { Link } from "gatsby";
import GlobalCSS from "../components/GlobalCSS";
import RedLineTrainGlyph from "../../images/RedLineTrainGlyph.png";
import GreenLineTrainGlyph from "../../images/GreenLineTrainGlyph.png";
import OrangeLineTrainGlyph from "../../images/OrangeLineTrainGlyph.png";
import BlueLineTrainGlyph from "../../images/BlueLineTrainGlyph.png";
import SilverLineBus from "../../images/SilverLineBus.png";
import MattapanTrolleyGlyph from "../../images/MattapanTrolleyGlyph.png";
import CommuterRailTrainGlyph from "../../images/CommuterRailTrainGlyph.png";
import BusGlyph from "../../images/BusGlyph.png";
import LineButton from "../components/LineButton";

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
  const crLines = [
    "Fairmount Line",
    "Fitchburg Line",
    "Framingham/ Worcester Line",
    "Franklin Line/ Foxboro Pilot",
    "Greenbush Line",
    "Haverhill Line",
    "Kingston/Plymouth Line",
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
  const busLines = [
    "1",
    "15",
    "22",
    "23",
    "28",
    "32",
    "39",
    "57",
    "66",
    "71",
    "73",
    "77",
    "111",
    "116",
    "117"
  ];

  return (
    <>
      <GlobalCSS />
      <div
        css={css`
          background-color: var(--dark-background);
          height: 150px;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <p
          css={css`
            color: var(--font-white);
            font-size: 52px;
            font-weight: 900;
          `}
        >
          MBTA Wiki
        </p>
      </div>
      <div
        css={css`
          width: 100vw;
          min-height: 50px;
          background-color: #4a5568;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <p
          css={css`
            color: var(--font-white);
            font-size: 21px;
            font-weight: 700;
            font-style: italic;
            margin: 0;
            padding: 20px;
          `}
        >
          Download the MBTA Wiki mobile app on the Apple App Store!
        </p>
      </div>
      <div
        css={css`
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 100px;
          min-height: calc(100vh - 50px);

          @media only screen and (max-width: 1310px) {
            padding: 0 15px;
          }
          /* border: 1px solid red; */
        `}
      >
        <div
          css={css`
            width: 100%;
            margin-top: 75px;
            /* border: 1px solid blue; */
          `}
        >
          <Link
            to="/subway"
            css={css`
              text-decoration: none;
            `}
          >
            <p
              css={css`
                color: var(--dark-background);
                font-size: 42px;
                font-weight: 800;
                margin-bottom: 10px;

                @media only screen and (min-width: 1310px) {
                  margin-left: 25px;
                }
              `}
            >
              Subway
            </p>
          </Link>

          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
              justify-content: space-around;
              /* border: 1px solid green; */
            `}
          >
            {subwayLines.map((line, index) => {
              return (
                <LineButton
                  key={line}
                  color={subwayColors[index]}
                  hoverColor={subwayHoverColors[index]}
                  text={line}
                  image={subwayImages[index]}
                  textColor="var(--dark-background)"
                  whenPressed={subwayLinks[index]}
                />
              );
            })}
          </div>
        </div>
        <div
          css={css`
            width: 100%;
            margin-top: 50px;
          `}
        >
          <Link
            to="/commuter-rail"
            css={css`
              text-decoration: none;
            `}
          >
            <p
              css={css`
                color: var(--dark-background);
                font-size: 42px;
                font-weight: 800;
                width: fit-content;
                margin-bottom: 10px;

                @media only screen and (min-width: 1310px) {
                  margin-left: 25px;
                }
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
          </Link>

          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
              justify-content: space-around;
            `}
          >
            {crLines.map((line, index) => {
              return (
                <LineButton
                  color="#F5B6FF"
                  hoverColor="#E55FFB"
                  text={line}
                  image={null}
                  textColor="var(--dark-background)"
                  whenPressed={crLinks[index]}
                />
              );
            })}
          </div>
        </div>
        <div
          css={css`
            width: 100%;
            margin-top: 50px;
          `}
        >
          <p
            css={css`
              color: var(--dark-background);
              font-size: 42px;
              font-weight: 800;
              margin-bottom: 10px;
              display: flex;
              flex-direction: row;
              @media only screen and (min-width: 1310px) {
                margin-left: 25px;
              }
            `}
          >
            <img
              css={css`
                height: 50px;
                margin-right: 10px;

                @media only screen and (max-width: 1310px){
                  display: none;
                }
              `}
              src={BusGlyph}
              alt={"Bus Glyph"}
            />
            <Link
              to="/bus"
              css={css`
                text-decoration: none;
                display: flex;
                flex-direction: row;
              `}
            >
              <p
                css={css`
                  margin: 0;
                  margin-top: 8px;
                `}
              >
                Bus
              </p>

              <p
                css={css`
                  color: var(--dark-background);
                  font-size: 22px;
                  font-weight: 600;
                  margin: 0;
                  margin-top: 25px;
                  text-decoration: underline;
                  margin-left: 10px;
                `}
              >
                View all bus routes →
              </p>
            </Link>
          </p>

          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
              justify-content: space-around;
            `}
          >
            {busLines.map((line, index) => {
              return (
                <LineButton
                  color="#FFEAB6"
                  hoverColor="#F9CA51"
                  text={line}
                  image={null}
                  centerText={true}
                  mode="bus"
                  textColor="var(--dark-background)"
                  whenPressed={`line?l=${line}`}
                />
              );
            })}
          </div>
        </div>
        <div
          css={css`
            height: 100px;
          `}
        />
      </div>
      <div
        css={css`
          background-color: #e2e8f0;
          width: 100vw;
          height: auto;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <p
          css={css`
            font-style: italic;
            padding: 20px;
          `}
        >
          MBTA Wiki
          <Link
            to="/update-log"
            css={css`
              color: var(--dark-background);
              margin: 0 4px;
            `}
          >
            v1.6.4
          </Link>
          ©2017-2020 to Christian Bernier.
        </p>
      </div>
    </>
  );
};
