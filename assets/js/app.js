(function (window) {
  var HHK = (window.HHK = window.HHK || {});
  HHK.pages = HHK.pages || {};

  function applyTheme(theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }

  function syncChrome() {
    HHK.components.renderHeader(document.body.dataset.page || "home");
    HHK.components.renderFooter();
    HHK.utils.updateFavoriteButtons();
    HHK.utils.refreshIcons();
  }

  function bindGlobalActions() {
    document.addEventListener("click", function (event) {
      var actionNode = event.target.closest("[data-action]");
      if (!actionNode) {
        return;
      }

      var action = actionNode.getAttribute("data-action");

      if (action === "toggle-theme") {
        var nextTheme = HHK.store.getTheme() === "dark" ? "light" : "dark";
        HHK.store.setTheme(nextTheme);
        applyTheme(nextTheme);
        syncChrome();
      }

      if (action === "toggle-locale") {
        var nextLocale = HHK.store.getLocale() === "zh" ? "en" : "zh";
        HHK.store.setLocale(nextLocale);
        window.location.reload();
      }

      if (action === "logout") {
        HHK.store.logout();
        HHK.utils.showToast(HHK.i18n.t("logoutSuccess"), "success");
        window.setTimeout(function () {
          window.location.reload();
        }, 500);
      }

      if (action === "reset-demo") {
        if (window.confirm(HHK.i18n.t("resetDemoConfirm"))) {
          HHK.store.resetDemoData();
          HHK.utils.showToast(HHK.i18n.t("resetDemoDone"), "success");
          window.setTimeout(function () {
            window.location.reload();
          }, 500);
        }
      }

      if (action === "favorite") {
        event.preventDefault();
        var placeId = actionNode.getAttribute("data-place-id");
        if (!HHK.utils.requireLogin()) {
          return;
        }
        var favorites = HHK.store.toggleFavorite(placeId);
        HHK.utils.showToast(
          favorites.indexOf(placeId) > -1
            ? HHK.i18n.t("favoriteSaved")
            : HHK.i18n.t("favoriteRemoved"),
          "success"
        );
        syncChrome();
        if (typeof HHK.app.onFavoriteChange === "function") {
          HHK.app.onFavoriteChange(placeId);
        }
      }
    });
  }

  HHK.app = {
    init: function () {
      HHK.store.init();
      applyTheme(HHK.store.getTheme());
      syncChrome();
      bindGlobalActions();

      var page = document.body.dataset.page || "home";
      if (HHK.pages[page]) {
        HHK.pages[page]();
        HHK.utils.updateFavoriteButtons();
        HHK.utils.refreshIcons();
      }
    },
    syncChrome: syncChrome,
    onFavoriteChange: null
  };

  document.addEventListener("DOMContentLoaded", function () {
    HHK.app.init();
  });
})(window);
