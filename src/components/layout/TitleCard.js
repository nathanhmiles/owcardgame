import owlogo from "assets/logo3.png";
import AudioPlayer from "./AudioPlayer";

export default function TitleCard(props) {
  return (
    <div id="title-container">
      <div className="title-corners">
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={require("assets/how-to-play.pdf").default}
          id="howtoplay"
        >
          <i className="fas fa-question"></i>
        </a>
      </div>
      <span className="title">Overwatch</span>
      <span className="credit">
        Game & Card Design by
        <br />
        u/barberian912
      </span>
      <img src={owlogo} id="centerlogo" alt="owlogo" />
      <span className="credit">
        Digitisation by
        <br />
        Nathan H Miles
      </span>
      <span className="title">Card Game</span>
      <AudioPlayer
        playAudio={props.playAudio}
        setPlayAudio={props.setPlayAudio}
      />
    </div>
  );
}
