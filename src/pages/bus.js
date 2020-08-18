import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";
import Header from "../components/Header";
import GlobalCSS from "../components/GlobalCSS";
import LineButton from "../components/LineButton";
import BusGlyph from "../../images/BusGlyph.png";

export default () => {
  const [busRoutes, setBusRoutes] = useState([]);
  const [query, setQuery] = useState("");
  const [routesLoaded, setRoutesLoaded] = useState(false);

  const handleInputChange = () => {
    const value = document.getElementById("textInput").value;
    setQuery(value);
  };

  useEffect(() => {
    fetch(
      `https://api-v3.mbta.com/routes?api_key=e9cca8f8775749b9b79e4bed57f6216c`
    )
      .then((data) => data.json())
      .then((data) => data?.data)
      .then((data) => {
        let routesFromAPI = [];
        for (const route of data) {
          if (
            [
              "Red",
              "Mattapan",
              "Orange",
              "Blue",
              "741",
              "742",
              "743",
              "751",
              "749",
            ].indexOf(route.id) !== -1
          ) {
            continue;
          } else if (route.id.indexOf("Green-") !== -1) {
            continue;
          } else if (route.id.indexOf("CR-") !== -1) {
            continue;
          } else if (route.id.indexOf("Boat-") !== -1) {
            continue;
          }
          routesFromAPI.push(route.id);
        }
        setBusRoutes(routesFromAPI);
        setRoutesLoaded(true);
      });
  }, []);

  function betterName(r) {
    switch (r) {
      case "747":
        return "CT2";
      case "708":
        return "CT3";
      default:
        return r;
    }
  }

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
        <div
          css={css`
            display: flex;
            flex-direction: row;
            vertical-align: bottom;
            float: bottom;
            padding-top: 50px;

            @media only screen and (max-width: 1310px) {
              flex-direction: column;
            }
          `}
        >
          <p
            css={css`
              font-size: 54px;
              font-weight: 900;
              margin-bottom: 0;
              margin-left: 20px;
              margin-top: 0;

              @media only screen and (max-width: 1310px) {
                margin-left: 0;
              }

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
              src={BusGlyph}
              alt={"Bus Glyph"}
            />
            Bus
          </p>
          <input
            css={css`
              max-width: 200px;
              height: 50px;
              border: 4px solid #f9ca51;
              margin-left: 20px;
              margin-bottom: 0;
              border-radius: 10px;
              background-color: #ffeab6;
              color: #f9ca51;
              font-size: 24px;
              padding-left: 18px;
              padding-right: 18px;
              font-weight: 700;

              @media only screen and (max-width: 1310px) {
                max-width: 350px;
                margin-left: 0;
              }

              ::placeholder {
                color: #f9ca51;
              }

              :focus {
                outline-width: 0;
              }
            `}
            id="textInput"
            placeholder="Search routes"
            onChange={handleInputChange}
            type="text"
          ></input>
        </div>
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            justify-content: space-around;
          `}
        >
          {routesLoaded && busRoutes.length === 0 ? (
            <p
              css={css`
                font-size: 22px;
                font-weight: 500;
                margin-top: 0;
              `}
            >
              No routes.
            </p>
          ) : (
            <></>
          )}

          {!routesLoaded ? (
            <p
              css={css`
                font-size: 22px;
                font-weight: 500;
                margin-top: 0;
              `}
            >
              Loading routes...
            </p>
          ) : (
            <></>
          )}
          {busRoutes.map((line, index) => {
            if (
              betterName(line).toLowerCase().indexOf(query.toLowerCase()) !== -1
            ) {
              return (
                <LineButton
                  color="#FFEAB6"
                  hoverColor="#F9CA51"
                  text={betterName(line)}
                  image={null}
                  centerText={true}
                  mode="bus"
                  textColor="var(--dark-background)"
                  whenPressed={`line?l=${line}`}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
};
