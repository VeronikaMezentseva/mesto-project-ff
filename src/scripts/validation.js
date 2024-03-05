// const formConfig = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// }

function showInputError(formElement, inputElement, errorMessage, formConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(formConfig.inputErrorClass);
  errorElement.classList.add(formConfig.errorClass);
}

function hideInputError(formElement, inputElement, formConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove(formConfig.inputErrorClass);
  errorElement.classList.remove(formConfig.errorClass);
}

// проверка валидности инпута, показ/скрытие ошибки

function checkInputValidity(formElement, inputElement, formConfig) {
  const errorMessage = inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  if (inputElement.validity.patternMismatch) {
    showInputError(formElement, inputElement, errorMessage, formConfig);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formConfig);
  } else {
    hideInputError(formElement, inputElement, formConfig);
  }
}

// проверка валидности всех инпутов, блокировка кнопки

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, formConfig) {
  inputList.forEach(inputElement => inputElement.setCustomValidity('')); // рабочий
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(formConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(formConfig.inactiveButtonClass);
  }
}

function setEventListeners(formElement, formConfig) {
  const inputList = Array.from(formElement.querySelectorAll(formConfig.inputSelector));
  const buttonElement = formElement.querySelector(formConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, formConfig);
      toggleButtonState(inputList, buttonElement, formConfig);
    });
  });
}

export function clearValidation(formElement, formConfig) {
  const inputList = Array.from(formElement.querySelectorAll(formConfig.inputSelector));
  const buttonElement = formElement.querySelector(formConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formConfig);
  inputList.forEach((inputElement) => {
    inputElement.setCustomValidity(''); //
    hideInputError(formElement, inputElement, formConfig);
  });
}

export function enableValidation(formConfig) {
  const formList = Array.from(document.querySelectorAll(formConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, formConfig);
  });
}
