import axios from "axios";
import { FC, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios";
import { SpotifyData, Auth } from "../../types";
import { formatToken } from "../../helpers";
import { useAuth } from "../../contexts/auth/AuthContext.tsx";

const MainPage: FC = () => {
  const [search, setSearch] = useState<string>('FACE')
  const [data, setData] = useState<SpotifyData>({} as SpotifyData)
  // const navigate = useNavigate()

  const { accessToken } = useAuth()

  // const auth = () => {
  //   axios.post<Auth>('https://accounts.spotify.com/api/token',
  //     {
  //       grant_type: 'client_credentials',
  //       client_id: '7043b67bf3a947ed871a5841e3e9398f',
  //       client_secret: '470362b1e7f747f9a5622357921d4082',
  //       scope: 'streaming user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control',
  //     },
  //     {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       }
  //     })
  //     .then(({ data }) => {
  //       localStorage.setItem('token', data.access_token)
  //       axiosInstance.defaults.headers.common['Authorization'] = formatToken(data.access_token);
  //     })
  // }

  const handleInputChange = (event) => {
    setSearch(event.target.value)
  }

  const getSongs = () => {
    if (!search.length) return
    axiosInstance.get('search', {
      params: {
        q: search,
        type: 'album,artist,playlist,track'
      },
    }).then(({ data }) => {
      setData(data)
    }).catch(err => {
      console.log('err: ', err)
    })
  }

  return (
    <>
      {/*<button onClick={auth}>AUTH</button>*/}
      {/*<a href={AUTH_URL}>*/}
      {/*  Login With Spotify*/}
      {/*</a>*/}

      <button onClick={() => {
        console.log(accessToken)
      }}>click</button>

      <input value={search} type="text" placeholder="Text something" onInput={handleInputChange}/>
      <button onClick={getSongs}>SEARCH</button>

      {data?.artists?.items?.map(artist => (
        <Link to={`/artist/${artist.id}`} key={artist.id}>
          <p>{artist.name}</p>
          <img src={artist.images[0]?.url} alt=""/>
        </Link>
      ))}
    </>
  )
}

export default MainPage
