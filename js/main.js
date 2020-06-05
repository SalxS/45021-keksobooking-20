'use strict';

var AD_NUM = 8;
var ads = [];
var pin = {width: 50, height: 70, tailHeight: 17};
var map = document.querySelector('.map');
var mapWidth = map.offsetWidth - 1; // ширина блока с картой для установки пинов

// массивы с данными
var AD_TYPE = {'palace': {ru: 'Дворец'}, 'flat': {ru: 'Квартира'}, 'house': {ru: 'Дом'}, 'bungalo': {ru: 'Бунгало'}};
var AD_TYPES_NAME = ['palace', 'flat', 'house', 'bungalo'];
var AD_CHECK = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var mapPins = document.querySelector('.map__pins');

// генератор случайного числа с numCount цифрами после запятой
var getRandom = function (min, max, numCount) {
  return Math.floor((Math.random() * (max - min) + min) * Math.pow(10, numCount)) / Math.pow(10, numCount);
};

//
var getShuffleFeatures = function (shuffleArr) {
  var j;
  var x;
  var i;
  for (i = shuffleArr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = shuffleArr[i];
    shuffleArr[i] = shuffleArr[j];
    shuffleArr[j] = x;
  }
  return shuffleArr;
};

var getPhotos = function () {
  var photosArr = [];
  for (var i = 0; i < getRandom(1, 4, 0); i++) {
    photosArr.push('http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg');
  }
  return photosArr;
};

var getOffers = function () {
  for (var i = 0; i < AD_NUM; i++) {
    var rooms = getRandom(1, 5, 0);
    var photos = getPhotos();
    ads.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Мой дом' + (i + 1),
        address: '600, 350',
        price: getRandom(2000, 10000, 0),
        type: Object.keys(AD_TYPE)[getRandom(0, AD_TYPES_NAME.length, 0)],
        rooms: rooms,
        guests: 2 * rooms,
        checkin: AD_CHECK[getRandom(0, AD_CHECK.length, 0)],
        checkout: AD_CHECK[getRandom(0, AD_CHECK.length, 0)],
        features: getShuffleFeatures(AD_FEATURES).slice(0, getRandom(1, AD_FEATURES.length, 0)),
        description: 'Тут будет описание.',
        photos: photos
      },
      location: {
        x: getRandom(1, mapWidth, 0),
        y: getRandom(130, 630, 0)
      }
    });
  }
  return ads;
};

var createPins = function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragmentPin = document.createDocumentFragment();

  var fillPinInfo = function (ad) {
    var pinElem = pinTemplate.cloneNode(true);

    pinElem.style.left = ad.location.x - (pin.width / 2) + 'px';
    pinElem.style.top = ad.location.y - (pin.height) + 'px';
    pinElem.querySelector('img').src = ad.author.avatar;
    pinElem.querySelector('img').alt = ad.offer.title;
    return pinElem;
  };

  for (var i = 0; i < ads.length; i++) {
    var mapPin = fillPinInfo(ads[i]);
    fragmentPin.appendChild(mapPin);
  }

  mapPins.appendChild(fragmentPin);
};

map.classList.remove('map--faded');
ads = getOffers(); // заполнение массива случайными данными
createPins(); // создание и отрисовка пинов

console.log(ads);
