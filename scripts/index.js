// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(card, funcDelete) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', () => funcDelete(cardElement));
  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(item) {
  item.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(item => {
  let card = createCard(item, deleteCard);
  cardContainer.append(card);
});