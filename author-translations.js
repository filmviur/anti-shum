/* Optional, private-first draft translations for admin-authored content.
   Browser Translation API works in supported desktop browsers.
   Saves translated strings only after the administrator reviews and publishes. */
(function(){
"use strict";
const definitions=[
  {form:"voteForm",fields:["voteTitle","voteDetails"],container:".ash-locale-extra"},
  {form:"ideasForm",fields:["ideasTitle","ideasDetails"],container:".ash-locale-extra"},
  {form:"resultForm",fields:["resultTitle","resultDetails"],container:".ash-locale-extra"},
  {form:"adminAnnouncementsSection",fields:["adminAnnouncementText"],container:".admin-announcement-translations"}
];
const get=id=>document.getElementById(id);
function sourceFields(prefix){
 if(prefix==="adminAnnouncementText")
   return [get("adminAnnouncementText"),get("adminAnnouncementUk"),get("adminAnnouncementEn")];
 return [get(prefix),get(prefix+"Uk"),get(prefix+"En")];
}
async function makeTranslators(){
 if(typeof window.Translator?.create!=="function")
   throw Error("Встроенный перевод недоступен в этом браузере. Введи переводы вручную или используй настольный Chrome.");
 // Create both within the same click's user activation, not after an await.
 const ukPromise=window.Translator.create({sourceLanguage:"ru",targetLanguage:"uk"});
 const enPromise=window.Translator.create({sourceLanguage:"ru",targetLanguage:"en"});
 const completed=await Promise.allSettled([ukPromise,enPromise]);
 if(completed.some(x=>x.status==="rejected")){
   for(const x of completed)if(x.status==="fulfilled")x.value.destroy?.();
   throw completed.find(x=>x.status==="rejected")?.reason||Error("Не удалось создать переводчик");
 }
 return completed.map(x=>x.value);
}
function init(formName,fields,containerSelector){
 const form=get(formName),wrap=form?.querySelector(containerSelector);
 if(!wrap||wrap.querySelector(".ash-auto-translate"))return;
 const button=document.createElement("button");
 button.type="button";
 button.className="ash-auto-translate";
 button.textContent="✦ Автоперевод (RU → UK + EN)";
 const status=document.createElement("span");
 status.className="ash-auto-translate-status";
 status.setAttribute("role","status");
 status.setAttribute("aria-live","polite");
 wrap.insertBefore(status,wrap.firstChild);
 wrap.insertBefore(button,status);
 button.addEventListener("click",async()=>{
   const entries=fields.map(sourceFields).filter(group=>group.every(Boolean));
   const pending=entries.filter(group=>group[0].value.trim()&&(!group[1].value.trim()||!group[2].value.trim()));
   if(!pending.length){status.textContent="Заполни русский текст. Уже заполненные переводы не перезаписываются.";return}
   button.disabled=true;
   status.textContent="Подготавливаем перевод… При первом запуске браузер может загрузить языковую модель.";
   let pair=null;
   try{
     pair=await makeTranslators();
     const updates=[];
     for(const group of pending){
       const original=group[0].value.trim();
       const [uk,en]=await Promise.all([
         !group[1].value.trim()?pair[0].translate(original):Promise.resolve(null),
         !group[2].value.trim()?pair[1].translate(original):Promise.resolve(null)
       ]);
       updates.push({group,uk,en});
     }
     for(const {group,uk,en} of updates){
       if(uk && !group[1].value.trim()){group[1].value=uk;group[1].dispatchEvent(new Event("input",{bubbles:true}))}
       if(en && !group[2].value.trim()){group[2].value=en;group[2].dispatchEvent(new Event("input",{bubbles:true}))}
     }
     status.textContent="Черновики переводов готовы. Проверь текст и затем опубликуй.";
   }catch(error){
     console.warn("Draft translation:",error);
     status.textContent="Перевести автоматически не получилось. Можно заполнить поля вручную. "+(error?.message||"");
   }finally{
     for(const translator of pair||[])try{translator.destroy?.()}catch{}
     button.disabled=false;
   }
 });
}
function start(){
 for(const item of definitions)init(item.form,item.fields,item.container);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});
else start();
})();
