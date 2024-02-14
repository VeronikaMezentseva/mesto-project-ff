function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  const closeButton = popup.querySelector('.popup__close');

  closeButton.addEventListener('click', handleClosePopup);
  document.addEventListener('click', closeWithOverlay);
  document.addEventListener('keydown', closeWithEsc);
}

function closePopup() {
  const openedPopup = document.querySelector('.popup_is-opened');
  openedPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeWithEsc);
}

function closeWithEsc(evt) {
  if (evt.key === 'Escape') {
    handleClosePopup();
  }
}

function closeWithOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    handleClosePopup();
  }
}

function clearFields() {
  const openedPopup = document.querySelector('.popup_is-opened');
  const form = openedPopup.querySelector('.popup__form');
  if (form) {
    form.querySelectorAll('input').forEach(item => {
      item.value = '';
    })
  }
}

export function handleClosePopup() {
  clearFields();
  closePopup();
}

function setFields() {
  const formProfile = document.forms['edit-profile'];
  const profileNameInput = formProfile.elements.name;
  const profileDescriptionInput = formProfile.elements.description;

  const profileName = document.querySelector('.profile__title').textContent;
  const profileDescription = document.querySelector('.profile__description').textContent;

  profileNameInput.value = profileName;
  profileDescriptionInput.value = profileDescription;
}

export function handleOpenPopup(popup) {
  setFields();
  openPopup(popup);
}

export function openImage(link, text) {
  const imagePopup = document.querySelector('.popup_type_image');

  handleOpenPopup(imagePopup);

  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');

  popupImage.setAttribute('src', link);
  popupCaption.textContent = text;
}