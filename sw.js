var GHPATH = '/Chronicles';
var APP_PREFIX = 'chronicles_';
var VERSION = 'version_02.1';

var URLS = [

  //Root
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/style.css`,
  `${GHPATH}/Chronicles.js`,
  `${GHPATH}/favicon.png`,

  //Fonts
  `${GHPATH}/fonts/CenturyGothic.eot`,
  `${GHPATH}/fonts/CenturyGothic.ttf`,
  `${GHPATH}/fonts/CenturyGothic.woff`,

  //Hyphenopoly
  `${GHPATH}/Hyphenopoly.js`,
  `${GHPATH}/Hyphenopoly_Loader.js`,
  `${GHPATH}/patterns/ru.wasm`,

  //Backgrounds
  `${GHPATH}/pictures/Backgrounds/Abstraction.png`,
  `${GHPATH}/pictures/Backgrounds/Abstraction_Hero.png`,
  `${GHPATH}/pictures/Backgrounds/Album.png`,
  `${GHPATH}/pictures/Backgrounds/Arthurs_Car.png`,
  `${GHPATH}/pictures/Backgrounds/Aurora_Room.png`,
  `${GHPATH}/pictures/Backgrounds/Balcony.png`,
  `${GHPATH}/pictures/Backgrounds/Ball.png`,
  `${GHPATH}/pictures/Backgrounds/Bench.png`,
  `${GHPATH}/pictures/Backgrounds/Bloody_Pompeii.png`,
  `${GHPATH}/pictures/Backgrounds/Books.png`,
  `${GHPATH}/pictures/Backgrounds/Bookstore_Inside.png`,
  `${GHPATH}/pictures/Backgrounds/Bookstore_TL.png`,
  `${GHPATH}/pictures/Backgrounds/Bus.png`,
  `${GHPATH}/pictures/Backgrounds/Car.png`,
  `${GHPATH}/pictures/Backgrounds/Carete.png`,
  `${GHPATH}/pictures/Backgrounds/Chair.png`,
  `${GHPATH}/pictures/Backgrounds/Disc.png`,
  `${GHPATH}/pictures/Backgrounds/Disco.png`,
  `${GHPATH}/pictures/Backgrounds/Doctors_office.png`,
  `${GHPATH}/pictures/Backgrounds/Door.png`,
  `${GHPATH}/pictures/Backgrounds/Film.png`,
  `${GHPATH}/pictures/Backgrounds/Firstaid_post.png`,
  `${GHPATH}/pictures/Backgrounds/Flowerfield.png`,
  `${GHPATH}/pictures/Backgrounds/Forest.png`,
  `${GHPATH}/pictures/Backgrounds/Forest_Flowers.png`,
  `${GHPATH}/pictures/Backgrounds/From_Car.png`,
  `${GHPATH}/pictures/Backgrounds/Garden.png`,
  `${GHPATH}/pictures/Backgrounds/Hero_Sleeps.png`,
  `${GHPATH}/pictures/Backgrounds/House_Inside.png`,
  `${GHPATH}/pictures/Backgrounds/Katarina_Room.png`,
  `${GHPATH}/pictures/Backgrounds/Kitchen.png`,
  `${GHPATH}/pictures/Backgrounds/Lection.png`,
  `${GHPATH}/pictures/Backgrounds/Library.png`,
  `${GHPATH}/pictures/Backgrounds/Lighthouse.png`,
  `${GHPATH}/pictures/Backgrounds/Lighthouse_Night.png`,
  `${GHPATH}/pictures/Backgrounds/Lighthouse_Painting.png`,
  `${GHPATH}/pictures/Backgrounds/Livingkitchen.png`,
  `${GHPATH}/pictures/Backgrounds/Livingroom.png`,
  `${GHPATH}/pictures/Backgrounds/Missing.png`,
  `${GHPATH}/pictures/Backgrounds/Near_Lighthouse.png`,
  `${GHPATH}/pictures/Backgrounds/Nonopoly.png`,
  `${GHPATH}/pictures/Backgrounds/Note.png`,
  `${GHPATH}/pictures/Backgrounds/NY.png`,
  `${GHPATH}/pictures/Backgrounds/Phone.png`,
  `${GHPATH}/pictures/Backgrounds/Pompeii.png`,
  `${GHPATH}/pictures/Backgrounds/Pompeii_Portal.png`,
  `${GHPATH}/pictures/Backgrounds/Pompeii_Portal_Hero.png`,
  `${GHPATH}/pictures/Backgrounds/Room.png`,
  `${GHPATH}/pictures/Backgrounds/Room_TL.png`,
  `${GHPATH}/pictures/Backgrounds/Street.png`,
  `${GHPATH}/pictures/Backgrounds/Uni.png`,
  `${GHPATH}/pictures/Backgrounds/Univer.png`,
  `${GHPATH}/pictures/Backgrounds/VaultDoor.png`,
  `${GHPATH}/pictures/Backgrounds/Waterflow.png`,
  `${GHPATH}/pictures/Backgrounds/WM.png`,
  `${GHPATH}/pictures/Backgrounds/Writing.png`,
  `${GHPATH}/pictures/Backgrounds/Leon_Bike.png`,
  `${GHPATH}/pictures/Backgrounds/Bike_Together.png`,
  `${GHPATH}/pictures/Backgrounds/Lake.png`,
  `${GHPATH}/pictures/Backgrounds/Dimensions.png`,
  `${GHPATH}/pictures/Backgrounds/Cheryl_House.png`,
  `${GHPATH}/pictures/Backgrounds/Cheryl_Car.png`,
  `${GHPATH}/pictures/Backgrounds/Cheryl_Hitch.png`,
  `${GHPATH}/pictures/Backgrounds/Hero_Car.png`,
  `${GHPATH}/pictures/Backgrounds/Lake_Hitch.png`,
  `${GHPATH}/pictures/Backgrounds/Lake_Taxi.png`,
  `${GHPATH}/pictures/Backgrounds/Rabbit.png`,
  `${GHPATH}/pictures/Backgrounds/Rabbit_Dragon.png`,
  `${GHPATH}/pictures/Backgrounds/Rabbit_Dragon_Caterpillar.png`,
  `${GHPATH}/pictures/Backgrounds/Rabbit_Dragon_Caterpillar_Cloud.png`,
  `${GHPATH}/pictures/Backgrounds/Rabbit_Dragon_Caterpillar_Spray.png`,
  `${GHPATH}/pictures/Backgrounds/Rabbit_Hat.png`,
  `${GHPATH}/pictures/Backgrounds/Rabbit_Hat_Knight.png`,
  `${GHPATH}/pictures/Backgrounds/Rabbit_Hat_Knight_Hatter.png`,
  `${GHPATH}/pictures/Backgrounds/Rabbit_Hat_Knight_Tree.png`,
  `${GHPATH}/pictures/Backgrounds/Couch.png`,
  `${GHPATH}/pictures/Backgrounds/Parents.png`,

  //Persons
  `${GHPATH}/pictures/Persons/Antagonist.png`,
  `${GHPATH}/pictures/Persons/Arthur.png`,
  `${GHPATH}/pictures/Persons/Aurora.png`,
  `${GHPATH}/pictures/Persons/Cheryl.png`,
  `${GHPATH}/pictures/Persons/Dad.png`,
  `${GHPATH}/pictures/Persons/Goddess.png`,
  `${GHPATH}/pictures/Persons/Hero.png`,
  `${GHPATH}/pictures/Persons/Hero_TL.png`,
  `${GHPATH}/pictures/Persons/Kaleb.png`,
  `${GHPATH}/pictures/Persons/Leon.png`,
  `${GHPATH}/pictures/Persons/Masha.png`,
  `${GHPATH}/pictures/Persons/Monster.png`,
  `${GHPATH}/pictures/Persons/Neitan.png`,
  `${GHPATH}/pictures/Persons/Neitan_TL.png`,
  `${GHPATH}/pictures/Persons/Nicola.png`,
  `${GHPATH}/pictures/Persons/Nika.png`,
  `${GHPATH}/pictures/Persons/Robert.png`,
  `${GHPATH}/pictures/Persons/RTemiy.png`,
  `${GHPATH}/pictures/Persons/Scarlett.png`,
  `${GHPATH}/pictures/Persons/Stranger.png`,
  `${GHPATH}/pictures/Persons/Thomas.png`,
  `${GHPATH}/pictures/Persons/Yan.png`,
  `${GHPATH}/pictures/Persons/Scarlett_New.png`,
  `${GHPATH}/pictures/Persons/Dog_Dry.png`,
  `${GHPATH}/pictures/Persons/Cheryl_New.png`,
  `${GHPATH}/pictures/Persons/Dog_Dirty.png`,
  `${GHPATH}/pictures/Persons/Leon_New.png`,
  `${GHPATH}/pictures/Persons/Robert_Pompeii.png`,
  `${GHPATH}/pictures/Persons/Neitan_New.png`,

  //Items
  `${GHPATH}/pictures/Items/Bag.png`,
  `${GHPATH}/pictures/Items/Cross.png`,
  `${GHPATH}/pictures/Items/Cup.png`,
  `${GHPATH}/pictures/Items/Golden_Cross.png`,
  `${GHPATH}/pictures/Items/Key01.png`,
  `${GHPATH}/pictures/Items/Knife.png`,
  `${GHPATH}/pictures/Items/Lock.png`,
  `${GHPATH}/pictures/Items/Money.png`,
  `${GHPATH}/pictures/Items/Study.png`,
  `${GHPATH}/pictures/Items/Trial_Pass.png`,
  `${GHPATH}/pictures/Items/Corkscrew.png`,
  `${GHPATH}/pictures/Items/Sandwich.png`,
  `${GHPATH}/pictures/Items/Crisps.png`,
  `${GHPATH}/pictures/Items/Yogurt.png`,

  //Covers
  `${GHPATH}/pictures/Covers/Aurora.png`,
  `${GHPATH}/pictures/Covers/Aurora_Part01.png`,
  `${GHPATH}/pictures/Covers/Aurora_Part02.png`,
  `${GHPATH}/pictures/Covers/Aurora_Prologue.png`,
  `${GHPATH}/pictures/Covers/chapter.png`,
  `${GHPATH}/pictures/Covers/FifthPart.png`,
  `${GHPATH}/pictures/Covers/FirstChapter.png`,
  `${GHPATH}/pictures/Covers/FP.png`,
  `${GHPATH}/pictures/Covers/PP.png`,
  `${GHPATH}/pictures/Covers/Prologue.png`,
  `${GHPATH}/pictures/Covers/Story.png`,
  `${GHPATH}/pictures/Covers/TL.png`,
  `${GHPATH}/pictures/Covers/Unknown.png`,

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