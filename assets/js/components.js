(function (window) {
  var HHK = (window.HHK = window.HHK || {});

  function navLink(page, activePage) {
    var href = HHK.config.pageMap[page];
    var active = page === activePage;
    return (
      '<a href="' +
      href +
      '" class="rounded-full px-4 py-2 text-sm font-semibold transition ' +
      (active
        ? "bg-slate-900 text-white dark:bg-brand-300 dark:text-slate-950"
        : "text-slate-600 hover:bg-white/80 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-900/70 dark:hover:text-white") +
      '">' +
      HHK.utils.escapeHtml(HHK.i18n.t(page)) +
      "</a>"
    );
  }

  function renderHeader(page) {
    var user = HHK.store.getCurrentUser();
    var favoritesCount = HHK.store.getFavorites().length;
    var localeLabel = HHK.i18n.t("localeLabel");
    var isDark = HHK.store.getTheme() === "dark";
    var header = document.getElementById("site-header");
    if (!header) {
      return;
    }

    header.innerHTML =
      '<div class="container-shell pt-5">' +
      '<div class="glass-panel soft-ring rounded-[28px] px-4 py-4 md:px-6">' +
      '<div class="flex items-center justify-between gap-4">' +
      '<a href="index.html" class="flex min-w-0 items-center gap-3">' +
      '<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-[0_12px_24px_rgba(15,23,42,0.18)] dark:bg-brand-300 dark:text-slate-950">' +
      '<i data-lucide="waves" class="h-5 w-5"></i></div>' +
      '<div class="min-w-0">' +
      '<div class="font-display text-base font-semibold leading-tight text-slate-900 dark:text-white md:text-[1.08rem]">' +
      HHK.utils.escapeHtml(HHK.i18n.text(HHK.config.brand.shortName)) +
      "</div>" +
      '<div class="mt-1 text-[11px] font-medium tracking-[0.08em] text-slate-500 dark:text-slate-300">Yellow River Delta Theme Park</div>' +
      "</div></a>" +
      '<nav class="hidden items-center gap-2 lg:flex">' +
      navLink("home", page) +
      navLink("map", page) +
      navLink("route", page) +
      navLink("community", page) +
      "</nav>" +
      '<div class="hidden items-center gap-2 md:flex">' +
      '<button type="button" data-action="toggle-locale" class="rounded-full border border-white/20 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-800 dark:border-white/10 dark:bg-slate-950/65 dark:text-slate-100">' +
      HHK.utils.escapeHtml(localeLabel) +
      "</button>" +
      '<button type="button" data-action="toggle-theme" class="rounded-full border border-white/20 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-800 dark:border-white/10 dark:bg-slate-950/65 dark:text-slate-100">' +
      '<span class="inline-flex items-center gap-2"><i data-lucide="' +
      (isDark ? "sun" : "moon-star") +
      '" class="h-4 w-4"></i>' +
      HHK.utils.escapeHtml(HHK.i18n.t("themeLabel")) +
      "</span></button>" +
      '<button type="button" data-action="reset-demo" class="rounded-full border border-white/20 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-800 dark:border-white/10 dark:bg-slate-950/65 dark:text-slate-100">' +
      '<span class="inline-flex items-center gap-2"><i data-lucide="rotate-ccw" class="h-4 w-4"></i>' +
      HHK.utils.escapeHtml(HHK.i18n.t("resetDemo")) +
      "</span></button>" +
      '<a href="index.html#favorites" class="rounded-full border border-white/20 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-800 dark:border-white/10 dark:bg-slate-950/65 dark:text-slate-100">' +
      '<span class="inline-flex items-center gap-2"><i data-lucide="heart" class="h-4 w-4"></i>' +
      HHK.utils.escapeHtml(HHK.i18n.t("favorites")) +
      " " +
      favoritesCount +
      "</span></a>" +
      (user
        ? '<div class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-brand-300 dark:text-slate-950">' +
          HHK.utils.escapeHtml(HHK.i18n.t("welcomeBack")) +
          ": " +
          HHK.utils.escapeHtml(user.displayName) +
          '</div><button type="button" data-action="logout" class="rounded-full border border-white/20 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-800 dark:border-white/10 dark:bg-slate-950/65 dark:text-slate-100">' +
          HHK.utils.escapeHtml(HHK.i18n.t("logout")) +
          "</button>"
        : '<a href="login.html" class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-brand-300 dark:text-slate-950">' +
          HHK.utils.escapeHtml(HHK.i18n.t("login")) +
          "</a>") +
      "</div>" +
      '<button type="button" id="mobile-toggle" class="md:hidden rounded-2xl border border-white/20 bg-white/70 p-3 text-slate-900 dark:border-white/10 dark:bg-slate-950/65 dark:text-white">' +
      '<i data-lucide="menu" class="h-5 w-5"></i></button></div>' +
      '<div id="mobile-nav" class="hidden pt-4 md:hidden">' +
      '<div class="grid gap-2">' +
      navLink("home", page) +
      navLink("map", page) +
      navLink("route", page) +
      navLink("community", page) +
      '<div class="mt-2 grid grid-cols-2 gap-2">' +
      '<button type="button" data-action="toggle-locale" class="rounded-full border border-white/20 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-800 dark:border-white/10 dark:bg-slate-950/65 dark:text-slate-100">' +
      HHK.utils.escapeHtml(localeLabel) +
      "</button>" +
      '<button type="button" data-action="toggle-theme" class="rounded-full border border-white/20 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-800 dark:border-white/10 dark:bg-slate-950/65 dark:text-slate-100">' +
      HHK.utils.escapeHtml(HHK.i18n.t("themeLabel")) +
      '</button><button type="button" data-action="reset-demo" class="rounded-full border border-white/20 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-800 dark:border-white/10 dark:bg-slate-950/65 dark:text-slate-100">' +
      HHK.utils.escapeHtml(HHK.i18n.t("resetDemo")) +
      "</button></div>" +
      (user
        ? '<button type="button" data-action="logout" class="mt-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white dark:bg-brand-300 dark:text-slate-950">' +
          HHK.utils.escapeHtml(HHK.i18n.t("logout")) +
          "</button>"
        : '<a href="login.html" class="mt-2 rounded-full bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white dark:bg-brand-300 dark:text-slate-950">' +
          HHK.utils.escapeHtml(HHK.i18n.t("login")) +
          "</a>") +
      "</div></div></div></div>";

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
    if (!footer) {
      return;
    }

    var user = HHK.store.getCurrentUser();
    var favoritesCount = HHK.store.getFavorites().length;
    var linkPills = [
      { href: "map.html", icon: "map", label: HHK.i18n.t("map") },
      { href: "route.html", icon: "route", label: HHK.i18n.t("route") },
      { href: "community.html", icon: "messages-square", label: HHK.i18n.t("community") }
    ]
      .map(function (item) {
        return (
          '<a href="' +
          item.href +
          '" class="footer-link-pill">' +
          '<i data-lucide="' +
          item.icon +
          '" class="h-4 w-4"></i>' +
          HHK.utils.escapeHtml(item.label) +
          "</a>"
        );
      })
      .join("");

    var utilityTiles =
      '<a href="map.html" class="footer-utility-tile">' +
      '<div class="footer-icon-wrap"><i data-lucide="map" class="h-4 w-4"></i></div>' +
      '<div class="min-w-0"><div class="font-semibold text-slate-900 dark:text-white">' +
      HHK.utils.escapeHtml(HHK.i18n.t("map")) +
      '</div><p class="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-300">' +
      HHK.utils.escapeHtml(HHK.i18n.t("mapDescription")) +
      "</p></div></a>" +
      '<a href="route.html" class="footer-utility-tile">' +
      '<div class="footer-icon-wrap"><i data-lucide="sparkles" class="h-4 w-4"></i></div>' +
      '<div class="min-w-0"><div class="font-semibold text-slate-900 dark:text-white">' +
      HHK.utils.escapeHtml(HHK.i18n.t("route")) +
      '</div><p class="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-300">' +
      HHK.utils.escapeHtml(HHK.i18n.t("routeDescription")) +
      "</p></div></a>" +
      '<a href="community.html" class="footer-utility-tile">' +
      '<div class="footer-icon-wrap"><i data-lucide="message-circle-more" class="h-4 w-4"></i></div>' +
      '<div class="min-w-0"><div class="font-semibold text-slate-900 dark:text-white">' +
      HHK.utils.escapeHtml(HHK.i18n.t("community")) +
      '</div><p class="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-300">' +
      HHK.utils.escapeHtml(HHK.i18n.t("communityDescription")) +
      "</p></div></a>" +
      '<a href="' +
      (user ? "index.html#favorites" : "login.html") +
      '" class="footer-utility-tile">' +
      '<div class="footer-icon-wrap"><i data-lucide="' +
      (user ? "heart" : "log-in") +
      '" class="h-4 w-4"></i></div>' +
      '<div class="min-w-0"><div class="font-semibold text-slate-900 dark:text-white">' +
      (user
        ? HHK.utils.escapeHtml(HHK.i18n.t("favorites")) + " / " + favoritesCount
        : HHK.utils.escapeHtml(HHK.i18n.t("login"))) +
      '</div><p class="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-300">' +
      (user
        ? HHK.utils.escapeHtml(HHK.i18n.t("favoritesPersistence"))
        : HHK.utils.escapeHtml(HHK.i18n.t("loginDescription"))) +
      "</p></div></a>";

    footer.innerHTML =
      '<div class="container-shell pb-10 pt-4">' +
      '<div class="premium-footer rounded-[32px] p-6 md:p-8">' +
      '<span class="footer-halo footer-halo-1"></span><span class="footer-halo footer-halo-2"></span>' +
      '<div class="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">' +
      '<div>' +
      '<div class="inline-flex items-center gap-3 rounded-full border border-white/35 bg-white/70 px-4 py-3 shadow-[0_12px_30px_rgba(16,42,51,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-950/55">' +
      '<span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-brand-300 dark:text-slate-950">' +
      '<i data-lucide="waves" class="h-4 w-4"></i></span>' +
      '<div class="text-left"><div class="text-sm font-semibold text-slate-900 dark:text-white">' +
      HHK.utils.escapeHtml(HHK.i18n.text(HHK.config.brand.name)) +
      '</div><div class="text-xs text-slate-500 dark:text-slate-300">Yellow River Delta Theme Park</div></div></div>' +
      '<h2 class="mt-5 max-w-2xl font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl">' +
      HHK.utils.escapeHtml(HHK.i18n.text(HHK.config.brand.name)) +
      '</h2><p class="mt-2 text-sm font-medium text-brand-700 dark:text-brand-200">' +
      HHK.utils.escapeHtml(HHK.i18n.t("heroEyebrow")) +
      "</p>" +
      '<p class="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">' +
      HHK.utils.escapeHtml(HHK.i18n.t("footerDescription")) +
      '</p><div class="mt-6 flex flex-wrap gap-3">' +
      linkPills +
      "</div></div>" +
      '<div class="relative z-10 grid gap-4 sm:grid-cols-2">' +
      utilityTiles +
      "</div></div>" +
      '<div class="relative z-10 mt-8 flex flex-col gap-3 border-t border-white/20 pt-5 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400 md:flex-row md:items-center md:justify-between">' +
      "<span>&copy; 2026 Yellow River Delta Frontend Experience</span>" +
      '<span class="rounded-full border border-white/20 bg-white/60 px-4 py-2 dark:border-white/10 dark:bg-slate-950/45">' +
      HHK.utils.escapeHtml(HHK.i18n.t("footerStack")) +
      "</span></div></div></div>";
  }

  HHK.components = {
    renderHeader: renderHeader,
    renderFooter: renderFooter
  };
})(window);
