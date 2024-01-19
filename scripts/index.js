// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard() {
  
  for(let i = 0; i < initialCards.length; i++) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    
    cardElement.querySelector('.card__image').src = initialCards[i].link;
    cardElement.querySelector('.card__title').textContent = initialCards[i].name;

    cardsContainer.append(cardElement);
  }
}

// @todo: Функция удаления карточки

function deleteCard(item) {
  item.remove();
}

// @todo: Вывести карточки на страницу

createCard();