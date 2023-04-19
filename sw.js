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

  //Pictures
    `${GHPATH}/Backgrounds/Abstraction`,
    `${GHPATH}/Backgrounds/Abstraction_Hero`,
    `${GHPATH}/Backgrounds/Aurora_Album`,
    `${GHPATH}/Backgrounds/Aurora_Arthurs_Car`,
    `${GHPATH}/Backgrounds/Aurora_Bench`,
    `${GHPATH}/Backgrounds/Aurora_Books`,
    `${GHPATH}/Backgrounds/Aurora_Bus`,
    `${GHPATH}/Backgrounds/Aurora_Busstop`,
    `${GHPATH}/Backgrounds/Aurora_Church`,
    `${GHPATH}/Backgrounds/Aurora_Disc`,
    `${GHPATH}/Backgrounds/Aurora_Forest`,
    `${GHPATH}/Backgrounds/Aurora_Forest_Flowers`,
    `${GHPATH}/Backgrounds/Aurora_Fountain`,
    `${GHPATH}/Backgrounds/Aurora_From_Car`,
    `${GHPATH}/Backgrounds/Aurora_House_Inside`,
    `${GHPATH}/Backgrounds/Aurora_Library`,
    `${GHPATH}/Backgrounds/Aurora_Lighthouse`,
    `${GHPATH}/Backgrounds/Aurora_Lighthouse_Dawn`,
    `${GHPATH}/Backgrounds/Aurora_Lighthouse_Night`,
    `${GHPATH}/Backgrounds/Aurora_Lighthouse_Painting`,
    `${GHPATH}/Backgrounds/Aurora_Livingkitchen`,
    `${GHPATH}/Backgrounds/Aurora_Message_Father_Bad`,
    `${GHPATH}/Backgrounds/Aurora_Message_Father_Good`,
    `${GHPATH}/Backgrounds/Aurora_Missing`,
    `${GHPATH}/Backgrounds/Aurora_Mother_Photo`,
    `${GHPATH}/Backgrounds/Aurora_Near_Lighthouse`,
    `${GHPATH}/Backgrounds/Aurora_Near_Lighthouse_Dawn`,
    `${GHPATH}/Backgrounds/Aurora_Note`,
    `${GHPATH}/Backgrounds/Aurora_Pharm`,
    `${GHPATH}/Backgrounds/Aurora_Room`,
    `${GHPATH}/Backgrounds/Aurora_SW_Streets`,
    `${GHPATH}/Backgrounds/Aurora_Solist_Picture`,
    `${GHPATH}/Backgrounds/Aurora_Uni_Outside`,
    `${GHPATH}/Backgrounds/Aurora_Univer`,
    `${GHPATH}/Backgrounds/Aurora_WM`,
    `${GHPATH}/Backgrounds/Aurora_Writing`,
    `${GHPATH}/Backgrounds/Balcony`,
    `${GHPATH}/Backgrounds/Ball`,
    `${GHPATH}/Backgrounds/Bike_Together`,
    `${GHPATH}/Backgrounds/Bloody_Pompeii`,
    `${GHPATH}/Backgrounds/Bookstore_Inside`,
    `${GHPATH}/Backgrounds/Bookstore_TL`,
    `${GHPATH}/Backgrounds/Bus`,
    `${GHPATH}/Backgrounds/Car`,
    `${GHPATH}/Backgrounds/Carete`,
    `${GHPATH}/Backgrounds/Chair`,
    `${GHPATH}/Backgrounds/Cheryl_Car`,
    `${GHPATH}/Backgrounds/Cheryl_Hitch`,
    `${GHPATH}/Backgrounds/Cheryl_House`,
    `${GHPATH}/Backgrounds/Cheryl_Painting`,
    `${GHPATH}/Backgrounds/Couch`,
    `${GHPATH}/Backgrounds/Dimensions`,
    `${GHPATH}/Backgrounds/Disco`,
    `${GHPATH}/Backgrounds/Doctors_office`,
    `${GHPATH}/Backgrounds/Door`,
    `${GHPATH}/Backgrounds/Film`,
    `${GHPATH}/Backgrounds/Firstaid_post`,
    `${GHPATH}/Backgrounds/Flowerfield`,
    `${GHPATH}/Backgrounds/Garden`,
    `${GHPATH}/Backgrounds/Hero_Car`,
    `${GHPATH}/Backgrounds/Hero_Sleeps`,
    `${GHPATH}/Backgrounds/Katarina_Room`,
    `${GHPATH}/Backgrounds/Kitchen`,
    `${GHPATH}/Backgrounds/Lake`,
    `${GHPATH}/Backgrounds/Lake_Hitch`,
    `${GHPATH}/Backgrounds/Lake_Taxi`,
    `${GHPATH}/Backgrounds/Lection`,
    `${GHPATH}/Backgrounds/Leon_Bike`,
    `${GHPATH}/Backgrounds/Livingroom`,
    `${GHPATH}/Backgrounds/NY`,
    `${GHPATH}/Backgrounds/Nonopoly`,
    `${GHPATH}/Backgrounds/Parents`,
    `${GHPATH}/Backgrounds/Phone`,
    `${GHPATH}/Backgrounds/Pompeii`,
    `${GHPATH}/Backgrounds/Pompeii_Portal`,
    `${GHPATH}/Backgrounds/Pompeii_Portal_Hero`,
    `${GHPATH}/Backgrounds/Rabbit`,
    `${GHPATH}/Backgrounds/Rabbit_Dragon`,
    `${GHPATH}/Backgrounds/Rabbit_Dragon_Caterpillar`,
    `${GHPATH}/Backgrounds/Rabbit_Dragon_Caterpillar_Cloud`,
    `${GHPATH}/Backgrounds/Rabbit_Dragon_Caterpillar_Spray`,
    `${GHPATH}/Backgrounds/Rabbit_Hat`,
    `${GHPATH}/Backgrounds/Rabbit_Hat_Knight`,
    `${GHPATH}/Backgrounds/Rabbit_Hat_Knight_Hatter`,
    `${GHPATH}/Backgrounds/Rabbit_Hat_Knight_Tree`,
    `${GHPATH}/Backgrounds/Room`,
    `${GHPATH}/Backgrounds/Room_TL`,
    `${GHPATH}/Backgrounds/Street`,
    `${GHPATH}/Backgrounds/Uni`,
    `${GHPATH}/Backgrounds/VaultDoor`,
    `${GHPATH}/Backgrounds/Waterflow`,
    `${GHPATH}/Covers/Aurora`,
    `${GHPATH}/Covers/Aurora_Part01`,
    `${GHPATH}/Covers/Aurora_Part02`,
    `${GHPATH}/Covers/Aurora_Part03`,
    `${GHPATH}/Covers/Aurora_Prologue`,
    `${GHPATH}/Covers/FP`,
    `${GHPATH}/Covers/FifthPart`,
    `${GHPATH}/Covers/FirstChapter`,
    `${GHPATH}/Covers/PP`,
    `${GHPATH}/Covers/Prologue`,
    `${GHPATH}/Covers/Story`,
    `${GHPATH}/Covers/TL`,
    `${GHPATH}/Items/Aurora_Mother`,
    `${GHPATH}/Items/Aurora_Trial_Pass`,
    `${GHPATH}/Items/Corkscrew`,
    `${GHPATH}/Items/Crisps`,
    `${GHPATH}/Items/Golden_Cross`,
    `${GHPATH}/Items/Key01`,
    `${GHPATH}/Items/Knife`,
    `${GHPATH}/Items/Money`,
    `${GHPATH}/Items/Sandwich`,
    `${GHPATH}/Items/Study`,
    `${GHPATH}/Items/Yogurt`,
    `${GHPATH}/Persons/Antagonist`,
    `${GHPATH}/Persons/Aurora_Arthur`,
    `${GHPATH}/Persons/Aurora_Aurora`,
    `${GHPATH}/Persons/Aurora_Dad`,
    `${GHPATH}/Persons/Aurora_Dalia`,
    `${GHPATH}/Persons/Aurora_Kaleb`,
    `${GHPATH}/Persons/Aurora_Yan`,
    `${GHPATH}/Persons/Cheryl`,
    `${GHPATH}/Persons/Cheryl_New`,
    `${GHPATH}/Persons/Dog_Dirty`,
    `${GHPATH}/Persons/Dog_Dry`,
    `${GHPATH}/Persons/Goddess`,
    `${GHPATH}/Persons/Hero`,
    `${GHPATH}/Persons/Hero_TL`,
    `${GHPATH}/Persons/Leon`,
    `${GHPATH}/Persons/Leon_New`,
    `${GHPATH}/Persons/Masha`,
    `${GHPATH}/Persons/Monster`,
    `${GHPATH}/Persons/Neitan`,
    `${GHPATH}/Persons/Neitan_New`,
    `${GHPATH}/Persons/Neitan_TL`,
    `${GHPATH}/Persons/Nicola`,
    `${GHPATH}/Persons/RTemiy`,
    `${GHPATH}/Persons/Robert`,
    `${GHPATH}/Persons/Robert_Pompeii`,
    `${GHPATH}/Persons/Scarlett`,
    `${GHPATH}/Persons/Scarlett_New`,
    `${GHPATH}/Persons/Stranger`,
    `${GHPATH}/Persons/Thomas`,

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
  `${GHPATH}/pictures/Interface/R_back.png`,
  `${GHPATH}/pictures/Interface/R_border.png`,
  `${GHPATH}/pictures/Interface/Unknown.png`,
  `${GHPATH}/pictures/Interface/tg.png`,
  `${GHPATH}/pictures/Interface/gp.png`,

  //Sounds and Music
  `${GHPATH}/sounds/Antagonist.mp3`,
  `${GHPATH}/sounds/Aurora.mp3`,
  `${GHPATH}/sounds/Aurora_Daily_01.mp3`,
  `${GHPATH}/sounds/Aurora_Daily_02.mp3`,
  `${GHPATH}/sounds/Ball.mp3`,
  `${GHPATH}/sounds/Chair.mp3`,
  `${GHPATH}/sounds/Cheryl.mp3`,
  `${GHPATH}/sounds/Completed.mp3`,
  `${GHPATH}/sounds/Crowd.mp3`,
  `${GHPATH}/sounds/Disco.mp3`,
  `${GHPATH}/sounds/Doctor.mp3`,
  `${GHPATH}/sounds/FirstChapter.mp3`,
  `${GHPATH}/sounds/KingQueens.mp3`,
  `${GHPATH}/sounds/Leon.mp3`,
  `${GHPATH}/sounds/Lighthouse.mp3`,
  `${GHPATH}/sounds/Monster.mp3`,
  `${GHPATH}/sounds/Neitan.mp3`,
  `${GHPATH}/sounds/noti.mp3`,
  `${GHPATH}/sounds/NY.mp3`,
  `${GHPATH}/sounds/Pompeii.mp3`,
  `${GHPATH}/sounds/Prologue.mp3`,
  `${GHPATH}/sounds/Realities.mp3`,
  `${GHPATH}/sounds/Romantic.mp3`,
  `${GHPATH}/sounds/Scarlett.mp3`,
  `${GHPATH}/sounds/Silence.mp3`,
  `${GHPATH}/sounds/timer.mp3`,
  `${GHPATH}/sounds/Lake.mp3`,
  `${GHPATH}/sounds/Aurora_City.mp3`,
  `${GHPATH}/sounds/Aurora_Church.mp3`,
];


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