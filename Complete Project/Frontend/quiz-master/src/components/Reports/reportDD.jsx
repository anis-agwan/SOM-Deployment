import axios from "axios";
import "./Reports.css";

import React, { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19],
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ReportDD = () => {
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const [ddData, setDDData] = useState({ Data: {} });
  const [rateDDData, setRateDDData] = useState({ Data: {} });
  const [commentsData, setCommentsData] = useState([]);
  const [rateComments, setRateComments] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const baseRankURL = "http://3.14.159.174:8443/situation_q/sq/getRankScores";
  const baseRateURL = "http://3.14.159.174:8443/situation_q/sq/getRateScores";

  const getDDScoreHandler = async () => {
    try {
      const response1 = await axios.get(`${baseRankURL}/${user.bingNumber}`);
      const response2 = await axios.get(`${baseRateURL}/${user.bingNumber}`);

      if ((response1.data && response2.data) !== "") {
        setShowReport(true);
      } else {
        return;
      }

      const rateDD = [
        response2.data.convertedDesirabilityDecisionsScore,
        10 - response2.data.convertedDesirabilityDecisionsScore,
      ];

      const rankDD = [
        response1.data.rankDecisionScore,
        response1.data.convertedRankDecisionScore,
      ];

      const desireDD = [
        response2.data.desirabilityDecisionsScore,
        response2.data.convertedDesirabilityDecisionsScore,
      ];

      const comments = [response1.data.judgementScoreComment];

      const rateCom = [response2.data.considerationOfAlternativesScoreComment];
      // console.log(Object.keys(response.data));

      setLoading(false);
      setDDData({
        Data: {
          labels: ["Decision Scores", "Converted Decision Scores"],
          datasets: [
            {
              label: "Rank Decision",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
              data: rankDD,
            },
            {
              label: "Desirability Decision",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              data: desireDD,
            },
          ],
        },
      });
      setRateDDData({
        Data: {
          labels: ["Rank Decision"],
          datasets: [
            {
              label: "Difficult Decisions",
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
              borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
              borderWidth: 2,
              data: rateDD,
            },
          ],
        },
      });
      setCommentsData(comments);
      setRateComments(rateCom);
      // console.log(ddData.Data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const config = {
    scale: {
      beginAtZero: true,
      max: 20,
      min: 0,
      stepSize: 1,
    },
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          title: (context) => {
            // console.log(context);
            return `Score: ${context[0].formattedValue}`;
          },
          label: (context) => {
            // console.log(context);
            // console.log(data.datasets);
            // console.log(commentsData[context.dataIndex]);
            // const arr = commentsData[context.dataIndex].split(". ");
            // const arr = splitStringAfterEightWords(
            //   commentsData[context.dataIndex]
            // );
            // return arr;
          },
        },
      },
    },
  };

  useEffect(() => {
    setLoading(false);
    getDDScoreHandler();
    setLoading(true);
  }, [showReport]);

  const myDDLabel = [
    "Judgement Score Comment",
    "Consideration of Alternatives Score Comment",
  ];

  return (
    <>
      {showReport ? (
        <div className="PB-report-map">
          {isLoading &&
            Object.keys(ddData.Data).length > 0 &&
            Object.keys(rateDDData.Data).length > 0 && (
              <div className="PB-report-data">
                <Bar data={ddData.Data} options={config} />
                <h5>Rank Decisions</h5>{" "}
                {commentsData.map((val, idx) => {
                  //   console.log(val);
                  return (
                    <div key={idx}>
                      {" "}
                      <ul>
                        <li>
                          <b>{myDDLabel[0]} :</b> {val}
                        </li>
                      </ul>
                    </div>
                  );
                })}
                <h5>Desirability Decisions</h5>{" "}
                {rateComments.map((val, idx) => {
                  //   console.log(val);
                  return (
                    <div key={idx}>
                      {" "}
                      <ul>
                        <li>
                          <b>{myDDLabel[1]} :</b> {val}
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>
              // <>
              //   <div className="PB-report-data">
              //     <Pie data={ddData.Data} />
              //     <div>Jugdement Score Comment</div>
              //     <div>{commentsData[0]}</div>
              //     <Pie data={rateDDData.Data} />
              //     <div>{rateComments[0]}</div>
              //   </div>
              // </>
            )}
        </div>
      ) : (
        <div className="PB-report-map">
          <h1 className="PB-report-data">No data</h1>
        </div>
      )}
    </>
  );
};
