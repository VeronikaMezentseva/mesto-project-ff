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

// проверка валидности инпутов в форме

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// изменение состояния кнопки

function toggleButtonState(inputList, buttonElement, formConfig) {
  inputList.forEach(inputElement => inputElement.setCustomValidity(''));
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(formConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(formConfig.inactiveButtonClass);
  }
}

function disableButton(buttonElement, formConfig) {
  buttonElement.disabled = true;
  buttonElement.classList.add(formConfig.inactiveButtonClass);
}

// навешивание слушателей ввода на все инпуты

function setEventListeners(formElement, formConfig) {
  const inputList = Array.from(formElement.querySelectorAll(formConfig.inputSelector));
  const buttonElement = formElement.querySelector(formConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      toggleButtonState(inputList, buttonElement, formConfig);
      checkInputValidity(formElement, inputElement, formConfig);
    });
  });
}

// очистка ошибок валидации 

export function clearValidation(formElement, formConfig) {
  const inputList = Array.from(formElement.querySelectorAll(formConfig.inputSelector));
  const buttonElement = formElement.querySelector(formConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.setCustomValidity('');
    hideInputError(formElement, inputElement, formConfig);
  });
  disableButton(buttonElement, formConfig);
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
