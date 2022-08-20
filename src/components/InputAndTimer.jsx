import React from "react";
import { useContext, useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import styled from "styled-components";

import { SButton } from "./BaseButtonStyle";
import { WordsCalcContext } from "../App";
import { ResultScoreContext } from "../App";

const TimerAndButton = () => {
  const { seconds, minutes, start, pause, reset } = useStopwatch("");

  const [wordsCalc, setwordsCalc] = useContext(WordsCalcContext);
  const [resultScore, setResultScore] = useContext(ResultScoreContext);

  const [minutesTime, setminutesTime] = useState(minutes);
  const [secondsTime, setSecondsTime] = useState(seconds);
  const [inputText, setInputText] = useState("");
  const [scoreList, setScoreList] = useState([]);
  const [startBtnDisable, setStartBtnDisable] = useState(true);
  const [stopBtnDisable, setStoptBtnDisable] = useState(false);

  const nowDate = new Date();

  useEffect(() => {
    const getStorageItems = JSON.parse(localStorage.getItem("item"));
    if (getStorageItems === null || undefined) {
      return;
    } else {
      setScoreList(getStorageItems);
    }
  }, []);

  useEffect(() => {
    if (minutesTime < 9) {
      setminutesTime(`0${minutes}`);
    } else {
      setminutesTime(minutes);
    }
  }, [minutes]);

  useEffect(() => {
    if (secondsTime < 9) {
      setSecondsTime(`0${seconds}`);
    } else if (secondsTime < 59) {
      setSecondsTime(seconds);
    } else {
      setSecondsTime(`0${seconds}`);
    }
  }, [seconds]);

  const countTheNumberOfWords = (props) => {
    setStartBtnDisable(false);
    setInputText(props.target.value);

    let wordsLength = props.target.value.split(" ").length;
    setwordsCalc(wordsLength);
  };

  const timerStart = () => {
    start();
    setStartBtnDisable(true);
  };

  const stopFc = () => {
    pause();
    setStoptBtnDisable(true);

    const timeTaken = parseInt(minutes) * 60 + parseInt(seconds);
    const resultScore = Math.round((wordsCalc / timeTaken) * 60);
    setResultScore(resultScore);

    const year = nowDate.getFullYear();
    const Month = nowDate.getMonth() + 1;
    const day = nowDate.getDate();
    const hour = nowDate.getHours();
    const minute = nowDate.getMinutes();

    let nowTimeDate = 0;
    if (hour < 10 && minute < 10) {
      nowTimeDate = `${year}/${Month}/${day} 0${hour}:0${minute}`;
    } else if (minute < 10) {
      nowTimeDate = `${year}/${Month}/${day} ${hour}:0${minute}`;
    } else {
      nowTimeDate = `${year}/${Month}/${day} ${hour}:${minute}`;
    }

    const scoreItem = {
      timeDate: nowTimeDate,
      pastScore: resultScore,
    };

    const newScoreList = [...scoreList, scoreItem];
    setScoreList(newScoreList);
    const scoreStringData = JSON.stringify(newScoreList);
    localStorage.setItem("item", scoreStringData);
  };

  const resetFc = () => {
    reset(nowDate, false);
    setwordsCalc("");
    setInputText("");
    setStartBtnDisable(false);
    setStoptBtnDisable(false);
  };

  const resetPastScore = () => {
    localStorage.clear();
    setScoreList([]);
  };

  return (
    <>
      <SInputAreaStyle>
        <STextarea
          placeholder="テキストを入力してください"
          cols="50"
          rows="10"
          onChange={countTheNumberOfWords}
          value={inputText}
        />
        <p>単語数：{wordsCalc}</p>
        <STimer>
          {minutesTime}:{secondsTime}
        </STimer>
        <SButtonAreaStyle>
          <SButton
            background={"#34787B"}
            height={"80px"}
            width={"80px"}
            color={"#fff"}
            value={"start"}
            onClick={timerStart}
            disabled={startBtnDisable}
          >
            START
          </SButton>
          <SButton
            background={"#7aa3a5"}
            height={"70px"}
            width={"70px"}
            color={"#fff"}
            value={"reset"}
            onClick={resetFc}
          >
            RESET
          </SButton>
          <SButton
            background={"#34787B"}
            height={"80px"}
            width={"80px"}
            color={"#fff"}
            value={"stop"}
            onClick={stopFc}
            disabled={stopBtnDisable}
          >
            STOP
          </SButton>
        </SButtonAreaStyle>
      </SInputAreaStyle>

      <SResultAreaStyle>
        <SText>あなたのスコアは</SText>
        <SResultValueText>{resultScore}</SResultValueText>
        <SText>過去のスコア一覧</SText>
        <SParentUl id="ulElement">
          {scoreList.map((item, index) => (
            <SLi key={index}>{`${item.timeDate} => ${item.pastScore}`}</SLi>
          ))}
        </SParentUl>
        <SButton
          background={"#C9E6E7"}
          height={"3em"}
          width={"100%"}
          color={"#565656"}
          value={"scoreReset"}
          onClick={resetPastScore}
        >
          スコアをリセット
        </SButton>
      </SResultAreaStyle>
    </>
  );
};

const SInputAreaStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const STextarea = styled.textarea`
  font-family: inherit;
  font-size: 16px;
  letter-spacing: 0.05em;
`;

const SButtonAreaStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const STimer = styled.p`
  font-size: 3.75rem;
  margin: 0 auto;
`;

const SResultAreaStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const SText = styled.p`
  font-size: 1.25rem;
  margin: 0;
  font-weight: 600;
`;

const SResultValueText = styled.p`
  color: #4bacb1;
  margin: 16px auto 0;
  font-size: 3.75rem;
`;

const SParentUl = styled.ul`
  list-style: none;
  padding: 0;
`;

const SLi = styled.li`
  padding-bottom: 12px;
`;

export default TimerAndButton;
