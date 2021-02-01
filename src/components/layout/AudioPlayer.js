import React, { useEffect, useState } from "react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    const audio = document.getElementById("backgroundaudio");
    audio.volume = 0.3;
    isPlaying ? audio.play() : audio.pause();
  },[isPlaying]);
  

  return(
    <div id="audioplayer">
      <img 
        id="audioicon"
        alt="audio icon"
        src={isPlaying ? (require(`assets/volume-on.png`).default) : (require('assets/volume-off.png').default)}
        onClick={() => {setIsPlaying(!isPlaying)}}
      />
      <audio 
        src={require(`assets/audio/overwatch-theme.mp3`).default} 
        type="audio/mpeg"
        loop={true}
        id="backgroundaudio"
      />
    </div>
  );
}