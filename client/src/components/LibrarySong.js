import React from 'react';

const LibrarySong = ({song,songs,setSongs,setCurrentSong,audioRef, isPlaying, currentSong}) => {

    const songSelectHandler = async () => {
        const selectedSong = song;
        await setCurrentSong(selectedSong[0])
        const newSongs = songs.map((song)=>{
            // problem here with id
            if(song.id === currentSong.id){
                return{
                    ...song,active:true,
                }
            } else {
                return{
                    ...song,active:false,
                }
            }
        });
        await setSongs(newSongs);
        if(isPlaying) audioRef.current.play();

    }

    return(
        <div className={`library-song ${song.active ? 'selected' : ""}`}>
            <img src={song.cover} alt={song.name}></img>
            <div onClick={songSelectHandler} className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div> 
        
        </div>
    )
}

export default LibrarySong;