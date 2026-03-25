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

  HHK.createAvatarDataUri = function (name) {
    var source = String(name || "Guest").trim();
    var initials = source
      .replace(/\s+/g, "")
      .slice(0, 2)
      .toUpperCase();
    var palettes = [
      ["#D9F2EA", "#1F5F56"],
      ["#F7E7C7", "#8A5A1F"],
      ["#E5EEF8", "#294F7D"],
      ["#F3DFE5", "#8A3E56"],
      ["#E4F3D9", "#466A1E"]
    ];
    var total = 0;
    var index;

    for (index = 0; index < source.length; index += 1) {
      total += source.charCodeAt(index);
    }

    var palette = palettes[total % palettes.length];
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="' +
      source.replace(/"/g, "&quot;") +
      '">' +
      '<rect width="64" height="64" rx="18" fill="' +
      palette[0] +
      '"/>' +
      '<circle cx="32" cy="20" r="12" fill="' +
      palette[1] +
      '" opacity="0.12"/>' +
      '<text x="32" y="40" fill="' +
      palette[1] +
      '" font-family="Segoe UI, Microsoft YaHei, sans-serif" font-size="22" font-weight="700" text-anchor="middle">' +
      (initials || "G") +
      "</text></svg>";

    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  };
})(window);
