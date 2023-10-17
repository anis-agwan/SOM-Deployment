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

const state = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Rainfall",
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
    },
  ],
};

export const ReportDD = (props) => {
  const bNum = props.bnum;
  const [ddData, setDDData] = useState({ Data: {} });
  const [commentsData, setCommentsData] = useState([
    "Analyses Score",
    "Connections Score",
    "Depth Score",
  ]);
  const [isLoading, setLoading] = useState(false);
  const baseURL =
    "http://localhost:8444/critical-thinking/critical-thinking/getScores";

  const getDDScoreHandler = async () => {
    try {
      const response = await axios.get(`${baseURL}/${bNum}`);

      const dD = [
        response.data.sec1AnalysisScore,
        response.data.sec2ConnectionsScore,
        response.data.sec3DepthScore,
      ];

      console.log(Object.keys(response.data));

      setLoading(false);
      setDDData({
        Data: {
          labels: ["Section 1", "Section 2", "Section 3"],
          datasets: [
            {
              label: "Difficult Decisions",
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 2,
              data: dD,
            },
          ],
        },
      });

      console.log(ddData);
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
    getDDScoreHandler();
    setLoading(true);
  }, []);

  return (
    <>
      <div>
        {isLoading && Object.keys(ddData.Data).length > 0 && (
          <Bar data={ddData.Data} options={config} />
        )}
      </div>
    </>
  );
};
