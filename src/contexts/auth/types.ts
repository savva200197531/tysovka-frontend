export type Login = (code: string) => void

export type AuthContextProps = {
  login: Login
  accessToken: string
};
