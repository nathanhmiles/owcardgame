import data from 'data';

const helper = {
  // Helper function - returns random number between min (inc) and max (exc)
  getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  // Creates a card with its own health and id unique to the playerCard, returns player-specific ID
  createPlayerCard(playerNum, heroId) {  
    
    // Assign values not held in data
    const playerHeroId = `${playerNum}${heroId}`;
    const shield = 0;
    const enemyEffects = [];
    const allyEffects = [];
    let isPlayed = false;
    let isDiscarded = false;
    let ability1Used = false;
    let ability2Used = false;
    let heroData;
    
    // Get card values from data
    // Summoned heroes contain special path
    if (heroId === 'dva') {
      heroData = data.heroes.dvameka[heroId];
      isPlayed = true;
    } else if (heroId === 'bob') {
      heroData = data.heroes.ashe[heroId];
    } else {
      heroData = data.heroes[heroId];
    }

    const {
      id,
      name,
      health,
      power,
      synergy,
      effect,
    } = heroData;
    const maxHealth = health;
    

    // Combine values into one new hero object and assign to relevant player
    const newCard = {
      playerHeroId,
      id,
      name,
      health,
      maxHealth,
      power,
      synergy,
      shield,
      effect,
      enemyEffects,
      allyEffects,
      ability1Used,
      ability2Used,
      isPlayed,
      isDiscarded,
    };
    
    return newCard;
  }
};

export default helper;
