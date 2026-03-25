(function (window) {
  var icons = {
    "arrow-up-right": '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
    heart: '<path d="M12 20s-6.5-4.2-8.5-7.4C1.8 9.7 3.1 6 6.6 6c2 0 3.2 1.1 4 2.3C11.4 7.1 12.6 6 14.6 6c3.5 0 4.8 3.7 3.1 6.6C18.5 15.8 12 20 12 20Z"/>',
    "log-in": '<path d="M15 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"/><path d="M10 17 15 12 10 7"/><path d="M15 12H4"/>',
    map: '<path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2Z"/><path d="M9 4v14"/><path d="M15 6v14"/>',
    maximize: '<path d="M8 3H3v5"/><path d="M21 8V3h-5"/><path d="M16 21h5v-5"/><path d="M3 16v5h5"/>',
    menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
    "message-circle-more": '<path d="M21 11.5A8.5 8.5 0 1 1 7.5 4.1L4 20l4.1-3.4A8.5 8.5 0 0 1 21 11.5Z"/><circle cx="9" cy="11" r="1"/><circle cx="12" cy="11" r="1"/><circle cx="15" cy="11" r="1"/>',
    "messages-square": '<path d="M6 4h9a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 4V6a2 2 0 0 1 2-2Z"/><path d="M17 8h1a2 2 0 0 1 2 2v8l-4-4h-1"/>',
    "moon-star": '<path d="M18 15.5A6.5 6.5 0 0 1 8.5 6a7.5 7.5 0 1 0 9.5 9.5Z"/><path d="m17 3 .7 1.8L19.5 5.5l-1.8.7L17 8l-.7-1.8-1.8-.7 1.8-.7Z"/>',
    navigation: '<path d="m3 11 18-8-8 18-2.5-7.5L3 11Z"/>',
    route: '<circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 6h3a3 3 0 0 1 3 3v0a3 3 0 0 0 3 3h1"/><path d="M18 16v-4"/>',
    "share-2": '<circle cx="18" cy="5" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="18" cy="19" r="2"/><path d="m8 12 8-6"/><path d="m8 12 8 6"/>',
    sparkles: '<path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6Z"/><path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8Z"/><path d="m5 15 .8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8Z"/>',
    star: '<path d="m12 3.5 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.8-5.4 2.8 1-6.1-4.4-4.3 6.1-.9Z"/>',
    "star-off": '<path d="m12 3.5 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.8-5.4 2.8 1-6.1-4.4-4.3 6.1-.9Z"/><path d="M4 4 20 20"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2.2"/><path d="M12 19.8V22"/><path d="m4.9 4.9 1.6 1.6"/><path d="m17.5 17.5 1.6 1.6"/><path d="M2 12h2.2"/><path d="M19.8 12H22"/><path d="m4.9 19.1 1.6-1.6"/><path d="m17.5 6.5 1.6-1.6"/>',
    waves: '<path d="M3 9c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0"/><path d="M3 15c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0"/>',
    x: '<path d="M6 6 18 18"/><path d="M18 6 6 18"/>'
  };

  function iconSvg(name) {
    var body = icons[name] || icons.x;
    return (
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="100%" height="100%">' +
      body +
      "</svg>"
    );
  }

  window.lucide = window.lucide || {
    createIcons: function (options) {
      var scope = options && options.root ? options.root : document;
      scope.querySelectorAll("[data-lucide]").forEach(function (node) {
        var name = node.getAttribute("data-lucide");
        node.innerHTML = iconSvg(name);
      });
    }
  };
})(window);
