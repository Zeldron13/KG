const bigPicture = document.querySelector('.big-picture');
const closeBigPicture = document.querySelector('.big-picture__cancel');
let commentList = document.querySelector('.social__comments');
let commentsArray = [];

let commentTemplate = document.querySelector('#comment').content;

const commentCount = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');

let showComments = 0;
const SHOW_COMMENTS_AMOUNT = 5;

const showBigPicture = function(item){
  bigPicture.querySelector('.big-picture__img img').src = item.url;
  bigPicture.querySelector('.likes-count').textContent = item.likes;
  bigPicture.querySelector('.comments-count').textContent = item.comments.length;
  bigPicture.querySelector('.social__caption').textContent = item.description;
  commentsArray = item.comments;
  console.log(commentsArray);
  createComments(commentsArray);
  let commentListItem = document.querySelectorAll('.social__comment')

  commentLoader.addEventListener('click', function(item){
    renderComments(item, showComments, SHOW_COMMENTS_AMOUNT)
  })

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  closeModalEsc();
}

const createComments = (item) => {

  if(item.length < 5){
    renderComments(item, item.length);
  }else{
    renderComments(item, SHOW_COMMENTS_AMOUNT)
    }
}

const renderComments = (item, count) =>{
  for(let i = 0; i < count; i++ ){
    let comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = item[i].avatar;
    comment.querySelector('.social__picture').alt = item[i].name;
    comment.querySelector('.social__text').textContent = item[i].message;
    commentList.appendChild(comment);
  }
  commentsArray.splice(0, SHOW_COMMENTS_AMOUNT)
  console.log(commentsArray);
  if(SHOW_COMMENTS_AMOUNT > item.length){
    showComments += item.length
  }else showComments += SHOW_COMMENTS_AMOUNT;
  getCountText(showComments, item.length);
}

const getCountText = (shown, total) => {
  commentCount.innerHTML = `${shown} из <span class="comments-count">${total}<\/span> комментариев`;
  if(shown === total) commentLoader.classList.add('hidden');
}


const closePictire = () =>{
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  commentList.innerHTML = '';
  commentCount.innerHTML =`0 из <span class="comments-count">0<\/span> комментариев`;
  showComments = 0;
  commentsArray = [];
}
const closeModalEsc = () => {
  document.addEventListener('keydown', function(evt){
    if (evt.keyCode === 27) {
      closePictire();
    }
  })
}

commentLoader.addEventListener('click', function(){
  renderComments(commentsArray);
})
closeBigPicture.addEventListener('click', function(){
  closePictire();
})

export{showBigPicture};