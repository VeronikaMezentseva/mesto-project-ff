export function openPopup(popup) {
  popup.classList.add('popup_is-opened');

  document.addEventListener('click', closeWithOverlay);
  document.addEventListener('keydown', closeWithEsc);
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('click', closeWithOverlay);
  document.removeEventListener('keydown', closeWithEsc);
}

function closeWithEsc(evt) {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}

function closeWithOverlay(evt) {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.target.classList.contains('popup')) {
    closePopup(openedPopup);
  }
}