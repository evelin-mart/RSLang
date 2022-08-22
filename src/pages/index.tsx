import { Navigate, Route, RouteProps, Routes } from "react-router-dom";
import { GamePage } from "./game";
import { MainPage } from "./main";
import { TextbookPage } from "./textbook";
import { StatisticsPage } from './statistics/index';
import { NotFoundPage } from "./not-found";
import { useUser } from '../entities/user/model/hooks';
import { PropsWithChildren } from "react";
import { ProfilePage } from "./user/profile";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthorized } = useUser();

  return !isAuthorized
    ? <Navigate to="/" replace />
    : <>{children}</>;
}

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}/>
      <Route path="/game/:gameId" element={<GamePage />}/>
      <Route path="/textbook" element={<TextbookPage />}/>
      <Route path="/statistics" element={<StatisticsPage />}/>
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>}/>
      <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  );
}