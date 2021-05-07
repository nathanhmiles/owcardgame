import React, { useEffect, useState } from "react";

export default function AudioPlayer(props) {
  const { playAudio, setPlayAudio } = props;

  useEffect(() => {
    const audio = document.getElementById("backgroundaudio");
    audio.volume = 0.3;
    playAudio ? audio.play() : audio.pause();
  }, [playAudio]);

  return (
    <div id="audioplayer">
      <img
        id="audioicon"
        alt="audio icon"
        src={
          playAudio
            ? require(`assets/volume-on.png`).default
            : require("assets/volume-off.png").default
        }
        onClick={() => {
          setPlayAudio(!playAudio);
        }}
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
