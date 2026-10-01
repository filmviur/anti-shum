const CACHE_NAME = "anti-shum-v1";

self.addEventListener("install", event => {
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        self.clients.claim()
    );
});

self.addEventListener("push", event => {

    let data = {
        title: "✨ Анти-Шум",
        body:
            "Время побыть с собой наедине)\n" +
            "Твой вопрос уже ждёт тебя!)"
    };

    if (event.data) {
        try {
            const received =
                event.data.json();

            data = {
                ...data,
                ...received
            };
        } catch (error) {
            console.error(
                "Анти-Шум: ошибка push:",
                error
            );
        }
    }

    event.waitUntil(
        self.registration.showNotification(
            data.title,
            {
                body: data.body,
                icon: "./icon-512.png",
                badge: "./icon-512.png",
                tag: "anti-shum-daily",
                renotify: true
            }
        )
    );
});

self.addEventListener(
    "notificationclick",
    event => {

        event.notification.close();

        event.waitUntil(
            self.clients.matchAll({
                type: "window",
                includeUncontrolled: true
            }).then(clients => {

                for (const client of clients) {

                    if ("focus" in client) {
                        return client.focus();
                    }
                }

                return self.clients.openWindow(
                    "./"
                );
            })
        );
    }
);
