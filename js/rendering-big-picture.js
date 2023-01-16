let bigPicture = document.querySelector('.big-picture');
let closeBigPicture = document.querySelector('.big-picture__cancel');

let showBigPicture = function(item){
  let commentList = document.querySelector('.social__comments');

  bigPicture.querySelector('.big-picture__img img').src = item.url;
  bigPicture.querySelector('.likes-count').textContent = item.likes;
  bigPicture.querySelector('.comments-count').textContent = item.comments.length;
  bigPicture.querySelector('.social__caption').textContent = item.description;
  
  
  for(let i = 0; i < item.comments.length; i++ ){
    let comment = bigPicture.querySelector('.social__comment');
    comment.querySelector('.social__picture').src = item.comments[i].avatar
    comment.querySelector('.social__picture').alt = item.comments[i].name
    comment.querySelector('.social__text').textContent = item.comments[i].message
    commentList.appendChild(comment);
  }

  bigPicture.querySelector('.social__comment-count').classList.add('hidden')
  bigPicture.querySelector('.comments-loader').classList.add('hidden')
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  closeModalEsc();
}
let closePictire = () =>{
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}
const closeModalEsc = () => {
  document.addEventListener('keydown', function(evt){
    if (evt.keyCode === 27) {
      closePictire();
    }
  })
}

closeBigPicture.addEventListener('click', function(){
  closePictire();
})


export{showBigPicture};