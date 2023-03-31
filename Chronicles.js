/**
 *
 * @source: https://github.com/RTemiy/Chronicles/
 *
 * @licstart The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyright (C) 2022 Artemiy "RTemiy" G.
 *
 * The JavaScript code in this page is provided under CC BY-NC 3.0 license
 * https://creativecommons.org/licenses/by-nc/3.0/legalcode
 *
 * @licend The above is the entire license notice for the JavaScript code in this page.
 *
 */

const ROOTPATH="",Game={};Game.Stats={},Game.HideAllAttitudes=function(){for(let t in Game.Stats)Game.Stats[t].show=!1,Game.Stats[t].Hide();InfoText.innerHTML="",InfoArticle.innerHTML="",InfoPicture.src="pictures/Interface/Unknown.png",MessageField.setAttribute("class","hide"),MessageField.style.display="none"},Game.Stories=[],Game.Achievements={},Game.ShowCategoryAchievements=function(t){let e=0,n=0;for(let o in Game.Achievements)Game.Achievements[o].story==t?(e++,Game.Achievements[o].Show(),1<=Game.Achievements[o].unlocked&&n++,AchievementsAmount.innerHTML="\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u043E \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0439 "+n+"/"+e):Game.Achievements[o].Hide()},Game.AllAchievs=0,Game.Scenes={},Game.PlayerName="",Game.Timer={},Game.Progress={},Game.Sounds={},Game.Settings={},Game.Effects={},Game.Design={},Game.canShowAds=!1,Game.LastSave={};class Achievement{constructor(t){this.title=t.title,this.text="<hr>"+t.text+"<p>",this.picture="pictures/"+t.picture+".png",this.unlocked=0,this.story=t.story,this.Init()}Init(){this.a=document.createElement("achievement"),this.b=document.createElement("img"),this.b.src=this.picture,this.c=document.createElement("ATitle"),this.c.innerHTML=this.title,this.d=document.createElement("AText"),this.d.innerHTML=this.text,this.e=document.createElement("img"),this.e.src="pictures/Items/Lock.png",this.e.id="lock",AchievementsField.appendChild(this.a),this.a.appendChild(this.b),this.a.appendChild(this.e),this.a.appendChild(this.c),this.a.appendChild(this.d)}Unlock(){1!=this.unlocked&&(Game.Inventory_Message("\uD83D\uDD13 "+this.title),Game.SendData("\u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0435: "+this.title)),this.unlocked=1,this.a.setAttribute("class","activeachievement"),this.b.style.display="grid",this.e.style.display="none",Game.Progress.AchievementsSave()}Show(){this.a.setAttribute("class","hide"),this.a.style.display="grid",setTimeout(()=>{this.a.setAttribute("class","show")},200)}Hide(){this.a.style.display="none"}}class Scene{constructor(t){this.text=t.text||"",this.buttontext=t.buttontext,this.buttonaction=t.buttonaction,this.buttonactive=t.buttonactive,this.background=t.background||"",this.condition=t.condition}Begin(){LastSlide.add(this),setTimeout(()=>{Game.LastSave.Save(this)},250),""==this.background?PictureField.style.display="none":(PictureField.src="pictures/"+this.background+".png",PictureField.style.display="block"),this.condition&&this.condition(),TextField.innerHTML=this.text.replace("$\u0418\u043C\u044F \u0418\u0433\u0440\u043E\u043A\u0430$",Game.PlayerName),this.InterfaceChecker()}InterfaceChecker(){this.HideUnusableButtons(),this.HideOnlyButton(),this.SetButtonValues(),this.HidePicture()}HideUnusableButtons(){for(let t=0;5>t;t++){document.getElementById(`b0${t}`).setAttribute("class","fade-in"),setTimeout(()=>{document.getElementById(`b0${t}`).setAttribute("class","show")},1e3);try{this.buttontext[t]==null||""==this.buttontext[t]?document.getElementById(`b0${t}`).style.display="none":(document.getElementById(`b0${t}`).style.display="block",!1==this.buttonactive[t]&&(document.getElementById(`b0${t}`).style.display="none"))}catch(t){}}}SetButtonValues(){for(let t=0;t<this.buttontext.length;t++)document.getElementById(`b0${t}`).innerHTML=this.buttontext[t],document.getElementById(`b0${t}`).onclick=this.buttonaction[t],28>=document.getElementById(`b0${t}`).textContent.length?(document.getElementById(`b0${t}`).style.height="6vh",document.getElementById(`b0${t}`).style.backgroundSize="100% 6.1vh"):(document.getElementById(`b0${t}`).style.height="7.8vh",document.getElementById(`b0${t}`).style.backgroundSize="105% 9.1vh")}HideOnlyButton(){1==this.buttontext.length&&""==this.buttontext[0]&&""==this.background&&(TextField.onclick=this.buttonaction[0],TextField.setAttribute("style","padding-top: 180px; height: 100%"),document.getElementById(`b00`).style.display="none"),1==this.buttontext.length&&""==this.buttontext[0]&&""!=this.background&&(TextField.onclick=this.buttonaction[0],TextField.setAttribute("style","padding-top: 0; height: 100%"),document.getElementById(`b00`).style.display="none"),2<=this.buttontext.length&&""==this.background&&(TextField.onclick=()=>{},TextField.setAttribute("style","padding-top: 150px; height: auto"),document.getElementById(`b00`).style.vdisplay="block"),2<=this.buttontext.length&&""!=this.background&&(TextField.onclick=()=>{},TextField.setAttribute("style","padding-top: 0; height: auto"),document.getElementById(`b00`).style.vdisplay="block")}Deactivate(t){this.buttonactive[t]=!1}Activate(t){this.buttonactive[t]=!0}HidePicture(){""==this.background?(PictureField.style.display="none",BorderField.style.display="none"):(PictureField.style.display="block",BorderField.style.display="block",BorderField.setAttribute("class","fade-in"),TextField.setAttribute("class","fade-in"),setTimeout(()=>{TextField.setAttribute("class","show")},1e3))}}class Stat{constructor(t){this.name=t.name||"",this.attitude=t.attitude||0,this.title=t.title||"",this.text=t.text||"",this.type=t.type||"Person",this.picture=t.picture||"",this.show=t.show||!1,this.story=t.story,this.CreateTable()}Add(t){InfoPicture.setAttribute("class","hide"),InfoText.setAttribute("class","hide"),InfoArticle.setAttribute("class","hide"),"Choice"!=this.type&&OpenInventoryButton.setAttribute("class","blink"),this.show=!0,this.attitude+=t,"Choice"==this.type&&Game.SendData("\u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 "+this.name+": "+this.attitude),""!=this.picture&&(this.container.style.display="inline-block","Person"==this.type&&this.SetEmoji(),"Item"==this.type&&this.SetAmount()),"Item"==this.type&&0>=this.attitude&&(this.container.style.display="none")}Set(t){this.attitude=t,this.Add(0)}SetName(t){this.name=t,this.SetEmoji()}Get(){return this.attitude}CreateTable(){""!=this.picture&&(this.container=document.createElement("cont"),this.container.id="atttablecell",this.container.style.display="none",this.textinfo=document.createElement("te"),this.cell=document.createElement("img"),this.container.appendChild(this.cell),this.container.appendChild(this.textinfo),this.cell.src="pictures/"+this.picture+".png","Person"==this.type&&(this.cell.id="atttablecellpict",AttitudeTableField.appendChild(this.container)),"Item"==this.type&&(this.cell.id="itemtablecellpict",Inventory.appendChild(this.container)),this.container.addEventListener("click",()=>{setTimeout(()=>{InfoPicture.setAttribute("class","show"),InfoText.setAttribute("class","show"),InfoArticle.setAttribute("class","show")},0),setTimeout(()=>{InfoPicture.src="pictures/"+this.picture+".png",InfoPicture.setAttribute("class","typewriter"),InfoText.setAttribute("class","typewriter"),InfoArticle.setAttribute("class","typewriter"),InfoText.innerHTML=this.title,InfoArticle.innerHTML="<hr>"+this.text},5)}))}SetEmoji(){-1>=this.attitude&&(this.textinfo.innerHTML="<emoji>\uD83D\uDE41</emoji><a>"+this.name),0==this.attitude&&(this.textinfo.innerHTML="<emoji>\uD83D\uDE36</emoji><a>"+this.name),1<=this.attitude&&(this.textinfo.innerHTML="<emoji>\uD83D\uDE0C</emoji><a>"+this.name),6<=this.attitude&&(this.textinfo.innerHTML="<emoji>\uD83D\uDE0F</emoji><a>"+this.name),10<=this.attitude&&(this.textinfo.innerHTML="<emoji>\uD83E\uDD70</emoji><a>"+this.name)}SetAmount(){this.textinfo.innerHTML=2<=this.attitude?"<amount>"+this.attitude+"</amount><a>"+this.name:"<amount></amount><a>"+this.name}Hide(){try{this.attitude=0,this.container.style.display="none"}catch(t){}}}class Story{constructor(t){this.pict=t.pict,this.chapters=t.chapters,this.Init()}Init(){this.story=document.createElement("part"),this.img=document.createElement("img"),this.img.src="pictures/"+this.pict+".png",this.story.onclick=()=>{ChapterField.innerHTML="",this.BuildChapters()},StoriesField.appendChild(this.story),this.story.appendChild(this.img)}BuildChapters(){this.backbutton=document.createElement("button"),this.backbutton.onclick=()=>{CloseOpen(ChapterField,StoriesField),ChapterField.innerHTML="",this.backbutton.remove()},ChapterField.appendChild(this.backbutton);for(let t=0;t<this.chapters.length;t++)this.chapters[t].Init(),CloseOpen(StoriesField,ChapterField)}}class Chapter{constructor(t){this.name=t.name,this.pict=t.pict,this.parts=t.parts}Init(){this.chapter=document.createElement("part"),this.img=document.createElement("img"),this.img.src="pictures/"+this.pict+".png",this.button=document.createElement("button"),this.button.innerText=this.name,this.chapter.onclick=()=>{this.BuildParts()},ChapterField.appendChild(this.chapter),this.chapter.appendChild(this.img),this.chapter.appendChild(this.button)}BuildParts(){this.backbutton=document.createElement("button"),this.backbutton.onclick=()=>{CloseOpen(PartField,ChapterField),PartField.innerHTML="",this.backbutton.remove()},PartField.appendChild(this.backbutton),CloseOpen(ChapterField,PartField);for(var t=0;t<this.parts.length;t++)("1"==localStorage.getItem(this.parts[t].code+"_Played")||null!=localStorage.getItem(this.parts[t].code+"_God")||0===t)&&(this.parts[t].part=document.createElement("part"),this.parts[t].img=document.createElement("img"),this.parts[t].img.src="pictures/"+this.parts[t].pict+".png",this.parts[t].button=document.createElement("button"),this.parts[t].button.innerText=this.parts[t].name,this.parts[t].part.onclick=this.parts[t].event,PartField.appendChild(this.parts[t].part),this.parts[t].part.appendChild(this.parts[t].img),this.parts[t].part.appendChild(this.parts[t].button))}}class Part{constructor(t){this.name=t.name,this.pict=t.pict,this.code=t.code,this.event=t.event}}Game.AskName=function(t){this.checkname=()=>{this.name=this.input.value,1>=this.name.length?this.text.innerText="\u041D\u0435 \u043C\u0435\u043D\u0435\u0435 2 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432!":15<=this.name.length?this.text.innerText="\u041C\u0430\u043A\u0441\u0438\u043C\u0443\u043C 15 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432!":/^[а-яё]*$/i.test(this.name)?(Game.PlayerName=this.name,t(),MainField.style.display="block",this.im.remove(),Game.SendData("\u0443\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0435\u0442 \u043D\u043E\u0432\u043E\u0435 \u0438\u043C\u044F"),localStorage.setItem("PlayerName",Game.PlayerName)):this.text.innerText="\u0422\u043E\u043B\u044C\u043A\u043E \u0440\u0443\u0441\u0441\u043A\u0438\u0435 \u0431\u0443\u043A\u0432\u044B!"},MainField.style.display="none",this.action=t,this.im=document.createElement("im"),this.text=document.createElement("p"),this.text.innerText="\u041A\u0430\u043A \u043C\u0435\u043D\u044F \u0437\u043E\u0432\u0443\u0442?",this.input=document.createElement("input"),this.button=document.createElement("button"),this.button.innerHTML="\u041F\u0440\u0438\u043D\u044F\u0442\u044C",this.button.onclick=this.checkname,document.body.appendChild(this.im),this.im.appendChild(this.text),this.im.appendChild(this.input),this.im.appendChild(this.button)},Game.Design.ChangeInterface=function(t,e,n,o,c){MainField.style.backgroundImage="url(pictures/Interface/"+t+".png)",BorderField.src="pictures/Interface/"+e+".png";let i=document.querySelector(":root");i.style.setProperty("--simplecolor",n),i.style.setProperty("--font",o),i.style.setProperty("--stroke",c)},Game.Design.Change=function(t){switch(localStorage.setItem("LastSave_Design",t),t){default:Game.Design.ChangeInterface("back","border","#f2daffed","\"Times New Roman\", Times, serif","0"),Game.Design.StyleButtons("margin-top: 0","background-image: url(\"./pictures/Interface/button.png\"); border: 0; box-shadow: 0;");break;case"Aurora":Game.Design.ChangeInterface("A_back","A_border","white","Century Gothic Regular","0"),Game.Design.StyleButtons("margin-top: 0","background-image: url(\"./pictures/Interface/button.png\"); border: 0; box-shadow: 0;");break;case"AEP":Game.Design.ChangeInterface("R_back","R_border","white","Courier New","3px rgba(0, 208, 255, 0.2)"),Game.Design.StyleButtons("margin-top: 20px","background-image: none; border: 1px blue solid; box-shadow: 0 0 5px blue, inset 0 0 5px blue");}},Game.Design.StyleButtons=function(t,e){let n=document.querySelector("#bf");n.style=t,n.childNodes.forEach(function(t){t.style=e})};const Editor={};Editor.AddNewScene=function(){for(container=document.createElement("scenenode"),container.appendChild(scenenumberinfo=document.createElement("p")),scenenumberinfo.innerHTML="\u041D\u043E\u043C\u0435\u0440 \u0441\u0446\u0435\u043D\u044B",container.appendChild(scenenumber=document.createElement("textarea")),scenenumber.setAttribute("class","ednumb"),container.appendChild(sceneimgsrcinfo=document.createElement("p")),sceneimgsrcinfo.innerHTML="\u0414\u0438\u0440\u0435\u043A\u0442\u043E\u0440\u0438\u044F \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0438",container.appendChild(sceneimgsrc=document.createElement("select")),sceneimgsrc.appendChild(document.createElement("option")),sceneimgsrc.lastChild.innerHTML="-",k=0;k<PrechachedImages.length;k++)sceneimgsrc.appendChild(document.createElement("option")),sceneimgsrc.lastChild.innerHTML=PrechachedImages[k];sceneimgsrc.onchange=()=>{sceneimg.src="pictures/"+sceneimgsrc.value+".png"},container.appendChild(sceneimg=document.createElement("img")),container.appendChild(scenetextinfo=document.createElement("p")),scenetextinfo.innerHTML="\u0422\u0435\u043A\u0441\u0442 \u0441\u043B\u0430\u0439\u0434\u0430",container.appendChild(scenetext=document.createElement("textarea")),scenetext.setAttribute("class","edtex"),container.appendChild(scenebutton01textinfo=document.createElement("p")),scenebutton01textinfo.innerHTML="\u0422\u0435\u043A\u0441\u0442 \u043A\u043D\u043E\u043F\u043A\u0438 1",container.appendChild(scenebutton01=document.createElement("textarea")),container.appendChild(scenebutton01actinfo=document.createElement("p")),scenebutton01actinfo.innerHTML="\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438",container.appendChild(scenebutton01act=document.createElement("textarea")),container.appendChild(scenebutton01actvinfo=document.createElement("p")),scenebutton01actvinfo.innerHTML="\u0421\u043A\u0440\u044B\u0442\u044C \u043A\u043D\u043E\u043F\u043A\u0443?",container.appendChild(scenebutton01actv=document.createElement("textarea")),container.appendChild(document.createElement("hr")),container.appendChild(scenebutton02textinfo=document.createElement("p")),scenebutton02textinfo.innerHTML="\u0422\u0435\u043A\u0441\u0442 \u043A\u043D\u043E\u043F\u043A\u0438 2",container.appendChild(scenebutton02=document.createElement("textarea")),container.appendChild(scenebutton02actinfo=document.createElement("p")),scenebutton02actinfo.innerHTML="\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438",container.appendChild(scenebutton02act=document.createElement("textarea")),container.appendChild(scenebutton02actvinfo=document.createElement("p")),scenebutton02actvinfo.innerHTML="\u0421\u043A\u0440\u044B\u0442\u044C \u043A\u043D\u043E\u043F\u043A\u0443?",container.appendChild(scenebutton02actv=document.createElement("textarea")),container.appendChild(document.createElement("hr")),container.appendChild(scenebutton03textinfo=document.createElement("p")),scenebutton03textinfo.innerHTML="\u0422\u0435\u043A\u0441\u0442 \u043A\u043D\u043E\u043F\u043A\u0438 3",container.appendChild(scenebutton03=document.createElement("textarea")),container.appendChild(scenebutton03actinfo=document.createElement("p")),scenebutton03actinfo.innerHTML="\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438",container.appendChild(scenebutton03act=document.createElement("textarea")),container.appendChild(scenebutton03actvinfo=document.createElement("p")),scenebutton03actvinfo.innerHTML="\u0421\u043A\u0440\u044B\u0442\u044C \u043A\u043D\u043E\u043F\u043A\u0443?",container.appendChild(scenebutton03actv=document.createElement("textarea")),container.appendChild(document.createElement("hr")),container.appendChild(scenebutton04textinfo=document.createElement("p")),scenebutton04textinfo.innerHTML="\u0422\u0435\u043A\u0441\u0442 \u043A\u043D\u043E\u043F\u043A\u0438 4",container.appendChild(scenebutton04=document.createElement("textarea")),container.appendChild(scenebutton04actinfo=document.createElement("p")),scenebutton04actinfo.innerHTML="\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438",container.appendChild(scenebutton04act=document.createElement("textarea")),container.appendChild(scenebutton04actvinfo=document.createElement("p")),scenebutton04actvinfo.innerHTML="\u0421\u043A\u0440\u044B\u0442\u044C \u043A\u043D\u043E\u043F\u043A\u0443?",container.appendChild(scenebutton04actv=document.createElement("textarea")),container.appendChild(document.createElement("hr")),container.appendChild(scenebutton05textinfo=document.createElement("p")),scenebutton05textinfo.innerHTML="\u0422\u0435\u043A\u0441\u0442 \u043A\u043D\u043E\u043F\u043A\u0438 5",container.appendChild(scenebutton05=document.createElement("textarea")),container.appendChild(scenebutton05actinfo=document.createElement("p")),scenebutton05actinfo.innerHTML="\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438",container.appendChild(scenebutton05act=document.createElement("textarea")),container.appendChild(scenebutton05actvinfo=document.createElement("p")),scenebutton05actvinfo.innerHTML="\u0421\u043A\u0440\u044B\u0442\u044C \u043A\u043D\u043E\u043F\u043A\u0443?",container.appendChild(scenebutton05actv=document.createElement("textarea")),container.appendChild(document.createElement("hr")),container.appendChild(sceneadd=document.createElement("p")),sceneadd.setAttribute("class","addscene"),EditorField.appendChild(container),sceneadd.innerHTML="\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0446\u0435\u043D\u0443",sceneadd.onclick=()=>{EditorGenerated.value+=`
        Game.Scenes.Mod[${scenenumber.value}] =
    new Scene({
        text: '${scenetext.value}',
        buttontext: [
            ${"'"+Editor.ReturnButtonText(scenebutton01.value)+"'"}
            ${Editor.ReturnButtonText(scenebutton02.value)}
            ${Editor.ReturnButtonText(scenebutton03.value)}
            ${Editor.ReturnButtonText(scenebutton04.value)}
            ${Editor.ReturnButtonText(scenebutton05.value)}

        ],
        background: '${Editor.ReturnPictValue(sceneimgsrc.value)}',
        buttonaction: [
            ${Editor.ReturnButtonAction(scenebutton01act.value)}
            ${Editor.ReturnButtonAction(scenebutton02act.value)}
            ${Editor.ReturnButtonAction(scenebutton03act.value)}
            ${Editor.ReturnButtonAction(scenebutton04act.value)}
            ${Editor.ReturnButtonAction(scenebutton05act.value)}
        ],

    });`,EditorGenerated.value=EditorGenerated.value.replace("$\u041F\u0435\u0440\u0435\u0439\u0442\u0438-","Game.Scenes.Mod["),EditorGenerated.value=EditorGenerated.value.replace("-\u041F\u0435\u0440\u0435\u0439\u0442\u0438$","].Begin();"),EditorGenerated.value=EditorGenerated.value.replace("$\u0422\u0430\u0431\u043B\u0438\u0447\u043A\u0430-","Game.Message(\""),EditorGenerated.value=EditorGenerated.value.replace("-\u0422\u0430\u0431\u043B\u0438\u0447\u043A\u0430$","\");"),EditorGenerated.value=EditorGenerated.value.replace("$\u041E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F-","Game.Attitudes."),EditorGenerated.value=EditorGenerated.value.replace("$\u041A\u043E\u043B\u0432\u043E-",".Add("),EditorGenerated.value=EditorGenerated.value.replace("-\u041E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F$",");"),container.remove()},Editor.ReturnButtonText=function(t){return""==t?"":"\""+t+"\","},Editor.ReturnButtonAction=function(t){return""==t?"":"() => {"+t+"},"}},Editor.ReturnPictValue=function(t){return"-"==t?"":t},Game.Effects.Flash=function(){MainField.setAttribute("class","flash"),setTimeout(()=>{MainField.setAttribute("class","")},5e3)},Game.Effects.Disco=function(){PictureField.setAttribute("class","disco")},Game.Effects.Disco.Stop=function(){PictureField.setAttribute("class","")},Game.Effects.Gray=function(){MainField.setAttribute("class","sad")},Game.Effects.Gray.Stop=function(){MainField.setAttribute("class","")},Game.Effects.Mem=function(){MainField.setAttribute("class","memory")},Game.Effects.Mem.Stop=function(){MainField.setAttribute("class","")},Game.Effects.DisableAll=function(){Game.Effects.Gray.Stop(),Game.Effects.Disco.Stop()};const PP=document.getElementById("PP"),Disclaimer=document.getElementById("disc"),AcceptPolicyButton=document.getElementById("ap");AcceptPolicyButton.onclick=()=>{localStorage.setItem("PPAccepted","1"),window.location.reload()};const StartGameLoadingProgress=document.getElementById("StartGameLoadingProgress"),StartGameLoadingPercent=document.getElementById("percent"),MenuField=document.getElementById("me"),ContinueButton=document.getElementById("continuebutton");ContinueButton.onclick=()=>{CloseOpen(MenuField,MainField),Game.Sounds.ResumeAll()};const LastSaveButton=document.getElementById("lastsavebutton"),StoriesField=document.getElementById("stories"),StoriesBackButton=document.getElementById("storiesbackbutton");StoriesBackButton.onclick=()=>{CloseOpen(StoriesField,MenuField)};const SavesButton=document.getElementById("saves");SavesButton.onclick=()=>{CloseOpen(MenuField,StoriesField)};const PartField=document.getElementById("partf"),ChapterField=document.getElementById("cf"),SettingsButton=document.getElementById("settingsb");SettingsButton.onclick=()=>{CloseOpen(MenuField,SettingsField)};const AcceptSettingsButton=document.getElementById("acptsett");AcceptSettingsButton.onclick=()=>{CloseOpen(SettingsField,MenuField),Game.Settings.Set()};const SettingsField=document.getElementById("sf"),SoundInput=document.getElementById("SI"),AutomatiallyHideAlert=document.getElementById("AHA"),ZoomInput=document.getElementById("ZI");ZoomInput.onchange=()=>{document.body.style.zoom=ZoomInput.value+"%"};const DeleteSavedButton=document.getElementById("dsb");DeleteSavedButton.onclick=()=>{localStorage.clear(),location.reload()};const AchievementsButton=document.getElementById("achb");AchievementsButton.onclick=()=>{CloseOpen(MenuField,AchievementsField),AchievementsBackButton.onclick=()=>{CloseOpen(AchievementsField,MenuField)}};const AchievementsBackButton=document.getElementById("achbb");AchievementsBackButton.onclick=()=>{CloseOpen(AchievementsField,MenuField)};const AchievementsImmortals=document.getElementById("achievs_immortals");AchievementsImmortals.onclick=()=>{Game.ShowCategoryAchievements("Immortals")};const AchievementsAurora=document.getElementById("achievs_aurora");AchievementsAurora.onclick=()=>{Game.ShowCategoryAchievements("Aurora")};const AchievementsField=document.getElementById("achievs"),AchievementsAmount=document.getElementById("achievsamount"),CreatorsField=document.getElementById("creators"),CreatorsButton=document.getElementById("crb");CreatorsButton.onclick=()=>{CloseOpen(MenuField,CreatorsField)};const CreatorsBackButton=document.getElementById("cbb");CreatorsBackButton.onclick=()=>{CloseOpen(CreatorsField,MenuField)};const RTemiyHiddenButton=document.getElementById("RTemiy");RTemiyHiddenButton.onclick=()=>{ConsoleField.style.visibility="visible",Game.Achievements.Dev.Unlock()};const LoadingScreen=document.getElementById("ls"),LoadingBack=document.getElementById("loadback"),LoadingBackBack=document.getElementById("loadbackback"),LoadingTip=document.getElementById("loadtip"),LoadingText=document.getElementById("loadtext"),MainField=document.getElementById("mf"),LastSlideButton=document.getElementById("lsb");LastSlideButton.onclick=()=>{Game.Message("",!0)};const OpenInventoryButton=document.getElementById("goinv");OpenInventoryButton.onclick=()=>{Game.ShowCategoryAchievements(localStorage.getItem("LastSave_Design")),InventoryField.style.display="flex",InventoryField.setAttribute("class","fade-in"),OpenInventoryButton.setAttribute("class","")};const GoAchievementsButton=document.getElementById("goach");GoAchievementsButton.onclick=()=>{CloseOpen(MainField,AchievementsField),InventoryField.setAttribute("class","fade-out"),AchievementsBackButton.onclick=()=>{CloseOpen(AchievementsField,MainField)}};const LeaveInventoryButton=document.getElementById("leaveinv");LeaveInventoryButton.onclick=()=>{InventoryField.setAttribute("class","fade-out"),setTimeout(()=>{InventoryField.style.display="none"},1e3)};const InventoryMessage=document.getElementById("inv_mes"),MessageField=document.getElementById("message"),MessageText=document.getElementById("messagetext"),PictureField=document.getElementById("pf"),BorderField=document.getElementById("brf"),TextField=document.getElementById("tf"),TimerProgressBar=document.getElementById("timerP"),ButtonField=document.getElementById("bf"),InventoryField=document.getElementById("if"),Inventory=document.getElementById("inv"),AttitudeTableField=document.getElementById("atttable"),InfoPicture=document.getElementById("infoi"),InfoText=document.getElementById("infop"),InfoArticle=document.getElementById("infot"),BackToMenuButton=document.getElementById("backmb");BackToMenuButton.onclick=()=>{CloseOpen(MainField,MenuField),ContinueButton.style.display="block",InventoryField.setAttribute(`class`,`fade-out`),Game.Sounds.PauseAll(),LastSaveButton.style.display="none"};const ConsoleField=document.getElementById("consolefield"),Console=document.getElementById("console"),EditorField=document.getElementById("editor"),EditorBackButton=document.getElementById("editorback");EditorBackButton.onclick=()=>{CloseOpen(EditorField,MenuField)};const EditorNewButton=document.getElementById("editornew");EditorNewButton.onclick=()=>{Editor.AddNewScene()};const EditorLoadButton=document.getElementById("editorload");EditorLoadButton.onclick=()=>{EditorGenerated.value=localStorage.getItem("MOD")};const EditorStartButton=document.getElementById("editorstart");EditorStartButton.onclick=()=>{CloseOpen(EditorField,MainField),Game.Scenes.Mod[0].Begin()};const EditorSaveButton=document.getElementById("editorsave");EditorSaveButton.onclick=()=>{eval(EditorGenerated.value),localStorage.setItem("MOD",EditorGenerated.value)};const EditorGenerated=document.getElementById("editorgenerated");CloseOpen=function(t,e){t.style.display="none",e.style.display="block"},Console.addEventListener("keypress",function(event){"Enter"===event.key&&(event.preventDefault(),eval("Game."+Console.value),Console.value="")}),Game.Inventory_Message=function(t){InventoryMessage.innerHTML="<a>\u2800"+t,InventoryMessage.setAttribute("class","inv_mes_show"),setTimeout(()=>{InventoryMessage.setAttribute("class","")},3e3)},Game.LastSave.Save=function(t){Game.Progress.Save("LastSave"),localStorage.setItem("LastSave_Played","1"),localStorage.setItem("LastSave_SlideNumber",t.number),localStorage.setItem("LastSave_SlidePart",t.part)},Game.LastSave.Load=function(){Game.Progress.Load("LastSave"),Game.Sounds.Play("Music",localStorage.getItem("LastSave_MusicName")),Game.Design.Change(localStorage.getItem("LastSave_Design")),Game.LoadScreen(localStorage.getItem("LastSave_LS")),Game.Scenes[localStorage.getItem("LastSave_SlidePart")][localStorage.getItem("LastSave_SlideNumber")].Begin()},Game.LastLoadCheck=function(){"1"==localStorage.getItem("LastSave_Played")?LastSaveButton.onclick=function(){Game.LastSave.Load(),CloseOpen(MenuField,MainField),LastSaveButton.style.display="none"}:LastSaveButton.style.display="none"};let LastSlide={};LastSlide.lastslide=[],LastSlide.add=function(t){this.lastslide.push(t)},LastSlide.text=function(){return this.lastslide[this.lastslide.length-2].text},LastSlide.background=function(){if(2<this.lastslide.length)return this.lastslide[this.lastslide.length-2].background},Game.Settings.Launch=function(){document.addEventListener("contextmenu",t=>t.preventDefault()),"1"==localStorage.getItem("PPAccepted")?(Game.SendData("\u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u0442 \u0438\u0433\u0440\u0443"),Game.Settings.Load(),Game.Progress.AchievementsLoad(),Game.SetSceneNumbers(),Game.ShowCategoryAchievements("Immortals"),Game.LastLoadCheck(),Game.LoadPictures(function(){StartGameLoadingProgress.setAttribute("class","fade-out"),StartGameLoadingPercent.setAttribute("class","fade-out"),setTimeout(()=>{document.getElementsByTagName("disc")[0].setAttribute("class","fade-out"),setTimeout(()=>{document.getElementsByTagName("disc")[0].style.display="none",MenuField.style.display="block"},1e3)},1e3)})):(PP.style.display="block",Disclaimer.style.display="none",MenuField.style.visibility="hidden",localStorage.setItem("Settings.FirstLaunch","false"),Game.Settings.Set())},window.onload=function(){Game.Settings.Launch()},Game.ShowMeFeatures=function(){Game.Scenes.Features[0].Begin()},Game.LoadScreen=function(t){localStorage.setItem("LastSave_LS",t),LastSlide.lastslide=[],setTimeout(()=>{LoadingTip.innerHTML="",LoadingBack.src="",t==null&&(t="chapter"),LoadingBack.src="pictures/Covers/"+t+".png",LoadingBackBack.src="pictures/Covers/"+t+".png",LoadingScreen.style.zIndex="3",setTimeout(()=>{PartField.innerHTML="",PartField.style.display="none",MainField.setAttribute("class","hide"),setTimeout(()=>{LoadingScreen.style.display="block",LoadingScreen.setAttribute("class","show"),MainField.style.display="none"},1e3),setTimeout(()=>{LoadingTip.innerHTML="<p class=\"fade-ina\">\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",LoadingScreen.onclick=()=>{AndroidApp("showAd"),setTimeout(()=>{LoadingScreen.setAttribute("class","hide")},1e3),setTimeout(()=>{LoadingScreen.style.display="none",MainField.setAttribute("class","show"),MainField.style.display="block"},2e3),LoadingScreen.onclick=()=>{}}},6e3)},0)},0)},Game.MemoryUsed=function(){let t="";for(let e in window.localStorage)window.localStorage.hasOwnProperty(e)&&(t+=window.localStorage[e]);Game.Message(Math.floor(3+16*t.length/8192)+"\u043A\u0431 \u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u043E")},Game.Message=function(t,e){if(MessageText.innerHTML=t.replace("$\u0418\u043C\u044F \u0418\u0433\u0440\u043E\u043A\u0430$",Game.PlayerName),e?(MessageText.innerHTML=LastSlide.text(),MessageField.setAttribute("class","hide"),MessageField.style.display="block",setTimeout(()=>{MessageField.setAttribute("class","show")},100)):(setTimeout(()=>{MessageField.setAttribute("class","slide-in-right")},0),setTimeout(()=>{MessageField.style.display="block"},100),Game.Sounds.NS.play()),this.hideelem=()=>{MessageField.setAttribute("class","slide-out-right"),setTimeout(()=>{MessageField.style.display="none"},1e3)},clearTimeout(n),MessageField.onclick=this.hideelem,!0==Game.Settings.AutomatiallyHideAlert)var n=setTimeout(()=>{MessageField.setAttribute("class","slide-out-right"),setTimeout(()=>{MessageField.style.display="none"},1e3)},5e3)};let PrechachedImages=[];Game.LoadPictures=function(t){let e=[],n=0,o=0;const c=function(t){e[i]=document.createElement("img"),e[i].style.display="none",e[i].src="pictures/"+t+".png",document.body.appendChild(e[i]),n++,e[i].onload=function(){o++,StartGameLoadingProgress.setAttribute("value",o),StartGameLoadingPercent.innerText=Math.floor(100*(o/PrechachedImages.length))+"%",PrechachedImages[o]==null||c(PrechachedImages[o])}};for(let e in Game.Scenes)for(var i=0;i<Game.Scenes[e].length;i++)if(Game.Scenes[e][i]==null||""==Game.Scenes[e][i].background);else PrechachedImages.push(Game.Scenes[e][i].background);for(let e in Game.Stats)if(Game.Stats[e].picture==null||""==Game.Stats[e].picture);else PrechachedImages.push(Game.Stats[e].picture);for(var i=0;i<Game.Stories.length;i++){PrechachedImages.push(Game.Stories[i].pict);for(var s=0;s<Game.Stories[i].chapters.length;s++){PrechachedImages.push(Game.Stories[i].chapters[s].pict);for(var u=0;u<Game.Stories[i].chapters[s].parts.length;u++)PrechachedImages.push(Game.Stories[i].chapters[s].parts[u].pict),PrechachedImages.push("Covers/"+Game.Stories[i].chapters[s].parts[u].code)}}for(var r=0;r<PrechachedImages.length;r++)for(var d=r+1;d<PrechachedImages.length;d++)PrechachedImages[r]==PrechachedImages[d]&&(PrechachedImages.splice(d,1),d--);PrechachedImages.sort(),c(PrechachedImages[0]),StartGameLoadingProgress.setAttribute("max",PrechachedImages.length),this.Check=function(){PrechachedImages.length==o?t():setTimeout(()=>{this.Check()},1e3)},this.Check()},Game.Progress.Save=function(t){(Game.PlayerName!=null||""!=Game.PlayerName)&&localStorage.setItem("PlayerName",Game.PlayerName),localStorage.setItem(t+"_Played","1");let e=localStorage.getItem("LastSave_Design");for(let n in Game.Stats)Game.Stats[n].story==e&&(localStorage.setItem(t+"_"+n+"_show",Game.Stats[n].show),localStorage.setItem(t+"_"+n,Game.Stats[n].attitude))},Game.Progress.Load=function(t){Game.HideAllAttitudes();let e=localStorage.getItem("LastSave_Design");for(let n in(""!=localStorage.getItem("PlayerName")||null!=localStorage.getItem("PlayerName"))&&(Game.PlayerName=localStorage.getItem("PlayerName")),Game.Stats)Game.Stats[n].story==e&&"true"==localStorage.getItem(t+"_"+n+"_show")&&Game.Stats[n].Set(parseInt(localStorage.getItem(t+"_"+n)))},Game.Progress.AchievementsSave=function(){for(let t in Game.Achievements)localStorage.setItem("Achievement_"+t,Game.Achievements[t].unlocked)},Game.Progress.AchievementsLoad=function(){for(let t in Game.Achievements)Game.AllAchievs++,"1"==localStorage.getItem("Achievement_"+t)&&(Game.Achievements[t].unlocked=1);for(var t in Game.Achievements)1==Game.Achievements[t].unlocked&&Game.Achievements[t].Unlock()},Game.SetSceneNumbers=function(){for(let t in Game.Scenes)for(let e=0;e<Game.Scenes[t].length;e++)null!=Game.Scenes[t][e]&&(Game.Scenes[t][e].number=e,Game.Scenes[t][e].part=t)};const scriptURL="https://script.google.com/macros/s/AKfycbwkdBBtRSVcRisbB7pJubWxpx0GKRrag7R2oT4ecScLpCAmGJVXkrwBlEZEeX74pwVlNg/exec",form=document.forms["submit-to-google-sheet"];form.addEventListener("submit",t=>{t.preventDefault(),fetch(scriptURL,{method:"POST",body:new FormData(form)}).then(()=>console.log()).catch(()=>console.error())}),Game.SendData=function(t){let e=new Date,n=(e.getDate()+"").padStart(2,"0"),o=(e.getMonth()+1+"").padStart(2,"0"),c=e.getFullYear(),i=e.getHours()+":"+e.getMinutes()+":"+e.getSeconds();e=n+"."+o+"."+c,document.getElementById("#1").setAttribute("value",localStorage.getItem("PlayerName")),document.getElementById("#2").setAttribute("value",e),document.getElementById("#3").setAttribute("value",t),document.getElementById("#4").setAttribute("value",i),document.getElementById("#5").setAttribute("value",Intl.DateTimeFormat().resolvedOptions().timeZone),document.getElementById("#button").click()};function AndroidApp(t){try{if(Game.canShowAds)javascript:return AndroidFunction[t]();else Game.canShowAds=!0}catch(t){}}Game.Settings.AutomatiallyHideAlert=!0,Game.Settings.Volume=.7,Game.Settings.Zoom=100,Game.Settings.Set=function(){Game.Settings.SetVolume(SoundInput.value),Game.Settings.AutomatiallyHideAlert=AutomatiallyHideAlert.checked,Game.Settings.Zoom=ZoomInput.value,document.body.style.zoom=Game.Settings.Zoom+"%",localStorage.setItem("Settings.Volume",Game.Settings.Volume),localStorage.setItem("Settings.AHA",Game.Settings.AutomatiallyHideAlert),localStorage.setItem("Settings.Zoom",Game.Settings.Zoom)},Game.Settings.SetVolume=function(t){Game.Settings.Volume=t,Game.Sounds.NS.volume=Game.Settings.Volume,Game.Sounds.Music.volume=Game.Settings.Volume,Game.Sounds.Ambient.volume=Game.Settings.Volume,Game.Timer.Sound.volume=Game.Settings.Volume},Game.Settings.Load=function(){AutomatiallyHideAlert.checked=!!localStorage.getItem(!1),SoundInput.value=localStorage.getItem("Settings.Volume"),Game.Settings.Set()},Game.Sounds.Ambient=new Audio("sounds/Silence.mp3"),Game.Sounds.Music=new Audio("sounds/Silence.mp3"),Game.Sounds.NS=new Audio("sounds/noti.mp3"),Game.Sounds.Cheers=new Audio("sounds/Completed.mp3"),Game.Sounds.Play=function(t,e){if(localStorage.setItem("LastSave_MusicName",e),0!=Game.Settings.Volume){let e=setInterval(()=>{Game.Sounds[t].volume-=.1},100);setTimeout(()=>{clearInterval(e)},700)}setTimeout(()=>{Game.Sounds[t].pause(),Game.Sounds[t]=new Audio("sounds/"+e+".mp3"),Game.Sounds[t].currentTime=0,Game.Sounds[t].loop=!0,Game.Sounds[t].volume=Game.Settings.Volume,Game.Sounds[t].play()},800)},Game.Sounds.Stop=function(t){Game.Sounds[t].currentTime=0,Game.Sounds[t].pause(),Game.Sounds[t]=new Audio("sounds/Silence.mp3")},Game.Sounds.PauseAll=function(){Game.Sounds.Ambient.pause(),Game.Sounds.Music.pause()},Game.Sounds.ResumeAll=function(){Game.Sounds.Ambient.play(),Game.Sounds.Music.play()},Game.Timer.Sound=new Audio("sounds/timer.mp3"),Game.Timer.Sound.loop=!0,Game.Timer.Set=function(t,e){Game.Timer.Stop(),Game.Timer.Sound.volume=Game.Settings.Volume,Game.Timer.Sound.play(),TimerProgressBar.style.display="block",Game.Timer.SettingsInterval=setInterval(()=>{TimerProgressBar.value-=TimerProgressBar.max/t/100},10),Game.Timer.Settings=setTimeout(()=>{e(),Game.Timer.Stop()},1e3*t)},Game.Timer.Stop=function(){Game.Timer.Sound.pause(),TimerProgressBar.value=100,TimerProgressBar.style.display="none",clearInterval(Game.Timer.SettingsInterval),clearTimeout(Game.Timer.Settings)};let alreadyturnedoff=!1,hidden,visibilityChange;"undefined"==typeof document.hidden?"undefined"==typeof document.mozHidden?"undefined"==typeof document.msHidden?"undefined"!=typeof document.webkitHidden&&(hidden="webkitHidden",visibilityChange="webkitvisibilitychange"):(hidden="msHidden",visibilityChange="msvisibilitychange"):(hidden="mozHidden",visibilityChange="mozvisibilitychange"):(hidden="hidden",visibilityChange="visibilitychange"),document.addEventListener(visibilityChange,handleVisibilityChange,!1);function handleVisibilityChange(){alreadyturnedoff?(Game.Sounds.ResumeAll(),alreadyturnedoff=!1):(Game.Sounds.PauseAll(),alreadyturnedoff=!0)}Game.Scenes.Features=[],Game.Scenes.Features[0]=new Scene({text:`
            Привет! Это меню доступа к ранним возможностям и тестирования функций, что тебе показать?
            `,buttontext:["\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043D\u0430 \u0447\u0430\u0441\u0442\u044C","\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0441\u0442 (\u0432 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0435)","\u041D\u0438\u0447\u0435\u0433\u043E"],background:"Persons/RTemiy",buttonaction:[()=>{Game.Scenes.Features[5].Begin()},()=>{CloseOpen(MainField,EditorField)},()=>{CloseOpen(MainField,MenuField)}]}),Game.Scenes.Features[4]=new Scene({text:`
            Привет! Это история "Бессмертные: последняя надежда" Куда тебя переместить?
            `,buttontext:["\u0427\u0430\u0441\u0442\u044C 1","\u0427\u0430\u0441\u0442\u044C 2","\u0427\u0430\u0441\u0442\u044C 3","\u0427\u0430\u0441\u0442\u044C 4"],background:"Persons/Masha",buttonaction:[()=>{Game.Scenes.FirstChapter[101].Begin()},()=>{Game.Scenes.TL[1].Begin()},()=>{Game.Scenes.PP[1].Begin()},()=>{Game.Scenes.PP[1].Begin()}]}),Game.Scenes.Features[6]=new Scene({text:`
            Привет! Это история "Аврора" Куда тебя переместить?
            `,buttontext:["\u0427\u0430\u0441\u0442\u044C 1"],background:"Persons/Masha",buttonaction:[()=>{}]}),Game.Scenes.Features[100]=new Scene({text:`
            <p>
            <p>
            <p>Продолжение следует! 

            <p>Дата выхода следующего обновления: 30 апреля

            <p>Очень ждём вас в нашем телеграмм канале - <a href="https://t.me/chronicles_game" target="_blank">Перейти</a>

            <p>Там вы сможете пообщаться с нами, узнать на каком этапе находится разработка игры. 
            И не стесняйтесь сообщать об ошибках, ведь только С ВАШЕЙ ПОМОЩЬЮ мы сможем стать лучше!

            <p>Будем очень рады вашей оценке! Пожалуйста, оставляйте отзывы на странице нашего приложения в Google Play - <a href="https://play.google.com/store/apps/details?id=com.mva.chronicles target="_blank"">Перейти</a>
            `,background:"",buttonactive:[!0,!1],buttontext:["\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u0432 \u043C\u0435\u043D\u044E"],buttonaction:[()=>{CloseOpen(MainField,MenuField),Game.Sounds.PauseAll()}]}),Game.Scenes.Features[5]=new Scene({text:`
            Привет! Выбери историю
            `,buttontext:["\u0411\u0435\u0441\u0441\u043C\u0435\u0440\u0442\u043D\u044B\u0435: \u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u043D\u0430\u0434\u0435\u0436\u0434\u0430","\u0410\u0432\u0440\u043E\u0440\u0430"],background:"Persons/Masha",buttonaction:[()=>{Game.Scenes.Features[4].Begin()},()=>{Game.Scenes.Features[6].Begin()}]}),Game.Scenes.Mod=[],Game.Stories.push(new Story({name:"Immortals",pict:"Covers/Story",chapters:[new Chapter({name:"\u0413\u043B\u0430\u0432\u0430 1",pict:"Persons/Stranger",parts:[new Part({name:"\u041F\u0440\u043E\u043B\u043E\u0433",pict:"Backgrounds/Abstraction_Hero",code:"Prologue",event:function(){Game.Design.Change("Immortals"),Game.HideAllAttitudes(),Game.Effects.DisableAll(),Game.LoadScreen("Prologue"),Game.Scenes.Prologue[0].Begin()}}),new Part({name:"\u0427\u0430\u0441\u0442\u044C 1",code:"FirstChapter",pict:"Backgrounds/Lection",event:function(){Game.Design.Change("Immortals"),Game.Progress.Load("FirstChapter"),Game.Effects.DisableAll(),Game.LoadScreen("FirstChapter"),(Game.PlayerName===void 0||""===Game.PlayerName)&&Game.AskName(()=>{Game.Scenes.FirstChapter[0].Begin()}),Game.Scenes.FirstChapter[0].Begin()}}),new Part({name:"\u0427\u0430\u0441\u0442\u044C 2",code:"TL",pict:"Backgrounds/NY",event:function(){Game.Design.Change("Immortals"),Game.Progress.Load("TL"),Game.Effects.DisableAll(),Game.LoadScreen("TL"),(Game.PlayerName===void 0||""===Game.PlayerName)&&Game.AskName(()=>{Game.Scenes.TL[1].Begin()}),Game.Scenes.TL[1].Begin()}}),new Part({name:"\u0427\u0430\u0441\u0442\u044C 3",code:"PP",pict:"Backgrounds/Pompeii",event:function(){Game.Design.Change("Immortals"),Game.Progress.Load("PP"),Game.Effects.DisableAll(),Game.LoadScreen("PP"),(Game.PlayerName===void 0||""===Game.PlayerName)&&Game.AskName(()=>{Game.Scenes.PP[1].Begin()}),Game.Scenes.PP[1].Begin()}}),new Part({name:"\u0427\u0430\u0441\u0442\u044C 4",code:"FP",pict:"Backgrounds/Ball",event:function(){Game.Design.Change("Immortals"),Game.Effects.DisableAll(),Game.LoadScreen("FP"),Game.Progress.Load("FP"),(Game.PlayerName===void 0||""===Game.PlayerName)&&Game.AskName(()=>{Game.Scenes.FC[0].Begin()}),Game.Scenes.FC[0].Begin()}}),new Part({name:"\u0427\u0430\u0441\u0442\u044C 5",code:"FifthPart",pict:"Backgrounds/Lake",event:function(){Game.Design.Change("Immortals"),Game.Effects.DisableAll(),Game.LoadScreen("FifthPart"),Game.Progress.Load("FifthPart"),(Game.PlayerName===void 0||""===Game.PlayerName)&&Game.AskName(()=>{Game.Scenes.FifthPart[0].Begin()}),Game.Scenes.FifthPart[0].Begin()}})]})]})),Game.Stories.push(new Story({name:"Unkown",pict:"Covers/Aurora",chapters:[new Chapter({name:"\u0413\u043B\u0430\u0432\u0430 1",pict:"Backgrounds/Lighthouse",parts:[new Part({name:"\u041F\u0440\u043E\u043B\u043E\u0433",pict:"Backgrounds/Writing",code:"Aurora_Prologue",event:function(){Game.Design.Change("Aurora"),Game.HideAllAttitudes(),Game.Effects.DisableAll(),Game.LoadScreen("Aurora_Prologue"),Game.Scenes.A_Prologue[0].Begin()}}),new Part({name:"\u0427\u0430\u0441\u0442\u044C 1",pict:"Backgrounds/House_Inside",code:"Aurora_Part01",event:function(){Game.Design.Change("Aurora"),Game.Progress.Load("Aurora_Part01"),Game.Effects.DisableAll(),Game.LoadScreen("Aurora_Part01"),Game.Scenes.A_Part01[0].Begin()}}),new Part({name:"\u0427\u0430\u0441\u0442\u044C 2",pict:"Backgrounds/Univer",code:"Aurora_Part02",event:function(){Game.Design.Change("Aurora"),Game.Progress.Load("Aurora_Part02"),Game.Effects.DisableAll(),Game.LoadScreen("Aurora_Part02"),Game.Scenes.A_Part02[0].Begin()}})]})]})),Game.Achievements.A_PrologueCompleted=new Achievement({picture:"Backgrounds/Writing",title:"\u0414\u043D\u0435\u0432\u043D\u0438\u043A",text:"\u0410\u0432\u0440\u043E\u0440\u0430 \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u0442 \u0441\u0432\u043E\u0439 \u0440\u0430\u0441\u0441\u043A\u0430\u0437",story:"Aurora"}),Game.Achievements.A_Artist=new Achievement({picture:"Backgrounds/Album",title:"\u0425\u0443\u0434\u043E\u0436\u043D\u0438\u043A",text:"\u0412\u044B\u0431\u0435\u0440\u0435\u0442\u0435 \u0432 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0433\u043E \u0445\u043E\u0431\u0431\u0438 \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435",story:"Aurora"}),Game.Achievements.A_Writer=new Achievement({picture:"Backgrounds/Writing",title:"\u041F\u0438\u0441\u0430\u0442\u0435\u043B\u044C",text:"\u0412\u044B\u0431\u0435\u0440\u0435\u0442\u0435 \u0432 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0433\u043E \u0445\u043E\u0431\u0431\u0438 \u043F\u0438\u0441\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E",story:"Aurora"}),Game.Achievements.A_Musician=new Achievement({picture:"Backgrounds/WM",title:"\u041C\u0443\u0437\u044B\u043A\u0430\u043D\u0442",text:"\u0412\u044B\u0431\u0435\u0440\u0435\u0442\u0435 \u0432 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0433\u043E \u0445\u043E\u0431\u0431\u0438 \u043C\u0443\u0437\u044B\u043A\u0443",story:"Aurora"}),Game.Achievements.A_Part01Completed=new Achievement({picture:"Backgrounds/Lighthouse_Night",title:"\u041D\u043E\u0432\u0430\u044F \u0436\u0438\u0437\u043D\u044C",text:"\u041E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435\u0441\u044C \u0441 \u0410\u0432\u0440\u043E\u0440\u043E\u0439 \u0432 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E\u0435 \u0431\u0443\u0434\u0443\u0449\u0435\u0435",story:"Aurora"}),Game.Achievements.A_Musicality=new Achievement({picture:"Backgrounds/Disc",title:"\u041C\u0435\u043B\u043E\u043C\u0430\u043D",text:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0443\u0437\u044B\u043A\u0443 \u043F\u043E \u0432\u043A\u0443\u0441\u0443",story:"Aurora"}),Game.Achievements.A_Part02Completed=new Achievement({picture:"Backgrounds/Univer",title:"\u0421\u0442\u0443\u0434\u0435\u043D\u0447\u0435\u0441\u043A\u0438\u0435 \u0431\u0443\u0434\u043D\u0438",text:"\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0435 \u0432\u0442\u043E\u0440\u0443\u044E \u0447\u0430\u0441\u0442\u044C \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u043E\u0439 \u0432\u0441\u0442\u0440\u0435\u0447\u0435\u0439",story:"Aurora"}),Game.Stats.Aurora=new Stat({name:"\u0410\u0432\u0440\u043E\u0440\u0430",picture:"Persons/Aurora",title:"\u0412 \u043C\u043E\u0435\u0439 \u0436\u0438\u0437\u043D\u0438 \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442 \u043C\u043D\u043E\u0433\u043E \u0437\u043D\u0430\u0447\u0438\u043C\u044B\u0445 \u043F\u0435\u0440\u0435\u043C\u0435\u043D.",text:"\u0418\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u043E, \u043A\u0430\u043A\u0438\u0435 \u0435\u0449\u0435 \u0441\u044E\u0440\u043F\u0440\u0438\u0437\u044B \u043F\u0440\u0435\u043F\u043E\u0434\u043D\u0435\u0441\u0435\u0442 \u0441\u0443\u0434\u044C\u0431\u0430?",story:"Aurora"}),Game.Stats.Father=new Stat({name:"\u041F\u0430\u043F\u0430",picture:"Persons/Dad",title:"\u041C\u043E\u0439 \u0435\u0434\u0438\u043D\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u0440\u043E\u0434\u043D\u043E\u0439 \u0447\u0435\u043B\u043E\u0432\u0435\u043A.",text:"\u0415\u043C\u0443 \u043F\u0440\u0438\u0448\u043B\u043E\u0441\u044C \u043D\u0435\u043B\u0435\u0433\u043A\u043E: \u0440\u0430\u0431\u043E\u0442\u0430, \u043F\u043E\u0442\u0435\u0440\u044F \u0434\u043E\u0440\u043E\u0433\u0438\u0445 \u043B\u044E\u0434\u0435\u0439. \u0415\u0433\u043E \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u043D\u0435\u0441\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u043E - \u044F \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0432\u0441\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043C\u043E\u0447\u044C \u0435\u043C\u0443.",story:"Aurora"}),Game.Stats.Yan=new Stat({name:"\u042F\u043D",picture:"Persons/Yan",title:"\u0421\u0430\u043C\u044B\u0439 \u0431\u043B\u0438\u0437\u043A\u0438\u0439 \u0434\u0440\u0443\u0433 \u0434\u043B\u044F \u043C\u0435\u043D\u044F. \u041C\u043E\u0439 \u0441\u0442\u0430\u0440\u0448\u0438\u0439 \u0431\u0440\u0430\u0442.",text:"\u0415\u0433\u043E \u0437\u0430\u0433\u0430\u0434\u043E\u0447\u043D\u043E\u0435 \u0438\u0441\u0447\u0435\u0437\u043D\u043E\u0432\u0435\u043D\u0438\u0435 \u0434\u043E \u0441\u0438\u0445 \u043F\u043E\u0440 \u043E\u0442\u0437\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0431\u043E\u043B\u044C\u044E \u0443 \u043C\u0435\u043D\u044F \u0432 \u0441\u0435\u0440\u0434\u0446\u0435. \u041D\u043E \u044F \u043D\u0435 \u0441\u043E\u0431\u0438\u0440\u0430\u044E\u0441\u044C \u0442\u0435\u0440\u044F\u0442\u044C \u043D\u0430\u0434\u0435\u0436\u0434\u0443.",story:"Aurora"}),Game.Stats.Arthur=new Stat({name:"\u0410\u0440\u0442\u0443\u0440",picture:"Persons/Arthur",title:"\u0412\u043D\u0443\u043A \u0431\u044B\u0432\u0448\u0435\u0433\u043E \u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435\u043B\u044F \u043C\u0430\u044F\u043A\u0430. \u0414\u043E\u0431\u0440\u044B\u0439 \u0438 \u043F\u043E\u043D\u0438\u043C\u0430\u044E\u0449\u0438\u0439 \u043F\u0430\u0440\u0435\u043D\u044C.",text:"\u0418\u043C\u0435\u043D\u043D\u043E \u043E\u043D \u0431\u044B\u043B \u0440\u044F\u0434\u043E\u043C \u0432 \u0441\u0430\u043C\u044B\u0435 \u0442\u0440\u0443\u0434\u043D\u044B\u0435 \u043C\u043E\u043C\u0435\u043D\u0442\u044B \u043C\u043E\u0435\u0439 \u0436\u0438\u0437\u043D\u0438. \u042F \u043D\u0435 \u043F\u043E\u043D\u0438\u043C\u0430\u044E, \u043A\u0430\u043A\u0438\u0435 \u0447\u0443\u0432\u0441\u0442\u0432\u0430 \u0438\u0441\u043F\u044B\u0442\u044B\u0432\u0430\u044E \u043A \u043D\u0435\u043C\u0443, \u043D\u043E \u0432\u0440\u0435\u043C\u044F \u0432\u0441\u0435 \u0440\u0430\u0441\u0441\u0442\u0430\u0432\u0438\u0442 \u043D\u0430 \u0441\u0432\u043E\u0438 \u043C\u0435\u0441\u0442\u0430.",story:"Aurora"}),Game.Stats.Kaleb=new Stat({name:"\u041A\u0430\u043B\u0435\u0431",picture:"Persons/Kaleb",title:"\u041D\u0430\u0433\u043B\u044B\u0439 \u0438 \u0441\u0430\u043C\u043E\u0432\u043B\u044E\u0431\u043B\u0435\u043D\u043D\u044B\u0439 \u0441\u0442\u0443\u0434\u0435\u043D\u0442, \u0441 \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u044F \u0441\u0442\u043E\u043B\u043A\u043D\u0443\u043B\u0430\u0441\u044C \u0432 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0435.",text:"\u0415\u0433\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435 \u043E\u043A\u0443\u0442\u0430\u043D\u043E \u0442\u0430\u0439\u043D\u043E\u0439, \u0447\u0442\u043E \u043C\u043D\u0435 \u043F\u0440\u0435\u0434\u0441\u0442\u043E\u0438\u0442 \u0432\u044B\u044F\u0441\u043D\u0438\u0442\u044C. \u041A\u0435\u043C \u0436\u0435 \u043E\u043D \u043E\u043A\u0430\u0436\u0435\u0442\u0441\u044F \u043F\u043E \u0438\u0442\u043E\u0433\u0443: \u043D\u0430\u0434\u0435\u0436\u043D\u044B\u043C \u0441\u043E\u0440\u0430\u0442\u043D\u0438\u043A\u043E\u043C \u0432 \u043C\u043E\u0435\u043C \u043F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u0438 \u0438\u043B\u0438 \u0437\u043B\u0435\u0439\u0448\u0438\u043C \u0432\u0440\u0430\u0433\u043E\u043C?",story:"Aurora"}),Game.Stats.Drawing=new Stat({type:"Choice",name:"\u0437\u0430\u043D\u0438\u043C\u0430\u0442\u044C\u0441\u044F \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435\u043C",story:"Aurora"}),Game.Stats.Writing=new Stat({type:"Choice",name:"\u0437\u0430\u043D\u0438\u043C\u0430\u0442\u044C\u0441\u044F \u043F\u0438\u0441\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E\u043C",story:"Aurora"}),Game.Stats.Music=new Stat({type:"Choice",name:"\u0431\u044B\u0442\u044C \u043C\u0435\u043B\u043E\u043C\u0430\u043D\u043E\u043C",story:"Aurora"}),Game.Stats.Pragmatic=new Stat({type:"Choice",name:"\u0431\u044B\u0442\u044C \u043F\u0440\u0430\u0433\u043C\u0430\u0442\u0438\u0447\u043D\u043E\u0439",story:"Aurora"}),Game.Stats.Romantic=new Stat({type:"Choice",name:"\u0431\u044B\u0442\u044C \u0440\u043E\u043C\u0430\u043D\u0442\u0438\u0447\u043D\u043E\u0439",story:"Aurora"}),Game.Stats.Song=new Stat({type:"Choice",name:"\u0432\u044B\u0431\u0440\u0430\u043B\u0430 \u043F\u0435\u0441\u043D\u044E",story:"Aurora"}),Game.Stats.Trial_Pass=new Stat({name:"\u041F\u0440\u043E\u043F\u0443\u0441\u043A",picture:"Items/Trial_Pass",type:"Item",title:"\u0412\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0439 \u043F\u0440\u043E\u043F\u0443\u0441\u043A \u0410\u0432\u0440\u043E\u0440\u044B",text:"\u0415\u0433\u043E \u0432\u0440\u0443\u0447\u0438\u043B \u043C\u043D\u0435 \u0410\u0440\u0442\u0443\u0440, \u0447\u0442\u043E\u0431\u044B \u044F \u043C\u043E\u0433\u043B\u0430 \u043F\u0440\u043E\u0439\u0442\u0438 \u0432 \u0443\u043D\u0438\u0432\u0435\u0440\u0441\u0438\u0442\u0435\u0442 \u0432 \u043B\u044E\u0431\u043E\u0435 \u0432\u0440\u0435\u043C\u044F",story:"Aurora"}),Game.Scenes.A_Part01=[],Game.Scenes.A_Part01[0]=new Scene({text:`
    Я родилась в полной и любящей семье на окраине небольшого шведского городка. 
    Нас было четверо: заботливые родители, я и старший брат, всегда спешивший на помощь. 
    Для меня это было счастливым временем, которое не ускользало даже под гнетом тяжелых испытаний судьбы.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[1].Begin(),Game.Stats.Aurora.Add(0),Game.Message("\u0412 \u0432\u0435\u0440\u0445\u043D\u0435\u043C \u043B\u0435\u0432\u043E\u043C \u0443\u0433\u043B\u0443 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u044C, \u0442\u0430\u043C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043F\u043E\u043B\u0435\u0437\u043D\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E")}],background:"Backgrounds/House_Inside",condition:()=>{Game.Sounds.Play("Music","Lighthouse")}}),Game.Scenes.A_Part01[1]=new Scene({text:`
      Своего детства я практически не помню. 
      Но мой подростковый период проходил далеко не в сказочных реалиях. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[100].Begin()}],background:"Backgrounds/House_Inside"}),Game.Scenes.A_Part01[100]=new Scene({text:`
      Чтобы прокормить семью, отец пробовался на разные работы: был поваром, строителем и даже грузчиком. Но в маленьких городках жизнь будто бы заколдована на обреченность. 
      <p>Стабильность медленно ускользала, а на смену приходили голод и прочие недуги. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[2].Begin()}],background:"Persons/Dad"}),Game.Scenes.A_Part01[2]=new Scene({text:`
      Однако все изменилось, когда папин хороший знакомый предложил ему работу. 
      Она была несложная. Необходимо было помогать пожилому человеку, работающему смотрителем маяка. В дополнение к этому, за нее обещали хорошо платить.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[3].Begin()}],background:"Persons/Dad"}),Game.Scenes.A_Part01[3]=new Scene({text:`
      Мало кто хотел связывать свою жизнь со служением морю, если так можно выразиться. Быть вдали от всех цивилизованных благ, где единственными друзьями будут тишина и природа. 
      <p>Но отцу было все равно. Наше благополучие стояло на первом месте. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[4].Begin()}],background:"Persons/Dad"}),Game.Scenes.A_Part01[4]=new Scene({text:`
      В начале он работал в качестве помощника. Милый дедушка оказался не только хорошим учителем, но и прекрасным собеседником. Он обучил папу всем тонкостям работы и пророчил ему свое место. 
      <p>Мы могли не видеть отца месяцами. Тоска по родному теплу росла с каждым днем. Но мы не сдавались.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[5].Begin()}],background:"Persons/Dad"}),Game.Scenes.A_Part01[5]=new Scene({text:`
     Мама была для меня примером стойкости и воли к жизни. Даже несмотря на свое слабое здоровье, она старалась быть сильной. Подрабатывала и успевала ухаривать за домом.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[6].Begin()}],background:"Backgrounds/House_Inside"}),Game.Scenes.A_Part01[6]=new Scene({text:`
     Старший брат, по имени Ян, всегда вдохновлял меня и не давал падать духом. В свои шестнадцать лет он не знал проблем с учебой, успевал работать в небольшой продуктовой лавке на полставки и оставаться крепким мужским плечом для меня и мамы. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[7].Begin()}],background:"Persons/Yan"}),Game.Scenes.A_Part01[7]=new Scene({text:`
      Ян был моим самым близким другом. Я всегда делилась с ним сокровенными тайнами или безумными идеями. А он, в свою очередь, поддерживал и наставлял, как подобает старшему брату.  
      <p>Мы могли часами разговаривать и понимать друг друга практически без слов, а его любящие объятия укрывали меня от грустных мыслей.
          `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[8].Begin()}],background:"Persons/Yan"}),Game.Scenes.A_Part01[8]=new Scene({text:`
     Он часто говорил мне: 
     <p>- Вот увидишь, Аврора. Я построю нам мост в светлое будущее. 
     <p>Но все изменилось, когда в один из дней он не пришел домой. 
          `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[9].Begin(),Game.Stats.Yan.Add(0)}],background:"Persons/Yan"}),Game.Scenes.A_Part01[9]=new Scene({text:`
     Это было не в его духе. Ян всегда сообщал нам о своих передвижениях или внезапных задержках. 
     Но именно в тот проклятый весенний день, когда брату было семнадцать лет - он будто бы испарился из нашего города. 
          `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[101].Begin()}],background:"Backgrounds/Missing"}),Game.Scenes.A_Part01[101]=new Scene({text:`
      Отец был на работе, поэтому я и мама самостоятельно организовали поиски с помощью неравнодушных соседей. 
      Мы обращались в полицию, развешивали плакаты с его изображением. Все жители нашего маленького городка были подключены к поискам Яна, но его след так и не смогли найти… 
          `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[10].Begin()}],background:"Backgrounds/Missing"}),Game.Scenes.A_Part01[10]=new Scene({text:`
     Полиция выдвинула банальные теории. Якобы брат просто сбежал из дома, захотел новой жизни и отправился покорять столицу. 
     И как бы мы не отрицали версию полиции, как бы не старались найти его, поиск не сдвигался с мертвой точки. 
      <p>Никто не собирался сдаваться. Но чем больше времени проходило, тем быстрее угасала наша надежда. 
          `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[11].Begin()}],background:"Backgrounds/Missing"}),Game.Scenes.A_Part01[11]=new Scene({text:`
     В условиях нестабильности мы прожили долгие годы. Нашу жизнь омрачила тоска по Яну и, казалось, ничто не могло этого изменить. 
    <p>Однако когда мне исполнилось восемнадцать лет, будто бы по волшебству последовали первые положительные перемены. 
          `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[12].Begin()}],background:"Backgrounds/House_Inside"}),Game.Scenes.A_Part01[12]=new Scene({text:`
     В один дождливый день на пороге объявился отец. Полностью промокший он вошел в дом. То ли слезы текли по его щекам, то ли капли дождя. Скорее всего все вперемешку. 
    <p>Спустя несколько долгих секунд он произнес всего одну фразу:
    <p>- Смотритель умер. 
          `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[13].Begin()}],background:"Persons/Dad"}),Game.Scenes.A_Part01[13]=new Scene({text:`
     Дальнейшее решение перевернуло наш мир. Единственное, что мог сделать папа, чтобы мы жили в благополучии - это занять место смотрителя. Но это также означало, что мы совсем потеряем связь с друг другом. 
          `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[14].Begin()}],background:"Backgrounds/House_Inside"}),Game.Scenes.A_Part01[14]=new Scene({text:`
      <p>Я хорошо помню тот день. Мама кинулась в объятия отца, плача ему в плечо. Она произнесла лишь одно:
      <p>- Поехали. 
      <p>У меня не было причин отказываться. В школе я не завела друзей, единственный по-настоящему близкий человек пропал, дальнейших планов на жизнь у меня не было.
      <p>Но любящая семья, бережно относящаяся ко мне - вот, за что хотелось цепляться. 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[15].Begin()}],background:"Backgrounds/House_Inside"}),Game.Scenes.A_Part01[15]=new Scene({text:`
      Я отправилась в ванную, чтобы умыться и привести себя в порядок. 
      Расчесала свои светлые, немного непослушные локоны. 
      Умылась и накрасила губы моим любимым розовым бальзамом - мамин подарок. 
      Она всегда говорила, что мне очень идет этот цвет, да и выглядела я не такой бледной, как обычно. 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[16].Begin()}],background:"Persons/Aurora"}),Game.Scenes.A_Part01[16]=new Scene({text:`
      В отражении зеркала мне показалась немного растерянного вида девушка, которая не представляла свою дальнейшую жизнь. 
      Но которая четко осознавала - сейчас происходит абсолютно непредсказуемый поворот в ее судьбе. 
      И возможно именно благодаря этим переменам - все наладится. 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[17].Begin()}],background:"Persons/Aurora"}),Game.Scenes.A_Part01[17]=new Scene({text:`
      Выйдя из ванны, я начала медленно обходить наш домик, с которым связано столько воспоминаний. 
      Слегка касаясь вещей, я начала представлять картинки из моей жизни. 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[106].Begin()}],background:"Persons/Aurora"}),Game.Scenes.A_Part01[106]=new Scene({text:`
      С одной стороны, испытывая чувство безмерной радости от переезда в новый дом и воссоединения семьи, 
      а с другой стороны - чувство тоски, ведь это все такое привычное и родное.
      <p>Мы быстро собрали те немногие вещи, которые у нас были и отправились в свой новый дом. 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[102].Begin()}],background:"Persons/Aurora"}),Game.Scenes.A_Part01[102]=new Scene({text:`
       Небольшой домик, находившийся рядом с маяком, стал нашей отдушиной. Наконец-то беззаботная семейная идиллия накрыла нас волной любви и счастья. 
      <p>Да, мы были совершенно оторваны от других. Но наше уютное гнездышко и было всем этим гигантским миром. 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[103].Begin(),Game.Message("\u0421\u0435\u0439\u0447\u0430\u0441 \u0432\u044B \u0441\u0434\u0435\u043B\u0430\u0435\u0442\u0435 \u0441\u0432\u043E\u0439 \u043F\u0435\u0440\u0432\u044B\u0439 \u0432\u044B\u0431\u043E\u0440. \u041D\u0435\u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0438\u0437 \u043D\u0438\u0445 \u043C\u0435\u043D\u044F\u044E\u0442 \u0441\u044E\u0436\u0435\u0442 \u043D\u0435\u0437\u043D\u0430\u0447\u0438\u0442\u0435\u043B\u044C\u043D\u043E, \u0434\u0440\u0443\u0433\u0438\u0435 \u0436\u0435 \u0432\u0435\u0434\u0443\u0442 \u043A \u0441\u0435\u0440\u044C\u0435\u0437\u043D\u044B\u043C \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u0430\u043C. \u041D\u043E \u043F\u043E\u043C\u043D\u0438\u0442\u0435, \u0442\u043E\u043B\u044C\u043A\u043E \u0412\u0430\u043C \u0440\u0435\u0448\u0430\u0442\u044C, \u043A\u0430\u043A\u043E\u0439 \u0432\u044B \u0432\u0438\u0434\u0438\u0442\u0435 \u0441\u0432\u043E\u044E \u0433\u043B\u0430\u0432\u043D\u0443\u044E \u0433\u0435\u0440\u043E\u0438\u043D\u044E.")}],background:"Backgrounds/Lighthouse"}),Game.Scenes.A_Part01[103]=new Scene({text:`
      Волны, ветер, свобода, семья. Я обрела гармонию и спокойствие на сердце. 
      <p>И не забывала о своем хобби. 
      `,buttontext:["\u041B\u044E\u0431\u0438\u043B\u0430 \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435","\u041B\u044E\u0431\u0438\u043B\u0430 \u043F\u0438\u0441\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E","\u041B\u044E\u0431\u0438\u043B\u0430 \u043C\u0443\u0437\u044B\u043A\u0443"],buttonaction:[()=>{Game.Scenes.A_Part01[18].Begin(),Game.Achievements.A_Artist.Unlock(),Game.Stats.Drawing.Add(1)},()=>{Game.Scenes.A_Part01[21].Begin(),Game.Achievements.A_Writer.Unlock(),Game.Stats.Writing.Add(1)},()=>{Game.Scenes.A_Part01[24].Begin(),Game.Achievements.A_Musician.Unlock(),Game.Stats.Music.Add(1)}],background:"Backgrounds/Lighthouse"}),Game.Scenes.A_Part01[18]=new Scene({text:`
      Я не училась в художественной школе и не имела ни малейшего представления о тонкостях подобного искусства. 
      Однако еще с детства мама с папой видели, какую радость мне доставляет передавать простые формы на бумагу. 
      <p>И хоть мы были небогатой семьей, но на альбом и несколько карандашей родители смогли найти деньги. 

      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[19].Begin()}],background:"Backgrounds/Album"}),Game.Scenes.A_Part01[19]=new Scene({text:`
      Рисование также помогало отвлекаться от тяжелых моментов в жизни. Легкое чирканье карандашом, блеклые наброски - мой мир, который я раскрашу в нужные цвета. 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[107].Begin()}],background:"Backgrounds/Album"}),Game.Scenes.A_Part01[107]=new Scene({text:`
    Жизнь на маяке стала для меня новым открытием и все заиграло более яркими красками. 
    <p>Я часто садилась на лавочку, которая стояла рядом с маяком. Вид рассказывал о море и его тайнах. 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[20].Begin()}],background:"Backgrounds/Album"}),Game.Scenes.A_Part01[20]=new Scene({text:`
      Каждый раз море открывалось для меня с новой стороны. 
      Легкое покачивание волн, ровный горизонт, мирно летящие птицы. Или же бушующие потоки, сильный ветер, что сносил все на своем пути. 
      <p>Эти мгновения навсегда запечатлены в моем альбоме.  
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[28].Begin()}],background:"Backgrounds/Album"}),Game.Scenes.A_Part01[21]=new Scene({text:`
      Одним из немногих предметов в школе, которым я по-настоящему увлекалась, была литература. 
      Для меня всегда оставалось загадкой, как же люди могут так искусно передавать свои мысли и идеи, влиять на разум читателя, внушать ту или иную мораль.
      <p>Как-то после уроков я набралась смелости и купила блокнот, который стал постепенно заполняться разного рода набросками для будущих историй. 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[22].Begin()}],background:"Backgrounds/Writing"}),Game.Scenes.A_Part01[22]=new Scene({text:`
      Как и в жизни, я не могла придумать конечную цель или хотя бы продумать структуру произведения. Но это не мешало мне изливать свою душу в такой форме. 
      <p>Маяк стал для меня оплотом вдохновения. Я часто залезала на самый верх здания, где располагалась смотровая площадка. Садилась на стул и просто писала. 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[23].Begin()}],background:"Backgrounds/Writing"}),Game.Scenes.A_Part01[23]=new Scene({text:`
      Дракон, что мог обрушить свое зло на маленький никому не нужный городок или обычная бытовая жизнь смотрителя маяка. 
      <p>Это было неважно. 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[28].Begin()}],background:"Backgrounds/Writing"}),Game.Scenes.A_Part01[24]=new Scene({text:`
      В школе я часто проводила время наедине с собой. Меня не привлекало общение с другими людьми, к тому же, они не были особенно расположены ко мне. 
      <p>Но в один из дней мой одноклассник, с которым мы делили парту, пришел неожиданно в хорошем настроении. Я тактично поинтересовалась о причине этого. 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[25].Begin()}],background:"Backgrounds/WM"}),Game.Scenes.A_Part01[25]=new Scene({text:`
      - Наконец-то состоялся дебют “Kings and Queens”. Это просто бомба. Все только о них и говорят, а их гитарист и по совместительству вокалист - настоящий прорыв. 
      Он вроде даже наш ровесник… Не верится. Почему я просиживаю за этой чертовой партой, когда в шестнадцать лет можно такие бабки рубить… 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[26].Begin()}],background:"Backgrounds/WM"}),Game.Scenes.A_Part01[26]=new Scene({text:`
      - А можно послушать? 
    <p>- Конечно! Я и забыл, что у тебя нет денег, - он протянул мне плеер и наушники. 
    <p>Я не обратила внимание на эту колкость. Люди почему-то норовят показать свое превосходство, но я к этому привыкла и отнеслась спокойно. 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[27].Begin(),Game.Sounds.Play("Music","KingQueens")}],background:"Backgrounds/WM"}),Game.Scenes.A_Part01[27]=new Scene({text:`
      Надев наушники, меня тут же захватил звук гитары. 
      Музыка, которую я слышала была чем-то новым для меня. Прекрасный проигрыш и не менее завораживающий голос вокалиста вызвали смешение различных эмоций. 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[110].Begin()}],background:"Backgrounds/WM"}),Game.Scenes.A_Part01[110]=new Scene({text:`
      Впоследствии, я поделилась своим открытием с родителями.  И несмотря на финансовое положение, на шестнадцатилетие мне подарили музыкальный плеер. 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[120].Begin()}],background:"Backgrounds/WM"}),Game.Scenes.A_Part01[120]=new Scene({text:`
      Я не переставая слушала разного рода музыку. Создавала плейлисты под свое настроение. Но “Kings and Queens” занимали в этом списке особенное место. 
      <p>И даже сейчас, стоя перед бушующим морем, я все еще слушаю их песни. Надеясь, что когда-нибудь у меня хватит смелости взять в руки гитару и сочинить свое произведение.
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[28].Begin(),Game.Sounds.Play("Music","Lighthouse")}],background:"Backgrounds/WM"}),Game.Scenes.A_Part01[28]=new Scene({text:`
      Прошло несколько месяцев после нашего переезда. Мы действительно полюбили это место. 
      <p>Папа оставался прикован к маяку. Я и мама периодически ездили в город за покупками. Каждый вечер мы наслаждались обществом друг друга, будто бы наверстывая упущенное время. 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[60].Begin()}],background:"Backgrounds/Lighthouse"}),Game.Scenes.A_Part01[60]=new Scene({text:`
      Разговоры, игры. Совершенно неважно -  что. Ведь главное -  с кем. 
      <p>Все мы ощущали перемены, происходившие с нами. К примеру, родители говорили мне, что я стала более: 
      `,buttontext:["\u0420\u043E\u043C\u0430\u043D\u0442\u0438\u0447\u043D\u043E\u0439","\u041F\u0440\u0430\u0433\u043C\u0430\u0442\u0438\u0447\u043D\u043E\u0439"],buttonaction:[()=>{Game.Scenes.A_Part01[29].Begin(),Game.Stats.Romantic.Add(1)},()=>{Game.Scenes.A_Part01[31].Begin(),Game.Stats.Pragmatic.Add(1)}],background:"Backgrounds/Lighthouse"}),Game.Scenes.A_Part01[29]=new Scene({text:`
      - Аврора, - говорила мама, попивая горячий чай в один из вечеров. - Ты изменилась. Я все больше замечаю, какой ранимой и чуткой девушкой ты становишься. 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[108].Begin()}],background:"Backgrounds/Near_Lighthouse"}),Game.Scenes.A_Part01[108]=new Scene({text:`
      - Видимо, так на меня повлияло это место, - я пожала плечами и улыбнулась. 
      <p>- Несомненно, - произнес отец, который что-то колдовал на кухне. - Ты все больше мечтаешь и мечтаешь. Твоим фантазиям мог бы позавидовать любой творец! 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[30].Begin()}],background:"Persons/Dad"}),Game.Scenes.A_Part01[30]=new Scene({text:`
      - Ну что ты, папа… Это всего лишь ребячество… 
      <p>- Не говори так. Нужно больше верить в себя и свои силы. 
      Уверен, тебя ждут великие открытия, - отец развернулся к нам с тарелками свежих фруктов. - А теперь, девочки мои, налетайте! 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[33].Begin()}],background:"Backgrounds/Near_Lighthouse"}),Game.Scenes.A_Part01[31]=new Scene({text:`
      - Аврора, - говорила мама, попивая горячий чай в один из вечеров. - Ты изменилась. Я все больше замечаю, как ты выросла и какой серьезной ты становишься. 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[109].Begin()}],background:"Backgrounds/Near_Lighthouse"}),Game.Scenes.A_Part01[109]=new Scene({text:`
      - Видимо, так на меня повлияло это место, - я пожала плечами и улыбнулась. 
      <p>- Несомненно, - произнес отец, который что-то колдовал на кухне. - Несмотря на твои мечтания, я вижу, как ты стала мыслить более рационально и взвешенно подходить ко многим вопросам. 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[32].Begin()}],background:"Persons/Dad"}),Game.Scenes.A_Part01[32]=new Scene({text:`
      - Ну что ты, папа… Это мало о чем говорит…
      <p>- Нужно больше верить в себя и свои силы. Уверен, тебя ждут великие открытия и твой подход тебе обязательно поможет, - отец развернулся к нам с тарелками свежих фруктов. - А теперь, девочки мои, налетайте! 
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[33].Begin()}],background:"Persons/Dad"}),Game.Scenes.A_Part01[33]=new Scene({text:`
      Через месяц после переезда, к нашему дому подъехала неизвестная машина. 
      Не то, чтобы это было чем-то удивительным. 
      Маяк часто проверяли на исправность разного рода службы. 
      Но сейчас машина не выглядела как полуразбитый грузовик, а из ее салона вышел хорошо одетый молодой парень. 
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[34].Begin()}],background:"Backgrounds/Lighthouse"}),Game.Scenes.A_Part01[34]=new Scene({text:`
      Отец, который находился на смотровой площадке маяка, тут же окликнул его: 
      <p>- Артур, я сейчас спущусь! 
      <p>Мама была в доме, поэтому я смело вышла встречать незнакомца. Мы обменялись стандартными приветствиями. Я не смогла не отметить его спокойную наружность, привлекательные черты лица и радушную улыбку.
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[35].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part01[35]=new Scene({text:`
      - Твой отец часто рассказывал о тебе, очень приятно наконец-то познакомиться лично, - проговорил Артур, облокачиваясь на капот своей машины. - Так ты живешь здесь вместе со своей семьей? 
      <p>- Да! Здесь очень красивое и уединенное место, помогает расслабиться. 
      <p>- Согласен с тобой, -  задумчиво глядя в сторону произнес парень.
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[36].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part01[36]=new Scene({text:`
      Вскоре вернулся отец. Он обменялся с Артуром рукопожатием и спросил:
      <p>- Ты за вещами дедушки приехал? Я сохранил все как было. Пойдем в дом. 
      <p>- Благодарю. Родители так и не смогли найти время, вечно мотаются по своим командировкам. А я только сейчас смог выбраться сюда. 
      <p>- Понимаю. У тебя ведь учеба. 
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[37].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part01[37]=new Scene({text:`
      Мы зашли внутрь дома. Мама организовала всем по чашке чая и выставила на стол печенье. Отец вынес несколько запечатанных коробок. 
      <p>- Это все его вещи. Я упаковал одежду и его книги с записками. Все, что смог найти. 
      <p>- Спасибо, - Артур грустным взглядом окинул коробки. - До сих пор не могу поверить, что его не стало. И что меня не было рядом с ним. 
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[38].Begin()}],background:"Backgrounds/Near_Lighthouse"}),Game.Scenes.A_Part01[38]=new Scene({text:`
      - Жизнь - это цикл с чередой различных взлетов и падений. Он сейчас в лучшем мире. Нам важно сохранить память об этом человеке. Это меньшее, что мы можем сделать. 
      <p>- Вы правы. 
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[39].Begin()}],background:"Persons/Dad"}),Game.Scenes.A_Part01[39]=new Scene({text:`
      Разговор продолжился в более позитивном ключе. Я узнала, что Артур являлся внуком бывшего смотрителя. 
      Он часто проводил время с дедушкой и был духовно связан с этим местом. Поэтому отец не раз подчеркивал, что парень желанный гость маяка. 
      <p>В течение нескольких месяцев Артур по возможности приезжал к нам в гости. Он проводил много времени с отцом, разговаривая о дедушке, о простых жизненных вещах. 
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[40].Begin()}],background:"Backgrounds/Lighthouse"}),Game.Scenes.A_Part01[40]=new Scene({text:`
      И со мной. Мы могли часами гулять и вести диалог на любые темы. Его компания была мне очень близка. Можно даже сказать, что мы стали друзьями. 
      <p>Я чувствовала себя очень комфортно в его обществе. Его доброта и ласковое обращение вызывали в душе ранее неизвестные мне чувства. 
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[41].Begin(),Game.Stats.Arthur.Add(0)}],background:"Persons/Arthur"}),Game.Scenes.A_Part01[41]=new Scene({text:`
      Иногда почитывая романтические книги про всяких принцев, я невольно проводила аналогии с нашими взаимоотношениями. Была ли это любовь или я видела в нем фигуру брата?
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[115].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part01[115]=new Scene({text:`
      На все эти противоречия у меня не было ответа. Я просто наслаждалась нашим времяпрепровождением и плыла по течению. 
      <p>Это были прекрасные месяцы светлых эмоций. Но все не могло быть так гладко. 
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[42].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part01[42]=new Scene({text:`
      Спустя чуть больше полугода нашей жизни на маяке, мама сильно заболела. Никакие лекарства и напутствия врачей не смогли помочь ей выбраться из этого состояния. 
      <p>Она умерла в больнице. Не мучаясь, не жалуясь, что так мало прожила.
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[43].Begin()}],background:"Backgrounds/Near_Lighthouse"}),Game.Scenes.A_Part01[43]=new Scene({text:`
      Мне всегда вспоминались ее слова: 
      <p>- Аврора, ты наша звездочка. Подобно помогающему свету на маяке, ты наш путеводитель в жизни. 
      <p>Как жаль, что моего “света” не стало в тот день. 
      <p>Смогу ли я продолжать быть тем самым путеводным огнем для других?
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[44].Begin()}],background:"Backgrounds/Near_Lighthouse",condition:function(){1==Game.Stats.Romantic.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.A_Part01[44].Begin()}),1==Game.Stats.Pragmatic.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.A_Part01[46].Begin()})}}),Game.Scenes.A_Part01[44]=new Scene({text:`
      На похоронах слезы душили меня, словно удавки. Я задыхалась. Терялась. От меня оторвали кусок чего-то настолько дорогого, что это никак не выразить словами. 
      <p>Что я должна испытывать? Мне больно, мне паршиво. Остановите это поскорее. Как вернуть время назад? 
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[45].Begin()}],background:""}),Game.Scenes.A_Part01[45]=new Scene({text:`
      Отец обнимал меня, смотря куда-то опустошенным взглядом. Он не плакал. Не кричал во все горло от терзающей боли. 
      <p>Нет. 
      <p>Возможно, он старался быть сильным ради меня, а может он просто не осознавал происходящее.  
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[48].Begin()}],background:""}),Game.Scenes.A_Part01[46]=new Scene({text:`
      На похоронах я стояла рядом с отцом с отчужденным лицом. Происходящее настолько не поддавалось чему-то логичному или закономерному, что я терялась в собственных эмоциях. 
      <p>Что я должна испытывать? Мне больно, мне паршиво. Остановите это поскорее. Как вернуть время назад? 
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[47].Begin()}],background:""}),Game.Scenes.A_Part01[47]=new Scene({text:`
      Отец обнимал меня, смотря куда-то опустошенным взглядом. Он не плакал. Не кричал во все горло от терзающей боли. 
      <p>Нет. 
      <p>Возможно, он старался быть сильным ради меня, а может он просто не осознавал происходящее.  
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[48].Begin()}],background:""}),Game.Scenes.A_Part01[48]=new Scene({text:`
      Артур, узнав о происходящем, незамедлительно приехал. Он не отходил от меня ни на шаг. 
      Его поддержка в тот момент была как глоток свежего воздуха. Я плакала на его плече, а он утешал меня, поглаживая по волосам. 
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[49].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part01[49]=new Scene({text:`
      Меня разрывало от несправедливости. Ян. Мама. Почему близкие люди покидают этот мир? Мы ведь так мало провели времени вместе.  
      <p>Если бы не Артур, <s>я бы утопилась в бушующем море. </s>
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[111].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part01[111]=new Scene({text:`
      Они часто разговаривали о чем-то с отцом наедине. Я не вмешивалась, понимая, что всем иногда нужно выговориться на определенные темы. 
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[50].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part01[50]=new Scene({text:`
      За несколько месяцев наша жизнь сильно поменялась. Отец невольно отстранился, полностью ушел в работу. 
      В его глазах пропал тот блеск жизни, та мотивация, которая помогала ему раньше. Он стал пить, но не переставал забывать о своей единственной дочери. 
      <p>В один из вечеров он позвал меня на смотровую площадку. Тогда уже минул почти год с нашего переезда. 
      <p>Тихая мирная ночь. Звезды. Шум морских волн. 
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[51].Begin()}],background:"Backgrounds/Lighthouse_Night"}),Game.Scenes.A_Part01[51]=new Scene({text:`
      Мы сели рядом, сдвинув два стула. Немного посидев в молчании, папа проговорил: 
      <p>- Тебе нужно уехать. Начать жить. 
      <p>Эти слова обрушились на меня подобно огромному снежному кому. 
      <p>- Но как же…? 
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[52].Begin()}],background:"Backgrounds/Lighthouse_Night"}),Game.Scenes.A_Part01[52]=new Scene({text:`
      - Аврора, ты же не думала, что всю жизнь проведешь на этом разваливающемся маяке. Я не могу позволить, чтобы ты прожигала здесь свою жизнь вместе со мной.
      <p>- Я…
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[104].Begin()}],background:"Persons/Dad"}),Game.Scenes.A_Part01[104]=new Scene({text:`
      - Мы с Артуром много говорили об этом. Он готов помочь с переездом. Сбережения у нас есть. Этого будет достаточно для начала жизни в большом городе и поступления в университет. 
      <p>Он все решил. И давно. И мне нечего было возразить. Это было логичным исходом, но чувствам не прикажешь. 
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[53].Begin()}],background:"Persons/Dad"}),Game.Scenes.A_Part01[53]=new Scene({text:`
      - Папа, - глаза наполнились слезами. - Я не могу тебя бросить. 
      <p>- Мы не прекратим общение. СМС или письма. Наша связь не прервется на этом.
      <p>- Это слишком резко и я не знаю, что мне сказать…
      `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[105].Begin()}],background:"Backgrounds/Lighthouse_Night"}),Game.Scenes.A_Part01[105]=new Scene({text:`
        - Вспомни свои мечты, Аврора, - папа сделал глоток хмельного напитка. - Свои стремления. Ты всегда была понимающим ребенком, который переживал все трудности и не жаловался. Но пришла пора начать жить для себя. Мама была такого же мнения. И я уверен, Ян, сказал бы то же самое.
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[54].Begin()}],background:"Persons/Dad"}),Game.Scenes.A_Part01[54]=new Scene({text:`
      - Но я даже не представляю, куда и как мне двигаться дальше. Я не смогу одна. Без тебя. Без мамы. Без Яна… Я не справлюсь.
      <p>- Ты будешь не одна. С этим поможет Артур. Вы же неплохо ладите. Он станет твоей опорой, пока ты не встанешь на ноги. Тем более, что изначально это было его идеей.
      <p>На мгновение меня обрадовали слова отца о причастности Артура, но после, осознание ситуации накрыло меня. 
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[55].Begin()}],background:"Persons/Dad"}),Game.Scenes.A_Part01[55]=new Scene({text:`
      Я согнулась, обхватив колени. Тяжело было признавать правоту отца. Мне хотелось уехать. Это было правдой. Горькой правдой. Но я слишком сильно пеклась о единственном родном человеке. Ведь одиночество не щадит никого. 
      <p>- Но ты…
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[56].Begin()}],background:"Backgrounds/Lighthouse_Night"}),Game.Scenes.A_Part01[56]=new Scene({text:`
      - Хватит, Аврора. Я справлюсь. Моя работа давно превратилась в неотъемлемую часть жизни. И я привык. А тебе пора думать о себе. Пожалуйста, - он коснулся моей руки, слегка поглаживая. 
      <p>Я обняла его. Крепко-крепко. Это был один из последних наших душевных вечеров перед моим отъездом. 
`,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part01[57].Begin(),Game.Stats.Father.Add(0),Game.Achievements.A_Part01Completed.Unlock()}],background:"Persons/Dad"}),Game.Scenes.A_Part01[57]=new Scene({text:`
      Все происходило стремительно, словно папа решил все сделать так, чтобы не было больнее отпускать меня. 
      <p>Через неделю приехал Артур. Я стояла с собранным рюкзаком, взволнованно теребя волосы, и абсолютно не понимая, куда приведет моя новая дорога жизни. 
`,buttontext:[""],buttonaction:[()=>{setTimeout(()=>{Game.Scenes.A_Part02[0].Begin()},1e3),Game.LoadScreen("Aurora_Part02"),Game.Progress.Save("Aurora_Part02")}],background:"Backgrounds/Lighthouse_Night"}),Game.Scenes.A_Part02=[],Game.Scenes.A_Part02[0]=new Scene({text:`
    Раннее солнце освещало тихую водную гладь, оставляя несколько играющих бликов на ее поверхности. В тот момент мне почему-то казалось, что я в последний раз вижу эту умиротворяющую картину. 
    <p>Во мне смешались чувства. А как могло быть иначе, ведь меня будто вырывают из моего кокона и оставляют одну на потеху неизвестности.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[1].Begin()}],background:"Backgrounds/Lighthouse",condition:function(){Game.Sounds.Play("Music","Lighthouse")}}),Game.Scenes.A_Part02[1]=new Scene({text:`
    Это были не самые приятные ощущения. Но я не могла от них избавиться. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[2].Begin()}],background:"Backgrounds/Lighthouse"}),Game.Scenes.A_Part02[2]=new Scene({text:`
    Однако я должна перебороть себя. Сейчас, сжимая лямку рюкзака, мне оставалось только решиться - отпустить давно державшее меня место и начать жить для себя. 
    <p>Таково было мое сокровенное желание.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[3].Begin()}],background:"Backgrounds/Lighthouse"}),Game.Scenes.A_Part02[3]=new Scene({text:`
    Я глубоко вздохнула и нашла взглядом папу. Он стоял рядом с Артуром и в очередной раз благодарил его за подаренную возможность. 
    <p>Наконец, и я решила подойти. Я успела попрощаться с домом, теперь предстояло самое трудное.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[4].Begin()}],background:"Backgrounds/Lighthouse"}),Game.Scenes.A_Part02[4]=new Scene({text:`
    - Папа, могли бы мы…? 
    <p>- Да, дочка, - отец серьезно взглянул на Артура. - Береги ее. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[5].Begin()}],background:"Persons/Dad"}),Game.Scenes.A_Part02[5]=new Scene({text:`
    - Я сделаю все необходимое, даю слово, - они пожали друг другу руки. - Аврора, я заведу машину. Не думай о времени. 
    <p>Я кивнула и мы отошли с отцом к одному из наших любимых мест.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[6].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[6]=new Scene({text:`
    Скамейка открывала вид на море. Морской бриз освежал, тихонько обдувая каждую частичку тела. 
    <p>Мы сели. Молча. Иногда тишина может сказать больше, чем даже самое ласковое слово. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[7].Begin()}],background:"Backgrounds/Bench"}),Game.Scenes.A_Part02[6]=new Scene({text:`
    Держась за руки, мы слушали волны, завывание ветра и крики чаек. В этот момент я четко осознала для себя - никаких прощаний навсегда. Наша связь не может так просто разрушиться.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[7].Begin()}],background:"Backgrounds/Bench"}),Game.Scenes.A_Part02[7]=new Scene({text:`
    - Аврора, - папа положил поверх моей руки свою. - Извини, если все происходит так резко. Я просто не мог по-другому. Ощущение, что если ты пробудешь здесь еще один день, то я никогда не смогу отпустить тебя. Чертов эгоист… чертов алкоголик…
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[8].Begin()}],background:"Persons/Dad"}),Game.Scenes.A_Part02[8]=new Scene({text:`
    - Папа, - я обняла его, прижимаясь к плечу. - Мне все это тоже дается нелегко, но решение принято. Я хочу попробовать пожить. По-другому. Но знай, у меня и в мыслях не было бросать тебя… Мы с Артуром будем приезжать.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[9].Begin()}],background:"Persons/Dad"}),Game.Scenes.A_Part02[9]=new Scene({text:`
    - Держись этого парня, милая. С ним ты не будешь знать печали или грусти. Он хороший человек и достоин быть рядом с тобой. 
    <p>- Папа! - я раскраснелась, так как сказанные слова были больше похожи на его благословение, а не простое напутствие. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[10].Begin()}],background:"Backgrounds/Bench"}),Game.Scenes.A_Part02[10]=new Scene({text:`
    - Тебе нужна опора, чтобы встать на ноги, - отец с грустью стал вглядываться в очертания морского горизонта. - Я не смог ей стать. Не смог сберечь дорогих мне людей. Но тебя я сберегу. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[11].Begin()}],background:"Backgrounds/Bench"}),Game.Scenes.A_Part02[11]=new Scene({text:`
    Сердце закололо. Почему именно сейчас он так разоткровенничался? Мы мало разговаривали о постигших нас трагедиях, однако чувствовалась эта нужда. 
    Выговориться. Не одинокому морю, которое не ответит, а близкому, что подставит плечо в трудный момент. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[12].Begin()}],background:"Backgrounds/Bench"}),Game.Scenes.A_Part02[12]=new Scene({text:`
    Я очень долго думала над тем, что сказать, но нужные слова не приходили в голову. 
    Мне оставалось сделать лишь последнее действие перед своим отъездом. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[13].Begin()}],background:"Backgrounds/Bench",condition:function(){1<=Game.Stats.Drawing.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.A_Part02[13].Begin()}),1<=Game.Stats.Writing.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.A_Part02[29].Begin()}),1<=Game.Stats.Music.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.A_Part02[36].Begin()})}}),Game.Scenes.A_Part02[13]=new Scene({text:`
    Из своего рюкзака я достала немного потрепанный листок со своим рисунком. На нем были изображены мы с ним. Наш маяк и бескрайнее море.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[14].Begin()}],background:"Backgrounds/Lighthouse_Painting"}),Game.Scenes.A_Part02[14]=new Scene({text:`
    В один из вечеров мне пришла идея оставить отцу что-нибудь на память. Что-то простое, но в то же время по-своему ценное. 
    Мне нравилось передавать свои эмоции через краски, поэтому я просто нарисовала этот скромный пейзаж.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[15].Begin()}],background:"Backgrounds/Lighthouse_Painting"}),Game.Scenes.A_Part02[15]=new Scene({text:`
    - Папа, - я протянула ему свой подарок. - Ты часто проводишь время наедине с собой и своими мыслями. 
    Так пусть этот рисунок будет хранить в твоем сердце воспоминание о нас, обо мне.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[16].Begin()}],background:"Backgrounds/Lighthouse_Painting"}),Game.Scenes.A_Part02[16]=new Scene({text:`
    Папа бережно взял листок и принялся рассматривать его. На его глазах застыли слезы. Он проговорил: 
    <p>- Знаешь, я отчетливо помню, как мы собирались переезжать на этот маяк. Тогда я сильно переживал, потому что боялся получить отказ с вашей стороны. 
    Но когда твоя мама услышала эти новости, ее лицо озарила такая счастливая улыбка… Я не видел ее такой с момента пропажи Яна.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[17].Begin()}],background:"Backgrounds/Lighthouse_Painting"}),Game.Scenes.A_Part02[17]=new Scene({text:`
    Папа сильно сжал кулаки, словно пытаясь заменить одну боль на другую. Как бы ему не было сейчас тяжело, он договорил то, что хотел:
    <p>- Вы ведь не сомневались ни на секунду. 
    <p>- Разумеется, - я аккуратно попыталась разжать его руки. - Нам хотелось жить вместе и не чувствовать больше разлуку с тобой. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[18].Begin()}],background:"Backgrounds/Lighthouse_Painting"}),Game.Scenes.A_Part02[18]=new Scene({text:`
    - Я понимаю. Но, Аврора, скажи мне честно. Спустя год жизни здесь, ты не считаешь этот переезд ошибкой? 
    <p>Мне никогда не нравились подобные вопросы. То, что произошло, оно уже свершилось. Возможно это происки судьбы или итог наших выборов. Но прошлого не вернуть. 
    <p>Невольно я все равно начала задумываться над вопросом.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[19].Begin()}],background:"Backgrounds/Lighthouse_Painting"}),Game.Scenes.A_Part02[19]=new Scene({text:`
    Переезд. Если бы мы не переехали, мамино здоровье бы не ухудшилось? Но были бы мы также счастливы вдали друг от друга? Стоили ли эти мгновения того, во что сейчас превратилась наша жизнь?
    <p>- Аврора? 
    <p>Я: 
        `,buttontext:["\u041D\u0435 \u0436\u0430\u043B\u0435\u044E \u043E \u043F\u0435\u0440\u0435\u0435\u0437\u0434\u0435","\u0414\u0443\u043C\u0430\u044E, \u044D\u0442\u043E \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u0432\u044B\u0431\u043E\u0440"],buttonaction:[()=>{Game.Scenes.A_Part02[20].Begin()},()=>{Game.Scenes.A_Part02[25].Begin()}],background:"Backgrounds/Lighthouse"}),Game.Scenes.A_Part02[20]=new Scene({text:`
    - Как бы не было тяжело, все это по итогу привело нас к тому, что мы имеем. Я никогда не скажу, что это был неправильный выбор. Я счастлива. Это может отличаться от привычного счастья, но таков мой ответ.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[21].Begin()}],background:""}),Game.Scenes.A_Part02[21]=new Scene({text:`
    - Как бы не было тяжело, все это по итогу привело нас к тому, что мы имеем. Я никогда не скажу, что это был неправильный выбор. Я счастлива. Это может отличаться от привычного счастья, но таков мой ответ.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[22].Begin()}],background:""}),Game.Scenes.A_Part02[22]=new Scene({text:`
    Отец кивнул, сжимая подаренный мною подарок. На миг мне показалось, что я вижу облегчение на его лице. Словно, если бы он услышал нечто другое, его и без того нестабильное состояние - ухудшилось.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[23].Begin(),Game.Message("\u041E\u0442\u0435\u0446 \u0431\u043B\u0430\u0433\u043E\u0434\u0430\u0440\u0435\u043D \u0437\u0430 \u0432\u0430\u0448\u0435 \u0431\u043B\u0430\u0433\u043E\u0441\u043A\u043B\u043E\u043D\u043D\u043E\u0435 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u0435. \u0415\u0433\u043E \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0443\u043B\u0443\u0447\u0448\u0430\u0435\u0442\u0441\u044F."),Game.Stats.Father.Add(1)}],background:""}),Game.Scenes.A_Part02[23]=new Scene({text:`
    - Спасибо, милая. Спасибо за честный ответ, - папа расслабился и откинул голову назад, продолжая мысль. - Мы часто делаем неправильные выборы, но ты права. То счастье, пусть даже мимолетное, что мы обрели здесь - оно стоит всего пережитого.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[24].Begin(),Game.Message("\u0412\u044B \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442\u0435 \u0436\u0438\u0437\u043D\u044C \u0442\u0430\u043A\u043E\u0439, \u043A\u0430\u043A\u0430\u044F \u043E\u043D\u0430 \u0435\u0441\u0442\u044C. \u0411\u043B\u0430\u0433\u043E\u0434\u0430\u0440\u044F \u0432\u0430\u0448\u0435\u043C\u0443 \u0432\u044B\u0431\u043E\u0440\u0443 \u0434\u0443\u0445 \u0410\u0432\u0440\u043E\u0440\u044B \u043A\u0440\u0435\u043F\u0447\u0430\u0435\u0442."),Game.Stats.Aurora.Add(1)}],background:"Persons/Dad"}),Game.Scenes.A_Part02[24]=new Scene({text:`
    - Аврора, - папа смотрел мне прямо в глаза. - Ты так выросла. Ты уже не тот зажатый ребенок. Нет. Я вижу перед собой уверенную девушку, которая так по-взрослому смотрит на мир и принимает с достоинством все невзгоды. Я горжусь тобой. 
    <p>- Спасибо, папа. Все это только благодаря тому, что ты остаешься моим проводником и поддерживаешь.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[42].Begin()}],background:"Persons/Dad"}),Game.Scenes.A_Part02[25]=new Scene({text:`
    - Я люблю наш новый дом всей душой. И несмотря на ту радость, что я испытала, мне всегда казалось -  весь этот переезд был ошибкой. И не потому что нам здесь не нравилось, а потому что…
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[26].Begin()}],background:"Persons/Dad"}),Game.Scenes.A_Part02[26]=new Scene({text:`
    - Она была бы жива, - папа договорил за меня и продолжил. - Жива. Да. Как обычно, ждала меня с работы, вечно бы суетилась. Редко недовольная, но живая.
    <p>- Папа, я…
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[27].Begin(),Game.Message("\u041E\u0442\u0435\u0446 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0435\u0442 \u0432\u0438\u043D\u0438\u0442\u044C \u0441\u0435\u0431\u044F \u0432 \u0441\u043C\u0435\u0440\u0442\u0438 \u043C\u0430\u0442\u0435\u0440\u0438. \u0415\u0433\u043E \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0443\u0445\u0443\u0434\u0448\u0430\u0435\u0442\u0441\u044F."),Game.Stats.Father.Add(-1)}],background:"Persons/Dad"}),Game.Scenes.A_Part02[27]=new Scene({text:`
    - Не стоит, милая. Спасибо за честность. Я все понимаю. Я ведь сам такого же мнения. И не знаю, смогу ли перестать зацикливаться на прошлом. На своих ошибках. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[28].Begin(),Game.Message("\u0412\u044B \u043D\u0435 \u043C\u043E\u0436\u0435\u0442\u0435 \u0441\u043C\u0438\u0440\u0438\u0442\u044C\u0441\u044F \u0441 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C\u044E, \u0441 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u0441\u0442\u0430\u043B\u043A\u0438\u0432\u0430\u0435\u0442\u0435\u0441\u044C. \u0412\u0441\u043B\u0435\u0434\u0441\u0442\u0432\u0438\u0435 \u0432\u0430\u0448\u0435\u0433\u043E \u0432\u044B\u0431\u043E\u0440\u0430 \u0410\u0432\u0440\u043E\u0440\u0430 \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u0442 \u0431\u043E\u043B\u044C\u0448\u0435 \u0441\u043E\u043C\u043D\u0435\u0432\u0430\u0442\u044C\u0441\u044F \u0432 \u0441\u0435\u0431\u0435."),Game.Stats.Aurora.Add(-1)}],background:"Persons/Dad"}),Game.Scenes.A_Part02[28]=new Scene({text:`
    В тот момент я поделилась своими самыми потаенными мыслями. Я была уверена, что смирилась с утратой, но в глубине души я мечтала повернуть время вспять и не переезжать на маяк.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[42].Begin()}],background:"Persons/Dad"}),Game.Scenes.A_Part02[29]=new Scene({text:`
    Из своего рюкзака я достала немного потрепанный листок со своим написанным стихом, которым я хотела поделиться с папой.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[30].Begin()}],background:"Backgrounds/Note"}),Game.Scenes.A_Part02[29]=new Scene({text:`
    В один из вечеров мне пришла идея оставить отцу что-нибудь на память. 
    Что-то простое, но в то же время по-своему ценное. Мне нравилось передавать свои эмоции через небольшие произведения, поэтому руки сами потянулись писать. Небольшое нескладное стихотворение, однако моего собственного сочинения.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[30].Begin()}],background:"Backgrounds/Note"}),Game.Scenes.A_Part02[30]=new Scene({text:`
   То, во что я вкладывала душу и хотела, чтобы это хоть немного помогло отцу не терять надежду.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[31].Begin()}],background:"Backgrounds/Note"}),Game.Scenes.A_Part02[31]=new Scene({text:`
   - Папа, - я протянула ему свой подарок. - Ты часто проводишь время наедине с собой и своими мыслями. Возможно однажды, читая эти строки, они навеют тебе о свете, и что ты не одинок.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[32].Begin()}],background:"Backgrounds/Note"}),Game.Scenes.A_Part02[32]=new Scene({text:`
    Папа бережно взял листок и принялся рассматривать его. На его глазах застыли слезы. Он проговорил: 
    <p>- Знаешь, я отчетливо помню, как мы собирались переезжать на этот маяк. Тогда я сильно переживал, потому что боялся получить отказ с вашей стороны. 
    Но когда твоя мама услышала эти новости, ее лицо озарила такая счастливая улыбка… Я не видел ее такой с момента пропажи Яна.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[33].Begin()}],background:"Backgrounds/Note"}),Game.Scenes.A_Part02[33]=new Scene({text:`
    Папа сильно сжал кулаки, словно пытаясь заменит одну боль на другую. Как бы ему не было сейчас тяжело, он договорил то, что хотел:
    <p>- Вы ведь не сомневались ни на секунду. 
    <p>- Разумеется, - я аккуратно попыталась разжать его руки. - Нам хотелось жить вместе и не чувствовать больше разлуку с тобой. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[35].Begin()}],background:"Backgrounds/Note"}),Game.Scenes.A_Part02[35]=new Scene({text:`
    - Я понимаю. Но, Аврора, скажи мне честно. Спустя год жизни здесь, ты не считаешь этот переезд ошибкой? 
    <p>Мне никогда не нравились подобные вопросы. То, что произошло, оно уже свершилось. Возможно это происки судьбы или итог наших выборов. Но прошлого не вернуть. 
    <p>Невольно я все равно начала задумываться над вопросом.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[19].Begin()}],background:"Backgrounds/Note"}),Game.Scenes.A_Part02[36]=new Scene({text:`
    Из своего рюкзака я достала музыкальный диск, которым я хотела поделиться с папой.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[37].Begin()}],background:"Backgrounds/Disc"}),Game.Scenes.A_Part02[37]=new Scene({text:`
    В один из вечеров мне пришла идея оставить отцу что-нибудь на память. Что-то простое, но в то же время по-своему ценное. 
    И так как я любила  музыку, мне пришла идея собрать коллекцию своих любимых мелодий на диск, чтобы папе было не так грустно проводить время на службе в маяке.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[38].Begin()}],background:"Backgrounds/Disc"}),Game.Scenes.A_Part02[38]=new Scene({text:`
    - Папа, - я протянула ему свой подарок. - Ты часто проводишь время наедине с собой и своими мыслями. 
    Возможно, слушая мой плейлист, ты вспомнишь, что не одинок. А я всегда рядом с тобой, даже когда так далеко.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[39].Begin()}],background:"Backgrounds/Disc"}),Game.Scenes.A_Part02[39]=new Scene({text:`
    Папа бережно взял диск и принялся рассматривать его. На его глазах застыли слезы. Он проговорил: 
    <p>- Знаешь, я отчетливо помню, как мы собирались переезжать на этот маяк. Тогда я сильно переживал, потому что боялся получить отказ с вашей стороны. 
    Но когда твоя мама услышала эти новости, ее лицо озарила такая счастливая улыбка… Я не видел ее такой с момента пропажи Яна.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[40].Begin()}],background:"Backgrounds/Disc"}),Game.Scenes.A_Part02[40]=new Scene({text:`
    Папа сильно сжал кулаки, словно пытаясь заменить одну боль на другую. Как бы ему не было сейчас тяжело, он договорил то, что хотел:
    <p>- Вы ведь не сомневались ни на секунду. 
    <p>- Разумеется, - я аккуратно попыталась разжать его руки. - Нам хотелось жить вместе и не чувствовать больше разлуку с тобой. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[41].Begin()}],background:"Backgrounds/Disc"}),Game.Scenes.A_Part02[41]=new Scene({text:`
    - Я понимаю. Но, Аврора, скажи мне честно. Спустя год жизни здесь, ты не считаешь этот переезд ошибкой? 
    <p>Мне никогда не нравились подобные вопросы. То, что произошло, оно уже свершилось. Возможно это происки судьбы или итог наших выборов. Но прошлого не вернуть. 
    <p>Невольно я все равно начала задумываться над вопросом.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[19].Begin()}],background:"Backgrounds/Disc"}),Game.Scenes.A_Part02[42]=new Scene({text:`
    - Дорогая, давай забудем все эти грустные мысли, - папа попытался разрядить обстановку своей добродушной улыбкой. - Спасибо тебе за подарок. Я буду беречь его и ждать твоего скорого приезда.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[43].Begin()}],background:"Backgrounds/Bench"}),Game.Scenes.A_Part02[43]=new Scene({text:`
    С одной стороны, я была рада, что папа перевел тему на что-то более нейтральное. Все же мы прощались и я не могла быть рядом. 
    <p>Но с другой стороны, я стала больше переживать за него. Сейчас он выглядел подавленно. И, видимо, только работа и мои визиты могли бы скрасить его одиночество.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[44].Begin()}],background:"Backgrounds/Bench"}),Game.Scenes.A_Part02[44]=new Scene({text:`
    - Не забывай писать мне, - сказала я немного обеспокоенным тоном. - Телефон. Или если не будет вдруг связи - письма. Что угодно. 
    <p>- Конечно. Все будет хорошо, дорогая. А теперь тебе пора. Некрасиво заставлять Артура так долго ждать.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[45].Begin()}],background:"Backgrounds/Bench"}),Game.Scenes.A_Part02[45]=new Scene({text:`
    Мы еще раз обнялись. Крепко. Долго. 
    <p>Затем, я взяла те немногие вещи, что у меня были и села в машину Артура.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[47].Begin()}],background:"Backgrounds/Bench"}),Game.Scenes.A_Part02[47]=new Scene({text:`
    - Все в порядке? – спросил парень, пристегиваясь. 
    <p>- Да, - я смахнула непослушные слезы. - Я думаю пора выезжать.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[48].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[48]=new Scene({text:`
    Он кивнул. Не стал допытываться, ведь он понимал причину моих эмоций. 
    <p>Машина неспешно двинулась с места, оставляя позади маяк и отца, машущего на прощание рукой.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[49].Begin(),Game.Sounds.Play("Music","Aurora_Daily_01")}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[49]=new Scene({text:`
    У меня было время, чтобы успокоиться, рассматривая проносящиеся за окном пейзажи. В данный момент окружающая красота природы не привлекала меня.
    <p> Дорога пролегала через город, где некогда я провела почти всю сознательную жизнь. И отчего-то мне не было грустно или плохо. Я ничего не ощущала.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[50].Begin()}],background:"Backgrounds/From_Car"}),Game.Scenes.A_Part02[50]=new Scene({text:`
    Вот мы проезжаем улицу, где мы с Яном частенько прогуливались, а вот магазин, где брат подрабатывал в свободное от учебы время. 
    <p>Проехав еще несколько кварталов, я увидела школу, которую ранее посещала. И как-то машинально озвучила свои мысли Артуру:
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[51].Begin()}],background:"Backgrounds/From_Car"}),Game.Scenes.A_Part02[51]=new Scene({text:`
    - Школа, где мы учились с Яном. Кажется, что я не была здесь целую вечность… 
    <p>Остановившись на светофоре, парень внимательно осмотрел учебное заведение и проговорил:
    <p>- Не скучаешь по тем временам?
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[52].Begin()}],background:"Backgrounds/From_Car"}),Game.Scenes.A_Part02[52]=new Scene({text:`
    - Воспоминаний много: хороших и плохих - это дало старт моей жизни, за что я буду всегда благодарна этому месту. Но что точно могу сказать - я не скучаю. 
    <p>- Понимаю. Уверен в новом городе, ты сможешь построить только счастливые воспоминания.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[53].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[53]=new Scene({text:`
    Оптимизм парня всегда придавал мне большую уверенность и помогал избавиться от грустных мыслей. 
    <p>Артур был навеселе и полностью сосредоточился на дороге. Иногда он легонько постукивал в ритм играющей на фоне мелодии.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[54].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[54]=new Scene({text:`
    Спустя где-то час поездки, я успела немного подремать и окончательно прийти в норму. Увидев, что я проснулась, Артур спросил: 
    <p>- Все хорошо? Если необходимо, давай остановимся и отдохнем. Я бы не против выпить чего-нибудь горяченького.
    <p>- Ничего, - я улыбнулась от проявления такой заботы. - Главное, чтобы ты не устал.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[60].Begin()}],background:"Persons/Arthur",condition:function(){Game.Stats.Song.Set(1),1<=Game.Stats.Music.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.A_Part02[55].Begin()})}}),Game.Scenes.A_Part02[55]=new Scene({text:`
    - Артур, ты не против, если я пощелкаю радио? 
    <p>- Не нравится мелодия? - с задором произнес парень. 
    <p>- Нравится, конечно. Просто интересно, что там еще есть. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[56].Begin(),Game.Message("\u0422\u0430\u043A \u043A\u0430\u043A \u0432\u0430\u0448\u0430 \u0410\u0432\u0440\u043E\u0440\u0430 \u043B\u044E\u0431\u0438\u0442 \u043C\u0443\u0437\u044B\u043A\u0443, \u0432\u0430\u043C \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0432\u044B\u0431\u043E\u0440 \u043C\u0443\u0437\u044B\u043A\u0438 \u043D\u0430 \u043F\u043E\u0432\u0441\u0435\u0434\u043D\u0435\u0432\u043D\u0443\u044E \u0436\u0438\u0437\u043D\u044C \u0434\u0435\u0432\u0443\u0448\u043A\u0438 \u0432 \u0433\u043E\u0440\u043E\u0434\u0435.")}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[56]=new Scene({text:`
    - Аврора, не спрашивай о таких мелочах. Просто выбери то, что тебе хочется послушать. 
        `,buttontext:["\u041F\u043E\u0441\u043B\u0443\u0448\u0430\u0442\u044C \u0422\u0440\u0435\u043A 1","\u041F\u043E\u0441\u043B\u0443\u0448\u0430\u0442\u044C \u0422\u0440\u0435\u043A 2","\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043F\u0440\u043E\u0441\u043B\u0443\u0448\u0438\u0432\u0430\u0435\u043C\u0443\u044E"],buttonaction:[()=>{Game.Sounds.Play("Music","Aurora_Daily_01"),Game.Stats.Song.Set(1)},()=>{Game.Sounds.Play("Music","Aurora_Daily_02"),Game.Stats.Song.Set(2)},()=>{Game.Scenes.A_Part02[59].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[59]=new Scene({text:`
    Послушав несколько песен, мне все же пришлась по душе именно эта мелодия.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[60].Begin(),Game.Achievements.A_Musicality.Unlock()}],background:"Backgrounds/Arthurs_Car"}),Game.Scenes.A_Part02[60]=new Scene({text:`
    Несмотря на то, что мы с Артуром были довольно близки: я ему доверяла и чувствовала с его стороны похожие ощущения, мне в голову пришел один очевидный вопрос.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[61].Begin()}],background:"Backgrounds/Arthurs_Car"}),Game.Scenes.A_Part02[61]=new Scene({text:`
    С чего вдруг он проявил такую любезность, помогая мне? Он такой по натуре или есть какие-то скрытые мотивы?
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[61].Begin()}],background:"Backgrounds/Arthurs_Car",condition:function(){1<=Game.Stats.Romantic.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.A_Part02[62].Begin()}),1<=Game.Stats.Pragmatic.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.A_Part02[64].Begin()})}}),Game.Scenes.A_Part02[62]=new Scene({text:`
    Конечно, я боялась. Меня пугала неизвестность и излишняя доброта. Мой старший брат Ян всегда учил меня, что нельзя так просто полагаться на людей. Нужно лучше узнавать их.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[63].Begin()}],background:"Backgrounds/Arthurs_Car"}),Game.Scenes.A_Part02[63]=new Scene({text:`
    Но почему-то, к Артуру я не испытывала опаски. Мне хотелось полностью доверять ему, невзирая на мои предубеждения. Это было наивно. Но я так чувствовала. 
    <p>Однако для своего же спокойствия, я решила спросить:
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[66].Begin()}],background:"Backgrounds/Arthurs_Car"}),Game.Scenes.A_Part02[64]=new Scene({text:`
    Ничего не делается просто так в этом мире. Мой старший брат Ян всегда учил меня, что нельзя так просто полагаться на людей. Нужно лучше узнавать их. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[65].Begin()}],background:"Backgrounds/Arthurs_Car"}),Game.Scenes.A_Part02[65]=new Scene({text:`
    И сейчас, когда я на пути к своей новой жизни, мне хочется знать истинную причину такого отношения и быть более уверенной в человеке, с которым я отправилась в это путешествие. 
    <p>Для своего же спокойствия, я решила спросить:
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[66].Begin()}],background:"Backgrounds/Arthurs_Car"}),Game.Scenes.A_Part02[66]=new Scene({text:`
    - Артур, скажи, почему ты согласился на всю эту авантюру? 
    <p>- Аврора, - не отвлекаясь от дороги, проговорил парень. - Я понимаю, твои опасения. Но не переживай у меня нет скрытых мотивов, я делаю это просто, чтобы помочь тебе встать на ноги.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[67].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[67]=new Scene({text:`
     - Но почему? - я  не собиралась сдаваться.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[68].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[68]=new Scene({text:`
     - Просто потому что я вижу, какой ты хороший человек. Я вижу, как твой отец хотел для тебя другой жизни. Как ты хотела для себя чего-то нового. Помнишь наш разговор, когда мы пошли прогуляться по лесу?
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[69].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[69]=new Scene({text:`
     Мы с Артуром много гуляли. Когда он приезжал, то часто рассказывал мне о своей жизни в городе, о своих увлечениях и учебе. Мне было только в радость, что парень открывается для меня с разных сторон. 
    <p>Я:
        `,buttontext:["\u041F\u043E\u043C\u043D\u044E \u044D\u0442\u043E\u0442 \u0440\u0430\u0437\u0433\u043E\u0432\u043E\u0440 \uD83D\uDD10","\u041D\u0435 \u043C\u043E\u0433\u043B\u0430 \u0432\u0441\u043F\u043E\u043C\u043D\u0438\u0442\u044C"],buttonaction:[()=>{Game.Scenes.A_Part02[70].Begin(),Game.Sounds.Play("Music","Romantic"),AndroidApp("showAd")},()=>{Game.Scenes.A_Part02[93].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[70]=new Scene({text:`
     Мы с Артуром частенько гуляли по территории вокруг маяка. В один из солнечных дней мы решили пройтись по лесу, который был в пятнадцати минутах езды от нашего дома. У Артура была машина, но в этот день нам захотелось пройтись пешком.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[71].Begin()}],background:"Backgrounds/Forest"}),Game.Scenes.A_Part02[71]=new Scene({text:`
     Тогда прошло около месяца с того времени, как мамы не стало. Легкий ветерок покачивал деревья, а лесная обстановка позволяла абстрагироваться от всех проблем. 
     <p>Это было похоже на сказку, где вот-вот из-за деревьев выйдет добрый волшебник, взмахнет своим посохом и весь мир преобразится.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[72].Begin()}],background:"Backgrounds/Forest"}),Game.Scenes.A_Part02[72]=new Scene({text:`
     Артур шел рядом со мной. Мы разговаривали на всякие отвлеченные темы. 
     <p>- Повезло же нам с погодой, - отметил парень, любуясь красотами природы.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[73].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[73]=new Scene({text:`
     - Ты прав, - его слова навели меня на одну идею. - А помнишь ту поляну, которую мы нашли в прошлый раз? Может быть снова пойдем туда и немного отдохнем?
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[74].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[74]=new Scene({text:`
     - Хорошая идея! Если я правильно помню, то это где-то в той стороне, - Артур показал куда-то на восток. - Заодно перекусим.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[75].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[75]=new Scene({text:`
     Мы прошли еще немного вглубь леса. Артур галантно помогал мне преодолевать препятствия, поддерживая за руку, отодвигая назойливые ветки деревьев. 
     <p>Остаток пути прошел в спокойствии. Наконец, мы достигли места назначения.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[76].Begin()}],background:"Backgrounds/Forest"}),Game.Scenes.A_Part02[76]=new Scene({text:`
     Фиолетовые цветы располагались на просторной поляне. Солнце почти село. Его лучи пытались пробраться сквозь стволы деревьев, одаривая нас своим теплом. 
     <p>Я прилегла на траву и раскинула руки по сторонам. Так хорошо, так умиротворенно. Именно то, что хотелось чувствовать каждый день.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[77].Begin()}],background:"Backgrounds/Forest_Flowers"}),Game.Scenes.A_Part02[77]=new Scene({text:`
    Артур аккуратно сел рядом. Почему-то он улыбался. Так искренне. Так живо. 
    <p>- Артур, случилось что-то хорошее?
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[78].Begin()}],background:"Backgrounds/Forest_Flowers"}),Game.Scenes.A_Part02[78]=new Scene({text:`
    - Конечно! Мы сейчас с тобой вдвоем. Далеко от всей суеты. Наедине с природой. И… - он достал из рюкзака по сэндвичу. - Как же обойтись без вкусняшек. 
    <p>Он видел, что я не улыбалась так, как это было раньше. На секунду парень о чем-то задумался, а затем спросил: 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[79].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[79]=new Scene({text:`
    - Аврора, как ты? 
    <p>- Все хорошо, - я понимала, почему он задает такой вопрос и не врала. Сейчас я правда себя так ощущала. Но внешне это было трудно заметить.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[80].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[80]=new Scene({text:`
    - Я рад… Скажи, ты бы хотела уехать в город и начать жить иначе?
    <p>Вопрос застал меня врасплох. Я привстала, чтобы смотреть в глаза Артуру и сказала правду:
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[81].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[81]=new Scene({text:`
    - Хотела бы. Но я не могу бросить отца. Мне трудно представить, как ему сейчас тяжело. 
    <p>Улыбка Артура стала от чего-то еще шире. 
    <p>- Мне нравится осознавать, что в мире остались люди, которые настолько ценят свою семью.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[82].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[82]=new Scene({text:`
    - Пропажа брата, затем смерть… - я не смогла договорить предложение. - Папе как-никак сейчас нужна поддержка. А ведь он еще как-то умудряется работать. 
    <p>Артур придвинулся ближе ко мне и взял меня за руку. В ответ я: 
        `,buttontext:["\u0421\u0436\u0430\u043B\u0430 \u0435\u0433\u043E \u0440\u0443\u043A\u0443 \u0441\u0438\u043B\u044C\u043D\u0435\u0435","\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u0441\u0434\u0435\u043B\u0430\u043B\u0430"],buttonaction:[()=>{Game.Scenes.A_Part02[83].Begin()},()=>{Game.Scenes.A_Part02[87].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[83]=new Scene({text:`
    Я чувствовала в этом жесте поддержку. Он как никто понимал, что мне тоже было очень тяжело. 
    <p>Другой рукой парень притянул меня и заключил в крепкие объятия. Я расслабилась, ощущая его дыхание на своей шее, его сердцебиение. Сейчас мы с ним были словно единое целое.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[84].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[84]=new Scene({text:`
    - Артур, спасибо тебе. За все. 
    <p>- Аврора, обещаю. Я помогу тебе, чем смогу. Я вижу, как тебе нелегко приходится и не допущу, чтобы ты продолжала так... 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[85].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[85]=new Scene({text:`
    Он не договорил, но его высказывания все равно отозвались теплом на сердце. Я не могла тогда представить, что мог придумать Артур, но его слова и действия невольно заставляли верить в светлый исход.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[86].Begin(),Game.Message("\u0410\u0440\u0442\u0443\u0440 \u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0441\u044F \u0431\u043B\u0438\u0436\u0435 \u043A \u0410\u0432\u0440\u043E\u0440\u0435"),Game.Stats.Arthur.Add(1)}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[86]=new Scene({text:`
    Оставшиеся часы до темноты, я пролежала на плече Артура. Не плача, не испытывая грусти. Только наслаждалась его компанией и разговорами, что грели душу.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[91].Begin(),Game.Sounds.Play("Music","Aurora_Daily_0"+Game.Stats.Song.Get())}],background:"Backgrounds/Forest_Flowers"}),Game.Scenes.A_Part02[87]=new Scene({text:`
    Разговор выбил меня из привычной колеи спокойствия, к которому я стремилась. Я верила Артуру, но сейчас мне было тяжело отвечать на подобные вопросы. 
    <p>Парень, видя мою реакцию, отстранился и проговорил:
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[88].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[88]=new Scene({text:`
    - Прости, я не должен был давить на тебя всеми этими расспросами… 
    <p>- Ты ничего такого не сделал, просто я, видимо, до сих пор не могу смириться. 
    <p>- Аврора, обещаю. Я помогу тебе, чем смогу. Я вижу, как тебе нелегко приходится и не допущу, чтобы ты продолжала так...
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[89].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[89]=new Scene({text:`
    Он не договорил, но его высказывания все равно отозвались теплом на сердце. Я не могла тогда представить, что мог придумать Артур, но его слова и действия невольно заставляли верить в светлый исход.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[90].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[90]=new Scene({text:`
    Оставшиеся часы до темноты, мы сидели рядом друг с другом и мирно вели беседу на различные темы, стараясь чуть дольше не возвращаться в реальность.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[91].Begin(),Game.Sounds.Play("Music","Aurora_Daily_0"+Game.Stats.Song.Get())}],background:"Backgrounds/Forest_Flowers"}),Game.Scenes.A_Part02[91]=new Scene({text:`
    Я вынырнула из воспоминаний, снова возвращаясь в салон автомобиля Артура.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[92].Begin(),Game.Message("\u0410\u0440\u0442\u0443\u0440\u0443 \u043F\u0440\u0438\u044F\u0442\u043D\u043E, \u0447\u0442\u043E \u0432\u044B \u043F\u043E\u043C\u043D\u0438\u0442\u0435 \u0435\u0433\u043E \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443"),Game.Stats.Arthur.Add(1)}],background:"Backgrounds/Arthurs_Car"}),Game.Scenes.A_Part02[92]=new Scene({text:`
    - Я рад, что ты запомнила тот день. Теперь ты понимаешь, что я тогда говорил правду. Видя твое стремление к другой жизни, я не мог не помочь.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[95].Begin()}],background:"Backgrounds/Arthurs_Car"}),Game.Scenes.A_Part02[93]=new Scene({text:`
    - Извини, все как в тумане. Я помню лес, но не могу вспомнить конкретных деталей. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[94].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[94]=new Scene({text:`
    Было видно, что Артур на миг расстроился, но сразу же взял себя в руки и рассказал:
    <p>- Именно тогда я обещал тебе, что постараюсь помочь изменить твою жизнь. Ведь ты сама этого хотела. И, надеюсь, теперь ты убедилась, что я говорил правду и сдержал свое слово.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[95].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[95]=new Scene({text:`
    - Спасибо, Артур. Я никогда не забуду эту помощь и обязательно буду делать все, чтобы отплатить тебе. 
    <p>- Брось. Не забивай себе голову этим. Я от тебя ничего не требую. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[96].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[96]=new Scene({text:`
    - Но я требую от себя. Я так не могу.  
    <p>- Придет время и ты обязательно отплатишь, - сдался парень, наигранно громко вздохнув.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[97].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[97]=new Scene({text:`
    Дальнейшие часы в пути прошли, по большей части молча. Я не хотела больше отвлекать Артура от дороги, к тому же меня продолжало сильно клонить в сон. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[98].Begin(),Game.Sounds.Play("Music","Lighthouse")}],background:"Backgrounds/Arthurs_Car"}),Game.Scenes.A_Part02[98]=new Scene({text:`
    Мне снился маяк. Но там не было отца или мамы.
    <p>На смотровой площадке стояла одинокая фигура старика, который держал в руках маленький сверток. Без сомнения в нем был ребенок.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[99].Begin()}],background:"Backgrounds/Lighthouse_Night"}),Game.Scenes.A_Part02[99]=new Scene({text:`
    Мужчина бережно придерживал малыша, укрывая его от ветра. У него дрожали руки, а по щекам лились слезы. 
    <p>Его хриплый голос произнес:
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[100].Begin()}],background:"Backgrounds/Lighthouse_Night"}),Game.Scenes.A_Part02[100]=new Scene({text:`
    - Беатрис… 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[101].Begin()}],background:"Backgrounds/Lighthouse_Night"}),Game.Scenes.A_Part02[101]=new Scene({text:`
    В этом коротком сказанном слове было столько боли, столько отчаяния. Старик цеплялся за сверток как за самое драгоценное, что было в его жизни.
    <p>Он смотрел на море, которое было спокойным в ту ночь. Его зоркий взгляд пытался отыскать что-то среди воды, однако даже свет маяка не мог помочь ему выбраться из тьмы. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[102].Begin()}],background:"Backgrounds/Lighthouse_Night"}),Game.Scenes.A_Part02[102]=new Scene({text:`
    Неожиданно ребенок начал ворочаться, а затем громко плакать. Мужчина стал успокаивать его, но крики так и продолжали пронзать мирную тишину.  
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[103].Begin(),Game.Sounds.Play("Music","Aurora_Daily_0"+Game.Stats.Song.Get())}],background:"Backgrounds/Lighthouse_Night"}),Game.Scenes.A_Part02[103]=new Scene({text:`
    Я проснулась от легкого прикосновения по плечу. Сонным разумом было сложно осознавать, где я сейчас нахожусь. Однако обеспокоенно лицо Артура вернуло меня в реальность.
    - Аврора, все в порядке? Ты дрожала и плакала во сне.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[105].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[105]=new Scene({text:`
    - Просто дурной сон, извини за беспокойство…
    <p>- Дурочка, отучись извиняться за любую мелочь, - Артур заглушил машину. - Мы приехали.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[106].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[106]=new Scene({text:`
    Артур припарковался перед высотным зданием. Большой город встретил присущей ему суматохой. Много людей, спешивших по своим делам, много машин, много разных звуков. 
    <p>Выйдя из автомобиля, мы зашли в подъезд и поднялись в квартиру Артура. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[107].Begin()}],background:""}),Game.Scenes.A_Part02[107]=new Scene({text:`
    Меня встретило просторное и светлое помещение. В гостинной на столе стояла ваза со свежими белыми розами, а на кухне пахло выпечкой, будто бы здесь только что готовили.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[108].Begin()}],background:"Backgrounds/Livingkitchen"}),Game.Scenes.A_Part02[108]=new Scene({text:`
    Вид квартиры многое мог рассказать о ее владельце. У меня сложилось впечатление, что Артур очень трепетно относится к своему имуществу и явно подготовился к моему приезду.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[109].Begin()}],background:"Backgrounds/Livingkitchen"}),Game.Scenes.A_Part02[109]=new Scene({text:`
    - Давай немного отдохнем, а затем я тебе все покажу,  - сказал Артур, складывая наши вещи. - Не хочешь чай или кофе?
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[110].Begin()}],background:"Backgrounds/Livingkitchen"}),Game.Scenes.A_Part02[110]=new Scene({text:`
    Такой простой вопрос почему-то поставил меня в тупик. Поэтому я ответила нейтрально:
    <p>- Сделай что-нибудь на свой вкус. Спасибо!
    <p>Парень улыбнулся и поставил чайник на плиту. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[111].Begin()}],background:"Backgrounds/Livingkitchen"}),Game.Scenes.A_Part02[111]=new Scene({text:`
    - Нет ничего лучше зеленого чая после долгой дороги, - он поставил несколько чашек на стол. - Кстати, Аврора, уже написала папе, что мы благополучно добрались?
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[112].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[112]=new Scene({text:`
    - Да! Обычно СМС всегда доходят, а вот послать в ответ сообщение бывает проблематично. 
    <p>- Ничего. Я оставил ему адрес, он всегда сможет отправить письмо.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[113].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[113]=new Scene({text:`
    Я кивнула. После этого мы немного посидели, болтая о нашем переезде и о том, как быстро все это произошло. 
    <p>Я изъявила желание искать подработку, чтобы не зависеть от папиных средств. Когда же речь заходила о работе Артура, то парень старался перевести тему. Он не любил вдаваться в подробности рабочих дел дома.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[114].Begin()}],background:"Backgrounds/Livingkitchen"}),Game.Scenes.A_Part02[114]=new Scene({text:`
    Спустя долгое время я чувствовала себя умиротворенно. Сидя в совершенно новой обстановке и общаясь с дорогим мне человеком. Нет больше тех грустных мыслей, которые появлялись, стоило мне вновь увидеть маяк и пустые комнаты...
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[115].Begin()}],background:"Backgrounds/Livingkitchen"}),Game.Scenes.A_Part02[115]=new Scene({text:`
     Но я понимала, что здесь работы над собой предстоит в разы больше. 
    <p>Мы с Артуром прошлись по его квартире. В ней было всего две комнаты. Они были небольшие, отделанные в довольно простом и минималистичном дизайне - ничего лишнего.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[116].Begin()}],background:"Backgrounds/Livingkitchen"}),Game.Scenes.A_Part02[116]=new Scene({text:`
     Моя комната была небольшой, но очень уютной. Синеватые тона невольно отсылали к привычному мне морскому пейзажу, что не могло не радовать глаз. 
    <p>Я присела на кровать, ощупывая мягкое одеяло. В комнате пахло цветами. Было свежо и красиво.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[118].Begin()}],background:"Backgrounds/Aurora_Room"}),Game.Scenes.A_Part02[118]=new Scene({text:`
     - Спасибо, Артур, очень милая комната. 
    <p>- Я рад, что ты оценила, - парень облокотился о стену, внимательно следя за моей реакцией, будто бы боясь, что мне может что-то не понравиться.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[119].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[119]=new Scene({text:`
     - Скажи, - я не хотела торопить события, но все-таки и сидеть без дела было не в моем стиле. - Какие наши дальнейшие планы? Мне надо подать документы в университет, найти работу…
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[120].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[120]=new Scene({text:`
     - Твое рвение в бой - выше всяких похвал, - вздохнул Артур. - Не хотела бы отдохнуть для начала?
    <p>- Я в порядке. Я хочу как можно быстрее влиться в новый ритм жизни.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[121].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[121]=new Scene({text:`
     - Что ж, - парень на секунду задумался. - В теории, хоть завтра я могу отвезти тебя в университет, где ты познакомишься с обстановкой, может быть даже с кем-то из преподавателей. Все, что тебе надо будет сделать - это сдать несколько вступительных экзаменов. Об остальном я позаботился.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[122].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[122]=new Scene({text:`
     Я была ошеломлена таким развитием событий и спросила:
    <p>- Но как же? Я ведь даже не собирала никаких документов для этого.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[123].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[123]=new Scene({text:`
     - Мы с твоим отцом обо всем позаботились. 
    <p>- Разве можно подать дистанционно документы даже без согласия самого человека?
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[124].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[124]=new Scene({text:`
     - Можно. Это же двадцать первый век, - улыбнулся Артур. -  У тебя хороший аттестат. А у меня - связи. Знакомый моего отца знает чуть ли ни всю верхушку университета. И, кстати, у тебя будут ответы на экзамен.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[125].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[125]=new Scene({text:`
     - Но это же нечестно… 
    <p>- Аврора, а мир и не будет всегда честным. Нужно научиться выживать всеми доступными способами.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[126].Begin()}],background:"Persons/Arthur",condition:function(){1<=Game.Stats.Pragmatic.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.A_Part02[127].Begin()}),1<=Game.Stats.Romantic.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.A_Part02[126].Begin()})}}),Game.Scenes.A_Part02[126]=new Scene({text:`
     - Однако я думала, что поступлю своими силами. Ведь на то они и знания, чтобы их применять. 
    <p>- У тебя еще будет время и возможности проявить себя. Сейчас нужно отбросить свою мечтательность и бороться за то место, которое тебе предоставили. 
    <p>Он был прав. Возможно, я мыслила немного наивно, но такова была моя натура.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[128].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[127]=new Scene({text:`
     - Ты прав. Это отличная возможность. Даже не знаю, как тебя в очередной раз благодарить. 
    <p>- Я рад, что ты восприняла это таким образом. Не волнуйся, у тебя еще будет шанс проявить себя. Сейчас попробуй зацепиться за это, дальше время покажет. 
    <p>Он говорил верные мысли. Не каждому человеку дается такая возможность. Можно сказать, что мне очень повезло. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[128].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[128]=new Scene({text:`
     - Думаю, когда момент наступит, я решу как поступлю с экзаменом. А сейчас мне нужно ознакомиться с вопросами. 
    <p>- Дело твое, - парень пожал плечами и вышел из комнаты. 
    <p>Через несколько минут он вернулся с несколькими распечатанными листами А4.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[129].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[129]=new Scene({text:`
     - Здесь все вопросы и ответы. 
    <p>- Отлично, - я бережно положила листы на кровать. - А направление?
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[130].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[130]=new Scene({text:`
     - К сожалению или к счастью, удалось пристроить тебя на исторический курс. Других вариантов не было. Твой отец говорил, что тебе нравится история. Думаю, это не будет проблемой. К тому же, в дальнейшем, когда поступишь, ты сможешь перевестись при необходимости.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[131].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[131]=new Scene({text:`
      - Это на самом деле отличные новости, нет смысла привередничать.
      <p>- У тебя остается пара недель до вступительных экзаменов. Если ты не уверена в своих силах и хочешь дополнительно позаниматься, можешь пользоваться библиотекой университета. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[132].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[132]=new Scene({text:`
       - Я бы начала готовиться уже с завтрашнего дня. 
      <p>- Как скажешь. Я могу отвезти тебя утром, но я должен буду уехать по работе. Где-то в обед заберу, ничего? 
      <p>- Идеально. Спасибо!
      <p>- Тогда до завтра. Отдыхай.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[133].Begin()}],background:"Persons/Arthur"}),Game.Scenes.A_Part02[133]=new Scene({text:`
       Когда Артур покинул комнату, я разложила свои вещи и принялась осматривать листы с вопросами, тщательно стараясь вникнуть и составить примерный список тем, которые у меня западают. 
      <p>Я сильно вымоталась за этот насыщенный день, поэтому стоило голове коснуться подушки, как я тут же уснула.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[134].Begin()}],background:"Backgrounds/Aurora_Room"}),Game.Scenes.A_Part02[134]=new Scene({text:`
       Утром мы с Артуром позавтракали яичницей с кофе, а затем поехали по делам.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[135].Begin()}],background:"Backgrounds/Arthurs_Car"}),Game.Scenes.A_Part02[135]=new Scene({text:`
       - Ты справишься там одна, без меня?
      <p>- Я же не маленький ребенок, Артур. Все будет хорошо. Тем более, что может случиться?
      <p>- Ты права. Просто беспокоюсь за тебя.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[136].Begin(),Game.Stats.Trial_Pass.Add(1)}],background:"Backgrounds/Arthurs_Car"}),Game.Scenes.A_Part02[136]=new Scene({text:`
       В этом был весь Артур. Волнующийся по пустякам, милый и заботливый. 
      <p>- И чуть не забыл, - парень протянул мне карточку. - С ним ты можешь спокойно проходить в университет для любых целей. 
      <p>- Спасибо! - я убрала пропуск в свой рюкзак, продолжая поездку.
      <p>Мы доехали до учебного заведения довольно быстро. Попрощавшись с Артуром, я зашла в университет.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[137].Begin()}],background:"Backgrounds/Arthurs_Car"}),Game.Scenes.A_Part02[137]=new Scene({text:`
       Холл представлял из себя большое пространство с широкой лестницей посередине. Первые секунды мною даже завладел страх потеряться в таком большом и неизведанном месте.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[138].Begin()}],background:"Backgrounds/Univer"}),Game.Scenes.A_Part02[138]=new Scene({text:`
       Но я быстро взяла себя в руки, показала охраннику свой временный пропуск. Средних лет мужчина равнодушно осмотрел документ и указал в сторону, где находилась библиотека.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[139].Begin()}],background:"Backgrounds/Univer"}),Game.Scenes.A_Part02[139]=new Scene({text:`
        Огромное помещение встретило меня запахом старинных книг и шепотом студентов. Массивные шкафы с торчащими корешками удивляли. Хотелось изучить каждую книгу, ближе познакомиться с мыслями автора.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[141].Begin()}],background:"Backgrounds/Library",condition:function(){1<=Game.Stats.Writing.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.A_Part02[140].Begin()})}}),Game.Scenes.A_Part02[140]=new Scene({text:`
    Моему счастью небыло предела. Я словно оказалась в месте, о котором так долго мечтала. 
    <p>Окруженная книгами, я чувствовала себя живой и по-настоящему в своей тарелке. Когда-нибудь я обязательно хотела оказаться тем самым автором, чья книга могла бы находиться среди этих великолепных работ.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[141].Begin()}],background:"Backgrounds/Library"}),Game.Scenes.A_Part02[141]=new Scene({text:`
    Милая библиотекарша отвела меня в небольшой закуток, где находились необходимые мне источники.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[142].Begin()}],background:"Backgrounds/Books"}),Game.Scenes.A_Part02[142]=new Scene({text:`
    Я стала осматривать книжные полки в поисках исторических книг. Когда я потянулась за нужной мне, чья-то мужская рука соприкоснулось с моей. Я почувствовала легкую дрожь, пальцы незнакомца были необычайно холодными.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[143].Begin()}],background:"Backgrounds/Books"}),Game.Scenes.A_Part02[143]=new Scene({text:`
    Я развернулась, чтобы увидеть наглеца, который все-таки утащил мою книгу. 
    <p>- “Революция 1917 года: мифы и реальность”, - он прочитал название книги своим бархатистым низким голосом. - Вот чем нынче увлекаются молоденькие студентки?
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[144].Begin()}],background:"Persons/Kaleb"}),Game.Scenes.A_Part02[144]=new Scene({text:`
    - Я просто хотела подготовиться к экзамену, верни, пожалуйста,- ответила я довольно строго. 
    <p>Его глаза хитро прищурились. Он взял книгу и демонстративно повел ей у меня перед носом. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[145].Begin()}],background:"Persons/Kaleb"}),Game.Scenes.A_Part02[145]=new Scene({text:`
    - А что мне за это будет? - его рука опустилась на полку, не давая мне вырваться из-под его хищного взора. 
    <p>Он был настолько близко, что я чувствовала исходящий от него аромат: табачный дым вперемешку с одеколоном. Парень был очень настойчив, казалось, его забавляла эта ситуация.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Part02[146].Begin(),Game.Achievements.A_Part02Completed.Unlock()}],background:"Persons/Kaleb"}),Game.Scenes.A_Part02[146]=new Scene({text:`
    Я хотела что-то возразить незнакомцу, но чей-то звонкий женский голос крикнул:
    <p>- Калеб!
    <p>Тогда я еще не осознавала, что это было только началом новых и увлекательных знакомств. 
        `,buttontext:[""],buttonaction:[()=>{Game.Progress.Save("Aurora_Part03"),Game.Scenes.Features[100].Begin()}],background:"Persons/Kaleb"}),Game.Scenes.A_Prologue=[],Game.Scenes.A_Prologue[0]=new Scene({text:`Моя дорогая Далия. Как у тебя дела? Ты все еще вспоминаешь меня? 
           А наши беззаботные деньки, наполненные смехом и в одночасье тяжелым грузом бремени, что резко обрушилось на нас?
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Prologue[1].Begin(),Game.Message("\u0412 \u043B\u0435\u0432\u043E\u043C \u0432\u0435\u0440\u0445\u043D\u0435\u043C \u0443\u0433\u043B\u0443 \u043F\u043E\u0434 \u0438\u043A\u043E\u043D\u043A\u043E\u0439 \u0440\u044E\u043A\u0437\u0430\u043A\u0430 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0441\u0442\u0440\u0435\u043B\u043E\u0447\u043A\u0443, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0442\u0435\u043A\u0441\u0442 \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0433\u043E \u0441\u043B\u0430\u0439\u0434\u0430")}],background:"Backgrounds/Writing",condition:()=>{Game.Sounds.Play("Music","Aurora")}}),Game.Scenes.A_Prologue[1]=new Scene({text:`
            Знаешь, я все еще бережно храню подаренный тобой сборник стихов Эдгара Аллана По. 
            Перечивая строки его произведений, каждый раз во мне откликаются те ощущения, что мы когда-то пережили.
            <p>Я все больше начинаю понимать тебя: твои мысли, твою печаль и страхи. 

        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Prologue[2].Begin(),Game.Message("\u042D\u0434\u0433\u0430\u0440 \u041F\u043E - \u201C\u0421\u043E\u043D \u0432\u043E \u0441\u043D\u0435\u201D")}],background:"Backgrounds/Writing"}),Game.Scenes.A_Prologue[2]=new Scene({text:`
            <i><p>Я стою на берегу,
            <i><p>Бурю взором стерегу.
            <i><p>И держу в руках своих
            <i><p>Горсть песчинок золотых.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Prologue[3].Begin()}],background:"Backgrounds/Writing"}),Game.Scenes.A_Prologue[3]=new Scene({text:`
            <i>Как их бег мне задержать,
            <i><p>Как сильнее руки сжать?
            <i><p>Сохранится ль хоть одна,
            <i><p>Или все возьмёт волна?
            <i><p>Или то, что зримо мне,
            <i><p>Всё есть только сон во сне?
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Prologue[4].Begin()}],background:"Backgrounds/Writing"}),Game.Scenes.A_Prologue[4]=new Scene({text:`
            Мои мысли идут сплошным потоком. Я стольким хочу поделиться с тобой. Но торопиться некуда. 
            <p></p>Сейчас, сидя на любимой скамейке, обдуваемая морскими ветрами, я переношу свою жизнь на бумагу. Свое прошлое, настоящее, те моменты, что мы прожили бок о бок. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Prologue[5].Begin()}],background:"Backgrounds/Writing"}),Game.Scenes.A_Prologue[5]=new Scene({text:`
            Цель очень проста - помнить. Помнить каждую деталь, каждую эмоцию и те выборы, которые привели нас к этому исходу. Я никогда не прощу себя, если хоть что-то упущу. 
            <p>Милая Далия, я безмерно счастлива писать в этом дневнике. Местами может быть сумбурно, но я остаюсь верна себе. Как ты меня когда-то учила - быть собой и не стараться выстраивать образ человека, которым я не являюсь. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.A_Prologue[6].Begin(),Game.Achievements.A_PrologueCompleted.Unlock()}],background:"Backgrounds/Writing"}),Game.Scenes.A_Prologue[6]=new Scene({text:`
            Ну, хватит лирики. Я думаю, ты запомнила меня как всегда улыбающейся девочкой, которая хотела покорить высокие горы. Ведь именно такой я стала благодаря тебе. Пусть так оно и будет. 
            <p>Начну издалека. Бушующая подростковая жизнь, затем завораживающая юность. 
            <p><s>И будущее?</s>
            <p><i>Твоя Аврора начинает свой рассказ.
            `,buttontext:[""],buttonaction:[()=>{setTimeout(()=>{Game.Scenes.A_Part01[0].Begin()},1e3),Game.LoadScreen("Aurora_Part01"),Game.Progress.Save("Aurora_Part01")}],background:"Backgrounds/Writing"}),Game.Achievements.PrologueCompleted=new Achievement({picture:"Backgrounds/Abstraction",title:"\u041D\u0430\u0447\u0430\u043B\u043E \u043D\u0430\u0447\u0430\u043B",text:"\u041F\u0440\u043E\u0439\u0442\u0438 \u043F\u0440\u043E\u043B\u043E\u0433",story:"Immortals"}),Game.Achievements.Sleeper=new Achievement({picture:"Backgrounds/Room",title:"\u0421\u043E\u043D\u044F",text:"\u041F\u0440\u043E\u0441\u043F\u0430\u0442\u044C \u0437\u0430\u043D\u044F\u0442\u0438\u044F",story:"Immortals"}),Game.Achievements.MoneySpender=new Achievement({picture:"Items/Money",title:"\u042F \u0432\u044B\u0431\u0438\u0440\u0430\u044E \u043A\u043E\u043C\u0444\u043E\u0440\u0442!",text:"\u041F\u043E\u0442\u0440\u0430\u0442\u0438\u0442\u044C \u0441\u0430\u043C\u043E\u0435 \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0434\u0435\u043D\u0435\u0433 \u043D\u0430 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442",story:"Immortals"}),Game.Achievements.GoodGirl=new Achievement({picture:"Items/Study",title:"\u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0430\u044F \u0434\u0435\u0432\u043E\u0447\u043A\u0430",text:"\u041D\u0435 \u043F\u043E\u0434\u0434\u0430\u0432\u0430\u0442\u044C\u0441\u044F \u0438\u0441\u043A\u0443\u0448\u0435\u043D\u0438\u044E \u0438 \u043D\u0435 \u043F\u0440\u043E\u0441\u043F\u0430\u0442\u044C \u043F\u0430\u0440\u044B",story:"Immortals"}),Game.Achievements.AllKnowing=new Achievement({picture:"Backgrounds/Lection",title:"\u0412\u0441\u0435\u0437\u043D\u0430\u0439\u043A\u0430",text:"\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u043D\u0430 \u0432\u043E\u043F\u0440\u043E\u0441 \u041D\u044D\u0439\u0442\u0430\u043D\u0430 \u043D\u0430 \u043F\u0430\u0440\u0435",story:"Immortals"}),Game.Achievements.FirstPartCompleted=new Achievement({picture:"Backgrounds/Uni",title:"\u0417\u043D\u0430\u043A\u043E\u043C\u0441\u0442\u0432\u043E",text:"\u041F\u0440\u043E\u0439\u0442\u0438 \u043F\u0435\u0440\u0432\u0443\u044E \u0447\u0430\u0441\u0442\u044C",story:"Immortals"}),Game.Achievements.SmartGirl=new Achievement({picture:"Items/Study",title:"\u0417\u043D\u0430\u043D\u0438\u044F \u2014 \u0441\u0438\u043B\u0430!",text:"\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u0432\u043E\u0438 \u0437\u043D\u0430\u043D\u0438\u044F, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u0434\u0430\u0442\u044C \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0432\u043E\u043F\u0440\u043E\u0441 \u0422\u0435\u0441\u043B\u0435",story:"Immortals"}),Game.Achievements.ShockTesla=new Achievement({picture:"Persons/Nicola",title:"\u0428\u043E\u043A",text:"\u0428\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0422\u0435\u0441\u043B\u0443",story:"Immortals"}),Game.Achievements.Crazy=new Achievement({picture:"Backgrounds/Street",title:"\u0421\u0443\u043C\u0430\u0441\u0448\u0435\u0434\u0448\u0430\u044F",text:"\u0423\u0431\u0435\u0436\u0430\u0442\u044C \u043E\u0442 \u0422\u0435\u0441\u043B\u044B",story:"Immortals"}),Game.Achievements.FirstMonster=new Achievement({picture:"Persons/Monster",title:"\u041D\u0435\u0447\u0442\u043E",text:"\u0412\u043F\u0435\u0440\u0432\u044B\u0435 \u0443\u0432\u0438\u0434\u0435\u0442\u044C \u043C\u043E\u043D\u0441\u0442\u0440\u0430",story:"Immortals"}),Game.Achievements.TrustCheryl=new Achievement({picture:"Persons/Cheryl",title:"\u0425\u043E\u0447\u0443 \u0432\u0435\u0440\u0438\u0442\u044C",text:"\u0420\u0430\u0441\u0441\u043A\u0430\u0437\u0430\u0442\u044C \u0428\u0435\u0440\u0438\u043B \u043F\u0440\u0430\u0432\u0434\u0443",story:"Immortals"}),Game.Achievements.SecondPartCompleted=new Achievement({picture:"Backgrounds/NY",title:"\u041F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u0438\u0446\u0430",text:"\u041F\u0440\u043E\u0439\u0442\u0438 \u0432\u0442\u043E\u0440\u0443\u044E \u0447\u0430\u0441\u0442\u044C",story:"Immortals"}),Game.Achievements.Sushi=new Achievement({picture:"Backgrounds/Kitchen",title:"\u0412\u0441\u0451 \u0440\u0430\u0434\u0438 \u0434\u0440\u0443\u0437\u0435\u0439",text:"\u041F\u043E\u0442\u0440\u0430\u0442\u0438\u0442\u044C \u0441\u0430\u043C\u043E\u0435 \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0434\u0435\u043D\u0435\u0433 \u043D\u0430 \u0435\u0434\u0443",story:"Immortals"}),Game.Achievements.DanceQueen=new Achievement({picture:"Backgrounds/Disco",title:"\u041A\u0442\u043E \u0442\u0443\u0442 \u0441\u0430\u043C\u044B\u0439 \u043F\u043B\u0430\u0441\u0442\u0438\u0447\u043D\u044B\u0439?",text:"\u041F\u043E\u0431\u0435\u0434\u0438\u0442\u044C \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442 \u0432 \u0442\u0430\u043D\u0446\u0430\u0445",story:"Immortals"}),Game.Achievements.FirstWeapon=new Achievement({picture:"Items/Knife",title:"\u041D\u043E\u0441\u0438 \u0435\u0433\u043E \u043E\u0441\u0442\u043E\u0440\u043E\u0436\u043D\u043E",text:"\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043D\u043E\u0436",story:"Immortals"}),Game.Achievements.AttackMonster=new Achievement({picture:"Persons/Monster",title:"\u0423\u0436\u0430\u0441\u043D\u044B\u0435 \u043F\u043E\u0441\u043B\u0435\u0434\u0441\u0442\u0432\u0438\u044F",text:"\u0412\u0441\u0442\u0443\u043F\u0438\u0442\u044C \u0432 \u043E\u0442\u043A\u0440\u044B\u0442\u043E\u0435 \u0441\u0442\u043E\u043B\u043A\u043D\u043E\u0432\u0435\u043D\u0438\u0435 \u0441 \u043C\u043E\u043D\u0441\u0442\u0440\u043E\u043C",story:"Immortals"}),Game.Achievements.EvilBeauty=new Achievement({picture:"Persons/Antagonist",title:"\u041A\u0440\u0430\u0441\u0438\u0432\u043E\u0435 \u0437\u043B\u043E",text:"\u041F\u043E\u0437\u043D\u0430\u043A\u043E\u043C\u0438\u0442\u0441\u044F \u0441 \u0432\u0438\u043D\u043E\u0432\u043D\u0438\u043A\u043E\u043C \u201C\u0442\u043E\u0440\u0436\u0435\u0441\u0442\u0432\u0430\u201D",story:"Immortals"}),Game.Achievements.Storm=new Achievement({picture:"Backgrounds/Chair",title:"\u0417\u0430\u0442\u0438\u0448\u044C\u0435 \u043F\u0435\u0440\u0435\u0434 \u0431\u0443\u0440\u0435\u0439",text:"\u041F\u0440\u043E\u0439\u0442\u0438 \u0442\u0440\u0435\u0442\u044C\u044E \u0447\u0430\u0441\u0442\u044C",story:"Immortals"}),Game.Achievements.Golden_Cross=new Achievement({picture:"Items/Golden_Cross",title:"\u041D\u0430\u0441\u043B\u0435\u0434\u0438\u0435",text:"\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043F\u043E\u0434\u0430\u0440\u043E\u043A \u043E\u0442 \u041D\u0438\u043A\u043E\u043B\u044B",story:"Immortals"}),Game.Achievements.Guessed=new Achievement({picture:"Persons/Robert",title:"\u042F \u0442\u0430\u043A \u0438 \u0437\u043D\u0430\u043B\u0430!",text:"\u0423\u0433\u0430\u0434\u0430\u0442\u044C, \u0447\u0435\u043C \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442\u0441\u044F \u0420\u043E\u0431\u0435\u0440\u0442",story:"Immortals"}),Game.Achievements.KeepWeapon=new Achievement({picture:"Items/Knife",title:"\u041B\u0438\u0448\u043D\u0438\u043C \u043D\u0435 \u0431\u0443\u0434\u0435\u0442",text:"\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043F\u0440\u0438 \u0441\u0435\u0431\u0435 \u043F\u0435\u0440\u0432\u043E\u0435 \u043E\u0440\u0443\u0436\u0438\u0435",story:"Immortals"}),Game.Achievements.LoveEvil=new Achievement({picture:"Persons/Antagonist",title:"\u0417\u043C\u0435\u0439 \u0438\u0441\u043A\u0443\u0441\u0438\u0442\u0435\u043B\u044C",text:"\u041F\u043E\u0434\u0434\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u0441\u043E\u0431\u043B\u0430\u0437\u043D \u0437\u043B\u043E\u0434\u0435\u044F",story:"Immortals"}),Game.Achievements.Ball=new Achievement({picture:"Backgrounds/Ball",title:"\u0417\u0432\u0430\u043D\u044B\u0439 \u0432\u0435\u0447\u0435\u0440",text:"\u041F\u0440\u043E\u0439\u0442\u0438 \u0447\u0435\u0442\u0432\u0451\u0440\u0442\u0443\u044E \u0447\u0430\u0441\u0442\u044C",story:"Immortals"}),Game.Achievements.Oops=new Achievement({picture:"Persons/Neitan",title:"\u041E\u0433\u043E\u0432\u043E\u0440\u043E\u0447\u043A\u0430 \u043F\u043E \u0424\u0440\u0435\u0439\u0434\u0443",text:"\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u043E \u043F\u0440\u043E\u0438\u0437\u043D\u0435\u0441\u0442\u0438 \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u0435 \u0438\u043C\u044F \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u043E\u0440\u0430",story:"Immortals"}),Game.Achievements.Psy=new Achievement({picture:"Backgrounds/Parents",title:"\u0421\u0435\u043C\u0435\u0439\u043D\u044B\u0439 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433",text:"\u041F\u0440\u0435\u0434\u043E\u0442\u0432\u0440\u0430\u0442\u0438\u0442\u044C \u0441\u0441\u043E\u0440\u0443 \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u0435\u0439",story:"Immortals"}),Game.Achievements.LakeNeitan=new Achievement({picture:"Persons/Neitan_New",title:"\u042F \u0445\u043E\u0447\u0443 \u0431\u043E\u043B\u044C\u0448\u0435\u0433\u043E!",text:"\u0421\u0431\u043B\u0438\u0437\u044C\u0442\u0435\u0441\u044C \u0441 \u041D\u044D\u0439\u0442\u0430\u043D\u043E\u043C \u0432 \u043F\u043E\u0435\u0437\u0434\u043A\u0435 \u043D\u0430 \u043E\u0437\u0435\u0440\u043E",story:"Immortals"}),Game.Achievements.LakeLeon=new Achievement({picture:"Persons/Leon_New",title:"\u042D\u0442\u043E \u0431\u044B\u043B\u043E \u0441\u0432\u0438\u0434\u0430\u043D\u0438\u0435?",text:"\u0421\u0431\u043B\u0438\u0437\u044C\u0442\u0435\u0441\u044C \u0441 \u041B\u0435\u043E\u043D\u043E\u043C \u0432 \u043F\u043E\u0435\u0437\u0434\u043A\u0435 \u043D\u0430 \u043E\u0437\u0435\u0440\u043E",story:"Immortals"}),Game.Achievements.LakeScarlett=new Achievement({picture:"Persons/Scarlett_New",title:"\u041E\u0442\u043A\u0440\u043E\u0432\u0435\u043D\u0438\u0435",text:"\u0421\u0431\u043B\u0438\u0437\u044C\u0442\u0435\u0441\u044C \u0441\u043E \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442 \u0432 \u043F\u043E\u0435\u0437\u0434\u043A\u0435 \u043D\u0430 \u043E\u0437\u0435\u0440\u043E",story:"Immortals"}),Game.Achievements.LakeCheryl=new Achievement({picture:"Persons/Cheryl_New",title:"\u0415\u0451 \u0431\u043E\u0440\u044C\u0431\u0430",text:"\u0421\u0431\u043B\u0438\u0437\u044C\u0442\u0435\u0441\u044C \u0441 \u0428\u0435\u0440\u0438\u043B \u0432 \u043F\u043E\u0435\u0437\u0434\u043A\u0435 \u043D\u0430 \u043E\u0437\u0435\u0440\u043E",story:"Immortals"}),Game.Achievements.Guru=new Achievement({picture:"Items/Corkscrew",title:"\u0413\u0443\u0440\u0443 \u0437\u0430\u0433\u0430\u0434\u043E\u043A",text:"\u041F\u043E\u0431\u0435\u0434\u0438\u0442\u0435 \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442 \u0432 \u0437\u0430\u0433\u0430\u0434\u043A\u0430\u0445",story:"Immortals"}),Game.Achievements.Fantasy=new Achievement({picture:"Backgrounds/Rabbit_Dragon_Caterpillar_Cloud",title:"\u0424\u0430\u043D\u0442\u0430\u0437\u0435\u0440",text:"\u041F\u0440\u043E\u044F\u0432\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0435\u0442\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0438 \u043F\u043E\u0431\u0435\u0434\u0438\u0442\u0435 \u0428\u0435\u0440\u0438\u043B \u0432 \u0438\u0433\u0440\u0435",story:"Immortals"}),Game.Achievements.Lake=new Achievement({picture:"Backgrounds/Lake",title:"\u0423\u0438\u043A\u044D\u043D\u0434",text:"\u041F\u0440\u043E\u0439\u0442\u0438 \u043F\u044F\u0442\u0443\u044E \u0447\u0430\u0441\u0442\u044C",story:"Immortals"}),Game.Achievements.HiddenWorld=new Achievement({picture:"Items/Key01",title:"<accent>\u0421\u043F\u0440\u044F\u0442\u0430\u043D\u043D\u044B\u0439 \u043C\u0438\u0440",text:"<accent>\u041D\u0430\u0439\u0442\u0438 \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E\u043C\u0443 \u043A\u043B\u044E\u0447\u0443",story:"Immortals"}),Game.Achievements.Dev=new Achievement({picture:"Items/Lock",title:"<accent>\u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A",text:"<accent>\u0427\u0442\u043E \u0434\u043B\u044F \u044D\u0442\u043E\u0433\u043E \u043D\u0443\u0436\u043D\u043E \u0441\u0434\u0435\u043B\u0430\u0442\u044C?",story:"Immortals"}),Game.Stats.God=new Stat({name:"\u041F\u0440\u043E\u0432\u043E\u0434\u043D\u0438\u043A",picture:"Persons/Stranger",title:"\u0415\u0433\u043E \u0446\u0435\u043B\u0438 \u0438 \u043C\u043E\u0442\u0438\u0432\u044B \u043D\u0435\u044F\u0441\u043D\u044B, \u043D\u043E \u044F \u0434\u0443\u043C\u0430\u044E, \u043E\u043D \u043D\u0435 \u0436\u0435\u043B\u0430\u0435\u0442 \u043C\u043D\u0435 \u0437\u043B\u0430. \u0412\u0440\u0435\u043C\u044F \u043F\u043E\u043A\u0430\u0436\u0435\u0442. ",text:"\u0417\u0430\u0433\u0430\u0434\u043E\u0447\u043D\u043E\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043E, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u043D\u0435 \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442 \u043F\u0440\u044F\u043C\u043E \u043D\u0430 \u043C\u043E\u0438 \u0432\u043E\u043F\u0440\u043E\u0441\u044B. \u041E\u0434\u043D\u0430\u043A\u043E \u0438\u043C\u0435\u043D\u043D\u043E \u043E\u043D \u0434\u043E\u043B\u0436\u0435\u043D \u043F\u043E\u043C\u043E\u0447\u044C \u043C\u043D\u0435 \u0432 \u044D\u0442\u043E\u043C \u043F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u0438.",story:"Immortals"}),Game.Stats.Cheryl=new Stat({name:"\u0428\u0435\u0440\u0438\u043B",picture:"Persons/Cheryl",title:"\u0428\u0435\u0440\u0438\u043B \u0432\u0441\u0435 \u0440\u0435\u0436\u0435 \u0443\u043B\u044B\u0431\u0430\u0435\u0442\u0441\u044F\u2026 \u0415\u0435 \u0436\u0438\u0437\u043D\u0438 \u0447\u0442\u043E-\u0442\u043E \u0443\u0433\u0440\u043E\u0436\u0430\u0435\u0442? ",text:"\u0414\u0435\u0432\u0443\u0448\u043A\u0430 \u0436\u0438\u0432\u0435\u0442 \u0432 \u0441\u043E\u0441\u0435\u0434\u043D\u0435\u043C \u0434\u043E\u043C\u0435. \u041C\u044B \u0441 \u043D\u0435\u0439 \u0434\u043E\u0432\u043E\u043B\u044C\u043D\u043E \u0431\u043B\u0438\u0437\u043A\u043E \u043E\u0431\u0449\u0430\u0435\u043C\u0441\u044F, \u0447\u0430\u0441\u0442\u043E \u043F\u0440\u043E\u0432\u043E\u0434\u0438\u043C \u0432\u0440\u0435\u043C\u044F \u0432\u043C\u0435\u0441\u0442\u0435. \u041E\u043D\u0430 \u043C\u043D\u0435 \u043A\u0430\u043A \u0441\u0435\u0441\u0442\u0440\u0430.",story:"Immortals"}),Game.Stats.Scarlett=new Stat({name:"\u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442",picture:"Persons/Scarlett",title:"\u041A\u0430\u0436\u0435\u0442\u0441\u044F, \u0447\u0442\u043E \u0432 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0435 \u0432\u0440\u0435\u043C\u044F \u0421\u043A\u0430\u0440 \u0441\u0430\u043C\u0430 \u043D\u0435 \u0441\u0432\u043E\u044F. \u041C\u043E\u0433\u0443 \u043B\u0438 \u044F \u0435\u0439 \u043F\u043E\u043C\u043E\u0447\u044C?",text:"\u041C\u043E\u044F \u043F\u043E\u0434\u0440\u0443\u0433\u0430, \u0441 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u043C\u044B \u0443\u0447\u0438\u043C\u0441\u044F \u0432 \u043E\u0434\u043D\u043E\u043C \u0443\u043D\u0438\u0432\u0435\u0440\u0441\u0438\u0442\u0435\u0442\u0435. \u041E\u043D\u0430 \u0443\u043C\u043D\u0430\u044F \u0438 \u0434\u043E\u0432\u043E\u043B\u044C\u043D\u043E \u0430\u043A\u0442\u0438\u0432\u043D\u0430\u044F. \u041D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u0443\u043F\u0443\u0441\u0442\u0438\u0442 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0447\u0438\u0442\u0430\u0442\u044C \u043C\u043D\u0435 \u043D\u043E\u0442\u0430\u0446\u0438\u0438.",story:"Immortals"}),Game.Stats.Neitan=new Stat({name:"\u041D\u044D\u0439\u0442\u0430\u043D",picture:"Persons/Neitan",title:"\u041E\u043D \u0437\u043D\u0430\u0442\u043E\u043A \u0441\u0432\u043E\u0435\u0433\u043E \u0434\u0435\u043B\u0430 \u0438 \u043B\u044E\u0431\u0438\u0442\u0435\u043B\u044C \u043F\u043E\u0432\u0442\u043E\u0440\u044F\u0442\u044C \u043F\u0440\u043E \u201C\u0432\u0430\u0436\u043D\u043E\u0441\u0442\u044C\u201D \u0443\u0447\u0435\u0431\u044B.",text:"\u041F\u0440\u043E\u0444\u0435\u0441\u0441\u043E\u0440, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0443\u0436\u0435 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043B\u0435\u0442 \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0435\u0442 \u0438\u0441\u0442\u043E\u0440\u0438\u044E \u0432 \u043D\u0430\u0448\u0435\u043C \u0443\u043D\u0438\u0432\u0435\u0440\u0441\u0438\u0442\u0435\u0442\u0435. \u0415\u0433\u043E \u0445\u0430\u0440\u0438\u0437\u043C\u0430 \u0438 \u043E\u0431\u0430\u044F\u043D\u0438\u0435 \u043F\u0440\u0435\u043A\u0440\u0430\u0441\u043D\u043E \u0441\u043E\u0447\u0435\u0442\u0430\u044E\u0442\u0441\u044F \u0441 \u0435\u0433\u043E \u043E\u0441\u0442\u0440\u044B\u043C \u0443\u043C\u043E\u043C.",story:"Immortals"}),Game.Stats.Nicola=new Stat({name:"\u041D\u0438\u043A\u043E\u043B\u0430",picture:"Persons/Nicola",title:"\u042D\u0442\u043E \u043E\u043D? \u0412\u0435\u043B\u0438\u043A\u0438\u0439 \u0443\u0447\u0435\u043D\u044B\u0439? \u042F \u043D\u0435 \u0441\u0445\u043E\u0436\u0443 \u0441 \u0443\u043C\u0430?",text:` Инженер и учёный-физик, изобретатель в области электротехники и радиотехники. “Я не тружусь более для настоящего, я тружусь для будущего.”`,story:"Immortals"}),Game.Stats.Leon=new Stat({name:"\u041B\u0435\u043E\u043D",picture:"Persons/Leon",title:"\u041C\u044B \u0441\u043D\u043E\u0432\u0430 \u043E\u0431\u0449\u0430\u0435\u043C\u0441\u044F \u0441 \u043D\u0438\u043C, \u043A\u0430\u043A \u0432 \u0441\u0442\u0430\u0440\u044B\u0435 \u0434\u043E\u0431\u0440\u044B\u0435 \u0432\u0440\u0435\u043C\u0435\u043D\u0430\u2026",text:"\u041C\u043E\u0439 \u0445\u043E\u0440\u043E\u0448\u0438\u0439 \u0434\u0440\u0443\u0433, \u043E\u0434\u043D\u043E\u0433\u0440\u0443\u043F\u043D\u0438\u043A, \u0431\u0440\u0430\u0442 \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u043E\u0440\u0430 \u041D\u044D\u0439\u0442\u0430\u043D\u0430. \u041B\u0435\u043E\u043D \u0432\u0441\u0435\u0433\u0434\u0430 \u0431\u044B\u043B \u043E\u0447\u0435\u043D\u044C \u0437\u0430\u0431\u043E\u0442\u043B\u0438\u0432 \u0438 \u0432\u043D\u0438\u043C\u0430\u0442\u0435\u043B\u0435\u043D \u043A \u043E\u043A\u0440\u0443\u0436\u0430\u044E\u0449\u0438\u043C. \u0423 \u043D\u0435\u0433\u043E \u0431\u043E\u043B\u044C\u0448\u0438\u0435 \u043F\u043B\u0430\u043D\u044B \u043D\u0430 \u0436\u0438\u0437\u043D\u044C, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043E\u043D \u0445\u043E\u0447\u0435\u0442 \u0432\u043E\u043F\u043B\u043E\u0442\u0438\u0442\u044C \u0432 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F.",story:"Immortals"}),Game.Stats.Antagonist=new Stat({name:"\u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440",picture:"Persons/Antagonist",title:"\u0421\u0442\u0440\u0430\u043D\u043D\u044B\u0439 \u043C\u0443\u0436\u0447\u0438\u043D\u0430, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043E\u0434\u0435\u0440\u0436\u0438\u043C \u041A\u0430\u0442\u0430\u0440\u0438\u043D\u043E\u0439.",text:"\u042F \u043D\u0438\u0447\u0435\u0433\u043E \u043E \u043D\u0435\u043C \u043D\u0435 \u0437\u043D\u0430\u044E. \u041E\u043D \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043D\u043E \u0432\u043D\u0443\u0448\u0430\u0435\u0442 \u0441\u0442\u0440\u0430\u0445, \u043D\u043E \u044F \u043D\u0435 \u043C\u043E\u0433\u0443 \u0438\u0437\u0431\u0430\u0432\u0438\u0442\u044C\u0441\u044F \u043E\u0442 \u0447\u0443\u0432\u0441\u0442\u0432\u0430 \u0437\u0430\u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043E\u0432\u0430\u043D\u043D\u043E\u0441\u0442\u0438. \u041C\u043D\u0435 \u0445\u043E\u0447\u0435\u0442\u0441\u044F \u0434\u043E\u043A\u043E\u043F\u0430\u0442\u044C\u0441\u044F \u0434\u043E \u0435\u0433\u043E \u043C\u043E\u0442\u0438\u0432\u043E\u0432. \u0427\u0442\u043E \u044F \u043D\u0430\u0439\u0434\u0443 \u0432 \u043E\u0431\u0449\u0435\u043D\u0438\u0438 \u0441 \u043D\u0438\u043C? \u041E\u0442\u0432\u0435\u0442\u044B \u0438\u043B\u0438 \u0442\u043E\u043B\u044C\u043A\u043E \u0431\u043E\u043B\u044C?",story:"Immortals"}),Game.Stats.Robert=new Stat({name:"\u0420\u043E\u0431\u0435\u0440\u0442",picture:"Persons/Robert",title:"\u0424\u0438\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u043C\u0443\u0436 \u041A\u0430\u0442\u0430\u0440\u0438\u043D\u044B. \u041D\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u0441\u0435\u0431\u044F \u043E\u0445\u043E\u0442\u043D\u0438\u043A\u043E\u043C \u043D\u0430 \u043C\u043E\u043D\u0441\u0442\u0440\u043E\u0432.",text:"\u042D\u0442\u043E\u0442 \u043C\u0443\u0436\u0447\u0438\u043D\u0430 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043D\u043E \u0438\u0433\u0440\u0430\u0435\u0442 \u043D\u0435 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u044E\u044E \u0440\u043E\u043B\u044C \u0432\u043E \u0432\u0441\u0435\u043C \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0435\u043C. \u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u043D \u0441\u043C\u043E\u0436\u0435\u0442 \u0437\u0430\u0449\u0438\u0442\u0438\u0442\u044C \u043C\u0435\u043D\u044F \u0432 \u044D\u043F\u043E\u0445\u0435 \u0422\u0435\u0441\u043B\u044B. \u0425\u043E\u0442\u0435\u043B\u043E\u0441\u044C \u0431\u044B \u043D\u0430\u0434\u0435\u044F\u0442\u044C\u0441\u044F, \u0447\u0442\u043E \u043E\u043D \u0434\u0440\u0443\u0433\u2026",story:"Immortals"}),Game.Stats.Family=new Stat({name:"\u0421\u0435\u043C\u044C\u044F",type:"Choice",picture:"",title:"",text:"",story:"Immortals"}),Game.Stats.ForgotHomework=new Stat({type:"Choice",name:"\u0437\u0430\u0431\u044B\u043B\u0430 \u0434\u043E\u043C\u0430\u0448\u043A\u0443",story:"Immortals"}),Game.Stats.Late=new Stat({type:"Choice",name:"\u043E\u043F\u043E\u0437\u0434\u0430\u043B\u0430",story:"Immortals"}),Game.Stats.Believe=new Stat({type:"Choice",name:"\u043F\u043E\u0432\u0435\u0440\u0438\u043B\u0430 \u0432 \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0435\u0435 \u0441 \u0422\u0435\u0441\u043B\u043E\u0439",story:"Immortals"}),Game.Stats.StreetHide=new Stat({type:"Choice",name:"\u0443\u0431\u0435\u0436\u0430\u043B\u0430 \u0432 \u043F\u0435\u0440\u0435\u0443\u043B\u043E\u043A",story:"Immortals"}),Game.Stats.StreetStraight=new Stat({type:"Choice",name:"\u0443\u0431\u0435\u0436\u0430\u043B\u0430 \u0432 \u043F\u0440\u044F\u043C\u043E \u043F\u043E \u0443\u043B\u0438\u0446\u0435",story:"Immortals"}),Game.Stats.ComeWithLeon=new Stat({type:"Choice",name:"\u043F\u043E\u0439\u0442\u0438  \u041D\u0435\u0439\u0442\u0430\u043D\u043E\u043C",story:"Immortals"}),Game.Stats.ScarlettSpeech=new Stat({type:"Choice",name:"\u043E\u0431\u0449\u0430\u043B\u0430\u0441\u044C \u0441\u043E \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442",story:"Immortals"}),Game.Stats.Activities=new Stat({type:"Choice",name:"\u041A\u043E\u043B-\u0432\u043E \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u0435\u0439",story:"Immortals"}),Game.Stats.InvitedCheryl=new Stat({type:"Choice",name:"\u043F\u043E\u0437\u0432\u0430\u043B\u0430 \u0428\u0435\u0440\u0438\u043B",story:"Immortals"}),Game.Stats.DrinkAtParty=new Stat({type:"Choice",name:"\u0432\u044B\u043F\u0438\u043B\u0430 \u0430\u043B\u043A\u043E\u0433\u043E\u043B\u044C",story:"Immortals"}),Game.Stats.HugLeon=new Stat({type:"Choice",name:"\u043E\u0431\u043D\u044F\u043B\u0430\u0441\u044C \u0441 \u041B\u0435\u043E\u043D\u043E\u043C",story:"Immortals"}),Game.Stats.FollowedScarlett=new Stat({type:"Choice",name:"\u043F\u043E\u0448\u043B\u0430 \u0437\u0430 \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442",story:"Immortals"}),Game.Stats.TryToEscape=new Stat({type:"Choice",name:"\u043F\u043E\u043F\u044B\u0442\u0430\u043B\u0430\u0441\u044C \u0441\u0431\u0435\u0436\u0430\u0442\u044C",story:"Immortals"}),Game.Stats.BrokenHand=new Stat({type:"Choice",name:"\u0441\u043B\u043E\u043C\u0430\u043B\u0430 \u0440\u0443\u043A\u0443",story:"Immortals"}),Game.Stats.MetAntagonist=new Stat({type:"Choice",name:"\u043F\u043E\u0448\u043B\u0430 \u0432 \u0441\u0430\u0434",story:"Immortals"}),Game.Stats.AntagonistWire=new Stat({type:"Choice",name:"\u043F\u043E\u0434\u0434\u0430\u043B\u0430\u0441\u044C \u0441\u043E\u0431\u043B\u0430\u0437\u043D\u0443 \u0441\u043E\u0431\u043B\u0430\u0437\u043D\u0443",story:"Immortals"}),Game.Stats.HelpTesla=new Stat({type:"Choice",name:"\u043F\u043E\u043C\u043E\u0433\u043B\u0430 \u0422\u0435\u0441\u043B\u0435",story:"Immortals"}),Game.Stats.SupportLeon=new Stat({type:"Choice",name:"\u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u043B\u0430 \u041B\u0435\u043E\u043D\u0430 \u0432 \u0440\u0430\u0437\u0433\u043E\u0432\u043E\u0440\u0435",story:"Immortals"}),Game.Stats.Brothers=new Stat({type:"Choice",name:"\u0441\u0432\u044F\u0437\u044C \u0431\u0440\u0430\u0442\u044C\u0435\u0432",story:"Immortals"}),Game.Stats.GoStudy=new Stat({type:"Choice",name:"\u043F\u043E\u0439\u0442\u0438 \u043D\u0430 \u0437\u0430\u043D\u044F\u0442\u0438\u044F",story:"Immortals"}),Game.Stats.GoToLakeWith=new Stat({type:"Choice",name:"\u043F\u043E\u0439\u0442\u0438 \u043D\u0430 \u043E\u0437\u0435\u0440\u043E \u0441",story:"Immortals"}),Game.Stats.Money=new Stat({name:"\u0414\u0435\u043D\u044C\u0433\u0438",picture:"Items/Money",type:"Item",title:"\u041C\u0435\u043B\u043E\u0447\u044C \u0438 \u043F\u0430\u0440\u0443 \u043A\u0443\u043F\u044E\u0440",text:"\u0414\u0435\u043D\u044C\u0433\u0438 \u0432\u0441\u0435\u0433\u0434\u0430 \u043D\u0443\u0436\u043D\u044B. \u0420\u0430\u0431\u043E\u0442\u0443 \u0438 \u0443\u0447\u0451\u0431\u0443 \u043E\u0447\u0435\u043D\u044C \u0441\u043B\u043E\u0436\u043D\u043E \u0441\u043E\u0432\u043C\u0435\u0449\u0430\u0442\u044C.",story:"Immortals"}),Game.Stats.Study=new Stat({name:"\u0423\u0447\u0451\u0431\u0430",picture:"Items/Study",type:"Item",title:"\u0421\u0442\u0430\u0440\u044B\u0435 \u043A\u043D\u0438\u0433\u0438 \u0438 \u0442\u0435\u0442\u0440\u0430\u0434\u043A\u0438 \u0441 \u0437\u0430\u043F\u0438\u0441\u044F\u043C\u0438",text:"\u041D\u0430\u0434\u0435\u044E\u0441\u044C \u044D\u0442\u0438 \u0437\u043D\u0430\u043D\u0438\u044F \u043F\u043E\u043D\u0430\u0434\u043E\u0431\u044F\u0442\u0441\u044F \u043C\u043D\u0435 \u0432 \u0436\u0438\u0437\u043D\u0438...",story:"Immortals"}),Game.Stats.Key01=new Stat({name:"\u041A\u043B\u044E\u0447",picture:"Items/Key01",type:"Item",title:"\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 \u043A\u043B\u044E\u0447",text:"\u042F \u043D\u0430\u0448\u043B\u0430 \u0435\u0433\u043E \u043D\u0430 \u0441\u0438\u0434\u0435\u043D\u044C\u0435 \u043F\u043E\u0441\u043B\u0435 \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0438 \u0441 \u0428\u0435\u0440\u0438\u043B, \u043D\u0430\u0432\u0435\u0440\u043D\u043E\u0435 \u043A\u0442\u043E-\u0442\u043E \u0437\u0430\u0431\u044B\u043B. \u042D\u0442\u043E\u0442 \u043A\u043B\u044E\u0447 \u043F\u0435\u0440\u0435\u043B\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043D\u0435\u043E\u0431\u044B\u0447\u043D\u044B\u043C \u0441\u0438\u043D\u0438\u043C \u043E\u0442\u0442\u0435\u043D\u043A\u043E\u043C. \u0418\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u043E, \u0447\u0442\u043E \u043E\u043D \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u0442..?",story:"Immortals"}),Game.Stats.Knife=new Stat({name:"\u041D\u043E\u0436",picture:"Items/Knife",type:"Item",title:"\u0421\u0442\u0430\u0440\u044B\u0439 \u043D\u043E\u0436",text:"\u042D\u0442\u0438\u043C \u043D\u043E\u0436\u043E\u043C \u044F \u043E\u0441\u0432\u043E\u0431\u043E\u0434\u0438\u043B\u0430 \u0441\u0435\u0431\u044F \u0438\u0437 \u0437\u0430\u0442\u043E\u0447\u0435\u043D\u0438\u044F, \u0441\u043C\u043E\u0433\u0443 \u043B\u0438 \u044F \u0435\u0433\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432 \u0434\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0435\u043C?",story:"Immortals"}),Game.Stats.Golden_Cross=new Stat({name:"\u041A\u0440\u0435\u0441\u0442\u0438\u043A",picture:"Items/Golden_Cross",type:"Item",title:"\u0421\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u043D\u044B\u0439 \u043A\u0440\u0435\u0441\u0442\u0438\u043A \u041D\u0438\u043A\u043E\u043B\u044B",text:"\u041F\u043E\u0434\u0430\u0440\u043E\u043A \u041D\u0438\u043A\u043E\u043B\u044B \u0432 \u0437\u043D\u0430\u043A \u043D\u0430\u0448\u0435\u0439 \u0434\u0440\u0443\u0436\u0431\u044B. \u0422\u0435\u0441\u043B\u0430 \u0431\u044B\u043B \u043D\u0435 \u0442\u0430\u043A\u0438\u043C \u0432\u0435\u0440\u0443\u044E\u0449\u0438\u043C \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u043E\u043C, \u043A\u0430\u043A \u0435\u0433\u043E \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u0438. <p>\u041F\u043E\u0447\u0435\u043C\u0443 \u043E\u043D \u0440\u0435\u0448\u0438\u043B \u043F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F \u0438\u043C\u0435\u043D\u043D\u043E \u044D\u0442\u0438\u043C \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u043E\u043C?",story:"Immortals"}),Game.Stats.Corkscrew=new Stat({name:"\u0428\u0442\u043E\u043F\u043E\u0440",picture:"Items/Corkscrew",type:"Item",title:"\u0428\u0442\u043E\u043F\u043E\u0440 \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442",text:"\u042F \u0432\u044B\u0439\u0433\u0440\u0430\u043B\u0430 \u0435\u0433\u043E \u0443 \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442, \u043A\u043E\u0433\u0434\u0430 \u043E\u0442\u0433\u0430\u0434\u044B\u0432\u0430\u043B\u0430 \u0437\u0430\u0433\u0430\u0434\u043A\u0438 \u043D\u0430 \u043E\u0437\u0435\u0440\u0435. \u041E\u043D\u0430 \u0432\u0441\u0435\u0433\u0434\u0430 \u043D\u043E\u0441\u0438\u043B\u0430 \u0435\u0433\u043E \u0441 \u0441\u043E\u0431\u043E\u0439, \u043D\u043E \u043F\u043E\u0447\u0435\u043C\u0443 \u0436\u0435 \u0438\u043C\u0435\u043D\u043D\u043E \u0442\u043E\u0433\u0434\u0430 \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442 \u0440\u0435\u0448\u0438\u043B\u0430 \u043E\u0442\u0434\u0430\u0442\u044C \u0435\u0433\u043E \u043C\u043D\u0435? \u0412\u043B\u0438\u044F\u043D\u0438\u0435 \u0430\u043B\u043A\u043E\u0433\u043E\u043B\u044F?",story:"Immortals"}),Game.Stats.Crisps=new Stat({name:"\u0415\u0434\u0430",picture:"Items/Crisps",type:"Item",title:"\u0427\u0438\u043F\u0441\u044B",text:"\u0427\u0438\u043F\u0441\u044B \u0441 \u0441\u043E\u043B\u044C\u044E",story:"Immortals"}),Game.Stats.TurkeySandw=new Stat({name:"\u0415\u0434\u0430",picture:"Items/Sandwich",type:"Item",title:"\u0421\u044D\u043D\u0434\u0432\u0438\u0447 \u0441 \u0438\u043D\u0434\u0435\u0439\u043A\u043E\u0439",text:"\u0421\u0432\u0435\u0436\u0435\u043F\u0440\u0438\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u043D\u044B\u0439 \u0441\u044D\u043D\u0434\u0432\u0438\u0447 \u0441 \u043E\u0432\u043E\u0449\u0430\u043C\u0438 \u0438 \u0438\u043D\u0434\u0435\u0439\u043A\u043E\u0439",story:"Immortals"}),Game.Stats.SausageSandw=new Stat({name:"\u0415\u0434\u0430",picture:"Items/Sandwich",type:"Item",title:"\u0421\u044D\u043D\u0434\u0432\u0438\u0447 \u0441 \u043A\u043E\u043B\u0431\u0430\u0441\u043E\u0439",text:"\u0421\u0432\u0435\u0436\u0435\u043F\u0440\u0438\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u043D\u044B\u0439 \u0441\u044D\u043D\u0434\u0432\u0438\u0447 \u0441 \u0437\u0435\u043B\u0435\u043D\u044C\u044E \u0438 \u043A\u043E\u043B\u0431\u0430\u0441\u043E\u0439",story:"Immortals"}),Game.Stats.FruitsYogurt=new Stat({name:"\u0415\u0434\u0430",picture:"Items/Yogurt",type:"Item",title:"\u0424\u0440\u0443\u043A\u0442\u044B \u0441 \u0439\u043E\u0433\u0443\u0440\u0442\u043E\u043C",text:"\u0421\u0432\u0435\u0436\u0438\u0435 \u0444\u0440\u0443\u043A\u0442\u044B \u0441 \u0439\u043E\u0433\u0443\u0440\u0442\u043E\u043C",story:"Immortals"}),Game.Scenes.FirstChapter=[],Game.Scenes.FirstChapter[0]=new Scene({text:`
            Утреннее солнце  пробивалось сквозь шторы, пытаясь разбудить меня. Я лениво потянулась, надеясь, что есть ещё  возможность поваляться. 
            Взглянув на телефон, стало ясно, что будильник еще не прозвенел, а значит в запасе были сладостные минуты сна.
        `,buttontext:["\u041F\u043E\u0441\u043F\u0430\u0442\u044C \u0435\u0449\u0451","\u0412\u0441\u0442\u0430\u0442\u044C"],buttonaction:[()=>{Game.Scenes.FirstChapter[1].Begin(),Game.Stats.ForgotHomework.Add(1),Game.Achievements.Sleeper.Unlock(),Game.Stats.Money.Add(700)},()=>{Game.Scenes.FirstChapter[31].Begin(),Game.Achievements.GoodGirl.Unlock(),Game.Stats.Money.Add(700)}],background:"Backgrounds/Room",condition:()=>{Game.Sounds.Play("Music","FirstChapter"),Game.Effects.Flash()}}),Game.Scenes.FirstChapter[1]=new Scene({text:`
            Я убрала телефон и завернулась в одеяло, чтобы спрятаться от назойливых лучей.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[2].Begin()}],background:"Backgrounds/Room"}),Game.Scenes.FirstChapter[2]=new Scene({text:`
            Мне снились странные сны. Один из них я запомнила отчетливее  других. Мужские руки крепко обнимали меня, не давая вырваться. Но мне это нравилось. 
            Я чувствовала тягу к нему, будто бы в этих объятиях заключался мой смысл. 
            <p>Он отстранился. Я не могла разглядеть его лицо, хоть и стояла совсем близко. Мне что-то мешало… Мужчина нежно взял меня за руку и сказал:
            <p>- Ты должна выбрать сторону…
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[3].Begin()}],background:""}),Game.Scenes.FirstChapter[3]=new Scene({text:`
            Через некоторое время я открыла глаза, до сих пор ощущая прикосновения. Но из моего умиротворенного состояния меня вытянуло тиканье настенных часов. 
            Я неохотно взглянула на них и с ужасом осознала, что опаздываю на занятия.
            <p>«Мягкая кровать и теплое одеяло - ловушка дьявола!»
            <p>Я начала метаться по квартире в поисках необходимых мне вещей для занятий, затем оделась и спустилась вниз. Времени завтракать не было, поэтому я сразу выбежала на улицу.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[4].Begin(),Game.Message("\u0412 \u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u0435 \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u0441 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430\u043C\u0438 \u0438 \u0438\u043C\u0435\u044E\u0449\u0438\u0435\u0441\u044F \u0443 \u0432\u0430\u0441 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u044B.")}],background:"Backgrounds/Room"}),Game.Scenes.FirstChapter[4]=new Scene({text:`
            “Может мне поехать на такси? Так я точно не опоздаю и у меня не будет проблем с учёбой. 
            Или все-таки выбрать автобус? К тому же денег у меня совсем немного, нужно экономить для чего-то действительно важного. 
            Но когда приедет моя карета - вот, что меня волнует”. 
        `,buttontext:["\u041F\u043E\u0442\u0440\u0430\u0442\u0438\u0442\u044C \u0434\u0435\u043D\u044C\u0433\u0438 \u043D\u0430 \u0442\u0430\u043A\u0441\u0438 (200)","\u041F\u043E\u0442\u0440\u0430\u0442\u0438\u0442\u044C \u0434\u0435\u043D\u044C\u0433\u0438 \u043D\u0430 \u0430\u0432\u0442\u043E\u0431\u0443\u0441 (50)"],buttonaction:[()=>{Game.Scenes.FirstChapter[5].Begin(),Game.Stats.Money.Add(-200),Game.Achievements.MoneySpender.Unlock()},()=>{Game.Scenes.FirstChapter[25].Begin(),Game.Stats.Late.Add(1),Game.Stats.Money.Add(-50),Game.Stats.ScarlettSpeech.Add(-1)}],background:""}),Game.Scenes.FirstChapter[5]=new Scene({text:`
            Не долго думая, я открыла мобильное приложение и заказала машину. Через несколько минут я уже ехала в сторону университета. 
            <p>Мне попался разговорчивый водитель, все пытающийся мне что-то рассказать или спросить. 
            Он задавал кучу вопросов на которые мне, спросонья, не хотелось отвечать. 
            Я деликатно отказалась от общения, вставила наушники с музыкой и закрыла глаза. 
            Сон подступил незаметно, но от этого он был еще приятнее.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[6].Begin()}],background:"Backgrounds/Car"}),Game.Scenes.FirstChapter[6]=new Scene({text:`
            Из дремы меня вытащила вибрация телефона, пришло  сообщение от Шерил - моей подруги детства, мы с ней вместе сколько я себя помню.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[7].Begin()}],background:""}),Game.Scenes.FirstChapter[7]=new Scene({text:`
            Она жаловалась, что ее приемный отец в очередной раз напился и угрожал сделать ужасные вещи. 
            Я давно советовала ей подать заявление в полицию,  попытаться съехать от него, но некая привязанность удерживала ее в этом доме ужасов. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[8].Begin()}],background:"Backgrounds/Phone"}),Game.Scenes.FirstChapter[8]=new Scene({text:`
            Что сказать, эта девушка была со странностями. 
            Любила фантазировать, могла часами пропадать в своем  выдуманном  мире, но при этом, это тот человек, про которого я с уверенностью могу сказать «и в горе, и в радости, несмотря ни на что».
        `,buttontext:["\u041D\u0430\u0439\u0442\u0438 \u043D\u0443\u0436\u043D\u044B\u0435 \u0441\u043B\u043E\u0432\u0430 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438","\u0421\u043A\u0430\u0437\u0430\u0442\u044C \u0431\u044B\u0442\u044C \u0440\u0435\u0448\u0438\u0442\u0435\u043B\u044C\u043D\u0435\u0435"],buttonaction:[()=>{Game.Scenes.FirstChapter[9].Begin(),Game.Message("\u0428\u0435\u0440\u0438\u043B \u043F\u0440\u0438\u044F\u0442\u043D\u0430 \u0432\u0430\u0448\u0430 \u0437\u0430\u0431\u043E\u0442\u0430"),Game.Stats.Cheryl.Add(1),Game.Stats.Key01.Add(1)},()=>{Game.Scenes.FirstChapter[10].Begin(),Game.Stats.Key01.Add(1)}],background:"Backgrounds/Phone"}),Game.Scenes.FirstChapter[9]=new Scene({text:`
            Шерил скинула мне смайлик в виде сердечка и поблагодарила за то, что не даю ей унывать. Мы переписывались до самого моего приезда в университет.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[12].Begin()}],background:"Backgrounds/Phone",condition:function(){1<=Game.Stats.Late.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FirstChapter[27].Begin()}),0>=Game.Stats.ForgotHomework.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FirstChapter[37].Begin()}),500>=Game.Stats.Money.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FirstChapter[211].Begin()})}}),Game.Scenes.FirstChapter[211]=new Scene({text:`
            Я вышла из такси. Времени оставалось около 15-ти минут, поэтому, выдохнув, я спокойным шагом направилась в сторону входа. 
            <p>Университет, в котором я училась уже несколько лет, был одним из ведущих учебных заведений в нашем небольшом городе.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[12].Begin()}],background:"Backgrounds/Uni"}),Game.Scenes.FirstChapter[10]=new Scene({text:`
            Осознав, что я устала терпеть ее нытье, я сказала Шерил прямо. Если она хочет изменить свою жизнь, то пусть прекращает жить в этом доме и возьмет себя в руки.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[11].Begin(),Game.Message("\u0428\u0435\u0440\u0438\u043B \u0441\u0447\u0438\u0442\u0430\u0435\u0442, \u0447\u0442\u043E \u0432\u044B \u043D\u0435 \u0432\u043E\u0441\u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442\u0435 \u0435\u0435 \u0432\u0441\u0435\u0440\u044C\u0435\u0437 \u0438 \u043D\u0435 \u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438"),Game.Stats.Cheryl.Add(-1)}],background:"Backgrounds/Phone"}),Game.Scenes.FirstChapter[11]=new Scene({text:`
            Ранимая душа подруги  не оценила такой резкости. Она  отправила мне плачущий смайлик и под предлогом, что у неё появились неотложные дела, прекратила переписку. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[12].Begin()}],background:"Backgrounds/Phone",condition:function(){1<=Game.Stats.Late.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FirstChapter[27].Begin()}),0>=Game.Stats.ForgotHomework.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FirstChapter[37].Begin()}),500>=Game.Stats.Money.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FirstChapter[211].Begin()})}}),Game.Scenes.FirstChapter[12]=new Scene({text:`
            На его территории всегда было свежо и просторно: много ветвистых деревьев, аккуратно постриженный газон, скамейки, пользующиеся популярностью у прогульщиков. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[121].Begin()}],background:"Backgrounds/Uni"}),Game.Scenes.FirstChapter[121]=new Scene({text:`
            Порой, мы собирались на них с друзьями, чтобы обсудить прошедший день или повторить материал перед занятиями. 
            Но это было раньше - сейчас все стали слишком заняты, и время ценится иначе.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[13].Begin()}],background:"Backgrounds/Uni"}),Game.Scenes.FirstChapter[13]=new Scene({text:`
            Вдруг,  сзади послышались быстро приближающиеся шаги, переходящие на бег. Я уловила знакомый запыхавшийся, но воодушевленный женский голос. 
            <p>- $Имя Игрока$, привет! Еле догнала. Необычно встречать тебя до начала занятий, а не на второй паре, - с ухмылкой проговорила девушка. -  Ну, что, успела закончить домашнее задание?`,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[14].Begin()}],background:"Persons/Scarlett"}),Game.Scenes.FirstChapter[14]=new Scene({text:`
            Что-то во мне оборвалось, нарастало неприятное чувство. Я начала лихорадочно копаться в рюкзаке, выбрасывая все вещи в руки своей подруги. Опустошив всю сумку, я окончательно убедилась, что забыла работу дома.
            <p>“Если бы я только снова не уснула…” 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[212].Begin()}],background:"Persons/Scarlett"}),Game.Scenes.FirstChapter[212]=new Scene({text:`
            Обреченно запихивая вещи обратно в рюкзак, я проговорила:
            <p>- Профессор Нэйтан убьёт меня… Как же я могла так облажаться. Всю ночь сидела и писала. 
            <p>- У тебя было много времени и ты опять решила отложить работу до последнего?
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[15].Begin()}],background:"Persons/Scarlett"}),Game.Scenes.FirstChapter[15]=new Scene({text:`
            Я сделала мою фирменную грустную моську с щенячьими глазками, и Скарлетт ничего не оставалось, кроме как перестать читать мне нотации и пожалеть. 
            <p>- Ладно, уверена, что учитель войдет в твое положение, - Скарлетт приободряюще обняла меня. - Завтра сдашь.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[212].Begin()}],background:"Persons/Scarlett"}),Game.Scenes.FirstChapter[212]=new Scene({text:`
            Ее оптимизм не придал мне уверенности, что все закончится хорошо, так как профессор был довольно строг в отношении учебы. Мне оставалось только просить отсрочку. 
            <p>“И просить как можно убедительнее!”
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[140].Begin()}],background:"Persons/Scarlett"}),Game.Scenes.FirstChapter[140]=new Scene({text:`
            <p>- Я тебя догоню. Мне нужно зайти в «тайную комнату». Займи мне место. 
            <p>- Хорошо, $Имя Игрока$,- подавляя смех, проговорила Скарлетт. - Не задерживайся!
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[16].Begin()}],background:"Persons/Scarlett"}),Game.Scenes.FirstChapter[16]=new Scene({text:`
            В уборной никого не было, поэтому я смогла спокойно воспользоваться зеркалом и привести себя в порядок. Мне была необходима передышка после сумбурного утра.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[17].Begin()}],background:""}),Game.Scenes.FirstChapter[17]=new Scene({text:`
            Я поправила небрежный хвост и взглянула в свои карие глаза. 
            <p>“Нужно больше спать… Чертовы мешки под глазами!”
            <p>Я немного подкрасила брови и ресницы. Мне больше нравилась естественная красота, поэтому косметика не была моей близкой подругой. Я еще немного поколдовала над собой и вышла в коридор.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[18].Begin()}],background:"Persons/Hero",condition:function(){1<=Game.Stats.Late.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FirstChapter[29].Begin()})}}),Game.Scenes.FirstChapter[18]=new Scene({text:`
            На пару я пришла вовремя и села рядом со Скарлетт. 
            До начала занятий, она успела поведать мне немного о своих проблемах с мамой. 
            У них не сходились интересы. Родные девушки не могли представить свою дочь в роли историка.            
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[19].Begin()}],background:"Backgrounds/Lection"}),Game.Scenes.FirstChapter[19]=new Scene({text:`
            - Ты представляешь, $Имя Игрока$, я заявила, что хочу работать в архивах, а она все снова про свой бизнес. Плевать ей на мои желания! 
            <p>- А отец? - спросила я, пока раскладывала учебные принадлежности на парте. 
            <p>- Ушел рано, у него собеседование. 
            <p>- Есть шансы, что он устроится на работу? 
            <p>- Не знаю. Хоть папа и всегда меня поддерживал, но сейчас он больше походит на зомби, чем на человека. Мама в конец достала его пилить.             
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[20].Begin()}],background:"Persons/Scarlett"}),Game.Scenes.FirstChapter[20]=new Scene({text:`
            Я была мало посвящена в семейные проблемы подруги. Скарлетт была довольно закрытым человеком. А может она просто боялась показаться уязвимой. Мне же…             
            `,buttontext:["\u0411\u044B\u043B\u0438 \u043F\u043E\u043D\u044F\u0442\u043D\u044B \u0435\u0451 \u0447\u0443\u0432\u0441\u0442\u0432\u0430","\u0411\u044B\u043B\u043E \u0432\u0441\u0451 \u0440\u0430\u0432\u043D\u043E"],buttonaction:[()=>{Game.Scenes.FirstChapter[21].Begin(),Game.Stats.Scarlett.Add(1),Game.Message("\u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442 \u0434\u043E\u0440\u043E\u0436\u0438\u0442 \u0432\u0430\u0448\u0435\u0439 \u0434\u0440\u0443\u0436\u0431\u043E\u0439")},()=>{Game.Scenes.FirstChapter[22].Begin(),Game.Stats.Scarlett.Add(-1),Game.Message("\u0412\u044B \u0441\u043E \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442 \u043D\u0435 \u0442\u0430\u043A\u0438\u0435 \u0443\u0436 \u0438 \u0431\u043B\u0438\u0437\u043A\u0438\u0435 \u043F\u043E\u0434\u0440\u0443\u0433\u0438")}],background:"Persons/Scarlett"}),Game.Scenes.FirstChapter[21]=new Scene({text:`
            Семья - это важно, но каждый вправе жить  и делать выбор, опираясь на свои желания. Понемногу, но Скарлетт открывалась мне и я хотела быть на ее стороне.      
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[23].Begin()}],background:"Persons/Scarlett",condition:function(){0>=Game.Stats.ForgotHomework.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FirstChapter[41].Begin()})}}),Game.Scenes.FirstChapter[22]=new Scene({text:`
            Каждый жил своей жизнью. Нужно было фокусироваться на своих проблемах, а не лезть в чужие. У Скарлетт была возможность не усложнять себе жизнь, она же выбрала иной путь.    
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[23].Begin()}],background:"Persons/Scarlett",condition:function(){0>=Game.Stats.ForgotHomework.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FirstChapter[41].Begin()})}}),Game.Scenes.FirstChapter[23]=new Scene({text:`
            В лекционный зал вошел профессор Нэйтан. Гул, стоявший от болтовни студентов, сразу же стих. Вместо него появились звуки шуршания в рюкзаках и перелистывания страниц учебников. 
            Все были готовы к началу лекции. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[213].Begin()}],background:"Persons/Neitan"}),Game.Scenes.FirstChapter[213]=new Scene({text:`
            Это была одна из немногих пар, на которые учащиеся приходили с чувством заинтересованности.  
            Время пролетало мгновенно, в силу того, что профессор был необычайно талантлив и умел грамотно преподавать материал. 
            <p>- Давайте начнем, думаю, все, кто хотел присутствовать сегодня - уже пришли, - его голос звучал размеренно и спокойно. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[24].Begin(),Game.Message("\u041F\u0440\u043E\u0444\u0435\u0441\u0441\u043E\u0440 \u0440\u0430\u0434, \u0447\u0442\u043E \u043D\u0438\u043A\u0442\u043E \u043D\u0435 \u043E\u043F\u043E\u0437\u0434\u0430\u043B"),Game.Stats.Neitan.Add(1)}],background:"Persons/Neitan"}),Game.Scenes.FirstChapter[24]=new Scene({text:`
            Нэйтан был одет в черный костюм: пиджак, рубашка, приталенные брюки - ничего лишнего. 
            Он выглядел соответствующе тому, на кого было приковано много внимания. 
            Профессор  всегда держал голову высоко, а спину прямо. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[190].Begin()}],background:"Persons/Neitan"}),Game.Scenes.FirstChapter[190]=new Scene({text:`
            Многие студентки не раз предпринимали  попытки флирта, но преподаватель всегда держался холодно и отстраненно. Гораздо важнее для него - передать знания и научить чему-то полезному. 
            Нэйтан всегда подчеркивал важность учебы и негативно относился к невыполнению требований к занятиям. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[42].Begin()}],background:"Persons/Neitan"}),Game.Scenes.FirstChapter[25]=new Scene({text:`
            Автобус приехал не сразу, но хотя бы полупустой. Я прошла в конец салона, чтобы никто не отвлекал меня от моих мыслей и заняла место около окна. 
            Включив любимую музыку, я стала наблюдать за проносившимися скучными пейзажами. 
            Стандартные дома, вечно куда-то торопящиеся люди, но под музыку все казалось не таким серым и обыденным. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[26].Begin()}],background:"Backgrounds/Bus"}),Game.Scenes.FirstChapter[26]=new Scene({text:`
            Мою поездку скрасила переписка с Шерил - подругой из соседнего дома.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[7].Begin()}],background:"Backgrounds/Bus"}),Game.Scenes.FirstChapter[27]=new Scene({text:`
            Когда автобус почти подъехал, до начала пары оставалось 5 минут. Университет, в котором я училась уже несколько лет, был одним из ведущих учебных заведений в нашем небольшом городе. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[160].Begin()}],background:"Backgrounds/Uni"}),Game.Scenes.FirstChapter[160]=new Scene({text:`
            На его территории всегда было свежо и просторно: много ветвистых деревьев, аккуратно постриженный газон, скамейки, пользующиеся популярностью у прогульщиков. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[161].Begin()}],background:"Backgrounds/Uni"}),Game.Scenes.FirstChapter[161]=new Scene({text:`
            Порой, мы собирались на них с друзьями, чтобы обсудить прошедший день или повторить материал перед занятиями. Но это было раньше - сейчас все стали слишком заняты, и время ценится иначе.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[28].Begin()}],background:"Backgrounds/Uni"}),Game.Scenes.FirstChapter[28]=new Scene({text:`
            Я стала настраиваться на предстоящее занятие, как вдруг что-то во мне оборвалось, нарастало неприятное чувство. Я начала лихорадочно копаться в рюкзаке, выбрасывая все вещи на соседнее сидение. Опустошив всю сумку, я окончательно убедилась, что забыла работу дома. 
            <p>“Если бы я только снова не уснула…” 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[210].Begin()}],background:"Backgrounds/Bus"}),Game.Scenes.FirstChapter[210]=new Scene({text:`
            Обреченно запихивая вещи обратно в рюкзак, я подумала:
            <p>“Профессор Нэйтан убьёт меня… Как же я могла так облажаться. Всю ночь ведь сидела и писала”. 
            <p>Я быстро выбежала из транспорта, предварительно забежав в уборную.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[16].Begin()}],background:"Backgrounds/Bus"}),Game.Scenes.FirstChapter[29]=new Scene({text:`
            Я опоздала на пару и вбежала в аудиторию во время увлекательного рассказа профессора Нэйтана. 
            Все обернулись на меня и я прочитала в их глазах недовольство. 
            Взгляд учителя мельком скользнул по мне, он знаком показал на свободное место рядом с моей подругой Скарлетт.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[30].Begin()}],background:"Backgrounds/Lection"}),Game.Scenes.FirstChapter[30]=new Scene({text:`
            Из-за опоздания, мне пришлось нагонять материал и в спешке переписывать конспект у одногруппницы. 
            Не было времени даже на перешептывание, так как профессор Нэйтан изредка бросал на меня строгий взгляд, чтобы удостовериться в том, что я действительно занимаюсь делом. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[180].Begin()}],background:"Persons/Neitan"}),Game.Scenes.FirstChapter[180]=new Scene({text:`
            И  не зря, ведь  это была одна из немногих пар, на которые  учащиеся  приходили с чувством заинтересованности.  
            Время пролетало мгновенно, в силу того, что профессор был необычайно талантлив и  грамотно  преподавал материал. 
            <p>- Давайте продолжим, думаю, все уже пришли, - его голос звучал размеренно, но недовольно.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[24].Begin(),Game.Message("\u041F\u0440\u043E\u0444\u0435\u0441\u0441\u043E\u0440 \u043D\u0435\u0434\u043E\u0432\u043E\u043B\u0435\u043D \u0432\u0430\u0448\u0438\u043C \u043E\u043F\u043E\u0437\u0434\u0430\u043D\u0438\u0435\u043C"),Game.Stats.Neitan.Add(-1)}],background:"Persons/Neitan"}),Game.Scenes.FirstChapter[31]=new Scene({text:`
            Я не поддалась на это искушение, встала с кровати и начала собираться, вовремя вспомнив про домашнее задание к паре профессора Нэйтана. 
            <p>”Я почти его забыла. Моя успеваемость и так  оставляет желать лучшего…”
            <p>Когда последние приготовления были сделаны, я заглянула в ванную, чтобы привести себя в порядок. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[32].Begin(),Game.Message("\u0412 \u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u0435 \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u0441 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430\u043C\u0438 \u0438 \u0438\u043C\u0435\u044E\u0449\u0438\u0435\u0441\u044F \u0443 \u0432\u0430\u0441 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u044B.")}],background:"Backgrounds/Room"}),Game.Scenes.FirstChapter[32]=new Scene({text:`
            Я поправила небрежный хвост и взглянула в свои карие глаза. 
            <p>“Нужно больше спать… Чертовы мешки под глазами!”
            <p>Я немного подкрасила брови и ресницы. Мне больше нравилась естественная красота, поэтому косметика не была моей близкой подругой. 
            Я еще немного поколдовала над собой и вышла из помещения.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[33].Begin()}],background:"Persons/Hero"}),Game.Scenes.FirstChapter[33]=new Scene({text:`
            Я спустилась вниз, откуда раздавался чудесный аромат чего-то съестного. За столом сидел отец, который что-то нервно печатал в телефоне. 
            <p>- Доброе утро, пап! - я нежно поцеловала его в щечку. 
            <p>- Привет, милая. Ты сегодня рано.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[130].Begin()}],background:"Backgrounds/Kitchen"}),Game.Scenes.FirstChapter[130]=new Scene({text:`
            Отец выглядел сонным и расстроенным, но все равно улыбался мне.
            <p>- Все в порядке? - я решила спросить, хотя понимала, что он вряд ли скажет правду. 
            <p>- Конечно, не бери в голову. Будешь кушать? Мама не оставила нас голодными. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[102].Begin()}],background:"Backgrounds/Kitchen"}),Game.Scenes.FirstChapter[102]=new Scene({text:`
            “В последнее время он стал совсем отстраненным. Раньше мы могли часами проводить время вместе: играть в настольные игры, рубиться в приставку, гулять - а теперь для него, словно, перестали существовать все прелести жизни. 
            Почему же он не откроется мне? В глубине души я как будто бы знала причину, но не хотела этого признавать.” 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[34].Begin()}],background:"Backgrounds/Kitchen"}),Game.Scenes.FirstChapter[34]=new Scene({text:`
            <p>- О, да! Она у нас трудяга, - сейчас мне лишь оставалось продолжить разговор в привычном русле.
            <p>Я решила покушать…
            `,buttontext:["\u0424\u0440\u0443\u043A\u0442\u043E\u0432\u044B\u0439 \u0441\u0430\u043B\u0430\u0442","\u0411\u0443\u0442\u0435\u0440\u0431\u0440\u043E\u0434\u044B","\u0411\u043B\u0438\u043D\u044B"],buttonaction:[()=>{Game.Scenes.FirstChapter[35].Begin(),Game.Message("\u0421\u0432\u0435\u0436\u0438\u0435 \u0444\u0440\u0443\u043A\u0442\u044B \u0432 \u0441\u043E\u0447\u0435\u0442\u0430\u043D\u0438\u0438 \u0441 \u0439\u043E\u0433\u0443\u0440\u0442\u043E\u043C \u043E\u043A\u0430\u0437\u0430\u043B\u0438\u0441\u044C \u043E\u0447\u0435\u043D\u044C \u043F\u0438\u0442\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C\u0438 \u0438 \u0432\u043A\u0443\u0441\u043D\u044B\u043C\u0438.")},()=>{Game.Scenes.FirstChapter[35].Begin(),Game.Message("\u0421\u0442\u0430\u0440\u0430\u044F \u043A\u043B\u0430\u0441\u0441\u0438\u043A\u0430. \u0425\u043B\u0435\u0431, \u0441\u044B\u0440 \u0438 \u043A\u043E\u043B\u0431\u0430\u0441\u0430, \u0447\u0442\u043E \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0440\u043E\u0449\u0435 \u0438 \u0432\u043A\u0443\u0441\u043D\u0435\u0435?")},()=>{Game.Scenes.FirstChapter[35].Begin(),Game.Message("\u042F \u043F\u043E\u0434\u043E\u0433\u0440\u0435\u043B\u0430 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0431\u043B\u0438\u043D\u043E\u0432 \u0432 \u043C\u0438\u043A\u0440\u043E\u0432\u043E\u043B\u043D\u043E\u0432\u043A\u0435. \u041E\u043D\u0438 \u043E\u043A\u0430\u0437\u0430\u043B\u0438\u0441\u044C \u0441 \u043C\u044F\u0441\u043E\u043C.")}],background:"Backgrounds/Kitchen"}),Game.Scenes.FirstChapter[35]=new Scene({text:`
            Во время трапезы, мы еще немного переговорили с отцом о мелочах связанных с бытом, а затем он предложил довести меня до университета. Я охотно согласилась, чтобы не ждать автобус и не тратить деньги на такси. 
            <p>Всю дорогу мы молчали, наслаждаясь музыкой и окружающими видами.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[36].Begin()}],background:"Backgrounds/Car"}),Game.Scenes.FirstChapter[36]=new Scene({text:`
            Мою поездку скрасила переписка с Шерил - подругой из соседнего дома.
            <p>Она жаловалась, что ее приемный отец в очередной раз напился и угрожал сделать ужасные вещи. Я давно советовала ей подать заявление в полицию,  попытаться съехать от него, но некая привязанность удерживала ее в этом доме ужасов. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[8].Begin()}],background:"Backgrounds/Phone"}),Game.Scenes.FirstChapter[37]=new Scene({text:`
            Поездка не заняла много времени, когда мы подъезжали, я еще раз поблагодарила папу и покинула транспорт. 
            Времени оставалось еще много, поэтому, выдохнув, я спокойным шагом направилась в сторону входа.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[38].Begin()}],background:"Backgrounds/Uni"}),Game.Scenes.FirstChapter[38]=new Scene({text:`
            Университет, в котором я училась уже несколько лет, был одним из ведущих учебных заведений в нашем небольшом городе. 
            На его территории всегда было свежо и просторно: много ветвистых деревьев, аккуратно постриженный газон, скамейки, пользующиеся популярностью у прогульщиков. 
            
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[170].Begin()}],background:"Backgrounds/Uni"}),Game.Scenes.FirstChapter[170]=new Scene({text:`
            Порой, мы собирались на них с друзьями, чтобы обсудить прошедший день или повторить материал перед занятиями. Но это было раньше - сейчас все стали слишком заняты, и время ценится иначе.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[39].Begin()}],background:"Backgrounds/Uni"}),Game.Scenes.FirstChapter[39]=new Scene({text:`
            Лекционный зал потихоньку заполнялся студентами. Я села на свободное место и скучающе открыла учебник, чтобы повторить материал. 
            Я смогла запомнить: Вильгельма Рентгена, который совершил прорыв в медицине и открыл рентген, Александра Флеминга, изобретателя пенициллина, Бориса Розинга, создателя более 120 схем и систем для телевизионных устройств.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[131].Begin()}],background:"Backgrounds/Lection"}),Game.Scenes.FirstChapter[131]=new Scene({text:`
            Но вдруг я услышала знакомый воодушевленный женский голос. 
            <p>- $Имя Игрока$, привет! Необычно встречать тебя до начала занятий, а не на второй паре, - с ухмылкой проговорила девушка. -  Ну, что, успела закончить домашнее задание?
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[40].Begin()}],background:"Backgrounds/Lection"}),Game.Scenes.FirstChapter[40]=new Scene({text:`
            - Привет-привет, - я нежно обняла свою подругу. 
            <p>Я победоносно улыбнулась. 
            <p>- Да! 
            <p>- Отлично, - она похлопала меня по плечу. - А то я думала, что опять придется давать тебе списывать. 
            <p>- Я нечасто к этому прибегаю, ладно уж тебе…
            <p>До начала занятий, она успела поведать мне немного о своих проблемах с мамой. У них не сходились интересы. Родные девушки не могли представить свою дочь в роли историка.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[19].Begin()}],background:"Persons/Scarlett"}),Game.Scenes.FirstChapter[41]=new Scene({text:`
            Мы еще немного поговорили, пока в лекционный зал не вошел профессор Нэйтан. Гул, стоявший от болтовни студентов, сразу же стих. Вместо него появились звуки шуршания в рюкзаках и перелистывания страниц учебников.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[132].Begin()}],background:"Persons/Neitan"}),Game.Scenes.FirstChapter[132]=new Scene({text:`
            Все были готовы к началу лекции. Это была одна из немногих пар, на которые учащиеся приходили с чувством заинтересованности.  Время пролетало мгновенно, в силу того, что профессор был необычайно талантлив и умел грамотно преподавать материал. 
            <p>- Давайте начнем, думаю, всего уже пришли, - его голос звучал размеренно и спокойно.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[24].Begin(),Game.Message("\u041F\u0440\u043E\u0444\u0435\u0441\u0441\u043E\u0440 \u0440\u0430\u0434, \u0447\u0442\u043E \u043D\u0438\u043A\u0442\u043E \u043D\u0435 \u043E\u043F\u043E\u0437\u0434\u0430\u043B"),Game.Stats.Neitan.Add(1)}],background:"Persons/Neitan"}),Game.Scenes.FirstChapter[42]=new Scene({text:`
            Профессор написал на доске мелом название сегодняшней лекции.
            <p><i>“Великие открытия человечества XIX - XX веков”.</i> 
            <p>Он отряхнул руки и внимательно посмотрел на студентов.
            <p>- Попрошу вас сдать эссе, которое я задавал неделю назад. Передайте с задних рядов вперед.
            `,buttontext:[""],buttonaction:[""],background:"Backgrounds/Lection",condition:function(){this.buttonaction[0]=0>=Game.Stats.ForgotHomework.Get()?()=>{Game.Scenes.FirstChapter[43].Begin(),Game.Message("\u0412\u0430\u0448\u0430 \u0442\u0435\u043A\u0443\u0449\u0430\u044F \u0443\u0441\u043F\u0435\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u044C \u201C4\u201D"),Game.Stats.Study.Set(4),Game.Stats.Neitan.Add(1)}:()=>{Game.Scenes.FirstChapter[44].Begin(),Game.Message("\u0412\u0430\u0448\u0430 \u0442\u0435\u043A\u0443\u0449\u0430\u044F \u0443\u0441\u043F\u0435\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u044C \u201C3\u201D"),Game.Stats.Study.Set(3)}}}),Game.Scenes.FirstChapter[43]=new Scene({text:`
            Я передала свою работу вместе со всеми. Профессор удовлетворительно кивнул и перешел к основной теме занятия.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[45].Begin()}],background:"Backgrounds/Lection"}),Game.Scenes.FirstChapter[44]=new Scene({text:`
            Я раскраснелась, так как была среди немногих, кто не сдал работу. Профессор недовольно покачал головой и перешел к основной теме занятия.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[45].Begin()}],background:"Backgrounds/Lection"}),Game.Scenes.FirstChapter[45]=new Scene({text:`
            Профессор рассказывал об удивительных гениях, чьи открытия сделали в свою эпоху прорыв, который оказал огромное влияние на современный мир. 
            Его лекция не была монологом, Нэйтан часто обращался к студентам и спрашивал их мнение по тому или иному вопросу. 
            Преподаватель старался не только дать полезный материал, но и выступить в роли наставника,  поделиться своим опытом и наблюдениями. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[110].Begin()}],background:"Persons/Neitan"}),Game.Scenes.FirstChapter[110]=new Scene({text:`
            Он упомянул, что все совершают ошибки, а также как ничтожна известность без настоящего рвения и знаний.  
            <p>- Потенциал многих ученых смог полностью раскрыться только в информационный век. Не стоит гоняться за бессмысленной славой и уж тем более мечтать о легких деньгах. 
            <p>Я же…
            `,buttontext:["\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u043B\u0430 \u0441\u043B\u0443\u0448\u0430\u0442\u044C \u043B\u0435\u043A\u0446\u0438\u044E","\u0417\u0430\u0441\u043C\u0430\u0442\u0440\u0438\u0432\u0430\u043B\u0430\u0441\u044C \u043D\u0430 \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u043E\u0440\u0430","\u0420\u0430\u0437\u0433\u043E\u0432\u0430\u0440\u0438\u0432\u0430\u043B\u0430 \u0441\u043E \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442"],buttonaction:[()=>{Game.Scenes.FirstChapter[46].Begin(),3>=Game.Stats.Study.Get()&&Game.Stats.Study.Add(1)},()=>{Game.Scenes.FirstChapter[47].Begin(),Game.Stats.Neitan.Add(1)},()=>{Game.Scenes.FirstChapter[48].Begin(),Game.Stats.Scarlett.Add(1)}],background:"Persons/Neitan"}),Game.Scenes.FirstChapter[46]=new Scene({text:`
            Профессор вел не нудную лекцию, а как будто бы пытался достучаться до каждого в этом зале. 
            Хоть он и местами говорил очевидные вещи, но его харизма и обаяние заставляли вслушиваться в каждое слово.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[200].Begin()}],background:"Backgrounds/Lection"}),Game.Scenes.FirstChapter[47]=new Scene({text:`
            Преподаватель казался мне интереснее, чем учеба. 
            <p>Его голубые глаза и сосредоточенный взгляд захватили все мое внимание. Я не отрываясь смотрела на Нэйтана, любуясь им.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[200].Begin()}],background:"Persons/Neitan"}),Game.Scenes.FirstChapter[48]=new Scene({text:`
            Мне было гораздо интереснее обсудить с подругой последние сплетни, чем слушать лекцию. В конечном итоге, всегда можно у кого-нибудь переписать материал. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[200].Begin()}],background:"Persons/Scarlett"}),Game.Scenes.FirstChapter[200]=new Scene({text:`
            Когда большая часть лекции была позади, профессор объявил:
            <p>- Давайте, вы отвлечетесь от своих тетрадей или чем вы там занимались. Проведем небольшой устный опрос. 
            Один вопрос каждому желающему, если ответите верно, поставлю плюсик к вашей оценке. Кто рискнёт? 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[49].Begin()}],background:"Persons/Neitan"}),Game.Scenes.FirstChapter[49]=new Scene({text:`
            Я колебалась. Не сказать, что я хорошо знала материал, но и шанс повысить успеваемость не хотелось упускать. 
            <p>И я решила: 
            `,buttontext:["\u041F\u043E\u0434\u043D\u044F\u0442\u044C \u0440\u0443\u043A\u0443","\u041D\u0435 \u043F\u043E\u0434\u043D\u0438\u043C\u0430\u0442\u044C \u0440\u0443\u043A\u0443"],buttonaction:[()=>{Game.Scenes.FirstChapter[111].Begin()},()=>{Game.Scenes.FirstChapter[53].Begin()}],background:"Persons/Neitan"}),Game.Scenes.FirstChapter[111]=new Scene({text:`
            “Была ни была!”
            <p>Я резко подняла руку, чем вызвала удивление Скарлетт. Нэйтан, напротив, улыбнулся.
            <p>“Наверное подумал, наконец-то, его непутевая студентка решила взяться за учебу.”
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[50].Begin()}],background:"Persons/Neitan"}),Game.Scenes.FirstChapter[50]=new Scene({text:`
            <p>- $Имя Игрока$, скажите, кто изобрел пенициллин? 
            <p>“Это должно быть легко, вспоминай…”

            `,buttontext:["\u0412\u0438\u043B\u044C\u0433\u0435\u043B\u044C\u043C \u0420\u0435\u043D\u0442\u0433\u0435\u043D","\u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440 \u0424\u043B\u0435\u043C\u0438\u043D\u0433","\u0411\u043E\u0440\u0438\u0441 \u0420\u043E\u0437\u0438\u043D\u0433"],buttonaction:[()=>{Game.Scenes.FirstChapter[51].Begin()},()=>{Game.Scenes.FirstChapter[52].Begin(),3>=Game.Stats.Study.Get()&&Game.Stats.Study.Add(1),Game.Achievements.AllKnowing.Unlock()},()=>{Game.Scenes.FirstChapter[51].Begin()}],background:"Persons/Neitan"}),Game.Scenes.FirstChapter[51]=new Scene({text:`
            Преподаватель разочарованно вздохнул. 
            <p>- Нет, это был Александр Флеминг. В 1928 году он обнаружил воздействие плесени на бактерии. И лишь к 1943-му лекарство стали широко использовать в медицинских учреждениях. 
            Но ты все равно молодец, за смелость, я не буду снижать оценку. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[54].Begin(),Game.Achievements.FirstPartCompleted.Unlock()}],background:"Persons/Neitan"}),Game.Scenes.FirstChapter[52]=new Scene({text:`
            - Отлично, лекцию ты слушала. И действительно, в 1928 году он обнаружил воздействие плесени на бактерии. 
            И лишь к 1943-му лекарство стали широко использовать в медицинских учреждениях. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[54].Begin(),Game.Achievements.FirstPartCompleted.Unlock()}],background:"Persons/Neitan"}),Game.Scenes.FirstChapter[53]=new Scene({text:`
            Несколько ребят попытали удачу, в том числе и Скарлетт. Вопросы были не из легких, и я даже облегченно вздохнула, радуясь, что  решила не отвечать.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.FirstChapter[54].Begin(),Game.Achievements.FirstPartCompleted.Unlock()}],background:"Backgrounds/Lection"}),Game.Scenes.FirstChapter[54]=new Scene({text:`
            Лекция подходила к концу, когда я ощутила сильную боль в области виска. 
            Моя рука невольно прикоснулась к лицу и я почувствовала что-то на руке. 
            Это была кровь, которая, по всей видимости, струилась у меня из носа. 
            Я неуверенно поднялась из-за парты, начала проходить между рядами, чтобы поскорее покинуть помещение. Резко перед глазами стало все расплываться.
            <p>Последнее, что отложилось у меня в памяти - крепкие объятия. А затем, давящая темнота поглотила меня.
            `,buttontext:[""],buttonaction:[()=>{setTimeout(()=>{Game.Scenes.TL[1].Begin()},1e3),Game.LoadScreen("TL"),Game.Progress.Save("TL")}],background:"Backgrounds/Lection",condition:function(){5<=Game.Stats.Study.Get()&&Game.Stats.Study.Set(4)}}),Game.Scenes.TL=[],Game.Scenes.TL[1]=new Scene({text:`
            Большое количество громких звуков заставило меня прийти в себя и попытаться открыть глаза. 
            Череда ярких вспышек, перетекающих в головокружение, не давали мне окончательно сосредоточиться на происходящем. 
            Но даже сквозь затуманенное сознание я видела незнакомое окружение.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[2].Begin(),Game.Message("<em>\u041D\u044C\u044E-\u0419\u043E\u0440\u043A 1885 \u0433\u043E\u0434"),Game.Effects.Flash()}],background:"",condition:function(){Game.Sounds.Play("Music","NY")}}),Game.Scenes.TL[2]=new Scene({text:`
            Мужчины, одетые во фраки, с причудливыми тростями. Лошади, тянущие за собой кареты. Невиданные мною ранее здания, которые были увешаны заманивающими вывесками. 
            Впереди, на крыше одного из домов, развевался американский флаг, а внизу суетились люди, как и всегда спешащие по своим делам.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[3].Begin()}],background:"Backgrounds/NY"}),Game.Scenes.TL[3]=new Scene({text:`
            Складывалось ощущение, что я чудесным образом попала в прошлое. Однако я не была историком или прилежной ученицей, чтобы точно определить эпоху.
            <p>“Машин нет, старомодная одежда… Наверно это XIX или XX век”. 
            <p>Я неспешно подошла к одному магазину, судя по всему торгующему ювелирными изделиями, где всматриваясь в стеклянную витрину, я увидела свое отражение. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[4].Begin()}],background:"Backgrounds/NY"}),Game.Scenes.TL[4]=new Scene({text:`
            Это была я? Мои каштановые волосы, лицо… Но некоторые черты все же отличались. Например, форма глаз или бровей. В остальном, девушка была моей копией. 
            Словно я нашла своего двойника, здесь, в другом времени. 

            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[5].Begin()}],background:"Persons/Hero_TL"}),Game.Scenes.TL[5]=new Scene({text:`
            Я бездумно смотрела вперед: щипая себя за руки,  хлопая по щекам… Ощущения были реальными, но я все равно подсознательно отрицала происходящее.
            <p>“Как такое может быть правдой?” 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[6].Begin()}],background:"Persons/Hero_TL"}),Game.Scenes.TL[6]=new Scene({text:`
            Меня немного трясло, поэтому я облокотилась о небольшую колонну рядом с одним из зданий, в надежде, что чувствуя опору состояние улучшится.
            <p>Через некоторое время ко мне подошел мужчина.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[7].Begin()}],background:""}),Game.Scenes.TL[7]=new Scene({text:`
            Он был худой, с забавными усами и задорной улыбкой. Идеально ровная спина, гордо поднятая голова. 
            Серый костюм подчеркивал фигуру и намекал на не самое последнее положение в обществе.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[8].Begin(),Game.Stats.Nicola.Add(0)}],background:"Persons/Nicola"}),Game.Scenes.TL[8]=new Scene({text:`
            Его радушный вид вмиг померк при взгляде на меня и он обеспокоенно спросил: 
            <p>- Катарина, что случилось? 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[209].Begin()}],background:"Persons/Nicola"}),Game.Scenes.TL[209]=new Scene({text:`
            Я не смогла ничего выдавить из себя. Затуманенным взглядом я смотрела на мужчину, которого узнала. Именно про него я писала эссе, заданное профессором Нэйтаном. 
            <p>- Ты - Никола Тесла!
            <p>Я сказала это быстро, неосознанно, практически тыча ему в лицо пальцем. Взгляд цеплялся за живую легенду, будто только что сошедшую со страниц моего учебника.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[208].Begin()}],background:"Persons/Nicola"}),Game.Scenes.TL[208]=new Scene({text:`
            - Катарина, конечно, это я. Тебе плохо? Ты совсем побледнела. 
            <p>Сон был настолько реален, что я чувствовала его прикосновение. Он дрожащими руками держал меня за плечи, продолжая повторять: 
            <p>- Давай дойдем до доктора… Это всего в нескольких кварталах отсюда. Если необходимо, я поймаю экипаж! 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[9].Begin()}],background:"Persons/Nicola"}),Game.Scenes.TL[9]=new Scene({text:`
            <p>Мне нужно было что-то придумать, чтобы оправдать свое поведение. Но стоило ли так стараться, если это все равно сон и мои выборы нереальны? Я выбрала:
            `,buttontext:["\u041E\u0442\u043D\u0435\u0441\u0442\u0438\u0441\u044C \u0441\u0435\u0440\u044C\u0451\u0437\u043D\u043E","\u041D\u0435 \u0432\u0435\u0440\u0438\u0442\u044C \u0432 \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0435\u0435","\u0423\u0431\u0435\u0436\u0430\u0442\u044C"],buttonaction:[()=>{Game.Scenes.TL[10].Begin(),Game.Stats.Believe.Add(1)},()=>{Game.Scenes.TL[33].Begin(),Game.Stats.Believe.Add(-1)},()=>{Game.Scenes.TL[49].Begin(),Game.Achievements.Crazy.Unlock(),Game.Stats.Believe.Add(-1)}],background:"Persons/Nicola"}),Game.Scenes.TL[10]=new Scene({text:`
            Я решительно взглянула в его голубые глаза, которые выглядели уставшими и чрезмерно озадаченными. 
            <p>- Все в порядке, просто голова закружилась,- я подыгрывала этому спектаклю моего подсознания.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[11].Begin(),Game.Message("\u041D\u0438\u043A\u043E\u043B\u0430 \u0432\u0430\u043C \u0441\u043E\u0447\u0443\u0432\u0441\u0442\u0432\u0443\u0435\u0442"),Game.Stats.Nicola.Add(1)}],background:"Persons/Nicola"}),Game.Scenes.TL[11]=new Scene({text:`
            - Но врач недалеко, - Тесла начал суетливо осматривать карманы. - Мы немедленно должны написать телеграмму Роберту о твоем самочувствии. 
            Он просил приглядывать за тобой в его отсутствие. 
            <p>- Нет-нет, в этом нет необходимости, я абсолютно здорова, - я могла лишь выдать глупую улыбку, надеясь, что Тесла поверит в этот фарс.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[12].Begin()}],background:"Persons/Nicola"}),Game.Scenes.TL[12]=new Scene({text:`
            Он действительно отступил. 
            По его манере поведения было сложно судить, о чем он думает, однако благодаря написанному мною эссе, я понимала,
             что несмотря на затворнический образ жизни великого ученого -  Тесла был эмпатом.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[13].Begin(),Game.Message("\u042D\u043C\u043F\u0430\u0442 \u2013 \u044D\u0442\u043E \u0447\u0435\u043B\u043E\u0432\u0435\u043A, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0441\u043F\u043E\u0441\u043E\u0431\u0435\u043D \u0441\u043E\u043F\u0435\u0440\u0435\u0436\u0438\u0432\u0430\u0442\u044C \u0434\u0440\u0443\u0433\u0438\u043C.")}],background:""}),Game.Scenes.TL[13]=new Scene({text:`
            - Катарина, - Никола предложил мне опереться о его локоть. - Если все хорошо, мы еще можем встретиться с Редьярдом Киплингом. 
            Помнишь, я говорил тебе о нем  и его стоящих внимания произведениях за ланчем. Мы немного опаздываем, но думаю, он поймет и простит нашу бестактность. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[113].Begin()}],background:"Persons/Nicola"}),Game.Scenes.TL[113]=new Scene({text:`
            <p>Меня немного лихорадило, но двигаться самостоятельно понемногу получалось. Я… 
            `,buttontext:["\u041F\u0440\u0438\u043D\u044F\u043B\u0430 \u043F\u043E\u043C\u043E\u0449\u044C \u041D\u0438\u043A\u043E\u043B\u044B","\u0421\u043F\u0440\u0430\u0432\u0438\u043B\u0430\u0441\u044C \u0441\u0430\u043C\u0430"],buttonaction:[()=>{Game.Scenes.TL[14].Begin()},()=>{Game.Scenes.TL[114].Begin()}],background:"Persons/Nicola"}),Game.Scenes.TL[114]=new Scene({text:`
            Осознавая всю нереальность происходящего, мне, однако, было трудно решиться поступить именно таким образом. 
            Да и не настолько я себя плохо чувствовала, чтобы просить поддержку Теслы. 
            <p>Я вежливо отказала ученому. Все еще обеспокоенный Никола кивнул и спокойно остался стоять рядом со мной.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[15].Begin()}],background:"Persons/Nicola"}),Game.Scenes.TL[14]=new Scene({text:`
            Мне была приятна забота такого великого человека, хоть он сам еще и не осознавал своего статуса. Я нашла поддержку Николы, чем вызвала его улыбку.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[15].Begin(),Game.Message("\u041D\u0438\u043A\u043E\u043B\u0430 \u0440\u0430\u0434 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043F\u043E\u0434\u0440\u0443\u0433\u0443"),Game.Stats.Nicola.Add(1)}],background:"Persons/Nicola"}),Game.Scenes.TL[15]=new Scene({text:`
            Мы неспешно двинулись по старинным улочкам Америки. Молча, сосредоточенно. Я погрузилась в свои мысли, параллельно любуясь красивыми чертами города.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[16].Begin()}],background:"Backgrounds/NY"}),Game.Scenes.TL[16]=new Scene({text:`
            Тишину прервал Тесла, который выглядел возбужденно. Ему не терпелось чем-то поделиться со мной:
            <p>- Знаешь, скажу тебе по секрету, я нашел клуб, в котором в скором временем пройдет игра в домино… 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[17].Begin(),Game.Message("\u0412\u044B \u0443\u0441\u043B\u044B\u0448\u0430\u043B\u0438 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u043C\u043E\u0436\u0435\u0442 \u043F\u043E\u043C\u0435\u043D\u044F\u0442\u044C \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u0435 \u0438\u0441\u0442\u043E\u0440\u0438\u0438")}],background:"Persons/Nicola"}),Game.Scenes.TL[17]=new Scene({text:`
            Я попыталась вспомнить отрывки из его биографии. По моей памяти, Тесла был азартным игроком, который мог проиграть все, что можно. Остаться голым и при этом все равно продолжать играть. 
            Однако мне, казалось, что его страсть  должна уже пройти к этому моменту. Все его время обязано быть посвящено науке и великим открытиям. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[18].Begin()}],background:"",condition:function(){Game.Scenes.TL[21].Activate(0),Game.Scenes.TL[23].Activate(0),Game.Scenes.TL[24].Activate(0),Game.Scenes.TL[26].Activate(0),Game.Scenes.TL[21].Activate(1),Game.Scenes.TL[23].Activate(1),Game.Scenes.TL[24].Activate(1),Game.Scenes.TL[26].Activate(1),Game.Scenes.TL[21].Activate(2),Game.Scenes.TL[23].Activate(2),Game.Scenes.TL[24].Activate(2),Game.Scenes.TL[26].Activate(2),Game.Scenes.TL[21].Activate(3),Game.Scenes.TL[23].Activate(3),Game.Scenes.TL[24].Activate(3),Game.Scenes.TL[26].Activate(3),this.buttonaction[0]=4<=Game.Stats.Study.Get()?()=>{Game.Scenes.TL[18].Begin(),Game.Message("\u0412\u0430\u0448\u0438 \u0437\u043D\u0430\u043D\u0438\u044F \u043F\u043E\u043C\u043E\u0433\u043B\u0438 \u0432\u0430\u043C \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u043E\u0431 \u044D\u043F\u043E\u0445\u0435 \u0438 \u043E\u0442\u043A\u0440\u044B\u043B\u0438 \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0432\u044B\u0431\u043E\u0440"),Game.Achievements.SmartGirl.Unlock()}:()=>{Game.Scenes.TL[18].Begin(),Game.Message("\u0412\u0430\u0448\u0438 \u0437\u043D\u0430\u043D\u0438\u044F \u043D\u0435 \u043F\u043E\u043C\u043E\u0433\u043B\u0438 \u0432\u0430\u043C \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u043E\u0431 \u044D\u043F\u043E\u0445\u0435 \u0438 \u043D\u0435 \u043E\u0442\u043A\u0440\u044B\u043B\u0438 \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0432\u044B\u0431\u043E\u0440"),Game.Scenes.TL[18].Deactivate(0),Game.Scenes.TL[23].Deactivate(0),Game.Scenes.TL[24].Deactivate(0),Game.Scenes.TL[26].Deactivate(0)}}}),Game.Scenes.TL[18]=new Scene({text:`
            <p>“Что-то тут не так… Но я же его близкий человек, точно не невеста, таковых у него не было, но раз он позволяет такие фамильярности - я могу попытаться наставить Николу на верный путь. 
            Послушает ли он меня? Попробую расспросить его”.
            `,buttontext:["<a color=\"white\">\u0420\u0430\u0437\u0432\u0435 \u0442\u044B \u043D\u0435 \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043B \u0438\u0433\u0440\u0430\u0442\u044C?</a>","\u041D\u0438\u043A\u043E\u043B\u0430, \u0430 \u043A\u0430\u043A \u0436\u0435 \u0440\u0430\u0431\u043E\u0442\u0430?","\u0427\u0442\u043E \u044D\u0442\u043E \u0437\u0430 \u043A\u043B\u0443\u0431? ","\u041A\u0442\u043E-\u043D\u0438\u0431\u0443\u0434\u044C \u0441\u043E\u0441\u0442\u0430\u0432\u0438\u0442 \u0442\u0435\u0431\u0435 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044E?"],buttonaction:[()=>{Game.Scenes.TL[19].Begin(),Game.Scenes.TL[21].Deactivate(0),Game.Scenes.TL[23].Deactivate(0),Game.Scenes.TL[24].Deactivate(0),Game.Scenes.TL[26].Deactivate(0)},()=>{Game.Scenes.TL[22].Begin(),Game.Scenes.TL[21].Deactivate(1),Game.Scenes.TL[23].Deactivate(1),Game.Scenes.TL[24].Deactivate(1),Game.Scenes.TL[26].Deactivate(1)},()=>{Game.Scenes.TL[24].Deactivate(2),Game.Scenes.TL[24].Begin(),Game.Scenes.TL[21].Deactivate(2),Game.Scenes.TL[23].Deactivate(2),Game.Scenes.TL[26].Deactivate(2)},()=>{Game.Scenes.TL[25].Begin(),Game.Scenes.TL[21].Deactivate(3),Game.Scenes.TL[23].Deactivate(3),Game.Scenes.TL[24].Deactivate(3),Game.Scenes.TL[26].Deactivate(3)},()=>{Game.Scenes.TL[27].Begin()}],buttonactive:[!0,!0,!0,!0,!1],background:"",condition:function(){this.buttonactive[4]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2]||!1!=this.buttonactive[3])}}),Game.Scenes.TL[19]=new Scene({text:`
            Тесла выглядел озадаченно, вопрос явно застал его врасплох. 
            <p>- Около года я не связывал свою жизнь с играми. Но в нынешней ситуации мне необходимы деньги, ведь на работе все складывается не самым лучшим образом, ты знаешь.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[20].Begin()}],background:"Persons/Nicola"}),Game.Scenes.TL[20]=new Scene({text:`
            “Неужели это уже произошло? Тесла поругался с Эдисоном?”
            <p>- Но это не выход! Сколько раз ты уже проигрывал все, - я попыталась надавить на самое больное. - Это иллюзия, ты не зарабатываешь, а лишь только тратишь.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[21].Begin(),Game.Message("\u0422\u0435\u0441\u043B\u0430 \u043C\u043E\u0436\u0435\u0442 \u043F\u0440\u0438\u0441\u043B\u0443\u0448\u0430\u0442\u044C\u0441\u044F \u043A \u0432\u0430\u043C \u0432 \u0431\u0443\u0434\u0443\u0449\u0435\u043C")}],background:"Persons/Nicola"}),Game.Scenes.TL[21]=new Scene({text:`
            - Я осознаю риск, спасибо, что беспокоишься. Когда в моей жизни все будет стабильно, клянусь, избавлюсь от этой привычки. 
            <p>“Слова настоящего игромана.”
            `,buttontext:["<a color=\"white\">\u0420\u0430\u0437\u0432\u0435 \u0442\u044B \u043D\u0435 \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043B \u0438\u0433\u0440\u0430\u0442\u044C?</a>","\u041D\u0438\u043A\u043E\u043B\u0430, \u0430 \u043A\u0430\u043A \u0436\u0435 \u0440\u0430\u0431\u043E\u0442\u0430?","\u0427\u0442\u043E \u044D\u0442\u043E \u0437\u0430 \u043A\u043B\u0443\u0431? ","\u041A\u0442\u043E-\u043D\u0438\u0431\u0443\u0434\u044C \u0441\u043E\u0441\u0442\u0430\u0432\u0438\u0442 \u0442\u0435\u0431\u0435 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044E?","\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433"],buttonaction:[()=>{Game.Scenes.TL[19].Begin(),Game.Scenes.TL[21].Deactivate(0),Game.Scenes.TL[23].Deactivate(0),Game.Scenes.TL[24].Deactivate(0),Game.Scenes.TL[26].Deactivate(0)},()=>{Game.Scenes.TL[22].Begin(),Game.Scenes.TL[21].Deactivate(1),Game.Scenes.TL[23].Deactivate(1),Game.Scenes.TL[24].Deactivate(1),Game.Scenes.TL[26].Deactivate(1)},()=>{Game.Scenes.TL[24].Deactivate(2),Game.Scenes.TL[24].Begin(),Game.Scenes.TL[21].Deactivate(2),Game.Scenes.TL[23].Deactivate(2),Game.Scenes.TL[26].Deactivate(2)},()=>{Game.Scenes.TL[25].Begin(),Game.Scenes.TL[21].Deactivate(3),Game.Scenes.TL[23].Deactivate(3),Game.Scenes.TL[24].Deactivate(3),Game.Scenes.TL[26].Deactivate(3)},()=>{Game.Scenes.TL[27].Begin()}],buttonactive:[!0,!0,!0,!0,!1],background:"Persons/Nicola",condition:function(){this.buttonactive[4]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2]||!1!=this.buttonactive[3])}}),Game.Scenes.TL[22]=new Scene({text:`
            - А что с ней может быть? Я работаю, как честный трудящийся, на заводе. Провожу исследования и пытаюсь предлагать свои наработки для улучшения нашей производительности.
            <p>- Так ведь этот досуг очень отвлекает… и, к тому же, сокращает деньги, - я не оставляла попыток достучаться до мужчины. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[23].Begin()}],background:"Persons/Nicola"}),Game.Scenes.TL[23]=new Scene({text:`
            Тесла усмехнулся и сказал: 
            <p>- Мой доход, как ты выразилась, сокращает мистер Томас Эдисон своими задержками. Сейчас я вижу только один источник заработка.
            `,buttontext:["<a color=\"white\">\u0420\u0430\u0437\u0432\u0435 \u0442\u044B \u043D\u0435 \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043B \u0438\u0433\u0440\u0430\u0442\u044C?</a>","\u041D\u0438\u043A\u043E\u043B\u0430, \u0430 \u043A\u0430\u043A \u0436\u0435 \u0440\u0430\u0431\u043E\u0442\u0430?","\u0427\u0442\u043E \u044D\u0442\u043E \u0437\u0430 \u043A\u043B\u0443\u0431? ","\u041A\u0442\u043E-\u043D\u0438\u0431\u0443\u0434\u044C \u0441\u043E\u0441\u0442\u0430\u0432\u0438\u0442 \u0442\u0435\u0431\u0435 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044E?","\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433"],buttonaction:[()=>{Game.Scenes.TL[19].Begin(),Game.Scenes.TL[21].Deactivate(0),Game.Scenes.TL[23].Deactivate(0),Game.Scenes.TL[24].Deactivate(0),Game.Scenes.TL[26].Deactivate(0)},()=>{Game.Scenes.TL[22].Begin(),Game.Scenes.TL[21].Deactivate(1),Game.Scenes.TL[23].Deactivate(1),Game.Scenes.TL[24].Deactivate(1),Game.Scenes.TL[26].Deactivate(1)},()=>{Game.Scenes.TL[24].Deactivate(2),Game.Scenes.TL[24].Begin(),Game.Scenes.TL[21].Deactivate(2),Game.Scenes.TL[23].Deactivate(2),Game.Scenes.TL[26].Deactivate(2)},()=>{Game.Scenes.TL[25].Begin(),Game.Scenes.TL[21].Deactivate(3),Game.Scenes.TL[23].Deactivate(3),Game.Scenes.TL[24].Deactivate(3),Game.Scenes.TL[26].Deactivate(3)},()=>{Game.Scenes.TL[27].Begin()}],buttonactive:[!0,!0,!0,!0,!1],background:"Persons/Nicola",condition:function(){this.buttonactive[4]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2]||!1!=this.buttonactive[3])}}),Game.Scenes.TL[24]=new Scene({text:`
            - В Гринвич-виллидж недавно открылся клуб для людей с достатком. Меня пригласили за мой скромный вклад в науку. 
            <p>- То есть ставки будут высоки? 
            <p>Никола нервно замотал головой. 
            <p>- Все, как обычно, нет нужды волноваться.
            `,buttontext:["<a color=\"white\">\u0420\u0430\u0437\u0432\u0435 \u0442\u044B \u043D\u0435 \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043B \u0438\u0433\u0440\u0430\u0442\u044C?</a>","\u041D\u0438\u043A\u043E\u043B\u0430, \u0430 \u043A\u0430\u043A \u0436\u0435 \u0440\u0430\u0431\u043E\u0442\u0430?","\u0427\u0442\u043E \u044D\u0442\u043E \u0437\u0430 \u043A\u043B\u0443\u0431? ","\u041A\u0442\u043E-\u043D\u0438\u0431\u0443\u0434\u044C \u0441\u043E\u0441\u0442\u0430\u0432\u0438\u0442 \u0442\u0435\u0431\u0435 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044E?","\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433"],buttonaction:[()=>{Game.Scenes.TL[19].Begin(),Game.Scenes.TL[21].Deactivate(0),Game.Scenes.TL[23].Deactivate(0),Game.Scenes.TL[24].Deactivate(0),Game.Scenes.TL[26].Deactivate(0)},()=>{Game.Scenes.TL[22].Begin(),Game.Scenes.TL[21].Deactivate(1),Game.Scenes.TL[23].Deactivate(1),Game.Scenes.TL[24].Deactivate(1),Game.Scenes.TL[26].Deactivate(1)},()=>{Game.Scenes.TL[24].Deactivate(2),Game.Scenes.TL[24].Begin(),Game.Scenes.TL[21].Deactivate(2),Game.Scenes.TL[23].Deactivate(2),Game.Scenes.TL[26].Deactivate(2)},()=>{Game.Scenes.TL[25].Begin(),Game.Scenes.TL[21].Deactivate(3),Game.Scenes.TL[23].Deactivate(3),Game.Scenes.TL[24].Deactivate(3),Game.Scenes.TL[26].Deactivate(3)},()=>{Game.Scenes.TL[27].Begin()}],buttonactive:[!0,!0,!0,!0,!1],background:"Persons/Nicola",condition:function(){this.buttonactive[4]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2]||!1!=this.buttonactive[3])}}),Game.Scenes.TL[25]=new Scene({text:`
            - Ты знаешь, что нет. В нашем окружении никто больше не промышляет таким видом деятельности. 
            Разве что Роберт иногда не прочь перекинуться в карты, но дальше этого он никогда не заходит. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[26].Begin()}],background:"Persons/Nicola"}),Game.Scenes.TL[26]=new Scene({text:`
            “Да кто такой этот Роберт? Судя по рассказам Теслы, это может быть один из друзей ученого. Как он связан с Катариной? Но не могу же я спросить напрямую.”
            `,buttontext:["<a color=\"white\">\u0420\u0430\u0437\u0432\u0435 \u0442\u044B \u043D\u0435 \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043B \u0438\u0433\u0440\u0430\u0442\u044C?</a>","\u041D\u0438\u043A\u043E\u043B\u0430, \u0430 \u043A\u0430\u043A \u0436\u0435 \u0440\u0430\u0431\u043E\u0442\u0430?","\u0427\u0442\u043E \u044D\u0442\u043E \u0437\u0430 \u043A\u043B\u0443\u0431? ","\u041A\u0442\u043E-\u043D\u0438\u0431\u0443\u0434\u044C \u0441\u043E\u0441\u0442\u0430\u0432\u0438\u0442 \u0442\u0435\u0431\u0435 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044E?","\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433"],buttonaction:[()=>{Game.Scenes.TL[19].Begin(),Game.Scenes.TL[21].Deactivate(0),Game.Scenes.TL[23].Deactivate(0),Game.Scenes.TL[24].Deactivate(0),Game.Scenes.TL[26].Deactivate(0)},()=>{Game.Scenes.TL[22].Begin(),Game.Scenes.TL[21].Deactivate(1),Game.Scenes.TL[23].Deactivate(1),Game.Scenes.TL[24].Deactivate(1),Game.Scenes.TL[26].Deactivate(1)},()=>{Game.Scenes.TL[24].Deactivate(2),Game.Scenes.TL[24].Begin(),Game.Scenes.TL[21].Deactivate(2),Game.Scenes.TL[23].Deactivate(2),Game.Scenes.TL[26].Deactivate(2)},()=>{Game.Scenes.TL[25].Begin(),Game.Scenes.TL[21].Deactivate(3),Game.Scenes.TL[23].Deactivate(3),Game.Scenes.TL[24].Deactivate(3),Game.Scenes.TL[26].Deactivate(3)},()=>{Game.Scenes.TL[27].Begin()}],buttonactive:[!0,!0,!0,!0,!1],background:"Persons/Nicola",condition:function(){this.buttonactive[4]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2]||!1!=this.buttonactive[3])}}),Game.Scenes.TL[27]=new Scene({text:`
            За непринужденной беседой, я и не заметила, как мы дошли до места назначения. Это было небольшое двухэтажное здание. Тесла галантно открыл мне дверь, пропуская  вперед. 
            <p>В нос сразу ударил забористый запах чего-то протухшего. К горлу невольно подступила тошнота, которую я попыталась подавить, зажмурив нос.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[28].Begin()}],background:""}),Game.Scenes.TL[28]=new Scene({text:`
            Видимо Тесла заметил это и проговорил: 
            <p>- Надо было все же наведаться к доктору…
            <p>- Ты разве не чувствуешь? 
            <p>Никола развел плечами и ответил:
            <p>- Здесь всегда чисто и ухоженно. Я слышу только аромат свежести, не более.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[29].Begin()}],background:"Persons/Nicola"}),Game.Scenes.TL[29]=new Scene({text:`
            Это было странно. Может, действительно из-за того, что я во сне, мои органы чувств работали с неполадками? Деваться было некуда, мы продолжили идти в квартиру к великому писателю. 
            <p>Поднявшись несколько пролетов по лестнице, Никола остановился перед дверью и постучал. Нам открыла милого вида пожилая женщина, приглашая зайти внутрь.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[30].Begin()}],background:""}),Game.Scenes.TL[30]=new Scene({text:`
            Я не рассматривала убранство квартиры. Все мое внимание было приковано к старушке, которая вела себя неестественным образом. Резкие движения, несвойственные для ее возраста, голова чуть наклонена вбок, изо рта проглядывались желто-черные зубы. 
            <p>Я взглянула в ее карие глаза. Вместо привычного блеска жизни, в них отражалась лишь тоска и ярость.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[31].Begin()}],background:"Backgrounds/Room_TL"}),Game.Scenes.TL[31]=new Scene({text:`
            В ту же секунду они загорелись алым цветом, на вид безобидная женщина полностью развернулась ко мне и стала выкручивать свои руки, снимать с себя плоть. 
            Ее кожа приобрела серый оттенок, а лицо исказила гримаса ужаса. Ее аккуратно уложенные седые волосы исчезли, оставляя лишь голую макушку.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[32].Begin(),Game.Achievements.FirstMonster.Unlock()}],background:"Persons/Monster",condition:()=>{Game.Sounds.Play("Music","Monster")}}),Game.Scenes.TL[32]=new Scene({text:`
            Я попятилась и уперлась в стену. Существо подошло ко мне и, взяв меня за руку, прошипело:
            <p>- Мы нашли тебя… И везде найдем. 
            <p>Мельком я увидела, как на запястье появилось черное пятно. 
            <p>Слишком много потрясений, мой мозг отказывался понимать происходящее. Отдаленно я слышала, как Никола что-то кричит, но мне не суждено было понять, что именно.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[0].Begin()}],background:"Persons/Monster"}),Game.Scenes.TL[33]=new Scene({text:`
            Я решительно взглянула в его голубые глаза, которые выглядели уставшими и чрезмерно озадаченными. 
            <p>- Это же все не может быть реальностью, - я нервно усмехнулась. - Ты не великий изобретатель, а я не какая-то там Катарина.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[34].Begin()}],background:"Persons/Nicola"}),Game.Scenes.TL[34]=new Scene({text:`
            Тесла немного смутился, но быстро взял себя в руки и проговорил: 
            <p>- Что ты такое говоришь? Может, у тебя солнечный удар? Ты меня не убедила, я настаиваю на докторе! 
            <p>- Я - $Имя Игрока$, - было забавно наблюдать за его реакцией. Он явно выглядел  растеряно. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[35].Begin(),Game.Message("\u0412\u044B \u0448\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043B\u0438 \u0422\u0435\u0441\u043B\u0443!"),Game.Achievements.ShockTesla.Unlock()}],background:"Persons/Nicola"}),Game.Scenes.TL[35]=new Scene({text:`
            - Что за имя такое… Катарина, ты репетируешь? Но ты вроде говорила, что больше не хочешь играть в спектаклях. 
            <p>“Если все не по настоящему, я же могу делать все, что захочу?”
            `,buttontext:["\u041E\u0431\u043D\u044F\u0442\u044C \u0422\u0435\u0441\u043B\u0443","\u041F\u043E\u0446\u0435\u043B\u043E\u0432\u0430\u0442\u044C \u0432 \u0449\u0435\u0447\u043A\u0443","\u0420\u0430\u0441\u0441\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u0440\u043E \u0431\u0443\u0434\u0443\u0449\u0435\u0435"],buttonaction:[()=>{Game.Scenes.TL[36].Begin()},()=>{Game.Scenes.TL[38].Begin()},()=>{Game.Scenes.TL[40].Begin()}],background:"Persons/Nicola"}),Game.Scenes.TL[36]=new Scene({text:`
            “Великий ученый стоит прямо передо мной, почему бы мне не взять и не обнять его?”
            <p>Я резко подступилась к Николе  и тепло обняла его. Крепко-крепко. Не ожидая от меня такого, он лишь стоял, словно статуя, не понимая, как реагировать на этот выпад. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[37].Begin(),Game.Message("\u0422\u0435\u0441\u043B\u0430 \u043F\u0440\u0438\u044F\u0442\u043D\u043E \u0443\u0434\u0438\u0432\u043B\u0435\u043D"),Game.Stats.Nicola.Add(1)}],background:"Persons/Nicola"}),Game.Scenes.TL[37]=new Scene({text:`
            - Катарина, - он был очень смущен, - что происходит? 
            <p>- Это же просто объятие, почему ты так удивился?
            <p>– Что скажет Роберт?
            
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[42].Begin()}],background:"Persons/Nicola"}),Game.Scenes.TL[38]=new Scene({text:`
            Великий ученый стоит прямо передо мной, почему бы мне не взять и не поцеловать его в щечку?”
            <p>Я резко подступилась к Николе  и чмокнула его в щеку. Не ожидая от меня такого, он лишь стоял, словно статуя, не понимая, как реагировать на этот выпад.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[39].Begin(),Game.Message("\u0422\u0435\u0441\u043B\u0430 \u043D\u0435 \u043E\u0446\u0435\u043D\u0438\u043B \u0432\u0430\u0448 \u043F\u043E\u0440\u044B\u0432"),Game.Stats.Nicola.Add(-1)}],background:"Persons/Nicola"}),Game.Scenes.TL[39]=new Scene({text:`
            - Катарина, - он был немного зол. - Что происходит? 
            <p>- Это же просто поцелуй, почему ты так удивился?
            <p>- Что скажет Роберт? 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[42].Begin()}],background:"Persons/Nicola"}),Game.Scenes.TL[40]=new Scene({text:`
            Мне захотелось посмотреть, что будет, когда Никола узнает о своих открытиях и своей значимости в современном мире. 
            <p>– В будущем ты станешь выдающимся учёным, который благодаря своим открытиям станет известен на весь мир!
            <p>– Катарина … 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[41].Begin(),Game.Message("\u0422\u0435\u0441\u043B\u0430 \u0434\u0443\u043C\u0430\u0435\u0442, \u0447\u0442\u043E \u0432\u044B \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0435 \u0435\u0433\u043E \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C"),Game.Stats.Nicola.Add(1)}],background:"Persons/Nicola"}),Game.Scenes.TL[41]=new Scene({text:`
            <p>– Я знал, что ты восхищаешься моим стремлением изменить мир, но к чему столько…
            <p>– Потому что это правда! - я перебила Николу. - Твоя "дуэль" с Эдисоном закончится победой. 
            <p>– Что скажет Роберт, услышав, как ты меня нахваливаешь…
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[42].Begin()}],background:"Persons/Nicola"}),Game.Scenes.TL[42]=new Scene({text:`
            Я не стала тянуть и ходить вокруг да около.
            <p>– Да кто такой этот Роберт?
            <p>На этот раз голос Николы звучал жёстче.
            <p>– Прекрати этот спектакль, не думаю, что твой муж оценит такую постановку. 
            
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[43].Begin()}],background:"Persons/Nicola"}),Game.Scenes.TL[43]=new Scene({text:`
            <p>Он взял меня за руку и потянул в сторону оживленной улицы. 
            <p>– Отложим визит к Редьярду Киплингу, идем сразу к доктору!
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[44].Begin()}],background:"Persons/Nicola"}),Game.Scenes.TL[44]=new Scene({text:`
            Насколько же это были реальные ощущения. Его касания оставляли небольшие вмятины на моих руках. Я была словно в тисках. 
            <p>Тесла двигался быстро, как будто бы опаздывал куда-то. Местами я пыталась с ним заговорить. Но он не оценил моей игры, поэтому не поведал ни о своей жизни, ни о его проблемах с Эдисоном. 
            <p>А я лишь про себя думала, насколько все это будет абсурдно, если окажется правдой. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[45].Begin()}],background:""}),Game.Scenes.TL[45]=new Scene({text:`
            Петляя по старым американским улочкам, Никола вскоре привел меня в больницу. Зайдя внутрь, в нос сразу ударил аромат лекарств и чего-то протухшего. 
            <p>Когда мы вошли в кабинет, Тесла обменялся любезностями с доктором и пожал ему руку. Тот выглядел как обычный доброжелательный мужчина, исправно выполняющий свою работу. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[46].Begin()}],background:"Backgrounds/Doctors_office"}),Game.Scenes.TL[46]=new Scene({text:`
            - Доктор, пожалуйста, у этой женщины случился солнечный удар! Осмотрите ее. 
            <p>Он кивнул. Подойдя ко мне, он грубо схватил меня за запястье и начал измерять пульс. 
            Его прикосновения были холодными и болезненными, а выражение лица выражало абсолютное спокойствие и сосредоточение. 
            <p>Я взглянула в его карие глаза. Вместо привычного блеска жизни, в них отражалась лишь тоска и ярость.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[47].Begin()}],background:"Backgrounds/Doctors_office"}),Game.Scenes.TL[47]=new Scene({text:`
            В ту же секунду они загорелись алым цветом, на вид обычный мужчина стал выкручивать свои руки, снимать с себя плоть. Его кожа посерела, а лицо исказила гримаса ужаса.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[48].Begin(),Game.Achievements.FirstMonster.Unlock()}],background:"Persons/Monster",condition:()=>{Game.Sounds.Play("Music","Monster")}}),Game.Scenes.TL[48]=new Scene({text:`
            Я попятилась и уперлась в стену. Существо подошло ко мне, взяло меня за руку и прошептало:
            <p>- Мы нашли тебя… И везде найдем. 
            <p>Мельком я увидела, как на запястье появилось черное пятно. 
            <p>Слишком много потрясений, мой мозг отказывался понимать происходящее. Отдаленно я слышала, как Никола что-то кричит, но мне не суждено было понять, что именно. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[0].Begin()}],background:"Persons/Monster"}),Game.Scenes.TL[49]=new Scene({text:`
            “Не может быть, я просто убегу, что-нибудь произойдет и получится проснуться!”
            <p>Рванув в сторону оживленной улицы, мне периодически приходилось оглядываться, оценивая удалось ли скрыться от растерянного Теслы. 
            Я лавировала между потоком, ища укрытие, которое избавило бы меня от назойливости Николы.
            `,buttontext:["\u0412 \u043F\u0435\u0440\u0435\u0443\u043B\u043E\u043A","\u041F\u0440\u044F\u043C\u043E \u043F\u043E \u0443\u043B\u0438\u0446\u0435"],buttonaction:[()=>{Game.Scenes.TL[50].Begin(),Game.Stats.StreetHide.Add(1)},()=>{Game.Scenes.TL[54].Begin(),Game.Stats.StreetStraight.Add(1)}],background:"Backgrounds/NY"}),Game.Scenes.TL[50]=new Scene({text:`
            “Это может быть мой шанс оторваться!”
            <p>Я завернула в ближайшую улочку и остановилась, чтобы перевести дыхание. Переулок был узкий и темный. 
            Я дотронулась до кирпичного здания, почувствовав холод - отпрянула, не веря, что так отчетливо могут передаваться ощущения во сне.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[51].Begin()}],background:"Backgrounds/Street"}),Game.Scenes.TL[51]=new Scene({text:`
            Все было настолько реалистично, что я на секунду допустила, что могу ошибаться в своих суждениях относительно происходящего. Мне стало не по себе, но я должна была собраться и бежать дальше.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[52].Begin()}],background:"Backgrounds/Street"}),Game.Scenes.TL[52]=new Scene({text:`
            Я вышла на параллельную улицу, дивясь новым красотам. Я шла по вымощенной дорожке словно призрак, не имея цели, и настолько погрузилась в себя, что не заметила, как на меня неслась карета. 
            <p>В последний момент чьи-то руки схватили меня, отталкивая в сторону. Это оказался Никола, который выглядел рассерженно и явно был уставшим.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[53].Begin()}],background:"Backgrounds/NY"}),Game.Scenes.TL[53]=new Scene({text:`
            - Катарина, да что с тобой?! Прекрати этот спектакль, возможно, ты получила солнечный удар или еще чего… Пойдем к доктору!
            <p>Он взял меня за руку и потянул в сторону оживленной улицы. 
            <p>– Отложим визит к Редьярду Киплингу, идем сразу в больницу!
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[44].Begin(),Game.Message("\u0422\u0435\u0441\u043B\u0430 \u043D\u0435\u0434\u043E\u0432\u043E\u043B\u0435\u043D \u0432\u0430\u0448\u0438\u043C \u043F\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u0435\u043C"),Game.Stats.Nicola.Add(-1)}],background:"Persons/Nicola"}),Game.Scenes.TL[54]=new Scene({text:`
            Порывы ветра развивали мои волосы, я бежала вперед, не обращая внимание на происходящее. Сейчас я наслаждалась мимолетным спокойствием. 
            <p>Вскоре я потеряла Теслу из виду. Мое внимание привлекла небольшая книжная лавка, около которой крутилось несколько детей. 
            Будучи одетыми не в самую чистую одежду, они протягивали свои маленькие ручонки прохожим, в надежде заполучить пару заветных монеток. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[55].Begin()}],background:"Backgrounds/Bookstore_TL"}),Game.Scenes.TL[55]=new Scene({text:`
            Увидев меня, они тут же подбежали и со всех сторон стали жалобно поглядывать, проговаривая:
            <p>- Тетя, дайте на хлеб, пожалуйста! 
            <p>Я растерялась. Осмотрев свои карманы, мне удалось найти деньги, которые я тут же протянула нуждающимся. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[56].Begin()}],background:"Backgrounds/Bookstore_TL"}),Game.Scenes.TL[56]=new Scene({text:`
            “Мелочь, но мне кажется я сделала доброе дело!”
            <p>Из лавки вышел недовольный работник. На вид радушный, пухленький мужчина средних лет грозно прогнал попрошаек. 
            <p>- Чертовы дети, отпугивают покупателей! - он резко перевел взгляд на меня, его губы растянулись в ехидную улыбку. - Мисс, вы хотели что-то приобрести?
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[57].Begin()}],background:"Backgrounds/Bookstore_TL"}),Game.Scenes.TL[57]=new Scene({text:`
            Мне стало не по себе от резкой перемены его настроения, поэтому я вежливо отказалась. 
            <p>- Ну, что вы… - мужчина легонько взял меня за плечи и подтолкнул в лавку. - У меня есть для вас эксклюзивное предложение!
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[150].Begin()}],background:"Backgrounds/Bookstore_TL"}),Game.Scenes.TL[150]=new Scene({text:`
            Мне все же пришлось заглянуть внутрь. Его настойчивость пугала, тем не менее, я решила не поддаваться паранойе и просто насладиться книгами. 
            <p>Но меня настигло разочарование. 
            <p>Вместо аромата новой литературы, в нос сразу ударил неприятный запах чего-то тухлого. Меня начало тошнить, но я старалась подавить эти порывы и сохранять спокойствие. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[58].Begin()}],background:"Backgrounds/Bookstore_Inside"}),Game.Scenes.TL[58]=new Scene({text:`
            - Все в порядке? - работник достал несколько книг с полок и протянул мне. 
            <p>- Да, просто тяжелый день. 
            <p>- Понимаю. Эти бесконечные забастовки, голодающие, невозможность себя реализовать. 
            <p>Я удивилась, услышав эти странные откровения. Видимо, человеку очень хотелось высказаться, да и я была не против больше узнать об этом времени. 
            <p>- Но у вас же есть стабильная работа и вы не выглядите как нуждающийся человек. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[59].Begin()}],background:"Backgrounds/Bookstore_Inside"}),Game.Scenes.TL[59]=new Scene({text:`
            - Думаете, так было всегда? Вам легко говорить: красивая женщина, которая всегда найдет себе достойную партию - вы не жили в хаосе и не знаете и половины о жизни в трущобах. 
            Но теперь все изменится, - мужчина становился все ближе ко мне. - Вот ты и попалась… 
            <p>Я начала инстинктивно отходить назад. Руки стали влажными, а моим разумом завладел страх. Страх за свою жизнь.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[60].Begin()}],background:"Backgrounds/Bookstore_Inside"}),Game.Scenes.TL[60]=new Scene({text:`
            Он начал преображаться. Его язык неестественно удлинился, прошелся по моей шее и щекам, оставляя сгустки слюней. Его кожа стала серой. Вместо привычных карих глаз на меня смотрели ярко-красные зрачки. Он начал сильно сжимать мою руку. Мельком я увидела, как на запястье стало проявляться черное пятно. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TL[160].Begin()}],background:"Persons/Monster",condition:()=>{Game.Sounds.Play("Music","Monster")}}),Game.Scenes.TL[160]=new Scene({text:`
            Слишком много потрясений, мой мозг отказывался понимать происходящее.  Отдаленно я слышала лишь хрипение этой твари, а затем уже привычная темнота накрыла меня.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[0].Begin(),Game.Achievements.FirstMonster.Unlock()}],background:"Persons/Monster",condition:()=>{}}),Game.Scenes.TC=[],Game.Scenes.TC[0]=new Scene({text:`
            Я открыла глаза и увидела знакомые мне стены студенческого медпункта. Я лежала на кушетке: тело ломило, голова гудела. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[1].Begin()}],background:"Backgrounds/Firstaid_post",condition:function(){Game.Stats.Scarlett.Add(0),Game.Sounds.Play("Music","FirstChapter"),this.buttonaction[0]=1<=Game.Stats.Scarlett.Get()?()=>{Game.Scenes.TC[1].Begin()}:()=>{Game.Scenes.TC[3].Begin()},Game.Message("\u041D\u0430\u0448\u0435 \u0432\u0440\u0435\u043C\u044F"),Game.Effects.Flash(),AndroidApp("showAd")}}),Game.Scenes.TC[1]=new Scene({text:`
            Увидев, что я очнулась, Скарлетт крепко обняла меня.
            <p>- Как же ты всех перепугала! Ты в порядке? 
            <p>- Да, - горло немного болело, поэтому я говорила шепотом. - Долго я была в отключке? 
            <p>- Где-то минут 40… 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[5].Begin(),Game.Message("\u0412\u044B \u0441\u043E \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442 \u0434\u0440\u0443\u0437\u044C\u044F, \u043E\u043D\u0430 \u0437\u0430 \u0432\u0430\u0441 \u043F\u0435\u0440\u0435\u0436\u0438\u0432\u0430\u043B\u0430")}],background:"Persons/Scarlett"}),Game.Scenes.TC[3]=new Scene({text:`
            Увидев, что я очнулась, к кровати подошла Скарлетт и спросила: 
            <p>- Как ты? Все хорошо?
            <p>- Да, - горло  болело, поэтому я говорила шепотом. - Долго я была в отключке? 
            <p>- Где-то минут 40… 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[5].Begin(),Game.Message("\u0412\u044B \u043D\u0435 \u043E\u0447\u0435\u043D\u044C \u0431\u043B\u0438\u0437\u043A\u0438 \u0441\u043E \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442, \u043D\u043E \u043E\u043D\u0430 \u0432\u0441\u0435 \u0440\u0430\u0432\u043D\u043E \u043F\u0435\u0440\u0435\u0436\u0438\u0432\u0430\u043B\u0430 \u0437\u0430 \u0442\u0435\u0431\u044F")}],background:"Persons/Scarlett"}),Game.Scenes.TC[5]=new Scene({text:`
            Я попыталась присесть, но слабость не позволяла мне двигаться в полной мере. 
            <p>Помимо Скарлетт в палате стояли еще двое. Профессор Нэйтан обеспокоенно смотрел на меня.
            Рядом с ним стоял мой одногруппник и брат профессора - Леон. Он выглядел хмуро и растерянно. Заметив, что я пришла в себя, парень подошел ко мне. 
            <p>-   $Имя Игрока$, любишь же ты устраивать выкрутасы… 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[6].Begin(),Game.Stats.Leon.Add(0)}],background:"Persons/Leon"}),Game.Scenes.TC[6]=new Scene({text:`
            В последнее время нам не выпадал шанс нормально пообщаться. К сожалению, у обстоятельств было свое мнение на этот счет. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[150].Begin()}],background:"Persons/Leon"}),Game.Scenes.TC[150]=new Scene({text:`
            Тем не менее Леон всегда был расположен ко мне: относился с теплотой и заботой. Иногда даже выступал в качестве героя, спасая из различных передряг.
            <p>Я сказала:
            `,buttontext:["\u041B\u0435\u043E\u043D, \u0447\u0442\u043E \u0442\u044B \u0442\u0443\u0442 \u0434\u0435\u043B\u0430\u0435\u0448\u044C?","\u041F\u0440\u043E\u0444\u0435\u0441\u0441\u043E\u0440, \u0437\u0430\u043D\u044F\u0442\u0438\u0435...","\u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442, \u0441\u043F\u0430\u0441\u0438\u0431\u043E, \u0447\u0442\u043E \u0442\u044B \u0440\u044F\u0434\u043E\u043C\u2026","\u041E\u0445, \u0447\u0442\u043E \u0436\u0435 \u044D\u0442\u043E \u0431\u044B\u043B\u043E\u2026"],buttonaction:[()=>{Game.Scenes.TC[7].Begin(),Game.Message("\u041B\u0435\u043E\u043D \u0432\u043E\u043B\u043D\u043E\u0432\u0430\u043B\u0441\u044F \u0437\u0430 \u0432\u0430\u0441"),Game.Stats.Leon.Add(1)},()=>{Game.Scenes.TC[8].Begin()},()=>{Game.Scenes.TC[9].Begin()},()=>{Game.Scenes.TC[10].Begin()}],background:"Persons/Leon"}),Game.Scenes.TC[7]=new Scene({text:`
            - Я успел поймать тебя перед самым падением. Повезло, что я такой ловкий!
            <p>- Спасибо тебе. Не знаю… Все произошло так резко…
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[11].Begin()}],background:"Persons/Leon"}),Game.Scenes.TC[8]=new Scene({text:`
            Нэйтан недовольно покачал головой. 
            <p>- Забудь, сейчас не об этом надо думать. Самое главное - ты пришла в себя и твоей жизни ничего не угрожает.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[11].Begin(),Game.Message("\u0412\u044B \u043F\u0440\u0438\u043B\u0435\u0436\u043D\u0430\u044F \u0438 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u0430\u044F \u0443\u0447\u0435\u043D\u0438\u0446\u0430"),Game.Stats.Neitan.Add(1)}],background:"Persons/Neitan"}),Game.Scenes.TC[9]=new Scene({text:`
            Девушка улыбнулась и проговорила: 
            <p>- Самое главное, что ты в порядке. Сейчас ни о чем другом переживать не надо. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[11].Begin(),Game.Message("\u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442 \u0440\u0430\u0434\u0430 \u043F\u043E\u043C\u043E\u0447\u044C"),Game.Stats.Scarlett.Add(1)}],background:"Persons/Scarlett"}),Game.Scenes.TC[10]=new Scene({text:`
            Присутствующие обеспокоенно переглянулись. Каждый смотрел на меня по-разному, но определено переживал. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[11].Begin()}],background:"Backgrounds/Firstaid_post"}),Game.Scenes.TC[11]=new Scene({text:`
            Профессор решил сказать: 
            <p>- Врач осмотрел тебя и заключил, что это переутомление, поэтому скорую вызывать не стали. 
            Но твое состояние оставляет желать лучшего, у тебя есть кто-нибудь, кто бы мог отвезти тебя домой? 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[12].Begin()}],background:"Persons/Neitan"}),Game.Scenes.TC[12]=new Scene({text:`
            Рядом с кушеткой стояла тумбочка, на которой лежал мой телефон. 
            Я несколько раз набрала номер отца, так как последнее время он был не так занят на работе как мама. Но ответом были только гудки. 
            <p>Мне предложил помощь:

            `,buttontext:["\u041F\u0440\u043E\u0444\u0435\u0441\u0441\u043E\u0440 \u041D\u044D\u0439\u0442\u0430\u043D","\u041B\u0435\u043E\u043D"],buttonaction:[()=>{Game.Scenes.TC[49].Begin(),Game.Stats.ComeWithLeon.Add(0)},()=>{Game.Scenes.TC[13].Begin(),Game.Stats.ComeWithLeon.Add(1)}],background:"Backgrounds/Firstaid_post"}),Game.Scenes.TC[13]=new Scene({text:`
            Леон вздохнул и проговорил: 
            <p>-  Дай мне десять минут, я провожу тебя домой. 
            <p>- Возьми мою машину, - Нэйтан передал ключи Леону. - У меня все равно на вечер были дела.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[14].Begin()}],background:""}),Game.Scenes.TC[14]=new Scene({text:`
            Я смущенно посмотрела на братьев и благодарно кивнула. Остальные покинули медпункт и у меня осталось немного времени, чтобы собраться. 
            Я медленно подошла к рюкзаку, проверяя все ли вещи на месте. Ключи и учебные принадлежности, документы - все было при мне.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[15].Begin()}],background:"Backgrounds/Firstaid_post"}),Game.Scenes.TC[15]=new Scene({text:`
            Я подошла к зеркалу, чтобы умыться и привести себя в порядок. Растрепанные волосы тут же уложились в маленький хвостик. 
            Я мыла руки, как вдруг заметила то самое черное пятно из своего сна. 
            <p>Я словно ошпаренная снова вернулась на кушетку.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[16].Begin()}],background:"Persons/Hero"}),Game.Scenes.TC[16]=new Scene({text:`
            “Так все-таки я действительно перенеслась во времени?! Тесла… Монстр. Что же это?” 
            <p>Я терла свою руку как могла: мылом, спиртом - но ему все было нипочем.
            <p>“Как же так…”
            <p>Тело покрылось мурашками от осознания того, что все произошедшее, действительно имело место быть. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[17].Begin()}],background:""}),Game.Scenes.TC[17]=new Scene({text:`
            Мое обеспокоенное лицо увидел Леон, который успел вернуться. 
            <p>-  $Имя Игрока$, совсем плохо? Давай поедем в больницу… 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[18].Begin()}],background:"Persons/Leon",condition:function(){0>=Game.Stats.Believe.Get()&&1<=Game.Stats.StreetStraight.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.TC[19].Begin()}),1<=Game.Stats.Believe.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.TC[19].Begin()}),0>=Game.Stats.Believe.Get()&&0>=Game.Stats.StreetStraight.Get()&&1<=Game.Stats.StreetHide.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.TC[18].Begin()}),0>=Game.Stats.Believe.Get()&&0>=Game.Stats.StreetStraight.Get()&&0>=Game.Stats.StreetHide.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.TC[18].Begin()})}}),Game.Scenes.TC[18]=new Scene({text:`
            При упоминании больницы, я невольно вспомнила то существо и меня передернуло. 
            <p>“Хватит с меня больниц!” 
            <p>- Все хорошо, просто отвези меня домой, пожалуйста. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[20].Begin()}],background:""}),Game.Scenes.TC[19]=new Scene({text:`
            Сейчас мне меньше всего хотелось ехать в больницу. После всех этих потрясений, нет ничего лучше горячего чая и теплого пледа дома. 
            <p>- Все хорошо, просто отвези меня домой, пожалуйста. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[20].Begin()}],background:""}),Game.Scenes.TC[20]=new Scene({text:`
            Леон помог мне подняться и:
            `,buttontext:["\u0414\u0430\u043B \u0440\u0443\u043A\u0443, \u0447\u0442\u043E\u0431\u044B \u043E\u043F\u0435\u0440\u0435\u0442\u044C\u0441\u044F","\u0428\u0435\u043B \u0440\u044F\u0434\u043E\u043C \u0438 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u043B"],buttonaction:[()=>{Game.Scenes.TC[21].Begin(),Game.Message("\u041B\u0435\u043E\u043D \u0440\u0430\u0434 \u0432\u0430\u043C \u043F\u043E\u043C\u043E\u0447\u044C"),Game.Stats.Leon.Add(1)},()=>{Game.Scenes.TC[24].Begin()}],background:"Persons/Leon",condition:function(){Game.Sounds.Play("Music","Leon")}}),Game.Scenes.TC[21]=new Scene({text:`
            Я схватилась за его руку, и мы двинулись по пустующим коридорам университета. Мне была приятна забота Леона, в равной степени, как и неожиданна. 
            <p>Раньше я часто проводила время в компании Скарлетт, Леона и еще нескольких друзей. Но когда у всех появилось больше дел - стало не до этого. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[22].Begin()}],background:""}),Game.Scenes.TC[22]=new Scene({text:`
            Леон был молчалив. Казалось, все его мысли были заняты чем-то другим. 
            Он обратил внимание на мое обеспокоенное лицо, нежно улыбнулся и несколько раз легонько постучал по моей макушке как бы говоря: “Все хорошо, не волнуйся!”

            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[23].Begin()}],background:"Persons/Leon"}),Game.Scenes.TC[23]=new Scene({text:`
            Его поддержка служила мне верной и крепкой опорой. Сердце невольно застучало, словно, я была героиней романа, которыми частенько увлекалась. 
            <p>Сегодня я почувствовала, что между нами снова нет никаких недомолвок и с ним так же легко, как в старые добрые времена.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[25].Begin()}],background:"Persons/Leon"}),Game.Scenes.TC[24]=new Scene({text:`
            Мы шли довольно близко к друг другу. 
            Леон был готов в любой момент поймать меня, если эпизод с потерей сознания повторится. Раньше я часто проводила время в компании Скарлетт, Леона и еще нескольких друзей. 
            Но когда у всех появилось больше дел - стало не до этого.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[25].Begin()}],background:"Persons/Leon"}),Game.Scenes.TC[25]=new Scene({text:`
            Мы дошли до машины профессора Нэйтана. Леон открыл мне дверь и мы сели внутрь. 
            <p>Он включил заводную рок композицию и достал пачку сигарет. 
            <p>– Будешь? 
            <p>В моей жизни присутствовало много зависимостей, и курение было одной из них. Я решила:
            `,buttontext:["\u041F\u043E\u043A\u0443\u0440\u0438\u0442\u044C","\u041D\u0435 \u0431\u0440\u0430\u0442\u044C \u0441\u0438\u0433\u0430\u0440\u0435\u0442\u0443"],buttonaction:[()=>{Game.Scenes.TC[26].Begin()},()=>{Game.Scenes.TC[28].Begin()}],background:"Backgrounds/Car"}),Game.Scenes.TC[26]=new Scene({text:`
            Кто как не Леон понимал меня. Ведь еще в начале нашей студенческой жизни, мы вместе решили побаловаться этой отравой. А далее, как и полагается, наступила зависимость.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[27].Begin()}],background:"Persons/Leon"}),Game.Scenes.TC[27]=new Scene({text:`
            Закурив довольно крепкие сигареты, я медленно выдохнула клуб дыма и по телу растеклось приятное тепло и спокойствие.
            <p>– Я думал, ты бросила, - сказал Леон, делая очередную затяжку. 
            <p>– Я тоже, - обреченно улыбнувшись сказала я. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[29].Begin()}],background:"Persons/Leon"}),Game.Scenes.TC[28]=new Scene({text:`
            Я тактично отказалась.
            <p>–  Рад, что ты в итоге отказалась от вредного убийцы. 
            <p>– Не сказала бы… Скорее боюсь, как бы мне не стало хуже.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[29].Begin()}],background:"Persons/Leon"}),Game.Scenes.TC[29]=new Scene({text:`
            Мы поехали. Стиль вождения Леона был довольно грубым, он не церемонился с зеваками и хорошо маневрировал среди потока машин. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[30].Begin()}],background:"Backgrounds/Car"}),Game.Scenes.TC[30]=new Scene({text:`
            Леон нарушил тишину.
            <p>– Что с тобой было? 
            <p>– Переутомление. В последнее время я много работаю и учеба… 
            <p>– Нужно же беречь себя. Когда это ты стала так стремиться к покорению вершин, - с лёгким задором в голосе сказал парень.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[31].Begin()}],background:"Persons/Leon"}),Game.Scenes.TC[31]=new Scene({text:`
            – Да, знаешь, просто в последнее время мне нужно было себя куда-то девать,- я отвела взгляд на пролетающие мимо нас пейзажи за окном.
            - В следующий раз непременно постараюсь так не усердствовать.
            <p>Мы давно не общались с Леоном. Я решила спросить у него:

            `,buttontext:["\u041A\u0430\u043A \u0442\u0432\u043E\u0438 \u0434\u0435\u043B\u0430?","\u041A\u0430\u043A \u0442\u0432\u043E\u0438 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u0441 \u041D\u044D\u0439\u0442\u0430\u043D\u043E\u043C?","\u0413\u0434\u0435-\u043D\u0438\u0431\u0443\u0434\u044C \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0448\u044C?","\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433"],buttonaction:[()=>{Game.Scenes.TC[32].Begin(),Game.Scenes.TC[33].Deactivate(0),Game.Scenes.TC[35].Deactivate(0),Game.Scenes.TC[38].Deactivate(0)},()=>{Game.Scenes.TC[34].Begin(),Game.Scenes.TC[33].Deactivate(1),Game.Scenes.TC[35].Deactivate(1),Game.Scenes.TC[38].Deactivate(1)},()=>{Game.Scenes.TC[36].Begin(),Game.Scenes.TC[33].Deactivate(2),Game.Scenes.TC[35].Deactivate(2),Game.Scenes.TC[38].Deactivate(2)},()=>{Game.Scenes.TC[39].Begin()}],buttonactive:[!0,!0,!0,!1],background:"Persons/Leon",condition:function(){Game.Scenes.TC[33].Activate(0),Game.Scenes.TC[35].Activate(0),Game.Scenes.TC[38].Activate(0),Game.Scenes.TC[33].Activate(1),Game.Scenes.TC[35].Activate(1),Game.Scenes.TC[38].Activate(1),Game.Scenes.TC[33].Activate(2),Game.Scenes.TC[35].Activate(2),Game.Scenes.TC[38].Activate(2),this.buttonactive[3]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2])}}),Game.Scenes.TC[32]=new Scene({text:`
            Леон усмехнулся и ответил:
            <p>– Спасибо, что интересуешься. Все в порядке, в последнее время тоже стараюсь больше заниматься и думать о будущем. Окончание универа не за горами.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[33].Begin()}],background:"Persons/Leon"}),Game.Scenes.TC[33]=new Scene({text:`
            В его словах чувствовалась сдержанность, но я привыкла, Леон всегда был таким. Не делился своими переживаниями больше, чем это необходимо для поддержания беседы и общего настроения.  
            <p>Однако он был прекрасным слушателем, который всегда понимал, как правильно поставить мозги на место, когда они явно не хотели трезво мыслить. 
            Благодаря этой черте, он был завсегдатаем во многих компаниях.
            `,buttontext:["\u041A\u0430\u043A \u0442\u0432\u043E\u0438 \u0434\u0435\u043B\u0430?","\u041A\u0430\u043A \u0442\u0432\u043E\u0438 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u0441 \u041D\u044D\u0439\u0442\u0430\u043D\u043E\u043C?","\u0413\u0434\u0435-\u043D\u0438\u0431\u0443\u0434\u044C \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0448\u044C?","\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433"],buttonaction:[()=>{Game.Scenes.TC[32].Begin(),Game.Scenes.TC[33].Deactivate(0),Game.Scenes.TC[35].Deactivate(0),Game.Scenes.TC[38].Deactivate(0)},()=>{Game.Scenes.TC[34].Begin(),Game.Scenes.TC[33].Deactivate(1),Game.Scenes.TC[35].Deactivate(1),Game.Scenes.TC[38].Deactivate(1)},()=>{Game.Scenes.TC[36].Begin(),Game.Scenes.TC[33].Deactivate(2),Game.Scenes.TC[35].Deactivate(2),Game.Scenes.TC[38].Deactivate(2)},()=>{Game.Scenes.TC[39].Begin()}],buttonactive:[!0,!0,!0,!1],condition:function(){this.buttonactive[3]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2])},background:""}),Game.Scenes.TC[34]=new Scene({text:`
            – Ничего не поменялось. Брат продолжает строить из себя взрослого и командовать.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[35].Begin()}],background:"Persons/Leon"}),Game.Scenes.TC[35]=new Scene({text:`
            Насколько я знала, их родители погибли довольно давно и Нэйтан взял ответственность за брата. 
            Когда мы общались, Леон рассказывал, что профессор частенько перебарщивал с этим. 
            Он не особо любил вдаваться в подробности их отношений, но было очевидно -  они любят друг друга, просто каждый по-своему.
            `,buttontext:["\u041A\u0430\u043A \u0442\u0432\u043E\u0438 \u0434\u0435\u043B\u0430?","\u041A\u0430\u043A \u0442\u0432\u043E\u0438 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u0441 \u041D\u044D\u0439\u0442\u0430\u043D\u043E\u043C?","\u0413\u0434\u0435-\u043D\u0438\u0431\u0443\u0434\u044C \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0448\u044C?","\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433"],buttonaction:[()=>{Game.Scenes.TC[32].Begin(),Game.Scenes.TC[33].Deactivate(0),Game.Scenes.TC[35].Deactivate(0),Game.Scenes.TC[38].Deactivate(0)},()=>{Game.Scenes.TC[34].Begin(),Game.Scenes.TC[33].Deactivate(1),Game.Scenes.TC[35].Deactivate(1),Game.Scenes.TC[38].Deactivate(1)},()=>{Game.Scenes.TC[36].Begin(),Game.Scenes.TC[33].Deactivate(2),Game.Scenes.TC[35].Deactivate(2),Game.Scenes.TC[38].Deactivate(2)},()=>{Game.Scenes.TC[39].Begin()}],buttonactive:[!0,!0,!0,!1],background:"Persons/Leon",condition:function(){this.buttonactive[3]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2])}}),Game.Scenes.TC[36]=new Scene({text:`
            – Нет, недавно уволился из одного магазинчика. 
            <p>– Ого, а какого? Может быть я даже заходила к вам.
            <p>– Все-то вам интересно, девушка, - не отрывая взгляд от дороги сказал Леон.
            <p>– Мы же столько не общались, конечно, я хочу знать, все ли у тебя в порядке. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[37].Begin()}],background:"Persons/Leon"}),Game.Scenes.TC[37]=new Scene({text:`
            – Лучше побеспокойся за себя, а то вон, каждый день будешь падать в обмороки, а мне потом спасай! 
            <p>Мне стало немного обидно от того, что он совсем не хотел делиться со мной хотя бы крохами своей повседневной жизни и неожиданно для себя я выпалила: 
            <p>- Вот и спасай! А может я специально падаю в обмороки, чтобы ты хоть иногда со мной разговаривал… Злодейский план у меня такой!
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[38].Begin()}],background:"Persons/Leon"}),Game.Scenes.TC[38]=new Scene({text:`
            Леон опешил от такого неожиданного признания и впервые прямо взглянул на меня:
            <p>- Твое здоровье важнее чем эти глупости, дурочка! 
            `,buttontext:["\u041A\u0430\u043A \u0442\u0432\u043E\u0438 \u0434\u0435\u043B\u0430?","\u041A\u0430\u043A \u0442\u0432\u043E\u0438 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u0441 \u041D\u044D\u0439\u0442\u0430\u043D\u043E\u043C?","\u0413\u0434\u0435-\u043D\u0438\u0431\u0443\u0434\u044C \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0448\u044C?","\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433"],buttonaction:[()=>{Game.Scenes.TC[32].Begin(),Game.Scenes.TC[33].Deactivate(0),Game.Scenes.TC[35].Deactivate(0),Game.Scenes.TC[38].Deactivate(0)},()=>{Game.Scenes.TC[34].Begin(),Game.Scenes.TC[33].Deactivate(1),Game.Scenes.TC[35].Deactivate(1),Game.Scenes.TC[38].Deactivate(1)},()=>{Game.Scenes.TC[36].Begin(),Game.Scenes.TC[33].Deactivate(2),Game.Scenes.TC[35].Deactivate(2),Game.Scenes.TC[38].Deactivate(2)},()=>{Game.Scenes.TC[39].Begin()}],buttonactive:[!0,!0,!0,!1],background:"Persons/Leon",condition:function(){this.buttonactive[3]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2])}}),Game.Scenes.TC[39]=new Scene({text:`
            Мы еще немного поговорили, пока он вез меня домой. Я снова увидела привычную зеленую лужайку, спокойную и умиротворенную обстановку. 
            <p>В соседнем доме горел свет. Значит Шерил уже вернулась. 
            И как бы в подтверждение моих мыслей, она резко выбежала из дома, с грохотом захлопнув входную дверь. Даже из окна машины я видела, что она была подавлена. 
            <p>“Почему она не на занятиях?”
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[40].Begin()}],background:""}),Game.Scenes.TC[40]=new Scene({text:`
            - Спасибо большое, Леон, я пойду.
            <p>- Давай я помогу тебе. 
            <p>- Не стоит, я и так тебя задержала. К тому же, там моя подруга, она мне поможет. 
            <p>- Хорошо. И мне было несложно. 
            <p>Он вышел из машины, открыл мне дверь, помогая подняться. Я еще раз поблагодарила Леона и немного пошатываясь направилась к Шерил. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[41].Begin()}],background:"Persons/Leon",condition:function(){this.buttonaction[0]=-1>=Game.Stats.Cheryl.Get()?()=>{Game.Scenes.TC[42].Begin()}:()=>{Game.Scenes.TC[41].Begin()}}}),Game.Scenes.TC[41]=new Scene({text:`
            Шерил была удивлена так же как я. Она была рада меня видеть. Девушка обеспокоенно посмотрела на меня и спросила:
            <p>– $Имя Игрока$, что случилось? 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[43].Begin()}],background:"Persons/Cheryl",condition:function(){Game.Sounds.Play("Music","Cheryl")}}),Game.Scenes.TC[42]=new Scene({text:`
            Шерил была удивлена так же как я. Она была не очень мне рада. Видимо из-за утренней переписки. Однако, на ее лице все равно отразилось беспокойство. 
            <p>– $Имя Игрока$, что случилось?
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[43].Begin()}],background:"Persons/Cheryl",condition:function(){Game.Sounds.Play("Music","Cheryl")}}),Game.Scenes.TC[43]=new Scene({text:`
            – Если я тебе расскажу, ты все равно не поверишь. 
            <p>– Я не думаю, что меня будет сложно удивить, учитывая, насколько насыщенно протекает моя жизнь, - она натянула рукав своей рубашки, чтобы скрыть синяки. 
            <p>Я вздохнула и решила перевести тему:
            <p>– Поможешь дойти до комнаты? Очень хочу наконец-то прилечь!
            <p>– Ты ещё спрашиваешь, идем, - я взяла ее под руку. - Кстати, а что это был за парень? 

            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[44].Begin()}],background:"Persons/Cheryl"}),Game.Scenes.TC[44]=new Scene({text:`
            - Да так, один неравнодушный… - я немного смутилась, но быстро взяла себя в руки. 
            <p>Через некоторое время я уже лежала на кровати, а на моей тумбочке стоял горячий чай. 
            <p>– Рассказывай! - Шерил расположилась рядом со мной. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[45].Begin()}],background:"Persons/Cheryl"}),Game.Scenes.TC[45]=new Scene({text:`
            Говорить правду было бессмысленно или нет? Это же Шерил, она одна из моих самых близких друзей. Но даже этот факт не поможет мне убедить человека поверить в мою невероятную историю.
            `,buttontext:["\u042F \u0440\u0430\u0441\u0441\u043A\u0430\u0437\u0430\u043B\u0430 \u043F\u0440\u0430\u0432\u0434\u0443","\u042F \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u043B\u0430 \u0441\u043A\u0440\u044B\u0442\u044C \u043F\u0440\u0430\u0432\u0434\u0443"],buttonaction:[()=>{Game.Scenes.TC[46].Begin(),Game.Stats.Cheryl.Add(1),Game.Achievements.TrustCheryl.Unlock()},()=>{Game.Scenes.TC[48].Begin()}],background:"Persons/Cheryl"}),Game.Scenes.TC[46]=new Scene({text:`
            В красочных деталях мною было описано путешествие в прошлое и встреча с Теслой. На лице Шерил я видела неподдельный интерес. Когда я закончила рассказ, подруга проговорила: 
            <p>- Это  потрясающе, никогда не думала, что история может быть таким интересным предметом. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[47].Begin(),Game.Message("\u0428\u0435\u0440\u0438\u043B \u0437\u0430\u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043E\u0432\u0430\u043B\u0430\u0441\u044C \u0438\u0441\u0442\u043E\u0440\u0438\u0435\u0439")}],background:""}),Game.Scenes.TC[47]=new Scene({text:`
            Я не удивилась, что Шерил не поверила мне. Но зато мне стало легче от того, что я смогла выговориться.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[70].Begin()}],background:"Persons/Cheryl"}),Game.Scenes.TC[48]=new Scene({text:`
            Я рассказа ту же байку про переутомление. Шерил почувствовала, что здесь что-то не так, ухмыльнулась,  и не стала продолжать разговор.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[70].Begin(),Game.Message("\u0428\u0435\u0440\u0438\u043B \u043E\u0449\u0443\u0449\u0430\u0435\u0442 \u0432\u0430\u0448\u0443 \u043D\u0435\u0438\u0441\u043A\u0440\u0435\u043D\u043D\u043E\u0441\u0442\u044C"),Game.Stats.Cheryl.Add(-1)}],background:"Persons/Cheryl"}),Game.Scenes.TC[49]=new Scene({text:`
            Нэйтан вздохнул и проговорил: 
            <p>-  Дай мне десять минут, я отвезу тебя домой. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[50].Begin()}],background:"Persons/Neitan"}),Game.Scenes.TC[50]=new Scene({text:`
            Я немного смущенно взглянула на него и благодарно кивнула. Остальные покинули медпункт и у меня осталось немного времени, чтобы собраться. 
            Я медленно подошла к рюкзаку, проверяя все ли вещи на месте. Ключи и учебные принадлежности, документы - все было при мне.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[51].Begin()}],background:"Backgrounds/Firstaid_post"}),Game.Scenes.TC[51]=new Scene({text:`
            Я подошла к зеркалу, чтобы умыться и привести себя в порядок. Растрепанные волосы тут же уложились в маленький хвостик. 
            Я мыла руки, как вдруг заметила то самое черное пятно из своего сна. 
            <p>Я словно ошпаренная снова вернулась на кушетку.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[52].Begin()}],background:"Persons/Hero"}),Game.Scenes.TC[52]=new Scene({text:`
            “Так все-таки я действительно перенеслась во времени?! Тесла… Монстр. Что же это?” 
            <p>Я терла свою руку как могла: мылом, спиртом - но ему все было нипочем.
            <p>“Как же так…”
            <p>Тело покрылось мурашками от осознания того, что все произошедшее, действительно имело место быть. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[53].Begin()}],background:""}),Game.Scenes.TC[53]=new Scene({text:`
            Мое обеспокоенное лицо увидел Нэйтан, который успел вернуться. 
            <p>-  $Имя Игрока$, совсем плохо? Давай поедем в больницу… 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[18].Begin()}],background:"Persons/Neitan",condition:function(){0>=Game.Stats.Believe.Get()&&1<=Game.Stats.StreetStraight.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.TC[55].Begin()}),1<=Game.Stats.Believe.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.TC[55].Begin()}),0>=Game.Stats.Believe.Get()&&0>=Game.Stats.StreetStraight.Get()&&1<=Game.Stats.StreetHide.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.TC[54].Begin()}),0>=Game.Stats.Believe.Get()&&0>=Game.Stats.StreetStraight.Get()&&0>=Game.Stats.StreetHide.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.TC[54].Begin()})}}),Game.Scenes.TC[54]=new Scene({text:`
            При упоминании больницы, я невольно вспомнила то существо и меня передернуло. 
            <p>“Хватит с меня больниц!” 
            <p>- Все хорошо, просто отвезите меня домой, пожалуйста. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[56].Begin()}],background:""}),Game.Scenes.TC[55]=new Scene({text:`
            Сейчас мне меньше всего хотелось ехать в больницу. После всех этих потрясений, нет ничего лучше горячего чая и теплого пледа дома. 
            <p>- Все хорошо, просто отвезите меня домой, пожалуйста. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[56].Begin()}],background:""}),Game.Scenes.TC[56]=new Scene({text:`
            Нэйтан кивнул. Он помог мне подняться и:
            `,buttontext:["\u041F\u0440\u0438\u043E\u0431\u043D\u0438\u043C\u0430\u044F \u0437\u0430 \u0442\u0430\u043B\u0438\u044E, \u043F\u043E\u043C\u043E\u0433 \u0434\u043E\u0439\u0442\u0438 \u0434\u043E \u043C\u0430\u0448\u0438\u043D\u044B ","\u041F\u0440\u0438\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044F \u0437\u0430 \u043B\u043E\u043A\u043E\u0442\u044C, \u043F\u043E\u043C\u043E\u0433 \u0434\u043E\u0439\u0442\u0438 \u0434\u043E \u043C\u0430\u0448\u0438\u043D\u044B "],buttonaction:[()=>{Game.Scenes.TC[57].Begin()},()=>{Game.Scenes.TC[60].Begin()}],background:"Persons/Neitan",condition:function(){Game.Sounds.Play("Music","Neitan")}}),Game.Scenes.TC[57]=new Scene({text:`
            Его поддержка помогала мне не упасть. Я чувствовала, как его руки крепко держали меня, направляя, не давая оступиться. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[58].Begin(),Game.Message("\u0412\u0430\u0448\u0435 \u0441\u0435\u0440\u0434\u0446\u0435 \u043F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u043B\u043E \u0443\u0434\u0430\u0440"),Game.Stats.Neitan.Add(1)}],background:""}),Game.Scenes.TC[58]=new Scene({text:`
            Коридоры университета пустовали, так как шли занятия, поэтому мы избежали ненужных слухов.
            <p>- Профессор, разве у вас нет больше пар сегодня? 
            <p>- Нет, сегодня на вечер у меня, видимо, другие дела, - Нэйтан хитро улыбнулся. 
            <p>Я смутилась, понимая, что это вряд ли относится ко мне, но сердце застучало быстрее. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[59].Begin()}],background:""}),Game.Scenes.TC[59]=new Scene({text:`
            <p>“Профессор помогает своей ученице в трудной ситуации. Казалось бы, ничего необычного…”
            <p>Однако невольно вспоминались самые разнообразные сцены из романтических фильмов на подобную тематику.
            <p>Я раскраснелась еще больше.
            <p>Нэйтан довел меня до своей машины и помог сесть на переднее сидение.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[61].Begin()}],background:""}),Game.Scenes.TC[60]=new Scene({text:`
            Нэйтан галантно держал меня под руку, не давая оступиться. Его поддержка была как никак кстати, учитывая, мою слабость. И я  была благодарна ему за это. 
            <p>Коридоры университета пустовали, так как шли занятия, поэтому мы избежали ненужных слухов. 
            <p>- Профессор, разве у вас нет больше пар сегодня? 
            <p>- Нет, сегодня у меня сокращенный день, - Нэйтан улыбнулся.
            <p>Повезло, что профессор оказался таким чутким. Он довел меня до своей машины и помог сесть на переднее сидение. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[61].Begin()}],background:""}),Game.Scenes.TC[61]=new Scene({text:`
            Я назвала ему свой адрес и он медленно тронулся, выезжая на дорогу. Заиграла тихая мелодия. Она была без слов и отсылала к мирному тихому настроению. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[62].Begin()}],background:"Backgrounds/Car"}),Game.Scenes.TC[62]=new Scene({text:`
            Тишину прервал Нэйтан, который решил спросить: 
            <p>- Чем же ты таким занимаешься, что теряешь сознание на моих парах? 
            <p>“Да так, всего лишь, видимо, путешествую во времени…”
            <p>- В последнее время много работаю. К тому же, я стараюсь поддерживать нормальный уровень успеваемости.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[63].Begin()}],background:"Persons/Neitan",condition:function(){this.buttonaction[0]=4<=Game.Stats.Study.Get()?()=>{Game.Scenes.TC[63].Begin()}:()=>{Game.Scenes.TC[65].Begin()}}}),Game.Scenes.TC[63]=new Scene({text:`
            Профессор удовлетворительно кивнул. 
            <p>- Ты и правда подтянула успеваемость, молодец! Я мельком ознакомился с твоим эссе по Николе Тесле. Там есть интересные мысли… Кстати, почему ты выбрала именно его среди множества великих ученых?
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[64].Begin()}],background:"Persons/Neitan"}),Game.Scenes.TC[64]=new Scene({text:`
            - Я знаю, что это может немного банально, но я хотела подсветить что-то новое. 
            Еще с раннего детства родители рассказывали о необычных деятелях и их открытиях. Но люди так редко делают акценты на самой личности, что в своей работе мне хотелось отразить его человечность.
            <p>- Похвально… - Нэйтан вдруг о чем-то задумался. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[67].Begin()}],background:"Persons/Neitan"}),Game.Scenes.TC[65]=new Scene({text:`
            Профессор недовольно покачал головой. 
            <p>Я понимаю, работа, но твои оценки оставляют желать лучшего. Я мельком ознакомился с цифровым вариантом твоего эссе по Николе Тесле. Тем не менее мне нужен бумажный оригинал, чтобы выставить оценку. Там есть несколько интересных мыслей, но в целом - слабовато. Кстати, почему ты выбрала именно его среди множества великих ученых?
            <p>Вспомнив сегодняшнее столкновение с Теслой, я задумалась. Неужели сама судьба решила подшутить надо мной? 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[66].Begin()}],background:"Persons/Neitan"}),Game.Scenes.TC[66]=new Scene({text:`
            - Я знаю, что это может немного банально, но я хотела подсветить что-то новое. 
            Еще с раннего детства родители рассказывали о необычных деятелях и их открытиях. Но люди так редко делают акценты на самой личности, что в своей работе мне хотелось отразить его человечность.
            <p>- Значит, тебе нужно было более тщательно изучить материал, - Нэйтан вдруг замолчал и о чем-то задумался.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[67].Begin()}],background:"Persons/Neitan"}),Game.Scenes.TC[67]=new Scene({text:`
            - Профессор, все в порядке? 
            <p>- Да, прости… - он словно вышел из транса и снова как ни в чем не бывало посмотрел на меня. - Погрузился в воспоминания о прошлом. 
            <p>- Встречали Теслу лично? - я рассмеялась. 
            <p>- Очень остроумно. Всего лишь прекрасные студенческие годы. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[68].Begin()}],background:"Persons/Neitan"}),Game.Scenes.TC[68]=new Scene({text:`
            Мы еще немного поговорили, пока он вез меня домой. Я снова увидела привычную зеленую лужайку, спокойную и умиротворенную обстановку. 
            <p>В соседнем доме горел свет. Значит Шерил уже вернулась. И как бы в подтверждение моих мыслей, она резко выбежала из дома, с грохотом захлопнув входную дверь. Даже из окна машины я видела, что она была подавлена. 
            <p>“Почему она не на занятиях?”
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[69].Begin()}],background:""}),Game.Scenes.TC[69]=new Scene({text:`
            - Спасибо большое, профессор, я пойду.
            <p>- Давай я помогу тебе. 
            <p>- Не стоит, я и так вас задержала. К тому же, там моя подруга, она мне поможет. 
            <p>- Хорошо. И мне было не сложно. 
            <p>Он вышел из машины, открыл мне дверь, помогая подняться. Я еще раз поблагодарила Нэйтана и немного пошатываясь направилась к Шерил. 

            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[41].Begin()}],background:"Persons/Neitan",condition:function(){this.buttonaction[0]=-1>=Game.Stats.Cheryl.Get()?()=>{Game.Scenes.TC[42].Begin()}:()=>{Game.Scenes.TC[41].Begin()}}}),Game.Scenes.TC[70]=new Scene({text:`
            Через час подруга ушла, так как ей нужно было успеть в магазин до возвращения отчима домой. Я осталась наедине со своими мыслями. Усталость от путешествия дала о себе знать, и я не заметила, как уснула. 
            <p>Ближе к вечеру меня разбудила мама, которая пришла с работы и решила узнать о моем самочувствии. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[160].Begin()}],background:"Backgrounds/Hero_Sleeps",condition:function(){Game.Sounds.Play("Music","FirstChapter")}}),Game.Scenes.TC[160]=new Scene({text:`
            - $Имя Игрока$, ты заболела? Что случилось? - голос мамы был уставшим, но беспокойным. Я знаю, что она много работает, но у нее всегда находится время, чтобы поговорить со мной.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[71].Begin()}],background:"Backgrounds/Hero_Sleeps"}),Game.Scenes.TC[71]=new Scene({text:`
            - Да, немного лихорадит, принесешь мне чай? Ужинать сегодня не буду. 
            <p>Она подошла и приложила губы к моему лбу. 
            <p>- Температуры вроде бы нет, но принесу градусник на всякий случай. 
            <p>Я закатила глаза, но кивнула. Мама всегда меня чрезмерно опекала. 
            <p>На удивление, у меня и правда оказалась небольшая температура. После этого мама дала мне лекарство, принесла напиток и спустилась вниз готовить ужин. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[72].Begin()}],background:"Backgrounds/Hero_Sleeps"}),Game.Scenes.TC[72]=new Scene({text:`
            Оставшись в одиночестве, я взглянула на метку и меня снова поразило осознание, что все было правдой. В голову пришла лишь одна мысль:
            <p>“Мне надо убедиться на 100%.”
            <p>Я дотянулась до телефона и начала гуглить про Катарину, Теслу и ту эпоху. Мне попалась монография одного историка, который анализировал мемуары Николы. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[73].Begin()}],background:"Backgrounds/Hero_Sleeps",condition:function(){1<=Game.Stats.Believe.Get()?this.buttonaction[0]=()=>{Game.Scenes.TC[73].Begin()}:(1<=Game.Stats.StreetHide.Get()||-1>=Game.Stats.Believe.Get())&&(this.buttonaction[0]=()=>{Game.Scenes.TC[74].Begin()},1<=Game.Stats.StreetStraight.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.TC[75].Begin()}))}}),Game.Scenes.TC[73]=new Scene({text:`
            В книге были описаны следующие мысли Теслы:
            <p><i>“Катарина вела себя немного странно. 
            Мы собирались навестить Киплинга, который заинтересовал меня своим творчеством, но Катарина выглядела озадаченной, словно впервые слышит об этой встрече, да и меня видит впервые. 
            После, мы немного пообщались о моем досуге и двинулись в сторону квартиры писателя. Нас встретила очаровательная пожилая дама и гостеприимно предложила войти в дом. 
            Но Катарина резко побледнела и потеряла сознание…”</i>
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[76].Begin()}],background:""}),Game.Scenes.TC[74]=new Scene({text:`
            В книге были описаны следующие мысли Теслы:
            <p><i>“Катарина вела себя немного странно. Словно для нее все это было спектаклем, а она играла в нем главную роль. 
            Я не знал, как на это реагировать. Вместо визита к Киплингу, я все же настоял на походе в больницу, искренне переживая за ее самочувствие. 
            Увидев врача, Катарина побледнела и потеряла сознание…”</i>
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[76].Begin()}],background:""}),Game.Scenes.TC[75]=new Scene({text:`
            В книге были описаны следующие мысли Теслы:
            <p>“Катарина вела себя немного странно. Она ни с того, ни с сего убежала от меня в неизвестном направлении. 
            Я изрядно попотел, чтобы отыскать ее. В конце концов в одной из книжных лавок я обнаружил ее без сознания…”
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[76].Begin()}],background:""}),Game.Scenes.TC[76]=new Scene({text:`
            Я заблокировала телефон и меня затрясло. Я окончательно поняла, что мои действия оказали влияние на настоящее. Это звучало абсурдно, но сам Тесла был моим проводником в моменты прошлого. 
            <p>В глубине души я все еще надеялась, что это лишь игра воображения. 
            Спать совсем не хотелось, но и засиживаться долго нельзя. Организму нужен отдых.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[77].Begin(),Game.Stats.Activities.Set(2),Game.Message("\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E 2 \u0432\u044B\u0431\u043E\u0440\u0430!")}],condition:function(){Game.Scenes.TC[77].Activate(0),Game.Scenes.TC[77].Activate(1),Game.Scenes.TC[77].Activate(2),Game.Scenes.TC[80].Activate(0),Game.Scenes.TC[80].Activate(1),Game.Scenes.TC[80].Activate(2),Game.Scenes.TC[80].Activate(3)}}),Game.Scenes.TC[77]=new Scene({text:`
             Перед сном я все-таки решила чем-нибудь заняться. 
            `,buttontext:["\u0421\u043F\u0443\u0441\u0442\u0438\u0442\u044C\u0441\u044F \u043A \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u044F\u043C","\u041F\u043E\u0437\u0430\u043D\u0438\u043C\u0430\u0442\u044C\u0441\u044F","\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043A\u043E\u043C\u0443-\u043D\u0438\u0431\u0443\u0434\u044C"],buttonaction:[()=>{Game.Scenes.TC[78].Begin(),Game.Stats.Activities.Add(-1),Game.Stats.Family.Add(1)},()=>{Game.Scenes.TC[79].Begin(),Game.Stats.Activities.Add(-1)},()=>{Game.Scenes.TC[80].Begin(),Game.Stats.Activities.Add(-1)}],buttonactive:[!0,!0,!0],background:"Backgrounds/Hero_Sleeps"}),Game.Scenes.TC[78]=new Scene({text:`
            Несмотря на свое самочувствие, я все же хотела провести время с родителями. 
            Тем более, что у них сейчас не все гладко в отношениях. Уверена - проведённое вместе время укрепит нашу семью.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[81].Begin()}],background:""}),Game.Scenes.TC[81]=new Scene({text:`
            Спустившись вниз я обнаружила, что мама моет посуду с довольно задумчивым видом, а папа сидит в кресле и с незаинтересованностью пялится в телевизор. 
            <p>Первым меня увидел отец, который подошел ко мне, спросил про самочувствие и усадил на диван. Мама закончила с посудой и присоединилась к нам. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[82].Begin()}],background:"Backgrounds/Kitchen"}),Game.Scenes.TC[82]=new Scene({text:`
            - Тебе лучше отдохнуть, - сказала мама. 
            <p>- Все в порядке. Просто мы давно не проводили время вместе. Мне этого очень не хватает… 
            <p>Отец грустно вздохнул и выдавил из себя улыбку:
            <p>- Чем бы тебе хотелось заняться?
            `,buttontext:["\u041F\u043E\u0438\u0433\u0440\u0430\u0442\u044C \u0432 \u043D\u0430\u0441\u0442\u043E\u043B\u043A\u0443","\u041F\u0440\u043E\u0441\u0442\u043E \u043F\u043E\u0433\u043E\u0432\u043E\u0440\u0438\u0442\u044C \u043E \u0436\u0438\u0437\u043D\u0438","\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0444\u0438\u043B\u044C\u043C"],buttonaction:[()=>{Game.Scenes.TC[83].Begin()},()=>{Game.Scenes.TC[84].Begin()},()=>{Game.Scenes.TC[86].Begin()}],background:"Backgrounds/Kitchen",condition:function(){Game.Scenes.TC[77].Deactivate(0)}}),Game.Scenes.TC[83]=new Scene({text:`
            Отец достал из шкафчика игру, где надо скупать улицы и сделать своих оппонентов банкротами. Мы прекрасно провели время, смеясь и веселясь. Я не видела на лицах своих родителей какой-то грусти. Напротив, они даже приобнимали друг друга, забыв на время о разногласиях. Думаю, в этот вечер мы вернулись в прошлое, когда вокруг все было идеально. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[101].Begin(),Game.Message("\u0412\u0430\u0448\u0430 \u0441\u0435\u043C\u044C\u044F \u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0441\u044F \u043A\u0440\u0435\u043F\u0447\u0435")}],background:"Backgrounds/Nonopoly"}),Game.Scenes.TC[84]=new Scene({text:`
            Мы несколько часов разговаривали о всяких мелочах в жизни. Мама с папой попивали вино и, казалось, были умиротворенными. 
            <p>Они с интересом слушали мой рассказ о сегодняшнем инциденте. Я упомянула Скарлетт. Мама тут же выдала идею о девчачьей посиделке, не забыв и про Шерил, к которой всегда тепло относилась. Она даже предложила вместе что-нибудь приготовить.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[101].Begin()}],background:"Backgrounds/Kitchen"}),Game.Scenes.TC[85]=new Scene({text:`
            Папа тоже воодушевился идеей и предложил пригласить Леона, дабы разбавить женский коллектив, ведь мы всегда хорошо ладили. Ну, а я была рада, что семья поддерживает меня и хочет быть ближе к моим друзьям. 
            <p>Беззаботно разговаривая, я почувствовала, что в этот вечер мы будто бы вернулись в прошлое, когда вокруг все было идеально. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[101].Begin(),Game.Message("\u0412\u0430\u0448\u0430 \u0441\u0435\u043C\u044C\u044F \u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0441\u044F \u043A\u0440\u0435\u043F\u0447\u0435")}],background:"Backgrounds/Kitchen"}),Game.Scenes.TC[86]=new Scene({text:`
            Мы выбрали классическую французскую комедию про двух, казалось бы, совершенно разных людей, которые через долгий и сложный путь смогли стать друзьями. Нам было хорошо и спокойно вместе. Мама с папой пили вино и были счастливы. Думаю, в этот вечер мы вернулись в прошлое, когда вокруг все было идеально. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[101].Begin(),Game.Message("\u0412\u0430\u0448\u0430 \u0441\u0435\u043C\u044C\u044F \u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0441\u044F \u043A\u0440\u0435\u043F\u0447\u0435")}],background:"Backgrounds/Film"}),Game.Scenes.TC[79]=new Scene({text:`
            Как бы мне не было лень, но я должна взять себя в руки и подтянуть учебу. 
            Тем более, что придется пропустить несколько дней. Я принялась выполнять домашнюю работу и читать лекции. Вечер получился продуктивным.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[101].Begin(),Game.Message("\u0412\u044B \u043F\u0440\u0438\u043B\u0435\u0436\u043D\u0430\u044F \u0443\u0447\u0435\u043D\u0438\u0446\u0430"),Game.Stats.Study.Add(1)}],background:"Backgrounds/Hero_Sleeps",condition:function(){Game.Scenes.TC[77].Deactivate(1)}}),Game.Scenes.TC[80]=new Scene({text:`
            Я осталась в комнате, села на своё кресло, включила любимую музыкальную группу и решила написать...
            `,buttontext:["\u041B\u0435\u043E\u043D\u0443","\u041D\u044D\u0439\u0442\u0430\u043D\u0443","\u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442","\u0428\u0435\u0440\u0438\u043B"],buttonaction:[()=>{Game.Scenes.TC[87].Begin(),Game.Scenes.TC[80].Deactivate(0)},()=>{Game.Scenes.TC[91].Begin(),Game.Scenes.TC[80].Deactivate(1)},()=>{Game.Scenes.TC[93].Begin(),Game.Scenes.TC[80].Deactivate(2)},()=>{Game.Scenes.TC[99].Begin(),Game.Scenes.TC[80].Deactivate(3)}],background:"Backgrounds/Hero_Sleeps",buttonactive:[!0,!0,!0,!0],condition:function(){1==Game.Stats.ComeWithLeon.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.TC[88].Begin(),Game.Scenes.TC[80].Deactivate(0)}),0==Game.Stats.ComeWithLeon.Get()&&(this.buttonaction[1]=()=>{Game.Scenes.TC[90].Begin(),Game.Scenes.TC[80].Deactivate(1)})}}),Game.Scenes.TC[87]=new Scene({text:`
            Я решила написать Леону. Увидев его сегодня, я вспомнила как мы классно зависали раньше и как я скучаю по тем беззаботным временам. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[89].Begin()}],background:"Backgrounds/Hero_Sleeps"}),Game.Scenes.TC[88]=new Scene({text:`
            Я решила написать Леону и еще раз поблагодарить его за помощь. Он ответил в ту же секунду стикером в виде собачки, которая показывает язык. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[89].Begin()}],background:"Backgrounds/Hero_Sleeps"}),Game.Scenes.TC[89]=new Scene({text:`
            Мы переписывались о всяком. Он упомянул, что хочет купить подержанный мотоцикл и в ближайшее время съехать от брата. Не забыли и вспомнить “молодость”. 
            Леон предложил как-нибудь встретиться и повторить вечер воспоминаний. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[101].Begin(),Game.Message("\u041B\u0435\u043E\u043D \u0440\u0430\u0434 \u0431\u044B\u043B \u043F\u043E\u0433\u043E\u0432\u043E\u0440\u0438\u0442\u044C \u0441 \u0432\u0430\u043C\u0438"),Game.Stats.Leon.Add(1)}],background:"Backgrounds/Hero_Sleeps"}),Game.Scenes.TC[90]=new Scene({text:`
            Я решила написать Нэйтану и еще раз поблагодарить его за помощь. Он ответил не сразу. В своем сообщении он интересовался моим самочувствием. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[92].Begin()}],background:"Backgrounds/Hero_Sleeps"}),Game.Scenes.TC[91]=new Scene({text:`
            Я решила написать Нэйтану. Он как и все беспокоился о моем состояние. Мне была приятна его чуткость. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[92].Begin()}],background:"Backgrounds/Hero_Sleeps"}),Game.Scenes.TC[92]=new Scene({text:`
            Мы переписывались об учебе по большей части. Нэйтан не упустил возможности еще раз напомнить, что мне стоит прикладывать больше усилий. 
            Он пожелал мне спокойной ночи,  велел отдыхать и заниматься из дома. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[101].Begin(),Game.Message("\u041D\u044D\u0439\u0442\u0430\u043D \u0440\u0430\u0434 \u0432\u0430\u0441 \u043D\u0430\u0441\u0442\u0430\u0432\u043B\u044F\u0442\u044C"),Game.Stats.Neitan.Add(1)}],background:"Backgrounds/Hero_Sleeps"}),Game.Scenes.TC[93]=new Scene({text:`
            Я решила созвониться со Скарлетт по видеосвязи. Мы давно не общались и, в какой-то степени, я скучала по нашим разговорам. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[94].Begin()}],background:"Persons/Scarlett",condition:function(){-1==Game.Stats.ScarlettSpeech.Get()&&(Game.Scenes.TC[93].buttonaction[0]=()=>{Game.Scenes.TC[95].Begin()})}}),Game.Scenes.TC[94]=new Scene({text:`
            Как моя подруга она всегда знала, какие слова нужно сказать, чтобы я чувствовала себя лучше. 
            Мне был необходим этот разговор обо всем, что вызывало тревогу последние дни, разумеется, опуская момент с перемещением. У нас выдался очень душевный вечер. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[101].Begin(),Game.Message("\u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442 \u0447\u0443\u0434\u0435\u0441\u043D\u043E \u043F\u0440\u043E\u0432\u0435\u043B\u0430 \u0432\u0440\u0435\u043C\u044F"),Game.Stats.Scarlett.Add(1)}],background:"Persons/Scarlett"}),Game.Scenes.TC[95]=new Scene({text:`
            Она поведала мне немного о своих проблемах с мамой. У них не сходились интересы. Родные девушки не могли представить свою дочь в роли историка.
            <p>- Ты представляешь, $Имя Игрока$, я заявила, что хочу работать в архивах, а она все снова про свой бизнес. Плевать ей на мои желания! 
            <p>- А отец? 
            <p>- Ушел рано, у него собеседование. 

            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[96].Begin()}],background:"Persons/Scarlett"}),Game.Scenes.TC[96]=new Scene({text:`
            - Есть шансы, что он устроится на работу? 
            <p>- Не знаю. Хоть папа и всегда меня поддерживал, но сейчас он больше походит на зомби, чем на человека. Мама в конец достала его пилить. 
            <p>Я была мало посвящена в семейные проблемы подруги. Скарлетт была довольно закрытым человеком. А может она просто боялась показаться уязвимой. Мне же…
            `,buttontext:["\u0411\u044B\u043B\u0438 \u043F\u043E\u043D\u044F\u0442\u043D\u044B \u0435\u0435 \u0447\u0443\u0432\u0441\u0442\u0432\u0430","\u0411\u044B\u043B\u043E \u0432\u0441\u0435 \u0440\u0430\u0432\u043D\u043E"],buttonaction:[()=>{Game.Scenes.TC[97].Begin(),Game.Message("\u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442 \u0434\u043E\u0440\u043E\u0436\u0438\u0442 \u0432\u0430\u0448\u0435\u0439 \u0434\u0440\u0443\u0436\u0431\u043E\u0439"),Game.Stats.Scarlett.Add(1)},()=>{Game.Scenes.TC[98].Begin(),Game.Message("\u0412\u044B \u0441\u043E \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442 \u043D\u0435 \u0442\u0430\u043A\u0438\u0435 \u0443\u0436 \u0438 \u0431\u043B\u0438\u0437\u043A\u0438\u0435 \u043F\u043E\u0434\u0440\u0443\u0433\u0438"),Game.Stats.Scarlett.Add(-1)}],background:"Persons/Scarlett"}),Game.Scenes.TC[97]=new Scene({text:`
            Семья - это важно, но каждый вправе жить  и делать выбор, опираясь на свои желания. Понемногу, но Скарлетт открывалась мне и я хотела быть на ее стороне.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[101].Begin()}],background:"Backgrounds/Hero_Sleeps"}),Game.Scenes.TC[98]=new Scene({text:`
            Каждый жил своей жизнью. Нужно было фокусироваться на своих проблемах, а не лезть в чужие. У Скарлетт была возможность не усложнять себе жизнь, она же выбрала иной путь.
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[101].Begin()}],background:"Backgrounds/Hero_Sleeps"}),Game.Scenes.TC[99]=new Scene({text:`
            Шерил довольно быстро ответила. Мы договорились немного поиграть в совместную компьютерную игру, где надо было исследовать мир за анимешных героев, открывать и прокачивать различных персонажей. 
            <p>Это было отличной идеей, мы обе погрузились в мир без насущных проблем, которых было много у каждой из нас, и отдохнули. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[101].Begin(),Game.Message("\u0428\u0435\u0440\u0438\u043B \u0432\u0441\u0435\u0433\u0434\u0430 \u0440\u0430\u0434\u0430 \u0432\u0430\u0448\u0435\u0439 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438"),Game.Stats.Cheryl.Add(1)}],background:"Backgrounds/Hero_Sleeps"}),Game.Scenes.TC[100]=new Scene({text:`
            Окончательно вымотавшись, я обессилено упала на кровать. Но выспаться мне сегодня было не суждено. 
            `,buttontext:[""],buttonaction:[()=>{setTimeout(()=>{Game.Scenes.PP[1].Begin()},1e3),Game.LoadScreen("PP"),Game.Progress.Save("PP")}],background:"Backgrounds/Hero_Sleeps"}),Game.Scenes.TC[101]=new Scene({text:`
            В любом случае мне было приятно провести так своё время!
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.TC[77].Begin()}],background:"Backgrounds/Hero_Sleeps",condition:function(){0>=Game.Stats.Activities.Get()&&(Game.Scenes.TC[101].buttonaction[0]=()=>{Game.Scenes.TC[100].Begin(),Game.Achievements.SecondPartCompleted.Unlock()})}}),Game.Scenes.PP=[],Game.Scenes.PP[1]=new Scene({text:`
            Открыв глаза, я снова увидела это таинственное пространство, что находилось вне законов нашего привычного мира. 
            <p>Мне еще предстояло выяснить, по какому условию я то и дело перемещаюсь в различные временные промежутки не по своему желанию. 
            <p>“Через сон? Воля проводника?”
            `,buttontext:[""],background:"Backgrounds/Abstraction_Hero",buttonaction:[()=>{Game.Scenes.PP[2].Begin()}],condition:()=>{Game.Sounds.Play("Music","Prologue"),Game.Effects.Flash()}}),Game.Scenes.PP[2]=new Scene({text:`
            Такое скорое возвращение сюда - удивляло. Казалось, что пока я не разберусь в эпохе Теслы, мои шансы еще раз обратиться к проводнику с вопросами -  крайне малы. 
            Однако я ошибалась и теперь, оказавшись здесь, я могу попытаться узнать хоть какую-то важную информацию.
            `,background:"Backgrounds/Abstraction_Hero",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[3].Begin()}]}),Game.Scenes.PP[3]=new Scene({text:`
            Оглядевшись, я поняла, что кроме меня здесь никого нет. Это место выглядело совсем безжизненно и пугало своими размерами. Было боязно от мысли, что я могу остаться здесь навсегда. 
            <p>“Нет… Глупости. Ему это не нужно, никому это не нужно. Здесь должна быть лазейка, мне лишь необходимо ее найти!”
            <p>Я:
            
            `,buttontext:["\u041F\u043E\u0448\u043B\u0430 \u043F\u0440\u044F\u043C\u043E","\u041F\u043E\u0432\u0435\u0440\u043D\u0443\u043B\u0430 \u043D\u0430\u043B\u0435\u0432\u043E","\u041F\u043E\u0432\u0435\u0440\u043D\u0443\u043B\u0430 \u043D\u0430\u043F\u0440\u0430\u0432\u043E"],background:"Backgrounds/Abstraction_Hero",buttonaction:[()=>{Game.Scenes.PP[4].Begin()},()=>{Game.Scenes.PP[5].Begin()},()=>{Game.Scenes.PP[7].Begin()}]}),Game.Scenes.PP[4]=new Scene({text:`
            <p>Самым простым решением мне виделось просто пойти вперед. Я шла по извилистым дорожкам, видя одни и те же парящие камни. 
            <p>“Я хожу по кругу?” 
            <p>И действительно, я вновь оказалась в самом начале своего пути. Пришлось снова выбирать маршрут. 
            `,buttontext:["\u041F\u043E\u0448\u043B\u0430 \u043F\u0440\u044F\u043C\u043E","\u041F\u043E\u0432\u0435\u0440\u043D\u0443\u043B\u0430 \u043D\u0430\u043B\u0435\u0432\u043E","\u041F\u043E\u0432\u0435\u0440\u043D\u0443\u043B\u0430 \u043D\u0430\u043F\u0440\u0430\u0432\u043E"],buttonaction:[()=>{Game.Scenes.PP[4].Begin()},()=>{Game.Scenes.PP[5].Begin()},()=>{Game.Scenes.PP[7].Begin()}]}),Game.Scenes.PP[5]=new Scene({text:`
            Я шла по каменным дорожкам довольно продолжительное время, пока не почувствовала легкий сладостный аромат, заставивший меня остановиться и внимательнее рассмотреть прекрасный пейзаж. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[6].Begin()}]}),Game.Scenes.PP[6]=new Scene({text:`
            Передо мной раскинулось поле, усеянное цветами. Это было необычайно красивое зрелище, которое вселяло в этот мир новые удивительные краски. 
            <p>Я прилегла на поляну и почувствовала, как десятки растений приятно щекочут кожу.  
            <p>Эта минутная передышка помогла мне расслабиться. Было так спокойно и легко, что мне хотелось остаться тут подольше. 
            <p>“Но время не ждет, нужно идти дальше.” 
            
            `,background:"Backgrounds/Flowerfield",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[10].Begin()}]}),Game.Scenes.PP[7]=new Scene({text:`
            Я шла по каменным дорожкам довольно продолжительное время, пока впереди не обнаружила еще одну развилку. 
            <p>Я:   
            `,buttontext:["\u041F\u043E\u0432\u0435\u0440\u043D\u0443\u043B\u0430 \u043D\u0430\u043B\u0435\u0432\u043E","\u041F\u043E\u0432\u0435\u0440\u043D\u0443\u043B\u0430 \u043D\u0430\u043F\u0440\u0430\u0432\u043E"],buttonaction:[()=>{Game.Scenes.PP[8].Begin()},()=>{Game.Scenes.PP[9].Begin()}]}),Game.Scenes.PP[8]=new Scene({text:`
            “Что за лабиринт…” 
            <p>Какое-то время спустя, мне удалось пройти дальше. На секунду я остановилась, чтобы переварить происходящее, но решила долго не задерживаться. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[10].Begin()}]}),Game.Scenes.PP[9]=new Scene({text:`
            Дорога привела меня к резкому обрыву, ознаменовавшему конец пути. Заглянув вниз, я увидела нечто похожее на водоворот. 
            С каждой секундой он будто бы затягивал меня, гипнотизировал, завлекая познакомиться ближе с бездной. 
            <p>Я быстро перевела взгляд на небо, но и оно было неспокойным, а сильные порывы ветра устрашали, пытались сбросить со скалы. Немедленно развернувшись, я убежала прочь. 
            
            `,background:"Backgrounds/Waterflow",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[7].Begin()}]}),Game.Scenes.PP[10]=new Scene({text:`
            Вскоре я нашла узенькую дорожку, которая пролегала между скал. Было немного тесновато, но на мое счастье путь занял немного времени. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[11].Begin()}]}),Game.Scenes.PP[11]=new Scene({text:`
            И снова бескрайние просторы предстали перед моим взором. Это было похоже на лабиринт, где нет выхода, а мои блуждания - это лишь попытка скоротать время. 
            <p>Кое-что все же изменилось. Я увидела дымку, которая напоминала портал в другое измерение. Подойдя ближе, мне удалось разглядеть нечеткие силуэты людей и зданий.
            `,background:"Backgrounds/Pompeii_Portal_Hero",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[12].Begin()}]}),Game.Scenes.PP[12]=new Scene({text:`
            “Что же там такое…”
            <p>Я потянулась к нему, чтобы понять, не привиделось ли мне все это. 
            <p>- Как там говорится? Любопытство - не порок? - знакомый голос заставил меня вздрогнуть и одернуть руку. 
            
            `,background:"Backgrounds/Pompeii_Portal_Hero",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[13].Begin()}]}),Game.Scenes.PP[13]=new Scene({text:`
            - Проводник, так ты все-таки здесь, - я была слишком зла на него, чтобы обмениваться любезностями, поэтому перешла сразу к сути.
            -  Что дальше? Ты показал отрывок из моего прошлого со странными событиями, и все эти люди… Слишком много информации. 
            <p>- Это только начало, дорогая моя, - снова ухмылка. 
            `,background:"Persons/Stranger",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[14].Begin()}]}),Game.Scenes.PP[14]=new Scene({text:`
            - Я не смогу покинуть это место, пока все не вспомню, так?
            <p>- Верно, - проводник начал ходить вокруг меня. - Я не тюремщик, не думай так обо мне. Ты волею судьбы была втянута в конфликт, длившийся веками. 
            <p>- Но что по итогу я должна буду сделать? 
            
            `,background:"Persons/Stranger",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[15].Begin()}]}),Game.Scenes.PP[15]=new Scene({text:`
            - Это сложно объяснить. В моих силах лишь помогать и направлять тебя. Остальное - в твоих руках. 
            <p>Все эти загадки сильно утомляли, но я не уловила в тоне его голоса издевку или безразличие. 
            Как будто его самого это не забавляло, а, напротив, волновало. Возможно ли что он тоже заложник ситуации, как и я или все это просто притворство?  
            <p>Я:
            
            `,background:"",buttontext:["\u041E\u0442\u043D\u043E\u0448\u0443\u0441\u044C \u0441 \u043F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u0435\u043C","\u0423\u0441\u0442\u0440\u043E\u044E \u0441\u0446\u0435\u043D\u0443"],buttonaction:[()=>{Game.Scenes.PP[16].Begin()},()=>{Game.Scenes.PP[18].Begin()}]}),Game.Scenes.PP[16]=new Scene({text:`
            “Нам не стоит ругаться сейчас. Он единственный, кто понимает, что здесь происходит. Я не хочу рушить свое и без того шаткое положение.” 
            <p>- Что ж, раз только в моих силах разобраться - принимаю этот вызов. Спасибо за помощь. Хоть какую-то, - проводник ничего мне не ответил. Краем глаза я заметила лишь его улыбку. 
            `,buttontext:[""],background:"Persons/Stranger",buttonaction:[()=>{Game.Scenes.PP[17].Begin()}]}),Game.Scenes.PP[17]=new Scene({text:`
            “Мне кажется, он рад, что я начинаю спокойнее воспринимать его “туманные” высказывания. Может, это шаг к взаимопониманию между нами?”  
            <p>Я решила продолжить нашу беседу и спросить: 
            `,buttontext:[""],background:"Persons/Stranger",buttonaction:[()=>{Game.Scenes.PP[20].Begin(),Game.Message("\u041E\u0431\u0449\u0435\u043D\u0438\u0435 \u0441 \u0432\u0430\u043C\u0438 \u043F\u0440\u0438\u044F\u0442\u043D\u043E \u043F\u0440\u043E\u0432\u043E\u0434\u043D\u0438\u043A\u0443"),Game.Stats.God.Add(1)}]}),Game.Scenes.PP[18]=new Scene({text:`
            “Мне плевать, я не игрушка, которой можно вертеть, как всем вздумается!”
            <p>- Я устала от твоих увиливаний. Скажи же мне конкретно, что здесь происходит и почему я должна все это переживать?            
            <p>Проводник недовольно вздохнул.    
            <p>- Я же говорил, у меня нет такого права. 
            `,background:"Persons/Stranger",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[19].Begin(),Game.Message("\u041E\u0431\u0449\u0435\u043D\u0438\u0435 \u0441 \u0432\u0430\u043C\u0438 \u043D\u0435\u043F\u0440\u0438\u044F\u0442\u043D\u043E \u043F\u0440\u043E\u0432\u043E\u0434\u043D\u0438\u043A\u0443"),Game.Stats.God.Add(-1)}]}),Game.Scenes.PP[19]=new Scene({text:`
            - Зато, я смотрю, у тебя есть право кидать меня куда попало без должной подготовки. Рисковать моей жизнью и нервами. 
            <p>- Я не ожидал, что ты поймешь мое положение.     
            <p>- А почему я вообще должна понимать тебя? Ты же ничего мне не объясняешь!
            <p>Немного успокоившись, я решила продолжить нашу беседу и спросить:
            `,background:"Persons/Stranger",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[20].Begin()}]}),Game.Scenes.PP[20]=new Scene({text:`
            - Этот портал - мой следующий этап? 
            <p>Проводник заметно переменился, подошел к парящей дымке и провел по ней рукой. 
            <p>- Рано, - коротко, без объяснений, так похоже на него. 
            <p>Он выдержал паузу, затем продолжил:
            <p>- Но раз ты здесь, то я должен показать тебе кое-что, - тон его голоса изменился, стал более отстраненным.

            `,background:"Backgrounds/Pompeii_Portal",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[21].Begin()}]}),Game.Scenes.PP[21]=new Scene({text:`
            Он протянул ко мне руку, как бы намекая, чтобы я подошла ближе. Когда мы соприкоснулись, мне впервые удалось почувствовать его теплоту. Длинные, немного шершавые пальцы аккуратно держали мою ладонь.
            <p>“Он не какой-то монстр, нет, он человек!” 
            `,background:"Backgrounds/Pompeii_Portal",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[22].Begin()}]}),Game.Scenes.PP[22]=new Scene({text:`
            Затем мужчина другой рукой дотронулся до моего лба. При всем его уверенном виде, всего на миг, мне удалось уловить легкую дрожь в этих прикосновениях. 
            <p>Закрыв глаза, я ощутила лёгкий импульс, а потом увидела совершенно другую обстановку. 
            `,background:"Backgrounds/Pompeii_Portal",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[23].Begin(),Game.Message("<em>\u041F\u043E\u043C\u043F\u0435\u0438 79 \u0433. \u043D.\u044D."),Game.Effects.Flash()}]}),Game.Scenes.PP[23]=new Scene({text:`
            Вид большой оживленной площади захлестнул меня новыми ощущениями. 
            Я огляделась вокруг и с нескрываемым удивлением смотрела на величественные колонны, подпирающие фасады зданий; людей, одетых в туники и явно куда-то спешивших. 
            <p>Никто из них не стоял на месте - все они были словно винтики в одном большом механизме городской жизни. 
            А я была лишь скромным зрителем, который стал невольным свидетелем совершенно новой эпохи. 
            `,background:"Backgrounds/Pompeii",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[24].Begin()}],condition:()=>{Game.Sounds.Play("Music","Crowd")}}),Game.Scenes.PP[24]=new Scene({text:`
            Несколько прохожих, которые несли длинную палку с висящими на ней кувшинами, уверенно направлялись в мою сторону. Я пыталась привлечь их внимание, но эти люди никак не реагировали. 
            <p>“Вот-вот они врежутся в меня.”
            <p>Я была готова уворачиваться, однако прохожие прошли сквозь меня.
            <p>“Что за…?”
            `,background:"Backgrounds/Pompeii",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[25].Begin()}]}),Game.Scenes.PP[25]=new Scene({text:`
            Все, что мне удалось почувствовать - это легкое покалывание по всему телу. 
            <p>Я попробовала прикоснуться к постаменту, на котором возвышалась статуя героя этой эпохи - тот же эффект. 
            <p>“Я словно призрак…”
            <p>Мое внимание привлекла девушка, заметно отличающаяся ото всех остальных горожан. 

            `,background:"Backgrounds/Pompeii",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[26].Begin(),Game.Sounds.Play("Music","Pompeii")}]}),Game.Scenes.PP[26]=new Scene({text:`
            Черные, как смоль волосы, бледная и чистая кожа. Изящная походка, движения были похожи на танец: плавные, грациозные и неторопливые. 
            Она целенаправленно двигалась к храму, игнорируя все препятствия на своем пути. 
            `,background:"Persons/Goddess",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[27].Begin(),Game.Message("\u042E\u043F\u0438\u0442\u0435\u0440 \u0432 \u0434\u0440\u0435\u0432\u043D\u0435\u0440\u0438\u043C\u0441\u043A\u043E\u0439 \u043C\u0438\u0444\u043E\u043B\u043E\u0433\u0438\u0438 - \u043E\u0442\u0435\u0446 \u0432\u0441\u0435\u0445 \u0431\u043E\u0433\u043E\u0432.")}]}),Game.Scenes.PP[27]=new Scene({text:`
            Вскоре она опустилась на колени и начала молиться, проговаривая: 
            <p>- Отец наш Юпитер, оберегай этот город и его жителей. Пусть твое милостивое правление озарит этих несчастных и защитит их в нужный момент!
            <p>“Она что, плачет? Что же происходит? Я должна наблюдать за ней?” 
            `,background:"Persons/Goddess",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[28].Begin()}]}),Game.Scenes.PP[28]=new Scene({text:`
            Через некоторое время небо заволокло тучами. Люди засуетились и стали искать укрытие. 
            Я единственная осталась стоять в центре площади за спиной у этой девушки. Она не шелохнулась и продолжала повторять шепотом заветные слова. 
            `,background:"Backgrounds/Pompeii",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[29].Begin()}]}),Game.Scenes.PP[29]=new Scene({text:`
            Пошел дождь. Неожиданно площадь окрасилась в кроваво-красные тона. Со всех сторон стали слышны крики, люди падали на колени, умоляя богов не гневаться. 
            <p>Среди всего этого хаоса, лишь одна фигура сохраняла спокойствие и хладнокровность. Белое одеяние таинственной незнакомки постепенно становилось алым, а на лице оставались красные капли. 
            Складывалось ощущение, будто бы из ее глаз лились кровавые слезы. 
            `,background:"Backgrounds/Bloody_Pompeii",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[30].Begin()}]}),Game.Scenes.PP[30]=new Scene({text:`
            В какой-то момент на площадь вышла фигура в черной мантии. Уверенным шагом незнакомец двигался к храму, где все еще сидела девушка и молилась. Он подошел к ней и аккуратно поднял ее, взяв под руки. Они спешно двинулись в толпу горожан и все, что я успела заметить прежде, чем они скрылись - как плавными и мягкими движениями мужчина  накрыл спутницу своей мантией. 
            `,background:"Backgrounds/Bloody_Pompeii",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[31].Begin(),Game.Effects.Flash()}]}),Game.Scenes.PP[31]=new Scene({text:`
            Вспышка и я снова оказалась лицом к лицу с проводником. То, что я видела было определенно древним периодом. Что спросить?
            `,background:"Persons/Stranger",buttonactive:[!0,!0,!0,!1],buttontext:["\u0427\u0442\u043E \u044D\u0442\u043E \u0437\u0430 \u044D\u043F\u043E\u0445\u0430?","\u041F\u043E\u0447\u0435\u043C\u0443 \u043F\u043E\u0448\u0451\u043B \u043A\u0440\u043E\u0432\u0430\u0432\u044B\u0439 \u0434\u043E\u0436\u0434\u044C?","\u041A\u0442\u043E \u044D\u0442\u0430 \u0434\u0435\u0432\u0443\u0448\u043A\u0430?","\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433"],buttonaction:[()=>{Game.Scenes.PP[32].Begin(),Game.Scenes.PP[33].Deactivate(0),Game.Scenes.PP[35].Deactivate(0),Game.Scenes.PP[37].Deactivate(0)},()=>{Game.Scenes.PP[34].Begin(),Game.Scenes.PP[33].Deactivate(1),Game.Scenes.PP[35].Deactivate(1),Game.Scenes.PP[37].Deactivate(1)},()=>{Game.Scenes.PP[36].Begin(),Game.Scenes.PP[33].Deactivate(2),Game.Scenes.PP[35].Deactivate(2),Game.Scenes.PP[37].Deactivate(2)},()=>{Game.Scenes.PP[38].Begin()}],condition:function(){Game.Scenes.PP[33].Activate(0),Game.Scenes.PP[35].Activate(0),Game.Scenes.PP[37].Activate(0),Game.Scenes.PP[33].Activate(1),Game.Scenes.PP[35].Activate(1),Game.Scenes.PP[37].Activate(1),Game.Scenes.PP[33].Activate(2),Game.Scenes.PP[35].Activate(2),Game.Scenes.PP[37].Activate(2),Game.Sounds.Play("Music","Prologue"),this.buttonactive[3]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2])}}),Game.Scenes.PP[32]=new Scene({text:`
            Мой собеседник вздохнул, а затем ответил: 
            <p>- Древний, некогда великий город - Помпеи. 
            <p>- Тот самый, который был уничтожен из-за извержения вулкана? 
            <p>- В точку. 
            <p>- Что же в этом времени особенного? Я не была там кем-то живым, скорее наоборот, как будто бы бестелесным существом… 
            `,background:"Persons/Stranger",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[33].Begin()}]}),Game.Scenes.PP[33]=new Scene({text:`
            - Так и должно было быть. Тебе не нужно ничего делать, только смотреть, ведь это место имеет ключевое значение во всей истории. 
            <p>- Но почему не рассказать мне все сразу? 
            <p>- Я связан по рукам и ногам… Все, что я могу - это помогать тебе маленькими шажками приближаться к истине. 
            `,background:"Persons/Stranger",buttonactive:[!0,!0,!0,!1],buttontext:["\u0427\u0442\u043E \u044D\u0442\u043E \u0437\u0430 \u044D\u043F\u043E\u0445\u0430?","\u041F\u043E\u0447\u0435\u043C\u0443 \u043F\u043E\u0448\u0451\u043B \u043A\u0440\u043E\u0432\u0430\u0432\u044B\u0439 \u0434\u043E\u0436\u0434\u044C?","\u041A\u0442\u043E \u044D\u0442\u0430 \u0434\u0435\u0432\u0443\u0448\u043A\u0430?","\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433"],buttonaction:[()=>{Game.Scenes.PP[32].Begin(),Game.Scenes.PP[33].Deactivate(0),Game.Scenes.PP[35].Deactivate(0),Game.Scenes.PP[37].Deactivate(0)},()=>{Game.Scenes.PP[34].Begin(),Game.Scenes.PP[33].Deactivate(1),Game.Scenes.PP[35].Deactivate(1),Game.Scenes.PP[37].Deactivate(1)},()=>{Game.Scenes.PP[36].Begin(),Game.Scenes.PP[33].Deactivate(2),Game.Scenes.PP[35].Deactivate(2),Game.Scenes.PP[37].Deactivate(2)},()=>{Game.Scenes.PP[38].Begin()}],condition:function(){this.buttonactive[3]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2])}}),Game.Scenes.PP[34]=new Scene({text:`
            - Это было первое из многих предзнаменований. И та девушка, как никто другой, чувствовала предстоящий коллапс.
            <p>- Все так запутано… Мне до сих пор не верится, что именно я стала участником этих событий.
            <p>Он улыбнулся. 
            `,background:"Persons/Stranger",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[35].Begin()}]}),Game.Scenes.PP[35]=new Scene({text:`
            - Случайности не случайны.
            <p>- И ты, разумеется, не скажешь почему? 
            <p>- Всему свое время. 
            `,background:"Persons/Stranger",buttonactive:[!0,!0,!0,!1],buttontext:["\u0427\u0442\u043E \u044D\u0442\u043E \u0437\u0430 \u044D\u043F\u043E\u0445\u0430?","\u041F\u043E\u0447\u0435\u043C\u0443 \u043F\u043E\u0448\u0451\u043B \u043A\u0440\u043E\u0432\u0430\u0432\u044B\u0439 \u0434\u043E\u0436\u0434\u044C?","\u041A\u0442\u043E \u044D\u0442\u0430 \u0434\u0435\u0432\u0443\u0448\u043A\u0430?","\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433"],buttonaction:[()=>{Game.Scenes.PP[32].Begin(),Game.Scenes.PP[33].Deactivate(0),Game.Scenes.PP[35].Deactivate(0),Game.Scenes.PP[37].Deactivate(0)},()=>{Game.Scenes.PP[34].Begin(),Game.Scenes.PP[33].Deactivate(1),Game.Scenes.PP[35].Deactivate(1),Game.Scenes.PP[37].Deactivate(1)},()=>{Game.Scenes.PP[36].Begin(),Game.Scenes.PP[33].Deactivate(2),Game.Scenes.PP[35].Deactivate(2),Game.Scenes.PP[37].Deactivate(2)},()=>{Game.Scenes.PP[38].Begin()}],condition:function(){this.buttonactive[3]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2])}}),Game.Scenes.PP[36]=new Scene({text:`
            Проводник стал еще отстраненнее. Из-за капюшона я могла лишь мельком догадываться о его эмоциях. 
            <p>- Эта богиня римского пантеона. 
            `,background:"Persons/Stranger",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[37].Begin(),Game.Message("\u041F\u0430\u043D\u0442\u0435\u043E\u043D - \u0433\u0440\u0443\u043F\u043F\u0430 \u0431\u043E\u0433\u043E\u0432, \u043F\u0440\u0438\u043D\u0430\u0434\u043B\u0435\u0436\u0430\u0449\u0438\u0445 \u043A \u043E\u0434\u043D\u043E\u0439 \u0440\u0435\u043B\u0438\u0433\u0438\u0438 \u0438\u043B\u0438 \u043C\u0438\u0444\u043E\u043B\u043E\u0433\u0438\u0438.")}]}),Game.Scenes.PP[37]=new Scene({text:`
            - Но что божество делало среди людей? 
            <p>- Я покажу тебе в следующий раз. 
            `,background:"Persons/Stranger",buttonactive:[!0,!0,!0,!1],buttontext:["\u0427\u0442\u043E \u044D\u0442\u043E \u0437\u0430 \u044D\u043F\u043E\u0445\u0430?","\u041F\u043E\u0447\u0435\u043C\u0443 \u043F\u043E\u0448\u0451\u043B \u043A\u0440\u043E\u0432\u0430\u0432\u044B\u0439 \u0434\u043E\u0436\u0434\u044C?","\u041A\u0442\u043E \u044D\u0442\u0430 \u0434\u0435\u0432\u0443\u0448\u043A\u0430?","\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433"],buttonaction:[()=>{Game.Scenes.PP[32].Begin(),Game.Scenes.PP[33].Deactivate(0),Game.Scenes.PP[35].Deactivate(0),Game.Scenes.PP[37].Deactivate(0)},()=>{Game.Scenes.PP[34].Begin(),Game.Scenes.PP[33].Deactivate(1),Game.Scenes.PP[35].Deactivate(1),Game.Scenes.PP[37].Deactivate(1)},()=>{Game.Scenes.PP[36].Begin(),Game.Scenes.PP[33].Deactivate(2),Game.Scenes.PP[35].Deactivate(2),Game.Scenes.PP[37].Deactivate(2)},()=>{Game.Scenes.PP[38].Begin()}],condition:function(){this.buttonactive[3]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2])}}),Game.Scenes.PP[38]=new Scene({text:`
            - Тебе пора возвращаться, $Имя Игрока$. 
            <p>- Как скоро мы увидимся вновь? 
            <p>- Это зависит от твоего продвижения и, - он немного помедлил, - от твоих выборов. 
            `,background:"Persons/Stranger",buttontext:[""],buttonaction:[()=>{Game.Scenes.PP[39].Begin()}]}),Game.Scenes.PP[39]=new Scene({text:`
            - Подожди, - я хотела узнать больше об эпохе Теслы. - Почему именно Никола? Что я должна сделать? И почему на меня нападают какие-то монстры? 
            <p>- В прошлом есть много твоих соратников. Они помогут тебе узнать правду и докопаться до истины. Но запомни одно. Есть и те, кто преследует исключительно свои цели. Будь осторожна с теми, кому хочешь довериться. 
            <p>Мужчина подошел ко мне, слегка прикоснулся к моему лбу и я увидела уже привычную мне темноту. 
            `,background:"Persons/Stranger",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[0].Begin(),Game.Effects.Flash()}]}),Game.Scenes.PN=[],Game.Scenes.PN[0]=new Scene({text:`
            Я чувствовала себя разбито и подавлено, поэтому проснулась уже после обеда. Несмотря на то, что прошло всего несколько дней с начала учебы, у меня было ощущение непомерной усталости.
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[1].Begin()}],condition:()=>{Game.Sounds.Play("Music","FirstChapter")}}),Game.Scenes.PN[1]=new Scene({text:`
            События развивались слишком стремительно и еще много всего предстояло понять. Раз уж выдалось свободное время, мне хотелось отдохнуть. С другой же стороны, появилась возможность немного поработать удаленно. Деньги никогда не будут лишними. 
            `,buttontext:["\u0417\u0430\u043D\u044F\u043B\u0430\u0441\u044C \u0441\u0432\u043E\u0438\u043C\u0438 \u0434\u0435\u043B\u0430\u043C\u0438","\u042F \u043D\u0430\u0447\u0430\u043B\u0430 \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C"],buttonaction:[()=>{Game.Scenes.PN[2].Begin()},()=>{Game.Scenes.PN[7].Begin(),Game.Message("\u0412\u044B \u0437\u0430\u0440\u0430\u0431\u043E\u0442\u0430\u043B\u0438 \u0434\u0435\u043D\u044C\u0433\u0438! (150)"),Game.Stats.Money.Add(150)}]}),Game.Scenes.PN[2]=new Scene({text:`
            Сегодня действительно был подходящий день, чтобы уделить время себе. Я лениво потянулась, сходила на кухню и взяла с собой в комнату несколько вкусняшек. И:
            `,background:"Backgrounds/Room",buttontext:["\u0417\u0430\u043D\u044F\u043B\u0430\u0441\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435\u043C","\u041F\u043E\u0438\u0433\u0440\u0430\u043B\u0430 \u0432 \u043B\u044E\u0431\u0438\u043C\u0443\u044E \u043D\u043E\u0432\u0435\u043B\u043B\u0443","\u041F\u043E\u0438\u0433\u0440\u0430\u043B\u0430 \u0432 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u043D\u0443\u044E \u0438\u0433\u0440\u0443","\u041F\u043E\u0447\u0438\u0442\u0430\u043B\u0430 \u043A\u043D\u0438\u0433\u0443"],buttonaction:[()=>{Game.Scenes.PN[3].Begin()},()=>{Game.Scenes.PN[4].Begin()},()=>{Game.Scenes.PN[5].Begin()},()=>{Game.Scenes.PN[6].Begin()}]}),Game.Scenes.PN[3]=new Scene({text:`
            Ничто так не успокаивало, как отдаться вдохновению и набросать что-нибудь карандашом в альбоме. Я не училась профессиональному рисованию, мне просто нравилось включать себе легкую музыку и воплощать на бумаге появляющиеся в голове образы. 
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[8].Begin()}]}),Game.Scenes.PN[4]=new Scene({text:`
            Удобно устроившись на кровати, я запустила мобильное приложение. История повествовала о древней Японии и отважной девушке - гейше, которая через сложные испытания, смогла найти свое место в мире и обрести любовь. 
            <p>Я получила удовольствие от игры и задумалась о своем положение. Моя спокойная жизнь меняется, я чувствую себя главной героиней, но только своей истории. Но так ли это все радужно? 
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[8].Begin()}]}),Game.Scenes.PN[5]=new Scene({text:`
            Я села за стол и включила компьютер. Мне хотелось отвлечься от всего и погрузиться в другой мир, как бы  иронично это не звучало. 
            <p>Сюжет игры повествовал об охотнике на чудовищ, который через политические войны, бесконечные поиски и множество опасностей - смог обрести свое заветное спокойствие. 
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[8].Begin()}]}),Game.Scenes.PN[6]=new Scene({text:`
            Я открыла начатую ранее книжку про постапокалипсис. Сюжет повествовал про отца и сына, которым приходится покинуть свой дом в поисках безопасного места. Во время путешествия они пытаются выжить в суровом новом мире. 
            <p>История наполнена философскими мыслями, а слог автора краток и история не забита лишней “водой”.
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[8].Begin()}]}),Game.Scenes.PN[7]=new Scene({text:`
            Несмотря на свое самочувствие, я все же решила пересилить себя и поработать. В конце концов мне надо было продолжать зарабатывать на самостоятельную жизнь. 
            <p>Я села за компьютер, открыла сайт для фрилансеров, которые выполняют школьные задания на заказ и написала несколько сочинений. 
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[8].Begin()}]}),Game.Scenes.PN[8]=new Scene({text:`
            Так прошло несколько дней. Мне становилось гораздо лучше. Никаких перемещений, никаких загадок от проводника. Обычные дни, по которым я, наверно, скучала. 
            <p>Но с другой стороны, во мне играло безмерное любопытство. Неужели я действительно смогу сделать что-то великое? А смогу ли? 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[10].Begin()}]}),Game.Scenes.PN[10]=new Scene({text:`
            Терзающие меня вопросы не давали крепко спать. В какой-то момент мне даже начало казаться, что стоит закрыть глаза и я исчезну. Затеряюсь в этих непонятных эпохах и никогда больше не увижу свою реальность. 
            <p>К счастью, все было тихо и спокойно. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[11].Begin()}]}),Game.Scenes.PN[11]=new Scene({text:`
            Ближе к вечеру родители сказали, что хотят сходить в кино и попросили меня беречь дом. Я не поняла к чему была сказана последняя фраза, но не придала этому большого значения. 
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[12].Begin()}]}),Game.Scenes.PN[12]=new Scene({text:`
            Когда мама с папой ушли, я решила помыть посуду. Мама, конечно, переживает за мое состояние, но я думаю, что уже достаточно окрепла для выполнения простых  домашних дел. 
            <p>Неожиданно раздался звонок в дверь.
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[13].Begin()}]}),Game.Scenes.PN[13]=new Scene({text:`
            “Наверное родители забыли что-то.”
            <p>Я открыла входную дверь и очень сильно удивилась. На пороге стояли Леон и Скарлетт с набитыми пакетами.        
            <p>- Ну, привет! - Леон обнял меня, похлопав по спине. - Как ты себя чувствуешь? Мы давно тебя не видели…     
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[14].Begin()}]}),Game.Scenes.PN[14]=new Scene({text:`
            - Вот-вот, - Скарлетт занесла несколько пакетов внутрь. - А если ты никуда не ходишь, значит, мы придем к тебе. 
            <p>- Ребята… - это искренне растрогало меня. Я так и стояла около двери, пока Леон не потянул меня за руки в сторону кухни. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[15].Begin()}]}),Game.Scenes.PN[15]=new Scene({text:`
            Затем он сказал:
            <p>- Тут немного алкоголя, - парень хитро улыбнулся, - а ты организуй нам что-нибудь поесть.  
            <p>- Как же хорошо, что завтра выходные, - Скарлетт плюхнулась на диван и открыла банку пива.  
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[16].Begin()}]}),Game.Scenes.PN[16]=new Scene({text:`
            Атмосфера была похожа на ту, что была раньше. Когда мы чаще проводили время вместе. Я очень оценила их поддержку и эту спонтанную встречу. 
            <p>Встречая ребят, я обратила внимание на дом Шерил, в ее комнате горел свет.            
            <p>“Интересно, как она там… Может стоит пригласить ее к нам?”.            
            <p>Я:     
            `,background:"Backgrounds/Kitchen",buttontext:["\u041F\u043E\u0437\u0432\u0430\u043B\u0430 \u0428\u0435\u0440\u0438\u043B","\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u043B\u0430 \u043E\u0431\u0449\u0430\u0442\u044C\u0441\u044F \u0441 \u0434\u0440\u0443\u0437\u044C\u044F\u043C\u0438"],buttonaction:[()=>{Game.Scenes.PN[17].Begin(),Game.Stats.InvitedCheryl.Add(1)},()=>{Game.Scenes.PN[19].Begin()}]}),Game.Scenes.PN[17]=new Scene({text:`
            Уверена, Шерил обрадуется такому развитию событий. Я обратилась к друзьям: 
            <p>- Вы не против, если я позову соседку, которая живет рядом?
            <p>- Ты про Шерил? Хоть мы и редко видимся с ней, но надеюсь наша вечеринка и ей поднимет настроение, - сказала Скарлетт, искренне улыбаясь. 
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[18].Begin()}]}),Game.Scenes.PN[18]=new Scene({text:`
            - Конечно не против, чем больше народу, тем веселее, - Леон доставал несколько бутылок из пакета. 
            <p>Я набрала Шерил и через несколько минут, она уже стояла с нами на кухне и светилась от счастья.        
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[20].Begin()}]}),Game.Scenes.PN[19]=new Scene({text:`
            Я решила не беспокоить Шерил. К тому же недавно она говорила, что хотела больше времени посвятить учебе и разгрести долги. 
            <p>Я смотрела на Леона, который в это время ставил несколько бутылок спиртного на стол, и Скарлетт, мило устроившуюся на диване, поджав ноги под себя. Мне хотелось сосредоточиться на вечере с ними и забыть обо всех проблемах. 
            `,buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[20].Begin()}]}),Game.Scenes.PN[20]=new Scene({text:`
            Я решила заняться вопросом еды. 
            <p>“Побаловать ребят чем-нибудь вкусненьким и заказать еду? Деньги вроде бы есть… Или ограничимся бутербродами?”            
            `,background:"Backgrounds/Kitchen",buttontext:["\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0440\u043E\u043B\u043B\u044B (200)","\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u0438\u0446\u0446\u0443 (150)","\u0421\u0434\u0435\u043B\u0430\u0442\u044C \u0431\u0443\u0442\u0435\u0440\u0431\u0440\u043E\u0434\u044B"],buttonaction:[()=>{Game.Scenes.PN[21].Begin(),Game.Stats.Money.Add(-200),Game.Message("\u0412\u044B \u043F\u043E\u0442\u0440\u0430\u0442\u0438\u043B\u0438 \u0434\u0435\u043D\u044C\u0433\u0438 (200)"),Game.Achievements.Sushi.Unlock()},()=>{Game.Scenes.PN[26].Begin(),Game.Stats.Money.Add(-150),Game.Message("\u0412\u044B \u043F\u043E\u0442\u0440\u0430\u0442\u0438\u043B\u0438 \u0434\u0435\u043D\u044C\u0433\u0438 (150)")},()=>{Game.Scenes.PN[31].Begin()}]}),Game.Scenes.PN[21]=new Scene({text:`
            Все же я давно не ела блюда азиатской кухни, поэтому заказала несколько наборов. 
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[23].Begin()}],condition:function(){1<=Game.Stats.InvitedCheryl.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.PN[22].Begin()})}}),Game.Scenes.PN[22]=new Scene({text:`
            Шерил сидела тихонько и смущалась. 
            Несмотря на царящее вокруг веселье, она довольно долго привыкала к людям. Конечно, ей и раньше приходилось видеть моих студенческих друзей, однако они особо не общались. 
            <p>Но все же она выглядела счастливой и сытой. В руке красовался бокал с коктейлем, а лицо выражало умиротворение и спокойствие.
            `,background:"Persons/Cheryl",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[24].Begin(),Game.Message("\u0412\u0430\u0448\u0438 \u0434\u0440\u0443\u0437\u044C\u044F \u043E\u0431\u0440\u0430\u0434\u043E\u0432\u0430\u043B\u0438\u0441\u044C \u0432\u043A\u0443\u0441\u043D\u043E\u0439 \u0435\u0434\u0435!"),Game.Stats.Leon.Add(1),Game.Stats.Scarlett.Add(1),Game.Stats.Cheryl.Add(1)}]}),Game.Scenes.PN[23]=new Scene({text:`
            Леон и Скарлетт одобрили мой выбор. Они с удовольствием накинулись на еду, попутно благодаря меня за такой прекрасный ужин.
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[24].Begin(),Game.Message("\u0412\u0430\u0448\u0438 \u0434\u0440\u0443\u0437\u044C\u044F \u043E\u0431\u0440\u0430\u0434\u043E\u0432\u0430\u043B\u0438\u0441\u044C \u0432\u043A\u0443\u0441\u043D\u043E\u0439 \u0435\u0434\u0435!"),Game.Stats.Leon.Add(1),Game.Stats.Scarlett.Add(1),Game.Stats.Cheryl.Add(1)}]}),Game.Scenes.PN[24]=new Scene({text:`
            Я попыталась взять ролл палочками, но мои попытки были тщетны. В отчаянии я потянулась за вилкой, но меня остановил Леон. 
            <p>- За 22 года ты до сих пор не научилась есть суши, неумеха? Давай покажу.            
            <p>Он подошел сзади и взял мои руки в свои. Аккуратно начал расставлять мои пальцы, чтобы я правильно держала палочки, попутно объясняя, что это целое искусство.           
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[25].Begin()}]}),Game.Scenes.PN[25]=new Scene({text:`
            Меня бросило в жар, когда я почувствовала его дыхание на своей шее. Тем не менее с его поддержкой, трясущимися руками, у меня получилось схватить ролл. 
            <p>- Рыцарь, как всегда, подоспел вовремя, да? - отшутилась я, чтобы скрыть смущение.            
            <p>Мы улыбнулись и продолжили вечеринку.            
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[35].Begin()}]}),Game.Scenes.PN[26]=new Scene({text:`
            Сейчас мне очень хотелось горячую пиццу с тянущимся сыром, колбасками... 
            <p>Ребята с удовольствием накинулись на угощения, между делом благодаря меня за прекрасный ужин.
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[27].Begin()}],condition:function(){1<=Game.Stats.InvitedCheryl.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.PN[28].Begin()})}}),Game.Scenes.PN[28]=new Scene({text:`
            Шерил сидела тихонько и смущалась. 
            Несмотря на царящее вокруг веселье, она довольно долго привыкала к людям. Конечно, ей и раньше приходилось видеть моих студенческих друзей, однако они особо не общались. 
            <p>Но все же она выглядела счастливой и сытой. В руке красовался бокал с коктейлем, а лицо выражало умиротворение и спокойствие.
            `,background:"Persons/Cheryl",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[29].Begin(),Game.Message("\u0412\u0430\u0448\u0438 \u0434\u0440\u0443\u0437\u044C\u044F \u043E\u0431\u0440\u0430\u0434\u043E\u0432\u0430\u043B\u0438\u0441\u044C \u0432\u043A\u0443\u0441\u043D\u043E\u0439 \u0435\u0434\u0435!"),Game.Stats.Leon.Add(1),Game.Stats.Scarlett.Add(1),Game.Stats.Cheryl.Add(1)}]}),Game.Scenes.PN[27]=new Scene({text:`
            Леон и Скарлетт одобрили мой выбор. Они с удовольствием накинулись на еду, попутно благодаря меня за такой прекрасный ужин.
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[29].Begin(),Game.Message("\u0412\u0430\u0448\u0438 \u0434\u0440\u0443\u0437\u044C\u044F \u043E\u0431\u0440\u0430\u0434\u043E\u0432\u0430\u043B\u0438\u0441\u044C \u0432\u043A\u0443\u0441\u043D\u043E\u0439 \u0435\u0434\u0435!"),Game.Stats.Leon.Add(1),Game.Stats.Scarlett.Add(1),Game.Stats.Cheryl.Add(1)}]}),Game.Scenes.PN[29]=new Scene({text:`
            Во время трапезы Скарлетт взяла нож и вилку, чтобы нарезать кусок пиццы. Леон не смог на это смотреть, отвернулся и проговорил: 
            <p>- Скарлетт, ты уничтожаешь во мне внутреннего итальянца… Кто ж так делает? 
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[30].Begin()}]}),Game.Scenes.PN[30]=new Scene({text:`
            - Какой из тебя итальянец, не смеши, - девушка демонстративно начала орудовать приборами. - Зато я не испачкаюсь, в отличии от некоторых. 
            <p>- $Имя Игрока$, сделай с этим что-нибудь!
            <p>Мне было очень весело наблюдать за ними. 
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[35].Begin()}]}),Game.Scenes.PN[31]=new Scene({text:`
            Я решила не тратить лишние деньги и сделала бутерброды из того, что нашла в холодильнике. 
            Все-таки лучше стараться экономить, где это возможно. Ребята были рады любой закуске, тем более, получалось у меня довольно неплохо. 
            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[34].Begin()}]}),Game.Scenes.PN[32]=new Scene({text:`
            Шерил сидела тихонько и смущалась. 
            Несмотря на царящее вокруг веселье, она довольно долго привыкала к людям. Конечно, ей и раньше приходилось видеть моих студенческих друзей, однако они особо не общались. 
            <p>Но все же она выглядела счастливой и сытой. В руке красовался бокал с коктейлем, а лицо выражало умиротворение и спокойствие.
            `,background:"Persons/Cheryl",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[34].Begin(),Game.Message("\u0412\u0430\u0448\u0438 \u0434\u0440\u0443\u0437\u044C\u044F \u043E\u0431\u0440\u0430\u0434\u043E\u0432\u0430\u043B\u0438\u0441\u044C \u0432\u043A\u0443\u0441\u043D\u043E\u0439 \u0435\u0434\u0435!"),Game.Stats.Leon.Add(1),Game.Stats.Scarlett.Add(1),Game.Stats.Cheryl.Add(1)}]}),Game.Scenes.PN[33]=new Scene({text:`
            Леон и Скарлетт одобрили мой выбор. Они с удовольствием накинулись на еду, попутно благодаря меня за такой прекрасный ужин.
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[34].Begin(),Game.Message("\u0412\u0430\u0448\u0438 \u0434\u0440\u0443\u0437\u044C\u044F \u043E\u0431\u0440\u0430\u0434\u043E\u0432\u0430\u043B\u0438\u0441\u044C \u0432\u043A\u0443\u0441\u043D\u043E\u0439 \u0435\u0434\u0435!"),Game.Stats.Leon.Add(1),Game.Stats.Scarlett.Add(1),Game.Stats.Cheryl.Add(1)}]}),Game.Scenes.PN[34]=new Scene({text:`
            Леон и Скарлетт попросили меня достать что-нибудь сладенькое к нашему небольшому пиршеству. На наше счастье, у меня было припасено шоколадное печенье. Я принесла закуску и мы продолжили общаться.
            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[35].Begin()}],condition:function(){this.text=1<=Game.Stats.InvitedCheryl.Get()?"\u041B\u0435\u043E\u043D \u0438 \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442 \u043F\u043E\u043F\u0440\u043E\u0441\u0438\u043B\u0438 \u043C\u0435\u043D\u044F \u0434\u043E\u0441\u0442\u0430\u0442\u044C \u0447\u0442\u043E-\u043D\u0438\u0431\u0443\u0434\u044C \u0441\u043B\u0430\u0434\u0435\u043D\u044C\u043A\u043E\u0435 \u043A \u043D\u0430\u0448\u0435\u043C\u0443 \u043D\u0435\u0431\u043E\u043B\u044C\u0448\u043E\u043C\u0443 \u043F\u0438\u0440\u0448\u0435\u0441\u0442\u0432\u0443. \u041D\u0430 \u043D\u0430\u0448\u0435 \u0441\u0447\u0430\u0441\u0442\u044C\u0435, \u0443 \u043C\u0435\u043D\u044F \u0431\u044B\u043B\u043E \u043F\u0440\u0438\u043F\u0430\u0441\u0435\u043D\u043E \u0448\u043E\u043A\u043E\u043B\u0430\u0434\u043D\u043E\u0435 \u043F\u0435\u0447\u0435\u043D\u044C\u0435. \u042F \u043F\u0440\u0438\u043D\u0435\u0441\u043B\u0430 \u0437\u0430\u043A\u0443\u0441\u043A\u0443 \u0438 \u043C\u044B \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u043B\u0438 \u043E\u0431\u0449\u0430\u0442\u044C\u0441\u044F.<p>\u0428\u0435\u0440\u0438\u043B \u0441\u0438\u0434\u0435\u043B\u0430 \u0442\u0438\u0445\u043E\u043D\u044C\u043A\u043E \u0438 \u0441\u043C\u0443\u0449\u0430\u043B\u0430\u0441\u044C. \u041D\u0435\u0441\u043C\u043E\u0442\u0440\u044F \u043D\u0430 \u0446\u0430\u0440\u044F\u0449\u0435\u0435 \u0432\u043E\u043A\u0440\u0443\u0433 \u0432\u0435\u0441\u0435\u043B\u044C\u0435, \u043E\u043D\u0430 \u0434\u043E\u0432\u043E\u043B\u044C\u043D\u043E \u0434\u043E\u043B\u0433\u043E \u043F\u0440\u0438\u0432\u044B\u043A\u0430\u043B\u0430 \u043A \u043B\u044E\u0434\u044F\u043C. \u041A\u043E\u043D\u0435\u0447\u043D\u043E, \u0435\u0439 \u0438 \u0440\u0430\u043D\u044C\u0448\u0435 \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u043B\u043E\u0441\u044C \u0432\u0438\u0434\u0435\u0442\u044C \u043C\u043E\u0438\u0445 \u0441\u0442\u0443\u0434\u0435\u043D\u0447\u0435\u0441\u043A\u0438\u0445 \u0434\u0440\u0443\u0437\u0435\u0439, \u043E\u0434\u043D\u0430\u043A\u043E \u043E\u043D\u0438 \u043E\u0441\u043E\u0431\u043E \u043D\u0435 \u043E\u0431\u0449\u0430\u043B\u0438\u0441\u044C. <p> \u041D\u043E \u0432\u0441\u0435 \u0436\u0435 \u043E\u043D\u0430 \u0432\u044B\u0433\u043B\u044F\u0434\u0435\u043B\u0430 \u0441\u0447\u0430\u0441\u0442\u043B\u0438\u0432\u043E\u0439 \u0438 \u0441\u044B\u0442\u043E\u0439. \u0412 \u0440\u0443\u043A\u0435 \u043A\u0440\u0430\u0441\u043E\u0432\u0430\u043B\u0441\u044F \u0431\u043E\u043A\u0430\u043B \u0441 \u043A\u043E\u043A\u0442\u0435\u0439\u043B\u0435\u043C, \u0430 \u043B\u0438\u0446\u043E \u0432\u044B\u0440\u0430\u0436\u0430\u043B\u043E \u0443\u043C\u0438\u0440\u043E\u0442\u0432\u043E\u0440\u0435\u043D\u0438\u0435 \u0438 \u0441\u043F\u043E\u043A\u043E\u0439\u0441\u0442\u0432\u0438\u0435.":"\u041B\u0435\u043E\u043D \u0438 \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442 \u043F\u043E\u043F\u0440\u043E\u0441\u0438\u043B\u0438 \u043C\u0435\u043D\u044F \u0434\u043E\u0441\u0442\u0430\u0442\u044C \u0447\u0442\u043E-\u043D\u0438\u0431\u0443\u0434\u044C \u0441\u043B\u0430\u0434\u0435\u043D\u044C\u043A\u043E\u0435 \u043A \u043D\u0430\u0448\u0435\u043C\u0443 \u043D\u0435\u0431\u043E\u043B\u044C\u0448\u043E\u043C\u0443 \u043F\u0438\u0440\u0448\u0435\u0441\u0442\u0432\u0443. \u041D\u0430 \u043D\u0430\u0448\u0435 \u0441\u0447\u0430\u0441\u0442\u044C\u0435, \u0443 \u043C\u0435\u043D\u044F \u0431\u044B\u043B\u043E \u043F\u0440\u0438\u043F\u0430\u0441\u0435\u043D\u043E \u0448\u043E\u043A\u043E\u043B\u0430\u0434\u043D\u043E\u0435 \u043F\u0435\u0447\u0435\u043D\u044C\u0435. \u042F \u043F\u0440\u0438\u043D\u0435\u0441\u043B\u0430 \u0437\u0430\u043A\u0443\u0441\u043A\u0443 \u0438 \u043C\u044B \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u043B\u0438 \u043E\u0431\u0449\u0430\u0442\u044C\u0441\u044F."}}),Game.Scenes.PN[35]=new Scene({text:`
            - Спасибо вам огромное за то, что пришли меня поддержать! Жаль у нас не так много времени… Хотя после того, как вернутся родители, мы могли бы пойти в какой-нибудь бар или еще чего. 
            <p>- Совсем забыли тебе сказать, - проговорила Скарлетт. - Мы попросили твоего отца придумать какую-нибудь байку, чтобы устроить тебе сюрприз. Поэтому они сегодня не вернутся и вся ночь наша!
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[36].Begin()}]}),Game.Scenes.PN[36]=new Scene({text:`
            - Да вы сумасшедшие! - я не смогла сдержать эмоций и тепло обняла каждого в этой комнате. 
            <p>- Так, что, - Леон поставил несколько бутылок крепкого на стол. - Разгон кончился, пора начать настоящую движуху! 
            <p>Я: 

            `,background:"Persons/Leon",buttontext:["\u0412\u044B\u043F\u0438\u043B\u0430 \u0430\u043B\u043A\u043E\u0433\u043E\u043B\u044C","\u041E\u0433\u0440\u0430\u043D\u0438\u0447\u0438\u043B\u0430\u0441\u044C \u0441\u043E\u043A\u043E\u043C"],buttonaction:[()=>{Game.Scenes.PN[37].Begin(),Game.Sounds.Play("Music","Disco"),Game.Stats.DrinkAtParty.Add(1)},()=>{Game.Scenes.PN[38].Begin(),Game.Sounds.Play("Music","Disco"),Game.Stats.DrinkAtParty.Add(0)}]}),Game.Scenes.PN[37]=new Scene({text:`
            Мы выпили несколько рюмок. Алкоголь расслаблял, становилось веселее и задорнее. Кто-то из ребят включил драйвовую музыку и все начали танцевать.
            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[39].Begin()}],condition:function(){1<=Game.Stats.InvitedCheryl.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.PN[45].Begin()})}}),Game.Scenes.PN[38]=new Scene({text:`
            Пить алкоголь не хотелось. И без него было весело и хорошо. Я пила яблочный сок, мы включили драйвовую музыку и начали танцевать.
            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[39].Begin()}],condition:function(){1<=Game.Stats.InvitedCheryl&&(this.buttonaction[0]=()=>{Game.Scenes.PN[45].Begin()})}}),Game.Scenes.PN[39]=new Scene({text:`
            Леон и Скарлетт чувствовали себя прекрасно. Они с задором веселились, включали любимые треки и отрывались по полной. Мне же оставалось просто не отставать от них. 
            <p>Чтобы немного передохнуть от танцев, мы решили поиграть в “Угадай мелодию”, где неожиданно для всех победил Леон. Он оказался тем еще меломаном и утер нос всем присутствующим. 
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[40].Begin()}]}),Game.Scenes.PN[40]=new Scene({text:`
            Парень продолжал нас радовать своими навыками бармена, делая из того, что у нас было, потрясающие и вкусные коктейли. 
            <p>- Леон, существует такое дело, которое тебе не дается идеально? - спросила я, подходя к нему за очередный напитком. 
            <p>- О, да, я не очень хорош в семейных делах, - с иронией проговорил парень. 
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[41].Begin()}]}),Game.Scenes.PN[41]=new Scene({text:`
            - Ладно тебе, все у вас с профессором наладится. Бывают же как и черные, так и белые полосы. 
            <p>Вмешалась Скарлетт, которая сказала: 
            <p>- Отставить! Мы собрались не для того, чтобы грустить. Лучше поглядите, что я скачала. 
            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[42].Begin()}]}),Game.Scenes.PN[42]=new Scene({text:`
            Эта была игра, где надо было повторять движения за персонажем на экране, держа телефон в руках. Мы вывели изображение на телевизор и решили устроить небольшой турнир. 
            <p>Первая парой были Леон и Скар. Они танцевали наравне, пока в конце, парень не оступился, немного не рассчитав движения. Тем самым он отдал победу Скарлетт, которая восторженно проговорила:
            `,background:"Backgrounds/Disco",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[43].Begin()}]}),Game.Scenes.PN[43]=new Scene({text:`
            - Ничего, в следующий раз я разрешу тебе отыграться,- ухмыльнулась девушка. 
            <p>- Ого, - Леон хлопал в ладоши. - $Имя Игрока$ и Скар, даже не знаю, кто круче…
            <p>Я встала рядом с девушкой, готовясь к финальной битве. Заиграла мелодия и я увидела первые движения: <i>вверх, вниз, вверх, влево. </i>
            `,background:"Backgrounds/Disco",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[50].Begin()}]}),Game.Scenes.PN[45]=new Scene({text:`
            Шерил, Леон и Скарлетт чувствовали себя прекрасно. Они веселились, включали любимые треки и отрывались по полной. Мне же оставалось просто не отставать от них. 
            <p>Чтобы немного передохнуть от танцев, мы решили поиграть в “Угадай мелодию”, где неожиданно для всех победила Шерил. Она оказалась тем еще меломаном и утерла нос всем присутствующим. 
            `,background:"Persons/Cheryl",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[46].Begin()}]}),Game.Scenes.PN[46]=new Scene({text:`
            Леон продолжал нас радовать своими навыками бармена, делая из того, что у нас было, потрясающие и вкусные коктейли. 
            <p>- Леон, существует такое дело, которое тебе не дается идеально? - спросила я, подходя к нему за очередным напитком. 
            <p>- О, да, я не очень хорош в семейных делах, - с иронией проговорил парень. 
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[47].Begin()}]}),Game.Scenes.PN[47]=new Scene({text:`
            - Ладно тебе, все у вас с профессором наладится. Бывают же как и черные, так и белые полосы. 
            <p>В разговор вмешалась Шерил. 
            <p>- Ты еще не знаешь, что значат реальные семейные проблемы. 
            <p>Леон хотел было что-то уточнить, но вмешалась Скарлетт, которая сказала: 
            <p>- Отставить! Мы собрались не для того, чтобы грустить. Лучше поглядите, что я скачала. 
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[48].Begin()}]}),Game.Scenes.PN[48]=new Scene({text:`
            Эта была игра, где надо было повторять движения за персонажем на экране, держа телефон в руках. Мы вывели изображение на телевизор и решили устроить небольшой турнир. 
            <p>Первая парой были Леон и Скар. Они танцевали наравне, пока в конце, парень не оступился, немного не рассчитав движения. Тем самым он отдал победу Скарлетт, которая восторженно проговорила:
            `,background:"Backgrounds/Disco",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[49].Begin(),Game.Effects.Disco()}]}),Game.Scenes.PN[49]=new Scene({text:`
            - Ничего, в следующий раз я разрешу тебе отыграться, - ухмыльнулась девушка.
            <p>Мы с Шерил довольно быстро закончили. Подруга была не особо пластичной, поэтому победа досталась мне легко. 
            <p>- Ого, - Леон хлопал в ладоши. - $Имя Игрока$ и Скар, даже не знаю, кто круче…
            <p>Я встала рядом с девушкой, готовясь к финальной битве. Заиграла мелодия и я увидела первые движения: <p color="red">вверх, вниз, вверх, влево. 
            `,background:"Backgrounds/Disco",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[50].Begin(),Game.Effects.Disco()}]}),Game.Scenes.PN[50]=new Scene({text:`
            В голову сразу пришла очевидная мысль: 
            <p>“Мне нельзя ошибаться, Скарлетт слишком хороша в этой игре. Надо собраться.” 
            `,background:"Backgrounds/Disco",buttontext:["\u0412\u043B\u0435\u0432\u043E","\u0412\u0432\u0435\u0440\u0445","\u0412\u043D\u0438\u0437"],buttonaction:[()=>{Game.Scenes.PN[55].Begin(),Game.Timer.Stop()},()=>{Game.Scenes.PN[51].Begin(),Game.Effects.Disco()},()=>{Game.Scenes.PN[55].Begin(),Game.Timer.Stop()}],condition:function(){Game.Timer.Set(9,()=>{Game.Scenes.PN[55].Begin()})}}),Game.Scenes.PN[51]=new Scene({text:`
            Я подняла руки, следуя за движениями модельки. Меня ждал успех, но Скарлетт не собиралась сдаваться. Мне еще предстояло выбрать правильное движение дальше.
            `,background:"Backgrounds/Disco",buttontext:["\u0412\u043B\u0435\u0432\u043E","\u0412\u0432\u0435\u0440\u0445","\u0412\u043D\u0438\u0437"],buttonaction:[()=>{Game.Scenes.PN[55].Begin(),Game.Timer.Stop()},()=>{Game.Scenes.PN[55].Begin(),Game.Timer.Stop()},()=>{Game.Scenes.PN[52].Begin(),Game.Effects.Disco()}],condition:function(){Game.Timer.Set(8,()=>{Game.Scenes.PN[55].Begin()})}}),Game.Scenes.PN[52]=new Scene({text:`
            Я тотчас присела и выполнила правильную комбинацию движений. Скарлетт замешкалась, а вероятность моей победы все возрастала. 
            `,background:"Backgrounds/Disco",buttontext:["\u0412\u043B\u0435\u0432\u043E","\u0412\u0432\u0435\u0440\u0445","\u0412\u043D\u0438\u0437"],buttonaction:[()=>{Game.Scenes.PN[55].Begin(),Game.Timer.Stop()},()=>{Game.Scenes.PN[54].Begin(),Game.Effects.Disco()},()=>{Game.Scenes.PN[55].Begin(),Game.Timer.Stop()}],condition:function(){Game.Timer.Set(7,()=>{Game.Scenes.PN[55].Begin()})}}),Game.Scenes.PN[54]=new Scene({text:`
            Я подпрыгнула и водила сверху руками, делая круговые движение. Мне оставался последний рывок до заветной победы. 
            `,background:"Backgrounds/Disco",buttontext:["\u0412\u043B\u0435\u0432\u043E","\u0412\u0432\u0435\u0440\u0445","\u0412\u043D\u0438\u0437"],buttonaction:[()=>{Game.Scenes.PN[57].Begin(),Game.Timer.Stop(),Game.Effects.Disco(),Game.Achievements.DanceQueen.Unlock()},()=>{Game.Scenes.PN[55].Begin(),Game.Timer.Stop()},()=>{Game.Scenes.PN[55].Begin(),Game.Timer.Stop()}],condition:function(){Game.Timer.Set(6,()=>{Game.Scenes.PN[55].Begin()})}}),Game.Scenes.PN[55]=new Scene({text:`
            Это было ошибкой, неуверенное движение руками стоило мне нескольких очков, благодаря чему впоследствии Скарлетт вырвалась вперед и выиграла меня. 
            `,background:"Backgrounds/Disco",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[56].Begin()}],condition:function(){Game.Effects.Disco()}}),Game.Scenes.PN[56]=new Scene({text:`
            - Не расстраивайся, $Имя Игрока$, в следующий раз будет лучше, - Скарлетт победоносно улыбалась.
            <p>Остальные похлопали нам и поблагодарили за интересную битву. 
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[58].Begin(),Game.Effects.Disco.Stop()}]}),Game.Scenes.PN[57]=new Scene({text:`
            Я наклонилась максимально влево, совершая полный оборот верхней части туловища. 
            <p>Мои усилия привели к победе. Я радостно вскрикнула и обняла подругу. 
            <p>- Это было круто, - говорила Скарлетт, пытаясь отдышаться. - Наконец-то достойный соперник! 
            <p>Ребята принялись поздравлять меня. 
            `,background:"Backgrounds/Disco",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[58].Begin(),Game.Effects.Disco.Stop()}],condition:function(){Game.Message("\u041E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u0441\u043E \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442 \u0438 \u041B\u0435\u043E\u043D\u043E\u043C \u0443\u043B\u0443\u0447\u0448\u0438\u043B\u0438\u0441\u044C"),Game.Stats.Leon.Add(1),Game.Stats.Scarlett.Add(1),Game.Sounds.Cheers.play()}}),Game.Scenes.PN[58]=new Scene({text:`
            Через несколько часов безудержного веселья, мы решили передохнуть и прийти в себя. Ребята решили побыть наедине с собой и привести мысли в порядок.
            Леон вышел на улицу, чтобы подышать свежим воздухом. Скарлетт устроилась на диване, включив телевизор, где шел какой-то романтический сериал.
            `,background:"",buttontext:["\u041B\u0435\u043E\u043D\u043E\u043C","\u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442","\u0428\u0435\u0440\u0438\u043B"],buttonactive:[!0,!0,!1],buttonaction:[()=>{Game.Scenes.PN[59].Begin()},()=>{Game.Scenes.PN[68].Begin()},()=>{Game.Scenes.PN[75].Begin()}],condition:function(){1<=Game.Stats.InvitedCheryl.Get()?(this.text="\u0427\u0435\u0440\u0435\u0437 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0447\u0430\u0441\u043E\u0432 \u0431\u0435\u0437\u0443\u0434\u0435\u0440\u0436\u043D\u043E\u0433\u043E \u0432\u0435\u0441\u0435\u043B\u044C\u044F, \u043C\u044B \u0440\u0435\u0448\u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0434\u043E\u0445\u043D\u0443\u0442\u044C \u0438 \u043F\u0440\u0438\u0439\u0442\u0438 \u0432 \u0441\u0435\u0431\u044F. \u0420\u0435\u0431\u044F\u0442\u0430 \u0440\u0435\u0448\u0438\u043B\u0438 \u043F\u043E\u0431\u044B\u0442\u044C \u043D\u0430\u0435\u0434\u0438\u043D\u0435 \u0441 \u0441\u043E\u0431\u043E\u0439 \u0438 \u043F\u0440\u0438\u0432\u0435\u0441\u0442\u0438 \u043C\u044B\u0441\u043B\u0438 \u0432 \u043F\u043E\u0440\u044F\u0434\u043E\u043A. \u041B\u0435\u043E\u043D \u0432\u044B\u0448\u0435\u043B \u043D\u0430 \u0443\u043B\u0438\u0446\u0443, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0434\u044B\u0448\u0430\u0442\u044C \u0441\u0432\u0435\u0436\u0438\u043C \u0432\u043E\u0437\u0434\u0443\u0445\u043E\u043C. \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442 \u0443\u0441\u0442\u0440\u043E\u0438\u043B\u0430\u0441\u044C \u043D\u0430 \u0434\u0438\u0432\u0430\u043D\u0435, \u0432\u043A\u043B\u044E\u0447\u0438\u0432 \u0442\u0435\u043B\u0435\u0432\u0438\u0437\u043E\u0440, \u0433\u0434\u0435 \u0448\u0435\u043B \u043A\u0430\u043A\u043E\u0439-\u0442\u043E \u0440\u043E\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0441\u0435\u0440\u0438\u0430\u043B. \u0428\u0435\u0440\u0438\u043B \u0432\u044B\u0440\u0430\u0437\u0438\u043B\u0430 \u0436\u0435\u043B\u0430\u043D\u0438\u0435 \u043F\u043E\u043C\u044B\u0442\u044C \u043F\u043E\u0441\u0443\u0434\u0443 \u0438 \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u043E\u0441\u0442\u0430\u043B\u0430\u0441\u044C \u043D\u0430 \u043A\u0443\u0445\u043D\u0435. <p>\u041E\u0441\u0442\u0430\u0442\u043E\u043A \u0432\u0435\u0447\u0435\u0440\u0430 \u043C\u043D\u0435 \u0445\u043E\u0442\u0435\u043B\u043E\u0441\u044C \u043F\u043E\u0431\u044B\u0442\u044C \u0441:",this.buttonactive[2]=!0):this.text="\u0427\u0435\u0440\u0435\u0437 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0447\u0430\u0441\u043E\u0432 \u0431\u0435\u0437\u0443\u0434\u0435\u0440\u0436\u043D\u043E\u0433\u043E \u0432\u0435\u0441\u0435\u043B\u044C\u044F, \u043C\u044B \u0440\u0435\u0448\u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0434\u043E\u0445\u043D\u0443\u0442\u044C \u0438 \u043F\u0440\u0438\u0439\u0442\u0438 \u0432 \u0441\u0435\u0431\u044F. \u0420\u0435\u0431\u044F\u0442\u0430 \u0440\u0435\u0448\u0438\u043B\u0438 \u043F\u043E\u0431\u044B\u0442\u044C \u043D\u0430\u0435\u0434\u0438\u043D\u0435 \u0441 \u0441\u043E\u0431\u043E\u0439 \u0438 \u043F\u0440\u0438\u0432\u0435\u0441\u0442\u0438 \u043C\u044B\u0441\u043B\u0438 \u0432 \u043F\u043E\u0440\u044F\u0434\u043E\u043A. \u041B\u0435\u043E\u043D \u0432\u044B\u0448\u0435\u043B \u043D\u0430 \u0443\u043B\u0438\u0446\u0443, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0434\u044B\u0448\u0430\u0442\u044C \u0441\u0432\u0435\u0436\u0438\u043C \u0432\u043E\u0437\u0434\u0443\u0445\u043E\u043C. \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442 \u0443\u0441\u0442\u0440\u043E\u0438\u043B\u0430\u0441\u044C \u043D\u0430 \u0434\u0438\u0432\u0430\u043D\u0435, \u0432\u043A\u043B\u044E\u0447\u0438\u0432 \u0442\u0435\u043B\u0435\u0432\u0438\u0437\u043E\u0440, \u0433\u0434\u0435 \u0448\u0435\u043B \u043A\u0430\u043A\u043E\u0439-\u0442\u043E \u0440\u043E\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0441\u0435\u0440\u0438\u0430\u043B.<p>\u041E\u0441\u0442\u0430\u0442\u043E\u043A \u0432\u0435\u0447\u0435\u0440\u0430 \u043C\u043D\u0435 \u0445\u043E\u0442\u0435\u043B\u043E\u0441\u044C \u043F\u043E\u0431\u044B\u0442\u044C \u0441:"}}),Game.Scenes.PN[59]=new Scene({text:`
            Я вышла на улицу, где меня тут же обдало прохладным воздухом. Леон стоял недалеко от крыльца с задумчивым видом и сигаретой в руках. Он поглядывал на звезды, а увидев меня, тут же подошел и сказал:
            <p>- Холодно, может, накинешь что-нибудь, $Имя Игрока$?
            <p>- Все в порядке, не простужусь, - я поежилась и продолжила. - Ты как? Под конец вечера твои мысли были совсем не здесь.
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[60].Begin()}],condition:function(){Game.Sounds.Play("Music","Leon")}}),Game.Scenes.PN[60]=new Scene({text:`
            - Знаю я твое “в порядке”, держи.  
            <p>Леон снял свою кожаную куртку и накинул мне на плечи. Я немного смутилась, однако спорить не стала и с благодарностью приняла его заботу. 
            <p>Он продолжил: 
            <p>- Да, как-то накатило немного… Будешь? - он протянул мне сигарету. 
            `,background:"Persons/Leon",buttontext:["\u0412\u0437\u044F\u0442\u044C","\u041D\u0435 \u0431\u0440\u0430\u0442\u044C \u0441\u0438\u0433\u0430\u0440\u0435\u0442\u0443"],buttonaction:[()=>{Game.Scenes.PN[61].Begin()},()=>{Game.Scenes.PN[62].Begin()}]}),Game.Scenes.PN[61]=new Scene({text:`
            Да, спасибо.
            <p>Я сделала несколько затяжек. Благодаря этому мне стало гораздо легче. 
            <p>- Я как самый настоящий демон, прям каждый раз соблазняю тебя на курение. 
            <p>- Ладно тебе, мне же не 5 лет.
            <p>- Ну-ну…
            <p>Мы немного постояли. Молча, думая о своем. Пока Леон не сказал: 
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[63].Begin()}]}),Game.Scenes.PN[62]=new Scene({text:`
            - Нет, спасибо! 
            <p>Я наблюдала за тем, как Леон медленно вдыхал и выдыхал сигаретный дым, про себя думая, что мне и без сигарет нормально живется. 
            <p>“Может, моя зависимость проходит?” 
            <p>Мы немного постояли. Молча, думая о своем. Пока Леон не сказал:
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[63].Begin()}]}),Game.Scenes.PN[63]=new Scene({text:`
            - Я много выпил, а опьянеть почти не удалось, что со мной не так? 
            <p>- Все так, даже лучше, ты по праву заслужил почетный статус алкоголика! 
            <p>- Не смешно, - Леон сделал моську обиженного кота, но увидев, как искренне я смеюсь - смягчился. - Я смотрю, вечеринка тебе понравилась? Полегчало?
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[263].Begin()}]}),Game.Scenes.PN[263]=new Scene({text:`
            - Определенно. Мы будто бы вернулись на три года назад, тебе так не показалось? 
            <p>- Показалось, - парень подошел ко мне поближе. - Я сейчас хочу сделать кое-что довольно глупое, но на это определенно стоило решиться ещё тогда.
            <p>- Леон, что…
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[64].Begin()}]}),Game.Scenes.PN[64]=new Scene({text:`
            Парень внимательно посмотрел на меня, а затем резко обнял, прервав мои попытки задать вопрос.
            <p>Я: 
            `,background:"Persons/Leon",buttontext:["\u041F\u0440\u0438\u043D\u044F\u043B\u0430 \u044D\u0442\u0438 \u043E\u0431\u044A\u044F\u0442\u0438\u044F","\u041E\u0442\u0441\u0442\u0440\u0430\u043D\u0438\u043B\u0430\u0441\u044C"],buttonaction:[()=>{Game.Scenes.PN[65].Begin(),Game.Stats.Leon.Add(1),Game.Stats.HugLeon.Add(1)},()=>{Game.Scenes.PN[67].Begin()}]}),Game.Scenes.PN[65]=new Scene({text:`
            Было так тепло и уютно, будто бы мы нагоняли объятия за все пропущенные годы. Я положила голову ему на грудь, вслушиваясь в томное дыхание, учащенное сердцебиение. Леон нежно поглаживал меня по спине и волосам, словно говоря: “я здесь, я рядом, все хорошо”. 
            <p>Мы стояли так несколько минут, просто наслаждаясь ночной тишиной и друг другом. 
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[66].Begin()}]}),Game.Scenes.PN[66]=new Scene({text:`
            Леон немного отстранившись, но не распуская объятий, произнес: 
            <p>- Я действительно рад, что мы возобновили общение. 
            <p>- Возможно, нам стоило сделать это раньше.
            <p>- Согласен. 
            <p>Наконец у нас получилось отпустить друг друга. Мы постояли еще немного под покровом успокаивающего неба. 
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[83].Begin(),Game.Message("\u0421\u0432\u044F\u0437\u044C \u0441 \u041B\u0435\u043E\u043D\u043E\u043C \u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0441\u044F \u043A\u0440\u0435\u043F\u0447\u0435")}]}),Game.Scenes.PN[67]=new Scene({text:`
            Я не ожидала такого развития событий и инстинктивно отстранилась. Леон не расстроился и сказал: 
            <p>- Прости… Это все алкоголь. Я просто счастлив, что мы снова вот так вот беззаботно проводим время. 
            <p>- Я тоже, - моя улыбка немного сгладила нарастающее напряжение. 
            <p>Я подождала, пока Леон докурит и мы вместе вернулись обратно в дом. 
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[83].Begin()}]}),Game.Scenes.PN[68]=new Scene({text:`
            Скарлетт лежала, закрыв глаза рукой. Изредка были слышны всхлипы под сериал, который все еще шел на фоне. Я аккуратно подсела к ней и приобняла. Мне показалось, что это будет наилучшей поддержкой в данный момент. 
            <p>- $Имя Игрока$, я устала… 
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[69].Begin()}],condition:function(){Game.Sounds.Play("Music","Scarlett")}}),Game.Scenes.PN[69]=new Scene({text:`
            - Что случилось, мы же хорошо проводим время. 
            <p>- Проклятый алкоголь! 
            <p>Она резко встала и направилась в сторону ванной комнаты. 
            <p>Я: 
            `,background:"Persons/Scarlett",buttontext:["\u041F\u043E\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043B\u0430 \u0437\u0430 \u043D\u0435\u0439","\u041F\u043E\u0434\u043E\u0436\u0434\u0430\u043B\u0430 \u0435\u0435 \u0432 \u043A\u043E\u043C\u043D\u0430\u0442\u0435"],buttonaction:[()=>{Game.Scenes.PN[70].Begin(),Game.Stats.Scarlett.Add(1),Game.Stats.FollowedScarlett.Add(1)},()=>{Game.Scenes.PN[73].Begin()}]}),Game.Scenes.PN[70]=new Scene({text:`
            Мне было невыносимо видеть, как моему близкому другу плохо. Я незамедлительно последовала за ней и нашла её сидящей на холодном полу. 
            <p>Я присела на корточки перед подругой и сказала: 
            <p>- Скар, я беспокоюсь. Ты сама не своя в последнее время. 
            <p>- Я устала, $Имя Игрока$. Устала от постоянной ругани родителей и неуважения к себе. Я как будто бы ничего не значу, как самостоятельная единица в этом мире. А мне ведь далеко не 14… 
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[71].Begin()}]}),Game.Scenes.PN[71]=new Scene({text:`
            Я понимаю, однако тебе никто не мешает, к примеру, съехать от них. Начать свою самостоятельную жизнь. 
            <p>- Было бы славно, - она улыбнулась. - Но с моей нагрузкой - такое вряд ли когда-нибудь произойдет.   
            <p>- Звучит, как отговорка, если честно. 
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[72].Begin()}]}),Game.Scenes.PN[72]=new Scene({text:`
            Она вдруг резко посмотрела на меня. Не знаю, что происходило в ее голове в этот момент, но довольно продолжительное время мы молчали, пока она не проговорила:
            <p>- Давай вернемся. 
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[83].Begin(),Game.Message("\u0412\u0430\u0448 \u0441\u043E\u0432\u0435\u0442 \u0437\u0430\u0441\u0442\u0430\u0432\u0438\u043B \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442 \u0437\u0430\u0434\u0443\u043C\u0430\u0442\u044C\u0441\u044F")}]}),Game.Scenes.PN[73]=new Scene({text:`
            Я решила дать ей время побыть в одиночестве со своими тараканами. Возможно, ей действительно станет лучше. 
            <p>Когда Скарлетт вернулась, она выглядела загруженной и печальной. 
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[74].Begin()}]}),Game.Scenes.PN[74]=new Scene({text:`
            - Все в порядке? 
            <p>- Да, $Имя Игрока$. Я просто устала. 
            <p>Девушка была крайне отстраненной и, казалось, не хотела продолжать дальнейшее общение. 
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[83].Begin(),Game.Message("\u0412\u044B \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u043B\u0438 \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442")}]}),Game.Scenes.PN[75]=new Scene({text:`
            Я решила помочь Шерил и заодно спросить как обстоят дела дома. Девушка выглядела задумчиво, но при этом с ее лица не сходила улыбка. 
            <p>- Не скучаешь? - я села рядом с ней за кухонный столик. 
            <p>- Что ты… Кажется, мне было мало сегодняшнего вечера. 
            <p>- Мы всегда можем повторить, Шерил. 
            `,background:"Persons/Cheryl",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[76].Begin()}],condition:function(){Game.Sounds.Play("Music","Cheryl")}}),Game.Scenes.PN[76]=new Scene({text:`
            - Думаешь? Ощущение такое, что все это мимолетно и никогда больше не произойдёт, - девушка вмиг осушила свой бокал. 
            <p>- Брось, не забивай себе голову. Я никуда не пропадаю, слышишь! Что тебя тревожит? 
            <p>- Ты будешь смеяться, $Имя Игрока$...
            `,background:"Persons/Cheryl",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[77].Begin()}]}),Game.Scenes.PN[77]=new Scene({text:`
            Я серьезно на нее посмотрела и еще раз повторила: 
            <p>- Что тебя тревожит? 
            <p>- Не одолжишь мне немного денег? Я обещаю, верну через несколько дней. 
            <p>Я ожидала услышать все, что угодно. Накрутила себе самые ужасные мысли. Из-за этого невольно рассмеялась, чем немного расстроила Шерил. 
            `,background:"Persons/Cheryl",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[78].Begin()}]}),Game.Scenes.PN[78]=new Scene({text:`
            - Я же говорила… Все всегда смеются надо мной… 
            <p>- Извини, просто в моей голове всплыли всевозможные дурацкие варианты, а тут… 
            <p>Я: 
            `,background:"Persons/Cheryl",buttontext:["\u041E\u0434\u043E\u043B\u0436\u0438\u043B\u0430 \u0428\u0435\u0440\u0438\u043B \u0434\u0435\u043D\u0435\u0433 (100)","\u0423 \u043C\u0435\u043D\u044F \u043D\u0435 \u043D\u0430\u0448\u043B\u043E\u0441\u044C \u0442\u0430\u043A\u043E\u0439 \u0441\u0443\u043C\u043C\u044B"],buttonaction:[()=>{Game.Scenes.PN[79].Begin()},()=>{Game.Scenes.PN[81].Begin()}]}),Game.Scenes.PN[79]=new Scene({text:`
            - Держи. Ты всегда можешь обратиться ко мне. 
            <p>- Спасибо тебе огромное, - она обняла меня. - Без твоей помощи я бы пропала. 
            <p>- К чему такая срочность? 
            <p>- Отчим попросил меня кое-что купить, а зарплату задерживают. Я не хочу снова выслушивать, какая я плохая и неблагодарная дочь. 
            `,background:"Persons/Cheryl",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[80].Begin()}]}),Game.Scenes.PN[80]=new Scene({text:`
            - Но это же ненормально, Шерил! Жить в своем собственном доме в постоянном страхе сделать что-то не так. Мы столько раз это обсуждали. 
            <p>- Мне правда важна твоя поддержка, - девушка улыбалась. - Но и я тебе ни раз говорила, как мне важен этот дом и что никто не посмеет отнять эту драгоценность у меня. 
            <p>“Упрямая, как и всегда.”
            `,background:"Persons/Cheryl",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[83].Begin(),Game.Message("\u0428\u0435\u0440\u0438\u043B \u0437\u043D\u0430\u0435\u0442, \u0447\u0442\u043E \u043D\u0430\u0441 \u0432\u0430\u0441 \u043C\u043E\u0436\u043D\u043E \u043F\u043E\u043B\u043E\u0436\u0438\u0442\u044C\u0441\u044F"),Game.Stats.Cheryl.Add(1)}]}),Game.Scenes.PN[81]=new Scene({text:`
            - Прости, сейчас у меня нет такой суммы. 
            <p>Шерил отвернулась, было видно, насколько сильно она расстроилась от этой новости. 
            <p>- К чему такая срочность? - я решила уточнить, чтобы попытаться наладить дальнейшее общение. 
            <p>- Я должна купить продукты, иначе отчим будет злиться. Но зарплату задерживают, понимаешь? Всё против меня, опять повторится тот кошмар. 
            `,background:"Persons/Cheryl",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[82].Begin()}]}),Game.Scenes.PN[82]=new Scene({text:`
            “Кошмар?”
            <p>- Шерил, дорогая… - мне было нестерпимо грустно от того, что я не знала, как помочь ей. - Давай попросим у Скарлетт или Леона, я уверена, они не откажут. 
            <p>- Да кто я такая, чтобы они мне помогали? - девушка начала злиться. - Даже тебе сложно мне помочь. Видимо, мне не от кого ждать помощи. Пора уже научиться справляться со всем самостоятельно. 
            `,background:"Persons/Cheryl",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[83].Begin(),Game.Message("\u0428\u0435\u0440\u0438\u043B \u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0441\u044F \u0440\u0435\u0448\u0438\u0442\u0435\u043B\u044C\u043D\u0435\u0435, \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0438\u043C\u0435\u043D\u043D\u043E \u044D\u0442\u043E \u0435\u0439 \u0438 \u043D\u0443\u0436\u043D\u043E? "),Game.Stats.Cheryl.Add(-1)}]}),Game.Scenes.PN[83]=new Scene({text:`
            Уже под утро мы с ребятами немного прибрались в квартире, разложили диван и устало плюхнулись на него. 
            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[84].Begin()}],condition:function(){1<=Game.Stats.InvitedCheryl.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.PN[85].Begin()})}}),Game.Scenes.PN[84]=new Scene({text:`
            Перед тем как уснуть, я слышала крики из дома Шерил. Сегодня они были громче, чем обычно. Я написала Шерил сообщение, но она мне так и не ответила… 
            <p>“Мне стоило позвать ее…”
            <p>Я хотела было выйти, но усталость, которая накопилась за несколько дней, обрушилась на меня, не давая подняться. 
            <p>“Шерил, в следующий раз, я точно буду рядом.” 
            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[86].Begin(),Game.Message("\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0428\u0435\u0440\u0438\u043B \u0443\u0445\u0443\u0434\u0448\u0430\u0435\u0442\u0441\u044F"),Game.Stats.Cheryl.Add(-1)}]}),Game.Scenes.PN[85]=new Scene({text:`
            Шерил решила не оставаться с нами на ночь, она попрощалась и направилась домой. 
            Я знала в чем была причина такого решения, ведь ее ждали в доме “ужасов”. 
            Шерил всячески старалась лишний раз не накалять обстановку. Несмотря на дрожащие руки, она искренне улыбалась и светилась от счастья, когда уходила.
            <p>- Все-таки мое решение позвать ее было правильным, - я сказала это вслух и вызвала одобрение у друзей. 
            `,background:"Persons/Cheryl",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[86].Begin()}]}),Game.Scenes.PN[86]=new Scene({text:`
            Я немного поерзала и все же нашла удобную позу для сна. Я лежала между Леоном и Скарлетт, которые уже мирно посапывали. 
            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[87].Begin()}],condition:function(){1<=Game.Stats.FollowedScarlett.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.PN[88].Begin()}),1<=Game.Stats.HugLeon.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.PN[87].Begin()}),0>=Game.Stats.FollowedScarlett.Get()&&0>=Game.Stats.HugLeon.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.PN[89].Begin()})}}),Game.Scenes.PN[87]=new Scene({text:`
            Парень легонько меня приобнял, прижимая к себе. Возможно, Леон сделал это неосознанно, во сне, но я была рада еще раз ощутить  его прикосновения. 
            Я обратила внимание на его длинные ресницы, привлекательное лицо, которое, казалось, во сне выглядело еще притягательнее. 
            <p>Его дыхание обжигало мне кожу, а крепкие мужские руки придавали то самое спокойствие, о котором я мечтала последние несколько дней. 
            <p>Я думала, что наконец нашла безопасность в этих объятиях, но я ошибалась…
            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[90].Begin()}]}),Game.Scenes.PN[88]=new Scene({text:`
            Девушка взяла меня за руки. Я ощутила небольшую дрожь в ее прикосновении и ответно сжала пальцы Скарлетт. 
            В этот момент мне хотелось быть ее защитой ото всех печалей, быть тем самым щитом, который защищает героя в самые трудные и опасные для него моменты.
            <p>Мы лежали так ещё некоторое время, изредка перешептываясь, и не заметили как уснули, так и держась за руки. Это мгновение придавало то самое спокойствие, о котором я мечтала последние несколько дней. 
            <p>Я думала, что наконец нашла безопасность в этих прикосновениях, но я ошибалась…
            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[90].Begin()}]}),Game.Scenes.PN[89]=new Scene({text:`
            Я смотрела на лица друзей, с благодарностью вспоминая сегодняшний вечер. Эти мгновения придавали то самое спокойствие, о котором я мечтала последние несколько дней. 
            <p>Я думала, что находясь рядом с близкими, мне ничего не будет угрожать, но я ошибалась…
            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[90].Begin()}]}),Game.Scenes.PN[90]=new Scene({text:`
            Очнувшись ото сна, я ощутила характерный привкус крови во рту. Тело, казалось, было полностью разбито. 
            <p>С трудом опустив голову ниже, я обнаружила, что сидела связанная на почти развалившемся деревянном стуле. Вокруг было темно и прохладно, отовсюду слышался звук падающих капель, эхом разносящийся по всему помещению. 
            <p>“Больно… Меня похитили? Скарлетт и Леон не пострадали?”

            `,background:"Backgrounds/Chair",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[91].Begin()}],condition:function(){Game.Effects.Gray(),Game.Sounds.Play("Music","Chair"),AndroidApp("showAd")}}),Game.Scenes.PN[91]=new Scene({text:`
            Но была еще одна деталь, которую я с опозданием осознала. 
            Одежда. Та же, что была одета на Катарине в мое прошлое перемещение. Только сейчас она выглядела изодранной, грязной и была покрыта пятнами крови.
            <p>“Это произошло вновь… Но где же я? Неужели тот монстр…”
            `,background:"Backgrounds/Chair",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[92].Begin()}]}),Game.Scenes.PN[92]=new Scene({text:`
            Я думала лишь о способе выбраться из этого места. Страшная мысль пришла сама собой: 
            <p>“Что будет, если я погибну здесь? Умру ли я и в своем мире?”
            <p>Но проверять не хотелось. 
            `,background:"Backgrounds/Chair",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[93].Begin()}]}),Game.Scenes.PN[93]=new Scene({text:`
            Я чувствовала всю боль и отчаяние Катарины, ведь прямо сейчас я проживала ее жизнь. 
            <p>“Что мне делать? Попытаться сбежать? А если этот ублюдок сюда заявится, не сделаю ли я только хуже?” 
            <p>Я:
            `,background:"Backgrounds/Chair",buttontext:["\u041F\u043E\u043F\u044B\u0442\u0430\u043B\u0430\u0441\u044C \u0441\u0431\u0435\u0436\u0430\u0442\u044C","\u041E\u0441\u0442\u0430\u043B\u0430\u0441\u044C \u0441\u0438\u0434\u0435\u0442\u044C \u043D\u0430 \u043C\u0435\u0441\u0442\u0435"],buttonaction:[()=>{Game.Scenes.PN[94].Begin(),Game.Stats.TryToEscape.Add(1)},()=>{Game.Scenes.PN[119].Begin(),Game.Stats.TryToEscape.Add(0)}]}),Game.Scenes.PN[94]=new Scene({text:`
            Понять, где я находилась было практически невозможно из-за скудного освещения. Осознав, что связанными у меня были только руки, в голову пришли здравые мысли о попытке побега.
            <p>“Я могла бы попытаться встать и попробовать освободиться… нельзя было уповать на случай и ждать спасения. Жизнь научила меня самостоятельно выбираться из трудностей!” 
            `,background:"Backgrounds/Chair",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[95].Begin()}]}),Game.Scenes.PN[95]=new Scene({text:`
            Я медленно поднялась на дрожащие ноги, немного наклоняясь, чтобы не задевать стулом пол. Шла не торопясь, боком, боясь сделать лишние движения.
            <p>Размер комнаты было трудно оценить, но мне показалось, что это был небольшой подвал, может, размером с нашу гостиную. 
            `,background:"Backgrounds/Chair",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[96].Begin()}]}),Game.Scenes.PN[96]=new Scene({text:`
            Глаза стали постепенно привыкать к темноте и я увидела столик.
            <p>“Достаточно ли у меня времени, чтобы осмотреться?” 
            `,background:"Backgrounds/Chair",buttontext:["\u0418\u0434\u0442\u0438 \u043A \u0441\u0442\u043E\u043B\u0443","\u0411\u043B\u0443\u0436\u0434\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435"],buttonaction:[()=>{Game.Scenes.PN[201].Begin()},()=>{Game.Scenes.PN[100].Begin()}]}),Game.Scenes.PN[201]=new Scene({text:`
            “Должно быть это лучшее решение…”
            <p>Подойдя к нему, я обнаружила несколько хаотично-разбросанных бумаг, небольшой ножик, перо, шприц. 
            <p>“Вот оно, я смогу попробовать разрезать эти веревки в лучших традициях шпионских фильмов.”
            `,background:"Backgrounds/Chair",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[97].Begin()}]}),Game.Scenes.PN[97]=new Scene({text:`
            Взяв в рот грязный нож, я попыталась повернуть голову так, чтобы “мой спаситель” попал мне прямо в руки. И у меня:
            `,background:"Backgrounds/Chair",buttontext:["\u041D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C","\u041D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C","\u041F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C","\u041D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C"],buttonaction:[()=>{Game.Scenes.PN[98].Begin()},()=>{Game.Scenes.PN[98].Begin()},()=>{Game.Scenes.PN[97].Begin()},()=>{Game.Scenes.PN[98].Begin()}]}),Game.Scenes.PN[98]=new Scene({text:`
            Я и не ожидала, что с первого раза у меня получится. Нож со звоном упал вниз. Мне пришлось сесть на колени и языком касаться холодного, мокрого пола, чтобы поддеть предмет. 
            `,background:"Backgrounds/Chair",buttontext:["\u041D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C","\u041D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C","\u041F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C","\u041D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C"],buttonaction:[()=>{Game.Scenes.PN[98].Begin()},()=>{Game.Scenes.PN[98].Begin()},()=>{Game.Scenes.PN[99].Begin()},()=>{Game.Scenes.PN[98].Begin()}]}),Game.Scenes.PN[99]=new Scene({text:`
            Каким-то чудом ножик попал мне в руки и я начала разрезать веревки. Хоть он был не шибко острым, через некоторое время веревки стали ослабевать и мне удалось освободиться. 
            `,background:"Backgrounds/Chair",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[102].Begin(),Game.Message("\u0417\u0430 \u0441\u0432\u043E\u044E \u0440\u0435\u0448\u0438\u043C\u043E\u0441\u0442\u044C \u0432\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u043D\u043E\u0436!"),Game.Stats.Knife.Add(1),Game.Achievements.FirstWeapon.Unlock()}]}),Game.Scenes.PN[100]=new Scene({text:`
            В другом конце комнаты был едва различим высокий закрытый шкаф. Мне удалось поддеть ногой дверцу. 
            Оттуда вывалилась детская фарфоровая кукла. Она мило улыбалась, несмотря на растрепанную прическу и несколько оторванных конечностей. 
            `,background:"Backgrounds/Chair",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[210].Begin()}]}),Game.Scenes.PN[210]=new Scene({text:`
            Однако самым страшным являлось вовсе не это. Сами стенки шкафа были залиты чем-то алым. 
            Я искренне надеялась, что это все-таки краска, а не кровь. Но невыносимый удушающий запах говорил об обратном.
            <p>“Боже…”
            `,background:"Backgrounds/Chair",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[101].Begin()}]}),Game.Scenes.PN[101]=new Scene({text:`
            Мне было даже страшно подумать о том, что могло тут твориться. Я незамедлительно решила вернуться к столу и снова попытаться найти выход. 
            `,background:"Backgrounds/Chair",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[201].Begin()}]}),Game.Scenes.PN[102]=new Scene({text:`
            Я размяла затекшие руки, голову. Быстренько осмотрела себя, потрогала ребра, так как именно в боку боль была сильнее всего. 
            <p>“Как я и думала, при нажатии болит еще сильнее. Что же пережила Катарина? Неужели виновата… моя беспечность?” 
            `,background:"Backgrounds/Chair",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[103].Begin()}]}),Game.Scenes.PN[103]=new Scene({text:`
            Я взяла себя в руки, и попыталась рассмотреть вещи на столе. Мое внимание привлекли небольшие листки, на которых были изображены каракули и не аккуратно нарисованные символы. 
            Словно ребенок, не умеющий писать, взял в первый раз письменные принадлежности и попытался передать свои мысли на бумаге.
            <p>Однако одно слово все же было различимо и повторялось несколько раз.
            <p><i>“Катарина.” </i>
            `,background:"Backgrounds/Chair",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[104].Begin()}]}),Game.Scenes.PN[104]=new Scene({text:`
            Все внутри дрожало, я боялась сделать лишний шаг. 
            <p>“Неужели за мной все это время следили?”
            <p>Единственная мысль, не дававшая мне сдаться - это выход, который, безусловно, должен быть где-то рядом.
            `,background:"Backgrounds/Chair",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[105].Begin()}]}),Game.Scenes.PN[105]=new Scene({text:`
            Вскоре я увидела железную дверь. Она находилась в другом конце комнаты. Я приблизилась к ней и со всей силы дернула за ручку. Никакого результата не последовало. 
            <p>“Правильно, $Имя Игрока$, надежда умирает последней.”
            `,background:"Backgrounds/VaultDoor",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[200].Begin()}]}),Game.Scenes.PN[200]=new Scene({text:`
            Сверху на двери была решетка, а за ней виднелся длинный коридор, освещенный несколькими тлеющими факелами. 
            <p>Я схватилась за железные прутья, встала на носочки, пытаясь рассмотреть помещение. 
            Ничего такого, что могло бы мне помочь, я не увидела. Зато краем глаза я заметила искривленную тень, которая стремительно приближалась к моей камере.
            `,background:"Backgrounds/VaultDoor",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[106].Begin()}]}),Game.Scenes.PN[106]=new Scene({text:`
            “Черт… Что же мне делать? Защищаться? Притвориться связанной и выжидать?
            `,background:"Backgrounds/VaultDoor",buttontext:["\u041E\u0431\u043E\u0440\u043E\u043D\u044F\u0442\u044C\u0441\u044F \u043D\u043E\u0436\u043E\u043C","\u041F\u0440\u0438\u0442\u0432\u043E\u0440\u0438\u0442\u044C\u0441\u044F \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u043E\u0439"],buttonaction:[()=>{Game.Scenes.PN[107].Begin()},()=>{Game.Scenes.PN[117].Begin()}]}),Game.Scenes.PN[107]=new Scene({text:`
            Я достала нож и попыталась скрыться в тенях комнаты. 
            Через некоторое время послышалось проворачивание замка и в помещение вошло нечто. Уродливая тварь начала истошно кричать, осматривая каждый угол. 
            <p>“Он вот-вот найдет меня… Как же страшно, что я могу?” 
            `,background:"",buttontext:["\u0417\u0430\u043C\u0435\u0440\u0435\u0442\u044C","\u0410\u0442\u0430\u043A\u043E\u0432\u0430\u0442\u044C \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043E \u0432 \u0433\u043E\u0440\u043B\u043E"],buttonaction:[()=>{Game.Scenes.PN[108].Begin()},()=>{Game.Scenes.PN[111].Begin()}]}),Game.Scenes.PN[108]=new Scene({text:`
            Я так и не решилась на открытое столкновение. Да и могла ли я что-то противопоставить этому существу? 
            <p>Монстр нашел меня довольно быстро. Он сильным рывком кинул меня в центр комнаты и навис надо мной. 
            <p>- Ты думала, что сможешь сбежать? Как наивно. 
            `,background:"Persons/Monster",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[109].Begin()}]}),Game.Scenes.PN[109]=new Scene({text:`
            Из его пасти разило тухлятиной, глаза были красные, злобные. Я перестала дышать, тело дрожало, словно предчувствуя, что час мой близок. 
            <p>«Я сейчас погибну, выхода больше нет!»
            <p>Тварь грубо схватила меня и снова поместила на стул, внимательно осматривая. 
            `,background:"Persons/Monster",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[110].Begin()}]}),Game.Scenes.PN[110]=new Scene({text:`
            - Тебе не сбежать, твоя кровь усилит наш род и мы наконец-то будем править! 
            <p>Через некоторое время в помещение вошла еще одна фигура. На вид человек, высокий, лицо скрыто за маской.
            `,background:"Persons/Monster",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[126].Begin()}]}),Game.Scenes.PN[111]=new Scene({text:`
            Я сильно сжала оружие, готовясь к нападению. Адреналин кипел во мне, я видела лишь единственный исход своего спасения - сражение. 
            <p>Когда монстр практически поравнялся со мной, я со всей силы воткнула нож в его шею и ринулась в сторону распахнутой двери. 
            <p>Отдаленно я слышала его недовольное рычание, но не посмела обернуться. 
            `,background:"Persons/Monster",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[112].Begin()}]}),Game.Scenes.PN[112]=new Scene({text:`
            Я вышла в коридор и побежала в случайном направлении.
            <p>Однако моя свобода длилась недолго. Я практически сразу врезалась в кого-то.  
            Высокая фигура твердо стояла на месте. Блеклый свет от факелов едва помог мне разглядеть мужской силуэт. Он резко взял меня за руку и потянул обратно в комнату. 
            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[113].Begin()}]}),Game.Scenes.PN[113]=new Scene({text:`
            Раненое существо тут же подбежало ко мне, жадно оглядывая. В его глазах стало больше безумия и нескрываемой ненависти, изо рта текли слюни. 
            <p>- Научи нашу гостью манерам, я разрешаю, - голос незнакомца был спокойным, но с нотками заигрывания. Ему явно нравилось происходящее. 
            `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[114].Begin()}]}),Game.Scenes.PN[114]=new Scene({text:`
            Монстру не надо было повторять дважды. Он схватил меня и повалил на пол. Его язык начал проходиться по моему лицу, его когтистые пальцы елозили по телу, он жадно облизывался. 
            <p>- Прошу, перестаньте… 
            <p>Тварь встала и надавила ногой на сгиб руки. Я инстинктивно стала его отталкивать, но он был слишком силен. 
            `,background:"Persons/Monster",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[115].Begin()}]}),Game.Scenes.PN[115]=new Scene({text:`
            С каждым его нажатием, по моему телу проходили болезненные волны. Мгновение и боль стала настолько нестерпимой, что я начала терять сознание.
            <p>Одно резкое движение - и вот я уже кричу во все горло. Никогда раньше я не испытывала такой боли. 
            <p>“Пусть это закончится…”
            `,background:"Persons/Monster",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[116].Begin(),Game.Message("\u041A \u0441\u043E\u0436\u0430\u043B\u0435\u043D\u0438\u044E, \u043D\u0435 \u0432\u0441\u0435\u0433\u0434\u0430 \u043D\u0430\u0434\u043E \u0431\u0440\u043E\u0441\u0430\u0442\u044C\u0441\u044F \u0432 \u0430\u0442\u0430\u043A\u0443\u2026 \u0412\u044B \u0441\u0438\u043B\u044C\u043D\u043E \u0440\u0430\u043D\u0435\u043D\u044B!"),Game.Stats.BrokenHand.Add(1),Game.Achievements.AttackMonster.Unlock()}]}),Game.Scenes.PN[116]=new Scene({text:`
            В какой-то момент в поле моего зрения вошла фигура незнакомца. Он улыбался, с наслаждением, буквально облизывался при виде моих мучений. 
            <p>В это время монстр громко смеялся, я с ужасом смотрела на неестественное положение своей руки. 
            `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[126].Begin()}]}),Game.Scenes.PN[117]=new Scene({text:`
            Мне казалось, это самый логичный и безопасный вариант. Вряд ли мне удастся что-то сделать с маленьким ножичком. 
            <p>Я быстро вернула стул в исходное положение, села, закинула руки за спину и стала ждать. 
            `,background:"Backgrounds/Chair",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[118].Begin()}]}),Game.Scenes.PN[118]=new Scene({text:`
            Послышалось проворачивание замка и в помещение вошло нечто. Уродливая тварь улыбалась, медленно подходя ко мне.
            <p>- Мышка даже не попыталась сбежать. 
            <p>Следом за ним в помещение вошла еще одна фигура. На вид довольно высокий мужчина, лицо скрыто за маской.
            `,background:"Persons/Monster",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[126].Begin()}]}),Game.Scenes.PN[119]=new Scene({text:`
            “Нет… кто-нибудь обязательно спасет меня. Ведь есть же люди, которым Катарина дорога… Я выживу!” 
            <p>Минуты длились бесконечно. Мне было холодно, страшно. В голову стали закрадываться самые ужасные мысли…
            <p>До этого момента я была уверена, что это легкая игра, где я буду несомненным победителем. Но мне и представить было трудно, какой ценой я получу заветный выигрыш. А получится ли у меня? 
            `,background:"Backgrounds/Chair",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[120].Begin()}]}),Game.Scenes.PN[120]=new Scene({text:`
            В тяжелые моменты я думала о близких. 
            О родителях, которые, несомненно пришли бы мне на помощь, спасли бы меня, укутали в одеяло и дали бы по заслугам той твари, что сотворила со мной такое. 
            <p>Думала о:
            `,background:"Backgrounds/Chair",buttontext:["\u041B\u0435\u043E\u043D\u0435","\u041D\u044D\u0439\u0442\u0430\u043D\u0435","\u041F\u043E\u0434\u0440\u0443\u0433\u0430\u0445","\u0421\u043E\u0431\u0440\u0430\u0442\u044C\u0441\u044F \u0441 \u043C\u044B\u0441\u043B\u044F\u043C\u0438"],buttonactive:[!0,!0,!0,!1],buttonaction:[()=>{Game.Scenes.PN[121].Deactivate(0),Game.Scenes.PN[122].Deactivate(0),Game.Scenes.PN[123].Deactivate(0),Game.Scenes.PN[121].Begin()},()=>{Game.Scenes.PN[121].Deactivate(1),Game.Scenes.PN[122].Deactivate(1),Game.Scenes.PN[123].Deactivate(1),Game.Scenes.PN[122].Begin()},()=>{Game.Scenes.PN[121].Deactivate(2),Game.Scenes.PN[122].Deactivate(2),Game.Scenes.PN[123].Deactivate(2),Game.Scenes.PN[123].Begin()},()=>{Game.Scenes.PN[124].Begin()}],condition:function(){Game.Scenes.PN[121].Activate(0),Game.Scenes.PN[122].Activate(0),Game.Scenes.PN[123].Activate(0),Game.Scenes.PN[121].Activate(1),Game.Scenes.PN[122].Activate(1),Game.Scenes.PN[123].Activate(1),Game.Scenes.PN[121].Activate(2),Game.Scenes.PN[122].Activate(2),Game.Scenes.PN[123].Activate(2),this.buttonactive[3]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2])}}),Game.Scenes.PN[121]=new Scene({text:`
            Почему-то представив его в форме полицейского, я ясно видела, как он вооружившись пистолетом убил бы наповал монстра. Затем обеспокоенно осматривал меня с ног до головы, приговаривая: 
            <p>- Я опоздал, прости. 
            <p>Аккуратно поднял бы меня на руки и благополучно спас. 
            `,background:"",buttontext:["\u041B\u0435\u043E\u043D\u0435","\u041D\u044D\u0439\u0442\u0430\u043D\u0435","\u041F\u043E\u0434\u0440\u0443\u0433\u0430\u0445","\u0421\u043E\u0431\u0440\u0430\u0442\u044C\u0441\u044F \u0441 \u043C\u044B\u0441\u043B\u044F\u043C\u0438"],buttonactive:[!0,!0,!0,!1],buttonaction:[()=>{Game.Scenes.PN[121].Deactivate(0),Game.Scenes.PN[122].Deactivate(0),Game.Scenes.PN[123].Deactivate(0),Game.Scenes.PN[121].Begin()},()=>{Game.Scenes.PN[121].Deactivate(1),Game.Scenes.PN[122].Deactivate(1),Game.Scenes.PN[123].Deactivate(1),Game.Scenes.PN[122].Begin()},()=>{Game.Scenes.PN[121].Deactivate(2),Game.Scenes.PN[122].Deactivate(2),Game.Scenes.PN[123].Deactivate(2),Game.Scenes.PN[123].Begin()},()=>{Game.Scenes.PN[124].Begin()}],condition:function(){this.buttonactive[3]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2])}}),Game.Scenes.PN[122]=new Scene({text:`
            Профессор поднял бы весь город на уши, созвал всех полицейских и они бы вместе ворвались меня спасать. Он сильно испугался за меня, поэтому был не в состоянии проронить хоть слово. 
            <p>Аккуратно взяв меня под руку, мы бы выбрались из этого логова. 
            `,background:"",buttontext:["\u041B\u0435\u043E\u043D\u0435","\u041D\u044D\u0439\u0442\u0430\u043D\u0435","\u041F\u043E\u0434\u0440\u0443\u0433\u0430\u0445","\u0421\u043E\u0431\u0440\u0430\u0442\u044C\u0441\u044F \u0441 \u043C\u044B\u0441\u043B\u044F\u043C\u0438"],buttonactive:[!0,!0,!0,!1],buttonaction:[()=>{Game.Scenes.PN[121].Deactivate(0),Game.Scenes.PN[122].Deactivate(0),Game.Scenes.PN[123].Deactivate(0),Game.Scenes.PN[121].Begin()},()=>{Game.Scenes.PN[121].Deactivate(1),Game.Scenes.PN[122].Deactivate(1),Game.Scenes.PN[123].Deactivate(1),Game.Scenes.PN[122].Begin()},()=>{Game.Scenes.PN[121].Deactivate(2),Game.Scenes.PN[122].Deactivate(2),Game.Scenes.PN[123].Deactivate(2),Game.Scenes.PN[123].Begin()},()=>{Game.Scenes.PN[124].Begin()}],condition:function(){this.buttonactive[3]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2])}}),Game.Scenes.PN[123]=new Scene({text:`
            Шерил и Скарлетт были бы как секретные агенты, которые тайно работали на правительство и смогли узнать мое местоположение. 
            <p>Шерил предпочитала огнестрельное оружие, Скарлет же охотно использовала холодное. Они бы выбили эту злосчастную дверь, убили вы всех монстров и вместе вытащили меня из этого кошмара. 
            `,background:"",buttontext:["\u041B\u0435\u043E\u043D\u0435","\u041D\u044D\u0439\u0442\u0430\u043D\u0435","\u041F\u043E\u0434\u0440\u0443\u0433\u0430\u0445","\u0421\u043E\u0431\u0440\u0430\u0442\u044C\u0441\u044F \u0441 \u043C\u044B\u0441\u043B\u044F\u043C\u0438"],buttonactive:[!0,!0,!0,!1],buttonaction:[()=>{Game.Scenes.PN[121].Deactivate(0),Game.Scenes.PN[122].Deactivate(0),Game.Scenes.PN[123].Deactivate(0),Game.Scenes.PN[121].Begin()},()=>{Game.Scenes.PN[121].Deactivate(1),Game.Scenes.PN[122].Deactivate(1),Game.Scenes.PN[123].Deactivate(1),Game.Scenes.PN[122].Begin()},()=>{Game.Scenes.PN[121].Deactivate(2),Game.Scenes.PN[122].Deactivate(2),Game.Scenes.PN[123].Deactivate(2),Game.Scenes.PN[123].Begin()},()=>{Game.Scenes.PN[124].Begin()}],condition:function(){this.buttonactive[3]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2])}}),Game.Scenes.PN[124]=new Scene({text:`
            “Хоть книгу пиши… Что за фантазии, $Имя Игрока$?”
            <p>Однако реальность была слишком сурова и пуста. Пока не послышался звук открывание двери, я все еще витала в своем мире грез. 
            `,background:"Backgrounds/Chair",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[125].Begin()}]}),Game.Scenes.PN[125]=new Scene({text:`
            Монстр вошел не спеша и удовлетворительно кивнул, проговорив: 
            <p>- Мышка даже не попыталась сбежать. 
            <p>Через некоторое время в помещение вошла еще одна фигура. На вид довольно высокий мужчина, лицо скрыто за маской.
            `,background:"Persons/Monster",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[126].Begin()}]}),Game.Scenes.PN[126]=new Scene({text:`
            Мужчина опустился на колени передо мной и проговорил:
            <p>- Милая, мне жаль, что так вышло, но это лишь процесс воспитания, - 
            его рука прошлась по моим волосам, холодные губы коснулись моей горячей щеки. - Ты не представляешь, как долго я ждал нашей встречи. 
            `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[127].Begin()}],condition:function(){Game.Achievements.EvilBeauty.Unlock()}}),Game.Scenes.PN[127]=new Scene({text:`
            Я с ужасом попыталась отстраниться, но незнакомец сильно сжал мой подбородок, заставляя всматриваться в его глаза. 
            <p>- Подготовь пробирку, чудик, - он обращался к монстру. - Знаю, к тебе относятся ужасно, но так надо... Иначе ты не научишься покоряться. 
            `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[128].Begin()}],condition:function(){1<=Game.Stats.BrokenHand.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.PN[129].Begin()})}}),Game.Scenes.PN[128]=new Scene({text:`
            Я ощущала, что все еще могу бросить вызов этой твари. Я могу узнать у него хоть какую-нибудь информацию. 
            <p>- Что во мне особенного? 
            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[130].Begin()}]}),Game.Scenes.PN[129]=new Scene({text:`
            Мне было нестерпимо больно, все вокруг пульсировало, я не могла сосредоточиться. Но даже так, я должна задать вопрос этой твари. Пусть видит, что я все еще что-то могу. 
            <p>- Что во мне особенного? 
            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[130].Begin()}]}),Game.Scenes.PN[130]=new Scene({text:`
            Мужчина удивился и принялся рассматривать меня. 
            <p>- Значит, ты все еще можешь говорить и не боишься? А я тебя, похоже, недооценил. 
            <p>- Скажи… 
            <p>- Тихо, - он приложил палец к моим губам. - А если я отвечу, что ты очень ценный объект. Тебя устроит такое положение вещей? 
            Ты особенная. Разве не об этом мечтает каждая девушка? Но я бы соврал, если бы не назвал еще одну причину. Ты просто нравишься мне, Катарина. 
            `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[131].Begin()}]}),Game.Scenes.PN[131]=new Scene({text:`
            Я не могла понять, шутит он или издевается? 
            <p>Мужчина подошел к столу и взял оттуда шприц, который без слов воткнул мне в руку, набирая кровь.
            <p>- Зачем? Что это? - я говорила из последних сил. 
            <p>- Вопросы, снова вопросы. Конечно же мы ставим на тебе эксперименты. В чем твоя ценность? Оставляю тебе пищу для размышлений... 
            `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[132].Begin()}]}),Game.Scenes.PN[132]=new Scene({text:`
            Но вдруг послышался оглушительный взрыв, который поднял клубы дыма и пыли, заполняя все помещение. 
            <p>- О, - незнакомец, казалось, был опечален. - Как быстро они нашли нас, не ожидал… Что ж, Катарина, в следующий раз  я подготовлюсь лучше, будет ещё интереснее…
            <p>Он подошел вплотную и жадно впился в мои губы. 
            `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[133].Begin()}]}),Game.Scenes.PN[133]=new Scene({text:`
            - Ты не представляешь, какое удовольствие я ощущаю, гоняясь за тобой, - он помахал наполненной пробиркой перед моими глазами. - И, да. Меня зовут Александр. Если теория подтвердится, мы скоро встретимся, милая моя. 
            <p>Мужчина подозвал монстра и они вместе сбежали в коридоры подземелья. 
            `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.PN[134].Begin(),Game.Achievements.Storm.Unlock()}],condition:function(){Game.Stats.Antagonist.Add(0)}}),Game.Scenes.PN[134]=new Scene({text:`
            Усталость, злость, негодование. Я чувствовала себя использованной и разбитой. Когда в помещение вошло много людей, у меня даже не оказалось сил взглянуть на них. 
            <p>Один из спасителей подошел и заключил меня в трепетные объятия. 
            <p>- Я рядом, это все закончилось, слышишь? - он гладил меня по голове. - Ты в безопасности, Катарина. 
            `,background:"",buttontext:[""],buttonaction:[()=>{setTimeout(()=>{Game.Scenes.FC[0].Begin()},1e3),Game.LoadScreen("FP"),Game.Effects.Gray.Stop(),Game.Stats.Knife.Add(-1),Game.Progress.Save("FP")}]}),Game.Scenes.FC=[],Game.Scenes.FC[0]=new Scene({text:`
    - Она в порядке, доктор? - произнес взволнованный мужской голос. 
    <p>- Да, сэр. Мы сделали все, что могли. Ее жизни больше ничего не угрожает. 
    <p>- Благодарю вас! 
            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[1].Begin(),Game.Message("<em>\u041D\u044C\u044E-\u0419\u043E\u0440\u043A 1885 \u0433\u043E\u0434")}],condition:()=>{Game.Sounds.Play("Music","Doctor")}}),Game.Scenes.FC[1]=new Scene({text:`
    Послышалось хлопанье двери, а затем я почувствовала легкое прикосновение. Кто-то нежно проводил пальцами по ладони вверх-вниз. Эти осторожные движения успокаивали.  
    <p>Мне не терпелось открыть глаза, чтобы разузнать о произошедшем. 
    <p>“Наверное, это мой спаситель?”
    <p>Приложив большие усилия, я наконец смогла прийти в себя и увидеть окружение. 
            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[2].Begin(),Game.Effects.Flash()}]}),Game.Scenes.FC[2]=new Scene({text:`
    Яркие светлые стены, жесткая кушетка и размытый силуэт. Увидев, что я очнулась, мужской голос проговорил:
    <p>- Катарина, ты меня слышишь? 
    <p>“Слышу.” 
    <p>Тишина. Меня словно парализовало от всего ранее пережитого. Захотелось перевернуться, но тело отказывалось подчиняться мне.  
            `,background:"Backgrounds/Doctors_office",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[4].Begin()}],condition:function(){1<=Game.Stats.BrokenHand.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[3].Begin()})}}),Game.Scenes.FC[3]=new Scene({text:`
    - Катарина, лежи спокойно, - незнакомец аккуратно придержал меня за плечо. - Ты серьезно ранена, твоя рука… 
    <p>В его голосе слышались нотки сожаления. Мне было неизвестно, кто передо мной, но я ощущала, что этот человек был искренен в своих переживаниях.
    <p>Я почувствовала, как незнакомец сильнее надавил на мое плечо, а затем сменил тон на более агрессивный: 
    <p>- Я убью этих тварей, чего бы мне этого не стоило. Они ответят за содеянное.
            `,background:"Backgrounds/Doctors_office",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[5].Begin()}]}),Game.Scenes.FC[4]=new Scene({text:`
    - Катарина, осторожнее, - его рука аккуратно легла мне на плечо. - Ты еще недостаточно окрепла. 
    <p>В его голосе слышались нотки сожаления. Мне было неизвестно, кто передо мной, но ощущала, что этот человек был искренен в своих переживаниях.
    <p>Я почувствовала, как незнакомец сильнее надавил на мое плечо, а затем сменил тон на более агрессивный: 
    <p>- Они ответят за содеянное. Прости, что не смог тебя защитить. 
            `,background:"Backgrounds/Doctors_office",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[5].Begin()}]}),Game.Scenes.FC[5]=new Scene({text:`
    Я все же нашла в себе силы сфокусироваться и рассмотреть собеседника. 
            `,background:"Backgrounds/Doctors_office",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[6].Begin()}]}),Game.Scenes.FC[6]=new Scene({text:`
    Светло-каштановые волосы до плеч. Голубые глаза. Мужчина выглядел статно, в нем легко можно было распознать аристократа. 
    <p>Его правую щеку украшало несколько шрамов. Они никак не влияли на его общий презентабельный вид, а, напротив, лишь подчеркивали его мужественность и готовность встретиться лицом к лицом с опасностью. 
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[7].Begin()}]}),Game.Scenes.FC[7]=new Scene({text:`
    Интересно, откуда они у него. Когда-нибудь обязательно поинтересуюсь, а сейчас время поговорить о насущных делах.
            `,background:"Persons/Robert",buttontext:["\u041A\u0442\u043E \u0442\u044B \u0442\u0430\u043A\u043E\u0439?","\u0427\u0442\u043E \u044D\u0442\u043E \u0437\u0430 \u0442\u0432\u0430\u0440\u0438?","\u0413\u0434\u0435 \u041D\u0438\u043A\u043E\u043B\u0430?","\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433"],buttonactive:[!0,!0,!0,!1],buttonaction:[()=>{Game.Scenes.FC[9].Deactivate(0),Game.Scenes.FC[11].Deactivate(0),Game.Scenes.FC[13].Deactivate(0),Game.Scenes.FC[8].Begin()},()=>{Game.Scenes.FC[9].Deactivate(1),Game.Scenes.FC[11].Deactivate(1),Game.Scenes.FC[13].Deactivate(1),Game.Scenes.FC[10].Begin()},()=>{Game.Scenes.FC[9].Deactivate(2),Game.Scenes.FC[11].Deactivate(2),Game.Scenes.FC[13].Deactivate(2),Game.Scenes.FC[12].Begin()},()=>{Game.Scenes.FC[14].Begin()}],condition:function(){Game.Scenes.FC[9].Activate(0),Game.Scenes.FC[11].Activate(0),Game.Scenes.FC[13].Activate(0),Game.Scenes.FC[9].Activate(1),Game.Scenes.FC[11].Activate(1),Game.Scenes.FC[13].Activate(1),Game.Scenes.FC[9].Activate(2),Game.Scenes.FC[11].Activate(2),Game.Scenes.FC[13].Activate(2),this.buttonactive[3]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2])}}),Game.Scenes.FC[8]=new Scene({text:`
    Вопрос сильно смутил незнакомца. 
    <p>- Доктор предупреждал, что из-за сильного стресса может возникнуть проблема с памятью, - мужчина с грустью глядел на меня своими зелеными глазами. - Я - Роберт, Катарина. Твой муж.
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[9].Begin()}]}),Game.Scenes.FC[9]=new Scene({text:`
    “Муж? Никола упоминал об этом человеке?… Не могу вспомнить…”
    <p>В любом случае эта новость звучала крайне неожиданно. Оказывается, в этом мире у Катарины есть любимый человек. 
    <p>- Прости, - я говорила очень тихо. - Все, правда, как в тумане. 
    <p>Роберт понимающе кивнул.
            `,background:"Persons/Robert",buttontext:["\u041A\u0442\u043E \u0442\u044B \u0442\u0430\u043A\u043E\u0439?","\u0427\u0442\u043E \u044D\u0442\u043E \u0437\u0430 \u0442\u0432\u0430\u0440\u0438?","\u0413\u0434\u0435 \u041D\u0438\u043A\u043E\u043B\u0430?","\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433"],buttonactive:[!0,!0,!0,!1],buttonaction:[()=>{Game.Scenes.FC[9].Deactivate(0),Game.Scenes.FC[11].Deactivate(0),Game.Scenes.FC[13].Deactivate(0),Game.Scenes.FC[8].Begin()},()=>{Game.Scenes.FC[9].Deactivate(1),Game.Scenes.FC[11].Deactivate(1),Game.Scenes.FC[13].Deactivate(1),Game.Scenes.FC[10].Begin()},()=>{Game.Scenes.FC[9].Deactivate(2),Game.Scenes.FC[11].Deactivate(2),Game.Scenes.FC[13].Deactivate(2),Game.Scenes.FC[12].Begin()},()=>{Game.Scenes.FC[14].Begin()}],condition:function(){this.buttonactive[3]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2])}}),Game.Scenes.FC[10]=new Scene({text:`
    Он вздохнул и ответил: 
    <p>- Нам лучше поговорить об этом в более приватной обстановке. Когда вокруг не будет “лишних ушей”. Да и тебе стоит отдохнуть, ты еще не до конца оправилась.
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[11].Begin()}]}),Game.Scenes.FC[11]=new Scene({text:`
    Мужчина выглядел серьезно, поэтому я решила не спорить. К тому же, с моей стороны действительно было опрометчиво расспрашивать о подобных темах в общественном месте.
            `,background:"Persons/Robert",buttontext:["\u041A\u0442\u043E \u0442\u044B \u0442\u0430\u043A\u043E\u0439?","\u0427\u0442\u043E \u044D\u0442\u043E \u0437\u0430 \u0442\u0432\u0430\u0440\u0438?","\u0413\u0434\u0435 \u041D\u0438\u043A\u043E\u043B\u0430?","\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433"],buttonactive:[!0,!0,!0,!1],buttonaction:[()=>{Game.Scenes.FC[9].Deactivate(0),Game.Scenes.FC[11].Deactivate(0),Game.Scenes.FC[13].Deactivate(0),Game.Scenes.FC[8].Begin()},()=>{Game.Scenes.FC[9].Deactivate(1),Game.Scenes.FC[11].Deactivate(1),Game.Scenes.FC[13].Deactivate(1),Game.Scenes.FC[10].Begin()},()=>{Game.Scenes.FC[9].Deactivate(2),Game.Scenes.FC[11].Deactivate(2),Game.Scenes.FC[13].Deactivate(2),Game.Scenes.FC[12].Begin()},()=>{Game.Scenes.FC[14].Begin()}],condition:function(){this.buttonactive[3]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2])}}),Game.Scenes.FC[12]=new Scene({text:`
    - Дома, отдыхает. 
    <p>- Мы с ним вроде бы виделись, он не пострадал? 
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[13].Begin()}]}),Game.Scenes.FC[13]=new Scene({text:`
    - Он, как и ты, не в лучшем состоянии. Дело может быть не только во влиянии стресса. 
    Не исключено, что эти твари могли что-то сделать с вами. Я предупреждал тебя ранее о такой вероятности. Но доподлинно нам неизвестно. 
    <p>“Катарина знала об этом? Ничего не понимаю.” 
            `,background:"Persons/Robert",buttontext:["\u041A\u0442\u043E \u0442\u044B \u0442\u0430\u043A\u043E\u0439?","\u0427\u0442\u043E \u044D\u0442\u043E \u0437\u0430 \u0442\u0432\u0430\u0440\u0438?","\u0413\u0434\u0435 \u041D\u0438\u043A\u043E\u043B\u0430?","\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433"],buttonactive:[!0,!0,!0,!1],buttonaction:[()=>{Game.Scenes.FC[9].Deactivate(0),Game.Scenes.FC[11].Deactivate(0),Game.Scenes.FC[13].Deactivate(0),Game.Scenes.FC[8].Begin()},()=>{Game.Scenes.FC[9].Deactivate(1),Game.Scenes.FC[11].Deactivate(1),Game.Scenes.FC[13].Deactivate(1),Game.Scenes.FC[10].Begin()},()=>{Game.Scenes.FC[9].Deactivate(2),Game.Scenes.FC[11].Deactivate(2),Game.Scenes.FC[13].Deactivate(2),Game.Scenes.FC[12].Begin()},()=>{Game.Scenes.FC[14].Begin()}],condition:function(){this.buttonactive[3]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2])}}),Game.Scenes.FC[14]=new Scene({text:`
    От новой информации голова готова была взорваться. 
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[18].Begin()}],condition:function(){1<=Game.Stats.BrokenHand.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[15].Begin()})}}),Game.Scenes.FC[15]=new Scene({text:`
    Однако, меня волновал еще один вопрос. 
    <p>- Роберт, а что врачи говорили о моей руке?
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[16].Begin()}]}),Game.Scenes.FC[16]=new Scene({text:`
    - Доктор сказал, что у тебя нарушение целостности локтевой кости, поперечный перелом. Тебе повезло, что нет осколков.
    Поэтому достаточно было наложить фиксирующую повязку. С помощью специальной жидкости твою руку зафиксировали до полного выздоровления. 
    <p>- И сколько времени это займет? 
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[17].Begin()}]}),Game.Scenes.FC[17]=new Scene({text:`
    - Около 2-х месяцев. У всех по-разному. 
    <p>“Бедная Катарина… И ведь это именно мои действия привели к этому.”
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[18].Begin()}]}),Game.Scenes.FC[18]=new Scene({text:`
    После моих вопросов наступила неловкая тишина. Я не знала, что на данный момент могу еще узнать, поэтому для начала решила обдумать все ранее сказанное. Отвернув голову в сторону, я закрыла глаза и попыталась собраться с мыслями. 
    <p>Роберт еще немного посидел со мной, но вскоре ушел. Для него жизнь шла своим размеренным ходом, мне же предстояло долгое лечение.
            `,background:"Backgrounds/Doctors_office",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[19].Begin()}]}),Game.Scenes.FC[19]=new Scene({text:`
    Так прошло несколько дней моего пребывания в больнице. Меня не покидала надежда  в скором времени вернуться в свой мир, однако я все еще была непрошенным гостем эпохи Теслы. 
    <p>Разбитая, поломанная. От отчаяния хотелось выть, сбежать - все, лишь бы не видеть эти белые стены.
            `,background:"Backgrounds/Doctors_office",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[20].Begin()}]}),Game.Scenes.FC[20]=new Scene({text:`
    Были и позитивные моменты. К примеру, меня часто навещал Роберт. С цветами, радушной улыбкой. Мы не особо разговаривали, но я видела его стремление поддержать меня в трудный момент.
    <p>Даже Тесла приходил ко мне. В один из дней он сказал: 
            `,background:"Backgrounds/Doctors_office",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[25].Begin()}],condition:function(){1<=Game.Stats.Nicola.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[21].Begin()}),0>=Game.Stats.Nicola.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[25].Begin()})}}),Game.Scenes.FC[21]=new Scene({text:`
    - Катарина, я хотел подарить тебе кое-что, в качестве извинений, и моей искренней признательности нашей дружбы. 
    <p>Он протянул мне небольшой серебрянный крестик с длинной цепочкой.
            `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[22].Begin()}]}),Game.Scenes.FC[22]=new Scene({text:`
    - Никола, я не могу принять…
    <p>- Брось, просто возьми, без лишних слов, - он не спеша вложил в мою ладонь вещицу и положил свою руку поверх моей. - Пусть он защитит тебя.  
    <p>- Спасибо, Никола, я буду беречь это.
            `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[201].Begin(),Game.Message("\u0411\u043B\u0430\u0433\u043E\u0434\u0430\u0440\u044F \u0445\u043E\u0440\u043E\u0448\u0438\u043C \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F\u043C \u0441 \u0422\u0435\u0441\u043B\u043E\u0439, \u0432\u044B \u0443\u0437\u043D\u0430\u0435\u0442\u0435 \u0435\u0433\u043E \u0432\u0441\u0435 \u043B\u0443\u0447\u0448\u0435."),Game.Stats.Golden_Cross.Add(1),Game.Achievements.Golden_Cross.Unlock()}]}),Game.Scenes.FC[201]=new Scene({text:`
    Он улыбнулся и произнес: 
    <p>- Я надеюсь, что тебе, как и мне однажды, Бог покажет нужные знаки. Но не забывай, что нас лишь направляют, все остальное зависит от тебя. Ты находишь свой путь, но не забываешь наставлений Всевышнего. 
    <p>“Все это довольно неожиданно и немного странно… Но его семья… я читала про их набожность.” 
            `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[25].Begin()}],condition:function(){2<=Game.Stats.Nicola.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[23].Begin()})}}),Game.Scenes.FC[23]=new Scene({text:`
    - Я бы также хотел выразить тебе признательность за интерес к моим трудам и исследованиям. И чтобы тебе не было скучно, я принес несколько своих дневников с любопытными заметками. Надеюсь, ты оценишь. 
    <p>- Я с удовольствием!
            `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[24].Begin(),Game.Message("\u0412\u0430\u0448\u0438 \u0437\u043D\u0430\u043D\u0438\u044F \u043A\u0440\u0435\u043F\u0447\u0430\u044E\u0442."),4>=Game.Stats.Study.Get()&&Game.Stats.Study.Add(1)}]}),Game.Scenes.FC[24]=new Scene({text:`
    Никола вручил мне свои записи. 
    <p>“Не верю своим глазам, это результат моих выборов? Его доверие?”
            `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[25].Begin()}]}),Game.Scenes.FC[25]=new Scene({text:`
    - Катарина, еще раз прости меня, все произошло так стремительно, - Никола выглядел поникшим. - Проклятье, куда катится наш мир…
            `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[26].Begin()}]}),Game.Scenes.FC[26]=new Scene({text:`
    Он часто извинялся, практически в каждый свой визит. Мне же оставалось лишь натягивать улыбку, чтобы успокаивать его. В конце концов, здесь действительно нет его вины. Если уж и стоит винить кого-то, то только меня.
            `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[27].Begin()}]}),Game.Scenes.FC[27]=new Scene({text:`
    Прошла еще неделя. Долгая. Мучительная. Я не понимала, почему не могу вернуться в свой мир: к своим друзьям, к своей семье. 
    Я была готова даже стать самой прилежной ученицей, слушать нотации профессора Нэйтана, лишь бы ни секунды больше не проводить здесь, во всей этой гнетущей обстановке.
            `,background:"Backgrounds/Doctors_office",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[28].Begin()}]}),Game.Scenes.FC[28]=new Scene({text:`
    В отчаянии я попросила Роберта как-нибудь уговорить врачей на продолжение лечения дома. Когда он вернулся, на следующий день, я уже сидела на кушетке в ожидании заветных слов.
            `,background:"Backgrounds/Doctors_office",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[29].Begin()}]}),Game.Scenes.FC[29]=new Scene({text:`
    - По твоей просьбе я убедил доктора выписать тебя раньше назначенного срока. Но он взял с меня слово, что я прослежу за тем, чтобы ты соблюдала режим и не забывала принимать лекарства. Поедем в нашу квартиру и спокойно поговорим. 
    <p>Я благодарно кивнула.
    <p>“Не верю, что это наконец-то закончилось…”
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[30].Begin()}]}),Game.Scenes.FC[30]=new Scene({text:`
   Вещей у меня с собой особо не было, поэтому собралась я довольно быстро. Роберт взял меня под руку и мы медленно вышли из здания.
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[31].Begin()}]}),Game.Scenes.FC[31]=new Scene({text:`
   Солнце слепило, а свежий воздух дурманил разум. 
   <p>Нас уже ожидал небольшой экипаж и не слишком терпеливый кучер. Когда мы сели внутрь, я по-настоящему расслабилась, радуясь, что мне удалось сменить обстановку.
   <p>“Хоть так. Раз не могу вернуться, то хотя бы больше не буду чувствовать запах лекарств, слушать злобных медсестер…”
            `,background:"Backgrounds/Carete",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[32].Begin()}]}),Game.Scenes.FC[32]=new Scene({text:`
   Транспорт медленно тронулся, однако из-за небольшой тряски и нестабильного самочувствия, я вдруг ощутила характерную сонливость. 
    <p>Я:
            `,background:"Backgrounds/Carete",buttontext:["\u041E\u0431\u043B\u043E\u043A\u043E\u0442\u0438\u043B\u0430\u0441\u044C \u043D\u0430 \u043E\u043A\u043D\u043E","\u041E\u0431\u043B\u043E\u043A\u043E\u0442\u0438\u043B\u0430\u0441\u044C \u043D\u0430 \u043F\u043B\u0435\u0447\u043E \u0420\u043E\u0431\u0435\u0440\u0442\u0430"],buttonaction:[()=>{Game.Scenes.FC[33].Begin()},()=>{Game.Scenes.FC[35].Begin()}]}),Game.Scenes.FC[33]=new Scene({text:`
   Положив голову на прохладное стекло, мне удалось немного вздремнуть. Погружаясь в сон, я взглянула на Роберта. Мужчина сидел, закинув ногу на ногу, читал газету и не беспокоил меня.
            `,background:"Backgrounds/Carete",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[34].Begin()}]}),Game.Scenes.FC[34]=new Scene({text:`
   Сны были очень тревожными. Ранее пережитое потрясение преследовало меня и уже глубоко проникло в самые недра подсознания. Каждый раз закрывая глаза, мне казалось, что я вновь попаду в этот темный подвал и на этот раз мне никто не поможет.
            `,background:"Backgrounds/Carete",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[39].Begin()}]}),Game.Scenes.FC[35]=new Scene({text:`
   Мне хотелось почувствовать себя защищенной. Я была уверена, что мужчина не будет против. Мы женаты, а значит такая близость для нас должна быть в порядке вещей. 
   <p>Роберт не удивился, напротив, он слегка улыбнулся, будто бы давно ожидая этого жеста от меня.
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[36].Begin()}]}),Game.Scenes.FC[36]=new Scene({text:`
    Он положил руку мне на талию, не отвлекаясь от чтения утренней газеты. Его объятие было довольно сухим, но тем не менее, рядом с ним я чувствовала себя спокойно. 
    <p>Я не надевала “розовые очки”, ведь складывалось ощущение, что все эти прикосновения он делал машинально, не вкладывая особый смысл. 
    <p>“Какие же отношения связывают их с Катариной?”
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[37].Begin()}]}),Game.Scenes.FC[37]=new Scene({text:`
    Роберт был погружен в себя.
    <p>У меня промелькнула мысль: а что если он чувствует вину за произошедшее? Что если во время со своих визитов или сейчас, мужчина просто делает то, что должен?
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[38].Begin(),Game.Message("\u0420\u043E\u0431\u0435\u0440\u0442 \u0432\u0441\u0435\u0433\u0434\u0430 \u0432\u0430\u0441 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0442"),Game.Stats.Robert.attitude+=1}]}),Game.Scenes.FC[38]=new Scene({text:`
    Мысли роились у меня в голове. К этому прибавились беспокойные сны, напоминающие мне о недавнем похищении. Однако присутствие Роберта не дало мне окончательно погрузиться в тот самый пережитый ужас. Остаток пути прошел в относительном спокойствии.
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[39].Begin()}]}),Game.Scenes.FC[39]=new Scene({text:`
    Я не следила за временем и понятия не имела сколько мы уже находимся в пути. Едва проснувшись, я попыталась разглядеть новые для меня здания и людей. Любопытство играло во мне, однако организм продолжал стоять на своем и меня клонило в сон.
            `,background:"Backgrounds/Carete",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[40].Begin()}]}),Game.Scenes.FC[40]=new Scene({text:`
    Вскоре экипаж остановился. Я самостоятельно попыталась встать, но Роберт остановил меня. Он подал мне руку и помог выбраться из транспорта. Всю дорогу к дому мой супруг не отпускал меня, помогая держать равновесие. Так, мы медленными шажками стали подниматься в квартиру.
            `,background:"Backgrounds/Carete",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[41].Begin()}]}),Game.Scenes.FC[41]=new Scene({text:`
    Мы вошли в светлую и просторную гостинную. Без сомнения это была богато обставленная квартира, однако в ней не нашлось места излишнему пафосу вроде выставления различных золотых предметов на видные места с целью показать свой высокий статус.
    <p>“Все белое и уютное… Ощущение, что это не особо вяжется с образом Роберта. Катарина постаралась?”
            `,background:"Backgrounds/Katarina_Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[42].Begin()}]}),Game.Scenes.FC[42]=new Scene({text:`
    Роберт усадил меня на диван и принес согревающий напиток. Сев рядом, мужчина проговорил: 
    <p>- Ты что-нибудь вспомнила за то время, которое провела в больнице? 
    <p>Что мне было ответить? Ведь я действительно не знала ничего о Роберте или об этих монстрах. 
    <p>“Надо продолжать делать вид, что от шока я потеряла часть воспоминаний. Мне нужна эта информация, пусть расскажет мне все от начала до конца.”
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[43].Begin()}]}),Game.Scenes.FC[43]=new Scene({text:`
    - Нет, я ничего не помню. Объясни мне пожалуйста, что здесь происходит. 
    <p>Роберт долго собирался с мыслями, а затем вздохнув, проговорил:
    <p>- Тебя зовут Катарина, ты моя, скажем так, ненастоящая жена. Увлекаешься театральным искусством…
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[44].Begin()}]}),Game.Scenes.FC[44]=new Scene({text:`
    - Погоди что? - мне пришлось перебить собеседника, так как озвученная информация не укладывалась у меня в голове. - Что значит “ненастоящая”? 
    <p>- Мы заключили взаимовыгодный брак. Для поддержания социального статуса и отведения ненужных глаз, мы лишь играем роль супругов. 
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[45].Begin()}]}),Game.Scenes.FC[45]=new Scene({text:`
    - Но зачем…? - в голове будто бы сам собой пришел нужный ответ. 
    <p>Ты: 
            `,background:"Persons/Robert",buttontext:["\u0417\u0430\u043D\u0438\u043C\u0430\u0435\u0448\u044C\u0441\u044F \u043E\u043F\u0430\u0441\u043D\u044B\u043C \u0431\u0438\u0437\u043D\u0435\u0441\u043E\u043C","\u0412\u044B\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0435\u0448\u044C \u043C\u043E\u043D\u0441\u0442\u0440\u043E\u0432","\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u0448\u044C \u0432 \u043F\u043E\u043B\u0438\u0446\u0438\u0438"],buttonaction:[()=>{Game.Scenes.FC[46].Begin(),Game.Message("\u0412\u044B \u0441\u0434\u0435\u043B\u0430\u043B\u0438 \u043D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u043F\u0440\u0435\u0434\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435")},()=>{Game.Scenes.FC[47].Begin(),Game.Message("\u0412\u0430\u0448\u0435 \u043F\u0440\u0435\u0434\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043E\u043A\u0430\u0437\u0430\u043B\u043E\u0441\u044C \u0432\u0435\u0440\u043D\u044B\u043C"),Game.Stats.Robert.attitude+=1,Game.Achievements.Guessed.Unlock()},()=>{Game.Scenes.FC[48].Begin(),Game.Message("\u0412\u044B \u0441\u0434\u0435\u043B\u0430\u043B\u0438 \u043D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u043F\u0440\u0435\u0434\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435")}]}),Game.Scenes.FC[46]=new Scene({text:`
    - Наверняка твоя работа связана с криминалом. И чтобы не вызывать лишних подозрений у посторонних, ты играешь роль примерного мужа, так? 
    <p>- Не совсем, - Роберта, казалось, позабавил мой вывод.
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[49].Begin()}]}),Game.Scenes.FC[47]=new Scene({text:`
    “Это самый логичный вывод. Он ни разу не удивлялся, когда я упоминала существ, к тому же лично грозился разобраться с ними.”
    <p>- Ты убиваешь этих монстров, так? И чтобы не вызывать лишних подозрений у посторонних, ты играешь роль примерного мужа…
    <p>Роберт улыбнулся, утвердительно кивнув. 
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[49].Begin()}]}),Game.Scenes.FC[48]=new Scene({text:`
    - Наверняка ты какой-нибудь детектив, выслеживающий всяких мафиози. И чтобы не вызывать лишних подозрений у посторонних, ты играешь роль примерного мужа, так? 
    <p>- Не совсем, - Роберта, казалось, позабавил мой вывод.
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[49].Begin()}]}),Game.Scenes.FC[49]=new Scene({text:`
    - Я предпочитаю, чтобы меня называли охотником. Это слово максимально передает смысл моей деятельности. 
    <p>- Что им нужно? 
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[50].Begin()}]}),Game.Scenes.FC[50]=new Scene({text:`
    - Я не располагаю такими сведениями. Эта история, кажется, длится не одно столетие. Возможно, это как-то связано с их так называемой “матерью”. - Роберт погрузился в рассуждения. - Они могли произойти от нее. Но тогда каким образом? Или это некогда бывшие люди, которые подверглись опытам? Я пытаюсь это выяснить. 
    <p>“Ужасно… Я думала, такое может быть только в фильмах!”
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[51].Begin()}]}),Game.Scenes.FC[51]=new Scene({text:`
    - А при чем тут я? Им что-то нужно от тебя и они хотели использовать меня для того, чтобы ты был более сговорчивым? Хотя нет, - еще раз вспомнив произошедшее, я невольно вздрогнула. - Я кое-что припоминаю, мужчина, что был там. Он сказал, что им нужна моя кровь… и про восстановление своего рода они тоже упоминали. Я как-то связана с этим, Роберт?
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[52].Begin()}]}),Game.Scenes.FC[52]=new Scene({text:`
    Поведение Роберта заметно переменилось, он подошел ко мне почти вплотную и сказал: 
    <p>- Расскажи все, что помнишь!
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[53].Begin()}]}),Game.Scenes.FC[53]=new Scene({text:`
    Роберт незаметно для себя повысил голос, а его взгляд стал выражать неподдельный интерес к моим рассуждениям. Словно он вот-вот узнает ответ на давно мучавшие его вопросы. 
    <p>Я выложила все, что так долго пыталась забыть: шприц, монстр, загадочный человек, заточение. Страшные картинки снова замелькали, но я старалась держать себя в руках, ведь без этой информации мы не сможем продвинуться дальше в понимании сложившейся ситуации.
            `,background:"Backgrounds/Katarina_Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[210].Begin()}]}),Game.Scenes.FC[210]=new Scene({text:`
    Мужчина сидел некоторое время в тишине, видимо, обдумывая услышанное. Затем он встал, достал из шкафчика бутылку крепкого алкоголя и налил немного в два стакана. 
    <p>- Выпей - станет легче.
            `,background:"Backgrounds/Katarina_Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[53].Begin()}],condition:function(){1<=Game.Stats.DrinkAtParty.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[211].Begin()}),0>=Game.Stats.DrinkAtParty.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[212].Begin()})}}),Game.Scenes.FC[211]=new Scene({text:`
    - Спасибо, это действительно то, что мне нужно. 
    <p>Ничего подобного до этого я не пила. Напиток на вкус был обжигающим, с нотками карамели и каких-то трав. 
    <p>Я ощущала, как плохие мысли отступают.
       `,background:"Backgrounds/Katarina_Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[55].Begin()}]}),Game.Scenes.FC[212]=new Scene({text:`
    - Нет, спасибо, не думаю, что мне сейчас это нужно. 
    <p>- Как знаешь, а вот я выпью, - сказал Роберт и сделал приличный глоток напитка.
    <p>Мне было достаточно хорошей компании и минутной тишины. Я ощущала, как плохие мысли отступают. 
       `,background:"Backgrounds/Katarina_Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[55].Begin()}]}),Game.Scenes.FC[55]=new Scene({text:`
    После затяжной паузы я все же решила уточнить: 
    <p>- Так что, Роберт? Что все это значит? 
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[56].Begin()}]}),Game.Scenes.FC[56]=new Scene({text:`
    - До этого тебя тоже похищали, - мужчина залпом осушил стакан. - Но тогда ты совсем ничего не помнила. Я сразу же предположил, что эти твари догадались шантажировать меня таким образом. После твоего спасения, я строго-настрого запретил выходить куда-либо без сопровождения, поэтому в случае моего отсутствия, за тобой любезно согласился присмотреть Никола. 
    <p>- Но он не знал подробностей?
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[57].Begin()}]}),Game.Scenes.FC[57]=new Scene({text:`
   - Верно. Меньше знаешь, крепче спишь. 
    <p>- И что ты теперь думаешь? Про кровь, про этого человека?
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[58].Begin()}]}),Game.Scenes.FC[58]=new Scene({text:`
   - Ты вполне можешь являться важным звеном в этой цепочке, Катарина. Иначе я не могу придумать ни одной другой гипотезы, почему они так одержимы тобой, - он со всей серьезностью смотрел мне в глаза. - Если они сейчас так просто тебя отпустили, значит проверяют свою теорию. А тот человек - их лидер. Видел его пару раз. Мерзкий тип, умный. Так просто в ловушки не попадается. 
    <p>- Во что же я влипла…
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[59].Begin()}]}),Game.Scenes.FC[59]=new Scene({text:`
   Роберт сел передо мной на колени и сказал: 
    <p>- Ты никогда так серьезно не спрашивала об этом. Даже после того инцидента. Что изменилось? 
    <p>“Катарина не воспринимала это всерьез? Не понимаю. Ее жизнь висит на волоске, как можно быть такой беспечной.”
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[60].Begin()}]}),Game.Scenes.FC[60]=new Scene({text:`
   - Все зашло слишком далеко, под угрозой была моя жизнь. 
    <p>- Ты изначально знала, на что соглашаешься. Наш контракт. Я говорил об этом ранее. 
    <p>“Стоило лишь догадываться о подробностях. Все риски были обозначены. С моей стороны было глупостью давить на жалость. Но все-таки, мотивация Роберта на замужество мне понятна, но в чем же мотивация Катарины? Неужели она руководствовалась любовью?”
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[61].Begin()}]}),Game.Scenes.FC[61]=new Scene({text:`
    - Ты прав, - я покорно приняла ситуацию. 
    <p>Роберт перевел взгляд на часы, встал и стал собирать некоторые вещи.  
    <p>- Мне пора на встречу, будь здесь и отдыхай. 
    `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[62].Begin()}]}),Game.Scenes.FC[62]=new Scene({text:`
    Мне совершенно не хотелось оставаться сейчас одной. Особенно после всего этого неприятного разговора. Поэтому я набралась смелости и спросила: 
    <p>- А ты не можешь перенести встречу? 
    <p>Роберт был удивлен моему вопросу. Видимо, до этого Катарина молча соглашалась с его постоянными разъездами и своим одиночеством.
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[65].Begin()}]}),Game.Scenes.FC[65]=new Scene({text:`
    - Нет. Мне нужно увидеться с братом. Это слишком важно, - мужчина даже не смотрел на меня, а просто суетился около входной двери. 
    <p>От его заботливости будто бы ни осталось и следа. 
    <p>“Так это и есть настоящий Роберт? Холодный, отстраненный, сосредоточенный лишь на своей работе?”
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[66].Begin()}],condition:function(){1<=Game.Stats.TryToEscape.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[66].Begin()}),0>=Game.Stats.TryToEscape.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[69].Begin()})}}),Game.Scenes.FC[66]=new Scene({text:`
    - Кстати, - он остановился перед выходом. - Я нашел это на полу рядом с тобой, может, он твой, не знаю. Решай сама. 
    <p>Мужчина протянул мне тот самый нож, который служил мне защитой от монстра. 
    <p>“Эта вещь напоминание о том, что было. Нужен ли он мне?”
    <p>Я: 
       `,background:"Backgrounds/Katarina_Room",buttontext:["\u041E\u0441\u0442\u0430\u0432\u0438\u043B\u0430 \u043D\u043E\u0436","\u0412\u044B\u0431\u0440\u043E\u0441\u0438\u043B\u0430 \u043D\u043E\u0436"],buttonaction:[()=>{Game.Scenes.FC[67].Begin(),Game.Message("\u0412\u044B \u0440\u0435\u0448\u0438\u043B\u0438 \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0436 \u0441\u0435\u0431\u0435"),Game.Stats.Knife.Add(1),Game.Achievements.KeepWeapon.Unlock()},()=>{Game.Scenes.FC[68].Begin()}]}),Game.Scenes.FC[67]=new Scene({text:`
    “Это должно закалить меня. Пусть служит мне каким-никаким оружием”. 
    <p>Я спрятала его в свою сумку, с которой всегда ходила. 
       `,background:"Backgrounds/Katarina_Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[69].Begin()}]}),Game.Scenes.FC[68]=new Scene({text:`
    “Мне это ни к чему. Не хочу все заново вспоминать. К тому же от этого оружия не будет никакого толку.”
    <p>Я положила его на верхнюю полку книжного шкафа и благополучно постаралась забыть.
       `,background:"Backgrounds/Katarina_Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[69].Begin()}]}),Game.Scenes.FC[69]=new Scene({text:`
    Когда Роберт ушел, я прилегла на кровать и проспала до самого вечера. 
    <p>Охотник вернулся еще более хмурым, чем был до этого. Он сел на кровать рядом со мной и сказал:
    <p>- Катарина, я понимаю, что ты еще не выздоровела, но вынужден сообщить о приеме, на котором мы обязаны появиться сегодня. 
    <p>Еще сонным разумом я плохо понимала происходящее.
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[70].Begin()}]}),Game.Scenes.FC[70]=new Scene({text:`
    - Что за прием? 
    <p>- Как ты уже поняла, моя основная деятельность - это искать этих тварей и истреблять. Однако в обычной жизни я известный бизнесмен, который инвестирует в потенциально-прибыльные проекты. И сегодня я обязан присутствовать, так как некоторые гости будут представлять свои наработки. И я не могу появиться там без своей супруги, “они” точно заподозрят что-то.
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[71].Begin()}]}),Game.Scenes.FC[71]=new Scene({text:`
    От волнения сердце застучало быстрее. 
    <p>“Прием? Но как мне там вести себя? Как же хочется просто взять и отказаться.”    
    <p>В реальности я лишь ограничилась коротким кивком. Затем пришло еще одно осознание, которое я невольно озвучила вслух. 
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[72].Begin()}]}),Game.Scenes.FC[72]=new Scene({text:`
    - Ох, что же мне надеть… - я медленно встала и подошла к шкафу, где висела одежда. 
    <p>- Не слишком наряжайся, это не такое уж торжественное мероприятие, и времени у нас не так много, - Роберт скрестил руки, пристально наблюдая за мной.
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[77].Begin()}],condition:function(){1<=Game.Stats.BrokenHand.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[73].Begin()}),0>=Game.Stats.BrokenHand.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[77].Begin()})}}),Game.Scenes.FC[73]=new Scene({text:`
    - Ничего что… - я показала ему свою руку. 
    <p>- Не говори глупостей. Один лишь твой приход выставит тебя как героиню, которая преодолела себя и пришла на мероприятие, что, безусловно, только поднимет наш престиж.
    <p>- Но что мне ответить, если вдруг кто-то спросит о причине перелома?
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[215].Begin()}]}),Game.Scenes.FC[215]=new Scene({text:`
    - Не думаю, что это может быть кому-то интересно, - он равнодушно пожал плечами. - Можешь выдумать падение и сослаться на свою неосторожность. 
    <p>“Помощи от него не дождешься. Буду выкручиваться по ходу. А теперь лучше вернуться к выбору одежды.”
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[74].Begin()}]}),Game.Scenes.FC[74]=new Scene({text:`
    Я выбрала приталенную белую блузку и пышную синюю юбку. Одной рукой было довольно сложно управляться, поэтому вмешался Роберт:
    <p>- Я помогу. 
    <p>- Но ведь… 
    <p>- Что я там не видел… К тому же, мы опаздываем, так будет быстрее, - он принялся раздевать меня, словно делал это уже не раз.
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[75].Begin()}]}),Game.Scenes.FC[75]=new Scene({text:`
    Я осталась в одном нижнем белье. Благо в эту эпоху тело не было таким оголенным, но я все равно чувствовала неловкость. Мои щеки покраснели, я старалась не смотреть на мужчину.
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[76].Begin()}]}),Game.Scenes.FC[76]=new Scene({text:`
    Роберт постепенно начал одевать меня, словно куклу. Даже невольно касаясь интимных частей тела, он оставался беспристрастным. 
    <p>- Извини, если был чересчур настойчив, - он покинул комнату и я закончила сборы.
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[78].Begin()}]}),Game.Scenes.FC[77]=new Scene({text:`
    Я выбрала приталенную белую блузку и пышную синюю юбку. Взяв все необходимое, я ушла в другую комнату, где смогла успешно переодеться. 
    <p>“Хорошо что не пришлось возиться с каким-нибудь корсетом…” 
    <p>Покрутившись перед зеркалом, я удовлетворенно кивнула и вышла к Роберту.
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[78].Begin()}]}),Game.Scenes.FC[78]=new Scene({text:`
    - Как и всегда, изумительно, Катарина, - несмотря на свою отстраненность, мужчина старался поддерживать имидж джентльмена. 
    <p>- Благодарю. 
    <p>- За нами уже приехали, если ты готова, стоит выходить. 
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[80].Begin()}],condition:function(){1<=Game.Stats.Knife.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[79].Begin(),Game.Stats.Knife.Set(0)}),0>=Game.Stats.Knife.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[80].Begin()})}}),Game.Scenes.FC[79]=new Scene({text:`
    Во время наших сборов, Роберт подчеркивал, что мне нет нужды волноваться о своей безопасности. Поэтому я решила не брать свое холодное оружие и благополучно оставила его дома.
       `,background:"Backgrounds/Katarina_Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[80].Begin()}]}),Game.Scenes.FC[80]=new Scene({text:`
    Перед выходом Роберт что-то убрал во внутренний карман пиджака. Я заметила это, но не подала вида. Спустившись, мы сели в экипаж и отправились на прием. 
       `,background:"Backgrounds/Katarina_Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[81].Begin(),Game.Sounds.Play("Music","Ball"),Game.Stats.Robert.Add(0),AndroidApp("showAd")}]}),Game.Scenes.FC[81]=new Scene({text:`
    Экипаж привез нас к роскошному особняку. Сад, ухоженные тропинки, просторные помещения с живым оркестром, играющим классическую музыку. 
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[82].Begin()}]}),Game.Scenes.FC[82]=new Scene({text:`
    Место напоминало замок, где множество гостей вели светские беседы. Все они были одеты богато, будто бы нарочно показывали свой статус через дорогие украшения и платья.
    <p>На их фоне мне казалось, что я выгляжу крайне нелепо. Однако я старалась идти спокойно и с высоко поднятой головой. К тому же близость Роберта придавала мне уверенности. 
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[83].Begin()}]}),Game.Scenes.FC[83]=new Scene({text:`
    - Катарина, не волнуйся, среди такого количества гостей, с тобой ничего не может случиться, - прошептал мне на ухо мужчина, попутно приветствуя гостей. 
    <p>“Что это значит…?”
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[84].Begin()}]}),Game.Scenes.FC[84]=new Scene({text:`
    - Зачем ты мне это говоришь? 
    <p>- Ты выглядишь крайне озадаченно, это не может не привлечь внимания, - Роберт был прав. Помимо страха за свою жизнь, я действительно ощущала себя не в своей тарелке.  
    <p>- Я постараюсь.
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[85].Begin()}]}),Game.Scenes.FC[85]=new Scene({text:`
    Мужчина кивнул и мы двинулись в центр зала.
    <p>Я улыбалась, стараясь уделить должное внимание каждому встречному. На мое счастье, все были приветливы и не доставали надоедливыми расспросами. 
    <p>Где-то к середине приема, я начала ощущать, что мне становится скучно. Многие пары танцевали, кто-то разговаривал с бокалом игристого. 
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[86].Begin()}]}),Game.Scenes.FC[86]=new Scene({text:`
    “Даже телефона нет при себе, чтобы сыграть в игру какую-нибудь и отвлечься…”
    <p>К тому же, Роберту пришлось отлучиться. Перед своим уходом, он напомнил, что в конце вечера предстоят выступления претендентов. Мужчина сделал акцент на том, что мне определенно не стоит пропускать это событие. 
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[87].Begin()}]}),Game.Scenes.FC[87]=new Scene({text:`
    - Я должен пообщаться с гостями в более приватной обстановке. Присядь на диванчик, выпей шампанского. В конце концов пообщайся с другими женщинами. 
    <p>От чего-то меня захлестнула обида. Почему он постоянно уходит, когда ему вздумается, совершенно игнорируя мое состояние? 
    <p>“Я же здесь только ради него.”
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[88].Begin()}]}),Game.Scenes.FC[88]=new Scene({text:`
    - Роберт, - я поймала его за рукав пиджака. - Почему ты вечно норовишь бросить меня? Я не хочу оставаться здесь одна.
    <p>Мужчина сильно удивился моему жесту. Он аккуратно взял мою руку и сказал: 
    <p>- Прости, раньше тебе нравилось бывать на приемах. Раскрываться в общении с другими. Я же здесь чисто по деловым вопросам и не могу быть с тобой постоянно.
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[200].Begin()}]}),Game.Scenes.FC[200]=new Scene({text:`
    Такое откровение заставило меня немного смягчиться по отношению к Роберту. 
    <p>“И действительно, перед ним же стоит не $Имя Игрока$, а Катарина. Девушка, к которой он привык, знал ее повадки, но не мои.”
    <p>Мужчина ушел, а я была предоставлена самой себе. 
    <p>“Чем бы заняться…?”
       `,background:"Backgrounds/Ball",buttontext:["\u041F\u043E\u0439\u0442\u0438 \u043D\u0430 \u0442\u0435\u0440\u0440\u0430\u0441\u0443","\u0414\u043E\u0436\u0434\u0430\u0442\u044C\u0441\u044F \u0420\u043E\u0431\u0435\u0440\u0442\u0430","\u041F\u0440\u043E\u0433\u0443\u043B\u044F\u0442\u044C\u0441\u044F \u043F\u043E \u0441\u0430\u0434\u0443"],buttonaction:[()=>{Game.Scenes.FC[89].Begin()},()=>{Game.Scenes.FC[104].Begin()},()=>{Game.Scenes.FC[124].Begin(),Game.Stats.MetAntagonist.Add(1)}]}),Game.Scenes.FC[89]=new Scene({text:`
    В помещении становилось очень душно, поэтому я решила сходить подышать свежим воздухом.
    <p>Терраса была просторной, с небольшими столиками, за одним из которых беседовало несколько знатных дам.
       `,background:"Backgrounds/Balcony",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[90].Begin()}]}),Game.Scenes.FC[90]=new Scene({text:`
    Я поздоровалась с ними и заняла свой тихий уголок вдали от них, наслаждаясь открывшимся видом. 
    <p>Прохладный воздух щекотал мое лицо, придавая чувство свежести и легкости. 
    <p>“Я определенно не создана для таких мероприятий. Немного завидую Катарине в этом плане.”
       `,background:"Backgrounds/Balcony",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[91].Begin()}]}),Game.Scenes.FC[91]=new Scene({text:`
    Однако мне были не до конца понятны ее мотивы. Она так просто подвергает себя опасности, ради чего? Влюбленность в Роберта? Он, конечно, хорош собой, но вряд ли это настолько весомый аргумент…
    <p>Через некоторое время на террасу пришел один из участников мероприятия. 
    <p>- Катарина, не ожидал тебя здесь увидеть.
       `,background:"Backgrounds/Balcony",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[92].Begin()}]}),Game.Scenes.FC[92]=new Scene({text:`
    Это был Тесла. Он выглядел немного взволнованно, но при этом держал голову высоко, будто бы назло всем обстоятельствам. 
    <p>- Никола, я не видела тебя на приеме… 
    <p>- Я пришел совсем недавно. Мне не по душе все эти мероприятия. Пустая болтовня, танцы. Я здесь по другой причине.
       `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[93].Begin()}]}),Game.Scenes.FC[93]=new Scene({text:`
    - Ты, я полагаю, в числе выступающих? 
    <p>- Все верно. 
    <p>Наступила неловкая пауза. Я до сих пор смутно помню наше взаимодействие с Николой, однако сейчас я точно уверена, что все реально. Я не схожу с ума, я действительно нахожусь в прошлом. 
    <p>И мне: 

       `,background:"Persons/Nicola",buttontext:["\u041D\u0440\u0430\u0432\u0438\u0442\u0441\u044F \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F \u0422\u0435\u0441\u043B\u044B","\u041D\u0435 \u043D\u0440\u0430\u0432\u0438\u0442\u0441\u044F \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F \u0422\u0435\u0441\u043B\u044B"],buttonaction:[()=>{Game.Scenes.FC[94].Begin()},()=>{Game.Scenes.FC[100].Begin()}]}),Game.Scenes.FC[94]=new Scene({text:`
    Его общение, манера поведения - все это привлекало меня. Я бы хотела больше времени проводить с ним. В отличие от того же Роберта, он относится ко мне более тактично. Хотя и своих проблем ему хватает. 
    <p>- Никола, спасибо, - я вдруг ощутила необходимость поделиться своими искренними чувствами. - Ты действительно удивительный человек. 
       `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[95].Begin()}]}),Game.Scenes.FC[95]=new Scene({text:`
    Тесла был крайне удивлен моим словам. На его щеках показался красный румянец . 
    <p>- Катарина, чего это ты вдруг… 
    <p>- Просто захотелось сказать. 
       `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[96].Begin()}],condition:function(){1<=Game.Stats.Nicola.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[96].Begin()}),0>=Game.Stats.Nicola.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[98].Begin()})}}),Game.Scenes.FC[96]=new Scene({text:`
    - Ты удивительная девушка, я горд и безмерно счастлив, что имею честь быть знакомым с тобой. 
    <p>Никола радушно улыбнулся и развел руки в стороны, приглашая меня в свои объятия. Я прильнула к его груди и почувствовала размеренное дыхание. Он не сжимал меня сильно, напротив, легко и непринужденно. Мне удалось уловить аромат, исходящий от него. 
       `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[97].Begin(),Game.Stats.Nicola.Add(1),Game.Message("\u0412\u044B \u0434\u043E\u0440\u043E\u0433\u043E\u0439 \u0447\u0435\u043B\u043E\u0432\u0435\u043A \u0434\u043B\u044F \u041D\u0438\u043A\u043E\u043B\u044B")}]}),Game.Scenes.FC[97]=new Scene({text:`
    “Запах сигар, алкоголя…”
    <p>Впервые я почувствовала себя хорошо в этом времени. Спокойно, безо всяких напрягов. 
       `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[103].Begin()}],condition:function(){1<=Game.Stats.BrokenHand.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[101].Begin()}),0>=Game.Stats.BrokenHand.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[103].Begin()})}}),Game.Scenes.FC[98]=new Scene({text:`
    - Спасибо, Катарина, но это лишнее. 
    <p>- Почему ты отталкиваешь меня? Я же просто выражаю тебе признательность…
       `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[99].Begin()}]}),Game.Scenes.FC[99]=new Scene({text:`
    - Не думаю, что Роберт оценит весь наш диалог и встречу наедине. 
    <p>Спорить было бессмысленно, Никола слишком беспокоится о чести и прочих нюансах этого времени. 
       `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[103].Begin()}],condition:function(){1<=Game.Stats.BrokenHand.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[101].Begin()}),0>=Game.Stats.BrokenHand.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[103].Begin()})}}),Game.Scenes.FC[100]=new Scene({text:`
    Мне было сложно мириться с его характером. К сожалению, этот человек был себе на уме и я не могла даже подобрать какой-нибудь фразы, чтобы продолжить диалог. 
       `,background:"Backgrounds/Balcony",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[103].Begin()}],condition:function(){1<=Game.Stats.BrokenHand.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[101].Begin()}),0>=Game.Stats.BrokenHand.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[103].Begin()})}}),Game.Scenes.FC[101]=new Scene({text:`
    - Я все хотел поинтересоваться, как рука? Не сильно болит?
    <p>- Нет, что ты, все в порядке. 
    <p>- Это отличные новости. Ты героиня, Катарина. Не каждая девушка сможет вот так вот расхаживать после всего ранее пережитого. 
    <p>- Это мой долг, я не могу подвести Роберта. 
       `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[102].Begin()}]}),Game.Scenes.FC[102]=new Scene({text:`
    Конечно, это не было в моих интересах. Но для поддержания роли, порой, приходилось говорить то, что от меня ожидали услышать.
       `,background:"Backgrounds/Balcony",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[103].Begin()}]}),Game.Scenes.FC[103]=new Scene({text:`
    Мы немного постояли в тишине, просто наслаждаясь вечерней прохладой и приятным видом. А затем вернулись на мероприятие. 
       `,background:"Backgrounds/Balcony",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[162].Begin()}]}),Game.Scenes.FC[104]=new Scene({text:`
    Я решила никуда не ходить и просто подождать своего спутника на диване. 
    <p>“Уверена, Роберт вернется быстрее, после сказанных мною слов.” 
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[105].Begin()}]}),Game.Scenes.FC[105]=new Scene({text:`
    Несколько раз ко мне подсаживались знатные дамы, надеясь завести разговор. Но так как я не была из этой эпохи, мне было трудно поддерживать с ними диалог. Поэтому в скором времени я вновь наслаждалась только своим обществом.
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[106].Begin()}]}),Game.Scenes.FC[106]=new Scene({text:`
     Роберт не заставил себя долго ждать. Видя, как я скучающе сижу, он подсел ко мне и сказал:
    <p>- Обычно ты более активная, Катарина. Все еще плохо себя чувствуешь?
    <p>- Может и так, - равнодушно ответила я. 
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[107].Begin()}]}),Game.Scenes.FC[107]=new Scene({text:`
    Мужчина сидел ровно, попивая шампанское, как подобает человеку со статусом в рамках данного мероприятия. Он долгое время смотрел на зал, немного отстраненным взглядом. Затем обернувшись ко мне, спросил:
    <p>- Потанцуем? 
    <p>В центр помещения стали выходить гости, ожидая когда же музыканты начнут свое выступление. 
    <p>Я: 
       `,background:"Persons/Robert",buttontext:["\u0421\u043E\u0433\u043B\u0430\u0441\u0438\u043B\u0430\u0441\u044C","\u041E\u0442\u043A\u0430\u0437\u0430\u043B\u0430\u0441\u044C"],buttonaction:[()=>{Game.Scenes.FC[108].Begin()},()=>{Game.Scenes.FC[119].Begin()}]}),Game.Scenes.FC[108]=new Scene({text:`
     Не было причин отказываться. В конце концов я его супруга, а за вечер не произошло ничего интересного, поэтому немного развеяться было хорошей идеей.
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[114].Begin()}],condition:function(){1<=Game.Stats.BrokenHand.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[109].Begin()}),0>=Game.Stats.BrokenHand.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[114].Begin()})}}),Game.Scenes.FC[109]=new Scene({text:`
     Роберт был очень осторожен. Он аккуратно взял меня за талию и вывел в центр зала. 
    <p>Заиграла медленная мелодия. Многие присутствующие просто прижались к друг другу, наслаждаясь приятным звучанием и теплотой своего партнера.
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[110].Begin()}]}),Game.Scenes.FC[110]=new Scene({text:`
     Роберт подошел ко мне на довольно близкое расстояние, взял мою неповрежденную руку и стал медленно покачиваться в такт музыке.
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[111].Begin()}]}),Game.Scenes.FC[111]=new Scene({text:`
     Я ощущала крепкие и надежные мужские прикосновения. Роберт смотрел только на меня своими голубыми глазами, искренне улыбаясь, не переставая поддерживать.
    <p>Что-то завораживающее было в нем. Несмотря на свою отчужденность, он прекрасно справлялся с ролью примерного и заботливого мужа. Была ли это только игра на публику? Или он что-то испытывал к Катарине?
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[112].Begin()}]}),Game.Scenes.FC[112]=new Scene({text:`
     “Мне еще предстоит раскусить его, а пока… Все не так плохо, как могло бы быть. Может, его настроение улучшил алкоголь или ему хочется женского тепла? Но его обходительность в такие моменты заставляет меня смягчиться…”
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[113].Begin(),Game.Stats.Robert.Add(1),Game.Message("\u0420\u043E\u0431\u0435\u0440\u0442 \u0437\u0430\u043F\u043E\u043C\u043D\u0438\u0442 \u0432\u0430\u0448 \u0442\u0430\u043D\u0435\u0446")}]}),Game.Scenes.FC[113]=new Scene({text:`
      Роберт гладил меня по волосам, затем положил подбородок на мою макушку и продолжил медленные покачивания, заставляя меня позабыть обо всех тревогах.
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[121].Begin()}]}),Game.Scenes.FC[114]=new Scene({text:`
     Мне хотелось наконец-то выплеснуть накопившуюся энергию. Роберт видел мой азарт, он взял меня за руку и потянул в сторону зала, где танцевало несколько парочек. 
    <p>Заиграла довольно ритмичная музыка, мы с Робертом пустились в пляс, поддаваясь общему игривому настрою. 
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[115].Begin()}]}),Game.Scenes.FC[115]=new Scene({text:`
     Держась за руки, мы танцевали как ненормальные: кружились, прыгали, улыбались. В один момент, он обхватил меня за талию и наклонил чуть ли до пола, а затем резко поднял вверх, кружа вокруг себя.
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[116].Begin()}]}),Game.Scenes.FC[116]=new Scene({text:`
     Что-то завораживающее было в этом мужчине. Несмотря на свою отчужденность, он прекрасно справлялся с ролью примерного и заботливого мужа. Были ли это только игра на публику? Или он что-то испытывал к Катарине?
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[117].Begin()}]}),Game.Scenes.FC[117]=new Scene({text:`
     “Мне еще предстоит раскусить его, а пока… Все не так плохо, как могло бы быть. Может, его настроение улучшил алкоголь или ему хочется женского тепла? Но его обходительность в такие моменты заставляет меня смягчиться…”
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[118].Begin(),Game.Stats.Robert.Add(1),Game.Message("\u0420\u043E\u0431\u0435\u0440\u0442 \u0437\u0430\u043F\u043E\u043C\u043D\u0438\u0442 \u0432\u0430\u0448 \u0442\u0430\u043D\u0435\u0446")}]}),Game.Scenes.FC[118]=new Scene({text:`
      Танец подарил мне только позитивные эмоции. Я абсолютно забыла обо всех тревогах. А сердце стучало быстрее, видя искреннюю улыбку Роберта.
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[121].Begin()}]}),Game.Scenes.FC[119]=new Scene({text:`
      Сейчас мне совершенно не хотелось танцевать. Тем более, складывалось ощущение, будто бы я заставляю Роберта возиться со мной.
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[120].Begin()}]}),Game.Scenes.FC[120]=new Scene({text:`
      “Не хочу его обременять.”
      <p>- Я не до конца выздоровела, поэтому давай спокойно поговорим о чем-нибудь.
      <p>- Как скажешь, - мужчина допил свой бокал и отставил его в сторону. 
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[121].Begin()}]}),Game.Scenes.FC[121]=new Scene({text:`
      Мы с Робертом решили еще немного посидеть на диванах и дождаться финальной части мероприятия. Чтобы не сидеть молча, я решила поинтересоваться: 
      <p>- Тебе нравятся подобные приемы? 
      <p>- Я отношусь к этому как к чему-то вынужденному, вот и все. 
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[122].Begin()}]}),Game.Scenes.FC[122]=new Scene({text:`
      “Как всегда исчерпывающе.” 
      <p>- Почему ты выбрал такой вид деятельности? 
      <p>- Я всегда хотел служить во благо народа. Поэтому самым логичным было направить русло моей вечной жизни на борьбу, - мужчина смотрел на меня таким взглядом, будто бы я должна была понять смысл этих слов.
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[123].Begin()}]}),Game.Scenes.FC[123]=new Scene({text:`
      “Что он имеет в виду? Ничего не понимаю, почему все вокруг просто не могут ответить прямо.” 
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[162].Begin()}]}),Game.Scenes.FC[124]=new Scene({text:`
      Мне была нестерпима компания этих аристократок, к тому же в зале было довольно душно. Я решила выйти прогуляться в сад. 
      <p>“Если Роберт спокойно оставил меня одну, бояться нечего. К тому же территория хорошо охраняется.”
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[125].Begin(),Game.Sounds.Play("Music","Antagonist")}]}),Game.Scenes.FC[125]=new Scene({text:`    
    Ночная прохлада действовала успокаивающе. К сожалению, небо заволокло тучами, поэтому звезд не было видно. И все же приятный окружающий вид ухоженного сада действительно впечатлял. Ровно подстриженные растения, чистые дорожки. 
    <p>Внимание привлекал небольшой фонтан, украшенный золотыми элементами.
       `,background:"Backgrounds/Garden",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[126].Begin()}]}),Game.Scenes.FC[126]=new Scene({text:`    
    Я присела на скамейку, где смогла наконец насладиться тишиной и прохладой. Всматриваясь в темноту, я увидела фигуру, которая лежала на бортике фонтана. Очертаний лица было не различить, лишь отрывистые движения ноги из стороны в сторону.
       `,background:"Backgrounds/Garden",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[127].Begin()}]}),Game.Scenes.FC[127]=new Scene({text:`    
    “Да, напитков на этом приеме было предостаточно, наверное кому-то поплохело из-за алкоголя? Может стоит подойти?”
    <p>Что мне сделать?
       `,background:"Backgrounds/Garden",buttontext:["\u041E\u0441\u0442\u0430\u0442\u044C\u0441\u044F \u0441\u0438\u0434\u0435\u0442\u044C \u043D\u0430 \u043C\u0435\u0441\u0442\u0435","\u041F\u043E\u0434\u043E\u0439\u0442\u0438 \u043A \u043D\u0435\u0437\u043D\u0430\u043A\u043E\u043C\u0446\u0443","\u041F\u043E\u043A\u0438\u043D\u0443\u0442\u044C \u0441\u0430\u0434"],buttonaction:[()=>{Game.Scenes.FC[128].Begin()},()=>{Game.Scenes.FC[131].Begin()},()=>{Game.Scenes.FC[161].Begin()}]}),Game.Scenes.FC[128]=new Scene({text:`    
    “Это не мое дело, если кто-то перепил и улегся на фонтан. Все - взрослые люди, нужно уметь себя контролировать.”
       `,background:"Backgrounds/Garden",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[129].Begin()}]}),Game.Scenes.FC[129]=new Scene({text:`    
    Я продолжила наслаждаться прохладой и тишиной. Через некоторое время мужчина приподнялся и сел на край. Я видела лишь его спину. 
    <p>Затем незнакомец резко встал и увидел меня.
       `,background:"Backgrounds/Garden",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[130].Begin()}]}),Game.Scenes.FC[130]=new Scene({text:`    
    Мое сердце на секунду остановилось. Это же был он! Тот ублюдок, что похитил меня. 
    <p>Мне ничего не оставалось, кроме как бежать обратно в зал, но похититель был проворнее. 
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[133].Begin()}]}),Game.Scenes.FC[131]=new Scene({text:`    
    “А если ему нужна помощь? Я не могу его здесь просто бросить.”
    <p>Я подошла к человеку, и каково было мое удивление, когда ко мне повернулся тот самый ублюдок, который похитил меня и издевался.
       `,background:"Backgrounds/Garden",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[132].Begin()}]}),Game.Scenes.FC[132]=new Scene({text:`    
    На нем была та же маска, выражение лица довольное понурое. На секунду мне показалось, что я вижу слезу на его щеке. 
    <p>Мужчина резко открыл глаза, увидев меня он расплылся в хитрой улыбке. Я же принялась бежать, однако похититель был проворнее.
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[133].Begin()}]}),Game.Scenes.FC[133]=new Scene({text:`    
    Он схватил меня, зажал рукой рот и оттащил обратно к фонтану, усаживая на скамейку. 
    <p>- Катарина, не ожидал, что так скоро снова встречу тебя, - он прошептал мне это на ухо. 
    <p>- Отпусти меня или я буду кричать! - смогла проговорить я, вырвавшись из его хватки.
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[134].Begin()}]}),Game.Scenes.FC[134]=new Scene({text:`    
    - Брось, у нас ведь с тобой такая приятная и неожиданная встреча. Мы, конечно, можем уединиться, если ты так хочешь покричать. Но к большому сожалению, мне еще предстоит выступать на сцене.  
    <p>- Зачем ты держишь меня?
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[135].Begin()}]}),Game.Scenes.FC[135]=new Scene({text:`    
    - Я всего лишь хочу провести с тобой этот прекрасный вечер, не более. Я обещаю, что не причиню тебе вреда. 
    <p>“Он сумасшедший… То, что он сделал со мной… Как я могу.” 
    <p>- Я ухожу! Отпусти меня.
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[136].Begin()}]}),Game.Scenes.FC[136]=new Scene({text:`    
    Я быстро встала, но на этот раз незнакомец был грубее. Он резко опустил меня рядом с собой и уже более злым тоном проговорил: 
    <p>- Я же сказал, сиди рядом. Я не говорил вставать, не говорил идти куда-то. Рядом!
    <p>После этих слов стало совсем не по себе. Этот сумасшедший не осознавал какие-то грани. А что если он убьет меня?
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[137].Begin()}]}),Game.Scenes.FC[137]=new Scene({text:`    
    - Послушай, Катарина, если бы ты просто делала то, что я прошу - проблем бы не было… 
    <p>Он замолчал на несколько секунд, а затем сказал:
    <p>- Прости меня, если я где-то делал тебе больно, но ты вынуждаешь меня. 
    <p>- Ты думаешь, я поверю в эту чушь? Засунь эти извинения куда-нибудь подальше!
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[138].Begin()}]}),Game.Scenes.FC[138]=new Scene({text:`    
    - Становишься смелее - это похвально, но не путай это со свободой. Ты все еще моя заложница и сидишь здесь со мной только  потому, что “Нашей Матери” пока не выгодна твоя смерть. А само похищение - просто часть ее шутки, не более, - его рука проходилась по моей шее, я старалась отогнать его, но второй рукой он не позволял этого сделать.
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[139].Begin()}]}),Game.Scenes.FC[139]=new Scene({text:`    
    - Хватит, остановись, мне неприятны твои прикосновения…
    <p>- Почему? Я же так хочу тебя…
    <p>“Да что с ним не так?”
    <p>- Прекрати этот спектакль… 
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[140].Begin()}]}),Game.Scenes.FC[140]=new Scene({text:`    
    Он проигнорировал мою очередную просьбу закончить беседу, достал из-за пазухи флакончик, что используют для хранения духов, и распылил его прямо перед моим носом. 
    <p>- Мне сказали, что люди благодаря этому средству становятся более разговорчивы, может быть и ты сможешь расслабиться. 
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[141].Begin()}]}),Game.Scenes.FC[141]=new Scene({text:`    
    Я тут же почувствовала аромат роз с примесью лаванды. 
    <p>“Что происходит?”
    <p>Я попыталась зажмурить нос, не дышать, но мужчина пресек все мои попытки. 
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[142].Begin()}]}),Game.Scenes.FC[142]=new Scene({text:`    
    Через некоторое время я ощутила сильное головокружение. Все перед глазами плыло, тело бросало в жар. Мне пришлось расстегнуть верхние пуговицы блузки, иначе бы я сошла с ума от усиливающегося чувства жара.
       `,background:"Backgrounds/Garden",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[143].Begin()}]}),Game.Scenes.FC[143]=new Scene({text:`    
    - Что ты со мной сделал? - я вдруг почувствовала сильное влечение к этому мужчине, хоть и пыталась сопротивляться навязчивым мыслям. 
    <p>- О, это только начало. Теперь ты наконец можешь расслабиться у меня в руках, - он потянулся своими губами к моим. 
    <p>Я: 
       `,background:"Persons/Antagonist",buttontext:["\u041F\u043E\u0434\u0434\u0430\u043B\u0430\u0441\u044C \u0441\u043E\u0431\u043B\u0430\u0437\u043D\u0443 \uD83D\uDD10","\u0421\u043C\u043E\u0433\u043B\u0430 \u043F\u0440\u043E\u0442\u0438\u0432\u043E\u0441\u0442\u043E\u044F\u0442\u044C \u0441\u043E\u0431\u043B\u0430\u0437\u043D\u0443"],buttonaction:[()=>{Game.Scenes.FC[144].Begin(),Game.Achievements.LoveEvil.Unlock(),Game.Stats.AntagonistWire.Add(1),AndroidApp("showAd")},()=>{Game.Scenes.FC[156].Begin()}]}),Game.Scenes.FC[144]=new Scene({text:`    
    Это средство словно сняло мои внутренние ограничители. Я была не в силах ему сопротивляться. Губы незнакомца жадно впились в мои, а я ему охотно отвечала.
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[145].Begin()}]}),Game.Scenes.FC[145]=new Scene({text:`    
    Я чувствовала, как этот глубокий поцелуй нравится мне все больше. Мужчина аккуратно положил меня на скамейку, нависая, продолжая покрывать поцелуями. Его руки скользили по моему телу. Он не стесняясь трогал мои интимные места, словно, я всегда ему принадлежала.
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[146].Begin()}]}),Game.Scenes.FC[146]=new Scene({text:`    
    Когда он оторвался от моих губ, то облизнулся и сказал:
    <p>- Видишь? Тебе же самой нравится. 
    <p>- Это не так… - я произнесла эти три коротких слова тяжело дыша и все еще помня прикосновения мужчины. 
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[147].Begin()}]}),Game.Scenes.FC[147]=new Scene({text:`    
    Он наклонился и прошептал:
    <p>- Какая же ты сладкая… 
    <p>Незнакомец стал целовать мою шею, проходится языком вдоль, немного прикусывая. Я не удержалась и испустила громкий стон, чем только раззадорила мужчину.
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[148].Begin()}]}),Game.Scenes.FC[148]=new Scene({text:`    
    - Тише, милая, а вдруг нас кто-нибудь услышит, ты же не хочешь быть обнаруженной? 
    <p>Его руки стали расстегивать мою блузку. Он справлялся с этим довольно умело и быстро. Мужчина обнажил мою грудь. 
    <p>“Это все неправильно… нет…”
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[149].Begin()}]}),Game.Scenes.FC[149]=new Scene({text:`    
    Головой я понимала то, что сейчас происходит - большая ошибка. Но телу было настолько хорошо, что я не могла с этим ничего поделать, только лишь полностью отдаться.
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[150].Begin()}]}),Game.Scenes.FC[150]=new Scene({text:`    
    Незнакомец ласкал мою грудь, параллельно трогая нижнюю часть тела, доставляя неземное удовольствие. Несколько пальцев смело проникали внутрь меня, а я лишь обнимала его, крепко цепляясь обеими руками, не в силах сдержать стоны.
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[151].Begin()}]}),Game.Scenes.FC[151]=new Scene({text:`    
    Я довольно быстро достигла пика удовольствия и обмякла в руках незнакомца, тяжело дыша. 
    <p>- Хочешь большего? 
    <p>- Я…
    <p>Мне не удалось договорить, так как послышались голоса, идущие в нашу сторону..
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[152].Begin()}]}),Game.Scenes.FC[152]=new Scene({text:`    
    - Очень жаль, - мужчина поправил свой пиджак и встал. - Мне пора, советую незамедлительно привести себя в порядок и ни в коем случае не пропустить конец вечера. 
    <p>Мой разум начал приходить в норму и я стала быстро возвращать себе нормальный вид. 
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[153].Begin(),Game.Message("\u041C\u0443\u0436\u0447\u0438\u043D\u0430 \u0434\u0435\u0440\u0436\u0438\u0442 \u0441\u0432\u043E\u0435 \u0441\u043B\u043E\u0432\u043E"),Game.Stats.Antagonist.Add(1)}]}),Game.Scenes.FC[153]=new Scene({text:`    
    Напоследок мужчина посмотрел на меня и с ухмылкой проговорил:
    <p>- В следующий раз я доведу дело до конца. 
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[154].Begin()}]}),Game.Scenes.FC[154]=new Scene({text:`    
    Когда он ушел, я продолжала сидеть на скамейке, обдумывая происходящее. Мимо прошла воркующая парочка, которая приветливо поздоровалась со мной. А я толком и не обратила на них внимания, ведь сидела в полной растерянности.
       `,background:"Backgrounds/Garden",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[155].Begin()}]}),Game.Scenes.FC[155]=new Scene({text:`    
    “Может, он не такой плохой….? Да, отлично, $Имя Игрока$. Давай оправдывать злодея, потому что он хорошо орудовал пальчиками.” 
    <p>Мне было стыдно, но в то же время полученное удовольствие затмевало здравый смысл.
    <p>Пока я решила отпустить ситуацию и вернуться на мероприятие.
       `,background:"Backgrounds/Garden",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[162].Begin()}]}),Game.Scenes.FC[156]=new Scene({text:`    
    Мне удалось найти в себе силы и отвернуться. Мое тело ныло от желания, но разум оставался чистым и непреклонным. 
    <p>- Почему ты такая упертая? - мужчина заметно погрустнел. - Это же всего лишь небольшая шалость. Давай же, я сделаю тебе очень хорошо!
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[157].Begin()}]}),Game.Scenes.FC[157]=new Scene({text:`    
    - Почему именно я? 
    <p>- А что такого в том, что мужчина желает красивую женщину? 
    <p>Незнакомец прошелся рукой по моей шее, груди… 
    <p>- Соглашайся, Катарина! 
    <p>Я: 
       `,background:"Persons/Antagonist",buttontext:["\u0421\u043E\u0433\u043B\u0430\u0441\u0438\u043B\u0430\u0441\u044C \uD83D\uDD10","\u041E\u0442\u043A\u0430\u0437\u0430\u043B\u0430\u0441\u044C"],buttonaction:[()=>{Game.Scenes.FC[144].Begin(),Game.Achievements.LoveEvil.Unlock(),Game.Stats.AntagonistWire.Add(1),AndroidApp("showAd")},()=>{Game.Scenes.FC[158].Begin()}]}),Game.Scenes.FC[158]=new Scene({text:`    
    - Иди к черту! 
    <p>- Жаль, - незнакомец сел рядом со мной и томно вздохнул. 
    <p>- Раз даже средство не сработало, значит, я совсем тебе не интересен.
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[159].Begin(),Game.Message("\u041C\u0443\u0436\u0447\u0438\u043D\u0430 \u0435\u0449\u0435 \u043F\u043E\u043F\u044B\u0442\u0430\u0435\u0442\u0441\u044F \u0434\u043E\u0431\u0438\u0442\u044C\u0441\u044F \u0432\u0430\u0441.")}]}),Game.Scenes.FC[159]=new Scene({text:`    
    - Я не буду иметь ничего общего с похитителями-тиранами! 
    <p>- Что ж, я буду надеяться на еще один шанс, милая моя, а пока что, лучше приведи себя в порядок и вернись на прием. 
    <p>Он насильно взял мою руку и поцеловал.
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[160].Begin()}]}),Game.Scenes.FC[160]=new Scene({text:`    
    “Нужно опасаться этого человека…Лучше сообщить Роберту о том, что этот негодяй здесь.”
       `,background:"Backgrounds/Garden",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[162].Begin()}]}),Game.Scenes.FC[161]=new Scene({text:`    
    “Мне совершенно не хочется искать приключений на свою голову, а вдруг это не простой человек?”
    <p>Разыгравшаяся паранойя не позволила мне ни на минуту задержаться в этом саду. Я быстро встала и вернулась на мероприятие. 
       `,background:"Backgrounds/Garden",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[162].Begin()}]}),Game.Scenes.FC[162]=new Scene({text:`    
    В общем зале гости постепенно расходились, занимая места с лучшим обзором. Публика была в нетерпении. Оркестр же складывал инструменты, освобождая сцену для будущих выступлений. 
    <p>Я увидела, как Никола Тесла стоял у окна, сжимая в руках бумагу. 
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[163].Begin()}],condition:function(){Game.Sounds.Play("Music","Ball")}}),Game.Scenes.FC[163]=new Scene({text:`    
    - Никола, все в порядке? Волнуешься? 
    <p>- Не хочу видеть Эдисона. От одного его вида мне становится тошно. 
    <p>Я понимающе кивнула, осознавая несправедливость, с которой столкнулся Тесла. Ведь именно в этот период жизни Николы, Томас Эдисон отказывался выплачивать ему деньги за проделанную работу.
       `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[164].Begin()}]}),Game.Scenes.FC[164]=new Scene({text:`    
    Начало их затяжного конфликта было положено. 
    <p>- Это всего лишь этап, который ты должен пережить. Просто помни, что твои открытия значат для тебя. 
    <p>Ученый улыбнулся. 
       `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[165].Begin()}]}),Game.Scenes.FC[165]=new Scene({text:`    
    - Все равно он не сможет лишить меня той малости, которую я заработал. Я обязательно отыграюсь. Если не на работе, то в соответствующих клубах. И хоть я проиграл тогда, мне же просто не повезло…
    <p>“Он снова про свою зависимость. Он будто бы просит помощи...”
       `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[169].Begin()}],condition:function(){5<=Game.Stats.Study.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[166].Begin()}),4>=Game.Stats.Study.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[169].Begin()})}}),Game.Scenes.FC[166]=new Scene({text:`    
    - Никола, послушай, тебе не стоит так тратить свое время и способности. Ты должен понимать, что этот досуг не привнесет в твою жизнь ничего хорошего. Временная эйфория от выигрышей, на самом деле ничто по сравнению с тем, сколько ты теряешь. 
    <p>- Я благодарен тебе за беспокойство, однако я в состоянии самостоятельно принять решение относительно своей жизни.
       `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[167].Begin()}]}),Game.Scenes.FC[167]=new Scene({text:`    
    - А как же твои исследования, - я не собиралась сдаваться. - Твои идеи насчет тока… Неужели ты просто готов сдаться и погрязнуть в долгах? Пойми же ты, твое время еще настанет. 
    <p>Тесла отвернулся, словно, что-то обдумывая.
       `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[168].Begin(),Game.Message("\u0412\u0430\u0448\u0438 \u0437\u043D\u0430\u043D\u0438\u044F \u043F\u043E\u043C\u043E\u0433\u0430\u044E\u0442 \u0422\u0435\u0441\u043B\u0435 \u0438\u0437\u0431\u0430\u0432\u0438\u0442\u044C\u0441\u044F \u043E\u0442 \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u0438."),Game.Stats.Nicola.Add(1),Game.Stats.HelpTesla.Add(1)}]}),Game.Scenes.FC[168]=new Scene({text:`    
    - Спасибо, Катарина, я непременно прислушаюсь к тебе. А сейчас извини, я хотел бы подготовиться к выступлению, - мужчина с задумчивым видом отошел в сторону.
    <p>“Надеюсь, он обдумает мои слова…”
       `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[172].Begin()}],condition:function(){1<=Game.Stats.AntagonistWire.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[171].Begin()}),0>=Game.Stats.AntagonistWire.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[172].Begin()})}}),Game.Scenes.FC[169]=new Scene({text:`    
    “Что мне ему сказать? Все равно он сам себе на уме…”
    <p>- Никола, ты же можешь лучше! Я знаю…
    <p>В голову не приходили конкретные примеры. 
    <p>“Нужно было больше уделять времени учебе и углубиться в биографию Теслы.”
       `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[170].Begin(),Game.Message("\u0412\u0430\u0448\u0438\u0445 \u0437\u043D\u0430\u043D\u0438\u0439 \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043C\u043E\u0447\u044C \u0422\u0435\u0441\u043B\u0435 \u0438\u0437\u0431\u0430\u0432\u0438\u0442\u044C\u0441\u044F \u043E\u0442 \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u0438.")}]}),Game.Scenes.FC[170]=new Scene({text:`    
    - Я прекрасно осознаю свои возможности, а вот ты не понимаешь, что мне нужны деньги. 
    <p>“Бесполезно, он же так всю жизнь проиграет!” 
    <p>- Спасибо за беспокойство, Катарина, я непременно услышал тебя. А сейчас извини, я хотел бы подготовиться к выступлению, - мужчина отошел в сторону с довольно грустным видом.
       `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[172].Begin()}],condition:function(){1<=Game.Stats.AntagonistWire.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[171].Begin()}),0>=Game.Stats.AntagonistWire.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[172].Begin()})}}),Game.Scenes.FC[171]=new Scene({text:`    
    Последние приготовления к выступлениям были завершены. 
    <p>Я искала Роберта, чтобы предупредить его о том негодяе, но мужчины нигде не было. 
    <p>“Черт, а что если злодей что-то замышляет…”
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[172].Begin()}]}),Game.Scenes.FC[172]=new Scene({text:`    
    К зрителям вышел организатор мероприятия и наконец-то объявил о начале выступлений. 
    <p>- Прошу выйти на сцену мистера Николу Тесла с его покровителем - Робертом Джонсоном! 
    <p>Зал зааплодировал. Мне удалось занять хорошее место, поэтому я смогла наблюдать за событиями в первых рядах.  
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[173].Begin()}]}),Game.Scenes.FC[173]=new Scene({text:`
    Роберт и Никола держались довольно нейтрально. Их лица выражали абсолютное спокойствие и сосредоточенность на своей работе. 
    <p>Организатор объявил о еще нескольких претендентах. 
    <p>- И, наконец, за дополнительное финансирование и признание поборется Мистер Томас Эдисон вместе с Эдвардом Брауном.
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[174].Begin()}]}),Game.Scenes.FC[174]=new Scene({text:`
    Взгляд тут же зацепился за Эдисона. Высокий, стройный. Любимый всеми высокомерный взгляд и радушная улыбка при виде ликующих зрителей. 
    <p>А вот его коллега Эдвард казался мне смутно знакомым.
       `,background:"Persons/Thomas",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[175].Begin()}]}),Game.Scenes.FC[175]=new Scene({text:`
    Я оцепенела. 
    <p>“Это не может быть правдой…”
    <p>Я отчетливо видела лицо Нэйтана. Мужчина был практически один в один как мой профессор из современности. 
    <p>“Это невозможно!”
       `,background:"Persons/Neitan_TL",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[176].Begin()}]}),Game.Scenes.FC[176]=new Scene({text:`
    Эдвард окинул зал взглядом, и его взор упал на меня. Он довольно долго рассматривал мое лицо, не скрывая удивления, а затем сказал: 
    <p>- Также с недавнего времени к нам присоединился Александр Гончаров, прошу встретить его аплодисментами! 
    <p>Я не верила своим глазам. Одно потрясение за другим.
       `,background:"Persons/Neitan_TL",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[178].Begin()}]}),Game.Scenes.FC[178]=new Scene({text:`
    Никто иной как “мистер зло” вальяжно вошел на сцену и поклонился гостям.
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[179].Begin()}],condition:function(){1<=Game.Stats.AntagonistWire.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[179].Begin()}),0>=Game.Stats.AntagonistWire.Get()&&1<=Game.Stats.MetAntagonist.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[180].Begin()}),0>=Game.Stats.MetAntagonist.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FC[181].Begin()})}}),Game.Scenes.FC[179]=new Scene({text:`
    Меня невольно бросило в жар от воспоминаний о проведенном с ним времени. Он смотрел на меня с жадностью, улыбался и даже осмелился подмигнуть.. 
    <p>Это не скрылось от глаз Роберта, который выглядел взбешенным. Безусловно, он узнал его.
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[182].Begin()}]}),Game.Scenes.FC[180]=new Scene({text:`
    Я тут же встретилась глазами с Робертом. Он выглядел взбешенным и готов был рвать и метать при виде моего испуганного взгляда. 
    <p>Тесла почувствовал неладное и положил другу на плечо руку, дабы разрядить обстановку.
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[182].Begin()}]}),Game.Scenes.FC[181]=new Scene({text:`
    Его появление вызвало у меня одно лишь негодование. 
    <p>“Значит, Эдисон спелся со злодеем? И при чем тут Эдвард или Нэйтан… Я ничего не понимаю!”
       `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[182].Begin()}]}),Game.Scenes.FC[182]=new Scene({text:`
    После всех представлений, участники стали рассказывать про свои изобретения и возможное развитие будущего электричества.
    <p>Я понимала, что сейчас речь идет о переменном и постоянном токе. Это основная суть конфликта Эдисона и Теслы. Но я не была сильна в этой области, поэтому если кратко: Эдисон разработал системы освещения, которые могли работать на дальних дистанциях, но с маленьким напряжением.
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[183].Begin()}]}),Game.Scenes.FC[183]=new Scene({text:`
    Для равномерного распределения электричества, нужно было строить электростанции практически в каждом районе города. В связи с чем, это обходилось правительству в кругленькую сумму, 
    <p>Тесла вместе с известным предпринимателем по фамилии Вестингауз предлагали более дешевый метод освещения. Построить одну большую электростанцию и снижать напряжение путем передачи тока через провода и подстанции.
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[184].Begin()}]}),Game.Scenes.FC[184]=new Scene({text:`
    “Видимо на данном этапе ему помогает Роберт. Странно, что о нем не было упоминания в известных мне биографиях Теслы.”
    <p>Конфликт длился долго и каждый не стеснялся использовать грязные методы для победы. 
    <p>Выступления были ограничены по времени. Каждый оратор старался кратко и по сути рассказать о своих изобретениях и влиянии, которое они могут оказать в будущем.
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[185].Begin()}]}),Game.Scenes.FC[185]=new Scene({text:`
    Я завороженно любовалась дебатами и с удовольствием слушала новую для меня информацию. 
    <p>Когда все насладились выступлениями, а вечер подходил к концу, Роберт был рядом со мной, так как волновался за мою безопасность.
       `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[186].Begin()}]}),Game.Scenes.FC[186]=new Scene({text:`
    Меня не отпускала мысль, что я вижу Нэйтана или его предка…
    <p>“Это не может быть совпадением. Как и в случае со мной. Очевидно, что Катарина мой двойник. Неужели и у Нэйтана также? Он путешественник? Или это действительно его родственник? Я должна выяснить!”
       `,background:"Persons/Neitan_TL",buttontext:[""],buttonaction:[()=>{Game.Scenes.FC[187].Begin(),Game.Achievements.Ball.Unlock()}]}),Game.Scenes.FC[187]=new Scene({text:`
    Я облокотилась о стену, так как сильно закружилась голова. Тяжело было контролировать такой поток информации. Одно накладывалось на другое. Путаница. Хаос. 
    <p>Я потеряла сознание в руках Роберта.
       `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{setTimeout(()=>{Game.Scenes.FifthPart[0].Begin()},1e3),Game.LoadScreen("FifthPart"),Game.Progress.Save("FifthPart")}]}),Game.Scenes.FifthPart=[],Game.Scenes.FifthPart[0]=new Scene({text:`
    Я резко вскочила с дивана, жадно хватая ртом воздух. Практически не ощущая себя в пространстве, я попыталась оглянуться, чтобы понять, где нахожусь.
            `,background:"Backgrounds/Hero_Sleeps",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[2].Begin()}],condition:()=>{Game.Sounds.Play("Music","Realities")}}),Game.Scenes.FifthPart[2]=new Scene({text:`
    “Это мой дом?”
    <p>Мельком я замечала куски нескольких реальностей, собранных воедино. Как два разных пазла, которые нечаянно смешались и теперь невозможно было сложить четкую картинку.
            `,background:"Backgrounds/Dimensions",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[67].Begin()}]}),Game.Scenes.FifthPart[67]=new Scene({text:`
    Все расплывалось перед глазами. Я была уверена, что нахожусь в своей гостинной и вижу перед собой обеденный стол, где мы часто проводили время с родителями. Но в то же время он приобретал очертания старинного столика, с присущей ему изысканной резьбой, за которым Роберт однажды предлагал мне выпить.
            `,background:"Backgrounds/Dimensions",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[68].Begin()}]}),Game.Scenes.FifthPart[68]=new Scene({text:`
     “Что это? Все наслаивается друг на друга. Где я?”
            `,background:"Backgrounds/Dimensions",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[69].Begin()}]}),Game.Scenes.FifthPart[69]=new Scene({text:`
     Немного успокоившись, я сделала вывод, что скорее всего - это просто сон. Или усталость от нескончаемых перемещений, дававшая о себе знать в такой изощренной форме. Я закрыла глаза и ударила себя несколько раз по щекам, в надежде очнуться и отогнать появляющиеся смазанные образы.
            `,background:"Backgrounds/Dimensions",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[70].Begin()}]}),Game.Scenes.FifthPart[70]=new Scene({text:`
     В этом хаосе, единственное, что я четко могла различить - фигуру Роберта, держащего на руках девушку. Он тряс ее и почти криком просил только об одном: 
     <p>- Катарина, очнись!
     <p>Но ответом ему было протяжное молчание.
            `,background:"Backgrounds/Couch",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[3].Begin()}]}),Game.Scenes.FifthPart[3]=new Scene({text:`
    Я наблюдала, как все обеспокоенно обступили охотника и девушку, что не подавала признаков жизни. Гости шептались, некоторые предлагали пригласить врача, но Роберт их словно не слышал.
    <p>Я почувствовала, что:
            `,background:"Backgrounds/Couch",buttontext:["\u041C\u043D\u0435 \u0445\u043E\u0447\u0435\u0442\u0441\u044F \u043F\u043E\u043C\u043E\u0447\u044C \u0420\u043E\u0431\u0435\u0440\u0442\u0443","\u041C\u043D\u0435 \u0431\u044B\u043B\u043E \u0432\u0441\u0435 \u0440\u0430\u0432\u043D\u043E"],buttonaction:[()=>{Game.Scenes.FifthPart[4].Begin()},()=>{Game.Scenes.FifthPart[9].Begin()}]}),Game.Scenes.FifthPart[4]=new Scene({text:`
    Внутри все сжалось, от осознания тоски по моему новому знакомому. Несмотря на его холодное и, местами, равнодушное поведение - он оставался верен своим принципам. 
    <p>Для него в приоритете была защита близких. И он просто не успевал радоваться мелочам, любить и быть любимым. Ощущать чью-то заботу, растворяться в этих простых эмоциях.
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[5].Begin()}]}),Game.Scenes.FifthPart[5]=new Scene({text:`
    Эта черта не могла не отзываться желанием показать ему, каково это - жить для себя.
    <p>Обнимая девушку, он нисколько не лукавил. Нет. Он беспокоился, боялся потерять. По-настоящему боялся. Наконец-то, я увидела его истинные чувства. Ко мне они были или к Катарине - я не знала. Да и какая разница, ведь сейчас мы с ней - одно целое.
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[6].Begin()}]}),Game.Scenes.FifthPart[6]=new Scene({text:`
    Мне было невыносимо смотреть на его попытки привести Катарину в чувства. Он был растерян, кажется, впервые с момента нашей встречи. Могла ли я что-то сделать, чтобы помочь ему?
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[7].Begin()}]}),Game.Scenes.FifthPart[7]=new Scene({text:`
    Я хотела открыться. Каждый раз погружаясь в этот хаос, я ощущала потребность поделиться своими страхами и сомнениями с кем-нибудь, ведь так тяжело нести это бремя в одиночестве. Почему это не может быть он?
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[8].Begin(),Game.Message("\u0412\u044B \u0445\u043E\u0442\u0438\u0442\u0435 \u0431\u044B\u0442\u044C \u0431\u043B\u0438\u0436\u0435 \u043A \u0420\u043E\u0431\u0435\u0440\u0442\u0443 \u0438, \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u0434\u0430\u0436\u0435 \u043E\u0442\u043A\u0440\u044B\u0442\u044C\u0441\u044F \u0435\u043C\u0443."),Game.Stats.Robert.Add(1)}]}),Game.Scenes.FifthPart[8]=new Scene({text:`
     Роберт - охотник и кому, как не ему разбираться в этих непривычных миру вещах. 
     <p>“Надеюсь, мы еще встретимся и ты узнаешь меня настоящую.”
            `,background:"Persons/Robert",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[23].Begin()}]}),Game.Scenes.FifthPart[9]=new Scene({text:`
     Мне было неприятно смотреть на отчаянные попытки охотника привести Катарину в чувства. 
    <p>Я не разделяла всеобщую панику, так как была уверена, что с девушкой все будет в порядке. Судя по ее биографии ей предстоят еще долгие годы жизни впереди.
            `,background:"Backgrounds/Ball",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[71].Begin()}]}),Game.Scenes.FifthPart[71]=new Scene({text:`
     Я решила сфокусировать своё внимание на Николе и Эдварде и снова погрузилась в состояние неопределённости, чтобы найти то чувство, которое приведёт меня к ним. У меня оставалась куча вопросов к личности этого загадочного двойника моего учителя, да и с Теслой мы не поговорили как следует. 
            `,background:"Backgrounds/Dimensions",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[10].Begin()}]}),Game.Scenes.FifthPart[10]=new Scene({text:`
     Возможно, именно они могли дать мне те ответы, в которых я так отчаянно нуждалась. 
    <p>Я сосредоточилась на:
            `,background:"Backgrounds/Dimensions",buttontext:["\u041C\u044B\u0441\u043B\u044F\u0445 \u043E \u0422\u0435\u0441\u043B\u0435","\u041C\u044B\u0441\u043B\u044F\u0445 \u043E\u0431 \u042D\u0434\u0432\u0430\u0440\u0434\u0435"],buttonaction:[()=>{Game.Scenes.FifthPart[11].Begin()},()=>{Game.Scenes.FifthPart[18].Begin()}]}),Game.Scenes.FifthPart[11]=new Scene({text:`
     Никола стоял на террасе и не видел, что произошло с Катариной. Ученый на повышенных тонах вел беседу с Томасом Эдисоном. Оба были на пределе. Недовольные, злые. Складывалось ощущение - одно мгновение и в дело пойдут кулаки. 
    <p>- Я последний раз тебя предупреждаю, заплати мне это проклятое жалование и мы разойдемся по-хорошему, - Никола смотрел прямо в глаза собеседнику.
            `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[12].Begin()}]}),Game.Scenes.FifthPart[12]=new Scene({text:`
     - А я еще раз тебе повторяю - мне нужен результат, за который ты требуешь плату. А я получаю лишь твои неосуществимые фантазии об изобретениях, способных улучшить мир и отлынивание от работы, - Эдисон закурил сигару, не стесняясь пускать дым прямо в лицо Тесле.
            `,background:"Persons/Thomas",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[13].Begin()}]}),Game.Scenes.FifthPart[13]=new Scene({text:`
     - Я делал эти чертовы лампочки, как ты просил. И я требую получить часть положенных мне выплат за отработанное время, - Никола кипел от ярости. - И вообще, Эдисон, складывается ощущение, что ты просто скряга. Скряга, который находит любое оправдание, лишь бы не выплачивать заслуженную заработную плату честным людям!
            `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[14].Begin()}]}),Game.Scenes.FifthPart[14]=new Scene({text:`
     - Насколько я помню, было выплачено ровно столько, сколько ты заслуживаешь. Прекрати уже витать в своих фантазиях и прими то, что тебе дают. 
    <p>Тесла отвернулся и долго о чем-то размышлял.
            `,background:"Persons/Thomas",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[15].Begin()}]}),Game.Scenes.FifthPart[15]=new Scene({text:`
     - А я ведь верил в тебя. Ты был моим кумиром. Человеком, который мог изменить жизнь всей Америки. Но в реальности, ты оказался таким мелочным, а великие открытия уже не стоят для тебя на первом месте. Я не хочу быть таким, как ты.
            `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[16].Begin()}]}),Game.Scenes.FifthPart[16]=new Scene({text:`
     - Не желаю больше слушать эту клевету, - Эдисон громко вздохнул. - Ты так и остался тем наивным глупцом, который когда-то стоял на моем пороге с горящими глазами. Все продолжаешь фантазировать о вещах, вроде машины времени, которые недоступны человеку. Оставь детские фантазии, повзрослей и прими реальность.
            `,background:"Persons/Thomas",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[17].Begin(),Game.Message("\u0412\u044B \u0443\u0437\u043D\u0430\u0435\u0442\u0435 \u0422\u0435\u0441\u043B\u0443 \u0432\u0441\u0435 \u043B\u0443\u0447\u0448\u0435"),Game.Stats.Nicola.Add(1)}]}),Game.Scenes.FifthPart[17]=new Scene({text:`
     Не в силах больше выносить оскорбления в свой адрес, Тесла покинул террасу со словами:
    <p>- Мы еще посмотрим, кто по итогу станет великим.
            `,background:"Persons/Nicola",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[23].Begin()}]}),Game.Scenes.FifthPart[18]=new Scene({text:`
     Эдвард находился в саду вместе с Александром. Они стояли около фонтана и вели на первый взгляд непринужденную беседу.
     <p>- Так ты все же общаешься с братом, несмотря на запрет? - Александр равнодушно оглядывал местность.
            `,background:"Persons/Neitan_TL",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[19].Begin()}]}),Game.Scenes.FifthPart[19]=new Scene({text:`
     - Я не могу по-другому. Ты знаешь - он моя семья. 
     <p>- Знаю. Но ОНА недовольна этим фактом. 
     <p>Эдвард печально вздохнул. Он не смотрел на собеседника, не пытался отыскать что-то взглядом в скрытых тенями уголках сада. Его взор был пустым. Будто бы мужчина был заложником неведомых обстоятельств.
            `,background:"Persons/Neitan_TL",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[20].Begin()}]}),Game.Scenes.FifthPart[20]=new Scene({text:`
     - Сделаю тебе последнее предупреждение, - Александр грозно посмотрел на Эдварда. - Не делай глупостей, о которых можешь впоследствии пожалеть. Ты выбрал сторону. Хочешь - развлекайся. Играй в семью. Но помни, что ты все это начал и пришёл к нам по собственной воле. 
      <p>- Я помню. Твои нотации - пустая трата времени.
            `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[21].Begin()}]}),Game.Scenes.FifthPart[21]=new Scene({text:`
     - Отнюдь, - улыбнулся Александр. - Я вижу твое смятение. Ты не уверен. И не только мне удалось разглядеть эти ненужные эмоции. 
      <p>- Ты что же, беспокоишься обо мне? - Эдвард ухмыльнулся. - А ОНА знает об этом разговоре? Не боишься ее гнева?
      <p>- А, может, я хочу быть тебе другом, не думал? - мужчина в маске, казалось, стал немного серьезнее.
            `,background:"Persons/Antagonist",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[22].Begin(),Game.Message("\u041A \u0447\u0435\u043C\u0443 \u043F\u0440\u0438\u0432\u0435\u0434\u0435\u0442 \u0432\u0430\u0448\u0430 \u0437\u0430\u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043E\u0432\u0430\u043D\u043D\u043E\u0441\u0442\u044C \u042D\u0434\u0432\u0430\u0440\u0434\u043E\u043C?"),Game.Stats.Neitan.Add(1)}]}),Game.Scenes.FifthPart[22]=new Scene({text:`
     - Я принял к сведению, - Эдварду совершенно не хотелось вести дальнейшую беседу. - Не пора ли нам возвращаться?
    <p>- Ты волен уйти, когда пожелаешь. У меня и в мыслях не было держать тебя здесь насильно. Однако посмотри на этот прекрасный сад, ты не замечаешь, как красиво это место?
    <p>Эдвард не стал дослушивать и уже удалялся в сторону мероприятия, погрузившись в глубокие раздумья. 
            `,background:"Persons/Neitan_TL",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[23].Begin()}]}),Game.Scenes.FifthPart[23]=new Scene({text:`
     Обрывки воспоминаний или, чем бы это не было, начали понемногу отступать. На смену пришло осознание, что я наконец-то вернулась домой. 
      <p>Мягкий диван, тихая и мирная обстановка. А главное - привычная и родная.
            `,background:"Backgrounds/Hero_Sleeps",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[24].Begin()}],condition:function(){Game.Sounds.Play("Music","FirstChapter"),Game.Effects.Flash()}}),Game.Scenes.FifthPart[24]=new Scene({text:`
     “Запах поджаренного хлеба и яиц... Стоп. Что?!”. 
    <p>Я медленно приподнялась и неожиданно для себя увидела перед собой Леона, который улыбался мне, будучи одетым в фартук с цветочками.
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[25].Begin()}]}),Game.Scenes.FifthPart[25]=new Scene({text:`
     - Ты наконец-то проснулась, - проговорил парень, лениво потянувшись. - Долго же ты спала, соня. Что тебе такого интересного снилось? 
     <p>“Что происходит… прошло ведь больше недели с моего пребывания в эпохе Теслы. Почему Леон все еще у меня дома?”
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[26].Begin()}]}),Game.Scenes.FifthPart[26]=new Scene({text:`
     - Что мы делали вчера? 
      <p>Леон недоуменно взглянул на меня и твердо заявил: 
      <p>- Весело проводили время, забыла уже, что ли? 
      <p>“Он говорит о нашей тусовке? Не понимаю. Как такое возможно?”
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[27].Begin()}]}),Game.Scenes.FifthPart[27]=new Scene({text:`
     От осознания своей беспомощности, я просто уставилась в стену, пытаясь привести мысли в порядок. 
    <p>“Я нахожусь в своем времени? Или это сон во сне?”
    <p>Хотелось рвать и метать. Столько вопросов и ни одного ответа, который помог бы мне справиться с этой неопределенностью.
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[30].Begin()}],condition:function(){0>=Game.Stats.BrokenHand.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FifthPart[30].Begin()}),1<=Game.Stats.BrokenHand.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FifthPart[28].Begin()})}}),Game.Scenes.FifthPart[28]=new Scene({text:`
     “Рука!”
      <p>Травма, с которой я была довольно долгий период, просто исчезла. Я как обычно начала шевелить своими руками, не чувствуя дискомфорта.
      <p>Никаких повреждений, никакого гипса.
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[29].Begin()}]}),Game.Scenes.FifthPart[29]=new Scene({text:`
     “Неужели перелом, который я заработала из-за своей оплошности, теперь придется донашивать настоящей Катарине… Я чувствую себя виноватой.”
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[30].Begin()}]}),Game.Scenes.FifthPart[30]=new Scene({text:`
     Леон встал передо мной и начал размахивать руками, надеясь привлечь мое внимание. 
    <p>- Прием! Как слышно, $Имя Игрока$!? - попытки парня не увенчались успехом. - Похоже кто-то вчера слишком повеселился. Скар, давай уже завтракать. Будем реанимировать.
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[31].Begin()}]}),Game.Scenes.FifthPart[31]=new Scene({text:`
     Девушка что-то отвечала Леону, пока тот аккуратно взял меня за руку и потянул к накрытому столу. А я была словно кукла, не в силах самостоятельно контролировать свои движения.
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[32].Begin()}]}),Game.Scenes.FifthPart[32]=new Scene({text:`
     Когда меня усадили на стул, Скарлетт заботливо налила мне кофе и положила только что приготовленную еду. Лицо у подруги было довольно обеспокоенным, она спросила: 
    <p>- Тебе плохо, $Имя Игрока$? Может, какое лекарство принести?
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[33].Begin()}]}),Game.Scenes.FifthPart[33]=new Scene({text:`
     Я отрешенно взглянула на нее и нашла в себе силы отрицательно помотать головой. 
     <p>- Брось, Скар, вкусная еда и классная компания быстро поставят ее на ноги! - Леон намазывал на тост клубничный джем. - Давай, $Имя Игрока$, надо поесть.
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[34].Begin()}]}),Game.Scenes.FifthPart[34]=new Scene({text:`
     Мне не хотелось еще больше волновать друзей, поэтому пришлось насильно запихать в себя несколько кусочков яичницы. Ребята облегченно вздохнули и принялись обсуждать планы на день.
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[35].Begin()}]}),Game.Scenes.FifthPart[35]=new Scene({text:`
     - Леон, чем будешь сегодня заниматься? У тебя сегодня выходной на работе? - спросила Скарлетт, попивая чай. 
     <p>- Мне нужно встретиться с братом, а после… Даже и не знаю, может быть займусь поиском мотоцикла, если не вызовут на подработку.
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[36].Begin()}]}),Game.Scenes.FifthPart[36]=new Scene({text:`
     -  Я думала, ты наконец-то оставил эту затею, тебе еще раз напомнить, сколько людей в год разбивается на мотоциклах? - девушка укоризненно посмотрела на Леона. - Сколько раз тебе надо донести эту мысль, чтобы ты отказался от этой идеи? 
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[37].Begin()}]}),Game.Scenes.FifthPart[37]=new Scene({text:`
     - Ох, в любую секунду на меня может метеорит свалиться. Что мне теперь бояться выходить на улицу? Нужно успевать жить. Ведь никто не знает, сколько у нас времени.
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[38].Begin()}]}),Game.Scenes.FifthPart[38]=new Scene({text:`
     Друзья синхронно посмотрели на меня, будто бы ожидая, что я решу их спор. Мне и без этого было тошно, но все же… 
     <p>Я:
            `,background:"Backgrounds/Kitchen",buttontext:["\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u043B\u0430 \u041B\u0435\u043E\u043D\u0430","\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u043B\u0430 \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442"],buttonaction:[()=>{Game.Scenes.FifthPart[39].Begin(),Game.Stats.SupportLeon.Add(1)},()=>{Game.Scenes.FifthPart[43].Begin()}]}),Game.Scenes.FifthPart[39]=new Scene({text:`
     - Леон прав, Скар. Никогда не знаешь, что с тобой может произойти в любую секунду. На страх просто нет времени. 
     <p>- Глупости… - девушка надула губки. - А вдруг это мимолетное решение? Кто как ни близкие вовремя вправят мозги.
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[40].Begin()}]}),Game.Scenes.FifthPart[40]=new Scene({text:`
     - Может и так, - я откинула голову назад, буравя потолок взглядом. - Но если он все решил, значит, выбор был обдуманным и взвешенным. 
     <p>- А мальчики на такое способны? - Скарлетт не собиралась сдаваться.
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[41].Begin()}]}),Game.Scenes.FifthPart[41]=new Scene({text:`
      Леон поставил чашку с кофе на стол и сказал:
      <p>- Представь себе, даже мы можем быть серьезными. Иногда. Я уже не говорю про сильное мужское плечо, которые мы частенько вам предоставляем… Не ценишь ты мужчин, Скар. Удар ниже пояса!
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[42].Begin(),Game.Message("\u041B\u0435\u043E\u043D \u0431\u043B\u0430\u0433\u043E\u0434\u0430\u0440\u0435\u043D \u0437\u0430 \u0441\u043F\u0430\u0441\u0435\u043D\u0438\u0435 \u043E\u0442 \u043D\u043E\u0442\u0430\u0446\u0438\u0439 \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442"),Game.Stats.Leon.Add(1)}]}),Game.Scenes.FifthPart[42]=new Scene({text:`
      Разговор принял шутливый тон и все начали понемногу расслабляться. 
      <p>- Пф, ладно, решил так решил. Если буду тебя навещать в больнице, обязательно принесу твои любимые гамбургеры, - откусывая бутерброд, сказала Скарлетт.
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[47].Begin()}]}),Game.Scenes.FifthPart[43]=new Scene({text:`
      - Скар права, Леон. Это не шутки, речь ведь идет о твоей жизни. Сколько таких же беспечных разбиваются, думая, что этот выбор был правильным? Может, стоит рассмотреть более безопасные увлечения. Вон, например, чтение книг или игра на гитаре.
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[44].Begin()}]}),Game.Scenes.FifthPart[44]=new Scene({text:`
      - $Имя Игрока$, я все это понимаю, но мне нравится именно это увлечение и от вас я бы хотел услышать поддержку, а не чтение нотаций. Мой выбор был осознанным, и я достаточно взрослый, чтобы это понять.
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[45].Begin()}]}),Game.Scenes.FifthPart[45]=new Scene({text:`
      - Видишь, Леон, - Скарлетт победоносно улыбнулась. - Если ты не хочешь прислушиваться ко мне, то может хотя бы $Имя Игрока$ будет для тебя весомым аргументом? 
      <p>- Да дело не в том, кто - за, кто - против. Поймите, хоть весь мир встанет с вилами и будет отговаривать. Я буду стоять на своем. 
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[46].Begin(),Game.Message("\u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442 \u0440\u0430\u0434\u0430 \u0432\u0430\u0448\u0435\u0439 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0435"),Game.Stats.Scarlett.Add(1)}]}),Game.Scenes.FifthPart[46]=new Scene({text:`
      - А мы все еще о мотоциклах? - казалось, больше сил спорить у девушки не было. - Упрямец, если мне придется навещать тебя в больнице, так и быть, обязательно принесу твои любимые гамбургеры.
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[47].Begin()}]}),Game.Scenes.FifthPart[47]=new Scene({text:`
       После утомительных разговоров я ощущала дикую усталость и решила еще немного посидеть. Леон убирал со стола, а Скарлетт начала мыть посуду. Мне же было все труднее приходить в себя после перемещений. Сознание будто бы раскалывалось на несколько частей. Я до сих пор не понимала, в каком времени пребываю.
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[52].Begin()}],condition:function(){4<=Game.Stats.Leon.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FifthPart[48].Begin(),Game.Sounds.Play("Music","Leon")}),3>=Game.Stats.Leon.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FifthPart[52].Begin()})}}),Game.Scenes.FifthPart[48]=new Scene({text:`
       Было видно, как Леона беспокоит мое состояние. Он не мог спокойно заниматься домашними делами. Отвлекался, крутился вокруг меня, поглядывая беспокойным взглядом.
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[49].Begin()}]}),Game.Scenes.FifthPart[49]=new Scene({text:`
       Бросив несколько тарелок в распоряжение Скарлетт, Леон присел передо мной на колени, взял меня за руки и сказал: 
       <p>- Давай все же выпьем лекарство. На тебе совсем лица нет. Мне невыносимо просто смотреть и ощущать, что никак не могу тебе помочь.

            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[50].Begin()}]}),Game.Scenes.FifthPart[50]=new Scene({text:`
       Я отрицательно покачала головой. 
      <p>- Что случилось, $Имя Игрока$? Дело ведь не во вчерашней тусовке, так? 
      <p>Его проницательность была как всегда на высоте. Я не знала, что ответить. 
      <p>“Очередную ложь? Да, ведь просто так все выложить, рассказать про свои переживания - глупое решение. Он не поверит. А если и поверит, то что дальше? Мои проблемы решатся по щелчку?”
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[51].Begin()}]}),Game.Scenes.FifthPart[51]=new Scene({text:`
       - Продолжаешь молчать? - парень вздохнул. - Что ж, надеюсь, когда-нибудь ты будешь готова поделиться своим грузом со мной. А пока заварю тебе еще чайку, что ли. 
       <p>Эта фраза заставила меня невольно улыбнуться. Увидев мой искренний жест, Леон сильнее сжал мои руки и ушел в сторону кухни.
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[52].Begin(),Game.Sounds.Play("Music","FirstChapter")}]}),Game.Scenes.FifthPart[52]=new Scene({text:`
       Из моих дальнейших размышлений меня выдернул звонок в дверь. 
      <p>- $Имя Игрока$, - крикнула Скарлетт. - Открой, пожалуйста, мы тут немного заняты. Возимся с мусором.
      <p>Я лениво поплелась в сторону двери. 
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[53].Begin()}]}),Game.Scenes.FifthPart[53]=new Scene({text:`
       Когда я ее открыла, то увидела улыбчивого профессора Нэйтана, который тут же протянул мне коробку с конфетами. 
       <p>- Приехал забрать брата и принес тебе чуть-чуть вкусностей. Вы с Леоном любите такие.
            `,background:"Persons/Neitan",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[54].Begin()}]}),Game.Scenes.FifthPart[54]=new Scene({text:`
       Я не знала, как мне реагировать. Сейчас передо мной стоял мой учитель, но ведь в XIX веке… Был точно такой же человек. Похожее лицо. На секунду мне даже показалось, что у них идентичные голоса. 
       <p>“Как такое возможно? Если раньше меня посещали сомнения, то теперь я уверена - они практически одинаковые.”
            `,background:"Persons/Neitan",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[55].Begin()}]}),Game.Scenes.FifthPart[55]=new Scene({text:`
       Резкая головная боль пронзила меня, заставив упасть на колени перед Нэйтаном. Профессор тут же опустился рядом, поддерживая меня за плечи и проговаривая:
       <p>- Что случилось? $Имя Игрока$, я вызываю скорую.
            `,background:"Persons/Neitan",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[56].Begin()}]}),Game.Scenes.FifthPart[56]=new Scene({text:`
      Я схватила его за руку и взглянула ему прямо в глаза. Мое тело действовало будто бы в отрыве от моих желаний. Дрожащим голосом я произнесла:
            `,background:"Persons/Neitan",buttontext:["\u042D\u0434\u0432\u0430\u0440\u0434","\u041D\u044D\u0439\u0442\u0430\u043D"],buttonaction:[()=>{Game.Scenes.FifthPart[57].Begin()},()=>{Game.Scenes.FifthPart[57].Begin(),Game.Achievements.Oops.Unlock()}]}),Game.Scenes.FifthPart[57]=new Scene({text:`
       - Эдвард? - я не могла произнести никакого другого имени.  
      <p>Нэйтан встал и заметно переменился в лице. Его взгляд выражал страх и озадаченность. Он стал как-то по особенному на меня смотреть, словно я перестала быть его знакомой, а резко стала чужим человеком.
            `,background:"Persons/Neitan",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[58].Begin()}]}),Game.Scenes.FifthPart[58]=new Scene({text:`
        - Что ты сказала? 
        <p>- Эдвард, - я решила идти до конца. 
        <p>Но профессор довольно быстро успокоил свои эмоции, помог мне подняться и сказал: 
        <p>- Кто такой этот Эдвард?
            `,background:"Persons/Neitan",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[59].Begin()}]}),Game.Scenes.FifthPart[59]=new Scene({text:`
        "Он словно изображает из себя дурочка… Мне же не могли показаться его резкие смены настроения? Или я себе все напридумывала?”
            `,background:"Persons/Neitan",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[60].Begin()}]}),Game.Scenes.FifthPart[60]=new Scene({text:`
        Меня спас Леон, который вышел поприветствовать брата. Они пожали друг другу руки, при этом Нэйтан не сводил с меня глаз. Он будто бы ждал, что я отвечу на вопрос.
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[61].Begin()}]}),Game.Scenes.FifthPart[61]=new Scene({text:`
        - Нэйтан, я готов. Поехали? 
        <p>- Поехали, - короткий холодный ответ профессора заставил меня поежиться. 
        <p>- $Имя Игрока$, мне пора, если что нужно, обязательно пиши, - Леон обнял меня и сел в машину Нэйтана.
        <p>- Пока… и до свидания, профессор.
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[62].Begin()}]}),Game.Scenes.FifthPart[62]=new Scene({text:`
        Братья уехали, оставив меня стоять на пороге в полной растерянности. Вскоре ушла и Скарлетт, сославшись на то, что еще надо готовиться к предстоящим парам. 
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[63].Begin()}]}),Game.Scenes.FifthPart[63]=new Scene({text:`
        Для меня было облегчением наконец-то остаться одной. Я тут же направилась в свою комнату и благополучно уснула. 
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[64].Begin(),Game.Message("<a style=\"font-weight: 800; color: #76adff\">\u0412\u044B \u0438\u0433\u0440\u0430\u0435\u0442\u0435 \u043E\u0442 \u043B\u0438\u0446\u0430 \u041D\u044D\u0439\u0442\u0430\u043D\u0430"),Game.Sounds.Play("Music","Neitan")}]}),Game.Scenes.FifthPart[64]=new Scene({text:`
        Я вел машину, но все мои мысли были сосредоточены на этом имени. Услышав его от своей ученицы, я действительно впал в ступор, словно знал его, но забыл или не хотел вспоминать.
            `,background:"Persons/Neitan",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[65].Begin()}]}),Game.Scenes.FifthPart[65]=new Scene({text:`
        Я решил попробовать поговорить с Леоном, который в этом время что-то усердно искал в телефоне:
        <p>- Тебе знакомо имя Эдвард? 
        <p>Леон оторвался от поисков и внимательно посмотрел на брата:
        <p>- Никого с таким именем не припоминаю. А что? 
            `,background:"Persons/Neitan",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[66].Begin()}]}),Game.Scenes.FifthPart[66]=new Scene({text:`
        Я продолжал вести машину, размышляя, могу ли я сказать брату о сегодняшнем инциденте? Даже такая мелочь может выйти мне боком в игре, которую я задумал. И Леон  об этом знает. Наши взгляды на жизнь сильно различаются. В связи с этим мы частенько ругаемся, иногда забывая, что мы прежде всего - семья.
        <p>И я:
            `,background:"Persons/Neitan",buttontext:["\u0420\u0430\u0441\u0441\u043A\u0430\u0437\u0430\u043B \u043A\u0430\u043A \u0435\u0441\u0442\u044C","\u0421\u043C\u0435\u043D\u0438\u043B \u0442\u0435\u043C\u0443 \u0440\u0430\u0437\u0433\u043E\u0432\u043E\u0440\u0430"],buttonaction:[()=>{Game.Scenes.FifthPart[72].Begin()},()=>{Game.Scenes.FifthPart[80].Begin()}]}),Game.Scenes.FifthPart[72]=new Scene({text:`
        Я поделился с Леоном странным поведением, с которым столкнулся сегодня. 
        <p>- $Имя Игрока$ вела себя немного странно, когда мы встретились… Знаешь, она сказала имя - Эдвард. Это заставило меня всерьез озадачиться. Будто бы я упускаю что-то важное…
        <p>Брат с удивлением взглянул на меня, видимо, не ожидая, что я буду столь открыто говорить с ним о моих смятениях.
            `,background:"Persons/Neitan",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[73].Begin()}]}),Game.Scenes.FifthPart[73]=new Scene({text:`
        - Может, это имя и правда всколыхнуло твои воспоминания, ведь наша жизнь была столь насыщенной, что сейчас все и не вспомнишь.
        <p>Однако я не думаю, что $Имя Игрока$ догадывается о чем-то. К тожу же, судя по ее утреннему состоянию, она не до конца пришла в себя после нашей “небольшой” тусовки.
            `,background:"Backgrounds/Car",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[75].Begin()}]}),Game.Scenes.FifthPart[75]=new Scene({text:`
        - Ты что же, думаешь, что это просто случайность? - уточнил я, не отвлекаясь от дороги. 
        <p>- Случайности - не случайны, - с задумчивым видом произнес Леон.
            `,background:"Backgrounds/Car",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[76].Begin()}]}),Game.Scenes.FifthPart[76]=new Scene({text:`
        - Теперь ты цитируешь персонажей из мультфильмов? Уж извини, тебе еще далеко до мудрости той черепахи.
        <p>Мы искренне засмеялись на секунду забыв обо всех мучивших нас вопросах. 
            `,background:"Backgrounds/Car",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[77].Begin()}]}),Game.Scenes.FifthPart[77]=new Scene({text:`
        - А если серьезно, - меня не отпускала мысль о недавно произошедшем инциденте, - Мне знакомо это имя, только не могу вспомнить, когда же мне приходилось его слышать… Думаю, если это что-то настолько важное, правильная мысль сама придет в голову. Так ведь говорила мама?
            `,background:"Persons/Neitan",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[78].Begin()}]}),Game.Scenes.FifthPart[78]=new Scene({text:`
        -  Мама была мудрой женщиной. Вот и прислушайся к этому совету, не накручивай себя, - откинувшись на спинку сидения сказал Леон, потягиваясь. - И в конце концов. Ты же историк. Попробуй покопаться в архивах нашей семьи. Не зря же он существует.
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[79].Begin(),Game.Message("\u0421\u0432\u044F\u0437\u044C \u0431\u0440\u0430\u0442\u044C\u0435\u0432 \u043A\u0440\u0435\u043F\u0447\u0430\u0435\u0442"),Game.Stats.Brothers.attitude+=1}]}),Game.Scenes.FifthPart[79]=new Scene({text:`
        - Хорошо, что ты поехал со мной сегодня, давно мы так не разговаривали. О чем-то, помимо работы или учебы. Спасибо, что выслушал, - я глянул на пассажирское сиденье и невольно улыбнулся, обнаружив Леона спящим.
            `,background:"Backgrounds/Car",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[86].Begin()}]}),Game.Scenes.FifthPart[80]=new Scene({text:`
         - Ничего, просто одна мысль резко всплыла в голове, не обращай внимания. 
            `,background:"Backgrounds/Car",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[81].Begin()}]}),Game.Scenes.FifthPart[81]=new Scene({text:`
         Леон посмотрел на меня, как будто бы догадался о моем намерении скрыть информацию, а затем сказал: 
         <p>- Ты же знаешь, несмотря на наши разногласия, я всегда готов тебе помочь. 
            `,background:"Backgrounds/Car",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[82].Begin()}]}),Game.Scenes.FifthPart[82]=new Scene({text:`
         “Знаю.”
          <p>От этого было еще больнее, но дело всей моей жизни не должно страдать из-за желания поддаться эмоциям. 
          <p>- Все хорошо.
            `,background:"Persons/Neitan",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[83].Begin()}]}),Game.Scenes.FifthPart[83]=new Scene({text:`
         Брату оставалось лишь кивнуть, напоследок он все же добавил: 
          <p>- Ничего не меняется. Ты всегда такой. Закрытый и погруженный в себя. Почему ты не можешь просто положиться на меня? На своих братьев? Ты - вечно в делах, остальные - уехали. Мы уже давно перестали быть настоящей семьей.
            `,background:"Persons/Leon",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[84].Begin()}]}),Game.Scenes.FifthPart[84]=new Scene({text:`
         - Леон, я… 
         <p>- Избавь меня от ненужных оправданий. 
         <p>Я понимал, что брат во многом прав по отношению ко мне.
            `,background:"Backgrounds/Car",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[85].Begin(),Game.Message("\u0411\u0440\u0430\u0442\u044C\u044F \u0441\u0438\u043B\u044C\u043D\u0435\u0435 \u043E\u0442\u0434\u0430\u043B\u044F\u044E\u0442\u0441\u044F")}]}),Game.Scenes.FifthPart[85]=new Scene({text:`
         “Я делаю все это ради вас. Пусть вы будете меня ненавидеть, но никто не должен больше страдать из-за моих ошибок. Когда придет время - они все поймут. А пока, я буду продолжать держать дистанцию для их же блага.”
            `,background:"Backgrounds/Car",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[86].Begin()}]}),Game.Scenes.FifthPart[86]=new Scene({text:`
         Произошедшая ситуация действительно всколыхнула во мне что-то давно забытое, но одновременно важное. Я осознал, что необходимо действовать решительнее и тщательнее позаботиться обо всех нюансах. Особенно о тех, которые могут помешать.
            `,background:"Backgrounds/Car",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[87].Begin(),Game.Message("<a style=\"font-weight: 800; color: #edc4ff\">\u0412\u044B \u0441\u043D\u043E\u0432\u0430 \u0438\u0433\u0440\u0430\u0435\u0442\u0435 \u043E\u0442 \u043B\u0438\u0446\u0430 \u0433\u043B\u0430\u0432\u043D\u043E\u0439 \u0433\u0435\u0440\u043E\u0438\u043D\u0438"),Game.Sounds.Play("Music","FirstChapter")}]}),Game.Scenes.FifthPart[87]=new Scene({text:`
         Я проспала до самого вечера. Когда пришли родители, они даже не решились будить меня, так как понимали - мне нужен покой.
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[88].Begin()}]}),Game.Scenes.FifthPart[88]=new Scene({text:`
        Снизу доносились отрывки предложений, сказанных на повышенных тонах. Через секунду они начали переходить на крик и я окончательно проснулась. Мне было невыносимо это слушать. 
        <p>“Могла ли я чем-нибудь помочь?”
            `,background:"Backgrounds/Room",buttontext:["\u0421\u043F\u0443\u0441\u0442\u0438\u0442\u044C\u0441\u044F \u043A \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u044F\u043C","\u041E\u0441\u0442\u0430\u0442\u044C\u0441\u044F \u0432 \u043A\u0440\u043E\u0432\u0430\u0442\u0438"],buttonaction:[()=>{Game.Scenes.FifthPart[89].Begin()},()=>{Game.Scenes.FifthPart[109].Begin()}]}),Game.Scenes.FifthPart[89]=new Scene({text:`
         “Если я не вмешаюсь, то мы можем перестать быть одной семьей.” 
          <p>Я быстро накинула на себя халат и спустилась вниз. Мама сидела на диване с бокалом вина, а отец стоял рядом с ней, обессиленно опустив голову.
            `,background:"Backgrounds/Livingroom",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[90].Begin()}]}),Game.Scenes.FifthPart[90]=new Scene({text:`
         Увидев меня, мама натянула улыбку и спросила:
          <p>- Как прошла вечеринка? 
          <p>- Да, спасибо, все хорошо, - я решила не ходить вокруг да около. - Что происходит? 
          <p>Папа посмотрел на меня, проговорив: 
          <p>- Не волнуйся, просто небольшая ссора.
            `,background:"Backgrounds/Livingroom",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[91].Begin()}]}),Game.Scenes.FifthPart[91]=new Scene({text:`
         - Вы называете ваши крики “небольшой ссорой”? - я начинала понемногу злиться из-за его уклончивого ответа. 
          <p>- У каждого бывают сложные периоды в отношениях, дорогая, - говорила тихим голосом мама. - Вот и у нас сейчас так же. Прости, если мы доставляем тебе дискомфорт.
            `,background:"Backgrounds/Livingroom",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[92].Begin()}]}),Game.Scenes.FifthPart[92]=new Scene({text:`
         - Мама, - мои глаза невольно наполнились слезами. - Я знаю, что вы всю жизнь меня поддерживаете, помогаете, идете на уступки. Даже сейчас, вы отдали в распоряжение наш дом, чтобы я просто не грустила и чудно провела время с друзьями. Пожалуйста, я тоже хочу вам помочь.
            `,background:"Backgrounds/Livingroom",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[93].Begin()}]}),Game.Scenes.FifthPart[93]=new Scene({text:`
           - Мы не хотим погружать тебя глубоко в наши проблемы. Просто знай, что сейчас такой… “особенный” период, - было видно, как папа с трудом подбирал нужные слова. 
            <p>- Нам очень приятна твоя забота и ни в коем случаем не надо думать, что все плохо.. или…
            `,background:"Backgrounds/Livingroom",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[94].Begin()}]}),Game.Scenes.FifthPart[94]=new Scene({text:`
           Мама с папой переглянулись. В их взгляде будто бы промелькнуло осознание об их, возможно, не совсем правильном поведении перед дочерью.
            `,background:"Backgrounds/Livingroom",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[95].Begin()}]}),Game.Scenes.FifthPart[95]=new Scene({text:`
           Отец даже решился положить маме руку на плечо. Она не оттолкнула ее, лишь тихонечко сжала в ответ, поддерживая жест примирения. 
           <p>“Я надеюсь, что у них все наладится. По крайне мере они идут на контакт. Даже если я тот фактор, который насильно сподвигает их к этому.”
            `,background:"Backgrounds/Parents",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[96].Begin(),Game.Message("\u0412\u044B \u043F\u0440\u0435\u0434\u043E\u0442\u0432\u0440\u0430\u0442\u0438\u043B\u0438 \u0441\u0441\u043E\u0440\u0443 \u0432\u0430\u0448\u0438\u0445 \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u0435\u0439"),Game.Stats.Family.Add(1),Game.Achievements.Psy.Unlock()}]}),Game.Scenes.FifthPart[96]=new Scene({text:`
           - Ну, хватит грустить, дочка - отец подозвал меня в семейные объятия. - Мы очень ценим, что ты неравнодушна к нашим проблемам. Обещаем подумать, спокойно обсудить наши отношения и прийти к взвешенному решению.
            <p>- А как может быть иначе? - я тихонько всхлипнула, обнимая близких.
            `,background:"Backgrounds/Parents",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[97].Begin()}]}),Game.Scenes.FifthPart[97]=new Scene({text:`
           Спустя некоторое время мама принесла закуски и мы все вместе сели за стол. Я решила поинтересоваться, чем они занимались и что делали, пока мы с друзьями тусовались дома.
            `,background:"Backgrounds/Parents",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[98].Begin()}]}),Game.Scenes.FifthPart[98]=new Scene({text:`
           - О, - папа подлил вино в бокал маме. - Мы сходили в кино, затем немного погуляли и поехали к моим родителям. Кстати, бабушка и дедушка очень по тебе скучают.
            `,background:"Backgrounds/Parents",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[99].Begin()}]}),Game.Scenes.FifthPart[99]=new Scene({text:`
           - Мне действительно стоит их навестить, но со всем происходящим… 
          <p>Конечно, родители не знали обо всем, но будто бы чувствовали, что сейчас не стоит давить на меня и расспрашивать. Придет время - я сама расскажу.
            `,background:"Backgrounds/Parents",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[100].Begin()}]}),Game.Scenes.FifthPart[100]=new Scene({text:`
           Но это было бы совсем сказкой, если бы я избежала следующего вопроса:
          <p>- Ты идешь завтра в университет? - спросила мама. - Ты и так много пропустила, а мы не раз обсуждали, как важно получить высшее образование.
            `,background:"Backgrounds/Parents",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[101].Begin()}]}),Game.Scenes.FifthPart[101]=new Scene({text:`
           Я понимала, что она права и мне нечего возразить. Но столько всего происходит, что я невольно задаюсь вопросом: а надо ли оно мне? Действительно стоит тратить время на обучение? 
           <p>Я:
            `,background:"Backgrounds/Parents",buttontext:["\u041F\u043E\u0439\u0434\u0443 \u043D\u0430 \u0437\u0430\u043D\u044F\u0442\u0438\u044F","\u041E\u0441\u0442\u0430\u043D\u0443\u0441\u044C \u0434\u043E\u043C\u0430"],buttonaction:[()=>{Game.Scenes.FifthPart[102].Begin(),Game.Stats.GoStudy.Add(1)},()=>{Game.Scenes.FifthPart[107].Begin()}]}),Game.Scenes.FifthPart[102]=new Scene({text:`
           - Да, мне уже лучше. Ты абсолютно права. Я и сама сегодня обдумывала этот вопрос и решила больше не пропускать учебу. Понимаю ведь, что потом нагонять гораздо сложнее.
            `,background:"Backgrounds/Parents",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[104].Begin()}]}),Game.Scenes.FifthPart[104]=new Scene({text:`
           Родители утвердительно кивнули. 
          <p>- Молодец, хороший настрой, - папа похлопал меня по плечу.
            `,background:"Backgrounds/Parents",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[105].Begin()}]}),Game.Scenes.FifthPart[105]=new Scene({text:`
           Вскоре мы разошлись по комнатам. Я укуталась в одеяло, поставила будильник на нужное время и внимательно проверила, включен ли звук на телефоне.
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[106].Begin()}],condition:function(){1<=Game.Stats.Late.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FifthPart[106].Begin()}),0>=Game.Stats.Late.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FifthPart[119].Begin()})}}),Game.Scenes.FifthPart[106]=new Scene({text:`
           “Не хочу, чтобы повторилось мое опоздание. Вроде бы по расписанию завтра есть пара у профессора Нэйтана и при чем первая. Нужно собраться и встать по-раньше!”
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[119].Begin()}]}),Game.Scenes.FifthPart[107]=new Scene({text:`
           - Извини, мам, я все еще нехорошо себя чувствую. Думаю, мне необходимо еще немного отлежаться и долечиться. 
            <p>Родители недовольно на меня взглянули, но возражать моему решению не стали. 
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[108].Begin()}]}),Game.Scenes.FifthPart[108]=new Scene({text:`
           Вскоре мы разошлись по комнатам. Я укуталась в одеяло, пытаясь абстрагироваться от всего произошедшего. 
           <p>“Наконец-то я могу расслабиться и не думать, что мне надо кого-то спасать… или принимать трудные решения.” 
            `,background:"Backgrounds/Hero_Sleeps",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[119].Begin()}]}),Game.Scenes.FifthPart[109]=new Scene({text:`
           “Чем я могу помочь взрослым людям в их отношениях?”
          <p>Ответ пришел сам собой - ничем. Было глупо надеяться, что мои воодушевляющие речи могли как-то разрешить их конфликт. 
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[110].Begin()}]}),Game.Scenes.FifthPart[110]=new Scene({text:`
           Я долго ворочалась, слушая их громкие высказывания. 
           <p>- Как ты мне надоел со своими вечными претензиями, где я и чем я занимаюсь, - голос мамы звучал очень сердито. - Я не обязана отчитываться о каждом своем шаге.
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[111].Begin()}]}),Game.Scenes.FifthPart[111]=new Scene({text:`
           - Какие мы королевы, - послышался звук падения, возможно, отец уронил стул или что-то вроде того. - Думаешь, я не знаю, чем ты занимаешься? Выставляешь меня ослом, рушишь нашу семью…
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[112].Begin()}]}),Game.Scenes.FifthPart[112]=new Scene({text:`
           - Я не переходила никаких границ, остынь, пожалуйста. Если ты не уважаешь меня, то хотя бы подумай о нашей дочери, которая слышит сейчас это все. 
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[113].Begin()}]}),Game.Scenes.FifthPart[113]=new Scene({text:`
           Дальнейший диалог я не слышала, да и особо не хотелось. По крайне мере они не разрушили дом - и на этом спасибо. 
            <p>“Как же больно все это выслушивать. Что могло такого произойти? Ведь мы были практически идеальной семьей.”
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[114].Begin(),Game.Message("\u0412\u044B \u043D\u0435 \u043F\u0440\u0435\u0434\u043E\u0442\u0432\u0440\u0430\u0442\u0438\u043B\u0438 \u0441\u0441\u043E\u0440\u0443 \u0432\u0430\u0448\u0438\u0445 \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u0435\u0439"),Game.Stats.Family.Add(-1)}]}),Game.Scenes.FifthPart[114]=new Scene({text:`
           Но меня волновал еще один вопрос, который нужно было решить в срочном порядке. Уже завтра начинается новая учебная неделя. Столько всего происходит, что я невольно задаюсь вопросом: а надо ли мне идти на занятия? 
           <p>Я: 
            `,background:"Backgrounds/Room",buttontext:["\u041F\u043E\u0439\u0434\u0443 \u043D\u0430 \u0437\u0430\u043D\u044F\u0442\u0438\u044F","\u041E\u0441\u0442\u0430\u043D\u0443\u0441\u044C \u0434\u043E\u043C\u0430"],buttonaction:[()=>{Game.Scenes.FifthPart[115].Begin(),Game.Stats.GoStudy.Add(1)},()=>{Game.Scenes.FifthPart[117].Begin()}]}),Game.Scenes.FifthPart[115]=new Scene({text:`
           “Не хочу больше пропускать. Ведь нагонять гораздо сложнее.” 
            <p>Я укуталась в одеяло, поставила будильник на нужное время и внимательно проверила, включен ли звук на телефоне. 
            `,background:"Backgrounds/Hero_Sleeps",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[119].Begin()}],condition:function(){1<=Game.Stats.Late.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FifthPart[116].Begin()}),0>=Game.Stats.Late.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FifthPart[119].Begin()})}}),Game.Scenes.FifthPart[116]=new Scene({text:`
           “Не хочу, чтобы повторилось мое опоздание. Вроде бы по расписанию завтра есть пара у профессора Нэйтана и при чем первая. Нужно собраться и встать по-раньше!”
            `,background:"Backgrounds/Hero_Sleeps",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[119].Begin()}]}),Game.Scenes.FifthPart[117]=new Scene({text:`
           “Я все еще нехорошо себя чувствую. Еще один проведенный день дома ничего не решит.” 
            <p>Я укуталась в одеяло, пытаясь абстрагироваться от всего произошедшего. 
            `,background:"Backgrounds/Hero_Sleeps",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[118].Begin()}]}),Game.Scenes.FifthPart[118]=new Scene({text:`
           “Наконец-то я могу расслабиться и не думать, что мне надо кого-то спасать…или принимать трудные решения.” 
            `,background:"Backgrounds/Hero_Sleeps",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[119].Begin()}]}),Game.Scenes.FifthPart[119]=new Scene({text:`
           В голове прокручивался поток мыслей в связи с пережитыми событиями. Невольно я вспомнила слова, которые когда-то говорил мне проводник.
            `,background:"Backgrounds/Hero_Sleeps",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[120].Begin(),Game.Effects.Mem()}]}),Game.Scenes.FifthPart[120]=new Scene({text:`
           - В прошлом есть много твоих соратников. Они помогут тебе узнать правду и докопаться до истины. Но запомни одно. Есть и те, кто преследует исключительно свои цели. Будь осторожна с теми, кому хочешь довериться.
            `,background:"Persons/Stranger",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[121].Begin(),Game.Effects.Mem.Stop()}]}),Game.Scenes.FifthPart[121]=new Scene({text:`
            “Что он имел в виду? Неужели все, с кем я общаюсь связаны с происходящим? А Леон, Скар, Шерил? Они же здесь, в этой реальности. А Нэйтан…”
            <p>Было сложно ответить на все мучавшие меня вопросы и прийти к какому-то выводу без достаточного количества данных.
            `,background:"Backgrounds/Hero_Sleeps",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[122].Begin()}]}),Game.Scenes.FifthPart[122]=new Scene({text:`
            “Мне ничего не остается, кроме как сыграть роль “Нэнси Дрю” и раскрыть эту загадку. Несмотря на подсознательное отрицание происходящего - выбора у меня нет.” 
            `,background:"Backgrounds/Hero_Sleeps",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[123].Begin()}]}),Game.Scenes.FifthPart[123]=new Scene({text:`
            Мои мысли снова вернулись к проводнику и его таинственным высказываниям. До сих пор именно он вызывает у меня больше всего вопросов. И я:
            `,background:"Backgrounds/Hero_Sleeps",buttontext:["\u041D\u0435 \u043C\u043E\u0433\u0443 \u0435\u0433\u043E \u0442\u0435\u0440\u043F\u0435\u0442\u044C","\u041D\u0435 \u0438\u0441\u043F\u044B\u0442\u044B\u0432\u0430\u044E \u043A \u043D\u0435\u043C\u0443 \u043D\u0435\u043D\u0430\u0432\u0438\u0441\u0442\u0438"],buttonaction:[()=>{Game.Scenes.FifthPart[124].Begin()},()=>{Game.Scenes.FifthPart[126].Begin()}]}),Game.Scenes.FifthPart[124]=new Scene({text:`
            Меня раздражает его манера речи, постоянные недомолвки и буквально все. По прошествии всех событий, я никак не могу относиться к нему с пониманием, которое он требует.
            `,background:"Persons/Stranger",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[125].Begin(),Game.Message("\u0412\u044B \u043D\u0435 \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u0440\u0438\u043D\u044F\u0442\u044C \u0441\u0442\u043E\u0440\u043E\u043D\u0443 \u043F\u0440\u043E\u0432\u043E\u0434\u043D\u0438\u043A\u0430"),Game.Stats.God.Add(1)}]}),Game.Scenes.FifthPart[125]=new Scene({text:`
            Я неоднократно подвергала себя опасностям. И не только я. Катарина, Тесла, Роберт. 
            <p>"Все они страдают из-за последствий моих выборов. А он заперся в своем мире и считает себя лучше всех остальных. Чую, там дело в мании величия. Возомнил себя богом..."
            `,background:"Persons/Stranger",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[128].Begin()}]}),Game.Scenes.FifthPart[126]=new Scene({text:`
            Глупо было винить его во всех смертных грехах. Я сама несу ответственность за свои действия. 
            <p>“Он не желает мне зла, он пытается направлять меня, а я сама оступаюсь. Раз за разом.”
            `,background:"Persons/Stranger",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[127].Begin(),Game.Message("\u0412\u044B \u043D\u0430 \u0441\u0442\u043E\u0440\u043E\u043D\u0435 \u043F\u0440\u043E\u0432\u043E\u0434\u043D\u0438\u043A\u0430"),Game.Stats.God.Add(1)}]}),Game.Scenes.FifthPart[127]=new Scene({text:`
            Пусть он и не до конца честен со мной, по своим причинам, но я вижу его стремление помочь мне. Иногда мне кажется, что помогая себе, я смогу помочь и ему освободиться от оков, которыми он связан.
            <p>“Уверена, мы с ним наладим контакт и разберемся в происходящем. Вместе.”
            `,background:"Persons/Stranger",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[128].Begin()}]}),Game.Scenes.FifthPart[128]=new Scene({text:`
            Перед тем как лечь спать, я не боялась, что могу снова исчезнуть и оказаться в гуще неизвестных событий. Слишком велика была усталость, что накопилась за такой небольшой срок.
            `,background:"Backgrounds/Hero_Sleeps",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[129].Begin()}]}),Game.Scenes.FifthPart[129]=new Scene({text:`
            Вдобавок к этому, головные боли теперь чаще сопровождали меня и оставались даже после принятия лекарств. 
            <p>Каким-то чудом, я наконец-то смогла уснуть, завернувшись в теплое одеяло.
            `,background:"Backgrounds/Hero_Sleeps",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[130].Begin()}],condition:function(){1<=Game.Stats.GoStudy.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FifthPart[130].Begin()}),0>=Game.Stats.GoStudy.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FifthPart[137].Begin()})}}),Game.Scenes.FifthPart[130]=new Scene({text:`
             Как и было рассчитано, я встала по будильнику и отправилась в университет. Меня любезно согласился подвезти отец.
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[131].Begin()}]}),Game.Scenes.FifthPart[131]=new Scene({text:`
             Свежий воздух, разговоры студентов - все это понемногу погрузило меня обратно в учебные будни обычной девушки. Я была рада снова пройтись по знакомой дорожке, наслаждаясь хорошей погодой и мирной рутиной, сливаясь с общим потоком студентов.
            `,background:"Backgrounds/Uni",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[132].Begin()}]}),Game.Scenes.FifthPart[132]=new Scene({text:`
             Профессор Нэйтан немного задерживался, поэтому у меня было время достать необходимые письменные принадлежности и уделить внимание Скарлетт, которая как раз присоединилась ко мне:
            `,background:"Backgrounds/Lection",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[133].Begin()}]}),Game.Scenes.FifthPart[133]=new Scene({text:`
             -  $Имя Игрока$, не ожидала тебя увидеть сегодня. Думала, что ты захочешь еще немного понежиться в кровати. 
            <p>- Не хочу больше пропускать занятия, - я оглядела взглядом всю аудиторию. - А Леона сегодня нет?
            <p>- Как видишь, - девушка пожала плечами. - Наверное опять носится где-то со своим мотоциклом… 
            `,background:"Persons/Scarlett",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[134].Begin()}]}),Game.Scenes.FifthPart[134]=new Scene({text:`
            Вскоре пришел профессор Нэйтан. Вместо привычной улыбки, его лицо выражало равнодушие и некую отрешенность. 
            <p>Сухо поздоровавшись со студентами, преподаватель начал пару. 
            `,background:"Persons/Neitan",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[135].Begin()}]}),Game.Scenes.FifthPart[135]=new Scene({text:`
            Я торопливо записывала лекцию, стараясь успевать за ходом его мыслей. Полностью сосредоточиться не получилось. Иногда мои мысли улетали далеко за пределы аудитории, погружая меня в размышления об оставленных в “том” мире проблемах и людях. Тем не менее, я старалась собраться и не поддаваться желанию впасть в уныние и переживания. 
            `,background:"Persons/Neitan",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[136].Begin(),4>=Game.Stats.Study.Get()&&(Game.Stats.Study.Add(1),Game.Message("\u0412\u0430\u0448\u0430 \u0443\u0441\u043F\u0435\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u044C \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0435\u0442 \u0440\u0430\u0441\u0442\u0438")),5<=Game.Stats.Study.Get()&&Game.Message("\u0412\u044B \u0443\u043A\u0440\u0435\u043F\u043B\u044F\u0435\u0442\u0435 \u0441\u0432\u043E\u044E \u0443\u0441\u043F\u0435\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u044C")}]}),Game.Scenes.FifthPart[136]=new Scene({text:`
            День прошел совершенно незаметно. Я старалась быть активной на парах и даже заработала несколько положительных оценок, которые помогут мне на итоговом тесте в конце семестра. Проведя день в университете, я почувствовала прилив энергии и была рада ранее принятому мной решению не оставаться дома.
            `,background:"Backgrounds/Uni",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[141].Begin()}]}),Game.Scenes.FifthPart[137]=new Scene({text:`
            Я проснулась ближе к обеду, чувствуя себя немного разбито. Хоть и ничего сверхъественного не происходило, однако мое общее состояние пребывало в легком упадке. 
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[138].Begin(),Game.Message("\u0412\u044B \u0437\u0430\u0440\u0430\u0431\u043E\u0442\u0430\u043B\u0438 \u0434\u0435\u043D\u0435\u0433 (+150)"),Game.Stats.Money.Add(150)}]}),Game.Scenes.FifthPart[138]=new Scene({text:`
            Сделав минимальные домашние обязанности, я вернулась в комнату, где решила немного поработать, чтобы хоть как-то оправдать свое нежелание идти на учебу. 
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[139].Begin(),Game.Stats.Study.Add(-1),Game.Message("\u0412\u044B \u043F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u043B\u0438 \u0443\u0447\u0435\u0431\u0443, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u0432\u0430\u0448\u0430 \u0443\u0441\u043F\u0435\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u044C \u0441\u043D\u0438\u0437\u0438\u043B\u0430\u0441\u044C")}]}),Game.Scenes.FifthPart[139]=new Scene({text:`
            Лежа на кровати, я понимала, что мне нужно уделить больше времени разбору эпохи, в которую я то и дело перемещаюсь. Но сейчас этого делать совершенно не хотелось. 
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[140].Begin()}]}),Game.Scenes.FifthPart[140]=new Scene({text:`
            Из-за того, что мне нечем было занять себя, я то и дело погружалась в мысли о плохом. Меня терзали сомнения по поводу моих выборов и решений, которые влияли не только на мою жизнь. 
            <p>“Как оставаться в своем уме, постоянно имея столько переживаний?”
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[141].Begin()}]}),Game.Scenes.FifthPart[141]=new Scene({text:`
           Так прошла неделя. Или около того. Университет - дом. Дом - университет. Порядок был не важен. Я старалась посещать занятия, быть примерной дочерью. Однако мое душевное состояние не становилось лучше.
            <p>На выходных в голову пришла очевидная мысль.
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[142].Begin()}]}),Game.Scenes.FifthPart[142]=new Scene({text:`
           “Надо выбраться куда-нибудь. В нескольких часах езды находится озеро. Мы часто были там с родителями, есть в этом месте что-то успокаивающее. Я уверена, это поможет мне развеяться. Возможно даже стоит кого-нибудь пригласить. Спонтанность - мое все.”
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[143].Begin()}]}),Game.Scenes.FifthPart[143]=new Scene({text:`
           Решение было принято. И я:
            `,background:"Backgrounds/Phone",buttontext:["\u041D\u0430\u043F\u0438\u0441\u0430\u043B\u0430 \u041D\u044D\u0439\u0442\u0430\u043D\u0443","\u041D\u0430\u043F\u0438\u0441\u0430\u043B\u0430 \u041B\u0435\u043E\u043D\u0443","\u041D\u0430\u043F\u0438\u0441\u0430\u043B\u0430 \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442","\u041D\u0430\u043F\u0438\u0441\u0430\u043B\u0430 \u0428\u0435\u0440\u0438\u043B"],buttonaction:[()=>{Game.Scenes.FifthPart[144].Begin(),Game.Stats.GoToLakeWith.attitude="Neitan"},()=>{Game.Scenes.FifthPart[199].Begin(),Game.Stats.GoToLakeWith.attitude="Leon"},()=>{Game.Scenes.FifthPart[291].Begin(),Game.Stats.GoToLakeWith.attitude="Scarlett"},()=>{Game.Scenes.FifthPart[386].Begin(),Game.Stats.GoToLakeWith.attitude="Cheryl"}]}),Game.Scenes.FifthPart[144]=new Scene({text:`
    Наверное было странно надеяться, что преподаватель согласится на такое времяпровождение со своей студенткой. Даже учитывая тот факт, что когда мы близко общались с Леоном, так или иначе, профессор контактировал со мной. И все же, этого все равно было недостаточно для подобных авантюр.
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[145].Begin()}]}),Game.Scenes.FifthPart[145]=new Scene({text:`
    Несмотря на все логичные доводы против этой затеи, я решилась написать Нэйтану. Единственный для него повод согласиться на встречу - недавнее происшествие. Наш прошлый разговор, по неизвестным мне причинам -  озадачил его. Возможно, он как и я, благодаря этой поездке ответит на некоторые свои вопросы.
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[146].Begin()}]}),Game.Scenes.FifthPart[146]=new Scene({text:`
    К моему удивлению, ответ пришел практически сразу. Он согласился с необходимостью встречи и довольно быстро приехал. Через час профессор стоял около своей машины, ожидая моего выхода. 
    <p>Я не заставила себя долго ждать, так как наряжаться не было ни желания, ни повода. 
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[147].Begin()}]}),Game.Scenes.FifthPart[147]=new Scene({text:`
    “Это просто встреча, которая поможет нам обоим. Это не свидание. Это же не свидание, да?”
    <p>Уже подходя к машине, я начала переживать, стоило мне только увидеть Нэйтана. Особенно волнительно было лицезреть его в совершенно непривычном образе.
            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[148].Begin()}]}),Game.Scenes.FifthPart[148]=new Scene({text:`
    Вместо классического официозного стиля Нэйтан стоял в сером мешковатом худи. Незнакомцы вполне могли подумать, что он студент, ведь новый стиль одежды лишь сильнее молодил его. 
    <p>“А ему действительно к лицу такой образ. Вот бы Скарлетт увидела, а то ведь не поверит, что Нэйтан надел что-то кроме костюма.”
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[149].Begin()}]}),Game.Scenes.FifthPart[149]=new Scene({text:`
    - Здравствуйте, профессор. Спасибо, что согласились на эту встречу, - промямлила я, не зная, как завести разговор. 
    <p>- Брось, - мужчина выглядел радушно. - Давай опустим эти формальности. Мы же не чужие люди. Я приехал поддержать тебя. Леон упоминал, что у тебя настали не лучшие времена. 
    <p>“Что там интересно Леон мог такого сказать?”
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[151].Begin()}],condition:function(){this.buttonaction[0]=1<=Game.Stats.GoStudy.Get()?()=>{Game.Scenes.FifthPart[150].Begin(),Game.Message("\u041D\u044D\u0439\u0442\u0430\u043D \u0433\u043E\u0440\u0434\u0438\u0442\u0441\u044F \u0432\u0430\u0448\u0438\u043C \u0441\u0442\u0440\u0435\u043C\u043B\u0435\u043D\u0438\u0435\u043C \u043A \u0437\u043D\u0430\u043D\u0438\u044F\u043C"),Game.Stats.Neitan.Add(1)}:()=>{Game.Scenes.FifthPart[151].Begin()}}}),Game.Scenes.FifthPart[150]=new Scene({text:`
    - К тому же, - заметил Нэйтан, - я рад, что несмотря на плохое самочувствие, ты посещала все занятия. Твоей выдержке можно только позавидовать!
    <p>- Спасибо… Ты постоянно говоришь мне, как важна учеба и знания. Я решила подтянуть свою успеваемость. Вроде как все удачно складывается. 
    <p>- Безусловно! Рад, что ты прислушиваешься ко мне. 
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[151].Begin()}]}),Game.Scenes.FifthPart[151]=new Scene({text:`
    - Так ты согласен отправиться за город? Ничего, что так далеко? 
    <p>- Я вроде ранее никогда не упоминал, но мне нравится место, которое ты предложила. Там по-настоящему красиво: природа, вода, тишина. С удовольствием составлю тебе компанию. 
    <p>Я улыбнулась и мы сели в машину. 
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[152].Begin()}]}),Game.Scenes.FifthPart[152]=new Scene({text:`
    Дорога заняла около двух часов, во время которых, мы с профессором поддерживали легкую беседу. Жизнь, планы, конечно же учеба и немного разговоров о близких людях.
    <p>В эти блаженные часы я даже забыла обо всех терзающих меня вопросах, ведь с Нэйтаном было очень комфортно и легко общаться. Он умел находить подход и правильные слова, которые были мне сейчас так необходимы.
            `,background:"Backgrounds/Car",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[153].Begin(),Game.Sounds.Play("Music","Lake")}]}),Game.Scenes.FifthPart[153]=new Scene({text:`
    Сильный ветер обрушился на нас, стоило только выйти из машины. Вода в озере бушевала, будто бы порываясь выйти наружу и затопить все вокруг. 
    <p>- Не повезло с погодой, - констатировал факт профессор. - Давай вернемся обратно в машину. Я знаю одно кафе неподалеку, там подают вкусную пасту.
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[154].Begin()}]}),Game.Scenes.FifthPart[154]=new Scene({text:`
    Я посмотрела на Нэйтана. Он был прав, не стоило оставаться здесь. Но мне нужна была разрядка. Чистый горизонт без всех этих проблем, машин или шума города. 
    <p>“Я так мечтала выбраться хоть куда-нибудь… Пусть даже и не повезло с погодой, однако так быстро уезжать отсюда совсем не хочется”.  
    <p>- Мы можем хотя бы немного побыть здесь?
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[155].Begin()}]}),Game.Scenes.FifthPart[155]=new Scene({text:`
    Нэйтан удивленно посмотрел на меня, явно не понимая моего упорства. Но лишь кивнул в ответ и добавил:
    <p>- Только не отходи далеко от меня. 
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[156].Begin()}]}),Game.Scenes.FifthPart[156]=new Scene({text:`
    Мы подошли к берегу, где не на шутку разыгрались волны.
    <p>Я обхватила себя руками, осознавая, что мне безумно нравится окружающий пейзаж. Да, он был по-своему мрачный, но природа от этого не становилась менее привлекательной. Нет. Это была стихия, которая не может быть ни кем контролируема.
    <p>- Это потрясающе…
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[158].Begin()}]}),Game.Scenes.FifthPart[158]=new Scene({text:`
    - Ты так считаешь? Признаться, я тоже нахожу это занимательным зрелищем, - Нэйтан говорил медленно, будто бы что-то вспоминая. - Раньше я боялся воды, но оказывается, что есть куда более страшное ненастье - огонь. 
    <p>- Вы говорите такими загадочными фразами, прям как один мой знакомый. 
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[159].Begin()}]}),Game.Scenes.FifthPart[159]=new Scene({text:`
    - А я знаю этого “знакомого”? - уточнил Нэйтан.
    <p>- Сомневаюсь в этом, - я задумалась. - Вы, скажем так, в “разных мирах”. 
    <p>- Теперь я окончательно запутался…
    <p>Мы засмеялись. Искренне. Легко. 
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[160].Begin()}]}),Game.Scenes.FifthPart[160]=new Scene({text:`
    Я стала ощущать, что мне все проще поддерживать общение с Нэйтаном. Он открывался с совершенно другой стороны. Его сухость и скованность сменилась непринужденностью. Именно сейчас я поняла, какая большая разница между «преподавателем Нэйтаном» и тем, кто был передо мной.
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[161].Begin()}]}),Game.Scenes.FifthPart[161]=new Scene({text:`
    “Неужели ему и правда сложно свободно выражать свои чувства, он будто бы скрывает эту эмоциональную часть себя. Мы в чем-то похожи, оба что-то прячем от других….”
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[162].Begin()}]}),Game.Scenes.FifthPart[162]=new Scene({text:`
    - Спасибо… - мне вдруг захотелось сказать это простое слово. - Ты всегда рядом со мной. Делаешь для меня больше, чем просто наставник. 
    <p>Нэйтан опешил от моей искренности и ответил:
    <p>- Я не уверен, что могу позволить себе быть так близко к тебе. 
    <p>- Но ты уже…
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[163].Begin()}]}),Game.Scenes.FifthPart[163]=new Scene({text:`
    Минутная пауза. Мне казалось, что мой искренний порыв оттолкнул его и снова заставил закрыться. Однако он лишь с задумчивым видом произнес:
    <p>- Ты сильная, $Имя Игрока$. Но я слишком хорошо тебя знаю. То, как ты скрываешь свои чувства ото всех, лишь бы не приносить неудобства. Мне просто хочется помочь тебе в такие моменты. Но я уверен, чтобы ни происходило - ты справишься. 
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[164].Begin()}]}),Game.Scenes.FifthPart[164]=new Scene({text:`
     Я верила этим словам, как и самому Нэйтану. Мне было тяжело, но осознание, что кто-то понимает меня и хочет помочь - вселяло уверенность в собственных силах. 
    <p>Была и другая половина меня, которая хотела утонуть в своей слабости, плакать и ныть всем подряд об этом дурацком бремени.
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[165].Begin()}]}),Game.Scenes.FifthPart[165]=new Scene({text:`
     Однако за столь короткий срок, я научилась чаще справляться с проблемами самостоятельно. Тяжело жить в двух мирах без поддержки. Возможно, я действительно выросла и начала по-другому ценить свою жизнь и, конечно, жизнь близких.
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[177].Begin()}],condition:function(){6<=Game.Stats.Neitan.Get()?(this.buttonaction[0]=()=>{Game.Scenes.FifthPart[166].Begin()},Game.Sounds.Play("Music","Neitan")):this.buttonaction[0]=()=>{Game.Scenes.FifthPart[177].Begin()}}}),Game.Scenes.FifthPart[166]=new Scene({text:`
     Нэйтан, видимо, заметил мои колебания и изменение в настроении, поэтому пошел на встречу и аккуратно взял меня за руку. 
     Его прикосновение было неожиданным, но таким теплым и приятным. Я чувствовала в этом жесте поддержку. Поддержку моей решимости. 
    <p>Одновременно с этим пришла и надежда, что я смогу положиться на этого человека и мое бремя станет немного легче.
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[167].Begin()}]}),Game.Scenes.FifthPart[167]=new Scene({text:`
     У меня не было возможности разгадать, о чем думает профессор. 
     Он изучал меня, смотрел как на экспонат, к которому нельзя было прикасаться. Запретный плод манил его, заставляя действовать против правил.
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[168].Begin()}]}),Game.Scenes.FifthPart[168]=new Scene({text:`
     Нэйтан чуть сильнее сжал мою ладонь, привлекая внимание. И я посмотрела на него. 
     Он не отводил от меня взгляд, нежно проводя линию шершавыми пальцами от запястья, поднимаясь все выше. 
     Дойдя до конечной точки - плеча, он аккуратно обернул круг и задержался в непосредственной близости от моей шеи, раздумывая.
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[169].Begin()}]}),Game.Scenes.FifthPart[169]=new Scene({text:`
     Это было очень волнительно. В какой-то момент, я даже прикрыла глаза, замирая от новых и приятных ощущений.
    <p>- $Имя Игрока$, - мужчина нарушил сладкую тишину. - Тебе не стоит позволять мне вести себя так раскрепощенно. 
    Я не тот, на кого ты можешь положиться. Я подводил людей, и совершил, пожалуй, слишком много ошибок.
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[170].Begin()}]}),Game.Scenes.FifthPart[170]=new Scene({text:`
     Нэйтан вернул свою руку к моей ладони и легонько касался ее подушечками пальцев. 
    <p>Мне потребовались некоторые усилия, чтобы снова начать трезво мыслить и я сказала то, что чувствовала сейчас:
    <p>- Не бывает ничего непоправимого. Я хочу помочь тебе. Мы не можем исправить прошлое, но можем помогать друг другу в будущем!
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[171].Begin()}]}),Game.Scenes.FifthPart[171]=new Scene({text:`
     - Ты неисправима, - Нэйтан прервал мои рассуждения.
    <p>На мгновение мужчина замер, словно пытаясь решиться на что-то. Бросив беглый взгляд на озеро, он, казалось, понял что-то для себя и посмотрел мне прямо в глаза. Серьезно. Вдумчиво. 
    <p>- Профессор…
    <p>- И я снова просто профессор.
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[172].Begin()}]}),Game.Scenes.FifthPart[172]=new Scene({text:`
     Нэйтан резко и крепко обнял меня, прижимая к своей груди. Ощущение теплоты, его запах - в этих объятиях я вдруг почувствовала себя защищенной. Меня больше не волновала пасмурная погода и назойливое завывания ветра. Трепет моего сердца принадлежал только ему. Он полностью завладел моими переживаниями и мыслями.
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[173].Begin()}]}),Game.Scenes.FifthPart[173]=new Scene({text:`
     Нэйтан едва заметно касался моих волос, аккуратно проводя руками по непослушным локонам. Заправил за ухо несколько прядей, глядя на меня с нежностью.
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[174].Begin()}]}),Game.Scenes.FifthPart[174]=new Scene({text:`
     В своих мыслях я мечтала:
    <p>“Это может быть началом чего-то нового. Мне больше всего хотелось узнавать Нэйтана, постепенно открывая его как новую долгожданную книгу. Хотелось быть причиной всех его чувств.”
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[175].Begin()}]}),Game.Scenes.FifthPart[175]=new Scene({text:`
      - Спасибо за надежду, - его бархатистый шепот коснулся моего уха.
      <p>Я не знала, что эти слова могут значить для Нэйтана. Но то, что он решил поделиться своими чувствами - говорит о больших успехах в наших взаимоотношениях. 
      <p>- Я постараюсь быть рядом. Я хочу стать для тебя тем человеком, с которым ты сможешь быть собой, - я сильнее обхватила его руками, надеясь, что мои чувства дойдут до него.
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[176].Begin(),Game.Message("\u041C\u0435\u0436\u0434\u0443 \u0432\u0430\u043C\u0438 \u0438 \u041D\u044D\u0439\u0442\u0430\u043D\u043E\u043C \u0437\u0430\u0440\u043E\u0436\u0434\u0430\u0435\u0442\u0441\u044F \u043D\u043E\u0432\u043E\u0435 \u0447\u0443\u0432\u0441\u0442\u0432\u043E"),Game.Stats.Neitan.Add(2),Game.Achievements.LakeNeitan.Unlock()}]}),Game.Scenes.FifthPart[176]=new Scene({text:`
      Когда мы разъединили объятия, то на секунду замерли, смотря в глаза друг другу. Это был волшебный момент, который я буду бережно хранить в своих воспоминаниях.
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[180].Begin(),Game.Sounds.Play("Music","Lake")}]}),Game.Scenes.FifthPart[177]=new Scene({text:`
    Профессор похлопал меня по плечу, будто бы хотел таким образом вернуть меня в реальность, не дать мне окончательно закопаться в своих проблемах. 
    <p>- Все будет хорошо, - его добродушная улыбка вселяла уверенность. 
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[178].Begin()}]}),Game.Scenes.FifthPart[178]=new Scene({text:`
    Возможно, в глубине души я ожидала большего. Мои чувства не достигли Нэйтана в той мере, в которой мне хотелось. Но я понимала, почему все происходило именно таким образом. 
    <p>Он всегда окружал меня заботой, той самой братской поддержкой о которой мне рассказывал Леон.
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[179].Begin()}]}),Game.Scenes.FifthPart[179]=new Scene({text:`
    “Я рада, что Нэйтан открылся мне. Возможно, сегодня мне удалось лучше понять его. Уверена, мы станем ближе. Как хорошие друзья.”
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[180].Begin()}]}),Game.Scenes.FifthPart[180]=new Scene({text:`
    И все же, как бы хорошо мы не проводили время, я не забывала, зачем мы приехали сюда на самом деле. 
    <p>- Нэйтан, я должна спросить, - моя робко сказанная фраза заставила мужчину перемениться в лице. 
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[181].Begin()}]}),Game.Scenes.FifthPart[181]=new Scene({text:`
    Мне показалось, что он боялся услышать дальнейшее, но в реальности сказал:
    <p>- Все, что хочешь, - он отвел взгляд в сторону бушующей воды. 
    <p>“Нет смысла увиливать. Спрошу прямо.
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[182].Begin()}]}),Game.Scenes.FifthPart[182]=new Scene({text:`
    - Кто такой Эдвард? 
    <p>- Почему ты так хочешь это знать? - Нэйтан недовольно вздохнул.
    <p>- Твоя реакция на обычное имя меня заинтересовала, не более.
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[183].Begin()}]}),Game.Scenes.FifthPart[183]=new Scene({text:`
    Профессор на секунду задумался, затем ответил: 
    <p>- Это мой предок. Я удивился и растерялся, когда ты назвала это имя, видимо где-то на задворках сознания о нем сохранилась память. И я убедился в этом, изучив некоторые источники. 
    <p>- Значит, это правда. Ваш предок жил в эпоху Николы Теслы?
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[184].Begin()}]}),Game.Scenes.FifthPart[184]=new Scene({text:`
    - Правда. Но почему тебя это так интересует? Откуда ты вообще узнала о его существовании? 
    <p>- Дело в подготовке к эссе, которое вы когда-то задавали. Я случайно обнаружила фотографию Теслы на неком приеме…  Мне даже не верится, что бывают настолько похожие люди.
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[185].Begin()}]}),Game.Scenes.FifthPart[185]=new Scene({text:`
    - Вот оно как, - Нэйтан посмотрел на меня так, как будто бы для себя он все отчетливо понял. - Надеюсь, наши недопонимания исчезли?
    <p>“А исчезли ли? Ложь это или правда, я вряд ли сейчас узнаю. Однако даже от такого ответа мне стало чуточку легче. По крайне мере он пошел на контакт и не настроен враждебно.”
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[186].Begin()}]}),Game.Scenes.FifthPart[186]=new Scene({text:`
    - Спасибо, профессор. Спасибо, что согласились на эту поездку. Я чувствую себя гораздо лучше. 
    <p>Он кивнул, возвращая свое внимание к озеру. Присмотревшись к нему, можно было заметить легкую облегченность во взгляде. Будто бы один тяжелый груз покинул его крепкие плечи.
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[187].Begin()}]}),Game.Scenes.FifthPart[187]=new Scene({text:`
    Мы немного постояли, слушая, как волны бьются о берег, как завывает ветер, холодным воздухом лаская нашу кожу. 
    <p>Вскоре, Нэйтан ушел в сторону машины, давая мне немного времени, чтобы побыть наедине с собой.
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[188].Begin()}]}),Game.Scenes.FifthPart[188]=new Scene({text:`
    Я двинулась следом, но что-то привлекло мое внимание. Среди деревьев было движение. Приглядевшись, я заметила мелькающий маленький силуэт, медленно приближавшийся ко мне.
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[190].Begin()}]}),Game.Scenes.FifthPart[190]=new Scene({text:`
    Я подошла ближе и разглядела собаку. 
            `,background:"Persons/Dog_Dirty",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[191].Begin()}]}),Game.Scenes.FifthPart[191]=new Scene({text:`
    Продрогшая, грязная, но с преданными горящими глазами. Я аккуратно протянула ей руку и на мое удивление животное отозвалось. Собака тронула меня мокрым носом и жалобно заскулила. 
    <p>Я погладила пса и обратила внимание, что на его шее висел ошейник. 
    <p>- Так тебя зовут, Чарли, дружок. Что же мне с тобой делать?
            `,background:"Persons/Dog_Dirty",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[192].Begin()}]}),Game.Scenes.FifthPart[192]=new Scene({text:`
    Ко мне присоединился Нэйтан. Он сел на корточки рядом со мной и ласково погладил собаку. 
    <p>- Вот так чудо, откуда же он тут взялся? Неужели потерялся? 
    <p>- Профессор, нам нельзя его здесь оставлять, - я не обратила внимание на слова Нэйтана, ведь мною руководила жалость и желание спасти бедное животное.
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[193].Begin()}]}),Game.Scenes.FifthPart[193]=new Scene({text:`
    - Я понимаю… Должно быть его хозяева очень переживают. 
    <p>- Я могла бы временно приютить его, думаю, родители не будут против. 
    <p>- Давай попробуем для начала отвезти его к машине. 
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[194].Begin()}]}),Game.Scenes.FifthPart[194]=new Scene({text:`
    Нэйтан начал не спеша двигаться в сторону машины, увлекая за собой собаку. Пес сначала стоял в недоумении, но все же последовал за мужчиной на дрожащих лапах.
    <p>Мы благополучно добрались до места назначения и разместились на заднем сидении. Профессор предусмотрительно постелил плед, чтобы согреть животное.
    <p>“Ну и не испачкать салон его автомобиля, конечно.” 
            `,background:"Persons/Dog_Dirty",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[195].Begin()}]}),Game.Scenes.FifthPart[195]=new Scene({text:`
    Я и не заметила, как прильнула к окошку и сладко задремала. Всю дорогу я мирно посапывала, а Чарли аккуратно положил свою мордочку мне на колени, греясь и отдыхая.
            `,background:"Backgrounds/Car",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[196].Begin()}]}),Game.Scenes.FifthPart[196]=new Scene({text:`
    Когда машина остановилась, Нэйтан аккуратно дотронулся до моего плеча, чтобы разбудить. 
    <p>- $Имя Игрока$, приехали… 
    <p>Я нехотя открыла глаза. Собрала свой рюкзак и ласково позвала Чарли в сторону дома. 
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[197].Begin()}]}),Game.Scenes.FifthPart[197]=new Scene({text:`
    Нэйтан помог мне выбраться и сказал напоследок: 
    <p>- Я чудесно провел время, благодарю тебя за поездку. Удачи вам с Чарли, надеюсь, с ним все будет в порядке. Обязательно осмотри его хорошенько, при необходимости - сходите к ветеринару. И если удастся, поищи хозяина. 
    <p>- Ты не останешься?
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[198].Begin()}]}),Game.Scenes.FifthPart[198]=new Scene({text:`
    - Мне нужно срочно явиться в университет, - Нэйтан взглянул на наручные часы. - Извини, что так резко покидаю тебя. 
    <p>- Все в порядке, - я улыбнулась. - Удачи, профессор. 
    <p>Когда он уехал, мы с собакой зашли в дом.
            `,background:"Persons/Neitan_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[479].Begin()}]}),Game.Scenes.FifthPart[199]=new Scene({text:`
    Леон был очень заботлив ко мне, когда они вместе со Скарлетт организовали вечеринку, чтобы поддержать меня. Мне хотелось провести с ним больше времени: расспросить, как у него сейчас в жизни дела, где он, чем занимается. 
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[200].Begin()}]}),Game.Scenes.FifthPart[199]=new Scene({text:`
     “Да и в последнее время он совсем пропал с радаров. Это хорошая возможность пообщаться и развеяться. Ведь Леон всегда знает, как поднять мне настроение.”
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[200].Begin()}]}),Game.Scenes.FifthPart[200]=new Scene({text:`
     Я написала парню и получила ответ через некоторое время. Леон обещал заехать за мной в течение двух часов. Без лишних “но” или “если”. 
     <p>Пока я лежала на кровати в ожидании, мне в голову пришла совершенно абсурдная мысль.
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[201].Begin()}]}),Game.Scenes.FifthPart[201]=new Scene({text:`
     “Наедине с Леоном? Это же не будет похоже на свидание…?”
     <p>Я невольно покраснела, сжимая подушку, пытаясь отогнать смущающие меня мысли. 
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[202].Begin()}]}),Game.Scenes.FifthPart[202]=new Scene({text:`
     Пока я ждала Леона, то успела позаниматься домашними делами и помочь маме с ужином. И вот, через какое-то время на экране телефона высветилось заветное сообщение:
    <i>“Не задерживайся, у меня всего одна сигарета :)”
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[203].Begin()}]}),Game.Scenes.FifthPart[203]=new Scene({text:`
     Я забежала в ванну, чтобы привести себя в порядок. 
    <p>“Так, вроде неплохо… Немного тональника под глаза, а то совсем на панду становлюсь похожа. Немного туши и помады. Все же надо выглядеть как леди. Чуть-чуть. Вроде неплохо получилось.”
            `,background:"Persons/Hero",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[204].Begin()}]}),Game.Scenes.FifthPart[204]=new Scene({text:`
     Спустившись вниз, я увидела на пороге Леона, который беседовал с моими родителями. Парень тут же обнял меня и вручил нам с мамой по скромному букетику, состоящему из полевых цветов: ромашек и сирени.  
      <p>- Привет, - произнесла я, любуясь на подарок. - Заставил же ты меня подождать. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[205].Begin()}]}),Game.Scenes.FifthPart[205]=new Scene({text:`
     - Я торопился, как мог. Надо было кое-что решить, - Леон указал на припаркованный мотоцикл. - Я наконец сделал это и теперь с гордостью представляю свою малышку. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[206].Begin()}]}),Game.Scenes.FifthPart[206]=new Scene({text:`
     Я обомлела, увидев довольно большой черный мотоцикл с незамысловатым синим рисунком на корпусе. 
     <p>Видя огонь в глазах Леона, я поняла, насколько он доволен долгожданной покупкой.
            `,background:"Backgrounds/Leon_Bike",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[207].Begin()}],condition:function(){this.buttonaction[0]=1<=Game.Stats.SupportLeon.Get()?()=>{Game.Scenes.FifthPart[207].Begin()}:()=>{Game.Scenes.FifthPart[209].Begin()}}}),Game.Scenes.FifthPart[207]=new Scene({text:`
     - Не могу поверить, ты и правда сделал это! Даже не представляю, как бы на это отреагировала Скарлетт, ведь она всерьез переживает за тебя. Что же до меня, то я поддерживаю твое решение и не только потому, что мечтаю на нем прокатиться, - сказала я, искренне улыбаясь.

            `,background:"Backgrounds/Leon_Bike",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[208].Begin(),Game.Message("\u0412\u044B \u0440\u0430\u0437\u0434\u0435\u043B\u044F\u0435\u0442\u0435 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u044B \u041B\u0435\u043E\u043D\u0430"),Game.Stats.Leon.Add(1)}]}),Game.Scenes.FifthPart[208]=new Scene({text:`
     - Спасибо, что ты на моей стороне. Надеюсь, когда-нибудь и Скар примет мой выбор. Немного времени и этот красавчик все-таки покорит ее сердце, - он погладил мотоцикл, ухмыляясь.
    <p>Я улыбнулась в ответ на забавное высказывание Леона.
            `,background:"Backgrounds/Leon_Bike",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[210].Begin()}]}),Game.Scenes.FifthPart[209]=new Scene({text:`
     - Ты все-таки сделал это, - я недовольно покачала головой. - Мы же со Скар говорили о том, что это может быть опасно. 
    <p>- А я вам говорил, что итог будет один. Я надеялся, что ты поймешь, - Леон с досадой отвернулся.

            `,background:"Backgrounds/Leon_Bike",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[210].Begin(),Game.Message("\u0412\u044B \u043D\u0435 \u0440\u0430\u0437\u0434\u0435\u043B\u044F\u0435\u0442\u0435 \u0438\u043D\u0442\u0435\u0440\u0435\u0441 \u041B\u0435\u043E\u043D\u0430"),Game.Stats.Leon.Add(-1)}]}),Game.Scenes.FifthPart[210]=new Scene({text:`
     - Так мы на нем поедем? - я с недоверием взглянула на транспорт. - Ехать далеко... Ты уверен, что он нас не подведет?
    <p>- Не волнуйся, гнать я особо не буду. А вот испытать его на длинной дистанции очень хочется. В случае чего, я же рядом - вместе справимся. 
            `,background:"Backgrounds/Leon_Bike",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[211].Begin()}]}),Game.Scenes.FifthPart[211]=new Scene({text:`
     Леон помог мне забраться на мотоцикл и с гордостью вручил свой шлем, а сам надел запасной.
     <p>- Просто держись за меня и старайся не улететь, - парень сел впереди, несколько раз с усилием нажимая ногой на рычаг газа. 
     <p>- Леон, - я пыталась перекричать рев двигателя. - Я на такое не подписывалась…
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[212].Begin()}]}),Game.Scenes.FifthPart[212]=new Scene({text:`
     - Ты мне доверяешь?
    <p>Я неуверенно кивнула. В Леоне я не сомневалась, а вот совсем новый мотоцикл - немного меня беспокоил. 
    <p>- В таком случае, обещаю довести вас в целости и сохранности, мадам, - нарочито вежливо сказал Леон, закрывая лицевой щиток.
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[213].Begin()}]}),Game.Scenes.FifthPart[213]=new Scene({text:`
     Леон двинулся по проезжей части, как и обещал, не слишком быстро, давая мне возможность привыкнуть к новому способу передвижения. 
    <p>По-началу я сильно вжалась в парня, закрыв глаза, цепляясь за его кожаную куртку просто потому что мне было безумно страшно.
            `,background:"Backgrounds/Bike_Together",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[214].Begin()}]}),Game.Scenes.FifthPart[214]=new Scene({text:`
      Но мое желание почувствовать скорость придало смелости, и я выглянула из-за спины Леона.
      <p>Ветер. Драйв. Как никогда я почувствовала себя живой, совершенно забывая обо всех накопившихся проблемах и свалившейся на меня ответственности. 
      В какой-то момент, мне захотелось почувствовать ветер, потрогать его. Я осмелилась отпустить одну руку, выставив ее встречному потоку воздуха.
            `,background:"Backgrounds/Bike_Together",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[215].Begin()}]}),Game.Scenes.FifthPart[215]=new Scene({text:`
      На очередном светофоре, Леон повернулся ко мне и спросил:
      <p>- Ну, что, готова повысить уровень?
      <p>Я кивнула, всецело вверяя себя в его надежные руки. 
            `,background:"Backgrounds/Bike_Together",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[216].Begin()}]}),Game.Scenes.FifthPart[216]=new Scene({text:`
      Мотоцикл двинулся с места резко, стремительно набирая обороты. Мы быстро разогнались, виляя между потоками машин. 
      <p>“Так вот, что мотивировало Леона приобрести мотоцикл. Он хотел в любой момент иметь возможность ощутить эти эмоции. Почувствовать себя свободным.”
            `,background:"Backgrounds/Bike_Together",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[217].Begin(),Game.Sounds.Play("Music","Lake")}]}),Game.Scenes.FifthPart[217]=new Scene({text:`
      По прибытию на нас тут же обрушился сильный ветер. Вода в озере бушевала, будто бы порываясь выйти наружу и затопить все вокруг. Леон нашел место подальше от воды, где и припарковал свою новую драгоценность.
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[218].Begin()}]}),Game.Scenes.FifthPart[218]=new Scene({text:`
       - Мда, вот так погодка, - с досадой заметил парень. - Предлагаю больше не мерзнуть здесь и отправиться в одно кафе неподалеку. 
       У них в меню есть супер сочный бургер. Я как-то узнавал их секрет, оказалось, они используют для приготовления аж четыре вида мяса, представляешь!
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[219].Begin()}]}),Game.Scenes.FifthPart[219]=new Scene({text:`
       Я посмотрела на Леона. Он был прав, не стоило оставаться здесь. Да и перспектива провести время в уютном и теплом кафе - привлекала. Но мне нужна была разрядка. Чистый горизонт без всех этих проблем, машин или шума города. 
      <p>“Я так мечтала выбраться хоть куда-нибудь… Пусть даже и не повезло с погодой, однако так быстро уезжать отсюда совсем не хочется”.  
      <p>- Мы можем хотя бы немного побыть здесь?
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[220].Begin()}]}),Game.Scenes.FifthPart[220]=new Scene({text:`
       - Конечно, почему нет… От такого ветерка еще никто не умирал, а вот от простуды - вполне себе, - он открыл сиденье мотоцикла, достал оттуда небольшой плед и с заботой положил его мне на плечи. 
       <p>Я поблагодарила Леона, укутываясь сильнее в мягкую и теплую ткань.
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[221].Begin()}]}),Game.Scenes.FifthPart[221]=new Scene({text:`
       Мы подошли к берегу, где не на шутку разыгрались волны.
       <p>Я обхватила себя руками, осознавая, что мне безумно нравится окружающий пейзаж. Да, он был по-своему мрачный, но природа от этого не становилась менее привлекательной. Нет. Это была стихия, которая не может быть ни кем контролируема.
       <p>- Это потрясающе…
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[222].Begin()}]}),Game.Scenes.FifthPart[222]=new Scene({text:`
       - Что именно? - уточнил Леон, равнодушно оглядывая местность. 
      <p>- Буря? Хаос? Истинная природа, которую человек никогда не сможет обуздать.
      <p>- $Имя Игрока$, а что, если бы мы могли все контролировать? 
      <p>- Что ты имеешь в виду? - тон моего голоса становился беспокойным.
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[223].Begin()}]}),Game.Scenes.FifthPart[223]=new Scene({text:`
       Леон это заметил и продолжил:
      <p>- Представь, если бы в твоих силах было предвидеть последствия своих действий. Насколько лучше мог стать мир и каждый живущий в нем? 
      Ведь именно итоги наших поступков зачастую заставляют сомневаться в себе. А эти сомнения понемногу убивают, забирая остатки уверенности в собственных силах.
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[224].Begin()}]}),Game.Scenes.FifthPart[224]=new Scene({text:`
       Монолог Леона стал неожиданностью для меня и мы погрузились в собственные мысли, боясь нарушить тишину. 
      <p>“Не помню, когда я в последний раз видела его таким загруженным. От его задорного настроения не осталось и следа. 
      А ведь он всегда такой веселый и простой, словно никогда ни о чем не волнуется. Но, оказалось, внутри у него смятения и бесконечные переживания. 
      Может быть сейчас самое время узнать их причину? Я хочу помочь ему.” 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[225].Begin()}]}),Game.Scenes.FifthPart[225]=new Scene({text:`
       - Леон, расскажи, что тебя так беспокоит? Это как-то связано с Нэйтаном? Ты же знаешь, мое сильное женское плечо всегда в твоем распоряжении, - я улыбнулась и посмотрела ему прямо в глаза, надеясь хоть немного разрядить обстановку. 
      <p>- Проницательна, как и всегда, - парень вздохнул. - Сложно сказать. Конечно, в какой-то степени это касается брата, ведь он моя семья. Однако есть много факторов. В последнее время что-то происходит, что-то нехорошее. И я, возможно, обязан принять в этом участие. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[226].Begin()}]}),Game.Scenes.FifthPart[226]=new Scene({text:`
        - Но что именно?
        <p>- Послушай, это не то о чем я могу тебе сейчас рассказать, прости. Но можешь мне кое-что пообещать? - он смотрел на меня так, будто бы от моего ответа зависело очень многое.
        <p>- Да, конечно.
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[227].Begin()}]}),Game.Scenes.FifthPart[227]=new Scene({text:`
        - Если я однажды скажу тебе оставить все и уехать из города - ты именно так и поступишь, не задавая вопросов. 
        <p>Мне стало не по себе от этих слов. Я даже представить не могла такого развития событий. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[228].Begin()}]}),Game.Scenes.FifthPart[228]=new Scene({text:`
        - Леон, знаешь, что? -  я стукнула парня в плечо. - Уж не знаю, чего ты вдруг так проникся меланхоличным настроением этого места, но даже не думай, что я оставлю здесь свою семью и друзей. Столько лет знакомы, а ты словно не знаешь, что сбегать - не в моем стиле.
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[229].Begin()}]}),Game.Scenes.FifthPart[229]=new Scene({text:`
        Я поставила руки в бока, подняв высоко голову и закрыв глаза. 
        <p>Немного прищурившись, мне удалось разглядеть улыбку Леона. Он заметно расслабился. Его настроение начало понемногу возвращаться в норму. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[230].Begin()}]}),Game.Scenes.FifthPart[230]=new Scene({text:`
        Неожиданно парень сказал: 
        <p>- А сколько мы уже с тобой знакомы, года три? А я все еще не перестаю тебе удивляться. Как ты умудряешься сочетать в себе вселенскую мудрость и врожденную непредусмотрительность? - Леон сделал умное лицо и поправил невидимые очки.  
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[231].Begin()}]}),Game.Scenes.FifthPart[231]=new Scene({text:`
        Мы рассмеялись, поддерживая друг друга, чтобы не свалиться с бревна, на котором ранее устроились. 
        <p>“Люблю эту его черту. Превратить все в шутку, чтобы снять напряжение. Потрясающе.”
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[232].Begin()}]}),Game.Scenes.FifthPart[232]=new Scene({text:`
        - А если серьезно, - Леон перестал смеяться. - Ты молодец, $Имя Игрока$. И меня умудряешься поддержать, и со своими проблемами как-то, но справляешься. Ты же знаешь, что ты можешь рассчитывать на любую мою помощь. Я рядом.
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[233].Begin()}]}),Game.Scenes.FifthPart[233]=new Scene({text:`
        Я верила этим словам, как и самому Леону. Мне было тяжело, но осознание, что кто-то понимает меня и хочет помочь - вселяло уверенность в собственных силах. 
        <p>Была и другая половина меня, которая хотела утонуть в своей слабости, плакать и ныть всем подряд об этом дурацком бремени. 
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[234].Begin()}]}),Game.Scenes.FifthPart[234]=new Scene({text:`
        Однако за столь короткий срок, я научилась чаще справляться с проблемами самостоятельно. Тяжело жить в двух мирах без поддержки. Возможно, я действительно выросла и начала по-другому ценить свою жизнь и, конечно, жизнь близких. 
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[235].Begin()}],condition:function(){this.buttonaction[0]=6<=Game.Stats.Leon.Get()?()=>{Game.Scenes.FifthPart[235].Begin(),Game.Sounds.Play("Music","Leon")}:()=>{Game.Scenes.FifthPart[254].Begin()}}}),Game.Scenes.FifthPart[235]=new Scene({text:`
        Леон, видимо, заметил мое смятение и изменение в настроении, поэтому пошел на встречу и замер, пристально изучая мой взгляд. Что-то изменилось в Леоне. Он стал колебаться и все будто бы намеревался что-то сказать, но останавливал себя.
        <p>- Леон, это же я, ты можешь сказать мне что угодно. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[236].Begin()}]}),Game.Scenes.FifthPart[236]=new Scene({text:`
        - Будь по твоему, - Леон осторожно взял меня за руку.  - Я очень давно хочу извиниться. Прости меня за то время, которое мы упустили. В частности, из-за меня, ведь это я тогда отдалился. Мы могли бы столько всего сделать вместе.
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[237].Begin()}]}),Game.Scenes.FifthPart[237]=new Scene({text:`
        - Я не винила тебя. Все это время мне тоже хотелось извиниться. Тогда я просто позволила тебе отстраниться и даже не пыталась все вернуть, - я невольно сжала руки в кулаки, пытаясь унять подступивший ком в горле. -  Мне было страшно узнать причину… Даже не так, мне было страшно, что я была причиной произошедшего.
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[238].Begin()}]}),Game.Scenes.FifthPart[238]=new Scene({text:`
        - Ты иногда так много на себя берешь, что я удивляюсь, как под таким грузом на плечах твой позвоночник не сломался, - парень грустно улыбнулся.
        <p>Я вдруг почувствовала его прикосновение. Леон дотронулся до моей руки. Несколько его пальцев легонько касались моих, сплетаясь между собой.
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[239].Begin()}]}),Game.Scenes.FifthPart[239]=new Scene({text:`
        Между нами нарастало совершенное новое чувство, которое будоражило, проходилось приятным теплом по всему телу. 
        <p>- Мы есть друг у друга, - я завороженно смотрела на Леона. - Давай строить настоящее, а не зацикливаться на прошлом. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[240].Begin()}]}),Game.Scenes.FifthPart[240]=new Scene({text:`
        - Ты милая, - легкая коварная улыбка проскользнула по его лицу. - Люблю в тебе этот позитив. 
        <p>“Люблю? Стоп… Надо успокоиться. Слово сказано абсолютно в другом ключе.” 
        <p>- А еще мне нравится наблюдать, как ты смущаешься… Это - отдельный вид искусства. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[241].Begin()}]}),Game.Scenes.FifthPart[241]=new Scene({text:`
        - Ты…
        <p>Я попыталась что-то сказать, но парень придвинулся ближе, заставляя меня замолчать и замереть в предвкушении. 
        <p>- $Имя Игрока$, я не профи в этих всех делах… говорить о своих чувствах. Может стоит сделать, а уже потом думать о последствиях. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[242].Begin()}]}),Game.Scenes.FifthPart[242]=new Scene({text:`
        - Леон, я не понимаю…
        <p>- И не надо. 
        <p>Он обхватил мое лицо руками, быстро приблизился ко мне, а затем нежно накрыл своими губами - мои. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[243].Begin()}]}),Game.Scenes.FifthPart[243]=new Scene({text:`
        Первое время мы будто бы изучали друг друга. Легкий поцелуй Леона дал мне возможность привыкнуть, прочувствовать этот момент. Местами сухие губы становились мягче, а на послевкусии остался легкий след мяты. 
        <p>Я посмотрела на его лицо.. Закрытые глаза, длинные ресницы…
        <p>“Леон…”
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[244].Begin()}]}),Game.Scenes.FifthPart[244]=new Scene({text:`
        Неожиданно он прервал поцелуй. Коснулся своим лбом моего и изучал мою реакцию. 
        <p>- Я ведь дурак, да? 
        <p>- Еще какой, - я улыбалась, давая Леону понять, что происходящее мне очень нравилось. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[245].Begin()}]}),Game.Scenes.FifthPart[245]=new Scene({text:`
        Большего парню было и не надо. Мы обняли друг друга еще сильнее и с новым чувством продолжили погружаться в этот глубокий, сладкий поцелуй. 
        <p>“Я не могу поверить, что это происходит между нами… Как же он хорошо целуется.” 
        <p>Я начала гладить его по волосам, запутывая пальцы в них. Это было для него знаком к продолжению. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[246].Begin()}]}),Game.Scenes.FifthPart[246]=new Scene({text:`
        Нас захватила волна страсти, пламя, которое разливалось по всему телу и скапливалось где-то внизу живота. 
        <p>Леон начал оттеснять меня назад, прижимая к ближайшему дереву, не прерывая поцелуй. Его пальцы ловко расстегнули мою куртку, а руки осмелились проникнуть под футболку, касаясь оголенных участков кожи. Те ощущения, которые он дарил мне, перестали складываться в цепочку и я растворялась во множестве мурашек. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[247].Begin()}]}),Game.Scenes.FifthPart[247]=new Scene({text:`
        Леон был подобен хищнику, который так жадно хотел вкусить запретный плод. Он боялся последствий, но не мог остановиться, дорвавшись до него.
        <p>Я хотела поделиться с ним этими ощущениями. Медленно, касаясь его, я подняла одну ногу, сильнее прижимая парня к себе. Мне хотелось раствориться в нем. Мы как никогда чувствовали сильное притяжение и хотели большего.
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[248].Begin()}]}),Game.Scenes.FifthPart[248]=new Scene({text:`
        На секунду я оторвалась от его губ, так как дышать становилось все труднее. 
        <p>- Леон, подожди, мне нужна передышка, - я говорила отрывисто, вдыхая в себя свежий воздух после каждого слова. 
        <p>Парень снова потянулся к моим губам, но передумал и нежно поцеловал меня в щеку.
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[249].Begin()}]}),Game.Scenes.FifthPart[249]=new Scene({text:`
        Своими действиями он показывал, как я ему дорога. Желание владело им, нами обоими, но мы не хотели спешить, растягивая этот прекрасный миг.
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[250].Begin()}]}),Game.Scenes.FifthPart[250]=new Scene({text:`
        - А я и не думал, что от тебя будет так сложно оторваться, - он немного отодвинулся от меня, все еще продолжая держать за руку.
        <p>- Леон, - я хотела слишком многое у него спросить, но даже не знала, с чего начать. 
        <p>- Ты хочешь поговорить о том, что сейчас происходило? Давай повременим. Я не готов, чтобы ты видела, как я смущаюсь.
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[251].Begin()}]}),Game.Scenes.FifthPart[251]=new Scene({text:`
        - Я хочу, чтобы ты знал, что я ни о чем не жалею.
        <p>- Поверь, $Имя Игрока$, ты явно дала мне это понять. - он выдохнул. - Сейчас у меня не будет всех ответов. Прости, милашка, - он отчего-то засмеялся и нежно потрепал меня за щеку.
        <p>“Как после такого я могу оставаться спокойной…”
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[252].Begin()}]}),Game.Scenes.FifthPart[252]=new Scene({text:`
        Я закрыла глаза, пытаясь насладиться атмосферой этого места, но в голове снова и снова всплывал этот горячий поцелуй. Чем сильнее я пыталась отвлечься, тем ярче меня накрывало желание продолжить. 
        <p>Леон тоже нервничал. Было видно, как он отводит от меня взгляд, пытаясь сосредоточиться на окружающем пейзаже. Как его руки не могут найти одно единственное положение, а ноги то и дело волнительно бьются друг об дружку. 
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[253].Begin(),Game.Message("\u0412\u044B \u0438 \u041B\u0435\u043E\u043D \u0441\u0442\u0430\u043B\u0438 \u0437\u043D\u0430\u0447\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0431\u043B\u0438\u0436\u0435 \u043A \u0434\u0440\u0443\u0433 \u0434\u0440\u0443\u0433\u0443"),Game.Stats.Leon.Add(2),Game.Achievements.LakeLeon.Unlock()}]}),Game.Scenes.FifthPart[253]=new Scene({text:`
        Я решила разрядить обстановку и игриво толкнула Леона в плечо, говоря:
        <p>- Да расслабься ты. Мы же не перестали быть друзьями и между нами, все останется как прежде. Пока что. Нам обоим нужно подумать о многом, а сейчас давай просто продолжим любоваться прекрасной природой. Это же наша изначальная цель в конце концов. 
        <p>Леон не ответил. Лишь что-то прошептал себе под нос, а затем взял меня за руку. 
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[257].Begin(),Game.Sounds.Play("Music","Lake")}]}),Game.Scenes.FifthPart[254]=new Scene({text:`
        Леон, видимо, заметил мое смятение и изменение в настроении, поэтому пошел на встречу и сел передо мной на корточки. Несколько прядей упали на его лицо, но он проигнорировал этот факт и взял меня за обе руки: 
        <p>- Я тебе грустить не позволю. Да и себе не позволю. Прости, что так вышло.
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[255].Begin()}]}),Game.Scenes.FifthPart[255]=new Scene({text:`
        Я отрицательно покачала головой. Ведь все действительно было хорошо. Особенно после сказанных им слов. 
        <p>- Леон, все прекрасно, я рада узнавать тебя с разных сторон. 
        <p>- О, да. Я могу быть очень разным. Как-нибудь в другой раз непременно покажу тебе, - он отпустил меня, встал и демонстративно размял спину.
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[256].Begin()}]}),Game.Scenes.FifthPart[256]=new Scene({text:`
        Возможно, в глубине души я ожидала большего. Мои чувства не достигли Леона в той мере, в которой мне хотелось. Но я понимала, почему все происходило именно таким образом. 
        <p>“Он всегда заботился обо мне, но я, видимо, уделяла этому недостаточно внимания. Все равно я рада, что смогла провести с ним хоть немного времени и развеяться. Уверена, мы станем еще ближе. Как хорошие друзья.”
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[257].Begin()}]}),Game.Scenes.FifthPart[257]=new Scene({text:`
        После всего произошедшего мы выдохнули и продолжили наслаждаться легкой прохладой исходящей от неспокойного озера. Разговаривали на отвлеченные темы, проводили время вместе, получая удовольствие от этих мгновений. 
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[258].Begin()}]}),Game.Scenes.FifthPart[258]=new Scene({text:`
        - Кстати, Леон, ты так и не сказал мне, где работаешь, чем сейчас занимаешься в жизни… 
        <p>- Не перестаю повторять, что ты очень любопытная, - парень слегка взъерошил мне волосы на макушке. - Раз уж я сегодня такой добрый, разрешаю тебе задать всего один вопрос. Обязуюсь ответить честно! 
        <p>- Один? - я с досадой на него взглянула. - Это несправедливо. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[259].Begin()}]}),Game.Scenes.FifthPart[259]=new Scene({text:`
        - Если я тебе все сразу расскажу, как же буду поддерживать интерес к своей персоне?
        <p>“Он издевается? Иногда Леон невыносим, ох. Ладно. Я принимаю правила игры. В конце концов когда-нибудь он ответит на все мои вопросы”
        <p>Я спросила: 
            `,background:"Persons/Leon_New",buttontext:["\u0427\u0442\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442 \u043C\u0435\u0436\u0434\u0443 \u0442\u043E\u0431\u043E\u0439 \u0438 \u041D\u044D\u0439\u0442\u0430\u043D\u043E\u043C?","\u041A\u0435\u043C \u0442\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0448\u044C?","\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0435\u0448\u044C \u043E \u0441\u0432\u043E\u0438\u0445 \u043F\u043B\u0430\u043D\u0430\u0445 \u043D\u0430 \u0431\u0443\u0434\u0443\u0449\u0435\u0435?"],buttonaction:[()=>{Game.Scenes.FifthPart[260].Begin()},()=>{Game.Scenes.FifthPart[265].Begin()},()=>{Game.Scenes.FifthPart[269].Begin()}]}),Game.Scenes.FifthPart[260]=new Scene({text:`
        - Я был уверен, что ты спросишь именно об этом, - Леон отвернулся, спрятав руки в карманы джинсов. 
        <p>- Уж прости, мистер таинственность. Ты обещал ответить честно, я напоминаю. 
        <p>- Да-да…
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[261].Begin()}]}),Game.Scenes.FifthPart[261]=new Scene({text:`
        На несколько секунд повисла тишина. Было видно, как парень пытается подобрать нужные слова. Он продолжил:
        <p>- Нэйт и я, мы слишком по-разному смотрим на жизнь. Из-за этого постоянно возникают конфликты. 
        <p>- Но вы же братья. Неужели есть что-то такое, возможно, некое событие, которое вас настолько сильно разделило?
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[262].Begin()}]}),Game.Scenes.FifthPart[262]=new Scene({text:`
        - Есть. Я бы даже сказал не событие, а именно подход… кхм… к определенным обстоятельствам. 
        <p>- Так это и есть то, о чем ты переживаешь? Поэтому ты сегодня словно “не в своей тарелке”?
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[263].Begin()}]}),Game.Scenes.FifthPart[263]=new Scene({text:`
        - Я вроде обещал ответить только на один вопрос, - Леон вздохнул. - Наше мнение по одному вопросу с Нэйтаном очень сильно расходится. И я не в праве говорить подробности, так как это не только моя тайна. И снова, надеюсь на твое понимание. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[264].Begin()}]}),Game.Scenes.FifthPart[264]=new Scene({text:`
        “Уверена, он молчит не просто так. Всему свое время… Все честно, я и сама многое от него скрываю, но надеюсь когда-нибудь настанет момент, когда мы поговорим открыто. И все же, что могло такого произойти? Связано ли это с Эдвардом, который так похож на Нэйтана? Хотя при чем тут это? Не буду накручивать себя раньше времени.”
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[273].Begin()}]}),Game.Scenes.FifthPart[265]=new Scene({text:`
        - Уж не думал, что тебе это так интересно, - Леон легонько засмеялся.
        <p>- Почему нет? Я же хочу узнать больше о твоей жизни. 
        <p>- Это похвально. И мило. Я уже говорил, да, что ты милая?
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[266].Begin()}]}),Game.Scenes.FifthPart[266]=new Scene({text:`
        Я проигнорировала это высказывание и демонстративно закатила глаза. 
        <p>- Так ты ответишь? А то складывается впечатление, что ты увиливаешь, - я толкнула его в бок. 
        <p>- Долгое время работал на полставки в строительном магазине. Сейчас устроился в автосервис - механиком. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[267].Begin()}]}),Game.Scenes.FifthPart[267]=new Scene({text:`
        - Ого, здорово, что ты не стоишь на месте. 
        <p>- Да. Я всегда любил пробовать себя в разных сферах деятельности. Мне кажется, только так можно стать по-настоящему разносторонним человеком и даже, не побоюсь таких громких высказываний, понять этот мир. 
        <p>- И как работается на новом месте?
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[268].Begin()}]}),Game.Scenes.FifthPart[268]=new Scene({text:`
        - Мне очень повезло с коллективом. Мы все будто бы на одной волне. Ребята помогли мне с поиском мотоцикла и даже были не против, чтобы я загнал его для починки некоторых деталей.  
        <p>- Всегда считала, что понимающий коллектив - это самое главное в работе. 
        <p>- Отчасти, так оно и есть. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[273].Begin()}]}),Game.Scenes.FifthPart[269]=new Scene({text:`
        - Внезапно. Такой обширный вопрос, я признаться, даже и не знаю, что ответить, - Леон призадумался. 
        <p>- Понимаю. И все же. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[270].Begin()}]}),Game.Scenes.FifthPart[270]=new Scene({text:`
        - Я точно уверен в том, что хотел бы переехать. Скорее всего после окончания университета. 
        <p>Такое откровение было для меня чем-то крайне неожиданным и грустным. 
        <p>“Он уедет… А я? Что буду делать я? Хотя как я могу удерживать его тут?”
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[271].Begin()}]}),Game.Scenes.FifthPart[271]=new Scene({text:`
        - Куда бы ты хотел отправиться? 
        <p>- Еще не решил. Но мы не привыкли находиться на одном месте долго. Путешествовать, узнавать мир - в этом и заключается смысл моей жизни, - Леон слегка улыбнулся. - Может быть я даже позволю себе отдых. Просто отправлюсь в место, где всегда тепло. Сяду на берег, буду любоваться морскими просторами…
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[272].Begin()}]}),Game.Scenes.FifthPart[272]=new Scene({text:`
        - Как романтично, - я вдруг представила Леона в подобном месте. Такого спокойного, умиротворенного, окруженного лучами теплого солнца. Мне стало легче, осознавая, что именно в такие моменты приходит заветное спокойствие, которое нам всем так необходимо. 
        <p>- Ты так считаешь? Разве одиночество - романтично? Возможно. Но до этого еще далеко. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[273].Begin()}]}),Game.Scenes.FifthPart[273]=new Scene({text:`
        Мы еще немного постояли, слушая, как волны бьются о берег, как завывает ветер, холодным воздухом лаская нашу кожу. 
        <p>Вскоре, Леон ушел в сторону мотоцикла, давая мне немного времени, чтобы побыть наедине с собой. 
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[274].Begin()}]}),Game.Scenes.FifthPart[274]=new Scene({text:`
        Я двинулась следом, но что-то привлекло мое внимание. Среди деревьев было движение. Приглядевшись, я заметила мелькающий маленький силуэт, медленно приближающийся ко мне.  
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[275].Begin()}]}),Game.Scenes.FifthPart[275]=new Scene({text:`
        Я подошла ближе и разглядела в нем собаку. 
            `,background:"Persons/Dog_Dirty",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[276].Begin()}]}),Game.Scenes.FifthPart[276]=new Scene({text:`
        Продрогшая, грязная, но с преданными горящими глазами. Я аккуратно протянула ей руку и на мое удивление животное отозвалось. Собака тронула меня мокрым носом и жалобно заскулила. 
            `,background:"Persons/Dog_Dirty",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[277].Begin()}]}),Game.Scenes.FifthPart[277]=new Scene({text:`
        Я погладила пса и обратила внимание, что на его шее висел ошейник. 
        <p>- Так тебя зовут, Чарли, дружок. Что же мне с тобой делать? 
            `,background:"Persons/Dog_Dirty",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[278].Begin()}]}),Game.Scenes.FifthPart[278]=new Scene({text:`
        Ко мне присоединился Леон, который встал со мной рядом и таким же обеспокоенным взглядом посмотрел на собаку:
        <p>- Не знаю, что случилось с хозяином, но надеюсь он не из тех ублюдков, кто просто бросил его здесь на произвол судьбы.
        <p>- Согласна с тобой. Нам нельзя его здесь оставлять. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[279].Begin()}]}),Game.Scenes.FifthPart[279]=new Scene({text:`
        - Понимаю. Но на моем мотоцикле втроем мы не уедем. 
        <p>- Мы что-нибудь придумаем, - я продолжала гладить Чарли, пытаясь успокоить его дрожь. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[280].Begin()}]}),Game.Scenes.FifthPart[280]=new Scene({text:`
        Леон начал не спеша двигаться в сторону мотоцикла, увлекая за собой собаку. Пес сначала стоял в недоумении, но все же последовал за мужчиной на полусогнутых лапах.
            `,background:"Persons/Dog_Dirty",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[281].Begin()}]}),Game.Scenes.FifthPart[281]=new Scene({text:`
        - Давай вызывать такси. Я поеду за вами следом и прослежу, чтобы вы добрались в целости и сохранности. 
        <p>- Спасибо! -  я начала копаться в сумке в поисках телефона. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[282].Begin()}],condition:function(){this.buttonaction[0]=6<=Game.Stats.Leon.Get()?()=>{Game.Scenes.FifthPart[282].Begin()}:()=>{Game.Scenes.FifthPart[286].Begin()}}}),Game.Scenes.FifthPart[282]=new Scene({text:`
        Когда такси подъехало, Леон вышел вперед к водителю и сказал:
        <p>- Вот необходимая сумма, - он протянул деньги. - Я буду следовать за вами, чтобы не возникло каких-то проблем. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[283].Begin()}]}),Game.Scenes.FifthPart[283]=new Scene({text:`
        Я и Чарли к этому времени успели разместиться на заднем сиденье. Леон подошел, чтобы убедиться, что с нами все хорошо. 
        <p>Неожиданно водитель, который все это время поглядывал на нас в зеркало заднего вида, проговорил:
        <p>- Какой у вас жених, барышня! Странно только, что это он тебя в такую погоду на прогулку повез. Не беспокоится небось? 
            `,background:"Backgrounds/Lake_Taxi",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[284].Begin()}]}),Game.Scenes.FifthPart[284]=new Scene({text:`
        Я покраснела от сказанных им слов. Даже не обратила внимание на колкость. В голове прокручивалась фраза:
        <p>“Жених…”
            `,background:"Backgrounds/Lake_Taxi",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[285].Begin(),Game.Message("\u0411\u043B\u0430\u0433\u043E\u0434\u0430\u0440\u044F \u0445\u043E\u0440\u043E\u0448\u0438\u043C \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F\u043C \u0441 \u041B\u0435\u043E\u043D\u043E\u043C, \u043F\u0430\u0440\u0435\u043D\u044C \u0432\u044B\u0437\u0432\u0430\u043B\u0441\u044F \u0441\u0430\u043C \u043E\u043F\u043B\u0430\u0442\u0438\u0442\u044C \u0432\u0430\u043C \u0442\u0430\u043A\u0441\u0438")}]}),Game.Scenes.FifthPart[285]=new Scene({text:`
        Краем глаза я видела, как Леон отчего-то широко улыбался. Он быстро отвернулся и направился к мотоциклу. 
            `,background:"Backgrounds/Lake_Taxi",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[287].Begin()}]}),Game.Scenes.FifthPart[286]=new Scene({text:`
        Я незамедлительно вызвала и оплатила такси. На карте было видно, что движение на дорогах свободное, поэтому ожидание было недолгим.
        <p>Когда водитель приехал, я и Чарли разместились на заднем сидении. 
            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[287].Begin(),Game.Message("\u0412\u044B \u043F\u043E\u0442\u0440\u0430\u0442\u0438\u043B\u0438 \u0447\u0430\u0441\u0442\u044C \u0441\u0432\u043E\u0438\u0445 \u0434\u0435\u043D\u0435\u0433 (200)"),Game.Stats.Money.Add(-200)}]}),Game.Scenes.FifthPart[287]=new Scene({text:`
        Леон, как и обещал, следовал за нами до самого дома. 
        <p>Я и не заметила, как прильнула к окошку и сладко задремала. Всю дорогу я мирно посапывала, а Чарли аккуратно положил свою мордочку мне на колени, греясь и отдыхая.
            `,background:"Backgrounds/Lake_Taxi",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[288].Begin()}]}),Game.Scenes.FifthPart[288]=new Scene({text:`
        Когда машина остановилась, Леон аккуратно дотронулся до моего плеча, чтобы разбудить. 
        <p>- $Имя Игрока$, приехали… 
        <p>Я нехотя открыла глаза. Собрала свой рюкзак и ласково позвала Чарли в сторону дома. 
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[289].Begin()}]}),Game.Scenes.FifthPart[289]=new Scene({text:`
        Леон помог мне выбраться и сказал напоследок: 
        <p>- Считаю, что мы отлично провели время. А главное - сделали доброе дело, - парень погладил шейку собаки. - Обязательно отмой его хорошенько и накорми чем-нибудь вкусным. А затем попробуй отыскать хозяина. 
        <p>- Ты не останешься?
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[290].Begin()}]}),Game.Scenes.FifthPart[290]=new Scene({text:`
        - Прости, мне нужно уехать на работу, - Леон посмотрел на сообщение, которое ему пришло на мобильный телефон. - Уверен, твоя замечательная мама поможет со всем.
        <p>- Спасибо, Леон. Удачи на работе.
        <p>Мы обнялись на прощание. Дождавшись, пока он уедет, я завела собаку в дом.
            `,background:"Persons/Leon_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[479].Begin()}]}),Game.Scenes.FifthPart[291]=new Scene({text:`
        Скарлетт всегда заботится обо мне, беспокоится. Даже если между нами и случаются разногласия, девушка старается оставаться на моей стороне. Быть рядом, поддерживать. 
        <p>“Давно мы не общались с ней вне университета. Сегодня - идеальный день, чтобы это реализовать. Уверена, нам обеим будет на пользу смена обстановки.”
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[292].Begin()}]}),Game.Scenes.FifthPart[292]=new Scene({text:`
        Я написала Скарлетт и получила довольно скорый ответ. Она с удовольствием согласилась на поездку и обещала быть в течение часа. 
        <p>Я решила спуститься на кухню, чтобы собрать нам что-нибудь вкусного в дорогу. 
        <p>“Что любит Скарлетт? Надо вспомнить… Точно не всякую вредную еду, ведь следит за фигурой. Колбаса и вовсе ее враг номер один”.
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[293].Begin()}]}),Game.Scenes.FifthPart[293]=new Scene({text:`
        На кухне как раз суетилась мама, подготавливая ингредиенты для будущего ужина. Папа сидел на диване и читал газету, поглядывая в телевизор. 
        <p>- Ты куда-то собираешься? - спросила мама, начиная чистить картошку. 
        <p>- Да, решили со Скарлетт съездить на озеро. Давно никуда не выбирались.
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[294].Begin()}]}),Game.Scenes.FifthPart[294]=new Scene({text:`
        - Молодцы, - к нам в разговор вклинился папа, отвлекаясь от просмотра футбольного матча и чтения. - Не все же дома сидеть. Могу вас подвезти, кстати. Как раз есть одно дело неподалеку.
        <p>- Это было бы чудесно, спасибо большое! 
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[295].Begin()}]}),Game.Scenes.FifthPart[295]=new Scene({text:`
        Мы еще немного поговорили с родителями и я принялась собирать еду. 
        <p>“Что же выбрать?”
            `,background:"Backgrounds/Kitchen",buttontext:["\u0427\u0438\u043F\u0441\u044B","\u0421\u044D\u043D\u0434\u0432\u0438\u0447 \u0441 \u0438\u043D\u0434\u0435\u0439\u043A\u043E\u0439","\u0421\u044D\u043D\u0434\u0432\u0438\u0447\u0438 \u0441 \u043A\u043E\u043B\u0431\u0430\u0441\u043E\u0439","\u0424\u0440\u0443\u043A\u0442\u044B \u0441 \u0439\u043E\u0433\u0443\u0440\u0442\u043E\u043C"],buttonaction:[()=>{Game.Scenes.FifthPart[296].Begin(),Game.Timer.Stop()},()=>{Game.Scenes.FifthPart[297].Begin(),Game.Timer.Stop()},()=>{Game.Scenes.FifthPart[298].Begin(),Game.Timer.Stop()},()=>{Game.Scenes.FifthPart[299].Begin(),Game.Timer.Stop()}],condition:function(){Game.Timer.Set(5,()=>{Game.Scenes.FifthPart[296].Begin()})}}),Game.Scenes.FifthPart[296]=new Scene({text:`
        Нет ничего лучше и проще, чем старая добрая классика в виде аппетитных снеков. 
        <p>“Будет, чем похрустеть, как говорится.” 
        <p>Я убрала несколько пачек к себе в рюкзак, довольная своим выбором.
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[300].Begin()}],condition:function(){Game.Stats.Crisps.Add(1)}}),Game.Scenes.FifthPart[297]=new Scene({text:`
        Я достала из холодильника хлеб и запеченную индейку, которую вчера готовила мама. Добавив овощей, я аккуратно сформировала своей шедевр в аппетитный сэндвич. 
        <p>“Отличный перекус на наш скромный пикник!”
        <p>Я убрала несколько бутербродов к себе в рюкзак, довольная своим выбором. 
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[300].Begin()}],condition:function(){Game.Stats.TurkeySandw.Add(1)}}),Game.Scenes.FifthPart[298]=new Scene({text:`
        Я достала из холодильника хлеб и колбасу. Добавив майонезный соус, я аккуратно сформировала своей шедевр в аппетитный сэндвич. 
        <p>“Отличный перекус на наш скромный пикник!”
        <p>Я убрала несколько бутербродов к себе в рюкзак, довольная своим выбором
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[300].Begin()}],condition:function(){Game.Stats.SausageSandw.Add(1)}}),Game.Scenes.FifthPart[299]=new Scene({text:`
        Я набрала с собой несколько разнообразных фруктов: яблоки, бананы, мандарины и выбрала пару классических йогуртов. 
        <p>“Легко и просто. Соответствует нашему неожиданному пикнику!”
        <p>Я убрала фрукты с йогуртом к себе в рюкзак, довольная своим выбором.
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[300].Begin()}],condition:function(){Game.Stats.FruitsYogurt.Add(1)}}),Game.Scenes.FifthPart[300]=new Scene({text:`
        Скарлетт приехала в назначенное время. Подруга выглядела очень уютно, но не изменяла своему стилю отличницы.
        <p>- $Имя Игрока$, привет! - девушка крепко обняла меня. - Очень рада видеть тебя. Неужели мы наконец-то выберемся куда-то и проведем время вместе… Спасибо за приглашение.
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[301].Begin()}]}),Game.Scenes.FifthPart[301]=new Scene({text:`
        Я вдруг почувствовал сильный запах алкоголя, во время наших объятий.
        <p>“Скарлетт сегодня сама не своя. Обычно она вся такая серьезная и часто в своих учебных делах.” 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[302].Begin()}]}),Game.Scenes.FifthPart[302]=new Scene({text:`
        - Скар, ты что пила? Что случилось?
        <p>- Да не волнуйся ты так… Всего лишь несколько бокалов вина. И кстати, - она потрясла своим рюкзаком, откуда послышался звон бутылок. - Мы с тобой оторвемся по полной, вот увидишь!
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[303].Begin()}]}),Game.Scenes.FifthPart[303]=new Scene({text:`
        Я не стала ничего говорить и расспрашивать о чем-то раньше времени. 
        <p>“Самое главное, что ей сейчас хорошо, а далее мы со всем разберемся.”
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[304].Begin()}]}),Game.Scenes.FifthPart[304]=new Scene({text:`
        К нам вышел отец, который поздоровался со Скарлетт и сел заводить машину. 
        <p>- Это что же, наш личный водитель, - шепнула мне на ухо девушка. 
        <p>- Как вы и просили: личный водитель, хорошая компания и поездка за тридевять земель.
        <p>Мы громко рассмеялись, садясь в папину машину. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[305].Begin()}]}),Game.Scenes.FifthPart[305]=new Scene({text:`
        Всю дорогу мы общались со Скарлетт на разные темы, начиная с турецких сериалов, заканчивая мыслями о выпуском. 
        <p>Отец не вмешивался. Только слушал, иногда улыбаясь от наших девчачьих разговоров. 
        <p>Подруга также рассказывала про свои мечты, вроде отправиться путешествовать в какой-нибудь интересный город. 
            `,background:"Backgrounds/Hero_Car",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[306].Begin()}]}),Game.Scenes.FifthPart[306]=new Scene({text:`
        - И это естественно будет Рим? - спросила я, желая подтвердить свои догадки. 
        <p>- Все может быть, - Скар лишь загадочно улыбнулась. 
            `,background:"Backgrounds/Hero_Car",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[307].Begin()}]}),Game.Scenes.FifthPart[307]=new Scene({text:`
        Благодаря этим разговорам я совершенно забыла обо всех проблемах, которые преследовали меня все это время. Я чувствовала себя снова живой и все, что меня беспокоило в данный момент - как отговорить Скарлетт не открывать вино прямо в салоне автомобиля.
            `,background:"Backgrounds/Hero_Car",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[308].Begin(),Game.Sounds.Play("Music","Lake")}]}),Game.Scenes.FifthPart[308]=new Scene({text:`
        По прибытии на озеро, папа припарковал машину и на нас тут же обрушился сильный ветер. Вода в озере бушевала, будто бы порываясь выйти наружу и затопить все вокруг. 
        <p>- Ого, - удивилась Скарлетт. - Была же хорошая погода… Что ж, может не будем мерзнуть и посидим в какой-нибудь кафешке неподалеку?
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[309].Begin()}]}),Game.Scenes.FifthPart[309]=new Scene({text:`
        Я посмотрела на Скарлетт. Она была права, не стоило оставаться здесь. Но мне нужна была разрядка. Чистый горизонт без всех этих проблем, машин или шума города. 
        <p>“Я так мечтала выбраться хоть куда-нибудь… Пусть даже и не повезло с погодой, однако так быстро уезжать отсюда совсем не хочется”.  
        <p>- Мы можем хотя бы немного побыть здесь? 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[310].Begin()}]}),Game.Scenes.FifthPart[310]=new Scene({text:`
        - Знаешь, а ты права. Хотели выбраться вместе, а я что-то испугалась какого-то ветерка. 
        <p>- Спасибо, - я была рада, что подруга осталась на моей стороне.
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[311].Begin()}]}),Game.Scenes.FifthPart[311]=new Scene({text:`
        - Девочки, вы уверены? - спросил папа обеспокоенным тоном. - Все-таки это буря, а не шутки. 
        <p>- Не волнуйтесь, - Скарлетт приобняла меня за плечи. - Все под контролем. Да и не собираемся же мы плавать. Просто постоять на берегу…
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[312].Begin()}]}),Game.Scenes.FifthPart[312]=new Scene({text:`
        - Хорошо. Но будьте на связи. И, $Имя Игрока$, я не знаю, когда освобожусь… Сколько вы планируете тут быть?
        <p>- Папа, все хорошо. Не думай о нас. Мы просто вызовем такси, когда будем собираться уезжать. 
        <p>Отец кивнул, обнял меня и уехал. 

            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[313].Begin()}]}),Game.Scenes.FifthPart[313]=new Scene({text:`
        Мы подошли к берегу, где не на шутку разыгрались волны.
        <p>Я обхватила себя руками, осознавая, что мне безумно нравится окружающий пейзаж. Да, он был по-своему мрачный, но природа от этого не становилась менее привлекательной. Нет. Это была стихия, которая не может быть ни кем контролируема.
        <p>- Это потрясающе…
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[314].Begin()}]}),Game.Scenes.FifthPart[314]=new Scene({text:`
        - Занятно. Я всегда думала, что ты трусишка, а тебя оказывается привлекает, когда все вокруг подвержено хаосу.
        <p>- Не сказала бы, - я немного поерзала от дуновения ветра. - Просто природа - нечто другое. И относится к этому хочется иначе.
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[315].Begin()}]}),Game.Scenes.FifthPart[315]=new Scene({text:`
        - Так мы решили пофилософствовать, - девушка достала из рюкзака напитки. - Давай уж делать это как полагается. 
        <p>- Скар, все в порядке? - я снова решила поинтересоваться, так как видела, что несмотря на все эти улыбки, ее руки тряслись, а сама она заметно нервничала.
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[316].Begin()}]}),Game.Scenes.FifthPart[316]=new Scene({text:`
        - Конечно, нет. Иначе бы я не приняла решение напиться.
        <p>- Расскажешь? 
        <p>Скарлетт налила себе в пластиковый стакан вина и сухо сказала:
        <p>- Родители разводятся. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[317].Begin()}]}),Game.Scenes.FifthPart[317]=new Scene({text:`
        Скарлетт положила голову мне на плечо. Она не плакала, не билась в истерике, как бы мог любой поступить на ее месте. Подруга принимала вызов, который подкинула ей судьба. 
        <p>Да, без вспомогательных средств не обошлось, но на то мы и люди. 
        <p>“Всегда ищем как проще всего справляться с трудностями.”
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[318].Begin()}]}),Game.Scenes.FifthPart[318]=new Scene({text:`
        - Скар, - я гладила ее по спине, пытаясь успокоить. - Почему они приняли такое решение? Вы уже поговорили об этом?
        <p>- Все просто. Нежелание идти на компромиссы. Это их упрямство окончательно разрушило и без того шаткий фундамент нашей семьи. 
        <p>- Но, может, это к лучшему?
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[319].Begin()}]}),Game.Scenes.FifthPart[319]=new Scene({text:`
        - Может и так. Но я не представляю, как строить свою жизнь в этой суете. Почему они так поступают со мной? - Скарлетт отстранилась и залпом осушила содержимое стакана. 
        <p>- Послушай, пожалуйста, - я взяла ее за руку и крепко сжала. - Тебе пора перестать жалеть себя. У тебя все прекрасно. Есть отличные перспективы на будущее, есть понимающие друзья, а ты сама завидная красотка!
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[320].Begin()}]}),Game.Scenes.FifthPart[320]=new Scene({text:`
        Скарлетт не смогла сдержать улыбки. 
        <p>- Спасибо, - она смотрела на озеро, погружаясь в рассуждения. - Знаешь, $Имя Игрока$, ты удивительная. Когда тебе плохо, у тебя всегда находятся силы поддерживать близких. Такому таланту можно только позавидовать. Но не перенапрягайся. И помни, что я рядом. Только скажи и я помогу.
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[321].Begin()}]}),Game.Scenes.FifthPart[321]=new Scene({text:`
        Я верила этим словам, как и самой Скарлетт. Мне было тяжело, но осознание, что кто-то понимает меня и хочет помочь - вселяло уверенность в собственных силах. 
        <p>Была и другая половина меня, которая хотела утонуть в своей слабости, плакать рядом с ней и ныть об этом дурацком бремени.
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[322].Begin()}]}),Game.Scenes.FifthPart[322]=new Scene({text:`
        Однако за столь короткий срок, я научилась чаще справляться с проблемами самостоятельно. Тяжело жить в двух мирах без поддержки. Возможно, я действительно выросла и начала по-другому ценить свою жизнь и, конечно, жизнь близких. 
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[339].Begin()}],condition:function(){this.buttonaction[0]=6<=Game.Stats.Scarlett.Get()?()=>{Game.Scenes.FifthPart[323].Begin(),Game.Sounds.Play("Music","Scarlett")}:()=>{Game.Scenes.FifthPart[339].Begin()}}}),Game.Scenes.FifthPart[323]=new Scene({text:`
         Скарлетт почувствовала, что мое настроение немного изменилось, поэтому взяла меня за руку и крепко сжала мою ладонь. Она отчего-то улыбалась. Так живо, как будто бы в ее жизни совершенно нет никаких проблем. 
        <p>- Скар, что такое?
        <p>- Ничего. Просто я так счастлива. Знаешь, время, которое проводишь с близким человеком действительно заставляет ощущать только позитивные эмоции. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[324].Begin()}]}),Game.Scenes.FifthPart[324]=new Scene({text:`
         В ее словах была правда. Я сама чувствовала нечто подобное. 
        <p>- Знаешь, $Имя Игрока$, мы с тобой многое пережили. Как говорится, прошли через огонь и воду. Скажи честно, ты никогда не жалела, что дружишь со мной?
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[325].Begin()}]}),Game.Scenes.FifthPart[325]=new Scene({text:`
         В такие моменты мне действительно хотелось хорошенько стукнуть Скарлетт. Наверное ни одни отношения не могут обойтись без драмы. А может просто, каждому иногда нужно услышать ту самую поддержку и подтвердить уверенность взаимоотношений. 
        <p>- Иди сюда, Скар.
        <p>Я села на близлежащее бревно, потянула подругу за собой и аккуратно расположила ее голову на коленях. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[326].Begin()}]}),Game.Scenes.FifthPart[326]=new Scene({text:`
         - Я никогда не жалела. Да, мы ссоримся. Да, каждая любит иногда показать свой характер. Но от этого мы не перестаем быть близкими друг к другу. Отношения, которые мы выстраивали годами, только укрепляются, проходя тяжелые испытания. 
          <p>- Но почему тогда некоторые люди расстаются, спустя долго время, проведенное вместе? Почему они принимают такое решение?
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[327].Begin()}]}),Game.Scenes.FifthPart[327]=new Scene({text:`
         “Если бы я знала, Скарлетт. Отношения - это такой сложный процесс… Самой бы хоть в чем-то разобраться.”
          <p>Я вздохнула, пытаясь собраться с мыслями. Сейчас на моих коленях лежал один из самых дорогих мне людей, нуждающийся в правильных словах.
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[328].Begin()}]}),Game.Scenes.FifthPart[328]=new Scene({text:`
         - Скар, значит была проблема, которую они не хотели прорабатывать. Всегда есть причина. Мы же с тобой, например, постоянно разговариваем. Не откладываем все в долгий ящик, а стараемся по мере поступления проблем - сразу их решать. 
        <p>- Я понимаю, - девушка закрыла лицо руками, пытаясь скрыть эмоции. - Но почему люди, которые были вместе более восьми лет, так беспечны по отношению к друг другу? Эти года ничего не значат?
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[329].Begin()}]}),Game.Scenes.FifthPart[329]=new Scene({text:`
          - Конечно, значат, - я положила свою руку на ее, аккуратно поглаживая. - Просто они поздно поняли, что их взаимоотношения уже не те. Возможно, погрузившись в бытовые проблемы или сосредоточившись на работе, они позабыли, что такое простая семейная радость.
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[330].Begin()}]}),Game.Scenes.FifthPart[330]=new Scene({text:`
           - Я бы никогда не позволила такому случиться, - проговаривала Скарлетт сквозь слезы. 
          <p>- А какими ты видишь своим идеальные отношения? - я решила переключиться на другую тему, чтобы успокоить подругу.
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[331].Begin()}]}),Game.Scenes.FifthPart[331]=new Scene({text:`
           - Хороший вопрос… Я и не задумывалась никогда. В голове одна самореализация. Какие тут свидания и отношения. 
          <p>- Вот. Отличная возможность поделиться со мной планом идеального свидания. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[332].Begin()}]}),Game.Scenes.FifthPart[332]=new Scene({text:`
           Скарлетт лежала и долго думала над ответом. 
           <p>Ветер понемногу стихал, оставляя лишь спокойные холодные завывания, от которых по телу пробегали мурашки. Погода становилась более благоприятной, казалось, что вот-вот выйдет теплое солнце и накроет нас своими лучами. 
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[333].Begin()}]}),Game.Scenes.FifthPart[333]=new Scene({text:`
    - Я не люблю что-то помпезное. По мне - скромность украшает. Смотря на это озеро, мне до банального хотелось бы устроить здесь пикник. Приехать сюда вечером, на закате. Расстелить плед. Вкусно покушать. Обниматься, дожидаясь наступления темноты, чтобы разглядывать с любимым человеком звезды. Гадать, что же такого нам принесет завтрашний день…
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[334].Begin()}]}),Game.Scenes.FifthPart[334]=new Scene({text:`
    “Скарлетт оказывается тот еще романтик. Это очень мило.”
    <p>- Ого, а это и правда заманчивое предложение. 
    <p>- Хотела бы попасть на подобное мероприятие? - подруга усмехнулась. 
    <p>- Почему нет…
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[335].Begin()}]}),Game.Scenes.FifthPart[335]=new Scene({text:`
    Скарлетт убрала руки с лица и удивленно стала смотреть на меня своими красными от слез глазами. 
    <p>- Это… неожиданно. 
    <p>- Скар… 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[336].Begin()}]}),Game.Scenes.FifthPart[336]=new Scene({text:`
    Она вдруг коснулась своим указательным пальцем моих губ, заставляя не продолжать предложение. 
    <p>- Всему свое время. 
    <p>Подруга начала вставать с колен. В тот момент мы были как никогда близки к другу. А я думала лишь о том, что снова могу видеть ее лучезарную улыбку. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[337].Begin()}]}),Game.Scenes.FifthPart[337]=new Scene({text:`
    Скарлетт рассматривала меня, пытаясь запомнить каждую частичку. Внимательно. С интересом. 
    <p>Затем неожиданно поцеловала меня в щеку. Это был порыв, ее чувства, которые она хотела до меня донести. 
    <p>Я смущенно отвернулась, пребывая в смятениях. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[338].Begin(),Game.Message("\u0412\u044B \u0438 \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442 \u0432\u0441\u0435 \u0431\u043B\u0438\u0436\u0435 \u0443\u0437\u043D\u0430\u0435\u0442\u0435 \u0434\u0440\u0443\u0433 \u0434\u0440\u0443\u0433\u0430"),Game.Stats.Stats.Scarlett.Add(2),Game.Achievements.LakeScarlett.Unlock()}]}),Game.Scenes.FifthPart[338]=new Scene({text:`
    - Дорогая моя, $Имя Игрока$, как много нам еще предстоит узнать друг о друге. 
    <p>- Непременно, милашка Скарлетт. 
    <p>Я смотрела на подругу как никогда раньше, а на сердце зародилось совершенное новое и неизведанное чувство.
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[343].Begin(),Game.Sounds.Play("Music","Lake")}]}),Game.Scenes.FifthPart[339]=new Scene({text:`
    Скарлетт почувствовала, что мое настроение немного изменилось, поэтому положила мне руку на плечо и тепло улыбнулась. 
    <p>- $Имя Игрока$, я понимаю, что нам сейчас нелегко. Но мы справимся. Я в это верю. Мы же сильные и независимые. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[340].Begin()}]}),Game.Scenes.FifthPart[340]=new Scene({text:`
    Слова Скарлетт отозвались теплом в моей души. Я ответила:
    <p>- Ты права. Давай попробуем жить дальше. Стараться изо всех сил прорваться через любые трудности. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[341].Begin()}]}),Game.Scenes.FifthPart[341]=new Scene({text:`
    Девушка отвернулась, смотря на окружающий пейзаж. 
    <p>Возможно, в глубине души я ожидала большего. Я хотела поговорить со Скарлетт на более душевные темы. Узнать ее лучше. Но я понимала, почему все происходило именно таким образом.
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[342].Begin()}]}),Game.Scenes.FifthPart[342]=new Scene({text:`
     “Она всегда заботится обо мне, но я, видимо, уделяла этому недостаточно внимания. Все равно я рада, что смогла провести с ней хоть немного времени и развеяться. Уверена, мы станем еще ближе. И останемся подругами.”
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[343].Begin()}]}),Game.Scenes.FifthPart[343]=new Scene({text:`
      После всего произошедшего мы выдохнули и продолжили наслаждаться легкой прохладой исходящей от неспокойного озера. Разговаривали на отвлеченные темы, проводили время вместе, получая удовольствия от этих мгновений. 
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[344].Begin()}]}),Game.Scenes.FifthPart[344]=new Scene({text:`
      - Скар, я тут приготовила нам немного еды в поездку. Надеюсь, ты оценишь. 
      <p>- Ох, я такая голодная. Спасибо тебе большое за то, что подумала о закуске, - она мило засмеялась. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[345].Begin()}],condition:function(){1<=Game.Stats.Crisps.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FifthPart[345].Begin()}),1<=Game.Stats.TurkeySandw.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FifthPart[347].Begin()}),1<=Game.Stats.SausageSandw.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FifthPart[349].Begin()}),1<=Game.Stats.FruitsYogurt.Get()&&(this.buttonaction[0]=()=>{Game.Scenes.FifthPart[351].Begin()})}}),Game.Scenes.FifthPart[345]=new Scene({text:`
      Я достала из рюкзака несколько пачек чипсов и уверенно протянула одну из них Скарлетт. 
      <p>Девушка с досадой стала смотреть на еду и сказала:
      <p>- Я же говорила тебе, что на диете… Как же так. А мне так хочется есть. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[346].Begin(),Game.Message("\u0412\u0430\u0448 \u0432\u044B\u0431\u043E\u0440 \u0435\u0434\u044B \u0440\u0430\u0441\u0441\u0442\u0440\u043E\u0438\u043B \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442"),Game.Stats.Scarlett.Add(-1),Game.Stats.Crisps.Add(-1)}]}),Game.Scenes.FifthPart[346]=new Scene({text:`
      Скарлетт нехотя открыла пачку чипсов и начала громко хрустеть. 
      <p>“Черт, почему я так плохо знаю предпочтения своей подруги?”
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[353].Begin()}]}),Game.Scenes.FifthPart[347]=new Scene({text:`
      Я достала из рюкзака свои аппетитные сэндвичи и уверенно протянула один из них Скарлетт. 
      <p>Девушка взяла еду и уточнила: 
      <p>- А с чем они? 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[348].Begin(),Game.Message("\u0412\u0430\u0448 \u0432\u044B\u0431\u043E\u0440 \u0435\u0434\u044B \u043E\u0431\u0440\u0430\u0434\u043E\u0432\u0430\u043B \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442"),Game.Stats.Scarlett.Add(1),Game.Stats.TurkeySandw.Add(-1)}]}),Game.Scenes.FifthPart[348]=new Scene({text:`
      - Мама тут на днях готовила запеченную индейку. Решила сделать с ней, чтобы добру не пропадать.
      <p>- Правильно. Спасибо тебе большое! 
      <p>Девушка с жадностью накинулась на сэндвич, продолжая благодарить. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[353].Begin()}]}),Game.Scenes.FifthPart[349]=new Scene({text:`
      Я достала из рюкзака свои аппетитные сэндвичи и уверенно протянула один из них Скарлетт. 
      <p>Девушка взяла еду и уточнила: 
      <p>- А с чем они? 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[350].Begin(),Game.Message("\u0412\u0430\u0448 \u0432\u044B\u0431\u043E\u0440 \u0435\u0434\u044B \u0440\u0430\u0441\u0441\u0442\u0440\u043E\u0438\u043B \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442"),Game.Stats.Scarlett.Add(-1),Game.Stats.SausageSandw.Add(-1)}]}),Game.Scenes.FifthPart[350]=new Scene({text:`
      - С колбасой. У нас дома было несколько видов, решила сделать, чтобы добру не пропадать. 
      <p>Скарлетт с досадой стала смотреть на еду и сказала:
      <p>- Я же говорила тебе, что на диете… Как же так. А мне так хочется есть. 
      <p>Скарлетт нехотя начала есть сэндвич.
      <p>“Черт, почему я так плохо знаю предпочтения своей подруги?”
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[353].Begin()}]}),Game.Scenes.FifthPart[351]=new Scene({text:`
      Я достала из рюкзака фрукты с йогуртом и уверенно протянула несколько Скарлетт. 
      <p>- Замечательно. Ты попала в точку. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[352].Begin(),Game.Message("\u0412\u0430\u0448 \u0432\u044B\u0431\u043E\u0440 \u0435\u0434\u044B \u043E\u0431\u0440\u0430\u0434\u043E\u0432\u0430\u043B \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442"),Game.Stats.Scarlett.Add(1),Game.Stats.FruitsYogurt.Add(-1)}]}),Game.Scenes.FifthPart[352]=new Scene({text:`
      Я была рада порадовать подругу.
      <p>Девушка с жадностью накинулась на яблоки и бананы, продолжая благодарить. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[353].Begin()}]}),Game.Scenes.FifthPart[353]=new Scene({text:`
      - Ну, ладно, - проговорила Скарлетт, потягиваясь. - У меня есть предложение получше, чем просто сидеть и кушать.. 
      <p>- А вот это уже интересно, слушаю тебя. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[354].Begin()}]}),Game.Scenes.FifthPart[354]=new Scene({text:`
      Девушка налила себе новую порцию вина и продолжила:
      <p>- Как насчет того, чтобы ты отгадывала мои загадки, - в голосе Скарлетт чувствовалось влияние алкоголя. 
      <p>- Я - что делала? 
      <p>- Ну, загадки… Всего лишь две. Давай. А за правильные ответы - будет подарок. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[355].Begin()}]}),Game.Scenes.FifthPart[355]=new Scene({text:`
      Я искренне засмеялась такому детскому предложению. Но деваться было некуда. Я покорно приняла ситуацию и кивнула. 
      <p>Скарлетт озвучила свою первую загадку.
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[356].Begin()}]}),Game.Scenes.FifthPart[356]=new Scene({text:`
      - Что пахнет как синяя краска, но красного цвета? 
      <p>Вопрос ввел меня в ступор. 
      <p>“Какой запах у краски? Что мне ответить?” 
            `,background:"Persons/Scarlett_New",buttontext:["\u041A\u0440\u0430\u0441\u043D\u0430\u044F \u043A\u0440\u0430\u0441\u043A\u0430","\u0420\u0430\u0441\u0442\u0432\u043E\u0440\u0438\u0442\u0435\u043B\u044C","\u041A\u0440\u0430\u0441\u043A\u0430 \u0434\u043B\u044F \u0432\u043E\u043B\u043E\u0441"],buttonaction:[()=>{Game.Scenes.FifthPart[357].Begin()},()=>{Game.Scenes.FifthPart[358].Begin()},()=>{Game.Scenes.FifthPart[360].Begin()}]}),Game.Scenes.FifthPart[357]=new Scene({text:`
      “Это какая-то чепуха… Но больше мне ничего не приходит в голову.”
      <p>- Ого, - Скарлетт немного растерялась. - Я была уверена, что вопрос поставит тебя в тупик, но ты молодец. Это так просто и так глупо. Еще один вопрос и приз у тебя в кармане!
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[362].Begin()}]}),Game.Scenes.FifthPart[358]=new Scene({text:`
      “Это же логично. Краска пахнет так же едко, как растворитель. А больше и ничего не подходит…
      <p>- Хе-хе, - Скарлетт коварно улыбнулась. - Вот ты и попалась. Все гораздо очевиднее и проще. Ты слишком глубоко задумалась, ответ на поверхности. 
      <p>- Так это было неправильно?
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[359].Begin()}]}),Game.Scenes.FifthPart[359]=new Scene({text:`
      - Неа, правильный ответ - красная краска. Видишь? Не всегда надо пытаться искать скрытый смысл. 
      <p>Я с досадой посмотрела на подругу. 
      <p>“Обидно, что уйду без приза. Но зато мы повеселились!”
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[371].Begin()}]}),Game.Scenes.FifthPart[360]=new Scene({text:`
      “Отличный вариант. Эти запахи чем-то похожи. Уверена, я попала в точку!” 
      <p>- Хе-хе, - Скарлетт коварно улыбнулась. - Вот ты и попалась. Все гораздо очевиднее и проще. Много думать не надо. 
      <p>- Так я назвала неправильный ответ?
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[361].Begin()}]}),Game.Scenes.FifthPart[361]=new Scene({text:`
      - Неправильный. Правильный ответ - красная краска. Видишь? Не всегда надо пытаться искать скрытые смыслы. 
      <p>Я с досадой посмотрела на подругу. 
      <p>“Обидно, что уйду без приза. Но зато мы повеселились!”
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[371].Begin()}]}),Game.Scenes.FifthPart[362]=new Scene({text:`
      - Мой последний вопрос, $Имя Игрока$. Ух. Он уже посерьезнее. Что всегда будет находиться перед тобой, и при этом тебе никогда это не увидеть?
      <p>“И правда… Стоит лучше обдумать варианты. Это может быть все что угодно.”
            `,background:"Persons/Scarlett_New",buttontext:["\u0412\u0440\u0435\u043C\u044F","\u0411\u0443\u0434\u0443\u0449\u0435\u0435","\u0412\u043E\u0437\u0434\u0443\u0445"],buttonaction:[()=>{Game.Scenes.FifthPart[363].Begin()},()=>{Game.Scenes.FifthPart[365].Begin(),Game.Achievements.Guru.Unlock()},()=>{Game.Scenes.FifthPart[369].Begin()}]}),Game.Scenes.FifthPart[363]=new Scene({text:`
      “Оно же незримо. Это может быть правильным ответом.”
      <p>- Нет, не оно. Время - это что-то общее, оно не принадлежит конкретно тебе. Оно затрагивает все и вся. А вот будущее… Только твое будущее - важно. 
      <p>- Скар, подходит и тот и тот вариант. Глупости какие-то. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[364].Begin()}]}),Game.Scenes.FifthPart[364]=new Scene({text:`
      - Может быть. Но увы. Ты не угадала. 
      <p>Я с досадой посмотрела на подругу. 
      <p>“Обидно, что уйду без приза. Но зато мы повеселились!”
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[371].Begin()}]}),Game.Scenes.FifthPart[365]=new Scene({text:`
      “Я никак не могу увидеть будущее. Конечно, может еще не время… Прошлое то вижу. Но все-таки это что-то недостижимое.”
      <p>- И это правильный ответ! Ура. Мои поздравления. 
      <p>- Ну, ты, конечно, и замудрила тут… Очень жду свой заслуженный приз!
      <p>- Нетерпеливая какая. Сейчас все будет. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[366].Begin()}]}),Game.Scenes.FifthPart[366]=new Scene({text:`
      - Как ты все отгадала? - Скарлетт решила уточнить. - У тебя что варианты ответов перед глазами?  
      <p>- И варианты ответов и вообще мной управляют иллюминаты. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[367].Begin(),Game.Message("\u0412\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u043D\u043E\u0432\u044B\u0439 \u043F\u0440\u0435\u0434\u043C\u0435\u0442"),Game.Stats.Corkscrew.Add(1)}]}),Game.Scenes.FifthPart[367]=new Scene({text:`
      - Ладно. Хватит ерничать. Как и обещала, держи. 
      <p>Девушка протянула мне штопор, которым открывают бутылки для вина. 
      <p>- Это что шутка? - я в растерянности приняла награду. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[368].Begin()}]}),Game.Scenes.FifthPart[368]=new Scene({text:`
      - Это твоя благодарность? Я вообще-то с ним никогда не расстаюсь. Он в каком-то роде мой талисман. Поэтому я тебе отдаю нечто важное. 
      <p>- Скар…
      <p>Я решила не спорить и просто приняла подарок, обнимая подругу. 
      <p>“Расскажу ей как-нибудь. Когда она будет трезвой. Все же это милый жест с ее стороны. Но странный…”
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[371].Begin()}]}),Game.Scenes.FifthPart[369]=new Scene({text:`
      “Мне кажется, это очевидно. Он вокруг нас, и передо мной, в том числе, а увидеть его я не в силах.”
      <p>- Знаешь, если бы это был такой же легкий вопрос, как про краску - то я бы сказала, что это правильно. Но в этот раз тебе нужно было преисполниться в своем познании и выдать что-то интереснее, - немного улыбаясь, говорила Скарлетт. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[370].Begin()}]}),Game.Scenes.FifthPart[370]=new Scene({text:`
      - А какой же правильный ответ? 
      <p>- Будущее, дорогая моя. То, что принадлежит только тебе и то, что ты не в силах увидеть. 
      <p>Я с досадой посмотрела на подругу. 
      <p>“Обидно, что уйду без приза. Но зато мы повеселились!”
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[371].Begin()}]}),Game.Scenes.FifthPart[371]=new Scene({text:`
      Мы еще немного постояли, слушая, как волны бьются о берег, как завывает ветер, холодным воздухом лаская нашу кожу. 
      <p>Вскоре, Скарлетт ушла в сторону дороги, давая мне немного времени, чтобы побыть наедине. 
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[372].Begin()}]}),Game.Scenes.FifthPart[372]=new Scene({text:`
      Я двинулась следом, но что-то привлекло мое внимание. Среди деревьев было движение. Приглядевшись, я заметила мелькающий маленький силуэт, медленно приближающийся ко мне.  
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[373].Begin()}]}),Game.Scenes.FifthPart[373]=new Scene({text:`
      Я подошла ближе и разглядела в нем собаку. 
            `,background:"Persons/Dog_Dirty",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[374].Begin()}]}),Game.Scenes.FifthPart[374]=new Scene({text:`
      Продрогшая, грязная, но с преданными горящими глазами. Я аккуратно протянула ей руку и на мое удивление животное отозвалось. Собака тронула меня мокрым носом и жалобно заскулила. 
      <p>Я погладила пса и обратила внимание, что на его шее висел ошейник. 
      <p>- Так тебя зовут, Чарли, дружок. Что же мне с тобой делать?
            `,background:"Persons/Dog_Dirty",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[375].Begin()}]}),Game.Scenes.FifthPart[375]=new Scene({text:`
      Ко мне присоединилась Скарлетт, которая стояла в ступоре, будто бы не осознавая до конца происходящее:
      <p>- Это что, собака? Не понимаю, как она тут оказалась? И что мы теперь будем делать?
      <p>- Отвезем его ко мне домой, а дальше подумаем. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[376].Begin()}]}),Game.Scenes.FifthPart[376]=new Scene({text:`
      - Ох, - девушка схватилась за голову. - Нужно вызвать такси или может помыть его для начала? А вдруг он ранен…
      <p>- Скар, не паникуй. Погода плохая, нужно как можно скорее увести его отсюда. 
      <p>- Ты права. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[377].Begin()}]}),Game.Scenes.FifthPart[377]=new Scene({text:`
      Скарлетт начала  не спеша двигаться в сторону дороги, увлекая за собой собаку. Пес сначала стоял в недоумении, но все же последовал за подругой на полусогнутых лапах.
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[378].Begin()}]}),Game.Scenes.FifthPart[378]=new Scene({text:`
      - Я вызову такси, а ты пока побудь с Чарли, - я достала телефон, выбирая нужное приложение. 
      <p>- Вот так приключения…
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[381].Begin()}],condition:function(){this.buttonaction[0]=6<=Game.Stats.Scarlett.Get()?()=>{Game.Scenes.FifthPart[379].Begin()}:()=>{Game.Scenes.FifthPart[381].Begin()}}}),Game.Scenes.FifthPart[379]=new Scene({text:`
      Когда такси подъехало, я полезла в рюкзак за деньгами, чтобы оплатить поездку. 
      <p>Но неожиданно вмешалась Скарлетт. Она видимо заранее подготовилась и протянула водителю несколько купюр. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[380].Begin(),Game.Message("\u0411\u043B\u0430\u0433\u043E\u0434\u0430\u0440\u044F \u0445\u043E\u0440\u043E\u0448\u0438\u043C \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F\u043C \u0441\u043E \u0421\u043A\u0430\u0440\u043B\u0435\u0442\u0442, \u0434\u0435\u0432\u0443\u0448\u043A\u0430 \u0441\u0430\u043C\u0430 \u0432\u044B\u0437\u0432\u0430\u043B\u0430\u0441\u044C \u043E\u043F\u043B\u0430\u0442\u0438\u0442\u044C \u0432\u0430\u043C \u0442\u0430\u043A\u0441\u0438")}]}),Game.Scenes.FifthPart[380]=new Scene({text:`
      - Скар, зачем?
      <p>- Дорогая, $Имя Игрока$, это меньшее, что я могу сделать. Я просто хотела завершить наш вечер на хорошей ноте и сделать тебе приятно. Прошу. Просто прими. Без твоих “но” или “если”. 
      <p>Я тепло обняла подругу и мы сели в машину. 
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[382].Begin()}]}),Game.Scenes.FifthPart[381]=new Scene({text:`
      Я незамедлительно вызвала и оплатила такси. На карте было видно, что движение на дорогах свободное, поэтому ожидание было недолгим.
      <p>Когда водитель приехал, мы разместились на заднем сидении. 
            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[382].Begin(),Game.Message("\u0412\u044B \u043F\u043E\u0442\u0440\u0430\u0442\u0438\u043B\u0438 \u0447\u0430\u0441\u0442\u044C \u0441\u0432\u043E\u0438\u0445 \u0434\u0435\u043D\u0435\u0433 (200)"),Game.Stats.Money.Add(-200)}]}),Game.Scenes.FifthPart[382]=new Scene({text:`
      Я и не заметила, как прильнула к окошку и сладко задремала. Всю дорогу я мирно посапывала, а Чарли аккуратно положил свою мордочку мне на колени, греясь и отдыхая.
            `,background:"Backgrounds/Lake_Taxi",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[383].Begin()}]}),Game.Scenes.FifthPart[383]=new Scene({text:`
      Меня разбудила крепкая мужская рука, которая упорно теребила меня за плечо. 
      <p>- Барышня, мы приехали, - тон голоса водителя был не слишком радушен. 
      <p>- Скар, - подруга сладко дремала рядом со мной. - Просыпайся.
            `,background:"Backgrounds/Lake_Taxi",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[384].Begin()}]}),Game.Scenes.FifthPart[384]=new Scene({text:`
      Девушка дернулась и еле-еле приоткрыла свои глаза. 
      <p>- Как же болит голова… 
      <p>- Неудивительно после того, сколько ты выпила. Пойдем в дом, сделаю тебе крепкий черный чай.
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[385].Begin()}]}),Game.Scenes.FifthPart[385]=new Scene({text:`
      - Не стоит, - Скарлетт держалась за голову. - Мы чудесно провели время и спасли этого малыша. Обязательно помой его и сходи к ветеринару. А потом уже поищи хозяина. Я поеду домой и отосплюсь. Прости, что так бросаю тебя. 
      <p>- Ничего, - я положила руку ей на плечо. - Спасибо тебе. Отдыхай. 
      <p>Я подождала пока такси вместе со Скарлетт уедет и завела собаку в дом.
            `,background:"Persons/Scarlett_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[479].Begin()}]}),Game.Scenes.FifthPart[386]=new Scene({text:`
      Мы с Шерил всегда были близки. Еще с самого детства. Она всегда была удивительной и по-своему странной девушкой. Но ее особенности не отталкивали меня, напротив, я хотела больше узнавать Шерил. Помочь ей с любыми трудностями. 
      <p>“Хочу провести с ней время. Это пойдет на пользу нам обеим.”
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[387].Begin()}]}),Game.Scenes.FifthPart[387]=new Scene({text:`
      Я написала Шерил и в скором времени получила ответ. Она согласилась и попросила прийти к ней домой, чтобы обо всем договориться лично. 
      <p>Собрав немного вещей в дорогу, я спустилась вниз. 
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[388].Begin()}]}),Game.Scenes.FifthPart[388]=new Scene({text:`
      На кухне мама что-то готовила для предстоящего ужина. Папа занимался своими делами. Он был погружен в чтение газеты и просмотр футбольного матча. 
      <p>Я оповестила родителей, что мы с Шерил хотим поехать и развеяться. Они были не против и с удовольствием одобрили мой выбор.
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[389].Begin()}]}),Game.Scenes.FifthPart[389]=new Scene({text:`
      Шерил встретила меня на пороге своего дома. 
      <p>- Привет, $Имя Игрока$, очень рада наконец-то увидеть тебя, - она тепло обняла меня, приглашая войти внутрь. - Ты постоишь тут пару минут? Я быстренько переоденусь. 
      <p>- Конечно. Не торопись. 
            `,background:"Persons/Cheryl",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[390].Begin()}]}),Game.Scenes.FifthPart[390]=new Scene({text:`
      Дом Шерил всегда выглядел одинаково, сколько я его помню. Минималистичный и старый дизайн. Все прибрано, аккуратно расставлено. 
      <p>“Она молодец. Продолжает ухаживать за домом несмотря на проблемы в семье. Я рада, что ее любовь к этому месту остается прежней.”
            `,background:"Backgrounds/Cheryl_House",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[391].Begin()}]}),Game.Scenes.FifthPart[391]=new Scene({text:`
      Пока я ждала подругу, ко мне вышел отчим Шерил. Он выглядел крайне неловко, переминался с ноги на ногу, и даже издалека чувствовался сильный запах перегара. 
      <p>Но все же он натянул приветственную улыбку и сказал:
      <p>- Давно ты к нам не заходила. Проходи, не стесняйся. Мы всегда тебе рады. 
      <p>- Спасибо, но я ненадолго. Мы с Шерил уже уходим. 
            `,background:"Backgrounds/Cheryl_House",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[392].Begin()}]}),Game.Scenes.FifthPart[392]=new Scene({text:`
      Сложно было описать те эмоции, которые я испытывала к этому мужчине, зная, какие ужасы он мог вытворить. 
      <p>“Сколько раз я говорила тебе, Шер. Беги отсюда.”
            `,background:"Backgrounds/Cheryl_House",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[393].Begin()}]}),Game.Scenes.FifthPart[393]=new Scene({text:`
      Шерил вышла в новом образе: на ней был теплый яркий свитер и джинсы-клёш. Она выглядела свежо и весело. 
      <p>- Ты уже завел машину? - тон голоса девушки приобрел пренебрежительные оттенки. 
      <p>- Я только недавно вернулся. Мы можем поехать в любой момент. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[394].Begin()}]}),Game.Scenes.FifthPart[394]=new Scene({text:`
      - $Имя Игрока$, мой любимый отчим любезно согласился отвезти нас. Надеюсь, ты не против. 
      <p>- Конечно, нет. Спасибо вам, что согласились…
      <p>- Пустяки, - мужчина неуклюже заковылял к машине.
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[395].Begin()}]}),Game.Scenes.FifthPart[395]=new Scene({text:`
      - Что ты делаешь, Шерил? Зачем он нам? Не проще ли вызвать такси? Или попросить моего отца? - я говорила вполголоса, чтобы мужчина не услышал.
      <p>- Мы не миллионеры, чтобы вызывать такси в такую даль. К тому же этот козёл мне должен. Не волнуйся. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[396].Begin()}]}),Game.Scenes.FifthPart[396]=new Scene({text:`
      Мы с Шерил разместились на заднем сидении.
      <p>С самого начала нашего пути повисла неловкая тишина. Подруга смотрела в окно, пребывая в своих размышлениях, а я лишь про себя мечтала, чтобы мы скорее добрались до пункта назначения. 
            `,background:"Backgrounds/Cheryl_Car",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[397].Begin()}]}),Game.Scenes.FifthPart[397]=new Scene({text:`
      На очередном светофоре отчим Шерил неожиданно обратился ко мне:
      <p>- Как у тебя дела, $Имя Игрока$? Как учеба?
      <p>- Нормально… 
      <p>- Знаешь, может посоветуешь, куда нам с Шерил сходить? Я думал насчет парка в центре города. Говорят, его облагородили. 
            `,background:"Backgrounds/Cheryl_Car",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[398].Begin()}]}),Game.Scenes.FifthPart[398]=new Scene({text:`
      “Зачем он делает вид, что заботится о ней? Какой нелепый и несвязный разговор.”
      <p>- Мы уже там были, - Шерил вмешалась в наш диалог, не скрывая своего пренебрежения. - Ты забыл, папочка?
      <p>- Да… Что-то не припомню, - он неловко почесал голову, продолжая вести автомобиль. 
            `,background:"Backgrounds/Cheryl_Car",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[399].Begin()}]}),Game.Scenes.FifthPart[399]=new Scene({text:`
      Шерил вздохнула и наклонилась ко мне, прошептав:
      <p>- Давай порисуем. Как раньше. У каждой есть несколько минут, а затем меняемся рисунками и добавляем что-нибудь свое. Посмотрим, что из этого выйдет? 
      <p>Я с радостью закивала. 
            `,background:"Backgrounds/Cheryl_Car",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[400].Begin()}]}),Game.Scenes.FifthPart[400]=new Scene({text:`
      Шерил подвинула ко мне часть альбома и я начала рисовать, напрягая свою фантазию. 
      <p>Когда мы закончили, то перевернули лист так, чтобы часть с рисунком Шерил оказалась передо мной.
      <p>“Что же мне нарисовать?” 
            `,background:"Backgrounds/Rabbit",buttontext:["\u0428\u043B\u044F\u043F\u0443 \u0434\u043B\u044F \u043A\u0440\u043E\u043B\u0438\u043A\u0430","\u0414\u0440\u0430\u043A\u043E\u043D\u0430 \u0432 \u043D\u0435\u0431\u0435"],buttonaction:[()=>{Game.Scenes.FifthPart[401].Begin()},()=>{Game.Scenes.FifthPart[405].Begin()}]}),Game.Scenes.FifthPart[401]=new Scene({text:`
      Маленький пушистый дружок обзавелся длинной шляпой, в которую я добавила несколько замысловатых деталей. Я с гордостью вручила Шерил свой шедевр. 
      <p>- Ого… Это что же, мы рисуем помесь безумного шляпника и кролика?
      <p>- Я помню, как тебе нравится “Алиса в стране чудес”. В детстве твой отец постоянно читал нам эту сказку. Мы даже разыгрывали сцены по ролям… Мне доставался чеширский кот, а ты всегда была Алисой. 
            `,background:"Backgrounds/Rabbit_Hat",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[402].Begin()}]}),Game.Scenes.FifthPart[402]=new Scene({text:`
      - Хорошие были времена. 
      <p>Шерил призадумалась, взяла в руки карандаш и нарисовала рыцаря, готового атаковать веселого кролика.
      <p>- А вот это нечестно… Чем виноват этот пушистик?
      <p>- Тем, что он такой милый, - Шерил ухмыльнулась и отвернулась, чтобы не подглядывать за моим следующим шагом. 
      <p>“Как мне спасти кролика?”
            `,background:"Backgrounds/Rabbit_Hat_Knight",buttontext:["\u041D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u0442\u044C \u0431\u0435\u0437\u0443\u043C\u043D\u043E\u0433\u043E \u0448\u043B\u044F\u043F\u043D\u0438\u043A\u0430","\u041D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u0442\u044C \u0434\u0435\u0440\u0435\u0432\u043E \u0441 \u043D\u043E\u0440\u043E\u0439"],buttonaction:[()=>{Game.Scenes.FifthPart[403].Begin()},()=>{Game.Scenes.FifthPart[404].Begin()}]}),Game.Scenes.FifthPart[403]=new Scene({text:`
      - С козырей зашла, - подруга опустила руки. - С его чашками и выходками, у этого рыцаря точно не будет ни единого шанса. 
      <p>- Вот так вот, - я улыбнулась, довольствуясь маленькой победой. 
            `,background:"Backgrounds/Rabbit_Hat_Knight_Hatter",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[409].Begin(),Game.Achievements.Fantasy.Unlock()}]}),Game.Scenes.FifthPart[404]=new Scene({text:`
      - А, нет, - подруга взяла карандаш и перечеркнула кролика. - Рыцарь уже поразил свою цель. Твой план побега провалился.
      <p>- Это нечестно! Кролик проворнее этого бугая с доспехами. 
      <p>- Слабая отговорка, - Шерил ткнула меня в бок, довольствуясь своей липовой победой. 
            `,background:"Backgrounds/Rabbit_Hat_Knight_Tree",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[409].Begin()}]}),Game.Scenes.FifthPart[405]=new Scene({text:`
      Над кроликом появился устрашающий дракон, который своим пламенем хотел зажарить бедолагу. 
      <p>- Ты решила начать прям так серьезно? - Шерил ухмыльнулась и начала рисовать мне что-то в ответ. 
            `,background:"Backgrounds/Rabbit_Dragon",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[1].Begin()}]}),Game.Scenes.FifthPart[1]=new Scene({text:`
      Через некоторое время, я увидела, как рядом с кроликом появилась гусеница, которая выдыхала круги дыма, скрывая их обоих от хищника. 
      <p>- Как мило, что ты все больше отсылаешься к сказке “Алиса в стране чудес”. Не забыла нашу любовь к этому произведению, - проговорила я, предаваясь в воспоминания. 
            `,background:"Backgrounds/Rabbit_Dragon_Caterpillar",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[406].Begin()}]}),Game.Scenes.FifthPart[406]=new Scene({text:`
      - Конечно, нет. Ведь отец так часто читал нам ее. 
      <p>Я сосредоточилась и задумалась, чем можно переиграть гусеницу, которая так всесильна?
            `,background:"Backgrounds/Rabbit_Dragon_Caterpillar",buttontext:["\u041D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u0442\u044C \u0444\u043B\u0430\u043A\u043E\u043D \u0441 \u043E\u0442\u0440\u0430\u0432\u043E\u0439 \u0434\u043B\u044F \u043D\u0430\u0441\u0435\u043A\u043E\u043C\u044B\u0445","\u041D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u0442\u044C \u0434\u043E\u0436\u0434\u044C"],buttonaction:[()=>{Game.Scenes.FifthPart[407].Begin()},()=>{Game.Scenes.FifthPart[408].Begin()}]}),Game.Scenes.FifthPart[407]=new Scene({text:`
      - Ну, нет, $Имя Игрока$. Забавная попытка, но гусеница же непростая… 
      <p>- Это не говорит о том, что гусеница всесильна. 
      <p>- Слабая отговорка, - Шерил ткнула меня в бок, довольствуясь своей липовой победой.
            `,background:"Backgrounds/Rabbit_Dragon_Caterpillar_Spray",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[409].Begin()}]}),Game.Scenes.FifthPart[408]=new Scene({text:`
      - Так-так, а неплохой ход, - Шерил с досадой взглянула на рисунок. 
      <p>- Твоя гусеница не сможет курить, пока идет дождь, все логично, - я улыбнулась, довольствуясь маленькой победой.
            `,background:"Backgrounds/Rabbit_Dragon_Caterpillar_Cloud",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[409].Begin(),Game.Achievements.Fantasy.Unlock()}]}),Game.Scenes.FifthPart[409]=new Scene({text:`
      Этот досуг помогал мне отвлечься. Забыть обо всех окружающих меня проблемах. Я чувствовала себя снова живой и все, что мне хотелось в данный момент - это посоревноваться с Шерил в мастерстве рисования. 
            `,background:"Backgrounds/Cheryl_Car",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[410].Begin(),Game.Sounds.Play("Music","Lake")}]}),Game.Scenes.FifthPart[410]=new Scene({text:`
      По прибытии на озеро, отчим подруги припарковал машину и на нас тут же обрушился сильный ветер. Вода в озере бушевала, будто бы порываясь выйти наружу и затопить все вокруг. 
      <p>- Занимательная погода, - заметила Шерил. - Что скажешь, $Имя Игрока$, поедем обратно? 
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[411].Begin()}]}),Game.Scenes.FifthPart[411]=new Scene({text:`
      Я посмотрела на Шерил. Она была права, не стоило оставаться здесь. Но мне нужна была разрядка. Чистый горизонт без всех этих проблем, машин или шума города. 
      <p>“Я так мечтала выбраться хоть куда-нибудь… Пусть даже и не повезло с погодой, однако так быстро уезжать отсюда совсем не хочется”.  
      <p>- Мы можем хотя бы немного побыть здесь? 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[412].Begin()}]}),Game.Scenes.FifthPart[412]=new Scene({text:`
      - Конечно, можем, - Шерил одобрительно похлопала меня по плечу. - Уверена, мы с великим удовольствием проведем здесь время. 
      <p>- Спасибо, - я была рада, что подруга осталась на моей стороне. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[413].Begin()}]}),Game.Scenes.FifthPart[413]=new Scene({text:`
      И снова нас настигла гнетущая тишина. Я поглядывала на отчима Шерил, который стоял недалеко от нас около машины, и лениво почесывал бороду. Казалось, мужчина был совершенно не заинтересован в дальнейшем пребывании здесь. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[414].Begin()}]}),Game.Scenes.FifthPart[414]=new Scene({text:`
      - После такой милой беседы в машине, ты даже не спросишь, как мы доберемся обратно? - подруга крикнула, обращаясь к отчиму. - Или ты решил нас тут прождать все это время? 
      <p>- Шерил, кхм. У меня есть дела. К тому же ехать туда сюда. Бензин. А заправка далеко…
      <p>Его глупые отговорки в какой-то степени рассмешили бы меня, не будь это все жестокой реальностью, с которой приходилось сталкиваться Шерил на ежедневной основе. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[415].Begin()}]}),Game.Scenes.FifthPart[415]=new Scene({text:`
      Мужчина постоял минуту, а затем как-то резко открыл машину и не сказав больше ни слова - уехал.
      <p>- Шерил, что это было…
      <p>- Забей. Пойдем уже к озеру. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[416].Begin()}]}),Game.Scenes.FifthPart[416]=new Scene({text:`
      Мы подошли к берегу, где не на шутку разыгрались волны.
      <p>Я обхватила себя руками, осознавая, что мне безумно нравится окружающий пейзаж. Да, он был по-своему мрачный, но природа от этого не становилась менее привлекательной. Нет. Это была стихия, которая не может быть ни кем контролируема.
      <p>- Это потрясающе…
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[417].Begin()}]}),Game.Scenes.FifthPart[417]=new Scene({text:`
      - Интересные мысли, - Шерил достала из своего рюкзака альбом и села на холодную землю, делая набросок озера. 
      <p>- Простудишься же, давай лучше найдем, на что сесть.
      <p>- Не простужусь, я же закаленная, останемся здесь. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[418].Begin()}]}),Game.Scenes.FifthPart[418]=new Scene({text:`
      Я смотрела с какой точностью и аккуратностью подруга проводит каждую линию. И постепенно, под ее рукой, начал вырисовываться прекрасный пейзаж. 
      <p>Но все же меня не отпускала мысль, что девушка слишком часто пытается сбежать в другую реальность, игнорируя проблемы настоящего. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[419].Begin()}]}),Game.Scenes.FifthPart[419]=new Scene({text:`
      Решив воспользоваться случаем, я спросила:
      <p>- Шер, как дела? Как отношения…ну… 
      <p>- Думаешь, мой ответ изменился?
      <p>- Не знаю… Послушай, Шерил, я знаю тебя с детства. Мы вместе росли и вместе переживали различные этапы взросления. Почему все так обернулось?
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[420].Begin()}]}),Game.Scenes.FifthPart[420]=new Scene({text:`
      - Когда ты уже примешь мое решение остаться в этом доме? 
      <p>- Это трудно, - мне становилось все сложнее подбирать нужные слова. - Это же тебя погубит. 
      <p>- Ты никогда не поймешь, насколько мне важен этот дом и все воспоминания, связанные с ним. Я готова отказаться от всего на свете, но только не от этого. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[421].Begin()}]}),Game.Scenes.FifthPart[421]=new Scene({text:`
      - И это все из-за твоего настоящего папы, верно?
      <p>Шерил улыбнулась, откладывая альбом в сторону. Я знала, что эта тема для нее тяжелая. Но больше всего на свете мне хотелось помочь подруге выпутаться из сложных и запутанных обстоятельств, в которых она пребывает не по своей вине. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[422].Begin()}]}),Game.Scenes.FifthPart[422]=new Scene({text:`
      - Послушай, $Имя Игрока$, я никогда не смогу забыть его, - постепенно глаза Шерил наполнялись слезами. - Я не могу этого сделать. Дом - наше с ним место силы и поддержки, где он навсегда остался со мной рядом. 
      <p>- Я понимаю, - я положила руку на плечо девушки, стараясь успокоить. - Но и ты пойми, что так не может продолжаться вечно. Тебе нужно стать решительнее, либо позволить мне помочь тебе. Главное, помни, какое бы решение ты не приняла - я рядом. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[423].Begin()}]}),Game.Scenes.FifthPart[423]=new Scene({text:`
      Шерил завороженно смотрела куда-то вдаль. Несколько секунд она пребывала в раздумьях, а затем сказала: 
      <p>- Спасибо, $Имя Игрока$. Не знаю, как тебе это удается. У самой вроде трудности в жизни, а меня не бросаешь, даешь надежду, заставляешь верить в лучшее, - девушка опустила голову вниз и прошептала. - Я тоже рядом. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[424].Begin()}]}),Game.Scenes.FifthPart[424]=new Scene({text:`
      Я верила этим словам, как и самой Шерил. Мне было тяжело, но осознание, что кто-то понимает меня и хочет помочь - вселяло уверенность в собственных силах. 
      <p>Была и другая половина меня, которая хотела утонуть в своей слабости, плакать рядом с ней и ныть об этом дурацком бремени. 
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[425].Begin()}]}),Game.Scenes.FifthPart[425]=new Scene({text:`
      Однако за столь короткий срок, я научилась чаще справляться с проблемами самостоятельно. Тяжело жить в двух мирах без поддержки. Возможно, я действительно выросла и начала по-другому ценить свою жизнь и, конечно, жизнь близких. 
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[436].Begin()}],condition:function(){this.buttonaction[0]=2>=Game.Stats.Cheryl.Get()?()=>{Game.Scenes.FifthPart[426].Begin(),Game.Sounds.Play("Music","Cheryl")}:()=>{Game.Scenes.FifthPart[436].Begin()}}}),Game.Scenes.FifthPart[426]=new Scene({text:`
      Шерил почувствовала, что мое настроение немного изменилось, поэтому встала и направилась прямо к берегу, навстречу бурным волнам. 
      <p>Мне ничего не оставалось, кроме как последовать за ней. Когда мы поравнялись, Шерил произнесла:
      <p>- Когда мы стали такими? 
      <p>- Какими “такими”? 
      <p>- Слабыми. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[427].Begin()}]}),Game.Scenes.FifthPart[427]=new Scene({text:`
      Я с удивлением смотрела на подругу, которая в этот момент снимала обувь. 
      <p>- Что ты имеешь в виду? Зачем ты раздеваешься?
      <p>- Хотела ножки помочить. Присоединишься? 
      <p>Смотря на плохую погоду и волны, я отрицательно качнула головой. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[428].Begin()}]}),Game.Scenes.FifthPart[428]=new Scene({text:`
      - Как хочешь. 
      <p>Шерил медленно заходила в воду. Из-за волн ее джинсы моментально промокли, но девушку это не волновало. Она раскинула руки в стороны, наслаждаясь ветром и сложившейся атмосферой. 
      <p>- Шерил, осторожнее, это может быть опасно!
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[429].Begin()}]}),Game.Scenes.FifthPart[429]=new Scene({text:`
      - Это свобода, $Имя Игрока$. Природа. Стихия. Она не навредит.
      <p>“Ох, Шерил. Тебя бывает трудно понять, но я рада, что подобные сумасшествия делают тебя счастливее.”
      <p>Видя подругу такой жизнерадостной, такой искренней, мне не хотелось читать нотации. Достаточно было просто вместе с ней раствориться в этих легких ощущениях. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[430].Begin()}]}),Game.Scenes.FifthPart[430]=new Scene({text:`
      - Шерил, ты классная, - я вдруг поддалась этому веселому порыву и выкрикнула то, что на самом деле думаю. 
      <p>Девушка ничего не ответила. Краем глаза мне показалось, что я заметила ее мелькающую улыбку, но Шерил не спешила делиться своими эмоциями. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[431].Begin()}]}),Game.Scenes.FifthPart[431]=new Scene({text:`
      Вскоре она вышла на берег, засучила джинсы и села на ближайшее бревно, устало запрокинув голову к небу.
      <p>Устроившись рядом, я решила сказать:
      <p>- Спасибо, что ты согласилась провести со мной время. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[432].Begin()}]}),Game.Scenes.FifthPart[432]=new Scene({text:`
      - Да я только рада. Ты же знаешь, я не против нашего общения. 
      <p>- В последнее время мы не так близки, как раньше. Я хотела бы это исправить. 
      <p>- $Имя Игрока$, я помню, как ты говорила, что всегда поддержишь меня и будешь рядом. Но, по факту, ты все верно говоришь. Сейчас наши отношения переживают не лучшие времена. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[433].Begin()}]}),Game.Scenes.FifthPart[433]=new Scene({text:`
      - Прости, Шерил. Я не хотела, чтобы все так вышло. 
      <p>- Не за что извиняться, - девушка посмотрела прямо на меня. - Благодаря этому, я стала ощущать себя увереннее. Это может прозвучать странно, но я постепенно учусь справляться со всеми трудностями сама. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[434].Begin()}]}),Game.Scenes.FifthPart[434]=new Scene({text:`
      Такое откровение одновременно обрадовало и озадачило меня. 
      <p>“Как мне теперь вести себя с ней? Что я должна сказать?”
      <p>- Шер, я…
      <p>- Не стоит, - девушка положила руку мне на колено. - Я в порядке. Мы в порядке. Все будет хорошо. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[435].Begin(),Game.Sounds.Play("Music","Lake"),Game.Message("\u0412\u0430\u0448\u0438 \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u043F\u043E\u0434\u0442\u043E\u043B\u043A\u043D\u0443\u043B\u0438 \u0428\u0435\u0440\u0438\u043B \u0441\u0442\u0430\u0442\u044C \u0431\u043E\u043B\u0435\u0435 \u0441\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0439"),Game.Achievements.LakeCheryl.Unlock()}]}),Game.Scenes.FifthPart[435]=new Scene({text:`
      Я хотела оправдаться за свое поведение, но видя, как подруга спокойно отнеслась к нашей ситуации, мне оставалось лишь принять ее выбор. В глубине души меня действительно порадовал такой исход.
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[440].Begin()}]}),Game.Scenes.FifthPart[436]=new Scene({text:`
       Шерил почувствовала, что мое настроение немного изменилось, поэтому потянула меня за руку, чтобы я села рядом с ней на землю. 
       <p>Я не сопротивлялась и не думала о том, что могу, к примеру, заболеть. Видя горящие глаза Шерил, я мечтала услышать ее слова.
       <p>- $Имя Игрока$, мы с тобой через многое прошли. Я не знаю, чтобы я без тебя делала. Как бы справлялась.
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[437].Begin()}]}),Game.Scenes.FifthPart[437]=new Scene({text:`
       - Перестань, Шерил, - я тепло обняла подругу, которая начала громко всхлипывать, пытаясь сдержать слезы. - На то мы и подруги, чтобы поддерживать друг друга. 
      <p>- Я буду с тобой предельно откровенна. Я очень устала. Устала так жить. Все эти воспоминания, весь этот кошмар… Как мне это пережить?
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[438].Begin()}]}),Game.Scenes.FifthPart[438]=new Scene({text:`
       - Дорогая, все наладится. А почему, спросишь меня? Правильно. Потому что я всегда протяну руку помощи!
       <p>Девушка грустно улыбнулась мне и тихонько сказала:
      <p>- Я не смогу жить без тебя. Спасибо, - Шерил положила голову мне на плечо, пытаясь успокоиться. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[439].Begin(),Game.Message("\u0412\u0430\u0448\u0438 \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u043F\u043E\u0434\u0442\u043E\u043B\u043A\u043D\u0443\u043B\u0438 \u0428\u0435\u0440\u0438\u043B \u0431\u043E\u043B\u044C\u0448\u0435 \u043F\u043E\u043B\u0430\u0433\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u0432\u0430\u0441, \u0447\u0435\u043C \u043D\u0430 \u0441\u0435\u0431\u044F ")}]}),Game.Scenes.FifthPart[439]=new Scene({text:`
      - Не говори глупостей. Еще как сможешь. 
      <p>- Не смогу. 
      <p>Подруга закрыла глаза, делая вдох и выдох. Постепенно она пришла в норму, а я задумалась:
      <p>“Что же это… Я правильно поступаю с Шерил, давая ей надежду на свою повсеместную помощь? А если меня вдруг не будет в трудный час, сможет ли она справиться со всем одна?”
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[440].Begin()}]}),Game.Scenes.FifthPart[440]=new Scene({text:`
      После всего произошедшего мы выдохнули и продолжили наслаждаться легкой прохладой исходящей от неспокойного озера. Разговаривали на отвлеченные темы, проводили время вместе, получая удовольствия от этих мгновений. 
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[441].Begin()}]}),Game.Scenes.FifthPart[441]=new Scene({text:`
      Шерил продолжала рисовать озеро, а я с наслаждением наблюдала за творческим процессом и иногда дорисовывала свои мелкие дополнения. 
      <p>Мне вдруг стало кое-что интересно и я решила спросить:
      <p>- Скажи, ты же часто придумываешь какие-то новые миры, а какой из них наиболее увлекательный на твой взгляд?
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[442].Begin()}]}),Game.Scenes.FifthPart[442]=new Scene({text:`
      Девушка удивленно взглянула на меня. Она поднесла карандаш ко рту и стала размышлять. 
      <p>- Они все хороши. Сложно выделить какой-то один. 
      <p>- Расскажи тогда о самом последнем. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[443].Begin()}]}),Game.Scenes.FifthPart[443]=new Scene({text:`
      - Он подводный, ничего особенного. В голову пришли образы существ, похожих на русалок, вот я и решила засунуть их в водную обитель. 
      <p>- А кто еще населяет этот мир?
      <p>- Ты застала меня врасплох! Я вообще-то еще не до конца продумала концепцию. Давай лучше расскажу тебе про последний, который я закончила конструировать.  
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[444].Begin()}]}),Game.Scenes.FifthPart[444]=new Scene({text:`
      - Этот мир населяли разных размеров гиганты, которые стремились уничтожить человечество. И когда, казалось, конец света был неизбежен, несколько смельчаков дали бой и люди обрели надежду на спасение, - Шерил говорила как диктор, активно жестикулируя руками.  
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[445].Begin()}]}),Game.Scenes.FifthPart[445]=new Scene({text:`
      - И вот эта высоченная стена спасает их от гибели? - я указала на один из рисунков, которые она демонстрировала во время описания мира.
      <p>- Все верно, $Имя Игрока$. Я думала добавить еще несколько, чтобы сформировать целый город, но никак руки не доходят. 
      <p>- И как ты все это придумываешь?
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[446].Begin()}]}),Game.Scenes.FifthPart[446]=new Scene({text:`
      - Оно само приходит. Я могу обратить внимание на что-то совершенно несущественное, вроде отрывка из газетной статьи, и вот я уже рисую первые наброски мира. 
      <p>- Да у тебя же талант… Ты можешь писать книги или рисовать комиксы. Не думала заняться чем-то подобным?
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[447].Begin()}]}),Game.Scenes.FifthPart[447]=new Scene({text:`
      - Не думала, - Шерил засмущалась и отвернулась. - Пока мне хочется оставить все это только в своем распоряжении и часами фантазировать. 
      <p>- Я бы хотела больше узнать об этих твоих фантазиях. 
      <p>- Кто знает, может однажды и ты найдешь ключ к моему самому потаенному миру.
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[448].Begin()}]}),Game.Scenes.FifthPart[448]=new Scene({text:`
      Шерил продолжала перелистывать листы со своими рисунками. Я сосредоточенно рассматривала каждый их них. 
      <p>Увидев очередное творение подруги, я непроизвольно отшатнулась и тяжело задышала. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[449].Begin(),Game.Sounds.Play("Music","Chair")}]}),Game.Scenes.FifthPart[449]=new Scene({text:`
      Меня бросило в дрожь от нахлынувших воспоминаний. Я не могла поверить, что вижу перед собой ту самую тварь, которая так издевалась надо мной.
      <p>Но еще больше я не могла поверить, с какой точностью Шерил изобразила этого монстра. Сомнений быть не могло - это одно и то же существо. 
            `,background:"Backgrounds/Cheryl_Painting",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[450].Begin()}]}),Game.Scenes.FifthPart[450]=new Scene({text:`
      - Ты чего, $Имя Игрока$? Ужастиков пересмотрела? 
      <p>- Нет, я… - волнение преобладало надо мной и это никак не могло скрыться от подруги. 
      <p>- Давай лучше закончим на сегодня с этим. А то ты уже вся побледнела.
      <p>- Шерил, откуда этот рисунок? 
            `,background:"Backgrounds/Cheryl_Painting",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[451].Begin()}]}),Game.Scenes.FifthPart[451]=new Scene({text:`
      - Да так, просто увлеклась историей и нашла интересную легенду. Вдохновилась и нарисовала. 
      <p>- Что это за легенда?
      <p>- Да что с тобой такое, - голос Шерил был очень волнительный. - Что случилось? Почему стоило тебе увидеть рисунок, ты так переменилась в лице?
            `,background:"Backgrounds/Cheryl_Painting",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[452].Begin()}]}),Game.Scenes.FifthPart[452]=new Scene({text:`
      Я даже не знала, что мне ответить. Очередную ложь? 
      <p>- Просто мне кажется, что этот монстр не похож на твои обычные рисунки, - мой голос дрожал из-за нахлынувших переживаний. - Так странно… Я хотела бы больше узнать о нем.
      <p>- С чего это? - подруга смотрела на меня с недоверием. - Твоя реакция слишком необычная, чего-то не договариваешь мне? Ты тоже его видишь? 
            `,background:"Backgrounds/Cheryl_Painting",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[453].Begin()}]}),Game.Scenes.FifthPart[453]=new Scene({text:`
      - Нет, почему столько вопросов, мне просто любопытно.
      <p>- Может скажешь в чем дело? 
      <p>- Но я уже ответила… и…
            `,background:"Backgrounds/Cheryl_Painting",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[454].Begin()}]}),Game.Scenes.FifthPart[454]=new Scene({text:`
      - Знаешь, давай больше не будем об этом, пожалуйста
      <p>- Как скажешь, - я не хотела еще больше ссориться и продолжать увиливать, но все же предприняла попытку узнать о еще кое о чем. - А символ? 
            `,background:"Backgrounds/Cheryl_Painting",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[455].Begin()}]}),Game.Scenes.FifthPart[455]=new Scene({text:`
      - Я просто нарисовала то, что почувствовала. Перед глазами то и дело мелькали: образ той девушки, возмездие, время… Все это пришло в один миг в мою голову. 
      <p>“Что все это значит? Когда обстановка будет более располагающей, я обязательно расспрошу Шерил об этом.”
            `,background:"Backgrounds/Cheryl_Painting",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[456].Begin(),Game.Sounds.Play("Music","Lake")}]}),Game.Scenes.FifthPart[456]=new Scene({text:`
      Мы еще немного постояли, слушая, как волны бьются о берег, как завывает ветер, холодным воздухом лаская нашу кожу. 
      <p>Вскоре, Шерил ушла в сторону дороги, давая мне немного времени, чтобы побыть наедине с собой. 
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[457].Begin()}]}),Game.Scenes.FifthPart[457]=new Scene({text:`
      Я двинулась следом, но что-то привлекло мое внимание. Среди деревьев было движение. Приглядевшись, я заметила мелькающий маленький силуэт, медленно приближающийся ко мне.  
            `,background:"Backgrounds/Lake",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[458].Begin()}]}),Game.Scenes.FifthPart[458]=new Scene({text:`
      Я подошла ближе и разглядела в нем собаку.   
            `,background:"Persons/Dog_Dirty",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[459].Begin()}]}),Game.Scenes.FifthPart[459]=new Scene({text:`
      Продрогшая, грязная, но с преданными горящими глазами. Я аккуратно протянула ей руку и на мое удивление животное отозвалось. Собака тронула меня мокрым носом и жалобно заскулила. 
            `,background:"Persons/Dog_Dirty",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[460].Begin()}]}),Game.Scenes.FifthPart[460]=new Scene({text:`
      Я погладила пса и обратила внимание, что на его шее висел ошейник. 
      <p>- Так тебя зовут, Чарли, дружок. Что же мне с тобой делать?
            `,background:"Persons/Dog_Dirty",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[461].Begin()}]}),Game.Scenes.FifthPart[461]=new Scene({text:`
      Ко мне присоединилась Шерил, которая удивленно стояла и смотрела на испуганное животное. 
      <p>- Это галлюцинации или здесь действительно стоит собака?
      <p>- Стоит, Шерил. Я даже представить не могу, откуда он тут взялся. 
      <p>- Скорее всего потерялся. Должно быть его хозяин места себе не находит. 
      <p>- Отвезем его ко мне домой, а дальше подумаем. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[462].Begin()}]}),Game.Scenes.FifthPart[462]=new Scene({text:`
      Шерил начала не спеша двигаться в сторону дороги, увлекая за собой собаку. Пес сначала стоял в недоумении, но все же последовал за подругой на полусогнутых лапах.
            `,background:"Persons/Dog_Dirty",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[463].Begin()}]}),Game.Scenes.FifthPart[463]=new Scene({text:`
      - Я вызову такси, а ты пока побудь с Чарли, - я достала телефон, пытаясь открыть нужное приложение.
      <p>Но устройство зависло и до последнего не хотело загружать то, что мне было нужно.
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[464].Begin()}]}),Game.Scenes.FifthPart[464]=new Scene({text:`
      - Если ты будешь бить свой телефон о дерево, он от этого не станет лучше работать, - констатировала факт Шерил. 
      <p>- Я просто в панике, почему все так обернулось?
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[474].Begin()}],condition:function(){this.buttonaction[0]=2>=Game.Stats.Cheryl.Get()?()=>{Game.Scenes.FifthPart[465].Begin()}:()=>{Game.Scenes.FifthPart[474].Begin()}}}),Game.Scenes.FifthPart[465]=new Scene({text:`
      - У меня есть одна идея, но я боюсь, что тебе это не понравится. 
      <p>- Шерил, я согласна на все. 
      <p>- Выслушала бы для начала… Ладно. Пойдем выйдем к дороге. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[466].Begin()}]}),Game.Scenes.FifthPart[466]=new Scene({text:`
      Нашей скромной компанией мы выдвинулись из леса и вышли к проезжей части. Трасса пустовала, а пасмурная погода только подчеркивала таинственность этого места. 
      <p>- И для чего мы здесь, Шерил? 
      <p>- Увидишь. 
            `,background:"Backgrounds/Lake_Hitch",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[467].Begin()}]}),Game.Scenes.FifthPart[467]=new Scene({text:`
      Девушка смело вышла на край дороги, выставляя палец вверх. Несколько машин стремительно пронеслись мимо. Одна из них остановилась. 
      <p>Окно легковушки опустилось и из салона автомобиля показалась приветливая пожилая женщина: 
      <p>- Девушки, вы потерялись?
            `,background:"Backgrounds/Lake_Hitch",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[468].Begin()}]}),Game.Scenes.FifthPart[468]=new Scene({text:`
      - У нас сломался телефон и мы никак не можем вернуться домой, не могли бы вы нас подбросить? - Шерил вела себя очень раскованно. 
      <p>- Конечно. Виктор, давай поможем им разместиться.
      <p>Мы сели на заднее сиденье и автомобиль медленно начал свое движение.
      <p>“Шерил не перестает меня удивлять.”
            `,background:"Backgrounds/Lake_Hitch",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[469].Begin()}]}),Game.Scenes.FifthPart[469]=new Scene({text:`
      Пожилая пара завела с нами увлекательную беседу, рассказывая о своей бурной молодости.
      <p>- Помнишь, Виктор? Студенческие годы были такими интересными. Вот бы повернуть время вспять. 
      <p>- Один наш знакомый профессор говорит, что время лучше никогда не трогать, - Шерил поддерживала беседу.
            `,background:"Backgrounds/Cheryl_Hitch",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[470].Begin()}]}),Game.Scenes.FifthPart[470]=new Scene({text:`
      - Странное высказывание, - заметил Виктор. - Что значит “не трогать”?
      <p>- Ну, я уже в точности не помню его слова… Наверное, смысл в предопределенном исходе всего на свете или около того. 
      <p>- А он симпатичный? - спросила супруга Виктора. 
      <p>- Маргарет, боже. Я же рядом с тобой. Не стыдно?
            `,background:"Backgrounds/Cheryl_Hitch",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[471].Begin()}]}),Game.Scenes.FifthPart[471]=new Scene({text:`
      - Это любопытство и не более, дорогой. 
      <p>Шерил засмеялась и показала им фотографию Нэйтана, которая была размещена на сайте университета. 
      <p>- Батюшки, - Маргарет удивленно смотрела на профессора. - Он так похож на того мужчину, что мы видели в Париже лет десять назад…
            `,background:"Backgrounds/Cheryl_Hitch",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[472].Begin()}]}),Game.Scenes.FifthPart[472]=new Scene({text:`
      - Не может быть! - Виктор прильнул к экрану. - И правда. Нам его сложно забыть, учитывая, как он тогда помог. 
      <p>- Это просто невозможно, профессор довольно молодой. Как он мог быть в Париже так давно и совершенно не измениться. Не зря говорят, что в мире есть аж целых семь человек похожих на тебя, - Шерил рассмеялась.
      <p>- Может мы и ошиблись, неужели память совсем стала плоха, Виктор? 
      <p>- Кто знает. 
            `,background:"Backgrounds/Cheryl_Hitch",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[473].Begin()}]}),Game.Scenes.FifthPart[473]=new Scene({text:`
      Последнюю часть диалога мне не удалось услышать, ведь я и не заметила, как прильнула к окошку и сладко задремала. Оставшийся отрезок пути, я мирно посапывала, а Чарли аккуратно положил свою мордочку мне на колени, греясь и отдыхая.
            `,background:"Backgrounds/Cheryl_Hitch",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[476].Begin()}]}),Game.Scenes.FifthPart[474]=new Scene({text:`
      - Давай просто подождем. Уверена, через какое-то время он отвиснет. 
      <p>Так оно и произошло. Через полчаса я незамедлительно вызвала и оплатила такси. На карте было видно, что движение на дорогах свободное, поэтому ожидание было недолгим.
      <p>Когда водитель приехал, мы разместились на заднем сидении. 
            `,background:"",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[475].Begin(),Game.Message("\u0412\u044B \u043F\u043E\u0442\u0440\u0430\u0442\u0438\u043B\u0438 \u0447\u0430\u0441\u0442\u044C \u0441\u0432\u043E\u0438\u0445 \u0434\u0435\u043D\u0435\u0433 (200)"),Game.Stats.Money.Add(-200)}]}),Game.Scenes.FifthPart[475]=new Scene({text:`
      Я и не заметила, как прильнула к окошку и сладко задремала. Всю дорогу я мирно посапывала, а Чарли аккуратно положил свою мордочку мне на колени, греясь и отдыхая.
            `,background:"Backgrounds/Lake_Taxi",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[476].Begin()}]}),Game.Scenes.FifthPart[476]=new Scene({text:`
      Меня разбудила Шерил, которая теребила меня за плечо.
      <p>- Мы приехали, $Имя Игрока$.   
      <p>Я еле-еле открыла глаза и недоуменно смотрела на подругу. 
      <p>- Вставай, - Шерил потянула меня из салона. - Спасибо вам большое. 
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[477].Begin()}]}),Game.Scenes.FifthPart[477]=new Scene({text:`
      Я вместе с Чарли и подругой стояли около своего дома. 
      <p>- Шерил, спасибо тебе за все. И за твою помощь. 
      <p>- Это тебе спасибо, - она нежно обняла меня, немного сжимая. - Я очень чудесно провела время. Надеюсь, что мы когда-нибудь повторим.
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[478].Begin()}]}),Game.Scenes.FifthPart[478]=new Scene({text:`
      - Ты зайдешь? Или дела какие?
      <p>- Прости, я сразу поеду на работу. Никак не отпроситься, - Шерил грустно вздохнула. - Позаботься о Чарли. Обязательно приласкай его и поищи хозяина. Прости, что так бросаю тебя. 
      <p>- Ничего, - я положила руку ей на плечо. 
      <p>Я подождала пока Шерил уедет и завела собаку в дом.
            `,background:"Persons/Cheryl_New",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[479].Begin()}]}),Game.Scenes.FifthPart[479]=new Scene({text:`
      Нас встретила мама, которая выглядела крайне удивленно, увидев меня с собакой на пороге. 
      <p>- $Имя Игрока$, кто твой новый друг? 
      <p>Я кратко обрисовала маме все произошедшее на озере, в конце добавив, что не могла бросить его там. 
            `,background:"Backgrounds/Livingroom",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[480].Begin()}],condition:function(){Game.Sounds.Play("Music","FirstChapter")}}),Game.Scenes.FifthPart[480]=new Scene({text:`
      - Я даже не знаю… Давай мы поступим так. Сходи и помой его хорошенько. Я не против, если он поживет у нас какое-то время, пока не найдется хозяин. 
      <p>Мама подошла к собаке, погладила и взглянула на ошейник.
      <p>- Чарли, значит. Что ж, после душа будешь кушать вкусное отварное мясо. 
            `,background:"Persons/Dog_Dirty",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[481].Begin()}]}),Game.Scenes.FifthPart[481]=new Scene({text:`
      Первым делом я отвела его в ванну, чтобы смыть грязь. Собака не сопротивлялась и охотно шла на контакт, что наводило на очевидные мысли:
      <p>“Его воспитанием занимались. Он привык к людям, но как ты оказался на улице… Что же ты пережил, малыш?” 
            `,background:"Persons/Dog_Dry",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[482].Begin()}]}),Game.Scenes.FifthPart[482]=new Scene({text:`
      После купания, я вернулась обратно на кухню. К этому времени мама уже выставила несколько глубоких тарелок. Налила воду и положила кусочки мяса вперемешку с овощами. 
            `,background:"Backgrounds/Kitchen",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[483].Begin()}]}),Game.Scenes.FifthPart[483]=new Scene({text:`
      Чарли сидел смирно, не притрагивался к еде, будто бы чего-то ожидая. 
      <p>- Чарли, - я села рядом и погладила его. - Можно кушать, дружок. 
      <p>Виляя хвостом, собака с жадностью накинулась на съестное. 
            `,background:"Persons/Dog_Dry",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[484].Begin()}]}),Game.Scenes.FifthPart[484]=new Scene({text:`
      - Мама, спасибо за помощь… Я первый раз оказалась в такой ситуации. Мне даже представить сложно, что было бы, оставь мы его там. 
      <p>- Милая, ты все сделала правильно. Уверена, папа тоже обрадуется, когда вернется после своих дел. 
            `,background:"Persons/Dog_Dry",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[485].Begin()}]}),Game.Scenes.FifthPart[485]=new Scene({text:`
      Ближе к вечеру мы с Чарли поднялись в мою комнату и решили отдохнуть. Лежа на кровати, я прокручивала в голове воспоминания об этом насыщенном дне. 
      <p>“Столько всего… Я чувствую, что готова встретиться с чем угодно после таких теплых разговоров. Справиться со всем. Но прежде надо решить еще одно дело.”
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[486].Begin()}]}),Game.Scenes.FifthPart[486]=new Scene({text:`
      Взяв в руки телефон, я нашла несколько сайтов, где люди выкладывали объявления о пропаже животных.
      <p>Я так и не смогла найти хоть какую-нибудь информацию о Чарли или его хозяине. 
      <p>“Что ж… Стоит попробовать разместить его фотографию и свой номер телефона. Вдруг кто-то откликнется.” 
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[487].Begin()}]}),Game.Scenes.FifthPart[487]=new Scene({text:`
      Так я и поступила. Затем отложила телефон и задумалась.
      <p>“Время же течет по-разному в этой эпохе и в прошлом. Я могу со спокойной душой отправиться в мир Теслы, не боясь за Чарли или своих близких. Пора взять ситуацию в свои руки.”
      <p>Я была полна решимости действовать дальше. Поэтому скрестив ноги на кровати, я попыталась погрузиться в глубины своего сознания. 
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[488].Begin()}]}),Game.Scenes.FifthPart[488]=new Scene({text:`
      - Проводник, я знаю, что ты меня слышишь. Я в этом уверена. Я готова идти дальше. Просто покончим с этим. 
      <p>Ничего не происходило. Но я не отчаивалась. 
      <p>“Просто усну и встречусь с ним. Вероятно, должно сработать.” 
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[489].Begin()}]}),Game.Scenes.FifthPart[489]=new Scene({text:`
      Засыпая, я уже не боялась, что могу оступиться. Ведь по словам проводника: все шло своим закономерным чередом. 
      <p>“Мы еще посмотрим, кто останется победителем в этих играх разума.”
            `,background:"Backgrounds/Room",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[495].Begin(),Game.Sounds.Play("Music","Prologue")}],condition:function(){this.buttonaction[0]=1<=Game.Stats.God.Get()?()=>{Game.Scenes.FifthPart[490].Begin(),Game.Sounds.Play("Music","Prologue")}:()=>{Game.Scenes.FifthPart[495].Begin(),Game.Sounds.Play("Music","Prologue")}}}),Game.Scenes.FifthPart[490]=new Scene({text:`
      Я видела прекрасное поле, усеянное различными цветами. От аромата, исходящего от них, кружилась голова.
      <p>“Это место совершенно не похоже на все, что я видела в этом мире. Может ли это быть некой особенной зоной?”
            `,background:"Backgrounds/Flowerfield",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[491].Begin()}]}),Game.Scenes.FifthPart[491]=new Scene({text:`
      Проводник стоял неподалеку. Он с наслаждением осматривал цветы, трогал, вдыхал их чудесные запахи. 
      <p>Я смело подошла к нему. Мужчина впервые при нашей встрече улыбнулся, позволил себе положить руку мне на плечо и произнес:
      <p>- Я горжусь твоей решимостью. Твое желание не сдаваться выше всяких похвал. 
            `,background:"Persons/Stranger",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[492].Begin()}]}),Game.Scenes.FifthPart[492]=new Scene({text:`
      - Это далось мне нелегко. Но я готова. Готова разобраться со всем. Мне надоело быть аутсайдером в этой игре. 
      <p>- Будь по твоему, - загадочный проводник призадумался. - Тебе следует увидеть еще кое-что перед тем, как надолго отправиться назад в Нью-Йорк. 
            `,background:"Persons/Stranger",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[493].Begin()}]}),Game.Scenes.FifthPart[493]=new Scene({text:`
      - Хорошо. Но скажи, - я знала, что не получу ответа, но попытаться стоило. - А что это за место?
      <p>- Здесь я отдыхаю. Много думаю. Трачу время на себя. 
      <p>- Но разве ты не всегда “много думаешь”?
      <p>- У меня есть определенные обязательства, так что не всегда удается побыть наедине с собой. 
            `,background:"Persons/Stranger",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[494].Begin()}]}),Game.Scenes.FifthPart[494]=new Scene({text:`
      Такой ответ меня вполне устроил. 
      <p>“По крайне мере он не начал отнекиваться. Чувствуется, что он готов понемногу мне открываться. 
      <p>- Пойдем? - он протянул мне руку, открывая очередной проход. 
            `,background:"Backgrounds/Flowerfield",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[499].Begin()}]}),Game.Scenes.FifthPart[495]=new Scene({text:`
      Я очутилась у обрыва, где бушевал сильный ветер, готовый в любой момент скинуть меня с шаткого уступа. 
      <p>“Почему я здесь? Почему это место такое темное… Как же страшно. Холодно.”
            `,background:"Backgrounds/Waterflow",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[496].Begin()}]}),Game.Scenes.FifthPart[496]=new Scene({text:`
      Ко мне не спеша подошел проводник, который выглядел удрученно. 
      <p>- Зачем ты пришла?
      <p>- Потому что хочу покончить со всем скорее и жить своей нормальной жизнью. 
      <p>- Я уже говорил тебе, что это длинный путь. Не получится все решить только по твоему хотению. 
            `,background:"Persons/Stranger",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[497].Begin()}]}),Game.Scenes.FifthPart[497]=new Scene({text:`
      - Плевать. Я готова встретиться с чем или кем угодно. Главное - разобраться в происходящем. 
      <p>- Как скажешь, - он был подобен этому месту: темный, холодный. 
      <p>“Мы не особо близки. Я часто говорила о своих мыслях прямо. Да, порой я была резка… Не ожидала, что последствия будут такими.”
            `,background:"Persons/Stranger",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[498].Begin()}]}),Game.Scenes.FifthPart[498]=new Scene({text:`
      Я последовала за проводником в только что открывшийся проход, оставляя позади неспокойную бушующую воду и холодные порывы ветра. 
            `,background:"Backgrounds/Waterflow",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[499].Begin()}]}),Game.Scenes.FifthPart[499]=new Scene({text:`
      Я уже понимала намерения проводника, стоило мне только увидеть портал, через который я уже однажды проходила. 
      <p>- Почему снова туда? Почему мне сразу нельзя отправиться в эпоху Теслы?
      <p>- Есть то, что ты должна увидеть прежде. Я уже говорил, что это место имеет ключевую роль. 
            `,background:"Backgrounds/Pompeii_Portal",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[500].Begin()}]}),Game.Scenes.FifthPart[500]=new Scene({text:`
      “От этого не легче, но ладно. В конце концов там я выступаю лишь как наблюдать, что значительно облегчает задачу.”
      <p>Без лишних слов я вновь отправилась в древний город. 
            `,background:"Backgrounds/Pompeii_Portal",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[501].Begin(),Game.Sounds.Play("Music","Pompeii"),Game.Effects.Flash()}]}),Game.Scenes.FifthPart[501]=new Scene({text:`
      И снова площадь, на которой я в прошлый раз наблюдала за загадочной незнакомкой. 
      <p>“Ничего не изменилось с того раза… Я снова должна увидеть ее?”
      <p>Я осматривалась в поисках подсказок. Но жизнь в Помпеях шла своим чередом, а мне лишь оставалось наблюдать и искать. 
            `,background:"Backgrounds/Pompeii",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[502].Begin()}]}),Game.Scenes.FifthPart[502]=new Scene({text:`
      Мое внимание привлек звонкий мужской голос, который с задором зазывал всех желающих в свою лавку, чтобы отведать прекрасного вина. 
      <p>“А что мне терять? Все равно не знаю, что должна увидеть здесь. Хоть местную культуру посмотрю.”
            `,background:"Backgrounds/Pompeii",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[503].Begin()}]}),Game.Scenes.FifthPart[503]=new Scene({text:`
      Подойдя на достаточно близкое расстояние, я буквально потеряла дар речи. Ноги подкосились, я просто села напротив мужчины и смотрела с широко-раскрытыми глазами.
            `,background:"Backgrounds/Pompeii",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[504].Begin()}]}),Game.Scenes.FifthPart[504]=new Scene({text:`
      Волосы до плеч, белая туника. И такие знакомые черты лица…
      <p>“Я схожу с ума? Или передо мной действительно стоит Роберт, держащий керамический кувшин, в Помпеях?”
            `,background:"Persons/Robert_Pompeii",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[505].Begin()}]}),Game.Scenes.FifthPart[505]=new Scene({text:`
      Это не могло быть совпадением. Мужчина выглядел точно также, как и Роберт. Единственное их различие - это улыбка. Здешний Роберт улыбался так искренне, как будто бы у него нет никакого груза на плечах. 
            `,background:"Persons/Robert_Pompeii",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[506].Begin()}]}),Game.Scenes.FifthPart[506]=new Scene({text:`
      “Нэйтан… Теперь Роберт. Вот, что хотел показать мне проводник? Это двойники? Как мы с Катариной? Но почему именно так все повернулось?”
      <p>Это снова выбивало из колеи. Снова приходилось много думать, ведь я понимала, никто не скажет мне ничего прямо. 
            `,background:"Persons/Robert_Pompeii",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[507].Begin()}]}),Game.Scenes.FifthPart[507]=new Scene({text:`
      Роберт продавал кувшины с вином один за другим, радуясь своей прибыли. 
      <p>В какой-то момент к нему подошла симпатичная девушка и положила руку прямо на грудь, проговаривая:
      <p>- Гай, когда мы уже пойдем плавать… Ты же обещал. 
            `,background:"Persons/Robert_Pompeii",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[508].Begin()}]}),Game.Scenes.FifthPart[508]=new Scene({text:`
      - Прости, но сегодня не получится. Матушка совсем плохо себя чувствует. Мы с братьями дали слово, что позаботимся о хозяйстве. 
      <p>- Всегда ты так. Небось отправишься вечером к своей Клаудии. 
            `,background:"Persons/Robert_Pompeii",buttontext:[""],buttonaction:[()=>{Game.Scenes.FifthPart[509].Begin(),Game.Achievements.Lake.Unlock()}]}),Game.Scenes.FifthPart[509]=new Scene({text:`
       Я завороженно смотрела на происходящее, дивясь своему новому открытию и чувствам, которые испытала. 
        <p>“Похоже, что не только я имею тайны. Пора раскрыть свои карты, мальчики.” 
            `,background:"Persons/Robert_Pompeii",buttontext:[""],buttonaction:[()=>{Game.Scenes.Features[100].Begin(),Game.Progress.Save("SixPart")}]}),Game.Scenes.Prologue=[],Game.Scenes.Prologue[0]=new Scene({text:`- Здравствуй! Мы снова встретились. Ты наверное меня и не помнишь.
            <p>В голосе незнакомца мелькнула усмешка. Он продолжил:
            <p>- Я проводник и пришел к тебе, чтобы напомнить, что ты сделала с этим миром и почему являешься ключом. 
            К спасению или уничтожению - решать только тебе. Полагаю, у тебя много вопросов. Задавай.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.Prologue[1].Begin(),Game.Message("\u0412 \u043B\u0435\u0432\u043E\u043C \u0432\u0435\u0440\u0445\u043D\u0435\u043C \u0443\u0433\u043B\u0443 \u043F\u043E\u0434 \u0438\u043A\u043E\u043D\u043A\u043E\u0439 \u0440\u044E\u043A\u0437\u0430\u043A\u0430 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0441\u0442\u0440\u0435\u043B\u043E\u0447\u043A\u0443, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0442\u0435\u043A\u0441\u0442 \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0433\u043E \u0441\u043B\u0430\u0439\u0434\u0430.")}],background:"Backgrounds/Abstraction",condition:()=>{Game.Sounds.Play("Music","Prologue")}}),Game.Scenes.Prologue[1]=new Scene({text:`Я медленно открыла глаза. Первое время мозг не мог воспринять место, в котором я очутилась. 
            Странные свечения, пустота… Камни парили неестественно, не поддаваясь никаким законам физики.
            <p>“Это не может быть реальностью!”
            <p> Я ощущала себя бестелесным существом, которое барахтается в просторах вселенной. Абсолютно беззащитна, будто бы любое дуновение скинет меня с возвышенности, и моя жизнь оборвется.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.Prologue[50].Begin()}],background:"Backgrounds/Abstraction"}),Game.Scenes.Prologue[50]=new Scene({text:`
     Взгляд зацепился за таинственную фигуру, укутанную в черный плащ. Я посмотрела на него, надеясь увидеть в нем спасителя. Того, кто расскажет все секреты этого мира и поможет выбраться отсюда. Однако ответом мне было продолжительное молчание. Незнакомец терпеливо ждал, пока я придумаю вопросы. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.Prologue[2].Begin()}],background:"Persons/Stranger"}),Game.Scenes.Prologue[2]=new Scene({text:`
            Я попыталась вспомнить хоть какие-то фрагменты из своего прошлого, но пришла в ужас от осознания полного забвения. В голову приходили только самые банальные вопросы.
            <p>Я робко взглянула на него и спросила: 
        `,buttontext:[""],buttonaction:[()=>{Game.AskName(()=>{Game.Scenes.Prologue[15].Begin()})}],background:"Persons/Stranger"}),Game.Scenes.Prologue[15]=new Scene({text:`Из-под капюшона продолжала проглядывать ухмылка. Складывалось ощущение, что собеседника забавляет этот вопрос.
            <p>- Тебя зовут $Имя Игрока$. И почему всем всегда так важно знать свое имя…
            <p>Я задумалась. Во мне заиграло любопытство или простой страх, что я могу потерять свою личность?
            <p>- Это же часть тебя… я…
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.Prologue[3].Begin()}],background:"Persons/Stranger"}),Game.Scenes.Prologue[3]=new Scene({text:`
            - Брось, - перебил проводник, - у меня нет имени. Но я вездесущ. Я всегда и везде. Необязательно носить эти придуманные клички, чтобы что-то из себя представлять. 
            <p>Я решила не спорить. Стало ясно, что у него слишком большое самомнение; что-то доказывать - бесполезно. Беседа продолжилась.
            `,buttontext:["\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u043D\u0435 \u043B\u0435\u0442?","\u0413\u0434\u0435 \u044F \u0440\u043E\u0434\u0438\u043B\u0430\u0441\u044C?","\u042F \u0443\u043C\u0435\u0440\u043B\u0430?","\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433"],buttonaction:[()=>{Game.Scenes.Prologue[4].Deactivate(0),Game.Scenes.Prologue[5].Deactivate(0),Game.Scenes.Prologue[6].Deactivate(0),Game.Scenes.Prologue[16].Begin()},()=>{Game.Scenes.Prologue[4].Deactivate(1),Game.Scenes.Prologue[5].Deactivate(1),Game.Scenes.Prologue[6].Deactivate(1),Game.Scenes.Prologue[17].Begin()},()=>{Game.Scenes.Prologue[4].Deactivate(2),Game.Scenes.Prologue[5].Deactivate(2),Game.Scenes.Prologue[6].Deactivate(2),Game.Scenes.Prologue[18].Begin()},()=>{Game.Scenes.Prologue[19].Begin()}],buttonactive:[!0,!0,!0,!1],background:"Persons/Stranger",condition:function(){Game.Scenes.Prologue[4].Activate(0),Game.Scenes.Prologue[5].Activate(0),Game.Scenes.Prologue[6].Activate(0),Game.Scenes.Prologue[4].Activate(1),Game.Scenes.Prologue[5].Activate(1),Game.Scenes.Prologue[6].Activate(1),Game.Scenes.Prologue[4].Activate(2),Game.Scenes.Prologue[5].Activate(2),Game.Scenes.Prologue[6].Activate(2),this.buttonactive[3]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2])}}),Game.Scenes.Prologue[16]=new Scene({text:`Всего на секунду проводник задумался, но потом уверенно сказал:
            <p>- 22.
            <p>Я хотела вспомнить, чем занималась в жизни, но сознание не отзывалось. Как будто на него навесили черный заслон, и все что я могла – это слепо верить, хватать остатки былых ощущений.
            <p>- Ты меня знаешь… Откуда?
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.Prologue[4].Begin()}],background:"Persons/Stranger"}),Game.Scenes.Prologue[4]=new Scene({text:`
            - Я знаю все. А ты привлекла меня, потому что оказалась немного интереснее других. Знаешь, я многое могу рассказать. Твою собаку звали Чарли. Любимый цвет – фиолетовый. Ты пытаешься бросить курить. Твоя мать изменяет отцу…
            <p>- Прекрати! – я сорвалась на крик. – Это не я… Свою жизнь я не помню.
            <p>- Это пока…
        `,buttontext:["\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u043D\u0435 \u043B\u0435\u0442?","\u0413\u0434\u0435 \u044F \u0440\u043E\u0434\u0438\u043B\u0430\u0441\u044C?","\u042F \u0443\u043C\u0435\u0440\u043B\u0430?","\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433"],buttonaction:[()=>{Game.Scenes.Prologue[4].Deactivate(0),Game.Scenes.Prologue[5].Deactivate(0),Game.Scenes.Prologue[6].Deactivate(0),Game.Scenes.Prologue[16].Begin()},()=>{Game.Scenes.Prologue[4].Deactivate(1),Game.Scenes.Prologue[5].Deactivate(1),Game.Scenes.Prologue[6].Deactivate(1),Game.Scenes.Prologue[17].Begin()},()=>{Game.Scenes.Prologue[4].Deactivate(2),Game.Scenes.Prologue[5].Deactivate(2),Game.Scenes.Prologue[6].Deactivate(2),Game.Scenes.Prologue[18].Begin()},()=>{Game.Scenes.Prologue[19].Begin()}],buttonactive:[!0,!0,!0,!1],background:"Persons/Stranger",condition:function(){this.buttonactive[3]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2])}}),Game.Scenes.Prologue[17]=new Scene({text:`Фигура в плаще развела руками и проговорила:
            <p>- В обычном городе, в обычной квартире, в обычной семье. К чему это? Ты уже нафантазировала себе, что ты дочь серафима? Или, быть может, принцесса?
            <p>Я ожидала большей конкретики, но видимо проводник решил, что делать на этом акцент бессмысленно.
            <p>- Что это за место?
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.Prologue[5].Begin(),Game.Message("\u0421\u0435\u0440\u0430\u0444\u0438\u043C - \u0432\u044B\u0441\u0448\u0438\u0439 \u0430\u043D\u0433\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u0447\u0438\u043D, \u043D\u0430\u0438\u0431\u043E\u043B\u0435\u0435 \u043F\u0440\u0438\u0431\u043B\u0438\u0436\u0435\u043D\u043D\u044B\u0439 \u043A \u0411\u043E\u0433\u0443.")}],background:"Persons/Stranger"}),Game.Scenes.Prologue[5]=new Scene({text:`
            - Место, где все началось, место, где, надеюсь, все и закончится.
            <p>- Ты всегда будешь говорить загадками? – я обреченно вздохнула.
            <p>- Нет, только когда это уместно.              
        `,buttontext:["\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u043D\u0435 \u043B\u0435\u0442?","\u0413\u0434\u0435 \u044F \u0440\u043E\u0434\u0438\u043B\u0430\u0441\u044C?","\u042F \u0443\u043C\u0435\u0440\u043B\u0430?","\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433"],buttonaction:[()=>{Game.Scenes.Prologue[4].Deactivate(0),Game.Scenes.Prologue[5].Deactivate(0),Game.Scenes.Prologue[6].Deactivate(0),Game.Scenes.Prologue[16].Begin()},()=>{Game.Scenes.Prologue[4].Deactivate(1),Game.Scenes.Prologue[5].Deactivate(1),Game.Scenes.Prologue[6].Deactivate(1),Game.Scenes.Prologue[17].Begin()},()=>{Game.Scenes.Prologue[4].Deactivate(2),Game.Scenes.Prologue[5].Deactivate(2),Game.Scenes.Prologue[6].Deactivate(2),Game.Scenes.Prologue[18].Begin()},()=>{Game.Scenes.Prologue[19].Begin()}],buttonactive:[!0,!0,!0,!1],background:"Persons/Stranger",condition:function(){this.buttonactive[3]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2])}}),Game.Scenes.Prologue[18]=new Scene({text:`
            Проводник разразился смехом.
            <p>- Бинго! Я всегда жду, когда этот вопрос зададут.
            <p>- Но ты не ответил… А я и не знаю, что думать. Ты выглядишь как жнец, готовящийся отправить меня в преисподнюю.
            <p>- Настолько ли я страшен?
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.Prologue[6].Begin()}],background:"Persons/Stranger"}),Game.Scenes.Prologue[6]=new Scene({text:`
            - Что мне ожидать от… - я помедлила, - от существа, которое скрывает свое лицо.
            <p>- О! Так в этом дело. Поумерь любопытство и перестань выдумывать . Все намного проще…
            <p>- Я…
            <p>Проводник жестом показал, что стоит перейти на другую тему.              
        `,buttontext:["\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u043D\u0435 \u043B\u0435\u0442?","\u0413\u0434\u0435 \u044F \u0440\u043E\u0434\u0438\u043B\u0430\u0441\u044C?","\u042F \u0443\u043C\u0435\u0440\u043B\u0430?","\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433"],buttonaction:[()=>{Game.Scenes.Prologue[4].Deactivate(0),Game.Scenes.Prologue[5].Deactivate(0),Game.Scenes.Prologue[6].Deactivate(0),Game.Scenes.Prologue[16].Begin()},()=>{Game.Scenes.Prologue[4].Deactivate(1),Game.Scenes.Prologue[5].Deactivate(1),Game.Scenes.Prologue[6].Deactivate(1),Game.Scenes.Prologue[17].Begin()},()=>{Game.Scenes.Prologue[4].Deactivate(2),Game.Scenes.Prologue[5].Deactivate(2),Game.Scenes.Prologue[6].Deactivate(2),Game.Scenes.Prologue[18].Begin()},()=>{Game.Scenes.Prologue[19].Begin()}],buttonactive:[!0,!0,!0,!1],background:"Persons/Stranger",condition:function(){this.buttonactive[3]=!(!1!=this.buttonactive[0]||!1!=this.buttonactive[1]||!1!=this.buttonactive[2])}}),Game.Scenes.Prologue[19]=new Scene({text:`
            - На этом мы закончим. Я понимаю, что тебя интересует многое. Но время не ждет. Готова ли ты вспомнить, что пережила?
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.Prologue[8].Begin(),Game.Message("\u0421\u0435\u0439\u0447\u0430\u0441 \u0432\u044B \u0441\u0434\u0435\u043B\u0430\u0435\u0442\u0435 \u0441\u0432\u043E\u0439 \u043F\u0435\u0440\u0432\u044B\u0439 \u0432\u044B\u0431\u043E\u0440. \u041D\u0435\u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0438\u0437 \u043D\u0438\u0445 \u043C\u0435\u043D\u044F\u044E\u0442 \u0441\u044E\u0436\u0435\u0442 \u043D\u0435\u0437\u043D\u0430\u0447\u0438\u0442\u0435\u043B\u044C\u043D\u043E, \u0434\u0440\u0443\u0433\u0438\u0435 \u0436\u0435 \u0432\u0435\u0434\u0443\u0442 \u043A \u0441\u0435\u0440\u044C\u0435\u0437\u043D\u044B\u043C \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u0430\u043C. \u041D\u043E \u043F\u043E\u043C\u043D\u0438\u0442\u0435, \u0442\u043E\u043B\u044C\u043A\u043E \u0412\u0430\u043C \u0440\u0435\u0448\u0430\u0442\u044C, \u043A\u0430\u043A\u043E\u0439 \u0432\u044B \u0432\u0438\u0434\u0438\u0442\u0435 \u0441\u0432\u043E\u044E \u0433\u043B\u0430\u0432\u043D\u0443\u044E \u0433\u0435\u0440\u043E\u0438\u043D\u044E.")}],background:"Persons/Stranger"}),Game.Scenes.Prologue[8]=new Scene({text:`
            Я кивнула, немного поежившись. Я вдруг смогла почувствовать… холод?  Или это были ощущения по воспоминаниям из моей жизни? Мой загадочный собеседник заметил это и сказал:
            <p>- Ты не можешь здесь мерзнуть, расслабься.
            <p>И я…            
        `,buttontext:["\u041F\u043E\u0441\u043B\u0443\u0448\u0430\u043B\u0430\u0441\u044C \u0435\u0433\u043E","\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u043B\u0430 \u0437\u0430\u043C\u0435\u0440\u0437\u0430\u0442\u044C"],buttonaction:[()=>{Game.Message("\u041F\u0440\u043E\u0432\u043E\u0434\u043D\u0438\u043A\u0443 \u043F\u0440\u0438\u044F\u0442\u043D\u043E, \u0447\u0442\u043E \u0432\u044B \u043F\u043E\u0441\u043B\u0443\u0448\u0430\u043B\u0438\u0441\u044C \u0435\u0433\u043E"),Game.Scenes.Prologue[11].Begin(),Game.Stats.God.Add(1)},()=>{Game.Message("\u041F\u0440\u043E\u0432\u043E\u0434\u043D\u0438\u043A \u0434\u0440\u0443\u0433\u043E\u0433\u043E \u0438 \u043D\u0435 \u043E\u0436\u0438\u0434\u0430\u043B\u2026"),Game.Scenes.Prologue[9].Begin(),Game.Stats.God.Add(0)}],background:"Persons/Stranger"}),Game.Scenes.Prologue[9]=new Scene({text:`Мои забытые ощущения брали вверх. Тело стало еще сильнее дрожать, пока я окончательно не околела. Становилось страшно, темно. 
            <p>- Я не могу… Я не понимаю.
            <p>Проводник, до этого стоявший на одном месте, подошел ко мне и положил ладонь мне на плечо.
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.Prologue[52].Begin(),Game.Achievements.PrologueCompleted.Unlock()}],background:"Backgrounds/Abstraction"}),Game.Scenes.Prologue[52]=new Scene({text:`
      Постепенно я начала чувствовать, как температура возвращается в норму.
      <p>- Люди такие люди, - он отошел от меня, оставив приятное чувство тепла от прикосновения.  – Давай перейдем к делу.      
      <p>Проводник развел руками и перед ним возникла потрепанная временем дверь, которая периодически мерцала, словно вспышка. 
      Свет отвлекал, я не могла заглянуть внутрь и разглядеть, куда ведет проход. 
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.Prologue[10].Begin(),Game.Achievements.PrologueCompleted.Unlock()}],background:"Backgrounds/Door"}),Game.Scenes.Prologue[10]=new Scene({text:`
            Однако, на миг, мне показалось, что за деревянными створками кипит настоящая жизнь: 
            звонкий мужской голос со странным акцентом что-то говорит про выпечку, грохот от колес, что несутся по каменной кладке; одним словом - звуки большого города. 
            <p>- Ты готова?
            <p>Я неуверенно кивнула, следуя за таинственным гостем в неизвестность.            
        `,buttontext:[""],buttonaction:[()=>{setTimeout(()=>{Game.Scenes.FirstChapter[0].Begin()},1e3),Game.LoadScreen("FirstChapter"),Game.Progress.Save("FirstChapter")}],background:"Backgrounds/Door"}),Game.Scenes.Prologue[11]=new Scene({text:`
            Я попыталась максимально абстрагироваться, внушая себе, что сейчас я бесформенное нечто, не способное переживать  прежние эмоции и ощущения.
            <p>Проводник удовлетворительно кивнул и сказал:
            <p>- Здесь нам ничего не может угрожать. Разве что, бренное существование… Одинокое… - с грустью в голосе сказал неизвестный. 
            <p>– Забудь, давай перейдем к делу.            
        `,buttontext:[""],buttonaction:[()=>{Game.Scenes.Prologue[52].Begin(),Game.Achievements.PrologueCompleted.Unlock()}],background:"Persons/Stranger"});