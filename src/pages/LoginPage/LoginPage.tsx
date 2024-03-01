import { FC, useEffect } from 'react';
import { useAuth } from "../../contexts/auth/AuthContext.tsx";

const AUTH_URL = `
https://accounts.spotify.com/authorize
?client_id=${import.meta.env.VITE_CLIENT_ID}
&response_type=code
&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state
`

const code = new URLSearchParams(window.location.search).get("code")

const LoginPage: FC = () => {
  const { login } = useAuth()

  useEffect(() => {
    if (!code) return
    login(code)
  }, [login]);

  return (
    <div>
      <a href={AUTH_URL}>
        Login With Spotify
      </a>
    </div>
  );
};

export default LoginPage;
