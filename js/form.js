import {sendData} from './data-loader.js'

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

let sendingData = sendData(uploadData, uploadError);

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


  getImg();
}
// URL.createObjectURL(file.files[0]);
const hideModal = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);


  effectImg.className = 'img-upload__preview'
  effectImg.style = '';
  effectLavelSlider.classList.add('hidden');
}

const getImg = () => {
  const img = document.querySelector('.img-upload__preview img')

  img.src = URL.createObjectURL(fileField.files[0])
 
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


/*ОТПРАВКА ФОРМЫ */

sendingData(onFormSubmit, )

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
  sendData

};

/*изменение размера */


const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleImg = document.querySelector('.img-upload__preview');


const scaleChanger = function(isSmaller){
  let scaleControlValue = document.querySelector('.scale__control--value');
  let scaleValue = scaleControlValue.value.replace('%','')

  if(isSmaller){
    if(scaleValue > 25){
      scaleValue = Number(scaleValue) - Number(25);
      scaleControlValue.value = scaleValue + '%'
      scaleImg.style.transform = `scale(${scaleValue/100})`
    }
  }else{
    if(scaleValue < 100){
      scaleValue = Number(scaleValue) + Number(25);
      scaleControlValue.value = scaleValue + '%'
      scaleImg.style.transform = `scale(${scaleValue/100})`
    }
  }
}

scaleControlSmaller.addEventListener('click', function(){
  scaleChanger(true)
})
scaleControlBigger.addEventListener('click', function(){
  scaleChanger(false)
})

/*Наложение эффектов*/

const effectLavelSlider = document.querySelector('.effect-level__slider')
const effectLavelValue = document.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');
const effectImg = document.querySelector('.img-upload__preview');

let sliderValue; 
let effectFilter;
let effectFilterChar= '';

effectLavelSlider.classList.add('hidden');

noUiSlider.create(effectLavelSlider,{
  range:{
    min:0,
    max:100,
  },
  start: 100,
  step: 1,
  connect:'lower',
})

const getEffectValue = () =>{
  const value = document.querySelector('input[name = effect]:checked').value;

  effectImg.className = 'img-upload__preview'
  
  if(value != 'none'){
    effectLavelSlider.classList.remove('hidden')
    effectImg.classList.add(`effects__preview--${value}`)
    setSliderAttr(value);
  }else{
    effectLavelSlider.classList.add('hidden')
    effectImg.style.filter = '';
    effectFilter = '';
    effectImg.className = 'img-upload__preview'
  }
}

const setSliderAttr = (value) => {

  switch(value){
    case 'chrome':
      effectFilter = 'grayscale';
      effectFilterChar= '';
      effectLavelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 1,
       });
       break;

    case 'sepia':
      effectFilter = 'sepia';
      effectFilterChar= '';
      effectLavelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 1,
       });
       break;

    case 'marvin':
      effectFilter = 'invert';
      effectFilterChar ='%';
      effectLavelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
        start: 100,
       });
       break; 

    case 'phobos':
      effectFilter = 'blur';
      effectFilterChar ='px';
      effectLavelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
        start: 3,
       });
       break; 

    case 'heat':
      effectFilter = 'brightness';
      effectFilterChar= '';
      effectLavelSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1,
        start: 3,
       });
       break; 
  }
}

effectLavelSlider.noUiSlider.on('update', (...rest) =>{
  sliderValue = effectLavelSlider.noUiSlider.get();
  let currentValue = `${effectFilter}(${sliderValue}${effectFilterChar})`
  effectImg.style.filter = currentValue;
  effectLavelValue.value = currentValue;

})


effectList.addEventListener('change', function(){
  getEffectValue();
})


fileField.addEventListener('change',showModal);
cancelButton.addEventListener('click',hideModal);

form.addEventListener('submit', onFormSubmit);