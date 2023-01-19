let bigPicture = document.querySelector('.big-picture');
let closeBigPicture = document.querySelector('.big-picture__cancel');

let commentList = document.querySelector('.social__comments');
let commentListFragment = document.createDocumentFragment();
let commentLoaderButton = document.querySelector('.social__comments-loader');
let commentCount = document.querySelector('.social__comment-count');

let commentTemplate = document.querySelector('#comment').content;

const SHOW_COMMENT_COUNT = 5;

let showBigPicture = function(item){

  bigPicture.querySelector('.big-picture__img img').src = item.url;
  bigPicture.querySelector('.likes-count').textContent = item.likes;
  bigPicture.querySelector('.comments-count').textContent = item.comments.length;
  bigPicture.querySelector('.social__caption').textContent = item.description;
  
  for(let i = 0; i < item.comments.length; i++ ){
    let comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = item.comments[i].avatar
    comment.querySelector('.social__picture').alt = item.comments[i].name
    comment.querySelector('.social__text').textContent = item.comments[i].message
    comment.querySelector('.social__comment').classList.add('hidden');
    commentList.appendChild(comment);
  }
  showComments(SHOW_COMMENT_COUNT);
  commentList.appendChild(commentListFragment);

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  closeModalEsc();
}

const getCountText = (hidden, total) => {
  let shown = total-hidden;
  commentCount.innerHTML = `${shown} из <span class="comments-count">${total}<\/span> комментариев`;
  if(shown === total) {
    commentLoaderButton.classList.add('hidden');
  }else{commentLoaderButton.classList.remove('hidden');}
}

const showComments = (amount) => {
  for(let i = 0; i < amount; i++){
    let commentHiddenItem = document.querySelector('.social__comment.hidden');

    if(commentHiddenItem == null){
      break;
    }else{
      commentHiddenItem.classList.remove('hidden');
    }
  }

  let allComments = document.querySelectorAll('.social__comment').length;
  let hiddenComments = document.querySelectorAll('.social__comment.hidden').length;
  getCountText(hiddenComments, allComments);
}
let closePictire = () =>{
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  commentList.innerHTML = '';
}
const closeModalEsc = () => {
  document.addEventListener('keydown', function(evt){
    if (evt.keyCode === 27) {
      closePictire();
    }
  })
}

commentLoaderButton.addEventListener('click', function(){
  showComments(SHOW_COMMENT_COUNT);
})

closeBigPicture.addEventListener('click', function(){
  closePictire();
})

export{showBigPicture};