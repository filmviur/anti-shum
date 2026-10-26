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
Object.assign(strings,{
"Капсула времени":["Капсула часу","Time capsule"],
"Вопрос дня":["Питання дня","Question of the day"],
"Вопрос дня:":["Питання дня:","Question of the day:"],
"Мои мысли":["Мої думки","My thoughts"],
"Эта страница ждёт твоих мыслей…":["Ця сторінка чекає на твої думки…","This page is waiting for your thoughts…"],
"Каждая прожитая и записанная мысль стала частью этого дерева.":["Кожна прожита й записана думка стала частиною цього дерева.","Every thought you lived through and wrote down became part of this tree."],
"Результаты":["Результати","Results"],
"Голосование":["Голосування","Poll"],
"Идеи участников":["Ідеї учасників","Participant ideas"],
"Черновик":["Чернетка","Draft"],
"Опубликовано":["Опубліковано","Published"],
"Закрыто":["Закрито","Closed"],
"Голосований пока нет.":["Голосувань поки немає.","There are no polls yet."],
"Сейчас нет открытых вопросов для предложений.":["Зараз немає відкритих питань для пропозицій.","There are no open questions for ideas at the moment."],
"Итоги и решения скоро появятся здесь.":["Підсумки та рішення скоро з’являться тут.","Results and decisions will appear here soon."],
"Опубликовано командой «Анти-Шум».":["Опубліковано командою «Анти-Шум».","Published by the Anti-Shum team."],
"Вы проголосовали":["Ви проголосували","You voted"],
"Вы ответили":["Ви відповіли","You answered"],
"Голосование завершено.":["Голосування завершено.","The poll is closed."],
"Приём идей завершён.":["Приймання ідей завершено.","Idea submissions are closed."],
"Твой вариант ответа":["Твій варіант відповіді","Your own answer"],
"Напиши своё предложение (5–500 символов)":["Напиши свою пропозицію (5–500 символів)","Write your suggestion (5–500 characters)"],
"Твоё предложение":["Твоя пропозиція","Your suggestion"],
"Напиши мысль своими словами — только администрация прочитает её. Один ответ на вопрос, без таймера. Изменить его после отправки нельзя.":["Вислови свою думку власними словами — її прочитає лише адміністрація. Одна відповідь на питання, без таймера. Змінити її після надсилання не можна.","Share your thoughts in your own words. Only the administrators can read them. One answer per question, with no timer. You can't edit it after sending."],
"Черновик сохраняется только на этом устройстве.":["Чернетка зберігається лише на цьому пристрої.","Your draft is saved only on this device."],
"Я предлагаю… (5–500 символов)":["Я пропоную… (5–500 символів)","I suggest… (5–500 characters)"],
"Отдать голос":["Віддати голос","Cast vote"],
"Выбери ДА, НЕТ или ДРУГОЕ.":["Обери ТАК, НІ або ІНШЕ.","Choose YES, NO or OTHER."],
"Отправить идею":["Надіслати ідею","Submit idea"],
"Ваш голос можно отправить только один раз. Таймера нет. Черновик сохраняется на устройстве.":["Проголосувати можна лише один раз. Таймера немає. Чернетка зберігається на пристрої.","You can vote only once. There's no timer. Your draft stays on this device."],
"Благодарим вас за внимание и ценный ответ. Ожидайте публикации результатов.":["Дякуємо за увагу й цінну відповідь. Очікуйте на публікацію результатів.","Thank you for your thoughtful response. The results will be published soon."],
"Ответ виден только вам и администрации.":["Відповідь бачите лише ви й адміністрація.","Only you and the administrators can see your answer."],
"Один голос на каждый вопрос, без таймера. После отправки изменить выбор нельзя. Если выберешь «ДРУГОЕ», расскажи о своём варианте.":["Один голос на кожне питання, без таймера. Після надсилання змінити вибір не можна. Якщо обереш «ІНШЕ», розкажи про свій варіант.","One vote per question, with no time limit. You can't change your choice after sending it. If you choose OTHER, tell us what you have in mind."],
"Одна идея на каждый вопрос, без таймера. После отправки изменить ответ нельзя. Только ты и администратор видите твою мысль — здесь нет переписок и споров между людьми.":["Одна ідея на кожне питання, без таймера. Після надсилання змінити відповідь не можна. Лише ти й адміністратор бачите твою думку — тут немає листування чи суперечок між людьми.","One idea per question, with no time limit. You can't edit your answer once submitted. Only you and the administrator can see it—there are no direct messages or debates between participants."],
"Здесь команда проекта делится решениями и итогами ваших голосований и предложений.":["Тут команда проєкту ділиться рішеннями й підсумками ваших голосувань і пропозицій.","Here the project team shares decisions and the results of your votes and suggestions."],
"Пролог":["Пролог","Prologue"],
"Итог ноября":["Підсумок листопада","November recap"],
"Итог декабря":["Підсумок грудня","December recap"],
"Вращай закрытую книгу пальцем":["Обертай закриту книгу пальцем","Swipe to turn the closed book"],
"До открытия осталось":["До відкриття залишилося","Time until opening"],
"Опубликованы результаты:":["Опубліковано результати:","Results published:"],
"Новое голосование":["Нове голосування","New poll"],
"Ваш выбор:":["Ваш вибір:","Your choice:"],
"Ваш ответ:":["Ваша відповідь:","Your answer:"],
"Ваше предложение:":["Ваша пропозиція:","Your suggestion:"],
"Решение сохранено.":["Рішення збережено.","Decision saved."]
});
Object.assign(strings,{
"Книга воспоминаний · загрузка…":["Книга спогадів · завантаження…","Memory book · loading…"],
"← Вернуться в Анти-Шум":["← Повернутися до Анти-Шуму","← Return to Anti-Shum"],
"Подготовить PDF для печати":["Підготувати PDF до друку","Prepare printable PDF"],
"Собираем страницы твоей книги…":["Збираємо сторінки твоєї книги…","Putting your book together…"],
"Мои 365 дней":["Мої 365 днів","My 365 days"],
"В АНТИ-ШУМ":["В АНТИ-ШУМІ","IN ANTI-SHUM"],
"Личная книга воспоминаний":["Особиста книга спогадів","Personal memory book"],
"365 дней — целая история":["365 днів — ціла історія","365 days — a whole story"],
"Здесь остались мысли, переживания, маленькие радости, вдохновение, трудности и важные открытия.":["Тут залишилися думки, переживання, маленькі радощі, натхнення, труднощі та важливі відкриття.","Here are your thoughts, feelings, little joys, moments of inspiration, hardships and important discoveries."],
"Каждая страница — часть твоего пути, напоминание о том, как много может вместить один год.":["Кожна сторінка — частина твого шляху, нагадування про те, скільки всього може вмістити один рік.","Every page is part of your journey, a reminder of how much a single year can hold."],
"Пусть эти записи всегда будут источником сил, спокойствия и тёплых воспоминаний.":["Нехай ці записи завжди дарують сили, спокій і теплі спогади.","May these pages always bring you strength, peace and warm memories."],
"А впереди пусть ждут новые открытия, искренние люди и ещё больше дней, которые захочется сохранить.":["А попереду нехай чекають нові відкриття, щирі люди та ще більше днів, які захочеться зберегти.","May the days ahead bring new discoveries, sincere people and even more moments worth keeping."],
"С теплом, Анти-Шум":["З теплом, Анти-Шум","With warmth, Anti-Shum"],
"Обложка":["Обкладинка","Cover"],
"Вперёд →":["Уперед →","Next →"],
"Задняя обложка":["Задня обкладинка","Back cover"],
"🔊 Звук":["🔊 Звук","🔊 Sound"],
"Поверни книгу пальцем · Нажми, чтобы открыть":["Поверни книгу пальцем · Натисни, щоб відкрити","Swipe to turn the book · Tap to open"],
"Вращай закрытую книгу пальцем · Нажми, чтобы открыть":["Гортай закриту книгу пальцем · Натисни, щоб відкрити","Swipe the closed book · Tap to open"],
"Листай страницы свайпом влево или вправо":["Гортай сторінки свайпом ліворуч або праворуч","Swipe left or right to turn pages"],
"Книга начинается с даты регистрации. Пропущенные после неё дни сохраняют своё место. Через 365 дней твоего личного пути можно сохранить книгу в PDF. Фотографии доступны при действующей авторизации.":["Книга починається з дати реєстрації. Пропущені після неї дні залишаються на своєму місці. Через 365 днів твого особистого шляху книгу можна зберегти в PDF. Фотографії доступні за чинної авторизації.","Your book begins on the day you sign up. Missed days keep their place. After 365 days of your journey, you can save the book as a PDF. Photos are available while you're signed in."],
"← Вернуться в профиль":["← Повернутися до профілю","← Back to profile"],
"Услышим друг друга без споров":["Почуймо одне одного без суперечок","Let's hear each other without arguing"],
"Здесь мы вместе выбираем, каким станет «Анти-Шум». Один человек — один голос. Иногда можно предложить собственную идею. Никаких публичных споров и оценивания чужих предложений.":["Тут ми разом вирішуємо, яким стане «Анти-Шум». Одна людина — один голос. Іноді можна запропонувати власну ідею. Без публічних суперечок чи оцінювання чужих пропозицій.","Here we decide together what Anti-Shum will become. One person, one vote. Sometimes you can share your own ideas. No public arguments or judging other people's suggestions."],
"Бесплатно для всех":["Безкоштовно для всіх","Free for everyone"],
"ДА · НЕТ · ДРУГОЕ":["ТАК · НІ · ІНШЕ","YES · NO · OTHER"],
"Предложения проходят модерацию":["Пропозиції проходять модерацію","Suggestions are moderated"],
"Открываем вопросы проекта…":["Відкриваємо питання проєкту…","Opening project questions…"],
"✦ Новое в «Вопросах проекта»":["✦ Новини «Питань проєкту»","✦ What's new in Project Questions"],
"Здесь появляются сообщения о голосованиях, сборе идей и результатах. Общие объявления — отдельно.":["Тут з’являються повідомлення про голосування, збір ідей і результати. Загальні оголошення — окремо.","Updates about polls, ideas and results appear here. General announcements are separate."],
"✓ Голосования":["✓ Голосування","✓ Polls"],
"✦ Ваши идеи":["✦ Ваші ідеї","✦ Your ideas"],
"✎ Результаты":["✎ Результати","✎ Results"],
"1. Создать голосование":["1. Створити голосування","1. Create a poll"],
"Три варианта: ДА, НЕТ и ДРУГОЕ. При выборе «ДРУГОЕ» участник напишет свой вариант.":["Три варіанти: ТАК, НІ та ІНШЕ. Якщо учасник обере «ІНШЕ», він зможе написати свій варіант.","Three choices: YES, NO and OTHER. Choosing OTHER lets participants write their own answer."],
"Вопрос голосования":["Питання голосування","Poll question"],
"Пояснение вопроса (необязательно)":["Пояснення до питання (необов’язково)","Question details (optional)"],
"○ ДРУГОЕ — с полем ответа":["○ ІНШЕ — з полем відповіді","○ OTHER — with a text field"],
"Переводы для участников. Если оставить поле пустым, будет показан русский оригинал.":["Переклади для учасників. Якщо залишити поле порожнім, буде показано російський оригінал.","Translations for participants. If a field is empty, the original Russian text will be shown."],
"Опубликовать и уведомить":["Опублікувати й повідомити","Publish and notify"],
"Сохранить черновик":["Зберегти чернетку","Save draft"],
"2. Спросить идеи участников":["2. Запитати про ідеї учасників","2. Ask for participants' ideas"],
"Люди увидят вопрос и поле ответа. Их предложения соберутся ниже в закрытом для других участников окне, похожем на переписку. Обсуждений между пользователями не будет.":["Люди побачать питання та поле відповіді. Їхні пропозиції з’являться нижче в закритому для інших учасників розділі, схожому на листування. Обговорень між користувачами не буде.","Participants will see a question and an answer field. Their suggestions will appear below in a private area, similar to a conversation. Participants cannot discuss each other's ideas."],
"Какой вопрос зададим людям?":["Яке питання поставимо людям?","What question should we ask?"],
"Короткое пояснение (необязательно)":["Коротке пояснення (необов’язково)","Short explanation (optional)"],
"Опубликовать запрос идей":["Опублікувати збір ідей","Publish request for ideas"],
"3. Поделиться результатами":["3. Поділитися результатами","3. Share results"],
"Напиши, к какому решению пришёл проект. Этот текст появится в разделе «Результаты» и участникам придёт уведомление.":["Напиши, яке рішення ухвалив проєкт. Текст з’явиться в розділі «Результати», а учасники отримають сповіщення.","Describe the project's decision. This text will appear under Results, and participants will receive a notification."],
"Заголовок результата":["Заголовок результату","Result title"],
"Что решили?":["Що вирішили?","What was decided?"],
"Опубликовать результат":["Опублікувати результат","Publish result"],
"↻ Обновить":["↻ Оновити","↻ Refresh"],
"Один человек — один голос. Если выберешь «ДРУГОЕ», расскажи о своём варианте.":["Одна людина — один голос. Якщо обереш «ІНШЕ», розкажи про свій варіант.","One person, one vote. If you choose OTHER, tell us your idea."],
"Тишина без связи":["Тиша без зв’язку","Quiet without connection"],
"Кажется, интернет сделал паузу. Твоё тихое пространство никуда не исчезло.":["Здається, інтернет зробив паузу. Твій тихий простір нікуди не зник.","It looks like the internet is taking a break. Your quiet space is still here."],
"Если ты писал ответ, сохранённый черновик останется на этом устройстве. После восстановления сети мы вернём тебя к сайту.":["Якщо ти писав відповідь, збережена чернетка залишиться на цьому пристрої. Коли зв’язок відновиться, ти повернешся на сайт.","If you were writing an answer, your saved draft will stay on this device. When the connection returns, we'll take you back to the site."],
"Проверить соединение":["Перевірити з’єднання","Check connection"],
"Свет маяка ждёт возвращения связи…":["Світло маяка чекає на повернення зв’язку…","The lighthouse beam awaits your return…"]
});
Object.assign(strings,{
"✦ АНТИ-ШУМ":["✦ АНТИ-ШУМ","✦ ANTI-SHUM"],
"Правила":["Правила","Rules"],
"Конфиденциальность и твои данные":["Конфіденційність і твої дані","Privacy and your data"],
"«Анти-Шум» — пространство для личных мыслей. Здесь важно понимать, что остаётся личным, а что другие участники могут прочитать.":["«Анти-Шум» — простір для особистих думок. Тут важливо розуміти, що залишається приватним, а що можуть прочитати інші учасники.","Anti-Shum is a space for personal thoughts. It's important to understand what stays private and what other participants may read."],
"Что сохраняется":["Що зберігається","What is stored"],
"Для работы сайта используются данные учётной записи (электронная почта, отображаемое имя и аватар), ответы на вопросы дня, прикреплённые фотографии, реакции и обращения в поддержку. При включённых уведомлениях сохраняются технические данные подписки на push.":["Для роботи сайту використовуються дані облікового запису (електронна пошта, ім’я та аватар), відповіді на питання дня, прикріплені фотографії, реакції та звернення до підтримки. Якщо сповіщення ввімкнено, зберігаються технічні дані push-підписки.","The site uses account details (email, display name and avatar), responses to daily questions, attached photos, reactions and support requests. When notifications are enabled, technical push subscription data is also stored."],
"Кто видит твои ответы":["Хто бачить твої відповіді","Who can see your answers"],
"После того как участник ответит на вопрос дня, он может прочитать опубликованные ответы других участников этого дня. Поэтому":["Після відповіді на питання дня учасник може прочитати опубліковані відповіді інших за цей день. Тому","After answering the daily question, a participant can read other published answers from that day. Therefore,"],
"не включай в ответы чужие телефоны, адреса, пароли, личные переписки и сведения, которыми другой человек не согласился бы делиться.":["не додавай до відповідей чужі номери телефонів, адреси, паролі, особисте листування чи дані, якими інша людина не погодилася б ділитися.","do not include other people's phone numbers, addresses, passwords, private conversations or information they would not agree to share."],
"Фотографии тоже могут быть видны другим участникам в соответствии с правилами вопроса.":["Фотографії також можуть бути видимі іншим учасникам відповідно до правил питання.","Photos may also be visible to other participants according to the question's rules."],
"Личный архив и черновики предназначены для самого владельца. Администратор имеет доступ к необходимой информации для модерации и работы поддержки.":["Особистий архів і чернетки призначені для самого власника. Адміністратор має доступ до потрібної інформації для модерації та підтримки.","Your personal archive and drafts are intended for you. Administrators can access the information necessary for moderation and support."],
"Где хранятся сведения":["Де зберігаються дані","Where data is stored"],
"Основные записи и файлы хранятся в Supabase. Часть временных данных, например неотправленный черновик, сохраняется непосредственно на устройстве в браузере. При переустановке, смене браузера или очистке данных устройства локальный черновик может исчезнуть.":["Основні записи та файли зберігаються в Supabase. Частина тимчасових даних, наприклад ненадіслана чернетка, зберігається безпосередньо на пристрої в браузері. Після перевстановлення, зміни браузера чи очищення даних пристрою локальна чернетка може зникнути.","Core records and files are stored in Supabase. Some temporary data, such as an unsent draft, is stored locally in your browser. Reinstalling the app, changing browsers or clearing device data may remove that local draft."],
"Исправление и удаление":["Виправлення та видалення","Correction and deletion"],
"Имя и аватар можно изменить в настройках профиля. Там же можно выбрать «Удалить профиль»: действие требует двух последовательных подтверждений. После подтверждения профиль перестаёт участвовать в жизни сайта, а его ответы становятся недоступными для других пользователей.":["Ім’я та аватар можна змінити в налаштуваннях профілю. Там само можна вибрати «Видалити профіль»: для цього потрібні два послідовні підтвердження. Після підтвердження участь профілю припиняється, а відповіді стають недоступними іншим користувачам.","You can change your name and avatar in profile settings. You can also choose Delete profile, which requires two separate confirmations. Once confirmed, the profile stops participating and its answers are no longer visible to other users."],
"В течение следующих":["Протягом наступних","During the next"],
"30 дней":["30 днів","30 days"],
"можно войти с прежней электронной почтой и паролем и нажать «Восстановить профиль». При этом возвращаются прежний профиль, архив, фотографии, книга и участие. После окончания срока автоматическая очистка удаляет учётную запись и связанные записи без возможности возврата через сайт; сама очистка может выполняться не мгновенно.":["можна увійти зі старою електронною поштою та паролем і натиснути «Відновити профіль». Це поверне попередній профіль, архів, фотографії, книгу та участь. Після завершення терміну автоматичне очищення видаляє обліковий запис і пов’язані записи без можливості повернення через сайт; очищення може виконуватися не миттєво.","you can sign in using your previous email and password and choose Restore profile. Your previous profile, archive, photos, book and participation will return. After the deadline, automated cleanup deletes the account and related records without a way to restore them through the site. Cleanup may not happen immediately."],
"Если пароль забыт, используй «Забыл пароль? Восстановить доступ» на экране входа. Ссылка приходит на подтверждённую электронную почту; смена пароля не удаляет данные профиля.":["Якщо пароль забуто, скористайся кнопкою «Забули пароль? Відновити доступ» на екрані входу. Посилання надійде на підтверджену електронну пошту; зміна пароля не видаляє дані профілю.","If you've forgotten your password, use Forgot password? Recover access on the sign-in page. A link is sent to the verified email address; changing your password does not erase profile data."],
"Удаление отличается от блокировки. Самостоятельное удаление не снимает ранее назначенную блокировку. После окончательного удаления старые записи нельзя восстановить, а новый аккаунт при разрешённой регистрации начинает путь с чистого листа.":["Видалення відрізняється від блокування. Самостійне видалення не скасовує накладене раніше блокування. Після остаточного видалення старі записи не можна відновити, а новий обліковий запис за умови дозволеної реєстрації починає шлях із чистого аркуша.","Deletion is different from suspension. Deleting your account does not cancel a previously imposed block. After permanent deletion, old records cannot be restored, and a new account, if registration is permitted, starts from scratch."],
"Резервные копии и восстановление":["Резервні копії та відновлення","Backups and recovery"],
"Резервные копии используются для устранения технических сбоев и не должны быть общедоступными. Они не являются альтернативой 30-дневному восстановлению удалённого профиля. Сроки удаления из технических резервных копий и правила их хранения будут уточнены отдельно.":["Резервні копії використовуються для усунення технічних збоїв і не мають бути загальнодоступними. Вони не замінюють 30-денне відновлення видаленого профілю. Терміни видалення з технічних резервних копій та правила їх зберігання будуть уточнені окремо.","Backups are used to recover from technical failures and should not be publicly accessible. They do not replace the 30-day profile recovery period. Retention and deletion rules for technical backups will be clarified separately."],
"Контакт":["Контакти","Contact"],
"Вопросы о своих данных можно отправить через поддержку на сайте.":["Питання щодо своїх даних можна надіслати через підтримку на сайті.","Questions about your data can be sent through the site's support service."],
"Версия для предрелизного тестирования · 25 октября 2026 года":["Версія для передрелізного тестування · 25 жовтня 2026 року","Pre-release testing version · October 25, 2026"]
});
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
