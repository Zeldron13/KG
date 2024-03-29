const loadData = (onSuccess, onError) => () => {

  const url = ' https://25.javascript.pages.academy/kekstagram/data';

  return fetch(url,
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if(response.ok){
        return response.json();
      }
      
      throw new Error(`${response.status} ${response.statusText}`)
    })
    .then((data) =>{ 
      onSuccess(data)
    })
    .catch((err) => {
      onError(err);
    })
};

export {loadData};