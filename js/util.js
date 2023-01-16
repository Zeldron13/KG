let getRandomPositiveInteger = (a, b = 1) => {
  if (a === undefined) {
    throw new Error("Первый параметр должен быть число")
  }
  
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
  // мой код
  // if(max < min && min <= 0 && max <= 0){return 0;} 
  // return Math.floor(Math.random() * (max - min) + min);
}
let getLenghtString = (string, length) => {
  return string.length <= length;
}
const getRandomElementArray = (elements) => {
  return elements[getRandomPositiveInteger(0, elements.length -1)];
};
const getRandomId = (array) => {
  let index = getRandomPositiveInteger(0, array.length -1);
  let num = array[index];
  array = array.splice(index,1);
  return num;
}

export {getRandomPositiveInteger, getLenghtString, getRandomElementArray, getRandomId};
