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
const UNVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯеЁ]/g;

/*Открытие и закрытие модального окна */
const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
}

const hideModal = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
}

const isTextFieldFocused = () => 
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const onEscKeyDown = (evt) => {
  if (evt.keyCode === 27 && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}


/*Валидация*/

const startsWithHash = (string) => string[0] === '#';

const hasValidLength = (string) =>
  string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;
 
const hasValidSymbols = (string) => !UNVALID_SYMBOLS.test(string.slice(1));



const isValidTag = (tag) => 
  startsWithHash(tag) && hasValidLength(tag) && hasValidSymbols(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);  
  
};

pristine.addValidator(
  hashtagField,
  validateTags,
  'Неправильно заполнены хэштеги'
);


const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};


fileField.addEventListener('change',showModal)
cancelButton.addEventListener('click',hideModal)
form.addEventListener('submit', onFormSubmit);