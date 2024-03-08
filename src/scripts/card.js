export function createCard(card, handleOpenImage, funcLikeHandler, likesAmount, 
  userId, deleteCardPopup, handleOpenDeletePopup) { 
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  
  likeCounter.textContent = likesAmount;
  
  cardImage.addEventListener('click', () => handleOpenImage(cardImage.src, cardTitle.textContent));
  likeButton.addEventListener('click', () => {
    funcLikeHandler(likeButton, card['_id'], likeCounter, likeButton); 
  });
  if (card.owner['_id'] == userId) {
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
      handleOpenDeletePopup(deleteCardPopup, card['_id'], cardElement);
    });
  } else {
    cardElement.querySelector('.card__delete-button').remove();
  }

  return cardElement;
}

export function deleteCard(item) {
  item.remove();
}

export function makeLiked(likeElement) {
  likeElement.classList.toggle('card__like-button_is-active');
}
