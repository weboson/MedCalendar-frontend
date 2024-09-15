//! Страница авторизации (login и registartion (profile))
// Либо ВОЙТИ либо ЗАРЕГИСТРИРОВАТСЯ
// Exmple: http://localhost:3000/api/auth/profile or http://localhost:3000/api/auth/login
import { Moment } from 'moment';
import { FC, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Monitor from '../components/Monitor/Monitor';
import Auth from '../components/Auth/Auth';
//type для констант context-а от 'react-router-dom'
interface ArrayContextType extends Array<Moment> {}

const AuthPage: FC = () => {

  // useOutletContext - это из (Outlet, Lauout.tsx) react-router-dom (чтобы передать пропсы)
  const [currentDate, prevHandler, todayHandler, nextHandler] =
    useOutletContext<ArrayContextType>();

  return (
    <>
      <Monitor
        currentDate={currentDate}
        prevHandler={prevHandler}
        todayHandler={todayHandler}
        nextHandler={nextHandler}
      />
      <Auth />
    </>
  );
};

export default AuthPage;
