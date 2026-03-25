(function (window) {
  var HHK = (window.HHK = window.HHK || {});

  function currentFileName() {
    var parts = window.location.pathname.split("/");
    return parts[parts.length - 1] || "index.html";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function stars(rating) {
    var full = Math.round(rating);
    var output = "";
    for (var index = 0; index < 5; index += 1) {
      output +=
        '<i data-lucide="' +
        (index < full ? "star" : "star-off") +
        '" class="w-4 h-4 ' +
        (index < full ? "text-amber-400" : "text-slate-300 dark:text-slate-600") +
        '"></i>';
    }
    return output;
  }

  function imageAttrs(image, alt) {
    var safeAlt = escapeHtml(alt || "");
    return (
      'src="' +
      escapeHtml(image.local) +
      '" alt="' +
      safeAlt +
      '" onerror="this.onerror=null;this.src=\'' +
      escapeHtml(image.fallback) +
      "'\""
    );
  }

  function getPlaceById(placeId) {
    return HHK.data.places.find(function (place) {
      return place.id === placeId;
    });
  }

  function getTypeKey(type) {
    if (type === "homestay") {
      return HHK.i18n.t("homestay");
    }
    if (type === "food") {
      return HHK.i18n.t("food");
    }
    return HHK.i18n.t("attraction");
  }

  function placeHref(place) {
    var file = place.type === "attraction" ? "attraction-detail.html" : "business-detail.html";
    return file + "?id=" + encodeURIComponent(place.id);
  }

  function renderFavoriteButton(placeId, compact) {
    var isFavorite = HHK.store.isFavorite(placeId);
    var label = isFavorite ? HHK.i18n.t("removeFavorite") : HHK.i18n.t("addFavorite");
    return (
      '<button type="button" data-action="favorite" data-place-id="' +
      placeId +
      '" class="' +
      (compact
        ? "h-10 w-10"
        : "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm") +
      ' rounded-full border border-white/20 bg-white/70 text-slate-900 shadow-sm backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-100">' +
      '<i data-lucide="heart" class="w-4 h-4 ' +
      (isFavorite ? "fill-rose-500 text-rose-500" : "text-slate-500 dark:text-slate-300") +
      '"></i>' +
      (compact ? "" : "<span>" + escapeHtml(label) + "</span>") +
      "</button>"
    );
  }

  function renderPlaceCard(place, options) {
    options = options || {};
    var tags = place.tags
      .slice(0, options.tagCount || 3)
      .map(function (tag) {
        return (
          '<span class="badge-soft">' + escapeHtml(HHK.i18n.text(tag)) + "</span>"
        );
      })
      .join("");

    return (
      '<article class="glass-card card-lift rounded-[28px] overflow-hidden">' +
      '<div class="relative">' +
      '<img ' +
      imageAttrs(place.image, HHK.i18n.text(place.title)) +
      ' class="spot-card-image w-full" />' +
      '<div class="absolute left-4 top-4">' +
      '<span class="badge-soft bg-white/75 dark:bg-slate-950/65">' +
      escapeHtml(getTypeKey(place.type)) +
      "</span></div>" +
      '<div class="absolute right-4 top-4">' +
      renderFavoriteButton(place.id, true) +
      "</div></div>" +
      '<div class="p-5">' +
      '<div class="mb-3 flex items-start justify-between gap-4">' +
      "<div>" +
      '<h3 class="font-display text-xl font-semibold text-slate-900 dark:text-slate-50">' +
      escapeHtml(HHK.i18n.text(place.title)) +
      "</h3>" +
      '<p class="mt-1 text-sm text-slate-500 dark:text-slate-300">' +
      escapeHtml(HHK.i18n.text(place.region)) +
      "</p></div>" +
      '<div class="shrink-0 rounded-2xl bg-amber-50 px-3 py-2 text-right text-sm text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">' +
      '<div class="font-semibold">' +
      place.rating.toFixed(1) +
      "</div><div>" +
      place.popularity +
      "</div></div></div>" +
      '<p class="line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">' +
      escapeHtml(HHK.i18n.text(place.summary)) +
      "</p>" +
      '<div class="mt-4 flex flex-wrap gap-2">' +
      tags +
      "</div>" +
      '<div class="mt-5 flex items-center justify-between gap-4">' +
      '<div class="flex items-center gap-1">' +
      stars(place.rating) +
      "</div>" +
      '<a href="' +
      placeHref(place) +
      '" class="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 dark:bg-white dark:text-slate-950 dark:hover:bg-brand-100">' +
      escapeHtml(HHK.i18n.t("viewDetails")) +
      '<i data-lucide="arrow-up-right" class="h-4 w-4"></i>' +
      "</a></div></div></article>"
    );
  }

  function formatDate(value) {
    var locale = HHK.store.getLocale() === "en" ? "en-US" : "zh-CN";
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(value));
  }

  function showToast(message, tone, action) {
    var stack = document.getElementById("toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.id = "toast-stack";
      stack.className = "toast-stack";
      document.body.appendChild(stack);
    }

    var toast = document.createElement("div");
    toast.className = "toast";
    toast.dataset.tone = tone || "default";

    var actionMarkup = "";
    if (action) {
      actionMarkup =
        '<a href="' +
        escapeHtml(action.href) +
        '" class="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white dark:bg-brand-300 dark:text-slate-950">' +
        escapeHtml(action.label) +
        "</a>";
    }

    toast.innerHTML =
      '<div class="text-sm font-medium">' +
      escapeHtml(message) +
      "</div>" +
      actionMarkup;

    stack.appendChild(toast);
    window.setTimeout(function () {
      toast.remove();
    }, 2600);
  }

  function requireLogin() {
    if (HHK.store.isLoggedIn()) {
      return true;
    }

    showToast(HHK.i18n.t("loginRequired"), "warning", {
      href: "login.html?returnTo=" + encodeURIComponent(currentFileName() + window.location.search),
      label: HHK.i18n.t("login")
    });
    return false;
  }

  function updateFavoriteButtons() {
    document.querySelectorAll('[data-action="favorite"]').forEach(function (button) {
      var placeId = button.getAttribute("data-place-id");
      var active = HHK.store.isFavorite(placeId);
      var icon = button.querySelector("i");
      if (icon) {
        icon.classList.toggle("fill-rose-500", active);
        icon.classList.toggle("text-rose-500", active);
        icon.classList.toggle("text-slate-500", !active);
        icon.classList.toggle("dark:text-slate-300", !active);
      }
      var label = button.querySelector("span");
      if (label) {
        label.textContent = active ? HHK.i18n.t("removeFavorite") : HHK.i18n.t("addFavorite");
      }
    });
  }

  HHK.utils = {
    currentFileName: currentFileName,
    escapeHtml: escapeHtml,
    getPlaceById: getPlaceById,
    getTypeKey: getTypeKey,
    placeHref: placeHref,
    renderPlaceCard: renderPlaceCard,
    renderFavoriteButton: renderFavoriteButton,
    imageAttrs: imageAttrs,
    formatDate: formatDate,
    showToast: showToast,
    requireLogin: requireLogin,
    updateFavoriteButtons: updateFavoriteButtons,
    stars: stars,
    query: function (name) {
      return new URLSearchParams(window.location.search).get(name);
    },
    refreshIcons: function () {
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }
  };
})(window);
