import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Track, TrackRequestData } from "../../types";
import { axiosInstance } from "../../axios";
import Player from "../../components/Player/Player.tsx";

const ArtistPage: FC = () => {
  const [tracks, setTracks] = useState<Track[]>([])
  const [selectedTrack, setSelectedTrack] = useState<Track>({} as Track)

  const params = useParams()

  const getTracks = useCallback((id: string) => {
    axiosInstance
      .get<TrackRequestData>(`artists/${id}/top-tracks`, {
        params: {
          market: 'ES'
        }
      })
      .then(({data}) => {
        setTracks(data.tracks)
      })
  }, [])

  const handleSelectTrack = useCallback((track: Track) => {
    setSelectedTrack(track)
  }, [])

  useEffect(() => {
    if (!params.id) return
    getTracks(params.id)
  }, [getTracks, params.id]);

  return (
    <div>
      {tracks.map(track => (
        <div key={track.id}>
          <p>{track.name}</p>
          <img width={100} height={100} src={track.album.images[0].url} alt=""/>
          <button onClick={() => handleSelectTrack(track)}>That's nice!</button>
        </div>
      ))}

      <Player trackUri={selectedTrack.uri} />
    </div>
  );
};

export default ArtistPage;
