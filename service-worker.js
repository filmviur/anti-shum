
const CACHE_NAME = "anti-shum-v1";

self.addEventListener("install", event => {
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(self.clients.claim());
});

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
        "admin"
    ];

    if (!allowedTypes.includes(data.type)) {
        data.type = "daily";
    }

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
                : data.type === "support"
                    ? `anti-shum-support-${data.id || "latest"}`
                    : `anti-shum-admin-${data.section || "general"}`;

    event.waitUntil(
        self.registration.showNotification(
            data.title,
            {
                body: data.body,
                icon: "./icon-512.png",
                badge: "./icon-512.png",
                tag: notificationTag,
                renotify: true,
                data: {
                    type: data.type,
                    url: targetUrl.href
                }
            }
        )
    );
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
