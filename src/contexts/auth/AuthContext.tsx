import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { AuthContextProps, Login } from './types'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../types";
import { axiosInstance } from "../../axios";
import { formatToken } from "../../helpers";
import Cookies from "js-cookie";

const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps)

export const useAuth = () => useContext(AuthContext)

type Props = {
  children: ReactNode
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | undefined>(Cookies.get('accessToken'))
  const [refreshToken, setRefreshToken] = useState<string | undefined>(Cookies.get('refreshToken'))
  const [expiresIn, setExpiresIn] = useState<number>(0)

  const navigate = useNavigate()

  const login: Login = useCallback((code) => {
    axios
      .post<Auth>("http://localhost:3001/auth/login", {
        code,
      })
      .then(res => {
        setAccessToken(res.data.access_token)
        setRefreshToken(res.data.refresh_token)
        setExpiresIn(res.data.expires_in)
        const expires = new Date(new Date().getTime() + res.data.expires_in * 60 * 1000);
        Cookies.set('refreshToken', res.data.refresh_token)
        Cookies.set('accessToken', res.data.access_token)
        // Cookies.set('ravelinDeviceId', 'rjs-9833b3ed-297b-461b-853f-27296abb67f1')
        navigate('/')
      })
      .catch(() => {
        // navigate('/')
      })
  }, [navigate])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return

    // axios
    //   .post<Auth>("http://localhost:3001/auth/refresh", {
    //     refreshToken,
    //   })
    //   .then(res => {
    //     setAccessToken(res.data.access_token)
    //     setExpiresIn(res.data.expires_in)
    //   })
    //   .catch(() => {
    //     navigate('/')
    //   })
  }, [refreshToken, expiresIn, navigate])

  useEffect(() => {
    if (!accessToken) return
    axiosInstance.defaults.headers['Authorization'] = formatToken(accessToken);
  }, [accessToken]);

  const value = {
    login,
    accessToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
