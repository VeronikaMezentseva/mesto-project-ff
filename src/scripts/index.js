import '../pages/index.css'; 
import { initialCards } from './cards';
import { createCard, deleteCard, makeLiked } from './card';
import { openPopup, closePopup } from './modal';
import { enableValidation, clearValidation } from './validation';
import { getUserData, getUsersCards, updateUserProfile, postNewCard, 
        sendDeleteCardRequest, putCardLike, deleteCardLikeRequest, updateUserAvatar } from './api';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
  headers: {
    authorization: '24ef75a7-8795-46f3-b446-da8d3eb6fdc6',
    'Content-Type': 'application/json'
  }
}

const cardContainer = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileImage = document.querySelector('.profile__image');

const profilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const avatarPopup = document.querySelector('.popup_type_avatar');

const formProfile = document.forms['edit-profile'];
const formCard = document.forms['new-place'];
const formAvatar = document.forms['edit-avatar'];
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

// плавность закрытия и открытия модалок

popups.forEach(item => item.classList.add('popup_is-animated'));

// функции отправки и заполнения полей

function setFields() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function handleOpenCard(link, text) {
  popupImage.src = link;
  popupImage.alt = text;
  popupCaption.textContent = text;

  openPopup(imagePopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const name = profileNameInput.value;
  const title = profileDescriptionInput.value;

  profileName.textContent = name;
  profileDescription.textContent = title;

  updateUserProfile(config, {name: profileName.textContent, about: profileDescription.textContent});
  closePopup(profilePopup);
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const avatarLink = avatarLinkInput.value;
  updateUserAvatar(config, avatarLink)
    .then((userData) => {
      profileImage.style.backgroundImage = `url('${userData.avatar}')`;
    });
  closePopup(avatarPopup);
}

function makeLikedHandler(likeElement, cardId, likesCounter, likeButtonElement) { // userId?? передать карточку в хендлер
  const hasLike = likeButtonElement.classList.contains('card__like-button_is-active');
  makeLiked(likeElement);
  sendLikeRequest(hasLike, config, cardId)
    .then((data) => {
      let likeAmount;
      likeAmount = data.likes.length;
      updateLikeAmount(likesCounter, likeAmount);
      console.log(data);
      return data;
    });
}

function sendLikeRequest(isLiked, config, cardId) {
  return isLiked? deleteCardLikeRequest(config, cardId) : putCardLike(config, cardId);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  
  const obj = {};
  obj.name = cardNameInput.value;
  obj.link = cardLinkInput.value;

  postNewCard(config, obj.name, obj.link)
    .then((objNewCard) => {
      console.log(objNewCard);
      let newCard = createCard(objNewCard, deleteCardHandler, handleOpenCard, makeLikedHandler, '0', userId);
      cardContainer.prepend(newCard);
    });

  closePopup(newCardPopup);
}

// обработка открытия модалок

profileEditButton.addEventListener('click', () => {
  setFields();
  openPopup(profilePopup);
  clearValidation(profilePopup.querySelector(formConfig.formSelector), formConfig);
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

// обработка сабмитов

formProfile.addEventListener('submit', handleProfileFormSubmit);
formCard.addEventListener('submit', handleNewCardFormSubmit);
formAvatar.addEventListener('submit', handleAvatarFormSubmit);

// --------- валидация ------------

enableValidation(formConfig);

// ---------- апи -----------------

// заполнение профиля юзера, вывод карточек на страницу

let userId;

const requests = [getUserData(config), getUsersCards(config)];
Promise.all(requests).then((results) => {
  const userData = results[0];
  const cardsData = results[1];

  profileImage.style.backgroundImage = `url('${userData.avatar}')`;
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  userId = userData['_id'];

  cardsData.forEach((cardData) => {
    const card = createCard(cardData, deleteCardHandler, handleOpenCard, makeLikedHandler, cardData.likes.length, userId);
    cardContainer.append(card);
    const likeArray = cardData.likes;
    likeArray.forEach((userLike) => {
      if (hasUserLike(userLike['_id'])) {
        makeLiked(card.querySelector('.card__like-button'));
      }
    })
  });
});

function hasUserLike(id) {  

  if (id == userId) {
    return true;
  } else {
    return false;
  }
   
 }

function deleteCardHandler(card, cardId) {
  deleteCard(card);
  sendDeleteCardRequest(config, cardId);
}

function updateLikeAmount(likesCounter, likeAmount) {
  likesCounter.textContent = likeAmount;
}
