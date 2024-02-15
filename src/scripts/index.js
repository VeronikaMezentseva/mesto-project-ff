import '../pages/index.css'; 
import { initialCards } from './cards';
import { createCard, deleteCard, makeLiked } from './card';
import { openPopup, closePopup } from './modal'

const cardContainer = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const profilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const formProfile = document.forms['edit-profile'];
const formCard = document.forms['new-place'];

const profileNameInput = formProfile.elements.name;
const profileDescriptionInput = formProfile.elements.description;
const cardNameInput = formCard.elements['place-name'];
const cardLinkInput = formCard.elements.link;

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// кнопки закрытия

const closeBtnProfile = profilePopup.querySelector('.popup__close');
const closeBtnNewCard = newCardPopup.querySelector('.popup__close');
const closeBtnImage = imagePopup.querySelector('.popup__close');

closeBtnProfile.addEventListener('click', () => closePopup(profilePopup));
closeBtnNewCard.addEventListener('click', () => closePopup(newCardPopup));
closeBtnImage.addEventListener('click', () => closePopup(imagePopup));

// плавность закрытия и открытия модалок

const popups = document.querySelectorAll('.popup');
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
  closePopup(profilePopup);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  
  const obj = {};
  obj.name = cardNameInput.value;
  obj.link = cardLinkInput.value;
  
  const card = createCard(obj, deleteCard, handleOpenCard, makeLiked);
  cardContainer.prepend(card);

  closePopup(newCardPopup);
}

// Вывести карточки на страницу

initialCards.forEach(item => {
  const card = createCard(item, deleteCard, handleOpenCard, makeLiked);
  cardContainer.append(card);
});

profileEditButton.addEventListener('click', () => {
  setFields();
  openPopup(profilePopup);
});
profileAddButton.addEventListener('click', () => {
  formCard.reset();
  openPopup(newCardPopup);
});

formProfile.addEventListener('submit', handleProfileFormSubmit);

formCard.addEventListener('submit', handleNewCardFormSubmit);

