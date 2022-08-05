const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'beth',
  'jerry',
  'jessica',
  'meeseeks',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'scroopy',
  'summer'
]

const createElement = (tag, ...className) => {
  const element = document.createElement(tag);
  element.classList.add(...className);
  return element;
}

let firstCard = '';
let secondCard = '';
let loop;

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.front');

  const endGame = [...disabledCards].every((cardDisabled) => cardDisabled.classList.contains('disabled-card'));

  if (endGame) {
    clearInterval(loop);
    alert(`Parabéns, ${localStorage.getItem('player')}. Você terminou em: ${timer.innerText} segundos!`);
  }
}

const checkCard = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    setTimeout(() => {
      firstCard.firstChild.classList.add('disabled-card');
      secondCard.firstChild.classList.add('disabled-card');
  
      firstCard = '';
      secondCard = '';

      checkEndGame();
    }, 300);
    
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';
    }, 600);
  }
}

const revealCard = ({ currentTarget }) => {
  if (currentTarget.classList.contains('reveal-card')) {
    return
  }

  if (firstCard === '') {
    currentTarget.classList.add('reveal-card');
    firstCard = currentTarget;
  } else if (secondCard === '') {
    currentTarget.classList.add('reveal-card');
    secondCard = currentTarget;

    checkCard();
  }
}

const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face', 'front');
  const back = createElement('div', 'face', 'back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character);

  return card
}

const loadGame = () => {
  const duplicatedCharacters = [...characters, ...characters];

  const shuffledCharacters = duplicatedCharacters.sort(() => Math.random() - 0.5);

  shuffledCharacters.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {
  loop = setInterval(() => {
    const currentTime = +timer.innerText;
    timer.innerText = currentTime + 1;
  }, 1000);
}

window.onload = () => {
  spanPlayer.innerText = localStorage.getItem('player');

  loadGame();
  startTimer();
}
