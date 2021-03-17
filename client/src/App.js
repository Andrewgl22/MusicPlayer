import React, {useState, useRef} from 'react';
import './styles/app.scss';
import Song from './components/Song';
import Player from './components/Player';
import Library from './components/Library'
import Nav from './components/Nav'
import chillHop from './Data';

function App() {

  const audioRef = useRef(null);

  const [songInfo, setSongInfo] = useState({
    currentTime:0,
    duration:0,
    animationPercentage:0

})

const timeUpdateHandler = (e) => {
  const current = e.target.currentTime
  console.log(e.target)
  const duration = e.target.duration
  const roundedCurrent = Math.round(current)
  const roundedDuration = Math.round(duration)
  const animation = Math.round((roundedCurrent / roundedDuration) * 100)
  setSongInfo({...songInfo, currentTime:current,duration, animationPercentage:animation})
};

  const [songs,setSongs] = useState(chillHop)
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [libraryStatus, setLibraryStatus] = useState(false)

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song)=> song.id === currentSong.id);
        await setCurrentSong(songs[(currentIndex + 1) % songs.length])
        if(isPlaying) audioRef.current.play();
        

  }

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong} />
      <Player 
      songInfo={songInfo}
      setSongInfo={setSongInfo}
      audioRef={audioRef}
      isPlaying={isPlaying}
      setPlaying={setIsPlaying}
      currentSong={currentSong}
      setCurrentSong={setCurrentSong}
      songs={songs}
      setSongs={setSongs}
      />

      <Library 
      songs={songs} 
      currentSong={currentSong}
      setCurrentSong={setCurrentSong} 
      audioRef={audioRef} 
      isPlaying={isPlaying}
      libraryStatus={libraryStatus}
      />
      <audio onTimeUpdate={timeUpdateHandler} 
            onLoadedMetadate={timeUpdateHandler}
            ref={audioRef} 
            src={currentSong.audio}>
            onEnd={songEndHandler}  
              </audio> 
    </div>
  );
}

export default App;
