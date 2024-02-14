export function createCard(card, funcDelete, funcOpenImage, funcLike) { 
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  cardImage.addEventListener('click', () => funcOpenImage(cardImage.src, cardTitle.textContent));
  likeButton.addEventListener('click', () => funcLike(likeButton));
  
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => funcDelete(cardElement));
  return cardElement;
}

export function deleteCard(item) {
  item.remove();
}

export function makeLiked(likeElement) {
  likeElement.classList.toggle('card__like-button_is-active');
}