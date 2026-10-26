
const CACHE_NAME = "anti-shum-offline-v10-i18n-audit";

// Кэшируем лишь публичную офлайн-страницу и безопасные словари интерфейса, не личные данные.
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(["./offline.html", "./offline-lighthouse.webp", "./site-i18n.js", "./release-config.js"]))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(Promise.all([
        self.clients.claim(),
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key.startsWith("anti-shum-offline-") && key !== CACHE_NAME)
                .map(key => caches.delete(key))
        ))
    ]));
});

// При новой навигации без сети показываем офлайн-экран.
// Ответы, сессии и сообщения не кэшируем.
self.addEventListener("fetch", event => {
    const requestedAsset=new URL(event.request.url);
    const scopeAsset=new URL(self.registration.scope);
    const publicAsset=requestedAsset.origin===scopeAsset.origin &&
      requestedAsset.pathname.startsWith(scopeAsset.pathname) &&
      (requestedAsset.pathname.endsWith("/site-i18n.js") ||
       requestedAsset.pathname.endsWith("/release-config.js"));
    if(publicAsset){
      event.respondWith(fetch(event.request).catch(async()=>{
        const cache=await caches.open(CACHE_NAME);
        return await cache.match(event.request,{ignoreSearch:true}) || Response.error();
      }));
      return;
    }
    if (event.request.mode !== "navigate") return;
    const requested = new URL(event.request.url);
    const scope = new URL(self.registration.scope);
    if (requested.origin !== scope.origin ||
        !requested.pathname.startsWith(scope.pathname)) return;
    event.respondWith(
        fetch(event.request).catch(async () => {
            const cache = await caches.open(CACHE_NAME);
            return await cache.match("./offline.html") || Response.error();
        })
    );
});

// Persist the selected interface language for background daily notifications.
const SETTINGS_CACHE="anti-shum-local-preferences";
const LANGUAGE_REQUEST=new Request(new URL("./__language__",self.registration.scope));
self.addEventListener("message", event=>{
    if(event.data?.type!=="anti-shum-language")return;
    const lang=event.data.language;
    if(!["ru","uk","en"].includes(lang))return;
    event.waitUntil(caches.open(SETTINGS_CACHE)
        .then(cache=>cache.put(LANGUAGE_REQUEST,new Response(lang)))
        .catch(error=>console.warn("Language preference cache:",error)));
});
async function storedNotificationLanguage(){
    try{
        const cache=await caches.open(SETTINGS_CACHE);
        const response=await cache.match(LANGUAGE_REQUEST);
        const lang=response?await response.text():"ru";
        return ["ru","uk","en"].includes(lang)?lang:"ru";
    }catch{return "ru"}
}

self.addEventListener("push", event => {
    const defaults = {
        type: "daily",
        title: "✨ Анти-Шум",
        body:
            "Время побыть с собой наедине)\n" +
            "Твой вопрос уже ждёт тебя!)",
        url: "./"
    };

    let data = { ...defaults };

    if (event.data) {
        try {
            const received = event.data.json();

            if (
                received &&
                typeof received === "object" &&
                !Array.isArray(received)
            ) {
                data = { ...data, ...received };
            }
        } catch (error) {
            console.error(
                "Анти-Шум: ошибка push:",
                error
            );
        }
    }

    const allowedTypes = [
        "daily",
        "support",
        "announcement",
        "project",
        "admin"
    ];

    if (!allowedTypes.includes(data.type)) {
        data.type = "daily";
    }

    // Объявления о новых голосованиях сразу ведут в раздел «Вопросы проекта».
    // Остальные объявления сохраняют прежнее поведение.
    if (
        data.type === "announcement" &&
        typeof data.body === "string" &&
        (data.body.startsWith("Новый вопрос в разделе «Вопросы проекта»:") ||
         data.body.startsWith("Новый вопрос проекта:") ||
         data.body.startsWith("Поделись своей идеей:") ||
         data.body.startsWith("Опубликованы результаты:") ||
         ["Новое голосование", "Нужны ваши идеи", "Итоги от «Анти-Шума»"].includes(data.title))
    ) {
        data.url = "./polls.html";
    }

    // Project notifications always open the project questions section.
    if (data.type === "project") data.url = "./polls.html";

    let targetUrl = new URL("./", self.registration.scope);

    try {
        const requestedUrl = new URL(
            data.url || "./",
            self.registration.scope
        );

        if (
            requestedUrl.origin === self.location.origin &&
            requestedUrl.href.startsWith(
                self.registration.scope
            )
        ) {
            targetUrl = requestedUrl;
        }
    } catch (error) {
        console.error(
            "Анти-Шум: неверный адрес:",
            error
        );
    }

    const notificationTag =
        data.type === "daily"
            ? "anti-shum-daily"
            : data.type === "announcement"
                ? `anti-shum-announcement-${data.id || "latest"}`
                : data.type === "project"
                    ? `anti-shum-project-${data.id || "latest"}`
                : data.type === "support"
                    ? `anti-shum-support-${data.id || "latest"}`
                    : `anti-shum-admin-${data.section || "general"}`;

    event.waitUntil((async()=>{
        const lang=await storedNotificationLanguage();
        const standardBody="Время побыть с собой наедине)\nТвой вопрос уже ждёт тебя!)";
        if(data.type==="daily" && data.body===standardBody){
            if(lang==="uk"){
                data.body="Час побути наодинці із собою)\nТвоє питання вже чекає на тебе!)";
                if(data.title==="✨ Анти-Шум")data.title="✨ Анти-Шум";
            }else if(lang==="en"){
                data.body="Time for a quiet moment to yourself)\nYour question is waiting for you!)";
                if(data.title==="✨ Анти-Шум")data.title="✨ Anti-Shum";
            }
        }
        await self.registration.showNotification(data.title,{
            body:data.body,
            icon:"./icon-512.png",
            badge:"./icon-512.png",
            tag:notificationTag,
            renotify:true,
            data:{type:data.type,url:targetUrl.href}
        });
    })());
});

self.addEventListener("notificationclick", event => {
    event.notification.close();

    event.waitUntil((async () => {
        const fallbackUrl = new URL(
            "./",
            self.registration.scope
        ).href;

        const targetUrl =
            event.notification.data?.url || fallbackUrl;

        const clients = await self.clients.matchAll({
            type: "window",
            includeUncontrolled: true
        });

        for (const client of clients) {
            if (
                new URL(client.url).origin ===
                self.location.origin
            ) {
                await client.focus();

                if (
                    "navigate" in client &&
                    client.url !== targetUrl
                ) {
                    await client.navigate(targetUrl);
                }

                return;
            }
        }

        await self.clients.openWindow(targetUrl);
    })());
});
