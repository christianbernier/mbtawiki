import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";
import GlobalCSS from "../components/GlobalCSS";
import Header from "../components/Header";
import Predictions from "../components/Predictions";

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
        id: "place-north",
        stationName: "North Station",
        lineMutedColor: "#000000",
        lineHighlightedMutedColor: "#000000"
      }
    }
    return vars;
  }
  const stationId = getUrlVars().id;
  const stationName = decodeURI(getUrlVars().name);
  const lineMutedColor = getUrlVars().color;
  const lineHighlightedMutedColor = getUrlVars().hl;

  const [accessible, setAccessible] = useState(0);
  const [elevators, setElevators] = useState(0);
  const [escalators, setEscalators] = useState(0);

  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  const [hasParking, setHasParking] = useState(false);
  const [parkingAreaId, setParkingAreaId] = useState("");
  const [parkingDetails, setParkingDetails] = useState({
    garageName: "",
    capacity: {
      total: 0,
      accessible: 0,
      inUse: 0
    },
    cost: "",
    contact: {
      phone: ""
    }
  });

  useEffect(() => {
    fetch(
      `https://api-v3.mbta.com/stops/${stationId}?api_key=e9cca8f8775749b9b79e4bed57f6216c`
    )
      .then(data => data.json())
      .then(data => {
        setAccessible(data.data.attributes.wheelchair_boarding);
        setAddress(data.data.attributes.address);
        setLat(data?.data?.attributes?.latitude);
        setLon(data?.data?.attributes?.longitude);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api-v3.mbta.com/facilities/?filter[stop]=${stationId}&api_key=e9cca8f8775749b9b79e4bed57f6216c`
    )
      .then(data => data.json())
      .then(data => {
        let ele = 0,
          esca = 0;
        for (const datum of data.data) {
          if (datum.attributes.type === "ELEVATOR") {
            ele++;
          } else if (datum.attributes.type === "ESCALATOR") {
            esca++;
          } else if (datum.attributes.type === "PARKING_AREA") {
            setHasParking(true);
            setParkingAreaId(datum.id);
            let details = {
              garageName: datum.attributes.long_name,
              capacity: {
                total: 0,
                accessible: 0,
                inUse: 0
              },
              cost: "",
              contact: {
                phone: ""
              }
            };

            for (const d of datum.attributes.properties) {
              if (d.name === "capacity") {
                details.capacity.total = d.value;
              } else if (d.name === "capacity-accessible") {
                details.capacity.accessible = d.value;
              } else if (d.name === "fee-daily") {
                details.cost = d.value;
              } else if (d.name === "contact-phone") {
                details.contact.phone = d.value;
              }
            }

            setParkingDetails(details);
          }
        }
        setElevators(ele);
        setEscalators(esca);
      });
  }, []);

  useEffect(() => {
    if (!parkingAreaId) return;
    fetch(
      `https://api-v3.mbta.com/live_facilities/${parkingAreaId}?api_key=e9cca8f8775749b9b79e4bed57f6216c`
    )
      .then(data => data.json())
      .then(data => {
        if(!data?.data?.attributes) return;
        for (const datum of data.data.attributes.properties) {
          if (datum.name === "utilization") {
            let currentParkingData = JSON.parse(JSON.stringify(parkingDetails));
            currentParkingData.capacity.inUse = datum.value;
            setParkingDetails(currentParkingData);
          }
        }
      });
  }, [parkingDetails.capacity.total]);

  function accessibleMeaning(num) {
    switch (num) {
      case 0:
        return "Unknown";
      case 1:
        return "Yes";
      case 2:
        return "No";
      default:
        return "Unknown";
    }
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
          {stationName}
        </p>
        <div
          css={css`
            display: grid;
            grid-template-areas: "predictions stationInfo";
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;

            @media only screen and (max-width: 1310px) {
              grid-template-areas:
                "predictions"
                "stationInfo";
              grid-template-columns: 100%;
              grid-template-rows: auto;
            }
          `}
        >
          <div
            css={css`
              grid-area: predictions;
              width: 100%;
            `}
          >
            <p
              css={css`
                font-size: 36px;
                font-weight: 800;
                margin-bottom: 10px;
              `}
            >
              Departures
            </p>
            <Predictions sta={stationId} staFullName={stationName} />
          </div>
          <div
            css={css`
              grid-area: stationInfo;
              width: 100%;
            `}
          >
            <p
              css={css`
                font-size: 36px;
                font-weight: 800;
                margin-bottom: 10px;
                margin-left: 15%;

                @media only screen and (max-width: 1310px) {
                  margin-left: 0;
                }
              `}
            >
              Station Information
            </p>
            <div
              css={css`
                background-color: ${lineMutedColor};
                width: 80%;
                border-radius: 15px;
                padding: 10px 20px;
                margin-left: 15%;
                margin-bottom: 20px;
                @media only screen and (max-width: 1310px) {
                  margin-left: 0;
                  width: auto;
                }
              `}
            >
              <p
                css={css`
                  font-size: 28px;
                  font-weight: 800;
                  margin-top: 10px;
                  margin-bottom: 0;
                `}
              >
                Accessibility
              </p>
              <p
                css={css`
                  font-size: 18px;
                  font-weight: 450;
                  margin-top: 8px;
                `}
              >
                Accessible — {accessibleMeaning(accessible)}
              </p>
              <p
                css={css`
                  font-size: 18px;
                  font-weight: 450;
                  margin-top: -8px;
                `}
              >
                Elevators — {elevators}
              </p>
              <p
                css={css`
                  font-size: 18px;
                  font-weight: 450;
                  margin-top: -8px;
                `}
              >
                Escalators — {escalators}
              </p>
            </div>
            <div
              css={css`
                background-color: ${lineMutedColor};
                width: 80%;
                border-radius: 15px;
                padding: 10px 20px;
                margin-left: 15%;
                margin-bottom: 20px;
                display: ${address.length > 0 ? "" : "none"};
                @media only screen and (max-width: 1310px) {
                  margin-left: 0;
                  width: auto;
                }
              `}
            >
              <p
                css={css`
                  font-size: 28px;
                  font-weight: 800;
                  margin-top: 10px;
                  margin-bottom: 0;
                `}
              >
                Location
              </p>
              <p
                css={css`
                  font-size: 21px;
                  font-weight: 700;
                  margin-top: 8px;
                `}
              >
                Address
              </p>
              <p
                css={css`
                  font-size: 18px;
                  font-weight: 450;
                  margin-top: -15px;
                `}
              >
                {address}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`}
                css={css`
                  text-decoration: none;
                  display: ${lat !== 0 && lon !== 0 ? "flex" : "none"};
                  justify-content: center;
                  margin-top: -20px;
                  margin-bottom: 15px;
                `}
              >
                <div
                  css={css`
                    background-color: ${lineHighlightedMutedColor};
                    border-radius: 15px;
                    height: 35px;
                    margin-top: 20px;
                    padding-left: 18px;
                    padding-right: 18px;
                    padding-top: 10px;
                    width: 350px;
                    padding-bottom: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  `}
                >
                  <div
                    css={css`
                      height: 100%;
                      display: flex;
                      flex: 1;
                      align-items: center;
                      justify-content: center;
                      flex-direction: row;
                    `}
                  >
                    <p
                      css={css`
                        font-size: 24px;
                        font-weight: 800;
                        padding: 0;
                        margin: 0;
                      `}
                    >
                      Open in Google Maps
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div
              css={css`
                background-color: ${lineMutedColor};
                width: 80%;
                border-radius: 15px;
                padding: 10px 20px;
                margin-left: 15%;
                margin-bottom: 20px;
                display: ${hasParking ? "" : "none"};
                @media only screen and (max-width: 1310px) {
                  margin-left: 0;
                  width: auto;
                }
              `}
            >
              <p
                css={css`
                  font-size: 28px;
                  font-weight: 800;
                  margin-top: 10px;
                  margin-bottom: 0;
                `}
              >
                Parking
              </p>
              <p
                css={css`
                  font-size: 21px;
                  font-weight: 700;
                  margin-top: 8px;
                `}
              >
                {parkingDetails.garageName}
              </p>
              <p
                css={css`
                  font-size: 18px;
                  font-weight: 700;
                  margin-top: -15px;
                `}
              >
                Capacity
              </p>
              <p
                css={css`
                  font-size: 18px;
                  font-weight: 450;
                  margin-top: -15px;
                `}
              >
                {parkingDetails.capacity.total} total spots
              </p>
              <p
                css={css`
                  font-size: 18px;
                  font-weight: 450;
                  margin-top: -15px;
                `}
              >
                {parkingDetails.capacity.accessible} accessible spots
              </p>
              <p
                css={css`
                  font-size: 18px;
                  font-weight: 450;
                  margin-top: -15px;
                `}
              >
                {parkingDetails.capacity.inUse} spots in-use now ({Math.round(parkingDetails.capacity.inUse * 100 / parkingDetails.capacity.total)}%)
              </p>
              <div
                css={css`
                  width: 80%;
                  height: 20px;
                  border: 6px solid ${lineHighlightedMutedColor};
                  border-radius: 20px;
                  margin-top: -15px;
                  margin-bottom: 15px;
                `}
              >
                <div
                  css={css`
                    width: ${(parkingDetails.capacity.inUse * 100 / parkingDetails.capacity.total) + "%"};
                    height: 20px;
                    background-color: ${lineHighlightedMutedColor};
                    border-top-left-radius: 20px;
                    border-bottom-left-radius: 20px;
                  `}
                />
              </div>
              <p
                css={css`
                  font-size: 18px;
                  font-weight: 700;
                  margin-top: 0;
                `}
              >
                Parking Rate
              </p>
              <p
                css={css`
                  font-size: 18px;
                  font-weight: 450;
                  margin-top: -15px;
                `}
              >
                {parkingDetails.cost}
              </p>
              <p
                css={css`
                  font-size: 18px;
                  font-weight: 700;
                  margin-top: 0;
                `}
              >
                Contact
              </p>
              <p
                css={css`
                  font-size: 18px;
                  font-weight: 450;
                  margin-top: -15px;
                `}
              >
                Phone: {parkingDetails.contact.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
