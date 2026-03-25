(function (window) {
  var HHK = (window.HHK = window.HHK || {});
  HHK.pages = HHK.pages || {};

  HHK.config = {
    credentials: {
      username: "root",
      password: "123456"
    },
    storageKeys: {
      preferences: "hhk:preferences:v1",
      session: "hhk:session:v1",
      favorites: "hhk:favorites:v1",
      comments: "hhk:comments:v1",
      likedComments: "hhk:liked-comments:v1",
      routeCache: "hhk:route-cache:v1"
    },
    brand: {
      name: {
        zh: "黄河口国家主题公园",
        en: "Yellow River Delta Theme Park"
      },
      shortName: {
        zh: "黄河口国家主题公园",
        en: "Yellow River Delta Theme Park"
      }
    },
    defaults: {
      locale: "zh",
      theme: "light"
    },
    pageMap: {
      home: "index.html",
      map: "map.html",
      route: "route.html",
      community: "community.html",
      login: "login.html"
    }
  };
})(window);
