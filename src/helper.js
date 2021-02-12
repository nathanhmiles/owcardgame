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
    let shield = 0;
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
    
    // Independently store the card's current health (health) and max health (maxHealth)
    const maxHealth = heroData.health;

    // Combine values into one new hero object and assign to relevant player
    const newCard = {
      playerHeroId,
      ...heroData,
      maxHealth,
      shield,
      enemyEffects,
      allyEffects,
      isPlayed,
      isDiscarded,
      ability1Used,
      ability2Used,
    };

    // Add hero effects to card, and insert playerHeroId for future use
    if ('effects' in heroData) {
      // Deep copy of effects object is needed in order to not alter the original object later on
      let effects = JSON.parse(JSON.stringify(heroData.effects));
      for (let key in effects) {
        effects[key]['playerHeroId'] = playerHeroId;
      }
      newCard['effects'] = effects;
    }
    
    console.log(newCard)
    
    return newCard;
  }
};

export default helper;
