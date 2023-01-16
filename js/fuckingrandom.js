
const arrayRandomNumbers = (min, max, count, list) => {
  let a = Array.from({length: count}, getRandomId(min, max, list));
  // console.log(a);
};


const getRandomId = (min, max, idList) => {
  let isNew = false;

  while(!isNew){
    let num = getRandomPositiveInteger(min, max);

    for(let i = 0; i <= idList.length; i++){
      if(idList[i] == num){
        break;
      }else if(i = idList.length && idList[i] != num || idList.length ==0 ){
        idList.push(num);
        isNew = true;
      }
    }
  };

}

// arrayRandomNumbers(1,10, 5, commentIdList);
getRandomId(1,10,commentIdList);
getRandomId(1,10,commentIdList);
getRandomId(1,10,commentIdList);
getRandomId(1,10,commentIdList);
getRandomId(1,10,commentIdList);
console.log(
  commentIdList
);
