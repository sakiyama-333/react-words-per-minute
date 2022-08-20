import { createContext, useState } from "react";
import styled from "styled-components";

import TimerAndButton from "./components/InputAndTimer";

export const WordsCalcContext = createContext(" ");
export const ResultScoreContext = createContext(" ");

function App() {
  const [wordsCalc, setwordsCalc] = useState(" ");
  const [resultScore, setResultScore] = useState("000");

  return (
    <>
      <WordsCalcContext.Provider value={[wordsCalc, setwordsCalc]}>
        <ResultScoreContext.Provider value={[resultScore, setResultScore]}>
          <BkgWapperStyle>
            <TitleAreaStyle>Word per minute checker</TitleAreaStyle>
            <SMainAreaStyle>
              <TimerAndButton />
            </SMainAreaStyle>
          </BkgWapperStyle>
        </ResultScoreContext.Provider>
      </WordsCalcContext.Provider>
    </>
  );
}

const BkgWapperStyle = styled.div`
  background-color: #fff;
  margin: 56px auto 0;
  max-width: 80%;
  padding: 56px 0;
`;

const TitleAreaStyle = styled.h1`
  color: #5d9dba;
  margin: 0;
  padding-bottom: 40px;
  text-align: center;
`;

const SMainAreaStyle = styled.main`
  display: grid;
  gap: 80px;
  grid-template-columns: 2fr 1fr;
  margin: 0 auto;
  max-width: 812px;
  text-align: center;
`;

export default App;
