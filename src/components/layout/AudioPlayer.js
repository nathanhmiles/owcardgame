import React, { useEffect, useState } from "react";

export default function AudioPlayer(props) {
  const { playAudio, setPlayAudio } = props;

  useEffect(() => {
    const audio = document.getElementById("backgroundaudio");
    audio.volume = 0.3;
    playAudio ? audio.play() : audio.pause();
  }, [playAudio]);

  return (
    <div className="title-corners">
      {playAudio ? (
        <i
          onClick={() => {
            setPlayAudio(!playAudio);
          }}
          class="fas fa-volume-up"
          id="audioicon"
          alt="audio icon"
        />
      ) : (
        <i
          onClick={() => {
            setPlayAudio(!playAudio);
          }}
          class="fas fa-volume-mute"
          id="audioicon"
          alt="audio icon"
        />
      )}
      <audio
        src={require(`assets/audio/overwatch-theme.mp3`).default}
        type="audio/mpeg"
        loop={true}
        id="backgroundaudio"
      />
    </div>
  );
}
