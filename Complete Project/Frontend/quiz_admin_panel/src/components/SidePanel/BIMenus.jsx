import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BIMenus = ({ bnumber }) => {
  console.log(bnumber);
  const [questionsList, setQuestionsList] = useState([]);
  const [simulationQuestions, setSimulationQuestions] = useState([]);
  const [evaluationQuestions, setEvaluationQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [answerObject, setAnswerObject] = useState({
    bingNumber: bnumber,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const baseUrl = "http://localhost:8448/bbim/bi/";
    const url = `${baseUrl}getQuestions`;
    setIsLoading(true);
    const fetchQuestions = async () => {
      await axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          const data = res.data;
          setQuestionsList(data);
          setIsLoading(false);
          setSimulationQuestions(data.slice(0, 20));
          setEvaluationQuestions(data.slice(20));
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    };

    fetchQuestions();
    // console.log(questionsList.slice(0, 19));
  }, []);

  const sim1BtnHandler = () => {
    navigate("/Simulation1", {
      state: {
        simulationQuestions: simulationQuestions,
        evaluationQuestions: evaluationQuestions,
        answers: answerObject,
      },
    });
  };

  const sim2BtnHandler = () => {
    navigate("/Simulation2", {
      state: {
        simulationQuestions: simulationQuestions,
        evaluationQuestions: evaluationQuestions,
        answers: answerObject,
      },
    });
  };

  const eval1BtnHandler = () => {
    navigate("/Evaluation1", {
      state: {
        simulationQuestions: simulationQuestions,
        evaluationQuestions: evaluationQuestions,
        answers: answerObject,
      },
    });
  };

  const eval2BtnHandler = () => {
    navigate("/Evaluation2", {
      state: {
        simulationQuestions: simulationQuestions,
        evaluationQuestions: evaluationQuestions,
        answers: answerObject,
      },
    });
  };

  return (
    <>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div className="BISection">
          <div id="form" className="s1StartBtnForm">
            <button className="s1card" onClick={sim1BtnHandler}>
              {/* <img src={juicy_business} alt="Avatar" className="s1Image" /> */}
              <div className="s1Selection">
                <h1 className="s1Title">Simulation 1</h1>

                {/* <div className="s1StartButton">
                                            <input className="s1StartText" type="submit"  value=">"></input>
                                        </div> */}
              </div>
            </button>
          </div>
          <div id="form" className="s1StartBtnForm">
            <button className="e1card" onClick={eval1BtnHandler}>
              {/* <img src={juicy_business} alt="Avatar" className="s1Image" /> */}
              <div className="s1Selection">
                <h1 className="s1Title">Evaluation 1</h1>

                {/* <div className="s1StartButton">
                                            <input className="s1StartText" type="submit" value=">"></input>
                                        </div> */}
              </div>
            </button>
          </div>

          <div id="form" className="s1StartBtnForm">
            <button className="s2card" onClick={sim2BtnHandler}>
              {/* <img src={juicy_business} alt="Avatar" className="s1Image" /> */}
              <div className="s1Selection">
                <h1 className="s1Title">Simulation 2</h1>

                {/* <div className="s1StartButton">
                                            <input className="s1StartText" type="submit" value=">"></input>
                                        </div> */}
              </div>
            </button>
          </div>
          <div id="form" className="s1StartBtnForm">
            <button className="e2card" onClick={eval2BtnHandler}>
              {/* <img src={juicy_business} alt="Avatar" className="s1Image" /> */}
              <div className="s1Selection">
                <h1 className="s1Title">Evaluation 2</h1>

                {/* <div className="s1StartButton">
                                                <input className="s1StartText" type="submit" value=">"></input>
                                            </div> */}
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BIMenus;
