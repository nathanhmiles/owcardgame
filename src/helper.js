import data from 'data';

const helper = {
  // Helper function - returns random number between min (inc) and max (exc)
  getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  // Creates a card with its own health and id unique to the playerCard, returns player-specific ID
  createPlayerCard(playerNum, heroId) {
    const heroType = (heroId === 'dva' || heroId === 'bob') ? 'specialHeroes' : 'heroes';
    
    // Get card values
    const {
      id,
      name,
      health,
      power,
      synergy,
      ability1,
      ability2,
      effect,
    } = data[heroType][heroId];
    
    const maxHealth = health;
    const playerHeroId = `${playerNum}${heroId}`;
    const shield = 0;
    const enemyEffects = [];
    const allyEffects = [];
    const isPlayed = false;
    const isDiscarded = false;

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
      ability1,
      ability2,
      effect,
      enemyEffects,
      allyEffects,
      isPlayed,
      isDiscarded,
    };

    
    return newCard;
  }
};

export default helper;
