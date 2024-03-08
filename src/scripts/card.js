import { putCardLike, deleteCardLikeRequest, config } from "./api";

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

  const likeArray = card.likes;
  likeArray.forEach((userLike) => {
    if (hasUserLike(userLike['_id'], userId)) {
      makeLiked(likeButton);
    }
  });
  
  cardImage.addEventListener('click', () => handleOpenImage(cardImage.src, cardTitle.textContent));
  likeButton.addEventListener('click', () => {
    funcLikeHandler(likeButton, card['_id'], likeCounter); 
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

function makeLiked(likeElement) {
  likeElement.classList.toggle('card__like-button_is-active');
}

function hasUserLike(id, userId) {  
  if (id == userId) {
    return true;
  } else {
    return false;
  }
}

function sendLikeRequest(hasLike, config, cardId) {
  return hasLike? deleteCardLikeRequest(config, cardId) : putCardLike(config, cardId);
}

function updateLikeAmount(likesCounter, likeAmount) {
  likesCounter.textContent = likeAmount;
}

export function makeLikedHandler(likeElement, cardId, likesCounter) {
  const hasLike = likeElement.classList.contains('card__like-button_is-active');
  sendLikeRequest(hasLike, config, cardId)
    .then((cardData) => {
      const likeAmount = cardData.likes.length;
      updateLikeAmount(likesCounter, likeAmount);
      makeLiked(likeElement);
    })
    .catch((err) => {
      console.log(err);
    });
}