import React, { useEffect } from 'react';

export default function AudioPlayer(props) {
    const { playAudio, setPlayAudio } = props;

    useEffect(() => {
        const audio = document.getElementById('backgroundaudio') as HTMLAudioElement | null;
        if (!audio) return;
        audio.volume = 0.3;
        playAudio ? audio.play() : audio.pause();
    }, [playAudio]);

    return (
        <div className='title-corners'>
            {playAudio ? (
                <i
                    onClick={() => {
                        setPlayAudio(!playAudio);
                    }}
                    className='fas fa-volume-up'
                    id='audioicon'
                />
            ) : (
                <i
                    onClick={() => {
                        setPlayAudio(!playAudio);
                    }}
                    className='fas fa-volume-mute'
                    id='audioicon'
                />
            )}
            <audio
                src={require(`assets/audio/overwatch-theme.mp3`).default}
                loop={true}
                id='backgroundaudio'
            />
        </div>
    );
}
