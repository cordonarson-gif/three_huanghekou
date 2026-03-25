(function (window) {
  var HHK = (window.HHK = window.HHK || {});

  function navLink(page, activePage) {
    var href = HHK.config.pageMap[page];
    var active = page === activePage;
    return (
      '<a href="' +
      href +
      '" class="site-nav-link ' +
      (active ? "is-active" : "") +
      '">' +
      HHK.utils.escapeHtml(HHK.i18n.t(page)) +
      "</a>"
    );
  }

  function headerState() {
    var header = document.getElementById("site-header");
    var shell = header ? header.querySelector(".site-header-shell") : null;
    if (shell) {
      shell.classList.toggle("is-scrolled", window.scrollY > 24);
    }
  }

  function ensureHeaderScrollBinding() {
    if (window.__hhkHeaderScrollBound) {
      headerState();
      return;
    }
    window.__hhkHeaderScrollBound = true;
    window.addEventListener("scroll", headerState, { passive: true });
    window.setTimeout(headerState, 0);
  }

  function renderHeader(page) {
    var user = HHK.store.getCurrentUser();
    var favoritesCount = HHK.store.getFavorites().length;
    var isDark = HHK.store.getTheme() === "dark";
    var header = document.getElementById("site-header");

    if (!header) {
      return;
    }

    header.innerHTML =
      '<div class="container-shell">' +
      '<div class="site-header-shell">' +
      '<div class="site-header-row">' +
      '<a href="index.html" class="site-brand">' +
      '<span class="site-brand-mark"><i data-lucide="waves" class="h-5 w-5"></i></span>' +
      '<span class="site-brand-copy">' +
      '<span class="site-brand-title">' +
      HHK.utils.escapeHtml(HHK.i18n.text(HHK.config.brand.shortName)) +
      '</span><span class="site-brand-subtitle">Yellow River Delta Theme Park</span>' +
      "</span></a>" +
      '<nav class="site-nav hidden lg:flex">' +
      navLink("home", page) +
      navLink("map", page) +
      navLink("route", page) +
      navLink("community", page) +
      "</nav>" +
      '<div class="site-header-actions hidden md:flex">' +
      '<button type="button" data-action="toggle-theme" class="site-utility-button">' +
      '<span class="inline-flex items-center gap-2"><i data-lucide="' +
      (isDark ? "sun" : "moon-star") +
      '" class="h-4 w-4"></i>' +
      HHK.utils.escapeHtml(HHK.i18n.t("themeLabel")) +
      "</span></button>" +
      '<a href="index.html#favorites" class="site-utility-button">' +
      '<span class="inline-flex items-center gap-2"><i data-lucide="heart" class="h-4 w-4"></i>' +
      HHK.utils.escapeHtml(HHK.i18n.t("favorites")) +
      " " +
      favoritesCount +
      "</span></a>" +
      (user
        ? '<div class="site-user-chip">' +
          HHK.utils.escapeHtml(user.displayName) +
          '</div><button type="button" data-action="logout" class="site-utility-button">' +
          HHK.utils.escapeHtml(HHK.i18n.t("logout")) +
          "</button>"
        : '<a href="login.html" class="site-primary-mini">' +
          HHK.utils.escapeHtml(HHK.i18n.t("login")) +
          "</a>") +
      "</div>" +
      '<button type="button" id="mobile-toggle" class="site-mobile-toggle md:hidden"><i data-lucide="menu" class="h-5 w-5"></i></button>' +
      "</div>" +
      '<div id="mobile-nav" class="site-mobile-nav hidden md:hidden">' +
      navLink("home", page) +
      navLink("map", page) +
      navLink("route", page) +
      navLink("community", page) +
      '<div class="site-mobile-actions">' +
      '<button type="button" data-action="toggle-theme" class="site-utility-button">' +
      HHK.utils.escapeHtml(HHK.i18n.t("themeLabel")) +
      "</button>" +
      (user
        ? '<button type="button" data-action="logout" class="site-utility-button">' +
          HHK.utils.escapeHtml(HHK.i18n.t("logout")) +
          "</button>"
        : '<a href="login.html" class="site-primary-mini">' +
          HHK.utils.escapeHtml(HHK.i18n.t("login")) +
          "</a>") +
      "</div></div></div></div>";

    ensureHeaderScrollBinding();

    var mobileToggle = document.getElementById("mobile-toggle");
    var mobileNav = document.getElementById("mobile-nav");
    if (mobileToggle && mobileNav) {
      mobileToggle.addEventListener("click", function () {
        mobileNav.classList.toggle("hidden");
      });
    }
  }

  function renderFooter() {
    var footer = document.getElementById("site-footer");
    var user = HHK.store.getCurrentUser();

    if (!footer) {
      return;
    }

    footer.innerHTML =
      '<div class="container-shell pb-10 pt-4">' +
      '<div class="site-footer-shell">' +
      '<div class="site-footer-copy">' +
      '<span class="premium-section-kicker">Destination Guide</span>' +
      '<h2 class="site-footer-title">' +
      HHK.utils.escapeHtml(HHK.i18n.text(HHK.config.brand.name)) +
      '</h2><p class="site-footer-description">围绕黄河入海、湿地生态、在地风味与度假住宿，我们把路线、地图、社区与景点信息重新编排成一套更清晰也更耐看的旅行官网体验。</p>' +
      '<div class="site-footer-links">' +
      '<a href="map.html" class="footer-link-pill"><i data-lucide="map" class="h-4 w-4"></i>' +
      HHK.utils.escapeHtml(HHK.i18n.t("map")) +
      '</a><a href="route.html" class="footer-link-pill"><i data-lucide="route" class="h-4 w-4"></i>' +
      HHK.utils.escapeHtml(HHK.i18n.t("route")) +
      '</a><a href="community.html" class="footer-link-pill"><i data-lucide="messages-square" class="h-4 w-4"></i>' +
      HHK.utils.escapeHtml(HHK.i18n.t("community")) +
      "</a></div></div>" +
      '<div class="site-footer-grid">' +
      '<a href="map.html" class="footer-utility-tile"><div class="footer-icon-wrap"><i data-lucide="navigation" class="h-4 w-4"></i></div><div><div class="font-semibold text-slate-900 dark:text-white">互动地图</div><p class="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-300">随时切换景点、民宿与餐饮，快速锁定最值得去的目的地。</p></div></a>' +
      '<a href="route.html" class="footer-utility-tile"><div class="footer-icon-wrap"><i data-lucide="sparkles" class="h-4 w-4"></i></div><div><div class="font-semibold text-slate-900 dark:text-white">路线推荐</div><p class="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-300">用更轻松的方式安排日出、观鸟、展馆与晚餐的旅行节奏。</p></div></a>' +
      '<a href="community.html" class="footer-utility-tile"><div class="footer-icon-wrap"><i data-lucide="message-circle-more" class="h-4 w-4"></i></div><div><div class="font-semibold text-slate-900 dark:text-white">游客社区</div><p class="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-300">真实游客的笔记、照片和口碑建议，帮你少走弯路。</p></div></a>' +
      '<a href="' +
      (user ? "index.html#favorites" : "login.html") +
      '" class="footer-utility-tile"><div class="footer-icon-wrap"><i data-lucide="' +
      (user ? "heart" : "log-in") +
      '" class="h-4 w-4"></i></div><div><div class="font-semibold text-slate-900 dark:text-white">' +
      (user ? "我的心动清单" : "游客登录") +
      '</div><p class="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-300">' +
      (user ? "把想去的点位先收起来，之后规划路线会更轻松。" : "登录后可收藏点位、发布旅行笔记并参与互动。") +
      "</p></div></a>" +
      "</div>" +
      '<div class="site-footer-bottom"><span>&copy; 2026 Yellow River Delta Theme Park</span><span class="site-footer-tag">Wetland · Estuary · Birding · Slow Travel</span></div>' +
      "</div></div>";
  }

  HHK.components = {
    renderHeader: renderHeader,
    renderFooter: renderFooter
  };
})(window);
