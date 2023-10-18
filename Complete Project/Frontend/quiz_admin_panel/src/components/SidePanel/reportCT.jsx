import axios from "axios";
import "./SidePanel.css";

import React, { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ReportCT = (props) => {
  const bNum = props.bnum;
  const [ctData, setCTData] = useState({ Data: {} });
  const [commentsData, setCommentsData] = useState([
    "Analyses Score",
    "Connections Score",
    "Depth Score",
  ]);
  const [addComData, setAddCommData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const baseURL =
    "http://3.14.159.174:8442/critical-thinking/critical-thinking/getScores";

  const getCTScoreHandler = async () => {
    try {
      const response = await axios.get(`${baseURL}/${bNum}`);

      const ct = [
        response.data.sec1AnalysisScore,
        response.data.sec2ConnectionsScore,
        response.data.sec3DepthScore,
      ];

      const ctAddComments = [
        response.data.decisivenessScoreComment,
        response.data.logicalReasoningScoreComment,
        response.data.analysesScoreComment,
      ];

      //   console.log(Object.keys(response.data));
      //   console.log(ctAddComments);
      setAddCommData(ctAddComments);

      setLoading(false);
      setCTData({
        Data: {
          labels: ["Section 1", "Section 2", "Section 3"],
          datasets: [
            {
              label: "Critical Analyses",
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 2,
              data: ct,
            },
          ],
        },
      });

      //   console.log(ctData);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const config = {
    scale: {
      beginAtZero: true,
      max: 10,
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
            return commentsData[context.dataIndex];
          },
        },
      },
    },
  };

  useEffect(() => {
    setLoading(false);
    getCTScoreHandler();
    setLoading(true);
  }, []);

  const myCTLabel = ["Decisive Score", "Logical Reasoning", "Analyses"];

  return (
    <>
      <div className="PB-report-map">
        {isLoading && Object.keys(ctData.Data).length > 0 && (
          <div className="PB-report-data">
            <Bar data={ctData.Data} options={config} />
            {addComData.map((val, idx) => {
              //   console.log(val);
              return (
                <div key={idx}>
                  {" "}
                  <ul>
                    <li>
                      <b>{myCTLabel[idx]} :</b> {val}
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
