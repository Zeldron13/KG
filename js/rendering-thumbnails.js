import {getElementsArray} from './data.js'
import {showBigPicture} from './rendering-big-picture.js'
import {loadData} from './data-loader.js';


let arrayItems = getElementsArray();

let pictureList = document.querySelector('.pictures')
let pictureListFragment = document.createDocumentFragment();

let pictureTemplate = document.querySelector('#picture').content
let newItemTemplate = pictureTemplate.querySelector('.picture');


const renderItem = function (item){
  let pictureItem = newItemTemplate.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = item.url;
  pictureItem.querySelector('.picture__img').alt = item.description;
  // let imgUrl = pictureItem.querySelector('.picture__img');
  // imgUrl.src = item.url;
  pictureItem.querySelector('.picture__likes').textContent = item.likes;
  pictureItem.querySelector('.picture__comments').textContent = item.comments.length;
  pictureListFragment.appendChild(pictureItem);
  
  pictureItem.addEventListener('click', function(evt){
    evt.preventDefault();
    showBigPicture(item);
  });
}

const renderingThumbnails = function (array) {
  for(let i = 0; i < array.length; i++){
    renderItem(array[i]);
  }
  pictureList.appendChild(pictureListFragment);
} 
const dataError = function (err){
  console.error(err)
}

const loading = loadData(renderingThumbnails, console.error)

loading();