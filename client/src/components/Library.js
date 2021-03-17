import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus, currentSong}) => {

    return(
        <div className={`library ${libraryStatus ? 'active-library' : ""}`}>
            <h2>Library</h2>
            <div className="library-song">
                {songs.map(song => 
                <LibrarySong className="library-song"
                song={song} 
                currentSong={currentSong}
                songs={songs} 
                setSongs={setSongs}
                setCurrentSong={setCurrentSong} 
                id={song.id} 
                key={song.id}
                audioRef={audioRef}
                isPlaying={isPlaying}
                />)}
              
            </div>
        </div>
    )
}

export default Library;