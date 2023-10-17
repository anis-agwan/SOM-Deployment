// import { Grid } from "@material-ui/core";
import "./Evaluation2.css";
import { useLocation, useNavigate } from "react-router-dom";
import * as React from "react";
import axios from "axios";
// import Evaluation2Data from "./Evaluation2Data";
const Evaluation2Data = [
  {
    Q: "ADAPTING TO CHANGE EVALUATION - Assessor A",
    question1: "Q1-Open to change",
    O1: [
      {
        idx: "1",
        value:
          "1 : Unwilling to consider alternative approaches or ways of doing things.  Prefers to stick with what has worked in the past rather than try new ideas.",
      },
      {
        idx: "2",
        value:
          "2 : Unwilling to consider alternative approaches or ways of doing things.  Prefers to stick with what has worked in the past rather than try new ideas.",
      },
      {
        idx: "3",
        value:
          "3 : Unwilling to consider alternative approaches or ways of doing things.  Prefers to stick with what has worked in the past rather than try new ideas.",
      },
      {
        idx: "4",
        value:
          "4 : Expressed an interest in trying new things.  Considers alternative approaches to or ways of doing things.",
      },
      {
        idx: "5",
        value:
          "5 : Expressed an interest in trying new things.  Considers alternative approaches to or ways of doing things.",
      },
      {
        idx: "6",
        value:
          "6 : Expressed an interest in trying new things.  Considers alternative approaches to or ways of doing things.",
      },
      {
        idx: "7",
        value:
          "7 : Expressed an interest in trying new things.  Considers alternative approaches to or ways of doing things.",
      },
      {
        idx: "8",
        value:
          "8 : Clearly enjoys change.  Solicits new ideas from others and acts on them to help produce change.",
      },
      {
        idx: "9",
        value:
          "9 : Clearly enjoys change.  Solicits new ideas from others and acts on them to help produce change.",
      },
      {
        idx: "10",
        value:
          "10 : Clearly enjoys change.  Solicits new ideas from others and acts on them to help produce change.",
      },
    ],
    question2: "Q2-Effectively addapts to change",
    O2: [
      {
        idx: "1",
        value:
          "1 : Demonstrated a low level of flexibility.  Strongly prefers structured tasks and stable routine.  Showed almost no willingness or ability to change.",
      },
      {
        idx: "2",
        value:
          "2 : Demonstrated a low level of flexibility.  Strongly prefers structured tasks and stable routine.  Showed almost no willingness or ability to change.",
      },
      {
        idx: "3",
        value:
          "3 : Demonstrated a low level of flexibility.  Strongly prefers structured tasks and stable routine.  Showed almost no willingness or ability to change.",
      },
      {
        idx: "4",
        value:
          "4 : Demonstrated a willingness and ability to accept and adapt to change.  Effectively modified behavior/attitudes in response to changing demands/expectations.",
      },
      {
        idx: "5",
        value:
          "5 : Demonstrated a willingness and ability to accept and adapt to change.  Effectively modified behavior/attitudes in response to changing demands/expectations.",
      },
      {
        idx: "6",
        value:
          "6 : Demonstrated a willingness and ability to accept and adapt to change.  Effectively modified behavior/attitudes in response to changing demands/expectations.",
      },
      {
        idx: "7",
        value:
          "7 : Demonstrated a willingness and ability to accept and adapt to change.  Effectively modified behavior/attitudes in response to changing demands/expectations.",
      },
      {
        idx: "8",
        value:
          "8 : Demonstrated extreme flexibility and the ability to adapt quickly to a variety of changes.  Provided examples of facilitating change or helping others to adapt to change.",
      },
      {
        idx: "9",
        value:
          "9 : Demonstrated extreme flexibility and the ability to adapt quickly to a variety of changes.  Provided examples of facilitating change or helping others to adapt to change.",
      },
      {
        idx: "10",
        value:
          "10 : Demonstrated extreme flexibility and the ability to adapt quickly to a variety of changes.  Provided examples of facilitating change or helping others to adapt to change.",
      },
    ],

    Observation: "Observations",
    SeekingMoreInfo: "Seeking More Information",
    SharingResponsibility: "Sharing Responsibility",
  },
];

