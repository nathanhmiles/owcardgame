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
