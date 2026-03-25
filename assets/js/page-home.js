(function (window) {
  var HHK = (window.HHK = window.HHK || {});

  HHK.pages.home = function () {
    var root = document.getElementById("page-root");
    var filter = "all";
    var chart = null;

    function renderFrame() {
      var favorites = HHK.store.getFavorites();
      var latestRoute = HHK.store.getRouteCache();
      var heroLead = HHK.data.places[0];
      var heroSupporting = HHK.data.places.slice(1, 3);
      var heroBackdrop = HHK.data.places[4];
      var statsMarkup = HHK.data.heroStats
        .map(function (item) {
          return (
            '<div class="stat-card-premium rounded-[24px] p-5">' +
            '<div class="text-2xl font-display font-semibold text-slate-900 dark:text-white">' +
            HHK.utils.escapeHtml(item.value) +
            "</div>" +
            '<div class="mt-2 text-sm text-slate-500 dark:text-slate-300">' +
            HHK.utils.escapeHtml(HHK.i18n.text(item.label)) +
            "</div></div>"
          );
        })
        .join("");
      var heroLeadTags = heroLead.tags
        .slice(0, 2)
        .map(function (tag) {
          return '<span class="badge-soft bg-white/18 text-white ring-1 ring-white/20">' + HHK.utils.escapeHtml(HHK.i18n.text(tag)) + "</span>";
        })
        .join("");
      var heroSupportingMarkup = heroSupporting
        .map(function (place) {
          return (
            '<a href="' +
            HHK.utils.placeHref(place) +
            '" class="hero-mini-card group rounded-[24px] p-3">' +
            '<div class="flex items-center gap-3">' +
            '<div class="overflow-hidden rounded-[18px]">' +
            '<img ' +
            HHK.utils.imageAttrs(place.image, HHK.i18n.text(place.title)) +
            ' class="h-20 w-20 object-cover transition duration-500 group-hover:scale-105" />' +
            "</div>" +
            '<div class="min-w-0 flex-1">' +
            '<div class="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700 dark:text-brand-200">' +
            HHK.utils.escapeHtml(HHK.utils.getTypeKey(place.type)) +
            "</div>" +
            '<div class="mt-1 line-clamp-1 text-base font-semibold text-slate-900 dark:text-white">' +
            HHK.utils.escapeHtml(HHK.i18n.text(place.title)) +
            "</div>" +
            '<p class="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-300">' +
            HHK.utils.escapeHtml(HHK.i18n.text(place.summary)) +
            "</p></div></div></a>"
          );
        })
        .join("");
      var heroMomentsMarkup = [
        {
          icon: "map-pin",
          value: HHK.i18n.text(heroLead.region)
        },
        {
          icon: "clock-3",
          value: heroLead.openHours
        },
        {
          icon: "camera",
          value: HHK.i18n.text(heroLead.tags[0]) + " / " + HHK.i18n.text(heroLead.tags[1])
        }
      ]
        .map(function (item) {
          return (
            '<div class="hero-insight-pill">' +
            '<i data-lucide="' +
            item.icon +
            '" class="h-4 w-4"></i>' +
            '<span>' +
            HHK.utils.escapeHtml(item.value) +
            "</span></div>"
          );
        })
        .join("");

      root.innerHTML =
        '<section class="container-shell pt-6 md:pt-10">' +
        '<div class="hero-stage relative overflow-hidden rounded-[36px] p-6 md:p-10">' +
        '<div class="hero-stage-photo hidden lg:block" aria-hidden="true"><img ' +
        HHK.utils.imageAttrs(heroBackdrop.image, HHK.i18n.text(heroBackdrop.title)) +
        ' class="h-full w-full object-cover" /></div><div class="hero-stage-vignette hidden lg:block"></div>' +
        '<span class="mesh mesh-1"></span><span class="mesh mesh-2"></span>' +
        '<div class="hero-orbit left-[65%] top-[10%] h-28 w-28"></div>' +
        '<div class="hero-orbit alt left-[8%] top-[62%] h-24 w-24"></div>' +
        '<div class="grid items-center gap-8 lg:grid-cols-[0.98fr_1.02fr]">' +
        '<div class="relative z-10">' +
        '<span class="badge-soft bg-white/80 dark:bg-slate-950/65">' +
        HHK.utils.escapeHtml(HHK.i18n.t("heroEyebrow")) +
        "</span>" +
        '<h1 class="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-6xl">' +
        HHK.utils.escapeHtml(HHK.i18n.t("heroTitle")) +
        "</h1>" +
        '<p class="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">' +
        HHK.utils.escapeHtml(HHK.i18n.t("heroDescription")) +
        "</p>" +
        '<div class="mt-8 flex flex-wrap gap-3">' +
        '<a href="route.html" class="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 dark:bg-brand-300 dark:text-slate-950">' +
        HHK.utils.escapeHtml(HHK.i18n.t("startPlanning")) +
        "</a>" +
        '<a href="map.html" class="rounded-full border border-white/20 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white dark:border-white/10 dark:bg-slate-950/60 dark:text-white">' +
        HHK.utils.escapeHtml(HHK.i18n.t("openMap")) +
        "</a>" +
        '<a href="community.html" class="rounded-full border border-white/20 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white dark:border-white/10 dark:bg-slate-950/60 dark:text-white">' +
        HHK.utils.escapeHtml(HHK.i18n.t("openCommunity")) +
        "</a></div>" +
        '<div class="hero-insight-row mt-6 flex flex-wrap gap-3">' +
        heroMomentsMarkup +
        "</div>" +
        '<div class="mt-8 grid gap-4 sm:grid-cols-2">' +
        statsMarkup +
        "</div></div>" +
        '<div class="relative z-10">' +
        '<div class="hero-feature-shell rounded-[32px] p-4 md:p-5">' +
        '<div class="mb-4 flex items-center justify-between gap-4">' +
        '<div><div class="text-sm font-semibold text-slate-900 dark:text-white">' +
        HHK.utils.escapeHtml(HHK.i18n.t("featuredSpots")) +
        '</div><p class="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-300">' +
        HHK.utils.escapeHtml(HHK.i18n.t("sectionDataPowered")) +
        "</p></div>" +
        '<span class="badge-soft">' +
        HHK.data.places.length +
        " " +
        HHK.utils.escapeHtml(HHK.i18n.t("poiLabel")) +
        "</span></div>" +
        '<a href="' +
        HHK.utils.placeHref(heroLead) +
        '" class="hero-feature-card group block overflow-hidden rounded-[28px]">' +
        '<img ' +
        HHK.utils.imageAttrs(heroLead.image, HHK.i18n.text(heroLead.title)) +
        ' class="hero-feature-image h-[320px] w-full object-cover md:h-[360px]" />' +
        '<div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>' +
        '<div class="absolute left-5 right-5 top-5 flex items-center justify-between gap-3">' +
        '<span class="badge-soft bg-white/20 text-white ring-1 ring-white/20 backdrop-blur">' +
        HHK.utils.escapeHtml(HHK.utils.getTypeKey(heroLead.type)) +
        '</span><span class="hero-score-pill">' +
        HHK.utils.escapeHtml(heroLead.rating.toFixed(1)) +
        "</span></div>" +
        '<div class="absolute left-5 right-5 bottom-5">' +
        '<h3 class="font-display text-2xl font-semibold text-white md:text-[2rem]">' +
        HHK.utils.escapeHtml(HHK.i18n.text(heroLead.title)) +
        '</h3><p class="mt-2 max-w-xl line-clamp-2 text-sm leading-7 text-white/82">' +
        HHK.utils.escapeHtml(HHK.i18n.text(heroLead.summary)) +
        '</p><div class="mt-4 flex flex-wrap gap-2">' +
        heroLeadTags +
        "</div></div></a>" +
        '<div class="mt-4 grid gap-4 md:grid-cols-2">' +
        heroSupportingMarkup +
        "</div></div></div></div></div></section>" +
        '<section class="container-shell pt-8 md:pt-10">' +
        '<div class="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">' +
        '<div class="glass-panel rounded-[32px] p-6 md:p-8">' +
        '<div class="flex flex-wrap items-center justify-between gap-4">' +
        '<div><h2 class="font-display text-2xl font-semibold text-slate-900 dark:text-white">' +
        HHK.utils.escapeHtml(HHK.i18n.t("featuredSpots")) +
        '</h2><p class="mt-2 text-sm text-slate-500 dark:text-slate-300">' +
        HHK.utils.escapeHtml(HHK.i18n.t("sectionDataPowered")) +
        "</p></div>" +
        '<div class="flex flex-wrap gap-2" id="home-filters"></div></div>' +
        '<div id="home-cards" class="mt-6 grid gap-5 md:grid-cols-2"></div></div>' +
        '<div class="space-y-6">' +
        '<div id="favorites" class="glass-panel rounded-[32px] p-6"></div>' +
        '<div class="glass-panel rounded-[32px] p-6">' +
        '<div class="flex items-center justify-between gap-4">' +
        '<div><h2 class="font-display text-2xl font-semibold text-slate-900 dark:text-white">' +
        HHK.utils.escapeHtml(HHK.i18n.t("latestRoute")) +
        '</h2><p class="mt-2 text-sm text-slate-500 dark:text-slate-300">' +
        HHK.utils.escapeHtml(HHK.i18n.t("sectionRouteStored")) +
        "</p></div>" +
        '<span class="badge-soft">' +
        HHK.utils.escapeHtml(HHK.i18n.t("aiRoute")) +
        "</span></div>" +
        '<div class="mt-5 rounded-[24px] border border-white/10 bg-white/70 p-5 dark:bg-slate-950/60">' +
        (latestRoute
          ? '<div class="text-sm font-semibold text-brand-700 dark:text-brand-200">' +
            HHK.utils.escapeHtml(latestRoute.title) +
            '</div><p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">' +
            HHK.utils.escapeHtml(latestRoute.summary) +
            '</p><a href="route.html" class="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-brand-300 dark:text-slate-950">' +
            HHK.utils.escapeHtml(HHK.i18n.t("viewDetails")) +
            "</a>"
          : '<div class="empty-state rounded-[20px] p-5 text-sm text-slate-500 dark:text-slate-300">' +
            HHK.utils.escapeHtml(HHK.i18n.t("noRoute")) +
            "</div>") +
        "</div></div></div></div></section>" +
        '<section class="container-shell py-8 md:py-10">' +
        '<div class="glass-panel rounded-[32px] p-6 md:p-8">' +
        '<div class="flex flex-wrap items-center justify-between gap-4">' +
        '<div><h2 class="font-display text-2xl font-semibold text-slate-900 dark:text-white">' +
        HHK.utils.escapeHtml(HHK.i18n.t("heatTitle")) +
        '</h2><p class="mt-2 text-sm text-slate-500 dark:text-slate-300">' +
        HHK.utils.escapeHtml(HHK.i18n.t("heatSubtitle")) +
        "</p></div>" +
        '<a href="route.html?mode=ai" class="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white dark:bg-brand-300 dark:text-slate-950">' +
        HHK.utils.escapeHtml(HHK.i18n.t("generateAiRoute")) +
        "</a></div>" +
        '<div class="chart-shell mt-8"><canvas id="heat-chart"></canvas></div></div></section>';
    }

    function renderFilters() {
      var filterRoot = document.getElementById("home-filters");
      var options = ["all", "attraction", "homestay", "food"];
      filterRoot.innerHTML = options
        .map(function (option) {
          return (
            '<button type="button" data-filter="' +
            option +
            '" class="filter-pill ' +
            (filter === option ? "is-active" : "") +
            '">' +
            HHK.utils.escapeHtml(HHK.i18n.t(option)) +
            "</button>"
          );
        })
        .join("");

      filterRoot.querySelectorAll("[data-filter]").forEach(function (button) {
        button.addEventListener("click", function () {
          filter = button.getAttribute("data-filter");
          renderFilters();
          renderCards();
        });
      });
    }

    function renderCards() {
      var cardsRoot = document.getElementById("home-cards");
      var items = HHK.data.places.filter(function (place) {
        return filter === "all" ? true : place.type === filter;
      });
      cardsRoot.innerHTML = items
        .slice(0, 6)
        .map(function (place) {
          return HHK.utils.renderPlaceCard(place);
        })
        .join("");
      HHK.utils.updateFavoriteButtons();
      HHK.utils.refreshIcons();
    }

    function renderFavorites() {
      var favoritesRoot = document.getElementById("favorites");
      var favorites = HHK.store.getFavorites()
        .map(HHK.utils.getPlaceById)
        .filter(Boolean);

      favoritesRoot.innerHTML =
        '<div class="flex items-center justify-between gap-4">' +
        '<div><h2 class="font-display text-2xl font-semibold text-slate-900 dark:text-white">' +
        HHK.utils.escapeHtml(HHK.i18n.t("favorites")) +
        '</h2><p class="mt-2 text-sm text-slate-500 dark:text-slate-300">' +
        HHK.utils.escapeHtml(HHK.i18n.t("favoritesPersistence")) +
        "</p></div>" +
        '<span class="badge-soft">' +
        favorites.length +
        "</span></div>" +
        (favorites.length
          ? '<div class="mt-5 space-y-4">' +
            favorites
              .slice(0, 3)
              .map(function (place) {
                return (
                  '<a href="' +
                  HHK.utils.placeHref(place) +
                  '" class="flex items-center gap-4 rounded-[22px] border border-white/10 bg-white/70 p-3 transition hover:-translate-y-1 dark:bg-slate-950/60">' +
                  '<img ' +
                  HHK.utils.imageAttrs(place.image, HHK.i18n.text(place.title)) +
                  ' class="h-20 w-20 rounded-[18px] object-cover" />' +
                  '<div class="min-w-0 flex-1"><div class="font-semibold text-slate-900 dark:text-white">' +
                  HHK.utils.escapeHtml(HHK.i18n.text(place.title)) +
                  '</div><p class="mt-1 text-sm text-slate-500 dark:text-slate-300">' +
                  HHK.utils.escapeHtml(HHK.i18n.text(place.region)) +
                  '</p></div><i data-lucide="chevron-right" class="h-5 w-5 text-slate-400"></i></a>'
                );
              })
              .join("") +
            "</div>"
          : '<div class="empty-state mt-5 rounded-[22px] p-5 text-sm text-slate-500 dark:text-slate-300">' +
            HHK.utils.escapeHtml(HHK.i18n.t("favoritesEmpty")) +
            "</div>");
      HHK.utils.refreshIcons();
    }

    function renderChart() {
      if (!window.Chart) {
        return;
      }
      if (chart) {
        chart.destroy();
      }

      var labels = HHK.data.places.slice(0, 5).map(function (place) {
        return HHK.i18n.text(place.title);
      });
      var values = HHK.data.places.slice(0, 5).map(function (place) {
        return place.popularity;
      });
      var ctx = document.getElementById("heat-chart");
      chart = new window.Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: HHK.i18n.t("heatAxisLabel"),
              data: values,
              borderRadius: 999,
              backgroundColor: ["#f2b84b", "#df8e4f", "#6dbda6", "#2f8f79", "#1d5161"]
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              grid: { color: "rgba(148, 163, 184, 0.14)" }
            },
            x: {
              grid: { display: false }
            }
          }
        }
      });
    }

    renderFrame();
    renderFilters();
    renderCards();
    renderFavorites();
    renderChart();
    HHK.app.onFavoriteChange = function () {
      renderFavorites();
      renderCards();
    };
  };
})(window);
