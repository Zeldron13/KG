const form = document.querySelector('.img-upload__form');

let fileField = form.querySelector('.img-upload__input');
let cancelButton = form.querySelector('.img-upload__cancel')

const hashtagField = document.querySelector('.text__hashtags');

const showModal = () => {
  form.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  closeModalEsc();
}
const closeModal = () => {
  form.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}
const closeModalEsc = () => {
  document.addEventListener('keydown', function(evt){
    if (evt.keyCode === 27) {
      closeModal();
    }
  })
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


  // проверка значения поля на соответствие требований ТЗ 
  // функция должна вернуть true либо false
};

pristine.addValidator(
  hashtagField,
  validateTags,
  'Неправильно заполнены хэштеги'
);

const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
   
})
console.log(inputImg.value);