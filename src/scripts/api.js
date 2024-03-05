// Все запросы присвойте переменным и экспортируйте их.

// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
//   headers: {
//     authorization: '24ef75a7-8795-46f3-b446-da8d3eb6fdc6',
//     'Content-Type': 'application/json'
//   }
// }
// const profileImage = document.querySelector('.profile__image');


export function getUserData(config) {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
}

export function getUsersCards(config) {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    return data;
  });
}

let promises = [getUserData, getUsersCards];
Promise.all(promises);
// Если обновление прошло успешно,
// в теле ответа от сервера вы получите обновлённые данные пользователя:

export function updateUserProfile(config, userData) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(userData)
  })
    .then((res) => {
      res.json();
    })
    // .then((data) => {
    //   return data;
    // });
}

export function postNewCard(config, name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then((res) => {
      return res.json();
    })
}

export function sendDeleteCardRequest(config, cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: 'DELETE'
  })
}

export function putCardLike(config, cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'PUT'
  })
    .then((res) => {
      return res.json();
    })
}

export function deleteCardLikeRequest(config, cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'DELETE'
  })
  .then((res) => {
    return res.json();
  })
}

export function getUpdateCardLikes(config, cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: 'GET'
  })
  .then((res) => {
    return res.json();
  })
}

export function updateUserAvatar(config, avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then((res) => {
    return res.json();
  })
}