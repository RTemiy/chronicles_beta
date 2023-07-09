class Interface {
  constructor() {
    this._elements = {};
    this._init();
  }

  /**
   * @param {string} nameSelector
   * @param {string} name
   * @param {function=}  clickAction
   */
  add(nameSelector,name,clickAction){
    this._elements[name] = document.querySelector(nameSelector);
    this._elements[name].onclick = clickAction;
    return this._elements[name];
  }

  $(name){
    return this._elements[name];
  }

  /**
   * @param {string} elementClose Имя поля для закрытия
   * @param {string} elementOpen Имя поля для открытия
   */
  closeopen(elementClose, elementOpen){
    this.$(elementClose).style.display = 'none';
    this.$(elementOpen).style.display = 'block';
  }

  _init(){
    //Все элементы

//Дисклеймер
    this.add('#PP','PP');

    this.add('#disc','Disclaimer');

    this.add(
      '#ap',
      'AcceptPolicyButton',
      ()=>{
        localStorage.setItem('PPAccepted','1');
        window.location.reload();
      }
    );

    this.add('#StartGameLoadingProgress','StartGameLoadingProgress');

    this.add('#percent', 'StartGameLoadingPercent');


//Поле меню

    this.add('#me','MenuField');

    this.add('#continuebutton','ContinueButton',
      ()=>{
        this.closeopen('MenuField','MainField');
        Game.Sounds.resumeAll();
      });

    this.add('#lastsavebutton','LastSaveButton');

//Истории и сохранения

    this.add('#stories','StoriesField');

    this.add('#storiesbackbutton', 'StoriesBackButton',
      () => {
        this.closeopen('StoriesField','MenuField');
      });

    this.add('#saves', 'SavesButton',
      () => {
        this.closeopen('MenuField','StoriesField')
      });

    this.add('#partf','PartField');

    this.add('#cf','ChapterField');

//Настройки

    this.add('#sf', 'SettingsField');

    this.add('#settingsb', 'SettingsButton', () => {
      this.closeopen('MenuField','SettingsField')
    });

    this.add('#acptsett', 'AcceptSettingsButton', () => {
      this.closeopen('SettingsField','MenuField');
      Game.Settings.set();
    });

    this.add('#SI', 'SoundInput');

    this.add('#AHA', 'AutomatiallyHideAlert');

    this.add('#dsb', 'DeleteSavedButton', () => {
      localStorage.clear();
      location.reload();
    });

//Достижения

    this.add('#achievs', 'AchievementsField');

    this.add('#achb', 'AchievementsButton',
      () => {
        this.closeopen('MenuField','AchievementsField');
        this.$('AchievementsBackButton').onclick = () => {
          this.closeopen('AchievementsField', 'MenuField')
        }
        revealAchievs();
      });

    this.add('#achbb', 'AchievementsBackButton',
      () => {
        this.closeopen('AchievementsField','MenuField')
      });

    this.add('#achievs_immortals', 'AchievementsImmortals',
      () => {
        Achievement.showCategory('Immortals');
        revealAchievs();
      });

    this.add('#achievs_aurora', 'AchievementsAurora',
      () => {
        Achievement.showCategory('Aurora');
        revealAchievs();
      });

    this.add('#achievsamount', 'AchievementsAmount');

    //Создатели

    this.add('#creators', 'CreatorsField');

    this.add('#crb', 'CreatorsButton',
      () => {
        this.closeopen('MenuField','CreatorsField');
      });

    this.add('#cbb', 'CreatorsBackButton',
      () => {
        this.closeopen('CreatorsField','MenuField')
      });

    this.add('#RTemiy', 'RTemiyHiddenButton',
      () => {
        this.$('ConsoleField').style.visibility='visible';
        Game.Achievements.Dev.unlock();
        uploadProgress();
      });

    //Фавориты

    this.add('#favours', 'FavouritesField');

    this.add('#favouritesb', 'MenuFavouritesButton', () => {
      Game.Favourites.addAllPersons();
      this.closeopen('MenuField','FavouritesField');
    });

    this.add('#favbb', 'FavouritesBackButton', () => {
      this.closeopen('FavouritesField','MenuField');
    });

    this.add('#favcoins', 'FavouriteCoins');
    this.add('#favavatar', 'FavouriteAvatarContainer');
    this.add('#favicons', 'FavouritesIcons');
    this.add('#favlevel', 'FavouriteLevel');
    this.add('.favavatarimageborder', 'FavouriteBorder');
    this.add('#favleveltext', 'FavouriteLevelText');
    this.add('#favlevelprogress', 'FavouriteLevelProgress');
    this.add('#favlevelprogressbar', 'FavouriteLevelProgressBar');
    this.add('#favavatarimage', 'FavouritesAvatar');
    this.add('#favavatarname', 'FavouriteName');
    this.add('#favtrofy', 'FavouriteTrophies');
    this.add('#favtrophymes', 'FavouriteTrophiesMessage');
    this.add('#favtrophymesimg', 'FavouriteTrophiesImage');
    this.add('#favtrophymestitle', 'FavouriteTrophiesTitle');
    this.add('#favtrophymestext', 'FavouriteTrophiesText');
    this.add('#favtrophymesbutton', 'FavouriteTrophiesButton');

    // Загрузочный экран

    this.add('#ls', 'LoadingScreen');

    this.add('#loadback', 'LoadingBack');

    this.add('#loadbackback', 'LoadingBackBack');

    this.add('#loadtip', 'LoadingTip');

    this.add('#loadtext', 'LoadingText');

//Основное поле игры (слайд)

    this.add('#mf', 'MainField');

    this.add('#lsb', 'LastSlideButton',
      () => {
        Game.message(Game.LastSlide.text(),true)
      });

//Иконки инвентаря

    this.add('#goinv', 'OpenInventoryButton',
      () => {
        Achievement.showCategory(localStorage.getItem('LastSave_Design'));
        this.$('InventoryField').style.display = "flex";
        this.$('InventoryField').setAttribute('class','fade-in');
        this.$('OpenInventoryButton').setAttribute('class','');
      });

    this.add('#goach', 'GoAchievementsButton',
      () => {
        this.closeopen('MainField','AchievementsField');
        this.$('InventoryField').setAttribute('class','fade-out');
        this.$('AchievementsBackButton').onclick = () => {
          this.closeopen('AchievementsField', 'MainField');
        }
        revealAchievs();
      });

    this.add('#leaveinv', 'LeaveInventoryButton',
      () => {
        this.$('InventoryField').setAttribute('class','fade-out');
        setTimeout(()=>{
          this.$('InventoryField').style.display = "none";
        },1000)
      });

    this.add('#inv_mes', 'InventoryMessage');

    this.add('#message', 'MessageField');

    this.add('#messagetext', 'MessageText');

    this.add('#pf', 'PictureField');

    this.add('#brf', 'BorderField');

    this.add('#tf', 'TextField');

    this.add('#timerP', 'TimerProgressBar');

    this.add('#bf', 'ButtonField');

//Инвентарь

    this.add('#if', 'InventoryField');

    this.add('#inv', 'Inventory');

    this.add('#atttable', 'AttitudeTableField');

    this.add('#infoi', 'InfoPicture');

    this.add('#infop', 'InfoText');

    this.add('#infot', 'InfoArticle');

    this.add('#backmb', 'BackToMenuButton',
      () => {
        this.closeopen('MainField','MenuField');
        this.$('ContinueButton').style.display="block";
        this.$('InventoryField').setAttribute(`class`,`fade-out`);
        Game.Sounds.pauseAll();
        this.$('LastSaveButton').style.display='none';
      });

//Dev

    this.add('#consolefield', 'ConsoleField');

    this.add('#console', 'Console');

//Enter on enter

    this.$('Console').addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        eval('Game.' + Game.Interface.$('Console').value);
        Game.Interface.$('Console').value = '';
      }
    });
  }


}/** Класс достижения*/
class Achievement {

    /**
     * @param {string} title Название достижения
     * @param {string} text Описание достижения
     * @param {string} picture Картинка достижения
     * @param {string} story Код истории достижения
     */
    constructor({title,text,picture,story}) {
        this._title = title;
        this._text = '<hr>' + text+ '<p>';
        this._picture = 'pictures/' + picture + '.png';
        this.unlocked = 0;
        this.story = story;
        this._init();
    }

    /** Показываем определенную категорию достижений
     * @param {string} Story Код истории
     */
    static showCategory (Story){
        let amount = 0;
        let completed = 0;
        for (let prop in Game.Achievements) {
            if(Game.Achievements[prop].story == Story) {
                amount++;
                Game.Achievements[prop].show();
                if(Game.Achievements[prop].unlocked>=1)completed++;
                Game.Interface.$('AchievementsAmount').innerHTML = 'Получено достижений ' + completed + '/' + amount;
            }
            else Game.Achievements[prop].hide();
        }
    }

    /** Создаём и добавляем элементы на страницу достижений */
    _init() {
        this._a = document.createElement('achievement');
        this._a.classList.add('reveal');
        this._b = document.createElement('img');
        this._b.src = this._picture
        this._c = document.createElement('ATitle');
        this._c.innerHTML = this._title;
        this._d = document.createElement('AText');
        this._d.innerHTML = this._text;
        this._e = document.createElement('img');
        this._e.src = 'pictures/Items/Lock.png';
        this._e.id= 'lock';
        Game.Interface.$('AchievementsField').appendChild(this._a);
        this._a.appendChild(this._b);
        this._a.appendChild(this._e);
        this._a.appendChild(this._c);
        this._a.appendChild(this._d);
    }

    /** Открываем достижение - выводим сообщение, меняем отображение и сохраняем прогресс */
    unlock() {
        if(this.unlocked!=1){
            Game.inventoryMessage('🔓 '+ this._title);
            Game.sendData('получает достижение: '+ this._title);
        }
        this.unlocked = 1;
        this._a.classList.add('activeachievement');
        this._b.style.display= 'grid';
        this._e.style.display = 'none';
        Game.Progress.saveAchievements();
    }

    /** Визуально прячем элемент достижения */
    show(){
        this._a.classList.add('hide');
        this._a.style.display = 'grid';
        setTimeout(()=>{
            this._a.classList.add('show');
            this._a.classList.remove('hide');
            },200);
    }

    /** Визуально показываем элемент достижения */
    hide(){
        this._a.style.display = 'none';
    }

}class Settings {
  constructor() {
    this.automatiallyHideAlert = true;
    this._volume = 0.7;
    this.Zoom = 100;
  }

  /** Устанавливаем все настройки */
  set () {
    this.setVolume(Game.Interface.$('SoundInput').value);
    this.automatiallyHideAlert = Game.Interface.$('AutomatiallyHideAlert').checked;
    document.body.style.zoom = Game.Settings.Zoom + "%";

    localStorage.setItem('Settings.Volume', this._volume);
    localStorage.setItem('Settings.AHA', this.automatiallyHideAlert);
    localStorage.setItem('Settings.Zoom', this.Zoom);
  }

  /** Устанавливаем настройки звука */
  setVolume (a) {
    this._volume = a;
    Game.Sounds.NS.volume = this._volume;
    Game.Sounds.Ambient.volume = this._volume;
    Game.Sounds.Music.volume = this._volume;
  }

  getVolume (){
    return this._volume;
  }

  /** Загружаем настройки */
  load () {
    localStorage.getItem('Settings.AHA' == 'true') ?
      Game.Interface.$('AutomatiallyHideAlert').checked = true
      :
      Game.Interface.$('AutomatiallyHideAlert').checked = false;
    Game.Interface.$('SoundInput').value = localStorage.getItem('Settings.Volume');
    this.set();
  }
}/** Основные звуки и музыка*/
class Sounds {
  constructor() {
    this.Ambient = new Audio("./sounds/Silence.mp3");
    this.Music = new Audio("./sounds/Silence.mp3");
    this.NS = new Audio("./sounds/noti.mp3");
    this.Cheers = new Audio("./sounds/Completed.mp3");
  }

  /** Включаем новую музыку
   * @param {string} type Тип музыки
   * @param {string} name Название звука
   */
  play(type, name){
    localStorage.setItem('LastSave_MusicName', name);
    if (Game.Settings.getVolume() != 0) {
      let x = setInterval(()=>{this[type].volume-=0.1},100);
      setTimeout(()=>{clearInterval(x)},700);
    }
    setTimeout(()=>{
      this[type].pause();
      this[type] = new Audio('sounds/' + name + '.mp3');
      this[type].currentTime = 0;
      this[type].loop = true;
      this[type].volume = Game.Settings.getVolume();
      this[type].play();
    },800);
  }

  /** Останавливаем конкретный звук
   * @param {string} type Тип музыки
   */
  stop (type) {
    this[type].currentTime = 0;
    this[type].pause();
    this[type] = new Audio('sounds/Silence.mp3');
  }

  /** Ставим на паузу все звуки */
  pauseAll () {
    this.Ambient.pause();
    this.Music.pause();
  }

  /** Воспроизводим все звуки */
  resumeAll () {
    this.Ambient.play();
    this.Music.play();
  }
}class Trophies {
  constructor(...trophies) {
    this._trophies = trophies;
  }

  renderTrophies(){
    Game.Interface.$('FavouriteTrophies').innerText = '';
    this._trophies.forEach(trophy => {
      let el = document.createElement('div');
      el.classList.add('favtrophyel');
      let img = document.createElement('img');
      if (trophy.isUnlocked() === false){
        img.src = './pictures/Items/Lock.png';
      }
      else{
        img.src = './pictures/' + trophy.picture + '.png';
      }

      el.onclick = () => {
        Game.Interface.$('FavouriteTrophiesMessage').classList.remove('trophymeshide');
        Game.Interface.$('FavouriteTrophiesMessage').classList.add('trophymesshow');
        Game.Interface.$('FavouriteTrophiesImage').src = img.src;
        Game.Interface.$('FavouriteTrophiesTitle').innerText = trophy.title;
        Game.Interface.$('FavouriteTrophiesText').innerText = trophy.text;
        if (trophy.isUnlocked() === true && trophy.action !== undefined) Game.Interface.$('FavouriteTrophiesButton').style.display = 'block';
        else Game.Interface.$('FavouriteTrophiesButton').style.display = 'none';

        setTimeout(()=>{
          Game.Interface.$('FavouriteTrophiesMessage').classList.add('trophymeshide');
          Game.Interface.$('FavouriteTrophiesMessage').classList.remove('trophymesshow');
        },3000);
      }

      el.append(img);
      Game.Interface.$('FavouriteTrophies').append(el);
    });
  }

  getTrophy(name){
    return this._trophies.find((el) => {
      if(el.name === name) return el;
    });
  }

  unlock(name){
    localStorage.setItem('Trophy_' + this.getTrophy(name).name, '1');
  }
}/** Менеджер меню фаворитов*/
class Favourites{
  constructor() {
    this._coins = 0;
    this._personSelectedElement = {};
    this._personSelectedName = '';
    this._currentName = '';
    this.lastGotCoins = {};
    this._maxLevel = 4;
  }

  /** Добавляем всех персонажей */
  addAllPersons(){
    Game.Interface.$('FavouritesIcons').textContent = '';
    for(let item in Game.Stats){
      if (Game.Stats[item] instanceof Person && Game.Stats[item].isUnlocked() === true){
        this._addPerson(Game.Stats[item]._picture, item);
      }
    }

    for(let item in Game.Stats){
      if (Game.Stats[item] instanceof Person && Game.Stats[item].isUnlocked() !== undefined && Game.Stats[item].isUnlocked() !== true){
        this._addPerson(Game.Stats[item]._picture, item, true);
      }
    }

    this._personSelectedElement = Game.Interface.$('FavouritesIcons').firstChild;
    if(Game.Interface.$('FavouritesIcons').firstChild.src.includes('Lock.png')) {
      Game.Interface.$('MenuFavouritesButton').style.color = 'red';
      setTimeout(()=>{Game.Interface.closeopen('FavouritesField','MenuField');},100);
    }
    else {
      Game.Interface.$('MenuFavouritesButton').style.color = '';
      Game.Interface.$('FavouritesIcons').firstChild.click();
    }
    this._setCoinsAmount();

  }

  /**  Рендерим кол-во монет */
  _setCoinsAmount(){
    Game.Interface.$('FavouriteCoins').innerText = '🪙 ' + this._coins;
  }

  /** Добавляем персонажа*/
  _addPerson(picture,name, locked){
    let objName = name;
    let el = document.createElement('img');
    if (!locked){
      el.src = `./pictures/${picture}.png`;
      el.classList.add('favico');
      el.onclick = el =>{
        this._selectPerson(el.target,objName);
      }
    }
    else{
      el.src = `./pictures/Items/Lock.png`;
      el.classList.add('favicolocked');
    }

    Game.Interface.$('FavouritesIcons').appendChild(el);
  }

  /** Выбор персонажп*/
  _selectPerson(element, name){
    this._currentName = name;
    this._renderPersonSelection(element)
  }

  _renderPersonSelection(element){
    this._personSelectedElement.classList.remove('favico_selected');
    this._personSelectedElement = element;
    this._personSelectedElement.classList.add('favico_selected');
    Game.Interface.$('FavouriteLevelText').classList.add('emptyavatar');
    Game.Interface.$('FavouritesAvatar').classList.add('emptyavatar');
    Array.from(Game.Interface.$('FavouriteTrophies').children).forEach(el => {el.classList.add('emptyavatar');});
    Game.Interface.$('FavouriteName').style.color = 'transparent';
    setTimeout(()=>{
      Game.Interface.$('FavouritesAvatar').src = element.src;
      Game.Interface.$('FavouriteName').innerText = Game.Stats[this._currentName]._name;
      this._setLevel();
      Game.Stats[this._currentName].trophies.renderTrophies();

      Game.Interface.$('FavouriteLevelText').classList.remove('emptyavatar');
      Game.Interface.$('FavouritesAvatar').classList.remove('emptyavatar');
      Array.from(Game.Interface.$('FavouriteTrophies').children).forEach(el => {el.classList.remove('emptyavatar');});
      Game.Interface.$('FavouriteName').style.color = '';
    },500);
    Game.Interface.$('FavouriteLevel').onclick = () =>{
      this._addScore();
    }
  }

  /** Покупка прогрессии за монету*/
  _addScore(){
    if(this._coins>=1 && this._countLevel() <= this._maxLevel) {
      this._coins-=1;
      Game.Stats[this._currentName].score++;
      this._setLevel();
      this._animate();
      this._setCoinsAmount();
      Game.Stats[this._currentName].trophies.renderTrophies();
      Game.Progress.saveFavourites();
    }
    else{
      Game.Interface.$('FavouriteCoins').style.color='red';
      Game.Interface.$('FavouriteLevelText').style.color='red';
      setTimeout(()=>{
        Game.Interface.$('FavouriteCoins').style.color='';
        Game.Interface.$('FavouriteLevelText').style.color='';
      },500);
    }
  }

  /** Установить цвет при определенном уровне*/
  _setLevelColor(){
    let level = this._countLevel(this._currentName);
    if(level>=1) {
      Game.Interface.$('FavouriteLevel').style.backgroundColor = '';
      Game.Interface.$('FavouriteLevel').style.borderColor = '';
    }
    if(level>=2) {
      Game.Interface.$('FavouriteLevel').style.backgroundColor = 'green';
      Game.Interface.$('FavouriteLevel').style.borderColor = 'DarkOliveGreen';
    }

    if(level>=3) {
      Game.Interface.$('FavouriteLevel').style.backgroundColor = 'Cyan';
      Game.Interface.$('FavouriteLevel').style.borderColor = 'DarkBlue';
    }

    if(level>=4) {
      Game.Interface.$('FavouriteLevel').style.backgroundColor = 'DarkOrchid';
      Game.Interface.$('FavouriteLevel').style.borderColor = 'DarkMagenta';
    }

    if(level>=5) {
      Game.Interface.$('FavouriteLevel').style.backgroundColor = 'Fuchsia';
      Game.Interface.$('FavouriteLevel').style.borderColor = 'black';
      Game.Interface.$('FavouriteBorder').classList.add('favfulllevelborder');
    }
    else{
      Game.Interface.$('FavouriteBorder').classList.remove('favfulllevelborder');
    }
  }

  _animate(){
    this._animateCoin();
    setTimeout(()=>{
      this._animateProgressBarColor();
    },1500);
  }

  /** Анимация прокачки прогрессии*/
  _animateProgressBarColor(){
    Game.Interface.$('FavouriteLevelProgressBar').style.backgroundColor='yellow';
    setTimeout(()=>{
      Game.Interface.$('FavouriteLevelProgressBar').style.backgroundColor='';
    },500);
  }

  _animateCoin(){
    let c = document.createElement('div');
    c.id = 'coinanim';
    c.innerText = '🪙';
    c.classList.add('getcoin');
    Game.Interface.$('FavouritesField').prepend(c);
    setTimeout(()=> {c.remove()},2000);
  }

  /** Установить прогрессию*/
  _setProgressBarScore(amount=0){
      Game.Interface.$('FavouriteLevelProgressBar').style.width =  this._currentProgress() + amount + '%';
  }

  /** Установить уровень*/
  _setLevel(){
    this._setLevelColor();
    Game.Interface.$('FavouriteLevelText').innerText = this._countLevel();
    if(this._currentProgress()>=80)this._setProgressBarScore(20);
    else this._setProgressBarScore();

  }

  /** Получает процент прогрессии*/
  _currentProgress(){
    return Game.Stats[this._currentName].score % (5 * this._countLevel()) / 0.05;
  }

  /** Считает уровень*/
  _countLevel(){
    return Math.floor(Game.Stats[this._currentName].score / 5);
  }

  /** Проверка на получение монеты*/
  checkDates(){
    let today = new Date();
    let lastDate = new Date (this.lastGotCoins)
    if(this._daysBetween(lastDate,today) >= 1){
      this._coins++;
      this._setCoinsAmount();
      this.lastGotCoins = today;
      Game.Progress.saveFavourites();
    }
  }

  /** Считает разницу дней*/
  _daysBetween(first, second) {

    //  Части дн=-ей без минут и секунд
    let one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
    let two = new Date(second.getFullYear(), second.getMonth(), second.getDate());

    // Считаем милисекунды
    let millisecondsPerDay = 1000 * 60 * 60 * 24;
    let millisBetween = two.getTime() - one.getTime();
    let days = millisBetween / millisecondsPerDay;

    // Округляем
    return Math.round(days);
  }

  getLevel(name){
    return Math.floor(Game.Stats[name].score / 5);
  }
}
/** Класс "отношений" (переменных) на которые могут повлият игроки */

class Stat {
    /**
     * @param {string} name Имя или название
     * @param {number=} attitude Начальное значение
     * @param {string=} title Краткое описание
     * @param {string=} text Полное описание
     * @param {string=} type Тип
     * @param {string=} picture Картинка
     * @param {boolean=} show Показать изначально в нивентаре?
     * @param {string} story История к которой привязан стат
     * @param {function=} isUnlocked История к которой привязан стат
     * @param {Trophies=} trophies Трофеи для фаворитов
     * @param {function=} tapAction Событие при использовании предмета
     */
    constructor({
                    name,
                    attitude,
                    title,
                    text,
                    type,
                    picture,
                    show,
                    story,
                    isUnlocked,
                    trophies,
                    tapAction
                }) {
        this._name = name || '';
        this.attitude = attitude || 0;
        this._title = title || '';
        this._text = text || '';
        this._picture = picture || '';
        this._show = show || false;
        this._story = story;
        this._tapped = false;
        this._tapAction = tapAction || undefined;
        this.score = 5;
        this.isUnlocked = isUnlocked || function () {return undefined};
        this.trophies = trophies || undefined;
        this._createTable();
    }

    static hideAll(){
        for(let obj in Game.Stats){
            Game.Stats[obj].hide();
            Game.Stats[obj]._show = false;
        }
        Game.Interface.$('InfoText').innerHTML='';
        Game.Interface.$('InfoArticle').innerHTML='';
        Game.Interface.$('InfoPicture').src=ROOTPATH +'pictures/Interface/Unknown.png';
        Game.Interface.$('MessageField').setAttribute('class', 'hide');
        Game.Interface.$('MessageField').style.display = 'none';
    }

    /** Добавляем значение. Если добавили значение к "отношению" и если это не выбор, то он появляется в инвентаре, если предмет, то если равен нулю, то исчезает
     *  @param {number} v Значение
     */
    add(v) {
        Game.Interface.$('InfoPicture').setAttribute('class', 'hide');
        Game.Interface.$('InfoText').setAttribute('class','hide');
        Game.Interface.$('InfoArticle').setAttribute('class','hide');
        this._show = true;
        this.attitude += v;
    }

    /** Устанавливает конкретное значение
     * @param {number} a Значение
     */
    set(a) {
        this.attitude = a;
        this.add(0);
    }

    /** Получаем значение */
    get get() {
        return (this.attitude);
    }

    /** Создаём и добавляем элементы в инвентарь */
    _createTable() {
        if (this._picture != '') {
            this._container = document.createElement('cont');
            this._container.id = 'atttablecell';
            this._container.style.display = 'none';
            this._textinfo = document.createElement('te');
            this._cell = document.createElement('img');
            this._container.appendChild(this._cell);
            this._container.appendChild(this._textinfo);
            this._cell.src = ROOTPATH+'pictures/' + this._picture + '.png';
            this._container.addEventListener('click', () => {
                    Game.Interface.$('InfoPicture').setAttribute('class', 'typewriter-out');
                    Game.Interface.$('InfoText').setAttribute('class','typewriter-out');
                    Game.Interface.$('InfoArticle').setAttribute('class','typewriter-out');
                    setTimeout(() => {
                        Game.Interface.$('InfoPicture').src = ROOTPATH + 'pictures/' + this._picture + '.png';
                        Game.Interface.$('InfoPicture').setAttribute('class', 'typewriter');
                        Game.Interface.$('InfoText').setAttribute('class','typewriter');
                        Game.Interface.$('InfoArticle').setAttribute('class','typewriter');
                        Game.Interface.$('InfoText').innerHTML = this._title;
                        Game.Interface.$('InfoArticle').innerHTML = '<hr>' + this._text;
                        }, 300);
            });
            this._tapAction ? this._container.addEventListener('click', () => {this._handleDoubleTap()}) : {}
        }
    }

    _handleDoubleTap(){
        if(this._tapped) this._tapAction();
        this._tapped = true;
        setTimeout(()=>{this._tapped = false},600);
    }

    /** Прячем элемент */
    hide() {
        try {
            this.attitude = 0;
            this._container.style.display = 'none';
        }
        catch (error) {}
    }
}class Choice extends Stat {
  add(v) {
    super.add(v);
    Game.sendData('выбирает '+this._name+': '+this.attitude);
  }
}class Item extends Stat {

  add(v) {
    super.add(v);
    this._container.style.display = 'inline-block';
    Game.Interface.$('OpenInventoryButton').setAttribute('class', 'blink');
    this._setAmount();
    if (this.attitude <= 0) this._container.style.display = 'none';
  }

  _createTable() {
    super._createTable();
    this._cell.id = 'itemtablecellpict';
    Game.Interface.$('Inventory').appendChild(this._container);
  }

  /** Обновляем количество */
  _setAmount() {
    if(this.attitude>=2) {
      this._textinfo.innerHTML = '<amount>' + this.attitude + '</amount><a>' + this._name;
    }
    else{
      this._textinfo.innerHTML = '<amount>' + '</amount><a>' + this._name;
    }
  }

}class Person extends Stat {

  add(v) {
    super.add(v);
    this._container.style.display = 'inline-block';
    Game.Interface.$('OpenInventoryButton').setAttribute('class', 'blink');
    this._setEmoji();
  }

  _createTable() {
    super._createTable();
    this._cell.id = 'atttablecellpict';
    Game.Interface.$('AttitudeTableField').appendChild(this._container);
  }

  /** Устанавливаем эмодзи рядом с иконкой */
  _setEmoji() {
    /*this._textinfo.innerHTML = '<emoji>'+ this.attitude + '</emoji><a>' + this._name*/
    this.attitude <= -1 ? this._textinfo.innerHTML = '<emoji>🙁</emoji><a>' + this._name :

      this.attitude == 0 ? this._textinfo.innerHTML = '<emoji>😶</emoji><a>' + this._name :

        this.attitude >= 10 ? this._textinfo.innerHTML = '<emoji>🥰</emoji><a>' + this._name :

          this.attitude >= 6 ? this._textinfo.innerHTML = '<emoji>😏</emoji><a>' + this._name :

            this.attitude >= 1 ? this._textinfo.innerHTML = '<emoji>😌</emoji><a>' + this._name :

              {}
  }

}class Design {
  /**
   * Изменить оформление
   * @param {string} Background Фон слайдов
   * @param {string} Border Рамка для картинки слайда
   * @param {string} Color Цвет шрифта
   * @param {string} Font Семейство шрифта
   * @param {string} Stroke Обводка шрифта
   */
    _changeInterface (Background, Border, Color, Font, Stroke){
    Game.Interface.$('MainField').style.backgroundImage = 'url(pictures/Interface/'+Background+'.png)';
    Game.Interface.$('BorderField').src = 'pictures/Interface/'+Border+'.png';
    let Root = document.querySelector(':root');
    Root.style.setProperty('--simplecolor', Color);
    Root.style.setProperty('--font', Font);
    Root.style.setProperty('--stroke', Stroke);
  }

  /** Изменить стиль кнопок
   *
   * @param {string} chapter Название Истории
   */
  change (chapter){
    localStorage.setItem('LastSave_Design', chapter);
    switch (chapter) {

      default:
        this._changeInterface(
          'back',
          'border',
          '#f2daffed',
          '"Times New Roman", Times, serif',
          '0'
        );
        this._styleButtons(
          'margin-top: 0',
          'background-image: url("./pictures/Interface/button.png"); border: 0; box-shadow: 0;'
        );
        break;

      case 'Aurora':
        this._changeInterface(
          'A_back',
          'A_border',
          'white',
          'Century Gothic Regular',
          '0'
        );
        this._styleButtons(
          'margin-top: 0',
          'background-image: url("./pictures/Interface/button.png"); border: 0; box-shadow: 0;'
        );
        break;

      case 'AEP':
        this._changeInterface(
          'R_back',
          'R_border',
          'white',
          'Courier New',
          '3px rgba(0, 208, 255, 0.2)'
        );
        this._styleButtons(
          'margin-top: 20px',
          'background-image: none; border: 1px blue solid; box-shadow: 0 0 5px blue, inset 0 0 5px blue'
        );
        break;
    }
  }

  /** Изменить стиль кнопок
   * @param {string} buttonfieldastyle Стиль поля для кнопок
   * @param {string} buttonsstyle Стиль каждой кнопки
   */
  _styleButtons (buttonfieldastyle, buttonsstyle) {
    let Buttons = document.querySelector('#bf');
    Buttons.style = buttonfieldastyle;
    Buttons.childNodes.forEach(function (element) {
      element.style = buttonsstyle;
    });
  }
}class Effects {
  constructor() {

    /** Эффект вспышки */
    this.Flash = function () {
      Game.Interface.$('MainField').classList.add('flash');
      setTimeout(() => {
        Game.Interface.$('MainField').classList.remove('flash');
      }, 5000);
    }

    /** Эффект диско */
    this.Disco = function () {
      Game.Interface.$('PictureField').classList.add('disco');
    }

    /** Эффект диско выключить */
    this.Disco.Stop = function () {
      Game.Interface.$('PictureField').classList.remove('disco');
    }

    /** Эффект понурости */
    this.Gray = function () {
      Game.Interface.$('MainField').classList.add( 'sad');
    }

    /** Эффект понурости выключить */
    this.Gray.Stop = function () {
      Game.Interface.$('MainField').classList.remove('sad');
    }

    /** Эффект яркости */
    this.Sun = function () {
      Game.Interface.$('MainField').classList.add('sun');
    }

    /** Эффект яркости выключить */
    this.Sun.Stop = function () {
      Game.Interface.$('MainField').classList.remove('sun');
    }


    /** Эффект воспоминаний */
    this.Mem = function() {
      Game.Interface.$('MainField').classList.add('memory');
    }

    /** Эффект воспоминаний выключить */
    this.Mem.Stop = function (){
      Game.Interface.$('MainField').classList.remove('memory');
    }

    /** Эффект пьяности */
    this.Drunk = function () {
      Game.Interface.$('MainField').classList.add('drunk');
    }

    /** Эффект пьяности выключить */
    this.Drunk.Stop = function () {
      Game.Interface.$('MainField').classList.remove('drunk');
    }

    /** Выключить эффекты */
    this.DisableAll = function () {
      this.Gray.Stop();
      this.Disco.Stop();
      this.Mem.Stop();
      this.Sun.Stop()
    }

  }

}class Progress {
  /**
   * Сохранение прогресса
   * @param {string} code Код сохранения части
   */
  save (code) {
    if(Game.PlayerName!=undefined || Game.PlayerName!=''){
      localStorage.setItem('PlayerName', Game.PlayerName);
    }
    localStorage.setItem(code+'_Played', '1');

    let story = localStorage.getItem('LastSave_Design');
    for (let prop in Game.Stats) {
      if (Game.Stats[prop]._story == story) {
        localStorage.setItem(code + '_' + prop + "_show", Game.Stats[prop]._show);
        localStorage.setItem(code + '_' + prop, Game.Stats[prop].attitude);
      }
    }
  }

  /**
   * Загрузка прогресса
   * @param {string} code Код загрузки части
   */
  load (code) {
    Stat.hideAll();
    let story = localStorage.getItem('LastSave_Design');
    if(localStorage.getItem('PlayerName')!='' || localStorage.getItem('PlayerName')!=null){
      Game.PlayerName = localStorage.getItem('PlayerName');
    }
    for (let prop in Game.Stats) {
      if (Game.Stats[prop]._story == story) {
        if (localStorage.getItem(code + "_" + prop + '_show') == 'true') Game.Stats[prop].set(parseInt(localStorage.getItem(code + "_" + prop)));
      }
    }
  }

  /** Сохраниение достижений*/
  saveAchievements () {
    for (let prop in Game.Achievements) {
      localStorage.setItem('Achievement_' + prop, Game.Achievements[prop].unlocked);
    }
  }

  /** Загрузка достижений*/
  loadAchievements () {
    for (let prop in Game.Achievements) {
      Game.AllAchievs++;
      if (localStorage.getItem('Achievement_' + prop) == '1') {
        Game.Achievements[prop].unlocked = 1;
      }
    }
    for (let prop in Game.Achievements) {
      if (Game.Achievements[prop].unlocked == 1) Game.Achievements[prop].unlock();
    }
  }

  saveFavourites(){
    for (let prop in Game.Stats) {
      if (Game.Stats[prop] instanceof Person) {
        localStorage.setItem('Fav_' + prop + "_score", Game.Stats[prop].score);
      }
    }
    localStorage.setItem('Fav_coins', Game.Favourites._coins);
    localStorage.setItem('Fav_coinsDate', Game.Favourites.lastGotCoins);
  }

  loadFavourites(){
    for (let prop in Game.Stats) {
      if (Game.Stats[prop] instanceof Person) {
        if(localStorage.getItem('Fav_' + prop + "_score") === null) Game.Stats[prop].score = 5;
          else Game.Stats[prop].score = parseInt(localStorage.getItem('Fav_' + prop + "_score"));
      }
    }
    localStorage.getItem('Fav_coins') === null ? Game.Favourites._coins = 0 : Game.Favourites._coins = parseInt(localStorage.getItem('Fav_coins'));
    localStorage.getItem('Fav_coinsDate') === null ? Game.Favourites.lastGotCoins = new Date() : Game.Favourites.lastGotCoins = localStorage.getItem('Fav_coinsDate');
  }
}

class Last_Save {
  save (scene){
    Game.Progress.save('LastSave');
    localStorage.setItem('LastSave'+'_Played', '1');
    localStorage.setItem('LastSave_SlideNumber', scene.number);
    localStorage.setItem('LastSave_SlidePart', scene.part);
  }

  load (){
    Game.Progress.load('LastSave');
    Game.Sounds.play('Music', localStorage.getItem('LastSave_MusicName'));
    Game.Design.change(localStorage.getItem('LastSave_Design'));
    Game.LoadScreen(localStorage.getItem('LastSave_LS'));
    Game.Scenes[localStorage.getItem('LastSave_SlidePart')][localStorage.getItem('LastSave_SlideNumber')].begin();
  }

  checkLastLoad (){
    if (localStorage.getItem('LastSave' + '_Played')=='1'){
      Game.Interface.$('LastSaveButton').onclick =  () =>{
        this.load();
        Game.Interface.closeopen('MenuField','MainField');
        Game.Interface.$('LastSaveButton').style.display='none';
      }
    }
    else{
      Game.Interface.$('LastSaveButton').style.display='none';
    }
  }
}class Last_Slide {
  constructor() {
    this.slides = [];
  }

  /** @param {Scene} scene Объект сцены */
  add (scene) {
    this.slides.push(scene);
  }

  text () {
    return this.slides[this.slides.length-2].text;
  }

  background () {
    if(this.slides.length>2) {
      return this.slides[this.slides.length - 2].background;
    }
  }

  refresh(){
    this.slides = [];
  }
}/** Истории в меню */
class Story {

    /** @param {Object} values Передаём картинку и сразу же устанавливаем главы
     * @param {String} values.pict Обложка истории
     * @param {Array} values.chapters Главы истории
     */
    constructor(values) {
        this.pict = values.pict;
        this.chapters = values.chapters;
        this.init();
    }

    /** Создаём и добавляем элементы частей */
    init(){
        this.story = document.createElement('part');
        this.img = document.createElement('img');
        this.img.src = 'pictures/' + this.pict + '.png';
        this.story.onclick = () => {
            Game.Interface.$('ChapterField').innerHTML = '';
            this.buildChapters()
        };
        Game.Interface.$('StoriesField').appendChild(this.story);
        this.story.appendChild(this.img);
    }

    /** Создаём и добавляем элементы глав */
    buildChapters(){
        this.backbutton = document.createElement('button');
        this.backbutton.onclick = () => {
            Game.Interface.closeopen('ChapterField','StoriesField');
            Game.Interface.$('ChapterField').innerHTML = '';
            this.backbutton.remove();
        }
        Game.Interface.$('ChapterField').appendChild(this.backbutton);
        for(let x=0;x<this.chapters.length;x++){
            this.chapters[x].init();
            Game.Interface.closeopen('StoriesField','ChapterField');
        }
    }
}

class Chapter {

    /** @param {Object} values Передаём название главы, картинку и сразу же части
     * @param {String} values.name  Название главы
     * @param {String} values.pict Обложка главы
     * @param {Array} values.parts Части главы
     */
    constructor(values) {
        this.name = values.name;
        this.pict = values.pict;
        this.parts = values.parts;
    }

    /** Создаём и добавляем элементы глав */
    init() {
        this.chapter = document.createElement('part');
        this.img = document.createElement('img');
        this.img.src = 'pictures/' + this.pict + '.png';
        this.button = document.createElement('button');
        this.button.innerText = this.name;
        this.chapter.onclick = () => { this.buildParts();};
        Game.Interface.$('ChapterField').appendChild(this.chapter);
        this.chapter.appendChild(this.img);
        this.chapter.appendChild(this.button);
    }

    /** Создаём и добавляем элементы частей */
    buildParts() {
        this.backbutton = document.createElement('button');
        this.backbutton.onclick = () => {
            Game.Interface.closeopen('PartField','ChapterField');
            Game.Interface.$('PartField').innerHTML = '';
            this.backbutton.remove();
        }
        Game.Interface.$('PartField').appendChild(this.backbutton);
        Game.Interface.closeopen('ChapterField','PartField');
        for (let x = 0; x < this.parts.length; x++) {
            this.parts[x].part = document.createElement('part');
            this.parts[x].img = document.createElement('img');
            this.parts[x].img.src = ROOTPATH + 'pictures/' + this.parts[x].pict + '.png';
            this.parts[x].button = document.createElement('button');
            this.parts[x].button.innerText = this.parts[x].name;
            if (localStorage.getItem(this.parts[x].code+'_Played')=='1' || localStorage.getItem(this.parts[x].code+'_God')!=null || x===0) {
                this.parts[x].part.onclick = this.parts[x].event;
            }
            else{
                this.parts[x].button.style = 'filter: saturate(100%);';
                this.parts[x].img.style = 'filter: saturate(0%);';
            }
            Game.Interface.$('PartField').appendChild(this.parts[x].part);
            this.parts[x].part.appendChild(this.parts[x].img);
            this.parts[x].part.appendChild(this.parts[x].button);
        }
    }
}

/** Класс части */

class Part {

    /**
     * @param {object} values Передаём имя, картинку, код части и доп настройки
     * @param {string} values.name  Название части
     * @param {string} values.pict  Обложка части
     * @param {string} values.code  Кодовое название части
     * @param {function} values.event  Дополнительные параметры при загрузке главы
     */
    constructor(values) {
        this.name = values.name;
        this.pict = values.pict;
        this.code = values.code;
        this.event = values.event;
    }
}/** Класс сцены - текст, картинка, текст кнопок, действия кнопок, активность кнопок, дополнительное действие */
class Scene {
    /**
     *
     * @param  {string} text Текст слайда
     *
     * @param  {string[]=} buttontext Текст кнопок
     *
     * @param  {function[]} buttonaction Действия кнопок
     *
     * @param  {boolean[]=} buttonactive Активность кнопок
     *
     * @param  {string=} background Картинка слайда
     *
     * @param  {function=} condition Дополнительные действия при включении слайда
     *
     */
    constructor({text,buttontext,buttonaction,buttonactive,background,condition}) {
        this.text = text || '';
        this.buttontext = buttontext;
        this.buttonaction = buttonaction;
        this.buttonactive = buttonactive;
        this.background = background || "";
        this.condition = condition;
    }

    /** Запустить сцену */
    begin() {
        this.setBackground(this.background)
        if (this.condition) this.condition();
        Game.Interface.$('TextField').innerHTML = this.text.replace("$Имя Игрока$", Game.PlayerName);
        this._checkInterface();
        setTimeout(() => {Game.LastSave.save(this);},250);
        Game.LastSlide.add(this);
    }

    setBackground(picture){
        if (picture == '') {
            Game.Interface.$('PictureField').style.display = 'none';
            Game.Interface.$('BorderField').style.display = 'none';
        }
        else {
            Game.Interface.$('PictureField').src = ROOTPATH + 'pictures/' + picture + '.png';
            Game.Interface.$('PictureField').style.display = 'block';
            Game.Interface.$('BorderField').style.display = 'block';
            Game.Interface.$('BorderField').setAttribute('class', 'fade-in');
            Game.Interface.$('TextField').setAttribute('class', 'fade-in');
            setTimeout(() => {
                Game.Interface.$('TextField').setAttribute('class', 'show');
            }, 1000);
        }
    }

    setAction(action){
        this.buttonaction[0] = action;
    }

    /** Отправная точка проверки элементов слайда */
    _checkInterface() {
        this._hideUnusableButtons();
        this._hideOnlyButton();
        this._setButtonValues();
    }

    /** Прячем неиспользуемые кнопки */
    _hideUnusableButtons() {
        for (let x = 0; x < 5; x++) {
            document.getElementById(`b0${x}`).setAttribute('class', 'fade-in');
            setTimeout(() => { document.getElementById(`b0${x}`).setAttribute('class', 'show'); }, 1000);
            try {
                if (this.buttontext[x] == undefined || this.buttontext[x]=='') document.getElementById(`b0${x}`).style.display = 'none';
                else {
                    document.getElementById(`b0${x}`).style.display = 'block';
                    if (this.buttonactive[x] == false) document.getElementById(`b0${x}`).style.display = 'none';

                }
            }
            catch (error) { }
        }
    }

    /** Установить текст кнопок и заодно изменить размер */
    _setButtonValues() {
        for (let x = 0; x < this.buttontext.length; x++) {
            document.getElementById(`b0${x}`).innerHTML = this.buttontext[x];
            document.getElementById(`b0${x}`).onclick = this.buttonaction[x];

            if(document.getElementById(`b0${x}`).textContent.length <=28 ){
                document.getElementById(`b0${x}`).style.height = '6vh';
                document.getElementById(`b0${x}`).style.backgroundSize = '100% 6.1vh';
            }
            else{
                document.getElementById(`b0${x}`).style.height = '7.8vh';
                document.getElementById(`b0${x}`).style.backgroundSize = '105% 9.1vh';
            }
        }
    }

    /** Прячем единственную кнопку */
    _hideOnlyButton() {
        if (this.buttontext.length == 1 && this.buttontext[0]=='' && this.background == '') {
            Game.Interface.$('TextField').onclick = this.buttonaction[0];
            Game.Interface.$('TextField').setAttribute('style', 'padding-top: 180px; height: 100%');
            document.getElementById(`b00`).style.display = 'none';
        }

        if (this.buttontext.length == 1 && this.buttontext[0]=='' && this.background != '') {
            Game.Interface.$('TextField').onclick = this.buttonaction[0];
            Game.Interface.$('TextField').setAttribute('style', 'padding-top: 0; height: 100%');
            document.getElementById(`b00`).style.display = 'none';
        }

        if (this.buttontext.length >= 2 && this.background == '') {
            Game.Interface.$('TextField').onclick = () => { };
            Game.Interface.$('TextField').setAttribute('style', 'padding-top: 150px; height: auto');
            document.getElementById(`b00`).style.vdisplay = 'block';
        }

        if (this.buttontext.length >= 2 && this.background != '') {
            Game.Interface.$('TextField').onclick = () => { };
            Game.Interface.$('TextField').setAttribute('style', 'padding-top: 0; height: auto');
            document.getElementById(`b00`).style.vdisplay = 'block';
        }
    }

    /** Отключаем кнопку */
    deactivate(a) {
        this.buttonactive[a] = false;
    }

    activate(a) {
        this.buttonactive[a] = true;
    }

}/** Мини-игра "упрощенные пятнаки"*/
class Tags {
  /**
   * @param {documentElement} mainfield Элемент, куда добавляется игра
   * @param {URL} picture Путь до папки с картинками без номера и расширения
   * @param {function} winaction Событие по завершению мини-игры
   */
  constructor (mainfield,picture,winaction) {
    this._cells = [];
    this._cellSelected = 0;
    this._cellEmpty = 0;
    this._picture = picture;
    this._field = mainfield;
    this._action = winaction;
  }

  /** Добавляем элементы и запускаем игру*/
  init(){
    this._container = document.createElement('div');
    this._container.classList.add('tags-field');
    this._TagsField = document.createElement('div');
    this._TagsField.classList.add('tags');
    this._field.appendChild(this._container);
    this._container.appendChild(this._TagsField);
    this._addCells();
    this._rndCells();
    this._activateSelection();
  }

  /** Добавляем по порядку ячейки*/
  _addCells () {
    for(let x=0;x<16;x++){
      this._cells[x] = document.createElement('div');
      this._cells[x].classList.add('cell');
      this._cells[x].innerText = x+1;
      this._TagsField.appendChild(this._cells[x]);
    }
  }

  /** Рандомизируем ячейки*/
  _rndCells () {
    let Numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
    this._cells.forEach(function(obj){
      let RndCell = Math.floor(Math.random()*Numbers.length);
      obj.innerText = Numbers[RndCell];
      Numbers.splice(RndCell,1);
    });
  }

  /** Присваеваем каждой ячейки картинку*/
  _applyPictures (){
    for (let x=0;x<16;x++){
      if(this._cells[x].innerText !== '0') {
        this._cells[x].style.backgroundImage = `url("${this._picture}${this._cells[x].innerText}.png")`;
      }
      else{
        this._cells[x].style.backgroundImage = 'none';
      }

    }
  }

  /** Опустошаем нулевую ячейку*/
  _emptyCell (){
    this._cells.forEach(function(obj) {
      if (obj.innerText == 0) {
        obj.classList.add('cell_empty');
        obj.onclick = () => {};
      }
      else{
        obj.classList.remove('cell_empty');
      }
    });

  }

  /** Выделяем активный выбор*/
  _activateSelection() {
    for(let x=0;x<16;x++){
      this._cells[x].onclick = () => {
        this._cells[x].classList.add('cell_selected');
        this._cellSelected = x;
        this._emptyCell();
        this._deactivateSelection();
      }
      this._cells[x].classList.remove('cell_selected');
      this._applyPictures();
      this._checkWin();
    }
  }

  /** Убираем выделения с неактивированных ячеек*/
  _deactivateSelection () {
    for(let x=0;x<16;x++){
      if (this._cells[x].innerText == 0){
        this._cells[x].onclick = () => {
          this._cells[x].innerText = this._cells[this._cellSelected].innerText;
          this._cells[this._cellSelected].innerText = 0;
          this._cells[x].classList.remove('cell_empty');
          this._activateSelection();
        }
      }
      else{
        this._cells[x].onclick = () => {
          this._activateSelection();
        };
      }

    }
  }

  /** Действие окончания игры*/
  exit(){
    this._container.classList.add('tags-field_exit');
    setTimeout(()=>{
      this._container.remove();
      this._action();
    },3000);
  }

  /** Проверка порядка ячеек и предварительное завершение*/
  _checkWin () {
    let Result = '';
    this._cells.forEach(function(obj){
      Result = Result + obj.innerText;
    });
    if(Result === '1234567891011121314150') {
      this._TagsField.classList.add('tags-field_win');
      this._deactivateSelection();
      this._cells[15].classList.remove('cell_empty');
      this._cells[15].style.backgroundImage = `url("${this._picture}${16}.png")`;
      setTimeout(()=>{
        this.exit();
      },5000);
    }
  }
}/** Таймер*/
class Timer{
  constructor() {
    this._sound = new Audio('./sounds/timer.mp3');
    this._sound.loop = true;
  }

  /**
   * @param {number} seconds Период действия таймера в секундах
   * @param {function} action Действие по окончанию таймера
   */
  set (seconds, action) {
    let time = seconds * 1000;
    this.stop();
    this._sound.volume = Game.Settings.getVolume();
    this._sound.play();
    Game.Interface.$('TimerProgressBar').style.display = 'block';
    this._settingsInterval = setInterval(() => {
      Game.Interface.$('TimerProgressBar').value -= Game.Interface.$('TimerProgressBar').max / seconds / 100;
      }, 10);
    this._settings = setTimeout(() => {
      action();
      Game.Timer.stop();
      }, time);
  }

/** Остановить таймер*/
  stop () {
    this._sound.pause();
    Game.Interface.$('TimerProgressBar').value = 100;
    Game.Interface.$('TimerProgressBar').style.display = 'none';
    clearInterval(this._settingsInterval);
    clearTimeout(this._settings);
  }

}class Engine {
  constructor() {
    this.Interface = new Interface();
    this.Stats = [];
    this.Stories = [];
    this.Achievements = {};
    this.AllAchievs = 0;
    this.Scenes = {};
    this.PlayerName = '';
    this.Timer = new Timer();
    this.Progress = new Progress();
    this.Sounds = new Sounds();
    this.Settings = new Settings();
    this.Effects = new Effects();
    this.Design = new Design();
    this.canShowAds = false;
    this.LastSave = new Last_Save();
    this.Minigame = {};
    this.LastSlide = new Last_Slide();
    this.Favourites = new Favourites();
  }

  /**
   * Узнать имя Главного героя
   * @param {function} action Действие после окончания
   */
  askName (action) {
    this.checkname = () => {
      this.name = this.input.value;
      if (this.name.length <= 1) this.text.innerText = 'Не менее 2 символов!';
      else if (this.name.length >= 15) this.text.innerText = 'Максимум 15 символов!';
      else if (!/^[а-яё]*$/i.test(this.name)) this.text.innerText = 'Только русские буквы!';
      else {
        this.PlayerName = this.name;
        this.action();
        this.Interface.$('MainField').style.display = 'block';
        this.im.remove();
        this.sendData('устанавливает новое имя');
        localStorage.setItem('PlayerName',this.PlayerName);
      }
    };
    this.Interface.$('MainField').style.display = 'none';
    this.action = action;
    this.im = document.createElement('im');
    this.text = document.createElement('p');
    this.text.innerText = 'Как меня зовут?'
    this.input = document.createElement('input');
    this.button = document.createElement('button');
    this.button.innerHTML = 'Принять';
    this.button.onclick = this.checkname;
    document.body.appendChild(this.im);
    this.im.appendChild(this.text);
    this.im.appendChild(this.input);
    this.im.appendChild(this.button);
  }

  /** После старта проверяем были ли приняты правила, а также устанавливаем настройки */
  launch () {
    document.addEventListener('contextmenu', event => event.preventDefault());
    if (localStorage.getItem('PPAccepted') !='1') {
      this.Interface.$('PP').style.display='block';
      this.Interface.$('Disclaimer').style.display='none';
      this.Interface.$('MenuField').style.visibility='hidden';
      localStorage.setItem('Settings.FirstLaunch', 'false');
      this.Settings.set();
    }
    else {
      this.sendData('запускает игру');
      this.Settings.load();
      this.Progress.loadAchievements();
      this.setScenesNumbers();
      Achievement.showCategory('Immortals');
      this.LastSave.checkLastLoad();
      this.initFavourites();
      this.loadPictures(() => {
        this.Interface.$('StartGameLoadingProgress').setAttribute('class', 'fade-out');
        this.Interface.$('StartGameLoadingPercent').setAttribute('class', 'fade-out');
        setTimeout(() => {
          document.getElementsByTagName('disc')[0].setAttribute('class', 'fade-out');
          setTimeout(() => {
            document.getElementsByTagName('disc')[0].style.display='none';
            this.Interface.$('MenuField').style.display='block';
          }, 1000);
        }, 1000);
      });
    }
  }

  /**
   * Загрузочный экран
   * @param {string} part Код части
   */
  LoadScreen (part) {
    localStorage.setItem('LastSave_LS', part);
    this.LastSlide.refresh();
    setTimeout(() => {
      this.Interface.$('LoadingTip').innerHTML = '';
      this.Interface.$('LoadingBack').src = '';
      if (part == undefined) part = 'chapter';
      this.Interface.$('LoadingBack').src = 'pictures/Covers/' + part + '.png';
      this.Interface.$('LoadingBackBack').src = 'pictures/Covers/' + part + '.png';
      this.Interface.$('LoadingScreen').style.zIndex = '3';
      setTimeout(() => {
        this.Interface.$('PartField').innerHTML = '';
        this.Interface.$('PartField').style.display = 'none';
        this.Interface.$('MainField').setAttribute('class', 'hide');
        setTimeout(()=>{
          this.Interface.$('LoadingScreen').style.display = 'block';
          this.Interface.$('LoadingScreen').setAttribute('class', 'show');
          this.Interface.$('MainField').style.display = "none";
        },1000)

        setTimeout(() => {
          this.Interface.$('LoadingTip').innerHTML = '<p class="fade-ina">Нажмите, чтобы продолжить';
          this.Interface.$('LoadingScreen').onclick = () => {
            AndroidApp ('showAd');
            setTimeout(() => { this.Interface.$('LoadingScreen').setAttribute('class', 'hide'); }, 1000);
            setTimeout(() => {
              this.Interface.$('LoadingScreen').style.display = 'none';
              this.Interface.$('MainField').setAttribute('class', 'show');
              this.Interface.$('MainField').style.display = "block";
            }, 2000);
            this.Interface.$('LoadingScreen').onclick = () => { }
          }
        }, 6000);
      }, 0);
    }, 0);
  }

  /**
   * @param {string|undefined} text Текст сообщения
   * @param {boolean|undefined=} isSlide Является ли показом предыдущего слайда?
   */
  message (text, isSlide) {
    if (isSlide){
      this.Interface.$('MessageField').setAttribute('class', 'hide');
      this.Interface.$('MessageField').style.display = 'block';
      setTimeout(() => { this.Interface.$('MessageField').setAttribute('class', 'show'); }, 100);
    }
    else{
      setTimeout(() => { this.Interface.$('MessageField').setAttribute('class', 'slide-in-right'); }, 0);
      setTimeout(() => { this.Interface.$('MessageField').style.display = 'block'; }, 100);
      this.Sounds.NS.play();
    }
    this.hideelem = () => {
      this.Interface.$('MessageField').setAttribute('class', 'slide-out-right');
      setTimeout(() => {
        this.Interface.$('MessageField').style.display = 'none';
      }, 1000);
    }

    clearTimeout(timer);

    this.Interface.$('MessageField').onclick = this.hideelem;

    if (this.Settings.automatiallyHideAlert == true) var timer = setTimeout(() => {
      this.Interface.$('MessageField').setAttribute('class', 'slide-out-right');
      setTimeout(() => {
        this.Interface.$('MessageField').style.display = 'none';
      }, 1000);
    }, 5000);
    this.Interface.$('MessageText').innerHTML = text.replace("$Имя Игрока$", this.PlayerName);
  }

  /** @param {string} text Текст особого сообщения */
  inventoryMessage (text){
    this.Interface.$('InventoryMessage').innerHTML = '<a>'+"⠀"+text;
    this.Interface.$('InventoryMessage').setAttribute('class','inv_mes_show');
    setTimeout(()=>{this.Interface.$('InventoryMessage').setAttribute('class','');},3000)
  }

  /**
   * Загружаем картинки и убираем повторы
   * @param {function} callback Вызываем следующие функции по завершению загрузки
   */
  loadPictures (callback) {
    let pictures = [];
    let picturesTotal = 0;
    let picturesLoaded = 0;
    const queuePictures = a => {
      pictures[x] = document.createElement('img');
      pictures[x].style.display='none';
      pictures[x].onerror = function (){ this.src = ROOTPATH + 'pictures/Interface/Unknown.png'}
      pictures[x].src = ROOTPATH + 'pictures/' + a + ".png";
      document.body.appendChild(pictures[x]);
      picturesTotal++;
      pictures[x].onload = () => {
        picturesLoaded++;
        this.Interface.$('StartGameLoadingProgress').setAttribute('value', picturesLoaded);
        this.Interface.$('StartGameLoadingPercent').innerText = Math.floor(picturesLoaded/imagesPrechached.length*100) + '%';
        if(imagesPrechached[picturesLoaded] == undefined){}
        else {
          queuePictures(imagesPrechached[picturesLoaded]);
        }
      }
    }

    for (let prop in this.Scenes) {
      for (var x = 0; x < this.Scenes[prop].length; x++) {
        if (this.Scenes[prop][x] == undefined || this.Scenes[prop][x].background == '') { }
        else imagesPrechached.push(this.Scenes[prop][x].background);
      }
    }

    for (let prop in this.Stats) {
      if (this.Stats[prop].picture == undefined || this.Stats[prop].picture == '') { }
      else imagesPrechached.push(this.Stats[prop].picture);
    }

    for (var x = 0; x < this.Stories.length; x++) {
      imagesPrechached.push(this.Stories[x].pict);
      for (var y = 0; y < this.Stories[x].chapters.length; y++) {
        imagesPrechached.push(this.Stories[x].chapters[y].pict);
        for (var z = 0; z < this.Stories[x].chapters[y].parts.length; z++) {
          imagesPrechached.push(this.Stories[x].chapters[y].parts[z].pict);
          imagesPrechached.push('Covers/'+this.Stories[x].chapters[y].parts[z].code);
        }
      }
    }
    imagesPrechached = [...new Set(imagesPrechached)];

    imagesPrechached.sort();

    queuePictures(imagesPrechached[0]);

    this.Interface.$('StartGameLoadingProgress').setAttribute('max', imagesPrechached.length);

    this.checkTotalLoadedPictures = function () {
      imagesPrechached.length == picturesLoaded ? callback() : setTimeout(() => { this.checkTotalLoadedPictures(); }, 1000);
    }

    this.checkTotalLoadedPictures();
  }

  initFavourites(){
  /*Game.Progress.loadFavourites();
    Game.Favourites.checkDates();
    Game.Progress.saveFavourites();*/
  }

  /** Присвоение номера сцене в зависимости от индекса массива*/
  setScenesNumbers (){
    for (let prop in this.Scenes) {
      for (let x = 0; x < this.Scenes[prop].length; x++) {
        if(this.Scenes[prop][x] != undefined) {
          this.Scenes[prop][x].number = x;
          this.Scenes[prop][x].part = prop;
        }
      }
    }
  }

  /** Заполняем форму и отправляем данные*/
  sendData (a) {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let nowtime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    today = dd + '.' + mm + '.' + yyyy;

    form.PlayerName.value = localStorage.getItem('PlayerName');
    form.Date.value = today;
    form.Action.value = a;
    form.Time.value = nowtime;
    form.Region.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
    form.button.click();
  }

  /** Показываем сцены для тестирования  */
  showMeFeatures () {
    this.Scenes.Features[0].begin();
  }

  /** Показывает сообщение о количесве занимаеймой внутренней памяти*/
  usedMemory (){
    let allStrings = '';
    for(let key in window.localStorage){
      if(window.localStorage.hasOwnProperty(key)){
        allStrings += window.localStorage[key];
      }
    }
    console.log(Math.floor(3 + ((allStrings.length*16)/(8*1024))) + 'кб использовано');
  }

}//Path to files
const ROOTPATH = '';

//Game Variables
const Game = new Engine();

/** Все картинки которые использовались во всех слайдах */
let imagesPrechached = [];

/** События по загрузки страницы */
window.onload = () => {
  Game.launch();
}


// Achievs reveal effect
function revealAchievs() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach(el=>{
    let windowHeight = window.innerHeight;
    let elementTop = el.getBoundingClientRect().top;
    let elementBottom = el.getBoundingClientRect().bottom;
    let elementVisible = 60;
    if (elementTop > windowHeight - elementVisible || elementBottom < elementVisible) {
      el.classList.remove("active");
    } else {
      el.classList.add("active");
    }
  })
}

document.querySelector('#achievs').addEventListener("scroll", revealAchievs);


// Load Upload Saves
function getProgress(){
  return JSON.stringify(localStorage);
}

function downloadProgress() {
  let a = document.createElement("a");
  let file = new Blob([getProgress()], {type: 'application/json'});
  a.href = URL.createObjectURL(file);
  a.innerText = 'Скачать прогресс'
  a.download = 'Chronicles_Progress';
  document.body.appendChild(a)
}

function uploadProgress() {
  const c = document.createElement('div');
  c.style.position = 'absolute';
  const i = document.createElement('input');
  i.type = 'file';
  const readFile = () =>{
    const reader = new FileReader();
    reader.readAsText(i.files[0]);
    reader.onload = () =>{
      const SV = JSON.parse(reader.result);
      for (let prop in SV){
        localStorage.setItem(prop, SV[prop]);
      }
      location.reload()
    }
  }
  i.addEventListener('change',()=>{
    readFile();
  });
  downloadProgress();
  document.body.appendChild(c);
  c.appendChild(i);
}

//Отправка данных из формы
const scriptURL = 'https://script.google.com/macros/s/AKfycbwkdBBtRSVcRisbB7pJubWxpx0GKRrag7R2oT4ecScLpCAmGJVXkrwBlEZEeX74pwVlNg/exec';
const form = document.forms['submit-to-google-sheet'];

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => console.log())
    .catch(error => console.error())
});

function AndroidApp (a){
  try {
    if(Game.canShowAds) {
      javascript:return AndroidFunction[a]()
    }
    else {Game.canShowAds=true;}
  }
  catch (e) {}
}

//Изменение при закрытии/открытии вкладки
let hidden, visibilityChange;
let alreadyturnedoff = false;
if (typeof document.hidden !== "undefined") {
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
  hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

document.addEventListener(visibilityChange, handleVisibilityChange, false);

function handleVisibilityChange() {
  if(!alreadyturnedoff){Game.Sounds.pauseAll();alreadyturnedoff = true;}
  else {Game.Sounds.resumeAll();alreadyturnedoff = false;}
}Game.Stories.push( new Story({
  name: 'Immortals',
  pict : 'Covers/Story',
  chapters : [ new Chapter({
    name: 'Глава 1',
    pict: 'Persons/Stranger',
    parts: [
      new Part({
        name: 'Пролог',
        pict: 'Backgrounds/Abstraction_Hero',
        code: 'Prologue',
        event: function () {

          Game.Design.change('Immortals');

          Stat.hideAll();

          Game.Effects.DisableAll();

          Game.LoadScreen('Prologue');

          Game.Scenes.Prologue[0].begin();
        },
      }),
      new Part({
        name: 'Часть 1',
        code: 'FirstChapter',
        pict: 'Backgrounds/Lection',
        event: function () {

          Game.Design.change('Immortals');

          Game.Progress.load('FirstChapter');

          Game.Effects.DisableAll();

          Game.LoadScreen('FirstChapter');

          if (Game.PlayerName === undefined || Game.PlayerName === '') Game.askName(() => {Game.Scenes.FirstChapter[0].begin(); })
          Game.Scenes.FirstChapter[0].begin();

        },
      }),
      new Part({
        name: 'Часть 2',
        code: 'TL',
        pict: 'Backgrounds/NY',
        event: function () {

          Game.Design.change('Immortals');

          Game.Progress.load('TL');

          Game.Effects.DisableAll();

          Game.LoadScreen('TL');

          if (Game.PlayerName === undefined || Game.PlayerName === '') Game.askName(() => {Game.Scenes.TL[1].begin(); })
          Game.Scenes.TL[1].begin();

        },
      }),

      new Part({
        name: 'Часть 3',
        code: 'PP',
        pict: 'Backgrounds/Pompeii',
        event: function () {

          Game.Design.change('Immortals');

          Game.Progress.load('PP');

          Game.Effects.DisableAll();

          Game.LoadScreen('PP');

          if (Game.PlayerName === undefined || Game.PlayerName === '') Game.askName(() => {Game.Scenes.PP[1].begin(); })
          Game.Scenes.PP[1].begin();

        },
      }),

      new Part({
        name: 'Часть 4',
        code: 'FP',
        pict: 'Backgrounds/Ball',
        event: function () {

          Game.Design.change('Immortals');

          Game.Effects.DisableAll();

          Game.LoadScreen('FP');

          Game.Progress.load('FP');

          if (Game.PlayerName === undefined || Game.PlayerName === '') Game.askName(() => {Game.Scenes.FC[0].begin(); })
          Game.Scenes.FC[0].begin();

        },
      }),

      new Part({
        name: 'Часть 5',
        code: 'FifthPart',
        pict: 'Backgrounds/Lake',
        event: function () {

          Game.Design.change('Immortals');

          Game.Effects.DisableAll();

          Game.LoadScreen('FifthPart');

          Game.Progress.load('FifthPart');

          if (Game.PlayerName === undefined || Game.PlayerName === '') Game.askName(() => {Game.Scenes.FifthPart[0].begin(); })
          Game.Scenes.FifthPart[0].begin();

        },
      }),
      new Part({
        name: 'Часть 6',
        code: 'SixPart',
        pict: 'Backgrounds/Camp_Morning',
        event: function () {

          Game.Design.change('Immortals');

          Game.Effects.DisableAll();

          Game.LoadScreen('SixPart');

          Game.Progress.load('SixPart');

          if (Game.PlayerName === undefined || Game.PlayerName === '') Game.askName(() => {Game.Scenes.SixPart[0].begin(); })
          Game.Scenes.SixPart[0].begin();

        },
      }),
    ],
  })


  ]
}));//Characters

Game.Stats.God = new Person({
    name: 'Проводник',
    picture: 'Persons/Stranger',
    title: 'Его цели и мотивы неясны, но я думаю, он не желает мне зла. Время покажет. ',
    text: 'Загадочное существо, которое не отвечает прямо на мои вопросы. Однако именно он должен помочь мне в этом путешествии.',
    story: 'Immortals',
});

Game.Stats.Cheryl = new Person({
    name: 'Шерил',
    picture: 'Persons/Cheryl',
    title: 'Шерил все реже улыбается… Ее жизни что-то угрожает? ',
    text: 'Девушка живет в соседнем доме. Мы с ней довольно близко общаемся, часто проводим время вместе. Она мне как сестра.',
    story: 'Immortals',
    isUnlocked: function () {
        return Game.Achievements.LakeCheryl.unlocked >= 1;
    },
    trophies: new Trophies(
      {
          name : 'Border',
          title : 'Легендарная рамка',
          picture : 'Items/Cup',
          text : 'Награда за максимальный уровень фаворита',
          isUnlocked: function () {
              return Game.Favourites.getLevel('Cheryl') >= 5;
          }
      },
    ),
});

Game.Stats.Scarlett = new Person({
    name: 'Скарлетт',
    picture: 'Persons/Scarlett',
    title: 'Кажется, что в последнее время Скар сама не своя. Могу ли я ей помочь?',
    text: 'Моя подруга, с которой мы учимся в одном университете. Она умная и довольно активная. Никогда не упустит возможности читать мне нотации.',
    story: 'Immortals',
    isUnlocked: function () {
        return Game.Achievements.LakeScarlett.unlocked >= 1;
    },
    trophies: new Trophies(
      {
          name : 'Border',
          title : 'Легендарная рамка',
          picture : 'Items/Cup',
          text : 'Награда за максимальный уровень фаворита',
          isUnlocked: function () {
              return Game.Favourites.getLevel('Scarlett') >= 5;
          }
      },
    ),
});

Game.Stats.Neitan = new Person({
    name: 'Нэйтан',
    picture: 'Persons/Neitan',
    title: 'Он знаток своего дела и любитель повторять про “важность” учебы.',
    text: 'Профессор, который уже несколько лет преподает историю в нашем университете. Его харизма и обаяние прекрасно сочетаются с его острым умом.',
    story: 'Immortals',
    isUnlocked: function () {
        return Game.Achievements.LakeNeitan.unlocked >= 1;
    },
    trophies: new Trophies(
      {
          name : 'Border',
          title : 'Легендарная рамка',
          picture : 'Items/Cup',
          text : 'Награда за максимальный уровень фаворита',
          isUnlocked: function () {
              return Game.Favourites.getLevel('Neitan') >= 5;
          }
      },
    ),
});

Game.Stats.Nicola = new Person({
    name: 'Никола',
    picture: 'Persons/Nicola',
    title: 'Это он? Великий ученый? Я не схожу с ума?',
    text: ` Инженер и учёный-физик, изобретатель в области электротехники и радиотехники. “Я не тружусь более для настоящего, я тружусь для будущего.”`,
    story: 'Immortals',
    isUnlocked: function () {
        return Game.Achievements.Golden_Cross.unlocked >= 1;
    },
    trophies: new Trophies(
      {
          name : 'Border',
          title : 'Легендарная рамка',
          picture : 'Items/Cup',
          text : 'Награда за максимальный уровень фаворита',
          isUnlocked: function () {
              return Game.Favourites.getLevel('Nicola') >= 5;
          }
      },
    ),

});

Game.Stats.Leon = new Person({
    name: 'Леон',
    picture: 'Persons/Leon',
    title: 'Мы снова общаемся с ним, как в старые добрые времена…',
    text: 'Мой хороший друг, одногрупник, брат профессора Нэйтана. Леон всегда был очень заботлив и внимателен к окружающим. У него большие планы на жизнь, которые он хочет воплотить в ближайшее время.',
    story: 'Immortals',
    isUnlocked: function () {
        return Game.Achievements.LakeLeon.unlocked >= 1;
    },
    trophies: new Trophies(
      {
          name : 'Border',
          title : 'Легендарная рамка',
          picture : 'Items/Cup',
          text : 'Награда за максимальный уровень фаворита',
          isUnlocked: function () {
              return Game.Favourites.getLevel('Leon') >= 5;
          }
      },
    ),
});

Game.Stats.Antagonist = new Person({
    name: 'Александр',
    picture: 'Persons/Antagonist',
    title: 'Странный мужчина, который одержим Катариной.',
    text: 'Я ничего о нем не знаю. Он определенно внушает страх, но я не могу избавиться от чувства заинтересованности. Мне хочется докопаться до его мотивов. Что я найду в общении с ним? Ответы или только боль?',
    story: 'Immortals',
    isUnlocked: function () {
        return Game.Achievements.LoveEvil.unlocked >= 1;
    },
    trophies: new Trophies(
      {
          name : 'Border',
          title : 'Легендарная рамка',
          picture : 'Items/Cup',
          text : 'Награда за максимальный уровень фаворита',
          isUnlocked: function () {
              return Game.Favourites.getLevel('Antagonist') >= 5;
          }
      },
    ),
});

Game.Stats.Robert = new Person({
    name: 'Роберт',
    picture: 'Persons/Robert',
    title: 'Фиктивный муж Катарины. Называет себя охотником на монстров.',
    text: 'Этот мужчина определенно играет не последнюю роль во всем происходящем. Возможно только он сможет защитить меня в эпохе Теслы. Хотелось бы надеяться, что он друг…',
    story: 'Immortals',
});

Game.Stats.Curtis = new Choice({
    name: 'Куртис',
    picture: '',
    title: '',
    text: '',
    story: 'Immortals',
});

Game.Stats.Family = new Choice({
    name: 'Семья',
    picture: '',
    title: '',
    text: '',
    story: 'Immortals',
});

//Conditions

Game.Stats.ForgotHomework = new Choice({
    name: 'забыла домашку',
    story: 'Immortals',
});

Game.Stats.Late = new Choice({
    name: 'опоздала',
    story: 'Immortals',
});

Game.Stats.Believe = new Choice({
    name: 'поверила в происходящее с Теслой',
    story: 'Immortals',
});

Game.Stats.StreetHide = new Choice({
    name: 'убежала в переулок',
    story: 'Immortals',
});

Game.Stats.StreetStraight = new Choice({
    name: 'убежала в прямо по улице',
    story: 'Immortals',
});

Game.Stats.ComeWithLeon = new Choice({
    name: 'пойти  Нейтаном',
    story: 'Immortals',
});

Game.Stats.ScarlettSpeech = new Choice({
    name: 'общалась со Скарлетт',
    story: 'Immortals',
});

Game.Stats.Activities = new Choice({
    name: 'Кол-во активностей',
    story: 'Immortals',
});

Game.Stats.InvitedCheryl = new Choice({
    name: 'позвала Шерил',
    story: 'Immortals',
});

Game.Stats.DrinkAtParty = new Choice({
    name: 'выпила алкоголь',
    story: 'Immortals',
});

Game.Stats.HugLeon = new Choice({
    name: 'обнялась с Леоном',
    story: 'Immortals',
});

Game.Stats.FollowedScarlett = new Choice({
    name: 'пошла за Скарлетт',
    story: 'Immortals',
});

Game.Stats.TryToEscape = new Choice({
    name: 'попыталась сбежать',
    story: 'Immortals',
});

Game.Stats.BrokenHand = new Choice({
    name: 'сломала руку',
    story: 'Immortals',
});

Game.Stats.MetAntagonist = new Choice({
    name: 'пошла в сад',
    story: 'Immortals',
});

Game.Stats.AntagonistWire = new Choice({
    name: 'поддалась соблазну',
    story: 'Immortals',
});

Game.Stats.HelpTesla = new Choice({
    name: 'помогла Тесле',
    story: 'Immortals',
});

Game.Stats.DanceWithRobert = new Choice({
    name: 'танцевала с Робертом',
    story: 'Immortals',
});

Game.Stats.SupportLeon = new Choice({
    name: 'поддержала Леона в разговоре',
    story: 'Immortals',
});

Game.Stats.Brothers = new Choice({
    name: 'связь братьев',
    story: 'Immortals',
});

Game.Stats.GoStudy = new Choice({
    name: 'пойти на занятия',
    story: 'Immortals',
});

Game.Stats.GoToLakeWith = new Choice({
    name: 'пойти на озеро с',
    story: 'Immortals',
});

Game.Stats.EagleLegend = new Choice({
    name: 'поверить в миф',
    story: 'Immortals',
});

Game.Stats.CurtisAppearance = new Choice({
    attitude : 1,
    name: 'внешний вид Куртиса',
    story: 'Immortals',
});

//Items

Game.Stats.Money = new Item({
    name: 'Деньги',
    picture: 'Items/Money',
    title: 'Мелочь и пару купюр',
    text: 'Деньги всегда нужны. Работу и учёбу очень сложно совмещать.',
    story: 'Immortals',
});

Game.Stats.Study = new Item({
    name: 'Учёба',
    picture: 'Items/Study',
    title: 'Старые книги и тетрадки с записями',
    text: 'Надеюсь эти знания понадобятся мне в жизни...',
    story: 'Immortals',
});

Game.Stats.Key01 = new Item({
    name: 'Ключ',
    picture: 'Items/Key01',
    title: 'Неизвестный ключ',
    text: 'Я нашла его на сиденье после переписки с Шерил, наверное кто-то забыл. Этот ключ переливается необычным синим оттенком. Интересно, что он открывает..?',
    story: 'Immortals',
});

Game.Stats.Knife = new Item({
    name: 'Нож',
    picture: 'Items/Knife',
    title: 'Старый нож',
    text: 'Этим ножом я освободила себя из заточения, смогу ли я его использовать в дальнейшем?',
    story: 'Immortals',
});

Game.Stats.Golden_Cross = new Item({
    name: 'Крестик',
    picture: 'Items/Golden_Cross',
    title: 'Серебрянный крестик Николы',
    text: 'Подарок Николы в знак нашей дружбы. Тесла был не таким верующим человеком, как его родители. <p>Почему он решил поделиться именно этим предметом?',
    story: 'Immortals',
});

Game.Stats.Corkscrew = new Item({
    name: 'Штопор',
    picture: 'Items/Corkscrew',
    title: 'Штопор Скарлетт',
    text: 'Я выйграла его у Скарлетт, когда отгадывала загадки на озере. Она всегда носила его с собой, но почему же именно тогда Скарлетт решила отдать его мне? Влияние алкоголя?',
    story: 'Immortals',
});

Game.Stats.Crisps = new Item({
    name: 'Еда',
    picture: 'Items/Crisps',
    title: 'Чипсы',
    text: 'Чипсы с солью',
    story: 'Immortals',
});

Game.Stats.TurkeySandw = new Item({
    name: 'Еда',
    picture: 'Items/Sandwich',
    title: 'Сэндвич с индейкой',
    text: 'Свежеприготовленный сэндвич с овощами и индейкой',
    story: 'Immortals',
});

Game.Stats.SausageSandw = new Item({
    name: 'Еда',
    picture: 'Items/Sandwich',
    title: 'Сэндвич с колбасой',
    text: 'Свежеприготовленный сэндвич с зеленью и колбасой',
    story: 'Immortals',
});

Game.Stats.FruitsYogurt = new Item({
    name: 'Еда',
    picture: 'Items/Yogurt',
    title: 'Фрукты с йогуртом',
    text: 'Свежие фрукты с йогуртом',
    story: 'Immortals',
});Game.Achievements.PrologueCompleted = new Achievement ({
    picture: 'Backgrounds/Abstraction',
    title: 'Начало начал',
    text: 'Пройти пролог',
    story: 'Immortals',
});

Game.Achievements.Sleeper = new Achievement ({
    picture: 'Backgrounds/Room',
    title: 'Соня',
    text: 'Проспать занятия',
    story: 'Immortals',
});

Game.Achievements.MoneySpender = new Achievement ({
    picture: 'Items/Money',
    title: 'Я выбираю комфорт!',
    text: 'Потратить самое большое количество денег на транспорт',
    story: 'Immortals',
});

Game.Achievements.GoodGirl = new Achievement ({
    picture: 'Items/Study',
    title: 'Правильная девочка',
    text: 'Не поддаваться искушению и не проспать пары',
    story: 'Immortals',
});

Game.Achievements.AllKnowing = new Achievement ({
    picture: 'Backgrounds/Lection',
    title: 'Всезнайка',
    text: 'Ответить правильно на вопрос Нэйтана на паре',
    story: 'Immortals',
});

Game.Achievements.FirstPartCompleted = new Achievement ({
    picture: 'Backgrounds/Uni',
    title: 'Знакомство',
    text: 'Пройти первую часть',
    story: 'Immortals',
});

Game.Achievements.SmartGirl = new Achievement ({
    picture: 'Items/Study',
    title: 'Знания — сила!',
    text: 'Использовать свои знания, чтобы задать дополнительный вопрос Тесле',
    story: 'Immortals',
});

Game.Achievements.ShockTesla = new Achievement ({
    picture: 'Persons/Nicola',
    title: 'Шок',
    text: 'Шокировать Теслу',
    story: 'Immortals',
});

Game.Achievements.Crazy = new Achievement ({
    picture: 'Backgrounds/Street',
    title: 'Сумасшедшая',
    text: 'Убежать от Теслы',
    story: 'Immortals',
});

Game.Achievements.FirstMonster = new Achievement ({
    picture: 'Persons/Monster',
    title: 'Нечто',
    text: 'Впервые увидеть монстра',
    story: 'Immortals',
});

Game.Achievements.TrustCheryl = new Achievement ({
    picture: 'Persons/Cheryl',
    title: 'Хочу верить',
    text: 'Рассказать Шерил правду',
    story: 'Immortals',
});

Game.Achievements.SecondPartCompleted = new Achievement ({
    picture: 'Backgrounds/NY',
    title: 'Путешественница',
    text: 'Пройти вторую часть',
    story: 'Immortals',
});

Game.Achievements.Sushi = new Achievement ({
    picture: 'Backgrounds/Kitchen',
    title: 'Всё ради друзей',
    text: 'Потратить самое большое количество денег на еду',
    story: 'Immortals',
});

Game.Achievements.DanceQueen = new Achievement ({
    picture: 'Backgrounds/Disco',
    title: 'Кто тут самый пластичный?',
    text: 'Победить Скарлетт в танцах',
    story: 'Immortals',
});

Game.Achievements.FirstWeapon = new Achievement ({
    picture: 'Items/Knife',
    title: 'Носи его осторожно',
    text: 'Получить нож',
    story: 'Immortals',
});

Game.Achievements.AttackMonster = new Achievement ({
    picture: 'Persons/Monster',
    title: 'Ужасные последствия',
    text: 'Вступить в открытое столкновение с монстром',
    story: 'Immortals',
});

Game.Achievements.EvilBeauty = new Achievement ({
    picture: 'Persons/Antagonist',
    title: 'Красивое зло',
    text: 'Познакомится с виновником “торжества”',
    story: 'Immortals',
});

Game.Achievements.Storm = new Achievement ({
    picture: 'Backgrounds/Chair',
    title: 'Затишье перед бурей',
    text: 'Пройти третью часть',
    story: 'Immortals',
});

Game.Achievements.Golden_Cross = new Achievement ({
    picture: 'Items/Golden_Cross',
    title: 'Наследие',
    text: 'Получить подарок от Николы',
    story: 'Immortals',

});

Game.Achievements.Guessed = new Achievement ({
    picture: 'Persons/Robert',
    title: 'Я так и знала!',
    text: 'Угадать, чем занимается Роберт',
    story: 'Immortals',
});

Game.Achievements.KeepWeapon = new Achievement ({
    picture: 'Items/Knife',
    title: 'Лишним не будет',
    text: 'Оставить при себе первое оружие',
    story: 'Immortals',
});

Game.Achievements.LoveEvil = new Achievement ({
    picture: 'Persons/Antagonist',
    title: 'Змей искуситель',
    text: 'Поддаться на соблазн злодея',
    story: 'Immortals',
});

Game.Achievements.Ball = new Achievement ({
    picture: 'Backgrounds/Ball',
    title: 'Званый вечер',
    text: 'Пройти четвёртую часть',
    story: 'Immortals',
});

Game.Achievements.Oops = new Achievement ({
    picture: 'Persons/Neitan',
    title: 'Оговорочка по Фрейду',
    text: 'Случайно произнести неправильное имя профессора',
    story: 'Immortals',
});

Game.Achievements.Psy = new Achievement ({
    picture: 'Backgrounds/Parents',
    title: 'Семейный психолог',
    text: 'Предотвратить ссору родителей',
    story: 'Immortals',
});

Game.Achievements.LakeNeitan = new Achievement ({
    picture: 'Persons/Neitan_New',
    title: 'Я хочу большего!',
    text: 'Сблизьтесь с Нэйтаном в поездке на озеро',
    story: 'Immortals',
});

Game.Achievements.LakeLeon = new Achievement ({
    picture: 'Persons/Leon_New',
    title: 'Это было свидание?',
    text: 'Сблизьтесь с Леоном в поездке на озеро',
    story: 'Immortals',
});

Game.Achievements.LakeScarlett = new Achievement ({
    picture: 'Persons/Scarlett_New',
    title: 'Откровение',
    text: 'Сблизьтесь со Скарлетт в поездке на озеро',
    story: 'Immortals',
});

Game.Achievements.LakeCheryl = new Achievement ({
    picture: 'Persons/Cheryl_New',
    title: 'Её борьба',
    text: 'Сблизьтесь с Шерил в поездке на озеро',
    story: 'Immortals',
});

Game.Achievements.Guru = new Achievement ({
    picture: 'Items/Corkscrew',
    title: 'Гуру загадок',
    text: 'Победите Скарлетт в загадках',
    story: 'Immortals',
});

Game.Achievements.Fantasy = new Achievement ({
    picture: 'Backgrounds/Rabbit_Dragon_Caterpillar_Cloud',
    title: 'Фантазер',
    text: 'Проявите изобретательность и победите Шерил в игре',
    story: 'Immortals',
});

Game.Achievements.Lake = new Achievement ({
    picture: 'Backgrounds/Lake',
    title: 'Уикэнд',
    text: 'Пройти пятую часть',
    story: 'Immortals',
});

Game.Achievements.SixPartEnd = new Achievement ({
    picture: 'Backgrounds/Saloon',
    title: 'Добро пожаловать в Колорадо-Спрингс',
    text: 'Пройти шестую часть',
    story: 'Immortals',
});

Game.Achievements.HiddenWorld = new Achievement ({
    picture: 'Items/Key01',
    title: '<accent>Спрятанный мир',
    text: '<accent>Найти применение неизвестному ключу',
    story: 'Immortals',
});

Game.Achievements.Dev = new Achievement ({
    picture: 'Items/Lock',
    title: '<accent>Разработчик',
    text: '<accent>Что для этого нужно сделать?',
    story: 'Immortals',
});Game.Scenes.Prologue = [];

Game.Scenes.Prologue[0] =
    new Scene({
        text: `- Здравствуй! Мы снова встретились. Ты наверное меня и не помнишь.
            <p>В голосе незнакомца мелькнула усмешка. Он продолжил:
            <p>- Я проводник и пришел к тебе, чтобы напомнить, что ты сделала с этим миром и почему являешься ключом. 
            К спасению или уничтожению - решать только тебе. Полагаю, у тебя много вопросов. Задавай.
        `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.Prologue[1].begin(); Game.message('В левом верхнем углу под иконкой рюкзака нажмите на стрелочку, чтобы посмотреть текст предыдущего слайда.'); }],
        background: 'Backgrounds/Abstraction',
        condition: () => { Game.Sounds.play('Music', 'Prologue'); }

    });

Game.Scenes.Prologue[1] =
    new Scene({
        text: `Я медленно открыла глаза. Первое время мозг не мог воспринять место, в котором я очутилась. 
            Странные свечения, пустота… Камни парили неестественно, не поддаваясь никаким законам физики.
            <p>“Это не может быть реальностью!”
            <p> Я ощущала себя бестелесным существом, которое барахтается в просторах вселенной. Абсолютно беззащитна, будто бы любое дуновение скинет меня с возвышенности, и моя жизнь оборвется.
        `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.Prologue[50].begin(); }],
        background: 'Backgrounds/Abstraction',
    });

Game.Scenes.Prologue[50] =
  new Scene({
    text: `
     Взгляд зацепился за таинственную фигуру, укутанную в черный плащ. Я посмотрела на него, надеясь увидеть в нем спасителя. Того, кто расскажет все секреты этого мира и поможет выбраться отсюда. Однако ответом мне было продолжительное молчание. Незнакомец терпеливо ждал, пока я придумаю вопросы. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.Prologue[2].begin(); }],
    background: 'Persons/Stranger',
  });

Game.Scenes.Prologue[2] =
    new Scene({
        text: `
            Я попыталась вспомнить хоть какие-то фрагменты из своего прошлого, но пришла в ужас от осознания полного забвения. В голову приходили только самые банальные вопросы.
            <p>Я робко взглянула на него и спросила: 
        `,
        buttontext: [''],
        buttonaction: [() => { Game.askName(() => {Game.Scenes.Prologue[15].begin() }) }],
        background: 'Persons/Stranger',
    });

Game.Scenes.Prologue[15] =
    new Scene({
        text: `Из-под капюшона продолжала проглядывать ухмылка. Складывалось ощущение, что собеседника забавляет этот вопрос.
            <p>- Тебя зовут $Имя Игрока$. И почему всем всегда так важно знать свое имя…
            <p>Я задумалась. Во мне заиграло любопытство или простой страх, что я могу потерять свою личность?
            <p>- Это же часть тебя… я…
        `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.Prologue[3].begin();}],
        background: 'Persons/Stranger',

    });

Game.Scenes.Prologue[3] =
    new Scene({
        text: `
            - Брось, - перебил проводник, - у меня нет имени. Но я вездесущ. Я всегда и везде. Необязательно носить эти придуманные клички, чтобы что-то из себя представлять. 
            <p>Я решила не спорить. Стало ясно, что у него слишком большое самомнение; что-то доказывать - бесполезно. Беседа продолжилась.
            `,
        buttontext: [
            'Сколько мне лет?',
            'Где я родилась?',
            'Я умерла?',
            'Закончить диалог'
        ],
        buttonaction: [
            () => { Game.Scenes.Prologue[4].deactivate(0); Game.Scenes.Prologue[5].deactivate(0); Game.Scenes.Prologue[6].deactivate(0); Game.Scenes.Prologue[16].begin(); },
            () => { Game.Scenes.Prologue[4].deactivate(1); Game.Scenes.Prologue[5].deactivate(1); Game.Scenes.Prologue[6].deactivate(1); Game.Scenes.Prologue[17].begin(); },
            () => { Game.Scenes.Prologue[4].deactivate(2); Game.Scenes.Prologue[5].deactivate(2); Game.Scenes.Prologue[6].deactivate(2); Game.Scenes.Prologue[18].begin(); },
            () => { Game.Scenes.Prologue[19].begin(); },
        ],
        buttonactive: [true, true, true, false],
        background: 'Persons/Stranger',
        condition: function () {
          Game.Scenes.Prologue[4].activate(0); Game.Scenes.Prologue[5].activate(0); Game.Scenes.Prologue[6].activate(0);
          Game.Scenes.Prologue[4].activate(1); Game.Scenes.Prologue[5].activate(1); Game.Scenes.Prologue[6].activate(1);
          Game.Scenes.Prologue[4].activate(2); Game.Scenes.Prologue[5].activate(2); Game.Scenes.Prologue[6].activate(2);
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false) {
                this.buttonactive[3] = true;
            }
            else{
              this.buttonactive[3] = false;
            }
        }
    });

Game.Scenes.Prologue[16] =
    new Scene({
        text: `Всего на секунду проводник задумался, но потом уверенно сказал:
            <p>- 22.
            <p>Я хотела вспомнить, чем занималась в жизни, но сознание не отзывалось. Как будто на него навесили черный заслон, и все что я могла – это слепо верить, хватать остатки былых ощущений.
            <p>- Ты меня знаешь… Откуда?
        `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.Prologue[4].begin() }],
        background: 'Persons/Stranger',
    });

Game.Scenes.Prologue[4] =
    new Scene({
        text: `
            - Я знаю все. А ты привлекла меня, потому что оказалась немного интереснее других. Знаешь, я многое могу рассказать. Твою собаку звали Чарли. Любимый цвет – фиолетовый. Ты пытаешься бросить курить. Твоя мать изменяет отцу…
            <p>- Прекрати! – я сорвалась на крик. – Это не я… Свою жизнь я не помню.
            <p>- Это пока…
        `,
        buttontext: [
            'Сколько мне лет?',
            'Где я родилась?',
            'Я умерла?',
            'Закончить диалог'
        ],
        buttonaction: [
            () => { Game.Scenes.Prologue[4].deactivate(0); Game.Scenes.Prologue[5].deactivate(0); Game.Scenes.Prologue[6].deactivate(0); Game.Scenes.Prologue[16].begin(); },
            () => { Game.Scenes.Prologue[4].deactivate(1); Game.Scenes.Prologue[5].deactivate(1); Game.Scenes.Prologue[6].deactivate(1); Game.Scenes.Prologue[17].begin(); },
            () => { Game.Scenes.Prologue[4].deactivate(2); Game.Scenes.Prologue[5].deactivate(2); Game.Scenes.Prologue[6].deactivate(2); Game.Scenes.Prologue[18].begin(); },
            () => { Game.Scenes.Prologue[19].begin(); },
        ],
        buttonactive: [true, true, true, false],
        background: 'Persons/Stranger',
        condition: function () {
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false) {
                this.buttonactive[3] = true;
            }
            else{
              this.buttonactive[3] = false;
            }
        }
    });

Game.Scenes.Prologue[17] =
    new Scene({
        text: `Фигура в плаще развела руками и проговорила:
            <p>- В обычном городе, в обычной квартире, в обычной семье. К чему это? Ты уже нафантазировала себе, что ты дочь серафима? Или, быть может, принцесса?
            <p>Я ожидала большей конкретики, но видимо проводник решил, что делать на этом акцент бессмысленно.
            <p>- Что это за место?
        `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.Prologue[5].begin(); Game.message("Серафим - высший ангельский чин, наиболее приближенный к Богу."); }],
        background: 'Persons/Stranger',
    });

Game.Scenes.Prologue[5] =
    new Scene({
        text: `
            - Место, где все началось, место, где, надеюсь, все и закончится.
            <p>- Ты всегда будешь говорить загадками? – я обреченно вздохнула.
            <p>- Нет, только когда это уместно.              
        `,
        buttontext: [
            'Сколько мне лет?',
            'Где я родилась?',
            'Я умерла?',
            'Закончить диалог'
        ],
        buttonaction: [
            () => { Game.Scenes.Prologue[4].deactivate(0); Game.Scenes.Prologue[5].deactivate(0); Game.Scenes.Prologue[6].deactivate(0); Game.Scenes.Prologue[16].begin(); },
            () => { Game.Scenes.Prologue[4].deactivate(1); Game.Scenes.Prologue[5].deactivate(1); Game.Scenes.Prologue[6].deactivate(1); Game.Scenes.Prologue[17].begin(); },
            () => { Game.Scenes.Prologue[4].deactivate(2); Game.Scenes.Prologue[5].deactivate(2); Game.Scenes.Prologue[6].deactivate(2); Game.Scenes.Prologue[18].begin(); },
            () => { Game.Scenes.Prologue[19].begin(); },
        ],
        buttonactive: [true, true, true, false],
        background: 'Persons/Stranger',
        condition: function () {
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false) {
                this.buttonactive[3] = true;
            }
            else{
              this.buttonactive[3] = false;
            }
        }
    });

Game.Scenes.Prologue[18] =
    new Scene({
        text: `
            Проводник разразился смехом.
            <p>- Бинго! Я всегда жду, когда этот вопрос зададут.
            <p>- Но ты не ответил… А я и не знаю, что думать. Ты выглядишь как жнец, готовящийся отправить меня в преисподнюю.
            <p>- Настолько ли я страшен?
        `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.Prologue[6].begin() }],
        background: 'Persons/Stranger',
    });

Game.Scenes.Prologue[6] =
    new Scene({
        text: `
            - Что мне ожидать от… - я помедлила, - от существа, которое скрывает свое лицо.
            <p>- О! Так в этом дело. Поумерь любопытство и перестань выдумывать . Все намного проще…
            <p>- Я…
            <p>Проводник жестом показал, что стоит перейти на другую тему.              
        `,
        buttontext: [
            'Сколько мне лет?',
            'Где я родилась?',
            'Я умерла?',
            'Закончить диалог'
        ],
        buttonaction: [
            () => { Game.Scenes.Prologue[4].deactivate(0); Game.Scenes.Prologue[5].deactivate(0); Game.Scenes.Prologue[6].deactivate(0); Game.Scenes.Prologue[16].begin(); },
            () => { Game.Scenes.Prologue[4].deactivate(1); Game.Scenes.Prologue[5].deactivate(1); Game.Scenes.Prologue[6].deactivate(1); Game.Scenes.Prologue[17].begin(); },
            () => { Game.Scenes.Prologue[4].deactivate(2); Game.Scenes.Prologue[5].deactivate(2); Game.Scenes.Prologue[6].deactivate(2); Game.Scenes.Prologue[18].begin(); },
            () => { Game.Scenes.Prologue[19].begin(); },
        ],
        buttonactive: [true, true, true, false],
        background: 'Persons/Stranger',
        condition: function () {
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false) {
                this.buttonactive[3] = true;
            }
            else{
              this.buttonactive[3] = false;
            }
        }
    });

Game.Scenes.Prologue[19] =
    new Scene({
        text: `
            - На этом мы закончим. Я понимаю, что тебя интересует многое. Но время не ждет. Готова ли ты вспомнить, что пережила?
        `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.Prologue[8].begin(); Game.message('Сейчас вы сделаете свой первый выбор. Некоторые из них меняют сюжет незначительно, другие же ведут к серьезным переменам. Но помните, только Вам решать, какой вы видите свою главную героиню.'); }],
        background: 'Persons/Stranger',
    });

Game.Scenes.Prologue[8] =
    new Scene({
        text: `
            Я кивнула, немного поежившись. Я вдруг смогла почувствовать… холод?  Или это были ощущения по воспоминаниям из моей жизни? Мой загадочный собеседник заметил это и сказал:
            <p>- Ты не можешь здесь мерзнуть, расслабься.
            <p>И я…            
        `,
        buttontext: [
            'Послушалась его',
            'Продолжала замерзать'
        ],
        buttonaction: [
            () => { Game.message("Проводнику приятно, что вы послушались его"); Game.Scenes.Prologue[11].begin(); Game.Stats.God.add(1); },
            () => { Game.message("Проводник другого и не ожидал…"); Game.Scenes.Prologue[9].begin(); Game.Stats.God.add(0); }
        ],
        background: 'Persons/Stranger',
    });

Game.Scenes.Prologue[9] =
    new Scene({
        text:
            `Мои забытые ощущения брали вверх. Тело стало еще сильнее дрожать, пока я окончательно не околела. Становилось страшно, темно. 
            <p>- Я не могу… Я не понимаю.
            <p>Проводник, до этого стоявший на одном месте, подошел ко мне и положил ладонь мне на плечо.
        `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.Prologue[52].begin(); Game.Achievements.PrologueCompleted.unlock(); }],
        background: 'Backgrounds/Abstraction',
    });

Game.Scenes.Prologue[52] =
  new Scene({
    text:
      `
      Постепенно я начала чувствовать, как температура возвращается в норму.
      <p>- Люди такие люди, - он отошел от меня, оставив приятное чувство тепла от прикосновения.  – Давай перейдем к делу.      
      <p>Проводник развел руками и перед ним возникла потрепанная временем дверь, которая периодически мерцала, словно вспышка. 
      Свет отвлекал, я не могла заглянуть внутрь и разглядеть, куда ведет проход. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.Prologue[10].begin(); Game.Achievements.PrologueCompleted.unlock(); }],
    background: 'Backgrounds/Door',
  });

Game.Scenes.Prologue[10] =
    new Scene({
        text: `
            Однако, на миг, мне показалось, что за деревянными створками кипит настоящая жизнь: 
            звонкий мужской голос со странным акцентом что-то говорит про выпечку, грохот от колес, что несутся по каменной кладке; одним словом - звуки большого города. 
            <p>- Ты готова?
            <p>Я неуверенно кивнула, следуя за таинственным гостем в неизвестность.            
        `,
        buttontext: [''],
        buttonaction: [() => {
            setTimeout(() => { Game.Scenes.FirstChapter[0].begin(); }, 1000);
            Game.LoadScreen('FirstChapter');
            Game.Progress.save("FirstChapter");

        }],
        background: 'Backgrounds/Door',
    });

Game.Scenes.Prologue[11] =
    new Scene({
        text: `
            Я попыталась максимально абстрагироваться, внушая себе, что сейчас я бесформенное нечто, не способное переживать  прежние эмоции и ощущения.
            <p>Проводник удовлетворительно кивнул и сказал:
            <p>- Здесь нам ничего не может угрожать. Разве что, бренное существование… Одинокое… - с грустью в голосе сказал неизвестный. 
            <p>– Забудь, давай перейдем к делу.            
        `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.Prologue[52].begin(); Game.Achievements.PrologueCompleted.unlock(); }],
        background: 'Persons/Stranger',
    });Game.Scenes.FirstChapter = [];

Game.Scenes.FirstChapter[0] =
    new Scene({
        text: `
            Утреннее солнце  пробивалось сквозь шторы, пытаясь разбудить меня. Я лениво потянулась, надеясь, что есть ещё  возможность поваляться. 
            Взглянув на телефон, стало ясно, что будильник еще не прозвенел, а значит в запасе были сладостные минуты сна.
        `,
        buttontext: [
            'Поспать ещё',
            'Встать'
        ],
        buttonaction: [
            () => { Game.Scenes.FirstChapter[1].begin(); Game.Stats.ForgotHomework.add(1); Game.Achievements.Sleeper.unlock(); Game.Stats.Money.add(700); },
            () => { Game.Scenes.FirstChapter[31].begin(); Game.Achievements.GoodGirl.unlock(); Game.Stats.Money.add(700); }
        ],
        background: 'Backgrounds/Room',
        condition: () => { Game.Sounds.play('Music', 'FirstChapter');  Game.Effects.Flash(); }
    });

Game.Scenes.FirstChapter[1] =
    new Scene({
        text: `
            Я убрала телефон и завернулась в одеяло, чтобы спрятаться от назойливых лучей.
        `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[2].begin(); }],
        background: 'Backgrounds/Room',
    });

Game.Scenes.FirstChapter[2] =
    new Scene({
        text: `
            Мне снились странные сны. Один из них я запомнила отчетливее  других. Мужские руки крепко обнимали меня, не давая вырваться. Но мне это нравилось. 
            Я чувствовала тягу к нему, будто бы в этих объятиях заключался мой смысл. 
            <p>Он отстранился. Я не могла разглядеть его лицо, хоть и стояла совсем близко. Мне что-то мешало… Мужчина нежно взял меня за руку и сказал:
            <p>- Ты должна выбрать сторону…
        `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[3].begin(); }],
        background: '',
    });

Game.Scenes.FirstChapter[3] =
    new Scene({
        text: `
            Через некоторое время я открыла глаза, до сих пор ощущая прикосновения. Но из моего умиротворенного состояния меня вытянуло тиканье настенных часов. 
            Я неохотно взглянула на них и с ужасом осознала, что опаздываю на занятия.
            <p>«Мягкая кровать и теплое одеяло - ловушка дьявола!»
            <p>Я начала метаться по квартире в поисках необходимых мне вещей для занятий, затем оделась и спустилась вниз. Времени завтракать не было, поэтому я сразу выбежала на улицу.
        `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[4].begin(); Game.message('В инвентаре вы можете посмотреть отношения с персонажами и имеющиеся у вас предметы.') }],
        background: 'Backgrounds/Room',
    });

Game.Scenes.FirstChapter[4] =
    new Scene({
        text: `
            “Может мне поехать на такси? Так я точно не опоздаю и у меня не будет проблем с учёбой. 
            Или все-таки выбрать автобус? К тому же денег у меня совсем немного, нужно экономить для чего-то действительно важного. 
            Но когда приедет моя карета - вот, что меня волнует”. 
        `,
        buttontext: [
            'Потратить деньги на такси (200)',
            'Потратить деньги на автобус (50)'],
        buttonaction: [
            () => { Game.Scenes.FirstChapter[5].begin(); Game.Stats.Money.add(-200); Game.Achievements.MoneySpender.unlock(); },
            () => { Game.Scenes.FirstChapter[25].begin(); Game.Stats.Late.add(1); Game.Stats.Money.add(-50); Game.Stats.ScarlettSpeech.add(-1) },
        ],
        background: '',
    });

Game.Scenes.FirstChapter[5] =
    new Scene({
        text: `
            Не долго думая, я открыла мобильное приложение и заказала машину. Через несколько минут я уже ехала в сторону университета. 
            <p>Мне попался разговорчивый водитель, все пытающийся мне что-то рассказать или спросить. 
            Он задавал кучу вопросов на которые мне, спросонья, не хотелось отвечать. 
            Я деликатно отказалась от общения, вставила наушники с музыкой и закрыла глаза. 
            Сон подступил незаметно, но от этого он был еще приятнее.
        `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[6].begin(); }],
        background: 'Backgrounds/Car',
    });

Game.Scenes.FirstChapter[6] =
    new Scene({
        text: `
            Из дремы меня вытащила вибрация телефона, пришло  сообщение от Шерил - моей подруги детства, мы с ней вместе сколько я себя помню.
        `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[7].begin(); }],
        background: '',
    });

Game.Scenes.FirstChapter[7] =
    new Scene({
        text: `
            Она жаловалась, что ее приемный отец в очередной раз напился и угрожал сделать ужасные вещи. 
            Я давно советовала ей подать заявление в полицию,  попытаться съехать от него, но некая привязанность удерживала ее в этом доме ужасов. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[8].begin(); }],
        background: 'Backgrounds/Phone',
    });

Game.Scenes.FirstChapter[8] =
    new Scene({
        text: `
            Что сказать, эта девушка была со странностями. 
            Любила фантазировать, могла часами пропадать в своем  выдуманном  мире, но при этом, это тот человек, про которого я с уверенностью могу сказать «и в горе, и в радости, несмотря ни на что».
        `,
        buttontext: [
            'Найти нужные слова поддержки',
            'Сказать быть решительнее'
        ],
        buttonaction: [
            () => { Game.Scenes.FirstChapter[9].begin(); Game.message("Шерил приятна ваша забота"); Game.Stats.Cheryl.add(1); Game.Stats.Key01.add(1); },
            () => { Game.Scenes.FirstChapter[10].begin(); Game.Stats.Key01.add(1); }
        ],
        background: 'Backgrounds/Phone',
    });

Game.Scenes.FirstChapter[9] =
    new Scene({
        text: `
            Шерил скинула мне смайлик в виде сердечка и поблагодарила за то, что не даю ей унывать. Мы переписывались до самого моего приезда в университет.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[12].begin(); }],
        background: 'Backgrounds/Phone',
        condition: function () {
            if (Game.Stats.Late.get >= 1) {
                this.buttonaction[0] = () => { Game.Scenes.FirstChapter[27].begin(); };
            }
            if (Game.Stats.ForgotHomework.get <= 0) {
                this.buttonaction[0] = () => { Game.Scenes.FirstChapter[37].begin(); };
            }

          if (Game.Stats.Money.get <= 500) {
            this.buttonaction[0] = () => { Game.Scenes.FirstChapter[211].begin(); };
          }
        },
    });

Game.Scenes.FirstChapter[211] =
  new Scene({
    text: `
            Я вышла из такси. Времени оставалось около 15-ти минут, поэтому, выдохнув, я спокойным шагом направилась в сторону входа. 
            <p>Университет, в котором я училась уже несколько лет, был одним из ведущих учебных заведений в нашем небольшом городе.
            `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.FirstChapter[12].begin();}],
    background: 'Backgrounds/Uni',
  });

Game.Scenes.FirstChapter[10] =
    new Scene({
        text: `
            Осознав, что я устала терпеть ее нытье, я сказала Шерил прямо. Если она хочет изменить свою жизнь, то пусть прекращает жить в этом доме и возьмет себя в руки.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[11].begin(); Game.message("Шерил считает, что вы не воспринимаете ее всерьез и не оказываете поддержки"); Game.Stats.Cheryl.add(-1); }],
        background: 'Backgrounds/Phone',
    });

Game.Scenes.FirstChapter[11] =
    new Scene({
        text: `
            Ранимая душа подруги  не оценила такой резкости. Она  отправила мне плачущий смайлик и под предлогом, что у неё появились неотложные дела, прекратила переписку. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[12].begin(); }],
        background: 'Backgrounds/Phone',
        condition: function () {
            if (Game.Stats.Late.get >= 1) {
                this.buttonaction[0] = () => { Game.Scenes.FirstChapter[27].begin(); };
            }
            if (Game.Stats.ForgotHomework.get <= 0) {
                this.buttonaction[0] = () => { Game.Scenes.FirstChapter[37].begin(); };
            }

          if (Game.Stats.Money.get <= 500) {
            this.buttonaction[0] = () => { Game.Scenes.FirstChapter[211].begin(); };
          }

        },
    });

Game.Scenes.FirstChapter[12] =
    new Scene({
        text: `
            На его территории всегда было свежо и просторно: много ветвистых деревьев, аккуратно постриженный газон, скамейки, пользующиеся популярностью у прогульщиков. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[121].begin(); }],
        background: 'Backgrounds/Uni',
    });

Game.Scenes.FirstChapter[121] =
    new Scene({
        text: `
            Порой, мы собирались на них с друзьями, чтобы обсудить прошедший день или повторить материал перед занятиями. 
            Но это было раньше - сейчас все стали слишком заняты, и время ценится иначе.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[13].begin(); }],
        background: 'Backgrounds/Uni',
    });

Game.Scenes.FirstChapter[13] =
    new Scene({
        text: `
            Вдруг,  сзади послышались быстро приближающиеся шаги, переходящие на бег. Я уловила знакомый запыхавшийся, но воодушевленный женский голос. 
            <p>- $Имя Игрока$, привет! Еле догнала. Необычно встречать тебя до начала занятий, а не на второй паре, - с ухмылкой проговорила девушка. -  Ну, что, успела закончить домашнее задание?`,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[14].begin(); }],
        background: 'Persons/Scarlett',
    });

Game.Scenes.FirstChapter[14] =
    new Scene({
        text: `
            Что-то во мне оборвалось, нарастало неприятное чувство. Я начала лихорадочно копаться в рюкзаке, выбрасывая все вещи в руки своей подруги. Опустошив всю сумку, я окончательно убедилась, что забыла работу дома.
            <p>“Если бы я только снова не уснула…” 
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[212].begin(); }],
        background: 'Persons/Scarlett',
    });

Game.Scenes.FirstChapter[212] =
  new Scene({
    text: `
            Обреченно запихивая вещи обратно в рюкзак, я проговорила:
            <p>- Профессор Нэйтан убьёт меня… Как же я могла так облажаться. Всю ночь сидела и писала. 
            <p>- У тебя было много времени и ты опять решила отложить работу до последнего?
            `
    ,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.FirstChapter[15].begin(); }],
    background: 'Persons/Scarlett',
  });

Game.Scenes.FirstChapter[15] =
    new Scene({
        text: `
            Я сделала мою фирменную грустную моську с щенячьими глазками, и Скарлетт ничего не оставалось, кроме как перестать читать мне нотации и пожалеть. 
            <p>- Ладно, уверена, что учитель войдет в твое положение, - Скарлетт приободряюще обняла меня. - Завтра сдашь.
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[212].begin(); }],
        background: 'Persons/Scarlett',
    });

Game.Scenes.FirstChapter[212] =
  new Scene({
    text: `
            Ее оптимизм не придал мне уверенности, что все закончится хорошо, так как профессор был довольно строг в отношении учебы. Мне оставалось только просить отсрочку. 
            <p>“И просить как можно убедительнее!”
            `
    ,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.FirstChapter[140].begin(); }],
    background: 'Persons/Scarlett',
  });

Game.Scenes.FirstChapter[140] =
    new Scene({
        text: `
            <p>- Я тебя догоню. Мне нужно зайти в «тайную комнату». Займи мне место. 
            <p>- Хорошо, $Имя Игрока$,- подавляя смех, проговорила Скарлетт. - Не задерживайся!
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[16].begin(); }],
        background: 'Persons/Scarlett',
    });

Game.Scenes.FirstChapter[16] =
    new Scene({
        text: `
            В уборной никого не было, поэтому я смогла спокойно воспользоваться зеркалом и привести себя в порядок. Мне была необходима передышка после сумбурного утра.
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[17].begin(); }],
        background: '',
    });

Game.Scenes.FirstChapter[17] =
    new Scene({
        text: `
            Я поправила небрежный хвост и взглянула в свои карие глаза. 
            <p>“Нужно больше спать… Чертовы мешки под глазами!”
            <p>Я немного подкрасила брови и ресницы. Мне больше нравилась естественная красота, поэтому косметика не была моей близкой подругой. Я еще немного поколдовала над собой и вышла в коридор.
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[18].begin(); }],
        background: 'Persons/Hero',
        condition: function () {
            if (Game.Stats.Late.get >= 1) {
                this.buttonaction[0] = () => { Game.Scenes.FirstChapter[29].begin(); };
            }
        },
    });

Game.Scenes.FirstChapter[18] =
    new Scene({
        text: `
            На пару я пришла вовремя и села рядом со Скарлетт. 
            До начала занятий, она успела поведать мне немного о своих проблемах с мамой. 
            У них не сходились интересы. Родные девушки не могли представить свою дочь в роли историка.            
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[19].begin(); }],
        background: 'Backgrounds/Lection',
    });

Game.Scenes.FirstChapter[19] =
    new Scene({
        text: `
            - Ты представляешь, $Имя Игрока$, я заявила, что хочу работать в архивах, а она все снова про свой бизнес. Плевать ей на мои желания! 
            <p>- А отец? - спросила я, пока раскладывала учебные принадлежности на парте. 
            <p>- Ушел рано, у него собеседование. 
            <p>- Есть шансы, что он устроится на работу? 
            <p>- Не знаю. Хоть папа и всегда меня поддерживал, но сейчас он больше походит на зомби, чем на человека. Мама в конец достала его пилить.             
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[20].begin(); }],
        background: 'Persons/Scarlett',
    });

Game.Scenes.FirstChapter[20] =
    new Scene({
        text: `
            Я была мало посвящена в семейные проблемы подруги. Скарлетт была довольно закрытым человеком. А может она просто боялась показаться уязвимой. Мне же…             
            `
        ,
        buttontext: [
            'Были понятны её чувства',
            'Было всё равно'
        ],
        buttonaction: [
            () => { Game.Scenes.FirstChapter[21].begin(); Game.Stats.Scarlett.add(1); Game.message("Скарлетт дорожит вашей дружбой") },
            () => { Game.Scenes.FirstChapter[22].begin(); Game.Stats.Scarlett.add(-1); Game.message("Вы со Скарлетт не такие уж и близкие подруги") }
        ],
        background: 'Persons/Scarlett',
    });

Game.Scenes.FirstChapter[21] =
    new Scene({
        text: `
            Семья - это важно, но каждый вправе жить  и делать выбор, опираясь на свои желания. Понемногу, но Скарлетт открывалась мне и я хотела быть на ее стороне.      
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[23].begin(); }],
        background: 'Persons/Scarlett',
        condition: function () {
            if (Game.Stats.ForgotHomework.get <= 0) {
                this.buttonaction[0] = () => { Game.Scenes.FirstChapter[41].begin(); };
            }
        },

    });

Game.Scenes.FirstChapter[22] =
    new Scene({
        text: `
            Каждый жил своей жизнью. Нужно было фокусироваться на своих проблемах, а не лезть в чужие. У Скарлетт была возможность не усложнять себе жизнь, она же выбрала иной путь.    
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[23].begin(); }],
        background: 'Persons/Scarlett',
        condition: function () {
            if (Game.Stats.ForgotHomework.get <= 0) {
                this.buttonaction[0] = () => { Game.Scenes.FirstChapter[41].begin(); };
            }
        },
    });

Game.Scenes.FirstChapter[23] =
    new Scene({
        text: `
            В лекционный зал вошел профессор Нэйтан. Гул, стоявший от болтовни студентов, сразу же стих. Вместо него появились звуки шуршания в рюкзаках и перелистывания страниц учебников. 
            Все были готовы к началу лекции. 
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[213].begin(); }],
        background: 'Persons/Neitan',
    });

Game.Scenes.FirstChapter[213] =
  new Scene({
    text: `
            Это была одна из немногих пар, на которые учащиеся приходили с чувством заинтересованности.  
            Время пролетало мгновенно, в силу того, что профессор был необычайно талантлив и умел грамотно преподавать материал. 
            <p>- Давайте начнем, думаю, все, кто хотел присутствовать сегодня - уже пришли, - его голос звучал размеренно и спокойно. 
            `
    ,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.FirstChapter[24].begin(); Game.message("Профессор рад, что никто не опоздал"); Game.Stats.Neitan.add(1) }],
    background: 'Persons/Neitan',
  });

Game.Scenes.FirstChapter[24] =
    new Scene({
        text: `
            Нэйтан был одет в черный костюм: пиджак, рубашка, приталенные брюки - ничего лишнего. 
            Он выглядел соответствующе тому, на кого было приковано много внимания. 
            Профессор  всегда держал голову высоко, а спину прямо. 
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[190].begin(); }],
        background: 'Persons/Neitan',
    });

Game.Scenes.FirstChapter[190] =
    new Scene({
        text: `
            Многие студентки не раз предпринимали  попытки флирта, но преподаватель всегда держался холодно и отстраненно. Гораздо важнее для него - передать знания и научить чему-то полезному. 
            Нэйтан всегда подчеркивал важность учебы и негативно относился к невыполнению требований к занятиям. 
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[42].begin(); }],
        background: 'Persons/Neitan',
    });

Game.Scenes.FirstChapter[25] =
    new Scene({
        text: `
            Автобус приехал не сразу, но хотя бы полупустой. Я прошла в конец салона, чтобы никто не отвлекал меня от моих мыслей и заняла место около окна. 
            Включив любимую музыку, я стала наблюдать за проносившимися скучными пейзажами. 
            Стандартные дома, вечно куда-то торопящиеся люди, но под музыку все казалось не таким серым и обыденным. 
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[26].begin(); }],
        background: 'Backgrounds/Bus',
    });

Game.Scenes.FirstChapter[26] =
    new Scene({
        text: `
            Мою поездку скрасила переписка с Шерил - подругой из соседнего дома.
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[7].begin(); }],
        background: 'Backgrounds/Bus',
    });

Game.Scenes.FirstChapter[27] =
    new Scene({
        text: `
            Когда автобус почти подъехал, до начала пары оставалось 5 минут. Университет, в котором я училась уже несколько лет, был одним из ведущих учебных заведений в нашем небольшом городе. 
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[160].begin(); }],
        background: 'Backgrounds/Uni',
    });

Game.Scenes.FirstChapter[160] =
    new Scene({
        text: `
            На его территории всегда было свежо и просторно: много ветвистых деревьев, аккуратно постриженный газон, скамейки, пользующиеся популярностью у прогульщиков. 
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[161].begin(); }],
        background: 'Backgrounds/Uni',
    });

Game.Scenes.FirstChapter[161] =
    new Scene({
        text: `
            Порой, мы собирались на них с друзьями, чтобы обсудить прошедший день или повторить материал перед занятиями. Но это было раньше - сейчас все стали слишком заняты, и время ценится иначе.
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[28].begin(); }],
        background: 'Backgrounds/Uni',
    });

Game.Scenes.FirstChapter[28] =
    new Scene({
        text: `
            Я стала настраиваться на предстоящее занятие, как вдруг что-то во мне оборвалось, нарастало неприятное чувство. Я начала лихорадочно копаться в рюкзаке, выбрасывая все вещи на соседнее сидение. Опустошив всю сумку, я окончательно убедилась, что забыла работу дома. 
            <p>“Если бы я только снова не уснула…” 
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[210].begin(); }],
        background: 'Backgrounds/Bus',
    });

Game.Scenes.FirstChapter[210] =
  new Scene({
    text: `
            Обреченно запихивая вещи обратно в рюкзак, я подумала:
            <p>“Профессор Нэйтан убьёт меня… Как же я могла так облажаться. Всю ночь ведь сидела и писала”. 
            <p>Я быстро выбежала из транспорта, предварительно забежав в уборную.
            `
    ,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.FirstChapter[16].begin(); }],
    background: 'Backgrounds/Bus',
  });

Game.Scenes.FirstChapter[29] =
    new Scene({
        text: `
            Я опоздала на пару и вбежала в аудиторию во время увлекательного рассказа профессора Нэйтана. 
            Все обернулись на меня и я прочитала в их глазах недовольство. 
            Взгляд учителя мельком скользнул по мне, он знаком показал на свободное место рядом с моей подругой Скарлетт.
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[30].begin(); }],
        background: 'Backgrounds/Lection',
    });



Game.Scenes.FirstChapter[30] =
    new Scene({
        text: `
            Из-за опоздания, мне пришлось нагонять материал и в спешке переписывать конспект у одногруппницы. 
            Не было времени даже на перешептывание, так как профессор Нэйтан изредка бросал на меня строгий взгляд, чтобы удостовериться в том, что я действительно занимаюсь делом. 
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[180].begin(); }],
        background: 'Persons/Neitan',
    });

Game.Scenes.FirstChapter[180] =
    new Scene({
        text: `
            И  не зря, ведь  это была одна из немногих пар, на которые  учащиеся  приходили с чувством заинтересованности.  
            Время пролетало мгновенно, в силу того, что профессор был необычайно талантлив и  грамотно  преподавал материал. 
            <p>- Давайте продолжим, думаю, все уже пришли, - его голос звучал размеренно, но недовольно.
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[24].begin(); Game.message("Профессор недоволен вашим опозданием"); Game.Stats.Neitan.add(-1); }],
        background: 'Persons/Neitan',
    });

Game.Scenes.FirstChapter[31] =
    new Scene({
        text: `
            Я не поддалась на это искушение, встала с кровати и начала собираться, вовремя вспомнив про домашнее задание к паре профессора Нэйтана. 
            <p>”Я почти его забыла. Моя успеваемость и так  оставляет желать лучшего…”
            <p>Когда последние приготовления были сделаны, я заглянула в ванную, чтобы привести себя в порядок. 
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[32].begin(); Game.message('В инвентаре вы можете посмотреть отношения с персонажами и имеющиеся у вас предметы.'); }],
        background: 'Backgrounds/Room',
    });

Game.Scenes.FirstChapter[32] =
    new Scene({
        text: `
            Я поправила небрежный хвост и взглянула в свои карие глаза. 
            <p>“Нужно больше спать… Чертовы мешки под глазами!”
            <p>Я немного подкрасила брови и ресницы. Мне больше нравилась естественная красота, поэтому косметика не была моей близкой подругой. 
            Я еще немного поколдовала над собой и вышла из помещения.
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[33].begin(); }],
        background: 'Persons/Hero',
    });

Game.Scenes.FirstChapter[33] =
    new Scene({
        text: `
            Я спустилась вниз, откуда раздавался чудесный аромат чего-то съестного. За столом сидел отец, который что-то нервно печатал в телефоне. 
            <p>- Доброе утро, пап! - я нежно поцеловала его в щечку. 
            <p>- Привет, милая. Ты сегодня рано.
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[130].begin(); }],
        background: 'Backgrounds/Kitchen',
    });

Game.Scenes.FirstChapter[130] =
  new Scene({
    text: `
            Отец выглядел сонным и расстроенным, но все равно улыбался мне.
            <p>- Все в порядке? - я решила спросить, хотя понимала, что он вряд ли скажет правду. 
            <p>- Конечно, не бери в голову. Будешь кушать? Мама не оставила нас голодными. 
            `
    ,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.FirstChapter[102].begin(); }],
    background: 'Backgrounds/Kitchen',
  });

Game.Scenes.FirstChapter[102] =
    new Scene({
        text: `
            “В последнее время он стал совсем отстраненным. Раньше мы могли часами проводить время вместе: играть в настольные игры, рубиться в приставку, гулять - а теперь для него, словно, перестали существовать все прелести жизни. 
            Почему же он не откроется мне? В глубине души я как будто бы знала причину, но не хотела этого признавать.” 
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[34].begin(); }],
        background: 'Backgrounds/Kitchen',
    });

Game.Scenes.FirstChapter[34] =
    new Scene({
        text: `
            <p>- О, да! Она у нас трудяга, - сейчас мне лишь оставалось продолжить разговор в привычном русле.
            <p>Я решила покушать…
            `
        ,
        buttontext: [
            'Фруктовый салат',
            'Бутерброды',
            'Блины'
        ],
        buttonaction: [
            () => { Game.Scenes.FirstChapter[35].begin(); Game.message("Свежие фрукты в сочетании с йогуртом оказались очень питательными и вкусными.") },
            () => { Game.Scenes.FirstChapter[35].begin(); Game.message("Старая классика. Хлеб, сыр и колбаса, что может быть проще и вкуснее?") },
            () => { Game.Scenes.FirstChapter[35].begin(); Game.message("Я подогрела несколько блинов в микроволновке. Они оказались с мясом.") },
        ],
        background: 'Backgrounds/Kitchen',
    });

Game.Scenes.FirstChapter[35] =
    new Scene({
        text: `
            Во время трапезы, мы еще немного переговорили с отцом о мелочах связанных с бытом, а затем он предложил довести меня до университета. Я охотно согласилась, чтобы не ждать автобус и не тратить деньги на такси. 
            <p>Всю дорогу мы молчали, наслаждаясь музыкой и окружающими видами.
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[36].begin(); }],
        background: 'Backgrounds/Car',
    });

Game.Scenes.FirstChapter[36] =
    new Scene({
        text: `
            Мою поездку скрасила переписка с Шерил - подругой из соседнего дома.
            <p>Она жаловалась, что ее приемный отец в очередной раз напился и угрожал сделать ужасные вещи. Я давно советовала ей подать заявление в полицию,  попытаться съехать от него, но некая привязанность удерживала ее в этом доме ужасов. 
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[8].begin(); }],
        background: 'Backgrounds/Phone',
    });

Game.Scenes.FirstChapter[37] =
    new Scene({
        text: `
            Поездка не заняла много времени, когда мы подъезжали, я еще раз поблагодарила папу и покинула транспорт. 
            Времени оставалось еще много, поэтому, выдохнув, я спокойным шагом направилась в сторону входа.
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[38].begin(); }],
        background: 'Backgrounds/Uni',
    });

Game.Scenes.FirstChapter[38] =
    new Scene({
        text: `
            Университет, в котором я училась уже несколько лет, был одним из ведущих учебных заведений в нашем небольшом городе. 
            На его территории всегда было свежо и просторно: много ветвистых деревьев, аккуратно постриженный газон, скамейки, пользующиеся популярностью у прогульщиков. 
            
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[170].begin(); }],
        background: 'Backgrounds/Uni',
    });

Game.Scenes.FirstChapter[170] =
    new Scene({
        text: `
            Порой, мы собирались на них с друзьями, чтобы обсудить прошедший день или повторить материал перед занятиями. Но это было раньше - сейчас все стали слишком заняты, и время ценится иначе.
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[39].begin(); }],
        background: 'Backgrounds/Uni',
    });

Game.Scenes.FirstChapter[39] =
    new Scene({
        text: `
            Лекционный зал потихоньку заполнялся студентами. Я села на свободное место и скучающе открыла учебник, чтобы повторить материал. 
            Я смогла запомнить: Вильгельма Рентгена, который совершил прорыв в медицине и открыл рентген, Александра Флеминга, изобретателя пенициллина, Бориса Розинга, создателя более 120 схем и систем для телевизионных устройств.
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[131].begin(); }],
        background: 'Backgrounds/Lection',
    });

Game.Scenes.FirstChapter[131] =
  new Scene({
    text: `
            Но вдруг я услышала знакомый воодушевленный женский голос. 
            <p>- $Имя Игрока$, привет! Необычно встречать тебя до начала занятий, а не на второй паре, - с ухмылкой проговорила девушка. -  Ну, что, успела закончить домашнее задание?
            `
    ,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.FirstChapter[40].begin(); }],
    background: 'Backgrounds/Lection',
  });

Game.Scenes.FirstChapter[40] =
    new Scene({
        text: `
            - Привет-привет, - я нежно обняла свою подругу. 
            <p>Я победоносно улыбнулась. 
            <p>- Да! 
            <p>- Отлично, - она похлопала меня по плечу. - А то я думала, что опять придется давать тебе списывать. 
            <p>- Я нечасто к этому прибегаю, ладно уж тебе…
            <p>До начала занятий, она успела поведать мне немного о своих проблемах с мамой. У них не сходились интересы. Родные девушки не могли представить свою дочь в роли историка.
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[19].begin(); }],
        background: 'Persons/Scarlett',
    });

Game.Scenes.FirstChapter[41] =
  new Scene({
    text: `
            Мы еще немного поговорили, пока в лекционный зал не вошел профессор Нэйтан. Гул, стоявший от болтовни студентов, сразу же стих. Вместо него появились звуки шуршания в рюкзаках и перелистывания страниц учебников.
            `
    ,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.FirstChapter[132].begin(); }],
    background: 'Persons/Neitan',
  });

Game.Scenes.FirstChapter[132] =
    new Scene({
        text: `
            Все были готовы к началу лекции. Это была одна из немногих пар, на которые учащиеся приходили с чувством заинтересованности.  Время пролетало мгновенно, в силу того, что профессор был необычайно талантлив и умел грамотно преподавать материал. 
            <p>- Давайте начнем, думаю, всего уже пришли, - его голос звучал размеренно и спокойно.
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[24].begin(); Game.message("Профессор рад, что никто не опоздал"); Game.Stats.Neitan.add(1) }],
        background: 'Persons/Neitan',
    });

Game.Scenes.FirstChapter[42] =
    new Scene({
        text: `
            Профессор написал на доске мелом название сегодняшней лекции.
            <p><i>“Великие открытия человечества XIX - XX веков”.</i> 
            <p>Он отряхнул руки и внимательно посмотрел на студентов.
            <p>- Попрошу вас сдать эссе, которое я задавал неделю назад. Передайте с задних рядов вперед.
            `
        ,
        buttontext: [''],
        buttonaction: [''],
        background: 'Backgrounds/Lection',
        condition: function () {
            if (Game.Stats.ForgotHomework.get <= 0) {
                this.buttonaction[0] = () => { Game.Scenes.FirstChapter[43].begin(); Game.message("Ваша текущая успеваемость “4”"); Game.Stats.Study.set(4); Game.Stats.Neitan.add(1) };
            }
            else {
                this.buttonaction[0] = () => { Game.Scenes.FirstChapter[44].begin(); Game.message("Ваша текущая успеваемость “3”"); Game.Stats.Study.set(3) };
            }
        }
    });

Game.Scenes.FirstChapter[43] =
    new Scene({
        text: `
            Я передала свою работу вместе со всеми. Профессор удовлетворительно кивнул и перешел к основной теме занятия.
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[45].begin(); }],
        background: 'Backgrounds/Lection',
    });

Game.Scenes.FirstChapter[44] =
    new Scene({
        text: `
            Я раскраснелась, так как была среди немногих, кто не сдал работу. Профессор недовольно покачал головой и перешел к основной теме занятия.
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[45].begin(); }],
        background: 'Backgrounds/Lection',
    });

Game.Scenes.FirstChapter[45] =
    new Scene({
        text: `
            Профессор рассказывал об удивительных гениях, чьи открытия сделали в свою эпоху прорыв, который оказал огромное влияние на современный мир. 
            Его лекция не была монологом, Нэйтан часто обращался к студентам и спрашивал их мнение по тому или иному вопросу. 
            Преподаватель старался не только дать полезный материал, но и выступить в роли наставника,  поделиться своим опытом и наблюдениями. 
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[110].begin(); }],
        background: 'Persons/Neitan',
    });

Game.Scenes.FirstChapter[110] =
    new Scene({
        text: `
            Он упомянул, что все совершают ошибки, а также как ничтожна известность без настоящего рвения и знаний.  
            <p>- Потенциал многих ученых смог полностью раскрыться только в информационный век. Не стоит гоняться за бессмысленной славой и уж тем более мечтать о легких деньгах. 
            <p>Я же…
            `
        ,
        buttontext: [
            'Продолжала слушать лекцию',
            'Засматривалась на профессора',
            'Разговаривала со Скарлетт'
        ],
        buttonaction: [
            () => { Game.Scenes.FirstChapter[46].begin(); if (Game.Stats.Study.get <= 3) Game.Stats.Study.add(1); },
            () => { Game.Scenes.FirstChapter[47].begin(); Game.Stats.Neitan.add(1) },
            () => { Game.Scenes.FirstChapter[48].begin(); Game.Stats.Scarlett.add(1) }
        ],
        background: 'Persons/Neitan',
    });

Game.Scenes.FirstChapter[46] =
    new Scene({
        text: `
            Профессор вел не нудную лекцию, а как будто бы пытался достучаться до каждого в этом зале. 
            Хоть он и местами говорил очевидные вещи, но его харизма и обаяние заставляли вслушиваться в каждое слово.
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[200].begin(); }],
        background: 'Backgrounds/Lection',
    });

Game.Scenes.FirstChapter[47] =
    new Scene({
        text: `
            Преподаватель казался мне интереснее, чем учеба. 
            <p>Его голубые глаза и сосредоточенный взгляд захватили все мое внимание. Я не отрываясь смотрела на Нэйтана, любуясь им.
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[200].begin(); }],
        background: 'Persons/Neitan',
    });

Game.Scenes.FirstChapter[48] =
    new Scene({
        text: `
            Мне было гораздо интереснее обсудить с подругой последние сплетни, чем слушать лекцию. В конечном итоге, всегда можно у кого-нибудь переписать материал. 
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[200].begin(); }],
        background: 'Persons/Scarlett',
    });

Game.Scenes.FirstChapter[200] =
    new Scene({
        text: `
            Когда большая часть лекции была позади, профессор объявил:
            <p>- Давайте, вы отвлечетесь от своих тетрадей или чем вы там занимались. Проведем небольшой устный опрос. 
            Один вопрос каждому желающему, если ответите верно, поставлю плюсик к вашей оценке. Кто рискнёт? 
            `
        ,
        buttontext: [
            ''
        ],
        buttonaction: [
            () => { Game.Scenes.FirstChapter[49].begin(); },
        ],
        background: 'Persons/Neitan',
    });

Game.Scenes.FirstChapter[49] =
    new Scene({
        text: `
            Я колебалась. Не сказать, что я хорошо знала материал, но и шанс повысить успеваемость не хотелось упускать. 
            <p>И я решила: 
            `
        ,
        buttontext: [
            'Поднять руку',
            'Не поднимать руку'
        ],
        buttonaction: [
            () => { Game.Scenes.FirstChapter[111].begin(); },
            () => { Game.Scenes.FirstChapter[53].begin(); }
        ],
        background: 'Persons/Neitan',
    });

Game.Scenes.FirstChapter[111] =
    new Scene({
        text: `
            “Была ни была!”
            <p>Я резко подняла руку, чем вызвала удивление Скарлетт. Нэйтан, напротив, улыбнулся.
            <p>“Наверное подумал, наконец-то, его непутевая студентка решила взяться за учебу.”
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[50].begin(); }],
        background: 'Persons/Neitan',
    });

Game.Scenes.FirstChapter[50] =
    new Scene({
        text: `
            <p>- $Имя Игрока$, скажите, кто изобрел пенициллин? 
            <p>“Это должно быть легко, вспоминай…”

            `
        ,
        buttontext: [
            'Вильгельм Рентген',
            'Александр Флеминг',
            'Борис Розинг'
        ],
        buttonaction: [
            () => { Game.Scenes.FirstChapter[51].begin(); },
            () => { Game.Scenes.FirstChapter[52].begin(); if (Game.Stats.Study.get <= 3) Game.Stats.Study.add(1); Game.Achievements.AllKnowing.unlock(); },
            () => { Game.Scenes.FirstChapter[51].begin(); }
        ],
        background: 'Persons/Neitan',
    });

Game.Scenes.FirstChapter[51] =
    new Scene({
        text: `
            Преподаватель разочарованно вздохнул. 
            <p>- Нет, это был Александр Флеминг. В 1928 году он обнаружил воздействие плесени на бактерии. И лишь к 1943-му лекарство стали широко использовать в медицинских учреждениях. 
            Но ты все равно молодец, за смелость, я не буду снижать оценку. 
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[54].begin(); Game.Achievements.FirstPartCompleted.unlock(); }],
        background: 'Persons/Neitan',
    });

Game.Scenes.FirstChapter[52] =
    new Scene({
        text: `
            - Отлично, лекцию ты слушала. И действительно, в 1928 году он обнаружил воздействие плесени на бактерии. 
            И лишь к 1943-му лекарство стали широко использовать в медицинских учреждениях. 
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[54].begin(); Game.Achievements.FirstPartCompleted.unlock(); }],
        background: 'Persons/Neitan',
    });

Game.Scenes.FirstChapter[53] =
    new Scene({
        text: `
            Несколько ребят попытали удачу, в том числе и Скарлетт. Вопросы были не из легких, и я даже облегченно вздохнула, радуясь, что  решила не отвечать.
            `
        ,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.FirstChapter[54].begin(); Game.Achievements.FirstPartCompleted.unlock(); }],
        background: 'Backgrounds/Lection',
    });

Game.Scenes.FirstChapter[54] =
    new Scene({
        text: `
            Лекция подходила к концу, когда я ощутила сильную боль в области виска. 
            Моя рука невольно прикоснулась к лицу и я почувствовала что-то на руке. 
            Это была кровь, которая, по всей видимости, струилась у меня из носа. 
            Я неуверенно поднялась из-за парты, начала проходить между рядами, чтобы поскорее покинуть помещение. Резко перед глазами стало все расплываться.
            <p>Последнее, что отложилось у меня в памяти - крепкие объятия. А затем, давящая темнота поглотила меня.
            `
        ,
        buttontext: [''],
        buttonaction: [() => {
            setTimeout(() => { Game.Scenes.TL[1].begin(); }, 1000);
            Game.LoadScreen('TL');
            Game.Progress.save("TL");
        }],
        background: 'Backgrounds/Lection',
        condition: function () {
            if (Game.Stats.Study.get >= 5) Game.Stats.Study.set(4);
        }
    });Game.Scenes.TL = [];

Game.Scenes.TL[1] =
    new Scene({
        text: `
            Большое количество громких звуков заставило меня прийти в себя и попытаться открыть глаза. 
            Череда ярких вспышек, перетекающих в головокружение, не давали мне окончательно сосредоточиться на происходящем. 
            Но даже сквозь затуманенное сознание я видела незнакомое окружение.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[2].begin(); Game.message("<em>Нью-Йорк 1885 год"); Game.Effects.Flash(); }],
        background: '',
        condition: function () { Game.Sounds.play('Music', 'NY'); }
    });

Game.Scenes.TL[2] =
    new Scene({
        text: `
            Мужчины, одетые во фраки, с причудливыми тростями. Лошади, тянущие за собой кареты. Невиданные мною ранее здания, которые были увешаны заманивающими вывесками. 
            Впереди, на крыше одного из домов, развевался американский флаг, а внизу суетились люди, как и всегда спешащие по своим делам.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[3].begin() }],
        background: 'Backgrounds/NY',
    });

Game.Scenes.TL[3] =
    new Scene({
        text: `
            Складывалось ощущение, что я чудесным образом попала в прошлое. Однако я не была историком или прилежной ученицей, чтобы точно определить эпоху.
            <p>“Машин нет, старомодная одежда… Наверно это XIX или XX век”. 
            <p>Я неспешно подошла к одному магазину, судя по всему торгующему ювелирными изделиями, где всматриваясь в стеклянную витрину, я увидела свое отражение. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[4].begin() }],
        background: 'Backgrounds/NY',
    });

Game.Scenes.TL[4] =
    new Scene({
        text: `
            Это была я? Мои каштановые волосы, лицо… Но некоторые черты все же отличались. Например, форма глаз или бровей. В остальном, девушка была моей копией. 
            Словно я нашла своего двойника, здесь, в другом времени. 

            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[5].begin() }],
        background: 'Persons/Hero_TL',
    });

Game.Scenes.TL[5] =
    new Scene({
        text: `
            Я бездумно смотрела вперед: щипая себя за руки,  хлопая по щекам… Ощущения были реальными, но я все равно подсознательно отрицала происходящее.
            <p>“Как такое может быть правдой?” 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[6].begin() }],
        background: 'Persons/Hero_TL',
    });


Game.Scenes.TL[6] =
    new Scene({
        text: `
            Меня немного трясло, поэтому я облокотилась о небольшую колонну рядом с одним из зданий, в надежде, что чувствуя опору состояние улучшится.
            <p>Через некоторое время ко мне подошел мужчина.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[7].begin() }],
        background: '',
    });

Game.Scenes.TL[7] =
    new Scene({
        text: `
            Он был худой, с забавными усами и задорной улыбкой. Идеально ровная спина, гордо поднятая голова. 
            Серый костюм подчеркивал фигуру и намекал на не самое последнее положение в обществе.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[8].begin(); Game.Stats.Nicola.add(0) }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[8] =
    new Scene({
        text: `
            Его радушный вид вмиг померк при взгляде на меня и он обеспокоенно спросил: 
            <p>- Катарина, что случилось? 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[209].begin() }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[209] =
  new Scene({
    text: `
            Я не смогла ничего выдавить из себя. Затуманенным взглядом я смотрела на мужчину, которого узнала. Именно про него я писала эссе, заданное профессором Нэйтаном. 
            <p>- Ты - Никола Тесла!
            <p>Я сказала это быстро, неосознанно, практически тыча ему в лицо пальцем. Взгляд цеплялся за живую легенду, будто только что сошедшую со страниц моего учебника.
            `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.TL[208].begin() }],
    background: 'Persons/Nicola',
  });

Game.Scenes.TL[208] =
    new Scene({
        text: `
            - Катарина, конечно, это я. Тебе плохо? Ты совсем побледнела. 
            <p>Сон был настолько реален, что я чувствовала его прикосновение. Он дрожащими руками держал меня за плечи, продолжая повторять: 
            <p>- Давай дойдем до доктора… Это всего в нескольких кварталах отсюда. Если необходимо, я поймаю экипаж! 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[9].begin() }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[9] =
    new Scene({
        text: `
            <p>Мне нужно было что-то придумать, чтобы оправдать свое поведение. Но стоило ли так стараться, если это все равно сон и мои выборы нереальны? Я выбрала:
            `,
        buttontext: [
            'Отнестись серьёзно',
            'Не верить в происходящее',
            'Убежать'
        ],
        buttonaction: [
            () => { Game.Scenes.TL[10].begin(); Game.Stats.Believe.add(1); },
            () => { Game.Scenes.TL[33].begin(); Game.Stats.Believe.add(-1); },
            () => { Game.Scenes.TL[49].begin(); Game.Achievements.Crazy.unlock(); Game.Stats.Believe.add(-1); }
        ],
        background: 'Persons/Nicola',
    });



Game.Scenes.TL[10] =
    new Scene({
        text: `
            Я решительно взглянула в его голубые глаза, которые выглядели уставшими и чрезмерно озадаченными. 
            <p>- Все в порядке, просто голова закружилась,- я подыгрывала этому спектаклю моего подсознания.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[11].begin(); Game.message("Никола вам сочувствует"); Game.Stats.Nicola.add(1); }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[11] =
    new Scene({
        text: `
            - Но врач недалеко, - Тесла начал суетливо осматривать карманы. - Мы немедленно должны написать телеграмму Роберту о твоем самочувствии. 
            Он просил приглядывать за тобой в его отсутствие. 
            <p>- Нет-нет, в этом нет необходимости, я абсолютно здорова, - я могла лишь выдать глупую улыбку, надеясь, что Тесла поверит в этот фарс.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[12].begin() }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[12] =
    new Scene({
        text: `
            Он действительно отступил. 
            По его манере поведения было сложно судить, о чем он думает, однако благодаря написанному мною эссе, я понимала,
             что несмотря на затворнический образ жизни великого ученого -  Тесла был эмпатом.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[13].begin(); Game.message("Эмпат – это человек, который способен сопереживать другим.") }],
        background: '',
    });

Game.Scenes.TL[13] =
    new Scene({
        text: `
            - Катарина, - Никола предложил мне опереться о его локоть. - Если все хорошо, мы еще можем встретиться с Редьярдом Киплингом. 
            Помнишь, я говорил тебе о нем  и его стоящих внимания произведениях за ланчем. Мы немного опаздываем, но думаю, он поймет и простит нашу бестактность. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[113].begin() }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[113] =
    new Scene({
        text: `
            <p>Меня немного лихорадило, но двигаться самостоятельно понемногу получалось. Я… 
            `,
        buttontext: [
            'Приняла помощь Николы',
            'Справилась сама'
        ],
        buttonaction: [
            () => { Game.Scenes.TL[14].begin(); },
            () => { Game.Scenes.TL[114].begin(); }
        ],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[114] =
    new Scene({
        text: `
            Осознавая всю нереальность происходящего, мне, однако, было трудно решиться поступить именно таким образом. 
            Да и не настолько я себя плохо чувствовала, чтобы просить поддержку Теслы. 
            <p>Я вежливо отказала ученому. Все еще обеспокоенный Никола кивнул и спокойно остался стоять рядом со мной.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[15].begin() }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[14] =
    new Scene({
        text: `
            Мне была приятна забота такого великого человека, хоть он сам еще и не осознавал своего статуса. Я нашла поддержку Николы, чем вызвала его улыбку.
            `,
        buttontext: [''],
        buttonaction: [() => {
            Game.Scenes.TL[15].begin(); Game.message("Никола рад поддержать подругу"); Game.Stats.Nicola.add(1);
        }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[15] =
    new Scene({
        text: `
            Мы неспешно двинулись по старинным улочкам Америки. Молча, сосредоточенно. Я погрузилась в свои мысли, параллельно любуясь красивыми чертами города.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[16].begin(); }],
        background: 'Backgrounds/NY',
    });

Game.Scenes.TL[16] =
    new Scene({
        text: `
            Тишину прервал Тесла, который выглядел возбужденно. Ему не терпелось чем-то поделиться со мной:
            <p>- Знаешь, скажу тебе по секрету, я нашел клуб, в котором в скором временем пройдет игра в домино… 
            `,
        buttontext: [''],
        buttonaction: [() => {
            Game.Scenes.TL[17].begin(); Game.message("Вы услышали интересную информацию, которая может поменять развитие истории");
        }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[17] =
    new Scene({
        text: `
            Я попыталась вспомнить отрывки из его биографии. По моей памяти, Тесла был азартным игроком, который мог проиграть все, что можно. Остаться голым и при этом все равно продолжать играть. 
            Однако мне, казалось, что его страсть  должна уже пройти к этому моменту. Все его время обязано быть посвящено науке и великим открытиям. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[18].begin() }],
        background: '',
        condition: function () {
          Game.Scenes.TL[21].activate(0); Game.Scenes.TL[23].activate(0); Game.Scenes.TL[24].activate(0); Game.Scenes.TL[26].activate(0);
          Game.Scenes.TL[21].activate(1); Game.Scenes.TL[23].activate(1); Game.Scenes.TL[24].activate(1); Game.Scenes.TL[26].activate(1);
          Game.Scenes.TL[21].activate(2); Game.Scenes.TL[23].activate(2); Game.Scenes.TL[24].activate(2); Game.Scenes.TL[26].activate(2);
          Game.Scenes.TL[21].activate(3); Game.Scenes.TL[23].activate(3); Game.Scenes.TL[24].activate(3); Game.Scenes.TL[26].activate(3);
            if (Game.Stats.Study.get >= 4) {
                this.buttonaction[0] = () => { Game.Scenes.TL[18].begin(); Game.message("Ваши знания помогли вам узнать больше об эпохе и открыли дополнительный выбор"); Game.Achievements.SmartGirl.unlock(); };
            }
            else {
                this.buttonaction[0] = () => {
                    Game.Scenes.TL[18].begin();
                    Game.message("Ваши знания не помогли вам узнать больше об эпохе и не открыли дополнительный выбор");
                    Game.Scenes.TL[18].deactivate(0);
                    Game.Scenes.TL[23].deactivate(0);
                    Game.Scenes.TL[24].deactivate(0);
                    Game.Scenes.TL[26].deactivate(0);

                };
            }
        }
    });
//
Game.Scenes.TL[18] =
    new Scene({
        text: `
            <p>“Что-то тут не так… Но я же его близкий человек, точно не невеста, таковых у него не было, но раз он позволяет такие фамильярности - я могу попытаться наставить Николу на верный путь. 
            Послушает ли он меня? Попробую расспросить его”.
            `,
        buttontext: [
            '<a color="white">Разве ты не перестал играть?</a>',
            'Никола, а как же работа?',
            'Что это за клуб? ',
            'Кто-нибудь составит тебе компанию?'
        ],
        buttonaction: [
            () => { Game.Scenes.TL[19].begin(); Game.Scenes.TL[21].deactivate(0); Game.Scenes.TL[23].deactivate(0); Game.Scenes.TL[24].deactivate(0); Game.Scenes.TL[26].deactivate(0); },
            () => { Game.Scenes.TL[22].begin(); Game.Scenes.TL[21].deactivate(1); Game.Scenes.TL[23].deactivate(1); Game.Scenes.TL[24].deactivate(1); Game.Scenes.TL[26].deactivate(1); },
            () => { Game.Scenes.TL[24].deactivate(2); Game.Scenes.TL[24].begin(); Game.Scenes.TL[21].deactivate(2); Game.Scenes.TL[23].deactivate(2); Game.Scenes.TL[26].deactivate(2); },
            () => { Game.Scenes.TL[25].begin(); Game.Scenes.TL[21].deactivate(3); Game.Scenes.TL[23].deactivate(3); Game.Scenes.TL[24].deactivate(3); Game.Scenes.TL[26].deactivate(3); },
            () => { Game.Scenes.TL[27].begin(); },
        ],
        buttonactive: [true, true, true, true, false],
        background: '',
        condition: function () {
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false && this.buttonactive[3] == false) {
                this.buttonactive[4] = true;
            }
            else{
              this.buttonactive[4] = false;
            }
        }
    });

Game.Scenes.TL[19] =
    new Scene({
        text: `
            Тесла выглядел озадаченно, вопрос явно застал его врасплох. 
            <p>- Около года я не связывал свою жизнь с играми. Но в нынешней ситуации мне необходимы деньги, ведь на работе все складывается не самым лучшим образом, ты знаешь.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[20].begin() }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[20] =
    new Scene({
        text: `
            “Неужели это уже произошло? Тесла поругался с Эдисоном?”
            <p>- Но это не выход! Сколько раз ты уже проигрывал все, - я попыталась надавить на самое больное. - Это иллюзия, ты не зарабатываешь, а лишь только тратишь.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[21].begin(); Game.message("Тесла может прислушаться к вам в будущем"); }],
        background: 'Persons/Nicola',
    });
//
Game.Scenes.TL[21] =
    new Scene({
        text: `
            - Я осознаю риск, спасибо, что беспокоишься. Когда в моей жизни все будет стабильно, клянусь, избавлюсь от этой привычки. 
            <p>“Слова настоящего игромана.”
            `,
        buttontext: [
            '<a color="white">Разве ты не перестал играть?</a>',
            'Никола, а как же работа?',
            'Что это за клуб? ',
            'Кто-нибудь составит тебе компанию?',
            'Закончить диалог'
        ],
        buttonaction: [
            () => { Game.Scenes.TL[19].begin(); Game.Scenes.TL[21].deactivate(0); Game.Scenes.TL[23].deactivate(0); Game.Scenes.TL[24].deactivate(0); Game.Scenes.TL[26].deactivate(0); },
            () => { Game.Scenes.TL[22].begin(); Game.Scenes.TL[21].deactivate(1); Game.Scenes.TL[23].deactivate(1); Game.Scenes.TL[24].deactivate(1); Game.Scenes.TL[26].deactivate(1); },
            () => { Game.Scenes.TL[24].deactivate(2); Game.Scenes.TL[24].begin(); Game.Scenes.TL[21].deactivate(2); Game.Scenes.TL[23].deactivate(2); Game.Scenes.TL[26].deactivate(2); },
            () => { Game.Scenes.TL[25].begin(); Game.Scenes.TL[21].deactivate(3); Game.Scenes.TL[23].deactivate(3); Game.Scenes.TL[24].deactivate(3); Game.Scenes.TL[26].deactivate(3); },
            () => { Game.Scenes.TL[27].begin(); },
        ],
        buttonactive: [true, true, true, true, false],
        background: 'Persons/Nicola',
        condition: function () {
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false && this.buttonactive[3] == false) {
                this.buttonactive[4] = true;
            }
            else{
              this.buttonactive[4] = false;
            }
        }
    });

Game.Scenes.TL[22] =
    new Scene({
        text: `
            - А что с ней может быть? Я работаю, как честный трудящийся, на заводе. Провожу исследования и пытаюсь предлагать свои наработки для улучшения нашей производительности.
            <p>- Так ведь этот досуг очень отвлекает… и, к тому же, сокращает деньги, - я не оставляла попыток достучаться до мужчины. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[23].begin() }],
        background: 'Persons/Nicola',
    });
//
Game.Scenes.TL[23] =
    new Scene({
        text: `
            Тесла усмехнулся и сказал: 
            <p>- Мой доход, как ты выразилась, сокращает мистер Томас Эдисон своими задержками. Сейчас я вижу только один источник заработка.
            `,
        buttontext: [
            '<a color="white">Разве ты не перестал играть?</a>',
            'Никола, а как же работа?',
            'Что это за клуб? ',
            'Кто-нибудь составит тебе компанию?',
            'Закончить диалог'
        ],
        buttonaction: [
            () => { Game.Scenes.TL[19].begin(); Game.Scenes.TL[21].deactivate(0); Game.Scenes.TL[23].deactivate(0); Game.Scenes.TL[24].deactivate(0); Game.Scenes.TL[26].deactivate(0); },
            () => { Game.Scenes.TL[22].begin(); Game.Scenes.TL[21].deactivate(1); Game.Scenes.TL[23].deactivate(1); Game.Scenes.TL[24].deactivate(1); Game.Scenes.TL[26].deactivate(1); },
            () => { Game.Scenes.TL[24].deactivate(2); Game.Scenes.TL[24].begin(); Game.Scenes.TL[21].deactivate(2); Game.Scenes.TL[23].deactivate(2); Game.Scenes.TL[26].deactivate(2); },
            () => { Game.Scenes.TL[25].begin(); Game.Scenes.TL[21].deactivate(3); Game.Scenes.TL[23].deactivate(3); Game.Scenes.TL[24].deactivate(3); Game.Scenes.TL[26].deactivate(3); },
            () => { Game.Scenes.TL[27].begin(); },
        ],
        buttonactive: [true, true, true, true, false],
        background: 'Persons/Nicola',
        condition: function () {
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false && this.buttonactive[3] == false) {
                this.buttonactive[4] = true;
            }
            else{
              this.buttonactive[4] = false;
            }
        }
    });

Game.Scenes.TL[24] =
    new Scene({
        text: `
            - В Гринвич-виллидж недавно открылся клуб для людей с достатком. Меня пригласили за мой скромный вклад в науку. 
            <p>- То есть ставки будут высоки? 
            <p>Никола нервно замотал головой. 
            <p>- Все, как обычно, нет нужды волноваться.
            `,
        buttontext: [
            '<a color="white">Разве ты не перестал играть?</a>',
            'Никола, а как же работа?',
            'Что это за клуб? ',
            'Кто-нибудь составит тебе компанию?',
            'Закончить диалог'
        ],
        buttonaction: [
            () => { Game.Scenes.TL[19].begin(); Game.Scenes.TL[21].deactivate(0); Game.Scenes.TL[23].deactivate(0); Game.Scenes.TL[24].deactivate(0); Game.Scenes.TL[26].deactivate(0); },
            () => { Game.Scenes.TL[22].begin(); Game.Scenes.TL[21].deactivate(1); Game.Scenes.TL[23].deactivate(1); Game.Scenes.TL[24].deactivate(1); Game.Scenes.TL[26].deactivate(1); },
            () => { Game.Scenes.TL[24].deactivate(2); Game.Scenes.TL[24].begin(); Game.Scenes.TL[21].deactivate(2); Game.Scenes.TL[23].deactivate(2); Game.Scenes.TL[26].deactivate(2); },
            () => { Game.Scenes.TL[25].begin(); Game.Scenes.TL[21].deactivate(3); Game.Scenes.TL[23].deactivate(3); Game.Scenes.TL[24].deactivate(3); Game.Scenes.TL[26].deactivate(3); },
            () => { Game.Scenes.TL[27].begin(); },
        ],
        buttonactive: [true, true, true, true, false],
        background: 'Persons/Nicola',
        condition: function () {
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false && this.buttonactive[3] == false) {
                this.buttonactive[4] = true;
            }
            else{
              this.buttonactive[4] = false;
            }
        }
    });

Game.Scenes.TL[25] =
    new Scene({
        text: `
            - Ты знаешь, что нет. В нашем окружении никто больше не промышляет таким видом деятельности. 
            Разве что Роберт иногда не прочь перекинуться в карты, но дальше этого он никогда не заходит. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[26].begin() }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[26] =
    new Scene({
        text: `
            “Да кто такой этот Роберт? Судя по рассказам Теслы, это может быть один из друзей ученого. Как он связан с Катариной? Но не могу же я спросить напрямую.”
            `,
        buttontext: [
            '<a color="white">Разве ты не перестал играть?</a>',
            'Никола, а как же работа?',
            'Что это за клуб? ',
            'Кто-нибудь составит тебе компанию?',
            'Закончить диалог'
        ],
        buttonaction: [
            () => { Game.Scenes.TL[19].begin(); Game.Scenes.TL[21].deactivate(0); Game.Scenes.TL[23].deactivate(0); Game.Scenes.TL[24].deactivate(0); Game.Scenes.TL[26].deactivate(0); },
            () => { Game.Scenes.TL[22].begin(); Game.Scenes.TL[21].deactivate(1); Game.Scenes.TL[23].deactivate(1); Game.Scenes.TL[24].deactivate(1); Game.Scenes.TL[26].deactivate(1); },
            () => { Game.Scenes.TL[24].deactivate(2); Game.Scenes.TL[24].begin(); Game.Scenes.TL[21].deactivate(2); Game.Scenes.TL[23].deactivate(2); Game.Scenes.TL[26].deactivate(2); },
            () => { Game.Scenes.TL[25].begin(); Game.Scenes.TL[21].deactivate(3); Game.Scenes.TL[23].deactivate(3); Game.Scenes.TL[24].deactivate(3); Game.Scenes.TL[26].deactivate(3); },
            () => { Game.Scenes.TL[27].begin(); },
        ],
        buttonactive: [true, true, true, true, false],
        background: 'Persons/Nicola',
        condition: function () {
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false && this.buttonactive[3] == false) {
                this.buttonactive[4] = true;
            }
            else{
              this.buttonactive[4] = false;
            }
        }
    });

Game.Scenes.TL[27] =
    new Scene({
        text: `
            За непринужденной беседой, я и не заметила, как мы дошли до места назначения. Это было небольшое двухэтажное здание. Тесла галантно открыл мне дверь, пропуская  вперед. 
            <p>В нос сразу ударил забористый запах чего-то протухшего. К горлу невольно подступила тошнота, которую я попыталась подавить, зажмурив нос.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[28].begin() }],
        background: '',
    });

Game.Scenes.TL[28] =
    new Scene({
        text: `
            Видимо Тесла заметил это и проговорил: 
            <p>- Надо было все же наведаться к доктору…
            <p>- Ты разве не чувствуешь? 
            <p>Никола развел плечами и ответил:
            <p>- Здесь всегда чисто и ухоженно. Я слышу только аромат свежести, не более.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[29].begin() }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[29] =
    new Scene({
        text: `
            Это было странно. Может, действительно из-за того, что я во сне, мои органы чувств работали с неполадками? Деваться было некуда, мы продолжили идти в квартиру к великому писателю. 
            <p>Поднявшись несколько пролетов по лестнице, Никола остановился перед дверью и постучал. Нам открыла милого вида пожилая женщина, приглашая зайти внутрь.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[30].begin() }],
        background: '',
    });

Game.Scenes.TL[30] =
    new Scene({
        text: `
            Я не рассматривала убранство квартиры. Все мое внимание было приковано к старушке, которая вела себя неестественным образом. Резкие движения, несвойственные для ее возраста, голова чуть наклонена вбок, изо рта проглядывались желто-черные зубы. 
            <p>Я взглянула в ее карие глаза. Вместо привычного блеска жизни, в них отражалась лишь тоска и ярость.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[31].begin() }],
        background: 'Backgrounds/Room_TL',
    });

Game.Scenes.TL[31] =
    new Scene({
        text: `
            В ту же секунду они загорелись алым цветом, на вид безобидная женщина полностью развернулась ко мне и стала выкручивать свои руки, снимать с себя плоть. 
            Ее кожа приобрела серый оттенок, а лицо исказила гримаса ужаса. Ее аккуратно уложенные седые волосы исчезли, оставляя лишь голую макушку.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[32].begin(); Game.Achievements.FirstMonster.unlock(); }],
        background: 'Persons/Monster',
        condition: () => { Game.Sounds.play('Music', 'Monster') }
    });

Game.Scenes.TL[32] =
    new Scene({
        text: `
            Я попятилась и уперлась в стену. Существо подошло ко мне и, взяв меня за руку, прошипело:
            <p>- Мы нашли тебя… И везде найдем. 
            <p>Мельком я увидела, как на запястье появилось черное пятно. 
            <p>Слишком много потрясений, мой мозг отказывался понимать происходящее. Отдаленно я слышала, как Никола что-то кричит, но мне не суждено было понять, что именно.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[0].begin(); }],
        background: 'Persons/Monster',
    });

Game.Scenes.TL[33] =
    new Scene({
        text: `
            Я решительно взглянула в его голубые глаза, которые выглядели уставшими и чрезмерно озадаченными. 
            <p>- Это же все не может быть реальностью, - я нервно усмехнулась. - Ты не великий изобретатель, а я не какая-то там Катарина.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[34].begin() }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[34] =
    new Scene({
        text: `
            Тесла немного смутился, но быстро взял себя в руки и проговорил: 
            <p>- Что ты такое говоришь? Может, у тебя солнечный удар? Ты меня не убедила, я настаиваю на докторе! 
            <p>- Я - $Имя Игрока$, - было забавно наблюдать за его реакцией. Он явно выглядел  растеряно. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[35].begin(); Game.message("Вы шокировали Теслу!"); Game.Achievements.ShockTesla.unlock(); }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[35] =
    new Scene({
        text: `
            - Что за имя такое… Катарина, ты репетируешь? Но ты вроде говорила, что больше не хочешь играть в спектаклях. 
            <p>“Если все не по настоящему, я же могу делать все, что захочу?”
            `,
        buttontext: [
            'Обнять Теслу',
            'Поцеловать в щечку',
            'Рассказать про будущее'
        ],
        buttonaction: [
            () => { Game.Scenes.TL[36].begin() },
            () => { Game.Scenes.TL[38].begin() },
            () => { Game.Scenes.TL[40].begin() }
        ],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[36] =
    new Scene({
        text: `
            “Великий ученый стоит прямо передо мной, почему бы мне не взять и не обнять его?”
            <p>Я резко подступилась к Николе  и тепло обняла его. Крепко-крепко. Не ожидая от меня такого, он лишь стоял, словно статуя, не понимая, как реагировать на этот выпад. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[37].begin(); Game.message("Тесла приятно удивлен"); Game.Stats.Nicola.add(1) }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[37] =
    new Scene({
        text: `
            - Катарина, - он был очень смущен, - что происходит? 
            <p>- Это же просто объятие, почему ты так удивился?
            <p>– Что скажет Роберт?
            
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[42].begin() }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[38] =
    new Scene({
        text: `
            Великий ученый стоит прямо передо мной, почему бы мне не взять и не поцеловать его в щечку?”
            <p>Я резко подступилась к Николе  и чмокнула его в щеку. Не ожидая от меня такого, он лишь стоял, словно статуя, не понимая, как реагировать на этот выпад.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[39].begin(); Game.message("Тесла не оценил ваш порыв"); Game.Stats.Nicola.add(-1) }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[39] =
    new Scene({
        text: `
            - Катарина, - он был немного зол. - Что происходит? 
            <p>- Это же просто поцелуй, почему ты так удивился?
            <p>- Что скажет Роберт? 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[42].begin() }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[40] =
    new Scene({
        text: `
            Мне захотелось посмотреть, что будет, когда Никола узнает о своих открытиях и своей значимости в современном мире. 
            <p>– В будущем ты станешь выдающимся учёным, который благодаря своим открытиям станет известен на весь мир!
            <p>– Катарина … 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[41].begin(); Game.message("Тесла думает, что вы поддерживаете его деятельность"); Game.Stats.Nicola.add(1) }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[41] =
    new Scene({
        text: `
            <p>– Я знал, что ты восхищаешься моим стремлением изменить мир, но к чему столько…
            <p>– Потому что это правда! - я перебила Николу. - Твоя "дуэль" с Эдисоном закончится победой. 
            <p>– Что скажет Роберт, услышав, как ты меня нахваливаешь…
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[42].begin() }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[42] =
    new Scene({
        text: `
            Я не стала тянуть и ходить вокруг да около.
            <p>– Да кто такой этот Роберт?
            <p>На этот раз голос Николы звучал жёстче.
            <p>– Прекрати этот спектакль, не думаю, что твой муж оценит такую постановку. 
            
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[43].begin() }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[43] =
    new Scene({
        text: `
            <p>Он взял меня за руку и потянул в сторону оживленной улицы. 
            <p>– Отложим визит к Редьярду Киплингу, идем сразу к доктору!
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[44].begin() }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[44] =
    new Scene({
        text: `
            Насколько же это были реальные ощущения. Его касания оставляли небольшие вмятины на моих руках. Я была словно в тисках. 
            <p>Тесла двигался быстро, как будто бы опаздывал куда-то. Местами я пыталась с ним заговорить. Но он не оценил моей игры, поэтому не поведал ни о своей жизни, ни о его проблемах с Эдисоном. 
            <p>А я лишь про себя думала, насколько все это будет абсурдно, если окажется правдой. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[45].begin() }],
        background: '',
    });

Game.Scenes.TL[45] =
    new Scene({
        text: `
            Петляя по старым американским улочкам, Никола вскоре привел меня в больницу. Зайдя внутрь, в нос сразу ударил аромат лекарств и чего-то протухшего. 
            <p>Когда мы вошли в кабинет, Тесла обменялся любезностями с доктором и пожал ему руку. Тот выглядел как обычный доброжелательный мужчина, исправно выполняющий свою работу. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[46].begin() }],
        background: 'Backgrounds/Doctors_office',
    });

Game.Scenes.TL[46] =
    new Scene({
        text: `
            - Доктор, пожалуйста, у этой женщины случился солнечный удар! Осмотрите ее. 
            <p>Он кивнул. Подойдя ко мне, он грубо схватил меня за запястье и начал измерять пульс. 
            Его прикосновения были холодными и болезненными, а выражение лица выражало абсолютное спокойствие и сосредоточение. 
            <p>Я взглянула в его карие глаза. Вместо привычного блеска жизни, в них отражалась лишь тоска и ярость.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[47].begin() }],
        background: 'Backgrounds/Doctors_office',
    });

Game.Scenes.TL[47] =
    new Scene({
        text: `
            В ту же секунду они загорелись алым цветом, на вид обычный мужчина стал выкручивать свои руки, снимать с себя плоть. Его кожа посерела, а лицо исказила гримаса ужаса.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[48].begin(); Game.Achievements.FirstMonster.unlock(); }],
        background: 'Persons/Monster',
        condition: () => { Game.Sounds.play('Music', 'Monster') }
    });

Game.Scenes.TL[48] =
    new Scene({
        text: `
            Я попятилась и уперлась в стену. Существо подошло ко мне, взяло меня за руку и прошептало:
            <p>- Мы нашли тебя… И везде найдем. 
            <p>Мельком я увидела, как на запястье появилось черное пятно. 
            <p>Слишком много потрясений, мой мозг отказывался понимать происходящее. Отдаленно я слышала, как Никола что-то кричит, но мне не суждено было понять, что именно. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[0].begin(); }],
        background: 'Persons/Monster',
    });

Game.Scenes.TL[49] =
    new Scene({
        text: `
            “Не может быть, я просто убегу, что-нибудь произойдет и получится проснуться!”
            <p>Рванув в сторону оживленной улицы, мне периодически приходилось оглядываться, оценивая удалось ли скрыться от растерянного Теслы. 
            Я лавировала между потоком, ища укрытие, которое избавило бы меня от назойливости Николы.
            `,
        buttontext: [
            'В переулок',
            'Прямо по улице'
        ],
        buttonaction: [
            () => { Game.Scenes.TL[50].begin(); Game.Stats.StreetHide.add(1); },
            () => { Game.Scenes.TL[54].begin(); Game.Stats.StreetStraight.add(1); }
        ],
        background: 'Backgrounds/NY',
    });

Game.Scenes.TL[50] =
    new Scene({
        text: `
            “Это может быть мой шанс оторваться!”
            <p>Я завернула в ближайшую улочку и остановилась, чтобы перевести дыхание. Переулок был узкий и темный. 
            Я дотронулась до кирпичного здания, почувствовав холод - отпрянула, не веря, что так отчетливо могут передаваться ощущения во сне.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[51].begin() }],
        background: 'Backgrounds/Street',
    });

Game.Scenes.TL[51] =
    new Scene({
        text: `
            Все было настолько реалистично, что я на секунду допустила, что могу ошибаться в своих суждениях относительно происходящего. Мне стало не по себе, но я должна была собраться и бежать дальше.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[52].begin() }],
        background: 'Backgrounds/Street',
    });

Game.Scenes.TL[52] =
    new Scene({
        text: `
            Я вышла на параллельную улицу, дивясь новым красотам. Я шла по вымощенной дорожке словно призрак, не имея цели, и настолько погрузилась в себя, что не заметила, как на меня неслась карета. 
            <p>В последний момент чьи-то руки схватили меня, отталкивая в сторону. Это оказался Никола, который выглядел рассерженно и явно был уставшим.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[53].begin() }],
        background: 'Backgrounds/NY',
    });

Game.Scenes.TL[53] =
    new Scene({
        text: `
            - Катарина, да что с тобой?! Прекрати этот спектакль, возможно, ты получила солнечный удар или еще чего… Пойдем к доктору!
            <p>Он взял меня за руку и потянул в сторону оживленной улицы. 
            <p>– Отложим визит к Редьярду Киплингу, идем сразу в больницу!
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[44].begin(); Game.message("Тесла недоволен вашим поведением"); Game.Stats.Nicola.add(-1); }],
        background: 'Persons/Nicola',
    });

Game.Scenes.TL[54] =
    new Scene({
        text: `
            Порывы ветра развивали мои волосы, я бежала вперед, не обращая внимание на происходящее. Сейчас я наслаждалась мимолетным спокойствием. 
            <p>Вскоре я потеряла Теслу из виду. Мое внимание привлекла небольшая книжная лавка, около которой крутилось несколько детей. 
            Будучи одетыми не в самую чистую одежду, они протягивали свои маленькие ручонки прохожим, в надежде заполучить пару заветных монеток. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[55].begin() }],
        background: 'Backgrounds/Bookstore_TL',
    });

Game.Scenes.TL[55] =
    new Scene({
        text: `
            Увидев меня, они тут же подбежали и со всех сторон стали жалобно поглядывать, проговаривая:
            <p>- Тетя, дайте на хлеб, пожалуйста! 
            <p>Я растерялась. Осмотрев свои карманы, мне удалось найти деньги, которые я тут же протянула нуждающимся. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[56].begin() }],
        background: 'Backgrounds/Bookstore_TL',
    });

Game.Scenes.TL[56] =
    new Scene({
        text: `
            “Мелочь, но мне кажется я сделала доброе дело!”
            <p>Из лавки вышел недовольный работник. На вид радушный, пухленький мужчина средних лет грозно прогнал попрошаек. 
            <p>- Чертовы дети, отпугивают покупателей! - он резко перевел взгляд на меня, его губы растянулись в ехидную улыбку. - Мисс, вы хотели что-то приобрести?
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[57].begin() }],
        background: 'Backgrounds/Bookstore_TL',
    });

Game.Scenes.TL[57] =
    new Scene({
        text: `
            Мне стало не по себе от резкой перемены его настроения, поэтому я вежливо отказалась. 
            <p>- Ну, что вы… - мужчина легонько взял меня за плечи и подтолкнул в лавку. - У меня есть для вас эксклюзивное предложение!
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[150].begin() }],
        background: 'Backgrounds/Bookstore_TL',
    });

Game.Scenes.TL[150] =
  new Scene({
    text: `
            Мне все же пришлось заглянуть внутрь. Его настойчивость пугала, тем не менее, я решила не поддаваться паранойе и просто насладиться книгами. 
            <p>Но меня настигло разочарование. 
            <p>Вместо аромата новой литературы, в нос сразу ударил неприятный запах чего-то тухлого. Меня начало тошнить, но я старалась подавить эти порывы и сохранять спокойствие. 
            `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.TL[58].begin() }],
    background: 'Backgrounds/Bookstore_Inside',
  });

Game.Scenes.TL[58] =
    new Scene({
        text: `
            - Все в порядке? - работник достал несколько книг с полок и протянул мне. 
            <p>- Да, просто тяжелый день. 
            <p>- Понимаю. Эти бесконечные забастовки, голодающие, невозможность себя реализовать. 
            <p>Я удивилась, услышав эти странные откровения. Видимо, человеку очень хотелось высказаться, да и я была не против больше узнать об этом времени. 
            <p>- Но у вас же есть стабильная работа и вы не выглядите как нуждающийся человек. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[59].begin() }],
        background: 'Backgrounds/Bookstore_Inside',
    });

Game.Scenes.TL[59] =
    new Scene({
        text: `
            - Думаете, так было всегда? Вам легко говорить: красивая женщина, которая всегда найдет себе достойную партию - вы не жили в хаосе и не знаете и половины о жизни в трущобах. 
            Но теперь все изменится, - мужчина становился все ближе ко мне. - Вот ты и попалась… 
            <p>Я начала инстинктивно отходить назад. Руки стали влажными, а моим разумом завладел страх. Страх за свою жизнь.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TL[60].begin() }],
        background: 'Backgrounds/Bookstore_Inside',
    });

Game.Scenes.TL[60] =
  new Scene({
    text: `
            Он начал преображаться. Его язык неестественно удлинился, прошелся по моей шее и щекам, оставляя сгустки слюней. Его кожа стала серой. Вместо привычных карих глаз на меня смотрели ярко-красные зрачки. Он начал сильно сжимать мою руку. Мельком я увидела, как на запястье стало проявляться черное пятно. 
            `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.TL[160].begin();}],
    background: 'Persons/Monster',
    condition: () => { Game.Sounds.play('Music', 'Monster') }
  });

Game.Scenes.TL[160] =
    new Scene({
        text: `
            Слишком много потрясений, мой мозг отказывался понимать происходящее.  Отдаленно я слышала лишь хрипение этой твари, а затем уже привычная темнота накрыла меня.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[0].begin(); Game.Achievements.FirstMonster.unlock(); }],
        background: 'Persons/Monster',
        condition: () => {}
    });Game.Scenes.TC = [];

Game.Scenes.TC[0] =
    new Scene({
        text: `
            Я открыла глаза и увидела знакомые мне стены студенческого медпункта. Я лежала на кушетке: тело ломило, голова гудела. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[1].begin() }],
        background: 'Backgrounds/Firstaid_post',
        condition: function () {
            Game.Stats.Scarlett.add(0);
            Game.Sounds.play('Music', 'FirstChapter');

            if (Game.Stats.Scarlett.get >= 1) {
                this.buttonaction[0] = () => { Game.Scenes.TC[1].begin() };
            }
            else {
                this.buttonaction[0] = () => { Game.Scenes.TC[3].begin() };
            }
            Game.message('Наше время');
            Game.Effects.Flash();
            AndroidApp ('showAd');
        }
    });

Game.Scenes.TC[1] =
    new Scene({
        text: `
            Увидев, что я очнулась, Скарлетт крепко обняла меня.
            <p>- Как же ты всех перепугала! Ты в порядке? 
            <p>- Да, - горло немного болело, поэтому я говорила шепотом. - Долго я была в отключке? 
            <p>- Где-то минут 40… 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[5].begin(); Game.message("Вы со Скарлетт друзья, она за вас переживала"); }],
        background: 'Persons/Scarlett',
    });

Game.Scenes.TC[3] =
    new Scene({
        text: `
            Увидев, что я очнулась, к кровати подошла Скарлетт и спросила: 
            <p>- Как ты? Все хорошо?
            <p>- Да, - горло  болело, поэтому я говорила шепотом. - Долго я была в отключке? 
            <p>- Где-то минут 40… 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[5].begin(); Game.message("Вы не очень близки со Скарлетт, но она все равно переживала за тебя"); }],
        background: 'Persons/Scarlett',
    });

Game.Scenes.TC[5] =
    new Scene({
        text: `
            Я попыталась присесть, но слабость не позволяла мне двигаться в полной мере. 
            <p>Помимо Скарлетт в палате стояли еще двое. Профессор Нэйтан обеспокоенно смотрел на меня.
            Рядом с ним стоял мой одногруппник и брат профессора - Леон. Он выглядел хмуро и растерянно. Заметив, что я пришла в себя, парень подошел ко мне. 
            <p>-   $Имя Игрока$, любишь же ты устраивать выкрутасы… 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[6].begin(); Game.Stats.Leon.add(0); }],
        background: 'Persons/Leon',
    });

Game.Scenes.TC[6] =
  new Scene({
    text: `
            В последнее время нам не выпадал шанс нормально пообщаться. К сожалению, у обстоятельств было свое мнение на этот счет. 
            `,
    buttontext: [
      '',
    ],
    buttonaction: [
      () => { Game.Scenes.TC[150].begin();},
    ],
    background: 'Persons/Leon',
  });

Game.Scenes.TC[150] =
    new Scene({
        text: `
            Тем не менее Леон всегда был расположен ко мне: относился с теплотой и заботой. Иногда даже выступал в качестве героя, спасая из различных передряг.
            <p>Я сказала:
            `,
        buttontext: [
            'Леон, что ты тут делаешь?',
            'Профессор, занятие...',
            'Скарлетт, спасибо, что ты рядом…',
            'Ох, что же это было…'
        ],
        buttonaction: [
            () => { Game.Scenes.TC[7].begin(); Game.message("Леон волновался за вас"); Game.Stats.Leon.add(1); },
            () => { Game.Scenes.TC[8].begin(); },
            () => { Game.Scenes.TC[9].begin(); },
            () => { Game.Scenes.TC[10].begin(); }
        ],
        background: 'Persons/Leon',
    });

Game.Scenes.TC[7] =
    new Scene({
        text: `
            - Я успел поймать тебя перед самым падением. Повезло, что я такой ловкий!
            <p>- Спасибо тебе. Не знаю… Все произошло так резко…
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[11].begin(); }],
        background: 'Persons/Leon',
    });

Game.Scenes.TC[8] =
    new Scene({
        text: `
            Нэйтан недовольно покачал головой. 
            <p>- Забудь, сейчас не об этом надо думать. Самое главное - ты пришла в себя и твоей жизни ничего не угрожает.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[11].begin(); Game.message("Вы прилежная и ответственная ученица"); Game.Stats.Neitan.add(1); }],
        background: 'Persons/Neitan',
    });

Game.Scenes.TC[9] =
    new Scene({
        text: `
            Девушка улыбнулась и проговорила: 
            <p>- Самое главное, что ты в порядке. Сейчас ни о чем другом переживать не надо. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[11].begin(); Game.message("Скарлетт рада помочь"); Game.Stats.Scarlett.add(1) }],
        background: 'Persons/Scarlett',
    });

Game.Scenes.TC[10] =
    new Scene({
        text: `
            Присутствующие обеспокоенно переглянулись. Каждый смотрел на меня по-разному, но определено переживал. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[11].begin(); }],
        background: 'Backgrounds/Firstaid_post',
    });

Game.Scenes.TC[11] =
    new Scene({
        text: `
            Профессор решил сказать: 
            <p>- Врач осмотрел тебя и заключил, что это переутомление, поэтому скорую вызывать не стали. 
            Но твое состояние оставляет желать лучшего, у тебя есть кто-нибудь, кто бы мог отвезти тебя домой? 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[12].begin(); }],
        background: 'Persons/Neitan',
    });

Game.Scenes.TC[12] =
    new Scene({
        text: `
            Рядом с кушеткой стояла тумбочка, на которой лежал мой телефон. 
            Я несколько раз набрала номер отца, так как последнее время он был не так занят на работе как мама. Но ответом были только гудки. 
            <p>Мне предложил помощь:

            `,
        buttontext: [
            'Профессор Нэйтан',
            'Леон'
        ],
        buttonaction: [
            () => { Game.Scenes.TC[49].begin(); Game.Stats.ComeWithLeon.add(0); },
            () => { Game.Scenes.TC[13].begin(); Game.Stats.ComeWithLeon.add(1); }
        ],
        background: 'Backgrounds/Firstaid_post',
    });

Game.Scenes.TC[13] =
    new Scene({
        text: `
            Леон вздохнул и проговорил: 
            <p>-  Дай мне десять минут, я провожу тебя домой. 
            <p>- Возьми мою машину, - Нэйтан передал ключи Леону. - У меня все равно на вечер были дела.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[14].begin(); }],
        background: '',
    });

Game.Scenes.TC[14] =
    new Scene({
        text: `
            Я смущенно посмотрела на братьев и благодарно кивнула. Остальные покинули медпункт и у меня осталось немного времени, чтобы собраться. 
            Я медленно подошла к рюкзаку, проверяя все ли вещи на месте. Ключи и учебные принадлежности, документы - все было при мне.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[15].begin(); }],
        background: 'Backgrounds/Firstaid_post',
    });

Game.Scenes.TC[15] =
    new Scene({
        text: `
            Я подошла к зеркалу, чтобы умыться и привести себя в порядок. Растрепанные волосы тут же уложились в маленький хвостик. 
            Я мыла руки, как вдруг заметила то самое черное пятно из своего сна. 
            <p>Я словно ошпаренная снова вернулась на кушетку.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[16].begin(); }],
        background: 'Persons/Hero',
    });

Game.Scenes.TC[16] =
    new Scene({
        text: `
            “Так все-таки я действительно перенеслась во времени?! Тесла… Монстр. Что же это?” 
            <p>Я терла свою руку как могла: мылом, спиртом - но ему все было нипочем.
            <p>“Как же так…”
            <p>Тело покрылось мурашками от осознания того, что все произошедшее, действительно имело место быть. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[17].begin(); }],
        background: '',
    });

Game.Scenes.TC[17] =
    new Scene({
        text: `
            Мое обеспокоенное лицо увидел Леон, который успел вернуться. 
            <p>-  $Имя Игрока$, совсем плохо? Давай поедем в больницу… 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[18].begin(); }],
        background: 'Persons/Leon',
        condition: function () {
        if (Game.Stats.Believe.get <= 0 && Game.Stats.StreetStraight.get >= 1) {
          this.buttonaction[0] = () => { Game.Scenes.TC[19].begin(); };
        }
        if (Game.Stats.Believe.get >= 1) {
          this.buttonaction[0] = () => { Game.Scenes.TC[19].begin(); };
        }

        if (Game.Stats.Believe.get <= 0 && Game.Stats.StreetStraight.get <= 0 && Game.Stats.StreetHide.get >= 1) {
          this.buttonaction[0] = () => { Game.Scenes.TC[18].begin(); };
        }

          if (Game.Stats.Believe.get <= 0 && Game.Stats.StreetStraight.get <= 0 && Game.Stats.StreetHide.get <= 0) {
            this.buttonaction[0] = () => { Game.Scenes.TC[18].begin(); };
          }

      }
    });

Game.Scenes.TC[18] =
    new Scene({
        text: `
            При упоминании больницы, я невольно вспомнила то существо и меня передернуло. 
            <p>“Хватит с меня больниц!” 
            <p>- Все хорошо, просто отвези меня домой, пожалуйста. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[20].begin(); }],
        background: '',
    });

Game.Scenes.TC[19] =
    new Scene({
        text: `
            Сейчас мне меньше всего хотелось ехать в больницу. После всех этих потрясений, нет ничего лучше горячего чая и теплого пледа дома. 
            <p>- Все хорошо, просто отвези меня домой, пожалуйста. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[20].begin(); }],
        background: '',
    });

Game.Scenes.TC[20] =
    new Scene({
        text: `
            Леон помог мне подняться и:
            `,
        buttontext: [
            'Дал руку, чтобы опереться',
            'Шел рядом и поддерживал'
        ],
        buttonaction: [
            () => { Game.Scenes.TC[21].begin(); Game.message("Леон рад вам помочь"); Game.Stats.Leon.add(1); },
            () => { Game.Scenes.TC[24].begin(); }
        ],
        background: 'Persons/Leon',
        condition: function(){Game.Sounds.play('Music','Leon');
        }
    });

Game.Scenes.TC[21] =
    new Scene({
        text: `
            Я схватилась за его руку, и мы двинулись по пустующим коридорам университета. Мне была приятна забота Леона, в равной степени, как и неожиданна. 
            <p>Раньше я часто проводила время в компании Скарлетт, Леона и еще нескольких друзей. Но когда у всех появилось больше дел - стало не до этого. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[22].begin(); }],
        background: '',
    });

Game.Scenes.TC[22] =
    new Scene({
        text: `
            Леон был молчалив. Казалось, все его мысли были заняты чем-то другим. 
            Он обратил внимание на мое обеспокоенное лицо, нежно улыбнулся и несколько раз легонько постучал по моей макушке как бы говоря: “Все хорошо, не волнуйся!”

            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[23].begin(); }],
        background: 'Persons/Leon',
    });

Game.Scenes.TC[23] =
    new Scene({
        text: `
            Его поддержка служила мне верной и крепкой опорой. Сердце невольно застучало, словно, я была героиней романа, которыми частенько увлекалась. 
            <p>Сегодня я почувствовала, что между нами снова нет никаких недомолвок и с ним так же легко, как в старые добрые времена.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[25].begin(); }],
        background: 'Persons/Leon',
    });

Game.Scenes.TC[24] =
    new Scene({
        text: `
            Мы шли довольно близко к друг другу. 
            Леон был готов в любой момент поймать меня, если эпизод с потерей сознания повторится. Раньше я часто проводила время в компании Скарлетт, Леона и еще нескольких друзей. 
            Но когда у всех появилось больше дел - стало не до этого.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[25].begin(); }],
        background: 'Persons/Leon',
    });

Game.Scenes.TC[25] =
    new Scene({
        text: `
            Мы дошли до машины профессора Нэйтана. Леон открыл мне дверь и мы сели внутрь. 
            <p>Он включил заводную рок композицию и достал пачку сигарет. 
            <p>– Будешь? 
            <p>В моей жизни присутствовало много зависимостей, и курение было одной из них. Я решила:
            `,
        buttontext: [
            'Покурить',
            'Не брать сигарету'
        ],
        buttonaction: [
            () => { Game.Scenes.TC[26].begin(); },
            () => { Game.Scenes.TC[28].begin(); }
        ],
        background: 'Backgrounds/Car',
    });

Game.Scenes.TC[26] =
    new Scene({
        text: `
            Кто как не Леон понимал меня. Ведь еще в начале нашей студенческой жизни, мы вместе решили побаловаться этой отравой. А далее, как и полагается, наступила зависимость.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[27].begin(); }],
        background: 'Persons/Leon',
    });

Game.Scenes.TC[27] =
    new Scene({
        text: `
            Закурив довольно крепкие сигареты, я медленно выдохнула клуб дыма и по телу растеклось приятное тепло и спокойствие.
            <p>– Я думал, ты бросила, - сказал Леон, делая очередную затяжку. 
            <p>– Я тоже, - обреченно улыбнувшись сказала я. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[29].begin(); }],
        background: 'Persons/Leon',
    });

Game.Scenes.TC[28] =
    new Scene({
        text: `
            Я тактично отказалась.
            <p>–  Рад, что ты в итоге отказалась от вредного убийцы. 
            <p>– Не сказала бы… Скорее боюсь, как бы мне не стало хуже.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[29].begin(); }],
        background: 'Persons/Leon',
    });

Game.Scenes.TC[29] =
    new Scene({
        text: `
            Мы поехали. Стиль вождения Леона был довольно грубым, он не церемонился с зеваками и хорошо маневрировал среди потока машин. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[30].begin(); }],
        background: 'Backgrounds/Car',
    });

Game.Scenes.TC[30] =
    new Scene({
        text: `
            Леон нарушил тишину.
            <p>– Что с тобой было? 
            <p>– Переутомление. В последнее время я много работаю и учеба… 
            <p>– Нужно же беречь себя. Когда это ты стала так стремиться к покорению вершин, - с лёгким задором в голосе сказал парень.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[31].begin(); }],
        background: 'Persons/Leon',
    });

Game.Scenes.TC[31] =
    new Scene({
        text: `
            – Да, знаешь, просто в последнее время мне нужно было себя куда-то девать,- я отвела взгляд на пролетающие мимо нас пейзажи за окном.
            - В следующий раз непременно постараюсь так не усердствовать.
            <p>Мы давно не общались с Леоном. Я решила спросить у него:

            `,
        buttontext: [
            'Как твои дела?',
            'Как твои отношения с Нэйтаном?',
            'Где-нибудь работаешь?',
            'Закончить диалог'
        ],
        buttonaction: [
            () => { Game.Scenes.TC[32].begin(); Game.Scenes.TC[33].deactivate(0); Game.Scenes.TC[35].deactivate(0); Game.Scenes.TC[38].deactivate(0); },
            () => { Game.Scenes.TC[34].begin(); Game.Scenes.TC[33].deactivate(1); Game.Scenes.TC[35].deactivate(1); Game.Scenes.TC[38].deactivate(1); },
            () => { Game.Scenes.TC[36].begin(); Game.Scenes.TC[33].deactivate(2); Game.Scenes.TC[35].deactivate(2); Game.Scenes.TC[38].deactivate(2); },
            () => { Game.Scenes.TC[39].begin(); }
        ],
        buttonactive: [true, true, true, false],
        background: 'Persons/Leon',
        condition: function () {
          Game.Scenes.TC[33].activate(0); Game.Scenes.TC[35].activate(0); Game.Scenes.TC[38].activate(0);
          Game.Scenes.TC[33].activate(1); Game.Scenes.TC[35].activate(1); Game.Scenes.TC[38].activate(1);
          Game.Scenes.TC[33].activate(2); Game.Scenes.TC[35].activate(2); Game.Scenes.TC[38].activate(2);
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false) {
                this.buttonactive[3] = true;
            }
            else{
              this.buttonactive[3] = false;
            }
        },
    });

Game.Scenes.TC[32] =
    new Scene({
        text: `
            Леон усмехнулся и ответил:
            <p>– Спасибо, что интересуешься. Все в порядке, в последнее время тоже стараюсь больше заниматься и думать о будущем. Окончание универа не за горами.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[33].begin(); }],
        background: 'Persons/Leon',
    });

Game.Scenes.TC[33] =
    new Scene({
        text: `
            В его словах чувствовалась сдержанность, но я привыкла, Леон всегда был таким. Не делился своими переживаниями больше, чем это необходимо для поддержания беседы и общего настроения.  
            <p>Однако он был прекрасным слушателем, который всегда понимал, как правильно поставить мозги на место, когда они явно не хотели трезво мыслить. 
            Благодаря этой черте, он был завсегдатаем во многих компаниях.
            `,
        buttontext: [
            'Как твои дела?',
            'Как твои отношения с Нэйтаном?',
            'Где-нибудь работаешь?',
            'Закончить диалог'
        ],
        buttonaction: [
            () => { Game.Scenes.TC[32].begin(); Game.Scenes.TC[33].deactivate(0); Game.Scenes.TC[35].deactivate(0); Game.Scenes.TC[38].deactivate(0); },
            () => { Game.Scenes.TC[34].begin(); Game.Scenes.TC[33].deactivate(1); Game.Scenes.TC[35].deactivate(1); Game.Scenes.TC[38].deactivate(1); },
            () => { Game.Scenes.TC[36].begin(); Game.Scenes.TC[33].deactivate(2); Game.Scenes.TC[35].deactivate(2); Game.Scenes.TC[38].deactivate(2); },
            () => { Game.Scenes.TC[39].begin(); }
        ],
        buttonactive: [true, true, true, false],
        condition: function () {
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false) {
                this.buttonactive[3] = true;
            }
            else{
              this.buttonactive[3] = false;
            }
        },
        background: ''
    });

Game.Scenes.TC[34] =
    new Scene({
        text: `
            – Ничего не поменялось. Брат продолжает строить из себя взрослого и командовать.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[35].begin(); }],
        background: 'Persons/Leon',
    });

Game.Scenes.TC[35] =
    new Scene({
        text: `
            Насколько я знала, их родители погибли довольно давно и Нэйтан взял ответственность за брата. 
            Когда мы общались, Леон рассказывал, что профессор частенько перебарщивал с этим. 
            Он не особо любил вдаваться в подробности их отношений, но было очевидно -  они любят друг друга, просто каждый по-своему.
            `,
        buttontext: [
            'Как твои дела?',
            'Как твои отношения с Нэйтаном?',
            'Где-нибудь работаешь?',
            'Закончить диалог'
        ],
        buttonaction: [
            () => { Game.Scenes.TC[32].begin(); Game.Scenes.TC[33].deactivate(0); Game.Scenes.TC[35].deactivate(0); Game.Scenes.TC[38].deactivate(0); },
            () => { Game.Scenes.TC[34].begin(); Game.Scenes.TC[33].deactivate(1); Game.Scenes.TC[35].deactivate(1); Game.Scenes.TC[38].deactivate(1); },
            () => { Game.Scenes.TC[36].begin(); Game.Scenes.TC[33].deactivate(2); Game.Scenes.TC[35].deactivate(2); Game.Scenes.TC[38].deactivate(2); },
            () => { Game.Scenes.TC[39].begin(); }
        ],
        buttonactive: [true, true, true, false],
        background: 'Persons/Leon',
        condition: function () {
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false) {
                this.buttonactive[3] = true;
            }
            else{
              this.buttonactive[3] = false;
            }
        },
    });

Game.Scenes.TC[36] =
    new Scene({
        text: `
            – Нет, недавно уволился из одного магазинчика. 
            <p>– Ого, а какого? Может быть я даже заходила к вам.
            <p>– Все-то вам интересно, девушка, - не отрывая взгляд от дороги сказал Леон.
            <p>– Мы же столько не общались, конечно, я хочу знать, все ли у тебя в порядке. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[37].begin(); }],
        background: 'Persons/Leon',
    });

Game.Scenes.TC[37] =
    new Scene({
        text: `
            – Лучше побеспокойся за себя, а то вон, каждый день будешь падать в обмороки, а мне потом спасай! 
            <p>Мне стало немного обидно от того, что он совсем не хотел делиться со мной хотя бы крохами своей повседневной жизни и неожиданно для себя я выпалила: 
            <p>- Вот и спасай! А может я специально падаю в обмороки, чтобы ты хоть иногда со мной разговаривал… Злодейский план у меня такой!
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[38].begin(); }],
        background: 'Persons/Leon',
    });

Game.Scenes.TC[38] =
    new Scene({
        text: `
            Леон опешил от такого неожиданного признания и впервые прямо взглянул на меня:
            <p>- Твое здоровье важнее чем эти глупости, дурочка! 
            `,
        buttontext: [
            'Как твои дела?',
            'Как твои отношения с Нэйтаном?',
            'Где-нибудь работаешь?',
            'Закончить диалог'
        ],
        buttonaction: [
            () => { Game.Scenes.TC[32].begin(); Game.Scenes.TC[33].deactivate(0); Game.Scenes.TC[35].deactivate(0); Game.Scenes.TC[38].deactivate(0); },
            () => { Game.Scenes.TC[34].begin(); Game.Scenes.TC[33].deactivate(1); Game.Scenes.TC[35].deactivate(1); Game.Scenes.TC[38].deactivate(1); },
            () => { Game.Scenes.TC[36].begin(); Game.Scenes.TC[33].deactivate(2); Game.Scenes.TC[35].deactivate(2); Game.Scenes.TC[38].deactivate(2); },
            () => { Game.Scenes.TC[39].begin(); }
        ],
        buttonactive: [true, true, true, false],
        background: 'Persons/Leon',
        condition: function () {
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false) {
                this.buttonactive[3] = true;
            }
            else{
              this.buttonactive[3] = false;
            }
        },
    });

Game.Scenes.TC[39] =
    new Scene({
        text: `
            Мы еще немного поговорили, пока он вез меня домой. Я снова увидела привычную зеленую лужайку, спокойную и умиротворенную обстановку. 
            <p>В соседнем доме горел свет. Значит Шерил уже вернулась. 
            И как бы в подтверждение моих мыслей, она резко выбежала из дома, с грохотом захлопнув входную дверь. Даже из окна машины я видела, что она была подавлена. 
            <p>“Почему она не на занятиях?”
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[40].begin(); }],
        background: '',
    });

Game.Scenes.TC[40] =
    new Scene({
        text: `
            - Спасибо большое, Леон, я пойду.
            <p>- Давай я помогу тебе. 
            <p>- Не стоит, я и так тебя задержала. К тому же, там моя подруга, она мне поможет. 
            <p>- Хорошо. И мне было несложно. 
            <p>Он вышел из машины, открыл мне дверь, помогая подняться. Я еще раз поблагодарила Леона и немного пошатываясь направилась к Шерил. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[41].begin(); }],
        background: 'Persons/Leon',
        condition: function () {
            if (Game.Stats.Cheryl.get <= -1) {
                this.buttonaction[0] = () => { Game.Scenes.TC[42].begin(); };
            }
            else {
                this.buttonaction[0] = () => { Game.Scenes.TC[41].begin(); };
            }
        }
    });

Game.Scenes.TC[41] =
    new Scene({
        text: `
            Шерил была удивлена так же как я. Она была рада меня видеть. Девушка обеспокоенно посмотрела на меня и спросила:
            <p>– $Имя Игрока$, что случилось? 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[43].begin(); }],
        background: 'Persons/Cheryl',
        condition: function () { Game.Sounds.play('Music', 'Cheryl'); }
    });

Game.Scenes.TC[42] =
    new Scene({
        text: `
            Шерил была удивлена так же как я. Она была не очень мне рада. Видимо из-за утренней переписки. Однако, на ее лице все равно отразилось беспокойство. 
            <p>– $Имя Игрока$, что случилось?
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[43].begin(); }],
        background: 'Persons/Cheryl',
        condition: function () { Game.Sounds.play('Music', 'Cheryl') }
    });

Game.Scenes.TC[43] =
    new Scene({
        text: `
            – Если я тебе расскажу, ты все равно не поверишь. 
            <p>– Я не думаю, что меня будет сложно удивить, учитывая, насколько насыщенно протекает моя жизнь, - она натянула рукав своей рубашки, чтобы скрыть синяки. 
            <p>Я вздохнула и решила перевести тему:
            <p>– Поможешь дойти до комнаты? Очень хочу наконец-то прилечь!
            <p>– Ты ещё спрашиваешь, идем, - я взяла ее под руку. - Кстати, а что это был за парень? 

            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[44].begin(); }],
        background: 'Persons/Cheryl',
    });

Game.Scenes.TC[44] =
    new Scene({
        text: `
            - Да так, один неравнодушный… - я немного смутилась, но быстро взяла себя в руки. 
            <p>Через некоторое время я уже лежала на кровати, а на моей тумбочке стоял горячий чай. 
            <p>– Рассказывай! - Шерил расположилась рядом со мной. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[45].begin(); }],
        background: 'Persons/Cheryl',
    });

Game.Scenes.TC[45] =
    new Scene({
        text: `
            Говорить правду было бессмысленно или нет? Это же Шерил, она одна из моих самых близких друзей. Но даже этот факт не поможет мне убедить человека поверить в мою невероятную историю.
            `,
        buttontext: [
            'Я рассказала правду',
            'Я предпочла скрыть правду'
        ],
        buttonaction: [
            () => { Game.Scenes.TC[46].begin(); Game.Stats.Cheryl.add(1); Game.Achievements.TrustCheryl.unlock() },
            () => { Game.Scenes.TC[48].begin(); }
        ],
        background: 'Persons/Cheryl',
    });

Game.Scenes.TC[46] =
    new Scene({
        text: `
            В красочных деталях мною было описано путешествие в прошлое и встреча с Теслой. На лице Шерил я видела неподдельный интерес. Когда я закончила рассказ, подруга проговорила: 
            <p>- Это  потрясающе, никогда не думала, что история может быть таким интересным предметом. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[47].begin(); Game.message("Шерил заинтересовалась историей") }],
        background: '',
    });

Game.Scenes.TC[47] =
    new Scene({
        text: `
            Я не удивилась, что Шерил не поверила мне. Но зато мне стало легче от того, что я смогла выговориться.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[70].begin(); }],
        background: 'Persons/Cheryl',
    });

Game.Scenes.TC[48] =
    new Scene({
        text: `
            Я рассказа ту же байку про переутомление. Шерил почувствовала, что здесь что-то не так, ухмыльнулась,  и не стала продолжать разговор.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[70].begin(); Game.message('Шерил ощущает вашу неискренность'); Game.Stats.Cheryl.add(-1); }],
        background: 'Persons/Cheryl',
    });

Game.Scenes.TC[49] =
    new Scene({
        text: `
            Нэйтан вздохнул и проговорил: 
            <p>-  Дай мне десять минут, я отвезу тебя домой. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[50].begin(); }],
        background: 'Persons/Neitan',
    });

Game.Scenes.TC[50] =
    new Scene({
        text: `
            Я немного смущенно взглянула на него и благодарно кивнула. Остальные покинули медпункт и у меня осталось немного времени, чтобы собраться. 
            Я медленно подошла к рюкзаку, проверяя все ли вещи на месте. Ключи и учебные принадлежности, документы - все было при мне.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[51].begin(); }],
        background: 'Backgrounds/Firstaid_post',
    });

Game.Scenes.TC[51] =
    new Scene({
        text: `
            Я подошла к зеркалу, чтобы умыться и привести себя в порядок. Растрепанные волосы тут же уложились в маленький хвостик. 
            Я мыла руки, как вдруг заметила то самое черное пятно из своего сна. 
            <p>Я словно ошпаренная снова вернулась на кушетку.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[52].begin(); }],
        background: 'Persons/Hero',
    });

Game.Scenes.TC[52] =
    new Scene({
        text: `
            “Так все-таки я действительно перенеслась во времени?! Тесла… Монстр. Что же это?” 
            <p>Я терла свою руку как могла: мылом, спиртом - но ему все было нипочем.
            <p>“Как же так…”
            <p>Тело покрылось мурашками от осознания того, что все произошедшее, действительно имело место быть. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[53].begin(); }],
        background: '',
    });

Game.Scenes.TC[53] =
    new Scene({
        text: `
            Мое обеспокоенное лицо увидел Нэйтан, который успел вернуться. 
            <p>-  $Имя Игрока$, совсем плохо? Давай поедем в больницу… 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[18].begin(); }],
        background: 'Persons/Neitan',
        condition: function () {
          if (Game.Stats.Believe.get <= 0 && Game.Stats.StreetStraight.get >= 1) {
            this.buttonaction[0] = () => { Game.Scenes.TC[55].begin(); };
          }
          if (Game.Stats.Believe.get >= 1) {
            this.buttonaction[0] = () => { Game.Scenes.TC[55].begin(); };
          }

          if (Game.Stats.Believe.get <= 0 && Game.Stats.StreetStraight.get <= 0 && Game.Stats.StreetHide.get >= 1) {
            this.buttonaction[0] = () => { Game.Scenes.TC[54].begin(); };
          }

          if (Game.Stats.Believe.get <= 0 && Game.Stats.StreetStraight.get <= 0 && Game.Stats.StreetHide.get <= 0) {
            this.buttonaction[0] = () => { Game.Scenes.TC[54].begin(); };
          }

        }
    });

Game.Scenes.TC[54] =
    new Scene({
        text: `
            При упоминании больницы, я невольно вспомнила то существо и меня передернуло. 
            <p>“Хватит с меня больниц!” 
            <p>- Все хорошо, просто отвезите меня домой, пожалуйста. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[56].begin(); }],
        background: '',
    });

Game.Scenes.TC[55] =
    new Scene({
        text: `
            Сейчас мне меньше всего хотелось ехать в больницу. После всех этих потрясений, нет ничего лучше горячего чая и теплого пледа дома. 
            <p>- Все хорошо, просто отвезите меня домой, пожалуйста. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[56].begin(); }],
        background: '',
    });

Game.Scenes.TC[56] =
    new Scene({
        text: `
            Нэйтан кивнул. Он помог мне подняться и:
            `,
        buttontext: [
            'Приобнимая за талию, помог дойти до машины ',
            'Придерживая за локоть, помог дойти до машины '
        ],
        buttonaction: [
            () => { Game.Scenes.TC[57].begin(); },
            () => { Game.Scenes.TC[60].begin(); }],
        background: 'Persons/Neitan',
        condition: function () { Game.Sounds.play('Music', 'Neitan') }
    });

Game.Scenes.TC[57] =
    new Scene({
        text: `
            Его поддержка помогала мне не упасть. Я чувствовала, как его руки крепко держали меня, направляя, не давая оступиться. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[58].begin(); Game.message("Ваше сердце пропустило удар"); Game.Stats.Neitan.add(1) }],
        background: '',
    });

Game.Scenes.TC[58] =
    new Scene({
        text: `
            Коридоры университета пустовали, так как шли занятия, поэтому мы избежали ненужных слухов.
            <p>- Профессор, разве у вас нет больше пар сегодня? 
            <p>- Нет, сегодня на вечер у меня, видимо, другие дела, - Нэйтан хитро улыбнулся. 
            <p>Я смутилась, понимая, что это вряд ли относится ко мне, но сердце застучало быстрее. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[59].begin(); }],
        background: '',
    });

Game.Scenes.TC[59] =
    new Scene({
        text: `
            <p>“Профессор помогает своей ученице в трудной ситуации. Казалось бы, ничего необычного…”
            <p>Однако невольно вспоминались самые разнообразные сцены из романтических фильмов на подобную тематику.
            <p>Я раскраснелась еще больше.
            <p>Нэйтан довел меня до своей машины и помог сесть на переднее сидение.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[61].begin(); }],
        background: '',
    });

Game.Scenes.TC[60] =
    new Scene({
        text: `
            Нэйтан галантно держал меня под руку, не давая оступиться. Его поддержка была как никак кстати, учитывая, мою слабость. И я  была благодарна ему за это. 
            <p>Коридоры университета пустовали, так как шли занятия, поэтому мы избежали ненужных слухов. 
            <p>- Профессор, разве у вас нет больше пар сегодня? 
            <p>- Нет, сегодня у меня сокращенный день, - Нэйтан улыбнулся.
            <p>Повезло, что профессор оказался таким чутким. Он довел меня до своей машины и помог сесть на переднее сидение. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[61].begin(); }],
        background: '',
    });

Game.Scenes.TC[61] =
    new Scene({
        text: `
            Я назвала ему свой адрес и он медленно тронулся, выезжая на дорогу. Заиграла тихая мелодия. Она была без слов и отсылала к мирному тихому настроению. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[62].begin(); }],
        background: 'Backgrounds/Car',
    });

Game.Scenes.TC[62] =
    new Scene({
        text: `
            Тишину прервал Нэйтан, который решил спросить: 
            <p>- Чем же ты таким занимаешься, что теряешь сознание на моих парах? 
            <p>“Да так, всего лишь, видимо, путешествую во времени…”
            <p>- В последнее время много работаю. К тому же, я стараюсь поддерживать нормальный уровень успеваемости.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[63].begin(); }],
        background: 'Persons/Neitan',
        condition: function () {
            if (Game.Stats.Study.get >= 4) {
                this.buttonaction[0] = () => { Game.Scenes.TC[63].begin(); }
            }
            else {
                this.buttonaction[0] = () => { Game.Scenes.TC[65].begin(); }
            }
        }
    });

Game.Scenes.TC[63] =
    new Scene({
        text: `
            Профессор удовлетворительно кивнул. 
            <p>- Ты и правда подтянула успеваемость, молодец! Я мельком ознакомился с твоим эссе по Николе Тесле. Там есть интересные мысли… Кстати, почему ты выбрала именно его среди множества великих ученых?
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[64].begin(); }],
        background: 'Persons/Neitan',
    });

Game.Scenes.TC[64] =
    new Scene({
        text: `
            - Я знаю, что это может немного банально, но я хотела подсветить что-то новое. 
            Еще с раннего детства родители рассказывали о необычных деятелях и их открытиях. Но люди так редко делают акценты на самой личности, что в своей работе мне хотелось отразить его человечность.
            <p>- Похвально… - Нэйтан вдруг о чем-то задумался. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[67].begin(); }],
        background: 'Persons/Neitan',
    });

Game.Scenes.TC[65] =
    new Scene({
        text: `
            Профессор недовольно покачал головой. 
            <p>Я понимаю, работа, но твои оценки оставляют желать лучшего. Я мельком ознакомился с цифровым вариантом твоего эссе по Николе Тесле. Тем не менее мне нужен бумажный оригинал, чтобы выставить оценку. Там есть несколько интересных мыслей, но в целом - слабовато. Кстати, почему ты выбрала именно его среди множества великих ученых?
            <p>Вспомнив сегодняшнее столкновение с Теслой, я задумалась. Неужели сама судьба решила подшутить надо мной? 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[66].begin(); }],
        background: 'Persons/Neitan',
    });

Game.Scenes.TC[66] =
    new Scene({
        text: `
            - Я знаю, что это может немного банально, но я хотела подсветить что-то новое. 
            Еще с раннего детства родители рассказывали о необычных деятелях и их открытиях. Но люди так редко делают акценты на самой личности, что в своей работе мне хотелось отразить его человечность.
            <p>- Значит, тебе нужно было более тщательно изучить материал, - Нэйтан вдруг замолчал и о чем-то задумался.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[67].begin(); }],
        background: 'Persons/Neitan',
    });

Game.Scenes.TC[67] =
    new Scene({
        text: `
            - Профессор, все в порядке? 
            <p>- Да, прости… - он словно вышел из транса и снова как ни в чем не бывало посмотрел на меня. - Погрузился в воспоминания о прошлом. 
            <p>- Встречали Теслу лично? - я рассмеялась. 
            <p>- Очень остроумно. Всего лишь прекрасные студенческие годы. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[68].begin(); }],
        background: 'Persons/Neitan',
    });

Game.Scenes.TC[68] =
    new Scene({
        text: `
            Мы еще немного поговорили, пока он вез меня домой. Я снова увидела привычную зеленую лужайку, спокойную и умиротворенную обстановку. 
            <p>В соседнем доме горел свет. Значит Шерил уже вернулась. И как бы в подтверждение моих мыслей, она резко выбежала из дома, с грохотом захлопнув входную дверь. Даже из окна машины я видела, что она была подавлена. 
            <p>“Почему она не на занятиях?”
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[69].begin() }],
        background: '',
    });

Game.Scenes.TC[69] =
    new Scene({
        text: `
            - Спасибо большое, профессор, я пойду.
            <p>- Давай я помогу тебе. 
            <p>- Не стоит, я и так вас задержала. К тому же, там моя подруга, она мне поможет. 
            <p>- Хорошо. И мне было не сложно. 
            <p>Он вышел из машины, открыл мне дверь, помогая подняться. Я еще раз поблагодарила Нэйтана и немного пошатываясь направилась к Шерил. 

            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[41].begin(); }],
        background: 'Persons/Neitan',
        condition: function () {
            if (Game.Stats.Cheryl.get <= -1) {
                this.buttonaction[0] = () => { Game.Scenes.TC[42].begin(); };
            }
            else {
                this.buttonaction[0] = () => { Game.Scenes.TC[41].begin(); };
            }
        }
    });

Game.Scenes.TC[70] =
    new Scene({
        text: `
            Через час подруга ушла, так как ей нужно было успеть в магазин до возвращения отчима домой. Я осталась наедине со своими мыслями. Усталость от путешествия дала о себе знать, и я не заметила, как уснула. 
            <p>Ближе к вечеру меня разбудила мама, которая пришла с работы и решила узнать о моем самочувствии. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[160].begin(); }],
        background: 'Backgrounds/Hero_Sleeps',
        condition: function () { Game.Sounds.play('Music', 'FirstChapter'); }
    });

Game.Scenes.TC[160] =
  new Scene({
    text: `
            - $Имя Игрока$, ты заболела? Что случилось? - голос мамы был уставшим, но беспокойным. Я знаю, что она много работает, но у нее всегда находится время, чтобы поговорить со мной.
            `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.TC[71].begin(); }],
    background: 'Backgrounds/Hero_Sleeps',
  });

Game.Scenes.TC[71] =
    new Scene({
        text: `
            - Да, немного лихорадит, принесешь мне чай? Ужинать сегодня не буду. 
            <p>Она подошла и приложила губы к моему лбу. 
            <p>- Температуры вроде бы нет, но принесу градусник на всякий случай. 
            <p>Я закатила глаза, но кивнула. Мама всегда меня чрезмерно опекала. 
            <p>На удивление, у меня и правда оказалась небольшая температура. После этого мама дала мне лекарство, принесла напиток и спустилась вниз готовить ужин. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[72].begin(); }],
        background: 'Backgrounds/Hero_Sleeps',
    });

Game.Scenes.TC[72] =
    new Scene({
        text: `
            Оставшись в одиночестве, я взглянула на метку и меня снова поразило осознание, что все было правдой. В голову пришла лишь одна мысль:
            <p>“Мне надо убедиться на 100%.”
            <p>Я дотянулась до телефона и начала гуглить про Катарину, Теслу и ту эпоху. Мне попалась монография одного историка, который анализировал мемуары Николы. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[73].begin(); }],
        background: 'Backgrounds/Hero_Sleeps',
        condition: function () {
            if (Game.Stats.Believe.get >= 1) {
                this.buttonaction[0] = () => { Game.Scenes.TC[73].begin(); }
            }
            else if (Game.Stats.StreetHide.get >= 1 || Game.Stats.Believe.get <= -1) {
                this.buttonaction[0] = () => { Game.Scenes.TC[74].begin(); }
                if (Game.Stats.StreetStraight.get >= 1) {
                    this.buttonaction[0] = () => { Game.Scenes.TC[75].begin(); }
                }
            }
        }
    });

Game.Scenes.TC[73] =
    new Scene({
        text: `
            В книге были описаны следующие мысли Теслы:
            <p><i>“Катарина вела себя немного странно. 
            Мы собирались навестить Киплинга, который заинтересовал меня своим творчеством, но Катарина выглядела озадаченной, словно впервые слышит об этой встрече, да и меня видит впервые. 
            После, мы немного пообщались о моем досуге и двинулись в сторону квартиры писателя. Нас встретила очаровательная пожилая дама и гостеприимно предложила войти в дом. 
            Но Катарина резко побледнела и потеряла сознание…”</i>
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[76].begin(); }],
        background: '',
    });

Game.Scenes.TC[74] =
    new Scene({
        text: `
            В книге были описаны следующие мысли Теслы:
            <p><i>“Катарина вела себя немного странно. Словно для нее все это было спектаклем, а она играла в нем главную роль. 
            Я не знал, как на это реагировать. Вместо визита к Киплингу, я все же настоял на походе в больницу, искренне переживая за ее самочувствие. 
            Увидев врача, Катарина побледнела и потеряла сознание…”</i>
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[76].begin(); }],
        background: '',
    });

Game.Scenes.TC[75] =
    new Scene({
        text: `
            В книге были описаны следующие мысли Теслы:
            <p>“Катарина вела себя немного странно. Она ни с того, ни с сего убежала от меня в неизвестном направлении. 
            Я изрядно попотел, чтобы отыскать ее. В конце концов в одной из книжных лавок я обнаружил ее без сознания…”
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[76].begin(); }],
        background: '',
    });

Game.Scenes.TC[76] =
    new Scene({
        text: `
            Я заблокировала телефон и меня затрясло. Я окончательно поняла, что мои действия оказали влияние на настоящее. Это звучало абсурдно, но сам Тесла был моим проводником в моменты прошлого. 
            <p>В глубине души я все еще надеялась, что это лишь игра воображения. 
            Спать совсем не хотелось, но и засиживаться долго нельзя. Организму нужен отдых.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[77].begin(); Game.Stats.Activities.set(2); Game.message('Вы можете сделать только 2 выбора!') }],
      condition: function () {
        Game.Scenes.TC[77].activate(0);Game.Scenes.TC[77].activate(1);Game.Scenes.TC[77].activate(2);
        Game.Scenes.TC[80].activate(0);Game.Scenes.TC[80].activate(1);Game.Scenes.TC[80].activate(2);Game.Scenes.TC[80].activate(3);
      }
    });

Game.Scenes.TC[77] =
    new Scene({
        text: `
             Перед сном я все-таки решила чем-нибудь заняться. 
            `,
        buttontext: [
            'Спуститься к родителям',
            'Позаниматься',
            'Написать кому-нибудь'
        ],
        buttonaction: [
            () => { Game.Scenes.TC[78].begin(); Game.Stats.Activities.add(-1); Game.Stats.Family.add(1);  },
            () => { Game.Scenes.TC[79].begin(); Game.Stats.Activities.add(-1); },
            () => { Game.Scenes.TC[80].begin(); Game.Stats.Activities.add(-1); },
        ],
        buttonactive: [true, true, true],
        background: 'Backgrounds/Hero_Sleeps',
    });

Game.Scenes.TC[78] =
    new Scene({
        text: `
            Несмотря на свое самочувствие, я все же хотела провести время с родителями. 
            Тем более, что у них сейчас не все гладко в отношениях. Уверена - проведённое вместе время укрепит нашу семью.
            `,
        buttontext: [''],
        buttonaction: [
            () => { Game.Scenes.TC[81].begin(); }],
        background: '',
    });

Game.Scenes.TC[81] =
    new Scene({
        text: `
            Спустившись вниз я обнаружила, что мама моет посуду с довольно задумчивым видом, а папа сидит в кресле и с незаинтересованностью пялится в телевизор. 
            <p>Первым меня увидел отец, который подошел ко мне, спросил про самочувствие и усадил на диван. Мама закончила с посудой и присоединилась к нам. 
            `,
        buttontext: [''],
        buttonaction: [
            () => { Game.Scenes.TC[82].begin(); },
        ],
        background: 'Backgrounds/Kitchen',
    });

Game.Scenes.TC[82] =
    new Scene({
        text: `
            - Тебе лучше отдохнуть, - сказала мама. 
            <p>- Все в порядке. Просто мы давно не проводили время вместе. Мне этого очень не хватает… 
            <p>Отец грустно вздохнул и выдавил из себя улыбку:
            <p>- Чем бы тебе хотелось заняться?
            `,
        buttontext: [
            'Поиграть в настолку',
            'Просто поговорить о жизни',
            'Посмотреть фильм'
        ],
        buttonaction: [
            () => { Game.Scenes.TC[83].begin(); },
            () => { Game.Scenes.TC[84].begin(); },
            () => { Game.Scenes.TC[86].begin();  },
        ],
        background: 'Backgrounds/Kitchen',
        condition: function () {
            Game.Scenes.TC[77].deactivate(0);
        }
    });

Game.Scenes.TC[83] =
    new Scene({
        text: `
            Отец достал из шкафчика игру, где надо скупать улицы и сделать своих оппонентов банкротами. Мы прекрасно провели время, смеясь и веселясь. Я не видела на лицах своих родителей какой-то грусти. Напротив, они даже приобнимали друг друга, забыв на время о разногласиях. Думаю, в этот вечер мы вернулись в прошлое, когда вокруг все было идеально. 
            `,
        buttontext: [''],
        buttonaction: [
            () => { Game.Scenes.TC[101].begin(); Game.message('Ваша семья становится крепче'); }
        ],
        background: 'Backgrounds/Nonopoly',
    });

Game.Scenes.TC[84] =
    new Scene({
        text: `
            Мы несколько часов разговаривали о всяких мелочах в жизни. Мама с папой попивали вино и, казалось, были умиротворенными. 
            <p>Они с интересом слушали мой рассказ о сегодняшнем инциденте. Я упомянула Скарлетт. Мама тут же выдала идею о девчачьей посиделке, не забыв и про Шерил, к которой всегда тепло относилась. Она даже предложила вместе что-нибудь приготовить.
            `,
        buttontext: [''],
        buttonaction: [
            () => { Game.Scenes.TC[101].begin(); }],
        background: 'Backgrounds/Kitchen',
    });

Game.Scenes.TC[85] =
    new Scene({
        text: `
            Папа тоже воодушевился идеей и предложил пригласить Леона, дабы разбавить женский коллектив, ведь мы всегда хорошо ладили. Ну, а я была рада, что семья поддерживает меня и хочет быть ближе к моим друзьям. 
            <p>Беззаботно разговаривая, я почувствовала, что в этот вечер мы будто бы вернулись в прошлое, когда вокруг все было идеально. 
            `,
        buttontext: [''],
        buttonaction: [
            () => { Game.Scenes.TC[101].begin(); Game.message('Ваша семья становится крепче'); }],
        background: 'Backgrounds/Kitchen',
    });

Game.Scenes.TC[86] =
    new Scene({
        text: `
            Мы выбрали классическую французскую комедию про двух, казалось бы, совершенно разных людей, которые через долгий и сложный путь смогли стать друзьями. Нам было хорошо и спокойно вместе. Мама с папой пили вино и были счастливы. Думаю, в этот вечер мы вернулись в прошлое, когда вокруг все было идеально. 
            `,
        buttontext: [''],
        buttonaction: [
            () => { Game.Scenes.TC[101].begin(); Game.message('Ваша семья становится крепче'); }],
        background: 'Backgrounds/Film',
    });


Game.Scenes.TC[79] =
    new Scene({
        text: `
            Как бы мне не было лень, но я должна взять себя в руки и подтянуть учебу. 
            Тем более, что придется пропустить несколько дней. Я принялась выполнять домашнюю работу и читать лекции. Вечер получился продуктивным.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[101].begin(); Game.message('Вы прилежная ученица'); Game.Stats.Study.add(1) }],
        background: 'Backgrounds/Hero_Sleeps',
        condition: function () {
            Game.Scenes.TC[77].deactivate(1);
        }
    });

Game.Scenes.TC[80] =
    new Scene({
        text: `
            Я осталась в комнате, села на своё кресло, включила любимую музыкальную группу и решила написать...
            `,
        buttontext: [
            'Леону',
            'Нэйтану',
            'Скарлетт',
            'Шерил'],
        buttonaction: [
            () => { Game.Scenes.TC[87].begin(); Game.Scenes.TC[80].deactivate(0); },
            () => { Game.Scenes.TC[91].begin(); Game.Scenes.TC[80].deactivate(1); },
            () => { Game.Scenes.TC[93].begin(); Game.Scenes.TC[80].deactivate(2); },
            () => { Game.Scenes.TC[99].begin(); Game.Scenes.TC[80].deactivate(3); },
        ],
        background: 'Backgrounds/Hero_Sleeps',
        buttonactive: [true, true, true, true],
        condition: function () {
            if (Game.Stats.ComeWithLeon.get == 1) {
                this.buttonaction[0] = () => {
                    Game.Scenes.TC[88].begin(); Game.Scenes.TC[80].deactivate(0);
                }
            }
            if (Game.Stats.ComeWithLeon.get == 0) {
                this.buttonaction[1] = () => {
                    Game.Scenes.TC[90].begin(); Game.Scenes.TC[80].deactivate(1);
                }
            }
        }
    });

Game.Scenes.TC[87] =
    new Scene({
        text: `
            Я решила написать Леону. Увидев его сегодня, я вспомнила как мы классно зависали раньше и как я скучаю по тем беззаботным временам. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[89].begin(); }],
        background: 'Backgrounds/Hero_Sleeps',

    });

Game.Scenes.TC[88] =
    new Scene({
        text: `
            Я решила написать Леону и еще раз поблагодарить его за помощь. Он ответил в ту же секунду стикером в виде собачки, которая показывает язык. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[89].begin(); }],
        background: 'Backgrounds/Hero_Sleeps',
    });

Game.Scenes.TC[89] =
    new Scene({
        text: `
            Мы переписывались о всяком. Он упомянул, что хочет купить подержанный мотоцикл и в ближайшее время съехать от брата. Не забыли и вспомнить “молодость”. 
            Леон предложил как-нибудь встретиться и повторить вечер воспоминаний. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[101].begin(); Game.message('Леон рад был поговорить с вами'); Game.Stats.Leon.add(1) }],
        background: 'Backgrounds/Hero_Sleeps',
    });

Game.Scenes.TC[90] =
    new Scene({
        text: `
            Я решила написать Нэйтану и еще раз поблагодарить его за помощь. Он ответил не сразу. В своем сообщении он интересовался моим самочувствием. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[92].begin(); }],
        background: 'Backgrounds/Hero_Sleeps',
    });

Game.Scenes.TC[91] =
    new Scene({
        text: `
            Я решила написать Нэйтану. Он как и все беспокоился о моем состояние. Мне была приятна его чуткость. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[92].begin(); }],
        background: 'Backgrounds/Hero_Sleeps',
    });

Game.Scenes.TC[92] =
    new Scene({
        text: `
            Мы переписывались об учебе по большей части. Нэйтан не упустил возможности еще раз напомнить, что мне стоит прикладывать больше усилий. 
            Он пожелал мне спокойной ночи,  велел отдыхать и заниматься из дома. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[101].begin(); Game.message('Нэйтан рад вас наставлять'); Game.Stats.Neitan.add(1) }],
        background: 'Backgrounds/Hero_Sleeps',
    });

Game.Scenes.TC[93] =
    new Scene({
        text: `
            Я решила созвониться со Скарлетт по видеосвязи. Мы давно не общались и, в какой-то степени, я скучала по нашим разговорам. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[94].begin(); }],
        background: 'Persons/Scarlett',
        condition: function () {
            if (Game.Stats.ScarlettSpeech.get == -1) Game.Scenes.TC[93].buttonaction[0] = () => { Game.Scenes.TC[95].begin(); }
        }
    });

Game.Scenes.TC[94] =
    new Scene({
        text: `
            Как моя подруга она всегда знала, какие слова нужно сказать, чтобы я чувствовала себя лучше. 
            Мне был необходим этот разговор обо всем, что вызывало тревогу последние дни, разумеется, опуская момент с перемещением. У нас выдался очень душевный вечер. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[101].begin(); Game.message('Скарлетт чудесно провела время'); Game.Stats.Scarlett.add(1) }],
        background: 'Persons/Scarlett',
    });

Game.Scenes.TC[95] =
    new Scene({
        text: `
            Она поведала мне немного о своих проблемах с мамой. У них не сходились интересы. Родные девушки не могли представить свою дочь в роли историка.
            <p>- Ты представляешь, $Имя Игрока$, я заявила, что хочу работать в архивах, а она все снова про свой бизнес. Плевать ей на мои желания! 
            <p>- А отец? 
            <p>- Ушел рано, у него собеседование. 

            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[96].begin(); }],
        background: 'Persons/Scarlett',
    });

Game.Scenes.TC[96] =
    new Scene({
        text: `
            - Есть шансы, что он устроится на работу? 
            <p>- Не знаю. Хоть папа и всегда меня поддерживал, но сейчас он больше походит на зомби, чем на человека. Мама в конец достала его пилить. 
            <p>Я была мало посвящена в семейные проблемы подруги. Скарлетт была довольно закрытым человеком. А может она просто боялась показаться уязвимой. Мне же…
            `,
        buttontext: [
            'Были понятны ее чувства',
            'Было все равно'
        ],
        buttonaction: [
            () => { Game.Scenes.TC[97].begin(); Game.message('Скарлетт дорожит вашей дружбой'); Game.Stats.Scarlett.add(1) },
            () => { Game.Scenes.TC[98].begin(); Game.message('Вы со Скарлетт не такие уж и близкие подруги'); Game.Stats.Scarlett.add(-1) },
        ],
        background: 'Persons/Scarlett',
    });

Game.Scenes.TC[97] =
    new Scene({
        text: `
            Семья - это важно, но каждый вправе жить  и делать выбор, опираясь на свои желания. Понемногу, но Скарлетт открывалась мне и я хотела быть на ее стороне.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[101].begin(); }],
        background: 'Backgrounds/Hero_Sleeps',
    });

Game.Scenes.TC[98] =
    new Scene({
        text: `
            Каждый жил своей жизнью. Нужно было фокусироваться на своих проблемах, а не лезть в чужие. У Скарлетт была возможность не усложнять себе жизнь, она же выбрала иной путь.
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[101].begin(); }],
        background: 'Backgrounds/Hero_Sleeps',
    });

Game.Scenes.TC[99] =
    new Scene({
        text: `
            Шерил довольно быстро ответила. Мы договорились немного поиграть в совместную компьютерную игру, где надо было исследовать мир за анимешных героев, открывать и прокачивать различных персонажей. 
            <p>Это было отличной идеей, мы обе погрузились в мир без насущных проблем, которых было много у каждой из нас, и отдохнули. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[101].begin(); Game.message('Шерил всегда рада вашей компании'); Game.Stats.Cheryl.add(1) }],
        background: 'Backgrounds/Hero_Sleeps',
    });

Game.Scenes.TC[100] =
    new Scene({
        text: `
            Окончательно вымотавшись, я обессилено упала на кровать. Но выспаться мне сегодня было не суждено. 
            `,
        buttontext: [''],
        buttonaction: [() => {
            setTimeout(() => { Game.Scenes.PP[1].begin(); }, 1000);
            Game.LoadScreen('PP');
            Game.Progress.save('PP');

        }],
        background: 'Backgrounds/Hero_Sleeps',
    });

Game.Scenes.TC[101] =
    new Scene({
        text: `
            В любом случае мне было приятно провести так своё время!
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.TC[77].begin(); }],
        background: 'Backgrounds/Hero_Sleeps',
        condition: function () {
            if (Game.Stats.Activities.get <= 0)
              Game.Scenes.TC[101].buttonaction[0] = () => { Game.Scenes.TC[100].begin();
              Game.Achievements.SecondPartCompleted.unlock();
            }
        }
    });Game.Scenes.PP = [];

Game.Scenes.PP[1] =
    new Scene({
        text: `
            Открыв глаза, я снова увидела это таинственное пространство, что находилось вне законов нашего привычного мира. 
            <p>Мне еще предстояло выяснить, по какому условию я то и дело перемещаюсь в различные временные промежутки не по своему желанию. 
            <p>“Через сон? Воля проводника?”
            `,
        buttontext: [''],
        background: 'Backgrounds/Abstraction_Hero',
        buttonaction: [() => { Game.Scenes.PP[2].begin(); }],
        condition: () => { Game.Sounds.play('Music', 'Prologue'); Game.Effects.Flash(); }
    });

Game.Scenes.PP[2] =
    new Scene({
        text: `
            Такое скорое возвращение сюда - удивляло. Казалось, что пока я не разберусь в эпохе Теслы, мои шансы еще раз обратиться к проводнику с вопросами -  крайне малы. 
            Однако я ошибалась и теперь, оказавшись здесь, я могу попытаться узнать хоть какую-то важную информацию.
            `,
        background: 'Backgrounds/Abstraction_Hero',
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[3].begin(); }],
    });

Game.Scenes.PP[3] =
    new Scene({
        text: `
            Оглядевшись, я поняла, что кроме меня здесь никого нет. Это место выглядело совсем безжизненно и пугало своими размерами. Было боязно от мысли, что я могу остаться здесь навсегда. 
            <p>“Нет… Глупости. Ему это не нужно, никому это не нужно. Здесь должна быть лазейка, мне лишь необходимо ее найти!”
            <p>Я:
            
            `,
        buttontext: ['Пошла прямо', 'Повернула налево', 'Повернула направо'],
        background: 'Backgrounds/Abstraction_Hero',
        buttonaction: [
            () => { Game.Scenes.PP[4].begin(); },
            () => { Game.Scenes.PP[5].begin(); },
            () => { Game.Scenes.PP[7].begin(); },
        ],
    });

Game.Scenes.PP[4] =
    new Scene({
        text: `
            <p>Самым простым решением мне виделось просто пойти вперед. Я шла по извилистым дорожкам, видя одни и те же парящие камни. 
            <p>“Я хожу по кругу?” 
            <p>И действительно, я вновь оказалась в самом начале своего пути. Пришлось снова выбирать маршрут. 
            `,
        buttontext: ['Пошла прямо', 'Повернула налево', 'Повернула направо'],
        buttonaction: [
            () => { Game.Scenes.PP[4].begin(); },
            () => { Game.Scenes.PP[5].begin(); },
            () => { Game.Scenes.PP[7].begin(); },],
    });

Game.Scenes.PP[5] =
    new Scene({
        text: `
            Я шла по каменным дорожкам довольно продолжительное время, пока не почувствовала легкий сладостный аромат, заставивший меня остановиться и внимательнее рассмотреть прекрасный пейзаж. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[6].begin(); }],
    });

Game.Scenes.PP[6] =
    new Scene({
        text: `
            Передо мной раскинулось поле, усеянное цветами. Это было необычайно красивое зрелище, которое вселяло в этот мир новые удивительные краски. 
            <p>Я прилегла на поляну и почувствовала, как десятки растений приятно щекочут кожу.  
            <p>Эта минутная передышка помогла мне расслабиться. Было так спокойно и легко, что мне хотелось остаться тут подольше. 
            <p>“Но время не ждет, нужно идти дальше.” 
            
            `,
        background: "Backgrounds/Flowerfield",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[10].begin(); }],
    });

Game.Scenes.PP[7] =
    new Scene({
        text: `
            Я шла по каменным дорожкам довольно продолжительное время, пока впереди не обнаружила еще одну развилку. 
            <p>Я:   
            `,
        buttontext: ['Повернула налево', 'Повернула направо'],
        buttonaction: [
            () => { Game.Scenes.PP[8].begin(); },
            () => { Game.Scenes.PP[9].begin(); },
        ],
    });

Game.Scenes.PP[8] =
    new Scene({
        text: `
            “Что за лабиринт…” 
            <p>Какое-то время спустя, мне удалось пройти дальше. На секунду я остановилась, чтобы переварить происходящее, но решила долго не задерживаться. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[10].begin(); }],
    });

Game.Scenes.PP[9] =
    new Scene({
        text: `
            Дорога привела меня к резкому обрыву, ознаменовавшему конец пути. Заглянув вниз, я увидела нечто похожее на водоворот. 
            С каждой секундой он будто бы затягивал меня, гипнотизировал, завлекая познакомиться ближе с бездной. 
            <p>Я быстро перевела взгляд на небо, но и оно было неспокойным, а сильные порывы ветра устрашали, пытались сбросить со скалы. Немедленно развернувшись, я убежала прочь. 
            
            `,
        background: 'Backgrounds/Waterflow',
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[7].begin(); }],
    });

Game.Scenes.PP[10] =
    new Scene({
        text: `
            Вскоре я нашла узенькую дорожку, которая пролегала между скал. Было немного тесновато, но на мое счастье путь занял немного времени. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[11].begin(); }],
    });

Game.Scenes.PP[11] =
    new Scene({
        text: `
            И снова бескрайние просторы предстали перед моим взором. Это было похоже на лабиринт, где нет выхода, а мои блуждания - это лишь попытка скоротать время. 
            <p>Кое-что все же изменилось. Я увидела дымку, которая напоминала портал в другое измерение. Подойдя ближе, мне удалось разглядеть нечеткие силуэты людей и зданий.
            `,
        background: 'Backgrounds/Pompeii_Portal_Hero',
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[12].begin(); }],
    });

Game.Scenes.PP[12] =
    new Scene({
        text: `
            “Что же там такое…”
            <p>Я потянулась к нему, чтобы понять, не привиделось ли мне все это. 
            <p>- Как там говорится? Любопытство - не порок? - знакомый голос заставил меня вздрогнуть и одернуть руку. 
            
            `,
        background: 'Backgrounds/Pompeii_Portal_Hero',
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[13].begin(); }],
    });

Game.Scenes.PP[13] =
    new Scene({
        text: `
            - Проводник, так ты все-таки здесь, - я была слишком зла на него, чтобы обмениваться любезностями, поэтому перешла сразу к сути.
            -  Что дальше? Ты показал отрывок из моего прошлого со странными событиями, и все эти люди… Слишком много информации. 
            <p>- Это только начало, дорогая моя, - снова ухмылка. 
            `,
        background: 'Persons/Stranger',
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[14].begin(); }],
    });

Game.Scenes.PP[14] =
    new Scene({
        text: `
            - Я не смогу покинуть это место, пока все не вспомню, так?
            <p>- Верно, - проводник начал ходить вокруг меня. - Я не тюремщик, не думай так обо мне. Ты волею судьбы была втянута в конфликт, длившийся веками. 
            <p>- Но что по итогу я должна буду сделать? 
            
            `,
        background: 'Persons/Stranger',
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[15].begin(); }],
    });

Game.Scenes.PP[15] =
    new Scene({
        text: `
            - Это сложно объяснить. В моих силах лишь помогать и направлять тебя. Остальное - в твоих руках. 
            <p>Все эти загадки сильно утомляли, но я не уловила в тоне его голоса издевку или безразличие. 
            Как будто его самого это не забавляло, а, напротив, волновало. Возможно ли что он тоже заложник ситуации, как и я или все это просто притворство?  
            <p>Я:
            
            `,
        background: '',
        buttontext: ['Отношусь с пониманием', 'Устрою сцену'],
        buttonaction: [
            () => { Game.Scenes.PP[16].begin(); },
            () => { Game.Scenes.PP[18].begin(); },
        ],
    });

Game.Scenes.PP[16] =
    new Scene({
        text: `
            “Нам не стоит ругаться сейчас. Он единственный, кто понимает, что здесь происходит. Я не хочу рушить свое и без того шаткое положение.” 
            <p>- Что ж, раз только в моих силах разобраться - принимаю этот вызов. Спасибо за помощь. Хоть какую-то, - проводник ничего мне не ответил. Краем глаза я заметила лишь его улыбку. 
            `,
        buttontext: [''],
        background: "Persons/Stranger",
        buttonaction: [() => { Game.Scenes.PP[17].begin(); }],
    });

Game.Scenes.PP[17] =
    new Scene({
        text: `
            “Мне кажется, он рад, что я начинаю спокойнее воспринимать его “туманные” высказывания. Может, это шаг к взаимопониманию между нами?”  
            <p>Я решила продолжить нашу беседу и спросить: 
            `,
        buttontext: [''],
        background: "Persons/Stranger",
        buttonaction: [() => { Game.Scenes.PP[20].begin(); Game.message('Общение с вами приятно проводнику'); Game.Stats.God.add(1); }],
    });

Game.Scenes.PP[18] =
    new Scene({
        text: `
            “Мне плевать, я не игрушка, которой можно вертеть, как всем вздумается!”
            <p>- Я устала от твоих увиливаний. Скажи же мне конкретно, что здесь происходит и почему я должна все это переживать?            
            <p>Проводник недовольно вздохнул.    
            <p>- Я же говорил, у меня нет такого права. 
            `,
        background: "Persons/Stranger",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[19].begin(); Game.message('Общение с вами неприятно проводнику'); Game.Stats.God.add(-1); }],
    });

Game.Scenes.PP[19] =
    new Scene({
        text: `
            - Зато, я смотрю, у тебя есть право кидать меня куда попало без должной подготовки. Рисковать моей жизнью и нервами. 
            <p>- Я не ожидал, что ты поймешь мое положение.     
            <p>- А почему я вообще должна понимать тебя? Ты же ничего мне не объясняешь!
            <p>Немного успокоившись, я решила продолжить нашу беседу и спросить:
            `,
        background: "Persons/Stranger",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[20].begin(); }],
    });

Game.Scenes.PP[20] =
    new Scene({
        text: `
            - Этот портал - мой следующий этап? 
            <p>Проводник заметно переменился, подошел к парящей дымке и провел по ней рукой. 
            <p>- Рано, - коротко, без объяснений, так похоже на него. 
            <p>Он выдержал паузу, затем продолжил:
            <p>- Но раз ты здесь, то я должен показать тебе кое-что, - тон его голоса изменился, стал более отстраненным.

            `,
        background: "Backgrounds/Pompeii_Portal",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[21].begin(); }],
    });

Game.Scenes.PP[21] =
    new Scene({
        text: `
            Он протянул ко мне руку, как бы намекая, чтобы я подошла ближе. Когда мы соприкоснулись, мне впервые удалось почувствовать его теплоту. Длинные, немного шершавые пальцы аккуратно держали мою ладонь.
            <p>“Он не какой-то монстр, нет, он человек!” 
            `,
        background: "Backgrounds/Pompeii_Portal",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[22].begin(); }],
    });

Game.Scenes.PP[22] =
    new Scene({
        text: `
            Затем мужчина другой рукой дотронулся до моего лба. При всем его уверенном виде, всего на миг, мне удалось уловить легкую дрожь в этих прикосновениях. 
            <p>Закрыв глаза, я ощутила лёгкий импульс, а потом увидела совершенно другую обстановку. 
            `,
        background: "Backgrounds/Pompeii_Portal",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[23].begin(); Game.message("<em>Помпеи 79 г. н.э."); Game.Effects.Flash(); }],
    });

Game.Scenes.PP[23] =
    new Scene({
        text: `
            Вид большой оживленной площади захлестнул меня новыми ощущениями. 
            Я огляделась вокруг и с нескрываемым удивлением смотрела на величественные колонны, подпирающие фасады зданий; людей, одетых в туники и явно куда-то спешивших. 
            <p>Никто из них не стоял на месте - все они были словно винтики в одном большом механизме городской жизни. 
            А я была лишь скромным зрителем, который стал невольным свидетелем совершенно новой эпохи. 
            `,
        background: "Backgrounds/Pompeii",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[24].begin(); }],
        condition: () => { Game.Sounds.play('Music', 'Crowd') }
    });

Game.Scenes.PP[24] =
    new Scene({
        text: `
            Несколько прохожих, которые несли длинную палку с висящими на ней кувшинами, уверенно направлялись в мою сторону. Я пыталась привлечь их внимание, но эти люди никак не реагировали. 
            <p>“Вот-вот они врежутся в меня.”
            <p>Я была готова уворачиваться, однако прохожие прошли сквозь меня.
            <p>“Что за…?”
            `,
        background: "Backgrounds/Pompeii",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[25].begin(); }],
    });

Game.Scenes.PP[25] =
    new Scene({
        text: `
            Все, что мне удалось почувствовать - это легкое покалывание по всему телу. 
            <p>Я попробовала прикоснуться к постаменту, на котором возвышалась статуя героя этой эпохи - тот же эффект. 
            <p>“Я словно призрак…”
            <p>Мое внимание привлекла девушка, заметно отличающаяся ото всех остальных горожан. 

            `,
        background: "Backgrounds/Pompeii",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[26].begin();Game.Sounds.play('Music','Pompeii'); }],
    });

Game.Scenes.PP[26] =
    new Scene({
        text: `
            Черные, как смоль волосы, бледная и чистая кожа. Изящная походка, движения были похожи на танец: плавные, грациозные и неторопливые. 
            Она целенаправленно двигалась к храму, игнорируя все препятствия на своем пути. 
            `,
        background: "Persons/Goddess",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[27].begin(); Game.message('Юпитер в древнеримской мифологии - отец всех богов.');  }],
    });

Game.Scenes.PP[27] =
    new Scene({
        text: `
            Вскоре она опустилась на колени и начала молиться, проговаривая: 
            <p>- Отец наш Юпитер, оберегай этот город и его жителей. Пусть твое милостивое правление озарит этих несчастных и защитит их в нужный момент!
            <p>“Она что, плачет? Что же происходит? Я должна наблюдать за ней?” 
            `,
        background: "Persons/Goddess",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[28].begin(); }],
    });

Game.Scenes.PP[28] =
    new Scene({
        text: `
            Через некоторое время небо заволокло тучами. Люди засуетились и стали искать укрытие. 
            Я единственная осталась стоять в центре площади за спиной у этой девушки. Она не шелохнулась и продолжала повторять шепотом заветные слова. 
            `,
        background: "Backgrounds/Pompeii",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[29].begin(); }],
    });

Game.Scenes.PP[29] =
    new Scene({
        text: `
            Пошел дождь. Неожиданно площадь окрасилась в кроваво-красные тона. Со всех сторон стали слышны крики, люди падали на колени, умоляя богов не гневаться. 
            <p>Среди всего этого хаоса, лишь одна фигура сохраняла спокойствие и хладнокровность. Белое одеяние таинственной незнакомки постепенно становилось алым, а на лице оставались красные капли. 
            Складывалось ощущение, будто бы из ее глаз лились кровавые слезы. 
            `,
        background: "Backgrounds/Bloody_Pompeii",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[30].begin(); }],
    });

Game.Scenes.PP[30] =
    new Scene({
        text: `
            В какой-то момент на площадь вышла фигура в черной мантии. Уверенным шагом незнакомец двигался к храму, где все еще сидела девушка и молилась. Он подошел к ней и аккуратно поднял ее, взяв под руки. Они спешно двинулись в толпу горожан и все, что я успела заметить прежде, чем они скрылись - как плавными и мягкими движениями мужчина  накрыл спутницу своей мантией. 
            `,
        background: "Backgrounds/Bloody_Pompeii",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[31].begin(); Game.Effects.Flash(); }],
    });

Game.Scenes.PP[31] =
    new Scene({
        text: `
            Вспышка и я снова оказалась лицом к лицу с проводником. То, что я видела было определенно древним периодом. Что спросить?
            `,
        background: "Persons/Stranger",
        buttonactive: [true, true, true, false],
        buttontext: [
            'Что это за эпоха?',
            'Почему пошёл кровавый дождь?',
            'Кто эта девушка?',
            'Закончить диалог',
        ],
        buttonaction: [
            () => { Game.Scenes.PP[32].begin(); Game.Scenes.PP[33].deactivate(0); Game.Scenes.PP[35].deactivate(0); Game.Scenes.PP[37].deactivate(0); },
            () => { Game.Scenes.PP[34].begin(); Game.Scenes.PP[33].deactivate(1); Game.Scenes.PP[35].deactivate(1); Game.Scenes.PP[37].deactivate(1); },
            () => { Game.Scenes.PP[36].begin(); Game.Scenes.PP[33].deactivate(2); Game.Scenes.PP[35].deactivate(2); Game.Scenes.PP[37].deactivate(2); },
            () => { Game.Scenes.PP[38].begin(); },
        ],
        condition: function () {
          Game.Scenes.PP[33].activate(0); Game.Scenes.PP[35].activate(0); Game.Scenes.PP[37].activate(0);
          Game.Scenes.PP[33].activate(1); Game.Scenes.PP[35].activate(1); Game.Scenes.PP[37].activate(1);
          Game.Scenes.PP[33].activate(2); Game.Scenes.PP[35].activate(2); Game.Scenes.PP[37].activate(2);
            Game.Sounds.play('Music', 'Prologue')
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false) {
                this.buttonactive[3] = true;
            }
            else{
              this.buttonactive[3] = false;
            }
        }
    });

Game.Scenes.PP[32] =
    new Scene({
        text: `
            Мой собеседник вздохнул, а затем ответил: 
            <p>- Древний, некогда великий город - Помпеи. 
            <p>- Тот самый, который был уничтожен из-за извержения вулкана? 
            <p>- В точку. 
            <p>- Что же в этом времени особенного? Я не была там кем-то живым, скорее наоборот, как будто бы бестелесным существом… 
            `,
        background: "Persons/Stranger",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[33].begin(); }],
    });

Game.Scenes.PP[33] =
    new Scene({
        text: `
            - Так и должно было быть. Тебе не нужно ничего делать, только смотреть, ведь это место имеет ключевое значение во всей истории. 
            <p>- Но почему не рассказать мне все сразу? 
            <p>- Я связан по рукам и ногам… Все, что я могу - это помогать тебе маленькими шажками приближаться к истине. 
            `,
        background: "Persons/Stranger",
        buttonactive: [true, true, true, false],
        buttontext: [
            'Что это за эпоха?',
            'Почему пошёл кровавый дождь?',
            'Кто эта девушка?',
            'Закончить диалог',
        ],
        buttonaction: [
            () => { Game.Scenes.PP[32].begin(); Game.Scenes.PP[33].deactivate(0); Game.Scenes.PP[35].deactivate(0); Game.Scenes.PP[37].deactivate(0); },
            () => { Game.Scenes.PP[34].begin(); Game.Scenes.PP[33].deactivate(1); Game.Scenes.PP[35].deactivate(1); Game.Scenes.PP[37].deactivate(1); },
            () => { Game.Scenes.PP[36].begin(); Game.Scenes.PP[33].deactivate(2); Game.Scenes.PP[35].deactivate(2); Game.Scenes.PP[37].deactivate(2); },
            () => { Game.Scenes.PP[38].begin(); },
        ],
        condition: function () {
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false) {
                this.buttonactive[3] = true;
            }
            else{
              this.buttonactive[3] = false;
            }
        }
    });

Game.Scenes.PP[34] =
    new Scene({
        text: `
            - Это было первое из многих предзнаменований. И та девушка, как никто другой, чувствовала предстоящий коллапс.
            <p>- Все так запутано… Мне до сих пор не верится, что именно я стала участником этих событий.
            <p>Он улыбнулся. 
            `,
        background: "Persons/Stranger",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[35].begin(); }],
    });

Game.Scenes.PP[35] =
    new Scene({
        text: `
            - Случайности не случайны.
            <p>- И ты, разумеется, не скажешь почему? 
            <p>- Всему свое время. 
            `,
        background: "Persons/Stranger",
        buttonactive: [true, true, true, false],
        buttontext: [
            'Что это за эпоха?',
            'Почему пошёл кровавый дождь?',
            'Кто эта девушка?',
            'Закончить диалог',
        ],
        buttonaction: [
            () => { Game.Scenes.PP[32].begin(); Game.Scenes.PP[33].deactivate(0); Game.Scenes.PP[35].deactivate(0); Game.Scenes.PP[37].deactivate(0); },
            () => { Game.Scenes.PP[34].begin(); Game.Scenes.PP[33].deactivate(1); Game.Scenes.PP[35].deactivate(1); Game.Scenes.PP[37].deactivate(1); },
            () => { Game.Scenes.PP[36].begin(); Game.Scenes.PP[33].deactivate(2); Game.Scenes.PP[35].deactivate(2); Game.Scenes.PP[37].deactivate(2); },
            () => { Game.Scenes.PP[38].begin(); },
        ],
        condition: function () {
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false) {
                this.buttonactive[3] = true;
            }
            else{
              this.buttonactive[3] = false;
            }
        }
    });

Game.Scenes.PP[36] =
    new Scene({
        text: `
            Проводник стал еще отстраненнее. Из-за капюшона я могла лишь мельком догадываться о его эмоциях. 
            <p>- Эта богиня римского пантеона. 
            `,
        background: "Persons/Stranger",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[37].begin(); Game.message('Пантеон - группа богов, принадлежащих к одной религии или мифологии.') }],
    });

Game.Scenes.PP[37] =
    new Scene({
        text: `
            - Но что божество делало среди людей? 
            <p>- Я покажу тебе в следующий раз. 
            `,
        background: "Persons/Stranger",
        buttonactive: [true, true, true, false],
        buttontext: [
            'Что это за эпоха?',
            'Почему пошёл кровавый дождь?',
            'Кто эта девушка?',
            'Закончить диалог',
        ],
        buttonaction: [
            () => { Game.Scenes.PP[32].begin(); Game.Scenes.PP[33].deactivate(0); Game.Scenes.PP[35].deactivate(0); Game.Scenes.PP[37].deactivate(0); },
            () => { Game.Scenes.PP[34].begin(); Game.Scenes.PP[33].deactivate(1); Game.Scenes.PP[35].deactivate(1); Game.Scenes.PP[37].deactivate(1); },
            () => { Game.Scenes.PP[36].begin(); Game.Scenes.PP[33].deactivate(2); Game.Scenes.PP[35].deactivate(2); Game.Scenes.PP[37].deactivate(2); },
            () => { Game.Scenes.PP[38].begin(); },
        ],
        condition: function () {
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false) {
                this.buttonactive[3] = true;
            }
            else{
              this.buttonactive[3] = false;
            }
        }
    });

Game.Scenes.PP[38] =
    new Scene({
        text: `
            - Тебе пора возвращаться, $Имя Игрока$. 
            <p>- Как скоро мы увидимся вновь? 
            <p>- Это зависит от твоего продвижения и, - он немного помедлил, - от твоих выборов. 
            `,
        background: "Persons/Stranger",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PP[39].begin(); }],
    });

Game.Scenes.PP[39] =
    new Scene({
        text: `
            - Подожди, - я хотела узнать больше об эпохе Теслы. - Почему именно Никола? Что я должна сделать? И почему на меня нападают какие-то монстры? 
            <p>- В прошлом есть много твоих соратников. Они помогут тебе узнать правду и докопаться до истины. Но запомни одно. Есть и те, кто преследует исключительно свои цели. Будь осторожна с теми, кому хочешь довериться. 
            <p>Мужчина подошел ко мне, слегка прикоснулся к моему лбу и я увидела уже привычную мне темноту. 
            `,
        background: "Persons/Stranger",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[0].begin(); Game.Effects.Flash(); }],
    });
Game.Scenes.PN = [];

Game.Scenes.PN[0] =
    new Scene({
        text: `
            Я чувствовала себя разбито и подавлено, поэтому проснулась уже после обеда. Несмотря на то, что прошло всего несколько дней с начала учебы, у меня было ощущение непомерной усталости.
            `,
        background: "Backgrounds/Room",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[1].begin(); }],
        condition: () => { Game.Sounds.play('Music', 'FirstChapter'); }
    });

Game.Scenes.PN[1] =
    new Scene({
        text: `
            События развивались слишком стремительно и еще много всего предстояло понять. Раз уж выдалось свободное время, мне хотелось отдохнуть. С другой же стороны, появилась возможность немного поработать удаленно. Деньги никогда не будут лишними. 
            `,
        buttontext: [
            'Занялась своими делами',
            'Я начала работать',
        ],
        buttonaction: [
            () => { Game.Scenes.PN[2].begin(); },
            () => { Game.Scenes.PN[7].begin(); Game.message('Вы заработали деньги! (150)'); Game.Stats.Money.add(150) },
        ],
    });

Game.Scenes.PN[2] =
    new Scene({
        text: `
            Сегодня действительно был подходящий день, чтобы уделить время себе. Я лениво потянулась, сходила на кухню и взяла с собой в комнату несколько вкусняшек. И:
            `,
        background: "Backgrounds/Room",
        buttontext: [
            'Занялась рисованием',
            'Поиграла в любимую новеллу',
            'Поиграла в компьютерную игру',
            'Почитала книгу',
        ],
        buttonaction: [
            () => { Game.Scenes.PN[3].begin(); },
            () => { Game.Scenes.PN[4].begin(); },
            () => { Game.Scenes.PN[5].begin(); },
            () => { Game.Scenes.PN[6].begin(); },],
    });

Game.Scenes.PN[3] =
    new Scene({
        text: `
            Ничто так не успокаивало, как отдаться вдохновению и набросать что-нибудь карандашом в альбоме. Я не училась профессиональному рисованию, мне просто нравилось включать себе легкую музыку и воплощать на бумаге появляющиеся в голове образы. 
            `,
        background: "Backgrounds/Room",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[8].begin(); }],
    });

Game.Scenes.PN[4] =
    new Scene({
        text: `
            Удобно устроившись на кровати, я запустила мобильное приложение. История повествовала о древней Японии и отважной девушке - гейше, которая через сложные испытания, смогла найти свое место в мире и обрести любовь. 
            <p>Я получила удовольствие от игры и задумалась о своем положение. Моя спокойная жизнь меняется, я чувствую себя главной героиней, но только своей истории. Но так ли это все радужно? 
            `,
        background: "Backgrounds/Room",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[8].begin(); }],
    });

Game.Scenes.PN[5] =
    new Scene({
        text: `
            Я села за стол и включила компьютер. Мне хотелось отвлечься от всего и погрузиться в другой мир, как бы  иронично это не звучало. 
            <p>Сюжет игры повествовал об охотнике на чудовищ, который через политические войны, бесконечные поиски и множество опасностей - смог обрести свое заветное спокойствие. 
            `,
        background: "Backgrounds/Room",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[8].begin(); }],
    });

Game.Scenes.PN[6] =
    new Scene({
        text: `
            Я открыла начатую ранее книжку про постапокалипсис. Сюжет повествовал про отца и сына, которым приходится покинуть свой дом в поисках безопасного места. Во время путешествия они пытаются выжить в суровом новом мире. 
            <p>История наполнена философскими мыслями, а слог автора краток и история не забита лишней “водой”.
            `,
        background: "Backgrounds/Room",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[8].begin(); }],
    });

Game.Scenes.PN[7] =
    new Scene({
        text: `
            Несмотря на свое самочувствие, я все же решила пересилить себя и поработать. В конце концов мне надо было продолжать зарабатывать на самостоятельную жизнь. 
            <p>Я села за компьютер, открыла сайт для фрилансеров, которые выполняют школьные задания на заказ и написала несколько сочинений. 
            `,
        background: "Backgrounds/Room",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[8].begin(); }],
    });

Game.Scenes.PN[8] =
    new Scene({
        text: `
            Так прошло несколько дней. Мне становилось гораздо лучше. Никаких перемещений, никаких загадок от проводника. Обычные дни, по которым я, наверно, скучала. 
            <p>Но с другой стороны, во мне играло безмерное любопытство. Неужели я действительно смогу сделать что-то великое? А смогу ли? 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[10].begin(); }],
    });

Game.Scenes.PN[10] =
    new Scene({
        text: `
            Терзающие меня вопросы не давали крепко спать. В какой-то момент мне даже начало казаться, что стоит закрыть глаза и я исчезну. Затеряюсь в этих непонятных эпохах и никогда больше не увижу свою реальность. 
            <p>К счастью, все было тихо и спокойно. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[11].begin(); }],
    });

Game.Scenes.PN[11] =
    new Scene({
        text: `
            Ближе к вечеру родители сказали, что хотят сходить в кино и попросили меня беречь дом. Я не поняла к чему была сказана последняя фраза, но не придала этому большого значения. 
            `,
        background: "Backgrounds/Kitchen",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[12].begin(); }],
    });

Game.Scenes.PN[12] =
    new Scene({
        text: `
            Когда мама с папой ушли, я решила помыть посуду. Мама, конечно, переживает за мое состояние, но я думаю, что уже достаточно окрепла для выполнения простых  домашних дел. 
            <p>Неожиданно раздался звонок в дверь.
            `,
        background: "Backgrounds/Kitchen",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[13].begin(); }],
    });

Game.Scenes.PN[13] =
    new Scene({
        text: `
            “Наверное родители забыли что-то.”
            <p>Я открыла входную дверь и очень сильно удивилась. На пороге стояли Леон и Скарлетт с набитыми пакетами.        
            <p>- Ну, привет! - Леон обнял меня, похлопав по спине. - Как ты себя чувствуешь? Мы давно тебя не видели…     
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[14].begin(); }],
    });

Game.Scenes.PN[14] =
    new Scene({
        text: `
            - Вот-вот, - Скарлетт занесла несколько пакетов внутрь. - А если ты никуда не ходишь, значит, мы придем к тебе. 
            <p>- Ребята… - это искренне растрогало меня. Я так и стояла около двери, пока Леон не потянул меня за руки в сторону кухни. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[15].begin(); }],
    });

Game.Scenes.PN[15] =
    new Scene({
        text: `
            Затем он сказал:
            <p>- Тут немного алкоголя, - парень хитро улыбнулся, - а ты организуй нам что-нибудь поесть.  
            <p>- Как же хорошо, что завтра выходные, - Скарлетт плюхнулась на диван и открыла банку пива.  
            `,
        background: "Backgrounds/Kitchen",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[16].begin(); }],
    });

Game.Scenes.PN[16] =
    new Scene({
        text: `
            Атмосфера была похожа на ту, что была раньше. Когда мы чаще проводили время вместе. Я очень оценила их поддержку и эту спонтанную встречу. 
            <p>Встречая ребят, я обратила внимание на дом Шерил, в ее комнате горел свет.            
            <p>“Интересно, как она там… Может стоит пригласить ее к нам?”.            
            <p>Я:     
            `,
        background: "Backgrounds/Kitchen",
        buttontext: [
            'Позвала Шерил',
            'Продолжала общаться с друзьями'
        ],
        buttonaction: [
            () => { Game.Scenes.PN[17].begin(); Game.Stats.InvitedCheryl.add(1); },
            () => { Game.Scenes.PN[19].begin(); },
        ],
    });

Game.Scenes.PN[17] =
    new Scene({
        text: `
            Уверена, Шерил обрадуется такому развитию событий. Я обратилась к друзьям: 
            <p>- Вы не против, если я позову соседку, которая живет рядом?
            <p>- Ты про Шерил? Хоть мы и редко видимся с ней, но надеюсь наша вечеринка и ей поднимет настроение, - сказала Скарлетт, искренне улыбаясь. 
            `,
        background: "Persons/Scarlett",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[18].begin(); }],
    });

Game.Scenes.PN[18] =
    new Scene({
        text: `
            - Конечно не против, чем больше народу, тем веселее, - Леон доставал несколько бутылок из пакета. 
            <p>Я набрала Шерил и через несколько минут, она уже стояла с нами на кухне и светилась от счастья.        
            `,
        background: "Persons/Leon",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[20].begin(); }],
    });

Game.Scenes.PN[19] =
    new Scene({
        text: `
            Я решила не беспокоить Шерил. К тому же недавно она говорила, что хотела больше времени посвятить учебе и разгрести долги. 
            <p>Я смотрела на Леона, который в это время ставил несколько бутылок спиртного на стол, и Скарлетт, мило устроившуюся на диване, поджав ноги под себя. Мне хотелось сосредоточиться на вечере с ними и забыть обо всех проблемах. 
            `,
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[20].begin(); }],
    });

Game.Scenes.PN[20] =
    new Scene({
        text: `
            Я решила заняться вопросом еды. 
            <p>“Побаловать ребят чем-нибудь вкусненьким и заказать еду? Деньги вроде бы есть… Или ограничимся бутербродами?”            
            `,
        background: "Backgrounds/Kitchen",
        buttontext: [
            'Заказать роллы (200)',
            'Заказать пиццу (150)',
            'Сделать бутерброды',],
        buttonaction: [
            () => { Game.Scenes.PN[21].begin(); Game.Stats.Money.add(-200); Game.message('Вы потратили деньги (200)'); Game.Achievements.Sushi.unlock(); },
            () => { Game.Scenes.PN[26].begin(); Game.Stats.Money.add(-150); Game.message('Вы потратили деньги (150)') },
            () => { Game.Scenes.PN[31].begin(); },
        ],
    });

Game.Scenes.PN[21] =
    new Scene({
        text: `
            Все же я давно не ела блюда азиатской кухни, поэтому заказала несколько наборов. 
            `,
        background: "Backgrounds/Kitchen",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[23].begin(); }],
        condition: function () {
            if (Game.Stats.InvitedCheryl.get >= 1) {
                this.buttonaction[0] = () => {
                    Game.Scenes.PN[22].begin();
                }
            }
        }
    });

Game.Scenes.PN[22] =
    new Scene({
        text: `
            Шерил сидела тихонько и смущалась. 
            Несмотря на царящее вокруг веселье, она довольно долго привыкала к людям. Конечно, ей и раньше приходилось видеть моих студенческих друзей, однако они особо не общались. 
            <p>Но все же она выглядела счастливой и сытой. В руке красовался бокал с коктейлем, а лицо выражало умиротворение и спокойствие.
            `,
        background: "Persons/Cheryl",
        buttontext: [''],
        buttonaction: [() => {
            Game.Scenes.PN[24].begin();
            Game.message('Ваши друзья обрадовались вкусной еде!');
            Game.Stats.Leon.add(1);
            Game.Stats.Scarlett.add(1);
            Game.Stats.Cheryl.add(1);
        }],
    });

Game.Scenes.PN[23] =
    new Scene({
        text: `
            Леон и Скарлетт одобрили мой выбор. Они с удовольствием накинулись на еду, попутно благодаря меня за такой прекрасный ужин.
            `,
        background: "Backgrounds/Kitchen",
        buttontext: [''],
        buttonaction: [() => {
            Game.Scenes.PN[24].begin();
            Game.message('Ваши друзья обрадовались вкусной еде!');
            Game.Stats.Leon.add(1);
            Game.Stats.Scarlett.add(1);
            Game.Stats.Cheryl.add(1);
        }],
    });

Game.Scenes.PN[24] =
    new Scene({
        text: `
            Я попыталась взять ролл палочками, но мои попытки были тщетны. В отчаянии я потянулась за вилкой, но меня остановил Леон. 
            <p>- За 22 года ты до сих пор не научилась есть суши, неумеха? Давай покажу.            
            <p>Он подошел сзади и взял мои руки в свои. Аккуратно начал расставлять мои пальцы, чтобы я правильно держала палочки, попутно объясняя, что это целое искусство.           
            `,
        background: "Persons/Leon",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[25].begin(); }],
    });

Game.Scenes.PN[25] =
    new Scene({
        text: `
            Меня бросило в жар, когда я почувствовала его дыхание на своей шее. Тем не менее с его поддержкой, трясущимися руками, у меня получилось схватить ролл. 
            <p>- Рыцарь, как всегда, подоспел вовремя, да? - отшутилась я, чтобы скрыть смущение.            
            <p>Мы улыбнулись и продолжили вечеринку.            
            `,
        background: "Persons/Leon",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[35].begin(); }],
    });

Game.Scenes.PN[26] =
    new Scene({
        text: `
            Сейчас мне очень хотелось горячую пиццу с тянущимся сыром, колбасками... 
            <p>Ребята с удовольствием накинулись на угощения, между делом благодаря меня за прекрасный ужин.
            `,
        background: "Backgrounds/Kitchen",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[27].begin(); }],
        condition: function () {
            if (Game.Stats.InvitedCheryl.get >= 1) {
                this.buttonaction[0] = () => {
                    Game.Scenes.PN[28].begin();
                }
            }
        }
    });

Game.Scenes.PN[28] =
    new Scene({
        text: `
            Шерил сидела тихонько и смущалась. 
            Несмотря на царящее вокруг веселье, она довольно долго привыкала к людям. Конечно, ей и раньше приходилось видеть моих студенческих друзей, однако они особо не общались. 
            <p>Но все же она выглядела счастливой и сытой. В руке красовался бокал с коктейлем, а лицо выражало умиротворение и спокойствие.
            `,
        background: "Persons/Cheryl",
        buttontext: [''],
        buttonaction: [() => {
            Game.Scenes.PN[29].begin();
            Game.message('Ваши друзья обрадовались вкусной еде!');
            Game.Stats.Leon.add(1);
            Game.Stats.Scarlett.add(1);
            Game.Stats.Cheryl.add(1);
        }],
    });

Game.Scenes.PN[27] =
    new Scene({
        text: `
            Леон и Скарлетт одобрили мой выбор. Они с удовольствием накинулись на еду, попутно благодаря меня за такой прекрасный ужин.
            `,
        background: "Backgrounds/Kitchen",
        buttontext: [''],
        buttonaction: [() => {
            Game.Scenes.PN[29].begin();
            Game.message('Ваши друзья обрадовались вкусной еде!');
            Game.Stats.Leon.add(1);
            Game.Stats.Scarlett.add(1);
            Game.Stats.Cheryl.add(1);
        }],
    });

Game.Scenes.PN[29] =
    new Scene({
        text: `
            Во время трапезы Скарлетт взяла нож и вилку, чтобы нарезать кусок пиццы. Леон не смог на это смотреть, отвернулся и проговорил: 
            <p>- Скарлетт, ты уничтожаешь во мне внутреннего итальянца… Кто ж так делает? 
            `,
        background: "Persons/Scarlett",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[30].begin(); }],
    });

Game.Scenes.PN[30] =
    new Scene({
        text: `
            - Какой из тебя итальянец, не смеши, - девушка демонстративно начала орудовать приборами. - Зато я не испачкаюсь, в отличии от некоторых. 
            <p>- $Имя Игрока$, сделай с этим что-нибудь!
            <p>Мне было очень весело наблюдать за ними. 
            `,
        background: "Persons/Scarlett",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[35].begin(); }],
    });

Game.Scenes.PN[31] =
    new Scene({
        text: `
            Я решила не тратить лишние деньги и сделала бутерброды из того, что нашла в холодильнике. 
            Все-таки лучше стараться экономить, где это возможно. Ребята были рады любой закуске, тем более, получалось у меня довольно неплохо. 
            `,
        background: "",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[34].begin(); }],
    });

Game.Scenes.PN[32] =
    new Scene({
        text: `
            Шерил сидела тихонько и смущалась. 
            Несмотря на царящее вокруг веселье, она довольно долго привыкала к людям. Конечно, ей и раньше приходилось видеть моих студенческих друзей, однако они особо не общались. 
            <p>Но все же она выглядела счастливой и сытой. В руке красовался бокал с коктейлем, а лицо выражало умиротворение и спокойствие.
            `,
        background: "Persons/Cheryl",
        buttontext: [''],
        buttonaction: [() => {
            Game.Scenes.PN[34].begin();
            Game.message('Ваши друзья обрадовались вкусной еде!');
            Game.Stats.Leon.add(1);
            Game.Stats.Scarlett.add(1);
            Game.Stats.Cheryl.add(1);
        }],
    });

Game.Scenes.PN[33] =
    new Scene({
        text: `
            Леон и Скарлетт одобрили мой выбор. Они с удовольствием накинулись на еду, попутно благодаря меня за такой прекрасный ужин.
            `,
        background: "Backgrounds/Kitchen",
        buttontext: [''],
        buttonaction: [() => {
            Game.Scenes.PN[34].begin();
            Game.message('Ваши друзья обрадовались вкусной еде!');
            Game.Stats.Leon.add(1);
            Game.Stats.Scarlett.add(1);
            Game.Stats.Cheryl.add(1);
        }],
    });

Game.Scenes.PN[34] =
    new Scene({
        text: `
            Леон и Скарлетт попросили меня достать что-нибудь сладенькое к нашему небольшому пиршеству. На наше счастье, у меня было припасено шоколадное печенье. Я принесла закуску и мы продолжили общаться.
            `,
        background: "",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[35].begin(); }],
      condition: function () {
        if (Game.Stats.InvitedCheryl.get>=1){
          this.text = 'Леон и Скарлетт попросили меня достать что-нибудь сладенькое к нашему небольшому пиршеству. На наше счастье, у меня было припасено шоколадное печенье. Я принесла закуску и мы продолжили общаться.<p>Шерил сидела тихонько и смущалась. Несмотря на царящее вокруг веселье, она довольно долго привыкала к людям. Конечно, ей и раньше приходилось видеть моих студенческих друзей, однако они особо не общались. <p> Но все же она выглядела счастливой и сытой. В руке красовался бокал с коктейлем, а лицо выражало умиротворение и спокойствие.';
        }
        else{
          this.text = 'Леон и Скарлетт попросили меня достать что-нибудь сладенькое к нашему небольшому пиршеству. На наше счастье, у меня было припасено шоколадное печенье. Я принесла закуску и мы продолжили общаться.';
        }

      }
    });

Game.Scenes.PN[35] =
    new Scene({
        text: `
            - Спасибо вам огромное за то, что пришли меня поддержать! Жаль у нас не так много времени… Хотя после того, как вернутся родители, мы могли бы пойти в какой-нибудь бар или еще чего. 
            <p>- Совсем забыли тебе сказать, - проговорила Скарлетт. - Мы попросили твоего отца придумать какую-нибудь байку, чтобы устроить тебе сюрприз. Поэтому они сегодня не вернутся и вся ночь наша!
            `,
        background: "Persons/Scarlett",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[36].begin(); }],
    });

Game.Scenes.PN[36] =
    new Scene({
        text: `
            - Да вы сумасшедшие! - я не смогла сдержать эмоций и тепло обняла каждого в этой комнате. 
            <p>- Так, что, - Леон поставил несколько бутылок крепкого на стол. - Разгон кончился, пора начать настоящую движуху! 
            <p>Я: 

            `,
        background: "Persons/Leon",
        buttontext: ['Выпила алкоголь', 'Ограничилась соком'],
        buttonaction: [
            () => { Game.Scenes.PN[37].begin(); Game.Sounds.play('Music', 'Disco'); Game.Stats.DrinkAtParty.add(1); },
            () => { Game.Scenes.PN[38].begin(); Game.Sounds.play('Music', 'Disco'); Game.Stats.DrinkAtParty.add(0);},],
    });

Game.Scenes.PN[37] =
    new Scene({
        text: `
            Мы выпили несколько рюмок. Алкоголь расслаблял, становилось веселее и задорнее. Кто-то из ребят включил драйвовую музыку и все начали танцевать.
            `,
        background: "",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[39].begin(); }],
        condition: function () {
            if (Game.Stats.InvitedCheryl.get >= 1) {
                this.buttonaction[0] = () => { Game.Scenes.PN[45].begin(); };
            }
        }
    });

Game.Scenes.PN[38] =
    new Scene({
        text: `
            Пить алкоголь не хотелось. И без него было весело и хорошо. Я пила яблочный сок, мы включили драйвовую музыку и начали танцевать.
            `,
        background: "",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[39].begin(); }],
        condition: function () {
            if (Game.Stats.InvitedCheryl >= 1) {
                this.buttonaction[0] = () => { Game.Scenes.PN[45].begin(); };
            }
        }
    });

Game.Scenes.PN[39] =
    new Scene({
        text: `
            Леон и Скарлетт чувствовали себя прекрасно. Они с задором веселились, включали любимые треки и отрывались по полной. Мне же оставалось просто не отставать от них. 
            <p>Чтобы немного передохнуть от танцев, мы решили поиграть в “Угадай мелодию”, где неожиданно для всех победил Леон. Он оказался тем еще меломаном и утер нос всем присутствующим. 
            `,
        background: "Persons/Scarlett",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[40].begin(); }],
    });

Game.Scenes.PN[40] =
    new Scene({
        text: `
            Парень продолжал нас радовать своими навыками бармена, делая из того, что у нас было, потрясающие и вкусные коктейли. 
            <p>- Леон, существует такое дело, которое тебе не дается идеально? - спросила я, подходя к нему за очередный напитком. 
            <p>- О, да, я не очень хорош в семейных делах, - с иронией проговорил парень. 
            `,
        background: "Persons/Leon",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[41].begin(); }],
    });

Game.Scenes.PN[41] =
    new Scene({
        text: `
            - Ладно тебе, все у вас с профессором наладится. Бывают же как и черные, так и белые полосы. 
            <p>Вмешалась Скарлетт, которая сказала: 
            <p>- Отставить! Мы собрались не для того, чтобы грустить. Лучше поглядите, что я скачала. 
            `,
        background: "",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[42].begin(); }],
    });

Game.Scenes.PN[42] =
    new Scene({
        text: `
            Эта была игра, где надо было повторять движения за персонажем на экране, держа телефон в руках. Мы вывели изображение на телевизор и решили устроить небольшой турнир. 
            <p>Первая парой были Леон и Скар. Они танцевали наравне, пока в конце, парень не оступился, немного не рассчитав движения. Тем самым он отдал победу Скарлетт, которая восторженно проговорила:
            `,
        background: "Backgrounds/Disco",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[43].begin(); }],
    });

Game.Scenes.PN[43] =
    new Scene({
        text: `
            - Ничего, в следующий раз я разрешу тебе отыграться,- ухмыльнулась девушка. 
            <p>- Ого, - Леон хлопал в ладоши. - $Имя Игрока$ и Скар, даже не знаю, кто круче…
            <p>Я встала рядом с девушкой, готовясь к финальной битве. Заиграла мелодия и я увидела первые движения: <i>вверх, вниз, вверх, влево. </i>
            `,
        background: "Backgrounds/Disco",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[50].begin(); }],
    });

Game.Scenes.PN[45] =
    new Scene({
        text: `
            Шерил, Леон и Скарлетт чувствовали себя прекрасно. Они веселились, включали любимые треки и отрывались по полной. Мне же оставалось просто не отставать от них. 
            <p>Чтобы немного передохнуть от танцев, мы решили поиграть в “Угадай мелодию”, где неожиданно для всех победила Шерил. Она оказалась тем еще меломаном и утерла нос всем присутствующим. 
            `,
        background: "Persons/Cheryl",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[46].begin(); }],
    });

Game.Scenes.PN[46] =
    new Scene({
        text: `
            Леон продолжал нас радовать своими навыками бармена, делая из того, что у нас было, потрясающие и вкусные коктейли. 
            <p>- Леон, существует такое дело, которое тебе не дается идеально? - спросила я, подходя к нему за очередным напитком. 
            <p>- О, да, я не очень хорош в семейных делах, - с иронией проговорил парень. 
            `,
        background: "Persons/Leon",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[47].begin(); }],
    });

Game.Scenes.PN[47] =
    new Scene({
        text: `
            - Ладно тебе, все у вас с профессором наладится. Бывают же как и черные, так и белые полосы. 
            <p>В разговор вмешалась Шерил. 
            <p>- Ты еще не знаешь, что значат реальные семейные проблемы. 
            <p>Леон хотел было что-то уточнить, но вмешалась Скарлетт, которая сказала: 
            <p>- Отставить! Мы собрались не для того, чтобы грустить. Лучше поглядите, что я скачала. 
            `,
        background: "Persons/Leon",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[48].begin(); }],
    });

Game.Scenes.PN[48] =
    new Scene({
        text: `
            Эта была игра, где надо было повторять движения за персонажем на экране, держа телефон в руках. Мы вывели изображение на телевизор и решили устроить небольшой турнир. 
            <p>Первая парой были Леон и Скар. Они танцевали наравне, пока в конце, парень не оступился, немного не рассчитав движения. Тем самым он отдал победу Скарлетт, которая восторженно проговорила:
            `,
        background: "Backgrounds/Disco",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[49].begin(); Game.Effects.Disco(); }],
    });

Game.Scenes.PN[49] =
    new Scene({
        text: `
            - Ничего, в следующий раз я разрешу тебе отыграться, - ухмыльнулась девушка.
            <p>Мы с Шерил довольно быстро закончили. Подруга была не особо пластичной, поэтому победа досталась мне легко. 
            <p>- Ого, - Леон хлопал в ладоши. - $Имя Игрока$ и Скар, даже не знаю, кто круче…
            <p>Я встала рядом с девушкой, готовясь к финальной битве. Заиграла мелодия и я увидела первые движения: <p color="red">вверх, вниз, вверх, влево. 
            `,
        background: "Backgrounds/Disco",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[50].begin(); Game.Effects.Disco(); }],
    });

Game.Scenes.PN[50] =
    new Scene({
        text: `
            В голову сразу пришла очевидная мысль: 
            <p>“Мне нельзя ошибаться, Скарлетт слишком хороша в этой игре. Надо собраться.” 
            `,
        background: "Backgrounds/Disco",
        buttontext: [
            'Влево',
            'Вверх',
            'Вниз',
        ],
        buttonaction: [
            () => { Game.Scenes.PN[55].begin(); Game.Timer.stop(); },
            () => { Game.Scenes.PN[51].begin(); Game.Effects.Disco(); },
            () => { Game.Scenes.PN[55].begin(); Game.Timer.stop(); },
        ],
        condition: function () {
            Game.Timer.set(9, () => {
                Game.Scenes.PN[55].begin();
            })
        }
    });

Game.Scenes.PN[51] =
    new Scene({
        text: `
            Я подняла руки, следуя за движениями модельки. Меня ждал успех, но Скарлетт не собиралась сдаваться. Мне еще предстояло выбрать правильное движение дальше.
            `,
        background: "Backgrounds/Disco",
        buttontext: [
            'Влево',
            'Вверх',
            'Вниз',
        ],
        buttonaction: [
            () => { Game.Scenes.PN[55].begin(); Game.Timer.stop(); },
            () => { Game.Scenes.PN[55].begin(); Game.Timer.stop(); },
            () => { Game.Scenes.PN[52].begin(); Game.Effects.Disco(); },
        ],
        condition: function () {
            Game.Timer.set(8, () => {
                Game.Scenes.PN[55].begin();
            })
        }
    });

Game.Scenes.PN[52] =
    new Scene({
        text: `
            Я тотчас присела и выполнила правильную комбинацию движений. Скарлетт замешкалась, а вероятность моей победы все возрастала. 
            `,
        background: "Backgrounds/Disco",
        buttontext: [
            'Влево',
            'Вверх',
            'Вниз'
        ],
        buttonaction: [
            () => { Game.Scenes.PN[55].begin(); Game.Timer.stop(); },
            () => { Game.Scenes.PN[54].begin(); Game.Effects.Disco(); },
            () => { Game.Scenes.PN[55].begin(); Game.Timer.stop(); },
        ],
        condition: function () {
            Game.Timer.set(7, () => {
                Game.Scenes.PN[55].begin();
            })
        }
    });

Game.Scenes.PN[54] =
    new Scene({
        text: `
            Я подпрыгнула и водила сверху руками, делая круговые движение. Мне оставался последний рывок до заветной победы. 
            `,
        background: "Backgrounds/Disco",
        buttontext: [
            'Влево',
            'Вверх',
            'Вниз'
        ],
        buttonaction: [
            () => { Game.Scenes.PN[57].begin(); Game.Timer.stop(); Game.Effects.Disco(); Game.Achievements.DanceQueen.unlock(); },
            () => { Game.Scenes.PN[55].begin(); Game.Timer.stop(); },
            () => { Game.Scenes.PN[55].begin(); Game.Timer.stop(); },
        ],
        condition: function () {
            Game.Timer.set(6, () => {
                Game.Scenes.PN[55].begin();
            })
        }
    });

Game.Scenes.PN[55] =
    new Scene({
        text: `
            Это было ошибкой, неуверенное движение руками стоило мне нескольких очков, благодаря чему впоследствии Скарлетт вырвалась вперед и выиграла меня. 
            `,
        background: "Backgrounds/Disco",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[56].begin(); }],
        condition: function () {
            Game.Effects.Disco();
        }
    });

Game.Scenes.PN[56] =
    new Scene({
        text: `
            - Не расстраивайся, $Имя Игрока$, в следующий раз будет лучше, - Скарлетт победоносно улыбалась.
            <p>Остальные похлопали нам и поблагодарили за интересную битву. 
            `,
        background: "Persons/Scarlett",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[58].begin(); Game.Effects.Disco.Stop(); }],
    });

Game.Scenes.PN[57] =
    new Scene({
        text: `
            Я наклонилась максимально влево, совершая полный оборот верхней части туловища. 
            <p>Мои усилия привели к победе. Я радостно вскрикнула и обняла подругу. 
            <p>- Это было круто, - говорила Скарлетт, пытаясь отдышаться. - Наконец-то достойный соперник! 
            <p>Ребята принялись поздравлять меня. 
            `,
        background: "Backgrounds/Disco",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[58].begin(); Game.Effects.Disco.Stop(); }],
        condition: function () {
            Game.message("Отношения со Скарлетт и Леоном улучшились");
            Game.Stats.Leon.add(1);
            Game.Stats.Scarlett.add(1);
            Game.Sounds.Cheers.play();
        }
    });

Game.Scenes.PN[58] =
    new Scene({
        text: `
            Через несколько часов безудержного веселья, мы решили передохнуть и прийти в себя. Ребята решили побыть наедине с собой и привести мысли в порядок.
            Леон вышел на улицу, чтобы подышать свежим воздухом. Скарлетт устроилась на диване, включив телевизор, где шел какой-то романтический сериал.
            `,
        background: "",
        buttontext: [
            'Леоном',
            'Скарлетт',
            'Шерил'
        ],
        buttonactive: [true, true, false],
        buttonaction: [
            () => { Game.Scenes.PN[59].begin(); },
            () => { Game.Scenes.PN[68].begin(); },
            () => { Game.Scenes.PN[75].begin(); },],
        condition: function () {
            if (Game.Stats.InvitedCheryl.get >= 1) {
              this.text = 'Через несколько часов безудержного веселья, мы решили передохнуть и прийти в себя. Ребята решили побыть наедине с собой и привести мысли в порядок. Леон вышел на улицу, чтобы подышать свежим воздухом. Скарлетт устроилась на диване, включив телевизор, где шел какой-то романтический сериал.' +
                ' Шерил выразила желание помыть посуду и поэтому осталась на кухне. <p>Остаток вечера мне хотелось побыть с:';
                this.buttonactive[2] = true;
            }
            else{
              this.text = 'Через несколько часов безудержного веселья, мы решили передохнуть и прийти в себя. Ребята решили побыть наедине с собой и привести мысли в порядок. Леон вышел на улицу, чтобы подышать свежим воздухом. Скарлетт устроилась на диване, включив телевизор, где шел какой-то романтический сериал.' + '<p>Остаток вечера мне хотелось побыть с:';
            }

        }
    });

Game.Scenes.PN[59] =
    new Scene({
        text: `
            Я вышла на улицу, где меня тут же обдало прохладным воздухом. Леон стоял недалеко от крыльца с задумчивым видом и сигаретой в руках. Он поглядывал на звезды, а увидев меня, тут же подошел и сказал:
            <p>- Холодно, может, накинешь что-нибудь, $Имя Игрока$?
            <p>- Все в порядке, не простужусь, - я поежилась и продолжила. - Ты как? Под конец вечера твои мысли были совсем не здесь.
            `,
        background: "Persons/Leon",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[60].begin(); }],
        condition: function () { Game.Sounds.play('Music','Leon')}
    });

Game.Scenes.PN[60] =
    new Scene({
        text: `
            - Знаю я твое “в порядке”, держи.  
            <p>Леон снял свою кожаную куртку и накинул мне на плечи. Я немного смутилась, однако спорить не стала и с благодарностью приняла его заботу. 
            <p>Он продолжил: 
            <p>- Да, как-то накатило немного… Будешь? - он протянул мне сигарету. 
            `,
        background: "Persons/Leon",
        buttontext: ['Взять', 'Не брать сигарету'],
        buttonaction: [
            () => { Game.Scenes.PN[61].begin(); },
            () => { Game.Scenes.PN[62].begin(); },
        ],
    });

Game.Scenes.PN[61] =
    new Scene({
        text: `
            Да, спасибо.
            <p>Я сделала несколько затяжек. Благодаря этому мне стало гораздо легче. 
            <p>- Я как самый настоящий демон, прям каждый раз соблазняю тебя на курение. 
            <p>- Ладно тебе, мне же не 5 лет.
            <p>- Ну-ну…
            <p>Мы немного постояли. Молча, думая о своем. Пока Леон не сказал: 
            `,
        background: "Persons/Leon",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[63].begin(); }],
    });

Game.Scenes.PN[62] =
    new Scene({
        text: `
            - Нет, спасибо! 
            <p>Я наблюдала за тем, как Леон медленно вдыхал и выдыхал сигаретный дым, про себя думая, что мне и без сигарет нормально живется. 
            <p>“Может, моя зависимость проходит?” 
            <p>Мы немного постояли. Молча, думая о своем. Пока Леон не сказал:
            `,
        background: "Persons/Leon",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[63].begin(); }],
    });

Game.Scenes.PN[63] =
    new Scene({
        text: `
            - Я много выпил, а опьянеть почти не удалось, что со мной не так? 
            <p>- Все так, даже лучше, ты по праву заслужил почетный статус алкоголика! 
            <p>- Не смешно, - Леон сделал моську обиженного кота, но увидев, как искренне я смеюсь - смягчился. - Я смотрю, вечеринка тебе понравилась? Полегчало?
            `,
        background: "Persons/Leon",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[263].begin(); }],
    });

Game.Scenes.PN[263] =
    new Scene({
        text: `
            - Определенно. Мы будто бы вернулись на три года назад, тебе так не показалось? 
            <p>- Показалось, - парень подошел ко мне поближе. - Я сейчас хочу сделать кое-что довольно глупое, но на это определенно стоило решиться ещё тогда.
            <p>- Леон, что…
            `,
        background: "Persons/Leon",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[64].begin(); }],
    });

Game.Scenes.PN[64] =
    new Scene({
        text: `
            Парень внимательно посмотрел на меня, а затем резко обнял, прервав мои попытки задать вопрос.
            <p>Я: 
            `,
        background: "Persons/Leon",
        buttontext: [
            'Приняла эти объятия',
            'Отстранилась',
        ],
        buttonaction: [
            () => { Game.Scenes.PN[65].begin(); Game.Stats.Leon.add(1); Game.Stats.HugLeon.add(1) },
            () => { Game.Scenes.PN[67].begin(); }
        ],
    });

Game.Scenes.PN[65] =
    new Scene({
        text: `
            Было так тепло и уютно, будто бы мы нагоняли объятия за все пропущенные годы. Я положила голову ему на грудь, вслушиваясь в томное дыхание, учащенное сердцебиение. Леон нежно поглаживал меня по спине и волосам, словно говоря: “я здесь, я рядом, все хорошо”. 
            <p>Мы стояли так несколько минут, просто наслаждаясь ночной тишиной и друг другом. 
            `,
        background: "Persons/Leon",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[66].begin(); }],
    });

Game.Scenes.PN[66] =
    new Scene({
        text: `
            Леон немного отстранившись, но не распуская объятий, произнес: 
            <p>- Я действительно рад, что мы возобновили общение. 
            <p>- Возможно, нам стоило сделать это раньше.
            <p>- Согласен. 
            <p>Наконец у нас получилось отпустить друг друга. Мы постояли еще немного под покровом успокаивающего неба. 
            `,
        background: "Persons/Leon",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[83].begin(); Game.message('Связь с Леоном становится крепче') }],
    });

Game.Scenes.PN[67] =
    new Scene({
        text: `
            Я не ожидала такого развития событий и инстинктивно отстранилась. Леон не расстроился и сказал: 
            <p>- Прости… Это все алкоголь. Я просто счастлив, что мы снова вот так вот беззаботно проводим время. 
            <p>- Я тоже, - моя улыбка немного сгладила нарастающее напряжение. 
            <p>Я подождала, пока Леон докурит и мы вместе вернулись обратно в дом. 
            `,
        background: "Persons/Leon",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[83].begin(); }],
    });

Game.Scenes.PN[68] =
    new Scene({
        text: `
            Скарлетт лежала, закрыв глаза рукой. Изредка были слышны всхлипы под сериал, который все еще шел на фоне. Я аккуратно подсела к ней и приобняла. Мне показалось, что это будет наилучшей поддержкой в данный момент. 
            <p>- $Имя Игрока$, я устала… 
            `,
        background: "Persons/Scarlett",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[69].begin(); }],
        condition: function () {Game.Sounds.play('Music','Scarlett')}

    });

Game.Scenes.PN[69] =
    new Scene({
        text: `
            - Что случилось, мы же хорошо проводим время. 
            <p>- Проклятый алкоголь! 
            <p>Она резко встала и направилась в сторону ванной комнаты. 
            <p>Я: 
            `,
        background: "Persons/Scarlett",
        buttontext: [
            'Последовала за ней',
            'Подождала ее в комнате',
        ],
        buttonaction: [
            () => { Game.Scenes.PN[70].begin(); Game.Stats.Scarlett.add(1); Game.Stats.FollowedScarlett.add(1); },
            () => { Game.Scenes.PN[73].begin(); },
        ],
    });

Game.Scenes.PN[70] =
    new Scene({
        text: `
            Мне было невыносимо видеть, как моему близкому другу плохо. Я незамедлительно последовала за ней и нашла её сидящей на холодном полу. 
            <p>Я присела на корточки перед подругой и сказала: 
            <p>- Скар, я беспокоюсь. Ты сама не своя в последнее время. 
            <p>- Я устала, $Имя Игрока$. Устала от постоянной ругани родителей и неуважения к себе. Я как будто бы ничего не значу, как самостоятельная единица в этом мире. А мне ведь далеко не 14… 
            `,
        background: "Persons/Scarlett",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[71].begin(); }],
    });

Game.Scenes.PN[71] =
    new Scene({
        text: `
            Я понимаю, однако тебе никто не мешает, к примеру, съехать от них. Начать свою самостоятельную жизнь. 
            <p>- Было бы славно, - она улыбнулась. - Но с моей нагрузкой - такое вряд ли когда-нибудь произойдет.   
            <p>- Звучит, как отговорка, если честно. 
            `,
        background: "Persons/Scarlett",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[72].begin(); }],
    });

Game.Scenes.PN[72] =
    new Scene({
        text: `
            Она вдруг резко посмотрела на меня. Не знаю, что происходило в ее голове в этот момент, но довольно продолжительное время мы молчали, пока она не проговорила:
            <p>- Давай вернемся. 
            `,
        background: "Persons/Scarlett",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[83].begin(); Game.message('Ваш совет заставил Скарлетт задуматься') }],
    });

Game.Scenes.PN[73] =
    new Scene({
        text: `
            Я решила дать ей время побыть в одиночестве со своими тараканами. Возможно, ей действительно станет лучше. 
            <p>Когда Скарлетт вернулась, она выглядела загруженной и печальной. 
            `,
        background: "Persons/Scarlett",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[74].begin(); }],
    });

Game.Scenes.PN[74] =
    new Scene({
        text: `
            - Все в порядке? 
            <p>- Да, $Имя Игрока$. Я просто устала. 
            <p>Девушка была крайне отстраненной и, казалось, не хотела продолжать дальнейшее общение. 
            `,
        background: "Persons/Scarlett",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[83].begin(); Game.message('Вы не поддержали Скарлетт'); }],
    });

Game.Scenes.PN[75] =
    new Scene({
        text: `
            Я решила помочь Шерил и заодно спросить как обстоят дела дома. Девушка выглядела задумчиво, но при этом с ее лица не сходила улыбка. 
            <p>- Не скучаешь? - я села рядом с ней за кухонный столик. 
            <p>- Что ты… Кажется, мне было мало сегодняшнего вечера. 
            <p>- Мы всегда можем повторить, Шерил. 
            `,
        background: "Persons/Cheryl",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[76].begin(); }],
        condition: function () { Game.Sounds.play('Music', 'Cheryl') }
    });

Game.Scenes.PN[76] =
    new Scene({
        text: `
            - Думаешь? Ощущение такое, что все это мимолетно и никогда больше не произойдёт, - девушка вмиг осушила свой бокал. 
            <p>- Брось, не забивай себе голову. Я никуда не пропадаю, слышишь! Что тебя тревожит? 
            <p>- Ты будешь смеяться, $Имя Игрока$...
            `,
        background: "Persons/Cheryl",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[77].begin(); }],
    });

Game.Scenes.PN[77] =
    new Scene({
        text: `
            Я серьезно на нее посмотрела и еще раз повторила: 
            <p>- Что тебя тревожит? 
            <p>- Не одолжишь мне немного денег? Я обещаю, верну через несколько дней. 
            <p>Я ожидала услышать все, что угодно. Накрутила себе самые ужасные мысли. Из-за этого невольно рассмеялась, чем немного расстроила Шерил. 
            `,
        background: "Persons/Cheryl",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[78].begin(); }],
    });

Game.Scenes.PN[78] =
    new Scene({
        text: `
            - Я же говорила… Все всегда смеются надо мной… 
            <p>- Извини, просто в моей голове всплыли всевозможные дурацкие варианты, а тут… 
            <p>Я: 
            `,
        background: "Persons/Cheryl",
        buttontext: [
            'Одолжила Шерил денег (100)',
            'У меня не нашлось такой суммы',
        ],
        buttonaction: [
            () => { Game.Scenes.PN[79].begin(); },
            () => { Game.Scenes.PN[81].begin(); }],
    });

Game.Scenes.PN[79] =
    new Scene({
        text: `
            - Держи. Ты всегда можешь обратиться ко мне. 
            <p>- Спасибо тебе огромное, - она обняла меня. - Без твоей помощи я бы пропала. 
            <p>- К чему такая срочность? 
            <p>- Отчим попросил меня кое-что купить, а зарплату задерживают. Я не хочу снова выслушивать, какая я плохая и неблагодарная дочь. 
            `,
        background: "Persons/Cheryl",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[80].begin(); }],
    });

Game.Scenes.PN[80] =
    new Scene({
        text: `
            - Но это же ненормально, Шерил! Жить в своем собственном доме в постоянном страхе сделать что-то не так. Мы столько раз это обсуждали. 
            <p>- Мне правда важна твоя поддержка, - девушка улыбалась. - Но и я тебе ни раз говорила, как мне важен этот дом и что никто не посмеет отнять эту драгоценность у меня. 
            <p>“Упрямая, как и всегда.”
            `,
        background: "Persons/Cheryl",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[83].begin(); Game.message('Шерил знает, что нас вас можно положиться'); Game.Stats.Cheryl.add(1) }],
    });

Game.Scenes.PN[81] =
    new Scene({
        text: `
            - Прости, сейчас у меня нет такой суммы. 
            <p>Шерил отвернулась, было видно, насколько сильно она расстроилась от этой новости. 
            <p>- К чему такая срочность? - я решила уточнить, чтобы попытаться наладить дальнейшее общение. 
            <p>- Я должна купить продукты, иначе отчим будет злиться. Но зарплату задерживают, понимаешь? Всё против меня, опять повторится тот кошмар. 
            `,
        background: "Persons/Cheryl",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[82].begin(); }],
    });

Game.Scenes.PN[82] =
    new Scene({
        text: `
            “Кошмар?”
            <p>- Шерил, дорогая… - мне было нестерпимо грустно от того, что я не знала, как помочь ей. - Давай попросим у Скарлетт или Леона, я уверена, они не откажут. 
            <p>- Да кто я такая, чтобы они мне помогали? - девушка начала злиться. - Даже тебе сложно мне помочь. Видимо, мне не от кого ждать помощи. Пора уже научиться справляться со всем самостоятельно. 
            `,
        background: "Persons/Cheryl",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[83].begin(); Game.message('Шерил становится решительнее, возможно именно это ей и нужно? '); Game.Stats.Cheryl.add(-1) }],
    });

Game.Scenes.PN[83] =
    new Scene({
        text: `
            Уже под утро мы с ребятами немного прибрались в квартире, разложили диван и устало плюхнулись на него. 
            `,
        background: "",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[84].begin(); }],
        condition: function () {
            if (Game.Stats.InvitedCheryl.get >= 1) {
                this.buttonaction[0] = () => { Game.Scenes.PN[85].begin(); }
            }
        }
    });

Game.Scenes.PN[84] =
    new Scene({
        text: `
            Перед тем как уснуть, я слышала крики из дома Шерил. Сегодня они были громче, чем обычно. Я написала Шерил сообщение, но она мне так и не ответила… 
            <p>“Мне стоило позвать ее…”
            <p>Я хотела было выйти, но усталость, которая накопилась за несколько дней, обрушилась на меня, не давая подняться. 
            <p>“Шерил, в следующий раз, я точно буду рядом.” 
            `,
        background: "",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[86].begin(); Game.message('Состояние Шерил ухудшается'); Game.Stats.Cheryl.add(-1); }],
    });

Game.Scenes.PN[85] =
    new Scene({
        text: `
            Шерил решила не оставаться с нами на ночь, она попрощалась и направилась домой. 
            Я знала в чем была причина такого решения, ведь ее ждали в доме “ужасов”. 
            Шерил всячески старалась лишний раз не накалять обстановку. Несмотря на дрожащие руки, она искренне улыбалась и светилась от счастья, когда уходила.
            <p>- Все-таки мое решение позвать ее было правильным, - я сказала это вслух и вызвала одобрение у друзей. 
            `,
        background: "Persons/Cheryl",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[86].begin(); }],
    });

Game.Scenes.PN[86] =
    new Scene({
        text: `
            Я немного поерзала и все же нашла удобную позу для сна. Я лежала между Леоном и Скарлетт, которые уже мирно посапывали. 
            `,
        background: "",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[87].begin(); }],
        condition: function () {
            if (Game.Stats.FollowedScarlett.get >= 1) this.buttonaction[0] = () => { Game.Scenes.PN[88].begin(); }

            if (Game.Stats.HugLeon.get >= 1) this.buttonaction[0] = () => { Game.Scenes.PN[87].begin(); }

            if (Game.Stats.FollowedScarlett.get <= 0 && Game.Stats.HugLeon.get <= 0) this.buttonaction[0] = () => { Game.Scenes.PN[89].begin(); }
        }
    });

Game.Scenes.PN[87] =
    new Scene({
        text: `
            Парень легонько меня приобнял, прижимая к себе. Возможно, Леон сделал это неосознанно, во сне, но я была рада еще раз ощутить  его прикосновения. 
            Я обратила внимание на его длинные ресницы, привлекательное лицо, которое, казалось, во сне выглядело еще притягательнее. 
            <p>Его дыхание обжигало мне кожу, а крепкие мужские руки придавали то самое спокойствие, о котором я мечтала последние несколько дней. 
            <p>Я думала, что наконец нашла безопасность в этих объятиях, но я ошибалась…
            `,
        background: "",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[90].begin(); }],
    });

Game.Scenes.PN[88] =
    new Scene({
        text: `
            Девушка взяла меня за руки. Я ощутила небольшую дрожь в ее прикосновении и ответно сжала пальцы Скарлетт. 
            В этот момент мне хотелось быть ее защитой ото всех печалей, быть тем самым щитом, который защищает героя в самые трудные и опасные для него моменты.
            <p>Мы лежали так ещё некоторое время, изредка перешептываясь, и не заметили как уснули, так и держась за руки. Это мгновение придавало то самое спокойствие, о котором я мечтала последние несколько дней. 
            <p>Я думала, что наконец нашла безопасность в этих прикосновениях, но я ошибалась…
            `,
        background: "",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[90].begin(); }],
    });

Game.Scenes.PN[89] =
    new Scene({
        text: `
            Я смотрела на лица друзей, с благодарностью вспоминая сегодняшний вечер. Эти мгновения придавали то самое спокойствие, о котором я мечтала последние несколько дней. 
            <p>Я думала, что находясь рядом с близкими, мне ничего не будет угрожать, но я ошибалась…
            `,
        background: "",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[90].begin(); }],
    });

Game.Scenes.PN[90] =
    new Scene({
        text: `
            Очнувшись ото сна, я ощутила характерный привкус крови во рту. Тело, казалось, было полностью разбито. 
            <p>С трудом опустив голову ниже, я обнаружила, что сидела связанная на почти развалившемся деревянном стуле. Вокруг было темно и прохладно, отовсюду слышался звук падающих капель, эхом разносящийся по всему помещению. 
            <p>“Больно… Меня похитили? Скарлетт и Леон не пострадали?”

            `,
        background: "Backgrounds/Chair",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[91].begin(); }],
        condition: function () {
            Game.Effects.Gray();
            Game.Sounds.play('Music', 'Chair');
            AndroidApp ('showAd');
        }
    });

Game.Scenes.PN[91] =
    new Scene({
        text: `
            Но была еще одна деталь, которую я с опозданием осознала. 
            Одежда. Та же, что была одета на Катарине в мое прошлое перемещение. Только сейчас она выглядела изодранной, грязной и была покрыта пятнами крови.
            <p>“Это произошло вновь… Но где же я? Неужели тот монстр…”
            `,
        background: "Backgrounds/Chair",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[92].begin(); }],
    });

Game.Scenes.PN[92] =
    new Scene({
        text: `
            Я думала лишь о способе выбраться из этого места. Страшная мысль пришла сама собой: 
            <p>“Что будет, если я погибну здесь? Умру ли я и в своем мире?”
            <p>Но проверять не хотелось. 
            `,
        background: "Backgrounds/Chair",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[93].begin(); }],
    });

Game.Scenes.PN[93] =
    new Scene({
        text: `
            Я чувствовала всю боль и отчаяние Катарины, ведь прямо сейчас я проживала ее жизнь. 
            <p>“Что мне делать? Попытаться сбежать? А если этот ублюдок сюда заявится, не сделаю ли я только хуже?” 
            <p>Я:
            `,
        background: "Backgrounds/Chair",
        buttontext: ['Попыталась сбежать', 'Осталась сидеть на месте'],
        buttonaction: [
            () => { Game.Scenes.PN[94].begin(); Game.Stats.TryToEscape.add(1); },
            () => { Game.Scenes.PN[119].begin(); Game.Stats.TryToEscape.add(0); },
        ],
    });

Game.Scenes.PN[94] =
    new Scene({
        text: `
            Понять, где я находилась было практически невозможно из-за скудного освещения. Осознав, что связанными у меня были только руки, в голову пришли здравые мысли о попытке побега.
            <p>“Я могла бы попытаться встать и попробовать освободиться… нельзя было уповать на случай и ждать спасения. Жизнь научила меня самостоятельно выбираться из трудностей!” 
            `,
        background: "Backgrounds/Chair",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[95].begin(); }],
    });

Game.Scenes.PN[95] =
    new Scene({
        text: `
            Я медленно поднялась на дрожащие ноги, немного наклоняясь, чтобы не задевать стулом пол. Шла не торопясь, боком, боясь сделать лишние движения.
            <p>Размер комнаты было трудно оценить, но мне показалось, что это был небольшой подвал, может, размером с нашу гостиную. 
            `,
        background: "Backgrounds/Chair",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[96].begin(); }],
    });

Game.Scenes.PN[96] =
    new Scene({
        text: `
            Глаза стали постепенно привыкать к темноте и я увидела столик.
            <p>“Достаточно ли у меня времени, чтобы осмотреться?” 
            `,
        background: "Backgrounds/Chair",
        buttontext: ['Идти к столу', 'Блуждать дальше'],
        buttonaction: [() => { Game.Scenes.PN[201].begin(); }, () => { Game.Scenes.PN[100].begin(); }],
    });

Game.Scenes.PN[201] =
  new Scene({
    text: `
            “Должно быть это лучшее решение…”
            <p>Подойдя к нему, я обнаружила несколько хаотично-разбросанных бумаг, небольшой ножик, перо, шприц. 
            <p>“Вот оно, я смогу попробовать разрезать эти веревки в лучших традициях шпионских фильмов.”
            `,
    background: "Backgrounds/Chair",
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.PN[97].begin(); }],
  });

Game.Scenes.PN[97] =
    new Scene({
        text: `
            Взяв в рот грязный нож, я попыталась повернуть голову так, чтобы “мой спаситель” попал мне прямо в руки. И у меня:
            `,
        background: "Backgrounds/Chair",
        buttontext: [
            'Не получилось',
            'Не получилось',
            'Получилось',
            'Не получилось',
        ],
        buttonaction: [
            () => { Game.Scenes.PN[98].begin(); },
            () => { Game.Scenes.PN[98].begin(); },
            () => { Game.Scenes.PN[97].begin(); },
            () => { Game.Scenes.PN[98].begin(); },
        ],
    });

Game.Scenes.PN[98] =
    new Scene({
        text: `
            Я и не ожидала, что с первого раза у меня получится. Нож со звоном упал вниз. Мне пришлось сесть на колени и языком касаться холодного, мокрого пола, чтобы поддеть предмет. 
            `,
        background: "Backgrounds/Chair",
        buttontext: [
            'Не получилось',
            'Не получилось',
            'Получилось',
            'Не получилось',
        ],
        buttonaction: [
            () => { Game.Scenes.PN[98].begin(); },
            () => { Game.Scenes.PN[98].begin(); },
            () => { Game.Scenes.PN[99].begin(); },
            () => { Game.Scenes.PN[98].begin(); },
        ],
    });

Game.Scenes.PN[99] =
    new Scene({
        text: `
            Каким-то чудом ножик попал мне в руки и я начала разрезать веревки. Хоть он был не шибко острым, через некоторое время веревки стали ослабевать и мне удалось освободиться. 
            `,
        background: "Backgrounds/Chair",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[102].begin(); Game.message('За свою решимость вы получили нож!'); Game.Stats.Knife.add(1); Game.Achievements.FirstWeapon.unlock(); }],
    });

Game.Scenes.PN[100] =
    new Scene({
        text: `
            В другом конце комнаты был едва различим высокий закрытый шкаф. Мне удалось поддеть ногой дверцу. 
            Оттуда вывалилась детская фарфоровая кукла. Она мило улыбалась, несмотря на растрепанную прическу и несколько оторванных конечностей. 
            `,
        background: "Backgrounds/Chair",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[210].begin(); }],
    });

Game.Scenes.PN[210] =
  new Scene({
    text: `
            Однако самым страшным являлось вовсе не это. Сами стенки шкафа были залиты чем-то алым. 
            Я искренне надеялась, что это все-таки краска, а не кровь. Но невыносимый удушающий запах говорил об обратном.
            <p>“Боже…”
            `,
    background: "Backgrounds/Chair",
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.PN[101].begin(); }],
  });

Game.Scenes.PN[101] =
    new Scene({
        text: `
            Мне было даже страшно подумать о том, что могло тут твориться. Я незамедлительно решила вернуться к столу и снова попытаться найти выход. 
            `,
        background: "Backgrounds/Chair",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[201].begin(); }],
    });

Game.Scenes.PN[102] =
    new Scene({
        text: `
            Я размяла затекшие руки, голову. Быстренько осмотрела себя, потрогала ребра, так как именно в боку боль была сильнее всего. 
            <p>“Как я и думала, при нажатии болит еще сильнее. Что же пережила Катарина? Неужели виновата… моя беспечность?” 
            `,
        background: "Backgrounds/Chair",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[103].begin(); }],
    });

Game.Scenes.PN[103] =
    new Scene({
        text: `
            Я взяла себя в руки, и попыталась рассмотреть вещи на столе. Мое внимание привлекли небольшие листки, на которых были изображены каракули и не аккуратно нарисованные символы. 
            Словно ребенок, не умеющий писать, взял в первый раз письменные принадлежности и попытался передать свои мысли на бумаге.
            <p>Однако одно слово все же было различимо и повторялось несколько раз.
            <p><i>“Катарина.” </i>
            `,
        background: "Backgrounds/Chair",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[104].begin(); }],
    });

Game.Scenes.PN[104] =
    new Scene({
        text: `
            Все внутри дрожало, я боялась сделать лишний шаг. 
            <p>“Неужели за мной все это время следили?”
            <p>Единственная мысль, не дававшая мне сдаться - это выход, который, безусловно, должен быть где-то рядом.
            `,
        background: "Backgrounds/Chair",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[105].begin(); }],
    });

Game.Scenes.PN[105] =
    new Scene({
        text: `
            Вскоре я увидела железную дверь. Она находилась в другом конце комнаты. Я приблизилась к ней и со всей силы дернула за ручку. Никакого результата не последовало. 
            <p>“Правильно, $Имя Игрока$, надежда умирает последней.”
            `,
        background: "Backgrounds/VaultDoor",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[200].begin(); }],
    });

Game.Scenes.PN[200] =
    new Scene({
        text: `
            Сверху на двери была решетка, а за ней виднелся длинный коридор, освещенный несколькими тлеющими факелами. 
            <p>Я схватилась за железные прутья, встала на носочки, пытаясь рассмотреть помещение. 
            Ничего такого, что могло бы мне помочь, я не увидела. Зато краем глаза я заметила искривленную тень, которая стремительно приближалась к моей камере.
            `,
        background: "Backgrounds/VaultDoor",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[106].begin(); }],
    });



Game.Scenes.PN[106] =
    new Scene({
        text: `
            “Черт… Что же мне делать? Защищаться? Притвориться связанной и выжидать?
            `,
        background: "Backgrounds/VaultDoor",
        buttontext: [
            'Обороняться ножом',
            'Притвориться связанной'
        ],
        buttonaction: [
            () => { Game.Scenes.PN[107].begin(); },
            () => { Game.Scenes.PN[117].begin(); }
        ],
    });

Game.Scenes.PN[107] =
    new Scene({
        text: `
            Я достала нож и попыталась скрыться в тенях комнаты. 
            Через некоторое время послышалось проворачивание замка и в помещение вошло нечто. Уродливая тварь начала истошно кричать, осматривая каждый угол. 
            <p>“Он вот-вот найдет меня… Как же страшно, что я могу?” 
            `,
        background: "",
        buttontext: ['Замереть', 'Атаковать существо в горло'],
        buttonaction: [
            () => { Game.Scenes.PN[108].begin(); },
            () => { Game.Scenes.PN[111].begin(); }],
    });

Game.Scenes.PN[108] =
    new Scene({
        text: `
            Я так и не решилась на открытое столкновение. Да и могла ли я что-то противопоставить этому существу? 
            <p>Монстр нашел меня довольно быстро. Он сильным рывком кинул меня в центр комнаты и навис надо мной. 
            <p>- Ты думала, что сможешь сбежать? Как наивно. 
            `,
        background: "Persons/Monster",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[109].begin(); }],
    });

Game.Scenes.PN[109] =
    new Scene({
        text: `
            Из его пасти разило тухлятиной, глаза были красные, злобные. Я перестала дышать, тело дрожало, словно предчувствуя, что час мой близок. 
            <p>«Я сейчас погибну, выхода больше нет!»
            <p>Тварь грубо схватила меня и снова поместила на стул, внимательно осматривая. 
            `,
        background: "Persons/Monster",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[110].begin(); }],
    });

Game.Scenes.PN[110] =
    new Scene({
        text: `
            - Тебе не сбежать, твоя кровь усилит наш род и мы наконец-то будем править! 
            <p>Через некоторое время в помещение вошла еще одна фигура. На вид человек, высокий, лицо скрыто за маской.
            `,
        background: "Persons/Monster",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[126].begin(); }],
    });

Game.Scenes.PN[111] =
    new Scene({
        text: `
            Я сильно сжала оружие, готовясь к нападению. Адреналин кипел во мне, я видела лишь единственный исход своего спасения - сражение. 
            <p>Когда монстр практически поравнялся со мной, я со всей силы воткнула нож в его шею и ринулась в сторону распахнутой двери. 
            <p>Отдаленно я слышала его недовольное рычание, но не посмела обернуться. 
            `,
        background: "Persons/Monster",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[112].begin(); }],
    });

Game.Scenes.PN[112] =
    new Scene({
        text: `
            Я вышла в коридор и побежала в случайном направлении.
            <p>Однако моя свобода длилась недолго. Я практически сразу врезалась в кого-то.  
            Высокая фигура твердо стояла на месте. Блеклый свет от факелов едва помог мне разглядеть мужской силуэт. Он резко взял меня за руку и потянул обратно в комнату. 
            `,
        background: "",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[113].begin(); }],
    });

Game.Scenes.PN[113] =
    new Scene({
        text: `
            Раненое существо тут же подбежало ко мне, жадно оглядывая. В его глазах стало больше безумия и нескрываемой ненависти, изо рта текли слюни. 
            <p>- Научи нашу гостью манерам, я разрешаю, - голос незнакомца был спокойным, но с нотками заигрывания. Ему явно нравилось происходящее. 
            `,
        background: "Persons/Antagonist",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[114].begin(); }],
    });

Game.Scenes.PN[114] =
    new Scene({
        text: `
            Монстру не надо было повторять дважды. Он схватил меня и повалил на пол. Его язык начал проходиться по моему лицу, его когтистые пальцы елозили по телу, он жадно облизывался. 
            <p>- Прошу, перестаньте… 
            <p>Тварь встала и надавила ногой на сгиб руки. Я инстинктивно стала его отталкивать, но он был слишком силен. 
            `,
        background: "Persons/Monster",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[115].begin(); }],
    });

Game.Scenes.PN[115] =
    new Scene({
        text: `
            С каждым его нажатием, по моему телу проходили болезненные волны. Мгновение и боль стала настолько нестерпимой, что я начала терять сознание.
            <p>Одно резкое движение - и вот я уже кричу во все горло. Никогда раньше я не испытывала такой боли. 
            <p>“Пусть это закончится…”
            `,
        background: "Persons/Monster",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[116].begin(); Game.message('К сожалению, не всегда надо бросаться в атаку… Вы сильно ранены!'); Game.Stats.BrokenHand.add(1); Game.Achievements.AttackMonster.unlock(); }],
    });

Game.Scenes.PN[116] =
    new Scene({
        text: `
            В какой-то момент в поле моего зрения вошла фигура незнакомца. Он улыбался, с наслаждением, буквально облизывался при виде моих мучений. 
            <p>В это время монстр громко смеялся, я с ужасом смотрела на неестественное положение своей руки. 
            `,
        background: "Persons/Antagonist",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[126].begin(); }],
    });

Game.Scenes.PN[117] =
    new Scene({
        text: `
            Мне казалось, это самый логичный и безопасный вариант. Вряд ли мне удастся что-то сделать с маленьким ножичком. 
            <p>Я быстро вернула стул в исходное положение, села, закинула руки за спину и стала ждать. 
            `,
        background: "Backgrounds/Chair",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[118].begin(); }],
    });

Game.Scenes.PN[118] =
    new Scene({
        text: `
            Послышалось проворачивание замка и в помещение вошло нечто. Уродливая тварь улыбалась, медленно подходя ко мне.
            <p>- Мышка даже не попыталась сбежать. 
            <p>Следом за ним в помещение вошла еще одна фигура. На вид довольно высокий мужчина, лицо скрыто за маской.
            `,
        background: "Persons/Monster",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[126].begin(); }],
    });

Game.Scenes.PN[119] =
    new Scene({
        text: `
            “Нет… кто-нибудь обязательно спасет меня. Ведь есть же люди, которым Катарина дорога… Я выживу!” 
            <p>Минуты длились бесконечно. Мне было холодно, страшно. В голову стали закрадываться самые ужасные мысли…
            <p>До этого момента я была уверена, что это легкая игра, где я буду несомненным победителем. Но мне и представить было трудно, какой ценой я получу заветный выигрыш. А получится ли у меня? 
            `,
        background: "Backgrounds/Chair",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[120].begin(); }],
    });

Game.Scenes.PN[120] =
    new Scene({
        text: `
            В тяжелые моменты я думала о близких. 
            О родителях, которые, несомненно пришли бы мне на помощь, спасли бы меня, укутали в одеяло и дали бы по заслугам той твари, что сотворила со мной такое. 
            <p>Думала о:
            `,
        background: "Backgrounds/Chair",
        buttontext: [
            'Леоне',
            'Нэйтане',
            'Подругах',
            'Собраться с мыслями'
        ],
        buttonactive: [true, true, true, false],
        buttonaction: [
            () => { Game.Scenes.PN[121].deactivate(0); Game.Scenes.PN[122].deactivate(0); Game.Scenes.PN[123].deactivate(0); Game.Scenes.PN[121].begin(); },
            () => { Game.Scenes.PN[121].deactivate(1); Game.Scenes.PN[122].deactivate(1); Game.Scenes.PN[123].deactivate(1); Game.Scenes.PN[122].begin(); },
            () => { Game.Scenes.PN[121].deactivate(2); Game.Scenes.PN[122].deactivate(2); Game.Scenes.PN[123].deactivate(2); Game.Scenes.PN[123].begin(); },
            () => { Game.Scenes.PN[124].begin(); },
        ],
        condition: function () {
          Game.Scenes.PN[121].activate(0); Game.Scenes.PN[122].activate(0); Game.Scenes.PN[123].activate(0);
          Game.Scenes.PN[121].activate(1); Game.Scenes.PN[122].activate(1); Game.Scenes.PN[123].activate(1);
          Game.Scenes.PN[121].activate(2); Game.Scenes.PN[122].activate(2); Game.Scenes.PN[123].activate(2);
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false) this.buttonactive[3] = true;
            else this.buttonactive[3] = false;
        }
    });

Game.Scenes.PN[121] =
    new Scene({
        text: `
            Почему-то представив его в форме полицейского, я ясно видела, как он вооружившись пистолетом убил бы наповал монстра. Затем обеспокоенно осматривал меня с ног до головы, приговаривая: 
            <p>- Я опоздал, прости. 
            <p>Аккуратно поднял бы меня на руки и благополучно спас. 
            `,
        background: "",
        buttontext: [
            'Леоне',
            'Нэйтане',
            'Подругах',
            'Собраться с мыслями'
        ],
        buttonactive: [true, true, true, false],
        buttonaction: [
            () => { Game.Scenes.PN[121].deactivate(0); Game.Scenes.PN[122].deactivate(0); Game.Scenes.PN[123].deactivate(0); Game.Scenes.PN[121].begin(); },
            () => { Game.Scenes.PN[121].deactivate(1); Game.Scenes.PN[122].deactivate(1); Game.Scenes.PN[123].deactivate(1); Game.Scenes.PN[122].begin(); },
            () => { Game.Scenes.PN[121].deactivate(2); Game.Scenes.PN[122].deactivate(2); Game.Scenes.PN[123].deactivate(2); Game.Scenes.PN[123].begin(); },
            () => { Game.Scenes.PN[124].begin(); },
        ],
        condition: function () {
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false) this.buttonactive[3] = true;
            else this.buttonactive[3] = false;
        }
    });

Game.Scenes.PN[122] =
    new Scene({
        text: `
            Профессор поднял бы весь город на уши, созвал всех полицейских и они бы вместе ворвались меня спасать. Он сильно испугался за меня, поэтому был не в состоянии проронить хоть слово. 
            <p>Аккуратно взяв меня под руку, мы бы выбрались из этого логова. 
            `,
        background: "",
        buttontext: [
            'Леоне',
            'Нэйтане',
            'Подругах',
            'Собраться с мыслями'
        ],
        buttonactive: [true, true, true, false],
        buttonaction: [
            () => { Game.Scenes.PN[121].deactivate(0); Game.Scenes.PN[122].deactivate(0); Game.Scenes.PN[123].deactivate(0); Game.Scenes.PN[121].begin(); },
            () => { Game.Scenes.PN[121].deactivate(1); Game.Scenes.PN[122].deactivate(1); Game.Scenes.PN[123].deactivate(1); Game.Scenes.PN[122].begin(); },
            () => { Game.Scenes.PN[121].deactivate(2); Game.Scenes.PN[122].deactivate(2); Game.Scenes.PN[123].deactivate(2); Game.Scenes.PN[123].begin(); },
            () => { Game.Scenes.PN[124].begin(); },
        ],
        condition: function () {
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false) this.buttonactive[3] = true;
            else this.buttonactive[3] = false;
        }
    });

Game.Scenes.PN[123] =
    new Scene({
        text: `
            Шерил и Скарлетт были бы как секретные агенты, которые тайно работали на правительство и смогли узнать мое местоположение. 
            <p>Шерил предпочитала огнестрельное оружие, Скарлет же охотно использовала холодное. Они бы выбили эту злосчастную дверь, убили вы всех монстров и вместе вытащили меня из этого кошмара. 
            `,
        background: "",
        buttontext: [
            'Леоне',
            'Нэйтане',
            'Подругах',
            'Собраться с мыслями'
        ],
        buttonactive: [true, true, true, false],
        buttonaction: [
            () => { Game.Scenes.PN[121].deactivate(0); Game.Scenes.PN[122].deactivate(0); Game.Scenes.PN[123].deactivate(0); Game.Scenes.PN[121].begin(); },
            () => { Game.Scenes.PN[121].deactivate(1); Game.Scenes.PN[122].deactivate(1); Game.Scenes.PN[123].deactivate(1); Game.Scenes.PN[122].begin(); },
            () => { Game.Scenes.PN[121].deactivate(2); Game.Scenes.PN[122].deactivate(2); Game.Scenes.PN[123].deactivate(2); Game.Scenes.PN[123].begin(); },
            () => { Game.Scenes.PN[124].begin(); },
        ],
        condition: function () {
            if (this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false) this.buttonactive[3] = true;
            else this.buttonactive[3] = false;
        }
    });

Game.Scenes.PN[124] =
    new Scene({
        text: `
            “Хоть книгу пиши… Что за фантазии, $Имя Игрока$?”
            <p>Однако реальность была слишком сурова и пуста. Пока не послышался звук открывание двери, я все еще витала в своем мире грез. 
            `,
        background: "Backgrounds/Chair",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[125].begin(); }],
    });

Game.Scenes.PN[125] =
    new Scene({
        text: `
            Монстр вошел не спеша и удовлетворительно кивнул, проговорив: 
            <p>- Мышка даже не попыталась сбежать. 
            <p>Через некоторое время в помещение вошла еще одна фигура. На вид довольно высокий мужчина, лицо скрыто за маской.
            `,
        background: "Persons/Monster",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[126].begin(); }],
    });

Game.Scenes.PN[126] =
    new Scene({
        text: `
            Мужчина опустился на колени передо мной и проговорил:
            <p>- Милая, мне жаль, что так вышло, но это лишь процесс воспитания, - 
            его рука прошлась по моим волосам, холодные губы коснулись моей горячей щеки. - Ты не представляешь, как долго я ждал нашей встречи. 
            `,
        background: "Persons/Antagonist",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[127].begin(); }],
        condition: function () {
            Game.Achievements.EvilBeauty.unlock();
        }
    });

Game.Scenes.PN[127] =
    new Scene({
        text: `
            Я с ужасом попыталась отстраниться, но незнакомец сильно сжал мой подбородок, заставляя всматриваться в его глаза. 
            <p>- Подготовь пробирку, чудик, - он обращался к монстру. - Знаю, к тебе относятся ужасно, но так надо... Иначе ты не научишься покоряться. 
            `,
        background: "Persons/Antagonist",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[128].begin(); }],
        condition: function () {
            if (Game.Stats.BrokenHand.get >= 1) this.buttonaction[0] = () => { Game.Scenes.PN[129].begin(); }
        }
    });

Game.Scenes.PN[128] =
    new Scene({
        text: `
            Я ощущала, что все еще могу бросить вызов этой твари. Я могу узнать у него хоть какую-нибудь информацию. 
            <p>- Что во мне особенного? 
            `,
        background: "",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[130].begin(); }],
    });

Game.Scenes.PN[129] =
    new Scene({
        text: `
            Мне было нестерпимо больно, все вокруг пульсировало, я не могла сосредоточиться. Но даже так, я должна задать вопрос этой твари. Пусть видит, что я все еще что-то могу. 
            <p>- Что во мне особенного? 
            `,
        background: "",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[130].begin(); }],
    });

Game.Scenes.PN[130] =
    new Scene({
        text: `
            Мужчина удивился и принялся рассматривать меня. 
            <p>- Значит, ты все еще можешь говорить и не боишься? А я тебя, похоже, недооценил. 
            <p>- Скажи… 
            <p>- Тихо, - он приложил палец к моим губам. - А если я отвечу, что ты очень ценный объект. Тебя устроит такое положение вещей? 
            Ты особенная. Разве не об этом мечтает каждая девушка? Но я бы соврал, если бы не назвал еще одну причину. Ты просто нравишься мне, Катарина. 
            `,
        background: "Persons/Antagonist",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[131].begin(); }],
    });

Game.Scenes.PN[131] =
    new Scene({
        text: `
            Я не могла понять, шутит он или издевается? 
            <p>Мужчина подошел к столу и взял оттуда шприц, который без слов воткнул мне в руку, набирая кровь.
            <p>- Зачем? Что это? - я говорила из последних сил. 
            <p>- Вопросы, снова вопросы. Конечно же мы ставим на тебе эксперименты. В чем твоя ценность? Оставляю тебе пищу для размышлений... 
            `,
        background: "Persons/Antagonist",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[132].begin(); }],
    });

Game.Scenes.PN[132] =
    new Scene({
        text: `
            Но вдруг послышался оглушительный взрыв, который поднял клубы дыма и пыли, заполняя все помещение. 
            <p>- О, - незнакомец, казалось, был опечален. - Как быстро они нашли нас, не ожидал… Что ж, Катарина, в следующий раз  я подготовлюсь лучше, будет ещё интереснее…
            <p>Он подошел вплотную и жадно впился в мои губы. 
            `,
        background: "Persons/Antagonist",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[133].begin(); }],
    });

Game.Scenes.PN[133] =
    new Scene({
        text: `
            - Ты не представляешь, какое удовольствие я ощущаю, гоняясь за тобой, - он помахал наполненной пробиркой перед моими глазами. - И, да. Меня зовут Александр. Если теория подтвердится, мы скоро встретимся, милая моя. 
            <p>Мужчина подозвал монстра и они вместе сбежали в коридоры подземелья. 
            `,
        background: "Persons/Antagonist",
        buttontext: [''],
        buttonaction: [() => { Game.Scenes.PN[134].begin(); Game.Achievements.Storm.unlock(); }],
        condition: function () {
          Game.Stats.Antagonist.add(0);
        }
    });

Game.Scenes.PN[134] =
    new Scene({
        text: `
            Усталость, злость, негодование. Я чувствовала себя использованной и разбитой. Когда в помещение вошло много людей, у меня даже не оказалось сил взглянуть на них. 
            <p>Один из спасителей подошел и заключил меня в трепетные объятия. 
            <p>- Я рядом, это все закончилось, слышишь? - он гладил меня по голове. - Ты в безопасности, Катарина. 
            `,
        background: "",
        buttontext: [''],
        buttonaction: [() => {
          setTimeout(() => { Game.Scenes.FC[0].begin(); }, 1000);
          Game.LoadScreen('FP');
          Game.Effects.Gray.Stop();
          Game.Stats.Knife.add(-1);
          Game.Progress.save("FP");
        }],
    });Game.Scenes.FC = [];

Game.Scenes.FC[0] = new Scene({
  text: `
    - Она в порядке, доктор? - произнес взволнованный мужской голос. 
    <p>- Да, сэр. Мы сделали все, что могли. Ее жизни больше ничего не угрожает. 
    <p>- Благодарю вас! 
            `,
  background: "",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[1].begin(); Game.message("<em>Нью-Йорк 1885 год"); }],
  condition: () => {
    Game.Sounds.play('Music','Doctor');
  }
});

Game.Scenes.FC[1] = new Scene({
  text: `
    Послышалось хлопанье двери, а затем я почувствовала легкое прикосновение. Кто-то нежно проводил пальцами по ладони вверх-вниз. Эти осторожные движения успокаивали.  
    <p>Мне не терпелось открыть глаза, чтобы разузнать о произошедшем. 
    <p>“Наверное, это мой спаситель?”
    <p>Приложив большие усилия, я наконец смогла прийти в себя и увидеть окружение. 
            `,
  background: "",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[2].begin(); Game.Effects.Flash(); }],
});

Game.Scenes.FC[2] = new Scene({
  text: `
    Яркие светлые стены, жесткая кушетка и размытый силуэт. Увидев, что я очнулась, мужской голос проговорил:
    <p>- Катарина, ты меня слышишь? 
    <p>“Слышу.” 
    <p>Тишина. Меня словно парализовало от всего ранее пережитого. Захотелось перевернуться, но тело отказывалось подчиняться мне.  
            `,
  background: "Backgrounds/Doctors_office",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[4].begin(); }],
  condition: function () {
    if(Game.Stats.BrokenHand.get>=1) {
      this.buttonaction[0] = ()=>{Game.Scenes.FC[3].begin();}
    }
  }
});

Game.Scenes.FC[3] = new Scene({
  text: `
    - Катарина, лежи спокойно, - незнакомец аккуратно придержал меня за плечо. - Ты серьезно ранена, твоя рука… 
    <p>В его голосе слышались нотки сожаления. Мне было неизвестно, кто передо мной, но я ощущала, что этот человек был искренен в своих переживаниях.
    <p>Я почувствовала, как незнакомец сильнее надавил на мое плечо, а затем сменил тон на более агрессивный: 
    <p>- Я убью этих тварей, чего бы мне этого не стоило. Они ответят за содеянное.
            `,
  background: "Backgrounds/Doctors_office",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[5].begin(); }],
});

Game.Scenes.FC[4] = new Scene({
  text: `
    - Катарина, осторожнее, - его рука аккуратно легла мне на плечо. - Ты еще недостаточно окрепла. 
    <p>В его голосе слышались нотки сожаления. Мне было неизвестно, кто передо мной, но ощущала, что этот человек был искренен в своих переживаниях.
    <p>Я почувствовала, как незнакомец сильнее надавил на мое плечо, а затем сменил тон на более агрессивный: 
    <p>- Они ответят за содеянное. Прости, что не смог тебя защитить. 
            `,
  background: "Backgrounds/Doctors_office",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[5].begin(); }],
});

Game.Scenes.FC[5] = new Scene({
  text: `
    Я все же нашла в себе силы сфокусироваться и рассмотреть собеседника. 
            `,
  background: "Backgrounds/Doctors_office",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[6].begin(); }],
});

Game.Scenes.FC[6] = new Scene({
  text: `
    Светло-каштановые волосы до плеч. Голубые глаза. Мужчина выглядел статно, в нем легко можно было распознать аристократа. 
    <p>Его правую щеку украшало несколько шрамов. Они никак не влияли на его общий презентабельный вид, а, напротив, лишь подчеркивали его мужественность и готовность встретиться лицом к лицом с опасностью. 
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[7].begin(); }],
});

Game.Scenes.FC[7] = new Scene({
  text: `
    Интересно, откуда они у него. Когда-нибудь обязательно поинтересуюсь, а сейчас время поговорить о насущных делах.
            `,
  background: "Persons/Robert",
  buttontext: ['Кто ты такой?','Что это за твари?', 'Где Никола?', 'Закончить диалог'],
  buttonactive: [true, true, true, false],
  buttonaction: [
    () => { Game.Scenes.FC[9].deactivate(0); Game.Scenes.FC[11].deactivate(0); Game.Scenes.FC[13].deactivate(0); Game.Scenes.FC[8].begin(); },
    () => { Game.Scenes.FC[9].deactivate(1); Game.Scenes.FC[11].deactivate(1); Game.Scenes.FC[13].deactivate(1); Game.Scenes.FC[10].begin(); },
    () => { Game.Scenes.FC[9].deactivate(2); Game.Scenes.FC[11].deactivate(2); Game.Scenes.FC[13].deactivate(2); Game.Scenes.FC[12].begin(); },
    () => { Game.Scenes.FC[14].begin(); },
  ],
  condition: function () {
    Game.Scenes.FC[9].activate(0); Game.Scenes.FC[11].activate(0); Game.Scenes.FC[13].activate(0);
    Game.Scenes.FC[9].activate(1); Game.Scenes.FC[11].activate(1); Game.Scenes.FC[13].activate(1);
    Game.Scenes.FC[9].activate(2); Game.Scenes.FC[11].activate(2); Game.Scenes.FC[13].activate(2);
    if(this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false) {
      this.buttonactive[3] = true;
    }
    else{
      this.buttonactive[3] = false;
    }

  }
});

Game.Scenes.FC[8] = new Scene({
  text: `
    Вопрос сильно смутил незнакомца. 
    <p>- Доктор предупреждал, что из-за сильного стресса может возникнуть проблема с памятью, - мужчина с грустью глядел на меня своими зелеными глазами. - Я - Роберт, Катарина. Твой муж.
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[9].begin(); }],
});

Game.Scenes.FC[9] = new Scene({
  text: `
    “Муж? Никола упоминал об этом человеке?… Не могу вспомнить…”
    <p>В любом случае эта новость звучала крайне неожиданно. Оказывается, в этом мире у Катарины есть любимый человек. 
    <p>- Прости, - я говорила очень тихо. - Все, правда, как в тумане. 
    <p>Роберт понимающе кивнул.
            `,
  background: "Persons/Robert",
  buttontext: ['Кто ты такой?','Что это за твари?', 'Где Никола?', 'Закончить диалог'],
  buttonactive: [true, true, true, false],
  buttonaction: [
    () => { Game.Scenes.FC[9].deactivate(0); Game.Scenes.FC[11].deactivate(0); Game.Scenes.FC[13].deactivate(0); Game.Scenes.FC[8].begin(); },
    () => { Game.Scenes.FC[9].deactivate(1); Game.Scenes.FC[11].deactivate(1); Game.Scenes.FC[13].deactivate(1); Game.Scenes.FC[10].begin(); },
    () => { Game.Scenes.FC[9].deactivate(2); Game.Scenes.FC[11].deactivate(2); Game.Scenes.FC[13].deactivate(2); Game.Scenes.FC[12].begin(); },
    () => { Game.Scenes.FC[14].begin(); },
  ],
  condition: function () {
    if(this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false) {
      this.buttonactive[3] = true;
    }
    else{
      this.buttonactive[3] = false;
    }
  }
});

Game.Scenes.FC[10] = new Scene({
  text: `
    Он вздохнул и ответил: 
    <p>- Нам лучше поговорить об этом в более приватной обстановке. Когда вокруг не будет “лишних ушей”. Да и тебе стоит отдохнуть, ты еще не до конца оправилась.
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[11].begin(); }],
});

Game.Scenes.FC[11] = new Scene({
  text: `
    Мужчина выглядел серьезно, поэтому я решила не спорить. К тому же, с моей стороны действительно было опрометчиво расспрашивать о подобных темах в общественном месте.
            `,
  background: "Persons/Robert",
  buttontext: ['Кто ты такой?','Что это за твари?', 'Где Никола?', 'Закончить диалог'],
  buttonactive: [true, true, true, false],
  buttonaction: [
    () => { Game.Scenes.FC[9].deactivate(0); Game.Scenes.FC[11].deactivate(0); Game.Scenes.FC[13].deactivate(0); Game.Scenes.FC[8].begin(); },
    () => { Game.Scenes.FC[9].deactivate(1); Game.Scenes.FC[11].deactivate(1); Game.Scenes.FC[13].deactivate(1); Game.Scenes.FC[10].begin(); },
    () => { Game.Scenes.FC[9].deactivate(2); Game.Scenes.FC[11].deactivate(2); Game.Scenes.FC[13].deactivate(2); Game.Scenes.FC[12].begin(); },
    () => { Game.Scenes.FC[14].begin(); },
  ],
  condition: function () {
    if(this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false) {
      this.buttonactive[3] = true;
    }

    else{
      this.buttonactive[3] = false;
    }

  }
});

Game.Scenes.FC[12] = new Scene({
  text: `
    - Дома, отдыхает. 
    <p>- Мы с ним вроде бы виделись, он не пострадал? 
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[13].begin(); }],
});

Game.Scenes.FC[13] = new Scene({
  text: `
    - Он, как и ты, не в лучшем состоянии. Дело может быть не только во влиянии стресса. 
    Не исключено, что эти твари могли что-то сделать с вами. Я предупреждал тебя ранее о такой вероятности. Но доподлинно нам неизвестно. 
    <p>“Катарина знала об этом? Ничего не понимаю.” 
            `,
  background: "Persons/Robert",
  buttontext: ['Кто ты такой?','Что это за твари?', 'Где Никола?', 'Закончить диалог'],
  buttonactive: [true, true, true, false],
  buttonaction: [
    () => { Game.Scenes.FC[9].deactivate(0); Game.Scenes.FC[11].deactivate(0); Game.Scenes.FC[13].deactivate(0); Game.Scenes.FC[8].begin(); },
    () => { Game.Scenes.FC[9].deactivate(1); Game.Scenes.FC[11].deactivate(1); Game.Scenes.FC[13].deactivate(1); Game.Scenes.FC[10].begin(); },
    () => { Game.Scenes.FC[9].deactivate(2); Game.Scenes.FC[11].deactivate(2); Game.Scenes.FC[13].deactivate(2); Game.Scenes.FC[12].begin(); },
    () => { Game.Scenes.FC[14].begin(); },
  ],
  condition: function () {
    if(this.buttonactive[0] == false && this.buttonactive[1] == false && this.buttonactive[2] == false) {
      this.buttonactive[3] = true;
    }

    else{
      this.buttonactive[3] = false;
    }

  }
});

Game.Scenes.FC[14] = new Scene({
  text: `
    От новой информации голова готова была взорваться. 
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[18].begin(); }],
  condition: function () {
    if (Game.Stats.BrokenHand.get>=1) this.buttonaction[0] = () => { Game.Scenes.FC[15].begin();}
  }
});

Game.Scenes.FC[15] = new Scene({
  text: `
    Однако, меня волновал еще один вопрос. 
    <p>- Роберт, а что врачи говорили о моей руке?
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[16].begin(); }],
});

Game.Scenes.FC[16] = new Scene({
  text: `
    - Доктор сказал, что у тебя нарушение целостности локтевой кости, поперечный перелом. Тебе повезло, что нет осколков.
    Поэтому достаточно было наложить фиксирующую повязку. С помощью специальной жидкости твою руку зафиксировали до полного выздоровления. 
    <p>- И сколько времени это займет? 
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[17].begin(); }],
});

Game.Scenes.FC[17] = new Scene({
  text: `
    - Около 2-х месяцев. У всех по-разному. 
    <p>“Бедная Катарина… И ведь это именно мои действия привели к этому.”
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[18].begin(); }],
});

Game.Scenes.FC[18] = new Scene({
  text: `
    После моих вопросов наступила неловкая тишина. Я не знала, что на данный момент могу еще узнать, поэтому для начала решила обдумать все ранее сказанное. Отвернув голову в сторону, я закрыла глаза и попыталась собраться с мыслями. 
    <p>Роберт еще немного посидел со мной, но вскоре ушел. Для него жизнь шла своим размеренным ходом, мне же предстояло долгое лечение.
            `,
  background: "Backgrounds/Doctors_office",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[19].begin(); }],
});

Game.Scenes.FC[19] = new Scene({
  text: `
    Так прошло несколько дней моего пребывания в больнице. Меня не покидала надежда  в скором времени вернуться в свой мир, однако я все еще была непрошенным гостем эпохи Теслы. 
    <p>Разбитая, поломанная. От отчаяния хотелось выть, сбежать - все, лишь бы не видеть эти белые стены.
            `,
  background: "Backgrounds/Doctors_office",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[20].begin(); }],
});

Game.Scenes.FC[20] = new Scene({
  text: `
    Были и позитивные моменты. К примеру, меня часто навещал Роберт. С цветами, радушной улыбкой. Мы не особо разговаривали, но я видела его стремление поддержать меня в трудный момент.
    <p>Даже Тесла приходил ко мне. В один из дней он сказал: 
            `,
  background: "Backgrounds/Doctors_office",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[25].begin(); }],
  condition: function (){
    if(Game.Stats.Nicola.get>=1){
      this.buttonaction[0] = () => { Game.Scenes.FC[21].begin(); }
    }

    if(Game.Stats.Nicola.get<=0){
      this.buttonaction[0] = () => { Game.Scenes.FC[25].begin(); }
    }
  }
});

Game.Scenes.FC[21] = new Scene({
  text: `
    - Катарина, я хотел подарить тебе кое-что, в качестве извинений, и моей искренней признательности нашей дружбы. 
    <p>Он протянул мне небольшой серебрянный крестик с длинной цепочкой.
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[22].begin(); }],
});

Game.Scenes.FC[22] = new Scene({
  text: `
    - Никола, я не могу принять…
    <p>- Брось, просто возьми, без лишних слов, - он не спеша вложил в мою ладонь вещицу и положил свою руку поверх моей. - Пусть он защитит тебя.  
    <p>- Спасибо, Никола, я буду беречь это.
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => {
    Game.Scenes.FC[201].begin();
    Game.message('Благодаря хорошим отношениям с Теслой, вы узнаете его все лучше.');
    Game.Stats.Golden_Cross.add(1);
    Game.Achievements.Golden_Cross.unlock();
  }],
});

Game.Scenes.FC[201] = new Scene({
  text: `
    Он улыбнулся и произнес: 
    <p>- Я надеюсь, что тебе, как и мне однажды, Бог покажет нужные знаки. Но не забывай, что нас лишь направляют, все остальное зависит от тебя. Ты находишь свой путь, но не забываешь наставлений Всевышнего. 
    <p>“Все это довольно неожиданно и немного странно… Но его семья… я читала про их набожность.” 
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[25].begin(); }],
  condition: function () {
    if(Game.Stats.Nicola.get>=2){
      this.buttonaction[0] = () => { Game.Scenes.FC[23].begin(); }
    }

  }
});

Game.Scenes.FC[23] = new Scene({
  text: `
    - Я бы также хотел выразить тебе признательность за интерес к моим трудам и исследованиям. И чтобы тебе не было скучно, я принес несколько своих дневников с любопытными заметками. Надеюсь, ты оценишь. 
    <p>- Я с удовольствием!
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => {
    Game.Scenes.FC[24].begin();
    Game.message('Ваши знания крепчают.');
    if(Game.Stats.Study.get<=4){Game.Stats.Study.add(1); }}
    ],
});

Game.Scenes.FC[24] = new Scene({
  text: `
    Никола вручил мне свои записи. 
    <p>“Не верю своим глазам, это результат моих выборов? Его доверие?”
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[25].begin(); }],
});

Game.Scenes.FC[25] = new Scene({
  text: `
    - Катарина, еще раз прости меня, все произошло так стремительно, - Никола выглядел поникшим. - Проклятье, куда катится наш мир…
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[26].begin(); }],
});

Game.Scenes.FC[26] = new Scene({
  text: `
    Он часто извинялся, практически в каждый свой визит. Мне же оставалось лишь натягивать улыбку, чтобы успокаивать его. В конце концов, здесь действительно нет его вины. Если уж и стоит винить кого-то, то только меня.
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[27].begin(); }],
});

Game.Scenes.FC[27] = new Scene({
  text: `
    Прошла еще неделя. Долгая. Мучительная. Я не понимала, почему не могу вернуться в свой мир: к своим друзьям, к своей семье. 
    Я была готова даже стать самой прилежной ученицей, слушать нотации профессора Нэйтана, лишь бы ни секунды больше не проводить здесь, во всей этой гнетущей обстановке.
            `,
  background: "Backgrounds/Doctors_office",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[28].begin(); }],
});

Game.Scenes.FC[28] = new Scene({
  text: `
    В отчаянии я попросила Роберта как-нибудь уговорить врачей на продолжение лечения дома. Когда он вернулся, на следующий день, я уже сидела на кушетке в ожидании заветных слов.
            `,
  background: "Backgrounds/Doctors_office",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[29].begin(); }],
});

Game.Scenes.FC[29] = new Scene({
  text: `
    - По твоей просьбе я убедил доктора выписать тебя раньше назначенного срока. Но он взял с меня слово, что я прослежу за тем, чтобы ты соблюдала режим и не забывала принимать лекарства. Поедем в нашу квартиру и спокойно поговорим. 
    <p>Я благодарно кивнула.
    <p>“Не верю, что это наконец-то закончилось…”
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[30].begin(); }],
});

Game.Scenes.FC[30] = new Scene({
  text: `
   Вещей у меня с собой особо не было, поэтому собралась я довольно быстро. Роберт взял меня под руку и мы медленно вышли из здания.
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[31].begin(); }],
});

Game.Scenes.FC[31] = new Scene({
  text: `
   Солнце слепило, а свежий воздух дурманил разум. 
   <p>Нас уже ожидал небольшой экипаж и не слишком терпеливый кучер. Когда мы сели внутрь, я по-настоящему расслабилась, радуясь, что мне удалось сменить обстановку.
   <p>“Хоть так. Раз не могу вернуться, то хотя бы больше не буду чувствовать запах лекарств, слушать злобных медсестер…”
            `,
  background: "Backgrounds/Carete",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[32].begin(); }],
});

Game.Scenes.FC[32] = new Scene({
  text: `
   Транспорт медленно тронулся, однако из-за небольшой тряски и нестабильного самочувствия, я вдруг ощутила характерную сонливость. 
    <p>Я:
            `,
  background: "Backgrounds/Carete",
  buttontext: ['Облокотилась на окно','Облокотилась на плечо Роберта'],
  buttonaction: [
    () => { Game.Scenes.FC[33].begin(); },
    () => { Game.Scenes.FC[35].begin(); },
  ],
});

Game.Scenes.FC[33] = new Scene({
  text: `
   Положив голову на прохладное стекло, мне удалось немного вздремнуть. Погружаясь в сон, я взглянула на Роберта. Мужчина сидел, закинув ногу на ногу, читал газету и не беспокоил меня.
            `,
  background: "Backgrounds/Carete",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[34].begin(); }],
});

Game.Scenes.FC[34] = new Scene({
  text: `
   Сны были очень тревожными. Ранее пережитое потрясение преследовало меня и уже глубоко проникло в самые недра подсознания. Каждый раз закрывая глаза, мне казалось, что я вновь попаду в этот темный подвал и на этот раз мне никто не поможет.
            `,
  background: "Backgrounds/Carete",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[39].begin(); }],
});

Game.Scenes.FC[35] = new Scene({
  text: `
   Мне хотелось почувствовать себя защищенной. Я была уверена, что мужчина не будет против. Мы женаты, а значит такая близость для нас должна быть в порядке вещей. 
   <p>Роберт не удивился, напротив, он слегка улыбнулся, будто бы давно ожидая этого жеста от меня.
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[36].begin(); }],
});

Game.Scenes.FC[36] = new Scene({
  text: `
    Он положил руку мне на талию, не отвлекаясь от чтения утренней газеты. Его объятие было довольно сухим, но тем не менее, рядом с ним я чувствовала себя спокойно. 
    <p>Я не надевала “розовые очки”, ведь складывалось ощущение, что все эти прикосновения он делал машинально, не вкладывая особый смысл. 
    <p>“Какие же отношения связывают их с Катариной?”
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[37].begin(); }],
});

Game.Scenes.FC[37] = new Scene({
  text: `
    Роберт был погружен в себя.
    <p>У меня промелькнула мысль: а что если он чувствует вину за произошедшее? Что если во время со своих визитов или сейчас, мужчина просто делает то, что должен?
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[38].begin(); Game.message('Роберт всегда вас поддержит'); Game.Stats.Robert.attitude+=1; }],
});

Game.Scenes.FC[38] = new Scene({
  text: `
    Мысли роились у меня в голове. К этому прибавились беспокойные сны, напоминающие мне о недавнем похищении. Однако присутствие Роберта не дало мне окончательно погрузиться в тот самый пережитый ужас. Остаток пути прошел в относительном спокойствии.
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[39].begin(); }],
});

Game.Scenes.FC[39] = new Scene({
  text: `
    Я не следила за временем и понятия не имела сколько мы уже находимся в пути. Едва проснувшись, я попыталась разглядеть новые для меня здания и людей. Любопытство играло во мне, однако организм продолжал стоять на своем и меня клонило в сон.
            `,
  background: "Backgrounds/Carete",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[40].begin();}],
});

Game.Scenes.FC[40] = new Scene({
  text: `
    Вскоре экипаж остановился. Я самостоятельно попыталась встать, но Роберт остановил меня. Он подал мне руку и помог выбраться из транспорта. Всю дорогу к дому мой супруг не отпускал меня, помогая держать равновесие. Так, мы медленными шажками стали подниматься в квартиру.
            `,
  background: "Backgrounds/Carete",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[41].begin();}],
});

Game.Scenes.FC[41] = new Scene({
  text: `
    Мы вошли в светлую и просторную гостинную. Без сомнения это была богато обставленная квартира, однако в ней не нашлось места излишнему пафосу вроде выставления различных золотых предметов на видные места с целью показать свой высокий статус.
    <p>“Все белое и уютное… Ощущение, что это не особо вяжется с образом Роберта. Катарина постаралась?”
            `,
  background: "Backgrounds/Katarina_Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[42].begin();}],
});

Game.Scenes.FC[42] = new Scene({
  text: `
    Роберт усадил меня на диван и принес согревающий напиток. Сев рядом, мужчина проговорил: 
    <p>- Ты что-нибудь вспомнила за то время, которое провела в больнице? 
    <p>Что мне было ответить? Ведь я действительно не знала ничего о Роберте или об этих монстрах. 
    <p>“Надо продолжать делать вид, что от шока я потеряла часть воспоминаний. Мне нужна эта информация, пусть расскажет мне все от начала до конца.”
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[43].begin();}],
});

Game.Scenes.FC[43] = new Scene({
  text: `
    - Нет, я ничего не помню. Объясни мне пожалуйста, что здесь происходит. 
    <p>Роберт долго собирался с мыслями, а затем вздохнув, проговорил:
    <p>- Тебя зовут Катарина, ты моя, скажем так, ненастоящая жена. Увлекаешься театральным искусством…
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[44].begin();}],
});

Game.Scenes.FC[44] = new Scene({
  text: `
    - Погоди что? - мне пришлось перебить собеседника, так как озвученная информация не укладывалась у меня в голове. - Что значит “ненастоящая”? 
    <p>- Мы заключили взаимовыгодный брак. Для поддержания социального статуса и отведения ненужных глаз, мы лишь играем роль супругов. 
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[45].begin();}],
});

Game.Scenes.FC[45] = new Scene({
  text: `
    - Но зачем…? - в голове будто бы сам собой пришел нужный ответ. 
    <p>Ты: 
            `,
  background: "Persons/Robert",
  buttontext: ['Занимаешься опасным бизнесом', 'Выслеживаешь монстров', 'Работаешь в полиции'],
  buttonaction: [
    () => { Game.Scenes.FC[46].begin(); Game.message('Вы сделали неверное предположение');},
    () => { Game.Scenes.FC[47].begin(); Game.message('Ваше предположение оказалось верным'); Game.Stats.Robert.attitude+=1; Game.Achievements.Guessed.unlock();},
    () => { Game.Scenes.FC[48].begin(); Game.message('Вы сделали неверное предположение')},
  ],
});

Game.Scenes.FC[46] = new Scene({
  text: `
    - Наверняка твоя работа связана с криминалом. И чтобы не вызывать лишних подозрений у посторонних, ты играешь роль примерного мужа, так? 
    <p>- Не совсем, - Роберта, казалось, позабавил мой вывод.
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[49].begin();}],
});

Game.Scenes.FC[47] = new Scene({
  text: `
    “Это самый логичный вывод. Он ни разу не удивлялся, когда я упоминала существ, к тому же лично грозился разобраться с ними.”
    <p>- Ты убиваешь этих монстров, так? И чтобы не вызывать лишних подозрений у посторонних, ты играешь роль примерного мужа…
    <p>Роберт улыбнулся, утвердительно кивнув. 
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[49].begin();}],
});

Game.Scenes.FC[48] = new Scene({
  text: `
    - Наверняка ты какой-нибудь детектив, выслеживающий всяких мафиози. И чтобы не вызывать лишних подозрений у посторонних, ты играешь роль примерного мужа, так? 
    <p>- Не совсем, - Роберта, казалось, позабавил мой вывод.
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[49].begin();}],
});

Game.Scenes.FC[49] = new Scene({
  text: `
    - Я предпочитаю, чтобы меня называли охотником. Это слово максимально передает смысл моей деятельности. 
    <p>- Что им нужно? 
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[50].begin();}],
});

Game.Scenes.FC[50] = new Scene({
  text: `
    - Я не располагаю такими сведениями. Эта история, кажется, длится не одно столетие. Возможно, это как-то связано с их так называемой “матерью”. - Роберт погрузился в рассуждения. - Они могли произойти от нее. Но тогда каким образом? Или это некогда бывшие люди, которые подверглись опытам? Я пытаюсь это выяснить. 
    <p>“Ужасно… Я думала, такое может быть только в фильмах!”
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[51].begin();}],
});

Game.Scenes.FC[51] = new Scene({
  text: `
    - А при чем тут я? Им что-то нужно от тебя и они хотели использовать меня для того, чтобы ты был более сговорчивым? Хотя нет, - еще раз вспомнив произошедшее, я невольно вздрогнула. - Я кое-что припоминаю, мужчина, что был там. Он сказал, что им нужна моя кровь… и про восстановление своего рода они тоже упоминали. Я как-то связана с этим, Роберт?
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[52].begin();}],
});

Game.Scenes.FC[52] = new Scene({
  text: `
    Поведение Роберта заметно переменилось, он подошел ко мне почти вплотную и сказал: 
    <p>- Расскажи все, что помнишь!
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[53].begin();}],
});

Game.Scenes.FC[53] = new Scene({
  text: `
    Роберт незаметно для себя повысил голос, а его взгляд стал выражать неподдельный интерес к моим рассуждениям. Словно он вот-вот узнает ответ на давно мучавшие его вопросы. 
    <p>Я выложила все, что так долго пыталась забыть: шприц, монстр, загадочный человек, заточение. Страшные картинки снова замелькали, но я старалась держать себя в руках, ведь без этой информации мы не сможем продвинуться дальше в понимании сложившейся ситуации.
            `,
  background: "Backgrounds/Katarina_Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[210].begin();}],
});

Game.Scenes.FC[210] = new Scene({
  text: `
    Мужчина сидел некоторое время в тишине, видимо, обдумывая услышанное. Затем он встал, достал из шкафчика бутылку крепкого алкоголя и налил немного в два стакана. 
    <p>- Выпей - станет легче.
            `,
  background: "Backgrounds/Katarina_Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[53].begin();}],
  condition: function () {
    if(Game.Stats.DrinkAtParty.get>=1){
      this.buttonaction[0] = () => {Game.Scenes.FC[211].begin();}
    }

    if(Game.Stats.DrinkAtParty.get<=0){
      this.buttonaction[0] = () => {Game.Scenes.FC[212].begin();}
    }

  }
});

Game.Scenes.FC[211] = new Scene({
  text: `
    - Спасибо, это действительно то, что мне нужно. 
    <p>Ничего подобного до этого я не пила. Напиток на вкус был обжигающим, с нотками карамели и каких-то трав. 
    <p>Я ощущала, как плохие мысли отступают.
       `,
  background: "Backgrounds/Katarina_Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[55].begin();}],
});

Game.Scenes.FC[212] = new Scene({
  text: `
    - Нет, спасибо, не думаю, что мне сейчас это нужно. 
    <p>- Как знаешь, а вот я выпью, - сказал Роберт и сделал приличный глоток напитка.
    <p>Мне было достаточно хорошей компании и минутной тишины. Я ощущала, как плохие мысли отступают. 
       `,
  background: "Backgrounds/Katarina_Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[55].begin();}],
});

Game.Scenes.FC[55] = new Scene({
  text: `
    После затяжной паузы я все же решила уточнить: 
    <p>- Так что, Роберт? Что все это значит? 
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[56].begin();}],
});

Game.Scenes.FC[56] = new Scene({
  text: `
    - До этого тебя тоже похищали, - мужчина залпом осушил стакан. - Но тогда ты совсем ничего не помнила. Я сразу же предположил, что эти твари догадались шантажировать меня таким образом. После твоего спасения, я строго-настрого запретил выходить куда-либо без сопровождения, поэтому в случае моего отсутствия, за тобой любезно согласился присмотреть Никола. 
    <p>- Но он не знал подробностей?
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[57].begin();}],
});

Game.Scenes.FC[57] = new Scene({
  text: `
   - Верно. Меньше знаешь, крепче спишь. 
    <p>- И что ты теперь думаешь? Про кровь, про этого человека?
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[58].begin();}],
});

Game.Scenes.FC[58] = new Scene({
  text: `
   - Ты вполне можешь являться важным звеном в этой цепочке, Катарина. Иначе я не могу придумать ни одной другой гипотезы, почему они так одержимы тобой, - он со всей серьезностью смотрел мне в глаза. - Если они сейчас так просто тебя отпустили, значит проверяют свою теорию. А тот человек - их лидер. Видел его пару раз. Мерзкий тип, умный. Так просто в ловушки не попадается. 
    <p>- Во что же я влипла…
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[59].begin();}],
});

Game.Scenes.FC[59] = new Scene({
  text: `
   Роберт сел передо мной на колени и сказал: 
    <p>- Ты никогда так серьезно не спрашивала об этом. Даже после того инцидента. Что изменилось? 
    <p>“Катарина не воспринимала это всерьез? Не понимаю. Ее жизнь висит на волоске, как можно быть такой беспечной.”
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[60].begin();}],
});

Game.Scenes.FC[60] = new Scene({
  text: `
   - Все зашло слишком далеко, под угрозой была моя жизнь. 
    <p>- Ты изначально знала, на что соглашаешься. Наш контракт. Я говорил об этом ранее. 
    <p>“Стоило лишь догадываться о подробностях. Все риски были обозначены. С моей стороны было глупостью давить на жалость. Но все-таки, мотивация Роберта на замужество мне понятна, но в чем же мотивация Катарины? Неужели она руководствовалась любовью?”
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[61].begin();}],
});

Game.Scenes.FC[61] = new Scene({
  text: `
    - Ты прав, - я покорно приняла ситуацию. 
    <p>Роберт перевел взгляд на часы, встал и стал собирать некоторые вещи.  
    <p>- Мне пора на встречу, будь здесь и отдыхай. 
    `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[62].begin();}],
});

Game.Scenes.FC[62] = new Scene({
  text: `
    Мне совершенно не хотелось оставаться сейчас одной. Особенно после всего этого неприятного разговора. Поэтому я набралась смелости и спросила: 
    <p>- А ты не можешь перенести встречу? 
    <p>Роберт был удивлен моему вопросу. Видимо, до этого Катарина молча соглашалась с его постоянными разъездами и своим одиночеством.
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[65].begin();}],
});

Game.Scenes.FC[65] = new Scene({
  text: `
    - Нет. Мне нужно увидеться с братом. Это слишком важно, - мужчина даже не смотрел на меня, а просто суетился около входной двери. 
    <p>От его заботливости будто бы ни осталось и следа. 
    <p>“Так это и есть настоящий Роберт? Холодный, отстраненный, сосредоточенный лишь на своей работе?”
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[66].begin();}],
  condition: function () {
    if(Game.Stats.TryToEscape.get>=1) {
      this.buttonaction[0] = () => { Game.Scenes.FC[66].begin();}
    }
    if(Game.Stats.TryToEscape.get<=0) {
      this.buttonaction[0] = () => { Game.Scenes.FC[69].begin();}
    }
  }
});

Game.Scenes.FC[66] = new Scene({
  text: `
    - Кстати, - он остановился перед выходом. - Я нашел это на полу рядом с тобой, может, он твой, не знаю. Решай сама. 
    <p>Мужчина протянул мне тот самый нож, который служил мне защитой от монстра. 
    <p>“Эта вещь напоминание о том, что было. Нужен ли он мне?”
    <p>Я: 
       `,
  background: "Backgrounds/Katarina_Room",
  buttontext: ['Оставила нож', 'Выбросила нож'],
  buttonaction: [
    () => {
    Game.Scenes.FC[67].begin();
    Game.message('Вы решили оставить нож себе');
    Game.Stats.Knife.add(1);
    Game.Achievements.KeepWeapon.unlock();
    },
    () => { Game.Scenes.FC[68].begin();},
  ],
});

Game.Scenes.FC[67] = new Scene({
  text: `
    “Это должно закалить меня. Пусть служит мне каким-никаким оружием”. 
    <p>Я спрятала его в свою сумку, с которой всегда ходила. 
       `,
  background: "Backgrounds/Katarina_Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[69].begin();}],
});

Game.Scenes.FC[68] = new Scene({
  text: `
    “Мне это ни к чему. Не хочу все заново вспоминать. К тому же от этого оружия не будет никакого толку.”
    <p>Я положила его на верхнюю полку книжного шкафа и благополучно постаралась забыть.
       `,
  background: "Backgrounds/Katarina_Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[69].begin();}],
});

Game.Scenes.FC[69] = new Scene({
  text: `
    Когда Роберт ушел, я прилегла на кровать и проспала до самого вечера. 
    <p>Охотник вернулся еще более хмурым, чем был до этого. Он сел на кровать рядом со мной и сказал:
    <p>- Катарина, я понимаю, что ты еще не выздоровела, но вынужден сообщить о приеме, на котором мы обязаны появиться сегодня. 
    <p>Еще сонным разумом я плохо понимала происходящее.
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[70].begin();}],
});

Game.Scenes.FC[70] = new Scene({
  text: `
    - Что за прием? 
    <p>- Как ты уже поняла, моя основная деятельность - это искать этих тварей и истреблять. Однако в обычной жизни я известный бизнесмен, который инвестирует в потенциально-прибыльные проекты. И сегодня я обязан присутствовать, так как некоторые гости будут представлять свои наработки. И я не могу появиться там без своей супруги, “они” точно заподозрят что-то.
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[71].begin();}],
});

Game.Scenes.FC[71] = new Scene({
  text: `
    От волнения сердце застучало быстрее. 
    <p>“Прием? Но как мне там вести себя? Как же хочется просто взять и отказаться.”    
    <p>В реальности я лишь ограничилась коротким кивком. Затем пришло еще одно осознание, которое я невольно озвучила вслух. 
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[72].begin();}],
});

Game.Scenes.FC[72] = new Scene({
  text: `
    - Ох, что же мне надеть… - я медленно встала и подошла к шкафу, где висела одежда. 
    <p>- Не слишком наряжайся, это не такое уж торжественное мероприятие, и времени у нас не так много, - Роберт скрестил руки, пристально наблюдая за мной.
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[77].begin();}],
  condition: function () {
    if(Game.Stats.BrokenHand.get>=1) this.buttonaction[0] = () => { Game.Scenes.FC[73].begin();}
    if(Game.Stats.BrokenHand.get<=0) this.buttonaction[0] = () => { Game.Scenes.FC[77].begin();}
  }
});

Game.Scenes.FC[73] = new Scene({
  text: `
    - Ничего что… - я показала ему свою руку. 
    <p>- Не говори глупостей. Один лишь твой приход выставит тебя как героиню, которая преодолела себя и пришла на мероприятие, что, безусловно, только поднимет наш престиж.
    <p>- Но что мне ответить, если вдруг кто-то спросит о причине перелома?
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[215].begin();}],
});

Game.Scenes.FC[215] = new Scene({
  text: `
    - Не думаю, что это может быть кому-то интересно, - он равнодушно пожал плечами. - Можешь выдумать падение и сослаться на свою неосторожность. 
    <p>“Помощи от него не дождешься. Буду выкручиваться по ходу. А теперь лучше вернуться к выбору одежды.”
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[74].begin();}],
});

Game.Scenes.FC[74] = new Scene({
  text: `
    Я выбрала приталенную белую блузку и пышную синюю юбку. Одной рукой было довольно сложно управляться, поэтому вмешался Роберт:
    <p>- Я помогу. 
    <p>- Но ведь… 
    <p>- Что я там не видел… К тому же, мы опаздываем, так будет быстрее, - он принялся раздевать меня, словно делал это уже не раз.
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[75].begin();}],
});

Game.Scenes.FC[75] = new Scene({
  text: `
    Я осталась в одном нижнем белье. Благо в эту эпоху тело не было таким оголенным, но я все равно чувствовала неловкость. Мои щеки покраснели, я старалась не смотреть на мужчину.
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[76].begin();}],
});

Game.Scenes.FC[76] = new Scene({
  text: `
    Роберт постепенно начал одевать меня, словно куклу. Даже невольно касаясь интимных частей тела, он оставался беспристрастным. 
    <p>- Извини, если был чересчур настойчив, - он покинул комнату и я закончила сборы.
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[78].begin();}],
});

Game.Scenes.FC[77] = new Scene({
  text: `
    Я выбрала приталенную белую блузку и пышную синюю юбку. Взяв все необходимое, я ушла в другую комнату, где смогла успешно переодеться. 
    <p>“Хорошо что не пришлось возиться с каким-нибудь корсетом…” 
    <p>Покрутившись перед зеркалом, я удовлетворенно кивнула и вышла к Роберту.
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[78].begin();}],
});

Game.Scenes.FC[78] = new Scene({
  text: `
    - Как и всегда, изумительно, Катарина, - несмотря на свою отстраненность, мужчина старался поддерживать имидж джентльмена. 
    <p>- Благодарю. 
    <p>- За нами уже приехали, если ты готова, стоит выходить. 
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[80].begin();}],
  condition: function () {
    if(Game.Stats.Knife.get>=1) this.buttonaction[0] = () => { Game.Scenes.FC[79].begin(); Game.Stats.Knife.set(0);}
    if(Game.Stats.Knife.get<=0) this.buttonaction[0] = () => { Game.Scenes.FC[80].begin();}
  }
});

Game.Scenes.FC[79] = new Scene({
  text: `
    Во время наших сборов, Роберт подчеркивал, что мне нет нужды волноваться о своей безопасности. Поэтому я решила не брать свое холодное оружие и благополучно оставила его дома.
       `,
  background: "Backgrounds/Katarina_Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[80].begin();}],
});

Game.Scenes.FC[80] = new Scene({
  text: `
    Перед выходом Роберт что-то убрал во внутренний карман пиджака. Я заметила это, но не подала вида. Спустившись, мы сели в экипаж и отправились на прием. 
       `,
  background: "Backgrounds/Katarina_Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[81].begin(); Game.Sounds.play('Music', 'Ball'); Game.Stats.Robert.add(0); AndroidApp ('showAd');}],
});

Game.Scenes.FC[81] = new Scene({
  text: `
    Экипаж привез нас к роскошному особняку. Сад, ухоженные тропинки, просторные помещения с живым оркестром, играющим классическую музыку. 
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[82].begin();}],
});

Game.Scenes.FC[82] = new Scene({
  text: `
    Место напоминало замок, где множество гостей вели светские беседы. Все они были одеты богато, будто бы нарочно показывали свой статус через дорогие украшения и платья.
    <p>На их фоне мне казалось, что я выгляжу крайне нелепо. Однако я старалась идти спокойно и с высоко поднятой головой. К тому же близость Роберта придавала мне уверенности. 
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[83].begin();}],
});

Game.Scenes.FC[83] = new Scene({
  text: `
    - Катарина, не волнуйся, среди такого количества гостей, с тобой ничего не может случиться, - прошептал мне на ухо мужчина, попутно приветствуя гостей. 
    <p>“Что это значит…?”
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[84].begin();}],
});

Game.Scenes.FC[84] = new Scene({
  text: `
    - Зачем ты мне это говоришь? 
    <p>- Ты выглядишь крайне озадаченно, это не может не привлечь внимания, - Роберт был прав. Помимо страха за свою жизнь, я действительно ощущала себя не в своей тарелке.  
    <p>- Я постараюсь.
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[85].begin();}],
});

Game.Scenes.FC[85] = new Scene({
  text: `
    Мужчина кивнул и мы двинулись в центр зала.
    <p>Я улыбалась, стараясь уделить должное внимание каждому встречному. На мое счастье, все были приветливы и не доставали надоедливыми расспросами. 
    <p>Где-то к середине приема, я начала ощущать, что мне становится скучно. Многие пары танцевали, кто-то разговаривал с бокалом игристого. 
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[86].begin();}],
});

Game.Scenes.FC[86] = new Scene({
  text: `
    “Даже телефона нет при себе, чтобы сыграть в игру какую-нибудь и отвлечься…”
    <p>К тому же, Роберту пришлось отлучиться. Перед своим уходом, он напомнил, что в конце вечера предстоят выступления претендентов. Мужчина сделал акцент на том, что мне определенно не стоит пропускать это событие. 
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[87].begin();}],
});

Game.Scenes.FC[87] = new Scene({
  text: `
    - Я должен пообщаться с гостями в более приватной обстановке. Присядь на диванчик, выпей шампанского. В конце концов пообщайся с другими женщинами. 
    <p>От чего-то меня захлестнула обида. Почему он постоянно уходит, когда ему вздумается, совершенно игнорируя мое состояние? 
    <p>“Я же здесь только ради него.”
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[88].begin();}],
});

Game.Scenes.FC[88] = new Scene({
  text: `
    - Роберт, - я поймала его за рукав пиджака. - Почему ты вечно норовишь бросить меня? Я не хочу оставаться здесь одна.
    <p>Мужчина сильно удивился моему жесту. Он аккуратно взял мою руку и сказал: 
    <p>- Прости, раньше тебе нравилось бывать на приемах. Раскрываться в общении с другими. Я же здесь чисто по деловым вопросам и не могу быть с тобой постоянно.
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[200].begin();}],
});

Game.Scenes.FC[200] = new Scene({
  text: `
    Такое откровение заставило меня немного смягчиться по отношению к Роберту. 
    <p>“И действительно, перед ним же стоит не $Имя Игрока$, а Катарина. Девушка, к которой он привык, знал ее повадки, но не мои.”
    <p>Мужчина ушел, а я была предоставлена самой себе. 
    <p>“Чем бы заняться…?”
       `,
  background: "Backgrounds/Ball",
  buttontext: ['Пойти на террасу', 'Дождаться Роберта', 'Прогуляться по саду'],
  buttonaction: [
    () => {Game.Scenes.FC[89].begin();},
    () => {Game.Scenes.FC[104].begin();},
    () => {Game.Scenes.FC[124].begin(); Game.Stats.MetAntagonist.add(1);},
  ],
});

Game.Scenes.FC[89] = new Scene({
  text: `
    В помещении становилось очень душно, поэтому я решила сходить подышать свежим воздухом.
    <p>Терраса была просторной, с небольшими столиками, за одним из которых беседовало несколько знатных дам.
       `,
  background: "Backgrounds/Balcony",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[90].begin();}],
});

Game.Scenes.FC[90] = new Scene({
  text: `
    Я поздоровалась с ними и заняла свой тихий уголок вдали от них, наслаждаясь открывшимся видом. 
    <p>Прохладный воздух щекотал мое лицо, придавая чувство свежести и легкости. 
    <p>“Я определенно не создана для таких мероприятий. Немного завидую Катарине в этом плане.”
       `,
  background: "Backgrounds/Balcony",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[91].begin();}],
});

Game.Scenes.FC[91] = new Scene({
  text: `
    Однако мне были не до конца понятны ее мотивы. Она так просто подвергает себя опасности, ради чего? Влюбленность в Роберта? Он, конечно, хорош собой, но вряд ли это настолько весомый аргумент…
    <p>Через некоторое время на террасу пришел один из участников мероприятия. 
    <p>- Катарина, не ожидал тебя здесь увидеть.
       `,
  background: "Backgrounds/Balcony",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[92].begin();}],
});

Game.Scenes.FC[92] = new Scene({
  text: `
    Это был Тесла. Он выглядел немного взволнованно, но при этом держал голову высоко, будто бы назло всем обстоятельствам. 
    <p>- Никола, я не видела тебя на приеме… 
    <p>- Я пришел совсем недавно. Мне не по душе все эти мероприятия. Пустая болтовня, танцы. Я здесь по другой причине.
       `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[93].begin();}],
});

Game.Scenes.FC[93] = new Scene({
  text: `
    - Ты, я полагаю, в числе выступающих? 
    <p>- Все верно. 
    <p>Наступила неловкая пауза. Я до сих пор смутно помню наше взаимодействие с Николой, однако сейчас я точно уверена, что все реально. Я не схожу с ума, я действительно нахожусь в прошлом. 
    <p>И мне: 

       `,
  background: "Persons/Nicola",
  buttontext: ['Нравится компания Теслы', 'Не нравится компания Теслы'],
  buttonaction: [
    () => { Game.Scenes.FC[94].begin();},
    () => { Game.Scenes.FC[100].begin();},
  ],
});

Game.Scenes.FC[94] = new Scene({
  text: `
    Его общение, манера поведения - все это привлекало меня. Я бы хотела больше времени проводить с ним. В отличие от того же Роберта, он относится ко мне более тактично. Хотя и своих проблем ему хватает. 
    <p>- Никола, спасибо, - я вдруг ощутила необходимость поделиться своими искренними чувствами. - Ты действительно удивительный человек. 
       `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[95].begin();}],
});

Game.Scenes.FC[95] = new Scene({
  text: `
    Тесла был крайне удивлен моим словам. На его щеках показался красный румянец . 
    <p>- Катарина, чего это ты вдруг… 
    <p>- Просто захотелось сказать. 
       `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[96].begin();}],
  condition: function () {
    if(Game.Stats.Nicola.get>=1){
      this.buttonaction[0] = () => { Game.Scenes.FC[96].begin(); }
    }

    if(Game.Stats.Nicola.get<=0){
      this.buttonaction[0] = () => { Game.Scenes.FC[98].begin(); }
    }

  }
});

Game.Scenes.FC[96] = new Scene({
  text: `
    - Ты удивительная девушка, я горд и безмерно счастлив, что имею честь быть знакомым с тобой. 
    <p>Никола радушно улыбнулся и развел руки в стороны, приглашая меня в свои объятия. Я прильнула к его груди и почувствовала размеренное дыхание. Он не сжимал меня сильно, напротив, легко и непринужденно. Мне удалось уловить аромат, исходящий от него. 
       `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[97].begin(); Game.Stats.Nicola.add(1); Game.message('Вы дорогой человек для Николы')}],
});

Game.Scenes.FC[97] = new Scene({
  text: `
    “Запах сигар, алкоголя…”
    <p>Впервые я почувствовала себя хорошо в этом времени. Спокойно, безо всяких напрягов. 
       `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[103].begin();}],
  condition: function () {
    if(Game.Stats.BrokenHand.get>=1){
      this.buttonaction[0] = () => { Game.Scenes.FC[101].begin();}
    }

    if(Game.Stats.BrokenHand.get<=0){
      this.buttonaction[0] = () => { Game.Scenes.FC[103].begin();}
    }
  }
});

Game.Scenes.FC[98] = new Scene({
  text: `
    - Спасибо, Катарина, но это лишнее. 
    <p>- Почему ты отталкиваешь меня? Я же просто выражаю тебе признательность…
       `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[99].begin();}],
});

Game.Scenes.FC[99] = new Scene({
  text: `
    - Не думаю, что Роберт оценит весь наш диалог и встречу наедине. 
    <p>Спорить было бессмысленно, Никола слишком беспокоится о чести и прочих нюансах этого времени. 
       `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[103].begin();}],
  condition: function () {
    if(Game.Stats.BrokenHand.get>=1){
      this.buttonaction[0] = () => { Game.Scenes.FC[101].begin();}
    }

    if(Game.Stats.BrokenHand.get<=0){
      this.buttonaction[0] = () => { Game.Scenes.FC[103].begin();}
    }
  }
});

Game.Scenes.FC[100] = new Scene({
  text: `
    Мне было сложно мириться с его характером. К сожалению, этот человек был себе на уме и я не могла даже подобрать какой-нибудь фразы, чтобы продолжить диалог. 
       `,
  background: "Backgrounds/Balcony",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[103].begin();}],
  condition: function () {
    if(Game.Stats.BrokenHand.get>=1){
      this.buttonaction[0] = () => { Game.Scenes.FC[101].begin();}
    }

    if(Game.Stats.BrokenHand.get<=0){
      this.buttonaction[0] = () => { Game.Scenes.FC[103].begin();}
    }
  }
});

Game.Scenes.FC[101] = new Scene({
  text: `
    - Я все хотел поинтересоваться, как рука? Не сильно болит?
    <p>- Нет, что ты, все в порядке. 
    <p>- Это отличные новости. Ты героиня, Катарина. Не каждая девушка сможет вот так вот расхаживать после всего ранее пережитого. 
    <p>- Это мой долг, я не могу подвести Роберта. 
       `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[102].begin();}],
});

Game.Scenes.FC[102] = new Scene({
  text: `
    Конечно, это не было в моих интересах. Но для поддержания роли, порой, приходилось говорить то, что от меня ожидали услышать.
       `,
  background: "Backgrounds/Balcony",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[103].begin();}],
});

Game.Scenes.FC[103] = new Scene({
  text: `
    Мы немного постояли в тишине, просто наслаждаясь вечерней прохладой и приятным видом. А затем вернулись на мероприятие. 
       `,
  background: "Backgrounds/Balcony",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[162].begin();}],
});

Game.Scenes.FC[104] = new Scene({
  text: `
    Я решила никуда не ходить и просто подождать своего спутника на диване. 
    <p>“Уверена, Роберт вернется быстрее, после сказанных мною слов.” 
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[105].begin();}],
});

Game.Scenes.FC[105] = new Scene({
  text: `
    Несколько раз ко мне подсаживались знатные дамы, надеясь завести разговор. Но так как я не была из этой эпохи, мне было трудно поддерживать с ними диалог. Поэтому в скором времени я вновь наслаждалась только своим обществом.
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[106].begin();}],
});

Game.Scenes.FC[106] = new Scene({
  text: `
     Роберт не заставил себя долго ждать. Видя, как я скучающе сижу, он подсел ко мне и сказал:
    <p>- Обычно ты более активная, Катарина. Все еще плохо себя чувствуешь?
    <p>- Может и так, - равнодушно ответила я. 
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[107].begin();}],
});

Game.Scenes.FC[107] = new Scene({
  text: `
    Мужчина сидел ровно, попивая шампанское, как подобает человеку со статусом в рамках данного мероприятия. Он долгое время смотрел на зал, немного отстраненным взглядом. Затем обернувшись ко мне, спросил:
    <p>- Потанцуем? 
    <p>В центр помещения стали выходить гости, ожидая когда же музыканты начнут свое выступление. 
    <p>Я: 
       `,
  background: "Persons/Robert",
  buttontext: ['Согласилась', 'Отказалась'],
  buttonaction: [
    () => { Game.Scenes.FC[108].begin(); Game.Stats.DanceWithRobert.add(1);},
    () => { Game.Scenes.FC[119].begin();},
  ],
});

Game.Scenes.FC[108] = new Scene({
  text: `
     Не было причин отказываться. В конце концов я его супруга, а за вечер не произошло ничего интересного, поэтому немного развеяться было хорошей идеей.
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[114].begin();}],
  condition: function () {
    if(Game.Stats.BrokenHand.get>=1){
      this.buttonaction[0] = () => { Game.Scenes.FC[109].begin(); }
    }

    if(Game.Stats.BrokenHand.get<=0){
      this.buttonaction[0] = () => { Game.Scenes.FC[114].begin(); }
    }

  }
});

Game.Scenes.FC[109] = new Scene({
  text: `
     Роберт был очень осторожен. Он аккуратно взял меня за талию и вывел в центр зала. 
    <p>Заиграла медленная мелодия. Многие присутствующие просто прижались к друг другу, наслаждаясь приятным звучанием и теплотой своего партнера.
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[110].begin();}],
});

Game.Scenes.FC[110] = new Scene({
  text: `
     Роберт подошел ко мне на довольно близкое расстояние, взял мою неповрежденную руку и стал медленно покачиваться в такт музыке.
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[111].begin();}],
});

Game.Scenes.FC[111] = new Scene({
  text: `
     Я ощущала крепкие и надежные мужские прикосновения. Роберт смотрел только на меня своими голубыми глазами, искренне улыбаясь, не переставая поддерживать.
    <p>Что-то завораживающее было в нем. Несмотря на свою отчужденность, он прекрасно справлялся с ролью примерного и заботливого мужа. Была ли это только игра на публику? Или он что-то испытывал к Катарине?
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[112].begin();}],
});

Game.Scenes.FC[112] = new Scene({
  text: `
     “Мне еще предстоит раскусить его, а пока… Все не так плохо, как могло бы быть. Может, его настроение улучшил алкоголь или ему хочется женского тепла? Но его обходительность в такие моменты заставляет меня смягчиться…”
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[113].begin(); Game.Stats.Robert.add(1); Game.message('Роберт запомнит ваш танец')}],
});

Game.Scenes.FC[113] = new Scene({
  text: `
      Роберт гладил меня по волосам, затем положил подбородок на мою макушку и продолжил медленные покачивания, заставляя меня позабыть обо всех тревогах.
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[121].begin();}],
});

Game.Scenes.FC[114] = new Scene({
  text: `
     Мне хотелось наконец-то выплеснуть накопившуюся энергию. Роберт видел мой азарт, он взял меня за руку и потянул в сторону зала, где танцевало несколько парочек. 
    <p>Заиграла довольно ритмичная музыка, мы с Робертом пустились в пляс, поддаваясь общему игривому настрою. 
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[115].begin();}],
});

Game.Scenes.FC[115] = new Scene({
  text: `
     Держась за руки, мы танцевали как ненормальные: кружились, прыгали, улыбались. В один момент, он обхватил меня за талию и наклонил чуть ли до пола, а затем резко поднял вверх, кружа вокруг себя.
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[116].begin();}],
});

Game.Scenes.FC[116] = new Scene({
  text: `
     Что-то завораживающее было в этом мужчине. Несмотря на свою отчужденность, он прекрасно справлялся с ролью примерного и заботливого мужа. Были ли это только игра на публику? Или он что-то испытывал к Катарине?
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[117].begin();}],
});

Game.Scenes.FC[117] = new Scene({
  text: `
     “Мне еще предстоит раскусить его, а пока… Все не так плохо, как могло бы быть. Может, его настроение улучшил алкоголь или ему хочется женского тепла? Но его обходительность в такие моменты заставляет меня смягчиться…”
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[118].begin(); Game.Stats.Robert.add(1); Game.message('Роберт запомнит ваш танец')}],
});

Game.Scenes.FC[118] = new Scene({
  text: `
      Танец подарил мне только позитивные эмоции. Я абсолютно забыла обо всех тревогах. А сердце стучало быстрее, видя искреннюю улыбку Роберта.
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[121].begin();}],
});

Game.Scenes.FC[119] = new Scene({
  text: `
      Сейчас мне совершенно не хотелось танцевать. Тем более, складывалось ощущение, будто бы я заставляю Роберта возиться со мной.
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[120].begin();}],
});

Game.Scenes.FC[120] = new Scene({
  text: `
      “Не хочу его обременять.”
      <p>- Я не до конца выздоровела, поэтому давай спокойно поговорим о чем-нибудь.
      <p>- Как скажешь, - мужчина допил свой бокал и отставил его в сторону. 
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[121].begin();}],
});

Game.Scenes.FC[121] = new Scene({
  text: `
      Мы с Робертом решили еще немного посидеть на диванах и дождаться финальной части мероприятия. Чтобы не сидеть молча, я решила поинтересоваться: 
      <p>- Тебе нравятся подобные приемы? 
      <p>- Я отношусь к этому как к чему-то вынужденному, вот и все. 
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[122].begin();}],
});

Game.Scenes.FC[122] = new Scene({
  text: `
      “Как всегда исчерпывающе.” 
      <p>- Почему ты выбрал такой вид деятельности? 
      <p>- Я всегда хотел служить во благо народа. Поэтому самым логичным было направить русло моей вечной жизни на борьбу, - мужчина смотрел на меня таким взглядом, будто бы я должна была понять смысл этих слов.
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[123].begin();}],
});

Game.Scenes.FC[123] = new Scene({
  text: `
      “Что он имеет в виду? Ничего не понимаю, почему все вокруг просто не могут ответить прямо.” 
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[162].begin();}],
});

Game.Scenes.FC[124] = new Scene({
  text: `
      Мне была нестерпима компания этих аристократок, к тому же в зале было довольно душно. Я решила выйти прогуляться в сад. 
      <p>“Если Роберт спокойно оставил меня одну, бояться нечего. К тому же территория хорошо охраняется.”
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[125].begin(); Game.Sounds.play('Music','Antagonist'); }],
});

Game.Scenes.FC[125] = new Scene({
  text: `    
    Ночная прохлада действовала успокаивающе. К сожалению, небо заволокло тучами, поэтому звезд не было видно. И все же приятный окружающий вид ухоженного сада действительно впечатлял. Ровно подстриженные растения, чистые дорожки. 
    <p>Внимание привлекал небольшой фонтан, украшенный золотыми элементами.
       `,
  background: "Backgrounds/Garden",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[126].begin();}],
});

Game.Scenes.FC[126] = new Scene({
  text: `    
    Я присела на скамейку, где смогла наконец насладиться тишиной и прохладой. Всматриваясь в темноту, я увидела фигуру, которая лежала на бортике фонтана. Очертаний лица было не различить, лишь отрывистые движения ноги из стороны в сторону.
       `,
  background: "Backgrounds/Garden",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[127].begin();}],
});

Game.Scenes.FC[127] = new Scene({
  text: `    
    “Да, напитков на этом приеме было предостаточно, наверное кому-то поплохело из-за алкоголя? Может стоит подойти?”
    <p>Что мне сделать?
       `,
  background: "Backgrounds/Garden",
  buttontext: ['Остаться сидеть на месте','Подойти к незнакомцу', 'Покинуть сад'],
  buttonaction: [
    () => { Game.Scenes.FC[128].begin();},
    () => { Game.Scenes.FC[131].begin();},
    () => { Game.Scenes.FC[161].begin();},
  ],
});

Game.Scenes.FC[128] = new Scene({
  text: `    
    “Это не мое дело, если кто-то перепил и улегся на фонтан. Все - взрослые люди, нужно уметь себя контролировать.”
       `,
  background: "Backgrounds/Garden",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[129].begin();}],
});

Game.Scenes.FC[129] = new Scene({
  text: `    
    Я продолжила наслаждаться прохладой и тишиной. Через некоторое время мужчина приподнялся и сел на край. Я видела лишь его спину. 
    <p>Затем незнакомец резко встал и увидел меня.
       `,
  background: "Backgrounds/Garden",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[130].begin();}],
});

Game.Scenes.FC[130] = new Scene({
  text: `    
    Мое сердце на секунду остановилось. Это же был он! Тот ублюдок, что похитил меня. 
    <p>Мне ничего не оставалось, кроме как бежать обратно в зал, но похититель был проворнее. 
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[133].begin();}],
});

Game.Scenes.FC[131] = new Scene({
  text: `    
    “А если ему нужна помощь? Я не могу его здесь просто бросить.”
    <p>Я подошла к человеку, и каково было мое удивление, когда ко мне повернулся тот самый ублюдок, который похитил меня и издевался.
       `,
  background: "Backgrounds/Garden",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[132].begin();}],
});

Game.Scenes.FC[132] = new Scene({
  text: `    
    На нем была та же маска, выражение лица довольное понурое. На секунду мне показалось, что я вижу слезу на его щеке. 
    <p>Мужчина резко открыл глаза, увидев меня он расплылся в хитрой улыбке. Я же принялась бежать, однако похититель был проворнее.
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[133].begin();}],
});

Game.Scenes.FC[133] = new Scene({
  text: `    
    Он схватил меня, зажал рукой рот и оттащил обратно к фонтану, усаживая на скамейку. 
    <p>- Катарина, не ожидал, что так скоро снова встречу тебя, - он прошептал мне это на ухо. 
    <p>- Отпусти меня или я буду кричать! - смогла проговорить я, вырвавшись из его хватки.
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[134].begin();}],
});

Game.Scenes.FC[134] = new Scene({
  text: `    
    - Брось, у нас ведь с тобой такая приятная и неожиданная встреча. Мы, конечно, можем уединиться, если ты так хочешь покричать. Но к большому сожалению, мне еще предстоит выступать на сцене.  
    <p>- Зачем ты держишь меня?
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[135].begin();}],
});

Game.Scenes.FC[135] = new Scene({
  text: `    
    - Я всего лишь хочу провести с тобой этот прекрасный вечер, не более. Я обещаю, что не причиню тебе вреда. 
    <p>“Он сумасшедший… То, что он сделал со мной… Как я могу.” 
    <p>- Я ухожу! Отпусти меня.
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[136].begin();}],
});

Game.Scenes.FC[136] = new Scene({
  text: `    
    Я быстро встала, но на этот раз незнакомец был грубее. Он резко опустил меня рядом с собой и уже более злым тоном проговорил: 
    <p>- Я же сказал, сиди рядом. Я не говорил вставать, не говорил идти куда-то. Рядом!
    <p>После этих слов стало совсем не по себе. Этот сумасшедший не осознавал какие-то грани. А что если он убьет меня?
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[137].begin();}],
});

Game.Scenes.FC[137] = new Scene({
  text: `    
    - Послушай, Катарина, если бы ты просто делала то, что я прошу - проблем бы не было… 
    <p>Он замолчал на несколько секунд, а затем сказал:
    <p>- Прости меня, если я где-то делал тебе больно, но ты вынуждаешь меня. 
    <p>- Ты думаешь, я поверю в эту чушь? Засунь эти извинения куда-нибудь подальше!
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[138].begin();}],
});

Game.Scenes.FC[138] = new Scene({
  text: `    
    - Становишься смелее - это похвально, но не путай это со свободой. Ты все еще моя заложница и сидишь здесь со мной только  потому, что “Нашей Матери” пока не выгодна твоя смерть. А само похищение - просто часть ее шутки, не более, - его рука проходилась по моей шее, я старалась отогнать его, но второй рукой он не позволял этого сделать.
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[139].begin();}],
});

Game.Scenes.FC[139] = new Scene({
  text: `    
    - Хватит, остановись, мне неприятны твои прикосновения…
    <p>- Почему? Я же так хочу тебя…
    <p>“Да что с ним не так?”
    <p>- Прекрати этот спектакль… 
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[140].begin();}],
});

Game.Scenes.FC[140] = new Scene({
  text: `    
    Он проигнорировал мою очередную просьбу закончить беседу, достал из-за пазухи флакончик, что используют для хранения духов, и распылил его прямо перед моим носом. 
    <p>- Мне сказали, что люди благодаря этому средству становятся более разговорчивы, может быть и ты сможешь расслабиться. 
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[141].begin();}],
});

Game.Scenes.FC[141] = new Scene({
  text: `    
    Я тут же почувствовала аромат роз с примесью лаванды. 
    <p>“Что происходит?”
    <p>Я попыталась зажмурить нос, не дышать, но мужчина пресек все мои попытки. 
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[142].begin();}],
});

Game.Scenes.FC[142] = new Scene({
  text: `    
    Через некоторое время я ощутила сильное головокружение. Все перед глазами плыло, тело бросало в жар. Мне пришлось расстегнуть верхние пуговицы блузки, иначе бы я сошла с ума от усиливающегося чувства жара.
       `,
  background: "Backgrounds/Garden",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[143].begin();}],
});

Game.Scenes.FC[143] = new Scene({
  text: `    
    - Что ты со мной сделал? - я вдруг почувствовала сильное влечение к этому мужчине, хоть и пыталась сопротивляться навязчивым мыслям. 
    <p>- О, это только начало. Теперь ты наконец можешь расслабиться у меня в руках, - он потянулся своими губами к моим. 
    <p>Я: 
       `,
  background: "Persons/Antagonist",
  buttontext: ['Поддалась соблазну 🔐', 'Смогла противостоять соблазну'],
  buttonaction: [
    () => { Game.Scenes.FC[144].begin(); Game.Achievements.LoveEvil.unlock(); Game.Stats.AntagonistWire.add(1); AndroidApp ('showAd');},
    () => { Game.Scenes.FC[156].begin();},
  ],
});

Game.Scenes.FC[144] = new Scene({
  text: `    
    Это средство словно сняло мои внутренние ограничители. Я была не в силах ему сопротивляться. Губы незнакомца жадно впились в мои, а я ему охотно отвечала.
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[145].begin();}],
});

Game.Scenes.FC[145] = new Scene({
  text: `    
    Я чувствовала, как этот глубокий поцелуй нравится мне все больше. Мужчина аккуратно положил меня на скамейку, нависая, продолжая покрывать поцелуями. Его руки скользили по моему телу. Он не стесняясь трогал мои интимные места, словно, я всегда ему принадлежала.
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[146].begin();}],
});

Game.Scenes.FC[146] = new Scene({
  text: `    
    Когда он оторвался от моих губ, то облизнулся и сказал:
    <p>- Видишь? Тебе же самой нравится. 
    <p>- Это не так… - я произнесла эти три коротких слова тяжело дыша и все еще помня прикосновения мужчины. 
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[147].begin();}],
});

Game.Scenes.FC[147] = new Scene({
  text: `    
    Он наклонился и прошептал:
    <p>- Какая же ты сладкая… 
    <p>Незнакомец стал целовать мою шею, проходится языком вдоль, немного прикусывая. Я не удержалась и испустила громкий стон, чем только раззадорила мужчину.
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[148].begin();}],
});

Game.Scenes.FC[148] = new Scene({
  text: `    
    - Тише, милая, а вдруг нас кто-нибудь услышит, ты же не хочешь быть обнаруженной? 
    <p>Его руки стали расстегивать мою блузку. Он справлялся с этим довольно умело и быстро. Мужчина обнажил мою грудь. 
    <p>“Это все неправильно… нет…”
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[149].begin();}],
});

Game.Scenes.FC[149] = new Scene({
  text: `    
    Головой я понимала то, что сейчас происходит - большая ошибка. Но телу было настолько хорошо, что я не могла с этим ничего поделать, только лишь полностью отдаться.
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[150].begin();}],
});

Game.Scenes.FC[150] = new Scene({
  text: `    
    Незнакомец ласкал мою грудь, параллельно трогая нижнюю часть тела, доставляя неземное удовольствие. Несколько пальцев смело проникали внутрь меня, а я лишь обнимала его, крепко цепляясь обеими руками, не в силах сдержать стоны.
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[151].begin();}],
});

Game.Scenes.FC[151] = new Scene({
  text: `    
    Я довольно быстро достигла пика удовольствия и обмякла в руках незнакомца, тяжело дыша. 
    <p>- Хочешь большего? 
    <p>- Я…
    <p>Мне не удалось договорить, так как послышались голоса, идущие в нашу сторону..
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[152].begin();}],
});

Game.Scenes.FC[152] = new Scene({
  text: `    
    - Очень жаль, - мужчина поправил свой пиджак и встал. - Мне пора, советую незамедлительно привести себя в порядок и ни в коем случае не пропустить конец вечера. 
    <p>Мой разум начал приходить в норму и я стала быстро возвращать себе нормальный вид. 
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[153].begin(); Game.message('Мужчина держит свое слово'); Game.Stats.Antagonist.add(1)}],
});

Game.Scenes.FC[153] = new Scene({
  text: `    
    Напоследок мужчина посмотрел на меня и с ухмылкой проговорил:
    <p>- В следующий раз я доведу дело до конца. 
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[154].begin();}],
});

Game.Scenes.FC[154] = new Scene({
  text: `    
    Когда он ушел, я продолжала сидеть на скамейке, обдумывая происходящее. Мимо прошла воркующая парочка, которая приветливо поздоровалась со мной. А я толком и не обратила на них внимания, ведь сидела в полной растерянности.
       `,
  background: "Backgrounds/Garden",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[155].begin();}],
});

Game.Scenes.FC[155] = new Scene({
  text: `    
    “Может, он не такой плохой….? Да, отлично, $Имя Игрока$. Давай оправдывать злодея, потому что он хорошо орудовал пальчиками.” 
    <p>Мне было стыдно, но в то же время полученное удовольствие затмевало здравый смысл.
    <p>Пока я решила отпустить ситуацию и вернуться на мероприятие.
       `,
  background: "Backgrounds/Garden",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[162].begin();}],
});

Game.Scenes.FC[156] = new Scene({
  text: `    
    Мне удалось найти в себе силы и отвернуться. Мое тело ныло от желания, но разум оставался чистым и непреклонным. 
    <p>- Почему ты такая упертая? - мужчина заметно погрустнел. - Это же всего лишь небольшая шалость. Давай же, я сделаю тебе очень хорошо!
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[157].begin();}],
});

Game.Scenes.FC[157] = new Scene({
  text: `    
    - Почему именно я? 
    <p>- А что такого в том, что мужчина желает красивую женщину? 
    <p>Незнакомец прошелся рукой по моей шее, груди… 
    <p>- Соглашайся, Катарина! 
    <p>Я: 
       `,
  background: "Persons/Antagonist",
  buttontext: ['Согласилась 🔐', 'Отказалась'],
  buttonaction: [
    () => { Game.Scenes.FC[144].begin(); Game.Achievements.LoveEvil.unlock(); Game.Stats.AntagonistWire.add(1); AndroidApp ('showAd'); },
    () => { Game.Scenes.FC[158].begin();},
  ],
});

Game.Scenes.FC[158] = new Scene({
  text: `    
    - Иди к черту! 
    <p>- Жаль, - незнакомец сел рядом со мной и томно вздохнул. 
    <p>- Раз даже средство не сработало, значит, я совсем тебе не интересен.
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[159].begin(); Game.message('Мужчина еще попытается добиться вас.')}],
});

Game.Scenes.FC[159] = new Scene({
  text: `    
    - Я не буду иметь ничего общего с похитителями-тиранами! 
    <p>- Что ж, я буду надеяться на еще один шанс, милая моя, а пока что, лучше приведи себя в порядок и вернись на прием. 
    <p>Он насильно взял мою руку и поцеловал.
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[160].begin();}],
});

Game.Scenes.FC[160] = new Scene({
  text: `    
    “Нужно опасаться этого человека…Лучше сообщить Роберту о том, что этот негодяй здесь.”
       `,
  background: "Backgrounds/Garden",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[162].begin();}],
});

Game.Scenes.FC[161] = new Scene({
  text: `    
    “Мне совершенно не хочется искать приключений на свою голову, а вдруг это не простой человек?”
    <p>Разыгравшаяся паранойя не позволила мне ни на минуту задержаться в этом саду. Я быстро встала и вернулась на мероприятие. 
       `,
  background: "Backgrounds/Garden",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[162].begin();}],
});

Game.Scenes.FC[162] = new Scene({
  text: `    
    В общем зале гости постепенно расходились, занимая места с лучшим обзором. Публика была в нетерпении. Оркестр же складывал инструменты, освобождая сцену для будущих выступлений. 
    <p>Я увидела, как Никола Тесла стоял у окна, сжимая в руках бумагу. 
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[163].begin();}],
  condition: function (){
    Game.Sounds.play('Music', 'Ball');
  }
});

Game.Scenes.FC[163] = new Scene({
  text: `    
    - Никола, все в порядке? Волнуешься? 
    <p>- Не хочу видеть Эдисона. От одного его вида мне становится тошно. 
    <p>Я понимающе кивнула, осознавая несправедливость, с которой столкнулся Тесла. Ведь именно в этот период жизни Николы, Томас Эдисон отказывался выплачивать ему деньги за проделанную работу.
       `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[164].begin();}],
});

Game.Scenes.FC[164] = new Scene({
  text: `    
    Начало их затяжного конфликта было положено. 
    <p>- Это всего лишь этап, который ты должен пережить. Просто помни, что твои открытия значат для тебя. 
    <p>Ученый улыбнулся. 
       `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[165].begin();}],
});

Game.Scenes.FC[165] = new Scene({
  text: `    
    - Все равно он не сможет лишить меня той малости, которую я заработал. Я обязательно отыграюсь. Если не на работе, то в соответствующих клубах. И хоть я проиграл тогда, мне же просто не повезло…
    <p>“Он снова про свою зависимость. Он будто бы просит помощи...”
       `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[169].begin(); }],
  condition: function () {
    if(Game.Stats.Study.get>=5){
      this.buttonaction[0] = () => { Game.Scenes.FC[166].begin(); }
    }

    if(Game.Stats.Study.get<=4){
      this.buttonaction[0] = () => { Game.Scenes.FC[169].begin(); }
    }

  }
});

Game.Scenes.FC[166] = new Scene({
  text: `    
    - Никола, послушай, тебе не стоит так тратить свое время и способности. Ты должен понимать, что этот досуг не привнесет в твою жизнь ничего хорошего. Временная эйфория от выигрышей, на самом деле ничто по сравнению с тем, сколько ты теряешь. 
    <p>- Я благодарен тебе за беспокойство, однако я в состоянии самостоятельно принять решение относительно своей жизни.
       `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[167].begin();}],
});

Game.Scenes.FC[167] = new Scene({
  text: `    
    - А как же твои исследования, - я не собиралась сдаваться. - Твои идеи насчет тока… Неужели ты просто готов сдаться и погрязнуть в долгах? Пойми же ты, твое время еще настанет. 
    <p>Тесла отвернулся, словно, что-то обдумывая.
       `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[168].begin(); Game.message('Ваши знания помогают Тесле избавиться от зависимости.'); Game.Stats.Nicola.add(1); Game.Stats.HelpTesla.add(1); }],
});

Game.Scenes.FC[168] = new Scene({
  text: `    
    - Спасибо, Катарина, я непременно прислушаюсь к тебе. А сейчас извини, я хотел бы подготовиться к выступлению, - мужчина с задумчивым видом отошел в сторону.
    <p>“Надеюсь, он обдумает мои слова…”
       `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[172].begin();}],
  condition: function () {
    if(Game.Stats.AntagonistWire.get>=1){
      this.buttonaction[0] = () => { Game.Scenes.FC[171].begin();}
    }

    if(Game.Stats.AntagonistWire.get<=0){
      this.buttonaction[0] = () => { Game.Scenes.FC[172].begin();}
    }
  }
});

Game.Scenes.FC[169] = new Scene({
  text: `    
    “Что мне ему сказать? Все равно он сам себе на уме…”
    <p>- Никола, ты же можешь лучше! Я знаю…
    <p>В голову не приходили конкретные примеры. 
    <p>“Нужно было больше уделять времени учебе и углубиться в биографию Теслы.”
       `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[170].begin(); Game.message('Ваших знаний недостаточно, чтобы помочь Тесле избавиться от зависимости.')}],
});

Game.Scenes.FC[170] = new Scene({
  text: `    
    - Я прекрасно осознаю свои возможности, а вот ты не понимаешь, что мне нужны деньги. 
    <p>“Бесполезно, он же так всю жизнь проиграет!” 
    <p>- Спасибо за беспокойство, Катарина, я непременно услышал тебя. А сейчас извини, я хотел бы подготовиться к выступлению, - мужчина отошел в сторону с довольно грустным видом.
       `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[172].begin();}],
  condition: function () {
    if(Game.Stats.AntagonistWire.get>=1){
      this.buttonaction[0] = () => { Game.Scenes.FC[171].begin();}
    }

    if(Game.Stats.AntagonistWire.get<=0){
      this.buttonaction[0] = () => { Game.Scenes.FC[172].begin();}
    }
  }
});

Game.Scenes.FC[171] = new Scene({
  text: `    
    Последние приготовления к выступлениям были завершены. 
    <p>Я искала Роберта, чтобы предупредить его о том негодяе, но мужчины нигде не было. 
    <p>“Черт, а что если злодей что-то замышляет…”
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[172].begin();}],
});

Game.Scenes.FC[172] = new Scene({
  text: `    
    К зрителям вышел организатор мероприятия и наконец-то объявил о начале выступлений. 
    <p>- Прошу выйти на сцену мистера Николу Тесла с его покровителем - Робертом Джонсоном! 
    <p>Зал зааплодировал. Мне удалось занять хорошее место, поэтому я смогла наблюдать за событиями в первых рядах.  
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[173].begin();}],
});

Game.Scenes.FC[173] = new Scene({
  text: `
    Роберт и Никола держались довольно нейтрально. Их лица выражали абсолютное спокойствие и сосредоточенность на своей работе. 
    <p>Организатор объявил о еще нескольких претендентах. 
    <p>- И, наконец, за дополнительное финансирование и признание поборется Мистер Томас Эдисон вместе с Эдвардом Брауном.
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[174].begin();}],
});

Game.Scenes.FC[174] = new Scene({
  text: `
    Взгляд тут же зацепился за Эдисона. Высокий, стройный. Любимый всеми высокомерный взгляд и радушная улыбка при виде ликующих зрителей. 
    <p>А вот его коллега Эдвард казался мне смутно знакомым.
       `,
  background: "Persons/Thomas",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[175].begin();}],
});

Game.Scenes.FC[175] = new Scene({
  text: `
    Я оцепенела. 
    <p>“Это не может быть правдой…”
    <p>Я отчетливо видела лицо Нэйтана. Мужчина был практически один в один как мой профессор из современности. 
    <p>“Это невозможно!”
       `,
  background: "Persons/Neitan_TL",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[176].begin();}],
});

Game.Scenes.FC[176] = new Scene({
  text: `
    Эдвард окинул зал взглядом, и его взор упал на меня. Он довольно долго рассматривал мое лицо, не скрывая удивления, а затем сказал: 
    <p>- Также с недавнего времени к нам присоединился Александр Гончаров, прошу встретить его аплодисментами! 
    <p>Я не верила своим глазам. Одно потрясение за другим.
       `,
  background: "Persons/Neitan_TL",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[178].begin();}],
});

Game.Scenes.FC[178] = new Scene({
  text: `
    Никто иной как “мистер зло” вальяжно вошел на сцену и поклонился гостям.
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[179].begin();}],
  condition: function () {
    if(Game.Stats.AntagonistWire.get>=1){
      this.buttonaction[0] = () => { Game.Scenes.FC[179].begin(); }
    }

    if(Game.Stats.AntagonistWire.get<=0 && Game.Stats.MetAntagonist.get>=1){
      this.buttonaction[0] = () => { Game.Scenes.FC[180].begin(); }
    }

    if(Game.Stats.MetAntagonist.get<=0){
      this.buttonaction[0] = () => { Game.Scenes.FC[181].begin(); }
    }

  }
});

Game.Scenes.FC[179] = new Scene({
  text: `
    Меня невольно бросило в жар от воспоминаний о проведенном с ним времени. Он смотрел на меня с жадностью, улыбался и даже осмелился подмигнуть.. 
    <p>Это не скрылось от глаз Роберта, который выглядел взбешенным. Безусловно, он узнал его.
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[182].begin();}],
});

Game.Scenes.FC[180] = new Scene({
  text: `
    Я тут же встретилась глазами с Робертом. Он выглядел взбешенным и готов был рвать и метать при виде моего испуганного взгляда. 
    <p>Тесла почувствовал неладное и положил другу на плечо руку, дабы разрядить обстановку.
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[182].begin();}],
});

Game.Scenes.FC[181] = new Scene({
  text: `
    Его появление вызвало у меня одно лишь негодование. 
    <p>“Значит, Эдисон спелся со злодеем? И при чем тут Эдвард или Нэйтан… Я ничего не понимаю!”
       `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[182].begin();}],
});

Game.Scenes.FC[182] = new Scene({
  text: `
    После всех представлений, участники стали рассказывать про свои изобретения и возможное развитие будущего электричества.
    <p>Я понимала, что сейчас речь идет о переменном и постоянном токе. Это основная суть конфликта Эдисона и Теслы. Но я не была сильна в этой области, поэтому если кратко: Эдисон разработал системы освещения, которые могли работать на дальних дистанциях, но с маленьким напряжением.
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[183].begin();}],
});

Game.Scenes.FC[183] = new Scene({
  text: `
    Для равномерного распределения электричества, нужно было строить электростанции практически в каждом районе города. В связи с чем, это обходилось правительству в кругленькую сумму, 
    <p>Тесла вместе с известным предпринимателем по фамилии Вестингауз предлагали более дешевый метод освещения. Построить одну большую электростанцию и снижать напряжение путем передачи тока через провода и подстанции.
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[184].begin();}],
});

Game.Scenes.FC[184] = new Scene({
  text: `
    “Видимо на данном этапе ему помогает Роберт. Странно, что о нем не было упоминания в известных мне биографиях Теслы.”
    <p>Конфликт длился долго и каждый не стеснялся использовать грязные методы для победы. 
    <p>Выступления были ограничены по времени. Каждый оратор старался кратко и по сути рассказать о своих изобретениях и влиянии, которое они могут оказать в будущем.
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[185].begin();}],
});

Game.Scenes.FC[185] = new Scene({
  text: `
    Я завороженно любовалась дебатами и с удовольствием слушала новую для меня информацию. 
    <p>Когда все насладились выступлениями, а вечер подходил к концу, Роберт был рядом со мной, так как волновался за мою безопасность.
       `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[186].begin();}],
});

Game.Scenes.FC[186] = new Scene({
  text: `
    Меня не отпускала мысль, что я вижу Нэйтана или его предка…
    <p>“Это не может быть совпадением. Как и в случае со мной. Очевидно, что Катарина мой двойник. Неужели и у Нэйтана также? Он путешественник? Или это действительно его родственник? Я должна выяснить!”
       `,
  background: "Persons/Neitan_TL",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FC[187].begin(); Game.Achievements.Ball.unlock(); }],
});

Game.Scenes.FC[187] = new Scene({
  text: `
    Я облокотилась о стену, так как сильно закружилась голова. Тяжело было контролировать такой поток информации. Одно накладывалось на другое. Путаница. Хаос. 
    <p>Я потеряла сознание в руках Роберта.
       `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => {
    setTimeout(() => { Game.Scenes.FifthPart[0].begin(); }, 1000);
    Game.LoadScreen('FifthPart');
    Game.Progress.save("FifthPart");
  }],
});Game.Scenes.FifthPart = [];

Game.Scenes.FifthPart[0] = new Scene({
  text: `
    Я резко вскочила с дивана, жадно хватая ртом воздух. Практически не ощущая себя в пространстве, я попыталась оглянуться, чтобы понять, где нахожусь.
            `,
  background: "Backgrounds/Hero_Sleeps",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[2].begin();  }],
  condition: () => {
    Game.Sounds.play('Music','Realities');
  }
});

Game.Scenes.FifthPart[2] = new Scene({
  text: `
    “Это мой дом?”
    <p>Мельком я замечала куски нескольких реальностей, собранных воедино. Как два разных пазла, которые нечаянно смешались и теперь невозможно было сложить четкую картинку.
            `,
  background: "Backgrounds/Dimensions",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[67].begin();  }],
});

Game.Scenes.FifthPart[67] = new Scene({
  text: `
    Все расплывалось перед глазами. Я была уверена, что нахожусь в своей гостинной и вижу перед собой обеденный стол, где мы часто проводили время с родителями. Но в то же время он приобретал очертания старинного столика, с присущей ему изысканной резьбой, за которым Роберт однажды предлагал мне выпить.
            `,
  background: "Backgrounds/Dimensions",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[68].begin();  }],
});

Game.Scenes.FifthPart[68] = new Scene({
  text: `
     “Что это? Все наслаивается друг на друга. Где я?”
            `,
  background: "Backgrounds/Dimensions",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[69].begin();  }],
});

Game.Scenes.FifthPart[69] = new Scene({
  text: `
     Немного успокоившись, я сделала вывод, что скорее всего - это просто сон. Или усталость от нескончаемых перемещений, дававшая о себе знать в такой изощренной форме. Я закрыла глаза и ударила себя несколько раз по щекам, в надежде очнуться и отогнать появляющиеся смазанные образы.
            `,
  background: "Backgrounds/Dimensions",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[70].begin();  }],
});

Game.Scenes.FifthPart[70] = new Scene({
  text: `
     В этом хаосе, единственное, что я четко могла различить - фигуру Роберта, держащего на руках девушку. Он тряс ее и почти криком просил только об одном: 
     <p>- Катарина, очнись!
     <p>Но ответом ему было протяжное молчание.
            `,
  background: "Backgrounds/Couch",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[3].begin();  }],
});

Game.Scenes.FifthPart[3] = new Scene({
  text: `
    Я наблюдала, как все обеспокоенно обступили охотника и девушку, что не подавала признаков жизни. Гости шептались, некоторые предлагали пригласить врача, но Роберт их словно не слышал.
    <p>Я почувствовала, что:
            `,
  background: "Backgrounds/Couch",
  buttontext: ['Мне хочется помочь Роберту','Мне было все равно'],
  buttonaction: [
    () => {Game.Scenes.FifthPart[4].begin();  },
    () => {Game.Scenes.FifthPart[9].begin();  },
  ],
});

Game.Scenes.FifthPart[4] = new Scene({
  text: `
    Внутри все сжалось, от осознания тоски по моему новому знакомому. Несмотря на его холодное и, местами, равнодушное поведение - он оставался верен своим принципам. 
    <p>Для него в приоритете была защита близких. И он просто не успевал радоваться мелочам, любить и быть любимым. Ощущать чью-то заботу, растворяться в этих простых эмоциях.
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[5].begin();  }],
});

Game.Scenes.FifthPart[5] = new Scene({
  text: `
    Эта черта не могла не отзываться желанием показать ему, каково это - жить для себя.
    <p>Обнимая девушку, он нисколько не лукавил. Нет. Он беспокоился, боялся потерять. По-настоящему боялся. Наконец-то, я увидела его истинные чувства. Ко мне они были или к Катарине - я не знала. Да и какая разница, ведь сейчас мы с ней - одно целое.
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[6].begin();  }],
});

Game.Scenes.FifthPart[6] = new Scene({
  text: `
    Мне было невыносимо смотреть на его попытки привести Катарину в чувства. Он был растерян, кажется, впервые с момента нашей встречи. Могла ли я что-то сделать, чтобы помочь ему?
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[7].begin();  }],
});

Game.Scenes.FifthPart[7] = new Scene({
  text: `
    Я хотела открыться. Каждый раз погружаясь в этот хаос, я ощущала потребность поделиться своими страхами и сомнениями с кем-нибудь, ведь так тяжело нести это бремя в одиночестве. Почему это не может быть он?
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[8].begin(); Game.message('Вы хотите быть ближе к Роберту и, возможно, даже открыться ему.'); Game.Stats.Robert.add(1);  }],
});

Game.Scenes.FifthPart[8] = new Scene({
  text: `
     Роберт - охотник и кому, как не ему разбираться в этих непривычных миру вещах. 
     <p>“Надеюсь, мы еще встретимся и ты узнаешь меня настоящую.”
            `,
  background: "Persons/Robert",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[23].begin();  }],
});

Game.Scenes.FifthPart[9] = new Scene({
  text: `
     Мне было неприятно смотреть на отчаянные попытки охотника привести Катарину в чувства. 
    <p>Я не разделяла всеобщую панику, так как была уверена, что с девушкой все будет в порядке. Судя по ее биографии ей предстоят еще долгие годы жизни впереди.
            `,
  background: "Backgrounds/Ball",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[71].begin();  }],
});

Game.Scenes.FifthPart[71] = new Scene({
  text: `
     Я решила сфокусировать своё внимание на Николе и Эдварде и снова погрузилась в состояние неопределённости, чтобы найти то чувство, которое приведёт меня к ним. У меня оставалась куча вопросов к личности этого загадочного двойника моего учителя, да и с Теслой мы не поговорили как следует. 
            `,
  background: "Backgrounds/Dimensions",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[10].begin();  }],
});

Game.Scenes.FifthPart[10] = new Scene({
  text: `
     Возможно, именно они могли дать мне те ответы, в которых я так отчаянно нуждалась. 
    <p>Я сосредоточилась на:
            `,
  background: "Backgrounds/Dimensions",
  buttontext: ['Мыслях о Тесле', 'Мыслях об Эдварде'],
  buttonaction: [
    () => { Game.Scenes.FifthPart[11].begin();  },
    () => { Game.Scenes.FifthPart[18].begin();  },
  ],
});

Game.Scenes.FifthPart[11] = new Scene({
  text: `
     Никола стоял на террасе и не видел, что произошло с Катариной. Ученый на повышенных тонах вел беседу с Томасом Эдисоном. Оба были на пределе. Недовольные, злые. Складывалось ощущение - одно мгновение и в дело пойдут кулаки. 
    <p>- Я последний раз тебя предупреждаю, заплати мне это проклятое жалование и мы разойдемся по-хорошему, - Никола смотрел прямо в глаза собеседнику.
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[12].begin();  }],
});

Game.Scenes.FifthPart[12] = new Scene({
  text: `
     - А я еще раз тебе повторяю - мне нужен результат, за который ты требуешь плату. А я получаю лишь твои неосуществимые фантазии об изобретениях, способных улучшить мир и отлынивание от работы, - Эдисон закурил сигару, не стесняясь пускать дым прямо в лицо Тесле.
            `,
  background: "Persons/Thomas",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[13].begin();  }],
});

Game.Scenes.FifthPart[13] = new Scene({
  text: `
     - Я делал эти чертовы лампочки, как ты просил. И я требую получить часть положенных мне выплат за отработанное время, - Никола кипел от ярости. - И вообще, Эдисон, складывается ощущение, что ты просто скряга. Скряга, который находит любое оправдание, лишь бы не выплачивать заслуженную заработную плату честным людям!
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[14].begin();  }],
});

Game.Scenes.FifthPart[14] = new Scene({
  text: `
     - Насколько я помню, было выплачено ровно столько, сколько ты заслуживаешь. Прекрати уже витать в своих фантазиях и прими то, что тебе дают. 
    <p>Тесла отвернулся и долго о чем-то размышлял.
            `,
  background: "Persons/Thomas",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[15].begin();  }],
});

Game.Scenes.FifthPart[15] = new Scene({
  text: `
     - А я ведь верил в тебя. Ты был моим кумиром. Человеком, который мог изменить жизнь всей Америки. Но в реальности, ты оказался таким мелочным, а великие открытия уже не стоят для тебя на первом месте. Я не хочу быть таким, как ты.
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[16].begin();  }],
});

Game.Scenes.FifthPart[16] = new Scene({
  text: `
     - Не желаю больше слушать эту клевету, - Эдисон громко вздохнул. - Ты так и остался тем наивным глупцом, который когда-то стоял на моем пороге с горящими глазами. Все продолжаешь фантазировать о вещах, вроде машины времени, которые недоступны человеку. Оставь детские фантазии, повзрослей и прими реальность.
            `,
  background: "Persons/Thomas",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[17].begin(); Game.message('Вы узнаете Теслу все лучше'); Game.Stats.Nicola.add(1);  }],
});

Game.Scenes.FifthPart[17] = new Scene({
  text: `
     Не в силах больше выносить оскорбления в свой адрес, Тесла покинул террасу со словами:
    <p>- Мы еще посмотрим, кто по итогу станет великим.
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[23].begin();  }],
});

Game.Scenes.FifthPart[18] = new Scene({
  text: `
     Эдвард находился в саду вместе с Александром. Они стояли около фонтана и вели на первый взгляд непринужденную беседу.
     <p>- Так ты все же общаешься с братом, несмотря на запрет? - Александр равнодушно оглядывал местность.
            `,
  background: "Persons/Neitan_TL",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[19].begin();  }],
});

Game.Scenes.FifthPart[19] = new Scene({
  text: `
     - Я не могу по-другому. Ты знаешь - он моя семья. 
     <p>- Знаю. Но ОНА недовольна этим фактом. 
     <p>Эдвард печально вздохнул. Он не смотрел на собеседника, не пытался отыскать что-то взглядом в скрытых тенями уголках сада. Его взор был пустым. Будто бы мужчина был заложником неведомых обстоятельств.
            `,
  background: "Persons/Neitan_TL",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[20].begin();  }],
});

Game.Scenes.FifthPart[20] = new Scene({
  text: `
     - Сделаю тебе последнее предупреждение, - Александр грозно посмотрел на Эдварда. - Не делай глупостей, о которых можешь впоследствии пожалеть. Ты выбрал сторону. Хочешь - развлекайся. Играй в семью. Но помни, что ты все это начал и пришёл к нам по собственной воле. 
      <p>- Я помню. Твои нотации - пустая трата времени.
            `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[21].begin();  }],
});

Game.Scenes.FifthPart[21] = new Scene({
  text: `
     - Отнюдь, - улыбнулся Александр. - Я вижу твое смятение. Ты не уверен. И не только мне удалось разглядеть эти ненужные эмоции. 
      <p>- Ты что же, беспокоишься обо мне? - Эдвард ухмыльнулся. - А ОНА знает об этом разговоре? Не боишься ее гнева?
      <p>- А, может, я хочу быть тебе другом, не думал? - мужчина в маске, казалось, стал немного серьезнее.
            `,
  background: "Persons/Antagonist",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[22].begin(); Game.message('К чему приведет ваша заинтересованность Эдвардом?'); Game.Stats.Neitan.add(1);  }],
});

Game.Scenes.FifthPart[22] = new Scene({
  text: `
     - Я принял к сведению, - Эдварду совершенно не хотелось вести дальнейшую беседу. - Не пора ли нам возвращаться?
    <p>- Ты волен уйти, когда пожелаешь. У меня и в мыслях не было держать тебя здесь насильно. Однако посмотри на этот прекрасный сад, ты не замечаешь, как красиво это место?
    <p>Эдвард не стал дослушивать и уже удалялся в сторону мероприятия, погрузившись в глубокие раздумья. 
            `,
  background: "Persons/Neitan_TL",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[23].begin();  }],
});

Game.Scenes.FifthPart[23] = new Scene({
  text: `
     Обрывки воспоминаний или, чем бы это не было, начали понемногу отступать. На смену пришло осознание, что я наконец-то вернулась домой. 
      <p>Мягкий диван, тихая и мирная обстановка. А главное - привычная и родная.
            `,
  background: "Backgrounds/Hero_Sleeps",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[24].begin();  }],
  condition: function () {
    Game.Sounds.play('Music','FirstChapter');
    Game.Effects.Flash();
  }
});

Game.Scenes.FifthPart[24] = new Scene({
  text: `
     “Запах поджаренного хлеба и яиц... Стоп. Что?!”. 
    <p>Я медленно приподнялась и неожиданно для себя увидела перед собой Леона, который улыбался мне, будучи одетым в фартук с цветочками.
            `,
  background: "Backgrounds/Kitchen",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[25].begin();  }],
});

Game.Scenes.FifthPart[25] = new Scene({
  text: `
     - Ты наконец-то проснулась, - проговорил парень, лениво потянувшись. - Долго же ты спала, соня. Что тебе такого интересного снилось? 
     <p>“Что происходит… прошло ведь больше недели с моего пребывания в эпохе Теслы. Почему Леон все еще у меня дома?”
            `,
  background: "Persons/Leon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[26].begin();  }],
});

Game.Scenes.FifthPart[26] = new Scene({
  text: `
     - Что мы делали вчера? 
      <p>Леон недоуменно взглянул на меня и твердо заявил: 
      <p>- Весело проводили время, забыла уже, что ли? 
      <p>“Он говорит о нашей тусовке? Не понимаю. Как такое возможно?”
            `,
  background: "Persons/Leon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[27].begin();  }],
});

Game.Scenes.FifthPart[27] = new Scene({
  text: `
     От осознания своей беспомощности, я просто уставилась в стену, пытаясь привести мысли в порядок. 
    <p>“Я нахожусь в своем времени? Или это сон во сне?”
    <p>Хотелось рвать и метать. Столько вопросов и ни одного ответа, который помог бы мне справиться с этой неопределенностью.
            `,
  background: "Backgrounds/Kitchen",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[30].begin();  }],
  condition: function () {
    if (Game.Stats.BrokenHand.get<=0) this.buttonaction[0] = () => { Game.Scenes.FifthPart[30].begin(); }
    if (Game.Stats.BrokenHand.get>=1) this.buttonaction[0] = () => { Game.Scenes.FifthPart[28].begin(); }
  }
});

Game.Scenes.FifthPart[28] = new Scene({
  text: `
     “Рука!”
      <p>Травма, с которой я была довольно долгий период, просто исчезла. Я как обычно начала шевелить своими руками, не чувствуя дискомфорта.
      <p>Никаких повреждений, никакого гипса.
            `,
  background: "Backgrounds/Kitchen",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[29].begin();  }],
});

Game.Scenes.FifthPart[29] = new Scene({
  text: `
     “Неужели перелом, который я заработала из-за своей оплошности, теперь придется донашивать настоящей Катарине… Я чувствую себя виноватой.”
            `,
  background: "Backgrounds/Kitchen",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[30].begin();  }],
});

Game.Scenes.FifthPart[30] = new Scene({
  text: `
     Леон встал передо мной и начал размахивать руками, надеясь привлечь мое внимание. 
    <p>- Прием! Как слышно, $Имя Игрока$!? - попытки парня не увенчались успехом. - Похоже кто-то вчера слишком повеселился. Скар, давай уже завтракать. Будем реанимировать.
            `,
  background: "Persons/Leon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[31].begin();  }],
});

Game.Scenes.FifthPart[31] = new Scene({
  text: `
     Девушка что-то отвечала Леону, пока тот аккуратно взял меня за руку и потянул к накрытому столу. А я была словно кукла, не в силах самостоятельно контролировать свои движения.
            `,
  background: "Persons/Leon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[32].begin();  }],
});

Game.Scenes.FifthPart[32] = new Scene({
  text: `
     Когда меня усадили на стул, Скарлетт заботливо налила мне кофе и положила только что приготовленную еду. Лицо у подруги было довольно обеспокоенным, она спросила: 
    <p>- Тебе плохо, $Имя Игрока$? Может, какое лекарство принести?
            `,
  background: "Persons/Scarlett",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[33].begin();  }],
});

Game.Scenes.FifthPart[33] = new Scene({
  text: `
     Я отрешенно взглянула на нее и нашла в себе силы отрицательно помотать головой. 
     <p>- Брось, Скар, вкусная еда и классная компания быстро поставят ее на ноги! - Леон намазывал на тост клубничный джем. - Давай, $Имя Игрока$, надо поесть.
            `,
  background: "Persons/Scarlett",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[34].begin();  }],
});

Game.Scenes.FifthPart[34] = new Scene({
  text: `
     Мне не хотелось еще больше волновать друзей, поэтому пришлось насильно запихать в себя несколько кусочков яичницы. Ребята облегченно вздохнули и принялись обсуждать планы на день.
            `,
  background: "Backgrounds/Kitchen",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[35].begin();  }],
});

Game.Scenes.FifthPart[35] = new Scene({
  text: `
     - Леон, чем будешь сегодня заниматься? У тебя сегодня выходной на работе? - спросила Скарлетт, попивая чай. 
     <p>- Мне нужно встретиться с братом, а после… Даже и не знаю, может быть займусь поиском мотоцикла, если не вызовут на подработку.
            `,
  background: "Backgrounds/Kitchen",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[36].begin();  }],
});

Game.Scenes.FifthPart[36] = new Scene({
  text: `
     -  Я думала, ты наконец-то оставил эту затею, тебе еще раз напомнить, сколько людей в год разбивается на мотоциклах? - девушка укоризненно посмотрела на Леона. - Сколько раз тебе надо донести эту мысль, чтобы ты отказался от этой идеи? 
            `,
  background: "Persons/Scarlett",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[37].begin();  }],
});

Game.Scenes.FifthPart[37] = new Scene({
  text: `
     - Ох, в любую секунду на меня может метеорит свалиться. Что мне теперь бояться выходить на улицу? Нужно успевать жить. Ведь никто не знает, сколько у нас времени.
            `,
  background: "Persons/Leon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[38].begin();  }],
});

Game.Scenes.FifthPart[38] = new Scene({
  text: `
     Друзья синхронно посмотрели на меня, будто бы ожидая, что я решу их спор. Мне и без этого было тошно, но все же… 
     <p>Я:
            `,
  background: "Backgrounds/Kitchen",
  buttontext: ['Поддержала Леона', "Поддержала Скарлетт"],
  buttonaction: [
    () => { Game.Scenes.FifthPart[39].begin(); Game.Stats.SupportLeon.add(1);  },
    () => { Game.Scenes.FifthPart[43].begin();  },
  ],
});

Game.Scenes.FifthPart[39] = new Scene({
  text: `
     - Леон прав, Скар. Никогда не знаешь, что с тобой может произойти в любую секунду. На страх просто нет времени. 
     <p>- Глупости… - девушка надула губки. - А вдруг это мимолетное решение? Кто как ни близкие вовремя вправят мозги.
            `,
  background: "Persons/Scarlett",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[40].begin();  }],
});

Game.Scenes.FifthPart[40] = new Scene({
  text: `
     - Может и так, - я откинула голову назад, буравя потолок взглядом. - Но если он все решил, значит, выбор был обдуманным и взвешенным. 
     <p>- А мальчики на такое способны? - Скарлетт не собиралась сдаваться.
            `,
  background: "Persons/Scarlett",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[41].begin();  }],
});

Game.Scenes.FifthPart[41] = new Scene({
  text: `
      Леон поставил чашку с кофе на стол и сказал:
      <p>- Представь себе, даже мы можем быть серьезными. Иногда. Я уже не говорю про сильное мужское плечо, которые мы частенько вам предоставляем… Не ценишь ты мужчин, Скар. Удар ниже пояса!
            `,
  background: "Persons/Leon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[42].begin(); Game.message('Леон благодарен за спасение от нотаций Скарлетт'); Game.Stats.Leon.add(1);  }],
});

Game.Scenes.FifthPart[42] = new Scene({
  text: `
      Разговор принял шутливый тон и все начали понемногу расслабляться. 
      <p>- Пф, ладно, решил так решил. Если буду тебя навещать в больнице, обязательно принесу твои любимые гамбургеры, - откусывая бутерброд, сказала Скарлетт.
            `,
  background: "Persons/Leon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[47].begin();  }],
});

Game.Scenes.FifthPart[43] = new Scene({
  text: `
      - Скар права, Леон. Это не шутки, речь ведь идет о твоей жизни. Сколько таких же беспечных разбиваются, думая, что этот выбор был правильным? Может, стоит рассмотреть более безопасные увлечения. Вон, например, чтение книг или игра на гитаре.
            `,
  background: "Persons/Leon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[44].begin();  }],
});

Game.Scenes.FifthPart[44] = new Scene({
  text: `
      - $Имя Игрока$, я все это понимаю, но мне нравится именно это увлечение и от вас я бы хотел услышать поддержку, а не чтение нотаций. Мой выбор был осознанным, и я достаточно взрослый, чтобы это понять.
            `,
  background: "Persons/Leon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[45].begin();  }],
});

Game.Scenes.FifthPart[45] = new Scene({
  text: `
      - Видишь, Леон, - Скарлетт победоносно улыбнулась. - Если ты не хочешь прислушиваться ко мне, то может хотя бы $Имя Игрока$ будет для тебя весомым аргументом? 
      <p>- Да дело не в том, кто - за, кто - против. Поймите, хоть весь мир встанет с вилами и будет отговаривать. Я буду стоять на своем. 
            `,
  background: "Persons/Scarlett",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[46].begin(); Game.message('Скарлетт рада вашей поддержке'); Game.Stats.Scarlett.add(1);  }],
});

Game.Scenes.FifthPart[46] = new Scene({
  text: `
      - А мы все еще о мотоциклах? - казалось, больше сил спорить у девушки не было. - Упрямец, если мне придется навещать тебя в больнице, так и быть, обязательно принесу твои любимые гамбургеры.
            `,
  background: "Persons/Scarlett",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[47].begin();  }],
});

Game.Scenes.FifthPart[47] = new Scene({
  text: `
       После утомительных разговоров я ощущала дикую усталость и решила еще немного посидеть. Леон убирал со стола, а Скарлетт начала мыть посуду. Мне же было все труднее приходить в себя после перемещений. Сознание будто бы раскалывалось на несколько частей. Я до сих пор не понимала, в каком времени пребываю.
            `,
  background: "Backgrounds/Kitchen",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[52].begin();  }],
  condition: function () {
    if(Game.Stats.Leon.get>=4){
      this.buttonaction[0] = () => { Game.Scenes.FifthPart[48].begin(); Game.Sounds.play('Music','Leon');}
    }
    if (Game.Stats.Leon.get<=3){
      this.buttonaction[0] = () => { Game.Scenes.FifthPart[52].begin();}
    }
  }
});

Game.Scenes.FifthPart[48] = new Scene({
  text: `
       Было видно, как Леона беспокоит мое состояние. Он не мог спокойно заниматься домашними делами. Отвлекался, крутился вокруг меня, поглядывая беспокойным взглядом.
            `,
  background: "Persons/Leon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[49].begin();  }],
});

Game.Scenes.FifthPart[49] = new Scene({
  text: `
       Бросив несколько тарелок в распоряжение Скарлетт, Леон присел передо мной на колени, взял меня за руки и сказал: 
       <p>- Давай все же выпьем лекарство. На тебе совсем лица нет. Мне невыносимо просто смотреть и ощущать, что никак не могу тебе помочь.

            `,
  background: "Persons/Leon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[50].begin();  }],
});

Game.Scenes.FifthPart[50] = new Scene({
  text: `
       Я отрицательно покачала головой. 
      <p>- Что случилось, $Имя Игрока$? Дело ведь не во вчерашней тусовке, так? 
      <p>Его проницательность была как всегда на высоте. Я не знала, что ответить. 
      <p>“Очередную ложь? Да, ведь просто так все выложить, рассказать про свои переживания - глупое решение. Он не поверит. А если и поверит, то что дальше? Мои проблемы решатся по щелчку?”
            `,
  background: "Persons/Leon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[51].begin();  }],
});

Game.Scenes.FifthPart[51] = new Scene({
  text: `
       - Продолжаешь молчать? - парень вздохнул. - Что ж, надеюсь, когда-нибудь ты будешь готова поделиться своим грузом со мной. А пока заварю тебе еще чайку, что ли. 
       <p>Эта фраза заставила меня невольно улыбнуться. Увидев мой искренний жест, Леон сильнее сжал мои руки и ушел в сторону кухни.
            `,
  background: "Persons/Leon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[52].begin(); Game.Sounds.play('Music','FirstChapter');  }],
});

Game.Scenes.FifthPart[52] = new Scene({
  text: `
       Из моих дальнейших размышлений меня выдернул звонок в дверь. 
      <p>- $Имя Игрока$, - крикнула Скарлетт. - Открой, пожалуйста, мы тут немного заняты. Возимся с мусором.
      <p>Я лениво поплелась в сторону двери. 
            `,
  background: "Persons/Scarlett",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[53].begin();}],
});

Game.Scenes.FifthPart[53] = new Scene({
  text: `
       Когда я ее открыла, то увидела улыбчивого профессора Нэйтана, который тут же протянул мне коробку с конфетами. 
       <p>- Приехал забрать брата и принес тебе чуть-чуть вкусностей. Вы с Леоном любите такие.
            `,
  background: "Persons/Neitan",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[54].begin();}],
});

Game.Scenes.FifthPart[54] = new Scene({
  text: `
       Я не знала, как мне реагировать. Сейчас передо мной стоял мой учитель, но ведь в XIX веке… Был точно такой же человек. Похожее лицо. На секунду мне даже показалось, что у них идентичные голоса. 
       <p>“Как такое возможно? Если раньше меня посещали сомнения, то теперь я уверена - они практически одинаковые.”
            `,
  background: "Persons/Neitan",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[55].begin();}],
});

Game.Scenes.FifthPart[55] = new Scene({
  text: `
       Резкая головная боль пронзила меня, заставив упасть на колени перед Нэйтаном. Профессор тут же опустился рядом, поддерживая меня за плечи и проговаривая:
       <p>- Что случилось? $Имя Игрока$, я вызываю скорую.
            `,
  background: "Persons/Neitan",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[56].begin();}],
});

Game.Scenes.FifthPart[56] = new Scene({
  text: `
      Я схватила его за руку и взглянула ему прямо в глаза. Мое тело действовало будто бы в отрыве от моих желаний. Дрожащим голосом я произнесла:
            `,
  background: "Persons/Neitan",
  buttontext: ['Эдвард', 'Нэйтан'],
  buttonaction: [
    () => { Game.Scenes.FifthPart[57].begin();},
    () => { Game.Scenes.FifthPart[57].begin(); Game.Achievements.Oops.unlock()},
  ],
});

Game.Scenes.FifthPart[57] = new Scene({
  text: `
       - Эдвард? - я не могла произнести никакого другого имени.  
      <p>Нэйтан встал и заметно переменился в лице. Его взгляд выражал страх и озадаченность. Он стал как-то по особенному на меня смотреть, словно я перестала быть его знакомой, а резко стала чужим человеком.
            `,
  background: "Persons/Neitan",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[58].begin();}],
});

Game.Scenes.FifthPart[58] = new Scene({
  text: `
        - Что ты сказала? 
        <p>- Эдвард, - я решила идти до конца. 
        <p>Но профессор довольно быстро успокоил свои эмоции, помог мне подняться и сказал: 
        <p>- Кто такой этот Эдвард?
            `,
  background: "Persons/Neitan",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[59].begin();}],
});

Game.Scenes.FifthPart[59] = new Scene({
  text: `
        "Он словно изображает из себя дурочка… Мне же не могли показаться его резкие смены настроения? Или я себе все напридумывала?”
            `,
  background: "Persons/Neitan",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[60].begin();}],
});

Game.Scenes.FifthPart[60] = new Scene({
  text: `
        Меня спас Леон, который вышел поприветствовать брата. Они пожали друг другу руки, при этом Нэйтан не сводил с меня глаз. Он будто бы ждал, что я отвечу на вопрос.
            `,
  background: "Persons/Leon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[61].begin();}],
});

Game.Scenes.FifthPart[61] = new Scene({
  text: `
        - Нэйтан, я готов. Поехали? 
        <p>- Поехали, - короткий холодный ответ профессора заставил меня поежиться. 
        <p>- $Имя Игрока$, мне пора, если что нужно, обязательно пиши, - Леон обнял меня и сел в машину Нэйтана.
        <p>- Пока… и до свидания, профессор.
            `,
  background: "Persons/Leon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[62].begin();}],
});

Game.Scenes.FifthPart[62] = new Scene({
  text: `
        Братья уехали, оставив меня стоять на пороге в полной растерянности. Вскоре ушла и Скарлетт, сославшись на то, что еще надо готовиться к предстоящим парам. 
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[63].begin();}],
});

Game.Scenes.FifthPart[63] = new Scene({
  text: `
        Для меня было облегчением наконец-то остаться одной. Я тут же направилась в свою комнату и благополучно уснула. 
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => {
    Game.Scenes.FifthPart[64].begin();
    Game.message('<a style="font-weight: 800; color: #76adff">Вы играете от лица Нэйтана');
    Game.Sounds.play('Music','Neitan');
  }],
});

Game.Scenes.FifthPart[64] = new Scene({
  text: `
        Я вел машину, но все мои мысли были сосредоточены на этом имени. Услышав его от своей ученицы, я действительно впал в ступор, словно знал его, но забыл или не хотел вспоминать.
            `,
  background: "Persons/Neitan",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[65].begin();}],
});

Game.Scenes.FifthPart[65] = new Scene({
  text: `
        Я решил попробовать поговорить с Леоном, который в этом время что-то усердно искал в телефоне:
        <p>- Тебе знакомо имя Эдвард? 
        <p>Леон оторвался от поисков и внимательно посмотрел на брата:
        <p>- Никого с таким именем не припоминаю. А что? 
            `,
  background: "Persons/Neitan",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[66].begin();}],
});

Game.Scenes.FifthPart[66] = new Scene({
  text: `
        Я продолжал вести машину, размышляя, могу ли я сказать брату о сегодняшнем инциденте? Даже такая мелочь может выйти мне боком в игре, которую я задумал. И Леон  об этом знает. Наши взгляды на жизнь сильно различаются. В связи с этим мы частенько ругаемся, иногда забывая, что мы прежде всего - семья.
        <p>И я:
            `,
  background: "Persons/Neitan",
  buttontext: ['Рассказал как есть', 'Сменил тему разговора'],
  buttonaction: [
    () => { Game.Scenes.FifthPart[72].begin();},
    () => { Game.Scenes.FifthPart[80].begin();},
  ],
});

Game.Scenes.FifthPart[72] = new Scene({
  text: `
        Я поделился с Леоном странным поведением, с которым столкнулся сегодня. 
        <p>- $Имя Игрока$ вела себя немного странно, когда мы встретились… Знаешь, она сказала имя - Эдвард. Это заставило меня всерьез озадачиться. Будто бы я упускаю что-то важное…
        <p>Брат с удивлением взглянул на меня, видимо, не ожидая, что я буду столь открыто говорить с ним о моих смятениях.
            `,
  background: "Persons/Neitan",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[73].begin();}],
});

Game.Scenes.FifthPart[73] = new Scene({
  text: `
        - Может, это имя и правда всколыхнуло твои воспоминания, ведь наша жизнь была столь насыщенной, что сейчас все и не вспомнишь.
        <p>Однако я не думаю, что $Имя Игрока$ догадывается о чем-то. К тожу же, судя по ее утреннему состоянию, она не до конца пришла в себя после нашей “небольшой” тусовки.
            `,
  background: "Backgrounds/Car",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[75].begin();}],
});

Game.Scenes.FifthPart[75] = new Scene({
  text: `
        - Ты что же, думаешь, что это просто случайность? - уточнил я, не отвлекаясь от дороги. 
        <p>- Случайности - не случайны, - с задумчивым видом произнес Леон.
            `,
  background: "Backgrounds/Car",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[76].begin();}],
});

Game.Scenes.FifthPart[76] = new Scene({
  text: `
        - Теперь ты цитируешь персонажей из мультфильмов? Уж извини, тебе еще далеко до мудрости той черепахи.
        <p>Мы искренне засмеялись на секунду забыв обо всех мучивших нас вопросах. 
            `,
  background: "Backgrounds/Car",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[77].begin();}],
});

Game.Scenes.FifthPart[77] = new Scene({
  text: `
        - А если серьезно, - меня не отпускала мысль о недавно произошедшем инциденте, - Мне знакомо это имя, только не могу вспомнить, когда же мне приходилось его слышать… Думаю, если это что-то настолько важное, правильная мысль сама придет в голову. Так ведь говорила мама?
            `,
  background: "Persons/Neitan",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[78].begin();}],
});

Game.Scenes.FifthPart[78] = new Scene({
  text: `
        -  Мама была мудрой женщиной. Вот и прислушайся к этому совету, не накручивай себя, - откинувшись на спинку сидения сказал Леон, потягиваясь. - И в конце концов. Ты же историк. Попробуй покопаться в архивах нашей семьи. Не зря же он существует.
            `,
  background: "Persons/Leon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[79].begin(); Game.message('Связь братьев крепчает'); Game.Stats.Brothers.attitude+=1;}],
});

Game.Scenes.FifthPart[79] = new Scene({
  text: `
        - Хорошо, что ты поехал со мной сегодня, давно мы так не разговаривали. О чем-то, помимо работы или учебы. Спасибо, что выслушал, - я глянул на пассажирское сиденье и невольно улыбнулся, обнаружив Леона спящим.
            `,
  background: "Backgrounds/Car",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[86].begin();}],
});

Game.Scenes.FifthPart[80] = new Scene({
  text: `
         - Ничего, просто одна мысль резко всплыла в голове, не обращай внимания. 
            `,
  background: "Backgrounds/Car",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[81].begin();}],
});

Game.Scenes.FifthPart[81] = new Scene({
  text: `
         Леон посмотрел на меня, как будто бы догадался о моем намерении скрыть информацию, а затем сказал: 
         <p>- Ты же знаешь, несмотря на наши разногласия, я всегда готов тебе помочь. 
            `,
  background: "Backgrounds/Car",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[82].begin();}],
});

Game.Scenes.FifthPart[82] = new Scene({
  text: `
         “Знаю.”
          <p>От этого было еще больнее, но дело всей моей жизни не должно страдать из-за желания поддаться эмоциям. 
          <p>- Все хорошо.
            `,
  background: "Persons/Neitan",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[83].begin();}],
});

Game.Scenes.FifthPart[83] = new Scene({
  text: `
         Брату оставалось лишь кивнуть, напоследок он все же добавил: 
          <p>- Ничего не меняется. Ты всегда такой. Закрытый и погруженный в себя. Почему ты не можешь просто положиться на меня? На своих братьев? Ты - вечно в делах, остальные - уехали. Мы уже давно перестали быть настоящей семьей.
            `,
  background: "Persons/Leon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[84].begin();}],
});

Game.Scenes.FifthPart[84] = new Scene({
  text: `
         - Леон, я… 
         <p>- Избавь меня от ненужных оправданий. 
         <p>Я понимал, что брат во многом прав по отношению ко мне.
            `,
  background: "Backgrounds/Car",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[85].begin(); Game.message('Братья сильнее отдаляются');}],
});

Game.Scenes.FifthPart[85] = new Scene({
  text: `
         “Я делаю все это ради вас. Пусть вы будете меня ненавидеть, но никто не должен больше страдать из-за моих ошибок. Когда придет время - они все поймут. А пока, я буду продолжать держать дистанцию для их же блага.”
            `,
  background: "Backgrounds/Car",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[86].begin();}],
});

Game.Scenes.FifthPart[86] = new Scene({
  text: `
         Произошедшая ситуация действительно всколыхнула во мне что-то давно забытое, но одновременно важное. Я осознал, что необходимо действовать решительнее и тщательнее позаботиться обо всех нюансах. Особенно о тех, которые могут помешать.
            `,
  background: "Backgrounds/Car",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[87].begin(); Game.message('<a style="font-weight: 800; color: #edc4ff">Вы снова играете от лица главной героини'); Game.Sounds.play('Music','FirstChapter');}],
});

Game.Scenes.FifthPart[87] = new Scene({
  text: `
         Я проспала до самого вечера. Когда пришли родители, они даже не решились будить меня, так как понимали - мне нужен покой.
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[88].begin();}],
});

Game.Scenes.FifthPart[88] = new Scene({
  text: `
        Снизу доносились отрывки предложений, сказанных на повышенных тонах. Через секунду они начали переходить на крик и я окончательно проснулась. Мне было невыносимо это слушать. 
        <p>“Могла ли я чем-нибудь помочь?”
            `,
  background: "Backgrounds/Room",
  buttontext: ['Спуститься к родителям', 'Остаться в кровати'],
  buttonaction: [
    () => {Game.Scenes.FifthPart[89].begin();},
    () => {Game.Scenes.FifthPart[109].begin();}
  ],
});

Game.Scenes.FifthPart[89] = new Scene({
  text: `
         “Если я не вмешаюсь, то мы можем перестать быть одной семьей.” 
          <p>Я быстро накинула на себя халат и спустилась вниз. Мама сидела на диване с бокалом вина, а отец стоял рядом с ней, обессиленно опустив голову.
            `,
  background: "Backgrounds/Livingroom",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[90].begin();}],
});

Game.Scenes.FifthPart[90] = new Scene({
  text: `
         Увидев меня, мама натянула улыбку и спросила:
          <p>- Как прошла вечеринка? 
          <p>- Да, спасибо, все хорошо, - я решила не ходить вокруг да около. - Что происходит? 
          <p>Папа посмотрел на меня, проговорив: 
          <p>- Не волнуйся, просто небольшая ссора.
            `,
  background: "Backgrounds/Livingroom",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[91].begin();}],
});

Game.Scenes.FifthPart[91] = new Scene({
  text: `
         - Вы называете ваши крики “небольшой ссорой”? - я начинала понемногу злиться из-за его уклончивого ответа. 
          <p>- У каждого бывают сложные периоды в отношениях, дорогая, - говорила тихим голосом мама. - Вот и у нас сейчас так же. Прости, если мы доставляем тебе дискомфорт.
            `,
  background: "Backgrounds/Livingroom",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[92].begin();}],
});

Game.Scenes.FifthPart[92] = new Scene({
  text: `
         - Мама, - мои глаза невольно наполнились слезами. - Я знаю, что вы всю жизнь меня поддерживаете, помогаете, идете на уступки. Даже сейчас, вы отдали в распоряжение наш дом, чтобы я просто не грустила и чудно провела время с друзьями. Пожалуйста, я тоже хочу вам помочь.
            `,
  background: "Backgrounds/Livingroom",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[93].begin();}],
});

Game.Scenes.FifthPart[93] = new Scene({
  text: `
           - Мы не хотим погружать тебя глубоко в наши проблемы. Просто знай, что сейчас такой… “особенный” период, - было видно, как папа с трудом подбирал нужные слова. 
            <p>- Нам очень приятна твоя забота и ни в коем случаем не надо думать, что все плохо.. или…
            `,
  background: "Backgrounds/Livingroom",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[94].begin();}],
});

Game.Scenes.FifthPart[94] = new Scene({
  text: `
           Мама с папой переглянулись. В их взгляде будто бы промелькнуло осознание об их, возможно, не совсем правильном поведении перед дочерью.
            `,
  background: "Backgrounds/Livingroom",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[95].begin();}],
});

Game.Scenes.FifthPart[95] = new Scene({
  text: `
           Отец даже решился положить маме руку на плечо. Она не оттолкнула ее, лишь тихонечко сжала в ответ, поддерживая жест примирения. 
           <p>“Я надеюсь, что у них все наладится. По крайне мере они идут на контакт. Даже если я тот фактор, который насильно сподвигает их к этому.”
            `,
  background: "Backgrounds/Parents",
  buttontext: [''],
  buttonaction: [() => {
    Game.Scenes.FifthPart[96].begin();
    Game.message('Вы предотвратили ссору ваших родителей');
    Game.Stats.Family.add(1);
    Game.Achievements.Psy.unlock();
  }],
});

Game.Scenes.FifthPart[96] = new Scene({
  text: `
           - Ну, хватит грустить, дочка - отец подозвал меня в семейные объятия. - Мы очень ценим, что ты неравнодушна к нашим проблемам. Обещаем подумать, спокойно обсудить наши отношения и прийти к взвешенному решению.
            <p>- А как может быть иначе? - я тихонько всхлипнула, обнимая близких.
            `,
  background: "Backgrounds/Parents",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[97].begin();}],
});

Game.Scenes.FifthPart[97] = new Scene({
  text: `
           Спустя некоторое время мама принесла закуски и мы все вместе сели за стол. Я решила поинтересоваться, чем они занимались и что делали, пока мы с друзьями тусовались дома.
            `,
  background: "Backgrounds/Parents",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[98].begin();}],
});

Game.Scenes.FifthPart[98] = new Scene({
  text: `
           - О, - папа подлил вино в бокал маме. - Мы сходили в кино, затем немного погуляли и поехали к моим родителям. Кстати, бабушка и дедушка очень по тебе скучают.
            `,
  background: "Backgrounds/Parents",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[99].begin();}],
});

Game.Scenes.FifthPart[99] = new Scene({
  text: `
           - Мне действительно стоит их навестить, но со всем происходящим… 
          <p>Конечно, родители не знали обо всем, но будто бы чувствовали, что сейчас не стоит давить на меня и расспрашивать. Придет время - я сама расскажу.
            `,
  background: "Backgrounds/Parents",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[100].begin();}],
});

Game.Scenes.FifthPart[100] = new Scene({
  text: `
           Но это было бы совсем сказкой, если бы я избежала следующего вопроса:
          <p>- Ты идешь завтра в университет? - спросила мама. - Ты и так много пропустила, а мы не раз обсуждали, как важно получить высшее образование.
            `,
  background: "Backgrounds/Parents",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[101].begin();}],
});

Game.Scenes.FifthPart[101] = new Scene({
  text: `
           Я понимала, что она права и мне нечего возразить. Но столько всего происходит, что я невольно задаюсь вопросом: а надо ли оно мне? Действительно стоит тратить время на обучение? 
           <p>Я:
            `,
  background: "Backgrounds/Parents",
  buttontext: ['Пойду на занятия', 'Останусь дома'],
  buttonaction: [
    () => {Game.Scenes.FifthPart[102].begin(); Game.Stats.GoStudy.add(1);},
    () => {Game.Scenes.FifthPart[107].begin();}
  ],
});

Game.Scenes.FifthPart[102] = new Scene({
  text: `
           - Да, мне уже лучше. Ты абсолютно права. Я и сама сегодня обдумывала этот вопрос и решила больше не пропускать учебу. Понимаю ведь, что потом нагонять гораздо сложнее.
            `,
  background: "Backgrounds/Parents",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[104].begin();}],
});

Game.Scenes.FifthPart[104] = new Scene({
  text: `
           Родители утвердительно кивнули. 
          <p>- Молодец, хороший настрой, - папа похлопал меня по плечу.
            `,
  background: "Backgrounds/Parents",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[105].begin();}],
});

Game.Scenes.FifthPart[105] = new Scene({
  text: `
           Вскоре мы разошлись по комнатам. Я укуталась в одеяло, поставила будильник на нужное время и внимательно проверила, включен ли звук на телефоне.
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[106].begin();}],
  condition: function () {
    if(Game.Stats.Late.get>=1){
      this.buttonaction[0] = () => {Game.Scenes.FifthPart[106].begin(); }
    }
    if(Game.Stats.Late.get<=0){
      this.buttonaction[0] = () => {Game.Scenes.FifthPart[119].begin(); }
    }
  }
});

Game.Scenes.FifthPart[106] = new Scene({
  text: `
           “Не хочу, чтобы повторилось мое опоздание. Вроде бы по расписанию завтра есть пара у профессора Нэйтана и при чем первая. Нужно собраться и встать по-раньше!”
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[119].begin();}],
});

Game.Scenes.FifthPart[107] = new Scene({
  text: `
           - Извини, мам, я все еще нехорошо себя чувствую. Думаю, мне необходимо еще немного отлежаться и долечиться. 
            <p>Родители недовольно на меня взглянули, но возражать моему решению не стали. 
            `,
  background: "Backgrounds/Kitchen",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[108].begin();}],
});

Game.Scenes.FifthPart[108] = new Scene({
  text: `
           Вскоре мы разошлись по комнатам. Я укуталась в одеяло, пытаясь абстрагироваться от всего произошедшего. 
           <p>“Наконец-то я могу расслабиться и не думать, что мне надо кого-то спасать… или принимать трудные решения.” 
            `,
  background: "Backgrounds/Hero_Sleeps",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[119].begin();}],
});

Game.Scenes.FifthPart[109] = new Scene({
  text: `
           “Чем я могу помочь взрослым людям в их отношениях?”
          <p>Ответ пришел сам собой - ничем. Было глупо надеяться, что мои воодушевляющие речи могли как-то разрешить их конфликт. 
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[110].begin();}],
});

Game.Scenes.FifthPart[110] = new Scene({
  text: `
           Я долго ворочалась, слушая их громкие высказывания. 
           <p>- Как ты мне надоел со своими вечными претензиями, где я и чем я занимаюсь, - голос мамы звучал очень сердито. - Я не обязана отчитываться о каждом своем шаге.
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[111].begin();}],
});

Game.Scenes.FifthPart[111] = new Scene({
  text: `
           - Какие мы королевы, - послышался звук падения, возможно, отец уронил стул или что-то вроде того. - Думаешь, я не знаю, чем ты занимаешься? Выставляешь меня ослом, рушишь нашу семью…
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[112].begin();}],
});

Game.Scenes.FifthPart[112] = new Scene({
  text: `
           - Я не переходила никаких границ, остынь, пожалуйста. Если ты не уважаешь меня, то хотя бы подумай о нашей дочери, которая слышит сейчас это все. 
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[113].begin();}],
});

Game.Scenes.FifthPart[113] = new Scene({
  text: `
           Дальнейший диалог я не слышала, да и особо не хотелось. По крайне мере они не разрушили дом - и на этом спасибо. 
            <p>“Как же больно все это выслушивать. Что могло такого произойти? Ведь мы были практически идеальной семьей.”
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[114].begin(); Game.message('Вы не предотвратили ссору ваших родителей'); Game.Stats.Family.add(-1);}],
});

Game.Scenes.FifthPart[114] = new Scene({
  text: `
           Но меня волновал еще один вопрос, который нужно было решить в срочном порядке. Уже завтра начинается новая учебная неделя. Столько всего происходит, что я невольно задаюсь вопросом: а надо ли мне идти на занятия? 
           <p>Я: 
            `,
  background: "Backgrounds/Room",
  buttontext: ['Пойду на занятия', 'Останусь дома'],
  buttonaction: [
    () => { Game.Scenes.FifthPart[115].begin(); Game.Stats.GoStudy.add(1);},
    () => { Game.Scenes.FifthPart[117].begin();},
  ],
});

Game.Scenes.FifthPart[115] = new Scene({
  text: `
           “Не хочу больше пропускать. Ведь нагонять гораздо сложнее.” 
            <p>Я укуталась в одеяло, поставила будильник на нужное время и внимательно проверила, включен ли звук на телефоне. 
            `,
  background: "Backgrounds/Hero_Sleeps",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[119].begin();}],
  condition: function () {
    if(Game.Stats.Late.get>=1){
      this.buttonaction[0] = () => {Game.Scenes.FifthPart[116].begin(); }
    }
    if(Game.Stats.Late.get<=0){
      this.buttonaction[0] = () => {Game.Scenes.FifthPart[119].begin(); }
    }
  }
});

Game.Scenes.FifthPart[116] = new Scene({
  text: `
           “Не хочу, чтобы повторилось мое опоздание. Вроде бы по расписанию завтра есть пара у профессора Нэйтана и при чем первая. Нужно собраться и встать по-раньше!”
            `,
  background: "Backgrounds/Hero_Sleeps",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[119].begin();}],
});

Game.Scenes.FifthPart[117] = new Scene({
  text: `
           “Я все еще нехорошо себя чувствую. Еще один проведенный день дома ничего не решит.” 
            <p>Я укуталась в одеяло, пытаясь абстрагироваться от всего произошедшего. 
            `,
  background: "Backgrounds/Hero_Sleeps",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[118].begin();}],
});

Game.Scenes.FifthPart[118] = new Scene({
  text: `
           “Наконец-то я могу расслабиться и не думать, что мне надо кого-то спасать…или принимать трудные решения.” 
            `,
  background: "Backgrounds/Hero_Sleeps",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[119].begin();}],
});

Game.Scenes.FifthPart[119] = new Scene({
  text: `
           В голове прокручивался поток мыслей в связи с пережитыми событиями. Невольно я вспомнила слова, которые когда-то говорил мне проводник.
            `,
  background: "Backgrounds/Hero_Sleeps",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[120].begin(); Game.Effects.Mem();}],
});

Game.Scenes.FifthPart[120] = new Scene({
  text: `
           - В прошлом есть много твоих соратников. Они помогут тебе узнать правду и докопаться до истины. Но запомни одно. Есть и те, кто преследует исключительно свои цели. Будь осторожна с теми, кому хочешь довериться.
            `,
  background: "Persons/Stranger",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[121].begin(); Game.Effects.Mem.Stop(); }],
});

Game.Scenes.FifthPart[121] = new Scene({
  text: `
            “Что он имел в виду? Неужели все, с кем я общаюсь связаны с происходящим? А Леон, Скар, Шерил? Они же здесь, в этой реальности. А Нэйтан…”
            <p>Было сложно ответить на все мучавшие меня вопросы и прийти к какому-то выводу без достаточного количества данных.
            `,
  background: "Backgrounds/Hero_Sleeps",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[122].begin();}],
});

Game.Scenes.FifthPart[122] = new Scene({
  text: `
            “Мне ничего не остается, кроме как сыграть роль “Нэнси Дрю” и раскрыть эту загадку. Несмотря на подсознательное отрицание происходящего - выбора у меня нет.” 
            `,
  background: "Backgrounds/Hero_Sleeps",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[123].begin();}],
});

Game.Scenes.FifthPart[123] = new Scene({
  text: `
            Мои мысли снова вернулись к проводнику и его таинственным высказываниям. До сих пор именно он вызывает у меня больше всего вопросов. И я:
            `,
  background: "Backgrounds/Hero_Sleeps",
  buttontext: ['Не могу его терпеть', 'Не испытываю к нему ненависти'],
  buttonaction: [
    () => { Game.Scenes.FifthPart[124].begin();},
    () => { Game.Scenes.FifthPart[126].begin();}
  ],
});

Game.Scenes.FifthPart[124] = new Scene({
  text: `
            Меня раздражает его манера речи, постоянные недомолвки и буквально все. По прошествии всех событий, я никак не могу относиться к нему с пониманием, которое он требует.
            `,
  background: "Persons/Stranger",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[125].begin(); Game.message('Вы не можете принять сторону проводника'); Game.Stats.God.add(1);}],
});

Game.Scenes.FifthPart[125] = new Scene({
  text: `
            Я неоднократно подвергала себя опасностям. И не только я. Катарина, Тесла, Роберт. 
            <p>"Все они страдают из-за последствий моих выборов. А он заперся в своем мире и считает себя лучше всех остальных. Чую, там дело в мании величия. Возомнил себя богом..."
            `,
  background: "Persons/Stranger",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[128].begin();}],
});

Game.Scenes.FifthPart[126] = new Scene({
  text: `
            Глупо было винить его во всех смертных грехах. Я сама несу ответственность за свои действия. 
            <p>“Он не желает мне зла, он пытается направлять меня, а я сама оступаюсь. Раз за разом.”
            `,
  background: "Persons/Stranger",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[127].begin(); Game.message('Вы на стороне проводника'); Game.Stats.God.add(1);}],
});

Game.Scenes.FifthPart[127] = new Scene({
  text: `
            Пусть он и не до конца честен со мной, по своим причинам, но я вижу его стремление помочь мне. Иногда мне кажется, что помогая себе, я смогу помочь и ему освободиться от оков, которыми он связан.
            <p>“Уверена, мы с ним наладим контакт и разберемся в происходящем. Вместе.”
            `,
  background: "Persons/Stranger",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[128].begin();}],
});

Game.Scenes.FifthPart[128] = new Scene({
  text: `
            Перед тем как лечь спать, я не боялась, что могу снова исчезнуть и оказаться в гуще неизвестных событий. Слишком велика была усталость, что накопилась за такой небольшой срок.
            `,
  background: "Backgrounds/Hero_Sleeps",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[129].begin();}],
});

Game.Scenes.FifthPart[129] = new Scene({
  text: `
            Вдобавок к этому, головные боли теперь чаще сопровождали меня и оставались даже после принятия лекарств. 
            <p>Каким-то чудом, я наконец-то смогла уснуть, завернувшись в теплое одеяло.
            `,
  background: "Backgrounds/Hero_Sleeps",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[130].begin();}],
  condition: function () {
    if(Game.Stats.GoStudy.get>=1){
      this.buttonaction[0] = () => { Game.Scenes.FifthPart[130].begin();}
    }
    if(Game.Stats.GoStudy.get<=0){
      this.buttonaction[0] = () => { Game.Scenes.FifthPart[137].begin();}
    }
  }
});

Game.Scenes.FifthPart[130] = new Scene({
  text: `
             Как и было рассчитано, я встала по будильнику и отправилась в университет. Меня любезно согласился подвезти отец.
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[131].begin();}],
});

Game.Scenes.FifthPart[131] = new Scene({
  text: `
             Свежий воздух, разговоры студентов - все это понемногу погрузило меня обратно в учебные будни обычной девушки. Я была рада снова пройтись по знакомой дорожке, наслаждаясь хорошей погодой и мирной рутиной, сливаясь с общим потоком студентов.
            `,
  background: "Backgrounds/Uni",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[132].begin();}],
});

Game.Scenes.FifthPart[132] = new Scene({
  text: `
             Профессор Нэйтан немного задерживался, поэтому у меня было время достать необходимые письменные принадлежности и уделить внимание Скарлетт, которая как раз присоединилась ко мне:
            `,
  background: "Backgrounds/Lection",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[133].begin();}],
});

Game.Scenes.FifthPart[133] = new Scene({
  text: `
             -  $Имя Игрока$, не ожидала тебя увидеть сегодня. Думала, что ты захочешь еще немного понежиться в кровати. 
            <p>- Не хочу больше пропускать занятия, - я оглядела взглядом всю аудиторию. - А Леона сегодня нет?
            <p>- Как видишь, - девушка пожала плечами. - Наверное опять носится где-то со своим мотоциклом… 
            `,
  background: "Persons/Scarlett",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[134].begin();}],
});

Game.Scenes.FifthPart[134] = new Scene({
  text: `
            Вскоре пришел профессор Нэйтан. Вместо привычной улыбки, его лицо выражало равнодушие и некую отрешенность. 
            <p>Сухо поздоровавшись со студентами, преподаватель начал пару. 
            `,
  background: "Persons/Neitan",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[135].begin();}],
});

Game.Scenes.FifthPart[135] = new Scene({
  text: `
            Я торопливо записывала лекцию, стараясь успевать за ходом его мыслей. Полностью сосредоточиться не получилось. Иногда мои мысли улетали далеко за пределы аудитории, погружая меня в размышления об оставленных в “том” мире проблемах и людях. Тем не менее, я старалась собраться и не поддаваться желанию впасть в уныние и переживания. 
            `,
  background: "Persons/Neitan",
  buttontext: [''],
  buttonaction: [() => {
    Game.Scenes.FifthPart[136].begin();

    if (Game.Stats.Study.get<=4){
      Game.Stats.Study.add(1);
      Game.message('Ваша успеваемость продолжает расти');
    }

    if (Game.Stats.Study.get>=5){
      Game.message('Вы укрепляете свою успеваемость');
    }

  }],
});

Game.Scenes.FifthPart[136] = new Scene({
  text: `
            День прошел совершенно незаметно. Я старалась быть активной на парах и даже заработала несколько положительных оценок, которые помогут мне на итоговом тесте в конце семестра. Проведя день в университете, я почувствовала прилив энергии и была рада ранее принятому мной решению не оставаться дома.
            `,
  background: "Backgrounds/Uni",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[141].begin();}],
});

Game.Scenes.FifthPart[137] = new Scene({
  text: `
            Я проснулась ближе к обеду, чувствуя себя немного разбито. Хоть и ничего сверхъественного не происходило, однако мое общее состояние пребывало в легком упадке. 
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[138].begin(); Game.message('Вы заработали денег (+150)'); Game.Stats.Money.add(150);}],
});

Game.Scenes.FifthPart[138] = new Scene({
  text: `
            Сделав минимальные домашние обязанности, я вернулась в комнату, где решила немного поработать, чтобы хоть как-то оправдать свое нежелание идти на учебу. 
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => {
    Game.Scenes.FifthPart[139].begin();
    Game.Stats.Study.add(-1);
    Game.message('Вы пропустили учебу, поэтому ваша успеваемость снизилась');
  }],
});

Game.Scenes.FifthPart[139] = new Scene({
  text: `
            Лежа на кровати, я понимала, что мне нужно уделить больше времени разбору эпохи, в которую я то и дело перемещаюсь. Но сейчас этого делать совершенно не хотелось. 
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[140].begin();}],
});

Game.Scenes.FifthPart[140] = new Scene({
  text: `
            Из-за того, что мне нечем было занять себя, я то и дело погружалась в мысли о плохом. Меня терзали сомнения по поводу моих выборов и решений, которые влияли не только на мою жизнь. 
            <p>“Как оставаться в своем уме, постоянно имея столько переживаний?”
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[141].begin();}],
});

Game.Scenes.FifthPart[141] = new Scene({
  text: `
           Так прошла неделя. Или около того. Университет - дом. Дом - университет. Порядок был не важен. Я старалась посещать занятия, быть примерной дочерью. Однако мое душевное состояние не становилось лучше.
            <p>На выходных в голову пришла очевидная мысль.
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[142].begin();}],
});

Game.Scenes.FifthPart[142] = new Scene({
  text: `
           “Надо выбраться куда-нибудь. В нескольких часах езды находится озеро. Мы часто были там с родителями, есть в этом месте что-то успокаивающее. Я уверена, это поможет мне развеяться. Возможно даже стоит кого-нибудь пригласить. Спонтанность - мое все.”
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[143].begin();}],
});

Game.Scenes.FifthPart[143] = new Scene({
  text: `
           Решение было принято. И я:
            `,
  background: "Backgrounds/Phone",
  buttontext: [
    'Написала Нэйтану',
    'Написала Леону',
    'Написала Скарлетт',
    'Написала Шерил',
  ],
  buttonaction: [
    () => { Game.Scenes.FifthPart[144].begin(); Game.Stats.GoToLakeWith.attitude='Neitan'; AndroidApp ('showAd'); },
    () => { Game.Scenes.FifthPart[199].begin(); Game.Stats.GoToLakeWith.attitude='Leon'; AndroidApp ('showAd');},
    () => { Game.Scenes.FifthPart[291].begin(); Game.Stats.GoToLakeWith.attitude='Scarlett'; AndroidApp ('showAd');},
    () => { Game.Scenes.FifthPart[386].begin(); Game.Stats.GoToLakeWith.attitude='Cheryl'; AndroidApp ('showAd');},
  ],
});

Game.Scenes.FifthPart[144] = new Scene({
  text: `
    Наверное было странно надеяться, что преподаватель согласится на такое времяпровождение со своей студенткой. Даже учитывая тот факт, что когда мы близко общались с Леоном, так или иначе, профессор контактировал со мной. И все же, этого все равно было недостаточно для подобных авантюр.
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[145].begin();}],
});

Game.Scenes.FifthPart[145] = new Scene({
  text: `
    Несмотря на все логичные доводы против этой затеи, я решилась написать Нэйтану. Единственный для него повод согласиться на встречу - недавнее происшествие. Наш прошлый разговор, по неизвестным мне причинам -  озадачил его. Возможно, он как и я, благодаря этой поездке ответит на некоторые свои вопросы.
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[146].begin();}],
});

Game.Scenes.FifthPart[146] = new Scene({
  text: `
    К моему удивлению, ответ пришел практически сразу. Он согласился с необходимостью встречи и довольно быстро приехал. Через час профессор стоял около своей машины, ожидая моего выхода. 
    <p>Я не заставила себя долго ждать, так как наряжаться не было ни желания, ни повода. 
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[147].begin();}],
});

Game.Scenes.FifthPart[147] = new Scene({
  text: `
    “Это просто встреча, которая поможет нам обоим. Это не свидание. Это же не свидание, да?”
    <p>Уже подходя к машине, я начала переживать, стоило мне только увидеть Нэйтана. Особенно волнительно было лицезреть его в совершенно непривычном образе.
            `,
  background: "",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[148].begin();}],
});

Game.Scenes.FifthPart[148] = new Scene({
  text: `
    Вместо классического официозного стиля Нэйтан стоял в сером мешковатом худи. Незнакомцы вполне могли подумать, что он студент, ведь новый стиль одежды лишь сильнее молодил его. 
    <p>“А ему действительно к лицу такой образ. Вот бы Скарлетт увидела, а то ведь не поверит, что Нэйтан надел что-то кроме костюма.”
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[149].begin();}],
});

Game.Scenes.FifthPart[149] = new Scene({
  text: `
    - Здравствуйте, профессор. Спасибо, что согласились на эту встречу, - промямлила я, не зная, как завести разговор. 
    <p>- Брось, - мужчина выглядел радушно. - Давай опустим эти формальности. Мы же не чужие люди. Я приехал поддержать тебя. Леон упоминал, что у тебя настали не лучшие времена. 
    <p>“Что там интересно Леон мог такого сказать?”
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[151].begin();}],
  condition: function () {
    if(Game.Stats.GoStudy.get>=1){
      this.buttonaction[0] = () => {
        Game.Scenes.FifthPart[150].begin();
        Game.message('Нэйтан гордится вашим стремлением к знаниям');
        Game.Stats.Neitan.add(1);
      }
    }
    else{
      this.buttonaction[0] = () => { Game.Scenes.FifthPart[151].begin();}
    }
  }
});

Game.Scenes.FifthPart[150] = new Scene({
  text: `
    - К тому же, - заметил Нэйтан, - я рад, что несмотря на плохое самочувствие, ты посещала все занятия. Твоей выдержке можно только позавидовать!
    <p>- Спасибо… Ты постоянно говоришь мне, как важна учеба и знания. Я решила подтянуть свою успеваемость. Вроде как все удачно складывается. 
    <p>- Безусловно! Рад, что ты прислушиваешься ко мне. 
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[151].begin();}],
});

Game.Scenes.FifthPart[151] = new Scene({
  text: `
    - Так ты согласен отправиться за город? Ничего, что так далеко? 
    <p>- Я вроде ранее никогда не упоминал, но мне нравится место, которое ты предложила. Там по-настоящему красиво: природа, вода, тишина. С удовольствием составлю тебе компанию. 
    <p>Я улыбнулась и мы сели в машину. 
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[152].begin();}],
});

Game.Scenes.FifthPart[152] = new Scene({
  text: `
    Дорога заняла около двух часов, во время которых, мы с профессором поддерживали легкую беседу. Жизнь, планы, конечно же учеба и немного разговоров о близких людях.
    <p>В эти блаженные часы я даже забыла обо всех терзающих меня вопросах, ведь с Нэйтаном было очень комфортно и легко общаться. Он умел находить подход и правильные слова, которые были мне сейчас так необходимы.
            `,
  background: "Backgrounds/Car",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[153].begin(); Game.Sounds.play('Music','Lake')}],
});

Game.Scenes.FifthPart[153] = new Scene({
  text: `
    Сильный ветер обрушился на нас, стоило только выйти из машины. Вода в озере бушевала, будто бы порываясь выйти наружу и затопить все вокруг. 
    <p>- Не повезло с погодой, - констатировал факт профессор. - Давай вернемся обратно в машину. Я знаю одно кафе неподалеку, там подают вкусную пасту.
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[154].begin();}],
});

Game.Scenes.FifthPart[154] = new Scene({
  text: `
    Я посмотрела на Нэйтана. Он был прав, не стоило оставаться здесь. Но мне нужна была разрядка. Чистый горизонт без всех этих проблем, машин или шума города. 
    <p>“Я так мечтала выбраться хоть куда-нибудь… Пусть даже и не повезло с погодой, однако так быстро уезжать отсюда совсем не хочется”.  
    <p>- Мы можем хотя бы немного побыть здесь?
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[155].begin();}],
});

Game.Scenes.FifthPart[155] = new Scene({
  text: `
    Нэйтан удивленно посмотрел на меня, явно не понимая моего упорства. Но лишь кивнул в ответ и добавил:
    <p>- Только не отходи далеко от меня. 
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[156].begin();}],
});

Game.Scenes.FifthPart[156] = new Scene({
  text: `
    Мы подошли к берегу, где не на шутку разыгрались волны.
    <p>Я обхватила себя руками, осознавая, что мне безумно нравится окружающий пейзаж. Да, он был по-своему мрачный, но природа от этого не становилась менее привлекательной. Нет. Это была стихия, которая не может быть ни кем контролируема.
    <p>- Это потрясающе…
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[158].begin();}],
});

Game.Scenes.FifthPart[158] = new Scene({
  text: `
    - Ты так считаешь? Признаться, я тоже нахожу это занимательным зрелищем, - Нэйтан говорил медленно, будто бы что-то вспоминая. - Раньше я боялся воды, но оказывается, что есть куда более страшное ненастье - огонь. 
    <p>- Вы говорите такими загадочными фразами, прям как один мой знакомый. 
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[159].begin();}],
});

Game.Scenes.FifthPart[159] = new Scene({
  text: `
    - А я знаю этого “знакомого”? - уточнил Нэйтан.
    <p>- Сомневаюсь в этом, - я задумалась. - Вы, скажем так, в “разных мирах”. 
    <p>- Теперь я окончательно запутался…
    <p>Мы засмеялись. Искренне. Легко. 
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[160].begin();}],
});

Game.Scenes.FifthPart[160] = new Scene({
  text: `
    Я стала ощущать, что мне все проще поддерживать общение с Нэйтаном. Он открывался с совершенно другой стороны. Его сухость и скованность сменилась непринужденностью. Именно сейчас я поняла, какая большая разница между «преподавателем Нэйтаном» и тем, кто был передо мной.
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[161].begin();}],
});

Game.Scenes.FifthPart[161] = new Scene({
  text: `
    “Неужели ему и правда сложно свободно выражать свои чувства, он будто бы скрывает эту эмоциональную часть себя. Мы в чем-то похожи, оба что-то прячем от других….”
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[162].begin();}],
});

Game.Scenes.FifthPart[162] = new Scene({
  text: `
    - Спасибо… - мне вдруг захотелось сказать это простое слово. - Ты всегда рядом со мной. Делаешь для меня больше, чем просто наставник. 
    <p>Нэйтан опешил от моей искренности и ответил:
    <p>- Я не уверен, что могу позволить себе быть так близко к тебе. 
    <p>- Но ты уже…
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[163].begin();}],
});

Game.Scenes.FifthPart[163] = new Scene({
  text: `
    Минутная пауза. Мне казалось, что мой искренний порыв оттолкнул его и снова заставил закрыться. Однако он лишь с задумчивым видом произнес:
    <p>- Ты сильная, $Имя Игрока$. Но я слишком хорошо тебя знаю. То, как ты скрываешь свои чувства ото всех, лишь бы не приносить неудобства. Мне просто хочется помочь тебе в такие моменты. Но я уверен, чтобы ни происходило - ты справишься. 
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[164].begin();}],
});

Game.Scenes.FifthPart[164] = new Scene({
  text: `
     Я верила этим словам, как и самому Нэйтану. Мне было тяжело, но осознание, что кто-то понимает меня и хочет помочь - вселяло уверенность в собственных силах. 
    <p>Была и другая половина меня, которая хотела утонуть в своей слабости, плакать и ныть всем подряд об этом дурацком бремени.
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[165].begin();}],
});

Game.Scenes.FifthPart[165] = new Scene({
  text: `
     Однако за столь короткий срок, я научилась чаще справляться с проблемами самостоятельно. Тяжело жить в двух мирах без поддержки. Возможно, я действительно выросла и начала по-другому ценить свою жизнь и, конечно, жизнь близких.
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[177].begin();}],
  condition: function () {
    if(Game.Stats.Neitan.get>=6){
      this.buttonaction[0] = () =>{ Game.Scenes.FifthPart[166].begin();}
      Game.Sounds.play('Music','Neitan');
    }
    else{
      this.buttonaction[0] = () =>{ Game.Scenes.FifthPart[177].begin();}
    }
  }
});

Game.Scenes.FifthPart[166] = new Scene({
  text: `
     Нэйтан, видимо, заметил мои колебания и изменение в настроении, поэтому пошел на встречу и аккуратно взял меня за руку. 
     Его прикосновение было неожиданным, но таким теплым и приятным. Я чувствовала в этом жесте поддержку. Поддержку моей решимости. 
    <p>Одновременно с этим пришла и надежда, что я смогу положиться на этого человека и мое бремя станет немного легче.
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[167].begin();}],
});

Game.Scenes.FifthPart[167] = new Scene({
  text: `
     У меня не было возможности разгадать, о чем думает профессор. 
     Он изучал меня, смотрел как на экспонат, к которому нельзя было прикасаться. Запретный плод манил его, заставляя действовать против правил.
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[168].begin();}],
});

Game.Scenes.FifthPart[168] = new Scene({
  text: `
     Нэйтан чуть сильнее сжал мою ладонь, привлекая внимание. И я посмотрела на него. 
     Он не отводил от меня взгляд, нежно проводя линию шершавыми пальцами от запястья, поднимаясь все выше. 
     Дойдя до конечной точки - плеча, он аккуратно обернул круг и задержался в непосредственной близости от моей шеи, раздумывая.
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[169].begin();}],
});

Game.Scenes.FifthPart[169] = new Scene({
  text: `
     Это было очень волнительно. В какой-то момент, я даже прикрыла глаза, замирая от новых и приятных ощущений.
    <p>- $Имя Игрока$, - мужчина нарушил сладкую тишину. - Тебе не стоит позволять мне вести себя так раскрепощенно. 
    Я не тот, на кого ты можешь положиться. Я подводил людей, и совершил, пожалуй, слишком много ошибок.
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[170].begin();}],
});

Game.Scenes.FifthPart[170] = new Scene({
  text: `
     Нэйтан вернул свою руку к моей ладони и легонько касался ее подушечками пальцев. 
    <p>Мне потребовались некоторые усилия, чтобы снова начать трезво мыслить и я сказала то, что чувствовала сейчас:
    <p>- Не бывает ничего непоправимого. Я хочу помочь тебе. Мы не можем исправить прошлое, но можем помогать друг другу в будущем!
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[171].begin();}],
});

Game.Scenes.FifthPart[171] = new Scene({
  text: `
     - Ты неисправима, - Нэйтан прервал мои рассуждения.
    <p>На мгновение мужчина замер, словно пытаясь решиться на что-то. Бросив беглый взгляд на озеро, он, казалось, понял что-то для себя и посмотрел мне прямо в глаза. Серьезно. Вдумчиво. 
    <p>- Профессор…
    <p>- И я снова просто профессор.
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[172].begin();}],
});

Game.Scenes.FifthPart[172] = new Scene({
  text: `
     Нэйтан резко и крепко обнял меня, прижимая к своей груди. Ощущение теплоты, его запах - в этих объятиях я вдруг почувствовала себя защищенной. Меня больше не волновала пасмурная погода и назойливое завывания ветра. Трепет моего сердца принадлежал только ему. Он полностью завладел моими переживаниями и мыслями.
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[173].begin();}],
});

Game.Scenes.FifthPart[173] = new Scene({
  text: `
     Нэйтан едва заметно касался моих волос, аккуратно проводя руками по непослушным локонам. Заправил за ухо несколько прядей, глядя на меня с нежностью.
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[174].begin();}],
});

Game.Scenes.FifthPart[174] = new Scene({
  text: `
     В своих мыслях я мечтала:
    <p>“Это может быть началом чего-то нового. Мне больше всего хотелось узнавать Нэйтана, постепенно открывая его как новую долгожданную книгу. Хотелось быть причиной всех его чувств.”
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[175].begin();}],
});

Game.Scenes.FifthPart[175] = new Scene({
  text: `
      - Спасибо за надежду, - его бархатистый шепот коснулся моего уха.
      <p>Я не знала, что эти слова могут значить для Нэйтана. Но то, что он решил поделиться своими чувствами - говорит о больших успехах в наших взаимоотношениях. 
      <p>- Я постараюсь быть рядом. Я хочу стать для тебя тем человеком, с которым ты сможешь быть собой, - я сильнее обхватила его руками, надеясь, что мои чувства дойдут до него.
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => {
    Game.Scenes.FifthPart[176].begin();
    Game.message('Между вами и Нэйтаном зарождается новое чувство');
    Game.Stats.Neitan.add(2);
    Game.Achievements.LakeNeitan.unlock();
  }],
});

Game.Scenes.FifthPart[176] = new Scene({
  text: `
      Когда мы разъединили объятия, то на секунду замерли, смотря в глаза друг другу. Это был волшебный момент, который я буду бережно хранить в своих воспоминаниях.
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[180].begin(); Game.Sounds.play('Music','Lake');}],
});

Game.Scenes.FifthPart[177] = new Scene({
  text: `
    Профессор похлопал меня по плечу, будто бы хотел таким образом вернуть меня в реальность, не дать мне окончательно закопаться в своих проблемах. 
    <p>- Все будет хорошо, - его добродушная улыбка вселяла уверенность. 
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[178].begin();}],
});

Game.Scenes.FifthPart[178] = new Scene({
  text: `
    Возможно, в глубине души я ожидала большего. Мои чувства не достигли Нэйтана в той мере, в которой мне хотелось. Но я понимала, почему все происходило именно таким образом. 
    <p>Он всегда окружал меня заботой, той самой братской поддержкой о которой мне рассказывал Леон.
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[179].begin();}],
});

Game.Scenes.FifthPart[179] = new Scene({
  text: `
    “Я рада, что Нэйтан открылся мне. Возможно, сегодня мне удалось лучше понять его. Уверена, мы станем ближе. Как хорошие друзья.”
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[180].begin();}],
});

Game.Scenes.FifthPart[180] = new Scene({
  text: `
    И все же, как бы хорошо мы не проводили время, я не забывала, зачем мы приехали сюда на самом деле. 
    <p>- Нэйтан, я должна спросить, - моя робко сказанная фраза заставила мужчину перемениться в лице. 
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[181].begin();}],
});

Game.Scenes.FifthPart[181] = new Scene({
  text: `
    Мне показалось, что он боялся услышать дальнейшее, но в реальности сказал:
    <p>- Все, что хочешь, - он отвел взгляд в сторону бушующей воды. 
    <p>“Нет смысла увиливать. Спрошу прямо.
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[182].begin();}],
});

Game.Scenes.FifthPart[182] = new Scene({
  text: `
    - Кто такой Эдвард? 
    <p>- Почему ты так хочешь это знать? - Нэйтан недовольно вздохнул.
    <p>- Твоя реакция на обычное имя меня заинтересовала, не более.
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[183].begin();}],
});

Game.Scenes.FifthPart[183] = new Scene({
  text: `
    Профессор на секунду задумался, затем ответил: 
    <p>- Это мой предок. Я удивился и растерялся, когда ты назвала это имя, видимо где-то на задворках сознания о нем сохранилась память. И я убедился в этом, изучив некоторые источники. 
    <p>- Значит, это правда. Ваш предок жил в эпоху Николы Теслы?
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[184].begin();}],
});

Game.Scenes.FifthPart[184] = new Scene({
  text: `
    - Правда. Но почему тебя это так интересует? Откуда ты вообще узнала о его существовании? 
    <p>- Дело в подготовке к эссе, которое вы когда-то задавали. Я случайно обнаружила фотографию Теслы на неком приеме…  Мне даже не верится, что бывают настолько похожие люди.
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[185].begin();}],
});

Game.Scenes.FifthPart[185] = new Scene({
  text: `
    - Вот оно как, - Нэйтан посмотрел на меня так, как будто бы для себя он все отчетливо понял. - Надеюсь, наши недопонимания исчезли?
    <p>“А исчезли ли? Ложь это или правда, я вряд ли сейчас узнаю. Однако даже от такого ответа мне стало чуточку легче. По крайне мере он пошел на контакт и не настроен враждебно.”
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[186].begin();}],
});

Game.Scenes.FifthPart[186] = new Scene({
  text: `
    - Спасибо, профессор. Спасибо, что согласились на эту поездку. Я чувствую себя гораздо лучше. 
    <p>Он кивнул, возвращая свое внимание к озеру. Присмотревшись к нему, можно было заметить легкую облегченность во взгляде. Будто бы один тяжелый груз покинул его крепкие плечи.
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[187].begin();}],
});

Game.Scenes.FifthPart[187] = new Scene({
  text: `
    Мы немного постояли, слушая, как волны бьются о берег, как завывает ветер, холодным воздухом лаская нашу кожу. 
    <p>Вскоре, Нэйтан ушел в сторону машины, давая мне немного времени, чтобы побыть наедине с собой.
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[188].begin();}],
});

Game.Scenes.FifthPart[188] = new Scene({
  text: `
    Я двинулась следом, но что-то привлекло мое внимание. Среди деревьев было движение. Приглядевшись, я заметила мелькающий маленький силуэт, медленно приближавшийся ко мне.
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[190].begin();}],
});

Game.Scenes.FifthPart[190] = new Scene({
  text: `
    Я подошла ближе и разглядела собаку. 
            `,
  background: "Persons/Dog_Dirty",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[191].begin();}],
});

Game.Scenes.FifthPart[191] = new Scene({
  text: `
    Продрогшая, грязная, но с преданными горящими глазами. Я аккуратно протянула ей руку и на мое удивление животное отозвалось. Собака тронула меня мокрым носом и жалобно заскулила. 
    <p>Я погладила пса и обратила внимание, что на его шее висел ошейник. 
    <p>- Так тебя зовут, Чарли, дружок. Что же мне с тобой делать?
            `,
  background: "Persons/Dog_Dirty",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[192].begin();}],
});

Game.Scenes.FifthPart[192] = new Scene({
  text: `
    Ко мне присоединился Нэйтан. Он сел на корточки рядом со мной и ласково погладил собаку. 
    <p>- Вот так чудо, откуда же он тут взялся? Неужели потерялся? 
    <p>- Профессор, нам нельзя его здесь оставлять, - я не обратила внимание на слова Нэйтана, ведь мною руководила жалость и желание спасти бедное животное.
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[193].begin();}],
});

Game.Scenes.FifthPart[193] = new Scene({
  text: `
    - Я понимаю… Должно быть его хозяева очень переживают. 
    <p>- Я могла бы временно приютить его, думаю, родители не будут против. 
    <p>- Давай попробуем для начала отвезти его к машине. 
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[194].begin();}],
});

Game.Scenes.FifthPart[194] = new Scene({
  text: `
    Нэйтан начал не спеша двигаться в сторону машины, увлекая за собой собаку. Пес сначала стоял в недоумении, но все же последовал за мужчиной на дрожащих лапах.
    <p>Мы благополучно добрались до места назначения и разместились на заднем сидении. Профессор предусмотрительно постелил плед, чтобы согреть животное.
    <p>“Ну и не испачкать салон его автомобиля, конечно.” 
            `,
  background: "Persons/Dog_Dirty",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[195].begin();}],
});

Game.Scenes.FifthPart[195] = new Scene({
  text: `
    Я и не заметила, как прильнула к окошку и сладко задремала. Всю дорогу я мирно посапывала, а Чарли аккуратно положил свою мордочку мне на колени, греясь и отдыхая.
            `,
  background: "Backgrounds/Car",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[196].begin();}],
});

Game.Scenes.FifthPart[196] = new Scene({
  text: `
    Когда машина остановилась, Нэйтан аккуратно дотронулся до моего плеча, чтобы разбудить. 
    <p>- $Имя Игрока$, приехали… 
    <p>Я нехотя открыла глаза. Собрала свой рюкзак и ласково позвала Чарли в сторону дома. 
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[197].begin();}],
});

Game.Scenes.FifthPart[197] = new Scene({
  text: `
    Нэйтан помог мне выбраться и сказал напоследок: 
    <p>- Я чудесно провел время, благодарю тебя за поездку. Удачи вам с Чарли, надеюсь, с ним все будет в порядке. Обязательно осмотри его хорошенько, при необходимости - сходите к ветеринару. И если удастся, поищи хозяина. 
    <p>- Ты не останешься?
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[198].begin();}],
});

Game.Scenes.FifthPart[198] = new Scene({
  text: `
    - Мне нужно срочно явиться в университет, - Нэйтан взглянул на наручные часы. - Извини, что так резко покидаю тебя. 
    <p>- Все в порядке, - я улыбнулась. - Удачи, профессор. 
    <p>Когда он уехал, мы с собакой зашли в дом.
            `,
  background: "Persons/Neitan_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[479].begin();}],
});

Game.Scenes.FifthPart[199] = new Scene({
  text: `
    Леон был очень заботлив ко мне, когда они вместе со Скарлетт организовали вечеринку, чтобы поддержать меня. Мне хотелось провести с ним больше времени: расспросить, как у него сейчас в жизни дела, где он, чем занимается. 
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[200].begin();}],
});

Game.Scenes.FifthPart[199] = new Scene({
  text: `
     “Да и в последнее время он совсем пропал с радаров. Это хорошая возможность пообщаться и развеяться. Ведь Леон всегда знает, как поднять мне настроение.”
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[200].begin();}],
});

Game.Scenes.FifthPart[200] = new Scene({
  text: `
     Я написала парню и получила ответ через некоторое время. Леон обещал заехать за мной в течение двух часов. Без лишних “но” или “если”. 
     <p>Пока я лежала на кровати в ожидании, мне в голову пришла совершенно абсурдная мысль.
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[201].begin();}],
});

Game.Scenes.FifthPart[201] = new Scene({
  text: `
     “Наедине с Леоном? Это же не будет похоже на свидание…?”
     <p>Я невольно покраснела, сжимая подушку, пытаясь отогнать смущающие меня мысли. 
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[202].begin();}],
});

Game.Scenes.FifthPart[202] = new Scene({
  text: `
     Пока я ждала Леона, то успела позаниматься домашними делами и помочь маме с ужином. И вот, через какое-то время на экране телефона высветилось заветное сообщение:
    <i>“Не задерживайся, у меня всего одна сигарета :)”
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[203].begin();}],
});

Game.Scenes.FifthPart[203] = new Scene({
  text: `
     Я забежала в ванну, чтобы привести себя в порядок. 
    <p>“Так, вроде неплохо… Немного тональника под глаза, а то совсем на панду становлюсь похожа. Немного туши и помады. Все же надо выглядеть как леди. Чуть-чуть. Вроде неплохо получилось.”
            `,
  background: "Persons/Hero",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[204].begin();}],
});

Game.Scenes.FifthPart[204] = new Scene({
  text: `
     Спустившись вниз, я увидела на пороге Леона, который беседовал с моими родителями. Парень тут же обнял меня и вручил нам с мамой по скромному букетику, состоящему из полевых цветов: ромашек и сирени.  
      <p>- Привет, - произнесла я, любуясь на подарок. - Заставил же ты меня подождать. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[205].begin();}],
});

Game.Scenes.FifthPart[205] = new Scene({
  text: `
     - Я торопился, как мог. Надо было кое-что решить, - Леон указал на припаркованный мотоцикл. - Я наконец сделал это и теперь с гордостью представляю свою малышку. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[206].begin();}],
});

Game.Scenes.FifthPart[206] = new Scene({
  text: `
     Я обомлела, увидев довольно большой черный мотоцикл с незамысловатым синим рисунком на корпусе. 
     <p>Видя огонь в глазах Леона, я поняла, насколько он доволен долгожданной покупкой.
            `,
  background: "Backgrounds/Leon_Bike",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[207].begin();}],
  condition: function () {
    if(Game.Stats.SupportLeon.get>=1){
      this.buttonaction[0] = () => { Game.Scenes.FifthPart[207].begin();}
    }
    else{
      this.buttonaction[0] = () => { Game.Scenes.FifthPart[209].begin();}
    }
  }
});

Game.Scenes.FifthPart[207] = new Scene({
  text: `
     - Не могу поверить, ты и правда сделал это! Даже не представляю, как бы на это отреагировала Скарлетт, ведь она всерьез переживает за тебя. Что же до меня, то я поддерживаю твое решение и не только потому, что мечтаю на нем прокатиться, - сказала я, искренне улыбаясь.

            `,
  background: "Backgrounds/Leon_Bike",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[208].begin(); Game.message('Вы разделяете интересы Леона'); Game.Stats.Leon.add(1)}],
});

Game.Scenes.FifthPart[208] = new Scene({
  text: `
     - Спасибо, что ты на моей стороне. Надеюсь, когда-нибудь и Скар примет мой выбор. Немного времени и этот красавчик все-таки покорит ее сердце, - он погладил мотоцикл, ухмыляясь.
    <p>Я улыбнулась в ответ на забавное высказывание Леона.
            `,
  background: "Backgrounds/Leon_Bike",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[210].begin();}],
});

Game.Scenes.FifthPart[209] = new Scene({
  text: `
     - Ты все-таки сделал это, - я недовольно покачала головой. - Мы же со Скар говорили о том, что это может быть опасно. 
    <p>- А я вам говорил, что итог будет один. Я надеялся, что ты поймешь, - Леон с досадой отвернулся.

            `,
  background: "Backgrounds/Leon_Bike",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[210].begin(); Game.message('Вы не разделяете интерес Леона'); Game.Stats.Leon.add(-1) }],
});

Game.Scenes.FifthPart[210] = new Scene({
  text: `
     - Так мы на нем поедем? - я с недоверием взглянула на транспорт. - Ехать далеко... Ты уверен, что он нас не подведет?
    <p>- Не волнуйся, гнать я особо не буду. А вот испытать его на длинной дистанции очень хочется. В случае чего, я же рядом - вместе справимся. 
            `,
  background: "Backgrounds/Leon_Bike",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[211].begin();}],
});

Game.Scenes.FifthPart[211] = new Scene({
  text: `
     Леон помог мне забраться на мотоцикл и с гордостью вручил свой шлем, а сам надел запасной.
     <p>- Просто держись за меня и старайся не улететь, - парень сел впереди, несколько раз с усилием нажимая ногой на рычаг газа. 
     <p>- Леон, - я пыталась перекричать рев двигателя. - Я на такое не подписывалась…
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[212].begin();}],
});

Game.Scenes.FifthPart[212] = new Scene({
  text: `
     - Ты мне доверяешь?
    <p>Я неуверенно кивнула. В Леоне я не сомневалась, а вот совсем новый мотоцикл - немного меня беспокоил. 
    <p>- В таком случае, обещаю довести вас в целости и сохранности, мадам, - нарочито вежливо сказал Леон, закрывая лицевой щиток.
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[213].begin();}],
});

Game.Scenes.FifthPart[213] = new Scene({
  text: `
     Леон двинулся по проезжей части, как и обещал, не слишком быстро, давая мне возможность привыкнуть к новому способу передвижения. 
    <p>По-началу я сильно вжалась в парня, закрыв глаза, цепляясь за его кожаную куртку просто потому что мне было безумно страшно.
            `,
  background: "Backgrounds/Bike_Together",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[214].begin();}],
});

Game.Scenes.FifthPart[214] = new Scene({
  text: `
      Но мое желание почувствовать скорость придало смелости, и я выглянула из-за спины Леона.
      <p>Ветер. Драйв. Как никогда я почувствовала себя живой, совершенно забывая обо всех накопившихся проблемах и свалившейся на меня ответственности. 
      В какой-то момент, мне захотелось почувствовать ветер, потрогать его. Я осмелилась отпустить одну руку, выставив ее встречному потоку воздуха.
            `,
  background: "Backgrounds/Bike_Together",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[215].begin();}],
});

Game.Scenes.FifthPart[215] = new Scene({
  text: `
      На очередном светофоре, Леон повернулся ко мне и спросил:
      <p>- Ну, что, готова повысить уровень?
      <p>Я кивнула, всецело вверяя себя в его надежные руки. 
            `,
  background: "Backgrounds/Bike_Together",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[216].begin();}],
});

Game.Scenes.FifthPart[216] = new Scene({
  text: `
      Мотоцикл двинулся с места резко, стремительно набирая обороты. Мы быстро разогнались, виляя между потоками машин. 
      <p>“Так вот, что мотивировало Леона приобрести мотоцикл. Он хотел в любой момент иметь возможность ощутить эти эмоции. Почувствовать себя свободным.”
            `,
  background: "Backgrounds/Bike_Together",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[217].begin(); Game.Sounds.play('Music','Lake')}],
});

Game.Scenes.FifthPart[217] = new Scene({
  text: `
      По прибытию на нас тут же обрушился сильный ветер. Вода в озере бушевала, будто бы порываясь выйти наружу и затопить все вокруг. Леон нашел место подальше от воды, где и припарковал свою новую драгоценность.
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[218].begin();}],
});

Game.Scenes.FifthPart[218] = new Scene({
  text: `
       - Мда, вот так погодка, - с досадой заметил парень. - Предлагаю больше не мерзнуть здесь и отправиться в одно кафе неподалеку. 
       У них в меню есть супер сочный бургер. Я как-то узнавал их секрет, оказалось, они используют для приготовления аж четыре вида мяса, представляешь!
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[219].begin();}],
});

Game.Scenes.FifthPart[219] = new Scene({
  text: `
       Я посмотрела на Леона. Он был прав, не стоило оставаться здесь. Да и перспектива провести время в уютном и теплом кафе - привлекала. Но мне нужна была разрядка. Чистый горизонт без всех этих проблем, машин или шума города. 
      <p>“Я так мечтала выбраться хоть куда-нибудь… Пусть даже и не повезло с погодой, однако так быстро уезжать отсюда совсем не хочется”.  
      <p>- Мы можем хотя бы немного побыть здесь?
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[220].begin();}],
});

Game.Scenes.FifthPart[220] = new Scene({
  text: `
       - Конечно, почему нет… От такого ветерка еще никто не умирал, а вот от простуды - вполне себе, - он открыл сиденье мотоцикла, достал оттуда небольшой плед и с заботой положил его мне на плечи. 
       <p>Я поблагодарила Леона, укутываясь сильнее в мягкую и теплую ткань.
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[221].begin();}],
});

Game.Scenes.FifthPart[221] = new Scene({
  text: `
       Мы подошли к берегу, где не на шутку разыгрались волны.
       <p>Я обхватила себя руками, осознавая, что мне безумно нравится окружающий пейзаж. Да, он был по-своему мрачный, но природа от этого не становилась менее привлекательной. Нет. Это была стихия, которая не может быть ни кем контролируема.
       <p>- Это потрясающе…
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[222].begin();}],
});

Game.Scenes.FifthPart[222] = new Scene({
  text: `
       - Что именно? - уточнил Леон, равнодушно оглядывая местность. 
      <p>- Буря? Хаос? Истинная природа, которую человек никогда не сможет обуздать.
      <p>- $Имя Игрока$, а что, если бы мы могли все контролировать? 
      <p>- Что ты имеешь в виду? - тон моего голоса становился беспокойным.
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[223].begin();}],
});

Game.Scenes.FifthPart[223] = new Scene({
  text: `
       Леон это заметил и продолжил:
      <p>- Представь, если бы в твоих силах было предвидеть последствия своих действий. Насколько лучше мог стать мир и каждый живущий в нем? 
      Ведь именно итоги наших поступков зачастую заставляют сомневаться в себе. А эти сомнения понемногу убивают, забирая остатки уверенности в собственных силах.
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[224].begin();}],
});

Game.Scenes.FifthPart[224] = new Scene({
  text: `
       Монолог Леона стал неожиданностью для меня и мы погрузились в собственные мысли, боясь нарушить тишину. 
      <p>“Не помню, когда я в последний раз видела его таким загруженным. От его задорного настроения не осталось и следа. 
      А ведь он всегда такой веселый и простой, словно никогда ни о чем не волнуется. Но, оказалось, внутри у него смятения и бесконечные переживания. 
      Может быть сейчас самое время узнать их причину? Я хочу помочь ему.” 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[225].begin();}],
});

Game.Scenes.FifthPart[225] = new Scene({
  text: `
       - Леон, расскажи, что тебя так беспокоит? Это как-то связано с Нэйтаном? Ты же знаешь, мое сильное женское плечо всегда в твоем распоряжении, - я улыбнулась и посмотрела ему прямо в глаза, надеясь хоть немного разрядить обстановку. 
      <p>- Проницательна, как и всегда, - парень вздохнул. - Сложно сказать. Конечно, в какой-то степени это касается брата, ведь он моя семья. Однако есть много факторов. В последнее время что-то происходит, что-то нехорошее. И я, возможно, обязан принять в этом участие. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[226].begin();}],
});

Game.Scenes.FifthPart[226] = new Scene({
  text: `
        - Но что именно?
        <p>- Послушай, это не то о чем я могу тебе сейчас рассказать, прости. Но можешь мне кое-что пообещать? - он смотрел на меня так, будто бы от моего ответа зависело очень многое.
        <p>- Да, конечно.
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[227].begin();}],
});

Game.Scenes.FifthPart[227] = new Scene({
  text: `
        - Если я однажды скажу тебе оставить все и уехать из города - ты именно так и поступишь, не задавая вопросов. 
        <p>Мне стало не по себе от этих слов. Я даже представить не могла такого развития событий. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[228].begin();}],
});

Game.Scenes.FifthPart[228] = new Scene({
  text: `
        - Леон, знаешь, что? -  я стукнула парня в плечо. - Уж не знаю, чего ты вдруг так проникся меланхоличным настроением этого места, но даже не думай, что я оставлю здесь свою семью и друзей. Столько лет знакомы, а ты словно не знаешь, что сбегать - не в моем стиле.
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[229].begin();}],
});

Game.Scenes.FifthPart[229] = new Scene({
  text: `
        Я поставила руки в бока, подняв высоко голову и закрыв глаза. 
        <p>Немного прищурившись, мне удалось разглядеть улыбку Леона. Он заметно расслабился. Его настроение начало понемногу возвращаться в норму. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[230].begin();}],
});

Game.Scenes.FifthPart[230] = new Scene({
  text: `
        Неожиданно парень сказал: 
        <p>- А сколько мы уже с тобой знакомы, года три? А я все еще не перестаю тебе удивляться. Как ты умудряешься сочетать в себе вселенскую мудрость и врожденную непредусмотрительность? - Леон сделал умное лицо и поправил невидимые очки.  
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[231].begin();}],
});

Game.Scenes.FifthPart[231] = new Scene({
  text: `
        Мы рассмеялись, поддерживая друг друга, чтобы не свалиться с бревна, на котором ранее устроились. 
        <p>“Люблю эту его черту. Превратить все в шутку, чтобы снять напряжение. Потрясающе.”
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[232].begin();}],
});

Game.Scenes.FifthPart[232] = new Scene({
  text: `
        - А если серьезно, - Леон перестал смеяться. - Ты молодец, $Имя Игрока$. И меня умудряешься поддержать, и со своими проблемами как-то, но справляешься. Ты же знаешь, что ты можешь рассчитывать на любую мою помощь. Я рядом.
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[233].begin();}],
});

Game.Scenes.FifthPart[233] = new Scene({
  text: `
        Я верила этим словам, как и самому Леону. Мне было тяжело, но осознание, что кто-то понимает меня и хочет помочь - вселяло уверенность в собственных силах. 
        <p>Была и другая половина меня, которая хотела утонуть в своей слабости, плакать и ныть всем подряд об этом дурацком бремени. 
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[234].begin();}],
});

Game.Scenes.FifthPart[234] = new Scene({
  text: `
        Однако за столь короткий срок, я научилась чаще справляться с проблемами самостоятельно. Тяжело жить в двух мирах без поддержки. Возможно, я действительно выросла и начала по-другому ценить свою жизнь и, конечно, жизнь близких. 
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[235].begin();}],
  condition: function () {
    if(Game.Stats.Leon.get>=6){
      this.buttonaction[0] = () => {Game.Scenes.FifthPart[235].begin(); Game.Sounds.play('Music','Leon')}
    }
    else{
      this.buttonaction[0] = () => {Game.Scenes.FifthPart[254].begin();}
    }
  }
});

Game.Scenes.FifthPart[235] = new Scene({
  text: `
        Леон, видимо, заметил мое смятение и изменение в настроении, поэтому пошел на встречу и замер, пристально изучая мой взгляд. Что-то изменилось в Леоне. Он стал колебаться и все будто бы намеревался что-то сказать, но останавливал себя.
        <p>- Леон, это же я, ты можешь сказать мне что угодно. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[236].begin();}],
});

Game.Scenes.FifthPart[236] = new Scene({
  text: `
        - Будь по твоему, - Леон осторожно взял меня за руку.  - Я очень давно хочу извиниться. Прости меня за то время, которое мы упустили. В частности, из-за меня, ведь это я тогда отдалился. Мы могли бы столько всего сделать вместе.
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[237].begin();}],
});

Game.Scenes.FifthPart[237] = new Scene({
  text: `
        - Я не винила тебя. Все это время мне тоже хотелось извиниться. Тогда я просто позволила тебе отстраниться и даже не пыталась все вернуть, - я невольно сжала руки в кулаки, пытаясь унять подступивший ком в горле. -  Мне было страшно узнать причину… Даже не так, мне было страшно, что я была причиной произошедшего.
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[238].begin();}],
});

Game.Scenes.FifthPart[238] = new Scene({
  text: `
        - Ты иногда так много на себя берешь, что я удивляюсь, как под таким грузом на плечах твой позвоночник не сломался, - парень грустно улыбнулся.
        <p>Я вдруг почувствовала его прикосновение. Леон дотронулся до моей руки. Несколько его пальцев легонько касались моих, сплетаясь между собой.
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[239].begin();}],
});

Game.Scenes.FifthPart[239] = new Scene({
  text: `
        Между нами нарастало совершенное новое чувство, которое будоражило, проходилось приятным теплом по всему телу. 
        <p>- Мы есть друг у друга, - я завороженно смотрела на Леона. - Давай строить настоящее, а не зацикливаться на прошлом. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[240].begin();}],
});

Game.Scenes.FifthPart[240] = new Scene({
  text: `
        - Ты милая, - легкая коварная улыбка проскользнула по его лицу. - Люблю в тебе этот позитив. 
        <p>“Люблю? Стоп… Надо успокоиться. Слово сказано абсолютно в другом ключе.” 
        <p>- А еще мне нравится наблюдать, как ты смущаешься… Это - отдельный вид искусства. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[241].begin();}],
});

Game.Scenes.FifthPart[241] = new Scene({
  text: `
        - Ты…
        <p>Я попыталась что-то сказать, но парень придвинулся ближе, заставляя меня замолчать и замереть в предвкушении. 
        <p>- $Имя Игрока$, я не профи в этих всех делах… говорить о своих чувствах. Может стоит сделать, а уже потом думать о последствиях. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[242].begin();}],
});

Game.Scenes.FifthPart[242] = new Scene({
  text: `
        - Леон, я не понимаю…
        <p>- И не надо. 
        <p>Он обхватил мое лицо руками, быстро приблизился ко мне, а затем нежно накрыл своими губами - мои. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[243].begin();}],
});

Game.Scenes.FifthPart[243] = new Scene({
  text: `
        Первое время мы будто бы изучали друг друга. Легкий поцелуй Леона дал мне возможность привыкнуть, прочувствовать этот момент. Местами сухие губы становились мягче, а на послевкусии остался легкий след мяты. 
        <p>Я посмотрела на его лицо.. Закрытые глаза, длинные ресницы…
        <p>“Леон…”
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[244].begin();}],
});

Game.Scenes.FifthPart[244] = new Scene({
  text: `
        Неожиданно он прервал поцелуй. Коснулся своим лбом моего и изучал мою реакцию. 
        <p>- Я ведь дурак, да? 
        <p>- Еще какой, - я улыбалась, давая Леону понять, что происходящее мне очень нравилось. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[245].begin();}],
});

Game.Scenes.FifthPart[245] = new Scene({
  text: `
        Большего парню было и не надо. Мы обняли друг друга еще сильнее и с новым чувством продолжили погружаться в этот глубокий, сладкий поцелуй. 
        <p>“Я не могу поверить, что это происходит между нами… Как же он хорошо целуется.” 
        <p>Я начала гладить его по волосам, запутывая пальцы в них. Это было для него знаком к продолжению. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[246].begin();}],
});

Game.Scenes.FifthPart[246] = new Scene({
  text: `
        Нас захватила волна страсти, пламя, которое разливалось по всему телу и скапливалось где-то внизу живота. 
        <p>Леон начал оттеснять меня назад, прижимая к ближайшему дереву, не прерывая поцелуй. Его пальцы ловко расстегнули мою куртку, а руки осмелились проникнуть под футболку, касаясь оголенных участков кожи. Те ощущения, которые он дарил мне, перестали складываться в цепочку и я растворялась во множестве мурашек. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[247].begin();}],
});

Game.Scenes.FifthPart[247] = new Scene({
  text: `
        Леон был подобен хищнику, который так жадно хотел вкусить запретный плод. Он боялся последствий, но не мог остановиться, дорвавшись до него.
        <p>Я хотела поделиться с ним этими ощущениями. Медленно, касаясь его, я подняла одну ногу, сильнее прижимая парня к себе. Мне хотелось раствориться в нем. Мы как никогда чувствовали сильное притяжение и хотели большего.
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[248].begin();}],
});

Game.Scenes.FifthPart[248] = new Scene({
  text: `
        На секунду я оторвалась от его губ, так как дышать становилось все труднее. 
        <p>- Леон, подожди, мне нужна передышка, - я говорила отрывисто, вдыхая в себя свежий воздух после каждого слова. 
        <p>Парень снова потянулся к моим губам, но передумал и нежно поцеловал меня в щеку.
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[249].begin();}],
});

Game.Scenes.FifthPart[249] = new Scene({
  text: `
        Своими действиями он показывал, как я ему дорога. Желание владело им, нами обоими, но мы не хотели спешить, растягивая этот прекрасный миг.
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[250].begin();}],
});

Game.Scenes.FifthPart[250] = new Scene({
  text: `
        - А я и не думал, что от тебя будет так сложно оторваться, - он немного отодвинулся от меня, все еще продолжая держать за руку.
        <p>- Леон, - я хотела слишком многое у него спросить, но даже не знала, с чего начать. 
        <p>- Ты хочешь поговорить о том, что сейчас происходило? Давай повременим. Я не готов, чтобы ты видела, как я смущаюсь.
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[251].begin();}],
});

Game.Scenes.FifthPart[251] = new Scene({
  text: `
        - Я хочу, чтобы ты знал, что я ни о чем не жалею.
        <p>- Поверь, $Имя Игрока$, ты явно дала мне это понять. - он выдохнул. - Сейчас у меня не будет всех ответов. Прости, милашка, - он отчего-то засмеялся и нежно потрепал меня за щеку.
        <p>“Как после такого я могу оставаться спокойной…”
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[252].begin();}],
});

Game.Scenes.FifthPart[252] = new Scene({
  text: `
        Я закрыла глаза, пытаясь насладиться атмосферой этого места, но в голове снова и снова всплывал этот горячий поцелуй. Чем сильнее я пыталась отвлечься, тем ярче меня накрывало желание продолжить. 
        <p>Леон тоже нервничал. Было видно, как он отводит от меня взгляд, пытаясь сосредоточиться на окружающем пейзаже. Как его руки не могут найти одно единственное положение, а ноги то и дело волнительно бьются друг об дружку. 
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => {
    Game.Scenes.FifthPart[253].begin();
    Game.message('Вы и Леон стали значительно ближе к друг другу');
    Game.Stats.Leon.add(2);
    Game.Achievements.LakeLeon.unlock();
  }],
});

Game.Scenes.FifthPart[253] = new Scene({
  text: `
        Я решила разрядить обстановку и игриво толкнула Леона в плечо, говоря:
        <p>- Да расслабься ты. Мы же не перестали быть друзьями и между нами, все останется как прежде. Пока что. Нам обоим нужно подумать о многом, а сейчас давай просто продолжим любоваться прекрасной природой. Это же наша изначальная цель в конце концов. 
        <p>Леон не ответил. Лишь что-то прошептал себе под нос, а затем взял меня за руку. 
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[257].begin(); Game.Sounds.play('Music','Lake')}],
});

Game.Scenes.FifthPart[254] = new Scene({
  text: `
        Леон, видимо, заметил мое смятение и изменение в настроении, поэтому пошел на встречу и сел передо мной на корточки. Несколько прядей упали на его лицо, но он проигнорировал этот факт и взял меня за обе руки: 
        <p>- Я тебе грустить не позволю. Да и себе не позволю. Прости, что так вышло.
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[255].begin();}],
});

Game.Scenes.FifthPart[255] = new Scene({
  text: `
        Я отрицательно покачала головой. Ведь все действительно было хорошо. Особенно после сказанных им слов. 
        <p>- Леон, все прекрасно, я рада узнавать тебя с разных сторон. 
        <p>- О, да. Я могу быть очень разным. Как-нибудь в другой раз непременно покажу тебе, - он отпустил меня, встал и демонстративно размял спину.
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[256].begin();}],
});

Game.Scenes.FifthPart[256] = new Scene({
  text: `
        Возможно, в глубине души я ожидала большего. Мои чувства не достигли Леона в той мере, в которой мне хотелось. Но я понимала, почему все происходило именно таким образом. 
        <p>“Он всегда заботился обо мне, но я, видимо, уделяла этому недостаточно внимания. Все равно я рада, что смогла провести с ним хоть немного времени и развеяться. Уверена, мы станем еще ближе. Как хорошие друзья.”
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[257].begin();}],
});

Game.Scenes.FifthPart[257] = new Scene({
  text: `
        После всего произошедшего мы выдохнули и продолжили наслаждаться легкой прохладой исходящей от неспокойного озера. Разговаривали на отвлеченные темы, проводили время вместе, получая удовольствие от этих мгновений. 
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[258].begin();}],
});

Game.Scenes.FifthPart[258] = new Scene({
  text: `
        - Кстати, Леон, ты так и не сказал мне, где работаешь, чем сейчас занимаешься в жизни… 
        <p>- Не перестаю повторять, что ты очень любопытная, - парень слегка взъерошил мне волосы на макушке. - Раз уж я сегодня такой добрый, разрешаю тебе задать всего один вопрос. Обязуюсь ответить честно! 
        <p>- Один? - я с досадой на него взглянула. - Это несправедливо. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[259].begin();}],
});

Game.Scenes.FifthPart[259] = new Scene({
  text: `
        - Если я тебе все сразу расскажу, как же буду поддерживать интерес к своей персоне?
        <p>“Он издевается? Иногда Леон невыносим, ох. Ладно. Я принимаю правила игры. В конце концов когда-нибудь он ответит на все мои вопросы”
        <p>Я спросила: 
            `,
  background: "Persons/Leon_New",
  buttontext: ['Что происходит между тобой и Нэйтаном?','Кем ты работаешь?' ,'Расскажешь о своих планах на будущее?'],
  buttonaction: [
    () => { Game.Scenes.FifthPart[260].begin();},
    () => { Game.Scenes.FifthPart[265].begin();},
    () => { Game.Scenes.FifthPart[269].begin();},
  ],
});

Game.Scenes.FifthPart[260] = new Scene({
  text: `
        - Я был уверен, что ты спросишь именно об этом, - Леон отвернулся, спрятав руки в карманы джинсов. 
        <p>- Уж прости, мистер таинственность. Ты обещал ответить честно, я напоминаю. 
        <p>- Да-да…
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[261].begin();}],
});

Game.Scenes.FifthPart[261] = new Scene({
  text: `
        На несколько секунд повисла тишина. Было видно, как парень пытается подобрать нужные слова. Он продолжил:
        <p>- Нэйт и я, мы слишком по-разному смотрим на жизнь. Из-за этого постоянно возникают конфликты. 
        <p>- Но вы же братья. Неужели есть что-то такое, возможно, некое событие, которое вас настолько сильно разделило?
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[262].begin();}],
});

Game.Scenes.FifthPart[262] = new Scene({
  text: `
        - Есть. Я бы даже сказал не событие, а именно подход… кхм… к определенным обстоятельствам. 
        <p>- Так это и есть то, о чем ты переживаешь? Поэтому ты сегодня словно “не в своей тарелке”?
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[263].begin();}],
});

Game.Scenes.FifthPart[263] = new Scene({
  text: `
        - Я вроде обещал ответить только на один вопрос, - Леон вздохнул. - Наше мнение по одному вопросу с Нэйтаном очень сильно расходится. И я не в праве говорить подробности, так как это не только моя тайна. И снова, надеюсь на твое понимание. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[264].begin();}],
});

Game.Scenes.FifthPart[264] = new Scene({
  text: `
        “Уверена, он молчит не просто так. Всему свое время… Все честно, я и сама многое от него скрываю, но надеюсь когда-нибудь настанет момент, когда мы поговорим открыто. И все же, что могло такого произойти? Связано ли это с Эдвардом, который так похож на Нэйтана? Хотя при чем тут это? Не буду накручивать себя раньше времени.”
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[273].begin();}],
});

Game.Scenes.FifthPart[265] = new Scene({
  text: `
        - Уж не думал, что тебе это так интересно, - Леон легонько засмеялся.
        <p>- Почему нет? Я же хочу узнать больше о твоей жизни. 
        <p>- Это похвально. И мило. Я уже говорил, да, что ты милая?
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[266].begin();}],
});

Game.Scenes.FifthPart[266] = new Scene({
  text: `
        Я проигнорировала это высказывание и демонстративно закатила глаза. 
        <p>- Так ты ответишь? А то складывается впечатление, что ты увиливаешь, - я толкнула его в бок. 
        <p>- Долгое время работал на полставки в строительном магазине. Сейчас устроился в автосервис - механиком. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[267].begin();}],
});

Game.Scenes.FifthPart[267] = new Scene({
  text: `
        - Ого, здорово, что ты не стоишь на месте. 
        <p>- Да. Я всегда любил пробовать себя в разных сферах деятельности. Мне кажется, только так можно стать по-настоящему разносторонним человеком и даже, не побоюсь таких громких высказываний, понять этот мир. 
        <p>- И как работается на новом месте?
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[268].begin();}],
});

Game.Scenes.FifthPart[268] = new Scene({
  text: `
        - Мне очень повезло с коллективом. Мы все будто бы на одной волне. Ребята помогли мне с поиском мотоцикла и даже были не против, чтобы я загнал его для починки некоторых деталей.  
        <p>- Всегда считала, что понимающий коллектив - это самое главное в работе. 
        <p>- Отчасти, так оно и есть. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[273].begin();}],
});

Game.Scenes.FifthPart[269] = new Scene({
  text: `
        - Внезапно. Такой обширный вопрос, я признаться, даже и не знаю, что ответить, - Леон призадумался. 
        <p>- Понимаю. И все же. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[270].begin();}],
});

Game.Scenes.FifthPart[270] = new Scene({
  text: `
        - Я точно уверен в том, что хотел бы переехать. Скорее всего после окончания университета. 
        <p>Такое откровение было для меня чем-то крайне неожиданным и грустным. 
        <p>“Он уедет… А я? Что буду делать я? Хотя как я могу удерживать его тут?”
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[271].begin();}],
});

Game.Scenes.FifthPart[271] = new Scene({
  text: `
        - Куда бы ты хотел отправиться? 
        <p>- Еще не решил. Но мы не привыкли находиться на одном месте долго. Путешествовать, узнавать мир - в этом и заключается смысл моей жизни, - Леон слегка улыбнулся. - Может быть я даже позволю себе отдых. Просто отправлюсь в место, где всегда тепло. Сяду на берег, буду любоваться морскими просторами…
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[272].begin();}],
});

Game.Scenes.FifthPart[272] = new Scene({
  text: `
        - Как романтично, - я вдруг представила Леона в подобном месте. Такого спокойного, умиротворенного, окруженного лучами теплого солнца. Мне стало легче, осознавая, что именно в такие моменты приходит заветное спокойствие, которое нам всем так необходимо. 
        <p>- Ты так считаешь? Разве одиночество - романтично? Возможно. Но до этого еще далеко. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[273].begin();}],
});

Game.Scenes.FifthPart[273] = new Scene({
  text: `
        Мы еще немного постояли, слушая, как волны бьются о берег, как завывает ветер, холодным воздухом лаская нашу кожу. 
        <p>Вскоре, Леон ушел в сторону мотоцикла, давая мне немного времени, чтобы побыть наедине с собой. 
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[274].begin();}],
});

Game.Scenes.FifthPart[274] = new Scene({
  text: `
        Я двинулась следом, но что-то привлекло мое внимание. Среди деревьев было движение. Приглядевшись, я заметила мелькающий маленький силуэт, медленно приближающийся ко мне.  
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[275].begin();}],
});

Game.Scenes.FifthPart[275] = new Scene({
  text: `
        Я подошла ближе и разглядела в нем собаку. 
            `,
  background: "Persons/Dog_Dirty",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[276].begin();}],
});

Game.Scenes.FifthPart[276] = new Scene({
  text: `
        Продрогшая, грязная, но с преданными горящими глазами. Я аккуратно протянула ей руку и на мое удивление животное отозвалось. Собака тронула меня мокрым носом и жалобно заскулила. 
            `,
  background: "Persons/Dog_Dirty",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[277].begin();}],
});

Game.Scenes.FifthPart[277] = new Scene({
  text: `
        Я погладила пса и обратила внимание, что на его шее висел ошейник. 
        <p>- Так тебя зовут, Чарли, дружок. Что же мне с тобой делать? 
            `,
  background: "Persons/Dog_Dirty",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[278].begin();}],
});

Game.Scenes.FifthPart[278] = new Scene({
  text: `
        Ко мне присоединился Леон, который встал со мной рядом и таким же обеспокоенным взглядом посмотрел на собаку:
        <p>- Не знаю, что случилось с хозяином, но надеюсь он не из тех ублюдков, кто просто бросил его здесь на произвол судьбы.
        <p>- Согласна с тобой. Нам нельзя его здесь оставлять. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[279].begin();}],
});

Game.Scenes.FifthPart[279] = new Scene({
  text: `
        - Понимаю. Но на моем мотоцикле втроем мы не уедем. 
        <p>- Мы что-нибудь придумаем, - я продолжала гладить Чарли, пытаясь успокоить его дрожь. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[280].begin();}],
});

Game.Scenes.FifthPart[280] = new Scene({
  text: `
        Леон начал не спеша двигаться в сторону мотоцикла, увлекая за собой собаку. Пес сначала стоял в недоумении, но все же последовал за мужчиной на полусогнутых лапах.
            `,
  background: "Persons/Dog_Dirty",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[281].begin();}],
});

Game.Scenes.FifthPart[281] = new Scene({
  text: `
        - Давай вызывать такси. Я поеду за вами следом и прослежу, чтобы вы добрались в целости и сохранности. 
        <p>- Спасибо! -  я начала копаться в сумке в поисках телефона. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[282].begin();}],
  condition: function () {
    if(Game.Stats.Leon.get>=6){
      this.buttonaction[0] = () => { Game.Scenes.FifthPart[282].begin();}
    }
    else{
      this.buttonaction[0] = () => { Game.Scenes.FifthPart[286].begin();}
    }
  }
});

Game.Scenes.FifthPart[282] = new Scene({
  text: `
        Когда такси подъехало, Леон вышел вперед к водителю и сказал:
        <p>- Вот необходимая сумма, - он протянул деньги. - Я буду следовать за вами, чтобы не возникло каких-то проблем. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[283].begin();}],
});

Game.Scenes.FifthPart[283] = new Scene({
  text: `
        Я и Чарли к этому времени успели разместиться на заднем сиденье. Леон подошел, чтобы убедиться, что с нами все хорошо. 
        <p>Неожиданно водитель, который все это время поглядывал на нас в зеркало заднего вида, проговорил:
        <p>- Какой у вас жених, барышня! Странно только, что это он тебя в такую погоду на прогулку повез. Не беспокоится небось? 
            `,
  background: "Backgrounds/Lake_Taxi",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[284].begin();}],
});

Game.Scenes.FifthPart[284] = new Scene({
  text: `
        Я покраснела от сказанных им слов. Даже не обратила внимание на колкость. В голове прокручивалась фраза:
        <p>“Жених…”
            `,
  background: "Backgrounds/Lake_Taxi",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[285].begin(); Game.message('Благодаря хорошим отношениям с Леоном, парень вызвался сам оплатить вам такси')}],
});

Game.Scenes.FifthPart[285] = new Scene({
  text: `
        Краем глаза я видела, как Леон отчего-то широко улыбался. Он быстро отвернулся и направился к мотоциклу. 
            `,
  background: "Backgrounds/Lake_Taxi",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[287].begin();}],
});

Game.Scenes.FifthPart[286] = new Scene({
  text: `
        Я незамедлительно вызвала и оплатила такси. На карте было видно, что движение на дорогах свободное, поэтому ожидание было недолгим.
        <p>Когда водитель приехал, я и Чарли разместились на заднем сидении. 
            `,
  background: "",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[287].begin(); Game.message('Вы потратили часть своих денег (200)'); Game.Stats.Money.add(-200)}],
});

Game.Scenes.FifthPart[287] = new Scene({
  text: `
        Леон, как и обещал, следовал за нами до самого дома. 
        <p>Я и не заметила, как прильнула к окошку и сладко задремала. Всю дорогу я мирно посапывала, а Чарли аккуратно положил свою мордочку мне на колени, греясь и отдыхая.
            `,
  background: "Backgrounds/Lake_Taxi",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[288].begin();}],
});

Game.Scenes.FifthPart[288] = new Scene({
  text: `
        Когда машина остановилась, Леон аккуратно дотронулся до моего плеча, чтобы разбудить. 
        <p>- $Имя Игрока$, приехали… 
        <p>Я нехотя открыла глаза. Собрала свой рюкзак и ласково позвала Чарли в сторону дома. 
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[289].begin();}],
});

Game.Scenes.FifthPart[289] = new Scene({
  text: `
        Леон помог мне выбраться и сказал напоследок: 
        <p>- Считаю, что мы отлично провели время. А главное - сделали доброе дело, - парень погладил шейку собаки. - Обязательно отмой его хорошенько и накорми чем-нибудь вкусным. А затем попробуй отыскать хозяина. 
        <p>- Ты не останешься?
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[290].begin();}],
});

Game.Scenes.FifthPart[290] = new Scene({
  text: `
        - Прости, мне нужно уехать на работу, - Леон посмотрел на сообщение, которое ему пришло на мобильный телефон. - Уверен, твоя замечательная мама поможет со всем.
        <p>- Спасибо, Леон. Удачи на работе.
        <p>Мы обнялись на прощание. Дождавшись, пока он уедет, я завела собаку в дом.
            `,
  background: "Persons/Leon_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[479].begin();}],
});

Game.Scenes.FifthPart[291] = new Scene({
  text: `
        Скарлетт всегда заботится обо мне, беспокоится. Даже если между нами и случаются разногласия, девушка старается оставаться на моей стороне. Быть рядом, поддерживать. 
        <p>“Давно мы не общались с ней вне университета. Сегодня - идеальный день, чтобы это реализовать. Уверена, нам обеим будет на пользу смена обстановки.”
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[292].begin();}],
});

Game.Scenes.FifthPart[292] = new Scene({
  text: `
        Я написала Скарлетт и получила довольно скорый ответ. Она с удовольствием согласилась на поездку и обещала быть в течение часа. 
        <p>Я решила спуститься на кухню, чтобы собрать нам что-нибудь вкусного в дорогу. 
        <p>“Что любит Скарлетт? Надо вспомнить… Точно не всякую вредную еду, ведь следит за фигурой. Колбаса и вовсе ее враг номер один”.
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[293].begin();}],
});

Game.Scenes.FifthPart[293] = new Scene({
  text: `
        На кухне как раз суетилась мама, подготавливая ингредиенты для будущего ужина. Папа сидел на диване и читал газету, поглядывая в телевизор. 
        <p>- Ты куда-то собираешься? - спросила мама, начиная чистить картошку. 
        <p>- Да, решили со Скарлетт съездить на озеро. Давно никуда не выбирались.
            `,
  background: "Backgrounds/Kitchen",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[294].begin();}],
});

Game.Scenes.FifthPart[294] = new Scene({
  text: `
        - Молодцы, - к нам в разговор вклинился папа, отвлекаясь от просмотра футбольного матча и чтения. - Не все же дома сидеть. Могу вас подвезти, кстати. Как раз есть одно дело неподалеку.
        <p>- Это было бы чудесно, спасибо большое! 
            `,
  background: "Backgrounds/Kitchen",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[295].begin();}],
});

Game.Scenes.FifthPart[295] = new Scene({
  text: `
        Мы еще немного поговорили с родителями и я принялась собирать еду. 
        <p>“Что же выбрать?”
            `,
  background: "Backgrounds/Kitchen",
  buttontext: ['Чипсы','Сэндвич с индейкой','Сэндвичи с колбасой','Фрукты с йогуртом'],
  buttonaction: [
    () => { Game.Scenes.FifthPart[296].begin(); Game.Timer.stop();},
    () => { Game.Scenes.FifthPart[297].begin(); Game.Timer.stop();},
    () => { Game.Scenes.FifthPart[298].begin(); Game.Timer.stop();},
    () => { Game.Scenes.FifthPart[299].begin(); Game.Timer.stop();},
  ],
  condition: function () {
    Game.Timer.set(5,()=>{Game.Scenes.FifthPart[296].begin()});
  }
});

Game.Scenes.FifthPart[296] = new Scene({
  text: `
        Нет ничего лучше и проще, чем старая добрая классика в виде аппетитных снеков. 
        <p>“Будет, чем похрустеть, как говорится.” 
        <p>Я убрала несколько пачек к себе в рюкзак, довольная своим выбором.
            `,
  background: "Backgrounds/Kitchen",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[300].begin();}],
  condition: function () {
    Game.Stats.Crisps.add(1);
  }
});

Game.Scenes.FifthPart[297] = new Scene({
  text: `
        Я достала из холодильника хлеб и запеченную индейку, которую вчера готовила мама. Добавив овощей, я аккуратно сформировала своей шедевр в аппетитный сэндвич. 
        <p>“Отличный перекус на наш скромный пикник!”
        <p>Я убрала несколько бутербродов к себе в рюкзак, довольная своим выбором. 
            `,
  background: "Backgrounds/Kitchen",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[300].begin();}],
  condition: function () {
    Game.Stats.TurkeySandw.add(1);
  }
});

Game.Scenes.FifthPart[298] = new Scene({
  text: `
        Я достала из холодильника хлеб и колбасу. Добавив майонезный соус, я аккуратно сформировала своей шедевр в аппетитный сэндвич. 
        <p>“Отличный перекус на наш скромный пикник!”
        <p>Я убрала несколько бутербродов к себе в рюкзак, довольная своим выбором
            `,
  background: "Backgrounds/Kitchen",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[300].begin();}],
  condition: function () {
    Game.Stats.SausageSandw.add(1);
  }
});

Game.Scenes.FifthPart[299] = new Scene({
  text: `
        Я набрала с собой несколько разнообразных фруктов: яблоки, бананы, мандарины и выбрала пару классических йогуртов. 
        <p>“Легко и просто. Соответствует нашему неожиданному пикнику!”
        <p>Я убрала фрукты с йогуртом к себе в рюкзак, довольная своим выбором.
            `,
  background: "Backgrounds/Kitchen",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[300].begin();}],
  condition: function () {
    Game.Stats.FruitsYogurt.add(1);
  }
});

Game.Scenes.FifthPart[300] = new Scene({
  text: `
        Скарлетт приехала в назначенное время. Подруга выглядела очень уютно, но не изменяла своему стилю отличницы.
        <p>- $Имя Игрока$, привет! - девушка крепко обняла меня. - Очень рада видеть тебя. Неужели мы наконец-то выберемся куда-то и проведем время вместе… Спасибо за приглашение.
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[301].begin();}],
});

Game.Scenes.FifthPart[301] = new Scene({
  text: `
        Я вдруг почувствовал сильный запах алкоголя, во время наших объятий.
        <p>“Скарлетт сегодня сама не своя. Обычно она вся такая серьезная и часто в своих учебных делах.” 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[302].begin();}],
});

Game.Scenes.FifthPart[302] = new Scene({
  text: `
        - Скар, ты что пила? Что случилось?
        <p>- Да не волнуйся ты так… Всего лишь несколько бокалов вина. И кстати, - она потрясла своим рюкзаком, откуда послышался звон бутылок. - Мы с тобой оторвемся по полной, вот увидишь!
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[303].begin();}],
});

Game.Scenes.FifthPart[303] = new Scene({
  text: `
        Я не стала ничего говорить и расспрашивать о чем-то раньше времени. 
        <p>“Самое главное, что ей сейчас хорошо, а далее мы со всем разберемся.”
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[304].begin();}],
});

Game.Scenes.FifthPart[304] = new Scene({
  text: `
        К нам вышел отец, который поздоровался со Скарлетт и сел заводить машину. 
        <p>- Это что же, наш личный водитель, - шепнула мне на ухо девушка. 
        <p>- Как вы и просили: личный водитель, хорошая компания и поездка за тридевять земель.
        <p>Мы громко рассмеялись, садясь в папину машину. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[305].begin();}],
});

Game.Scenes.FifthPart[305] = new Scene({
  text: `
        Всю дорогу мы общались со Скарлетт на разные темы, начиная с турецких сериалов, заканчивая мыслями о выпуском. 
        <p>Отец не вмешивался. Только слушал, иногда улыбаясь от наших девчачьих разговоров. 
        <p>Подруга также рассказывала про свои мечты, вроде отправиться путешествовать в какой-нибудь интересный город. 
            `,
  background: "Backgrounds/Hero_Car",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[306].begin();}],
});

Game.Scenes.FifthPart[306] = new Scene({
  text: `
        - И это естественно будет Рим? - спросила я, желая подтвердить свои догадки. 
        <p>- Все может быть, - Скар лишь загадочно улыбнулась. 
            `,
  background: "Backgrounds/Hero_Car",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[307].begin();}],
});

Game.Scenes.FifthPart[307] = new Scene({
  text: `
        Благодаря этим разговорам я совершенно забыла обо всех проблемах, которые преследовали меня все это время. Я чувствовала себя снова живой и все, что меня беспокоило в данный момент - как отговорить Скарлетт не открывать вино прямо в салоне автомобиля.
            `,
  background: "Backgrounds/Hero_Car",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[308].begin(); Game.Sounds.play('Music','Lake')}],
});

Game.Scenes.FifthPart[308] = new Scene({
  text: `
        По прибытии на озеро, папа припарковал машину и на нас тут же обрушился сильный ветер. Вода в озере бушевала, будто бы порываясь выйти наружу и затопить все вокруг. 
        <p>- Ого, - удивилась Скарлетт. - Была же хорошая погода… Что ж, может не будем мерзнуть и посидим в какой-нибудь кафешке неподалеку?
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[309].begin();}],
});

Game.Scenes.FifthPart[309] = new Scene({
  text: `
        Я посмотрела на Скарлетт. Она была права, не стоило оставаться здесь. Но мне нужна была разрядка. Чистый горизонт без всех этих проблем, машин или шума города. 
        <p>“Я так мечтала выбраться хоть куда-нибудь… Пусть даже и не повезло с погодой, однако так быстро уезжать отсюда совсем не хочется”.  
        <p>- Мы можем хотя бы немного побыть здесь? 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[310].begin();}],
});

Game.Scenes.FifthPart[310] = new Scene({
  text: `
        - Знаешь, а ты права. Хотели выбраться вместе, а я что-то испугалась какого-то ветерка. 
        <p>- Спасибо, - я была рада, что подруга осталась на моей стороне.
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[311].begin();}],
});

Game.Scenes.FifthPart[311] = new Scene({
  text: `
        - Девочки, вы уверены? - спросил папа обеспокоенным тоном. - Все-таки это буря, а не шутки. 
        <p>- Не волнуйтесь, - Скарлетт приобняла меня за плечи. - Все под контролем. Да и не собираемся же мы плавать. Просто постоять на берегу…
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[312].begin();}],
});

Game.Scenes.FifthPart[312] = new Scene({
  text: `
        - Хорошо. Но будьте на связи. И, $Имя Игрока$, я не знаю, когда освобожусь… Сколько вы планируете тут быть?
        <p>- Папа, все хорошо. Не думай о нас. Мы просто вызовем такси, когда будем собираться уезжать. 
        <p>Отец кивнул, обнял меня и уехал. 

            `,
  background: "",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[313].begin();}],
});

Game.Scenes.FifthPart[313] = new Scene({
  text: `
        Мы подошли к берегу, где не на шутку разыгрались волны.
        <p>Я обхватила себя руками, осознавая, что мне безумно нравится окружающий пейзаж. Да, он был по-своему мрачный, но природа от этого не становилась менее привлекательной. Нет. Это была стихия, которая не может быть ни кем контролируема.
        <p>- Это потрясающе…
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[314].begin();}],
});

Game.Scenes.FifthPart[314] = new Scene({
  text: `
        - Занятно. Я всегда думала, что ты трусишка, а тебя оказывается привлекает, когда все вокруг подвержено хаосу.
        <p>- Не сказала бы, - я немного поерзала от дуновения ветра. - Просто природа - нечто другое. И относится к этому хочется иначе.
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[315].begin();}],
});

Game.Scenes.FifthPart[315] = new Scene({
  text: `
        - Так мы решили пофилософствовать, - девушка достала из рюкзака напитки. - Давай уж делать это как полагается. 
        <p>- Скар, все в порядке? - я снова решила поинтересоваться, так как видела, что несмотря на все эти улыбки, ее руки тряслись, а сама она заметно нервничала.
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[316].begin();}],
});

Game.Scenes.FifthPart[316] = new Scene({
  text: `
        - Конечно, нет. Иначе бы я не приняла решение напиться.
        <p>- Расскажешь? 
        <p>Скарлетт налила себе в пластиковый стакан вина и сухо сказала:
        <p>- Родители разводятся. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[317].begin();}],
});

Game.Scenes.FifthPart[317] = new Scene({
  text: `
        Скарлетт положила голову мне на плечо. Она не плакала, не билась в истерике, как бы мог любой поступить на ее месте. Подруга принимала вызов, который подкинула ей судьба. 
        <p>Да, без вспомогательных средств не обошлось, но на то мы и люди. 
        <p>“Всегда ищем как проще всего справляться с трудностями.”
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[318].begin();}],
});

Game.Scenes.FifthPart[318] = new Scene({
  text: `
        - Скар, - я гладила ее по спине, пытаясь успокоить. - Почему они приняли такое решение? Вы уже поговорили об этом?
        <p>- Все просто. Нежелание идти на компромиссы. Это их упрямство окончательно разрушило и без того шаткий фундамент нашей семьи. 
        <p>- Но, может, это к лучшему?
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[319].begin();}],
});

Game.Scenes.FifthPart[319] = new Scene({
  text: `
        - Может и так. Но я не представляю, как строить свою жизнь в этой суете. Почему они так поступают со мной? - Скарлетт отстранилась и залпом осушила содержимое стакана. 
        <p>- Послушай, пожалуйста, - я взяла ее за руку и крепко сжала. - Тебе пора перестать жалеть себя. У тебя все прекрасно. Есть отличные перспективы на будущее, есть понимающие друзья, а ты сама завидная красотка!
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[320].begin();}],
});

Game.Scenes.FifthPart[320] = new Scene({
  text: `
        Скарлетт не смогла сдержать улыбки. 
        <p>- Спасибо, - она смотрела на озеро, погружаясь в рассуждения. - Знаешь, $Имя Игрока$, ты удивительная. Когда тебе плохо, у тебя всегда находятся силы поддерживать близких. Такому таланту можно только позавидовать. Но не перенапрягайся. И помни, что я рядом. Только скажи и я помогу.
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[321].begin();}],
});

Game.Scenes.FifthPart[321] = new Scene({
  text: `
        Я верила этим словам, как и самой Скарлетт. Мне было тяжело, но осознание, что кто-то понимает меня и хочет помочь - вселяло уверенность в собственных силах. 
        <p>Была и другая половина меня, которая хотела утонуть в своей слабости, плакать рядом с ней и ныть об этом дурацком бремени.
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[322].begin();}],
});

Game.Scenes.FifthPart[322] = new Scene({
  text: `
        Однако за столь короткий срок, я научилась чаще справляться с проблемами самостоятельно. Тяжело жить в двух мирах без поддержки. Возможно, я действительно выросла и начала по-другому ценить свою жизнь и, конечно, жизнь близких. 
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[339].begin();}],
  condition: function () {
    if(Game.Stats.Scarlett.get>=6){
      this.buttonaction[0] = () => {Game.Scenes.FifthPart[323].begin(); Game.Sounds.play('Music','Scarlett');}
    }
    else{
      this.buttonaction[0] = () => {Game.Scenes.FifthPart[339].begin();}
    }
  }
});

Game.Scenes.FifthPart[323] = new Scene({
  text: `
         Скарлетт почувствовала, что мое настроение немного изменилось, поэтому взяла меня за руку и крепко сжала мою ладонь. Она отчего-то улыбалась. Так живо, как будто бы в ее жизни совершенно нет никаких проблем. 
        <p>- Скар, что такое?
        <p>- Ничего. Просто я так счастлива. Знаешь, время, которое проводишь с близким человеком действительно заставляет ощущать только позитивные эмоции. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[324].begin();}],
});

Game.Scenes.FifthPart[324] = new Scene({
  text: `
         В ее словах была правда. Я сама чувствовала нечто подобное. 
        <p>- Знаешь, $Имя Игрока$, мы с тобой многое пережили. Как говорится, прошли через огонь и воду. Скажи честно, ты никогда не жалела, что дружишь со мной?
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[325].begin();}],
});

Game.Scenes.FifthPart[325] = new Scene({
  text: `
         В такие моменты мне действительно хотелось хорошенько стукнуть Скарлетт. Наверное ни одни отношения не могут обойтись без драмы. А может просто, каждому иногда нужно услышать ту самую поддержку и подтвердить уверенность взаимоотношений. 
        <p>- Иди сюда, Скар.
        <p>Я села на близлежащее бревно, потянула подругу за собой и аккуратно расположила ее голову на коленях. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[326].begin();}],
});

Game.Scenes.FifthPart[326] = new Scene({
  text: `
         - Я никогда не жалела. Да, мы ссоримся. Да, каждая любит иногда показать свой характер. Но от этого мы не перестаем быть близкими друг к другу. Отношения, которые мы выстраивали годами, только укрепляются, проходя тяжелые испытания. 
          <p>- Но почему тогда некоторые люди расстаются, спустя долго время, проведенное вместе? Почему они принимают такое решение?
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[327].begin();}],
});

Game.Scenes.FifthPart[327] = new Scene({
  text: `
         “Если бы я знала, Скарлетт. Отношения - это такой сложный процесс… Самой бы хоть в чем-то разобраться.”
          <p>Я вздохнула, пытаясь собраться с мыслями. Сейчас на моих коленях лежал один из самых дорогих мне людей, нуждающийся в правильных словах.
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[328].begin();}],
});

Game.Scenes.FifthPart[328] = new Scene({
  text: `
         - Скар, значит была проблема, которую они не хотели прорабатывать. Всегда есть причина. Мы же с тобой, например, постоянно разговариваем. Не откладываем все в долгий ящик, а стараемся по мере поступления проблем - сразу их решать. 
        <p>- Я понимаю, - девушка закрыла лицо руками, пытаясь скрыть эмоции. - Но почему люди, которые были вместе более восьми лет, так беспечны по отношению к друг другу? Эти года ничего не значат?
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[329].begin();}],
});

Game.Scenes.FifthPart[329] = new Scene({
  text: `
          - Конечно, значат, - я положила свою руку на ее, аккуратно поглаживая. - Просто они поздно поняли, что их взаимоотношения уже не те. Возможно, погрузившись в бытовые проблемы или сосредоточившись на работе, они позабыли, что такое простая семейная радость.
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[330].begin();}],
});

Game.Scenes.FifthPart[330] = new Scene({
  text: `
           - Я бы никогда не позволила такому случиться, - проговаривала Скарлетт сквозь слезы. 
          <p>- А какими ты видишь своим идеальные отношения? - я решила переключиться на другую тему, чтобы успокоить подругу.
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[331].begin();}],
});

Game.Scenes.FifthPart[331] = new Scene({
  text: `
           - Хороший вопрос… Я и не задумывалась никогда. В голове одна самореализация. Какие тут свидания и отношения. 
          <p>- Вот. Отличная возможность поделиться со мной планом идеального свидания. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[332].begin();}],
});

Game.Scenes.FifthPart[332] = new Scene({
  text: `
           Скарлетт лежала и долго думала над ответом. 
           <p>Ветер понемногу стихал, оставляя лишь спокойные холодные завывания, от которых по телу пробегали мурашки. Погода становилась более благоприятной, казалось, что вот-вот выйдет теплое солнце и накроет нас своими лучами. 
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[333].begin();}],
});

Game.Scenes.FifthPart[333] = new Scene({
  text: `
    - Я не люблю что-то помпезное. По мне - скромность украшает. Смотря на это озеро, мне до банального хотелось бы устроить здесь пикник. Приехать сюда вечером, на закате. Расстелить плед. Вкусно покушать. Обниматься, дожидаясь наступления темноты, чтобы разглядывать с любимым человеком звезды. Гадать, что же такого нам принесет завтрашний день…
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[334].begin();}],
});

Game.Scenes.FifthPart[334] = new Scene({
  text: `
    “Скарлетт оказывается тот еще романтик. Это очень мило.”
    <p>- Ого, а это и правда заманчивое предложение. 
    <p>- Хотела бы попасть на подобное мероприятие? - подруга усмехнулась. 
    <p>- Почему нет…
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[335].begin();}],
});

Game.Scenes.FifthPart[335] = new Scene({
  text: `
    Скарлетт убрала руки с лица и удивленно стала смотреть на меня своими красными от слез глазами. 
    <p>- Это… неожиданно. 
    <p>- Скар… 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[336].begin();}],
});

Game.Scenes.FifthPart[336] = new Scene({
  text: `
    Она вдруг коснулась своим указательным пальцем моих губ, заставляя не продолжать предложение. 
    <p>- Всему свое время. 
    <p>Подруга начала вставать с колен. В тот момент мы были как никогда близки к другу. А я думала лишь о том, что снова могу видеть ее лучезарную улыбку. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[337].begin();}],
});

Game.Scenes.FifthPart[337] = new Scene({
  text: `
    Скарлетт рассматривала меня, пытаясь запомнить каждую частичку. Внимательно. С интересом. 
    <p>Затем неожиданно поцеловала меня в щеку. Это был порыв, ее чувства, которые она хотела до меня донести. 
    <p>Я смущенно отвернулась, пребывая в смятениях. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => {
    Game.Scenes.FifthPart[338].begin();
    Game.message('Вы и Скарлетт все ближе узнаете друг друга');
    Game.Stats.Stats.Scarlett.add(2);
    Game.Achievements.LakeScarlett.unlock();
  }],
});

Game.Scenes.FifthPart[338] = new Scene({
  text: `
    - Дорогая моя, $Имя Игрока$, как много нам еще предстоит узнать друг о друге. 
    <p>- Непременно, милашка Скарлетт. 
    <p>Я смотрела на подругу как никогда раньше, а на сердце зародилось совершенное новое и неизведанное чувство.
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[343].begin(); Game.Sounds.play('Music','Lake')}],
});

Game.Scenes.FifthPart[339] = new Scene({
  text: `
    Скарлетт почувствовала, что мое настроение немного изменилось, поэтому положила мне руку на плечо и тепло улыбнулась. 
    <p>- $Имя Игрока$, я понимаю, что нам сейчас нелегко. Но мы справимся. Я в это верю. Мы же сильные и независимые. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[340].begin();}],
});

Game.Scenes.FifthPart[340] = new Scene({
  text: `
    Слова Скарлетт отозвались теплом в моей души. Я ответила:
    <p>- Ты права. Давай попробуем жить дальше. Стараться изо всех сил прорваться через любые трудности. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[341].begin();}],
});

Game.Scenes.FifthPart[341] = new Scene({
  text: `
    Девушка отвернулась, смотря на окружающий пейзаж. 
    <p>Возможно, в глубине души я ожидала большего. Я хотела поговорить со Скарлетт на более душевные темы. Узнать ее лучше. Но я понимала, почему все происходило именно таким образом.
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[342].begin();}],
});

Game.Scenes.FifthPart[342] = new Scene({
  text: `
     “Она всегда заботится обо мне, но я, видимо, уделяла этому недостаточно внимания. Все равно я рада, что смогла провести с ней хоть немного времени и развеяться. Уверена, мы станем еще ближе. И останемся подругами.”
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[343].begin();}],
});

Game.Scenes.FifthPart[343] = new Scene({
  text: `
      После всего произошедшего мы выдохнули и продолжили наслаждаться легкой прохладой исходящей от неспокойного озера. Разговаривали на отвлеченные темы, проводили время вместе, получая удовольствия от этих мгновений. 
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[344].begin();}],
});

Game.Scenes.FifthPart[344] = new Scene({
  text: `
      - Скар, я тут приготовила нам немного еды в поездку. Надеюсь, ты оценишь. 
      <p>- Ох, я такая голодная. Спасибо тебе большое за то, что подумала о закуске, - она мило засмеялась. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[345].begin();}],
  condition: function () {
    if(Game.Stats.Crisps.get>=1){
      this.buttonaction[0] = () => {Game.Scenes.FifthPart[345].begin();}
    }
    if(Game.Stats.TurkeySandw.get>=1){
      this.buttonaction[0] = () => {Game.Scenes.FifthPart[347].begin();}
    }
    if(Game.Stats.SausageSandw.get>=1){
      this.buttonaction[0] = () => {Game.Scenes.FifthPart[349].begin();}
    }
    if(Game.Stats.FruitsYogurt.get>=1){
      this.buttonaction[0] = () => {Game.Scenes.FifthPart[351].begin();}
    }
  }
});

Game.Scenes.FifthPart[345] = new Scene({
  text: `
      Я достала из рюкзака несколько пачек чипсов и уверенно протянула одну из них Скарлетт. 
      <p>Девушка с досадой стала смотреть на еду и сказала:
      <p>- Я же говорила тебе, что на диете… Как же так. А мне так хочется есть. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[346].begin(); Game.message('Ваш выбор еды расстроил Скарлетт'); Game.Stats.Scarlett.add(-1); Game.Stats.Crisps.add(-1);}],
});

Game.Scenes.FifthPart[346] = new Scene({
  text: `
      Скарлетт нехотя открыла пачку чипсов и начала громко хрустеть. 
      <p>“Черт, почему я так плохо знаю предпочтения своей подруги?”
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[353].begin();}],
});

Game.Scenes.FifthPart[347] = new Scene({
  text: `
      Я достала из рюкзака свои аппетитные сэндвичи и уверенно протянула один из них Скарлетт. 
      <p>Девушка взяла еду и уточнила: 
      <p>- А с чем они? 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[348].begin(); Game.message('Ваш выбор еды обрадовал Скарлетт'); Game.Stats.Scarlett.add(1); Game.Stats.TurkeySandw.add(-1);}],
});

Game.Scenes.FifthPart[348] = new Scene({
  text: `
      - Мама тут на днях готовила запеченную индейку. Решила сделать с ней, чтобы добру не пропадать.
      <p>- Правильно. Спасибо тебе большое! 
      <p>Девушка с жадностью накинулась на сэндвич, продолжая благодарить. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[353].begin();}],
});

Game.Scenes.FifthPart[349] = new Scene({
  text: `
      Я достала из рюкзака свои аппетитные сэндвичи и уверенно протянула один из них Скарлетт. 
      <p>Девушка взяла еду и уточнила: 
      <p>- А с чем они? 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[350].begin(); Game.message('Ваш выбор еды расстроил Скарлетт'); Game.Stats.Scarlett.add(-1); Game.Stats.SausageSandw.add(-1);}],
});

Game.Scenes.FifthPart[350] = new Scene({
  text: `
      - С колбасой. У нас дома было несколько видов, решила сделать, чтобы добру не пропадать. 
      <p>Скарлетт с досадой стала смотреть на еду и сказала:
      <p>- Я же говорила тебе, что на диете… Как же так. А мне так хочется есть. 
      <p>Скарлетт нехотя начала есть сэндвич.
      <p>“Черт, почему я так плохо знаю предпочтения своей подруги?”
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[353].begin();}],
});

Game.Scenes.FifthPart[351] = new Scene({
  text: `
      Я достала из рюкзака фрукты с йогуртом и уверенно протянула несколько Скарлетт. 
      <p>- Замечательно. Ты попала в точку. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => {
    Game.Scenes.FifthPart[352].begin();
    Game.message('Ваш выбор еды обрадовал Скарлетт');
    Game.Stats.Scarlett.add(1); Game.Stats.FruitsYogurt.add(-1);}],
});

Game.Scenes.FifthPart[352] = new Scene({
  text: `
      Я была рада порадовать подругу.
      <p>Девушка с жадностью накинулась на яблоки и бананы, продолжая благодарить. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[353].begin();}],
});

Game.Scenes.FifthPart[353] = new Scene({
  text: `
      - Ну, ладно, - проговорила Скарлетт, потягиваясь. - У меня есть предложение получше, чем просто сидеть и кушать.. 
      <p>- А вот это уже интересно, слушаю тебя. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[354].begin();}],
});

Game.Scenes.FifthPart[354] = new Scene({
  text: `
      Девушка налила себе новую порцию вина и продолжила:
      <p>- Как насчет того, чтобы ты отгадывала мои загадки, - в голосе Скарлетт чувствовалось влияние алкоголя. 
      <p>- Я - что делала? 
      <p>- Ну, загадки… Всего лишь две. Давай. А за правильные ответы - будет подарок. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[355].begin();}],
});

Game.Scenes.FifthPart[355] = new Scene({
  text: `
      Я искренне засмеялась такому детскому предложению. Но деваться было некуда. Я покорно приняла ситуацию и кивнула. 
      <p>Скарлетт озвучила свою первую загадку.
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[356].begin();}],
});

Game.Scenes.FifthPart[356] = new Scene({
  text: `
      - Что пахнет как синяя краска, но красного цвета? 
      <p>Вопрос ввел меня в ступор. 
      <p>“Какой запах у краски? Что мне ответить?” 
            `,
  background: "Persons/Scarlett_New",
  buttontext: ['Красная краска','Растворитель','Краска для волос'],
  buttonaction: [
    () => { Game.Scenes.FifthPart[357].begin();},
    () => { Game.Scenes.FifthPart[358].begin();},
    () => { Game.Scenes.FifthPart[360].begin();},
  ],
});

Game.Scenes.FifthPart[357] = new Scene({
  text: `
      “Это какая-то чепуха… Но больше мне ничего не приходит в голову.”
      <p>- Ого, - Скарлетт немного растерялась. - Я была уверена, что вопрос поставит тебя в тупик, но ты молодец. Это так просто и так глупо. Еще один вопрос и приз у тебя в кармане!
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[362].begin();}],
});

Game.Scenes.FifthPart[358] = new Scene({
  text: `
      “Это же логично. Краска пахнет так же едко, как растворитель. А больше и ничего не подходит…
      <p>- Хе-хе, - Скарлетт коварно улыбнулась. - Вот ты и попалась. Все гораздо очевиднее и проще. Ты слишком глубоко задумалась, ответ на поверхности. 
      <p>- Так это было неправильно?
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[359].begin();}],
});

Game.Scenes.FifthPart[359] = new Scene({
  text: `
      - Неа, правильный ответ - красная краска. Видишь? Не всегда надо пытаться искать скрытый смысл. 
      <p>Я с досадой посмотрела на подругу. 
      <p>“Обидно, что уйду без приза. Но зато мы повеселились!”
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[371].begin();}],
});

Game.Scenes.FifthPart[360] = new Scene({
  text: `
      “Отличный вариант. Эти запахи чем-то похожи. Уверена, я попала в точку!” 
      <p>- Хе-хе, - Скарлетт коварно улыбнулась. - Вот ты и попалась. Все гораздо очевиднее и проще. Много думать не надо. 
      <p>- Так я назвала неправильный ответ?
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[361].begin();}],
});

Game.Scenes.FifthPart[361] = new Scene({
  text: `
      - Неправильный. Правильный ответ - красная краска. Видишь? Не всегда надо пытаться искать скрытые смыслы. 
      <p>Я с досадой посмотрела на подругу. 
      <p>“Обидно, что уйду без приза. Но зато мы повеселились!”
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[371].begin();}],
});

Game.Scenes.FifthPart[362] = new Scene({
  text: `
      - Мой последний вопрос, $Имя Игрока$. Ух. Он уже посерьезнее. Что всегда будет находиться перед тобой, и при этом тебе никогда это не увидеть?
      <p>“И правда… Стоит лучше обдумать варианты. Это может быть все что угодно.”
            `,
  background: "Persons/Scarlett_New",
  buttontext: ['Время','Будущее','Воздух'],
  buttonaction: [
    () => { Game.Scenes.FifthPart[363].begin();},
    () => { Game.Scenes.FifthPart[365].begin(); Game.Achievements.Guru.unlock();},
    () => { Game.Scenes.FifthPart[369].begin();},
  ],
});

Game.Scenes.FifthPart[363] = new Scene({
  text: `
      “Оно же незримо. Это может быть правильным ответом.”
      <p>- Нет, не оно. Время - это что-то общее, оно не принадлежит конкретно тебе. Оно затрагивает все и вся. А вот будущее… Только твое будущее - важно. 
      <p>- Скар, подходит и тот и тот вариант. Глупости какие-то. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[364].begin();}],
});

Game.Scenes.FifthPart[364] = new Scene({
  text: `
      - Может быть. Но увы. Ты не угадала. 
      <p>Я с досадой посмотрела на подругу. 
      <p>“Обидно, что уйду без приза. Но зато мы повеселились!”
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[371].begin();}],
});

Game.Scenes.FifthPart[365] = new Scene({
  text: `
      “Я никак не могу увидеть будущее. Конечно, может еще не время… Прошлое то вижу. Но все-таки это что-то недостижимое.”
      <p>- И это правильный ответ! Ура. Мои поздравления. 
      <p>- Ну, ты, конечно, и замудрила тут… Очень жду свой заслуженный приз!
      <p>- Нетерпеливая какая. Сейчас все будет. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[366].begin();}],
});

Game.Scenes.FifthPart[366] = new Scene({
  text: `
      - Как ты все отгадала? - Скарлетт решила уточнить. - У тебя что варианты ответов перед глазами?  
      <p>- И варианты ответов и вообще мной управляют иллюминаты. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[367].begin(); Game.message('Вы получили новый предмет'); Game.Stats.Corkscrew.add(1);}],
});

Game.Scenes.FifthPart[367] = new Scene({
  text: `
      - Ладно. Хватит ерничать. Как и обещала, держи. 
      <p>Девушка протянула мне штопор, которым открывают бутылки для вина. 
      <p>- Это что шутка? - я в растерянности приняла награду. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[368].begin();}],
});

Game.Scenes.FifthPart[368] = new Scene({
  text: `
      - Это твоя благодарность? Я вообще-то с ним никогда не расстаюсь. Он в каком-то роде мой талисман. Поэтому я тебе отдаю нечто важное. 
      <p>- Скар…
      <p>Я решила не спорить и просто приняла подарок, обнимая подругу. 
      <p>“Расскажу ей как-нибудь. Когда она будет трезвой. Все же это милый жест с ее стороны. Но странный…”
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[371].begin();}],
});

Game.Scenes.FifthPart[369] = new Scene({
  text: `
      “Мне кажется, это очевидно. Он вокруг нас, и передо мной, в том числе, а увидеть его я не в силах.”
      <p>- Знаешь, если бы это был такой же легкий вопрос, как про краску - то я бы сказала, что это правильно. Но в этот раз тебе нужно было преисполниться в своем познании и выдать что-то интереснее, - немного улыбаясь, говорила Скарлетт. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[370].begin();}],
});

Game.Scenes.FifthPart[370] = new Scene({
  text: `
      - А какой же правильный ответ? 
      <p>- Будущее, дорогая моя. То, что принадлежит только тебе и то, что ты не в силах увидеть. 
      <p>Я с досадой посмотрела на подругу. 
      <p>“Обидно, что уйду без приза. Но зато мы повеселились!”
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[371].begin();}],
});

Game.Scenes.FifthPart[371] = new Scene({
  text: `
      Мы еще немного постояли, слушая, как волны бьются о берег, как завывает ветер, холодным воздухом лаская нашу кожу. 
      <p>Вскоре, Скарлетт ушла в сторону дороги, давая мне немного времени, чтобы побыть наедине. 
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[372].begin();}],
});

Game.Scenes.FifthPart[372] = new Scene({
  text: `
      Я двинулась следом, но что-то привлекло мое внимание. Среди деревьев было движение. Приглядевшись, я заметила мелькающий маленький силуэт, медленно приближающийся ко мне.  
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[373].begin();}],
});

Game.Scenes.FifthPart[373] = new Scene({
  text: `
      Я подошла ближе и разглядела в нем собаку. 
            `,
  background: "Persons/Dog_Dirty",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[374].begin();}],
});

Game.Scenes.FifthPart[374] = new Scene({
  text: `
      Продрогшая, грязная, но с преданными горящими глазами. Я аккуратно протянула ей руку и на мое удивление животное отозвалось. Собака тронула меня мокрым носом и жалобно заскулила. 
      <p>Я погладила пса и обратила внимание, что на его шее висел ошейник. 
      <p>- Так тебя зовут, Чарли, дружок. Что же мне с тобой делать?
            `,
  background: "Persons/Dog_Dirty",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[375].begin();}],
});

Game.Scenes.FifthPart[375] = new Scene({
  text: `
      Ко мне присоединилась Скарлетт, которая стояла в ступоре, будто бы не осознавая до конца происходящее:
      <p>- Это что, собака? Не понимаю, как она тут оказалась? И что мы теперь будем делать?
      <p>- Отвезем его ко мне домой, а дальше подумаем. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[376].begin();}],
});

Game.Scenes.FifthPart[376] = new Scene({
  text: `
      - Ох, - девушка схватилась за голову. - Нужно вызвать такси или может помыть его для начала? А вдруг он ранен…
      <p>- Скар, не паникуй. Погода плохая, нужно как можно скорее увести его отсюда. 
      <p>- Ты права. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[377].begin();}],
});

Game.Scenes.FifthPart[377] = new Scene({
  text: `
      Скарлетт начала  не спеша двигаться в сторону дороги, увлекая за собой собаку. Пес сначала стоял в недоумении, но все же последовал за подругой на полусогнутых лапах.
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[378].begin();}],
});

Game.Scenes.FifthPart[378] = new Scene({
  text: `
      - Я вызову такси, а ты пока побудь с Чарли, - я достала телефон, выбирая нужное приложение. 
      <p>- Вот так приключения…
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[381].begin();}],
  condition: function () {
    if(Game.Stats.Scarlett.get>=6){
      this.buttonaction[0] = () => {Game.Scenes.FifthPart[379].begin();}
    }
    else{
      this.buttonaction[0] = () => {Game.Scenes.FifthPart[381].begin();}
    }
  }
});

Game.Scenes.FifthPart[379] = new Scene({
  text: `
      Когда такси подъехало, я полезла в рюкзак за деньгами, чтобы оплатить поездку. 
      <p>Но неожиданно вмешалась Скарлетт. Она видимо заранее подготовилась и протянула водителю несколько купюр. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[380].begin(); Game.message('Благодаря хорошим отношениям со Скарлетт, девушка сама вызвалась оплатить вам такси');}],
});

Game.Scenes.FifthPart[380] = new Scene({
  text: `
      - Скар, зачем?
      <p>- Дорогая, $Имя Игрока$, это меньшее, что я могу сделать. Я просто хотела завершить наш вечер на хорошей ноте и сделать тебе приятно. Прошу. Просто прими. Без твоих “но” или “если”. 
      <p>Я тепло обняла подругу и мы сели в машину. 
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[382].begin();}],
});

Game.Scenes.FifthPart[381] = new Scene({
  text: `
      Я незамедлительно вызвала и оплатила такси. На карте было видно, что движение на дорогах свободное, поэтому ожидание было недолгим.
      <p>Когда водитель приехал, мы разместились на заднем сидении. 
            `,
  background: "",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[382].begin(); Game.message('Вы потратили часть своих денег (200)'); Game.Stats.Money.add(-200)}],
});

Game.Scenes.FifthPart[382] = new Scene({
  text: `
      Я и не заметила, как прильнула к окошку и сладко задремала. Всю дорогу я мирно посапывала, а Чарли аккуратно положил свою мордочку мне на колени, греясь и отдыхая.
            `,
  background: "Backgrounds/Lake_Taxi",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[383].begin();}],
});

Game.Scenes.FifthPart[383] = new Scene({
  text: `
      Меня разбудила крепкая мужская рука, которая упорно теребила меня за плечо. 
      <p>- Барышня, мы приехали, - тон голоса водителя был не слишком радушен. 
      <p>- Скар, - подруга сладко дремала рядом со мной. - Просыпайся.
            `,
  background: "Backgrounds/Lake_Taxi",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[384].begin();}],
});

Game.Scenes.FifthPart[384] = new Scene({
  text: `
      Девушка дернулась и еле-еле приоткрыла свои глаза. 
      <p>- Как же болит голова… 
      <p>- Неудивительно после того, сколько ты выпила. Пойдем в дом, сделаю тебе крепкий черный чай.
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[385].begin();}],
});

Game.Scenes.FifthPart[385] = new Scene({
  text: `
      - Не стоит, - Скарлетт держалась за голову. - Мы чудесно провели время и спасли этого малыша. Обязательно помой его и сходи к ветеринару. А потом уже поищи хозяина. Я поеду домой и отосплюсь. Прости, что так бросаю тебя. 
      <p>- Ничего, - я положила руку ей на плечо. - Спасибо тебе. Отдыхай. 
      <p>Я подождала пока такси вместе со Скарлетт уедет и завела собаку в дом.
            `,
  background: "Persons/Scarlett_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[479].begin();}],
});

Game.Scenes.FifthPart[386] = new Scene({
  text: `
      Мы с Шерил всегда были близки. Еще с самого детства. Она всегда была удивительной и по-своему странной девушкой. Но ее особенности не отталкивали меня, напротив, я хотела больше узнавать Шерил. Помочь ей с любыми трудностями. 
      <p>“Хочу провести с ней время. Это пойдет на пользу нам обеим.”
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[387].begin();}],
});

Game.Scenes.FifthPart[387] = new Scene({
  text: `
      Я написала Шерил и в скором времени получила ответ. Она согласилась и попросила прийти к ней домой, чтобы обо всем договориться лично. 
      <p>Собрав немного вещей в дорогу, я спустилась вниз. 
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[388].begin();}],
});

Game.Scenes.FifthPart[388] = new Scene({
  text: `
      На кухне мама что-то готовила для предстоящего ужина. Папа занимался своими делами. Он был погружен в чтение газеты и просмотр футбольного матча. 
      <p>Я оповестила родителей, что мы с Шерил хотим поехать и развеяться. Они были не против и с удовольствием одобрили мой выбор.
            `,
  background: "Backgrounds/Kitchen",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[389].begin();}],
});

Game.Scenes.FifthPart[389] = new Scene({
  text: `
      Шерил встретила меня на пороге своего дома. 
      <p>- Привет, $Имя Игрока$, очень рада наконец-то увидеть тебя, - она тепло обняла меня, приглашая войти внутрь. - Ты постоишь тут пару минут? Я быстренько переоденусь. 
      <p>- Конечно. Не торопись. 
            `,
  background: "Persons/Cheryl",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[390].begin();}],
});

Game.Scenes.FifthPart[390] = new Scene({
  text: `
      Дом Шерил всегда выглядел одинаково, сколько я его помню. Минималистичный и старый дизайн. Все прибрано, аккуратно расставлено. 
      <p>“Она молодец. Продолжает ухаживать за домом несмотря на проблемы в семье. Я рада, что ее любовь к этому месту остается прежней.”
            `,
  background: "Backgrounds/Cheryl_House",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[391].begin();}],
});

Game.Scenes.FifthPart[391] = new Scene({
  text: `
      Пока я ждала подругу, ко мне вышел отчим Шерил. Он выглядел крайне неловко, переминался с ноги на ногу, и даже издалека чувствовался сильный запах перегара. 
      <p>Но все же он натянул приветственную улыбку и сказал:
      <p>- Давно ты к нам не заходила. Проходи, не стесняйся. Мы всегда тебе рады. 
      <p>- Спасибо, но я ненадолго. Мы с Шерил уже уходим. 
            `,
  background: "Backgrounds/Cheryl_House",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[392].begin();}],
});

Game.Scenes.FifthPart[392] = new Scene({
  text: `
      Сложно было описать те эмоции, которые я испытывала к этому мужчине, зная, какие ужасы он мог вытворить. 
      <p>“Сколько раз я говорила тебе, Шер. Беги отсюда.”
            `,
  background: "Backgrounds/Cheryl_House",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[393].begin();}],
});

Game.Scenes.FifthPart[393] = new Scene({
  text: `
      Шерил вышла в новом образе: на ней был теплый яркий свитер и джинсы-клёш. Она выглядела свежо и весело. 
      <p>- Ты уже завел машину? - тон голоса девушки приобрел пренебрежительные оттенки. 
      <p>- Я только недавно вернулся. Мы можем поехать в любой момент. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[394].begin();}],
});

Game.Scenes.FifthPart[394] = new Scene({
  text: `
      - $Имя Игрока$, мой любимый отчим любезно согласился отвезти нас. Надеюсь, ты не против. 
      <p>- Конечно, нет. Спасибо вам, что согласились…
      <p>- Пустяки, - мужчина неуклюже заковылял к машине.
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[395].begin();}],
});

Game.Scenes.FifthPart[395] = new Scene({
  text: `
      - Что ты делаешь, Шерил? Зачем он нам? Не проще ли вызвать такси? Или попросить моего отца? - я говорила вполголоса, чтобы мужчина не услышал.
      <p>- Мы не миллионеры, чтобы вызывать такси в такую даль. К тому же этот козёл мне должен. Не волнуйся. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[396].begin();}],
});

Game.Scenes.FifthPart[396] = new Scene({
  text: `
      Мы с Шерил разместились на заднем сидении.
      <p>С самого начала нашего пути повисла неловкая тишина. Подруга смотрела в окно, пребывая в своих размышлениях, а я лишь про себя мечтала, чтобы мы скорее добрались до пункта назначения. 
            `,
  background: "Backgrounds/Cheryl_Car",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[397].begin();}],
});

Game.Scenes.FifthPart[397] = new Scene({
  text: `
      На очередном светофоре отчим Шерил неожиданно обратился ко мне:
      <p>- Как у тебя дела, $Имя Игрока$? Как учеба?
      <p>- Нормально… 
      <p>- Знаешь, может посоветуешь, куда нам с Шерил сходить? Я думал насчет парка в центре города. Говорят, его облагородили. 
            `,
  background: "Backgrounds/Cheryl_Car",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[398].begin();}],
});

Game.Scenes.FifthPart[398] = new Scene({
  text: `
      “Зачем он делает вид, что заботится о ней? Какой нелепый и несвязный разговор.”
      <p>- Мы уже там были, - Шерил вмешалась в наш диалог, не скрывая своего пренебрежения. - Ты забыл, папочка?
      <p>- Да… Что-то не припомню, - он неловко почесал голову, продолжая вести автомобиль. 
            `,
  background: "Backgrounds/Cheryl_Car",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[399].begin();}],
});

Game.Scenes.FifthPart[399] = new Scene({
  text: `
      Шерил вздохнула и наклонилась ко мне, прошептав:
      <p>- Давай порисуем. Как раньше. У каждой есть несколько минут, а затем меняемся рисунками и добавляем что-нибудь свое. Посмотрим, что из этого выйдет? 
      <p>Я с радостью закивала. 
            `,
  background: "Backgrounds/Cheryl_Car",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[400].begin();}],
});

Game.Scenes.FifthPart[400] = new Scene({
  text: `
      Шерил подвинула ко мне часть альбома и я начала рисовать, напрягая свою фантазию. 
      <p>Когда мы закончили, то перевернули лист так, чтобы часть с рисунком Шерил оказалась передо мной.
      <p>“Что же мне нарисовать?” 
            `,
  background: "Backgrounds/Rabbit",
  buttontext: ['Шляпу для кролика','Дракона в небе'],
  buttonaction: [
    () => { Game.Scenes.FifthPart[401].begin();},
    () => { Game.Scenes.FifthPart[405].begin();},
  ],
});

Game.Scenes.FifthPart[401] = new Scene({
  text: `
      Маленький пушистый дружок обзавелся длинной шляпой, в которую я добавила несколько замысловатых деталей. Я с гордостью вручила Шерил свой шедевр. 
      <p>- Ого… Это что же, мы рисуем помесь безумного шляпника и кролика?
      <p>- Я помню, как тебе нравится “Алиса в стране чудес”. В детстве твой отец постоянно читал нам эту сказку. Мы даже разыгрывали сцены по ролям… Мне доставался чеширский кот, а ты всегда была Алисой. 
            `,
  background: "Backgrounds/Rabbit_Hat",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[402].begin();}],
});


Game.Scenes.FifthPart[402] = new Scene({
  text: `
      - Хорошие были времена. 
      <p>Шерил призадумалась, взяла в руки карандаш и нарисовала рыцаря, готового атаковать веселого кролика.
      <p>- А вот это нечестно… Чем виноват этот пушистик?
      <p>- Тем, что он такой милый, - Шерил ухмыльнулась и отвернулась, чтобы не подглядывать за моим следующим шагом. 
      <p>“Как мне спасти кролика?”
            `,
  background: "Backgrounds/Rabbit_Hat_Knight",
  buttontext: ['Нарисовать безумного шляпника','Нарисовать дерево с норой'],
  buttonaction: [
    () => { Game.Scenes.FifthPart[403].begin();},
    () => { Game.Scenes.FifthPart[404].begin();},
  ],
});

Game.Scenes.FifthPart[403] = new Scene({
  text: `
      - С козырей зашла, - подруга опустила руки. - С его чашками и выходками, у этого рыцаря точно не будет ни единого шанса. 
      <p>- Вот так вот, - я улыбнулась, довольствуясь маленькой победой. 
            `,
  background: "Backgrounds/Rabbit_Hat_Knight_Hatter",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[409].begin(); Game.Achievements.Fantasy.unlock()}],
});

Game.Scenes.FifthPart[404] = new Scene({
  text: `
      - А, нет, - подруга взяла карандаш и перечеркнула кролика. - Рыцарь уже поразил свою цель. Твой план побега провалился.
      <p>- Это нечестно! Кролик проворнее этого бугая с доспехами. 
      <p>- Слабая отговорка, - Шерил ткнула меня в бок, довольствуясь своей липовой победой. 
            `,
  background: "Backgrounds/Rabbit_Hat_Knight_Tree",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[409].begin();}],
});

Game.Scenes.FifthPart[405] = new Scene({
  text: `
      Над кроликом появился устрашающий дракон, который своим пламенем хотел зажарить бедолагу. 
      <p>- Ты решила начать прям так серьезно? - Шерил ухмыльнулась и начала рисовать мне что-то в ответ. 
            `,
  background: "Backgrounds/Rabbit_Dragon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[1].begin();}],
});

Game.Scenes.FifthPart[1] = new Scene({
  text: `
      Через некоторое время, я увидела, как рядом с кроликом появилась гусеница, которая выдыхала круги дыма, скрывая их обоих от хищника. 
      <p>- Как мило, что ты все больше отсылаешься к сказке “Алиса в стране чудес”. Не забыла нашу любовь к этому произведению, - проговорила я, предаваясь в воспоминания. 
            `,
  background: "Backgrounds/Rabbit_Dragon_Caterpillar",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[406].begin();}],
});

Game.Scenes.FifthPart[406] = new Scene({
  text: `
      - Конечно, нет. Ведь отец так часто читал нам ее. 
      <p>Я сосредоточилась и задумалась, чем можно переиграть гусеницу, которая так всесильна?
            `,
  background: "Backgrounds/Rabbit_Dragon_Caterpillar",
  buttontext: ['Нарисовать флакон с отравой для насекомых','Нарисовать дождь'],
  buttonaction: [
    () => { Game.Scenes.FifthPart[407].begin();},
    () => { Game.Scenes.FifthPart[408].begin();},
  ],
});

Game.Scenes.FifthPart[407] = new Scene({
  text: `
      - Ну, нет, $Имя Игрока$. Забавная попытка, но гусеница же непростая… 
      <p>- Это не говорит о том, что гусеница всесильна. 
      <p>- Слабая отговорка, - Шерил ткнула меня в бок, довольствуясь своей липовой победой.
            `,
  background: "Backgrounds/Rabbit_Dragon_Caterpillar_Spray",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[409].begin();}],
});

Game.Scenes.FifthPart[408] = new Scene({
  text: `
      - Так-так, а неплохой ход, - Шерил с досадой взглянула на рисунок. 
      <p>- Твоя гусеница не сможет курить, пока идет дождь, все логично, - я улыбнулась, довольствуясь маленькой победой.
            `,
  background: "Backgrounds/Rabbit_Dragon_Caterpillar_Cloud",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[409].begin(); Game.Achievements.Fantasy.unlock();}],
});

Game.Scenes.FifthPart[409] = new Scene({
  text: `
      Этот досуг помогал мне отвлечься. Забыть обо всех окружающих меня проблемах. Я чувствовала себя снова живой и все, что мне хотелось в данный момент - это посоревноваться с Шерил в мастерстве рисования. 
            `,
  background: "Backgrounds/Cheryl_Car",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[410].begin(); Game.Sounds.play('Music','Lake');}],
});

Game.Scenes.FifthPart[410] = new Scene({
  text: `
      По прибытии на озеро, отчим подруги припарковал машину и на нас тут же обрушился сильный ветер. Вода в озере бушевала, будто бы порываясь выйти наружу и затопить все вокруг. 
      <p>- Занимательная погода, - заметила Шерил. - Что скажешь, $Имя Игрока$, поедем обратно? 
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[411].begin();}],
});

Game.Scenes.FifthPart[411] = new Scene({
  text: `
      Я посмотрела на Шерил. Она была права, не стоило оставаться здесь. Но мне нужна была разрядка. Чистый горизонт без всех этих проблем, машин или шума города. 
      <p>“Я так мечтала выбраться хоть куда-нибудь… Пусть даже и не повезло с погодой, однако так быстро уезжать отсюда совсем не хочется”.  
      <p>- Мы можем хотя бы немного побыть здесь? 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[412].begin();}],
});

Game.Scenes.FifthPart[412] = new Scene({
  text: `
      - Конечно, можем, - Шерил одобрительно похлопала меня по плечу. - Уверена, мы с великим удовольствием проведем здесь время. 
      <p>- Спасибо, - я была рада, что подруга осталась на моей стороне. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[413].begin();}],
});

Game.Scenes.FifthPart[413] = new Scene({
  text: `
      И снова нас настигла гнетущая тишина. Я поглядывала на отчима Шерил, который стоял недалеко от нас около машины, и лениво почесывал бороду. Казалось, мужчина был совершенно не заинтересован в дальнейшем пребывании здесь. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[414].begin();}],
});

Game.Scenes.FifthPart[414] = new Scene({
  text: `
      - После такой милой беседы в машине, ты даже не спросишь, как мы доберемся обратно? - подруга крикнула, обращаясь к отчиму. - Или ты решил нас тут прождать все это время? 
      <p>- Шерил, кхм. У меня есть дела. К тому же ехать туда сюда. Бензин. А заправка далеко…
      <p>Его глупые отговорки в какой-то степени рассмешили бы меня, не будь это все жестокой реальностью, с которой приходилось сталкиваться Шерил на ежедневной основе. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[415].begin();}],
});

Game.Scenes.FifthPart[415] = new Scene({
  text: `
      Мужчина постоял минуту, а затем как-то резко открыл машину и не сказав больше ни слова - уехал.
      <p>- Шерил, что это было…
      <p>- Забей. Пойдем уже к озеру. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[416].begin();}],
});

Game.Scenes.FifthPart[416] = new Scene({
  text: `
      Мы подошли к берегу, где не на шутку разыгрались волны.
      <p>Я обхватила себя руками, осознавая, что мне безумно нравится окружающий пейзаж. Да, он был по-своему мрачный, но природа от этого не становилась менее привлекательной. Нет. Это была стихия, которая не может быть ни кем контролируема.
      <p>- Это потрясающе…
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[417].begin();}],
});

Game.Scenes.FifthPart[417] = new Scene({
  text: `
      - Интересные мысли, - Шерил достала из своего рюкзака альбом и села на холодную землю, делая набросок озера. 
      <p>- Простудишься же, давай лучше найдем, на что сесть.
      <p>- Не простужусь, я же закаленная, останемся здесь. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[418].begin();}],
});

Game.Scenes.FifthPart[418] = new Scene({
  text: `
      Я смотрела с какой точностью и аккуратностью подруга проводит каждую линию. И постепенно, под ее рукой, начал вырисовываться прекрасный пейзаж. 
      <p>Но все же меня не отпускала мысль, что девушка слишком часто пытается сбежать в другую реальность, игнорируя проблемы настоящего. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[419].begin();}],
});

Game.Scenes.FifthPart[419] = new Scene({
  text: `
      Решив воспользоваться случаем, я спросила:
      <p>- Шер, как дела? Как отношения…ну… 
      <p>- Думаешь, мой ответ изменился?
      <p>- Не знаю… Послушай, Шерил, я знаю тебя с детства. Мы вместе росли и вместе переживали различные этапы взросления. Почему все так обернулось?
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[420].begin();}],
});

Game.Scenes.FifthPart[420] = new Scene({
  text: `
      - Когда ты уже примешь мое решение остаться в этом доме? 
      <p>- Это трудно, - мне становилось все сложнее подбирать нужные слова. - Это же тебя погубит. 
      <p>- Ты никогда не поймешь, насколько мне важен этот дом и все воспоминания, связанные с ним. Я готова отказаться от всего на свете, но только не от этого. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[421].begin();}],
});

Game.Scenes.FifthPart[421] = new Scene({
  text: `
      - И это все из-за твоего настоящего папы, верно?
      <p>Шерил улыбнулась, откладывая альбом в сторону. Я знала, что эта тема для нее тяжелая. Но больше всего на свете мне хотелось помочь подруге выпутаться из сложных и запутанных обстоятельств, в которых она пребывает не по своей вине. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[422].begin();}],
});

Game.Scenes.FifthPart[422] = new Scene({
  text: `
      - Послушай, $Имя Игрока$, я никогда не смогу забыть его, - постепенно глаза Шерил наполнялись слезами. - Я не могу этого сделать. Дом - наше с ним место силы и поддержки, где он навсегда остался со мной рядом. 
      <p>- Я понимаю, - я положила руку на плечо девушки, стараясь успокоить. - Но и ты пойми, что так не может продолжаться вечно. Тебе нужно стать решительнее, либо позволить мне помочь тебе. Главное, помни, какое бы решение ты не приняла - я рядом. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[423].begin();}],
});

Game.Scenes.FifthPart[423] = new Scene({
  text: `
      Шерил завороженно смотрела куда-то вдаль. Несколько секунд она пребывала в раздумьях, а затем сказала: 
      <p>- Спасибо, $Имя Игрока$. Не знаю, как тебе это удается. У самой вроде трудности в жизни, а меня не бросаешь, даешь надежду, заставляешь верить в лучшее, - девушка опустила голову вниз и прошептала. - Я тоже рядом. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[424].begin();}],
});

Game.Scenes.FifthPart[424] = new Scene({
  text: `
      Я верила этим словам, как и самой Шерил. Мне было тяжело, но осознание, что кто-то понимает меня и хочет помочь - вселяло уверенность в собственных силах. 
      <p>Была и другая половина меня, которая хотела утонуть в своей слабости, плакать рядом с ней и ныть об этом дурацком бремени. 
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[425].begin();}],
});

Game.Scenes.FifthPart[425] = new Scene({
  text: `
      Однако за столь короткий срок, я научилась чаще справляться с проблемами самостоятельно. Тяжело жить в двух мирах без поддержки. Возможно, я действительно выросла и начала по-другому ценить свою жизнь и, конечно, жизнь близких. 
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[436].begin();}],
  condition: function () {
    if(Game.Stats.Cheryl.get<=2){
      this.buttonaction[0] = () => { Game.Scenes.FifthPart[426].begin(); Game.Sounds.play('Music','Cheryl');}
    }
    else{
      this.buttonaction[0] = () => { Game.Scenes.FifthPart[436].begin();}
    }
  }
});

Game.Scenes.FifthPart[426] = new Scene({
  text: `
      Шерил почувствовала, что мое настроение немного изменилось, поэтому встала и направилась прямо к берегу, навстречу бурным волнам. 
      <p>Мне ничего не оставалось, кроме как последовать за ней. Когда мы поравнялись, Шерил произнесла:
      <p>- Когда мы стали такими? 
      <p>- Какими “такими”? 
      <p>- Слабыми. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[427].begin();}],
});

Game.Scenes.FifthPart[427] = new Scene({
  text: `
      Я с удивлением смотрела на подругу, которая в этот момент снимала обувь. 
      <p>- Что ты имеешь в виду? Зачем ты раздеваешься?
      <p>- Хотела ножки помочить. Присоединишься? 
      <p>Смотря на плохую погоду и волны, я отрицательно качнула головой. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[428].begin();}],
});

Game.Scenes.FifthPart[428] = new Scene({
  text: `
      - Как хочешь. 
      <p>Шерил медленно заходила в воду. Из-за волн ее джинсы моментально промокли, но девушку это не волновало. Она раскинула руки в стороны, наслаждаясь ветром и сложившейся атмосферой. 
      <p>- Шерил, осторожнее, это может быть опасно!
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[429].begin();}],
});

Game.Scenes.FifthPart[429] = new Scene({
  text: `
      - Это свобода, $Имя Игрока$. Природа. Стихия. Она не навредит.
      <p>“Ох, Шерил. Тебя бывает трудно понять, но я рада, что подобные сумасшествия делают тебя счастливее.”
      <p>Видя подругу такой жизнерадостной, такой искренней, мне не хотелось читать нотации. Достаточно было просто вместе с ней раствориться в этих легких ощущениях. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[430].begin();}],
});

Game.Scenes.FifthPart[430] = new Scene({
  text: `
      - Шерил, ты классная, - я вдруг поддалась этому веселому порыву и выкрикнула то, что на самом деле думаю. 
      <p>Девушка ничего не ответила. Краем глаза мне показалось, что я заметила ее мелькающую улыбку, но Шерил не спешила делиться своими эмоциями. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[431].begin();}],
});

Game.Scenes.FifthPart[431] = new Scene({
  text: `
      Вскоре она вышла на берег, засучила джинсы и села на ближайшее бревно, устало запрокинув голову к небу.
      <p>Устроившись рядом, я решила сказать:
      <p>- Спасибо, что ты согласилась провести со мной время. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[432].begin();}],
});

Game.Scenes.FifthPart[432] = new Scene({
  text: `
      - Да я только рада. Ты же знаешь, я не против нашего общения. 
      <p>- В последнее время мы не так близки, как раньше. Я хотела бы это исправить. 
      <p>- $Имя Игрока$, я помню, как ты говорила, что всегда поддержишь меня и будешь рядом. Но, по факту, ты все верно говоришь. Сейчас наши отношения переживают не лучшие времена. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[433].begin();}],
});

Game.Scenes.FifthPart[433] = new Scene({
  text: `
      - Прости, Шерил. Я не хотела, чтобы все так вышло. 
      <p>- Не за что извиняться, - девушка посмотрела прямо на меня. - Благодаря этому, я стала ощущать себя увереннее. Это может прозвучать странно, но я постепенно учусь справляться со всеми трудностями сама. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[434].begin();}],
});

Game.Scenes.FifthPart[434] = new Scene({
  text: `
      Такое откровение одновременно обрадовало и озадачило меня. 
      <p>“Как мне теперь вести себя с ней? Что я должна сказать?”
      <p>- Шер, я…
      <p>- Не стоит, - девушка положила руку мне на колено. - Я в порядке. Мы в порядке. Все будет хорошо. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => {
    Game.Scenes.FifthPart[435].begin();
    Game.Sounds.play('Music','Lake');
    Game.message('Ваши предыдущие действия подтолкнули Шерил стать более самостоятельной');
    Game.Achievements.LakeCheryl.unlock();}],
});

Game.Scenes.FifthPart[435] = new Scene({
  text: `
      Я хотела оправдаться за свое поведение, но видя, как подруга спокойно отнеслась к нашей ситуации, мне оставалось лишь принять ее выбор. В глубине души меня действительно порадовал такой исход.
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[440].begin();}],
});

Game.Scenes.FifthPart[436] = new Scene({
  text: `
       Шерил почувствовала, что мое настроение немного изменилось, поэтому потянула меня за руку, чтобы я села рядом с ней на землю. 
       <p>Я не сопротивлялась и не думала о том, что могу, к примеру, заболеть. Видя горящие глаза Шерил, я мечтала услышать ее слова.
       <p>- $Имя Игрока$, мы с тобой через многое прошли. Я не знаю, чтобы я без тебя делала. Как бы справлялась.
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[437].begin();}],
});

Game.Scenes.FifthPart[437] = new Scene({
  text: `
       - Перестань, Шерил, - я тепло обняла подругу, которая начала громко всхлипывать, пытаясь сдержать слезы. - На то мы и подруги, чтобы поддерживать друг друга. 
      <p>- Я буду с тобой предельно откровенна. Я очень устала. Устала так жить. Все эти воспоминания, весь этот кошмар… Как мне это пережить?
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[438].begin();}],
});

Game.Scenes.FifthPart[438] = new Scene({
  text: `
       - Дорогая, все наладится. А почему, спросишь меня? Правильно. Потому что я всегда протяну руку помощи!
       <p>Девушка грустно улыбнулась мне и тихонько сказала:
      <p>- Я не смогу жить без тебя. Спасибо, - Шерил положила голову мне на плечо, пытаясь успокоиться. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[439].begin(); Game.message('Ваши предыдущие действия подтолкнули Шерил больше полагаться на вас, чем на себя ');}],
});

Game.Scenes.FifthPart[439] = new Scene({
  text: `
      - Не говори глупостей. Еще как сможешь. 
      <p>- Не смогу. 
      <p>Подруга закрыла глаза, делая вдох и выдох. Постепенно она пришла в норму, а я задумалась:
      <p>“Что же это… Я правильно поступаю с Шерил, давая ей надежду на свою повсеместную помощь? А если меня вдруг не будет в трудный час, сможет ли она справиться со всем одна?”
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[440].begin();}],
});

Game.Scenes.FifthPart[440] = new Scene({
  text: `
      После всего произошедшего мы выдохнули и продолжили наслаждаться легкой прохладой исходящей от неспокойного озера. Разговаривали на отвлеченные темы, проводили время вместе, получая удовольствия от этих мгновений. 
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[441].begin();}],
});

Game.Scenes.FifthPart[441] = new Scene({
  text: `
      Шерил продолжала рисовать озеро, а я с наслаждением наблюдала за творческим процессом и иногда дорисовывала свои мелкие дополнения. 
      <p>Мне вдруг стало кое-что интересно и я решила спросить:
      <p>- Скажи, ты же часто придумываешь какие-то новые миры, а какой из них наиболее увлекательный на твой взгляд?
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[442].begin();}],
});

Game.Scenes.FifthPart[442] = new Scene({
  text: `
      Девушка удивленно взглянула на меня. Она поднесла карандаш ко рту и стала размышлять. 
      <p>- Они все хороши. Сложно выделить какой-то один. 
      <p>- Расскажи тогда о самом последнем. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[443].begin();}],
});

Game.Scenes.FifthPart[443] = new Scene({
  text: `
      - Он подводный, ничего особенного. В голову пришли образы существ, похожих на русалок, вот я и решила засунуть их в водную обитель. 
      <p>- А кто еще населяет этот мир?
      <p>- Ты застала меня врасплох! Я вообще-то еще не до конца продумала концепцию. Давай лучше расскажу тебе про последний, который я закончила конструировать.  
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[444].begin();}],
});

Game.Scenes.FifthPart[444] = new Scene({
  text: `
      - Этот мир населяли разных размеров гиганты, которые стремились уничтожить человечество. И когда, казалось, конец света был неизбежен, несколько смельчаков дали бой и люди обрели надежду на спасение, - Шерил говорила как диктор, активно жестикулируя руками.  
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[445].begin();}],
});

Game.Scenes.FifthPart[445] = new Scene({
  text: `
      - И вот эта высоченная стена спасает их от гибели? - я указала на один из рисунков, которые она демонстрировала во время описания мира.
      <p>- Все верно, $Имя Игрока$. Я думала добавить еще несколько, чтобы сформировать целый город, но никак руки не доходят. 
      <p>- И как ты все это придумываешь?
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[446].begin();}],
});

Game.Scenes.FifthPart[446] = new Scene({
  text: `
      - Оно само приходит. Я могу обратить внимание на что-то совершенно несущественное, вроде отрывка из газетной статьи, и вот я уже рисую первые наброски мира. 
      <p>- Да у тебя же талант… Ты можешь писать книги или рисовать комиксы. Не думала заняться чем-то подобным?
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[447].begin();}],
});

Game.Scenes.FifthPart[447] = new Scene({
  text: `
      - Не думала, - Шерил засмущалась и отвернулась. - Пока мне хочется оставить все это только в своем распоряжении и часами фантазировать. 
      <p>- Я бы хотела больше узнать об этих твоих фантазиях. 
      <p>- Кто знает, может однажды и ты найдешь ключ к моему самому потаенному миру.
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[448].begin();}],
});

Game.Scenes.FifthPart[448] = new Scene({
  text: `
      Шерил продолжала перелистывать листы со своими рисунками. Я сосредоточенно рассматривала каждый их них. 
      <p>Увидев очередное творение подруги, я непроизвольно отшатнулась и тяжело задышала. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[449].begin(); Game.Sounds.play('Music','Chair');}],
});

Game.Scenes.FifthPart[449] = new Scene({
  text: `
      Меня бросило в дрожь от нахлынувших воспоминаний. Я не могла поверить, что вижу перед собой ту самую тварь, которая так издевалась надо мной.
      <p>Но еще больше я не могла поверить, с какой точностью Шерил изобразила этого монстра. Сомнений быть не могло - это одно и то же существо. 
            `,
  background: "Backgrounds/Cheryl_Painting",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[450].begin();}],
});

Game.Scenes.FifthPart[450] = new Scene({
  text: `
      - Ты чего, $Имя Игрока$? Ужастиков пересмотрела? 
      <p>- Нет, я… - волнение преобладало надо мной и это никак не могло скрыться от подруги. 
      <p>- Давай лучше закончим на сегодня с этим. А то ты уже вся побледнела.
      <p>- Шерил, откуда этот рисунок? 
            `,
  background: "Backgrounds/Cheryl_Painting",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[451].begin();}],
});

Game.Scenes.FifthPart[451] = new Scene({
  text: `
      - Да так, просто увлеклась историей и нашла интересную легенду. Вдохновилась и нарисовала. 
      <p>- Что это за легенда?
      <p>- Да что с тобой такое, - голос Шерил был очень волнительный. - Что случилось? Почему стоило тебе увидеть рисунок, ты так переменилась в лице?
            `,
  background: "Backgrounds/Cheryl_Painting",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[452].begin();}],
});

Game.Scenes.FifthPart[452] = new Scene({
  text: `
      Я даже не знала, что мне ответить. Очередную ложь? 
      <p>- Просто мне кажется, что этот монстр не похож на твои обычные рисунки, - мой голос дрожал из-за нахлынувших переживаний. - Так странно… Я хотела бы больше узнать о нем.
      <p>- С чего это? - подруга смотрела на меня с недоверием. - Твоя реакция слишком необычная, чего-то не договариваешь мне? Ты тоже его видишь? 
            `,
  background: "Backgrounds/Cheryl_Painting",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[453].begin();}],
});

Game.Scenes.FifthPart[453] = new Scene({
  text: `
      - Нет, почему столько вопросов, мне просто любопытно.
      <p>- Может скажешь в чем дело? 
      <p>- Но я уже ответила… и…
            `,
  background: "Backgrounds/Cheryl_Painting",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[454].begin();}],
});

Game.Scenes.FifthPart[454] = new Scene({
  text: `
      - Знаешь, давай больше не будем об этом, пожалуйста
      <p>- Как скажешь, - я не хотела еще больше ссориться и продолжать увиливать, но все же предприняла попытку узнать о еще кое о чем. - А символ? 
            `,
  background: "Backgrounds/Cheryl_Painting",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[455].begin();}],
});

Game.Scenes.FifthPart[455] = new Scene({
  text: `
      - Я просто нарисовала то, что почувствовала. Перед глазами то и дело мелькали: образ той девушки, возмездие, время… Все это пришло в один миг в мою голову. 
      <p>“Что все это значит? Когда обстановка будет более располагающей, я обязательно расспрошу Шерил об этом.”
            `,
  background: "Backgrounds/Cheryl_Painting",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[456].begin(); Game.Sounds.play('Music','Lake');}],
});

Game.Scenes.FifthPart[456] = new Scene({
  text: `
      Мы еще немного постояли, слушая, как волны бьются о берег, как завывает ветер, холодным воздухом лаская нашу кожу. 
      <p>Вскоре, Шерил ушла в сторону дороги, давая мне немного времени, чтобы побыть наедине с собой. 
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[457].begin();}],
});

Game.Scenes.FifthPart[457] = new Scene({
  text: `
      Я двинулась следом, но что-то привлекло мое внимание. Среди деревьев было движение. Приглядевшись, я заметила мелькающий маленький силуэт, медленно приближающийся ко мне.  
            `,
  background: "Backgrounds/Lake",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[458].begin();}],
});

Game.Scenes.FifthPart[458] = new Scene({
  text: `
      Я подошла ближе и разглядела в нем собаку.   
            `,
  background: "Persons/Dog_Dirty",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[459].begin();}],
});

Game.Scenes.FifthPart[459] = new Scene({
  text: `
      Продрогшая, грязная, но с преданными горящими глазами. Я аккуратно протянула ей руку и на мое удивление животное отозвалось. Собака тронула меня мокрым носом и жалобно заскулила. 
            `,
  background: "Persons/Dog_Dirty",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[460].begin();}],
});

Game.Scenes.FifthPart[460] = new Scene({
  text: `
      Я погладила пса и обратила внимание, что на его шее висел ошейник. 
      <p>- Так тебя зовут, Чарли, дружок. Что же мне с тобой делать?
            `,
  background: "Persons/Dog_Dirty",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[461].begin();}],
});

Game.Scenes.FifthPart[461] = new Scene({
  text: `
      Ко мне присоединилась Шерил, которая удивленно стояла и смотрела на испуганное животное. 
      <p>- Это галлюцинации или здесь действительно стоит собака?
      <p>- Стоит, Шерил. Я даже представить не могу, откуда он тут взялся. 
      <p>- Скорее всего потерялся. Должно быть его хозяин места себе не находит. 
      <p>- Отвезем его ко мне домой, а дальше подумаем. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[462].begin();}],
});

Game.Scenes.FifthPart[462] = new Scene({
  text: `
      Шерил начала не спеша двигаться в сторону дороги, увлекая за собой собаку. Пес сначала стоял в недоумении, но все же последовал за подругой на полусогнутых лапах.
            `,
  background: "Persons/Dog_Dirty",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[463].begin();}],
});

Game.Scenes.FifthPart[463] = new Scene({
  text: `
      - Я вызову такси, а ты пока побудь с Чарли, - я достала телефон, пытаясь открыть нужное приложение.
      <p>Но устройство зависло и до последнего не хотело загружать то, что мне было нужно.
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[464].begin();}],
});

Game.Scenes.FifthPart[464] = new Scene({
  text: `
      - Если ты будешь бить свой телефон о дерево, он от этого не станет лучше работать, - констатировала факт Шерил. 
      <p>- Я просто в панике, почему все так обернулось?
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[474].begin();}],
  condition: function () {
    if(Game.Stats.Cheryl.get<=2){
      this.buttonaction[0] = () => { Game.Scenes.FifthPart[465].begin();}
    }
    else{
      this.buttonaction[0] = () => { Game.Scenes.FifthPart[474].begin();}
    }
  }
});

Game.Scenes.FifthPart[465] = new Scene({
  text: `
      - У меня есть одна идея, но я боюсь, что тебе это не понравится. 
      <p>- Шерил, я согласна на все. 
      <p>- Выслушала бы для начала… Ладно. Пойдем выйдем к дороге. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[466].begin();}],
});

Game.Scenes.FifthPart[466] = new Scene({
  text: `
      Нашей скромной компанией мы выдвинулись из леса и вышли к проезжей части. Трасса пустовала, а пасмурная погода только подчеркивала таинственность этого места. 
      <p>- И для чего мы здесь, Шерил? 
      <p>- Увидишь. 
            `,
  background: "Backgrounds/Lake_Hitch",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[467].begin();}],
});

Game.Scenes.FifthPart[467] = new Scene({
  text: `
      Девушка смело вышла на край дороги, выставляя палец вверх. Несколько машин стремительно пронеслись мимо. Одна из них остановилась. 
      <p>Окно легковушки опустилось и из салона автомобиля показалась приветливая пожилая женщина: 
      <p>- Девушки, вы потерялись?
            `,
  background: "Backgrounds/Lake_Hitch",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[468].begin();}],
});

Game.Scenes.FifthPart[468] = new Scene({
  text: `
      - У нас сломался телефон и мы никак не можем вернуться домой, не могли бы вы нас подбросить? - Шерил вела себя очень раскованно. 
      <p>- Конечно. Виктор, давай поможем им разместиться.
      <p>Мы сели на заднее сиденье и автомобиль медленно начал свое движение.
      <p>“Шерил не перестает меня удивлять.”
            `,
  background: "Backgrounds/Lake_Hitch",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[469].begin();}],
});

Game.Scenes.FifthPart[469] = new Scene({
  text: `
      Пожилая пара завела с нами увлекательную беседу, рассказывая о своей бурной молодости.
      <p>- Помнишь, Виктор? Студенческие годы были такими интересными. Вот бы повернуть время вспять. 
      <p>- Один наш знакомый профессор говорит, что время лучше никогда не трогать, - Шерил поддерживала беседу.
            `,
  background: "Backgrounds/Cheryl_Hitch",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[470].begin();}],
});

Game.Scenes.FifthPart[470] = new Scene({
  text: `
      - Странное высказывание, - заметил Виктор. - Что значит “не трогать”?
      <p>- Ну, я уже в точности не помню его слова… Наверное, смысл в предопределенном исходе всего на свете или около того. 
      <p>- А он симпатичный? - спросила супруга Виктора. 
      <p>- Маргарет, боже. Я же рядом с тобой. Не стыдно?
            `,
  background: "Backgrounds/Cheryl_Hitch",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[471].begin();}],
});

Game.Scenes.FifthPart[471] = new Scene({
  text: `
      - Это любопытство и не более, дорогой. 
      <p>Шерил засмеялась и показала им фотографию Нэйтана, которая была размещена на сайте университета. 
      <p>- Батюшки, - Маргарет удивленно смотрела на профессора. - Он так похож на того мужчину, что мы видели в Париже лет десять назад…
            `,
  background: "Backgrounds/Cheryl_Hitch",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[472].begin();}],
});

Game.Scenes.FifthPart[472] = new Scene({
  text: `
      - Не может быть! - Виктор прильнул к экрану. - И правда. Нам его сложно забыть, учитывая, как он тогда помог. 
      <p>- Это просто невозможно, профессор довольно молодой. Как он мог быть в Париже так давно и совершенно не измениться. Не зря говорят, что в мире есть аж целых семь человек похожих на тебя, - Шерил рассмеялась.
      <p>- Может мы и ошиблись, неужели память совсем стала плоха, Виктор? 
      <p>- Кто знает. 
            `,
  background: "Backgrounds/Cheryl_Hitch",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[473].begin();}],
});

Game.Scenes.FifthPart[473] = new Scene({
  text: `
      Последнюю часть диалога мне не удалось услышать, ведь я и не заметила, как прильнула к окошку и сладко задремала. Оставшийся отрезок пути, я мирно посапывала, а Чарли аккуратно положил свою мордочку мне на колени, греясь и отдыхая.
            `,
  background: "Backgrounds/Cheryl_Hitch",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[476].begin();}],
});

Game.Scenes.FifthPart[474] = new Scene({
  text: `
      - Давай просто подождем. Уверена, через какое-то время он отвиснет. 
      <p>Так оно и произошло. Через полчаса я незамедлительно вызвала и оплатила такси. На карте было видно, что движение на дорогах свободное, поэтому ожидание было недолгим.
      <p>Когда водитель приехал, мы разместились на заднем сидении. 
            `,
  background: "",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[475].begin(); Game.message('Вы потратили часть своих денег (200)'); Game.Stats.Money.add(-200)}],
});

Game.Scenes.FifthPart[475] = new Scene({
  text: `
      Я и не заметила, как прильнула к окошку и сладко задремала. Всю дорогу я мирно посапывала, а Чарли аккуратно положил свою мордочку мне на колени, греясь и отдыхая.
            `,
  background: "Backgrounds/Lake_Taxi",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[476].begin();}],
});

Game.Scenes.FifthPart[476] = new Scene({
  text: `
      Меня разбудила Шерил, которая теребила меня за плечо.
      <p>- Мы приехали, $Имя Игрока$.   
      <p>Я еле-еле открыла глаза и недоуменно смотрела на подругу. 
      <p>- Вставай, - Шерил потянула меня из салона. - Спасибо вам большое. 
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[477].begin();}],
});

Game.Scenes.FifthPart[477] = new Scene({
  text: `
      Я вместе с Чарли и подругой стояли около своего дома. 
      <p>- Шерил, спасибо тебе за все. И за твою помощь. 
      <p>- Это тебе спасибо, - она нежно обняла меня, немного сжимая. - Я очень чудесно провела время. Надеюсь, что мы когда-нибудь повторим.
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[478].begin();}],
});

Game.Scenes.FifthPart[478] = new Scene({
  text: `
      - Ты зайдешь? Или дела какие?
      <p>- Прости, я сразу поеду на работу. Никак не отпроситься, - Шерил грустно вздохнула. - Позаботься о Чарли. Обязательно приласкай его и поищи хозяина. Прости, что так бросаю тебя. 
      <p>- Ничего, - я положила руку ей на плечо. 
      <p>Я подождала пока Шерил уедет и завела собаку в дом.
            `,
  background: "Persons/Cheryl_New",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[479].begin();}],
});

Game.Scenes.FifthPart[479] = new Scene({
  text: `
      Нас встретила мама, которая выглядела крайне удивленно, увидев меня с собакой на пороге. 
      <p>- $Имя Игрока$, кто твой новый друг? 
      <p>Я кратко обрисовала маме все произошедшее на озере, в конце добавив, что не могла бросить его там. 
            `,
  background: "Backgrounds/Livingroom",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[480].begin();}],
  condition: function () {
    Game.Sounds.play('Music','FirstChapter'); AndroidApp ('showAd');
  }
});

Game.Scenes.FifthPart[480] = new Scene({
  text: `
      - Я даже не знаю… Давай мы поступим так. Сходи и помой его хорошенько. Я не против, если он поживет у нас какое-то время, пока не найдется хозяин. 
      <p>Мама подошла к собаке, погладила и взглянула на ошейник.
      <p>- Чарли, значит. Что ж, после душа будешь кушать вкусное отварное мясо. 
            `,
  background: "Persons/Dog_Dirty",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[481].begin();}],
});

Game.Scenes.FifthPart[481] = new Scene({
  text: `
      Первым делом я отвела его в ванну, чтобы смыть грязь. Собака не сопротивлялась и охотно шла на контакт, что наводило на очевидные мысли:
      <p>“Его воспитанием занимались. Он привык к людям, но как ты оказался на улице… Что же ты пережил, малыш?” 
            `,
  background: "Persons/Dog_Dry",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[482].begin();}],
});

Game.Scenes.FifthPart[482] = new Scene({
  text: `
      После купания, я вернулась обратно на кухню. К этому времени мама уже выставила несколько глубоких тарелок. Налила воду и положила кусочки мяса вперемешку с овощами. 
            `,
  background: "Backgrounds/Kitchen",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[483].begin();}],
});

Game.Scenes.FifthPart[483] = new Scene({
  text: `
      Чарли сидел смирно, не притрагивался к еде, будто бы чего-то ожидая. 
      <p>- Чарли, - я села рядом и погладила его. - Можно кушать, дружок. 
      <p>Виляя хвостом, собака с жадностью накинулась на съестное. 
            `,
  background: "Persons/Dog_Dry",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[484].begin();}],
});

Game.Scenes.FifthPart[484] = new Scene({
  text: `
      - Мама, спасибо за помощь… Я первый раз оказалась в такой ситуации. Мне даже представить сложно, что было бы, оставь мы его там. 
      <p>- Милая, ты все сделала правильно. Уверена, папа тоже обрадуется, когда вернется после своих дел. 
            `,
  background: "Persons/Dog_Dry",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[485].begin();}],
});

Game.Scenes.FifthPart[485] = new Scene({
  text: `
      Ближе к вечеру мы с Чарли поднялись в мою комнату и решили отдохнуть. Лежа на кровати, я прокручивала в голове воспоминания об этом насыщенном дне. 
      <p>“Столько всего… Я чувствую, что готова встретиться с чем угодно после таких теплых разговоров. Справиться со всем. Но прежде надо решить еще одно дело.”
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[486].begin();}],
});

Game.Scenes.FifthPart[486] = new Scene({
  text: `
      Взяв в руки телефон, я нашла несколько сайтов, где люди выкладывали объявления о пропаже животных.
      <p>Я так и не смогла найти хоть какую-нибудь информацию о Чарли или его хозяине. 
      <p>“Что ж… Стоит попробовать разместить его фотографию и свой номер телефона. Вдруг кто-то откликнется.” 
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[487].begin();}],
});

Game.Scenes.FifthPart[487] = new Scene({
  text: `
      Так я и поступила. Затем отложила телефон и задумалась.
      <p>“Время же течет по-разному в этой эпохе и в прошлом. Я могу со спокойной душой отправиться в мир Теслы, не боясь за Чарли или своих близких. Пора взять ситуацию в свои руки.”
      <p>Я была полна решимости действовать дальше. Поэтому скрестив ноги на кровати, я попыталась погрузиться в глубины своего сознания. 
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[488].begin();}],
});

Game.Scenes.FifthPart[488] = new Scene({
  text: `
      - Проводник, я знаю, что ты меня слышишь. Я в этом уверена. Я готова идти дальше. Просто покончим с этим. 
      <p>Ничего не происходило. Но я не отчаивалась. 
      <p>“Просто усну и встречусь с ним. Вероятно, должно сработать.” 
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[489].begin();}],
});

Game.Scenes.FifthPart[489] = new Scene({
  text: `
      Засыпая, я уже не боялась, что могу оступиться. Ведь по словам проводника: все шло своим закономерным чередом. 
      <p>“Мы еще посмотрим, кто останется победителем в этих играх разума.”
            `,
  background: "Backgrounds/Room",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[495].begin(); Game.Sounds.play('Music','Prologue')}],
  condition: function () {
    if(Game.Stats.God.get>=1){
      this.buttonaction[0] = () => { Game.Scenes.FifthPart[490].begin(); Game.Sounds.play('Music','Prologue')}
    }
    else{
      this.buttonaction[0] = () => { Game.Scenes.FifthPart[495].begin(); Game.Sounds.play('Music','Prologue')}
    }
  }
});

Game.Scenes.FifthPart[490] = new Scene({
  text: `
      Я видела прекрасное поле, усеянное различными цветами. От аромата, исходящего от них, кружилась голова.
      <p>“Это место совершенно не похоже на все, что я видела в этом мире. Может ли это быть некой особенной зоной?”
            `,
  background: "Backgrounds/Flowerfield",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[491].begin();}],
});

Game.Scenes.FifthPart[491] = new Scene({
  text: `
      Проводник стоял неподалеку. Он с наслаждением осматривал цветы, трогал, вдыхал их чудесные запахи. 
      <p>Я смело подошла к нему. Мужчина впервые при нашей встрече улыбнулся, позволил себе положить руку мне на плечо и произнес:
      <p>- Я горжусь твоей решимостью. Твое желание не сдаваться выше всяких похвал. 
            `,
  background: "Persons/Stranger",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[492].begin();}],
});

Game.Scenes.FifthPart[492] = new Scene({
  text: `
      - Это далось мне нелегко. Но я готова. Готова разобраться со всем. Мне надоело быть аутсайдером в этой игре. 
      <p>- Будь по твоему, - загадочный проводник призадумался. - Тебе следует увидеть еще кое-что перед тем, как надолго отправиться назад в Нью-Йорк. 
            `,
  background: "Persons/Stranger",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[493].begin();}],
});

Game.Scenes.FifthPart[493] = new Scene({
  text: `
      - Хорошо. Но скажи, - я знала, что не получу ответа, но попытаться стоило. - А что это за место?
      <p>- Здесь я отдыхаю. Много думаю. Трачу время на себя. 
      <p>- Но разве ты не всегда “много думаешь”?
      <p>- У меня есть определенные обязательства, так что не всегда удается побыть наедине с собой. 
            `,
  background: "Persons/Stranger",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[494].begin();}],
});

Game.Scenes.FifthPart[494] = new Scene({
  text: `
      Такой ответ меня вполне устроил. 
      <p>“По крайне мере он не начал отнекиваться. Чувствуется, что он готов понемногу мне открываться. 
      <p>- Пойдем? - он протянул мне руку, открывая очередной проход. 
            `,
  background: "Backgrounds/Flowerfield",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[499].begin();}],
});

Game.Scenes.FifthPart[495] = new Scene({
  text: `
      Я очутилась у обрыва, где бушевал сильный ветер, готовый в любой момент скинуть меня с шаткого уступа. 
      <p>“Почему я здесь? Почему это место такое темное… Как же страшно. Холодно.”
            `,
  background: "Backgrounds/Waterflow",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[496].begin();}],
});

Game.Scenes.FifthPart[496] = new Scene({
  text: `
      Ко мне не спеша подошел проводник, который выглядел удрученно. 
      <p>- Зачем ты пришла?
      <p>- Потому что хочу покончить со всем скорее и жить своей нормальной жизнью. 
      <p>- Я уже говорил тебе, что это длинный путь. Не получится все решить только по твоему хотению. 
            `,
  background: "Persons/Stranger",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[497].begin();}],
});

Game.Scenes.FifthPart[497] = new Scene({
  text: `
      - Плевать. Я готова встретиться с чем или кем угодно. Главное - разобраться в происходящем. 
      <p>- Как скажешь, - он был подобен этому месту: темный, холодный. 
      <p>“Мы не особо близки. Я часто говорила о своих мыслях прямо. Да, порой я была резка… Не ожидала, что последствия будут такими.”
            `,
  background: "Persons/Stranger",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[498].begin();}],
});

Game.Scenes.FifthPart[498] = new Scene({
  text: `
      Я последовала за проводником в только что открывшийся проход, оставляя позади неспокойную бушующую воду и холодные порывы ветра. 
            `,
  background: "Backgrounds/Waterflow",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[499].begin();}],
});

Game.Scenes.FifthPart[499] = new Scene({
  text: `
      Я уже понимала намерения проводника, стоило мне только увидеть портал, через который я уже однажды проходила. 
      <p>- Почему снова туда? Почему мне сразу нельзя отправиться в эпоху Теслы?
      <p>- Есть то, что ты должна увидеть прежде. Я уже говорил, что это место имеет ключевую роль. 
            `,
  background: "Backgrounds/Pompeii_Portal",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[500].begin();}],
});

Game.Scenes.FifthPart[500] = new Scene({
  text: `
      “От этого не легче, но ладно. В конце концов там я выступаю лишь как наблюдать, что значительно облегчает задачу.”
      <p>Без лишних слов я вновь отправилась в древний город. 
            `,
  background: "Backgrounds/Pompeii_Portal",
  buttontext: [''],
  buttonaction: [() => {
    Game.Scenes.FifthPart[501].begin();
    Game.Sounds.play('Music','Pompeii');
    Game.Effects.Flash();
  }],
});

Game.Scenes.FifthPart[501] = new Scene({
  text: `
      И снова площадь, на которой я в прошлый раз наблюдала за загадочной незнакомкой. 
      <p>“Ничего не изменилось с того раза… Я снова должна увидеть ее?”
      <p>Я осматривалась в поисках подсказок. Но жизнь в Помпеях шла своим чередом, а мне лишь оставалось наблюдать и искать. 
            `,
  background: "Backgrounds/Pompeii",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[502].begin();}],
});

Game.Scenes.FifthPart[502] = new Scene({
  text: `
      Мое внимание привлек звонкий мужской голос, который с задором зазывал всех желающих в свою лавку, чтобы отведать прекрасного вина. 
      <p>“А что мне терять? Все равно не знаю, что должна увидеть здесь. Хоть местную культуру посмотрю.”
            `,
  background: "Backgrounds/Pompeii",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[503].begin();}],
});

Game.Scenes.FifthPart[503] = new Scene({
  text: `
      Подойдя на достаточно близкое расстояние, я буквально потеряла дар речи. Ноги подкосились, я просто села напротив мужчины и смотрела с широко-раскрытыми глазами.
            `,
  background: "Backgrounds/Pompeii",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[504].begin();}],
});

Game.Scenes.FifthPart[504] = new Scene({
  text: `
      Волосы до плеч, белая туника. И такие знакомые черты лица…
      <p>“Я схожу с ума? Или передо мной действительно стоит Роберт, держащий керамический кувшин, в Помпеях?”
            `,
  background: "Persons/Robert_Pompeii",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[505].begin();}],
});

Game.Scenes.FifthPart[505] = new Scene({
  text: `
      Это не могло быть совпадением. Мужчина выглядел точно также, как и Роберт. Единственное их различие - это улыбка. Здешний Роберт улыбался так искренне, как будто бы у него нет никакого груза на плечах. 
            `,
  background: "Persons/Robert_Pompeii",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[506].begin();}],
});

Game.Scenes.FifthPart[506] = new Scene({
  text: `
      “Нэйтан… Теперь Роберт. Вот, что хотел показать мне проводник? Это двойники? Как мы с Катариной? Но почему именно так все повернулось?”
      <p>Это снова выбивало из колеи. Снова приходилось много думать, ведь я понимала, никто не скажет мне ничего прямо. 
            `,
  background: "Persons/Robert_Pompeii",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[507].begin();}],
});

Game.Scenes.FifthPart[507] = new Scene({
  text: `
      Роберт продавал кувшины с вином один за другим, радуясь своей прибыли. 
      <p>В какой-то момент к нему подошла симпатичная девушка и положила руку прямо на грудь, проговаривая:
      <p>- Гай, когда мы уже пойдем плавать… Ты же обещал. 
            `,
  background: "Persons/Robert_Pompeii",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[508].begin();}],
});

Game.Scenes.FifthPart[508] = new Scene({
  text: `
      - Прости, но сегодня не получится. Матушка совсем плохо себя чувствует. Мы с братьями дали слово, что позаботимся о хозяйстве. 
      <p>- Всегда ты так. Небось отправишься вечером к своей Клаудии. 
            `,
  background: "Persons/Robert_Pompeii",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.FifthPart[509].begin(); Game.Achievements.Lake.unlock()}],
});

Game.Scenes.FifthPart[509] = new Scene({
  text: `
       Я завороженно смотрела на происходящее, дивясь своему новому открытию и чувствам, которые испытала. 
        <p>“Похоже, что не только я имею тайны. Пора раскрыть свои карты, мальчики.” 
            `,
  background: "Persons/Robert_Pompeii",
  buttontext: [''],
  buttonaction: [() => {
    setTimeout(() => { Game.Scenes.SixPart[0].begin(); }, 1000);
    Game.LoadScreen('SixPart');
    Game.Progress.save("SixPart");
  }],
});Game.Scenes.SixPart = [];

Game.Scenes.SixPart[0] = new Scene({
  text: `
    <p>Гай стоял нахмурившись и смотрел на свою подругу. Немного побыв в раздумьях, он произнес:
    <p>- Сегодня приезжает Марк. Я надеялся на твое понимание. 
    <p>Девушка отвернулась и вздохнула с облегчением. 
    <p>- Откуда он возвращается? 
            `,
  background: "Persons/Robert_Pompeii",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[1].begin(); Game.message('<i>Помпеи 79 г. н.э.');}],
  condition: () => {
    Game.Sounds.play('Music','Pompeii');
  }
});

Game.Scenes.SixPart[1] = new Scene({
  text: `
    - Греция. Наша семья установила выгодные торговые отношения с местными ценителями. Теперь о нашем вине узнают и в Афинах. 
    <p>- Грандиозные планы! Извини, что сомневалась в тебе. 
    <p>- Ничего, - Гай вышел из-за прилавка и обнял девушку. - Я не должен был так легкомысленно вести себя. 
            `,
  background: "Persons/Robert_Pompeii",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[2].begin();  }],
});

Game.Scenes.SixPart[2] = new Scene({
  text: `
    Было сложно определить: лукавит мужчина или говорит правду. По крайне мере он  действительно выглядел убедительно, но женское сердце подсказывало, что доверять этим словам нельзя. 
            `,
  background: "Persons/Robert_Pompeii",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[3].begin();  }],
});

Game.Scenes.SixPart[3] = new Scene({
  text: `
    Вскоре идиллию влюбленных прервал звонкий сторонний женский крик:
    <p>- Ей плохо! Плохо! Позовите лекаря. Чем же она так разгневала богов? 
    <p>Люди столпились вокруг несчастной. Я поспешила за Гаем, который расталкивал прохожих, пытаясь протиснуться и увидеть в чем же дело. 
            `,
  background: "Persons/Robert_Pompeii",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[4].begin();  }],
});

Game.Scenes.SixPart[4] = new Scene({
  text: `
    На земле лежала та самая девушка, что так отчаянно молилась богам в мое прошлое перемещение. Все ее тело было покрыто маленькими порезами, а сама она пребывала в полусознательном состоянии. 
            `,
  background: "Persons/Goddess_Scars",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[5].begin();  }],
});

Game.Scenes.SixPart[5] = new Scene({
  text: `
    Гай опустился рядом с ней на колени, проверил пульс, а затем взял на руки и произнес: 
    <p>- Я позабочусь об этой девушке. Моя матушка - лекарь. Освободите дорогу!
            `,
  background: "Persons/Goddess_Scars",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[6].begin();  }],
});

Game.Scenes.SixPart[6] = new Scene({
  text: `
    Никто и не посмел возразить. Все лишь хватали себя за голову, проговаривая:
    <p>- О, милостивый Юпитер! Не гневайся на нас. Спаси грешную душу. 
            `,
  background: "Persons/Goddess_Scars",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[7].begin();  }],
});

Game.Scenes.SixPart[7] = new Scene({
  text: `
    Люди стояли, пребывая в неком подобии транса. Они запрокинули голову и смотрели на чистое голубое небо в надежде отыскать там ответ на свои мольбы. 
            `,
  background: "Backgrounds/Pompeii",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[8].begin();  }],
});

Game.Scenes.SixPart[8] = new Scene({
  text: `
    - Да что же с вами, люди, - кричал Гай. - Вы что ли совсем позабыли о человечности? 
    <p>- Все боятся гнева Богов. Все понимают, что раны на ее теле - это ИХ проклятье. Побойся, юноша, - ответил пожилой мужчина. 
            `,
  background: "Persons/Robert_Pompeii",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[9].begin();  }],
});

Game.Scenes.SixPart[9] = new Scene({
  text: `
    Я видела, как Гай буквально закипал от злобы, но сдерживал себя, так как против такого количества “безумцев” он ничего не мог сделать. 
    <p>Мне стало жаль выступать лишь безмолвным наблюдателем без возможности помочь ему. 
    <p>“С другой стороны, смогла бы я выступить против правил того общества?”
            `,
  background: "Persons/Robert_Pompeii",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[10].begin();  }],
});

Game.Scenes.SixPart[10] = new Scene({
  text: `
    Наконец Гай все же смог выбраться из замкнутого круга безумия. Он окинул беглым взглядом девушку, что ютилась у него на руках и произнес:
    <p>- Ты должна быть сильной. Не теряй связь с этим миром. 
    <p>Затем он поспешил покинуть площадь и направился туда, где им помогут.
            `,
  background: "Persons/Robert_Pompeii",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[11].begin();  }],
});

Game.Scenes.SixPart[11] = new Scene({
  text: `
    Проследовав за мужчиной, я оказалась в просторном доме. Он был, классической для тех времен, квадратной формы с несколькими комнатами по бокам. В центре располагался скромный сад с уютными местами для отдыха. 
    <p>“Видимо, эта семья достаточно зарабатывает благодаря торговле. Это потрясающее место.”
            `,
  background: "Backgrounds/House_Immortals",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[12].begin();  }],
});

Game.Scenes.SixPart[12] = new Scene({
  text: `
    Гай аккуратно положил девушку на скамью. Ее бледное лицо озарило несколько солнечных лучей, а глаза невольно зашевелились от яркого света.
    <p>- Вот так вот. Ты не должна засыпать, - мужчина отошел от девушки и громко крикнул. - Матушка! 
            `,
  background: "Persons/Goddess_Scars",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[13].begin();  }],
});

Game.Scenes.SixPart[13] = new Scene({
  text: `
    Вскоре из одной комнаты вышла стройная немолодая девушка с теплой улыбкой и несколькими свитками в руках. 
    <p>- Сынок, почему ты так рано? Что-то случилось в лавке?
    <p>- Мама, тут… - он показал пальцем на раненую. 
            `,
  background: "Persons/Mother_PP",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[14].begin();  }],
});

Game.Scenes.SixPart[14] = new Scene({
  text: `
    - Ох, Юпитер, что же случилось, - она кинула свитки на пол и поспешила к девушке. - Гай, кто это прелестное создание? Что случилось?
    <p>- Я не знаю, все произошло так резко... Она потеряла сознание на площади и я решил помочь ей. 
    <p>Женщина осматривала больную, проверяя дыхание. 
            `,
  background: "Persons/Mother_PP",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[15].begin();  }],
});

Game.Scenes.SixPart[15] = new Scene({
  text: `
    - Ты все сделал правильно. 
    <p>- Матушка, она будет жить?
    <p>- Конечно, будет. 
    <p>- То, что говорили про нее люди. Проклятье. Гнев богов. Почему они так испугались?
            `,
  background: "Persons/Mother_PP",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[16].begin();  }],
});

Game.Scenes.SixPart[16] = new Scene({
  text: `
    Женщина глубоко вздохнула. Было видно, что она не хотела отвечать на этот вопрос, но взглянув в заинтересованные глаза сына, все же произнесла:
    <p>- Есть поверье, что такие раны остаются на человеке, которого покинули боги. Некого рода знак, что всевышние разгневаны.
            `,
  background: "Persons/Mother_PP",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[17].begin();  }],
});

Game.Scenes.SixPart[17] = new Scene({
  text: `
    - И это причина почему ей никто не хотел помочь? 
    <p>- Во всем виноват страх, сын мой. Мы же сделаем все, что в наших силах, чтобы помочь несчастной. Чтобы она не сотворила, это останется на ее совести. 
    <p>Гай широко улыбнулся и положил маме руку на плечо в знак одобрения ее действий. 
            `,
  background: "Persons/Mother_PP",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[18].begin(); Game.message('Онерария - Римское торговое судно');}],
});

Game.Scenes.SixPart[18] = new Scene({
  text: `
    Ухаживая за таинственной незнакомкой, женщина уточнила у своего сына:
    <p>- От Марка не было весточки? 
    <p>- Нет. Но онерария должна прибыть сегодня к вечеру. Не волнуйся. 
            `,
  background: "Persons/Mother_PP",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[19].begin();  }],
});

Game.Scenes.SixPart[19] = new Scene({
  text: `
    - А Луций и Тиберий? Куда же запропастились твои братья, ты не знаешь? 
    <p>- Должно быть помогают отцу на винограднике. Луций обещал быть со мной сегодня и торговать, но отец настоял, чтобы он помог ему. 
    <p>- Хорошо. В последнее время все так заняты. Уже и не помню, когда мы вместе собирались за одним столом.
            `,
  background: "Persons/Mother_PP",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[20].begin();  }],
});

Game.Scenes.SixPart[20] = new Scene({
  text: `
    - Мама, будь спокойна за нас. Мы уже достаточно взрослые, чтобы принимать участие в нашем быту и помогать вам с отцом. 
    <p>Женщина одарила сына нежным взглядом и произнесла:
    <p>- Отнесем эту девушку в мою комнату. Я приготовлю настой, который облегчит ее страдания. 
    <p>Гай с легкостью поднял девушку на руки и они скрылись за дверьми. 
            `,
  background: "Persons/Mother_PP",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[21].begin(); Game.Sounds.play('Music','Prologue'); Game.Effects.Flash();}],
});

Game.Scenes.SixPart[21] = new Scene({
  text: `
    Я не удивилась, что история оборвалась на самом интересном. И все же, теперь стал очевиден тот факт, что эта девушка как-то связана с Робертом и его семьей. Вернее Гаем. А может это и есть Роберт? 
    <p>Проводник стоял, как обычно, пребывая в своих мыслях. Его фигура была неподвижна, он наблюдал за мной. Казалось, что он уже был готов к очередной порции вопросов. 
            `,
  background: "Persons/Stranger",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[25].begin(); }],
  condition: function () {
    if (Game.Stats.God.get>=1) this.buttonaction[0] = () => { Game.Scenes.SixPart[22].begin(); }
    if (Game.Stats.God.get<=0) this.buttonaction[0] = () => { Game.Scenes.SixPart[25].begin(); }
  }
});

Game.Scenes.SixPart[22] = new Scene({
  text: `
    “Он не ненавидит меня. И вроде даже рад моим расспросам. Я ведь скрашиваю его одиночество. Смелее, $Имя Игрока$.”
    <p>- Скажи. Роберт, которого я знаю из Нью-Йорка и Гай из древней римской эпохи - это один и тот же человек? 
            `,
  background: "Persons/Stranger",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[23].begin();  }],
});

Game.Scenes.SixPart[23] = new Scene({
  text: `
    Проводник отступил на шаг и замер, не смея посмотреть на меня. Затем он спокойно произнес:
    <p>- Я говорил тебе. Меня связывает клятва. Не могу ответить на твой вопрос. 
    <p>- Значит, я верно мыслю?  
    <p>- Может быть - да. А может и нет. 
            `,
  background: "Persons/Stranger",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[24].begin();  }],
});

Game.Scenes.SixPart[24] = new Scene({
  text: `
    Его слова говорили об одном, но руки немного дрожали, словно тело яро сопротивлялось чему-то. Он колебался. 
    <p>“Возможно, я задала верный вопрос. Начинает казаться, что я приближаюсь к истине.” 
            `,
  background: "Persons/Stranger",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[26].begin();  }],
});

Game.Scenes.SixPart[25] = new Scene({
  text: `
    “Нет. Я боюсь сказать что-то лишнее. Между нами и так напряженные отношения. Будет лучше, если я промолчу и дождусь, пока он сам начнет разговор.”
            `,
  background: "Persons/Stranger",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[26].begin();  }],
});

Game.Scenes.SixPart[26] = new Scene({
  text: `
    - И так, очередное перемещение позади. Пора приступать к следующему важному шагу. 
    <p>- Я готова. 
    <p>- Хорошо, - проводник развел руками, образовывая очертания моего следующего пути. 
            `,
  background: "Persons/Stranger",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[27].begin();  }],
});

Game.Scenes.SixPart[27] = new Scene({
  text: `
    - Теперь тебе предстоит окунуться в не менее интересный период жизни Николы Теслы. Будь наготове. 
    <p>- Мне все равно не сбежать от этого. Единственный вариант - идти дальше и бороться до конца. 
            `,
  background: "Backgrounds/WildWest_Portal",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[28].begin();  }],
});

Game.Scenes.SixPart[28] = new Scene({
  text: `
    - А ты изменилась, - проводник ухмыльнулся. 
    <p>- Почему? - я недоуменно взглянула на него.
    <p>- Раньше последовало бы множество вопросов или даже протестов. А сейчас, я вижу уверенную в себе девушку, которая смотрит на что-то новое с высоко поднятой головой. Но больше всего поражает твоя готовность броситься в самое пекло. 
            `,
  background: "Backgrounds/WildWest_Portal",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[29].begin();  }],
});

Game.Scenes.SixPart[29] = new Scene({
  text: `
    - Спасибо. Все верно. Я хочу взять все в свои руки и решить поскорее эти проблемы. 
    <p>- Запомни одну вещь. Дальше - не будет легче. Это путешествие будет ломать тебя, и не раз. Но вопреки всему, ты снова будешь подниматься, подобно фениксу, что раз за разом возрождается из пепла.
    <p>- Я не строю иллюзий о “радужном конце”. Но благодарю за твое неравнодушие и наставления. 
            `,
  background: "Backgrounds/WildWest_Portal",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[30].begin();  }],
});

Game.Scenes.SixPart[30] = new Scene({
  text: `
    - Это мой долг. 
    <p>- И все же. 
    <p>Проводник ничего не ответил, лишь жестом указал на дверь. 
    <p>- До скорой встречи, - махнув рукой на прощание, я отправилась дальше покорять девятнадцатый век. 
            `,
  background: "Backgrounds/WildWest_Portal",
  buttontext: [''],
  buttonaction: [() => {
    Game.Scenes.SixPart[31].begin();
    Game.message('<i>1899 год, окраины Колорадо-Спрингс');
    Game.Effects.Flash();
    Game.Effects.Gray();
    Game.Sounds.play('Music','WildWest01');
  }],
});

Game.Scenes.SixPart[31] = new Scene({
  text: `
    Треск горящих дров вперемешку с громкими голосами - заставили меня постепенно пробудиться. 
    <p>Приоткрыв глаза, я увидела костер и кромешную темноту вокруг. Было холодно, складывалось ощущение, что мое тело лежит на земле, а совсем замерзнуть мне не позволяет тепло, исходящее от яркого пламени. 
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[32].begin();  }],
});

Game.Scenes.SixPart[32] = new Scene({
  text: `
    “Без сомнения я уже оказалась в теле Катарины. Но где я? Неужели еще одна нежелательная встреча с Александром?”
    <p>Я услышала, как незнакомый хриплый мужской голос стал говорить:
    <p>- Господа, так как наша дама благополучно уснула, предлагаю опрокинуть по стаканчику чего-нибудь крепкого. 
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[33].begin();  }],
});

Game.Scenes.SixPart[33] = new Scene({
  text: `
    - Куртис, мы приехали сюда не ради отдыха. У нас важная миссия. 
    <p>- Никола, когда ты уже прекратишь быть таким занудой? Вон, Роберт уже взял все в свои руки и наливает. Правильно делает. 
    <p>- Право, вы сведете меня с ума. Как хорошо, что Катарина не видит этого кошмара. 
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[34].begin();  }],
});

Game.Scenes.SixPart[34] = new Scene({
  text: `
    Я хотела встать. Хотела подать знак, что слышу их, что могу присоединиться к беседе. Но тело казалось невероятно тяжелым. По неведомым причинам я не могла пошевелить и пальцем, а мысли было сложно собрать в хоть какое-то подобие порядка. 
    <p>“Как будто бы каждое новое перемещение дается труднее предыдущего.” 
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[35].begin();  }],
});

Game.Scenes.SixPart[35] = new Scene({
  text: `
    И все же я нашла в себе силы слушать дальнейшие разговоры. 
    <p>- Давайте же выпьем за удачную экспедицию, - голос Роберта звучал искренне и задорно. 
    <p>Мужчины дружно крикнули: “Ура!” - и звонко чокнулись. 
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[36].begin();  }],
});

Game.Scenes.SixPart[36] = new Scene({
  text: `
    - Кхм, - недовольный тон Николы было сложно с кем-то перепутать. - Я предлагаю разойтись спать, так как завтра нам надо рано вставать. Мы почти добрались до пункта назначения. 
    <p>- Знаете, - Куртис говорил шепотом, добавляя голосу нотки загадочности. -  А давайте я вам поведаю о местной легенде индейцев. Атмосфера слишком к этому располагает. 
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[37].begin();  }],
});

Game.Scenes.SixPart[37] = new Scene({
  text: `
    - Ты серьезно? - Роберт обреченно вздохнул. - Как по мне, это все бредни, которыми пугают белых. Друзья, давайте не будем омрачать наш вечер и…
    <p>- Погоди, - Тесла заинтересовался предложением. - Откуда ты узнал об этой легенде? 
    <p>- Вы не поверите, если я вам скажу, что от самого представителя племени.
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[38].begin();  }],
});

Game.Scenes.SixPart[38] = new Scene({
  text: `
    - О чем я и говорю, - Роберт звонко поставил что-то на твердую поверхность. - Наплели тебе с три короба, а ты и рад верить, Куртис. 
    <p>- Нет-нет, - Никола перебил Роберта. - Расскажи, пожалуйста. А вдруг это связано с тем, что мы ищем? 
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[146].begin();  }],
});

Game.Scenes.SixPart[146] = new Scene({
  text: `
    - Может быть и связано, но мы приехали сюда не сказки слушать, - Роберт подлил в пустые стаканы спиртного и отпил, задумчиво подняв голову к звездам. - Но вы правы, возможно, атмосфера и правда располагает к небылицам.
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[39].begin();  }],
});

Game.Scenes.SixPart[39] = new Scene({
  text: `
    - Господа, предлагаю послушать историю, а уж после - рассуждать. Даже если это и бред, то история все равно заслуживает право на существование. 
    <p>Куртис выдержал драматическую паузу, видимо дожидаясь, пока его собеседники успокоятся, а затем начал свой рассказ. 
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[40].begin(); Game.Sounds.play('Music', 'WildWest03')}],
});

Game.Scenes.SixPart[40] = new Scene({
  text: `
    - В начале сотворения мира, Серый Орел был хранителем солнца, луны, звезд, пресной воды и огня. Мудрый Орел был посланником небес. Так случилось, что он не жаловал людей за их нечистые помыслы, поэтому прятал от них заветные блага, поместив их в каменный диск.
            `,
  background: "Backgrounds/Legend_Scene_01",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[147].begin();  }],
});

Game.Scenes.SixPart[147] = new Scene({
  text: `
    - В те далекие времена люди выживали без воды и огня, пока величественная птица бережно хранила свой артефакт скрытым от любопытных глаз. 
            `,
  background: "Backgrounds/Legend_Scene_01",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[41].begin();  }],
});

Game.Scenes.SixPart[41] = new Scene({
  text: `
    - У Серого Орла была прекрасная дочь, которую он оберегал и хранил так же внимательно, как драгоценный артефакт.  Однажды появился в деревне незнакомец, который случайно увидел дочь Орла и влюбился без памяти. 
            `,
  background: "Backgrounds/Legend_Scene_02",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[42].begin();  }],
});

Game.Scenes.SixPart[42] = new Scene({
  text: `
    - Но не мог путник просить любви этой красавицы, потому что несмотря на его красоту, он вызывал особенную неприязнь у окружающих из-за своих черных, как смоль, перьев. И решил он превратить себя в снежно-белую птицу, чтобы понравиться дочери Орла.  
            `,
  background: "Backgrounds/Legend_Scene_03",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[43].begin();  }],
});

Game.Scenes.SixPart[43] = new Scene({
  text: `
    - Пришел он как-то к местному шаману и говорит: «А сделай мои перья белоснежными, как чистый снег». Отвечает ему колдун: «Ты рожден вороном им и останешься. Нет такой силы, которая поменяла бы твою суть». Ворон не сдавался: «Я небесам молился, только на тебя надежда осталась, помоги мне».
            `,
  background: "Backgrounds/Legend_Scene_04",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[44].begin();  }],
});

Game.Scenes.SixPart[44] = new Scene({
  text: `
    - Шаман долго думал, три дня и три ночи, совета спрашивал у богов и вот на четвертый день приходит к ворону и говорит: «Будь по твоему, птица. Но помни, истинный твой лик обратно вернётся, коли воспротивишься воле богов!»
            `,
  background: "Backgrounds/Legend_Scene_04",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[45].begin();  }],
});

Game.Scenes.SixPart[45] = new Scene({
  text: `
    - И сдержал слово колдун, на следующий день проснулся ворон белоснежным, как чистый снег.
            `,
  background: "Backgrounds/Legend_Scene_05",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[46].begin();  }],
});

Game.Scenes.SixPart[46] = new Scene({
  text: `
    - Увидев новый облик путника, дочь Орла обратила на него свой взор. Встречались они тайком, чтобы не вызвать гнев Серого Орла. Но однажды его дочь осмелилась пригласить своего возлюбленного в их дом, чтобы просить у отца благословения.
            `,
  background: "Backgrounds/Legend_Scene_05",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[47].begin();  }],
});

Game.Scenes.SixPart[47] = new Scene({
  text: `
    - И когда ворон увидел загадочный каменный диск с надписями на нем, то в миг понял, что должен сделать. Артефакт манил птицу и улучив момент, когда его оставили без внимания, он выкрал ценность и поспешил покинуть обитель Серого Орла.  
            `,
  background: "Backgrounds/Legend_Scene_06",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[48].begin();  }],
});

Game.Scenes.SixPart[48] = new Scene({
  text: `
    - Полетел ворон с диском в самую чащу леса и вдруг услышал голос: «Зачем ты потревожил божественную силу?» Ворон растерялся, но поняв, что голос исходит изнутри артефакта, ответил: «Люди голодают и умирают, неужели боги так разгневаны, что не могут поделиться своими дарами с нуждающимися?» 
            `,
  background: "Backgrounds/Legend_Scene_06",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[49].begin();  }],
});

Game.Scenes.SixPart[49] = new Scene({
  text: `
     - Голос внутри стал яростнее: «Как ты смеешь оценивать Богов, мальчишка!»
     И вдруг диск зашипел, затрещал и из сердцевины начало исходить свечение. Ворон испугался и выронил диск.
            `,
  background: "Backgrounds/Legend_Scene_06",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[50].begin();  }],
});

Game.Scenes.SixPart[50] = new Scene({
  text: `
     - Разбился он на четыре части. Освободив заветные блага, ворон решил отдать их людям. Солнце, луну и звезды он поместил на небо. Воду расплескал на землю, даруя шанс зародиться новой жизни. 
            `,
  background: "Backgrounds/Legend_Scene_07",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[51].begin();  }],
});

Game.Scenes.SixPart[51] = new Scene({
  text: `
     - Огонь пугал людей и ворон никак не мог найти ему место. Так долго держал он в клюве горящий уголек, что дым пропитал его перья, окрасив их в черный цвет. Увидев, что вернулся его прежний облик и не осталось следа от белоснежных крыльев, он выпустил горящее несчастье.
            `,
  background: "Backgrounds/Legend_Scene_07",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[52].begin();  }],
});

Game.Scenes.SixPart[52] = new Scene({
  text: `
     - Ударилась головешка о камни и полетели искры. Перестали люди бояться этого блага и с тех самых пор, если стукнуть камень о камень, то появится огонь, что не раз потом согреет человека.
            `,
  background: "Backgrounds/Legend_Scene_07",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[53].begin();  }],
});

Game.Scenes.SixPart[53] = new Scene({
  text: `
     - Обретя свой прежний вид, ему ничего не оставалось, кроме как принять судьбу и завершить дело до конца. Куски некогда цельного каменного диска, он разбросал по всему миру. 
            `,
  background: "Backgrounds/Legend_Scene_03",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[54].begin();  }],
});

Game.Scenes.SixPart[54] = new Scene({
  text: `
     - Последняя его воля звучала так: «Не должна божественная сила одному принадлежать».
            `,
  background: "Backgrounds/Legend_Scene_03",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[55].begin(); Game.Sounds.play('Music', 'WildWest01')}],
});

Game.Scenes.SixPart[55] = new Scene({
  text: `
     Мне казалось, что я перестала дышать, пока слушала эту историю.
     <p>“Как только люди смогли все так связать? Интересно, какое историческое событие легло в основу этой легенды? И существовал ли когда-то такой артефакт?”
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[56].begin();  }],
});

Game.Scenes.SixPart[56] = new Scene({
  text: `
     Но с другой стороны, это может быть просто байкой, как верно заметил Роберт. Не стоит придумывать себе вымышленных связей с реальностью. 
     <p>Даже не знаю, что и думать…
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [
    'Легенда основана на чем-то правдивом',
    'Красивый вымысел',
    'Есть и есть. Какая разница?',

  ],
  buttonaction: [
    () => { Game.Scenes.SixPart[57].begin(); Game.message('Вы верите мифам'); Game.Stats.EagleLegend.add(1);},
    () => { Game.Scenes.SixPart[58].begin(); Game.message('Вас не привлекают древние легенды'); Game.Stats.EagleLegend.add(-1);},
    () => { Game.Scenes.SixPart[59].begin(); Game.message('Вы равнодушны к услышанному'); Game.Stats.EagleLegend.add(0);},
  ],
});

Game.Scenes.SixPart[57] = new Scene({
  text: `
     Насколько я помню, индейцы очень бережно относились к мифологии и знаниям, которые они передавали. Просто так не могла появиться столь складная легенда. 
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[60].begin();  }],
});

Game.Scenes.SixPart[58] = new Scene({
  text: `
     Артефакты, птицы. Все это похоже на сказку и не более. В реальности не бывает магии или магических предметов. 
     <p>“Зато есть перемещение во времени. Отличная логика.”
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[60].begin();  }],
});

Game.Scenes.SixPart[59] = new Scene({
  text: `
     Насколько я помню, индейцы очень бережно относились к мифологии и знаниям, которые они передавали. Просто так не могла появиться столь складная легенда. 
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[60].begin();  }],
});

Game.Scenes.SixPart[60] = new Scene({
  text: `
     - Спасибо, Куртис, это очень увлекательный рассказ, - говорил восторженно Тесла. - Как же они умеют складывать все в такие прелестные истории. 
     <p>- О чем я и говорил, - Роберт недовольно хмыкнул. - Детская сказка, да еще и с печальным финалом. Жалко птичку. 
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[61].begin();  }],
});

Game.Scenes.SixPart[61] = new Scene({
  text: `
     - Господа, благодарю за прекрасный вечер. Вынужден откланяться, так как усталость берет свое, - послышалось, как Куртис встал и размял затекшие колени. 
     <p>- И то верно. Давайте готовиться ко сну. 
     <p>Мужчины стали прибирать лагерь, сворачивая столь душевную посиделку. 
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[75].begin();  }],
  condition: function () {
    Game.Stats.Robert.get >= 3 ?
      this.buttonaction[0] = () => { Game.Scenes.SixPart[62].begin()}
      :
      Game.Stats.Nicola.get >= 5 ?
        this.buttonaction[0] = () => { Game.Scenes.SixPart[71].begin()}
        :
        this.buttonaction[0] = () => { Game.Scenes.SixPart[75].begin()}
  }
});

Game.Scenes.SixPart[62] = new Scene({
  text: `
    Я услышала шаги, которые медленно приближались. Кто-то сел передо мной, нежно провел рукой по плечу и произнес:
    <p>- Надеюсь, теперь ты в порядке и никакой кошмар тебя не потревожит, - это был уставший, но ласковый голос Роберта. - Спи спокойно, я рядом. 
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[63].begin();  }],
});

Game.Scenes.SixPart[63] = new Scene({
  text: `
    Мне было сложно представить, что могло произойти с того момента, когда мне в последний раз удалось увидеть Роберта. 
    <p>“Они с Катариной стали ближе? Как она пережила возвращение в свое тело? А вернулась ли?”
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[64].begin();  }],
});

Game.Scenes.SixPart[64] = new Scene({
  text: `
    Я чувствовала от мужчины запах алкоголя. То ли он был причиной следующей сказанной фразы, то ли Роберта действительно волновало прошлое:
    <p>- Что же с тобой случилось в то злополучное похищение, дорогая?
    <p>Я слышала, как он подлил себе в емкость спиртное и вмиг осушил содержимое. 
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[65].begin();  }],
});

Game.Scenes.SixPart[65] = new Scene({
  text: `
    - Какой же я идиот, Катарина. Я так запутался. Не понимаю, как должен поступить, куда должен прийти по итогу. 
    <p>Мне стало так тоскливо из-за состояния мужчины. Сложно представить, что он переживал все эти годы.
    <p>“А учитывая, какая у него непростая судьба, я его понимаю. Каждому нужно иногда выговориться.”
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[69].begin();  }],
  condition: function () {
    Game.Stats.DanceWithRobert.get >= 1 ?
      this.buttonaction[0] = () => { Game.Scenes.SixPart[66].begin()}
      :
      this.buttonaction[0] = () => { Game.Scenes.SixPart[69].begin()}
  }
});

Game.Scenes.SixPart[66] = new Scene({
  text: `
    - Во время того самого приема, ты словно была другим человеком. Я, признаться, очень удивился, что сама Катарина не хотела отпускать меня. Вместо привычной тебе светской беседы, предпочла танец со мной…
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[67].begin();  }],
});

Game.Scenes.SixPart[67] = new Scene({
  text: `
    - А каким он был! Абсолютно новые ощущения для меня. Я почувствовал себя таким живым. Таким настоящим. Эти объятия, веселье и спокойствие рядом с тобой. Спасибо, Катарина. 
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[68].begin();  }],
});

Game.Scenes.SixPart[68] = new Scene({
  text: `
    Разумеется, он был уверен, что я крепко сплю, иначе бы не посмел открыть свои чувства. 
    <p>“Утром я снова увижу ворчливого Роберта, который сосредоточен на своем деле.”
    <p>Однако от этих мыслей не становилось грустно, ведь сегодня я стала на шаг ближе к нему. 
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[69].begin();  }],
});

Game.Scenes.SixPart[69] = new Scene({
  text: `
    Спустя все это время вместе, моя уверенность в том, какой на самом деле Роберт ранимый - только укреплялась.
    <p>“Он слишком строг к себе. В какой-то степени виновата работа… Как же хочется просто его обнять и не отпускать.”
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[70].begin();  }],
});

Game.Scenes.SixPart[70] = new Scene({
  text: `
    Невольно я сопоставила Роберта с Гаем, парнем из Помпей. 
    <p>Меня немного затрясло, что, видимо, не скрылось от глаз Роберта. Он заботливо накрыл меня одеялом и произнес:
    <p>- Спокойной ночи. 
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[75].begin();  }],
});

Game.Scenes.SixPart[71] = new Scene({
  text: `
    Я услышала шаги, которые медленно приближались. Кто-то сел передо мной и произнес:
    <p>- Катарина, зачем же ты отправилась с нами…
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[72].begin();  }],
});

Game.Scenes.SixPart[72] = new Scene({
  text: `
    Я тут же узнала встревоженный голос Николы. Мужчина легким движением провел по моей ладони, продолжая повторять:
    <p>- Какой же я слабый. Я не смог защитить тебя, не смог защитить своего брата. Да что я вообще могу? Только сидеть и мечтать об этих дурацких изобретениях…
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[73].begin();  }],
});

Game.Scenes.SixPart[73] = new Scene({
  text: `
    Такое откровение отозвалось болью в сердце. Даже сквозь затуманенное сознание, я чувствовала тревогу Николы. Мне хотелось встать и поддержать его. Сказать ему, каким великим человеком он станет благодаря своим мечтам и упорному труду. 
    <p>Но проклятое тело оставалось приковано к земле. 
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[74].begin();  }],
});

Game.Scenes.SixPart[74] = new Scene({
  text: `
    - Спи спокойно, Катарина. Что бы ни случилось. 
    <p>Мужчина накрыл меня одеялом, а затем поспешно удалился.
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[75].begin();  }],
});

Game.Scenes.SixPart[75] = new Scene({
  text: `
    Оставшись наедине со своими мыслями, я наконец-то смогла выдохнуть и крепко заснуть. В тот благополучный вечер никакие сновидения не беспокоили меня. 
            `,
  background: "Backgrounds/Camp_Night",
  buttontext: [''],
  buttonaction: [() => {
    Game.Scenes.SixPart[76].begin();
    Game.Sounds.play('Music', 'WildWest02');
    Game.Effects.Gray.Stop();
    Game.Effects.Flash();
  }],
});

Game.Scenes.SixPart[76] = new Scene({
  text: `
    Легкое солнышко пробивалось сквозь ветви деревьев, назойливо светя прямо в глаза. Машинально я протянула руку в сторону, пытаясь достать до занавесок, чтобы спастись от раннего пробуждения. 
    <p>Но быстро осознала, что привычный комфорт моей квартиры остался в грядущем XXI веке. 
            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[77].begin();  }],
});

Game.Scenes.SixPart[77] = new Scene({
  text: `
    Я нехотя села, пытаясь проснуться. На удивление, я чувствовала себя превосходно, словно вчерашние недомогания были кошмарным сном. 
    <p>Оглядевшись, я обратила внимание, во что была одета Катарина: длинная бежевая юбка, легкая белая рубашка с завязанным на шее платком, а также черные высокие сапоги.
            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[86].begin();  }],
});

Game.Scenes.SixPart[86] = new Scene({
  text: `
    <p>Рядом красовалась шляпа, подобно той, что носили ковбои в эпоху дикого запада. 
    <p>“Совпадение? С другой стороны, вся эта эпоха длилась вплоть до 1920 года, пока медленными шагами менялся уклад жизни людей. Интересно.” 
            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[78].begin();  }],
});

Game.Scenes.SixPart[78] = new Scene({
  text: `
    Затем я перевела взгляд на сам лагерь, где мужчины прошлой ночью так интересно беседовали. 
    <p>Несколько бревен, почти потухший костер, рядом с которым было разбросано несколько железных кружек. 
    <p>Никого из моих спутников не было видно. Это дало мне передышку и время подумать над дальнейшими шагами. 
            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[79].begin();  }],
});

Game.Scenes.SixPart[79] = new Scene({
  text: `
    “Как бы это не было романтично, но я все еще не понимаю ради чего затеяно все это приключение. К тому же, второй раз, трюк с потерей памяти не пройдет. Что же мне придумать, чтобы не вызывать подозрений?”
            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[80].begin();  }],
});

Game.Scenes.SixPart[80] = new Scene({
  text: `
     Не успев закончить рассуждения, я услышала звонкий и бойкий голос, который произнес:
     <p>- Мисс, Джонсон, доброе утро! Надеюсь, вы хорошо спали?
            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[81].begin(); Game.message('Вы можете выбрать внешность Куртиса');  }],
});

Game.Scenes.SixPart[81] = new Scene({
  text: `
     Это был тот самый незнакомый мне мужчина по фамилии Куртис, рассказавший увлекательную легенду индейцев. 
     <p>Он выглядел:
            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: [
    'Романтично, по-простому',
    'Элегантно, но не вычурно',
    'Дерзко, по-ковбойски',
  ],
  buttonaction: [
    () => { Game.Scenes.SixPart[82].begin();  },
    () => { Game.Scenes.SixPart[83].begin();  },
    () => { Game.Scenes.SixPart[84].begin();  },
  ],
});

Game.Scenes.SixPart[82] = new Scene({
  text: `
     Он выглядел довольно просто, казалось даже романтично из-за его нежной улыбки.
     <p>Небрежно уложенные волосы под черной шляпой, но при этом строгая жилетка. Обычный костюм и добрые глаза дополняли его образ джентльмена. 
            `,
  background: "Persons/Curtis_01",
  buttontext: [
    'Продолжить',
    'Выбрать другого',
  ],
  buttonaction: [
    () => { Game.Stats.CurtisAppearance.set(1); Game.Scenes.SixPart[85].begin();},
    () => { Game.Scenes.SixPart[81].begin();},
  ],
});

Game.Scenes.SixPart[83] = new Scene({
  text: `
     Он выглядел очень элегантно: черный пиджак, стильная жилетка с золотыми нитями, аккуратная шляпа. 
     <p>Словно это был человек из высшего общества, но который не вел себя высокомерно, а, напротив, окутывал своим добродушием.
            `,
  background: "Persons/Curtis_02",
  buttontext: [
    'Продолжить',
    'Выбрать другого',
  ],
  buttonaction: [
    () => { Game.Stats.CurtisAppearance.set(2); Game.Scenes.SixPart[85].begin();},
    () => { Game.Scenes.SixPart[81].begin();},
  ],
});

Game.Scenes.SixPart[84] = new Scene({
  text: `
     Он выглядел как типичный житель дикого запада. Легкая рубашка и привлекательная шляпа. 
     <p>Его взгляд был задорным, а верхние пуговицы рубашки расстегнуты, что только добавляло дерзости его образу.
            `,
  background: "Persons/Curtis_03",
  buttontext: [
    'Продолжить',
    'Выбрать другого',
  ],
  buttonaction: [
    () => { Game.Stats.CurtisAppearance.set(3); Game.Scenes.SixPart[85].begin();},
    () => { Game.Scenes.SixPart[81].begin();},
  ],
});

Game.Scenes.SixPart[85] = new Scene({
  text: `
     Мужчина озадаченно смотрел на меня, видимо ожидая моего ответа. Есть ли разница в том, что мне сказать?
      <p>И я ответила: 
            `,
  background: 'Persons/Curtis_01',
  buttontext: [
    'Какая чудесная погода!',
    'Кто вы?',
    'Доброе утро!',
  ],
  buttonaction: [
    () => { Game.Scenes.SixPart[87].begin()},
    () => { Game.Scenes.SixPart[88].begin()},
    () => { Game.Scenes.SixPart[89].begin()},
  ],
  condition: function () {
    this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`);
  }
});

Game.Scenes.SixPart[87] = new Scene({
  text: `
    Я нервно начала теребить подол юбки, чувствуя, как задергался глаз в ожидании реакции мужчины.
    <p>Куртис же рассмеялся и проговорил: 
    <p>- Вы что же, не расположены к беседе, мисс? Может, вам не здоровится? Но, признаться, вы попали в точку. Солнце в это раннее утро прекрасно как никогда! Но нужно начинать собираться, чтобы избежать жары. 
    <p>“Ох, что я несу…”
            `,
  background: "Persons/Curtis_02",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[90].begin();  }],
  condition: function () {
    this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`);
  }
});

Game.Scenes.SixPart[88] = new Scene({
  text: `
    Куртис рассмеялся и проговорил: 
    <p>- Еще вчера был инженером, который неплохо показал себя в роли рассказчика. Жаль, вы не услышали. Уверен, вы бы оценили или даже, быть может, решились поставить спектакль…
    <p>“Слышала-слышала… Ох, что я несу.”
            `,
  background: "Persons/Curtis_03",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[90].begin();  }],
  condition: function () {
    this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`);
  }
});

Game.Scenes.SixPart[89] = new Scene({
  text: `
    Куртис удовлетворительно кивнул и сказал: 
    <p>- Надеюсь, наша ночная посиделка никак не мешала вам видеть сны. 
    <p>- Нисколько! 
            `,
  background: "Persons/Curtis_01",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[90].begin();  }],
  condition: function () {
    this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`);
  }
});

Game.Scenes.SixPart[90] = new Scene({
  text: `
    “Вроде справилась… Он не похож на подозрительного человека, который бы сильно заострял внимание на чем-то странном. Достаточно приятный и веселый мужчина. Нужно расслабиться и не накручивать себя.”
            `,
  background: "Persons/Curtis_01",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[91].begin();  }],
  condition: function () {
    this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`);
  }
});

Game.Scenes.SixPart[91] = new Scene({
  text: `
    - Кстати, - Куртис собирал разбросанную посуду. - Если вы ищете Роберта, то он пошел к реке, чтобы привести себя в порядок и набрать воды в дорогу. Я думаю, скоро вернется. 
    <p>Мужчина бережно складывал кружки в рюкзак. Держа последнюю чашку в руках, он спросил:
    <p>- Мисс, вы случаем не голодны? У нас осталось немного свинины с вечера, а до ближайшего приличного места в городе скакать несколько часов. 
            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[92].begin();  }],
});

Game.Scenes.SixPart[92] = new Scene({
  text: `
    “Ох, еда - сейчас это последнее, о чем я буду думать. Какой еще город? Скакать? Так, $Имя Игрока$, надо собраться. Задам абстрактные вопросы и хотя бы примерно пойму положение дел.”
            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: [
    'А где же лошади?',
    'Нас кто-то встретит на месте?',
    'А что мы будем делать после поездки?',
    'Закончить диалог'
  ],
  buttonaction: [
    () => { Game.Scenes.SixPart[95].deactivate(0); Game.Scenes.SixPart[98].deactivate(0); Game.Scenes.SixPart[100].deactivate(0); Game.Scenes.SixPart[93].begin();},
    () => { Game.Scenes.SixPart[95].deactivate(1); Game.Scenes.SixPart[98].deactivate(1); Game.Scenes.SixPart[100].deactivate(1); Game.Scenes.SixPart[96].begin();},
    () => { Game.Scenes.SixPart[95].deactivate(2); Game.Scenes.SixPart[98].deactivate(2); Game.Scenes.SixPart[100].deactivate(2); Game.Scenes.SixPart[99].begin();},
    () => { Game.Scenes.SixPart[101].begin();}
  ],
  buttonactive: [true,true,true,false],
  condition: function () {
    this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`);
    Game.Scenes.SixPart[98].activate(0); Game.Scenes.SixPart[100].activate(0);
    Game.Scenes.SixPart[95].activate(1); Game.Scenes.SixPart[100].activate(1);
    Game.Scenes.SixPart[95].activate(2); Game.Scenes.SixPart[98].activate(2);
    this.buttonactive[0] === false && this.buttonactive[1] === false && this.buttonactive[2] === false ?
      this.buttonactive[3] = true : this.buttonactive[3] = false;
  }
});

Game.Scenes.SixPart[93] = new Scene({
  text: `
    - Никола кормит их перед дорогой. Беспокоюсь немного, что не успеем доскакать до того, как солнце будет в зените. 
    <p>- У нас же есть головные уборы. Должно помочь. 
    <p>- Вы правы, мисс Катарина. Однако поверьте, открытое пространство без большого количество зелени - очень изнуряет. 
            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[94].begin();  }],
  condition: function () {
    this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`);
  }
});

Game.Scenes.SixPart[94] = new Scene({
  text: `
    - У вас имелся опыт в подобных экспедициях? 
    <p>- Да. Я рассказывал Роберту и Николе о том, что раньше частенько увлекался подобными авантюрами. Хоть сейчас и кажется, словно мы гоняемся за сказкой, но итог может быть непредсказуем.
            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[95].begin();  }],
  condition: function () {
    this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`);
  }
});

Game.Scenes.SixPart[95] = new Scene({
  text: `
    “Они что-то ищут. Учитывая вчерашнюю заинтересованность Теслы относительно легенды индейцев, нужно мыслить в этом направлении.”
            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: Game.Scenes.SixPart[92].buttontext,
  buttonaction: Game.Scenes.SixPart[92].buttonaction,
  buttonactive: [false,true,true,false],
  condition: function () {
    this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`);
    this.buttonactive[0] === false && this.buttonactive[1] === false && this.buttonactive[2] === false ?
      this.buttonactive[3] = true : this.buttonactive[3] = false;
  }
});

Game.Scenes.SixPart[96] = new Scene({
  text: `
    - Разумеется. Роберт же вроде упоминал о своих знакомых, которые любезно согласились разместить нас в гостинице. 
    <p>- Простите. Должно быть путешествие утомило меня. 
    <p>- Не страшно. Признаюсь честно, я поражен вашей решимостью отправиться с нами в этот несчастный Колорадо-Спрингс. 
            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[97].begin();  }],
  condition: function () {
    this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`);
  }
});

Game.Scenes.SixPart[97] = new Scene({
  text: `
    - Несчастный…? 
    <p>- Это мои личные предубеждения. Каждый раз, когда я вынужден отправиться сюда, происходит чертовщина. Собственно, как и сейчас. Непонятно только с чем это связано… 
            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[98].begin();  }],
  condition: function () {
    this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`);
  }
});

Game.Scenes.SixPart[98] = new Scene({
  text: `
    “Колорадо-Спрингс. По крайне мере теперь я знаю, куда мы направляемся. Интересно, в городе действительно творится необъяснимое?” 
            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: Game.Scenes.SixPart[92].buttontext,
  buttonaction: Game.Scenes.SixPart[92].buttonaction,
  buttonactive: [true,false,true,false],
  condition: function (){
    this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`);
    this.buttonactive[0] === false && this.buttonactive[1] === false && this.buttonactive[2] === false ?
      this.buttonactive[3] = true : this.buttonactive[3] = false;
  }

});

Game.Scenes.SixPart[99] = new Scene({
  text: `
    - Я бы не заглядывал настолько вперед, - Куртис пожал плечами. - В конце концов мы не знаем, что предстоит пережить в этом путешествие. 
    <p>- Вы чего-то боитесь?
    <p>- Не сказал бы. Я не склонен трястись от страха из-за баек, однако и отрицать их не вижу смысла. В каждой сказке есть доля правды, не так ли?

            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[100].begin();  }],
  condition: function () {
    this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`);
  }
});

Game.Scenes.SixPart[100] = new Scene({
  text: `
    “Любопытно. Несмотря на его уверенность, он явно чем-то встревожен. В какую же авантюру они ввязались?”
            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: Game.Scenes.SixPart[92].buttontext,
  buttonaction: Game.Scenes.SixPart[92].buttonaction,
  buttonactive: [true,true,false,false],
  condition: function () {
    this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`);
    this.buttonactive[0] === false && this.buttonactive[1] === false && this.buttonactive[2] === false ?
      this.buttonactive[3] = true : this.buttonactive[3] = false;
  }
});

Game.Scenes.SixPart[101] = new Scene({
  text: `
    - Что ж, благодарю вас за прекрасную беседу, вынужден откланяться, так как необходимо помочь с остальными приготовлениями к отъезду. 
    <p>- Спасибо вам, вы очень любезны!
            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[102].begin();  }],
  condition: function () {
    this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`);
  }
});

Game.Scenes.SixPart[102] = new Scene({
  text: `
    “И мне не стоит рассиживаться. Может, им нужна помощь?”
    <p>Но так и не найдя себе занятие, я начала ходить вокруг лагеря и размышлять об услышанном. 
            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[103].begin();  }],
});

Game.Scenes.SixPart[103] = new Scene({
  text: `
    Неожиданно чья-то рука опустилась мне на плечо, а затем бодрый мужской голос произнес:
    <p>- Проснулась? Кошмары не мучали? 
            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[104].begin();  }],
});

Game.Scenes.SixPart[104] = new Scene({
  text: `
    Это был Роберт, который выглядел под стать обстоятельствам. Скромная черная жилетка поверх легкой рубашки, вьющиеся русые волосы, слегка не доходящие до плеч и простая шляпа, без которой трудно обойтись, учитывая местный климат. 
    <p>“А он хорош. Даже не знаю, какой Роберт мне больше нравится. А этот его шрам в этом образе, он как аксессуар и бесспорно дополняет его.” 
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[105].begin();  }],
});

Game.Scenes.SixPart[105] = new Scene({
  text: `
    - Все хорошо. Доброе утро! - робко произнесла я, оценивающе разглядывая его. Это явно не осталось без внимания мужчины.
    <p>Он тоже задержал взгляд на мне и несмотря на некую искру в этот момент, он кивнул, продолжая говорить: 
    <p>- Никола подготовил лошадей. Скоро нужно будет уходить. 
    <p>- Да… 
    <p>- Какая-то ты сегодня неразговорчивая. Точно все в порядке? 
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[106].begin();  }],
});

Game.Scenes.SixPart[106] = new Scene({
  text: `
    - Да, - я чувствовала будто бы нахожусь на допросе. Под серьезным взглядом Роберта становилось все неуютнее. 
    <p>- Что мы делали вчера?
    <p>- Прости, что? 
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[107].begin();  }],
});

Game.Scenes.SixPart[107] = new Scene({
  text: `
    - Что мы делали вчера? - он испытывающе смотрел на меня, словно проверяя на что-то. 
    <p>“Какого черта?! Роберт в чем-то подозревает Катарину или он догадывается о второй личности? Мне никак не увильнуть. Придется отвечать максимально расплывчато или, может быть, сказать правду?”
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [
    'Ехали, пили, ели',
    'Слушали легенду индейцев',
  ],
  buttonaction: [
    () => { Game.Scenes.SixPart[108].begin();  },
    () => { Game.Scenes.SixPart[111].begin();  },
  ],
});

Game.Scenes.SixPart[108] = new Scene({
  text: `
    Роберт недовольно скрестил руки на груди и произнес:
    <p>- А конкретнее? 
    <p>- Да что ты ко мне прицепился? - я не выдержала и немного повысила голос. 
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[109].begin();  }],
});

Game.Scenes.SixPart[109] = new Scene({
  text: `
    - Хочу услышать правду. И все. 
    <p>- Это она и есть. Я плохо помню. 
    <p>- Ты не можешь ответить, что происходило вчера?
    <p>- А обязана? - его поведение вывело меня из равновесия. 
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[110].begin(); Game.message('Роберта расстроила ваша ложь'); Game.Stats.Robert.add(-1);}],
});

Game.Scenes.SixPart[110] = new Scene({
  text: `
    Мужчина вздохнул и отвел взгляд. Его что-то встревожило, но он не решался сказать об этом прямо. 
    <p>- Я пойду готовиться, - холодно сказанная фраза и резкий уход Роберта говорили лишь о том, что его совершенно не удовлетворил мой ответ. 
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[117].begin();  }],
});

Game.Scenes.SixPart[111] = new Scene({
  text: `
    - Так ты не спала? - Роберт ошарашенно смотрел на меня, совершенно забыв о своем стремлении устроить допрос. 
    <p>- Нет, я… Я хотела сказать. Но плохо себя чувствовала. 
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[112].begin();  }],
});

Game.Scenes.SixPart[112] = new Scene({
  text: `
    Мужчина провел рукой по волосам и серьезно посмотрел на меня, приговаривая:
    <p>- Ты обещала мне, что если будешь себя плохо чувствовать, то непременно скажешь. Или ты забыла про свои обмороки? 
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[113].begin();  }],
});

Game.Scenes.SixPart[113] = new Scene({
  text: `
    “Обмороки? Последнее мое воспоминание из Нью-Йорка XIX века - это окончание приема и мое падение. Однако Роберт упоминает этот недуг во множественном числе. Видимо не только мне тяжело переносить эти перемещения.”
    <p>- Извини. Я так увлеклась историей… К тому же, потом очень захотелось спать.
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[116].begin()}],
  condition: function () {
    Game.Stats.Robert.get >=3 ?
      this.buttonaction[0] = () =>{ Game.Scenes.SixPart[114].begin()}
      :
      this.buttonaction[0] = () =>{ Game.Scenes.SixPart[116].begin()}
  }
});

Game.Scenes.SixPart[114] = new Scene({
  text: `
    Роберт смущенно отвернулся, но все-таки нашел в себе силы спросить:
    <p>- А ты слышала…, знала, что я подходил? 
    <p>- Да, - я улыбнулась, наблюдая за таким милым поведением мужчины. 
    <p>“Вроде бы весь из себя серьезный охотник, а смущается, как мальчишка.”
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[115].begin();  }],
});

Game.Scenes.SixPart[115] = new Scene({
  text: `
    - Что ж, я всего лишь накрыл тебя пледом и проверил твое состояние.
    <p>- Знаю. И очень ценю это.
    <p>Я осмелилась взять Роберта за руку и легонько сжать, давая понять, что одобряю его действия. 
    <p>По началу, мне казалось - охотник не был рад этому. Затем я почувствовала легкое поглаживание шершавыми пальцами.
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[116].begin();  }],
});

Game.Scenes.SixPart[116] = new Scene({
  text: `
    - Мне пора, Катарина. Нужно помочь Куртису все собрать и выдвигаться. Спасибо за честность. 
    <p>Я заметила облегчение на лице Роберта. Мне и самой стало немного лучше, ведь я отвела от себя ненужные подозрения, если они, конечно, были. 
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[117].begin();  }],
  condition: function () {
    Game.message('Роберту приятна близость с вами');
    Game.Stats.Robert.add(1);
  }
});

Game.Scenes.SixPart[117] = new Scene({
  text: `
    Когда Куртис и Роберт скрылись собирать оставшиеся вещи, я решила пойти на звук лошадей. 
    <p>“Должно быть там находится Никола. Стоит пойти к нему. Может, ему нужно помочь. Или будет возможность узнать у него полезную информацию.” 
            `,
  background: "Backgrounds/Camp_Morning",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[118].begin();  }],
});

Game.Scenes.SixPart[118] = new Scene({
  text: `
    Тесла находился в окружении трех гордых скакунов и кормил их яблоками. Животные радостно принимали угощения, пока ученый тянулся в карман за новыми порциями. 
            `,
  background: "Backgrounds/Horses_Meadow",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[205].begin();  }],
});

Game.Scenes.SixPart[205] = new Scene({
  text: `
    Увидев что я подхожу, он поприветствовал меня и тихо произнес:
    <p>- Интересные все-таки существа…
    <p>Я не стала обращать внимание на это странное высказывание, а решила полюбопытствовать:
    <p>- Тебе они нравятся?
            `,
  background: "Backgrounds/Horses_Meadow",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[119].begin();  }],
});

Game.Scenes.SixPart[119] = new Scene({
  text: `
    - Я больше предпочитаю мелких животных. Кошки, к примеру, очень грациозные создания, - Тесла немного замялся, но все же продолжил развивать мысль. - Знаешь, в детстве у меня был кот по имени Мачак. В один из вечеров, он отдыхал у меня на коленях, и я начал гладить его. 
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[120].begin();  }],
});

Game.Scenes.SixPart[120] = new Scene({
  text: `
    - Но неожиданно его спина стала полоской света, а моя рука будто бы произвела поток потрескивающих искр, словно я был неким колдуном. Тогда мама впервые объяснила мне значение слова электричество. Это чудо буквально лишило меня дара речи. И, конечно же, оставило свой след. 
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[121].begin();  }],
});

Game.Scenes.SixPart[121] = new Scene({
  text: `
    - А теперь я стою перед тобой, полный решимости и далее совершать открытия. И не только в этой области. 
    <p>“До сих пор не могу поверить, что слушаю рассказы легенды вот так вот… Просто и не напрягаясь.” 
    <p>И я захотела: 
            `,
  background: "Persons/Nicola",
  buttontext: [
    'Не нарушать идиллию',
    'Поддержать его стремления',
    '',
  ],
  buttonaction: [
    () => { Game.Scenes.SixPart[122].begin();  },
    () => { Game.Scenes.SixPart[123].begin(); Game.message('Никола ценит ваши теплые слова'); Game.Stats.Nicola.add(1)},
  ],
});

Game.Scenes.SixPart[122] = new Scene({
  text: `
    Никола продолжил свой монолог. Было сказано много слов, в какой-то степени даже откровений. Мне не хотелось больше ничего говорить. Достаточно просто стоять рядом с ним и наслаждаться моментом. 
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[127].begin();  }],
});

Game.Scenes.SixPart[123] = new Scene({
  text: `
    - Никола, никогда не сдавайся, - воодушевленно произнесла я. - Твоя работа сложна и полна опасностей. Но никто кроме тебя не сможет выполнить ее. 
    <p>- Спасибо, Катарина. Твои слова всегда вселяли в меня уверенность. И я безмерно этому благодарен. 
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[127].begin()}],
  condition: function () {
    Game.Stats.Study.get >=5 ?
      this.buttonaction[0] = () => { Game.Scenes.SixPart[124].begin()}
      :
      this.buttonaction[0] = () => { Game.Scenes.SixPart[127].begin()}
  }
});

Game.Scenes.SixPart[124] = new Scene({
  text: `
    - И все-таки ты не до конца честен со мной, - я грустно вздохнула, вспоминая о пристрастиях к азартным играм, о которых упоминается в его биографии. - Ты можешь больше, если перестанешь губить себя. Я не устану это повторять. 
    <p>Тесла на секунду отвернулся, пытаясь скрыть свои эмоции. Было видно, как эта тема раз за разом приносит ему дискомфорт и буквально загоняет в тупик.
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[126].begin(); Game.message('Ваши действия могут помочь Тесле избавиться от зависимости'); Game.Stats.HelpTesla.add(1)}],
});

Game.Scenes.SixPart[126] = new Scene({
  text: `
     - В последний раз я проиграл довольно крупную сумму и это заставило меня всерьез задуматься. На что я трачу свой потенциал? 
      <p>- Спасибо, что не сдаешься и бросаешь вызов трудностям, - произнесла я, с сочувствием глядя на ученого.
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[127].begin();  }],
});

Game.Scenes.SixPart[127] = new Scene({
  text: `
     Мы немного постояли в тишине, наблюдая, как лошади завершают трапезу. Я поймала себя на мысли, что в такой обстановке я впервые увидела Николу в совершенно другом образе. 
     <p>Он казался милым маленьким мальчиком, который радуется простым мелочам и не страдает от тяги к зависимостям или борьбы с несправедливостью Эдисона. 
            `,
  background: "Backgrounds/Horses_Meadow",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[128].begin();  }],
});

Game.Scenes.SixPart[128] = new Scene({
  text: `
    Находясь рядом с ним в этот момент, я тоже уловила волны спокойствия, навеянные легким ветром, раскинувшимися перед нами прериями и ритмичным причмокиванием довольных лошадей.
    <p>Вскоре к нам присоединились остальные компаньоны. Роберт принялся проверять, как закреплены седла и готово ли все к отъезду. 
            `,
  background: "Backgrounds/Horses_Meadow",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[129].begin();  }],
});

Game.Scenes.SixPart[129] = new Scene({
  text: `
    Куртис же вдруг обратился ко мне и спросил:
    <p>- Мисс Джонсон, если вы готовы, то можем отправляться. 
    <p>- Мне нечего собирать, - я беспокойно стала озираться по сторонам в поисках своих вещей, попутно задаваясь вопросом, были ли они у меня. 
            `,
  background: "Backgrounds/Horses_Meadow",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[130].begin();  }],
  condition: function () {this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`)}
});

Game.Scenes.SixPart[130] = new Scene({
  text: `
    - Я уже загрузил наши вещи, - бросил Роберт, не отвлекаясь от своего занятия. 
    <p>Мне оставалось лишь благодарно кивнуть. 
    <p>“Все-таки он слишком идеальный. Ничего не забывает, все время сосредоточен на делах. Разве что исключением является тот момент, когда он пьет алкогольные напитки.” 
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[131].begin()}],
});

Game.Scenes.SixPart[131] = new Scene({
  text: `
    - Прекрасно. Кстати, если вы устали от ворчуна-мужа, можете поехать со мной, ведь к несчастью нам удалось раздобыть только трех лошадей. 
    <p>- Леонард, - Роберт грозно посмотрел на Куртиса. - Давай без твоих игр. 
    <p>- Я просто предложил даме альтернативу. Что в этом такого? Есть еще Никола. У вас аж целых трое прекрасных спутников. Выбирайте! 
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[132].begin()}],
  condition: function () {this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`)}
});

Game.Scenes.SixPart[132] = new Scene({
  text: `
    Я немного растерялась под любопытными взглядами мужчин. 
    <p>“Но это же просто шалость, верно? Что такого, если я решу поехать не с Робертом, а с кем-то другим? Сами же предложили. Кого выбрать?”
            `,
  background: "Backgrounds/Horses_Meadow",
  buttontext: [
    'Никола Тесла',
    'Леонард Куртис',
    'Роберт Джонсон',
  ],
  buttonaction: [
    () => { Game.Scenes.SixPart[133].begin()},
    () => { Game.Scenes.SixPart[137].begin()},
    () => { Game.Scenes.SixPart[141].begin()},
  ],
});

Game.Scenes.SixPart[133] = new Scene({
  text: `
    Я нерешительным жестом указала на Николу, чем вызвала одобрительные хлопки Леонарда и суровый взгляд Роберта. 
    <p>- Вот так да, - Куртис положил руку на плечо мужа Катарины. - Не расстраивайся. Желание дамы - закон. 
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[134].begin()}],
});

Game.Scenes.SixPart[134] = new Scene({
  text: `
    Роберт лишь промолчал и забрался на лошадь:
    <p>- Выдвигаемся, - медленно набирая скорость кинул он напоследок. 
    <p>Никола, удивленный моим решением, галантно протянул мне руку, помогая забраться на скакуна. 
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[135].begin()}],
});

Game.Scenes.SixPart[135] = new Scene({
  text: `
    Лучи восходящего солнца окрашивали землю в теплые цвета, придавая окружению живость. Было приятно ощущать прохладу, пришедшую после ночи.
    <p>Мы скакали по бескрайним прериям, оставляя позади себя только пыль и тишину. В этот момент казалось, что это только наш мир и у нас есть свобода выбирать свой путь. 
            `,
  background: "Backgrounds/Horseriding",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[136].begin(); Game.message('Тесла был рад прокатиться с вами'); Game.Stats.Nicola.add(1)}],
});

Game.Scenes.SixPart[136] = new Scene({
  text: `
    Я обняла Николу за талию и наслаждалась легкими порывами ветра. Тесла держался в седле уверенно, но был слишком сосредоточен на дороге. Я буквально чувствовала его напряжение, а перед каждой кочкой он заблаговременно сбавлял скорость и постоянно спрашивал о моем самочувствии. 
    <p>Это было по-своему мило, хоть и немного чересчур для меня, ведь я не привыкла к такой опеке.  
            `,
  background: "Backgrounds/Horseriding",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[145].begin()}],
});

Game.Scenes.SixPart[137] = new Scene({
  text: `
    Я нерешительным жестом указала на Леонарда, чем вызвала удивленный вгляд Николы и суровый взгляд Роберта. 
    <p>- Вот так-то, - Куртис положил руку на плечо мужа Катарины. - Не расстраивайся. Желание дамы - закон. 
            `,
  background: "Backgrounds/Horseriding",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[138].begin()}],
  condition: function () {this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`)}
});

Game.Scenes.SixPart[138] = new Scene({
  text: `
    Роберт лишь промолчал и забрался на лошадь:
    <p>- Выдвигаемся, -  медленно набирая скорость кинул он напоследок.  
    <p>Куртис, присвистывая от радости, галантно протянул мне руку, помогая забраться на скакуна. 
            `,
  background: "Backgrounds/Horseriding",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[139].begin()}],
  condition: function () {this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`)}
});

Game.Scenes.SixPart[139] = new Scene({
  text: `
    Лучи восходящего солнца окрашивали землю в теплые цвета, придавая окружению живость. Было приятно ощущать прохладу, пришедшую после ночи.
    <p>Мы скакали по бескрайним прериям, оставляя позади себя только пыль и тишину. В этот момент казалось, что это только наш мир и у нас есть свобода выбирать свой путь.
            `,
  background: "Backgrounds/Horseriding",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[140].begin(); Game.message('Куртис был рад прокатиться с вами'); Game.Stats.Curtis.add(1)}],
});

Game.Scenes.SixPart[140] = new Scene({
  text: `
    Я обняла Леонарда за талию и наслаждалась легкими порывами ветра. Куртис держался в седле так, будто бы всю жизнь провел за этим занятием. 
    <p>Он с легкостью маневрировал, если возникала такая необходимость, даже умудрялся рассказывать интересные факты о местности, которую мы проезжали. 
    <p>Я ни сколько не пожалела, что выбрала его в качестве своего проводника. 
            `,
  background: "Backgrounds/Horseriding",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[145].begin()}],
});

Game.Scenes.SixPart[141] = new Scene({
  text: `
    Я смело указала на своего “мужа”, чем вызвала грустный вздох Леонарда и улыбку Николы.
    <p>- Что ж, ваше стремление быть всегда рядом с мужем, Катарина, выше всяких похвал, - Куртис забрался на свою лошадь и медленно выдвинулся вперед. 
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[142].begin()}],
});

Game.Scenes.SixPart[142] = new Scene({
  text: `
    Роберт практически никак не отреагировал на мой жест, но на секунду мне показалось, что на его безэмоциальном лице промелькнула легкая ухмылка, будто бы он очень доволен моим выбором. 
    <p>Он помог мне забраться на лошадь и мы не спеша последовали за нашими компаньонами. 
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[143].begin()}],
});

Game.Scenes.SixPart[143] = new Scene({
  text: `
    Лучи восходящего солнца окрашивали землю в теплые цвета, придавая окружению живость. Было приятно ощущать прохладу, пришедшую после ночи.
    <p>Мы скакали по бескрайним прериям, оставляя позади себя только пыль и тишину. В этот момент казалось, что это только наш мир и у нас есть свобода выбирать свой путь.
            `,
  background: "Backgrounds/Horseriding",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[144].begin(); Game.message('Роберт не сомневался в вашем выборе'); Game.Stats.Robert.add(1)}],
});

Game.Scenes.SixPart[144] = new Scene({
  text: `
    Я обняла Роберта за талию и наслаждалась легкими порывами ветра. Роберт одной рукой придерживал меня и держался в седле спокойно, словно для него это было чем-то обыденным, вроде регулярной езды на автомобиле. 
    <p>Порой он спрашивал, комфортно ли я себя чувствую, но в целом мы без приключений доскакали до пункта назначения. 
            `,
  background: "Backgrounds/Horseriding",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[145].begin()}],
});

Game.Scenes.SixPart[145] = new Scene({
  text: `
    Мужчина помог мне слезть с лошади и передо мной предстал Колорадо-Спрингс, который только начинал свой долгий и тернистый путь к урбанизации. 
            `,
  background: "Backgrounds/Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[148].begin()}],
});

Game.Scenes.SixPart[148] = new Scene({
  text: `
    Сейчас же город больше походил на пустыню, где изредка можно было наблюдать личностей довольно сомнительного вида, которые не стеснялись открыто показывать свое оружие и громко голосить песни неприличного содержания.
            `,
  background: "Backgrounds/Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[149].begin()}],
});

Game.Scenes.SixPart[149] = new Scene({
  text: `
     Так как подобное зрелище я могла наблюдать разве что в кино или в компьютерных играх, разумеется, было трудно контролировать свои эмоции. Но я наслаждалась, если так можно выразиться, местным колоритом вживую. 
     <p>Однако мои спутники довольно безэмоционально относились к происходящему, а обычные местные жители и вовсе не обращали на это внимание, неохотно занимаясь своими делами. 
            `,
  background: "Backgrounds/Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[150].begin()}],
});

Game.Scenes.SixPart[150] = new Scene({
  text: `
     Леонард привязывал лошадей, когда произнес:
     <p>- Что ж, дама и господа, добро пожаловать в унылый и несчастный городишко полный несбыточных надежд и всякой швали на улицах. 
     <p>Я так до конца и не поняла, Почему именно такое мнение сложилось у Куртиса, но на мое счастье разговор между моими спутниками продолжился. 
            `,
  background: "Backgrounds/Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[151].begin()}],
  condition: function () {this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`)}
});

Game.Scenes.SixPart[151] = new Scene({
  text: `
     - Ты все еще продолжаешь делиться своими предубеждениями? - Роберт недовольно фыркнул. - Не забывай. Нам просто нужно взять необходимое и уехать. 
    <p>- Сам же понимаешь, все не так просто, - Леонард пожал плечами. 
    <p>- Нечего надумывать. По крайне мере раньше времени. 
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[152].begin()}],
});

Game.Scenes.SixPart[152] = new Scene({
  text: `
     Я уже немного узнала о нашем путешествии, но, решилась расспросить больше о цели визита в город:
     <p>- А что, собственно, происходит? Что не так с этим городом?
            `,
  background: "Backgrounds/Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[153].begin()}],
});

Game.Scenes.SixPart[153] = new Scene({
  text: `
     - Не здесь, - он указал на здание. - Там располагается местный салун и по совместительству наше временное жилище. Все дальнейшие беседы можно провести там, а заодно и отдохнуть после дороги. 
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[154].begin()}],
});

Game.Scenes.SixPart[154] = new Scene({
  text: `
     С этим никто спорить не стал. Взяв все необходимые вещи с лошадей, мы двинулись на место.
            `,
  background: "Backgrounds/Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[155].begin(); Game.Sounds.play('Music', 'Saloon')}],
});

Game.Scenes.SixPart[155] = new Scene({
  text: `
     Внутри, на удивление, царила тишина и спокойствие. Бармен усиленно натирал стаканы, которые, казалось, уже не спасти, а в углу за круглым столом несколько мужчин перекидывались в карты. 
            `,
  background: "Backgrounds/Saloon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[156].begin()}],
});

Game.Scenes.SixPart[156] = new Scene({
  text: `
     На лестнице, что вела на второй этаж, стояли две женщины довольно вульгарного вида. При виде нашей компании они стали активно перешептываться и мило улыбаться, но не решались пока подходить. 
            `,
  background: "Backgrounds/Saloon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[157].begin()}],
});

Game.Scenes.SixPart[157] = new Scene({
  text: `
     Мы же не стали мешкать и сели за первый попавшийся стол. Несколько моих компаньонов отправились к бармену, чтобы сделать заказ.
            `,
  background: "Backgrounds/Saloon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[159].begin()}],
  condition: function () {
    Game.Stats.DrinkAtParty.get >=1 ? this.setAction(()=> {Game.Scenes.SixPart[158].begin()})
      :
      this.setAction(()=> {Game.Scenes.SixPart[159].begin()})
  }
});

Game.Scenes.SixPart[158] = new Scene({
  text: `
     На принесенном ими подносе стояло несколько стаканов с предполагаемым виски и сопутствующими закусками, а также обычная немного мутноватая вода. 
     <p>Я охотно потянулась к стакану с алкоголем, так как мне было очень любопытно вкусить напиток того времени. 
     <p>“Хоть это не первый опыт, но уверена, что у Роберта был дорогущий алкоголь. Что же пьют в более приземленном заведении?” 
            `,
  background: "Backgrounds/Saloon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[160].begin()}],
});

Game.Scenes.SixPart[159] = new Scene({
  text: `
     На принесенном ими подносе стояло несколько стаканов с предполагаемым виски и сопутствующими закусками, а также обычная немного мутноватая вода.
     <p>Пить алкоголь совсем не хотелось, к тому же - это было лишним. Но в условиях такой жары - жидкость была необходима и я без энтузиазма потянулась к стакану с водой.
            `,
  background: "Backgrounds/Saloon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[160].begin()}],
});

Game.Scenes.SixPart[160] = new Scene({
  text: `
      Леонард поднялся первым и занес стакан вверх, проговаривая:
      <p>- За нашу успешную экспедицию! 
      <p>Все крикнули дружное: “Ура!” и выпили напитки.
            `,
  background: "Backgrounds/Saloon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[161].begin()}],
  condition: function () {this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`)}
});

Game.Scenes.SixPart[161] = new Scene({
  text: `
     После небольшого отдыха и перекуса, я все же решила вернуться к ранее заданному вопросу и аккуратно намекнула об этом своим спутникам. 
            `,
  background: "Backgrounds/Saloon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[162].begin()}],
});

Game.Scenes.SixPart[162] = new Scene({
  text: `
     - Я думаю, Катарина имеет право знать хоть какие-то детали. Вы не против?
     <p>Остальные утвердительно кивнули и Тесла начал свой рассказ:
     <p>- Этот город ничем примечательным не отличается от других похожих городов, которые не желают идти в ногу с прогрессом. 
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[163].begin()}],
});

Game.Scenes.SixPart[163] = new Scene({
  text: `
     - Однако несколько лет назад, когда люди в очередной раз повадились раздобыть золота, начали копать шахту, находящуюся к северу отсюда. Там произошел любопытный инцидент - все шахтеры исчезли. Бесследно.
            `,
  background: "Backgrounds/Mine",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[164].begin()}],
});

Game.Scenes.SixPart[164] = new Scene({
  text: `
     Тесла выпил залпом напиток и продолжил:
      <p>- Спустя некоторое время жители стали жаловаться на аномалии. Странное поведение погоды. Ураганные ветра, град в середине лета…
            `,
  background: "Backgrounds/Mine",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[165].begin()}],
});

Game.Scenes.SixPart[165] = new Scene({
  text: `
     - Поговаривают, что шахтеры обнаружили древнюю пещеру с таинственным артефактом, который способен изменять само время и пространство.
            `,
  background: "Backgrounds/Mine",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[166].begin()}],
});

Game.Scenes.SixPart[166] = new Scene({
  text: `
     - Я позволю себе вставить ремарку, - Роберт перебил Теслу. - Но это всего лишь легенда. И погодные явления могут быть не связаны с какой-то там шахтой и последующими открытиями.
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[167].begin()}],
});

Game.Scenes.SixPart[167] = new Scene({
  text: `
     - Ты неисправим, - Никола задумался. - Но мы не будем сейчас разглагольствовать, что там было правдой, а что вымыслом. Ведь пропали люди. При чем никто не смог обнаружить даже останков. 
      <p>- И казалось бы, почему туда так рвется человек науки? - Куртис ехидно улыбнулся. - Уж не за всемогущим ли артефактом?
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[168].begin()}],
});

Game.Scenes.SixPart[168] = new Scene({
  text: `
      - Хороший вопрос. Наш друг - мечтатель и авантюрист, - Роберт отпил виски и стал присматриваться к окружению.
      <p>Тесла выглядел немного поникшим и одновременно смущенным, но все же не сдавался и продолжил:
      <p>- До сих пор не понимаю, зачем ты, Роберт, отправился в это путешествие, раз ни во что не веришь. 
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[169].begin()}],
});

Game.Scenes.SixPart[169] = new Scene({
  text: `
      - Я не говорю, что совсем не верю. Скорее пытаюсь всему найти логическое объяснение. Да и как я могу оставить вас, дурней, без помощи. К тому же, Катарина очень хотела посмотреть город, - Роберт проницательно посмотрел на меня. - И, разумеется, я уже упоминал, что мне надо встретиться с братом. 
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[170].begin()}],
});

Game.Scenes.SixPart[170] = new Scene({
  text: `
      Мои спутники переглянулись, явно довольствуясь услышанным. Все понимали, каким бы вредным Роберт не казался, его желание всегда быть рядом и помочь - искренне. 
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[171].begin()}],
});

Game.Scenes.SixPart[171] = new Scene({
  text: `
      Я немного отвлеклась от разговора, чтобы поразмышлять.
      <p>"Катарина хотела увидеть город? Был ли в этом какой-то скрытый смысл? Может, это все связано с катастрофой города? Или она преследовала свои цели? И что за брат? Надеюсь, он не окажется одним из моих знакомых."
            `,
  background: "Backgrounds/Saloon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[172].begin()}],
});

Game.Scenes.SixPart[172] = new Scene({
  text: `
      - Кстати, - решил уточнить Куртис. - Напомни, где твой брат будет ждать нас? 
      <p>- Когда мы закончим все свои дела, то обратно в Нью-Йорк вернемся на поезде. А у него как раз в Колорадо-Спрингс была запланирована встреча. По переписке с ним я понял, что мы должны будем пересечься на вокзале.
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[173].begin()}],
});

Game.Scenes.SixPart[173] = new Scene({
  text: `
      Я решила, что пришло время финального вопроса и спросила у Теслы:
      <p>- Так конечная цель - этот загадочный артефакт?
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[174].begin()}],
});

Game.Scenes.SixPart[174] = new Scene({
  text: `
      - И да и нет. Возможно, сама пещера, если мы, конечно, раздобудем более точные координаты и будет нашей конечной целью, - Никола застучал пальцами по столу. -  Как ты знаешь, я одержим идеей того, что человек может контролировать время. И я должен цепляться за любую надежду. Пусть и действительно такую мнимую. 
            `,
  background: "Persons/Nicola",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[175].begin()}],
});

Game.Scenes.SixPart[175] = new Scene({
  text: `
      - Координаты будут, об этом можно не волноваться, - уверенно произнес Роберт. - Местный шериф обязан мне. И если все пройдет по плану, то завтра он вернется в город. 
      <p>- Но разве все это не держится в строжайшем секрете? - засомневался Тесла.
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[176].begin()}],
});

Game.Scenes.SixPart[176] = new Scene({
  text: `
      - Держится. Но долг этого человека велик. Как он сам упоминал: “Никакой жизни не хватит, чтобы расплатиться.” Поэтому я предложил координаты в обмен на то, что он больше мне ничего не будет должен. 
      <p>- Справедливый ты человек, Роберт, - заметил Куртис. 
      <p>Роберт не привык принимать похвалу, поэтому он лишь кивнул и молча отпил из стакана.
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[178].begin()}],
});

Game.Scenes.SixPart[178] = new Scene({
  text: `
      - Мисс Джонсон, - Леонард обратил на меня слегка затуманенный взгляд. - Как вы думаете, все, что здесь происходит, действительно связано с мистикой?
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[179].begin()}],
  condition: function () {this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`)}
});

Game.Scenes.SixPart[179] = new Scene({
  text: `
      "Вопрос любопытный. Не могу отделаться от чувства, что это путешествие крутится вокруг чего-то загадочного. Однако, в то же время, это больше похоже на сказку. Что ответить?"
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [
    'Всему есть логическое объяснение',
    'Не хочется об этом думать',
    'Это может быть правдой',
  ],
  buttonaction: [
    () => { Game.Scenes.SixPart[180].begin(); Game.message('Вы склонны сомневаться в правдивости легенды'); Game.Stats.EagleLegend.add(-1)},
    () => { Game.Scenes.SixPart[183].begin(); Game.message('Вы склонны быть равнодушной к происходящему')},
    () => { Game.Scenes.SixPart[185].begin(); Game.message('Вы склонны верить во что-то мистическое'); Game.Stats.EagleLegend.add(1)},
  ],
  condition: function () {this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`)}
});

Game.Scenes.SixPart[180] = new Scene({
  text: `
      - Склонна полагать, что вера в некую легенду не должна служить весомым доказательством. 
      <p>- Я не сомневался в тебе, дорогая, - Роберт легонько погладил меня по голове, явно испытывая гордость.
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[181].begin()}],
  condition: function () {this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`)}
});

Game.Scenes.SixPart[181] = new Scene({
  text: `
      - Я тоже не склонен верить в подобное, - Тесла скучающее подпер подбородок кулаком. - Но если всю жизнь быть такими скептиками, есть риск потерять шанс на открытие, которое изменит человечество. 
      <p>- Забавно, - ухмыльнулся Роберт. - И это говорит человек, который не знает, когда нужно остановиться. 
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[182].begin()}],
  condition: function () {this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`)}
});

Game.Scenes.SixPart[182] = new Scene({
  text: `
      - Роберт, - Куртис угрожающе взглянул на охотника. - Это уже слишком. 
      <p>- Ничего, - Никола отмахнулся. - Это же правда. Чего стыдиться? Думаю, именно непреклонность делает меня особенным.
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[187].begin()}],
  condition: function () {this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`)}
});

Game.Scenes.SixPart[183] = new Scene({
  text: `
      - В конце концов, нам важно достигнуть своей цели. А что стояло за истоками, лично мне - все равно. 
      <p>- Нейтралитет. Поддерживаю, - Куртис поднял стакан вверх. - Это самая удобная позиция. Особенно в контексте наблюдателя.
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[184].begin()}],
  condition: function () {this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`)}
});

Game.Scenes.SixPart[184] = new Scene({
  text: `
      - Может быть иногда это и правда счастье, - улыбнулся Тесла. - Быть в неведении. 
      <p>- Вполне себе, - размышлял Роберт.
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[187].begin()}],
  condition: function () {this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`)}
});

Game.Scenes.SixPart[185] = new Scene({
  text: `
      - Мы многое не знаем об этом мире, поэтому мне кажется, что отрицать эту историю - было бы не совсем правильно. 
      <p>- Я рад, что среди вас, джентльмены и леди, мне достался наипрекраснейший соратник, - Тесла тепло улыбнулся мне.
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[186].begin()}],
  condition: function () {this.setBackground(`Persons/Curtis_0${Game.Stats.CurtisAppearance.get}`)}
});

Game.Scenes.SixPart[186] = new Scene({
  text: `
      - Два мечтателя, - тяжело вздохнул, но слегка улыбнулся Роберт.
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[187].begin()}],
});

Game.Scenes.SixPart[187] = new Scene({
  text: `
      После увлекательного разговора каждый пребывал в своих мыслях. 
      <p>Однако я обратила внимание, что Роберт все время куда-то косился и озирался по сторонам. Пытаясь проследить направление его взгляда, я увидела нескольких мужчин за барной стойкой, которые на первый взгляд были весьма не примечательны. 
            `,
  background: "Backgrounds/Saloon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[188].begin()}],
});

Game.Scenes.SixPart[188] = new Scene({
  text: `
      Роберт наклонился к нам поближе и прошептал:
      <p>- Отправимся на недолгую прогулку?       
      <p>Куртис осторожно перевел взгляд на незнакомцев, а Тесла немного нервно заметил:
      <p>- Давайте не будем терять времени.
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[199].begin()}],
});

Game.Scenes.SixPart[199] = new Scene({
  text: `
      Но мы не смогли уйти, так как заметив, что мы собираемся, двое довольно крупных мужчин подошли и один из них произнес:
      <p>- Что такие разодетые путешественники забыли в нашем захолустном городишке? А девушка то, слишком хороша для такой дыры...
            `,
  background: "Backgrounds/Saloon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[200].begin()}],
});

Game.Scenes.SixPart[200] = new Scene({
  text: `
      - А вот это, господа, вас явно не касается, - Роберт не сводил взгляд с подошедших. - Мы вам никак не мешали и вы, будьте добры, идите своей дорогой. 
      <p>От одного из собеседников сильно разило алкоголем, другой - выглядел будто бы хитрый лис, замышляющий очередную пакость.
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[201].begin()}],
});

Game.Scenes.SixPart[201] = new Scene({
  text: `
      - Как грубо! Мы всего лишь хотели повеселиться, - будто бы ненароком, но было очевидно, что специально, он показал кобуру с револьвером внутри. - К тому же с вами такая очаровательная дама…
            `,
  background: "Backgrounds/Saloon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[202].begin()}],
});

Game.Scenes.SixPart[202] = new Scene({
  text: `
      - Мы приняли к сведению, - Роберт сжал кулаки при упоминании меня. - Но мы хотели бы продолжить общение в сугубо своей компании. 
      <p>Мужчины недовольно помотали головой, но кажется, что не собирались уходить. 
      <p>- Это просто надо перетерпеть, - шептал Леонард Роберту. - Они жалкие провокаторы. Держи себя в руках. 
            `,
  background: "Persons/Robert_Colorado",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[203].begin()}],
});

Game.Scenes.SixPart[203] = new Scene({
  text: `
      - Так что же? Хотите продолжим разговор на улице? - спросил пьяный мужчина и подмигнул мне. 
      <p>Внутри зарождалась паника, так как у этих бандитов может быть на уме все что угодно.      
      <p>В те времена во многих уголках Америки еще царило беззаконие, а значит у многих были развязаны руки. 
            `,
  background: "Backgrounds/Saloon",
  buttontext: [''],
  buttonaction: [() => { Game.Scenes.SixPart[204].begin(); Game.Achievements.SixPartEnd.unlock(); }],
});

Game.Scenes.SixPart[204] = new Scene({
  text: `
      Напряжение в воздухе росло. Роберт был готов обнажить оружие. Еще секунда и мужчины бросятся друг на друга. Запах пороха, гнева и алкоголя. Все перемешалось, а от страха сжималось сердце. 
      <p>“Неужели драки не избежать?”
            `,
  background: "Backgrounds/Saloon",
  buttontext: [''],
  buttonaction: [
    () => {
    Game.Sounds.play('Music', 'Scarlett');
    Game.Scenes.Features[100].begin();
    Game.Progress.save("SevenPart");
  }
  ],
});Game.Stories.push(
  new Story ({
    name: 'Aurora',
    pict: 'Covers/Aurora',
    chapters: [ new Chapter ({
      name: 'Глава 1',
      pict: 'Backgrounds/Aurora_Lighthouse',
      parts: [ new Part ({
        name: 'Пролог',
        pict: 'Backgrounds/Aurora_Writing',
        code: 'Aurora_Prologue',
        event: function (){

          Game.Design.change('Aurora');

          Stat.hideAll();

          Game.Effects.DisableAll();

          Game.LoadScreen('Aurora_Prologue');

          Game.Scenes.A_Prologue[0].begin();
        }
      }),
        new Part ({
          name: 'Часть 1',
          pict: 'Backgrounds/Aurora_House_Inside',
          code: 'Aurora_Part01',
          event: function (){

            Game.Design.change('Aurora');

            Game.Progress.load('Aurora_Part01');

            Game.Effects.DisableAll();

            Game.LoadScreen('Aurora_Part01');

            Game.Scenes.A_Part01[0].begin();
          }
        }),
        new Part ({
          name: 'Часть 2',
          pict: 'Backgrounds/Aurora_Univer',
          code: 'Aurora_Part02',
          event: function (){

            Game.Design.change('Aurora');

            Game.Progress.load('Aurora_Part02');

            Game.Effects.DisableAll();

            Game.LoadScreen('Aurora_Part02');

            Game.Scenes.A_Part02[0].begin();

          }
        }),
        new Part ({
          name: 'Часть 3',
          pict: 'Backgrounds/Aurora_SW_Streets',
          code: 'Aurora_Part03',
          event: function (){

            Game.Design.change('Aurora');

            Game.Progress.load('Aurora_Part03');

            Game.Effects.DisableAll();

            Game.LoadScreen('Aurora_Part03');

            Game.Scenes.A_Part03[0].begin();

          }
        }),
      ],
    })],
  })
);//Characters

Game.Stats.Aurora = new Person({
    name: 'Аврора',
    picture: 'Persons/Aurora_Aurora',
    title: 'В моей жизни происходит много значимых перемен.',
    text: 'Интересно, какие еще сюрпризы преподнесет судьба?',
    story: 'Aurora',
    isUnlocked: function () {
        return Game.Achievements.A_Part01Completed.unlocked >= 1;
    },
    trophies: new Trophies(
      {
          name : 'Border',
          title : 'Легендарная рамка',
          picture : 'Items/Cup',
          text : 'Награда за максимальный уровень фаворита',
          isUnlocked: function () {
              return Game.Favourites.getLevel('Aurora') >= 5;
          }
    },
      ),
});

Game.Stats.Father = new Person({
    name: 'Папа',
    picture: 'Persons/Aurora_Dad',
    title: 'Мой единственный родной человек.',
    text: 'Ему пришлось нелегко: работа, потеря дорогих людей. Его состояние нестабильно - я должна сделать все, чтобы помочь ему.',
    story: 'Aurora',
});

Game.Stats.Yan = new Person({
    name: 'Ян',
    picture: 'Persons/Aurora_Yan',
    title: 'Самый близкий друг для меня. Мой старший брат.',
    text: 'Его загадочное исчезновение до сих пор отзывается болью у меня в сердце. Но я не собираюсь терять надежду.',
    story: 'Aurora',
});

Game.Stats.Arthur = new Person({
    name: 'Артур',
    picture: 'Persons/Aurora_Arthur',
    title: 'Внук бывшего смотрителя маяка. Добрый и понимающий парень.',
    text: 'Именно он был рядом в самые трудные моменты моей жизни. Я не понимаю, какие чувства испытываю к нему, но время все расставит на свои места.',
    story: 'Aurora',
});

Game.Stats.Kaleb = new Person({
    name: 'Калеб',
    picture: 'Persons/Aurora_Kaleb',
    title: 'Наглый и самовлюбленный студент, с которым я столкнулась в библиотеке.',
    text: 'Его происхождение окутано тайной, что мне предстоит выяснить. Кем же он окажется по итогу: надежным соратником в моем путешествии или злейшим врагом?',
    story: 'Aurora',
});

Game.Stats.Dalia = new Person({
    name: 'Далия',
    picture: 'Persons/Aurora_Dalia',
    title: 'Заводная девушка, которая с первой нашей встречи внесла хаос в мою жизнь.',
    text: 'Открытая и располагающая к себе особа, которая, кажется, берет от жизни все. В свое время, именно она побудила меня начать вести дневник.',
    story: 'Aurora',
});

//Conditions

Game.Stats.Drawing = new Choice({
    name: 'заниматься рисованием',
    story: 'Aurora',
});

Game.Stats.Writing = new Choice({
    name: 'заниматься писательством',
    story: 'Aurora',
});

Game.Stats.Music = new Choice({
    name: 'быть меломаном',
    story: 'Aurora',
});

Game.Stats.Pragmatic = new Choice({
    name: 'быть прагматичной',
    story: 'Aurora',
});

Game.Stats.Romantic = new Choice({
    name: 'быть романтичной',
    story: 'Aurora',
});

Game.Stats.Song = new Choice({
    name: 'выбрала песню',
    story: 'Aurora',
});

Game.Stats.BetrayKaleb = new Choice({
    name: 'предала Калеба',
    story: 'Aurora',
});

//Items

Game.Stats.Trial_Pass = new Item({
    name: 'Пропуск',
    picture: 'Items/Aurora_Trial_Pass',
    title: 'Временный пропуск Авроры',
    text: 'Его вручил мне Артур, чтобы я могла пройти в университет в любое время',
    story: 'Aurora',
});

Game.Stats.Mothers_Photo = new Item({
    name: 'Фото',
    picture: 'Items/Aurora_Mother',
    title: 'Фотография женщины с подписью',
    text: 'Возможно, эта фотография принадлежит Калебу. Снизу виднеется надпись на французском: “Моя семья”',
    story: 'Aurora',
});Game.Achievements.A_PrologueCompleted = new Achievement ({
  picture: 'Backgrounds/Aurora_Writing',
  title: 'Дневник',
  text: 'Аврора начинает свой рассказ',
  story: 'Aurora',
});

Game.Achievements.A_Artist = new Achievement ({
  picture: 'Backgrounds/Aurora_Album',
  title: 'Художник',
  text: 'Выберете в качестве основного хобби рисование',
  story: 'Aurora',
});

Game.Achievements.A_Writer = new Achievement ({
  picture: 'Backgrounds/Aurora_Writing',
  title: 'Писатель',
  text: 'Выберете в качестве основного хобби писательство',
  story: 'Aurora',
});

Game.Achievements.A_Musician = new Achievement ({
  picture: 'Backgrounds/Aurora_WM',
  title: 'Музыкант',
  text: 'Выберете в качестве основного хобби музыку',
  story: 'Aurora',
});

Game.Achievements.A_Part01Completed = new Achievement ({
  picture: 'Backgrounds/Aurora_Lighthouse_Night',
  title: 'Новая жизнь',
  text: 'Отправьтесь с Авророй в неизвестное будущее',
  story: 'Aurora',
});

Game.Achievements.A_Musicality = new Achievement ({
  picture: 'Backgrounds/Aurora_Disc',
  title: 'Меломан',
  text: 'Выберите музыку по вкусу',
  story: 'Aurora',
});

Game.Achievements.A_Part02Completed = new Achievement ({
  picture: 'Backgrounds/Aurora_Univer',
  title: 'Студенческие будни',
  text: 'Завершите вторую часть интересной встречей',
  story: 'Aurora',
});

Game.Achievements.A_Fan = new Achievement ({
  picture: 'Backgrounds/Aurora_Solist_Picture',
  title: 'Фанатка',
  text: 'Познакомьтесь с любимчиком Далии',
  story: 'Aurora',
});

Game.Achievements.A_Fav_Writer = new Achievement ({
  picture: 'Backgrounds/Aurora_Writing',
  title: 'Любимый писатель',
  text: 'Узнайте интерес Калеба',
  story: 'Aurora',
});

Game.Achievements.A_PayBack = new Achievement ({
  picture: 'Persons/Aurora_Kaleb',
  title: 'Должник',
  text: 'Помогите Калебу избежать встречи с Далией',
  story: 'Aurora',
});

Game.Achievements.A_Part03Completed = new Achievement ({
  picture: 'Backgrounds/Aurora_Room',
  title: 'Знакомство',
  text: 'Завершите третью часть, отдыхая после насыщенного дня',
  story: 'Aurora',
});Game.Scenes.A_Prologue = [];

Game.Scenes.A_Prologue[0] =
  new Scene({
    text: `Моя дорогая Далия. Как у тебя дела? Ты все еще вспоминаешь меня? 
           А наши беззаботные деньки, наполненные смехом и в одночасье тяжелым грузом бремени, что резко обрушилось на нас?
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Prologue[1].begin(); Game.message('В левом верхнем углу под иконкой рюкзака нажмите на стрелочку, чтобы посмотреть текст предыдущего слайда'); }],
    background: 'Backgrounds/Aurora_Writing',
    condition: () => { Game.Sounds.play('Music', 'Aurora') }
  });

Game.Scenes.A_Prologue[1] =
  new Scene({
      text: `
            Знаешь, я все еще бережно храню подаренный тобой сборник стихов Эдгара Аллана По. 
            Перечивая строки его произведений, каждый раз во мне откликаются те ощущения, что мы когда-то пережили.
            <p>Я все больше начинаю понимать тебя: твои мысли, твою печаль и страхи. 

        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Prologue[2].begin(); Game.message('Эдгар По - “Сон во сне”'); }],
      background: 'Backgrounds/Aurora_Writing',
  });

Game.Scenes.A_Prologue[2] =
  new Scene({
      text: `
            <i><p>Я стою на берегу,
            <i><p>Бурю взором стерегу.
            <i><p>И держу в руках своих
            <i><p>Горсть песчинок золотых.
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Prologue[3].begin();  }],
      background: 'Backgrounds/Aurora_Writing',
  });

Game.Scenes.A_Prologue[3] =
  new Scene({
      text: `
            <i>Как их бег мне задержать,
            <i><p>Как сильнее руки сжать?
            <i><p>Сохранится ль хоть одна,
            <i><p>Или все возьмёт волна?
            <i><p>Или то, что зримо мне,
            <i><p>Всё есть только сон во сне?
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Prologue[4].begin(); }],
      background: 'Backgrounds/Aurora_Writing',
  });

Game.Scenes.A_Prologue[4] =
  new Scene({
      text: `
            Мои мысли идут сплошным потоком. Я стольким хочу поделиться с тобой. Но торопиться некуда. 
            <p></p>Сейчас, сидя на любимой скамейке, обдуваемая морскими ветрами, я переношу свою жизнь на бумагу. Свое прошлое, настоящее, те моменты, что мы прожили бок о бок. 
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Prologue[5].begin(); }],
      background: 'Backgrounds/Aurora_Writing',
  });

Game.Scenes.A_Prologue[5] =
  new Scene({
      text: `
            Цель очень проста - помнить. Помнить каждую деталь, каждую эмоцию и те выборы, которые привели нас к этому исходу. Я никогда не прощу себя, если хоть что-то упущу. 
            <p>Милая Далия, я безмерно счастлива писать в этом дневнике. Местами может быть сумбурно, но я остаюсь верна себе. Как ты меня когда-то учила - быть собой и не стараться выстраивать образ человека, которым я не являюсь. 
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Prologue[6].begin(); Game.Achievements.A_PrologueCompleted.unlock(); }],
      background: 'Backgrounds/Aurora_Writing',
  });

Game.Scenes.A_Prologue[6] =
  new Scene({
      text: `
            Ну, хватит лирики. Я думаю, ты запомнила меня как всегда улыбающейся девочкой, которая хотела покорить высокие горы. Ведь именно такой я стала благодаря тебе. Пусть так оно и будет. 
            <p>Начну издалека. Бушующая подростковая жизнь, затем завораживающая юность. 
            <p><s>И будущее?</s>
            <p><i>Твоя Аврора начинает свой рассказ.
            `,
      buttontext: [''],
      buttonaction: [() => {
        setTimeout(() => { Game.Scenes.A_Part01[0].begin(); }, 1000);
        Game.LoadScreen('Aurora_Part01');
        Game.Progress.save("Aurora_Part01");

      }],
      background: 'Backgrounds/Aurora_Writing',
  });Game.Scenes.A_Part01 = [];

Game.Scenes.A_Part01[0] =
  new Scene({
    text: `
    Я родилась в полной и любящей семье на окраине небольшого шведского городка. 
    Нас было четверо: заботливые родители, я и старший брат, всегда спешивший на помощь. 
    Для меня это было счастливым временем, которое не ускользало даже под гнетом тяжелых испытаний судьбы.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[1].begin(); Game.Stats.Aurora.add(0); Game.message('В верхнем левом углу находится инвентарь, там вы можете посмотреть полезную информацию') }],
    background: 'Backgrounds/Aurora_House_Inside',
    condition: () => { Game.Sounds.play('Music', 'Lighthouse') }
  });

Game.Scenes.A_Part01[1] =
  new Scene({
      text: `
      Своего детства я практически не помню. 
      Но мой подростковый период проходил далеко не в сказочных реалиях. 
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part01[100].begin(); }],
      background: 'Backgrounds/Aurora_House_Inside',
  });

Game.Scenes.A_Part01[100] =
  new Scene({
    text: `
      Чтобы прокормить семью, отец пробовался на разные работы: был поваром, строителем и даже грузчиком. Но в маленьких городках жизнь будто бы заколдована на обреченность. 
      <p>Стабильность медленно ускользала, а на смену приходили голод и прочие недуги. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[2].begin(); }],
    background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part01[2] =
  new Scene({
      text: `
      Однако все изменилось, когда папин хороший знакомый предложил ему работу. 
      Она была несложная. Необходимо было помогать пожилому человеку, работающему смотрителем маяка. В дополнение к этому, за нее обещали хорошо платить.
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part01[3].begin(); }],
      background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part01[3] =
  new Scene({
      text: `
      Мало кто хотел связывать свою жизнь со служением морю, если так можно выразиться. Быть вдали от всех цивилизованных благ, где единственными друзьями будут тишина и природа. 
      <p>Но отцу было все равно. Наше благополучие стояло на первом месте. 
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part01[4].begin(); }],
      background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part01[4] =
  new Scene({
      text: `
      В начале он работал в качестве помощника. Милый дедушка оказался не только хорошим учителем, но и прекрасным собеседником. Он обучил папу всем тонкостям работы и пророчил ему свое место. 
      <p>Мы могли не видеть отца месяцами. Тоска по родному теплу росла с каждым днем. Но мы не сдавались.
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part01[5].begin(); }],
      background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part01[5] =
  new Scene({
      text: `
     Мама была для меня примером стойкости и воли к жизни. Даже несмотря на свое слабое здоровье, она старалась быть сильной. Подрабатывала и успевала ухаривать за домом.
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part01[6].begin(); }],
      background: 'Backgrounds/Aurora_House_Inside',
  });

Game.Scenes.A_Part01[6] =
  new Scene({
      text: `
     Старший брат, по имени Ян, всегда вдохновлял меня и не давал падать духом. В свои шестнадцать лет он не знал проблем с учебой, успевал работать в небольшой продуктовой лавке на полставки и оставаться крепким мужским плечом для меня и мамы. 
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part01[7].begin(); }],
      background: 'Persons/Aurora_Yan',
  });

Game.Scenes.A_Part01[7] =
  new Scene({
      text: `
      Ян был моим самым близким другом. Я всегда делилась с ним сокровенными тайнами или безумными идеями. А он, в свою очередь, поддерживал и наставлял, как подобает старшему брату.  
      <p>Мы могли часами разговаривать и понимать друг друга практически без слов, а его любящие объятия укрывали меня от грустных мыслей.
          `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part01[8].begin(); }],
      background: 'Persons/Aurora_Yan',
  });

Game.Scenes.A_Part01[8] =
  new Scene({
      text: `
     Он часто говорил мне: 
     <p>- Вот увидишь, Аврора. Я построю нам мост в светлое будущее. 
     <p>Но все изменилось, когда в один из дней он не пришел домой. 
          `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part01[9].begin(); Game.Stats.Yan.add(0); }],
      background: 'Persons/Aurora_Yan',
  });

Game.Scenes.A_Part01[9] =
  new Scene({
      text: `
     Это было не в его духе. Ян всегда сообщал нам о своих передвижениях или внезапных задержках. 
     Но именно в тот проклятый весенний день, когда брату было семнадцать лет - он будто бы испарился из нашего города. 
          `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part01[101].begin(); }],
      background: 'Backgrounds/Aurora_Missing',
  });

Game.Scenes.A_Part01[101] =
  new Scene({
    text: `
      Отец был на работе, поэтому я и мама самостоятельно организовали поиски с помощью неравнодушных соседей. 
      Мы обращались в полицию, развешивали плакаты с его изображением. Все жители нашего маленького городка были подключены к поискам Яна, но его след так и не смогли найти… 
          `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[10].begin(); }],
    background: 'Backgrounds/Aurora_Missing',
  });

Game.Scenes.A_Part01[10] =
  new Scene({
      text: `
     Полиция выдвинула банальные теории. Якобы брат просто сбежал из дома, захотел новой жизни и отправился покорять столицу. 
     И как бы мы не отрицали версию полиции, как бы не старались найти его, поиск не сдвигался с мертвой точки. 
      <p>Никто не собирался сдаваться. Но чем больше времени проходило, тем быстрее угасала наша надежда. 
          `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part01[11].begin(); }],
      background: 'Backgrounds/Aurora_Missing',
  });

Game.Scenes.A_Part01[11] =
  new Scene({
    text: `
     В условиях нестабильности мы прожили долгие годы. Нашу жизнь омрачила тоска по Яну и, казалось, ничто не могло этого изменить. 
    <p>Однако когда мне исполнилось восемнадцать лет, будто бы по волшебству последовали первые положительные перемены. 
          `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[12].begin(); }],
    background: 'Backgrounds/Aurora_House_Inside',
  });

Game.Scenes.A_Part01[12] =
  new Scene({
    text: `
     В один дождливый день на пороге объявился отец. Полностью промокший он вошел в дом. То ли слезы текли по его щекам, то ли капли дождя. Скорее всего все вперемешку. 
    <p>Спустя несколько долгих секунд он произнес всего одну фразу:
    <p>- Смотритель умер. 
          `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[13].begin(); }],
    background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part01[13] =
  new Scene({
    text: `
     Дальнейшее решение перевернуло наш мир. Единственное, что мог сделать папа, чтобы мы жили в благополучии - это занять место смотрителя. Но это также означало, что мы совсем потеряем связь с друг другом. 
          `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[14].begin(); }],
    background: 'Backgrounds/Aurora_House_Inside',
  });

Game.Scenes.A_Part01[14] =
  new Scene({
    text: `
      <p>Я хорошо помню тот день. Мама кинулась в объятия отца, плача ему в плечо. Она произнесла лишь одно:
      <p>- Поехали. 
      <p>У меня не было причин отказываться. В школе я не завела друзей, единственный по-настоящему близкий человек пропал, дальнейших планов на жизнь у меня не было.
      <p>Но любящая семья, бережно относящаяся ко мне - вот, за что хотелось цепляться. 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[15].begin(); }],
    background: 'Backgrounds/Aurora_House_Inside',
  });

Game.Scenes.A_Part01[15] =
  new Scene({
    text: `
      Я отправилась в ванную, чтобы умыться и привести себя в порядок. 
      Расчесала свои светлые, немного непослушные локоны. 
      Умылась и накрасила губы моим любимым розовым бальзамом - мамин подарок. 
      Она всегда говорила, что мне очень идет этот цвет, да и выглядела я не такой бледной, как обычно. 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[16].begin(); }],
    background: 'Persons/Aurora_Aurora',
  });

Game.Scenes.A_Part01[16] =
  new Scene({
    text: `
      В отражении зеркала мне показалась немного растерянного вида девушка, которая не представляла свою дальнейшую жизнь. 
      Но которая четко осознавала - сейчас происходит абсолютно непредсказуемый поворот в ее судьбе. 
      И возможно именно благодаря этим переменам - все наладится. 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[17].begin(); }],
    background: 'Persons/Aurora_Aurora',
  });

Game.Scenes.A_Part01[17] =
  new Scene({
    text: `
      Выйдя из ванны, я начала медленно обходить наш домик, с которым связано столько воспоминаний. 
      Слегка касаясь вещей, я начала представлять картинки из моей жизни. 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[106].begin();}],
    background: 'Persons/Aurora_Aurora',
  });

Game.Scenes.A_Part01[106] =
  new Scene({
    text: `
      С одной стороны, испытывая чувство безмерной радости от переезда в новый дом и воссоединения семьи, 
      а с другой стороны - чувство тоски, ведь это все такое привычное и родное.
      <p>Мы быстро собрали те немногие вещи, которые у нас были и отправились в свой новый дом. 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[102].begin();}],
    background: 'Persons/Aurora_Aurora',
  });



Game.Scenes.A_Part01[102] =
  new Scene({
    text: `
       Небольшой домик, находившийся рядом с маяком, стал нашей отдушиной. Наконец-то беззаботная семейная идиллия накрыла нас волной любви и счастья. 
      <p>Да, мы были совершенно оторваны от других. Но наше уютное гнездышко и было всем этим гигантским миром. 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[103].begin(); Game.message('Сейчас вы сделаете свой первый выбор. Некоторые из них меняют сюжет незначительно, другие же ведут к серьезным переменам. Но помните, только Вам решать, какой вы видите свою главную героиню'); }],
    background: 'Backgrounds/Aurora_Lighthouse',
  });

Game.Scenes.A_Part01[103] =
  new Scene({
    text: `
      Волны, ветер, свобода, семья. Я обрела гармонию и спокойствие на сердце. 
      <p>И не забывала о своем хобби. 
      `,
    buttontext: ['Любила рисование','Любила писательство','Любила музыку'],
    buttonaction: [
      () => { Game.Scenes.A_Part01[18].begin(); Game.Achievements.A_Artist.unlock(); Game.Stats.Drawing.add(1); },
      () => { Game.Scenes.A_Part01[21].begin(); Game.Achievements.A_Writer.unlock(); Game.Stats.Writing.add(1);},
      () => { Game.Scenes.A_Part01[24].begin(); Game.Achievements.A_Musician.unlock(); Game.Stats.Music.add(1); }
    ],
    background: 'Backgrounds/Aurora_Lighthouse',
  });

Game.Scenes.A_Part01[18] =
  new Scene({
    text: `
      Я не училась в художественной школе и не имела ни малейшего представления о тонкостях подобного искусства. 
      Однако еще с детства мама с папой видели, какую радость мне доставляет передавать простые формы на бумагу. 
      <p>И хоть мы были небогатой семьей, но на альбом и несколько карандашей родители смогли найти деньги. 

      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[19].begin(); }],
    background: 'Backgrounds/Aurora_Album',
  });

Game.Scenes.A_Part01[19] =
  new Scene({
    text: `
      Рисование также помогало отвлекаться от тяжелых моментов в жизни. Легкое чирканье карандашом, блеклые наброски - мой мир, который я раскрашу в нужные цвета. 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[107].begin(); }],
    background: 'Backgrounds/Aurora_Album',
  });

Game.Scenes.A_Part01[107] =
  new Scene({
    text: `
    Жизнь на маяке стала для меня новым открытием и все заиграло более яркими красками. 
    <p>Я часто садилась на лавочку, которая стояла рядом с маяком. Вид рассказывал о море и его тайнах. 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[20].begin(); }],
    background: 'Backgrounds/Aurora_Album',
  });

Game.Scenes.A_Part01[20] =
  new Scene({
    text: `
      Каждый раз море открывалось для меня с новой стороны. 
      Легкое покачивание волн, ровный горизонт, мирно летящие птицы. Или же бушующие потоки, сильный ветер, что сносил все на своем пути. 
      <p>Эти мгновения навсегда запечатлены в моем альбоме.  
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[28].begin(); }],
    background: 'Backgrounds/Aurora_Album',
  });

Game.Scenes.A_Part01[21] =
  new Scene({
    text: `
      Одним из немногих предметов в школе, которым я по-настоящему увлекалась, была литература. 
      Для меня всегда оставалось загадкой, как же люди могут так искусно передавать свои мысли и идеи, влиять на разум читателя, внушать ту или иную мораль.
      <p>Как-то после уроков я набралась смелости и купила блокнот, который стал постепенно заполняться разного рода набросками для будущих историй. 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[22].begin(); }],
    background: 'Backgrounds/Aurora_Writing',
  });

Game.Scenes.A_Part01[22] =
  new Scene({
    text: `
      Как и в жизни, я не могла придумать конечную цель или хотя бы продумать структуру произведения. Но это не мешало мне изливать свою душу в такой форме. 
      <p>Маяк стал для меня оплотом вдохновения. Я часто залезала на самый верх здания, где располагалась смотровая площадка. Садилась на стул и просто писала. 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[23].begin(); }],
    background: 'Backgrounds/Aurora_Writing',
  });

Game.Scenes.A_Part01[23] =
  new Scene({
    text: `
      Дракон, что мог обрушить свое зло на маленький никому не нужный городок или обычная бытовая жизнь смотрителя маяка. 
      <p>Это было неважно. 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[28].begin(); }],
    background: 'Backgrounds/Aurora_Writing',
  });

Game.Scenes.A_Part01[24] =
  new Scene({
    text: `
      В школе я часто проводила время наедине с собой. Меня не привлекало общение с другими людьми, к тому же, они не были особенно расположены ко мне. 
      <p>Но в один из дней мой одноклассник, с которым мы делили парту, пришел неожиданно в хорошем настроении. Я тактично поинтересовалась о причине этого. 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[25].begin(); }],
    background: 'Backgrounds/Aurora_WM',
  });

Game.Scenes.A_Part01[25] =
  new Scene({
    text: `
      - Наконец-то состоялся дебют “Kings & Queens”. Это просто бомба. Все только о них и говорят, а их гитарист и по совместительству вокалист - настоящий прорыв. 
      Он вроде даже наш ровесник… Не верится. Почему я просиживаю за этой чертовой партой, когда в шестнадцать лет можно такие бабки рубить… 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[26].begin(); }],
    background: 'Backgrounds/Aurora_WM',
  });

Game.Scenes.A_Part01[26] =
  new Scene({
    text: `
      - А можно послушать? 
    <p>- Конечно! Я и забыл, что у тебя нет денег, - он протянул мне плеер и наушники. 
    <p>Я не обратила внимание на эту колкость. Люди почему-то норовят показать свое превосходство, но я к этому привыкла и отнеслась спокойно. 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[27].begin(); Game.Sounds.play('Music','KingQueens'); }],
    background: 'Backgrounds/Aurora_WM',
  });

Game.Scenes.A_Part01[27] =
  new Scene({
    text: `
      Надев наушники, меня тут же захватил звук гитары. 
      Музыка, которую я слышала была чем-то новым для меня. Прекрасный проигрыш и не менее завораживающий голос вокалиста вызвали смешение различных эмоций. 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[110].begin(); }],
    background: 'Backgrounds/Aurora_WM',
  });


Game.Scenes.A_Part01[110] =
  new Scene({
    text: `
      Впоследствии, я поделилась своим открытием с родителями.  И несмотря на финансовое положение, на шестнадцатилетие мне подарили музыкальный плеер. 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[120].begin(); }],
    background: 'Backgrounds/Aurora_WM',
  });

Game.Scenes.A_Part01[120] =
  new Scene({
    text: `
      Я не переставая слушала разного рода музыку. Создавала плейлисты под свое настроение. Но “Kings & Queens” занимали в этом списке особенное место. 
      <p>И даже сейчас, стоя перед бушующим морем, я все еще слушаю их песни. Надеясь, что когда-нибудь у меня хватит смелости взять в руки гитару и сочинить свое произведение.
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[28].begin(); Game.Sounds.play('Music','Lighthouse') }],
    background: 'Backgrounds/Aurora_WM',
  });

Game.Scenes.A_Part01[28] =
  new Scene({
    text: `
      Прошло несколько месяцев после нашего переезда. Мы действительно полюбили это место. 
      <p>Папа оставался прикован к маяку. Я и мама периодически ездили в город за покупками. Каждый вечер мы наслаждались обществом друг друга, будто бы наверстывая упущенное время. 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[60].begin(); }],
    background: 'Backgrounds/Aurora_Lighthouse',
  });

Game.Scenes.A_Part01[60] =
  new Scene({
    text: `
      Разговоры, игры. Совершенно неважно -  что. Ведь главное -  с кем. 
      <p>Все мы ощущали перемены, происходившие с нами. К примеру, родители говорили мне, что я стала более: 
      `,
    buttontext: ['Романтичной','Прагматичной'],
    buttonaction: [
      () => { Game.Scenes.A_Part01[29].begin(); Game.Stats.Romantic.add(1); },
      () => { Game.Scenes.A_Part01[31].begin(); Game.Stats.Pragmatic.add(1); }
    ],
    background: 'Backgrounds/Aurora_Lighthouse',
  });

Game.Scenes.A_Part01[29] =
  new Scene({
    text: `
      - Аврора, - говорила мама, попивая горячий чай в один из вечеров. - Ты изменилась. Я все больше замечаю, какой ранимой и чуткой девушкой ты становишься. 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[108].begin(); }],
    background: 'Backgrounds/Aurora_Near_Lighthouse',
  });

Game.Scenes.A_Part01[108] =
  new Scene({
    text: `
      - Видимо, так на меня повлияло это место, - я пожала плечами и улыбнулась. 
      <p>- Несомненно, - произнес отец, который что-то колдовал на кухне. - Ты все больше мечтаешь и мечтаешь. Твоим фантазиям мог бы позавидовать любой творец! 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[30].begin(); }],
    background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part01[30] =
  new Scene({
    text: `
      - Ну что ты, папа… Это всего лишь ребячество… 
      <p>- Не говори так. Нужно больше верить в себя и свои силы. 
      Уверен, тебя ждут великие открытия, - отец развернулся к нам с тарелками свежих фруктов. - А теперь, девочки мои, налетайте! 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[33].begin(); }],
    background: 'Backgrounds/Aurora_Near_Lighthouse',
  });

Game.Scenes.A_Part01[31] =
  new Scene({
    text: `
      - Аврора, - говорила мама, попивая горячий чай в один из вечеров. - Ты изменилась. Я все больше замечаю, как ты выросла и какой серьезной ты становишься. 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[109].begin(); }],
    background: 'Backgrounds/Aurora_Near_Lighthouse',
  });

Game.Scenes.A_Part01[109] =
  new Scene({
    text: `
      - Видимо, так на меня повлияло это место, - я пожала плечами и улыбнулась. 
      <p>- Несомненно, - произнес отец, который что-то колдовал на кухне. - Несмотря на твои мечтания, я вижу, как ты стала мыслить более рационально и взвешенно подходить ко многим вопросам. 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[32].begin(); }],
    background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part01[32] =
  new Scene({
    text: `
      - Ну что ты, папа… Это мало о чем говорит…
      <p>- Нужно больше верить в себя и свои силы. Уверен, тебя ждут великие открытия и твой подход тебе обязательно поможет, - отец развернулся к нам с тарелками свежих фруктов. - А теперь, девочки мои, налетайте! 
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[33].begin(); }],
    background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part01[33] =
  new Scene({
    text: `
      Через месяц после переезда, к нашему дому подъехала неизвестная машина. 
      Не то, чтобы это было чем-то удивительным. 
      Маяк часто проверяли на исправность разного рода службы. 
      Но сейчас машина не выглядела как полуразбитый грузовик, а из ее салона вышел хорошо одетый молодой парень. 
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[34].begin(); }],
    background: 'Backgrounds/Aurora_Lighthouse',
  });

Game.Scenes.A_Part01[34] =
  new Scene({
    text: `
      Отец, который находился на смотровой площадке маяка, тут же окликнул его: 
      <p>- Артур, я сейчас спущусь! 
      <p>Мама была в доме, поэтому я смело вышла встречать незнакомца. Мы обменялись стандартными приветствиями. Я не смогла не отметить его спокойную наружность, привлекательные черты лица и радушную улыбку.
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[35].begin(); }],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part01[35] =
  new Scene({
    text: `
      - Твой отец часто рассказывал о тебе, очень приятно наконец-то познакомиться лично, - проговорил Артур, облокачиваясь на капот своей машины. - Так ты живешь здесь вместе со своей семьей? 
      <p>- Да! Здесь очень красивое и уединенное место, помогает расслабиться. 
      <p>- Согласен с тобой, -  задумчиво глядя в сторону произнес парень.
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[36].begin(); }],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part01[36] =
  new Scene({
    text: `
      Вскоре вернулся отец. Он обменялся с Артуром рукопожатием и спросил:
      <p>- Ты за вещами дедушки приехал? Я сохранил все как было. Пойдем в дом. 
      <p>- Благодарю. Родители так и не смогли найти время, вечно мотаются по своим командировкам. А я только сейчас смог выбраться сюда. 
      <p>- Понимаю. У тебя ведь учеба. 
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[37].begin(); }],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part01[37] =
  new Scene({
    text: `
      Мы зашли внутрь дома. Мама организовала всем по чашке чая и выставила на стол печенье. Отец вынес несколько запечатанных коробок. 
      <p>- Это все его вещи. Я упаковал одежду и его книги с записками. Все, что смог найти. 
      <p>- Спасибо, - Артур грустным взглядом окинул коробки. - До сих пор не могу поверить, что его не стало. И что меня не было рядом с ним. 
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[38].begin(); }],
    background: 'Backgrounds/Aurora_Near_Lighthouse',
  });

Game.Scenes.A_Part01[38] =
  new Scene({
    text: `
      - Жизнь - это цикл с чередой различных взлетов и падений. Он сейчас в лучшем мире. Нам важно сохранить память об этом человеке. Это меньшее, что мы можем сделать. 
      <p>- Вы правы. 
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[39].begin(); }],
    background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part01[39] =
  new Scene({
    text: `
      Разговор продолжился в более позитивном ключе. Я узнала, что Артур являлся внуком бывшего смотрителя. 
      Он часто проводил время с дедушкой и был духовно связан с этим местом. Поэтому отец не раз подчеркивал, что парень желанный гость маяка. 
      <p>В течение нескольких месяцев Артур по возможности приезжал к нам в гости. Он проводил много времени с отцом, разговаривая о дедушке, о простых жизненных вещах. 
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[40].begin(); }],
    background: 'Backgrounds/Aurora_Lighthouse',
  });

Game.Scenes.A_Part01[40] =
  new Scene({
    text: `
      И со мной. Мы могли часами гулять и вести диалог на любые темы. Его компания была мне очень близка. Можно даже сказать, что мы стали друзьями. 
      <p>Я чувствовала себя очень комфортно в его обществе. Его доброта и ласковое обращение вызывали в душе ранее неизвестные мне чувства. 
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[41].begin(); Game.Stats.Arthur.add(0); }],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part01[41] =
  new Scene({
    text: `
      Иногда почитывая романтические книги про всяких принцев, я невольно проводила аналогии с нашими взаимоотношениями. Была ли это любовь или я видела в нем фигуру брата?
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[115].begin(); }],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part01[115] =
  new Scene({
    text: `
      На все эти противоречия у меня не было ответа. Я просто наслаждалась нашим времяпрепровождением и плыла по течению. 
      <p>Это были прекрасные месяцы светлых эмоций. Но все не могло быть так гладко. 
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[42].begin(); }],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part01[42] =
  new Scene({
    text: `
      Спустя чуть больше полугода нашей жизни на маяке, мама сильно заболела. Никакие лекарства и напутствия врачей не смогли помочь ей выбраться из этого состояния. 
      <p>Она умерла в больнице. Не мучаясь, не жалуясь, что так мало прожила.
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[43].begin(); }],
    background: 'Backgrounds/Aurora_Near_Lighthouse',
  });

Game.Scenes.A_Part01[43] =
  new Scene({
    text: `
      Мне всегда вспоминались ее слова: 
      <p>- Аврора, ты наша звездочка. Подобно помогающему свету на маяке, ты наш путеводитель в жизни. 
      <p>Как жаль, что моего “света” не стало в тот день. 
      <p>Смогу ли я продолжать быть тем самым путеводным огнем для других?
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[44].begin(); }],
    background: 'Backgrounds/Aurora_Near_Lighthouse',
    condition: function (){
      if(Game.Stats.Romantic.get==1){
        this.buttonaction[0] = () => { Game.Scenes.A_Part01[44].begin(); }
      }
      if(Game.Stats.Pragmatic.get==1){
        this.buttonaction[0] = () => { Game.Scenes.A_Part01[46].begin(); }
      }
    }
  });

Game.Scenes.A_Part01[44] =
  new Scene({
    text: `
      На похоронах слезы душили меня, словно удавки. Я задыхалась. Терялась. От меня оторвали кусок чего-то настолько дорогого, что это никак не выразить словами. 
      <p>Что я должна испытывать? Мне больно, мне паршиво. Остановите это поскорее. Как вернуть время назад? 
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[45].begin(); }],
    background: '',
  });

Game.Scenes.A_Part01[45] =
  new Scene({
    text: `
      Отец обнимал меня, смотря куда-то опустошенным взглядом. Он не плакал. Не кричал во все горло от терзающей боли. 
      <p>Нет. 
      <p>Возможно, он старался быть сильным ради меня, а может он просто не осознавал происходящее.  
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[48].begin(); }],
    background: '',
  });

Game.Scenes.A_Part01[46] =
  new Scene({
    text: `
      На похоронах я стояла рядом с отцом с отчужденным лицом. Происходящее настолько не поддавалось чему-то логичному или закономерному, что я терялась в собственных эмоциях. 
      <p>Что я должна испытывать? Мне больно, мне паршиво. Остановите это поскорее. Как вернуть время назад? 
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[47].begin(); }],
    background: '',
  });

Game.Scenes.A_Part01[47] =
  new Scene({
    text: `
      Отец обнимал меня, смотря куда-то опустошенным взглядом. Он не плакал. Не кричал во все горло от терзающей боли. 
      <p>Нет. 
      <p>Возможно, он старался быть сильным ради меня, а может он просто не осознавал происходящее.  
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[48].begin(); }],
    background: '',
  });

Game.Scenes.A_Part01[48] =
  new Scene({
    text: `
      Артур, узнав о происходящем, незамедлительно приехал. Он не отходил от меня ни на шаг. 
      Его поддержка в тот момент была как глоток свежего воздуха. Я плакала на его плече, а он утешал меня, поглаживая по волосам. 
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[49].begin(); }],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part01[49] =
  new Scene({
    text: `
      Меня разрывало от несправедливости. Ян. Мама. Почему близкие люди покидают этот мир? Мы ведь так мало провели времени вместе.  
      <p>Если бы не Артур, <s>я бы утопилась в бушующем море. </s>
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[111].begin(); }],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part01[111] =
  new Scene({
    text: `
      Они часто разговаривали о чем-то с отцом наедине. Я не вмешивалась, понимая, что всем иногда нужно выговориться на определенные темы. 
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[50].begin(); }],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part01[50] =
  new Scene({
    text: `
      За несколько месяцев наша жизнь сильно поменялась. Отец невольно отстранился, полностью ушел в работу. 
      В его глазах пропал тот блеск жизни, та мотивация, которая помогала ему раньше. Он стал пить, но не переставал забывать о своей единственной дочери. 
      <p>В один из вечеров он позвал меня на смотровую площадку. Тогда уже минул почти год с нашего переезда. 
      <p>Тихая мирная ночь. Звезды. Шум морских волн. 
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[51].begin(); }],
    background: 'Backgrounds/Aurora_Lighthouse_Night',
  });

Game.Scenes.A_Part01[51] =
  new Scene({
    text: `
      Мы сели рядом, сдвинув два стула. Немного посидев в молчании, папа проговорил: 
      <p>- Тебе нужно уехать. Начать жить. 
      <p>Эти слова обрушились на меня подобно огромному снежному кому. 
      <p>- Но как же…? 
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[52].begin(); }],
    background: 'Backgrounds/Aurora_Lighthouse_Night',
  });

Game.Scenes.A_Part01[52] =
  new Scene({
    text: `
      - Аврора, ты же не думала, что всю жизнь проведешь на этом разваливающемся маяке. Я не могу позволить, чтобы ты прожигала здесь свою жизнь вместе со мной.
      <p>- Я…
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[104].begin(); }],
    background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part01[104] =
  new Scene({
    text: `
      - Мы с Артуром много говорили об этом. Он готов помочь с переездом. Сбережения у нас есть. Этого будет достаточно для начала жизни в большом городе и поступления в университет. 
      <p>Он все решил. И давно. И мне нечего было возразить. Это было логичным исходом, но чувствам не прикажешь. 
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[53].begin(); }],
    background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part01[53] =
  new Scene({
    text: `
      - Папа, - глаза наполнились слезами. - Я не могу тебя бросить. 
      <p>- Мы не прекратим общение. СМС или письма. Наша связь не прервется на этом.
      <p>- Это слишком резко и я не знаю, что мне сказать…
      `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[105].begin(); }],
    background: 'Backgrounds/Aurora_Lighthouse_Night',
  });

Game.Scenes.A_Part01[105] =
  new Scene({
    text: `
        - Вспомни свои мечты, Аврора, - папа сделал глоток хмельного напитка. - Свои стремления. Ты всегда была понимающим ребенком, который переживал все трудности и не жаловался. Но пришла пора начать жить для себя. Мама была такого же мнения. И я уверен, Ян, сказал бы то же самое.
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[54].begin(); }],
    background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part01[54] =
  new Scene({
    text: `
      - Но я даже не представляю, куда и как мне двигаться дальше. Я не смогу одна. Без тебя. Без мамы. Без Яна… Я не справлюсь.
      <p>- Ты будешь не одна. С этим поможет Артур. Вы же неплохо ладите. Он станет твоей опорой, пока ты не встанешь на ноги. Тем более, что изначально это было его идеей.
      <p>На мгновение меня обрадовали слова отца о причастности Артура, но после, осознание ситуации накрыло меня. 
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[55].begin(); }],
    background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part01[55] =
  new Scene({
    text: `
      Я согнулась, обхватив колени. Тяжело было признавать правоту отца. Мне хотелось уехать. Это было правдой. Горькой правдой. Но я слишком сильно пеклась о единственном родном человеке. Ведь одиночество не щадит никого. 
      <p>- Но ты…
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[56].begin(); }],
    background: 'Backgrounds/Aurora_Lighthouse_Night',
  });

Game.Scenes.A_Part01[56] =
  new Scene({
    text: `
      - Хватит, Аврора. Я справлюсь. Моя работа давно превратилась в неотъемлемую часть жизни. И я привык. А тебе пора думать о себе. Пожалуйста, - он коснулся моей руки, слегка поглаживая. 
      <p>Я обняла его. Крепко-крепко. Это был один из последних наших душевных вечеров перед моим отъездом. 
`,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part01[57].begin(); Game.Stats.Father.add(0); Game.Achievements.A_Part01Completed.unlock(); }],
    background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part01[57] =
  new Scene({
    text: `
      Все происходило стремительно, словно папа решил все сделать так, чтобы не было больнее отпускать меня. 
      <p>Через неделю приехал Артур. Я стояла с собранным рюкзаком, взволнованно теребя волосы, и абсолютно не понимая, куда приведет моя новая дорога жизни. 
`,
    buttontext: [''],
    buttonaction: [() => {
      setTimeout(() => { Game.Scenes.A_Part02[0].begin(); }, 1000);
      Game.LoadScreen('Aurora_Part02');
      Game.Progress.save("Aurora_Part02");
    }],
    background: 'Backgrounds/Aurora_Lighthouse_Night',
  });
Game.Scenes.A_Part02 = [];

Game.Scenes.A_Part02[0] =
  new Scene({
    text: `
    Раннее солнце освещало тихую водную гладь, оставляя несколько играющих бликов на ее поверхности. В тот момент мне почему-то казалось, что я в последний раз вижу эту умиротворяющую картину. 
    <p>Во мне смешались чувства. А как могло быть иначе, ведь меня будто вырывают из моего кокона и оставляют одну на потеху неизвестности.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[1].begin(); }],
    background: 'Backgrounds/Aurora_Lighthouse',
    condition: function (){ Game.Sounds.play('Music', 'Lighthouse') }
  });

Game.Scenes.A_Part02[1] =
  new Scene({
      text: `
    Это были не самые приятные ощущения. Но я не могла от них избавиться. 
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part02[2].begin();}],
      background: 'Backgrounds/Aurora_Lighthouse',
  });

Game.Scenes.A_Part02[2] =
  new Scene({
      text: `
    Однако я должна перебороть себя. Сейчас, сжимая лямку рюкзака, мне оставалось только решиться - отпустить давно державшее меня место и начать жить для себя. 
    <p>Таково было мое сокровенное желание.
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part02[3].begin();}],
      background: 'Backgrounds/Aurora_Lighthouse',
  });

Game.Scenes.A_Part02[3] =
  new Scene({
      text: `
    Я глубоко вздохнула и нашла взглядом папу. Он стоял рядом с Артуром и в очередной раз благодарил его за подаренную возможность. 
    <p>Наконец, и я решила подойти. Я успела попрощаться с домом, теперь предстояло самое трудное.
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part02[4].begin();}],
      background: 'Backgrounds/Aurora_Lighthouse',
  });

Game.Scenes.A_Part02[4] =
  new Scene({
      text: `
    - Папа, могли бы мы…? 
    <p>- Да, дочка, - отец серьезно взглянул на Артура. - Береги ее. 
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part02[5].begin();}],
      background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part02[5] =
  new Scene({
      text: `
    - Я сделаю все необходимое, даю слово, - они пожали друг другу руки. - Аврора, я заведу машину. Не думай о времени. 
    <p>Я кивнула и мы отошли с отцом к одному из наших любимых мест.
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part02[6].begin();}],
      background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[6] =
  new Scene({
      text: `
    Скамейка открывала вид на море. Морской бриз освежал, тихонько обдувая каждую частичку тела. 
    <p>Мы сели. Молча. Иногда тишина может сказать больше, чем даже самое ласковое слово. 
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part02[7].begin();}],
      background: 'Backgrounds/Aurora_Bench',
  });

Game.Scenes.A_Part02[6] =
  new Scene({
    text: `
    Держась за руки, мы слушали волны, завывание ветра и крики чаек. В этот момент я четко осознала для себя - никаких прощаний навсегда. Наша связь не может так просто разрушиться.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[7].begin();}],
    background: 'Backgrounds/Aurora_Bench',
  });

Game.Scenes.A_Part02[7] =
  new Scene({
    text: `
    - Аврора, - папа положил поверх моей руки свою. - Извини, если все происходит так резко. Я просто не мог по-другому. Ощущение, что если ты пробудешь здесь еще один день, то я никогда не смогу отпустить тебя. Чертов эгоист… чертов алкоголик…
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[8].begin();}],
    background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part02[8] =
  new Scene({
    text: `
    - Папа, - я обняла его, прижимаясь к плечу. - Мне все это тоже дается нелегко, но решение принято. Я хочу попробовать пожить. По-другому. Но знай, у меня и в мыслях не было бросать тебя… Мы с Артуром будем приезжать.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[9].begin();}],
    background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part02[9] =
  new Scene({
    text: `
    - Держись этого парня, милая. С ним ты не будешь знать печали или грусти. Он хороший человек и достоин быть рядом с тобой. 
    <p>- Папа! - я раскраснелась, так как сказанные слова были больше похожи на его благословение, а не простое напутствие. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[10].begin();}],
    background: 'Backgrounds/Aurora_Bench',
  });

Game.Scenes.A_Part02[10] =
  new Scene({
    text: `
    - Тебе нужна опора, чтобы встать на ноги, - отец с грустью стал вглядываться в очертания морского горизонта. - Я не смог ей стать. Не смог сберечь дорогих мне людей. Но тебя я сберегу. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[11].begin();}],
    background: 'Backgrounds/Aurora_Bench',
  });

Game.Scenes.A_Part02[11] =
  new Scene({
    text: `
    Сердце закололо. Почему именно сейчас он так разоткровенничался? Мы мало разговаривали о постигших нас трагедиях, однако чувствовалась эта нужда. 
    Выговориться. Не одинокому морю, которое не ответит, а близкому, что подставит плечо в трудный момент. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[12].begin();}],
    background: 'Backgrounds/Aurora_Bench',
  });

Game.Scenes.A_Part02[12] =
  new Scene({
    text: `
    Я очень долго думала над тем, что сказать, но нужные слова не приходили в голову. 
    Мне оставалось сделать лишь последнее действие перед своим отъездом. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[13].begin();}],
    background: 'Backgrounds/Aurora_Bench',
    condition: function (){
      if (Game.Stats.Drawing.get >=1){
        this.buttonaction[0] = () =>{ Game.Scenes.A_Part02[13].begin();}
      }

      if (Game.Stats.Writing.get >=1){
        this.buttonaction[0] = () =>{ Game.Scenes.A_Part02[29].begin();}
      }

      if (Game.Stats.Music.get >=1){
        this.buttonaction[0] = () =>{ Game.Scenes.A_Part02[36].begin(); }
      }
    }
  });

Game.Scenes.A_Part02[13] =
  new Scene({
    text: `
    Из своего рюкзака я достала немного потрепанный листок со своим рисунком. На нем были изображены мы с ним. Наш маяк и бескрайнее море.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[14].begin();}],
    background: 'Backgrounds/Aurora_Lighthouse_Painting',
  });

Game.Scenes.A_Part02[14] =
  new Scene({
    text: `
    В один из вечеров мне пришла идея оставить отцу что-нибудь на память. Что-то простое, но в то же время по-своему ценное. 
    Мне нравилось передавать свои эмоции через краски, поэтому я просто нарисовала этот скромный пейзаж.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[15].begin();}],
    background: 'Backgrounds/Aurora_Lighthouse_Painting',
  });

Game.Scenes.A_Part02[15] =
  new Scene({
    text: `
    - Папа, - я протянула ему свой подарок. - Ты часто проводишь время наедине с собой и своими мыслями. 
    Так пусть этот рисунок будет хранить в твоем сердце воспоминание о нас, обо мне.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[16].begin();}],
    background: 'Backgrounds/Aurora_Lighthouse_Painting',
  });

Game.Scenes.A_Part02[16] =
  new Scene({
    text: `
    Папа бережно взял листок и принялся рассматривать его. На его глазах застыли слезы. Он проговорил: 
    <p>- Знаешь, я отчетливо помню, как мы собирались переезжать на этот маяк. Тогда я сильно переживал, потому что боялся получить отказ с вашей стороны. 
    Но когда твоя мама услышала эти новости, ее лицо озарила такая счастливая улыбка… Я не видел ее такой с момента пропажи Яна.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[17].begin(); }],
    background: 'Backgrounds/Aurora_Lighthouse_Painting',
  });

Game.Scenes.A_Part02[17] =
  new Scene({
    text: `
    Папа сильно сжал кулаки, словно пытаясь заменить одну боль на другую. Как бы ему не было сейчас тяжело, он договорил то, что хотел:
    <p>- Вы ведь не сомневались ни на секунду. 
    <p>- Разумеется, - я аккуратно попыталась разжать его руки. - Нам хотелось жить вместе и не чувствовать больше разлуку с тобой. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[18].begin();}],
    background: 'Backgrounds/Aurora_Lighthouse_Painting',
  });

Game.Scenes.A_Part02[18] =
  new Scene({
    text: `
    - Я понимаю. Но, Аврора, скажи мне честно. Спустя год жизни здесь, ты не считаешь этот переезд ошибкой? 
    <p>Мне никогда не нравились подобные вопросы. То, что произошло, оно уже свершилось. Возможно это происки судьбы или итог наших выборов. Но прошлого не вернуть. 
    <p>Невольно я все равно начала задумываться над вопросом.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[19].begin();}],
    background: 'Backgrounds/Aurora_Lighthouse_Painting',
  });

Game.Scenes.A_Part02[19] =
  new Scene({
    text: `
    Переезд. Если бы мы не переехали, мамино здоровье бы не ухудшилось? Но были бы мы также счастливы вдали друг от друга? Стоили ли эти мгновения того, во что сейчас превратилась наша жизнь?
    <p>- Аврора? 
    <p>Я: 
        `,
    buttontext: ['Не жалею о переезде','Думаю, это неправильный выбор'],
    buttonaction: [
      () => { Game.Scenes.A_Part02[20].begin();},
      () => { Game.Scenes.A_Part02[25].begin();}
    ],
    background: 'Backgrounds/Aurora_Lighthouse',
  });

Game.Scenes.A_Part02[20] =
  new Scene({
    text: `
    - Как бы не было тяжело, все это по итогу привело нас к тому, что мы имеем. Я никогда не скажу, что это был неправильный выбор. Я счастлива. Это может отличаться от привычного счастья, но таков мой ответ.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[21].begin();}],
    background: '',
  });

Game.Scenes.A_Part02[21] =
  new Scene({
    text: `
    - Как бы не было тяжело, все это по итогу привело нас к тому, что мы имеем. Я никогда не скажу, что это был неправильный выбор. Я счастлива. Это может отличаться от привычного счастья, но таков мой ответ.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[22].begin();}],
    background: '',
  });

Game.Scenes.A_Part02[22] =
  new Scene({
    text: `
    Отец кивнул, сжимая подаренный мною подарок. На миг мне показалось, что я вижу облегчение на его лице. Словно, если бы он услышал нечто другое, его и без того нестабильное состояние - ухудшилось.
        `,
    buttontext: [''],
    buttonaction: [() => {
      Game.Scenes.A_Part02[23].begin();
      Game.message('Отец благодарен за ваше благосклонное отношение. Его состояние улучшается');
      Game.Stats.Father.add(1);
    }],
    background: '',
  });

Game.Scenes.A_Part02[23] =
  new Scene({
    text: `
    - Спасибо, милая. Спасибо за честный ответ, - папа расслабился и откинул голову назад, продолжая мысль. - Мы часто делаем неправильные выборы, но ты права. То счастье, пусть даже мимолетное, что мы обрели здесь - оно стоит всего пережитого.
        `,
    buttontext: [''],
    buttonaction: [() => {
      Game.Scenes.A_Part02[24].begin();
      Game.message('Вы принимаете жизнь такой, какая она есть. Благодаря вашему выбору дух Авроры крепчает')
      Game.Stats.Aurora.add(1);}],
    background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part02[24] =
  new Scene({
    text: `
    - Аврора, - папа смотрел мне прямо в глаза. - Ты так выросла. Ты уже не тот зажатый ребенок. Нет. Я вижу перед собой уверенную девушку, которая так по-взрослому смотрит на мир и принимает с достоинством все невзгоды. Я горжусь тобой. 
    <p>- Спасибо, папа. Все это только благодаря тому, что ты остаешься моим проводником и поддерживаешь.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[42].begin();}],
    background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part02[25] =
  new Scene({
    text: `
    - Я люблю наш новый дом всей душой. И несмотря на ту радость, что я испытала, мне всегда казалось -  весь этот переезд был ошибкой. И не потому что нам здесь не нравилось, а потому что…
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[26].begin();}],
    background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part02[26] =
  new Scene({
    text: `
    - Она была бы жива, - папа договорил за меня и продолжил. - Жива. Да. Как обычно, ждала меня с работы, вечно бы суетилась. Редко недовольная, но живая.
    <p>- Папа, я…
        `,
    buttontext: [''],
    buttonaction: [() => {
      Game.Scenes.A_Part02[27].begin();
      Game.message('Отец продолжает винить себя в смерти матери. Его состояние ухудшается');
      Game.Stats.Father.add(-1);
    }],
    background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part02[27] =
  new Scene({
    text: `
    - Не стоит, милая. Спасибо за честность. Я все понимаю. Я ведь сам такого же мнения. И не знаю, смогу ли перестать зацикливаться на прошлом. На своих ошибках. 
        `,
    buttontext: [''],
    buttonaction: [() => {
      Game.Scenes.A_Part02[28].begin();
      Game.message('Вы не можете смириться с реальностью, с которой сталкиваетесь. Вследствие вашего выбора Аврора начинает больше сомневаться в себе')
      Game.Stats.Aurora.add(-1);
    }],
    background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part02[28] =
  new Scene({
    text: `
    В тот момент я поделилась своими самыми потаенными мыслями. Я была уверена, что смирилась с утратой, но в глубине души я мечтала повернуть время вспять и не переезжать на маяк.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[42].begin();}],
    background: 'Persons/Aurora_Dad',
  });

Game.Scenes.A_Part02[29] =
  new Scene({
    text: `
    Из своего рюкзака я достала немного потрепанный листок со своим написанным стихом, которым я хотела поделиться с папой.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[30].begin();}],
    background: 'Backgrounds/Aurora_Note',
  });

Game.Scenes.A_Part02[29] =
  new Scene({
    text: `
    В один из вечеров мне пришла идея оставить отцу что-нибудь на память. 
    Что-то простое, но в то же время по-своему ценное. Мне нравилось передавать свои эмоции через небольшие произведения, поэтому руки сами потянулись писать. Небольшое нескладное стихотворение, однако моего собственного сочинения.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[30].begin();}],
    background: 'Backgrounds/Aurora_Note',
  });

Game.Scenes.A_Part02[30] =
  new Scene({
    text: `
   То, во что я вкладывала душу и хотела, чтобы это хоть немного помогло отцу не терять надежду.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[31].begin();}],
    background: 'Backgrounds/Aurora_Note',
  });

Game.Scenes.A_Part02[31] =
  new Scene({
    text: `
   - Папа, - я протянула ему свой подарок. - Ты часто проводишь время наедине с собой и своими мыслями. Возможно однажды, читая эти строки, они навеют тебе о свете, и что ты не одинок.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[32].begin();}],
    background: 'Backgrounds/Aurora_Note',
  });

Game.Scenes.A_Part02[32] =
  new Scene({
    text: `
    Папа бережно взял листок и принялся рассматривать его. На его глазах застыли слезы. Он проговорил: 
    <p>- Знаешь, я отчетливо помню, как мы собирались переезжать на этот маяк. Тогда я сильно переживал, потому что боялся получить отказ с вашей стороны. 
    Но когда твоя мама услышала эти новости, ее лицо озарила такая счастливая улыбка… Я не видел ее такой с момента пропажи Яна.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[33].begin();}],
    background: 'Backgrounds/Aurora_Note',
  });

Game.Scenes.A_Part02[33] =
  new Scene({
    text: `
    Папа сильно сжал кулаки, словно пытаясь заменит одну боль на другую. Как бы ему не было сейчас тяжело, он договорил то, что хотел:
    <p>- Вы ведь не сомневались ни на секунду. 
    <p>- Разумеется, - я аккуратно попыталась разжать его руки. - Нам хотелось жить вместе и не чувствовать больше разлуку с тобой. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[35].begin();}],
    background: 'Backgrounds/Aurora_Note',
  });

Game.Scenes.A_Part02[35] =
  new Scene({
    text: `
    - Я понимаю. Но, Аврора, скажи мне честно. Спустя год жизни здесь, ты не считаешь этот переезд ошибкой? 
    <p>Мне никогда не нравились подобные вопросы. То, что произошло, оно уже свершилось. Возможно это происки судьбы или итог наших выборов. Но прошлого не вернуть. 
    <p>Невольно я все равно начала задумываться над вопросом.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[19].begin();}],
    background: 'Backgrounds/Aurora_Note',
  });

Game.Scenes.A_Part02[36] =
  new Scene({
    text: `
    Из своего рюкзака я достала музыкальный диск, которым я хотела поделиться с папой.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[37].begin();}],
    background: 'Backgrounds/Aurora_Disc',
  });

Game.Scenes.A_Part02[37] =
  new Scene({
    text: `
    В один из вечеров мне пришла идея оставить отцу что-нибудь на память. Что-то простое, но в то же время по-своему ценное. 
    И так как я любила  музыку, мне пришла идея собрать коллекцию своих любимых мелодий на диск, чтобы папе было не так грустно проводить время на службе в маяке.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[38].begin();}],
    background: 'Backgrounds/Aurora_Disc',
  });

Game.Scenes.A_Part02[38] =
  new Scene({
    text: `
    - Папа, - я протянула ему свой подарок. - Ты часто проводишь время наедине с собой и своими мыслями. 
    Возможно, слушая мой плейлист, ты вспомнишь, что не одинок. А я всегда рядом с тобой, даже когда так далеко.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[39].begin();}],
    background: 'Backgrounds/Aurora_Disc',
  });

Game.Scenes.A_Part02[39] =
  new Scene({
    text: `
    Папа бережно взял диск и принялся рассматривать его. На его глазах застыли слезы. Он проговорил: 
    <p>- Знаешь, я отчетливо помню, как мы собирались переезжать на этот маяк. Тогда я сильно переживал, потому что боялся получить отказ с вашей стороны. 
    Но когда твоя мама услышала эти новости, ее лицо озарила такая счастливая улыбка… Я не видел ее такой с момента пропажи Яна.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[40].begin();}],
    background: 'Backgrounds/Aurora_Disc',
  });

Game.Scenes.A_Part02[40] =
  new Scene({
    text: `
    Папа сильно сжал кулаки, словно пытаясь заменить одну боль на другую. Как бы ему не было сейчас тяжело, он договорил то, что хотел:
    <p>- Вы ведь не сомневались ни на секунду. 
    <p>- Разумеется, - я аккуратно попыталась разжать его руки. - Нам хотелось жить вместе и не чувствовать больше разлуку с тобой. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[41].begin();}],
    background: 'Backgrounds/Aurora_Disc',
  });

Game.Scenes.A_Part02[41] =
  new Scene({
    text: `
    - Я понимаю. Но, Аврора, скажи мне честно. Спустя год жизни здесь, ты не считаешь этот переезд ошибкой? 
    <p>Мне никогда не нравились подобные вопросы. То, что произошло, оно уже свершилось. Возможно это происки судьбы или итог наших выборов. Но прошлого не вернуть. 
    <p>Невольно я все равно начала задумываться над вопросом.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[19].begin();}],
    background: 'Backgrounds/Aurora_Disc',
  });

Game.Scenes.A_Part02[42] =
  new Scene({
    text: `
    - Дорогая, давай забудем все эти грустные мысли, - папа попытался разрядить обстановку своей добродушной улыбкой. - Спасибо тебе за подарок. Я буду беречь его и ждать твоего скорого приезда.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[43].begin();}],
    background: 'Backgrounds/Aurora_Bench',
  });

Game.Scenes.A_Part02[43] =
  new Scene({
    text: `
    С одной стороны, я была рада, что папа перевел тему на что-то более нейтральное. Все же мы прощались и я не могла быть рядом. 
    <p>Но с другой стороны, я стала больше переживать за него. Сейчас он выглядел подавленно. И, видимо, только работа и мои визиты могли бы скрасить его одиночество.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[44].begin();}],
    background: 'Backgrounds/Aurora_Bench',
  });

Game.Scenes.A_Part02[44] =
  new Scene({
    text: `
    - Не забывай писать мне, - сказала я немного обеспокоенным тоном. - Телефон. Или если не будет вдруг связи - письма. Что угодно. 
    <p>- Конечно. Все будет хорошо, дорогая. А теперь тебе пора. Некрасиво заставлять Артура так долго ждать.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[45].begin();}],
    background: 'Backgrounds/Aurora_Bench',
  });

Game.Scenes.A_Part02[45] =
  new Scene({
    text: `
    Мы еще раз обнялись. Крепко. Долго. 
    <p>Затем, я взяла те немногие вещи, что у меня были и села в машину Артура.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[47].begin();}],
    background: 'Backgrounds/Aurora_Bench',
  });

Game.Scenes.A_Part02[47] =
  new Scene({
    text: `
    - Все в порядке? – спросил парень, пристегиваясь. 
    <p>- Да, - я смахнула непослушные слезы. - Я думаю пора выезжать.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[48].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[48] =
  new Scene({
    text: `
    Он кивнул. Не стал допытываться, ведь он понимал причину моих эмоций. 
    <p>Машина неспешно двинулась с места, оставляя позади маяк и отца, машущего на прощание рукой.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[49].begin(); Game.Sounds.play('Music','Aurora_Daily_01')}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[49] =
  new Scene({
    text: `
    У меня было время, чтобы успокоиться, рассматривая проносящиеся за окном пейзажи. В данный момент окружающая красота природы не привлекала меня.
    <p> Дорога пролегала через город, где некогда я провела почти всю сознательную жизнь. И отчего-то мне не было грустно или плохо. Я ничего не ощущала.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[50].begin();}],
    background: 'Backgrounds/Aurora_From_Car',
  });

Game.Scenes.A_Part02[50] =
  new Scene({
    text: `
    Вот мы проезжаем улицу, где мы с Яном частенько прогуливались, а вот магазин, где брат подрабатывал в свободное от учебы время. 
    <p>Проехав еще несколько кварталов, я увидела школу, которую ранее посещала. И как-то машинально озвучила свои мысли Артуру:
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[51].begin();}],
    background: 'Backgrounds/Aurora_From_Car',
  });

Game.Scenes.A_Part02[51] =
  new Scene({
    text: `
    - Школа, где мы учились с Яном. Кажется, что я не была здесь целую вечность… 
    <p>Остановившись на светофоре, парень внимательно осмотрел учебное заведение и проговорил:
    <p>- Не скучаешь по тем временам?
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[52].begin();}],
    background: 'Backgrounds/Aurora_From_Car',
  });

Game.Scenes.A_Part02[52] =
  new Scene({
    text: `
    - Воспоминаний много: хороших и плохих - это дало старт моей жизни, за что я буду всегда благодарна этому месту. Но что точно могу сказать - я не скучаю. 
    <p>- Понимаю. Уверен в новом городе, ты сможешь построить только счастливые воспоминания.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[53].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[53] =
  new Scene({
    text: `
    Оптимизм парня всегда придавал мне большую уверенность и помогал избавиться от грустных мыслей. 
    <p>Артур был навеселе и полностью сосредоточился на дороге. Иногда он легонько постукивал в ритм играющей на фоне мелодии.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[54].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[54] =
  new Scene({
    text: `
    Спустя где-то час поездки, я успела немного подремать и окончательно прийти в норму. Увидев, что я проснулась, Артур спросил: 
    <p>- Все хорошо? Если необходимо, давай остановимся и отдохнем. Я бы не против выпить чего-нибудь горяченького.
    <p>- Ничего, - я улыбнулась от проявления такой заботы. - Главное, чтобы ты не устал.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[60].begin();}],
    background: 'Persons/Aurora_Arthur',
    condition: function() {
        Game.Stats.Song.set(1);
      if(Game.Stats.Music.get>=1){
        this.buttonaction[0] = () => {Game.Scenes.A_Part02[55].begin();}
      }
    }
  });

Game.Scenes.A_Part02[55] =
  new Scene({
    text: `
    - Артур, ты не против, если я пощелкаю радио? 
    <p>- Не нравится мелодия? - с задором произнес парень. 
    <p>- Нравится, конечно. Просто интересно, что там еще есть. 
        `,
    buttontext: [''],
    buttonaction: [() => {
      Game.Scenes.A_Part02[56].begin();
      Game.message('Так как ваша Аврора любит музыку, вам доступен дополнительный выбор музыки на повседневную жизнь девушки в городе');
    }],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[56] =
  new Scene({
    text: `
    - Аврора, не спрашивай о таких мелочах. Просто выбери то, что тебе хочется послушать. 
        `,
    buttontext: ['Послушать Трек 1', 'Послушать Трек 2', 'Выбрать прослушиваемую'],
    buttonaction: [
      () => { Game.Sounds.play('Music','Aurora_Daily_01'); Game.Stats.Song.set(1);},
      () => { Game.Sounds.play('Music','Aurora_Daily_02'); Game.Stats.Song.set(2);},
      () => { Game.Scenes.A_Part02[59].begin(); },
    ],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[59] =
  new Scene({
    text: `
    Послушав несколько песен, мне все же пришлась по душе именно эта мелодия.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[60].begin(); Game.Achievements.A_Musicality.unlock();}],
    background: 'Backgrounds/Aurora_Arthurs_Car',
  });

Game.Scenes.A_Part02[60] =
  new Scene({
    text: `
    Несмотря на то, что мы с Артуром были довольно близки: я ему доверяла и чувствовала с его стороны похожие ощущения, мне в голову пришел один очевидный вопрос.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[61].begin();}],
    background: 'Backgrounds/Aurora_Arthurs_Car',
  });

Game.Scenes.A_Part02[61] =
  new Scene({
    text: `
    С чего вдруг он проявил такую любезность, помогая мне? Он такой по натуре или есть какие-то скрытые мотивы?
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[61].begin();}],
    background: 'Backgrounds/Aurora_Arthurs_Car',
    condition: function () {
      if(Game.Stats.Romantic.get>=1){
        this.buttonaction[0] = () => { Game.Scenes.A_Part02[62].begin();}
      }

      if(Game.Stats.Pragmatic.get>=1){
        this.buttonaction[0] = () => { Game.Scenes.A_Part02[64].begin();}
      }

    }
  });

Game.Scenes.A_Part02[62] =
  new Scene({
    text: `
    Конечно, я боялась. Меня пугала неизвестность и излишняя доброта. Мой старший брат Ян всегда учил меня, что нельзя так просто полагаться на людей. Нужно лучше узнавать их.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[63].begin();}],
    background: 'Backgrounds/Aurora_Arthurs_Car',
  });

Game.Scenes.A_Part02[63] =
  new Scene({
    text: `
    Но почему-то, к Артуру я не испытывала опаски. Мне хотелось полностью доверять ему, невзирая на мои предубеждения. Это было наивно. Но я так чувствовала. 
    <p>Однако для своего же спокойствия, я решила спросить:
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[66].begin();}],
    background: 'Backgrounds/Aurora_Arthurs_Car',
  });

Game.Scenes.A_Part02[64] =
  new Scene({
    text: `
    Ничего не делается просто так в этом мире. Мой старший брат Ян всегда учил меня, что нельзя так просто полагаться на людей. Нужно лучше узнавать их. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[65].begin();}],
    background: 'Backgrounds/Aurora_Arthurs_Car',
  });

Game.Scenes.A_Part02[65] =
  new Scene({
    text: `
    И сейчас, когда я на пути к своей новой жизни, мне хочется знать истинную причину такого отношения и быть более уверенной в человеке, с которым я отправилась в это путешествие. 
    <p>Для своего же спокойствия, я решила спросить:
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[66].begin();}],
    background: 'Backgrounds/Aurora_Arthurs_Car',
  });

Game.Scenes.A_Part02[66] =
  new Scene({
    text: `
    - Артур, скажи, почему ты согласился на всю эту авантюру? 
    <p>- Аврора, - не отвлекаясь от дороги, проговорил парень. - Я понимаю, твои опасения. Но не переживай у меня нет скрытых мотивов, я делаю это просто, чтобы помочь тебе встать на ноги.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[67].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[67] =
  new Scene({
    text: `
     - Но почему? - я  не собиралась сдаваться.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[68].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[68] =
  new Scene({
    text: `
     - Просто потому что я вижу, какой ты хороший человек. Я вижу, как твой отец хотел для тебя другой жизни. Как ты хотела для себя чего-то нового. Помнишь наш разговор, когда мы пошли прогуляться по лесу?
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[69].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[69] =
  new Scene({
    text: `
     Мы с Артуром много гуляли. Когда он приезжал, то часто рассказывал мне о своей жизни в городе, о своих увлечениях и учебе. Мне было только в радость, что парень открывается для меня с разных сторон. 
    <p>Я:
        `,
    buttontext: ['Помню этот разговор 🔐', 'Не могла вспомнить'],
    buttonaction: [
      () => { Game.Scenes.A_Part02[70].begin(); Game.Sounds.play('Music','Romantic'); AndroidApp ('showAd');},
      () => { Game.Scenes.A_Part02[93].begin();}
    ],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[70] =
  new Scene({
    text: `
     Мы с Артуром частенько гуляли по территории вокруг маяка. В один из солнечных дней мы решили пройтись по лесу, который был в пятнадцати минутах езды от нашего дома. У Артура была машина, но в этот день нам захотелось пройтись пешком.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[71].begin();}],
    background: 'Backgrounds/Aurora_Forest',
  });

Game.Scenes.A_Part02[71] =
  new Scene({
    text: `
     Тогда прошло около месяца с того времени, как мамы не стало. Легкий ветерок покачивал деревья, а лесная обстановка позволяла абстрагироваться от всех проблем. 
     <p>Это было похоже на сказку, где вот-вот из-за деревьев выйдет добрый волшебник, взмахнет своим посохом и весь мир преобразится.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[72].begin();}],
    background: 'Backgrounds/Aurora_Forest',
  });

Game.Scenes.A_Part02[72] =
  new Scene({
    text: `
     Артур шел рядом со мной. Мы разговаривали на всякие отвлеченные темы. 
     <p>- Повезло же нам с погодой, - отметил парень, любуясь красотами природы.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[73].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[73] =
  new Scene({
    text: `
     - Ты прав, - его слова навели меня на одну идею. - А помнишь ту поляну, которую мы нашли в прошлый раз? Может быть снова пойдем туда и немного отдохнем?
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[74].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[74] =
  new Scene({
    text: `
     - Хорошая идея! Если я правильно помню, то это где-то в той стороне, - Артур показал куда-то на восток. - Заодно перекусим.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[75].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[75] =
  new Scene({
    text: `
     Мы прошли еще немного вглубь леса. Артур галантно помогал мне преодолевать препятствия, поддерживая за руку, отодвигая назойливые ветки деревьев. 
     <p>Остаток пути прошел в спокойствии. Наконец, мы достигли места назначения.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[76].begin();}],
    background: 'Backgrounds/Aurora_Forest',
  });

Game.Scenes.A_Part02[76] =
  new Scene({
    text: `
     Фиолетовые цветы располагались на просторной поляне. Солнце почти село. Его лучи пытались пробраться сквозь стволы деревьев, одаривая нас своим теплом. 
     <p>Я прилегла на траву и раскинула руки по сторонам. Так хорошо, так умиротворенно. Именно то, что хотелось чувствовать каждый день.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[77].begin();}],
    background: 'Backgrounds/Aurora_Forest_Flowers',
  });

Game.Scenes.A_Part02[77] =
  new Scene({
    text: `
    Артур аккуратно сел рядом. Почему-то он улыбался. Так искренне. Так живо. 
    <p>- Артур, случилось что-то хорошее?
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[78].begin();}],
    background: 'Backgrounds/Aurora_Forest_Flowers',
  });

Game.Scenes.A_Part02[78] =
  new Scene({
    text: `
    - Конечно! Мы сейчас с тобой вдвоем. Далеко от всей суеты. Наедине с природой. И… - он достал из рюкзака по сэндвичу. - Как же обойтись без вкусняшек. 
    <p>Он видел, что я не улыбалась так, как это было раньше. На секунду парень о чем-то задумался, а затем спросил: 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[79].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[79] =
  new Scene({
    text: `
    - Аврора, как ты? 
    <p>- Все хорошо, - я понимала, почему он задает такой вопрос и не врала. Сейчас я правда себя так ощущала. Но внешне это было трудно заметить.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[80].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[80] =
  new Scene({
    text: `
    - Я рад… Скажи, ты бы хотела уехать в город и начать жить иначе?
    <p>Вопрос застал меня врасплох. Я привстала, чтобы смотреть в глаза Артуру и сказала правду:
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[81].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[81] =
  new Scene({
    text: `
    - Хотела бы. Но я не могу бросить отца. Мне трудно представить, как ему сейчас тяжело. 
    <p>Улыбка Артура стала от чего-то еще шире. 
    <p>- Мне нравится осознавать, что в мире остались люди, которые настолько ценят свою семью.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[82].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[82] =
  new Scene({
    text: `
    - Пропажа брата, затем смерть… - я не смогла договорить предложение. - Папе как-никак сейчас нужна поддержка. А ведь он еще как-то умудряется работать. 
    <p>Артур придвинулся ближе ко мне и взял меня за руку. В ответ я: 
        `,
    buttontext: ['Сжала его руку сильнее', 'Ничего не сделала'],
    buttonaction: [
      () => { Game.Scenes.A_Part02[83].begin();},
      () => { Game.Scenes.A_Part02[87].begin();},
    ],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[83] =
  new Scene({
    text: `
    Я чувствовала в этом жесте поддержку. Он как никто понимал, что мне тоже было очень тяжело. 
    <p>Другой рукой парень притянул меня и заключил в крепкие объятия. Я расслабилась, ощущая его дыхание на своей шее, его сердцебиение. Сейчас мы с ним были словно единое целое.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[84].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[84] =
  new Scene({
    text: `
    - Артур, спасибо тебе. За все. 
    <p>- Аврора, обещаю. Я помогу тебе, чем смогу. Я вижу, как тебе нелегко приходится и не допущу, чтобы ты продолжала так... 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[85].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[85] =
  new Scene({
    text: `
    Он не договорил, но его высказывания все равно отозвались теплом на сердце. Я не могла тогда представить, что мог придумать Артур, но его слова и действия невольно заставляли верить в светлый исход.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[86].begin(); Game.message('Артур становится ближе к Авроре'); Game.Stats.Arthur.add(1)}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[86] =
  new Scene({
    text: `
    Оставшиеся часы до темноты, я пролежала на плече Артура. Не плача, не испытывая грусти. Только наслаждалась его компанией и разговорами, что грели душу.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[91].begin(); Game.Sounds.play('Music','Aurora_Daily_0' + Game.Stats.Song.get)}],
    background: 'Backgrounds/Aurora_Forest_Flowers',
  });

Game.Scenes.A_Part02[87] =
  new Scene({
    text: `
    Разговор выбил меня из привычной колеи спокойствия, к которому я стремилась. Я верила Артуру, но сейчас мне было тяжело отвечать на подобные вопросы. 
    <p>Парень, видя мою реакцию, отстранился и проговорил:
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[88].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[88] =
  new Scene({
    text: `
    - Прости, я не должен был давить на тебя всеми этими расспросами… 
    <p>- Ты ничего такого не сделал, просто я, видимо, до сих пор не могу смириться. 
    <p>- Аврора, обещаю. Я помогу тебе, чем смогу. Я вижу, как тебе нелегко приходится и не допущу, чтобы ты продолжала так...
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[89].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[89] =
  new Scene({
    text: `
    Он не договорил, но его высказывания все равно отозвались теплом на сердце. Я не могла тогда представить, что мог придумать Артур, но его слова и действия невольно заставляли верить в светлый исход.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[90].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[90] =
  new Scene({
    text: `
    Оставшиеся часы до темноты, мы сидели рядом друг с другом и мирно вели беседу на различные темы, стараясь чуть дольше не возвращаться в реальность.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[91].begin(); Game.Sounds.play('Music','Aurora_Daily_0' + Game.Stats.Song.get)}],
    background: 'Backgrounds/Aurora_Forest_Flowers',
  });

Game.Scenes.A_Part02[91] =
  new Scene({
    text: `
    Я вынырнула из воспоминаний, снова возвращаясь в салон автомобиля Артура.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[92].begin(); Game.message('Артуру приятно, что вы помните его поддержку'); Game.Stats.Arthur.add(1);}],
    background: 'Backgrounds/Aurora_Arthurs_Car',
  });

Game.Scenes.A_Part02[92] =
  new Scene({
    text: `
    - Я рад, что ты запомнила тот день. Теперь ты понимаешь, что я тогда говорил правду. Видя твое стремление к другой жизни, я не мог не помочь.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[95].begin();}],
    background: 'Backgrounds/Aurora_Arthurs_Car',
  });

Game.Scenes.A_Part02[93] =
  new Scene({
    text: `
    - Извини, все как в тумане. Я помню лес, но не могу вспомнить конкретных деталей. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[94].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[94] =
  new Scene({
    text: `
    Было видно, что Артур на миг расстроился, но сразу же взял себя в руки и рассказал:
    <p>- Именно тогда я обещал тебе, что постараюсь помочь изменить твою жизнь. Ведь ты сама этого хотела. И, надеюсь, теперь ты убедилась, что я говорил правду и сдержал свое слово.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[95].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[95] =
  new Scene({
    text: `
    - Спасибо, Артур. Я никогда не забуду эту помощь и обязательно буду делать все, чтобы отплатить тебе. 
    <p>- Брось. Не забивай себе голову этим. Я от тебя ничего не требую. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[96].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[96] =
  new Scene({
    text: `
    - Но я требую от себя. Я так не могу.  
    <p>- Придет время и ты обязательно отплатишь, - сдался парень, наигранно громко вздохнув.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[97].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[97] =
  new Scene({
    text: `
    Дальнейшие часы в пути прошли, по большей части молча. Я не хотела больше отвлекать Артура от дороги, к тому же меня продолжало сильно клонить в сон. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[98].begin(); Game.Sounds.play('Music','Lighthouse')}],
    background: 'Backgrounds/Aurora_Arthurs_Car',
  });

Game.Scenes.A_Part02[98] =
  new Scene({
    text: `
    Мне снился маяк. Но там не было отца или мамы.
    <p>На смотровой площадке стояла одинокая фигура старика, который держал в руках маленький сверток. Без сомнения в нем был ребенок.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[99].begin();}],
    background: 'Backgrounds/Aurora_Lighthouse_Night',
  });

Game.Scenes.A_Part02[99] =
  new Scene({
    text: `
    Мужчина бережно придерживал малыша, укрывая его от ветра. У него дрожали руки, а по щекам лились слезы. 
    <p>Его хриплый голос произнес:
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[100].begin();}],
    background: 'Backgrounds/Aurora_Lighthouse_Night',
  });

Game.Scenes.A_Part02[100] =
  new Scene({
    text: `
    - Беатрис… 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[101].begin();}],
    background: 'Backgrounds/Aurora_Lighthouse_Night',
  });

Game.Scenes.A_Part02[101] =
  new Scene({
    text: `
    В этом коротком сказанном слове было столько боли, столько отчаяния. Старик цеплялся за сверток как за самое драгоценное, что было в его жизни.
    <p>Он смотрел на море, которое было спокойным в ту ночь. Его зоркий взгляд пытался отыскать что-то среди воды, однако даже свет маяка не мог помочь ему выбраться из тьмы. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[102].begin();}],
    background: 'Backgrounds/Aurora_Lighthouse_Night',
  });

Game.Scenes.A_Part02[102] =
  new Scene({
    text: `
    Неожиданно ребенок начал ворочаться, а затем громко плакать. Мужчина стал успокаивать его, но крики так и продолжали пронзать мирную тишину.  
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[103].begin(); Game.Sounds.play('Music','Aurora_Daily_0' + Game.Stats.Song.get)}],
    background: 'Backgrounds/Aurora_Lighthouse_Night',
  });

Game.Scenes.A_Part02[103] =
  new Scene({
    text: `
    Я проснулась от легкого прикосновения по плечу. Сонным разумом было сложно осознавать, где я сейчас нахожусь. Однако обеспокоенно лицо Артура вернуло меня в реальность.
    - Аврора, все в порядке? Ты дрожала и плакала во сне.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[105].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[105] =
  new Scene({
    text: `
    - Просто дурной сон, извини за беспокойство…
    <p>- Дурочка, отучись извиняться за любую мелочь, - Артур заглушил машину. - Мы приехали.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[106].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[106] =
  new Scene({
    text: `
    Артур припарковался перед высотным зданием. Большой город встретил присущей ему суматохой. Много людей, спешивших по своим делам, много машин, много разных звуков. 
    <p>Выйдя из автомобиля, мы зашли в подъезд и поднялись в квартиру Артура. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[107].begin();}],
    background: '',
  });

Game.Scenes.A_Part02[107] =
  new Scene({
    text: `
    Меня встретило просторное и светлое помещение. В гостинной на столе стояла ваза со свежими белыми розами, а на кухне пахло выпечкой, будто бы здесь только что готовили.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[108].begin();}],
    background: 'Backgrounds/Aurora_Livingkitchen',
  });

Game.Scenes.A_Part02[108] =
  new Scene({
    text: `
    Вид квартиры многое мог рассказать о ее владельце. У меня сложилось впечатление, что Артур очень трепетно относится к своему имуществу и явно подготовился к моему приезду.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[109].begin();}],
    background: 'Backgrounds/Aurora_Livingkitchen',
  });

Game.Scenes.A_Part02[109] =
  new Scene({
    text: `
    - Давай немного отдохнем, а затем я тебе все покажу,  - сказал Артур, складывая наши вещи. - Не хочешь чай или кофе?
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[110].begin();}],
    background: 'Backgrounds/Aurora_Livingkitchen',
  });

Game.Scenes.A_Part02[110] =
  new Scene({
    text: `
    Такой простой вопрос почему-то поставил меня в тупик. Поэтому я ответила нейтрально:
    <p>- Сделай что-нибудь на свой вкус. Спасибо!
    <p>Парень улыбнулся и поставил чайник на плиту. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[111].begin();}],
    background: 'Backgrounds/Aurora_Livingkitchen',
  });

Game.Scenes.A_Part02[111] =
  new Scene({
    text: `
    - Нет ничего лучше зеленого чая после долгой дороги, - он поставил несколько чашек на стол. - Кстати, Аврора, уже написала папе, что мы благополучно добрались?
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[112].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[112] =
  new Scene({
    text: `
    - Да! Обычно СМС всегда доходят, а вот послать в ответ сообщение бывает проблематично. 
    <p>- Ничего. Я оставил ему адрес, он всегда сможет отправить письмо.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[113].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[113] =
  new Scene({
    text: `
    Я кивнула. После этого мы немного посидели, болтая о нашем переезде и о том, как быстро все это произошло. 
    <p>Я изъявила желание искать подработку, чтобы не зависеть от папиных средств. Когда же речь заходила о работе Артура, то парень старался перевести тему. Он не любил вдаваться в подробности рабочих дел дома.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[114].begin();}],
    background: 'Backgrounds/Aurora_Livingkitchen',
  });

Game.Scenes.A_Part02[114] =
  new Scene({
    text: `
    Спустя долгое время я чувствовала себя умиротворенно. Сидя в совершенно новой обстановке и общаясь с дорогим мне человеком. Нет больше тех грустных мыслей, которые появлялись, стоило мне вновь увидеть маяк и пустые комнаты...
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[115].begin();}],
    background: 'Backgrounds/Aurora_Livingkitchen',
  });

Game.Scenes.A_Part02[115] =
  new Scene({
    text: `
     Но я понимала, что здесь работы над собой предстоит в разы больше. 
    <p>Мы с Артуром прошлись по его квартире. В ней было всего две комнаты. Они были небольшие, отделанные в довольно простом и минималистичном дизайне - ничего лишнего.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[116].begin();}],
    background: 'Backgrounds/Aurora_Livingkitchen',
  });

Game.Scenes.A_Part02[116] =
  new Scene({
    text: `
     Моя комната была небольшой, но очень уютной. Синеватые тона невольно отсылали к привычному мне морскому пейзажу, что не могло не радовать глаз. 
    <p>Я присела на кровать, ощупывая мягкое одеяло. В комнате пахло цветами. Было свежо и красиво.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[118].begin();}],
    background: 'Backgrounds/Aurora_Room',
  });

Game.Scenes.A_Part02[118] =
  new Scene({
    text: `
     - Спасибо, Артур, очень милая комната. 
    <p>- Я рад, что ты оценила, - парень облокотился о стену, внимательно следя за моей реакцией, будто бы боясь, что мне может что-то не понравиться.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[119].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[119] =
  new Scene({
    text: `
     - Скажи, - я не хотела торопить события, но все-таки и сидеть без дела было не в моем стиле. - Какие наши дальнейшие планы? Мне надо подать документы в университет, найти работу…
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[120].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[120] =
  new Scene({
    text: `
     - Твое рвение в бой - выше всяких похвал, - вздохнул Артур. - Не хотела бы отдохнуть для начала?
    <p>- Я в порядке. Я хочу как можно быстрее влиться в новый ритм жизни.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[121].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[121] =
  new Scene({
    text: `
     - Что ж, - парень на секунду задумался. - В теории, хоть завтра я могу отвезти тебя в университет, где ты познакомишься с обстановкой, может быть даже с кем-то из преподавателей. Все, что тебе надо будет сделать - это сдать несколько вступительных экзаменов. Об остальном я позаботился.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[122].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[122] =
  new Scene({
    text: `
     Я была ошеломлена таким развитием событий и спросила:
    <p>- Но как же? Я ведь даже не собирала никаких документов для этого.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[123].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[123] =
  new Scene({
    text: `
     - Мы с твоим отцом обо всем позаботились. 
    <p>- Разве можно подать дистанционно документы даже без согласия самого человека?
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[124].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[124] =
  new Scene({
    text: `
     - Можно. Это же двадцать первый век, - улыбнулся Артур. -  У тебя хороший аттестат. А у меня - связи. Знакомый моего отца знает чуть ли ни всю верхушку университета. И, кстати, у тебя будут ответы на экзамен.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[125].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[125] =
  new Scene({
    text: `
     - Но это же нечестно… 
    <p>- Аврора, а мир и не будет всегда честным. Нужно научиться выживать всеми доступными способами.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[126].begin();}],
    background: 'Persons/Aurora_Arthur',
    condition: function (){
      if(Game.Stats.Pragmatic.get>=1){
        this.buttonaction[0] = () =>{Game.Scenes.A_Part02[127].begin();}
      }
      if(Game.Stats.Romantic.get>=1){
        this.buttonaction[0] = () =>{Game.Scenes.A_Part02[126].begin();}
      }
    }
  });

Game.Scenes.A_Part02[126] =
  new Scene({
    text: `
     - Однако я думала, что поступлю своими силами. Ведь на то они и знания, чтобы их применять. 
    <p>- У тебя еще будет время и возможности проявить себя. Сейчас нужно отбросить свою мечтательность и бороться за то место, которое тебе предоставили. 
    <p>Он был прав. Возможно, я мыслила немного наивно, но такова была моя натура.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[128].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[127] =
  new Scene({
    text: `
     - Ты прав. Это отличная возможность. Даже не знаю, как тебя в очередной раз благодарить. 
    <p>- Я рад, что ты восприняла это таким образом. Не волнуйся, у тебя еще будет шанс проявить себя. Сейчас попробуй зацепиться за это, дальше время покажет. 
    <p>Он говорил верные мысли. Не каждому человеку дается такая возможность. Можно сказать, что мне очень повезло. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[128].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[128] =
  new Scene({
    text: `
     - Думаю, когда момент наступит, я решу как поступлю с экзаменом. А сейчас мне нужно ознакомиться с вопросами. 
    <p>- Дело твое, - парень пожал плечами и вышел из комнаты. 
    <p>Через несколько минут он вернулся с несколькими распечатанными листами А4.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[129].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[129] =
  new Scene({
    text: `
     - Здесь все вопросы и ответы. 
    <p>- Отлично, - я бережно положила листы на кровать. - А направление?
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[130].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[130] =
  new Scene({
    text: `
     - К сожалению или к счастью, удалось пристроить тебя на исторический курс. Других вариантов не было. Твой отец говорил, что тебе нравится история. Думаю, это не будет проблемой. К тому же, в дальнейшем, когда поступишь, ты сможешь перевестись при необходимости.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[131].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[131] =
  new Scene({
    text: `
      - Это на самом деле отличные новости, нет смысла привередничать.
      <p>- У тебя остается пара недель до вступительных экзаменов. Если ты не уверена в своих силах и хочешь дополнительно позаниматься, можешь пользоваться библиотекой университета. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[132].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[132] =
  new Scene({
    text: `
       - Я бы начала готовиться уже с завтрашнего дня. 
      <p>- Как скажешь. Я могу отвезти тебя утром, но я должен буду уехать по работе. Где-то в обед заберу, ничего? 
      <p>- Идеально. Спасибо!
      <p>- Тогда до завтра. Отдыхай.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[133].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part02[133] =
  new Scene({
    text: `
       Когда Артур покинул комнату, я разложила свои вещи и принялась осматривать листы с вопросами, тщательно стараясь вникнуть и составить примерный список тем, которые у меня западают. 
      <p>Я сильно вымоталась за этот насыщенный день, поэтому стоило голове коснуться подушки, как я тут же уснула.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[134].begin();}],
    background: 'Backgrounds/Aurora_Room',
  });

Game.Scenes.A_Part02[134] =
  new Scene({
    text: `
       Утром мы с Артуром позавтракали яичницей с кофе, а затем поехали по делам.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[135].begin();}],
    background: 'Backgrounds/Aurora_Arthurs_Car',
  });

Game.Scenes.A_Part02[135] =
  new Scene({
    text: `
       - Ты справишься там одна, без меня?
      <p>- Я же не маленький ребенок, Артур. Все будет хорошо. Тем более, что может случиться?
      <p>- Ты права. Просто беспокоюсь за тебя.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[136].begin(); Game.Stats.Trial_Pass.add(1);}],
    background: 'Backgrounds/Aurora_Arthurs_Car',
  });

Game.Scenes.A_Part02[136] =
  new Scene({
    text: `
       В этом был весь Артур. Волнующийся по пустякам, милый и заботливый. 
      <p>- И чуть не забыл, - парень протянул мне карточку. - С ним ты можешь спокойно проходить в университет для любых целей. 
      <p>- Спасибо! - я убрала пропуск в свой рюкзак, продолжая поездку.
      <p>Мы доехали до учебного заведения довольно быстро. Попрощавшись с Артуром, я зашла в университет.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[137].begin();}],
    background: 'Backgrounds/Aurora_Arthurs_Car',
  });

Game.Scenes.A_Part02[137] =
  new Scene({
    text: `
       Холл представлял из себя большое пространство с широкой лестницей посередине. Первые секунды мною даже завладел страх потеряться в таком большом и неизведанном месте.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[138].begin();}],
    background: 'Backgrounds/Aurora_Univer',
  });

Game.Scenes.A_Part02[138] =
  new Scene({
    text: `
       Но я быстро взяла себя в руки, показала охраннику свой временный пропуск. Средних лет мужчина равнодушно осмотрел документ и указал в сторону, где находилась библиотека.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[139].begin();}],
    background: 'Backgrounds/Aurora_Univer',
  });

Game.Scenes.A_Part02[139] =
  new Scene({
    text: `
        Огромное помещение встретило меня запахом старинных книг и шепотом студентов. Массивные шкафы с торчащими корешками удивляли. Хотелось изучить каждую книгу, ближе познакомиться с мыслями автора.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[141].begin();}],
    background: 'Backgrounds/Aurora_Library',
    condition: function () {
      if(Game.Stats.Writing.get>=1){
        this.buttonaction[0] = () => { Game.Scenes.A_Part02[140].begin();}
      }
    }
  });

Game.Scenes.A_Part02[140] =
  new Scene({
    text: `
    Моему счастью небыло предела. Я словно оказалась в месте, о котором так долго мечтала. 
    <p>Окруженная книгами, я чувствовала себя живой и по-настоящему в своей тарелке. Когда-нибудь я обязательно хотела оказаться тем самым автором, чья книга могла бы находиться среди этих великолепных работ.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[141].begin();}],
    background: 'Backgrounds/Aurora_Library',
  });

Game.Scenes.A_Part02[141] =
  new Scene({
    text: `
    Милая библиотекарша отвела меня в небольшой закуток, где находились необходимые мне источники.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[142].begin();}],
    background: 'Backgrounds/Aurora_Books',
  });

Game.Scenes.A_Part02[142] =
  new Scene({
    text: `
    Я стала осматривать книжные полки в поисках исторических книг. Когда я потянулась за нужной мне, чья-то мужская рука соприкоснулось с моей. Я почувствовала легкую дрожь, пальцы незнакомца были необычайно холодными.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[143].begin();}],
    background: 'Backgrounds/Aurora_Books',
  });

Game.Scenes.A_Part02[143] =
  new Scene({
    text: `
    Я развернулась, чтобы увидеть наглеца, который все-таки утащил мою книгу. 
    <p>- “Революция 1917 года: мифы и реальность”, - он прочитал название книги своим бархатистым низким голосом. - Вот чем нынче увлекаются молоденькие студентки?
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[144].begin();}],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part02[144] =
  new Scene({
    text: `
    - Я просто хотела подготовиться к экзамену, верни, пожалуйста,- ответила я довольно строго. 
    <p>Его глаза хитро прищурились. Он взял книгу и демонстративно повел ей у меня перед носом. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[145].begin();}],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part02[145] =
  new Scene({
    text: `
    - А что мне за это будет? - его рука опустилась на полку, не давая мне вырваться из-под его хищного взора. 
    <p>Он был настолько близко, что я чувствовала исходящий от него аромат: табачный дым вперемешку с одеколоном. Парень был очень настойчив, казалось, его забавляла эта ситуация.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part02[146].begin(); Game.Achievements.A_Part02Completed.unlock();}],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part02[146] =
  new Scene({
    text: `
    Я хотела что-то возразить незнакомцу, но чей-то звонкий женский голос крикнул:
    <p>- Калеб!
    <p>Тогда я еще не осознавала, что это было только началом новых и увлекательных знакомств. 
        `,
    buttontext: [''],
    buttonaction: [ () => {
      setTimeout(() => { Game.Scenes.A_Part03[0].begin(); }, 1000);
      Game.LoadScreen('Aurora_Part03');
      Game.Progress.save("Aurora_Part03");
    }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03 = [];

Game.Scenes.A_Part03[0] =
  new Scene({
    text: `
    Я отложила дневник, наблюдая, как алое солнце стремится уйти за горизонт, чтобы скорее уступить место долгожданной ночи. Небо переливалось самыми разнообразными красками, словно некий безумный художник выплеснул на полотно все самые яркие цвета, надеясь в этом хаосе почерпнуть вдохновение. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[1].begin(); }],
    background: 'Backgrounds/Aurora_Lighthouse_Dawn',
    condition: function (){
      Game.Sounds.play('Music', 'Lighthouse');
    }
  });

Game.Scenes.A_Part03[1] =
  new Scene({
    text: `
    Я завороженно наблюдала за чудесами природы и была абсолютно уверена, что совсем скоро продолжу писать уже полюбившийся мне дневник. Но прежде, мне захотелось побыть наедине со своими мыслями и чашечкой ароматного чая. 
    <p>Еще немного полюбовавшись на прекрасный пейзаж, я спустилась со смотровой площадки маяка и направилась к нашему домику. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[2].begin(); }],
    background: 'Backgrounds/Aurora_Lighthouse_Dawn',
  });

Game.Scenes.A_Part03[2] =
  new Scene({
    text: `
    Все оставалось по-прежнему. Тихая и мирная обстановка. Красивая и уютная комната. 
    <p>Я села на диван вместе с напитком в руках и завернулась в плед, пытаясь еще раз обдумать написанные строки.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[3].begin(); }],
    background: 'Backgrounds/Aurora_Near_Lighthouse_Dawn',
  });

Game.Scenes.A_Part03[3] =
  new Scene({
    text: `
    - Артур, где же ты… Почему ты всегда был рядом, но теперь решил покинуть меня. 
    <p>Отставив кружку, я обхватила себя руками, пытаясь унять дрожь и успокоиться. Но не в силах сдержаться - я дала волю слезам. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[4].begin(); }],
    background: 'Backgrounds/Aurora_Near_Lighthouse_Dawn',
  });

Game.Scenes.A_Part03[4] =
  new Scene({
    text: `
    - Почему все вышло именно так? Ты же моя опора. Мой… - тяжело было говорить из-за подступающих эмоций, которые буквально съедали меня изнутри. - Я никогда не забуду твою поддержку. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[5].begin(); }],
    background: 'Backgrounds/Aurora_Near_Lighthouse_Dawn',
  });

Game.Scenes.A_Part03[5] =
  new Scene({
    text: `
    Все мои чувства перемешались. Я с трудом могла мыслить, ведь столько событий обрушилось на меня. А еще о стольком предстояло написать и будто бы вновь пережить.
    <p>Снова взяв в руки чай, я все-таки нашла в себе силы продолжить. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[6].begin(); }],
    background: 'Backgrounds/Aurora_Near_Lighthouse_Dawn',
  });

Game.Scenes.A_Part03[6] =
  new Scene({
    text: `
    - Моя первая встреча с Калебом. Каким же нахалом он был по началу, а какой чувственной натурой оказался по итогу.
    <p>Я крепко сжала кружку, буквально обжигая свою ладонь. 
    <p>“Сколько же всего с тобой связано. Ты причинил мне столько боли, и одновременно с этим - столько радости.”
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[7].begin(); }],
    background: 'Backgrounds/Aurora_Near_Lighthouse_Dawn',
  });

Game.Scenes.A_Part03[7] =
  new Scene({
    text: `
    Неожиданно для себя я наконец-то смогла улыбнуться. Ведь в тот день мне удалось познакомиться с человеком, который полностью поменял мою жизнь. 
    <p>- Я ведь тогда встретила первый раз не только Калеба… И все-таки: как после такого не верить в судьбу?
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[8].begin(); }],
    background: 'Backgrounds/Aurora_Near_Lighthouse_Dawn',
  });

Game.Scenes.A_Part03[8] =
  new Scene({
    text: `
    “Я должна продолжить. Это необходимо. От этого зависит не только мое будущее. Соберись, Аврора. Скоро начнется одна из самых важных частей всей истории. Мне нужно сосредоточиться и зафиксировать все в точности.”
    <p>Не в силах больше откладывать, я вернулась к дневнику.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[9].begin(); }],
    background: 'Backgrounds/Aurora_Near_Lighthouse_Dawn',
  });

Game.Scenes.A_Part03[9] =
  new Scene({
    text: `
    Калеб выглядел немного растерянным и озирался по сторонам. 
    <p>- Только не она… - парень вдруг посмотрел на меня и схватил за плечи. - Спрячь меня!
    <p>- Что? - я стала смотреть вместе с ним, не понимая откуда мог доноситься звук. - Зачем мне это делать?
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[10].begin(); }],
    background: 'Persons/Aurora_Kaleb',
    condition: function () {
        Game.Sounds.play('Music',`Aurora_Daily_0${Game.Stats.Song.get}`);
        Game.Stats.Kaleb.add(0);
        Game.message('Вы вернулись в воспоминания')
    }
  });

Game.Scenes.A_Part03[10] =
  new Scene({
      text: `
    - Ну, я же очаровашка, - он спрятался за одним из книжных стеллажей, показывая мне знаком, чтобы я не издавала звуков.
    <p>- Ты же мне книжку так и не вернул, - прошептала я. - И зачем мне выгораживать тебя?
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part03[11].begin(); Game.Stats.Dalia.add(0) }],
      background: 'Backgrounds/Aurora_Books',
  });

Game.Scenes.A_Part03[11] =
  new Scene({
      text: `
    И вдруг я заметила молодую девушку, которая была подобно вихрю. Ее абсолютно не смущало, что мы находимся в библиотеке, где приветствуется тишина. Нет. Она бежала сломя голову через весь зал, даже вопреки возгласам рассерженной библиотекарши. 
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part03[68].begin(); }],
      background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[68] =
  new Scene({
      text: `
    <s>Черты лица как у модели. Живая, бодрая. С растрепанными светлыми волосами.
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part03[12].begin(); }],
      background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[12] =
  new Scene({
    text: `
    Она была очень красива, даже несмотря на легкую злость, которую она испытывала. Белая кофта. Рыжие волосы и серые глаза. Именно такой я запомнила ее в нашу первую встречу. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[13].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[13] =
  new Scene({
    text: `
    - Девушка? Да-да, вы. Не видели тут наглого и немного симпатичного на вид парня? - стараясь выровнять дыхание произнесла незнакомка. 
    <p>Я растерялась, так как не привыкла к такому вниманию. Должно быть эта девушка очень хотела отыскать Калеба, а я продолжала смотреть на нее не в силах что-либо произнести.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[14].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[14] =
  new Scene({
    text: `
    После нескольких секунд она продолжила:
    <p>- Брось, я же видела. Он точно был тут. Не волнуйся ты так, просто скажи, куда он вдруг испарился. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[15].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[15] =
  new Scene({
    text: `
    - Я… нет, то есть… 
    <p>- У вас все в порядке? Выглядите немного напуганной. Неужели этот засранец что-то сделал?! Калеб, а ну-ка выходи сейчас же! - девушка начала озираться по сторонам и вот-вот могла увидеть, где скрывается парень. 
    <p>Все это кардинально отличалось от моего привычного ритма жизни, ведь я настолько вжилась в роль одиночки, что даже простой разговор с новыми людьми заставлял сильно нервничать.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[16].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[16] =
  new Scene({
    text: `
     Но я старалась перебороть себя, так как мне действительно хотелось быть выше своих заморочек и наконец-то начать полноценно жить. 
    <p>Что делать? 
        `,
    buttontext: ['Выдать Калеба','Подыграть Калебу '],
    buttonaction: [
      () => { Game.Scenes.A_Part03[17].begin(); Game.Stats.BetrayKaleb.add(1); Game.Timer.stop();},
      () => { Game.Scenes.A_Part03[22].begin(); Game.Timer.stop(); Game.Achievements.A_PayBack.unlock();}
    ],
    background: 'Persons/Aurora_Dalia',
    condition: function () {
        Game.Timer.set(10, ()=>{Game.Scenes.A_Part03[17].begin(); Game.Timer.stop(); })
    }
  });

Game.Scenes.A_Part03[17] =
  new Scene({
    text: `
    Мне не было смысла его выгораживать. К тому же, он вел себя слишком вызывающе при нашей первой встрече. Пусть знает, что я не одна из этих простушек, которые так легко поддаются на его “чары”. 
    <p>Я жестом показала, где скрывается Калеб. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[18].begin(); }],
    background: 'Backgrounds/Aurora_Books',
  });

Game.Scenes.A_Part03[18] =
  new Scene({
    text: `
    - Он серьезно думал, что я не найду его там, - девушка вздохнула. - Выходи давай. Уж не знаю, что ты задумал и зачем решил спрятаться, но ведешь себя по-детски.
    <p>Вскоре Калеб вышел, поднимая руки вверх, будто бы сдаваясь полицейскому.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[19].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[19] =
  new Scene({
    text: `
    - Да что ты ко мне прицепилась? Мы уже миллион раз обсуждали. Ты перегибаешь палку, Далия. Все хорошо. Мы просто беседовали с этой милой девушкой. 
    <p>То, что он назвал меня милой, было лишь одним из его приемчиков, который все же немного смутил меня. Я вскользь посмотрела на Калеба, пытаясь угадать его эмоции. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[20].begin(); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[20] =
  new Scene({
    text: `
    Он выглядел слегка опечаленным, словно его тревожило нечто очень важное, а может просто раздражала сложившаяся ситуация. 
    <p>Калеб поймал мой взгляд, но долго не задержался, а затем произнес: 
    <p>- Мы можем пойти уже?
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[21].begin(); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[21] =
  new Scene({
    text: `
    Далия с сочувствием обернулась ко мне, видимо заметив, что мне немного не по себе, и сказала: 
    <p>- Надеюсь, у тебя все в порядке. Чтобы не случилось, не раскисай. Позитив правит этим миром. 
    <p>Они вдвоем ушли, оставляя меня в легкой растерянности стоять посреди библиотеки. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[27].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[22] =
  new Scene({
    text: `
    Я решила подыграть ему. Он не выглядел, как плохой человек. А если попросил помощи, должна быть весомая причина такому поведению. 
    <p>- Он вроде убежал из библиотеки, но я не уверена, - произнесла я дрожащим голосом. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[23].begin(); }],
    background: 'Backgrounds/Aurora_Books',
  });

Game.Scenes.A_Part03[23] =
  new Scene({
    text: `
    - Спасибо! Нельзя было оставлять его, так и знала, что убежит при любой удобной возможности. 
    <p>- Но все в порядке…
    <p>- Я надеюсь, - она улыбнулась мне. - Мне стоит догнать его, пока он не натворил бед. Увидимся. 
    <p>Девушка резво побежала в указанном мною направлении. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[24].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[24] =
  new Scene({
    text: `
    Из своего укрытия вышел Калеб, который удивленно смотрел на меня.
    <p>- Вот уж не думал, что решишься соврать. Зачем ты это сделала?
    <p>- Мне показалось - тебе это необходимо. Вот и все.
    <p>- Хех, - он ухмыльнулся. - Допустим. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[25].begin(); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[25] =
  new Scene({
    text: `
    Минуту другую он о чем-то размышлял, а затем произнес:
    <p>- Услугу за услугу. Вижу, что на тебя можно положиться, поэтому буду должен. Если что понадобится - помогу. 
    <p>- Не стоит. Я ничего такого не сделала и… 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[26].begin(); Game.message('Калебу понравилась ваша ложь. Он вернет должок'); Game.Stats.Kaleb.add(1); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[26] =
  new Scene({
    text: `
    Он вдруг приставил указательный палец к моим губам, заставляя не заканчивать фразу. 
    <p>- Будь увереннее и не отказывайся от помощи. 
    <p>Мне нечего было возразить на это и я покорно кивнула. 
    <p>- Пока-пока, - Калеб вышел из библиотеки, махая мне рукой напоследок. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[27].begin(); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[27] =
  new Scene({
    text: `
    Оставшись наедине с собой, я выдохнула, так как осталась в комфортной и привычной для себя обстановке. Однако несмотря на произошедшую ситуацию, я ни сколько не пожалела, что пообщалась с такими странными, но в то же время - веселыми людьми. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[28].begin(); }],
    background: 'Backgrounds/Aurora_Books',
  });

Game.Scenes.A_Part03[28] =
  new Scene({
    text: `
    Убрав книги, которыми я пользовалась, чтобы повторить материал для предстоящего экзамена, я направилась в холл университета. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[29].begin(); }],
    background: 'Backgrounds/Aurora_Books',
  });

Game.Scenes.A_Part03[29] =
  new Scene({
    text: `
    Время, к которому Артур должен был приехать, приближалось. Я решила позвонить ему и спросить, где он. Зная Артура, он вполне мог приехать заранее. 
    <p>Набрав нужный номер, в ответ я услышала лишь нудные гудки. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[30].begin(); }],
    background: 'Backgrounds/Aurora_Univer',
  });

Game.Scenes.A_Part03[30] =
  new Scene({
    text: `
    Успокоив себя тем, что он должно быть за рулем или ждет меня около учебного заведения, я поспешила выйти из университета. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[31].begin(); }],
    background: 'Backgrounds/Aurora_Univer',
  });

Game.Scenes.A_Part03[31] =
  new Scene({
    text: `
    На улице я наткнулась на Калеба и Далию, которые громко о чем-то спорили. 
    <p>- Тебе так просто от меня не избавиться! - девушка ткнула Калеба в плечо. - Долго ты еще будешь убегать?
    <p>- Надоела… 
    <p>- Ах вот оно как, мистер невозмутимость.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[32].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[32] =
  new Scene({
    text: `
    Я не хотела больше подслушивать чужие разговоры. К тому же, меня больше волновало то, что я нигде не видела Артура. 
    <p>Несколько предпринятых попыток дозвониться, окончились все той же неудачей. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[33].begin(); }],
    background: 'Backgrounds/Aurora_Uni_Outside',
  });

Game.Scenes.A_Part03[33] =
  new Scene({
    text: `
    Волнение охватило меня, потому что я находилась одна в неизвестном городе, даже не помня дорогу домой. Не говоря уже о том, что в голове возникло несколько ужасных сценариев с Артуром в главной роли.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[34].begin(); }],
    background: 'Backgrounds/Aurora_Uni_Outside',
  });

Game.Scenes.A_Part03[34] =
  new Scene({
    text: `
    Нервно шагая из стороны в сторону, я пыталась найти решение проблемы.
    <p>Но ничего такого не придумав, решила вернуться в университет в надежде, что рано или поздно Артур все-таки приедет за мной. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[35].begin(); }],
    background: 'Backgrounds/Aurora_Uni_Outside',
  });

Game.Scenes.A_Part03[35] =
  new Scene({
    text: `
    Я корила себя за беспечность. Ведь я даже не запомнила адрес дома в котором остановилась. Да, все действительно происходило быстро и стремительно, но полагаться полностью на Артура было недальновидно с моей стороны. 
    <p>Он тоже человек, у которого могли возникнуть непредвиденные обстоятельства. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[36].begin(); }],
    background: 'Backgrounds/Aurora_Uni_Outside',
  });

Game.Scenes.A_Part03[36] =
  new Scene({
    text: `
    Неожиданно за моей спиной оказалась Далия, которая тихонечко тронула меня за плечо и произнесла:
    <p>- Что случилось? 
    <p>Тогда я действительно хотела сказать правду, видя искреннее беспокойство в ее глазах. Но все равно произнесла:
    <p>- Ничего. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[37].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[37] =
  new Scene({
    text: `
    <p>Нехотя к нам присоединился Калеб, который сказал:
    <p>- Да видно же, что ты себе место найти не можешь. 
    <p>- Просто, - под таким давлением я не могла больше молчать. – За мной должны были приехать. Но он не берет трубку… 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[38].begin(); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[38] =
  new Scene({
    text: `
    - Так закажи такси. Все же просто, - парень развел руками. - Давай я закажу, если вдруг проблемы с деньгами. Сочтемся. 
    <p>- Я не помню адрес, - от смущения хотелось провалиться сквозь землю. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[39].begin(); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[39] =
  new Scene({
    text: `
    - Неожиданно, - Далия призадумалась. - И что ты теперь будешь делать? 
    <p>- А что мне еще остается? Ждать, конечно. Наверняка он скоро приедет. 
    <p>- А если не приедет?
    <p>- Прости, что?
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[40].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[40] =
  new Scene({
    text: `
    - Ну, вдруг что-то случилось и… 
    <p>- Далия, - Калеб вмешался в наш разговор. - Хватит преувеличивать. 
    <p>- Я просто пытаюсь сказать, что самым лучшим решением будет развеяться и пойти погулять. Вот и все. Снять стресс, а заодно лучше познакомиться с городом. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[41].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[41] =
  new Scene({
    text: `
    Услышанное никак не могло уложиться в голове. Девушка, которую я вижу всего второй раз в жизни предлагает мне нечто подобное - безумство. Я элементарно растерялась, отводя взгляд в сторону. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[42].begin(); }],
    background: 'Backgrounds/Aurora_Uni_Outside',
  });

Game.Scenes.A_Part03[42] =
  new Scene({
    text: `
    - Ну, уж нет, - парень смотрел на Далию, будто бы понимая, что она замышляет. - Никуда я с тобой не поеду. И эта девушка, разумеется, откажется. 
    <p>- Все верно. Я не могу никуда уехать. А вдруг он будет волноваться и искать меня?
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[43].begin(); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[43] =
  new Scene({
    text: `
    - Тебя же он заставил поволноваться, - Далия вздохнула. - Послушай. Всего на час или два. Тут ходит автобус, который довезет нас прямо в центр города. Познакомимся. Мы покажем тебе местные достопримечательности. Будет весело.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[44].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[44] =
  new Scene({
    text: `
     - Я даже не знаю…
      <p>- Брось. Ну, побудешь с нами, пока его нет, уверена тебе понравится и заодно перестанешь так переживать. Он позвонит тебе, если приедет и не найдет здесь. Не волнуйся, с ним вряд ли что-то случилось. Просто заработался и забыл написать.
      <p>- С нами? - удивленно произнес Калеб. - Не будет никаких “нас”. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[45].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[45] =
  new Scene({
    text: `
     - Конечно, будет. Далия, Калеб и… - девушка посмотрела на меня. 
    <p>- Аврора, - я смущенно улыбнулась. 
    <p>- Вот! Отличная компания. Хватит вам наводить тоску.  
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[46].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[46] =
  new Scene({
    text: `
     - Нет уж, без меня. 
      <p>- Калеб, - Далия слегка нахмурилась. - Давай не будем. Ты обещал мне кое-что. Забыл?
      <p>- Это другое. При чем тут дурацкая поездка в город? 
      <p>- А это все связано. Давай не будем больше спорить. Ты знаешь, что я права. Ну, что, Аврора, едем? 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[47].begin(); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[47] =
  new Scene({
    text: `
     Я понимала - это чистое безумие. Выбираться в совершенно неизвестный мне город с людьми, с которыми познакомилась совсем недавно. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[48].begin(); }],
    background: 'Backgrounds/Aurora_Uni_Outside',
  });

Game.Scenes.A_Part03[48] =
  new Scene({
    text: `
     Однако в чем-то Далия была права. Артур пропал, не сказав ничего. Он мог отправить хотя бы СМС. Но не сделал. Всего час ничего не изменит. В конце концов, Артур может позвонить, если все-таки объявится. 
      <p>- Я согласна.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[49].begin(); }],
    background: 'Backgrounds/Aurora_Uni_Outside',
  });

Game.Scenes.A_Part03[49] =
  new Scene({
    text: `
     - Я не сомневалась в тебе, - она широко улыбнулась и несколько раз прыгнула на месте, радуясь. - Давайте поторопимся, а то опоздаем на автобус. 
      <p>Калеб даже не стал спорить, а просто покорно принял ситуацию и последовал за нами с недовольным лицом. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[50].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[50] =
  new Scene({
    text: `
     На остановке я и Далия сели на скамейку, а Калеб остался стоять рядом, высматривая транспорт. 
    <p>Мне же стало интересно больше узнать о своей новой компании и я осмелилась спросить:
    <p>- Скажи, Далия, а вы тоже будете поступать на первый курс этого университета? 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[51].begin(); }],
    background: 'Backgrounds/Aurora_Busstop',
  });

Game.Scenes.A_Part03[51] =
  new Scene({
    text: `
     - Все верно. Скажу тебе по секрету: уже не терпится начать учиться. 
    <p>- Сдай экзамены для начала, - сказал Калеб. - А то на уме явно не учеба. 
    <p>- Давай без твоих занудств, - она надула губы и отвернулась.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[52].begin(); }],
    background: 'Backgrounds/Aurora_Busstop',
  });

Game.Scenes.A_Part03[52] =
  new Scene({
    text: `
     - То есть, только тебе можно так себя вести? 
    <p>- Это как это так? - она резко встала и ткнула Калеба прямо в грудь. - Ты, мне кажется, забыл, почему я этим занимаюсь. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[53].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[53] =
  new Scene({
    text: `
     Слушая их препирательства, я невольно улыбалась, словно наблюдая за давними друзьями, которые вечно что-то не могут поделить. Это было одновременно мило и интересно, потому что я все больше узнавала их с совершенно разных сторон. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[54].begin(); }],
    background: 'Backgrounds/Aurora_Busstop',
  });

Game.Scenes.A_Part03[54] =
  new Scene({
    text: `
     Вот - Калеб, который весь из себя такой угрюмый, пытается построить себе образ серьезного человека, а на деле, кажется, что не так уж его тяготят подобные авантюры.  
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[55].begin(); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[55] =
  new Scene({
    text: `
     А Далия. Несмотря на ее задор, видно, какая она ответственная и серьезная девушка. Я не представляла, почему она так печется о Калебе, но уверена, что должна быть причина.  
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[56].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[56] =
  new Scene({
    text: `
     - Все, хватит, - Калеб махнул рукой. - Зачем все это выслушивать Авроре? Мы же вроде хотели придерживаться “позитива”. 
    <p>- Да, - Далия посмотрела на меня. - Прости. Мы вечно как кошка с собакой. Наверное, со временем мы сможем сгладить углы…
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[57].begin(); }],
    background: 'Backgrounds/Aurora_Busstop',
  });

Game.Scenes.A_Part03[57] =
  new Scene({
    text: `
     - Чур, я - кошка, - парень улыбнулся, пытаясь разрядить обстановку. 
      <p>- Все хорошо. Я в порядке, - раскрасневшись произнесла я. - Мне правда с вами хорошо. Я практически забыла, что оказалась в такой неловкой ситуации. А слушая вас, на душе становится гораздо теплее.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[58].begin(); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[58] =
  new Scene({
    text: `
     - Ты милашка, ничего не могу с собой поделать, - Далия вдруг приблизилась ко мне и крепко обняла. -  Иногда мне трудно сдерживать свои эмоции. Особенно когда я вижу рядом с собой такого светлого и искреннего человека.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[59].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[59] =
  new Scene({
    text: `
      Вскоре приехал автобус. Внутри было мало людей, поэтому нам удалось сесть рядом. 
      <p>- Аврора, а чего мы только о нас да и о нас. Расскажи, откуда ты приехала? - спросила Далия. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[60].begin(); }],
    background: 'Backgrounds/Aurora_Bus',
  });

Game.Scenes.A_Part03[60] =
  new Scene({
    text: `
      - Я из небольшого городка в нескольких часах езды отсюда. Мы долгое время жили там, но потом нам с семьей пришлось переехать на маяк, который находился в уединение, на берегу моря.  
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[61].begin(); }],
    background: 'Backgrounds/Aurora_Bus',
  });

Game.Scenes.A_Part03[61] =
  new Scene({
    text: `
       Калеб оживился и внимательно посмотрел на меня, будто бы услышал очень занимательную информацию. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[62].begin(); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[62] =
  new Scene({
    text: `
       - Маяк? 
      <p>- Да. После смерти предыдущего смотрителя, моему отцу предложили занять его место. Мы не раздумывая согласились отправиться туда с ним. До этого он постоянно работал как проклятый, мы практически не виделись. Поэтому никак не могли позволить себе жить и дальше в разлуке. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[63].begin(); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[63] =
  new Scene({
    text: `
       - Но почему ты все же решилась уехать? - с сочувствием спросила Далия. - Извини, если это личное…
      <p>- Все в порядке, - мне была очень приятна проявленная чуткость. - Я была как меж двух огней. Признаться, до сих пор себя так ощущаю. Я хочу начать жить. Для себя. Но и не смею бросить своего отца. Да, он сам настаивал на переезде. Однако то одиночество… Я боюсь за него. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[64].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[64] =
  new Scene({
    text: `
       - Не переживай, - Далия положила свою руку на мою. - Просто почаще навещай его, пиши. Уверена, ты все это и так знаешь. 
      <p>- Все равно, спасибо.
      <p>- Знаешь, а я никогда не была на маяке. Как было бы здорово однажды посмотреть…
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[65].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[65] =
  new Scene({
    text: `
       - Скажи, Аврора, - Калеб вдруг перебил Далию, очень желая задать свой вопрос. - А что случилось с предыдущим смотрителем? 
      <p>Его заинтересованность немного удивила меня. Казалось странным, что из всего рассказа, его волновал именно этот момент. Но все же я ответила правду:
      <p>- Всех подробностей я не знаю. Артур, его внук, говорил, что он скончался от болезни.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[66].begin(); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[66] =
  new Scene({
    text: `
       - Вот оно как…
      <p>- Знаете что, - Далия повысила голос и начала говорить более задорным тоном. - Хватит грустить. Поговорим о чем-нибудь другом. Аврора, лучше расскажи о своем увлечении? Какое у тебя хобби? Что делаешь в свободное время?
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[67].begin(); }],
    background: 'Persons/Aurora_Dalia',
    condition: function () {
      if (Game.Stats.Drawing.get>=1) this.buttonaction[0] = () => { Game.Scenes.A_Part03[67].begin();}
      if (Game.Stats.Writing.get>=1) this.buttonaction[0] = () => { Game.Scenes.A_Part03[77].begin();}
      if (Game.Stats.Music.get>=1) this.buttonaction[0] = () => { Game.Scenes.A_Part03[86].begin();}
      }
  });

Game.Scenes.A_Part03[67] =
  new Scene({
    text: `
       - В свободное время я рисую. В основном пейзажи. На маяке для меня открывалось много обзоров, которые вдохновляли, так и просились на бумагу. 
        <p>- Так-так, - Далия потерла ладошки и придвинулась ко мне поближе. - Вот это совпадение. Я сама большой ценитель искусства. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[69].begin(); }],
    background: 'Backgrounds/Aurora_Bus',
  });

Game.Scenes.A_Part03[69] =
  new Scene({
    text: `
       - Ты тоже рисуешь?
        <p>- Все верно! Больше всего мне нравится рисовать людей. Передавать их эмоции. Все до мелочей. Могу показать свою последнюю работу. Одну секунду, - она начала выискивать рисунок в своем рюкзаке. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[70].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[70] =
  new Scene({
    text: `
       Вскоре Далия достала небольшую папку и раскрыла ее на нужном изображении. 
      <p>- Это человек, с которым я мечтаю познакомиться… 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[71].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[71] =
  new Scene({
    text: `
       Рисунок был выполнен аккуратными мазками. Чувствовалось, как автор вкладывает туда не только свой талант, но и душу. Прекрасный юноша улыбался, будто бы смотрел на любимую женщину. Может, это и хотела передать Далия? 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[72].begin(); }],
    background: 'Backgrounds/Aurora_Solist_Picture',
  });

Game.Scenes.A_Part03[72] =
  new Scene({
    text: `
        - Это потрясающе, - я не могла сдержать эмоции. - У тебя талант!  Кажется, это кто-то очень знакомый…
        <p>- Спасибо, но ты преувеличиваешь, - Далия смущенно улыбнулась. - Ты что же, не знаешь этого человека? Или у меня не вышло передать его образ…
        <p>- Нет-нет, я правда не могу никак вспомнить. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[74].begin(); }],
    background: 'Backgrounds/Aurora_Solist_Picture',
  });

Game.Scenes.A_Part03[74] =
  new Scene({
    text: `
        - Хм, - девушка с недоверием посмотрела на меня. - Это Леннарт. Солист знаменитой группы “Kings & Queens”. А я их самая большая фанатка. 
        <p>- Точнее его, - уточнил Калеб. 
        <p>- Не завидуй. Он прекрасен: фигура, улыбка, эти волшебные глаза... Нет, ну, как можно быть таким очаровательным. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[75].begin(); }],
    background: 'Backgrounds/Aurora_Solist_Picture',
  });

Game.Scenes.A_Part03[75] =
  new Scene({
    text: `
        - Далия, - Калеб придвинулся к нам, смотря на рисунок. - Когда я уже увижу свой портрет? 
        <p>- А ты не заслужил, - она фыркнула, закрыла папку и убрала в рюкзак. 
        <p>- Конечно… Поди целый альбом с моим изображением под кроватью прячешь.
        <p>Далия замахнулась на него кулаком и мы дружно рассмеялись.
        `,
    buttontext: [''],
    buttonaction: [() => {
      Game.Scenes.A_Part03[76].begin();
      Game.message('У вас с Далией схожий интерес. Вы узнаете друг друга лучше');
      Game.Stats.Dalia.add(1);
      Game.Achievements.A_Fan.unlock();
    }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[76] =
  new Scene({
    text: `
        - Аврора, удивительно встретить человека, который еще и разделяет мои интересы. Считаю не зря твой спутник опоздал, сколько чудесного произошло из-за этой случайности. 
        <p>- Спасибо, что поделилась. Это очень здорово, что наше хобби совпадает.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[90].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[77] =
  new Scene({
    text: `
        - Мне нравится писать. Небольшие рассказы или стихи. Специального образования у меня нет, но мне помогает отвлечься от всяких плохих мыслей. 
        <p>- Ого, интересное совпадение, - Далия показала пальцем на Калеба. - Ему тоже нравится нечто подобное. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[78].begin(); }],
    background: 'Backgrounds/Aurora_Bus',
  });

Game.Scenes.A_Part03[78] =
  new Scene({
    text: `
        Калеб бросил на меня взгляд и спросил:
        <p>- А любимый писатель есть?
        <p>- Не то чтобы… Я люблю и уважаю творчество во всех проявлениях. Поэтому не могу выделить кого-то конкретного. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[79].begin(); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[79] =
  new Scene({
    text: `
        - Я, например, - говорила Далия. - Очень люблю стихи Эдгара Аллана По. Особенно все эти мистические мотивы… Как же он красиво обыгрывает все своим мастерским словом.  
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[80].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[80] =
  new Scene({
    text: `
       - Не могу не согласиться, - улыбнулся парень.
       <p>- Я не читала ни одного его стихотворения. 
       <p>- Не может быть? - удивилась Далия. - Это срочно надо исправлять. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[81].begin(); }],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[81] =
  new Scene({
    text: `
       - Поддерживаю, - кивнул Калеб. - А я вот из тех безумцев, которым нравится творчество писателя Франца Кафки. 
      <p>- Никогда не могла тебя понять, - развела руками девушка. - Это редкостная нудятина. Пока герой Кафки домыслит, даже в стихах больше экшена произойдёт.  
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[82].begin(); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[82] =
  new Scene({
    text: `
       - В этом твоя проблема. Ты постоянно куда-то торопишься. А читая его произведения, так и хочется смаковать каждый момент, рассуждая вместе с персонажем.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[84].begin(); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[84] =
  new Scene({
    text: `
       Я была приятно удивлена, что Калеб оказался таким разносторонним человеком. Не каждому дано полюбить искусство, но он буквально оживал на глазах, когда говорил о своем кумире. Это не могло не восхитить. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[85].begin();
      Game.message('У вас с Калебом схожий интерес. Вы узнаете друг друга лучше');
      Game.Stats.Kaleb.add(1);
      Game.Achievements.A_Fav_Writer.unlock();
    }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[85] =
  new Scene({
    text: `
        - Да и, Аврора. Если я не забуду, то обязательно принесу томик стихов Эдгара По. Тебе точно понравится, - улыбался Калеб, смотря на меня. 
        <p>- Спасибо тебе большое!
        <p>- На самом деле не за что. Я рад, что у нас совпало хобби.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[90].begin(); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[86] =
  new Scene({
    text: `
        - Очень люблю слушать музыку. В будущем надеюсь, что смогу научиться играть на каком-нибудь инструменте или даже написать что-то свое. 
        <p>- У тебя обязательно все получится. Может, однажды сам Леннарт, солист популярнейшей группы “Kings & Queens”, будет обучать тебя этому мастерству. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[87].begin(); }],
    background: 'Backgrounds/Aurora_Bus',
  });

Game.Scenes.A_Part03[87] =
  new Scene({
    text: `
        - Далия, это невозможно, - отмахнулась я. - Это же какое обстоятельство должно произойти, чтобы мы просто встретились.
        <p>- Да ладно тебе, Аврора, - произнес Калеб. - В конечном итоге, все мы люди. А у судьбы есть свои планы на твой счет. Не расстраивайся раньше времени. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[88].begin(); }],
    background: 'Backgrounds/Aurora_Bus',
  });

Game.Scenes.A_Part03[88] =
  new Scene({
      text: `
        - Правильно, Калеб у нас философ, - Далия шутливо толкнула его в плечо. - Все может произойти. А если еще стараться… Например, пойти на концерт, занять места в первом ряду и смотреть ему в глаза все время…
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part03[89].begin(); }],
      background: 'Backgrounds/Aurora_Bus',
  });

Game.Scenes.A_Part03[89] =
  new Scene({
      text: `
         - Далия просто одержима Леннартом, - парень откинулся на сиденье. - Или как это правильно выразиться - фанатка номер один. 
         <p>- Прекрати… Нравится он мне, да. Но не то, чтобы фанатка. Просто хочу выйти за него замуж, что такого. 
         <p>Мы с Калебом переглянулись и разразились смехом. 
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part03[90].begin(); }],
      background: 'Backgrounds/Aurora_Bus',
  });

Game.Scenes.A_Part03[90] =
  new Scene({
      text: `
        До окончания поездки, мы продолжали вести непринужденную беседу и узнавать друг друга. На удивление, я и правда расслабилась и начала понемногу привыкать к моим новым знакомым.
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part03[91].begin(); Game.Sounds.play('Music','Aurora_City') }],
      background: 'Backgrounds/Aurora_Bus',
  });

Game.Scenes.A_Part03[91] =
  new Scene({
      text: `
        Автобус действительно довез нас прямо до центра города. 
        <p>Я увидела фонтан и жестом позвала ребят к нему. Лучи теплого солнца кое-где пробивались сквозь величественные здания, бросая блики на воду. 
        `,
      buttontext: [''],
      buttonaction: [() => { Game.Scenes.A_Part03[92].begin(); }],
      background: 'Backgrounds/Aurora_Fountain',
  });

Game.Scenes.A_Part03[92] =
  new Scene({
    text: `
        Меня тут же захватила атмосфера крупного города с присущей ему суетой и величием.  
        <p>Хотелось заблудиться здесь на несколько часов, но не было времени, да и мне не позволяли этого сделать. Далия и Калеб повели меня дальше по улице. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[93].begin(); }],
    background: 'Backgrounds/Aurora_Fountain',
  });

Game.Scenes.A_Part03[93] =
  new Scene({
    text: `
        Какое-то время мы просто гуляли по округе, рассматривая архитектуру, просто наслаждаясь обществом друг друга. Даже Калеб, казалось, полностью расслабился и перестал ворчать. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[94].begin(); }],
    background: 'Backgrounds/Aurora_SW_Streets',
  });

Game.Scenes.A_Part03[94] =
  new Scene({
    text: `
      Он даже вошел во вкус нашей спонтанной прогулки и делился своими знаниями во время наших обсуждений.
      <p>Далия же безмерно улыбалась, постоянно воображая, что могло бы быть на месте постройки. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[95].begin(); }],
    background: 'Backgrounds/Aurora_SW_Streets',
  });

Game.Scenes.A_Part03[95] =
  new Scene({
    text: `
      - Ох, как же мне этого не хватало. Знаете, что? Стойте тут. Я добавлю нам сладости. 
      <p>Мы с Калебом удивленно переглянулись, не понимая замысел Далии. 
      <p>Но вскоре она вернулась с несколькими палочками сахарной ваты и победоносно вручила их нам. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[96].begin(); }],
    background: 'Backgrounds/Aurora_SW_Streets',
  });

Game.Scenes.A_Part03[96] =
  new Scene({
    text: `
      Когда с едой было покончено, Далия неожиданно указала куда-то пальцем и заявила: 
      <p>- У меня есть еще одна идея. 
      <p>- Ну, нет, - говорил Калеб. - Хороше же сидим, что тебе все неймется? 
      <p>- Можно сделать еще интереснее, не говоря уже о пользе моего предложения. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[97].begin(); }],
    background: 'Backgrounds/Aurora_SW_Streets',
  });

Game.Scenes.A_Part03[97] =
  new Scene({
    text: `
      - Что ты имеешь в виду, Далия? - уточнила я. 
      <p>- Видите, там проводят экскурсию. Давайте незаметно присоединимся к ней и послушаем немного. Точно ведь узнаем что-то новое. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[98].begin(); }],
    background: 'Backgrounds/Aurora_SW_Streets',
  });

Game.Scenes.A_Part03[98] =
  new Scene({
    text: `
      - Не буду говорить о том, какая эта дурацкая идея, поэтому просто промолчу. 
      <p>- Наконец-то ты понял, что со мной бесполезно спорить. Аврора? - девушка смотрела на меня горящими глазами. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[99].begin(); }],
    background: 'Backgrounds/Aurora_SW_Streets',
  });

Game.Scenes.A_Part03[99] =
  new Scene({
    text: `
      Идея мне очень понравилась. Хоть и было немного страшно, что кто-то спросит у нас билеты, да и просто отчитает в конце концов. Однако перспектива узнать больше о городе - интриговала. И было что-то такое притягательное в Далии, с ней хотелось совершить какое-то безумство.  
      <p>- Почему бы и нет… Только осторожно. Нам нельзя привлекать внимание. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[100].begin(); }],
    background: 'Backgrounds/Aurora_SW_Streets',
  });

Game.Scenes.A_Part03[100] =
  new Scene({
    text: `
      Когда группа двинулась далее, мы незаметно примкнули к потоку. Внутри все переворачивалось от осознания, что мы поступаем неправильно. Но в тоже время я почему-то отчетливо ощутила - с этими новыми знакомыми мне ничего не грозит. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[101].begin(); Game.Sounds.play('Music','Aurora_Church')}],
    background: 'Backgrounds/Aurora_SW_Streets',
  });

Game.Scenes.A_Part03[101] =
  new Scene({
    text: `
      Вскоре экскурсовод привел группу к собору, рядом с которым располагалось кладбище. Это старое здание стояло несколько веков, переживая раз за разом тяготы жестоких исторических событий. Но его шпиль все еще пронзает небеса, что, безусловно, восхищало.
      <p>Однако вместе с этим в глубине души росло необъяснимое чувство тревоги. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[102].begin(); }],
    background: 'Backgrounds/Aurora_Church',
  });

Game.Scenes.A_Part03[102] =
  new Scene({
    text: `
      Это место было мрачным, но, по-своему, притягательным. 
      <p>Неожиданно Калеб замер, внимательно осматривая здание. На его лице читалось неподдельное отвращение и совершенное нежелание идти дальше. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[103].begin(); }],
    background: 'Backgrounds/Aurora_Church',
  });

Game.Scenes.A_Part03[103] =
  new Scene({
    text: `
      - Я пойду прогуляюсь по округе. Встретимся у фонтана. 
      <p>- Но что случилось? - обеспокоенно спросила я. - Если тебе не нравится, давайте лучше уйдем, чтобы всем было комфортно. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[123].begin(); }],
    background: 'Backgrounds/Aurora_Church',
  });

Game.Scenes.A_Part03[123] =
  new Scene({
    text: `
      - Нет-нет, просто нужно сделать пару звонков. Веселитесь. 
      <p>Парень резко ушел, будто бы не желая слышать дальнейших уговоров. Далия ничего не произнесла, лишь с грустью смотрела ему вслед. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[104].begin(); }],
    background: 'Backgrounds/Aurora_Church',
  });

Game.Scenes.A_Part03[104] =
  new Scene({
    text: `
      Оставшись наедине с Далией, мы стали слушать рассказ экскурсовода: 
      <p>- Собор построен в 1598 году известным итальянским архитектором Марко Берлускони. Здание пережило несколько реставраций после сокрушительных войн, но сумело дожить до нашего времени и сейчас полностью функционирует. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[105].begin(); }],
    background: 'Backgrounds/Aurora_Church',
  });

Game.Scenes.A_Part03[105] =
  new Scene({
    text: `
      - А это правда, что здесь некогда располагалась секта? - спросил подросток - участник экскурсии. 
      <p>- Кхм, - экскурсовод поправил очки. - Нет, молодой человек - это миф. Вокруг собора действительно витают множество легенд, но по большей части они все недостоверны и не имеют фактов, указывающих на истину. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[106].begin(); }],
    background: 'Backgrounds/Aurora_Church',
  });

Game.Scenes.A_Part03[106] =
  new Scene({
    text: `
      - И даже убийство - вымысел?
      <p>- Есть одна легенда, - группа заметно оживилась, внимая каждое слово. - Якобы архитектор, Марко Берлускони, был необычным человеком, а участником тайного общества. В то время началась гражданская война в Швеции - война против Сигизмунда, правящего короля. И Марко, по приказу власти, построил собор для покаяния неверных крестьян. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[107].begin(); }],
    background: 'Backgrounds/Aurora_Church',
  });

Game.Scenes.A_Part03[107] =
  new Scene({
    text: `
      - Однако что творилось внутри стен, - продолжал экскурсовод. - Никто не знает. Поговаривали, Марко действовал в интересах своей группы. Оттуда и пошла легенда о ритуальных убийствах и кровавой бане, происходивших в соборе. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[108].begin(); }],
    background: 'Backgrounds/Aurora_Church',
  });

Game.Scenes.A_Part03[108] =
  new Scene({
    text: `
      - Но документов или иных источников, подтверждающих этот факт - нет, - завершал свой рассказ мужчина. -  Поэтому в историческом обществе принято считать все это байками, которые были нужны, чтобы устрашить народ перед фигурой короля. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[109].begin(); }],
    background: 'Backgrounds/Aurora_Church',
  });

Game.Scenes.A_Part03[109] =
  new Scene({
    text: `
      Мое дыхание замирало во время этого рассказа. Даже сама мысль о том, что здесь могло происходить подобное - ужасала и выбивала из коллеи. 
      <p>Только одно не выходило из головы - это желание поскорее покинуть собор и больше его никогда не видеть. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[110].begin();}],
    background: 'Backgrounds/Aurora_Church',
  });

Game.Scenes.A_Part03[110] =
  new Scene({
    text: `
      Далия слушала с равнодушным лицом, как будто бы ее совсем не интересовала подобная история. 
      <p>Еще немного послушав экскурсию, девушка произнесла:
      <p>- Давай вернемся к Калебу. Думаю, на сегодня хватит уроков истории и страшных легенд. 
      <p>Я согласилась, так как сама порядком устала, и мы двинулись к фонтану. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[111].begin(); }],
    background: 'Backgrounds/Aurora_Church',
    condition: function () {
      if (Game.Stats.Romantic.get>=1) this.buttonaction[0] = () => { Game.Scenes.A_Part03[111].begin(); }
      if (Game.Stats.Pragmatic.get>=1) this.buttonaction[0] = () => { Game.Scenes.A_Part03[114].begin(); }
    }
  });

Game.Scenes.A_Part03[111] =
  new Scene({
    text: `
      - Что думаешь об этой истории?
      <p>- На самом деле очень интересно. Все эти мифы и легенды по-своему вдохновляют. Уверена, что об этом вышел бы хороший сериал или фильм. И драма: возлюбленные по разные стороны баррикад…
      <p>- А мне кажется - пустая трата времени. Люди вечно фантазируют без поводов. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[112].begin(); }],
    background: 'Backgrounds/Aurora_Church',
  });

Game.Scenes.A_Part03[112] =
  new Scene({
    text: `
      - Почему ты так считаешь?
      <p>- Сама подумай: как можно скрыть массовое убийство? Согласна с точкой зрения экскурсовода - это все для устрашения народа. Раз идет восстание, нужны и соответствующие методы подавления. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[113].begin(); }],
    background: 'Backgrounds/Aurora_Church',
  });

Game.Scenes.A_Part03[113] =
  new Scene({
    text: `
      - Может и так. Но все-таки хотелось бы верить, что из этого может получиться нечто интересное. 
      <p>- Согласна. Однако я за реализм. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[116].begin(); }],
    background: 'Backgrounds/Aurora_Church',
  });

Game.Scenes.A_Part03[114] =
  new Scene({
    text: `
      - Что думаешь об этой истории?
      <p>- Не думаю, что это правда. Скорее всего, дело в короле и его интригах.  К тому же, если это не подкрепляется фактами, то и смысл верить.
      <p>- Полностью с тобой согласна. И ведь придумают же… Я даже завидую такому таланту. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[115].begin(); }],
    background: 'Backgrounds/Aurora_Church',
  });

Game.Scenes.A_Part03[115] =
  new Scene({
    text: `
      - А зачем тебе такой навык?
      <p>- Даже и не знаю, - девушка призадумалась. - Просто прикольно что-нибудь такое написать, а все вокруг будут тебе наивно верить. Кажется, что это действенный метод, к которому часто прибегали. 
      <p>- Твоя правда. 

        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[116].begin(); }],
    background: 'Backgrounds/Aurora_Church',
  });

Game.Scenes.A_Part03[116] =
  new Scene({
    text: `
      Когда мы вернулись, Калеб сидел на бортике фонтана, пребывая в глубоких раздумьях. Он даже не посмотрел в нашу сторону, когда мы подошли к нему, лишь сказал: 
      <p>- Мне нужно уехать. 
      <p>- Все в порядке? - спросила Далия обеспокоенно смотря на парня. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[117].begin(); }],
    background: 'Backgrounds/Aurora_Fountain',
  });

Game.Scenes.A_Part03[117] =
  new Scene({
    text: `
      - Нет, поэтому мне и нужно уехать. Чтобы все решить. Вызову такси. 
      <p>- Будь осторожен. И пиши, - девушка хотела было сесть с рядом с Калебом, но у нее зазвонил телефон. - Простите, это папа. Я должна ответить.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[118].begin(); }],
    background: 'Backgrounds/Aurora_Fountain',
  });

Game.Scenes.A_Part03[118] =
  new Scene({
    text: `
      Оставшись с Калебом наедине, я немного занервничала, так как складывалось ощущение, что моя компания не доставляет ему особого удовольствия. Но на мое удивление, парень вдруг посмотрел на меня и произнес: 
      <p>- Надеюсь, тебе понравилась прогулка. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[119].begin(); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[119] =
  new Scene({
    text: `
      - Да, обычно я не поступаю так необдуманно. Но с вами я действительно почувствовала себя хорошо. 
      <p>- Я рад, - он улыбнулся. - Уверена, мы еще ни раз сможем пообщаться. Такси приехало. Пора прощаться. 
      <p>- А как же Далия?
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[120].begin(); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[120] =
  new Scene({
    text: `
      - Она не расстроится, что не смогла со мной попрощаться. Мы видимся часто. Мне иногда кажется, что даже слишком. 
      <p>Мы двинулись в сторону подъезжающей машины, пребывая в тишине. 
      <p>- Что ж, - парень положил мне руку на плечо. 
      <p>- До встречи, Аврора. 
      <p>- И тебе всего хорошего, Калеб. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[121].begin(); }],
    background: 'Persons/Aurora_Kaleb',
  });

Game.Scenes.A_Part03[121] =
  new Scene({
    text: `
      Когда Калеб уехал, я несколько секунд смотрела вслед удаляющейся машине и размышляла: все ли с ним будет в порядке? На этот раз он действительно выглядел крайне озадаченным.
      <p>Собираясь идти к Далии, я заметила на земле нечто, что привлекло мое внимание. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[122].begin(); Game.Stats.Mothers_Photo.add(1) }],
    background: 'Backgrounds/Aurora_Fountain',
  });

Game.Scenes.A_Part03[122] =
  new Scene({
    text: `
      Это была винтажная фотография с запечатленной на ней красивой девушкой.  Изображение было пожелтевшим от времени, а внизу красовалась надпись на французском: “Моя семья”. 
      <p>Я не знала, кто эта незнакомка. В голову пришло предположение, что фотографию мог обронить Калеб. Поэтому я незамедлительно спрятала свою находку в рюкзак и поспешила к Далии. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[124].begin(); }],
    background: 'Backgrounds/Aurora_Mother_Photo',
  });

Game.Scenes.A_Part03[124] =
  new Scene({
    text: `
      Девушка выглядела совсем поникшей. Я подсела к ней на бортик фонтана и спросила:
      <p>- Что случилось, Далия? Я могу чем-то помочь?
      <p>- Аврора, ох, к сожалению, ты ничем не сможешь помочь. Но спасибо за попытку! 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[125].begin();}],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[125] =
  new Scene({
    text: `
      - И все-таки ты такая грустная. 
      <p>- Ладно… не знаю, зачем я тебе это рассказываю. Но все дело в моем отце. Он очень суровый человек и постоянно требует от меня невозможного. 
      <p>- Например? 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[126].begin();}],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[126] =
  new Scene({
    text: `
      - Прости, я не могу сейчас привести конкретный пример. И, признаться, без того паршиво. Просто знай, что он тиран и деспот. Я его не ненавижу, но и по-настоящему любить просто не получается. Тяжелая ситуация. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[127].begin();}],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[127] =
  new Scene({
    text: `
      Вспомнив о своем отце, сердце невольно сжалось. Но мне удалось подавить эмоции и я с улыбкой произнесла:
      <p>- Давай еще немного погуляем и вернёмся назад.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[128].begin();}],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[128] =
  new Scene({
    text: `
      - Отличная мысль! 
      <p>Мы ушли с площади, оставляя фонтан позади. 
      <p>Тогда я поймала себя на мысли, что мне очень хочется вернуться сюда. Поделиться драгоценными воспоминаниями с отцом или, может быть, с Артуром. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[129].begin();}],
    background: 'Backgrounds/Aurora_Fountain',
  });

Game.Scenes.A_Part03[129] =
  new Scene({
    text: `
      Петляя по улочкам мы вышли к удивительному современному стеклянному зданию, на фасаде которого красовалась надпись: Rosen medical. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[130].begin();}],
    background: 'Backgrounds/Aurora_Pharm',
  });

Game.Scenes.A_Part03[130] =
  new Scene({
    text: `
      - Что это за здание? 
      <p>- Это фармацевтическая компания. Одна из крупнейших в городе. У них даже название происходит от какой-то там древней шведской фамилии. 
      <p>- Ого, очень красивое здание. 
      <p>- Ты не поверишь, если я скажу, что мой отец его проектировал. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[131].begin();}],
    background: 'Backgrounds/Aurora_Pharm',
  });

Game.Scenes.A_Part03[131] =
  new Scene({
    text: `
      - Он настоящий гений! 
      <p>- Все так говорят… А теперь пойдем поскорее. Не хочу больше тут находиться. 
      <p>- Постой…
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[132].begin();}],
    background: 'Backgrounds/Aurora_Pharm',
  });

Game.Scenes.A_Part03[132] =
  new Scene({
    text: `
      Я не верила своим глазам, но из здания выходил Артур. Он выглядел нервным, постоянно оборачивался. От его добродушного и привычного располагающего вида не осталось и следа. Артур был полностью сосредоточен и шел вперед, пытаясь поскорее оставить здание далеко за спиной. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[133].begin();}],
    background: 'Backgrounds/Aurora_Pharm',
  });

Game.Scenes.A_Part03[133] =
  new Scene({
    text: `
      - Что такое? - уточнила Далия. 
      <p>- Это Артур! Он должен был забрать меня сегодня. 
      <p>- Артур? Внук прошлого смотрителя? Какое интересное совпадение. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[134].begin();}],
    background: 'Backgrounds/Aurora_Pharm',
  });

Game.Scenes.A_Part03[134] =
  new Scene({
    text: `
      Первое время, казалось, что Артур ничего не замечал вокруг. Но затем, будто бы неведомые силы заставили его посмотреть в мою сторону. Он сильно удивился, казалось, немного разозлился и стремительно направился в нашу сторону. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[135].begin();}],
    background: 'Backgrounds/Aurora_Pharm',
  });

Game.Scenes.A_Part03[135] =
  new Scene({
    text: `
      - Аврора? Что ты здесь делаешь? Ты же должна быть в университете. 
      <p>- Должна, но ты не приехал. 
      <p>- Как… - Артур посмотрел на время и с грустью взглянул на меня. - Прости, пожалуйста. Я должен был явиться по рабочим вопросам в этот офис. Сам не знаю, как так получилось, что я совершенно забыл о времени.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[136].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part03[136] =
  new Scene({
    text: `
       - А что это за рабочие вопросы такие? - спросила Далия, испытывающе глядя на Артура. 
       <p>- А ты кто такая? Извини, конечно, но это тебя не касается. 
       <p>- Ты прав, но поступать так с близкими людьми как минимум - не красиво. Знаю я эти ваши «рабочие встречи». Врать он не умеет. Скрывает что-то!  Какие-нибудь девушки…
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[137].begin();}],
    background: 'Persons/Aurora_Dalia',
  });

Game.Scenes.A_Part03[137] =
  new Scene({
    text: `
       - Я не собираюсь выслушивать нотации от незнакомки, тем более без веского повода, - Артур прервал Далию и резко схватил меня за руку, потянув в сторону своего автомобиля. 
       <p>- Но как же, - я растерянно смотрела вслед девушки. - Постой, я даже не попрощалась. 
       <p>- Еще увидимся, Аврора, - крикнула мне Далия. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[138].begin();}],
    background: 'Persons/Aurora_Arthur',
  });

Game.Scenes.A_Part03[138] =
  new Scene({
    text: `
      Мы сели в машину Артура. Не было сил и желания вести разговор, поэтому мы молча поехали в сторону дома. 
      <p>Я не представляла, почему он мог повести себя так бестактно. Да, я тоже была не права, что отправилась на прогулку, не стала его дожидаться.
      <p>В конце концов, Далия оказалась права. Ему и правда было не до меня. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[139].begin();}],
    background: 'Backgrounds/Aurora_Arthurs_Car',
  });

Game.Scenes.A_Part03[139] =
  new Scene({
    text: `
      Даже дома разговор не завязывался. Мы не посмели смотреть друг на друга, а в горле застрял несуществующий ком. 
      <p>Неожиданно Артур все-таки произнес:
      <p>- Тебе пришло письмо. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[140].begin();}],
    background: 'Backgrounds/Aurora_Livingkitchen',
  });

Game.Scenes.A_Part03[140] =
  new Scene({
    text: `
      - Спасибо, - взяв в руки конверт, я поспешила в свою комнату. 
      <p>Больше мне было невыносимо находиться в такой гнетущей атмосфере. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[141].begin();}],
    background: 'Backgrounds/Aurora_Livingkitchen',
  });

Game.Scenes.A_Part03[141] =
  new Scene({
    text: `
      Наконец-то оставшись сама с собой, я выдохнула, усаживаясь на кровати поудобнее. В голове прокручивался сегодняшний день и множество вопросов, на которые мне хотелось узнать ответы. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[142].begin();}],
    background: 'Backgrounds/Aurora_Room',
  });

Game.Scenes.A_Part03[142] =
  new Scene({
    text: `
      Прежде всего меня интересовало: почему Артур так странно вел себя? Неужели работа настолько важна, что ему было сложно даже послать СМС?
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[143].begin();}],
    background: 'Backgrounds/Aurora_Room',
  });

Game.Scenes.A_Part03[143] =
  new Scene({
    text: `
      А Калеб? Куда он так резко отправился? Что за отношения у Далии с отцом? 
      <p>Даже легенда собора не отпускала меня, вызывая красочные образы в голове. Все ли там так очевидно? 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[144].begin();}],
    background: 'Backgrounds/Aurora_Room',
  });

Game.Scenes.A_Part03[144] =
  new Scene({
    text: `
      Но в одном я была уверена точно. Я ни разу не пожалела о своем решении участвовать в такой спонтанной поездке. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[145].begin();}],
    background: 'Backgrounds/Aurora_Room',
  });

Game.Scenes.A_Part03[145] =
  new Scene({
    text: `
      Еще больше меня волновало то, что сейчас в руках я сжимала письмо от отца. Конечно же я сразу узнала его аккуратный почерк. 
      <p>Мне было страшно увидеть написанное, но все же я открыла конверт.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[146].begin();}],
    background: 'Backgrounds/Aurora_Room',
    condition: function () {
      if (Game.Stats.Father.get>=1) this.buttonaction[0] = () => { Game.Scenes.A_Part03[146].begin(); Game.Sounds.play('Music','Lighthouse');}
      if (Game.Stats.Father.get<=0) this.buttonaction[0] = () => { Game.Scenes.A_Part03[152].begin(); Game.Sounds.play('Music','Lighthouse');}
    }
  });

Game.Scenes.A_Part03[146] =
  new Scene({
    text: `
      Я не могла не обратить внимание на бумагу, на которой был написан текст. Она была мамина. Ей отчего-то очень нравилось коллекционировать необычную бумагу и иногда писать на ней особенные письма. 
      <p>Оторвавшись от воспоминаний, я принялась читать.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[147].begin();}],
    background: 'Backgrounds/Aurora_Message_Father_Good',
  });

Game.Scenes.A_Part03[147] =
  new Scene({
    text: `
      <i>Дорогая Аврора, как ты? Я так и не смог отправить тебе СМС, да и не силен в этих современных технологиях. Поэтому использую старый добрый метод - письмо. 
      <p><i>Расскажи о своих успехах. Обжилась на новом месте? Как у вас с Артуром дела? Что с учебой? Мне интересна любая деталь, связанная с тобой. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[148].begin();}],
    background: 'Backgrounds/Aurora_Message_Father_Good',
  });

Game.Scenes.A_Part03[148] =
  new Scene({
    text: `
      <i>Что же до меня, то у меня все хорошо. На работе все без изменений, полный штиль. Время от времени приезжают ремонтники. С одним из них даже удалось подружиться. Мои вечера отнюдь не такие одинокие, как ты могла подумать. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[149].begin();}],
    background: 'Backgrounds/Aurora_Message_Father_Good',
  });

Game.Scenes.A_Part03[149] =
  new Scene({
    text: `
      <i>Мы проводим время с пользой. Общаемся. Часто делимся опытом в рабочей сфере. Представляешь, я даже научился менять лампочку в прожекторе маяка. Не знаю пригодится ли мне это, но это был поучительный опыт.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[150].begin();}],
    background: 'Backgrounds/Aurora_Message_Father_Good',
  });

Game.Scenes.A_Part03[150] =
  new Scene({
    text: `
      <i>Я скучаю по тебе. Твой подарок греет мне душу и не дает грустить. 
      <p><i>Ты тоже. Постарайся ради нас. 
      <i><p>Люблю,
      <i>Твой папа
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[151].begin();}],
    background: 'Backgrounds/Aurora_Message_Father_Good',
  });

Game.Scenes.A_Part03[151] =
  new Scene({
    text: `
      Отложив письмо в сторону, я улыбнулась, так как была искренне счастлива, что с папой все хорошо. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[157].begin();}],
    background: 'Backgrounds/Aurora_Room',
  });

Game.Scenes.A_Part03[152] =
  new Scene({
    text: `
      Я не могла не обратить внимание на бумагу, на которой был написан текст. Она была грязной в каких-то непонятных пятнах. 
      <p>В душе сразу поселилось сомнение относительно состояния папы, и я скорее приступила к письму.
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[153].begin();}],
    background: 'Backgrounds/Aurora_Message_Father_Bad',
  });

Game.Scenes.A_Part03[153] =
  new Scene({
    text: `
      <i>Дорогая Аврора, как ты? Я так и не смог отправить тебе СМС, да и не силен в этих мобильных устройствах. Поэтому использую старый добрый метод - письмо. 
      <i><p>Расскажи о своих успехах. Обжилась на новом месте? Как у вас с Артуром дела? Что с учебой? Мне интересна любая деталь связанная с тобой. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[154].begin();}],
    background: 'Backgrounds/Aurora_Message_Father_Bad',
  });

Game.Scenes.A_Part03[154] =
  new Scene({
    text: `
      <i>Что же до меня, то я сильно устаю в последнее время. Провожу свои вечера в одиночестве, иногда позволяю себе немного выпить. Это помогает заглушить столь нелегкое бремя. 
      <i><p>Но я в порядке. Я обещал быть честным с тобой. Да. Период сейчас не самый простой, однако я справляюсь. Иначе и быть не может. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[155].begin();}],
    background: 'Backgrounds/Aurora_Message_Father_Bad',
  });

Game.Scenes.A_Part03[155] =
  new Scene({
    text: `
      <i>Я скучаю по тебе. Твой подарок греет мне душу и не дает окончательно загрустить.
      <i><p>Люблю,
      <i>Твой папа
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[156].begin();}],
    background: 'Backgrounds/Aurora_Message_Father_Bad',
  });

Game.Scenes.A_Part03[156] =
  new Scene({
    text: `
      Отложив письмо в сторону, я заплакала от того, что отцу сейчас приходится так несладко, а я думаю лишь о себе и о каких-то несущественных вопросах. 
        `,
    buttontext: [''],
    buttonaction: [() => { Game.Scenes.A_Part03[157].begin();}],
    background: 'Backgrounds/Aurora_Room',
  });

Game.Scenes.A_Part03[157] =
  new Scene({
    text: `
      Я дала себе слово, что в ближайшее время обязательно навещу его. 
      <p>А пока, обнимая подушку, я так и уснула в обнимку с письмом, вспоминая теплые слова своего отца. 
        `,
    buttontext: [''],
    buttonaction: [() => {
      Game.Scenes.Features[100].begin();
      Game.Progress.save('Aurora_Part04');
    }],
    background: 'Backgrounds/Aurora_Room',
    condition: function () {
      Game.Achievements.A_Part03Completed.unlock();
    }
  });Game.Scenes.Features = [];

Game.Scenes.Features[0] =
    new Scene({
        text: `
            Привет! Это меню доступа к ранним возможностям и тестирования функций, что тебе показать?
            `,
        buttontext: [
            'Перейти на часть',
            'Ничего',

        ],
        background: 'Persons/RTemiy',
        buttonaction: [
            () => { Game.Scenes.Features[5].begin(); },
            () => { Game.Interface.closeopen('MainField', 'MenuField') },
        ],
    });

Game.Scenes.Features[4] =
    new Scene({
        text: `
            Привет! Это история "Бессмертные: последняя надежда" Куда тебя переместить?
            `,
        buttontext: [
            'Часть 1',
            'Часть 2',
            'Часть 3',
            'Часть 4',
        ],
        background: 'Persons/Masha',
        buttonaction: [
            () => { Game.Scenes.FirstChapter[101].begin(); },
            () => { Game.Scenes.TL[1].begin(); },
            () => { Game.Scenes.PP[1].begin(); },
            () => { Game.Scenes.PP[1].begin(); },
        ],
    });

Game.Scenes.Features[6] =
  new Scene({
    text: `
            Привет! Это история "Аврора" Куда тебя переместить?
            `,
    buttontext: [
            'Часть 1',
    ],
    background: 'Persons/Masha',
    buttonaction: [
      () => { },
    ],
  });

Game.Scenes.Features[100] =
    new Scene({
        text: `
            <p>
            <p>
            <p>Продолжение следует! 

            <p>Дата выхода следующего обновления: конец августа.

            <p>Очень ждём вас в нашем телеграмм канале - <a href="https://t.me/chronicles_game" target="_blank">Перейти</a>

            <p>Там вы сможете пообщаться с нами, узнать на каком этапе находится разработка игры. 
            И не стесняйтесь сообщать об ошибках, ведь только С ВАШЕЙ ПОМОЩЬЮ мы сможем стать лучше!

            <p>Будем очень рады вашей оценке! Пожалуйста, оставляйте отзывы на странице нашего приложения в Google Play - <a href="https://play.google.com/store/apps/details?id=com.mva.chronicles" target="_blank">Перейти</a>
            `,
        background: "",
      buttonactive: [true, false],
        buttontext: ['Вернуться в меню'],
        buttonaction: [() => {
          Game.Interface.closeopen('MainField','MenuField');
          Game.Sounds.pauseAll();
        }],
    });

Game.Scenes.Features[5] =
  new Scene({
    text: `
            Привет! Выбери историю
            `,
    buttontext: [
      'Бессмертные: Последняя надежда',
      'Аврора',
    ],
    background: 'Persons/Masha',
    buttonaction: [
      () => { Game.Scenes.Features[4].begin(); },
      () => { Game.Scenes.Features[6].begin() },
    ],
  });

/* ЗАГОТОВКА
Name[0] =
        new Scene({
            text: `

            `,
            buttontext: [
                '',
                '',
                '',
                '',
                ''
                ],
            buttonaction: [
                ()=>{},
                ()=>{},
                ()=>{},
                ()=>{},
                ()=>{}
            ],
            buttonactive: [, , , ,],
            background : '',
            condition : function (){

            },
        });
*/