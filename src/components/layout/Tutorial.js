import React from "react";
import $ from "jquery";
import Card from "components/cards/Card";

function Tutorial() {
  const closeTutorialStyle = {
    position: "absolute",
    right: "10px",
    top: "10px",
    fontSize: "2rem",
    cursor: "pointer",
  };

  const tutorialHatStyle = {
    fontSize: "2rem",
    color: "#2e3651",
  };

  function openCloseTutorial(e) {
    if (
      e.target.id === "tutorial-container" ||
      e.target.id === "closetutorial"
    ) {
      $("#tutorial-container").removeClass("open");
    }
  }

  function switchTutorialTab(targetId) {
    $(".tutorial-content").hide();
    $(`#${targetId}`).show();
  }

  return (
    <div onClick={openCloseTutorial} id="tutorial-container" className="open">
      <div id="tutorial">
        <div className="tutorial-header">
          <div id="tutorial-title">
            <i
              onClick={openCloseTutorial}
              style={closeTutorialStyle}
              id="closetutorial"
              class="far fa-times-circle"
            ></i>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={require("assets/how-to-play.pdf").default}
              id="howtoplay"
            >
              <i style={tutorialHatStyle} class="fas fa-graduation-cap"></i>
            </a>
            <strong>How To Play</strong>
          </div>
          <div id="tutorial-tabs">
            <div
              className="tutorial-tab"
              onClick={() => switchTutorialTab("card-info-content")}
            >
              <i class="fas fa-exclamation"></i>
              Card Info
            </div>
            <div
              className="tutorial-tab"
              onClick={() => switchTutorialTab("turn-actions-content")}
            >
              <i class="fas fa-hourglass-half"></i>Turn Actions
            </div>

            <div
              className="tutorial-tab"
              onClick={() => switchTutorialTab("other-content")}
            >
              Other
            </div>
          </div>
        </div>

        <div id="card-info-content" className="tutorial-content">
          <div id="card-info-container">
            <div className="card-info">
              <div className="card-info-section">
                <span className="card-info-heading">Class</span>
                <div id="card-info-class">
                  <span>Offence - High damage</span>
                  <span>Defense - Area control and status effects</span>
                  <span>Tank - High health and survivability</span>
                  <span>Support - Healing and damage increase</span>
                </div>
              </div>
              <div className="card-info-section">
                <span className="card-info-heading">Hero Name</span>
              </div>
              <div className="card-info-section">
                <span className="card-info-heading">Power/Synergy Scores</span>
              </div>
            </div>
            <div className="card-info">
              <img
                src={require(`assets/dva-example.jpg`).default}
                alt="Card tutorial"
              />
            </div>
            <div className="card-info">
              <div className="card-info-section">
                <span className="card-info-heading">Health</span>
                <div id="card-info-class">
                  How much damage this Hero can take before being defeated. A
                  defeated hero's card will turn grey when their health drops to
                  0.
                </div>
              </div>
              <div className="card-info-section">
                <span className="card-info-heading">Shield</span>
                <div id="card-info-class">
                  Some heroes have the ability to shield themselves, other
                  heroes, or even an entire row. Shields will take damage in
                  place of a hero's health.
                </div>
              </div>
              <div className="card-info-section">
                <span className="card-info-heading">Deploy Ability</span>
                <div>
                  You may choose to use this ability only when you play this
                  card from your hand.
                </div>
              </div>
              <div className="card-info-section">
                <span className="card-info-heading">Ultimate Ability</span>
                <div>
                  You may use this ability at any time after the card has been
                  played and is still alive, but you must have sufficient
                  synergy in the hero's row.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="turn-actions-content" className="tutorial-content" hidden>
          <span>
            <p>During your turn you can carry out the following actions:</p>
          </span>
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
