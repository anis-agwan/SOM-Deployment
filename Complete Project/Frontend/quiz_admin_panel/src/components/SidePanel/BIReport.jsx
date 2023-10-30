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

export const BIReport = (props) => {
  const bNum = props.bnum;
  const [biData, setBIData] = useState({ Data: {} });
  const [avgData, setAvgData] = useState({ Data: {} });
  const [commentsData, setCommentsData] = useState([
    "CR",
    "IC",
    "III",
    "IS",
    "SMI",
    "SR",
  ]);
  const [addComData, setAddCommData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const baseURL = "http://localhost:8448/bbim/bi/getScores";

  const getCTScoreHandler = async () => {
    try {
      const response = await axios.get(`${baseURL}/${bNum}`);
      console.log(response.data);
      setLoading(false);
      const avgAdapt = [
        response.data.avgAdaptToChange1,
        response.data.avgAdaptToChange2,
      ];

      const biScores = [
        response.data.biScoreCR,
        response.data.biScoreIC,
        response.data.biScoreIII,
        response.data.biScoreIS,
        response.data.biScoreSMI,
        response.data.biScoreSR,
      ];

      const biAddComments = [
        response.data.biCommentCR,
        response.data.biCommentIC,
        response.data.biCommentIII,
        response.data.biCommentIS,
        response.data.biCommentSMI,
        response.data.biCommentSR,
      ];

      setAddCommData(biAddComments);

      setAvgData({
        Data: {
          labels: ["Adapt to change 1", "Adapt to change 2"],
          datasets: [
            {
              label: "Average Adapt to Change",
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 2,
              data: avgAdapt,
            },
          ],
        },
      });

      setBIData({
        Data: {
          labels: commentsData,
          datasets: [
            {
              label: "BI Scores",
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 2,
              data: biScores,
            },
          ],
        },
      });

      console.log(biData.Data);

      setLoading(true);
    } catch (err) {
      console.log(err);
    }

    setLoading(true);
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
            // return commentsData[context.dataIndex];
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

  return (
    <>
      <div className="PB-report-map">
        {isLoading && Object.keys(avgData.Data).length > 0 && (
          <div className="PB-report-data">
            <Bar data={avgData.Data} options={config} />
          </div>
        )}

        {isLoading && Object.keys(biData.Data).length > 0 && (
          <div className="PB-report-data">
            <Bar data={biData.Data} options={config} />
            {addComData.map((val, idx) => {
              //   console.log(val);
              return (
                <div key={idx}>
                  {" "}
                  <ul>
                    <li>
                      <b>{commentsData[idx]} :</b> {val}
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
