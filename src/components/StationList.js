import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";
import SlideSelector from "../components/SlideSelector";
import StationButton from "../components/StationButton";

export default ({ line, lineMutedColor, lineHighlightedMutedColor }) => {
  const [directions, setDirections] = useState(["a", "b"]);
  const [selectedDirection, setSelectedDirection] = useState("");
  const [branches, setBranches] = useState(["a", "b"]);
  const [destinations, setDestinations] = useState(["a", "b"]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [termini, setTermini] = useState([]);
  const [routePatternId, setRoutePatternId] = useState("");
  const [subStations, setSubStations] = useState([]);
  const [stations, setStations] = useState([]);
  const [stationInfo, setStationInfo] = useState([]);

  useEffect(() => {
    fetch(
      `https://api-v3.mbta.com/stops?filter[route]=${line}&api_key=e9cca8f8775749b9b79e4bed57f6216c`
    )
      .then((data) => data.json())
      .then((data) => data.data)
      .then((data) => {
        let staInfo = [];
        for (let sta of data) {
          staInfo.push({
            id: sta.id,
            name: sta.attributes.name,
          });
        }
        if (staInfo.length > 0) {
          setStationInfo(staInfo);
        }
      });
  }, []);

  useEffect(() => {
    if (line) {
      fetch(
        `https://api-v3.mbta.com/routes/${line}?api_key=e9cca8f8775749b9b79e4bed57f6216c`
      )
        .then((data) => data.json())
        .then((data) => data.data.attributes)
        .then((data) => {
          setDirections(data.direction_names);
          setSelectedDirection(data.direction_names[0]);
          return data;
        })
        .then((data) => {
          const branchesText = data.direction_destinations;
          setDestinations(branchesText);
          let apiBranches = [];
          for (const dest of branchesText) {
            if (
              (dest.indexOf("/") !== -1 || dest.indexOf(" or ") !== -1) &&
              dest.indexOf("Forge Park/495") === -1 &&
              dest.indexOf("Middleborough/Lakeville") === -1
            ) {
              //Branches are split by '/' character
              apiBranches = dest.split("/");
              if (apiBranches.length === 1) {
                apiBranches = dest.split(" or ");
              }
            }
          }
          setBranches(apiBranches);
          setSelectedBranch(apiBranches[0]);
        });
    }
  }, []);

  useEffect(() => {
    let terminus1, terminus2;
    let terminiNow = [];
    if (branches.length > 1) {
      if (
        (destinations[0].indexOf("/") !== -1 ||
          destinations[0].indexOf(" or ") !== -1) &&
        destinations[0].indexOf(selectedBranch) !== -1
      ) {
        terminus1 = selectedBranch;
        terminus2 = destinations[1];
      } else {
        terminus1 = destinations[0];
        terminus2 = selectedBranch;
      }

      if (selectedDirection === directions[1]) {
        terminiNow.push(terminus1);
        terminiNow.push(terminus2);
        setTermini(terminiNow);
      } else {
        terminiNow.push(terminus2);
        terminiNow.push(terminus1);
        setTermini(terminiNow);
      }
    } else {
      if (selectedDirection === directions[1]) {
        setTermini(destinations);
      } else {
        const newTerms = [];
        newTerms.push(destinations[1]);
        newTerms.push(destinations[0]);
        setTermini(newTerms);
      }
    }
  }, [selectedBranch, selectedDirection]);

  useEffect(() => {
    let routeStr = `${termini[0]} - ${termini[1]}`;
    fetch(`https://api-v3.mbta.com/route_patterns?filter%5Broute%5D=${line}&api_key=e9cca8f8775749b9b79e4bed57f6216c`)
      .then((data) => data.json())
      .then((data) => {
        for (const pattern of data.data) {
          let patternName = pattern.attributes.name;
          const indexOfVia = patternName.indexOf("via");
          if (indexOfVia !== -1) {
            patternName = patternName.substr(0, indexOfVia - 1);
          }

          if (
            (patternName.indexOf(
              routeStr
                .replace("Avenue", "Ave")
                .replace(" or Foxboro", "")
                .replace("Kingston or ", "")
            ) !== -1 ||
              patternName.indexOf(
                routeStr
                  .replace("Avenue", "Ave")
                  .replace("Fairmount", "Readville")
                  .replace(" or Foxboro", "")
              ) !== -1) &&
            pattern.attributes.typicality > 0
          ) {
            setRoutePatternId(pattern.id);
            return;
          }
        }

        for (const pattern of data.data) {
          let patternName = pattern.attributes.name;
          const indexOfVia = patternName.indexOf("via");
          if (indexOfVia !== -1) {
            patternName = patternName.substr(0, indexOfVia - 1);
          }

          let firstPartFromAPI = patternName.split(" - ")[0];
          let firstPartFromSelection = routeStr.split(" - ")[0];

          if (firstPartFromAPI === firstPartFromSelection) {
            setRoutePatternId(pattern.id);
            return;
          }
        }

        for (const pattern of data.data) {
          let patternName = pattern.attributes.name;
          const indexOfVia = patternName.indexOf("via");
          if (indexOfVia !== -1) {
            patternName = patternName.substr(0, indexOfVia - 1);
          }

          let lastPartFromAPI = patternName.split(" - ")[1];
          let lastPartFromSelection = routeStr.split(" - ")[1];

          if (lastPartFromAPI === lastPartFromSelection) {
            setRoutePatternId(pattern.id);
            return;
          }
        }
      });
  }, [termini]);

  useEffect(() => {
    if (routePatternId) {
      fetch(`https://api-v3.mbta.com/route_patterns/${routePatternId}?include=representative_trip.stops&api_key=e9cca8f8775749b9b79e4bed57f6216c`)
      .then(data => data.json())
      .then(data => {
        let newStations = [];
        for(const info of data.included){
          if(info.type === "trip"){
            for(const sta of info.relationships.stops.data){
              newStations.push(sta.id);
            }
          }
        }
        setSubStations(newStations);
      })
    }
  }, [routePatternId]);

  useEffect(() => {
    async function getData(){
      if(subStations){
        let currentSubStations = JSON.parse(JSON.stringify(subStations));
        let newStations = currentSubStations;
        for(let subSta of currentSubStations){
          await fetch(`https://api-v3.mbta.com/stops/${subSta.replace("/","%2F")}?api_key=e9cca8f8775749b9b79e4bed57f6216c`)
          .then(data=>data.json())
          .then(data=>{
            if(data?.data?.relationships?.parent_station?.data?.id){
              newStations[currentSubStations.indexOf(subSta)] = data.data.relationships.parent_station.data.id;
            }
          })
        }
        setStations(newStations);
      }
    }

    getData();
  }, [subStations]);

  function getStaNameFromId(id) {
    for (const sta of stationInfo) {
      if (sta.id === id) {
        return sta.name;
      }
    }
    return id;
  }

  return (
    <>
      <p
        css={css`
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 10px;
        `}
      >
        Direction
      </p>
      <SlideSelector
        bgColor={lineMutedColor}
        hlColor={lineHighlightedMutedColor}
        values={directions}
        selectedValue={selectedDirection}
        changeSelectedValue={setSelectedDirection}
      />
      {branches.length === 2 ? (
        <>
          <p
            css={css`
              font-size: 28px;
              font-weight: 800;
              margin-bottom: 10px;
            `}
          >
            Branch
          </p>
          <SlideSelector
            bgColor={lineMutedColor}
            hlColor={lineHighlightedMutedColor}
            values={branches}
            selectedValue={selectedBranch}
            changeSelectedValue={setSelectedBranch}
          />
        </>
      ) : (
        <></>
      )}

      <p
        css={css`
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 10px;
        `}
      >
        Station Stops
      </p>
      {stations.map((s) => {
        return (
          <StationButton
            key={s}
            color={lineMutedColor}
            text={getStaNameFromId(s)}
            link={`station?id=${s}&name=${getStaNameFromId(
              s
            )}&color=${lineMutedColor}&hl=${lineHighlightedMutedColor}`}
          />
        );
      })}
    </>
  );
};
