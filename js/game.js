const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer')




const elementCards =[
  'Brook',
  'chopper',
  'Franky',
  'jinbe',
  'luffy',
  'nami',
  'robin',
  'Sanji',
  'Usopp',
  'Zoro',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  
  return element 
}


let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-cards');

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML} segundos`);
    
    loadGame()
  }
}

const checkCards = () => {

  const firstElementCard = firstCard.getAttribute('data-elementCard')
  const secondElementCard = secondCard.getAttribute('data-elementCard')

  if(firstElementCard === secondElementCard){

    firstCard.firstChild.classList.add('disabled-cards');
    secondCard.firstChild.classList.add('disabled-cards');

    firstCard = '';
    secondCard = '';

    checkEndGame()

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }
}

const revealCard = ({target}) => {

  if (target.parentNode.className.includes('reveal-card')){
    return
  }

  if (firstCard === '' && !target.parentNode.className.includes("grid")){
    target.parentNode.classList.add('reveal-card')
    firstCard = target.parentNode;

  } else if (secondCard === '' && !target.parentNode.className.includes("grid")) {
    target.parentNode.classList.add('reveal-card')
    secondCard = target.parentNode

    checkCards()
  }


}

const createCard = (elementCard) => {
  elementCard.innerHTML=''
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  

  front.style.backgroundImage = `url('../img/${elementCard}.png')`


  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);

  card.setAttribute('data-elementCard', elementCard);

  return card

}

const loadGame = () => {

  const duplicateCards = [ ...elementCards, ...elementCards]

  shuffledArray = duplicateCards.sort( () => Math.random () - 0.5)

  shuffledArray.forEach((elementCard)=>{
    const card = createCard(elementCard);
    grid.appendChild(card)

  })
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');

  startTimer();
  loadGame();
}