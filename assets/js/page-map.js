(function (window) {
  var HHK = (window.HHK = window.HHK || {});

  HHK.pages.map = function () {
    var root = document.getElementById("page-root");
    var currentFilter = "all";
    var map = null;
    var markers = {};
    var vectorRenderer = null;
    var imageBounds = [
      [0, 0],
      [100, 160]
    ];

    function renderFrame() {
      root.innerHTML =
        '<section class="container-shell pt-6 md:pt-10">' +
        '<div class="glass-panel rounded-[34px] p-6 md:p-8">' +
        '<div class="flex flex-wrap items-center justify-between gap-4">' +
        '<div><span class="badge-soft">Leaflet.js</span>' +
        '<h1 class="mt-4 font-display text-3xl font-semibold text-slate-900 dark:text-white md:text-5xl">' +
        HHK.utils.escapeHtml(HHK.i18n.t("mapTitle")) +
        '</h1><p class="mt-3 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-300">' +
        HHK.utils.escapeHtml(HHK.i18n.t("mapDescription")) +
        '</p></div><div class="flex flex-wrap gap-2" id="map-filters"></div></div>' +
        '<div class="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">' +
        '<div class="overflow-hidden rounded-[28px] border border-white/10 bg-white/70 dark:bg-slate-950/60">' +
        '<div id="leaflet-map" class="h-[560px] w-full bg-cover bg-center" style="background-image:url(\'image/estuary-map.svg\'); background-color:#eef5ed;"></div></div>' +
        '<aside class="space-y-4"><div class="grid gap-4 sm:grid-cols-3 xl:grid-cols-1" id="map-stats"></div>' +
        '<div class="glass-card rounded-[28px] p-5"><div class="mb-4 flex items-center justify-between gap-4">' +
        '<h2 class="font-display text-xl font-semibold text-slate-900 dark:text-white">' +
        HHK.utils.escapeHtml(HHK.i18n.t("currentVisiblePlaces")) +
        '</h2>' +
        '<span id="visible-count" class="badge-soft"></span></div>' +
        '<div id="map-list" class="space-y-4"></div></div></aside></div></div></section>';
    }

    function renderFilters() {
      var filterRoot = document.getElementById("map-filters");
      var filters = ["all", "attraction", "homestay", "food"];
      filterRoot.innerHTML = filters
        .map(function (filter) {
          return (
            '<button type="button" data-filter="' +
            filter +
            '" class="filter-pill ' +
            (filter === currentFilter ? "is-active" : "") +
            '">' +
            HHK.utils.escapeHtml(HHK.i18n.t(filter)) +
            "</button>"
          );
        })
        .join("");

      filterRoot.querySelectorAll("[data-filter]").forEach(function (button) {
        button.addEventListener("click", function () {
          currentFilter = button.getAttribute("data-filter");
          renderFilters();
          renderList();
          renderStats();
          renderMarkers();
        });
      });
    }

    function filteredPlaces() {
      return HHK.data.places.filter(function (place) {
        return currentFilter === "all" ? true : place.type === currentFilter;
      });
    }

    function renderStats() {
      var items = filteredPlaces();
      var stats = [
        {
          label: HHK.i18n.t("poiLabel"),
          value: items.length
        },
        {
          label: HHK.i18n.t("avgRatingLabel"),
          value: (
            items.reduce(function (sum, item) {
              return sum + item.rating;
            }, 0) / (items.length || 1)
          ).toFixed(1)
        },
        {
          label: HHK.i18n.t("topHeatLabel"),
          value: Math.max.apply(
            null,
            items.map(function (item) {
              return item.popularity;
            })
          )
        }
      ];

      document.getElementById("map-stats").innerHTML = stats
        .map(function (item) {
          return (
            '<div class="glass-card rounded-[24px] p-4">' +
            '<div class="text-xs uppercase tracking-[0.18em] text-slate-400">' +
            item.label +
            "</div>" +
            '<div class="mt-3 font-display text-3xl font-semibold text-slate-900 dark:text-white">' +
            HHK.utils.escapeHtml(String(item.value)) +
            "</div></div>"
          );
        })
        .join("");
    }

    function popupMarkup(place) {
      return (
        '<div class="w-[260px] text-slate-900 dark:text-slate-50">' +
        '<img ' +
        HHK.utils.imageAttrs(place.image, HHK.i18n.text(place.title)) +
        ' class="h-36 w-full rounded-2xl object-cover" />' +
        '<h3 class="mt-3 text-lg font-semibold">' +
        HHK.utils.escapeHtml(HHK.i18n.text(place.title)) +
        '</h3><p class="mt-1 text-xs text-slate-500 dark:text-slate-300">' +
        HHK.utils.escapeHtml(HHK.i18n.text(place.region)) +
        '</p><p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">' +
        HHK.utils.escapeHtml(HHK.i18n.text(place.summary)) +
        '</p><div class="mt-4 flex items-center justify-between gap-3">' +
        HHK.utils.renderFavoriteButton(place.id) +
        '<a href="' +
        HHK.utils.placeHref(place) +
        '" class="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-brand-300 dark:text-slate-950">' +
        HHK.utils.escapeHtml(HHK.i18n.t("viewDetails")) +
        "</a></div></div>"
      );
    }

    function renderMarkers() {
      if (!map) {
        return;
      }

      Object.keys(markers).forEach(function (key) {
        map.removeLayer(markers[key]);
      });
      markers = {};

      filteredPlaces().forEach(function (place) {
        var markerPoint = place.mapPoint || { x: 800, y: 500 };
        var marker = window.L.marker([markerPoint.y / 10, markerPoint.x / 10], {
          icon: window.L.divIcon({
            className: "hhk-div-icon",
            html: '<div class="map-marker ' + place.type + '"></div>',
            iconSize: [18, 18],
            iconAnchor: [9, 9]
          })
        });
        marker.addTo(map).bindPopup(popupMarkup(place));
        markers[place.id] = marker;
      });
      HHK.utils.refreshIcons();
      HHK.utils.updateFavoriteButtons();
    }

    function focusPlace(placeId) {
      var place = HHK.utils.getPlaceById(placeId);
      if (!place || !markers[placeId]) {
        return;
      }
      map.flyTo([place.mapPoint.y / 10, place.mapPoint.x / 10], 0.8, { duration: 0.8 });
      markers[placeId].openPopup();
    }

    function renderList() {
      var items = filteredPlaces();
      document.getElementById("visible-count").textContent = String(items.length);
      document.getElementById("map-list").innerHTML = items
        .map(function (place) {
          return (
            '<article class="rounded-[24px] border border-white/10 bg-white/70 p-4 dark:bg-slate-950/60">' +
            '<div class="flex gap-4">' +
            '<img ' +
            HHK.utils.imageAttrs(place.image, HHK.i18n.text(place.title)) +
            ' class="h-20 w-24 rounded-[18px] object-cover" />' +
            '<div class="min-w-0 flex-1"><div class="flex items-start justify-between gap-3">' +
            '<div><h3 class="font-semibold text-slate-900 dark:text-white">' +
            HHK.utils.escapeHtml(HHK.i18n.text(place.title)) +
            '</h3><p class="mt-1 text-xs text-slate-500 dark:text-slate-300">' +
            HHK.utils.escapeHtml(HHK.i18n.text(place.region)) +
            "</p></div>" +
            '<span class="badge-soft">' +
            place.rating.toFixed(1) +
            "</span></div>" +
            '<p class="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">' +
            HHK.utils.escapeHtml(HHK.i18n.text(place.summary)) +
            '</p><div class="mt-3 flex flex-wrap gap-2">' +
            '<button type="button" data-focus-place="' +
            place.id +
            '" class="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white dark:bg-brand-300 dark:text-slate-950">' +
            HHK.utils.escapeHtml(HHK.i18n.t("focus")) +
            "</button>" +
            '<a href="' +
            HHK.utils.placeHref(place) +
            '" class="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-100">' +
            HHK.utils.escapeHtml(HHK.i18n.t("viewDetails")) +
            "</a></div></div></div></article>"
          );
        })
        .join("");

      document.querySelectorAll("[data-focus-place]").forEach(function (button) {
        button.addEventListener("click", function () {
          focusPlace(button.getAttribute("data-focus-place"));
        });
      });
      HHK.utils.refreshIcons();
    }

    function drawBaseMap() {
      window.L.rectangle(imageBounds, {
        renderer: vectorRenderer,
        stroke: false,
        fillColor: "#eef5ed",
        fillOpacity: 1
      }).addTo(map);

      window.L.polygon(
        [
          [88, 4],
          [62, 14],
          [54, 34],
          [48, 54],
          [52, 78],
          [67, 98],
          [82, 118],
          [92, 150],
          [100, 160],
          [100, 0]
        ],
        {
          renderer: vectorRenderer,
          stroke: false,
          fillColor: "#cfe6d7",
          fillOpacity: 0.9
        }
      ).addTo(map);

      window.L.polygon(
        [
          [12, 16],
          [16, 42],
          [24, 58],
          [34, 70],
          [46, 82],
          [56, 98],
          [64, 114],
          [74, 132],
          [86, 148],
          [94, 158],
          [20, 160],
          [8, 128],
          [10, 76]
        ],
        {
          renderer: vectorRenderer,
          stroke: false,
          fillColor: "#2f8f79",
          fillOpacity: 0.28
        }
      ).addTo(map);

      window.L.polyline(
        [
          [14, 18],
          [17, 36],
          [24, 48],
          [32, 59],
          [42, 71],
          [51, 86],
          [59, 99],
          [69, 116],
          [80, 135],
          [90, 154]
        ],
        {
          renderer: vectorRenderer,
          color: "#2f8f79",
          weight: 24,
          lineCap: "round",
          lineJoin: "round",
          opacity: 0.62
        }
      ).addTo(map);

      window.L.polyline(
        [
          [15, 18],
          [18, 34],
          [25, 47],
          [34, 58],
          [43, 70],
          [52, 85],
          [60, 98],
          [70, 115],
          [81, 134],
          [90, 152]
        ],
        {
          renderer: vectorRenderer,
          color: "#eff9f6",
          weight: 8,
          lineCap: "round",
          lineJoin: "round",
          opacity: 0.95
        }
      ).addTo(map);

      window.L.polyline(
        [
          [34, 63],
          [40, 72],
          [48, 82],
          [56, 92],
          [64, 104]
        ],
        {
          renderer: vectorRenderer,
          color: "#eff9f6",
          weight: 5,
          lineCap: "round",
          lineJoin: "round",
          opacity: 0.9
        }
      ).addTo(map);

      window.L.polyline(
        [
          [30, 86],
          [37, 98],
          [44, 113],
          [54, 129]
        ],
        {
          renderer: vectorRenderer,
          color: "#eff9f6",
          weight: 4,
          lineCap: "round",
          lineJoin: "round",
          opacity: 0.86
        }
      ).addTo(map);

      window.L.rectangle(
        [
          [59, 43],
          [74, 61]
        ],
        {
          renderer: vectorRenderer,
          color: "#88a99d",
          weight: 2,
          fillColor: "#f7fbf9",
          fillOpacity: 0.94,
          radius: 2
        }
      ).addTo(map);

      [
        [63, 51],
        [67, 51],
        [71, 51]
      ].forEach(function (point) {
        window.L.circleMarker(point, {
          renderer: vectorRenderer,
          radius: 2.4,
          stroke: false,
          fillColor: "#cfe6d7",
          fillOpacity: 1
        }).addTo(map);
      });

      [
        {
          text: HHK.i18n.text({ zh: "入海口观景带", en: "Estuary View Belt" }),
          point: [17, 120]
        },
        {
          text: HHK.i18n.text({ zh: "游客服务区", en: "Visitor Hub" }),
          point: [79, 42]
        },
        {
          text: HHK.i18n.text({ zh: "滨水日落带", en: "Sunset Waterfront" }),
          point: [88, 114]
        }
      ].forEach(function (item) {
        window.L.marker(item.point, {
          interactive: false,
          icon: window.L.divIcon({
            className: "hhk-map-label",
            html:
              '<div style="padding:6px 10px;border-radius:999px;background:rgba(255,255,255,0.82);backdrop-filter:blur(10px);border:1px solid rgba(136,169,157,0.35);font-size:12px;font-weight:600;color:#224a46;white-space:nowrap;">' +
              HHK.utils.escapeHtml(item.text) +
              "</div>"
          })
        }).addTo(map);
      });
    }

    function initMap() {
      if (!window.L) {
        return;
      }
      map = window.L.map("leaflet-map", {
        crs: window.L.CRS.Simple,
        zoomControl: false,
        scrollWheelZoom: true,
        minZoom: -1.5,
        maxZoom: 2,
        zoomSnap: 0.1
      });
      vectorRenderer = window.L.canvas({ padding: 0.5 });

      drawBaseMap();
      map.fitBounds(imageBounds, { padding: [16, 16] });
      window.setTimeout(function () {
        map.invalidateSize();
        map.fitBounds(imageBounds, { padding: [16, 16] });
      }, 60);
      window.L.control.zoom({ position: "bottomright" }).addTo(map);
      map.on("popupopen", function () {
        HHK.utils.updateFavoriteButtons();
        HHK.utils.refreshIcons();
      });
      renderMarkers();
    }

    renderFrame();
    renderFilters();
    renderStats();
    renderList();
    initMap();
  };
})(window);
