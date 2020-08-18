import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";
import Crowding0 from "../../images/crowding_0.png";
import Crowding1 from "../../images/crowding_1.png";
import Crowding2 from "../../images/crowding_2.png";
import Crowding3 from "../../images/crowding_3.png";

export default ({ sta, staFullName }) => {
  const crowdingImages = [Crowding0, Crowding1, Crowding2, Crowding3];

  const [predictions, setPredictions] = useState([
    {
      line: "No predictions",
      displayLine: "",
      lineColor: "transparent",
      show: true,
      destinations: [
        {
          destination: "",
          times: [],
          timeTypes: [],
          tripIDs: [],
          capacities: [],
        },
      ],
    },
  ]);

  const [rawPredictions, setRawPredictions] = useState([]);
  const [routesAdded, setRoutesAdded] = useState(false);
  const [destsAdded, setDestsAdded] = useState(false);
  const [dispsAdded, setDispsAdded] = useState(false);
  const [addCapacities, setAddCapacities] = useState(false);
  const [updateTimes, setUpdateTimes] = useState(0);
  const [loadingDepartures, setLoadingDepartures] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setUpdateTimes(Math.random());
    }, 1000);
  }, []);

  let tripsAdded = [];

  useEffect(() => {
    if (predictions.length > 1) {
      setPredictions([
        {
          line: "No predictions",
          displayLine: "No predictions",
          lineColor: "transparent",
          show: true,
          destinations: [],
        },
      ]);
    }

    fetch(
      `https://api-v3.mbta.com/predictions?filter[stop]=${sta}&sort=time&api_key=e9cca8f8775749b9b79e4bed57f6216c`
    )
      .then((data) => data.json())
      .then((data) => setRawPredictions(data?.data));
  }, []);

  useEffect(() => {
    let predictionsNow = JSON.parse(JSON.stringify(predictions));
    for (const prediction of rawPredictions) {
      const route = prediction?.relationships?.route?.data?.id;
      let routeAdded = false;
      for (const pred of predictionsNow) {
        if (pred.line === route) {
          routeAdded = true;
        }
      }

      if (!routeAdded) {
        let lineColor;

        if (route.indexOf("CR-") !== -1) {
          lineColor = "#80276C";
        } else if (route === "Red" || route === "Mattapan") {
          lineColor = "#DA291C";
        } else if (route === "Orange") {
          lineColor = "#ED8B00";
        } else if (route === "Blue") {
          lineColor = "#003DA5";
        } else if (route.indexOf("Green-") !== -1) {
          lineColor = "#00843D";
        } else if (
          ["741", "742", "743", "751", "749", "746"].indexOf(route) !== -1
        ) {
          lineColor = "#7C878E";
        } else {
          lineColor = "#FFC72C";
        }

        predictionsNow.push({
          line: route,
          displayLine: "",
          show: true,
          lineColor: lineColor,
          destinations: [],
        });
      }
    }

    if (predictionsNow.length > 1) {
      predictionsNow[0].line = "";
      predictionsNow[0].show = false;
    }

    setPredictions([]);
    setPredictions(predictionsNow);
    setTimeout(() => setRoutesAdded(true), 500);
  }, [rawPredictions]);

  useEffect(() => {
    if (routesAdded) {
      let predictionsNow = JSON.parse(JSON.stringify(predictions));
      for (const pred of predictionsNow) {
        if (pred.line) {
          fetch(
            `https://api-v3.mbta.com/routes/${pred.line}?api_key=e9cca8f8775749b9b79e4bed57f6216c`
          )
            .then((data) => data.json())
            .then((data) => {
              if (data?.data?.attributes?.short_name) {
                pred.displayLine = data.data.attributes.short_name;
                if (["B", "C", "D", "E"].indexOf(pred.displayLine) !== -1) {
                  pred.displayLine = `Green Line ${pred.displayLine} Branch`;
                }
              } else {
                pred.displayLine =
                  data?.data?.attributes.long_name || pred.line;
              }
            });
        }
      }
      setPredictions([]);
      setPredictions(predictionsNow);
      setTimeout(() => setDispsAdded(true), 500);
    }
  }, [routesAdded]);

  useEffect(() => {
    if (dispsAdded) {
      let predictionsNow = JSON.parse(JSON.stringify(predictions));
      for (const pred of rawPredictions) {
        const route = pred.relationships.route.data.id;
        let destination = "";
        fetch(
          `https://api-v3.mbta.com/trips/${pred.relationships.trip.data.id}?api_key=e9cca8f8775749b9b79e4bed57f6216c`
        )
          .then((data) => data.json())
          .then((data) => {
            destination = data?.data?.attributes?.headsign;
            let destExists = false;
            for (const prediction of predictionsNow) {
              if (prediction.line === route) {
                for (const dest of prediction.destinations) {
                  if (dest.destination === destination) {
                    destExists = true;
                  }
                }
              }
            }
            if (!destExists && destination.indexOf(staFullName) === -1) {
              for (let i = 0; i < predictionsNow.length; i++) {
                if (predictionsNow[i].line === route) {
                  predictionsNow[i].destinations.push({
                    destination: destination,
                    times: [],
                    timeTypes: [],
                    tripIDs: [],
                    capacities: [],
                  });
                }
              }
            }
            if (destination.indexOf(staFullName) === -1) {
              for (let i = 0; i < predictionsNow.length; i++) {
                if (predictionsNow[i].line === route) {
                  for (
                    let j = 0;
                    j < predictionsNow[i].destinations.length;
                    j++
                  ) {
                    if (
                      destination ===
                      predictionsNow[i].destinations[j].destination
                    ) {
                      predictionsNow[i].destinations[j].tripIDs.push(
                        pred.relationships.trip.data.id
                      );
                    }
                  }
                }
              }
            }
            if (pred === rawPredictions[rawPredictions.length - 1]) {
              setPredictions(predictionsNow);
              setDestsAdded(true);
            }
          });
      }
    }
  }, [dispsAdded]);

  function prettyTime(t, type) {
    if (type === "s") {
      return t;
    }

    let time = new Date(t);
    let now = new Date();
    let secondsUntil = (time - now) / 1000;

    if (type === "a" && secondsUntil < 45) {
      return "Arriving";
    } else if (type === "d" && secondsUntil < 30) {
      return "Boarding";
    }

    let minutesUntil = parseInt(secondsUntil / 60 + 0.5);

    if (minutesUntil < 60) {
      return minutesUntil + " min";
    }

    let hoursUntil = parseInt(minutesUntil / 60);
    minutesUntil %= 60;

    let returnStr = `${hoursUntil} hour${hoursUntil === 1 ? "" : "s"}`;
    if (minutesUntil != 0) {
      returnStr += ", " + minutesUntil + " min";
    }

    return returnStr;
  }

  useEffect(() => {
    if (destsAdded) {
      let predictionsNow = JSON.parse(JSON.stringify(predictions));

      for (const pred of rawPredictions) {
        let time = null;
        let timeType = "";
        const arrivalTime = pred?.attributes?.arrival_time;
        const departureTime = pred?.attributes?.departure_time;
        const status = pred?.attributes?.status;

        if (status && status != null) {
          time = status;
          timeType = "s";
        } else if (arrivalTime && departureTime) {
          // time = prettyTime(arrivalTime, "a");
          time = arrivalTime;
          timeType = "a";
        } else if (departureTime && !arrivalTime) {
          // time = prettyTime(departureTime, "d");
          time = departureTime;
          timeType = "d";
        }

        if (time === null) {
          continue;
        }

        for (let i = 0; i < predictionsNow.length; i++) {
          for (let j = 0; j < predictionsNow[i].destinations.length; j++) {
            for (
              let k = 0;
              k < predictionsNow[i].destinations[j].tripIDs.length;
              k++
            ) {
              if (
                predictionsNow[i].destinations[j].tripIDs[k] ===
                pred.relationships.trip.data.id
              ) {
                if (
                  predictionsNow[i].destinations[j].times.indexOf(time) ===
                    -1 &&
                  tripsAdded.indexOf(pred.relationships.trip.data.id) === -1
                ) {
                  predictionsNow[i].destinations[j].times.push(time);
                  predictionsNow[i].destinations[j].timeTypes.push(timeType);
                  tripsAdded.push(pred.relationships.trip.data.id);
                  break;
                }
              }
            }
          }
        }

        let shouldShow = false;
        for (let i = 0; i < predictionsNow.length; i++) {
          for (let j = 0; j < predictionsNow[i].destinations.length; j++) {
            if (predictionsNow[i].destinations[j].times.length !== 0) {
              shouldShow = true;
            }
          }
          predictionsNow[i].show = shouldShow;
          shouldShow = false;
        }
      }

      setPredictions(predictionsNow);
      setLoadingDepartures(predictionsNow.length === 1);
      setAddCapacities(true);
    }
  }, [destsAdded]);

  useEffect(() => {
    const getVehicle = async () => {
      let predictionsNow = JSON.parse(JSON.stringify(predictions));
      console.log(predictionsNow);
      for (let i = 0; i < predictionsNow.length; i++) {
        for (
          let j = 0;
          j < predictionsNow[i].destinations[0].tripIDs.length;
          j++
        ) {
          const thisTripID = predictionsNow[i].destinations[0].tripIDs[j];
          await fetch(
            `https://api-v3.mbta.com/vehicles?filter[trip]=${thisTripID}&api_key=e9cca8f8775749b9b79e4bed57f6216c`
          )
            .then((data) => data.json())
            .then((data) => {
              if (data.data.length > 0) {
                if (data.data[0].attributes.occupancy_status) {
                  let crowding = "";

                  switch (data.data[0].attributes.occupancy_status) {
                    case "MANY_SEATS_AVAILABLE":
                      crowding = 1;
                      break;
                    case "FEW_SEATS_AVAILABLE":
                      crowding = 2;
                      break;
                    case "FULL":
                      crowding = 3;
                      break;
                    default:
                      crowding = 0;
                  }

                  predictionsNow[i].destinations[0].capacities[j] = crowding;
                }
              }
            });
        }
      }

      setPredictions(predictionsNow);
    };

    getVehicle();
  }, [addCapacities]);

  function fixBusRouteName(route) {
    if (route == parseInt(route)) {
      return "Route " + route;
    }
    return route;
  }

  return (
    <div
      css={css`
        min-height: 40px;
      `}
    >
      <p
        css={css`
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 0;
        `}
      >
        {loadingDepartures ? "Loading predictions..." : ""}
      </p>

      {predictions.map((e) => {
        return (
          <div
            key={e.line}
            css={css`
              width: 100%;
              display: ${e.show && e.destinations.length > 0 ? "" : "none"};
            `}
          >
            <div
              css={css`
                border-bottom: 6px solid ${e.lineColor};
                margin-bottom: 15px;
              `}
            >
              <p
                css={css`
                  font-size: 22px;
                  font-weight: 700;
                  margin-bottom: 0;
                `}
              >
                {e.destinations.length > 0
                  ? fixBusRouteName(e.displayLine)
                  : ""}
              </p>
            </div>
            {e.destinations.map((d) => {
              return (
                <div
                  key={d.destination}
                  css={css`
                    width: 100%;
                    display: flex;
                    flex: 1;
                    flex-direction: row;
                    margin-top: -20px;
                  `}
                >
                  <div
                    css={css`
                      width: 60%;
                      display: ${d.times.length > 0 ? "" : "none"};
                    `}
                  >
                    <p
                      css={css`
                        font-size: 18px;
                        font-weight: 700;
                      `}
                    >
                      {d.destination}
                    </p>
                  </div>
                  <div
                    css={css`
                      width: 40%;
                      min-height: 20px;
                    `}
                  >
                    {d.times.map((t, predictionIndex) => {
                      return (
                        <div
                          key={d.destination + "-" + t + "-" + Math.random()}
                          css={css`
                            display: flex;
                            flex-direction: row-reverse;
                            justify-content: right;
                            align-items: center;
                          `}
                        >
                          <img
                            src={crowdingImages[d.capacities[predictionIndex]]}
                            css={css`
                              height: 20px;
                              margin-left: 8px;
                            `}
                          />
                          <p
                            css={css`
                              text-align: right;
                              font-size: 18px;
                              font-weight: ${t === d.times[0] ? 700 : 400};
                              height: 100%;
                            `}
                          >
                            {prettyTime(t, d.timeTypes[predictionIndex])}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
