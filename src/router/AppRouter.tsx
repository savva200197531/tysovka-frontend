import { FC } from "react";
import { Route, Routes } from 'react-router-dom'
import LoginPage from "../pages/LoginPage/LoginPage.tsx";
import MainPage from "../pages/MainPage/MainPage.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import ArtistPage from "../pages/ArtistPage/ArtistPage.tsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.tsx";

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path='*' element={<NotFoundPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/artist/:id" element={<ArtistPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
