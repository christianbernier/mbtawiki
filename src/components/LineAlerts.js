import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";

export default ({ line, lineMutedColor, lineLinkColor }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setAlerts([]);
    fetch(
      `https://api-v3.mbta.com/alerts?filter[route]=${line}&sort=lifecycle&api_key=e9cca8f8775749b9b79e4bed57f6216c`
    )
      .then(data => data.json())
      .then(data => {
        let currentAlerts = JSON.parse(JSON.stringify(alerts));

        for (const alert of data.data) {
          const effect = alert.attributes.effect;
          let effectWords = effect.split("_");
          let finalEffectWords = [];
          for (let word of effectWords) {
            word = word.toLowerCase();
            word = word.substr(0, 1).toUpperCase() + word.substr(1);
            finalEffectWords.push(word);
          }
          let finalEffect = "";
          for (let i = 0; i < finalEffectWords.length; i++) {
            finalEffect += finalEffectWords[i];
            if (i < finalEffectWords.length - 1) {
              finalEffect += " ";
            }
          }

          currentAlerts.push({
            title: finalEffect,
            body: alert.attributes.header,
            id: alert.id,
            link: alert.attributes.url
          });
        }

        setAlerts(currentAlerts);
      });
  }, []);

  if (alerts.length > 0) {
    return (
      <div>
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
          Line Alerts
        </p>
        {alerts.map(a => {
          return (
            <div
              key={a.id}
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
                {a.title}
              </p>
              <p
                css={css`
                  font-size: 18px;
                  font-weight: 450;
                  margin-top: 8px;
                `}
              >
                {
                  a.body.split(
                    /(http)?s?(:\/\/)?(www.)?(mbta|MBTA).com\/?(\S+)?/
                  )[0]
                }
                {a.link ? (
                  <a
                    css={css`
                      /* text-decoration: none; */
                      color: ${lineLinkColor};
                    `}
                    href={a.link}
                  >
                    {a.link}
                  </a>
                ) : (
                  ""
                )}
              </p>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <></>;
  }
};
