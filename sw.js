self.addEventListener("install", () => {
    caches.open("app_cache").then(cache => {
        cache.addAll(["/",
                     "/index.html",
                     "/restaurant.html",
                     "/css/styles.css",
                     "/img/2.jpg",
                     "/img/3.jpg",
                     "/img/8.jpg",
                     "/img/10.jpg",
                     "/js/dbhelper.js",
                     "/js/main.js",
                     "/js/restaurant_info.js",
        ]).then(cache => {console.log("install")
        });
    });
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.open("app_cache")
        .then(cache => {
            return cache.match(event.request)
            .then(response => {
                return response || fetch(event.request)
                .then(response => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});
