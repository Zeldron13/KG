const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay')
const body = document.querySelector('body');
const fileField = form.querySelector('.img-upload__input');
const cancelButton = form.querySelector('.img-upload__cancel')
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const UNVALID_SYMBOL = /[^a-zA-Z0-9а-яА-ЯеЁ]/g;

/*Открытие и закрытие модального окна */

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
}

const closeModal = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
}

const isTextFieldFocused = () => 
  document.activeElement === hashtagField ||
  document.activeElement === commentField;


const onEscKeyDown = (evt) => {
  console.log('123')
  if (evt.keyCode === 27 && !isTextFieldFocused()) {
    evt.preventDefault();
    closeModal();
  }
}

fileField.addEventListener('change', () =>{
  showModal();
})

cancelButton.addEventListener('click', () =>{
  closeModal();
})

/*Валидация*/


const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

const validateTags = (value) => {
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  // проверка значения поля на соответствие требований ТЗ 
  // функция должна вернуть true либо false
  
};

pristine.addValidator(
  hashtagField,
  validateTags,
  'Неправильно заполнены хэштеги'
);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
})