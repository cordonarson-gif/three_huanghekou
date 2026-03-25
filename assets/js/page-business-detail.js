(function (window) {
  var HHK = (window.HHK = window.HHK || {});

  HHK.pages["business-detail"] = function () {
    var root = document.getElementById("page-root");
    var requestedId = HHK.utils.query("id");
    var place = HHK.utils.getPlaceById(requestedId);

    if (!place || place.type === "attraction") {
      place = HHK.data.places.find(function (item) {
        return item.type !== "attraction";
      });
    }

    var related = HHK.data.places
      .filter(function (item) {
        return item.type !== "attraction" && item.id !== place.id;
      })
      .slice(0, 3);

    root.innerHTML =
      '<section class="container-shell pt-6 md:pt-10">' +
      '<div class="glass-panel overflow-hidden rounded-[36px]">' +
      '<div class="grid xl:grid-cols-[0.95fr_1.05fr]">' +
      '<div class="relative min-h-[420px]"><img ' +
      HHK.utils.imageAttrs(place.image, HHK.i18n.text(place.title)) +
      ' class="h-full w-full object-cover" /><div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent"></div>' +
      '<div class="absolute left-6 right-6 top-6 flex items-center justify-between gap-4"><a href="index.html" class="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 backdrop-blur">' +
      HHK.utils.escapeHtml(HHK.i18n.t("detailsBack")) +
      '</a>' +
      HHK.utils.renderFavoriteButton(place.id) +
      '</div><div class="absolute bottom-6 left-6 right-6"><span class="badge-soft bg-white/80 dark:bg-slate-950/70">' +
      HHK.utils.escapeHtml(HHK.utils.getTypeKey(place.type)) +
      '</span><h1 class="mt-4 font-display text-4xl font-semibold text-white md:text-5xl">' +
      HHK.utils.escapeHtml(HHK.i18n.text(place.title)) +
      '</h1><p class="mt-3 max-w-2xl text-sm leading-7 text-white/80 md:text-base">' +
      HHK.utils.escapeHtml(HHK.i18n.text(place.subtitle)) +
      "</p></div></div>" +
      '<div class="p-6 md:p-8"><div class="grid gap-4 sm:grid-cols-2">' +
      '<div class="glass-card rounded-[24px] p-4"><div class="text-xs uppercase tracking-[0.16em] text-slate-400">' +
      HHK.utils.escapeHtml(HHK.i18n.t("priceLabel")) +
      '</div><div class="mt-2 font-display text-3xl font-semibold text-slate-900 dark:text-white">' +
      HHK.utils.escapeHtml(HHK.i18n.text(place.price)) +
      '</div></div><div class="glass-card rounded-[24px] p-4"><div class="text-xs uppercase tracking-[0.16em] text-slate-400">' +
      HHK.utils.escapeHtml(HHK.i18n.t("openLabel")) +
      '</div><div class="mt-2 font-display text-3xl font-semibold text-slate-900 dark:text-white">' +
      HHK.utils.escapeHtml(place.openHours) +
      '</div></div></div><div class="mt-6 flex items-center gap-2">' +
      HHK.utils.stars(place.rating) +
      '<span class="text-sm text-slate-500 dark:text-slate-300">' +
      HHK.utils.escapeHtml(place.rating.toFixed(1) + " / 5") +
      '</span></div><p class="mt-6 text-sm leading-8 text-slate-600 dark:text-slate-300">' +
      HHK.utils.escapeHtml(HHK.i18n.text(place.description)) +
      '</p><div class="mt-8 space-y-4">' +
      place.features
        .map(function (feature) {
          return (
            '<div class="rounded-[22px] border border-white/10 bg-white/70 p-4 text-sm leading-7 text-slate-600 dark:bg-slate-950/60 dark:text-slate-300">- ' +
            HHK.utils.escapeHtml(HHK.i18n.text(feature)) +
            "</div>"
          );
        })
        .join("") +
      "</div></div></div></div></section>" +
      '<section class="container-shell py-8"><div class="grid gap-6 xl:grid-cols-[1fr_0.92fr]">' +
      '<div class="glass-panel rounded-[32px] p-6"><h2 class="font-display text-2xl font-semibold text-slate-900 dark:text-white">' +
      HHK.utils.escapeHtml(HHK.i18n.t("detailGallery")) +
      '</h2><div class="mt-5 grid gap-4 md:grid-cols-2">' +
      place.gallery
        .map(function (item) {
          return (
            '<img ' +
            HHK.utils.imageAttrs(item, HHK.i18n.text(place.title)) +
            ' class="h-56 w-full rounded-[24px] object-cover" />'
          );
        })
        .join("") +
      '</div></div><div class="glass-panel rounded-[32px] p-6"><h2 class="font-display text-2xl font-semibold text-slate-900 dark:text-white">' +
      HHK.utils.escapeHtml(HHK.i18n.t("detailHighlights")) +
      '</h2><div class="mt-5 grid gap-4">' +
      '<div class="glass-card rounded-[24px] p-4"><div class="text-xs uppercase tracking-[0.16em] text-slate-400">' +
      HHK.utils.escapeHtml(HHK.i18n.t("regionLabel")) +
      '</div><div class="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">' +
      HHK.utils.escapeHtml(HHK.i18n.text(place.region)) +
      '</div></div><div class="glass-card rounded-[24px] p-4"><div class="text-xs uppercase tracking-[0.16em] text-slate-400">' +
      HHK.utils.escapeHtml(HHK.i18n.t("recommendedForLabel")) +
      '</div><div class="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">' +
      HHK.utils.escapeHtml(
        HHK.i18n.t(
          Object.keys(place.bestFor).sort(function (a, b) {
            return place.bestFor[b] - place.bestFor[a];
          })[0]
        )
      ) +
      '</div></div><div class="glass-card rounded-[24px] p-4"><div class="text-xs uppercase tracking-[0.16em] text-slate-400">' +
      HHK.utils.escapeHtml(HHK.i18n.t("heatLabel")) +
      '</div><div class="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">' +
      place.popularity +
      " / 100</div></div></div></div></div></section>" +
      '<section class="container-shell pb-8"><div class="glass-panel rounded-[32px] p-6"><div class="flex flex-wrap items-center justify-between gap-4"><div><h2 class="font-display text-2xl font-semibold text-slate-900 dark:text-white">' +
      HHK.utils.escapeHtml(HHK.i18n.t("relatedRecommendations")) +
      '</h2><p class="mt-2 text-sm text-slate-500 dark:text-slate-300">' +
      HHK.utils.escapeHtml(HHK.i18n.t("serviceNetworkDescription")) +
      '</p></div><a href="community.html" class="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white dark:bg-brand-300 dark:text-slate-950">' +
      HHK.utils.escapeHtml(HHK.i18n.t("openCommunity")) +
      '</a></div><div class="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">' +
      related
        .map(function (item) {
          return HHK.utils.renderPlaceCard(item, { tagCount: 2 });
        })
        .join("") +
      "</div></div></section>";

    HHK.utils.updateFavoriteButtons();
    HHK.utils.refreshIcons();
  };
})(window);
