export function openPopup(popup) {
  popup.classList.add('popup_is-opened');

  document.addEventListener('click', (evt) => closeWithOverlay(evt, popup));
  document.addEventListener('keydown', (evt) => closeWithEsc(evt, popup));
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeWithEsc);
}

function closeWithEsc(evt, popup) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

function closeWithOverlay(evt, popup) {
  if (evt.target.classList.contains('popup')) {
    closePopup(popup);
  }
}