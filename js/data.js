import{getRandomPositiveInteger, getLenghtString, getRandomElementArray, getRandomId} from './util.js'

const NAMES = [
  'Забава',
  'Зарина',
  'Звенимира',
  'Звенислава',
  'Злата',
  'Изяслава',
  'Красава',
  'Красимира',
  'Купава',
  'Лада',
  'Леля',
  'Лучезара',
  'Любовь'
];
const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const DESCRIPTION = [
  'В жизни я лучше, чем в инстаграме! ',
  'Месть? Я слишком ленив, поэтому оставляю это Карме.',
  'Я тоже участвую в марафонах. На Netflix. ',
  'Я аквалангист в море идиотов.',
  'Мой суп дня – это текила.',
  'Вы все модели. А какое у вас агентство? Instagram?',
  'Летний чил на югах. #тай #отдых #лето #чил #travel #travelgram #summergram #chill',
  'Тестим новую камеру! #camera #test #new #newcameratest #pic #photo #instaphoto',
  'Затусили с друзьями на море #laptevsea #north #northeastpassage',
  'Как же круто тут кормят #food #foodgram #instafood #delicious #yummy',
  'Отдыхаем... #chill #relax #group #photo',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка! #wow #car #carwow #drive',
  '#fun #party #cool #young',
  'Господи, это такая милота, я сейчас умру от нежности, у меня закшалил мимимиметр',
  'Хорошо, когда в жизни есть #друзья, которые вместе со мной могут зайти в #барнарубинштейна и бахнуть #пивка',
  'Норм'
];
let idList = [
  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25
];
let idPhotoList = [
  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25
];
const ELEMENTS_ARRAY_COUNT = 19;
const MAX_COMMENTS_COUNT = 10;

const getRandomMessagesArray = () => {
  const MESSAGE_COUNT = getRandomPositiveInteger(1, 2);

  function getElement(){
    return getRandomElementArray(MESSAGE)
  }

  return  Array.from({length: MESSAGE_COUNT}, getElement);
};
const getRandomCommentsArray = () => {
  const COMMENTS_COUNT = getRandomPositiveInteger(1, MAX_COMMENTS_COUNT);
  function getElement() {
    return {
      id: getRandomPositiveInteger(1,1000),
      avatar: 'img/avatar-'+ getRandomPositiveInteger(1,6) + '.svg',
      message: getRandomMessagesArray(),
      name: getRandomElementArray(NAMES)
    } 
  }
  return  Array.from({length: COMMENTS_COUNT},getElement);
};
const createElementArray = () => {
  return {
    id: getRandomId(idList),
    url: 'photos/' + getRandomId(idPhotoList) + '.jpg',
    description: getRandomElementArray(DESCRIPTION),
    likes: getRandomPositiveInteger(15, 200),
    comments: getRandomCommentsArray()
  }
};
const getElementsArray = () => {
  return Array.from({length: ELEMENTS_ARRAY_COUNT }, createElementArray);
}

// console.log(getElementsArray());

export {getElementsArray};