import owlogo from "assets/logo3.png";

export default function TitleCard() {
  return (
    <div id="centerlogocontainer">
      <br />
      <span className="title">Overwatch</span>
      <span className="credit">
        Game & Card Design by
        <br />
        u/bwb912
      </span>
      <img src={owlogo} id="centerlogo" alt="owlogo" />
      <span className="credit">
        Digitisation by
        <br />
        Nathan H Miles
      </span>
      <span className="title">Card Game</span>
      <br />
    </div>
  );
}
