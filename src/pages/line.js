import React, { useState } from "react";
import { css } from "@emotion/core";
import GlobalCSS from "../components/GlobalCSS";
import Header from "../components/Header";
import StationList from "../components/StationList";
import LineAlerts from "../components/LineAlerts";
import SubwaySchedule from "../../subway_schedule.json";
import Fares from "../../fares.json";

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
        l: "Red"
      }
    }
    return vars;
  }
  const line = getUrlVars().l;
  let fullLine, lineMutedColor, lineHighlightedMutedColor, lineLinkColor;

  let hasFrequency = false;
  let peakServiceFrequency = "",
    offPeakServiceFrequency = "";

  for (const schedule of SubwaySchedule) {
    if (schedule.route === line) {
      hasFrequency = true;
      peakServiceFrequency = schedule.peak;
      offPeakServiceFrequency = schedule.off_peak;
    }
  }

  let fares = {
    charlieCard: undefined,
    cash: undefined,
    _1DayPass: undefined,
    _7DayPass: undefined,
    monthlyLink: undefined,
    localBusPass: undefined,
    innerExpressBusPass: undefined,
    outerExpressBusPass: undefined,
    crOneWay: undefined,
    crWeekendPass: undefined,
    crMonthlyCharlieTicket: undefined,
    crMonthlymTicket: undefined
  };

  if (line === "Red" || line === "Mattapan") {
    fullLine = `${line} Line`;
    lineMutedColor = "#FFC7C7";
    lineHighlightedMutedColor = "#FF9D9D";
    lineLinkColor = "#9D0A0A";
    fares.charlieCard = Fares.subway.charlie_card;
    fares.cash = Fares.subway.cash;
    fares._1DayPass = Fares.subway._1_day_pass;
    fares._7DayPass = Fares.subway._7_day_pass;
    fares.monthlyLink = Fares.subway.monthly_link;
  } else if (line === "Orange") {
    fullLine = "Orange Line";
    lineMutedColor = "#FFDCA7";
    lineHighlightedMutedColor = "#FEC36A";
    lineLinkColor = "#C24600";
    fares.charlieCard = Fares.subway.charlie_card;
    fares.cash = Fares.subway.cash;
    fares._1DayPass = Fares.subway._1_day_pass;
    fares._7DayPass = Fares.subway._7_day_pass;
    fares.monthlyLink = Fares.subway.monthly_link;
  } else if (line === "Blue") {
    fullLine = "Blue Line";
    lineMutedColor = "#B1DAFF";
    lineHighlightedMutedColor = "#57AEFF";
    lineLinkColor = "#1B00C2";
    fares.charlieCard = Fares.subway.charlie_card;
    fares.cash = Fares.subway.cash;
    fares._1DayPass = Fares.subway._1_day_pass;
    fares._7DayPass = Fares.subway._7_day_pass;
    fares.monthlyLink = Fares.subway.monthly_link;
  } else if (line.indexOf("CR-") !== -1) {
    fullLine = `${line.substr(3)} Line`;
    lineMutedColor = "#F5B6FF";
    lineHighlightedMutedColor = "#E55FFB";
    lineLinkColor = "#6C1396";
    fares.crOneWay = Fares.commuter_rail.one_way;
    fares.crWeekendPass = Fares.commuter_rail.weekend_pass;
    fares.crMonthlyCharlieTicket =
      Fares.commuter_rail.monthly_cr_pass_charlie_ticket;
    fares.crMonthlymTicket = Fares.commuter_rail.monthly_cr_pass_mTicket;
  } else if (line.indexOf("Green-") !== -1) {
    fullLine = `Green Line ${line.substr(6)} Branch`;
    lineMutedColor = "#AFEAC7";
    lineHighlightedMutedColor = "#4FD785";
    lineLinkColor = "#08520B";
    fares.charlieCard = Fares.subway.charlie_card;
    fares.cash = Fares.subway.cash;
    fares._1DayPass = Fares.subway._1_day_pass;
    fares._7DayPass = Fares.subway._7_day_pass;
    fares.monthlyLink = Fares.subway.monthly_link;
  } else if (line === "741") {
    fullLine = "SL1";
    lineMutedColor = "#D4D7DA";
    lineHighlightedMutedColor = "#BCBEC0";
    lineLinkColor = "#505050";
    fares.charlieCard = Fares.subway.charlie_card;
    fares.cash = Fares.subway.cash;
    fares._1DayPass = Fares.subway._1_day_pass;
    fares._7DayPass = Fares.subway._7_day_pass;
    fares.monthlyLink = Fares.subway.monthly_link;
  } else if (line === "742") {
    fullLine = "SL2";
    lineMutedColor = "#D4D7DA";
    lineHighlightedMutedColor = "#BCBEC0";
    lineLinkColor = "#505050";
    fares.charlieCard = Fares.subway.charlie_card;
    fares.cash = Fares.subway.cash;
    fares._1DayPass = Fares.subway._1_day_pass;
    fares._7DayPass = Fares.subway._7_day_pass;
    fares.monthlyLink = Fares.subway.monthly_link;
  } else if (line === "743") {
    fullLine = "SL3";
    lineMutedColor = "#D4D7DA";
    lineHighlightedMutedColor = "#BCBEC0";
    lineLinkColor = "#505050";
    fares.charlieCard = Fares.subway.charlie_card;
    fares.cash = Fares.subway.cash;
    fares._1DayPass = Fares.subway._1_day_pass;
    fares._7DayPass = Fares.subway._7_day_pass;
    fares.monthlyLink = Fares.subway.monthly_link;
  } else if (line === "751") {
    fullLine = "SL4";
    lineMutedColor = "#D4D7DA";
    lineHighlightedMutedColor = "#BCBEC0";
    lineLinkColor = "#505050";
    fares.charlieCard = Fares.subway.charlie_card;
    fares.cash = Fares.subway.cash;
    fares._1DayPass = Fares.subway._1_day_pass;
    fares._7DayPass = Fares.subway._7_day_pass;
    fares.monthlyLink = Fares.subway.monthly_link;
  } else if (line === "749") {
    fullLine = "SL5";
    lineMutedColor = "#D4D7DA";
    lineHighlightedMutedColor = "#BCBEC0";
    lineLinkColor = "#505050";
    fares.charlieCard = Fares.subway.charlie_card;
    fares.cash = Fares.subway.cash;
    fares._1DayPass = Fares.subway._1_day_pass;
    fares._7DayPass = Fares.subway._7_day_pass;
    fares.monthlyLink = Fares.subway.monthly_link;
  } else {
    fullLine = `Route ${line}`;

    if (line === "747") {
      fullLine = "CT2";
    }

    if (line === "708") {
      fullLine = "CT3";
    }

    if (
      [
        "170",
        "325",
        "326",
        "351",
        "426",
        "428",
        "434",
        "450",
        "501",
        "502",
        "503",
        "504",
        "553",
        "554",
        "556",
        "558"
      ].indexOf(line) !== -1
    ) {
      //inner express
      fares.charlieCard = Fares.inner_express_bus.charlie_card;
      fares.cash = Fares.inner_express_bus.cash;
      fares.innerExpressBusPass =
        Fares.inner_express_bus.inner_express_bus_pass;
    } else if (["352", "354", "505"].indexOf(line) !== -1) {
      //outer express
      fares.charlieCard = Fares.outer_express_bus.charlie_card;
      fares.cash = Fares.outer_express_bus.cash;
      fares.outerExpressBusPass =
        Fares.outer_express_bus.outer_express_bus_pass;
    } else {
      //local bus
      fares.charlieCard = Fares.local_bus.charlie_card;
      fares.cash = Fares.local_bus.cash;
      fares._1DayPass = Fares.local_bus._1_day_pass;
      fares._7DayPass = Fares.local_bus._7_day_pass;
      fares.localBusPass = Fares.local_bus.local_bus_pass;
      fares.monthlyLink = Fares.local_bus.monthly_link;
    }

    lineMutedColor = "#FFEAB6";
    lineHighlightedMutedColor = "#F9CA51";
    lineLinkColor = "#C68E00";
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
          {fullLine}
        </p>
        <div
          css={css`
            display: grid;
            grid-template-areas: "stationList lineInfo";
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;

            @media only screen and (max-width: 1310px) {
              grid-template-areas:
                "stationList"
                "lineInfo";
              grid-template-columns: 100%;
              grid-template-rows: auto;
            }
          `}
        >
          <div
            css={css`
              grid-area: stationList;
              width: 100%;
            `}
          >
            <StationList
              line={line}
              lineFullName={fullLine}
              lineMutedColor={lineMutedColor}
              lineHighlightedMutedColor={lineHighlightedMutedColor}
            />
          </div>
          <div
            css={css`
              grid-area: lineInfo;
              width: 100%;
            `}
          >
            <LineAlerts
              line={line}
              lineMutedColor={lineMutedColor}
              lineLinkColor={lineLinkColor}
            />
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
              Line Information
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
                  margin-bottom: 8px;
                `}
              >
                Fares
              </p>
              {fares.charlieCard ? (
                <p class="fare">CharlieCard ({fares.charlieCard})</p>
              ) : (
                ""
              )}
              {fares.cash ? (
                <p class="fare">CharlieTicket or Cash ({fares.cash})</p>
              ) : (
                ""
              )}
              {fares._1DayPass ? (
                <p class="fare">1-Day Pass ({fares._1DayPass})</p>
              ) : (
                ""
              )}
              {fares._7DayPass ? (
                <p class="fare">7-Day Pass ({fares._7DayPass})</p>
              ) : (
                ""
              )}
              {fares.monthlyLink ? (
                <p class="fare">Monthly LinkPass ({fares.monthlyLink})</p>
              ) : (
                ""
              )}
              {fares.localBusPass ? (
                <p class="fare">
                  Monthly Local Bus Pass ({fares.localBusPass})
                </p>
              ) : (
                ""
              )}
              {fares.innerExpressBusPass ? (
                <p class="fare">
                  Monthly Inner Express Bus Pass ({fares.innerExpressBusPass})
                </p>
              ) : (
                ""
              )}
              {fares.outerExpressBusPass ? (
                <p class="fare">
                  Monthly Outer Express Bus Pass ({fares.outerExpressBusPass})
                </p>
              ) : (
                ""
              )}
              {fares.crOneWay ? (
                <p class="fare">Commuter Rail One-Way ({fares.crOneWay})</p>
              ) : (
                ""
              )}
              {fares.crWeekendPass ? (
                <p class="fare">
                  Commuter Rail Weekend Pass ({fares.crWeekendPass})
                </p>
              ) : (
                ""
              )}
              {fares.crMonthlyCharlieTicket ? (
                <p class="fare">
                  Monthly Commuter Rail Pass CharlieTicket (
                  {fares.crMonthlyCharlieTicket})
                </p>
              ) : (
                ""
              )}
              {fares.crMonthlymTicket ? (
                <p class="fare">
                  Monthly Commuter Rail Pass mTicket ({fares.crMonthlymTicket})
                </p>
              ) : (
                ""
              )}
            </div>
            {hasFrequency ? (
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
                  Service Frequency
                </p>
                <p
                  css={css`
                    font-size: 21px;
                    font-weight: 700;
                    margin-top: 5px;
                    margin-bottom: 0;
                  `}
                >
                  Peak Service
                </p>
                <p
                  css={css`
                    font-size: 18px;
                    font-weight: 450;
                    margin-top: 8px;
                  `}
                >
                  {peakServiceFrequency}
                </p>
                <p
                  css={css`
                    font-size: 21px;
                    font-weight: 700;
                    margin-top: 5px;
                    margin-bottom: 0;
                  `}
                >
                  Off-Peak Service
                </p>
                <p
                  css={css`
                    font-size: 18px;
                    font-weight: 450;
                    margin-top: 8px;
                  `}
                >
                  {offPeakServiceFrequency}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};
