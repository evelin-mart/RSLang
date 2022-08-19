import { Route, Routes } from "react-router-dom";
import { GamePage } from "./game";
import { MainPage } from "./main";
import { TextbookPage } from "./textbook";
import { StatisticsPage } from './statistics/index';
import { NotFoundPage } from "./not-found";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}/>
      <Route path="/game/:gameId" element={<GamePage />}/>
      <Route path="/textbook" element={<TextbookPage />}/>
      <Route path="/statistics" element={<StatisticsPage />}/>
      <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  );
}