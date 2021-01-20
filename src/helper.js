const helper = {
  // Helper function - returns random number between min (inc) and max (exc)
  getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
};

export default helper;
