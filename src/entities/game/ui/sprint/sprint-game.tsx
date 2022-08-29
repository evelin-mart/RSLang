import { Button } from '@mui/material';
import { AppDispatch } from 'app/store';
import { finishGame, GameResultsData, GAME_PHASE, setGamePhase, useGame } from 'entities/game/model';
import { Word } from 'entities/word'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { getRandomInt } from 'shared/lib';

export const GameSprintTest = () => {
  
  const dispatch: AppDispatch = useDispatch();
  const { words, progress, isSound } = useGame();

  const [word, setWord] = useState('');
  const [wordId, setWordId] = useState('');
  const [imgLink, setImgLink] = useState('');
  const [results, setResults] = useState<GameResultsData>({});
  const [translate, setTranslate] = useState('');
  const [rightAnswer, setRightAnswer] = useState<null | boolean>(null)
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winsCounter, setWinsCounter] = useState(0);  //TODO обсудить и решить какую именно статистику по словам будем собирать, пока затычка в виде счетчика отгаданных слов
  let userAnswer: boolean | null = null;

  const [secunds, setSecunds] = useState(0);

  const getWrongAnswer = () => {
    const wrong = ['черный', 'слово', 'небо', 'лето', 'апельсин']; //TODO сделать функцию для генерации неправильного ответа, пока затычка
    const index = Math.floor(Math.random() * wrong.length);
    return wrong[index];
  }

  const createCard = () => {

    const roll = Math.random();
    const index = Math.floor(Math.random() * words.length);
    setWord(words[index].word);
    setWordId(words[index].id);
    setImgLink(words[index].image);
    
    if (roll > 0.5) {
      setRightAnswer(true);
      setTranslate(words[index].wordTranslate);
    } else {
      setRightAnswer(false);
      setTranslate(getWrongAnswer());
    }
  }

  const checkAnswer = () => {
    if (userAnswer === rightAnswer) {
      setWinsCounter((s) => s + 1);
      setResults({...results, [wordId]: true})
      console.log('Верно!');
    } else {
      setResults({...results, [wordId]: false})
      console.log('Не верно!');
    }
    
    if (!isGameOver) {
      createCard();
    }
  }

  const handleEndGame = () => {
    dispatch(setGamePhase(GAME_PHASE.LOADING));
    dispatch(finishGame({
      results,
      longestChain: getRandomInt(0, Object.keys(results).length)
    }));
    
    console.log('Результаты', results);
  }

  useEffect(() => {
    createCard();
  }, [words])

  useEffect(() => {
    if (secunds < 30) {
      setTimeout(() => {
        setSecunds(secunds => secunds + 1)
      }, 1000);
    } else {
      setIsGameOver(true)
    }
  }, [secunds, isGameOver])


  return (
    <div style={{margin: '20vh auto 20vh', textAlign: 'center'}}>
      {isGameOver
        ? 
        <Button onClick={handleEndGame} variant="outlined" color="secondary" endIcon={<SkipNextIcon />}>
          Завершить игру
        </Button>
        : <div style={{width: '280px', height: '400px', backgroundColor: 'tomato', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <span>Sprint</span><span>timer: {secunds}</span>
            </div>
            <div>
              <div>
                <img src={`http://localhost:3001/${imgLink}`} width='80%' alt="" />
              </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
              <span style={{fontSize: '25px', color: 'blue'}}>{word}</span><span> is equal </span><span style={{fontSize: '25px', color: 'aqua'}}>{translate}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <button onClick={() => {userAnswer = true; checkAnswer()}}>true</button>
              <button onClick={() => {userAnswer = false; checkAnswer()}}>false</button>
            </div>
          </div>}
    </div>
  )
}

