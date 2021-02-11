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
      heroData = data.heroes.dvameka['dva'];
      isPlayed = true;
    // Slice used below to allow for echo's ultimate copying ashe
    } else if (heroId.slice(0, 3) === 'bob') {
      heroData = data.heroes.ashe['bob'];
    } else {
      heroData = data.heroes[heroId];
    }

    // Get info from heroData
    const {
      id,
      name,
      health,
      power,
      synergy,
    } = heroData;
    
    // Independently store the card's current health (health) and max health (maxHealth)
    const maxHealth = health;

    // Add hero effects to card, and insert playerHeroId for future use
    let effects;
    if ('effects' in heroData) {
      // Deep copy of effects object is needed in order to not alter the original object later on
      effects = JSON.parse(JSON.stringify(heroData.effects));
      for (let key in effects) {
        effects[key]['playerHeroId'] = playerHeroId;
      }
    }
    

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
      effects,
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
