var GHPATH = '/Chronicles';
var APP_PREFIX = 'chronicles_';
var VERSION = 'version_02.2';

var URLS = [

  //Root
  `${GHPATH}/`,

  //Fonts
  `${GHPATH}/fonts/CenturyGothic.eot`,
  `${GHPATH}/fonts/CenturyGothic.ttf`,
  `${GHPATH}/fonts/CenturyGothic.woff`,

  //Hyphenopoly
  `${GHPATH}/Hyphenopoly.js`,
  `${GHPATH}/Hyphenopoly_Loader.js`,
  `${GHPATH}/patterns/ru.wasm`,

  //Interface
  `${GHPATH}/pictures/Interface/A_back.png`,
  `${GHPATH}/pictures/Interface/A_border.png`,
  `${GHPATH}/pictures/Interface/arrow.png`,
  `${GHPATH}/pictures/Interface/back.png`,
  `${GHPATH}/pictures/Interface/border.png`,
  `${GHPATH}/pictures/Interface/button.png`,
  `${GHPATH}/pictures/Interface/chapter.png`,
  `${GHPATH}/pictures/Interface/close.png`,
  `${GHPATH}/pictures/Interface/message.png`,
  `${GHPATH}/pictures/Interface/MVA.png`,
  `${GHPATH}/pictures/Interface/PVNE.png`,
  `${GHPATH}/pictures/Interface/Unknown.png`,
  `${GHPATH}/pictures/Interface/gp.png`,
  `${GHPATH}/pictures/Interface/tg.png`,

  ]


var CACHE_NAME = APP_PREFIX + VERSION
self.addEventListener('fetch', function (e) {
  console.log('Fetch request : ' + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) {
        console.log('Responding with cache : ' + e.request.url);
        return request
      } else {
        console.log('File is not cached, fetching : ' + e.request.url);
        return fetch(e.request)
      }
    })
  )
})

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Installing cache : ' + CACHE_NAME);
      return cache.addAll(URLS)
    })
  )
})

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      cacheWhitelist.push(CACHE_NAME);
      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('Deleting cache : ' + keyList[i] );
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})