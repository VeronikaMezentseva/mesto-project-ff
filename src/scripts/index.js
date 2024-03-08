import '../pages/index.css'; 
import { createCard, deleteCard, makeLiked } from './card';
import { openPopup, closePopup } from './modal';
import { enableValidation, clearValidation } from './validation';
import { config, getUserData, getUsersCards, updateUserProfile, postNewCard, 
        sendDeleteCardRequest, putCardLike, deleteCardLikeRequest, updateUserAvatar } from './api';

const cardContainer = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileImage = document.querySelector('.profile__image');

// модалки

const profilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const avatarPopup = document.querySelector('.popup_type_avatar');
const deleteCardPopup = document.querySelector('.popup_type_delete-card');

// формы и инпуты

const formProfile = document.forms['edit-profile'];
const formCard = document.forms['new-place'];
const formAvatar = document.forms['edit-avatar'];
const formDeleteCard = document.forms['delete-card'];
const profileNameInput = formProfile.elements.name;
const profileDescriptionInput = formProfile.elements.description;
const cardNameInput = formCard.elements['place-name'];
const cardLinkInput = formCard.elements.link;
const avatarLinkInput = formAvatar.elements.link;

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popups = document.querySelectorAll('.popup');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// кнопки закрытия

const closeBtnProfile = profilePopup.querySelector('.popup__close');
const closeBtnNewCard = newCardPopup.querySelector('.popup__close');
const closeBtnImage = imagePopup.querySelector('.popup__close');
const closeBtnAvatar = avatarPopup.querySelector('.popup__close');
const closeBtnDeleteCard = deleteCardPopup.querySelector('.popup__close');

// валидация 

const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

closeBtnProfile.addEventListener('click', () => closePopup(profilePopup));
closeBtnNewCard.addEventListener('click', () => closePopup(newCardPopup));
closeBtnImage.addEventListener('click', () => closePopup(imagePopup));
closeBtnAvatar.addEventListener('click', () => closePopup(avatarPopup));
closeBtnDeleteCard.addEventListener('click', () => closePopup(deleteCardPopup));

// плавность закрытия и открытия модалок

popups.forEach(item => item.classList.add('popup_is-animated'));

// заполнения полей формы профиля

function setFields() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

// хендлеры открытия и отправки форм

function handleOpenCard(link, text) {
  popupImage.src = link;
  popupImage.alt = text;
  popupCaption.textContent = text;

  openPopup(imagePopup);
}

function changeBtnText(evt) {
  evt.target.querySelector('.button').innerText = 'Сохранение...';
}

function defaultBtnText(evt, text) {
  evt.target.querySelector('.button').innerText = text;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  changeBtnText(evt);
  const name = profileNameInput.value;
  const title = profileDescriptionInput.value;

  profileName.textContent = name;
  profileDescription.textContent = title;

  updateUserProfile(config, {name: profileName.textContent, about: profileDescription.textContent})
    .then(() => {
      closePopup(profilePopup);
    })
    .finally(() => {
      setTimeout(() => defaultBtnText(evt, 'Сохранить'), 600, evt);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  changeBtnText(evt);

  const avatarLink = avatarLinkInput.value;
  updateUserAvatar(config, avatarLink)
    .then((userData) => {
      profileImage.style.backgroundImage = `url('${userData.avatar}')`;
      closePopup(avatarPopup);
    })
    .finally(() => {
      setTimeout(() => defaultBtnText(evt, 'Сохранить'), 600, evt);
    })
    .catch((err) => {
      console.log(err);
    });
}

function sendLikeRequest(isLiked, config, cardId) {
  return isLiked? deleteCardLikeRequest(config, cardId) : putCardLike(config, cardId);
}

function updateLikeAmount(likesCounter, likeAmount) {
  likesCounter.textContent = likeAmount;
}

function makeLikedHandler(likeElement, cardId, likesCounter, likeButtonElement) {
  const hasLike = likeButtonElement.classList.contains('card__like-button_is-active');
  makeLiked(likeElement);
  sendLikeRequest(hasLike, config, cardId)
    .then((data) => {
      let likeAmount;
      likeAmount = data.likes.length;
      updateLikeAmount(likesCounter, likeAmount);
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  changeBtnText(evt);
  const obj = {};
  obj.name = cardNameInput.value;
  obj.link = cardLinkInput.value;

  postNewCard(config, obj.name, obj.link)
    .then((objNewCard) => {
      let newCard = createCard(objNewCard, handleOpenCard, makeLikedHandler, '0', userId, deleteCardPopup, handleOpenDeletePopup);
      cardContainer.prepend(newCard);
      closePopup(newCardPopup);
    })
    .finally(() => {
      setTimeout(() => defaultBtnText(evt, 'Сохранить'), 600, evt);
    })
    .catch((err) => {
      console.log(err);
    });
}

profileEditButton.addEventListener('click', () => {
  clearValidation(profilePopup.querySelector(formConfig.formSelector), formConfig);
  setFields();
  openPopup(profilePopup);
});
profileAddButton.addEventListener('click', () => {
  formCard.reset();
  clearValidation(newCardPopup.querySelector(formConfig.formSelector), formConfig);
  openPopup(newCardPopup);
});
profileImage.addEventListener('click', () => {
  formAvatar.reset();
  clearValidation(avatarPopup.querySelector(formConfig.formSelector), formConfig);
  openPopup(avatarPopup);
})

let currentCardId;
let currentCardElement;

function handleOpenDeletePopup(deleteCardPopup, cardId, cardElement) {
  currentCardId = cardId;
  currentCardElement = cardElement;
  openPopup(deleteCardPopup);
}

function deleteCardHandler(evt, currentCardId, currentCardElement) {
  changeBtnText(evt);
  sendDeleteCardRequest(config, currentCardId)
    .then(() => {
      deleteCard(currentCardElement);
      closePopup(deleteCardPopup);
    })
    .finally(() => {
      setTimeout(() => defaultBtnText(evt, 'Да'), 600, evt);
    })
    .catch((err) => {
      console.log(err);
    });
}

formProfile.addEventListener('submit', handleProfileFormSubmit);
formCard.addEventListener('submit', handleNewCardFormSubmit);
formAvatar.addEventListener('submit', handleAvatarFormSubmit);
formDeleteCard.addEventListener('submit', (evt) => deleteCardHandler(evt, currentCardId, currentCardElement));


// включение валидации 

enableValidation(formConfig);

let userId;

const requests = [getUserData(config), getUsersCards(config)];

function hasUserLike(id) {  
  if (id == userId) {
    return true;
  } else {
    return false;
  }
}

Promise.all(requests)
  .then((results) => {
    const userData = results[0];
    const cardsData = results[1];

    profileImage.style.backgroundImage = `url('${userData.avatar}')`;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    userId = userData['_id'];

    cardsData.forEach((cardData) => {
      const card = createCard(cardData, handleOpenCard, makeLikedHandler, cardData.likes.length, userId, deleteCardPopup, handleOpenDeletePopup);
      cardContainer.append(card);
      const likeArray = cardData.likes;
      likeArray.forEach((userLike) => {
        if (hasUserLike(userLike['_id'])) {
          makeLiked(card.querySelector('.card__like-button'));
        }
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

