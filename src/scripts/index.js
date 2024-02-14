import '../pages/index.css'; // добавьте импорт главного файла стилей 
import { initialCards } from './cards';
import { createCard, deleteCard, makeLiked } from './card';
import { handleOpenPopup, handleClosePopup, openImage } from './modal'

const cardContainer = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const formProfile = document.forms['edit-profile'];

const formCard = document.forms['new-place'];
const cardNameInput = formCard.elements['place-name'];
const cardLinkInput = formCard.elements.link;

const popups = document.querySelectorAll('.popup');
popups.forEach(item => item.classList.add('popup_is-animated'));

// @todo: Вывести карточки на страницу

initialCards.forEach(item => {
  const card = createCard(item, deleteCard, openImage, makeLiked);
  cardContainer.append(card);
});

profileEditButton.addEventListener('click', () => handleOpenPopup(profilePopup));
profileAddButton.addEventListener('click', () => handleOpenPopup(newCardPopup));

function handleFormSubmit(evt) {
  evt.preventDefault();

  const profileNameInput = formProfile.elements.name;
  const profileDescriptionInput = formProfile.elements.description;

  const name = profileNameInput.value;
  const title = profileDescriptionInput.value;

  document.querySelector('.profile__title').textContent = name;
  document.querySelector('.profile__description').textContent = title;
  handleClosePopup();
}

formProfile.addEventListener('submit', handleFormSubmit);

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  
  const obj = {};
  obj.name = cardNameInput.value;
  obj.link = cardLinkInput.value;
  
  const card = createCard(obj, deleteCard, openImage, makeLiked);
  cardContainer.prepend(card);

  handleClosePopup();
}

formCard.addEventListener('submit', handleNewCardSubmit);

