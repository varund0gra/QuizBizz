//                                  project on quiz react pagesetarr
import React, { useEffect, useState } from "react";
import qData from "./data.json";
import { Button, Progress } from "reactstrap";
import { stars, handleResult } from "./utils/index";
import MultiProgres from "./componends/MultiProgress";
import Resultpage from "./componends/Resultpage";

function Quiz() {
  // Initialization of states
  const [quesdataindex, setquesdataindex] = useState(0);
  const [qindex, setQIndex] = useState(1);
  const [progressbarpercentage, setprogressbarpercentage] = useState(0);
  const [showoption, setshowoption] = useState("");
  const [renderresultpage, setrender] = useState(false);
  const [nextbutton, shownextButton] = useState(false);
  const [score, setscore] = useState(0);
  const [wrongscorbar, setwrongscorbar] = useState(0);
  const [res, setres] = useState(false);
  const [correct, setcorrect] = useState(0);
  const [wrong, setwrong] = useState(0);
  const [shuffleddata, setshuffleddata] = useState([]);

  // ON RESET BUTTON RESET STATES
  function handlereset() {
    setQIndex(1);
    setquesdataindex(0);
    setprogressbarpercentage(0);
    setshowoption("");
    setrender(false);
    shownextButton(false);
    setscore(0);
    setwrongscorbar(0);
    setres(false);
    setcorrect(0);
    setwrong(0);
  }

  // shuffling array

  function shufflearray(index) {
    for (let i = qData[index].incorrect_answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [qData[index].incorrect_answers[i], qData[index].incorrect_answers[j]] = [
        qData[index].incorrect_answers[j],
        qData[index].incorrect_answers[i],
      ];
    }
    var g = qData[index].incorrect_answers;
    return g;
  }
  useEffect(() => {
    const shuffled = shufflearray(quesdataindex);
    setshuffleddata(shuffled);
  }, [quesdataindex]);

  // ON CLICKING NEXT
  function handleclick() {
    if (qindex - 1 >= qData.length) {
      shownextButton(false);
      console.log(qindex);
    }
    setquesdataindex(quesdataindex + 1);
    setQIndex(qindex + 1);
    setprogressbarpercentage(progressbarpercentage + 5);
    setrender(false);
    shownextButton(false);
  }

  //  CHECKING VALUE IF IT IS EQUAL OR NOT
  function checkvalue(value) {
    if (qData[quesdataindex].correct_answer == value) {
      setrender(true);
      setshowoption(value);
      setscore(score + 5);
      setcorrect(correct + 1);
    } else {
      setrender(true);
      setshowoption(value);
      setwrongscorbar(wrongscorbar + 5);
      setwrong(wrong + 1);
    }
    if (qindex > qData.length) {
      shownextButton(false);
    } else if (qindex < qData.length) {
      shownextButton(true);
    }
  }
  return (
    <>
      {/* conditional rendering to render result or mcq */}
      {!res ? (
        <div className="body">
          <Progress className="my-3"color="info" striped value={progressbarpercentage}/>
          <div className="quizw">
            {" "}
            <div>
              <div className="heading">
                <h1 style={{ color: "white" }}>
                  Question {qindex} of {qData.length}
                </h1>{" "}
              </div>{" "}
            </div>{" "}
            <div>
              <label className="starsize">{stars(quesdataindex)}</label>
              <br /> <br />
            </div>
            <div>
              <h3>{decodeURIComponent(qData[quesdataindex].question)}</h3>
              <br />
            </div>
            <div>
              {!renderresultpage ? (
                shuffleddata.map((option) => {
                  return (
                    <div className="option-align">
                      <button
                        onClick={() => {
                          const value = option;
                          checkvalue(value);
                        }}
                      >
                        {decodeURIComponent(option)}
                      </button>

                      <br />
                    </div>
                  );
                })
              ) : // rendering correct or incorect ans
              showoption == qData[quesdataindex].correct_answer ? (
                <>
                  <div className="showans">
                    <div color="Danger">
                      {shuffleddata.map((op) => {
                        return (
                          <div>
                            {showoption == op ? (
                              <Button color="success">
                                {decodeURIComponent(op)}
                              </Button>
                            ) : (
                              <button>{decodeURIComponent(op)}</button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <label className="collabel1">Correct </label>{" "}
                  </div>{" "}
                </>
              ) : (
                <div className="showans">
                  <div color="Danger">
                    {shuffleddata.map((op) => {
                      return (
                        <div>
                          {showoption == op ? (
                            <Button color="danger">
                              {decodeURIComponent(op)}
                            </Button>
                          ) : (
                            <button>{decodeURIComponent(op)}</button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <label className="collabel">Sorry. Please try again.</label>
                </div>
              )}
            </div>
            <br />
            <br />{" "}
            <div>
              {nextbutton == true ? (
                <Button onClick={handleclick} color="primary" className="next">
                  Next
                </Button>
              ) : (
                " "
              )}
            </div>{" "}
            <br />
            {qindex === qData.length ? (
              <Button color="primary" onClick={() => handleResult(setres)}>
                Results
              </Button>
            ) : (
              ""
            )}
            {/* score bar */}
            <MultiProgres score={score} wrongscorbar={wrongscorbar} />
          </div>{" "}
        </div>
      ) : (
        <div>
          <Resultpage score={score} correct={correct} wrong={wrong} />
          <Button className="resetButton" color="info" onClick={handlereset}>
            Reset quiz
          </Button>
        </div>
      )}
    </>
  );
}
export default Quiz;
