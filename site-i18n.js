/* Анти-Шум: единый язык интерфейса для всех страниц.
   Содержимое участников (ответы и поддержка) не переводится автоматически. */
(function(root){
"use strict";
const SUPPORTED=["ru","uk","en"],KEY="antiShumLanguage";
const strings={
"Войти":["Увійти","Sign in"],"Регистрация":["Реєстрація","Sign up"],"Зарегистрироваться":["Зареєструватися","Sign up"],
"Имя":["Ім’я","Name"],"Пароль":["Пароль","Password"],"Email":["Електронна пошта","Email"],
"20 минут без информационного шума":["20 хвилин без інформаційного шуму","20 minutes without information noise"],
"Связаться с поддержкой":["Звернутися до підтримки","Contact support"],
"Забыл пароль? Восстановить доступ":["Забули пароль? Відновити доступ","Forgot password? Recover access"],
"Восстановить удалённый профиль":["Відновити видалений профіль","Restore a deleted profile"],
"Мой профиль":["Мій профіль","My profile"],"👤 Мой профиль":["👤 Мій профіль","👤 My profile"],
"МОЙ ПРОФИЛЬ":["МІЙ ПРОФІЛЬ","MY PROFILE"],"Назад":["Назад","Back"],"← Назад":["← Назад","← Back"],
"Выйти":["Вийти","Sign out"],"Админ-панель":["Адмінпанель","Admin panel"],
"Редактировать профиль":["Редагувати профіль","Edit profile"],
"Изменить фото":["Змінити фото","Change photo"],"Удалить фото":["Видалити фото","Remove photo"],
"Изменить аватар":["Змінити аватар","Change avatar"],"Изменить имя":["Змінити ім’я","Change name"],
"Изменить email":["Змінити email","Change email"],
"Изменить пароль":["Змінити пароль","Change password"],
"Удалить профиль":["Видалити профіль","Delete profile"],
"Закрыть":["Закрити","Close"],"Отмена":["Скасувати","Cancel"],"Сохранить":["Зберегти","Save"],
"Продолжить":["Продовжити","Continue"],
"НАСТРОЙКИ":["НАЛАШТУВАННЯ","SETTINGS"],
"ЯЗЫК САЙТА":["МОВА САЙТУ","SITE LANGUAGE"],
"Язык сайта":["Мова сайту","Site language"],
"Выбранный язык сохранится при повторном входе.":["Обрана мова збережеться після повторного входу.","Your language preference is saved for future visits."],
"КАПСУЛА ВРЕМЕНИ":["КАПСУЛА ЧАСУ","TIME CAPSULE"],
"✦ Открыть капсулу времени":["✦ Відкрити капсулу часу","✦ Open time capsule"],
"ЗНАКОМСТВО С ПРОЕКТОМ":["ЗНАЙОМСТВО З ПРОЄКТОМ","ABOUT THE PROJECT"],
"✦ Как устроен «Анти-Шум»":["✦ Як працює «Анти-Шум»","✦ How Anti-Shum works"],
"МОИ 365 ДНЕЙ В АНТИ-ШУМ":["МОЇ 365 ДНІВ В АНТИ-ШУМІ","MY 365 DAYS IN ANTI-SHUM"],
"📖 Открыть мою книгу":["📖 Відкрити мою книгу","📖 Open my book"],
"ВОПРОСЫ ПРОЕКТА":["ПИТАННЯ ПРОЄКТУ","PROJECT QUESTIONS"],
"Вопросы проекта":["Питання проєкту","Project questions"],
"✦ Вопросы проекта":["✦ Питання проєкту","✦ Project questions"],
"Голосования · ДА / НЕТ / ДРУГОЕ · Предложения идей":["Голосування · ТАК / НІ / ІНШЕ · Пропозиції ідей","Polls · YES / NO / OTHER · Share ideas"],
"БЕСПЛАТНО ДЛЯ ВСЕХ":["БЕЗКОШТОВНО ДЛЯ ВСІХ","FREE FOR EVERYONE"],
"ДРУГ ПРОЕКТА":["ДРУГ ПРОЄКТУ","SUPPORT THE PROJECT"],
"✦ Друг проекта":["✦ Друг проєкту","✦ Support the project"],
"ПРИГЛАСИТЬ ДРУГА":["ЗАПРОСИТИ ДРУГА","INVITE A FRIEND"],
"✉ Пригласить друга":["✉ Запросити друга","✉ Invite a friend"],
"Скопировать ссылку":["Скопіювати посилання","Copy link"],
"УСТАНОВКА ПРИЛОЖЕНИЯ":["ВСТАНОВЛЕННЯ ЗАСТОСУНКУ","INSTALL APP"],
"📱 Добавить «Анти-Шум» на главный экран":["📱 Додати «Анти-Шум» на головний екран","📱 Add Anti-Shum to Home Screen"],
"Правила проекта":["Правила проєкту","Project rules"],
"§ Правила":["§ Правила","§ Rules"],
"До открытия осталось":["До відкриття залишилось","Until opening"],
"дней":["днів","days"],"часов":["годин","hours"],"минут":["хвилин","minutes"],"секунд":["секунд","seconds"],
"Вопрос дня":["Питання дня","Question of the day"],
"Отправить мысль":["Надіслати думку","Share your thought"],
"✎ Сохранить мысль":["✎ Зберегти думку","✎ Save my thought"],
"Изложи свою мысль...":["Поділися своєю думкою...","Share your thoughts..."],
"Время записи истекло!":["Час запису минув!","Your writing time is over!"],
"До новой записи":["До нового запису","Until the next entry"],
"Загрузка объявлений...":["Завантаження оголошень...","Loading announcements..."],
"Объявления":["Оголошення","Announcements"],
"Включить уведомления":["Увімкнути сповіщення","Enable notifications"],
"Включить уведомления о запуске":["Увімкнути сповіщення про запуск","Enable launch notifications"],
"Уведомления включены":["Сповіщення увімкнено","Notifications enabled"],
"Если уведомления доступны, включи их заранее.":["Якщо сповіщення доступні, увімкни їх заздалегідь.","If notifications are available, enable them in advance."],
"Голосования":["Голосування","Polls"],"Ваши идеи":["Ваші ідеї","Your ideas"],
"Итоги":["Підсумки","Results"],
"ДА":["ТАК","YES"],"НЕТ":["НІ","NO"],"ДРУГОЕ":["ІНШЕ","OTHER"],
"Проголосовать":["Проголосувати","Vote"],"Отправить идею":["Надіслати ідею","Submit idea"],
"Показать результаты":["Показати результати","Show results"],
"Идея отправлена":["Ідею надіслано","Idea submitted"],
"Вопросы проекта доступны всем зарегистрированным участникам.":["Питання проєкту доступні всім зареєстрованим учасникам.","Project questions are available to all registered participants."],
"Один голос на каждый вопрос, без таймера. После отправки изменить выбор нельзя. Если выберешь «ДРУГОЕ», расскажи о своём варианте.":["Один голос на кожне питання, без таймера. Після відправлення змінити вибір не можна. Якщо обереш «ІНШЕ», розкажи про свій варіант.","One vote per question, without a timer. You can't change your choice after submitting. If you choose OTHER, explain your idea."],
"Одна идея на каждый вопрос, без таймера. После отправки изменить ответ нельзя. Только ты и администратор видите предложенную идею.":["Одна ідея на кожне питання, без таймера. Після відправлення відповідь змінити не можна. Лише ти й адміністратор бачите запропоновану ідею.","One idea per question, with no timer. You can't edit it after submitting. Only you and the administrator can see your idea."],
"Готовая книга станет доступна только после 365 дней. Пока можно листать предварительную версию.":["Готова книга стане доступною лише після 365 днів. Поки можна переглядати попередню версію.","Your finished book will be available after 365 days. For now, you can browse the preview."],
"Мои 365 дней в Анти-Шум":["Мої 365 днів в Анти-Шумі","My 365 days in Anti-Shum"],
"Мои 365 дней в Анти-Шум.":["Мої 365 днів в Анти-Шумі.","My 365 days in Anti-Shum."],
"Моя книга":["Моя книга","My book"],
"Скачать PDF":["Завантажити PDF","Download PDF"],
"Сохранить PDF":["Зберегти PDF","Save PDF"],
"Печать / PDF":["Друк / PDF","Print / PDF"],
"Открыть мою книгу":["Відкрити мою книгу","Open my book"],
"Январь":["Січень","January"],"Февраль":["Лютий","February"],"Март":["Березень","March"],
"Апрель":["Квітень","April"],"Май":["Травень","May"],"Июнь":["Червень","June"],
"Июль":["Липень","July"],"Август":["Серпень","August"],"Сентябрь":["Вересень","September"],
"Октябрь":["Жовтень","October"],"Ноябрь":["Листопад","November"],"Декабрь":["Грудень","December"],
"Января":["січня","January"],"Февраля":["лютого","February"],"Марта":["березня","March"],
"Апреля":["квітня","April"],"Мая":["травня","May"],"Июня":["червня","June"],
"Июля":["липня","July"],"Августа":["серпня","August"],"Сентября":["вересня","September"],
"Октября":["жовтня","October"],"Ноября":["листопада","November"],"Декабря":["грудня","December"],
"Восстановление доступа":["Відновлення доступу","Recover access"],
"Отправить письмо":["Надіслати лист","Send email"],
"Новый пароль":["Новий пароль","New password"],
"Повтори пароль":["Повтори пароль","Repeat password"],
"Твой профиль сохранён":["Твій профіль збережено","Your profile is safe"],
"Восстановить профиль":["Відновити профіль","Restore profile"],
"Последнее предупреждение":["Останнє попередження","Final warning"],
"Удалить профиль?":["Видалити профіль?","Delete your profile?"],
"Оставить профиль":["Залишити профіль","Keep profile"],
"Здесь можно услышать себя":["Тут можна почути себе","A place to hear yourself"],
"Здесь тебя не оценивают":["Тут тебе не оцінюють","No judgment here"],
"Пропустить":["Пропустити","Skip"],"Далее":["Далі","Next"],"Начать":["Почати","Begin"],
"РУССКИЙ":["РОСІЙСЬКА","RUSSIAN"],"УКРАЇНСЬКА":["УКРАЇНСЬКА","UKRAINIAN"],"ENGLISH":["АНГЛІЙСЬКА","ENGLISH"]
};
const dict=Object.create(null);
for(const [k,[uk,en]] of Object.entries(strings))dict[k]={ru:k,uk,en};
const staticSources=new WeakMap();
const blocked="script,style,textarea,code,pre,[contenteditable],[data-no-translate],.answer-text,.answer-card,.support-message,.support-messages,.user-name,.feed-text,.message-text";
let language=readStored(),busy=false,observer=null;
function normalize(v){return SUPPORTED.includes(v)?v:"ru";}
function readStored(){try{return normalize(localStorage.getItem(KEY));}catch{return "ru"}}
function writeStored(v){try{localStorage.setItem(KEY,v)}catch{}}
function t(value,lang=language){return dict[value]?.[normalize(lang)]||value;}
function translateRecord(row,field,lang=language){
  if(!row)return "";
  const suffix=normalize(lang);
  return suffix!=="ru"&&typeof row[field+"_"+suffix]==="string"&&row[field+"_"+suffix].trim()
    ?row[field+"_"+suffix]:row[field]||"";
}
function translateTextNode(node){
 const parent=node.parentElement;
 if(!parent||parent.closest(blocked))return;
 const candidate=(node.nodeValue||"").trim();
 if(!candidate)return;
 const original=staticSources.get(node)||candidate;
 if(!dict[original])return;
 if(!staticSources.has(node))staticSources.set(node,original);
 const text=t(original);
 const raw=node.nodeValue||"";
 const prefix=raw.match(/^\s*/)?.[0]||"",suffix=raw.match(/\s*$/)?.[0]||"";
 const result=prefix+text+suffix;
 if(raw!==result)node.nodeValue=result;
}
function translateAttrs(el){
 if(el.closest(blocked))return;
 for(const name of ["placeholder","title","aria-label"]){
  const old=el.getAttribute(name);
  if(!old)continue;
  const key="source"+name;
  const original=el.dataset[key]||old;
  if(!dict[original])continue;
  if(!el.dataset[key])el.dataset[key]=original;
  const translated=t(original);
  if(translated!==old)el.setAttribute(name,translated);
 }
}
function paint(rootNode=document.body){
 if(!rootNode)return;
 busy=true;
 try{
  const walk=document.createTreeWalker(rootNode,NodeFilter.SHOW_TEXT);
  const items=[];
  while(walk.nextNode())items.push(walk.currentNode);
  for(const n of items)translateTextNode(n);
  if(rootNode.nodeType===1)translateAttrs(rootNode);
  rootNode.querySelectorAll?.("[placeholder],[title],[aria-label]").forEach(translateAttrs);
  document.documentElement.lang=language==="uk"?"uk":language;
  document.documentElement.dataset.ashLanguage=language;
 }finally{busy=false}
}
function setLanguage(v,{persist=true}={}){
 language=normalize(v);
 if(persist)writeStored(language);
 paint();
 document.dispatchEvent(new CustomEvent("anti-shum-language-changed",{detail:{language}}));
 return language;
}
function start(){
 if(!document.body)return;
 paint();
 observer=new MutationObserver(entries=>{
  if(busy)return;
  const affected=new Set();
  for(const entry of entries){
   if(entry.type==="childList") for(const n of entry.addedNodes){if(n.nodeType===1||n.nodeType===3)affected.add(n);}
  }
  if(!affected.size)return;
  for(const n of affected){
   if(n.nodeType===3)translateTextNode(n);
   else paint(n);
  }
 });
 observer.observe(document.body,{childList:true,subtree:true});
}
root.AntiShumI18n={get language(){return language},setLanguage,t,paint,translateRecord,readStored};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});
else start();
})(window);
