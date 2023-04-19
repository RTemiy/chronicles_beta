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
    `${GHPATH}/Backgrounds/Abstraction.png`,
    `${GHPATH}/Backgrounds/Abstraction_Hero.png`,
    `${GHPATH}/Backgrounds/Aurora_Album.png`,
    `${GHPATH}/Backgrounds/Aurora_Arthurs_Car.png`,
    `${GHPATH}/Backgrounds/Aurora_Bench.png`,
    `${GHPATH}/Backgrounds/Aurora_Books.png`,
    `${GHPATH}/Backgrounds/Aurora_Bus.png`,
    `${GHPATH}/Backgrounds/Aurora_Busstop.png`,
    `${GHPATH}/Backgrounds/Aurora_Church.png`,
    `${GHPATH}/Backgrounds/Aurora_Disc.png`,
    `${GHPATH}/Backgrounds/Aurora_Forest.png`,
    `${GHPATH}/Backgrounds/Aurora_Forest_Flowers.png`,
    `${GHPATH}/Backgrounds/Aurora_Fountain.png`,
    `${GHPATH}/Backgrounds/Aurora_From_Car.png`,
    `${GHPATH}/Backgrounds/Aurora_House_Inside.png`,
    `${GHPATH}/Backgrounds/Aurora_Library.png`,
    `${GHPATH}/Backgrounds/Aurora_Lighthouse.png`,
    `${GHPATH}/Backgrounds/Aurora_Lighthouse_Dawn.png`,
    `${GHPATH}/Backgrounds/Aurora_Lighthouse_Night.png`,
    `${GHPATH}/Backgrounds/Aurora_Lighthouse_Painting.png`,
    `${GHPATH}/Backgrounds/Aurora_Livingkitchen.png`,
    `${GHPATH}/Backgrounds/Aurora_Message_Father_Bad.png`,
    `${GHPATH}/Backgrounds/Aurora_Message_Father_Good.png`,
    `${GHPATH}/Backgrounds/Aurora_Missing.png`,
    `${GHPATH}/Backgrounds/Aurora_Mother_Photo.png`,
    `${GHPATH}/Backgrounds/Aurora_Near_Lighthouse.png`,
    `${GHPATH}/Backgrounds/Aurora_Near_Lighthouse_Dawn.png`,
    `${GHPATH}/Backgrounds/Aurora_Note.png`,
    `${GHPATH}/Backgrounds/Aurora_Pharm.png`,
    `${GHPATH}/Backgrounds/Aurora_Room.png`,
    `${GHPATH}/Backgrounds/Aurora_SW_Streets.png`,
    `${GHPATH}/Backgrounds/Aurora_Solist_Picture.png`,
    `${GHPATH}/Backgrounds/Aurora_Uni_Outside.png`,
    `${GHPATH}/Backgrounds/Aurora_Univer.png`,
    `${GHPATH}/Backgrounds/Aurora_WM.png`,
    `${GHPATH}/Backgrounds/Aurora_Writing.png`,
    `${GHPATH}/Backgrounds/Balcony.png`,
    `${GHPATH}/Backgrounds/Ball.png`,
    `${GHPATH}/Backgrounds/Bike_Together.png`,
    `${GHPATH}/Backgrounds/Bloody_Pompeii.png`,
    `${GHPATH}/Backgrounds/Bookstore_Inside.png`,
    `${GHPATH}/Backgrounds/Bookstore_TL.png`,
    `${GHPATH}/Backgrounds/Bus.png`,
    `${GHPATH}/Backgrounds/Car.png`,
    `${GHPATH}/Backgrounds/Carete.png`,
    `${GHPATH}/Backgrounds/Chair.png`,
    `${GHPATH}/Backgrounds/Cheryl_Car.png`,
    `${GHPATH}/Backgrounds/Cheryl_Hitch.png`,
    `${GHPATH}/Backgrounds/Cheryl_House.png`,
    `${GHPATH}/Backgrounds/Cheryl_Painting.png`,
    `${GHPATH}/Backgrounds/Couch.png`,
    `${GHPATH}/Backgrounds/Dimensions.png`,
    `${GHPATH}/Backgrounds/Disco.png`,
    `${GHPATH}/Backgrounds/Doctors_office.png`,
    `${GHPATH}/Backgrounds/Door.png`,
    `${GHPATH}/Backgrounds/Film.png`,
    `${GHPATH}/Backgrounds/Firstaid_post.png`,
    `${GHPATH}/Backgrounds/Flowerfield.png`,
    `${GHPATH}/Backgrounds/Garden.png`,
    `${GHPATH}/Backgrounds/Hero_Car.png`,
    `${GHPATH}/Backgrounds/Hero_Sleeps.png`,
    `${GHPATH}/Backgrounds/Katarina_Room.png`,
    `${GHPATH}/Backgrounds/Kitchen.png`,
    `${GHPATH}/Backgrounds/Lake.png`,
    `${GHPATH}/Backgrounds/Lake_Hitch.png`,
    `${GHPATH}/Backgrounds/Lake_Taxi.png`,
    `${GHPATH}/Backgrounds/Lection.png`,
    `${GHPATH}/Backgrounds/Leon_Bike.png`,
    `${GHPATH}/Backgrounds/Livingroom.png`,
    `${GHPATH}/Backgrounds/NY.png`,
    `${GHPATH}/Backgrounds/Nonopoly.png`,
    `${GHPATH}/Backgrounds/Parents.png`,
    `${GHPATH}/Backgrounds/Phone.png`,
    `${GHPATH}/Backgrounds/Pompeii.png`,
    `${GHPATH}/Backgrounds/Pompeii_Portal.png`,
    `${GHPATH}/Backgrounds/Pompeii_Portal_Hero.png`,
    `${GHPATH}/Backgrounds/Rabbit.png`,
    `${GHPATH}/Backgrounds/Rabbit_Dragon.png`,
    `${GHPATH}/Backgrounds/Rabbit_Dragon_Caterpillar.png`,
    `${GHPATH}/Backgrounds/Rabbit_Dragon_Caterpillar_Cloud.png`,
    `${GHPATH}/Backgrounds/Rabbit_Dragon_Caterpillar_Spray.png`,
    `${GHPATH}/Backgrounds/Rabbit_Hat.png`,
    `${GHPATH}/Backgrounds/Rabbit_Hat_Knight.png`,
    `${GHPATH}/Backgrounds/Rabbit_Hat_Knight_Hatter.png`,
    `${GHPATH}/Backgrounds/Rabbit_Hat_Knight_Tree.png`,
    `${GHPATH}/Backgrounds/Room.png`,
    `${GHPATH}/Backgrounds/Room_TL.png`,
    `${GHPATH}/Backgrounds/Street.png`,
    `${GHPATH}/Backgrounds/Uni.png`,
    `${GHPATH}/Backgrounds/VaultDoor.png`,
    `${GHPATH}/Backgrounds/Waterflow.png`,
    `${GHPATH}/Covers/Aurora.png`,
    `${GHPATH}/Covers/Aurora_Part01.png`,
    `${GHPATH}/Covers/Aurora_Part02.png`,
    `${GHPATH}/Covers/Aurora_Part03.png`,
    `${GHPATH}/Covers/Aurora_Prologue.png`,
    `${GHPATH}/Covers/FP.png`,
    `${GHPATH}/Covers/FifthPart.png`,
    `${GHPATH}/Covers/FirstChapter.png`,
    `${GHPATH}/Covers/PP.png`,
    `${GHPATH}/Covers/Prologue.png`,
    `${GHPATH}/Covers/Story.png`,
    `${GHPATH}/Covers/TL.png`,
    `${GHPATH}/Items/Aurora_Mother.png`,
    `${GHPATH}/Items/Aurora_Trial_Pass.png`,
    `${GHPATH}/Items/Corkscrew.png`,
    `${GHPATH}/Items/Crisps.png`,
    `${GHPATH}/Items/Golden_Cross.png`,
    `${GHPATH}/Items/Key01.png`,
    `${GHPATH}/Items/Knife.png`,
    `${GHPATH}/Items/Money.png`,
    `${GHPATH}/Items/Sandwich.png`,
    `${GHPATH}/Items/Study.png`,
    `${GHPATH}/Items/Yogurt.png`,
    `${GHPATH}/Persons/Antagonist.png`,
    `${GHPATH}/Persons/Aurora_Arthur.png`,
    `${GHPATH}/Persons/Aurora_Aurora.png`,
    `${GHPATH}/Persons/Aurora_Dad.png`,
    `${GHPATH}/Persons/Aurora_Dalia.png`,
    `${GHPATH}/Persons/Aurora_Kaleb.png`,
    `${GHPATH}/Persons/Aurora_Yan.png`,
    `${GHPATH}/Persons/Cheryl.png`,
    `${GHPATH}/Persons/Cheryl_New.png`,
    `${GHPATH}/Persons/Dog_Dirty.png`,
    `${GHPATH}/Persons/Dog_Dry.png`,
    `${GHPATH}/Persons/Goddess.png`,
    `${GHPATH}/Persons/Hero.png`,
    `${GHPATH}/Persons/Hero_TL.png`,
    `${GHPATH}/Persons/Leon.png`,
    `${GHPATH}/Persons/Leon_New.png`,
    `${GHPATH}/Persons/Masha.png`,
    `${GHPATH}/Persons/Monster.png`,
    `${GHPATH}/Persons/Neitan.png`,
    `${GHPATH}/Persons/Neitan_New.png`,
    `${GHPATH}/Persons/Neitan_TL.png`,
    `${GHPATH}/Persons/Nicola.png`,
    `${GHPATH}/Persons/RTemiy.png`,
    `${GHPATH}/Persons/Robert.png`,
    `${GHPATH}/Persons/Robert_Pompeii.png`,
    `${GHPATH}/Persons/Scarlett.png`,
    `${GHPATH}/Persons/Scarlett_New.png`,
    `${GHPATH}/Persons/Stranger.png`,
    `${GHPATH}/Persons/Thomas.png`,

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