const Evaluation2 = () => {
  // console.log(Evaluation2Data[1].Q)
  const location = useLocation();
  // console.log(Simulation1Data[1].Q)
  const [questionsList, setQuestionsList] = React.useState(
    location.state.evaluationQuestions
  );
  // console.log(questionsList);
  const simulationQuestions = location.state.simulationQuestions;
  const [answerObject, setAnswerObject] = React.useState(
    location.state.answers
  );
  const [eval2Answers, setEval2Answers] = React.useState({});
  console.log(eval2Answers);
  const [currQues, setCurrQues] = React.useState(0);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [showE2Score, setShowE2Score] = React.useState(false);
  //let [E2Score, setE2Score] = React.useState(0);
  const [selectedOptionO1, setSelectedOptionO1] = React.useState(null);
  const [selectedOptionO2, setSelectedOptionO2] = React.useState(null);

  function getE2TextAreaValue(event) {
    event.preventDefault();
    // var textarea = document.getElementById("E1ObservationID");
    // var observationtext = textarea.value;
    // console.log(Evaluation1Data[currentQuestion].Q, observationtext);
    // console.log(event.target.value);
    setEval2Answers((prevObj) => {
      return {
        ...prevObj,
        adaptToChange2Observation: event.target.value,
      };
    });
  }
  function eraseText() {
    document.getElementById("E2ObservationID").value = "";
  }

  const handleO1AnswerButtonClick = (idx) => {
    //setE2Score((prevScore) => prevScore + parseInt(idx));
    setEval2Answers((prevObj) => {
      return {
        ...prevObj,
        adaptToChange2Score1: idx,
      };
    });
    setSelectedOptionO1(idx);
  };
  const handleO2AnswerButtonClick = (idx) => {
    //setE2Score((prevScore) => prevScore + parseInt(idx));
    setEval2Answers((prevObj) => {
      return {
        ...prevObj,
        adaptToChange2Score2: idx,
      };
    });
    setSelectedOptionO2(idx);
  };

  const handleNextButonClick = () => {
    const nextQuestion = currentQuestion + 1;
    const nextQues = currQues + 1;
    // console.log(nextQues);
    if (nextQues < questionsList.length) {
      // getE2TextAreaValue();
      setCurrQues(nextQues);
      setSelectedOptionO1(null);
      setSelectedOptionO2(null);
      eraseText();
    } else {
      setAnswerObject((prevObj) => {
        return {
          ...prevObj,
          eval2SectionComplete: true,
          eval2Answers,
        };
      });
      setShowE2Score(true);
    }

    if (nextQuestion < Evaluation2Data.length) {
      // getE2TextAreaValue();
      setCurrentQuestion(nextQuestion);
      setSelectedOptionO1(null);
      setSelectedOptionO2(null);
      eraseText();
    } else {
      setAnswerObject((prevObj) => {
        return {
          ...prevObj,
          eval2SectionComplete: true,
          eval2Answers,
        };
      });
      setShowE2Score(true);
    }
  };
  const handlePrevButonClick = () => {
    const prevQuestion = currentQuestion - 1;
    const prevQues = currQues - 1;
    if (prevQues >= 0) {
      setCurrQues(prevQues);
      eraseText();
      //console.log(currentQuestion);
    } else {
      alert("You have reached start of the Quiz!");
    }
    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
      eraseText();
      //console.log(currentQuestion);
    } else {
      alert("You have reached start of the Quiz!");
    }
  };

  const handleSeekingInfo = (event) => {
    event.preventDefault();
    // console.log(event.target.value);
    setEval2Answers((prevObj) => {
      return {
        ...prevObj,
        adaptToChange2SeekingMoreInformation: event.target.value,
      };
    });
    // setAnswerObject((prevObj) => {
    //   return {
    //     ...prevObj,
    //     adaptToChange1SeekingMoreInformation: event.target.value,
    //   };
    // });
  };

  const handleSharingInfo = (event) => {
    event.preventDefault();
    // console.log(event.target.value);
    setEval2Answers((prevObj) => {
      return {
        ...prevObj,
        adaptToChange2SharingResponsibility: event.target.value,
      };
    });
    // setAnswerObject((prevObj) => {
    //   return {
    //     ...prevObj,
    //     adaptToChange1SharingResponsibility: event.target.value,
    //   };
    // });
  };

  const baseURL = "http://localhost:8080/bbim/bi/";

  const submitSimEval1 = async () => {
    const url = `${baseURL}biEvaluation1Data`;
    const data = {
      bingNumber: answerObject.bingNumber,
      ...answerObject.sim1Answers,
      ...answerObject.eval1Answers,
    };

    console.log(data);
    await axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitSimEval2 = async () => {
    const url = `${baseURL}biEvaluation2Data`;
    const data = {
      bingNumber: answerObject.bingNumber,
      ...answerObject.sim2Answers,
      ...answerObject.eval2Answers,
    };

    console.log(data);
    await axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitBIQuiz = () => {
    submitSimEval1();
    submitSimEval2();
  };

  const navigate = useNavigate();
  return (
    <div className="Evaluation2MainFrame">
      {showE2Score ? (
        <div className="ScoreClass">
          {/* <div className="E2Score">You Scored : {E2Score}</div> */}
          <div className="S1Score">
            <h1>
              You Have completed Evaluation2! <h4>(4/4)</h4>
            </h1>
          </div>
          <button
            className="HomeButton"
            onClick={() => {
              // submitSimEval2();
              // navigate("/Reports");
              console.log(answerObject);
              if (
                answerObject.sim1SectionComplete &&
                answerObject.sim2SectionComplete &&
                answerObject.eval1SectionComplete &&
                answerObject.eval2SectionComplete
              ) {
                submitBIQuiz();
                navigate("/reports");
              } else {
                alert("Please Complete all the Interviews first");
              }
            }}
          >
            {" "}
            Dashboard{" "}
          </button>
        </div>
      ) : (
        <>
          <div>
            <h1 className="Evaluation2Title">
              {Evaluation2Data[currentQuestion].Q}
            </h1>
            <br></br>
            <h3 className="SimulationQ1Question">
              {/* {Evaluation2Data[currentQuestion].question1} */}
              {questionsList[currQues].idNameNum}
            </h3>
          </div>
          <div>
            {questionsList[currQues].options.map((dat, idx) => {
              return (
                <>
                  <div key={idx + 1}>
                    <button
                      onClick={() => handleO1AnswerButtonClick(idx + 1)}
                      className={`Evaluation2Options ${
                        selectedOptionO1 === idx + 1 ? "selected" : ""
                      }`}
                    >
                      {`${idx + 1} ${dat.idx}`}
                    </button>
                  </div>
                </>
              );
            })}
            {/* {Evaluation2Data[currentQuestion].O1.map((Evaluation2Data) => {
              return (
                <>
                  <div key={Evaluation2Data.idx}>
                    <button
                      onClick={() =>
                        handleO1AnswerButtonClick(Evaluation2Data.idx)
                      }
                      className={`Evaluation2Options ${
                        selectedOptionO1 === Evaluation2Data.idx
                          ? "selected"
                          : ""
                      }`}
                    >
                      {Evaluation2Data.value}
                    </button>
                  </div>
                </>
              );
            })} */}
          </div>
          {/* ----------------------------2nd-------------------------------- */}

          <div>
            <br></br>
            <h3 className="SimulationQ1Question">
              {Evaluation2Data[currentQuestion].question2}
            </h3>
          </div>
          <div>
            {questionsList[currQues + 1].options.map((dat, idx) => {
              return (
                <>
                  <div key={idx + 1}>
                    <button
                      onClick={() => handleO2AnswerButtonClick(idx + 1)}
                      className={`Evaluation2Options ${
                        selectedOptionO2 === idx + 1 ? "selected" : ""
                      }`}
                    >
                      {`${idx + 1} ${dat.idx}`}
                    </button>
                  </div>
                </>
              );
            })}
            {/* {Evaluation2Data[currentQuestion].O2.map((Evaluation2Data) => {
              return (
                <>
                  <div key={Evaluation2Data.idx}>
                    <button
                      onClick={() =>
                        handleO2AnswerButtonClick(Evaluation2Data.idx)
                      }
                      className={`Evaluation2Options ${
                        selectedOptionO2 === Evaluation2Data.idx
                          ? "selected"
                          : ""
                      }`}
                    >
                      {Evaluation2Data.value}
                    </button>
                  </div>
                </>
              );
            })} */}
          </div>
          {/* ----------------------------3rd-------------------------------- */}

          {/* ----------------------------5th-------------------------------- */}

          <div>
            <br></br>
            <h3 className="SimulationQ1Question">
              {Evaluation2Data[currentQuestion].Observation}
            </h3>
            <textarea
              className="E2ObservationTextClass"
              name="E2ObservvationText"
              id="E2ObservationID"
              cols="40"
              rows="10"
              required
              onChange={getE2TextAreaValue}
            ></textarea>

            <div className="SeekingMoreInfoDiv">
              <h3 className="EvaluationSeekingQuestion">
                {Evaluation2Data[currentQuestion].SeekingMoreInfo}
              </h3>

              <input
                className="SeekingMoreInfo"
                type="Number"
                min={0}
                max={10}
                required
                onChange={handleSeekingInfo}
              ></input>
            </div>
            <div className="SeekingMoreInfoDiv">
              <h3 className="EvaluationSeekingQuestion">
                {Evaluation2Data[currentQuestion].SharingResponsibility}
              </h3>
              <input
                className="SeekingMoreInfo"
                type="Number"
                min={0}
                max={10}
                required
                onChange={handleSharingInfo}
              ></input>
            </div>
          </div>
          {/* ----------------------------Btn-------------------------------- */}
          <br></br>
          <button className="Evaluation2PrevBtn" onClick={handlePrevButonClick}>
            Prev
          </button>
          <button className="Evaluation2NextBtn" onClick={handleNextButonClick}>
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default Evaluation2;
