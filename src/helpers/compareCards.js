export function compareCards(a, b) {
    const suits = { S: 4, H: 3, D: 2, C: 1 };
    const cardValues = { ACE: 14, KING: 13, QUEEN: 12, JACK: 11 };
  
    const suitA = suits[a.code[1]];
    const suitB = suits[b.code[1]];
  
    if (suitA !== suitB) {
      return suitB - suitA;
    } else {
      const valueA = cardValues[a.value] || parseInt(a.value);
      const valueB = cardValues[b.value] || parseInt(b.value);
      return valueA - valueB;
    }
  }