'use strict';

function classify(input) {
  return input
    .replace(/-./g, (match) => {
      const character =  match.split('').pop();
      return character.toUpperCase();
    })
    .replace(/^./, (match) => match.toUpperCase());
}

module.exports = classify;
