import { useState, useEffect, FC } from "react"
import SpotifyPlayer from "react-spotify-web-playback"
import { useAuth } from "../../contexts/auth/AuthContext.tsx";

type Props = {
  trackUri: string
}

const Player: FC<Props> = ({ trackUri }) => {
  const [play, setPlay] = useState(false)

  const { accessToken } = useAuth()

  useEffect(() => setPlay(true), [trackUri])

  if (!accessToken) return null
  return (
    <SpotifyPlayer
      token={accessToken}
      persistDeviceSelection
      syncExternalDevice
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  )
}

export default Player
