import owlogo from "assets/owlogo-small.webp";
import AudioPlayer from "./AudioPlayer";
import $ from "jquery";

export default function TitleCard(props) {
  return (
    <div id="title-container">
      <div className="title-corners">
        <i
          onClick={() => $("#tutorial-container").toggleClass("open")}
          className="fas fa-question"
        ></i>
      </div>
      <span className="title">Overwatch</span>
      <div className="credit">
        <span>Game & Card Design by</span>
        <span>u/barberian912</span>
      </div>
      <img src={owlogo} id="centerlogo" alt="owlogo" />
      <span className="credit">
        <span>Digitisation by</span>
        <span>Nathan H Miles</span>
      </span>
      <span className="title">Card Game</span>
      <AudioPlayer
        playAudio={props.playAudio}
        setPlayAudio={props.setPlayAudio}
      />
    </div>
  );
}
