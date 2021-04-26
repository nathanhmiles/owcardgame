import React from "react";
import $ from "jquery";

function Tutorial() {
  const buttonStyle = {
    position: "absolute",
    right: "10px",
    top: "10px",
    background: "none",
    border: "none",
  };

  return (
    <div id="tutorial-container">
      <div id="tutorial">
        <div className="tutorial-header">
          <button
            style={buttonStyle}
            onClick={() => $("#tutorial-container").hide()}
          >
            X
          </button>
          <h3>
            <strong>How To Play</strong>
          </h3>
          <div id="tutorial-tabs">
            <h4>
              <strong>Card Info</strong>
            </h4>
            <h4>
              <strong>Turn Actions</strong>
            </h4>
            <h4>
              <strong>Other</strong>
            </h4>
          </div>
        </div>

        <div id="card-info-content">
          <div className="tutorial-image-container">
            <img src={require(`assets/tutorialcard.jpg`).default} />
          </div>
        </div>

        <div id="turn-actions-content">
          <div className="tutorial-section">
            <p>
              <strong>
                <em>Play a Hero Card</em>
              </strong>
              <br />
              Choose and play 1 Hero Card from your hand into the Front, Middle,
              or Back Row. Any effects that occur when a Hero is played trigger
              NOW.
            </p>
            <p>
              The card's Power and Synergy scores will be added to your scores
              at this point. Each player has their own Power score, when both
              players have played all of their cards, the round is over and the
              player with the highest Power score wins. Each row has it's own
              Synergy score. Synergy points are consumed when using a card's
              Ultimate ability (see the previous page for information on Card
              Power, Synergy and abilities).
            </p>
          </div>
          <div className="tutorial-section">
            <p>
              <strong>
                <em>Use Primary Ability</em>
              </strong>{" "}
              (if you wish)
              <br />
              Use the played Hero's primary ability right after you play them
              onto the battlefield. This ability may only be used once per play
              of a Hero card. If you decide to NOT use their Primary Ability you
              may not use it at a later time unless they have been returned to
              your hand and played again.
            </p>
          </div>
          <div className="tutorial-section">
            <p>
              <strong>
                <em>Activate an Ultimate Ability</em>
              </strong>
              <br />
              Choose a Hero that has already been played and activate their
              second (Ultimate) ability. The Synergy cost shown to the right of
              the ability name will be deducted from the row's Synergy score.
              There must be enough synergy in that row to pay for the cost of
              the Ultimate Ability. You may only use each Ultimate Ability once
              per round unless the hero has been returned to your hand and
              played a second time.
            </p>
          </div>

          <div className="tutorial-section">
            <p>
              <strong>
                <em>Pass</em>
              </strong>
              <br />
              You must have six cards on the battlefield in order to choose the
              Pass Action. After passing you may take no more actions this
              round.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
