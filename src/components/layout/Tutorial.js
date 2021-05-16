import React from "react";
import $ from "jquery";
import "./Tutorial.css";
import PowerCounter from "./PowerCounter";
import { size } from "lodash";
import turnContext from "context/turnContext";

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

  const tutorialCounterStyle = {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    margin: "4px",
    fontFamily: "Big-Noodle-Titling",
  };

  const powerStyle = {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20px",
    height: "20px",
    backgroundColor: "#fa9c1e",
    color: "white",
    borderRadius: "50%",

    fontSize: "1.5em",
  };

  const synergyStyle = {
    width: "20px",
    height: "20px",
    color: "white",
    fontSize: "1em",
    border: "3px solid steelblue",
    backgroundColor: "#3f547a",
  };

  const matchStyle = {
    width: "20px",
    height: "20px",
    backgroundColor: "#fa9c1e",
    color: "black",
    fontSize: "1.5em",
    margin: "2px",
  };

  const healthStyle = {
    width: "20px",
    height: "20px",
    fontSize: "0.8em",
    borderRadius: "100%",
  };

  const effectStyle = {};

  return (
    <div onClick={openCloseTutorial} id="tutorial-container" className="open">
      <div id="tutorial">
        <div className="tutorial-header">
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
          <span id="tutorial-title">How To Play</span>
          <div id="tutorial-tabs">
            <div
              className="tutorial-tab"
              onClick={() => switchTutorialTab("overview-content")}
            >
              <i class="fas fa-eye"></i>
              Overview
            </div>
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
          </div>
        </div>

        {/* Overview */}
        <div id="overview-content" className="tutorial-content">
          <div id="overview-container" className="tutorial-content-container">
            <div className="overview-section">
              <img
                src={require("assets/overview.jpg").default}
                alt="Game overview"
                className="tutorial-image"
              />
              <div className="tutorial-section">
                <p>
                  <div className="tutorial-heading">How to win</div>
                  <span>
                    When a card is played, that card's Power score is added to
                    that player's Power score{" "}
                    <span style={{ ...powerStyle, ...tutorialCounterStyle }}>
                      8
                    </span>
                    (please see the Card Info section for a detailed breakdown
                    of the cards' layout). The player with the highest Power
                    score at the end of the round wins the round, with two
                    rounds needed to win the match{" "}
                    <span
                      style={{
                        ...matchStyle,
                        ...tutorialCounterStyle,
                        backgroundColor: "aqua",
                      }}
                    >
                      2
                    </span>
                    <span
                      style={{
                        ...matchStyle,
                        ...tutorialCounterStyle,
                        backgroundColor: "red",
                      }}
                    >
                      1
                    </span>
                    . The round is over when both players have played six cards
                    and pressed the Pass button.
                    <p>
                      If both players have the same Power score, the player with
                      the higher total Synergy wins. If both players' Synergy
                      scores are also tied, the round is a draw and neither
                      player receives a win.
                    </p>
                  </span>
                </p>
              </div>
              <div className="tutorial-section">
                <p>
                  <div className="tutorial-heading">Starting a game</div>
                  <span>
                    Both players should begin by drawing 8 cards each. Then the
                    players each take turns to play one card per turn. At the
                    end of your turn, click the End Turn button to allow the
                    other player to take their turn. You can tell which player's
                    turn it is by which cards are facing up. To find out exactly
                    what you can do on your turn, please see the Turn Actions
                    section above.
                  </span>
                </p>
              </div>
              <div className="tutorial-section">
                <p>
                  <div className="tutorial-heading">
                    Scores, abilities and counters
                  </div>
                  <span>
                    <ul className="tutorial-list">
                      <li>
                        <span
                          style={{
                            ...powerStyle,
                            ...tutorialCounterStyle,
                            width: "40px",
                            height: "40px",
                            fontSize: "2rem",
                          }}
                        >
                          8
                        </span>
                        <span className="counter-desc">
                          <strong>Power: </strong>Each player has one Power
                          score which increases as cards are played. A card's
                          Power is subtracted from the player's Power score if
                          it is defeated. The player with the higher power score
                          at the end of the round wins.
                        </span>
                      </li>
                      <li>
                        <span
                          style={{
                            ...synergyStyle,
                            ...tutorialCounterStyle,
                            width: "40px",
                            height: "40px",
                            fontSize: "2rem",
                            border: "5px solid steelblue",
                          }}
                        >
                          3
                        </span>
                        <span className="counter-desc">
                          <strong>Synergy: </strong>Each row has its own Synergy
                          score. The row's synergy increases as heroes are
                          played into that row. Synergy is spent when heroes use
                          their Ultimate Ability.
                        </span>
                      </li>
                      <li>
                        <span
                          style={{
                            ...tutorialCounterStyle,
                            ...healthStyle,
                            width: "40px",
                            height: "44px",
                            fontSize: "2rem",
                          }}
                          className={`healthcounter counter tutorial-counter`}
                        >
                          4
                        </span>
                        <span className="counter-desc">
                          <strong>Health: </strong>How much damage the hero can
                          take before it is defeated. A defeated hero's Power is
                          subtracted from the player's Power score.
                        </span>
                      </li>
                      <li>
                        <span
                          style={{
                            ...tutorialCounterStyle,
                            ...healthStyle,
                            width: "40px",
                            height: "44px",
                            fontSize: "2rem",
                          }}
                          className={`shieldcounter counter`}
                        >
                          2
                        </span>
                        <span className="counter-desc">
                          <strong>Shield: </strong>A Shield can be placed either
                          on a specific hero or on an entire row. If a hero has
                          Shield or is in a row that has Shield, the Shield will
                          take any damage before the hero's Health takes damage.
                        </span>
                      </li>
                      <li>
                        <span
                          style={{ ...effectStyle, ...tutorialCounterStyle }}
                          className="counter"
                        >
                          <img
                            src={
                              require(`assets/heroes/cards/mercy-icon.webp`)
                                .default
                            }
                            className="counter herocounter"
                            alt="Hero Counter"
                          />
                        </span>
                        <span className="counter-desc">
                          <strong>Effects: </strong>There are a number of
                          different positive and negative Effects that heroes
                          can apply to ally and enemy heroes, as well as ally
                          and enemy rows. If a hero applies an Effect to a hero
                          or row, the hero's counter will show up next to the
                          row or on the hero card. These counters can be clicked
                          to show the card which applied the Effect, so that you
                          can easily read the Ability description to understand
                          what the Effect does.
                        </span>
                      </li>
                    </ul>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card Info */}
        <div id="card-info-content" className="tutorial-content" hidden>
          <div id="card-info-container" className="tutorial-content-container">
            <div id="card-info-left" className="card-info">
              <div className="card-info-section tutorial-section">
                <span className="tutorial-heading">Class</span>
                <div id="card-info-class">
                  <span>
                    <img
                      src={require("assets/offence-classicon.webp").default}
                      alt="Offence class icon"
                      className="classicon"
                    />
                    <span>
                      <strong>Offence</strong> - High damage
                    </span>
                  </span>
                  <span>
                    <img
                      src={require("assets/defence-classicon.webp").default}
                      alt="Defence class icon"
                      className="classicon"
                    />
                    <span>
                      <strong>Defense</strong> - Area control and status effects
                    </span>
                  </span>
                  <span>
                    <img
                      src={require("assets/tank-classicon.webp").default}
                      alt="Tank class icon"
                      className="classicon"
                    />
                    <span>
                      <strong>Tank</strong> - Shields and good survivability
                    </span>
                  </span>
                  <span>
                    <img
                      src={require("assets/support-classicon.webp").default}
                      alt="Support class icon"
                      className="classicon"
                    />
                    <span>
                      <span>
                        <strong>Support</strong> - Healing and damage boost
                      </span>
                    </span>
                  </span>
                </div>
              </div>
              <div
                id="hero-name-section"
                className="card-info-section tutorial-section"
              >
                <span className="tutorial-heading">Hero Name</span>
              </div>
              <div className="card-info-section tutorial-section">
                <span className="tutorial-heading">Power/Synergy Scores</span>
                <div>
                  When you play a Hero card, the Hero's power and synergy are
                  added to your Power and Synergy scores. The amount of Power
                  and Synergy added depends on which row the Hero is put in.
                  These circles represent the three rows (top circle - front
                  row, middle circle - middle row, bottom circle - back row)
                  with Power on the left and Synergy on the right.
                </div>
              </div>
            </div>
            <div id="card-info-center" className="card-info">
              <img
                src={require(`assets/dva-example.webp`).default}
                alt="Card tutorial"
              />
            </div>
            <div id="card-info-right" className="card-info">
              <div className="card-info-section tutorial-section">
                <span className="tutorial-heading">Health</span>
                <div id="card-info-class">
                  How much damage this Hero can take before being defeated. A
                  defeated hero's card will turn grey when their health drops to
                  0.
                </div>
              </div>
              <div className="card-info-section tutorial-section">
                <span className="tutorial-heading">Shield</span>
                <div id="card-info-class">
                  Some heroes have the ability to shield themselves, other
                  heroes, or even an entire row. Shields will take damage in
                  place of a hero's health.
                </div>
              </div>
              <div>
                {/* Spacer div to separate health/shields from abilities descriptions */}
              </div>
              <div className="card-info-section tutorial-section">
                <span className="tutorial-heading">Deploy Ability</span>
                <div>
                  You may choose to use this ability only when you play this
                  card from your hand.
                </div>
              </div>
              <div className="card-info-section tutorial-section">
                <span className="tutorial-heading">Ultimate Ability</span>
                <div>
                  You may use this ability at any time after the card has been
                  played and is still alive, but you must have sufficient
                  synergy in the hero's row.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Turn Actions */}
        <div id="turn-actions-content" className="tutorial-content" hidden>
          <div className="tutorial-content-container">
            <div className="tutorial-intro">
              <p>During your turn you can carry out the following actions:</p>
            </div>
            <div className="tutorial-section">
              <p>
                <div className="tutorial-heading">Play a Hero Card</div>
                <span>
                  <p>
                    Drag 1 Hero Card from your hand into the Front, Middle, or
                    Back Row. Any effects that occur when a Hero is played
                    trigger NOW. The card's Power and Synergy scores will be
                    added to your scores at this point.
                  </p>
                </span>
              </p>
            </div>
            <div className="tutorial-section">
              <p>
                <span className="tutorial-heading">Use Deploy Ability</span> (if
                you wish)
                <br />
                <span>
                  <p>
                    In order to use a Hero's ability, click on the Hero Card.
                    This will show a larger version of the card in the middle of
                    your screen, which is called the Card Focus. Click on the
                    text of the ability that you want to use. If the ability
                    requires you to target an ally or enemy card, click on the
                    card to choose it as your target.
                  </p>
                  <p>
                    A Hero's Deploy Ability can only be used right after you
                    play them onto the battlefield. If you decide to NOT use
                    their Deploy Ability you may not use it at a later time
                    unless they have been returned to your hand and played
                    again.
                  </p>
                  <p>
                    <strong>Please Note: </strong>The ability descriptions have
                    not been changed from the original tabletop game, and may
                    refer to placing tokens or rotating cards when abilities
                    happen which are irrelevant to the digital version.
                  </p>
                </span>
              </p>
            </div>
            <div className="tutorial-section">
              <p>
                <div className="tutorial-heading">
                  Activate an Ultimate Ability
                </div>
                <span>
                  <p>
                    Choose a Hero that has already been played and activate
                    their Ultimate Ability. There must be enough Synergy{" "}
                    <span style={{ ...synergyStyle, ...tutorialCounterStyle }}>
                      3
                    </span>{" "}
                    in that row to pay for the cost of the Ultimate Ability. You
                    may only use each Ultimate Ability once per round unless the
                    hero has been returned to your hand and played a second
                    time.
                  </p>
                  <p>
                    Once the Ultimate Ability has been used, the Synergy cost
                    will be deducted from the row's Synergy score.
                  </p>
                </span>
              </p>
            </div>

            <div className="tutorial-section">
              <p>
                <div className="tutorial-heading">Pass</div>
                <span>
                  <p>
                    You must have six cards on the battlefield in order to
                    choose the Pass Action. After passing you may take no more
                    actions this round.
                  </p>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
