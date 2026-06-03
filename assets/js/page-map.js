(function (window) {
  var HHK = (window.HHK = window.HHK || {});
  var mapNarratives = {
    heroTitle: {
      zh: "黄河口互动地图",
      en: "Yellow River Delta Interactive Map"
    },
    heroSubtitle: {
      zh: "把手绘湿地、路线高亮、实时筛选和目的地故事装进一张会呼吸的地图里，让黄河入海口既好看又好逛。",
      en: "A living map that blends wetland illustration, route stories, live filters, and place details into one polished exploration canvas."
    },
    stageLabel: {
      zh: "湿地插画探索图",
      en: "Illustrated Wetland Map"
    },
    highlightLabel: {
      zh: "热门路线已高亮",
      en: "Featured route highlighted"
    },
    locateButton: {
      zh: "定位到我",
      en: "Locate me"
    },
    fullscreenButton: {
      zh: "全屏",
      en: "Fullscreen"
    },
    exitFullscreenButton: {
      zh: "退出全屏",
      en: "Exit fullscreen"
    },
    emptyTitle: {
      zh: "点一点地图里的灵感点位",
      en: "Pick a place to start"
    },
    emptyText: {
      zh: "悬停可先看气泡预览，点击后右侧会滑入高清图片、详细介绍、评分热度和收藏分享操作。",
      en: "Hover for a preview, then click for high-res images, details, ratings, and actions."
    },
    visibleTitle: {
      zh: "当前可见点位",
      en: "Visible now"
    },
    visibleText: {
      zh: "横向滑动卡片流，点击即可把地图聚焦到对应点位。",
      en: "Swipe through cards and tap to focus the map."
    },
    routeTitle: {
      zh: "热门路线推荐",
      en: "Featured routes"
    },
    routeText: {
      zh: "点击后自动绘制路线，并高亮沿途重点点位。",
      en: "Tap to draw the route and spotlight every stop."
    },
    nearbyTitle: {
      zh: "附近热门点位",
      en: "Nearby hot picks"
    },
    nearbyText: {
      zh: "定位完成后，会按距离与热度推荐你附近最值得打卡的 3 个地方。",
      en: "After locating, the map suggests the three best nearby stops by distance and popularity."
    },
    whyTitle: {
      zh: "一句话推荐",
      en: "Why it stands out"
    },
    routeReady: {
      zh: "路线已绘制，途经点位已高亮。",
      en: "Route drawn and stops highlighted."
    },
    located: {
      zh: "已完成定位，并为你推荐附近 3 个热门点位。",
      en: "Located. Three nearby hot spots are ready."
    },
    copied: {
      zh: "详情链接已复制。",
      en: "Detail link copied."
    },
    copiedFailed: {
      zh: "当前环境不支持复制，请手动分享。",
      en: "Copy is unavailable here. Please share manually."
    },
    locateFallback: {
      zh: "未获取到精确定位，已为你推荐园区内热门点位。",
      en: "Precise location unavailable. Showing popular picks in the park instead."
    },
    featuredRoute: {
      zh: "精选路线",
      en: "Featured route"
    },
    visibleCount: {
      zh: "当前可见",
      en: "Visible"
    },
    serviceLabel: {
      zh: "游客服务中枢",
      en: "Visitor hub"
    },
    sunriseSummary: {
      zh: "追一场黄河入海日出，顺路看观鸟、木栈道与在地早餐。",
      en: "A sunrise-first route for estuary views, birding, boardwalks, and breakfast."
    },
    scienceSummary: {
      zh: "从生态展馆走到芦苇湿地与观鸟塔，更适合亲子和研学。",
      en: "An educational route spanning the discovery hall, reed marsh, and bird observatory."
    },
    sunsetSummary: {
      zh: "白天看湿地，傍晚拍晚霞，最后用一顿在地风味收尾。",
      en: "Wetlands by day, sunset by evening, and a slow local dinner to close the trip."
    }
  };

  HHK.pages.map = function () {
    var root = document.getElementById("page-root");
    var currentFilter = "all";
    var selectedRouteId = "sunrise-route";
    var activePlaceId = "";
    var activeGalleryIndex = 0;
    var currentNearby = [];
    var userLocationPoint = null;
    var map = null;
    var vectorRenderer = null;
    var markerLayerGroup = null;
    var routeLayerGroup = null;
    var decorLayerGroup = null;
    var userLayerGroup = null;
    var markers = {};
    var imageBounds = [
      [0, 0],
      [100, 160]
    ];
    var fallbackViewBox = {
      width: 1600,
      height: 1000
    };

    function text(entry) {
      return HHK.i18n.text(entry);
    }

    function escapeHtml(value) {
      return HHK.utils.escapeHtml(value);
    }

    function imageAttrs(image, alt) {
      return (
        HHK.utils.imageAttrs(image, alt) +
        ' loading="lazy" decoding="async" referrerpolicy="no-referrer"'
      );
    }

    function typeMeta(type) {
      if (type === "homestay") {
        return { emoji: "🏡", tone: "homestay" };
      }
      if (type === "food") {
        return { emoji: "🍴", tone: "food" };
      }
      return { emoji: "🌿", tone: "attraction" };
    }

    function popularityMeta(place) {
      if (place.popularity >= 94) {
        return {
          tone: "viral",
          label: text({ zh: "爆款热度", en: "Viral hot spot" })
        };
      }
      if (place.popularity >= 85) {
        return {
          tone: "hot",
          label: text({ zh: "高热推荐", en: "Highly recommended" })
        };
      }
      return {
        tone: "calm",
        label: text({ zh: "轻松漫游", en: "Relaxed stop" })
      };
    }

    function routeBlueprints() {
      return [
        {
          id: "sunrise-route",
          color: "#F4A261",
          icon: "🌅",
          title: { zh: "黄河入海观日出线", en: "Sunrise Estuary Route" },
          subtitle: mapNarratives.sunriseSummary,
          duration: { zh: "约 4.5 小时", en: "About 4.5 hours" },
          rhythm: { zh: "日出追光", en: "Sunrise rhythm" },
          stops: [
            "delta-estuary-boardwalk",
            "migration-observatory",
            "fisherman-kitchen"
          ]
        },
        {
          id: "science-route",
          color: "#2A9D8F",
          icon: "🦆",
          title: { zh: "湿地生态科普线", en: "Wetland Ecology Route" },
          subtitle: mapNarratives.scienceSummary,
          duration: { zh: "约 5 小时", en: "About 5 hours" },
          rhythm: { zh: "亲子研学", en: "Family learning" },
          stops: [
            "delta-museum",
            "reed-marsh-trail",
            "migration-observatory",
            "estuary-lodge"
          ]
        },
        {
          id: "sunset-route",
          color: "#5FB7A4",
          icon: "🌇",
          title: { zh: "黄河口慢享日落线", en: "Estuary Slow-Life Route" },
          subtitle: mapNarratives.sunsetSummary,
          duration: { zh: "约 6 小时", en: "About 6 hours" },
          rhythm: { zh: "日落氛围", en: "Sunset mood" },
          stops: [
            "reed-marsh-trail",
            "sunset-pier",
            "delta-flavor-house",
            "reed-suite"
          ]
        }
      ];
    }

    function selectedRoute() {
      var list = routeBlueprints();
      var match = list.find(function (item) {
        return item.id === selectedRouteId;
      });
      return match || list[0];
    }

    function filteredPlaces() {
      return HHK.data.places.filter(function (place) {
        return currentFilter === "all" ? true : place.type === currentFilter;
      });
    }

    function averageRating(items) {
      if (!items.length) {
        return 0;
      }
      return (
        items.reduce(function (sum, item) {
          return sum + item.rating;
        }, 0) / items.length
      );
    }

    function mapPoint(place) {
      return [place.mapPoint.y / 10, place.mapPoint.x / 10];
    }

    function mapPointFromRaw(point) {
      return [point.y / 10, point.x / 10];
    }

    function rawMapPoint(place) {
      return {
        x: place.mapPoint.x,
        y: place.mapPoint.y
      };
    }

    function routePoints(route) {
      return route.stops
        .map(HHK.utils.getPlaceById)
        .filter(Boolean)
        .map(mapPoint);
    }

    function routeRawPoints(route) {
      return route.stops
        .map(HHK.utils.getPlaceById)
        .filter(Boolean)
        .map(rawMapPoint);
    }

    function fallbackPercentX(value) {
      return ((value / fallbackViewBox.width) * 100).toFixed(2) + "%";
    }

    function fallbackPercentY(value) {
      return ((value / fallbackViewBox.height) * 100).toFixed(2) + "%";
    }

    function fallbackGuideLabels() {
      return [
        { x: 500, y: 700, text: mapNarratives.serviceLabel }
      ]
        .map(function (item) {
          return (
            '<div class="fallback-map-guide-label" style="left:' +
            fallbackPercentX(item.x) +
            ";top:" +
            fallbackPercentY(item.y) +
            ';">' +
            escapeHtml(text(item.text)) +
            "</div>"
          );
        })
        .join("");
    }

    function fallbackMapSvg(route) {
      var points = routeRawPoints(route);
      var routePath = points
        .map(function (point) {
          return point.x + "," + point.y;
        })
        .join(" ");

      return (
        '<svg class="fallback-map-svg" viewBox="0 0 ' +
        fallbackViewBox.width +
        " " +
        fallbackViewBox.height +
        '" preserveAspectRatio="none" aria-hidden="true">' +
        /* Sky gradient */
        '<defs><linearGradient id="fallback-sky" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#D6EEF0" stop-opacity="0.7"/>' +
        '<stop offset="100%" stop-color="#E6F4F1" stop-opacity="0"/>' +
        '</linearGradient><linearGradient id="fallback-ocean" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0%" stop-color="#A8D8C8" stop-opacity="0.65"/>' +
        '<stop offset="100%" stop-color="#8CC8B8" stop-opacity="0.5"/>' +
        '</linearGradient></defs>' +
        /* Sky */
        '<rect x="0" y="0" width="1600" height="190" fill="url(#fallback-sky)"/>' +
        /* Sun glow */
        '<circle cx="1440" cy="128" r="144" fill="#F7D8A6" opacity="0.8"/>' +
        '<circle cx="1440" cy="128" r="224" fill="#FFF1D8" opacity="0.25"/>' +
        /* Ocean */
        '<path class="fallback-map-coast" d="M0 800Q200 760 400 740Q600 720 800 730Q1000 740 1200 760Q1400 790 1600 830V1000H0Z" fill="url(#fallback-ocean)"/>' +
        /* Coastal wetland */
        '<path class="fallback-map-marsh" d="M0 560Q200 520 400 500Q600 490 800 510Q1000 540 1200 600Q1400 680 1600 780L1600 830Q1400 790 1200 760Q1000 740 800 730Q600 720 400 740Q200 760 0 800Z" fill="#CFE9E1" opacity="0.75"/>' +
        /* Sandy area */
        '<path class="fallback-map-sand" d="M400 320Q600 300 800 310Q1000 340 1200 400Q1400 480 1600 600L1600 680Q1400 560 1200 460Q1000 380 800 350Q600 330 400 350Z" fill="#F0E5C8" opacity="0.55"/>' +
        /* Reed marsh vegetation */
        '<path class="fallback-map-marsh" d="M0 120Q100 160 200 200Q300 240 400 260Q500 270 520 250Q480 230 400 200Q300 170 200 130Q100 100 0 80Z" fill="#7CC0A8" opacity="0.65"/>' +
        '<path d="M160 128Q260 168 360 208Q420 232 440 248Q400 256 340 232Q260 200 180 160Q140 144 160 128Z" fill="#8ED4B8" opacity="0.6"/>' +
        /* River shadow */
        '<path class="fallback-map-river-shadow" d="M0 480Q100 500 200 540Q400 600 600 680Q800 760 1000 840Q1200 920 1400 960Q1500 980 1600 1000" stroke="#6CC0B1" stroke-width="48" stroke-linecap="round" fill="none" opacity="0.15"/>' +
        /* River main */
        '<path class="fallback-map-river-main" d="M0 480Q100 500 200 540Q400 600 600 680Q800 760 1000 840Q1200 920 1400 960Q1500 980 1600 1000" stroke="#6CC0B1" stroke-width="30" stroke-linecap="round" fill="none" opacity="0.85"/>' +
        /* River core */
        '<path class="fallback-map-river-core" d="M0 480Q100 500 200 540Q400 600 600 680Q800 760 1000 840Q1200 920 1400 960Q1500 980 1600 1000" stroke="#F5FFFC" stroke-width="10" stroke-linecap="round" fill="none" opacity="0.92"/>' +
        /* Tidal channels */
        '<path d="M200 640Q350 600 500 580Q650 560 760 568" stroke="#95CFC2" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.5" stroke-dasharray="10 14"/>' +
        '<path d="M300 720Q440 680 580 660Q720 640 830 648" stroke="#95CFC2" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.45" stroke-dasharray="10 14"/>' +
        /* Trees / vegetation clusters */
        '<circle cx="448" cy="720" r="16" fill="#5DB88C" opacity="0.7"/>' +
        '<circle cx="496" cy="720" r="14" fill="#6DC4A0" opacity="0.65"/>' +
        '<circle cx="544" cy="720" r="12" fill="#7BC8A8" opacity="0.6"/>' +
        '<circle cx="480" cy="680" r="10" fill="#9BCF96" opacity="0.55"/>' +
        /* Water shimmer lines */
        '<line x1="880" y1="840" x2="1000" y2="832" stroke="#B5E5D8" stroke-width="2" opacity="0.4" stroke-dasharray="6 10"/>' +
        '<line x1="960" y1="880" x2="1100" y2="872" stroke="#B5E5D8" stroke-width="2" opacity="0.35" stroke-dasharray="6 10"/>' +
        '<line x1="1040" y1="920" x2="1180" y2="912" stroke="#B5E5D8" stroke-width="2" opacity="0.3" stroke-dasharray="6 10"/>' +
        /* Clouds */
        '<g opacity="0.35"><ellipse cx="400" cy="80" rx="60" ry="20" fill="#fff"/>' +
        '<ellipse cx="440" cy="72" rx="40" ry="16" fill="#fff"/></g>' +
        '<g opacity="0.25"><ellipse cx="900" cy="60" rx="48" ry="16" fill="#fff"/>' +
        '<ellipse cx="930" cy="54" rx="32" ry="12" fill="#fff"/></g>' +
        /* Birds */
        '<text x="380" y="400" font-size="28" opacity="0.5">🕊️</text>' +
        '<text x="430" y="420" font-size="22" opacity="0.4">🕊️</text>' +
        '<text x="350" y="380" font-size="20" opacity="0.35">🕊️</text>' +
        /* Wave decorations */
        '<text x="880" y="870" font-size="16" opacity="0.4">〰️</text>' +
        '<text x="1020" y="910" font-size="16" opacity="0.35">〰️</text>' +
        (routePath
          ? '<polyline class="fallback-map-route-glow" style="--route-color:' +
            route.color +
            ';" points="' +
            routePath +
            '"></polyline><polyline class="fallback-map-route-line" style="--route-color:' +
            route.color +
            ';" points="' +
            routePath +
            '"></polyline>' +
            points
              .map(function (point, index) {
                return (
                  '<circle class="fallback-map-route-stop" style="--route-color:' +
                  route.color +
                  ';" cx="' +
                  point.x +
                  '" cy="' +
                  point.y +
                  '" r="13"></circle>' +
                  '<text class="fallback-map-route-stop-index" x="' +
                  point.x +
                  '" y="' +
                  (point.y + 4) +
                  '" text-anchor="middle" font-size="11" font-weight="700">' +
                  (index + 1) +
                  "</text>"
                );
              })
              .join("")
          : "") +
        "</svg>"
      );
    }

    function fallbackMarkerMarkup(place) {
      var meta = typeMeta(place.type);
      var point = rawMapPoint(place);
      var title = escapeHtml(text(place.title));

      return (
        '<button type="button" data-place-focus="' +
        place.id +
        '" class="fallback-map-marker-button ' +
        (activePlaceId === place.id ? "is-active " : "") +
        (selectedRoute().stops.indexOf(place.id) > -1 ? "is-route-stop" : "") +
        '" style="left:' +
        fallbackPercentX(point.x) +
        ";top:" +
        fallbackPercentY(point.y) +
        ';" title="' +
        title +
        '">' +
        '<span class="map-poi-shell ' +
        meta.tone +
        '" data-place-id="' +
        place.id +
        '">' +
        '<span class="map-poi-pulse"></span>' +
        '<span class="map-poi-core">' +
        meta.emoji +
        "</span></span>" +
        '<span class="fallback-map-marker-label">' +
        title +
        "</span></button>"
      );
    }

    function fallbackUserMarkup() {
      if (!userLocationPoint) {
        return "";
      }

      return (
        '<div class="fallback-map-user" style="left:' +
        fallbackPercentX(userLocationPoint.x) +
        ";top:" +
        fallbackPercentY(userLocationPoint.y) +
        ';">' +
        '<div class="map-user-ring"></div>' +
        '<div class="map-user-pulse"></div>' +
        '<div class="map-user-core"></div>' +
        "</div>"
      );
    }

    function renderFallbackMap() {
      var mapNode = document.getElementById("leaflet-map");
      var route = selectedRoute();

      if (!mapNode) {
        return;
      }

      mapNode.innerHTML =
        '<div class="fallback-map-surface" style="--route-color:' +
        route.color +
        ';">' +
        fallbackMapSvg(route) +
        '<div class="fallback-map-labels">' +
        fallbackGuideLabels() +
        '</div><div class="fallback-map-layer">' +
        filteredPlaces().map(fallbackMarkerMarkup).join("") +
        fallbackUserMarkup() +
        "</div></div>";
    }

    function allPlaceExtents() {
      return HHK.data.places.reduce(
        function (acc, place) {
          acc.minLat = Math.min(acc.minLat, place.coordinates.lat);
          acc.maxLat = Math.max(acc.maxLat, place.coordinates.lat);
          acc.minLng = Math.min(acc.minLng, place.coordinates.lng);
          acc.maxLng = Math.max(acc.maxLng, place.coordinates.lng);
          acc.minX = Math.min(acc.minX, place.mapPoint.x);
          acc.maxX = Math.max(acc.maxX, place.mapPoint.x);
          acc.minY = Math.min(acc.minY, place.mapPoint.y);
          acc.maxY = Math.max(acc.maxY, place.mapPoint.y);
          return acc;
        },
        {
          minLat: Infinity,
          maxLat: -Infinity,
          minLng: Infinity,
          maxLng: -Infinity,
          minX: Infinity,
          maxX: -Infinity,
          minY: Infinity,
          maxY: -Infinity
        }
      );
    }

    function geoToMapPoint(coords) {
      var extents = allPlaceExtents();
      var lngRatio = (coords.lng - extents.minLng) / (extents.maxLng - extents.minLng || 1);
      var latRatio = (extents.maxLat - coords.lat) / (extents.maxLat - extents.minLat || 1);
      var x = extents.minX + lngRatio * (extents.maxX - extents.minX);
      var y = extents.minY + latRatio * (extents.maxY - extents.minY);
      return {
        x: Math.max(100, Math.min(1500, x)),
        y: Math.max(80, Math.min(940, y))
      };
    }

    function statDefinitions(items) {
      var topPopularity = items.length
        ? Math.max.apply(
            null,
            items.map(function (item) {
              return item.popularity;
            })
          )
        : 0;

      return [
        {
          icon: "📍",
          label: text({ zh: "点位数量", en: "POIs" }),
          helper: text({ zh: "当前筛选结果", en: "Current filter result" }),
          value: items.length,
          decimals: 0
        },
        {
          icon: "⭐",
          label: text({ zh: "平均评分", en: "Avg rating" }),
          helper: text({ zh: "口碑浓度", en: "Review quality" }),
          value: averageRating(items),
          decimals: 1
        },
        {
          icon: "🔥",
          label: text({ zh: "最高热度", en: "Top heat" }),
          helper: text({ zh: "爆款指数", en: "Buzz index" }),
          value: topPopularity,
          decimals: 0
        }
      ];
    }

    function animateStatValue(node, target, decimals) {
      var duration = 560;
      var start = null;

      function frame(timestamp) {
        if (!start) {
          start = timestamp;
        }
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Number(target) * eased;
        node.textContent = decimals ? current.toFixed(decimals) : Math.round(current);
        if (progress < 1) {
          window.requestAnimationFrame(frame);
        } else {
          node.textContent = decimals ? Number(target).toFixed(decimals) : String(target);
        }
      }

      window.requestAnimationFrame(frame);
    }

    function renderFrame() {
      root.innerHTML =
        '<section class="container-shell pt-6 md:pt-10">' +
        '<div class="map-experience-shell rounded-[38px] p-5 md:p-8">' +
        '<div class="map-hero-band flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">' +
        '<div class="max-w-4xl">' +
        '<span class="map-kicker">Leaflet · Wetland Storyboard</span>' +
        '<h1 class="mt-4 font-display text-3xl font-semibold text-slate-900 dark:text-white md:text-5xl">' +
        escapeHtml(text(mapNarratives.heroTitle)) +
        "</h1>" +
        '<p class="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">' +
        escapeHtml(text(mapNarratives.heroSubtitle)) +
        "</p>" +
        '<div class="map-hero-highlights mt-5 flex flex-wrap gap-3">' +
        '<span class="map-hero-pill">🌊 ' +
        escapeHtml(text({ zh: "扁平插画湿地底图", en: "Illustrated estuary basemap" })) +
        "</span>" +
        '<span class="map-hero-pill">✨ ' +
        escapeHtml(text({ zh: "动态筛选与浮层预览", en: "Animated filters and hover previews" })) +
        "</span>" +
        '<span class="map-hero-pill">📌 ' +
        escapeHtml(text({ zh: "定位推荐附近热门点位", en: "Nearby hot picks after locating" })) +
        "</span>" +
        "</div></div>" +
        '<div id="map-filters" class="flex flex-wrap gap-2"></div>' +
        "</div>" +
        '<div class="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.18fr)_380px]">' +
        '<div class="min-w-0">' +
        '<div id="map-stage-shell" class="map-stage-shell overflow-hidden rounded-[34px]">' +
        '<div class="map-stage-topbar flex flex-wrap items-start justify-between gap-4">' +
        '<div class="flex flex-wrap items-center gap-2">' +
        '<span class="map-stage-chip">' +
        escapeHtml(text(mapNarratives.stageLabel)) +
        '</span><span id="selected-route-badge" class="map-stage-chip accent"></span>' +
        '<span class="map-stage-chip muted">' +
        escapeHtml(text(mapNarratives.highlightLabel)) +
        "</span></div>" +
        '<div class="flex flex-wrap items-center gap-2">' +
        '<button type="button" data-map-control="locate" class="map-tool-button"><span>📍</span><span>' +
        escapeHtml(text(mapNarratives.locateButton)) +
        '</span></button>' +
        '<button type="button" data-map-control="fullscreen" class="map-tool-button"><i data-lucide="maximize" class="h-4 w-4"></i><span>' +
        escapeHtml(text(mapNarratives.fullscreenButton)) +
        "</span></button></div></div>" +
        '<div class="relative">' +
        '<div id="map-loading" class="map-loading-overlay">' +
        '<div class="map-loading-card">' +
        '<div class="skeleton skeleton-badge"></div>' +
        '<div class="mt-4 skeleton skeleton-title"></div>' +
        '<div class="mt-3 skeleton skeleton-line"></div>' +
        '<div class="mt-2 skeleton skeleton-line short"></div>' +
        '<div class="mt-6 skeleton skeleton-map"></div>' +
        "</div></div>" +
        '<div id="leaflet-map" class="h-[620px] w-full md:h-[700px]"></div>' +
        '<aside id="map-detail-panel" class="map-detail-panel">' +
        '<div class="map-panel-empty">' +
        '<div class="map-panel-empty-icon">🌿</div>' +
        '<h2 class="mt-4 font-display text-2xl font-semibold text-slate-900 dark:text-white">' +
        escapeHtml(text(mapNarratives.emptyTitle)) +
        "</h2>" +
        '<p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">' +
        escapeHtml(text(mapNarratives.emptyText)) +
        "</p>" +
        "</div></aside></div></div>" +
        '<div class="map-route-section mt-6 glass-card rounded-[28px] p-5">' +
        '<div class="mb-4 flex items-center justify-between gap-4">' +
        "<div>" +
        '<h2 class="font-display text-xl font-semibold text-slate-900 dark:text-white">' +
        escapeHtml(text(mapNarratives.routeTitle)) +
        "</h2>" +
        '<p class="mt-1 text-sm text-slate-500 dark:text-slate-300">' +
        escapeHtml(text(mapNarratives.routeText)) +
        '</p></div><span class="badge-soft">3</span></div>' +
        '<div id="route-recommendations" class="map-route-grid"></div></div></div>' +
        '<aside class="map-side-column min-w-0 space-y-5">' +
        '<div id="map-stats" class="grid gap-4 sm:grid-cols-3 xl:grid-cols-1"></div>' +
        '<div class="glass-card rounded-[28px] p-5">' +
        '<div class="mb-4 flex items-center justify-between gap-4">' +
        "<div>" +
        '<h2 class="font-display text-xl font-semibold text-slate-900 dark:text-white">' +
        escapeHtml(text(mapNarratives.visibleTitle)) +
        "</h2>" +
        '<p class="mt-1 text-sm text-slate-500 dark:text-slate-300">' +
        escapeHtml(text(mapNarratives.visibleText)) +
        '</p></div><span id="visible-count" class="badge-soft"></span></div>' +
        '<div id="map-visible-strip" class="map-visible-strip"></div></div>' +
        '<div id="nearby-panel" class="glass-card hidden rounded-[28px] p-5"></div>' +
        "</aside></div></div></section>" +
        '<div id="map-drawer-backdrop" class="map-drawer-backdrop"></div>';
    }

    function renderFilters() {
      var filterRoot = document.getElementById("map-filters");
      var definitions = [
        { id: "all", icon: "🧭", label: HHK.i18n.t("all"), count: HHK.data.places.length },
        {
          id: "attraction",
          icon: "🌿",
          label: HHK.i18n.t("attraction"),
          count: HHK.data.places.filter(function (place) { return place.type === "attraction"; }).length
        },
        {
          id: "homestay",
          icon: "🏡",
          label: HHK.i18n.t("homestay"),
          count: HHK.data.places.filter(function (place) { return place.type === "homestay"; }).length
        },
        {
          id: "food",
          icon: "🍴",
          label: HHK.i18n.t("food"),
          count: HHK.data.places.filter(function (place) { return place.type === "food"; }).length
        }
      ];

      filterRoot.innerHTML = definitions
        .map(function (item) {
          return (
            '<button type="button" data-map-filter="' +
            item.id +
            '" class="map-filter-pill ' +
            (item.id === currentFilter ? "is-active" : "") +
            '">' +
            '<span class="map-filter-pill-icon">' +
            item.icon +
            '</span><span>' +
            escapeHtml(item.label) +
            '</span><span class="map-filter-pill-count">' +
            item.count +
            "</span></button>"
          );
        })
        .join("");
    }

    function renderStats() {
      var statsRoot = document.getElementById("map-stats");
      var items = filteredPlaces();
      statsRoot.innerHTML = statDefinitions(items)
        .map(function (item) {
          return (
            '<article class="map-stat-card rounded-[28px] p-5">' +
            '<div class="flex items-center justify-between gap-4">' +
            '<span class="map-stat-icon">' +
            item.icon +
            '</span>' +
            '<div class="text-right">' +
            '<div class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">' +
            escapeHtml(item.label) +
            '</div><div class="mt-1 text-xs text-slate-500 dark:text-slate-300">' +
            escapeHtml(item.helper) +
            "</div></div></div>" +
            '<div class="mt-4 flex items-end gap-2">' +
            '<div data-stat-target="' +
            item.value +
            '" data-stat-decimals="' +
            item.decimals +
            '" class="font-display text-4xl font-semibold text-slate-900 dark:text-white">0</div>' +
            '<span class="pb-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Live</span>' +
            "</div></article>"
          );
        })
        .join("");

      statsRoot.querySelectorAll("[data-stat-target]").forEach(function (node) {
        animateStatValue(
          node,
          Number(node.getAttribute("data-stat-target")),
          Number(node.getAttribute("data-stat-decimals"))
        );
      });
    }

    function visibleCountLabel(count) {
      return escapeHtml(text(mapNarratives.visibleCount)) + " · " + count;
    }

    function renderVisibleStrip() {
      var stripRoot = document.getElementById("map-visible-strip");
      var items = filteredPlaces();
      var countNode = document.getElementById("visible-count");
      if (countNode) {
        countNode.textContent = visibleCountLabel(items.length);
      }

      stripRoot.innerHTML = items
        .map(function (place) {
          var meta = typeMeta(place.type);
          return (
            '<button type="button" data-place-focus="' +
            place.id +
            '" class="map-strip-card ' +
            (activePlaceId === place.id ? "is-active" : "") +
            '">' +
            '<div class="map-strip-thumb overflow-hidden rounded-[20px]">' +
            '<img ' +
            imageAttrs(place.image, text(place.title)) +
            ' class="h-full w-full object-cover" />' +
            "</div>" +
            '<div class="mt-4 flex items-center justify-between gap-3">' +
            '<span class="map-strip-type ' +
            meta.tone +
            '">' +
            meta.emoji +
            '</span><span class="map-strip-rating">⭐ ' +
            place.rating.toFixed(1) +
            "</span></div>" +
            '<div class="mt-3 font-semibold text-slate-900 dark:text-white">' +
            escapeHtml(text(place.title)) +
            '</div><p class="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-300">' +
            escapeHtml(text(place.region)) +
            "</p></button>"
          );
        })
        .join("");
    }

    function renderRoutes() {
      var routeRoot = document.getElementById("route-recommendations");
      var badge = document.getElementById("selected-route-badge");
      var activeRoute = selectedRoute();
      if (badge) {
        badge.textContent = activeRoute.icon + " " + text(activeRoute.title);
      }

      routeRoot.innerHTML = routeBlueprints()
        .map(function (route) {
          return (
            '<button type="button" data-route-id="' +
            route.id +
            '" class="route-chip-card ' +
            (route.id === selectedRouteId ? "is-active" : "") +
            '" style="--route-accent:' +
            route.color +
            ';">' +
            '<div class="flex items-start justify-between gap-4">' +
            '<div>' +
            '<div class="text-sm font-semibold text-slate-900 dark:text-white">' +
            route.icon +
            " " +
            escapeHtml(text(route.title)) +
            '</div><p class="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">' +
            escapeHtml(text(route.subtitle)) +
            "</p></div>" +
            '<span class="route-chip-emoji">' +
            route.stops.length +
            "</span></div>" +
            '<div class="route-chip-meta mt-4">' +
            '<span>' +
            escapeHtml(text(route.duration)) +
            '</span><span>·</span><span>' +
            escapeHtml(text(route.rhythm)) +
            '</span><span>·</span><span>' +
            escapeHtml(text({ zh: "途经 " + route.stops.length + " 个点位", en: route.stops.length + " stops" })) +
            "</span></div></button>"
          );
        })
        .join("");
    }

    function renderNearbyPanel() {
      var panel = document.getElementById("nearby-panel");
      if (!panel) {
        return;
      }

      if (!currentNearby.length) {
        panel.classList.add("hidden");
        panel.innerHTML = "";
        return;
      }

      panel.classList.remove("hidden");
      panel.innerHTML =
        '<div class="mb-4 flex items-center justify-between gap-4">' +
        "<div>" +
        '<h2 class="font-display text-xl font-semibold text-slate-900 dark:text-white">' +
        escapeHtml(text(mapNarratives.nearbyTitle)) +
        "</h2>" +
        '<p class="mt-1 text-sm text-slate-500 dark:text-slate-300">' +
        escapeHtml(text(mapNarratives.nearbyText)) +
        '</p></div><span class="badge-soft">3</span></div>' +
        currentNearby
          .map(function (place, index) {
            var meta = typeMeta(place.type);
            return (
              '<button type="button" data-place-focus="' +
              place.id +
              '" class="nearby-card">' +
              '<div class="nearby-rank">' +
              (index + 1) +
              "</div>" +
              '<img ' +
              imageAttrs(place.image, text(place.title)) +
              ' class="h-16 w-16 rounded-[18px] object-cover" />' +
              '<div class="min-w-0 flex-1 text-left">' +
              '<div class="flex items-center gap-2">' +
              '<span class="map-strip-type ' +
              meta.tone +
              '">' +
              meta.emoji +
              '</span><span class="font-semibold text-slate-900 dark:text-white">' +
              escapeHtml(text(place.title)) +
              '</span></div><p class="mt-1 text-sm text-slate-500 dark:text-slate-300">' +
              escapeHtml(popularityMeta(place).label) +
              "</p></div>" +
              '<span class="nearby-rating">⭐ ' +
              place.rating.toFixed(1) +
              "</span></button>"
            );
          })
          .join("");
    }

    function previewMarkup(place) {
      var meta = typeMeta(place.type);
      return (
        '<div class="map-preview-card">' +
        '<div class="map-preview-thumb overflow-hidden rounded-[18px]">' +
        '<img ' +
        imageAttrs(place.image, text(place.title)) +
        ' class="h-full w-full object-cover" />' +
        "</div>" +
        '<div class="min-w-0 flex-1">' +
        '<div class="flex items-start justify-between gap-3">' +
        '<div class="font-semibold text-slate-900">' +
        escapeHtml(text(place.title)) +
        '</div><span class="map-preview-score">⭐ ' +
        place.rating.toFixed(1) +
        "</span></div>" +
        '<p class="mt-1 text-xs text-slate-500">' +
        escapeHtml(text(place.region)) +
        '</p><div class="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-slate-600">' +
        '<span>' +
        meta.emoji +
        "</span><span>" +
        escapeHtml(HHK.utils.getTypeKey(place.type)) +
        "</span></div></div></div>"
      );
    }

    function createMarker(place) {
      var meta = typeMeta(place.type);
      var marker = window.L.marker(mapPoint(place), {
        riseOnHover: true,
        keyboard: false,
        icon: window.L.divIcon({
          className: "hhk-div-icon-map",
          html:
            '<div class="map-poi-shell ' +
            meta.tone +
            '" data-place-id="' +
            place.id +
            '">' +
            '<span class="map-poi-pulse"></span>' +
            '<span class="map-poi-core">' +
            meta.emoji +
            "</span></div>",
          iconSize: [58, 58],
          iconAnchor: [29, 29],
          tooltipAnchor: [0, -32]
        })
      });

      marker
        .bindTooltip(previewMarkup(place), {
          direction: "top",
          offset: [0, -28],
          opacity: 1,
          className: "map-preview-tooltip"
        })
        .on("mouseover", function () {
          marker.openTooltip();
        })
        .on("mouseout", function () {
          marker.closeTooltip();
        })
        .on("click", function () {
          openInfoPanel(place.id);
        });

      marker.addTo(markerLayerGroup);
      return marker;
    }

    function renderMarkers() {
      if (!window.L) {
        markers = {};
        renderFallbackMap();
        window.requestAnimationFrame(syncMarkerStates);
        return;
      }

      if (!map || !markerLayerGroup) {
        return;
      }

      markerLayerGroup.clearLayers();
      markers = {};
      filteredPlaces().forEach(function (place) {
        markers[place.id] = createMarker(place);
      });
      window.requestAnimationFrame(syncMarkerStates);
    }

    function syncMarkerStates() {
      var route = selectedRoute();

      if (!window.L) {
        document.querySelectorAll(".fallback-map-marker-button").forEach(function (button) {
          var placeId = button.getAttribute("data-place-focus");
          var icon = button.querySelector(".map-poi-shell");
          var active = placeId === activePlaceId;
          var routeStop = route.stops.indexOf(placeId) > -1;

          button.classList.toggle("is-active", active);
          button.classList.toggle("is-route-stop", routeStop);
          if (icon) {
            icon.classList.toggle("is-active", active);
            icon.classList.toggle("is-route-stop", routeStop);
          }
        });
        return;
      }

      Object.keys(markers).forEach(function (placeId) {
        var marker = markers[placeId];
        var icon = marker && marker._icon ? marker._icon.querySelector(".map-poi-shell") : null;
        if (!icon) {
          return;
        }
        icon.classList.toggle("is-active", placeId === activePlaceId);
        icon.classList.toggle("is-route-stop", route.stops.indexOf(placeId) > -1);
      });
    }

    function navigationHref(place) {
      return (
        "https://uri.amap.com/navigation?to=" +
        place.coordinates.lng +
        "," +
        place.coordinates.lat +
        "," +
        encodeURIComponent(text(place.title)) +
        "&mode=car&policy=1&src=yellow-river-delta-theme-park"
      );
    }

    function detailGallery(place) {
      var gallery = place.gallery && place.gallery.length ? place.gallery : [place.image];
      return gallery.slice(0, 4);
    }

    function panelHeroImage(place) {
      var gallery = detailGallery(place);
      return gallery[activeGalleryIndex] || gallery[0];
    }

    function detailMetrics(place) {
      return [
        {
          label: text({ zh: "推荐停留", en: "Suggested stay" }),
          value: text({ zh: place.stayHours + " 小时", en: place.stayHours + "h" })
        },
        {
          label: text({ zh: "开放时间", en: "Open hours" }),
          value: place.openHours
        },
        {
          label: text({ zh: "参考价格", en: "Reference price" }),
          value: text(place.price)
        }
      ];
    }

    function infoPanelMarkup(place) {
      var meta = typeMeta(place.type);
      var popularity = popularityMeta(place);
      var gallery = detailGallery(place);
      var heroImage = panelHeroImage(place);
      var tags = (place.tags || [])
        .slice(0, 3)
        .map(function (tag) {
          return '<span class="badge-soft">' + escapeHtml(text(tag)) + "</span>";
        })
        .join("");

      return (
        '<div class="map-panel-inner">' +
        '<div class="flex items-start justify-between gap-4">' +
        "<div>" +
        '<span class="map-panel-type ' +
        meta.tone +
        '">' +
        meta.emoji +
        " " +
        escapeHtml(HHK.utils.getTypeKey(place.type)) +
        "</span>" +
        '<h2 class="mt-4 font-display text-2xl font-semibold text-slate-900 dark:text-white">' +
        escapeHtml(text(place.title)) +
        '</h2><p class="mt-2 text-sm text-slate-500 dark:text-slate-300">' +
        escapeHtml(text(place.region)) +
        "</p></div>" +
        '<button type="button" data-panel-close="true" class="map-panel-close">' +
        '<i data-lucide="x" class="h-4 w-4"></i></button></div>' +
        '<div class="map-panel-hero mt-5 overflow-hidden rounded-[28px]">' +
        '<img ' +
        imageAttrs(heroImage, text(place.title)) +
        ' class="h-full w-full object-cover" />' +
        '<div class="map-panel-overlay">' +
        '<span class="map-panel-pill">⭐ ' +
        place.rating.toFixed(1) +
        '</span><span class="map-panel-pill">🔥 ' +
        place.popularity +
        "</span></div></div>" +
        '<div class="map-panel-gallery mt-3">' +
        gallery
          .map(function (image, index) {
            return (
              '<button type="button" data-panel-image-index="' +
              index +
              '" class="map-panel-gallery-thumb ' +
              (index === activeGalleryIndex ? "is-active" : "") +
              '">' +
              '<img ' +
              imageAttrs(image, text(place.title)) +
              ' class="h-full w-full object-cover" />' +
              "</button>"
            );
          })
          .join("") +
        "</div>" +
        '<div class="mt-5 flex flex-wrap gap-2">' +
        tags +
        '<span class="badge-soft map-hot-badge ' +
        popularity.tone +
        '">' +
        escapeHtml(popularity.label) +
        "</span></div>" +
        '<p class="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">' +
        escapeHtml(text(place.description || place.summary)) +
        "</p>" +
        '<div class="mt-5 grid gap-3 sm:grid-cols-3">' +
        detailMetrics(place)
          .map(function (item) {
            return (
              '<div class="map-detail-metric">' +
              '<span>' +
              escapeHtml(item.label) +
              '</span><strong>' +
              escapeHtml(item.value) +
              "</strong></div>"
            );
          })
          .join("") +
        "</div>" +
        '<div class="mt-6 grid gap-3 sm:grid-cols-3">' +
        '<a target="_blank" rel="noreferrer" href="' +
        navigationHref(place) +
        '" class="map-action-button primary">' +
        '<i data-lucide="navigation" class="h-4 w-4"></i><span>' +
        escapeHtml(text({ zh: "导航", en: "Navigate" })) +
        "</span></a>" +
        HHK.utils.renderFavoriteButton(place.id) +
        '<button type="button" data-panel-share="' +
        place.id +
        '" class="map-action-button">' +
        '<i data-lucide="share-2" class="h-4 w-4"></i><span>' +
        escapeHtml(text({ zh: "分享", en: "Share" })) +
        "</span></button></div>" +
        '<div class="mt-6 rounded-[22px] border border-white/18 bg-white/72 p-4 dark:bg-slate-950/55">' +
        '<div class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">' +
        escapeHtml(text(mapNarratives.whyTitle)) +
        '</div><p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">' +
        escapeHtml(text(place.summary)) +
        '</p><a href="' +
        HHK.utils.placeHref(place) +
        '" class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 dark:text-brand-200">' +
        escapeHtml(HHK.i18n.t("viewDetails")) +
        '<i data-lucide="arrow-up-right" class="h-4 w-4"></i></a></div></div>'
      );
    }

    function openInfoPanel(placeId) {
      var panel = document.getElementById("map-detail-panel");
      var backdrop = document.getElementById("map-drawer-backdrop");
      var place = HHK.utils.getPlaceById(placeId);
      if (!panel || !place) {
        return;
      }

      if (activePlaceId !== placeId) {
        activeGalleryIndex = 0;
      }
      activePlaceId = placeId;
      panel.innerHTML = infoPanelMarkup(place);
      panel.classList.add("is-open");
      syncMarkerStates();
      renderVisibleStrip();
      HHK.utils.refreshIcons();
      HHK.utils.updateFavoriteButtons();
    }

    function closeInfoPanel() {
      var panel = document.getElementById("map-detail-panel");
      var backdrop = document.getElementById("map-drawer-backdrop");
      if (!panel) {
        return;
      }

      activePlaceId = "";
      activeGalleryIndex = 0;
      panel.classList.remove("is-open");
      syncMarkerStates();
      renderVisibleStrip();
    }

    function pulseStage() {
      var stage = document.getElementById("map-stage-shell");
      if (!stage) {
        return;
      }
      stage.classList.remove("is-refreshing");
      window.requestAnimationFrame(function () {
        stage.classList.add("is-refreshing");
        window.setTimeout(function () {
          stage.classList.remove("is-refreshing");
        }, 320);
      });
    }

    function drawBaseMap() {
      if (!map || !decorLayerGroup) {
        return;
      }

      decorLayerGroup.clearLayers();

      /* ====== LAYER 1: Background sky & terrain ====== */
      window.L.rectangle(imageBounds, {
        renderer: vectorRenderer,
        stroke: false,
        fillColor: "#E6F4F1",
        fillOpacity: 1
      }).addTo(decorLayerGroup);

      /* Sky gradient - soft blue at top */
      window.L.rectangle([[0, 0], [12, 160]], {
        renderer: vectorRenderer,
        stroke: false,
        fillColor: "#D6EEF0",
        fillOpacity: 0.7
      }).addTo(decorLayerGroup);

      /* Sun glow in top-right */
      window.L.circle([8, 140], {
        renderer: vectorRenderer,
        radius: 9,
        stroke: false,
        fillColor: "#F7D8A6",
        fillOpacity: 0.9
      }).addTo(decorLayerGroup);
      window.L.circle([8, 140], {
        renderer: vectorRenderer,
        radius: 14,
        stroke: false,
        fillColor: "#FFF1D8",
        fillOpacity: 0.3
      }).addTo(decorLayerGroup);

      /* ====== LAYER 2: Ocean/sea area (right & bottom-right) ====== */
      window.L.polygon(
        [[0, 100], [0, 160], [100, 160], [100, 110], [92, 105], [84, 100], [75, 96], [65, 93], [55, 91], [45, 92], [35, 95], [25, 100], [15, 105], [8, 110], [0, 115]],
        {
          renderer: vectorRenderer,
          stroke: false,
          fillColor: "#A8D8C8",
          fillOpacity: 0.65
        }
      ).addTo(decorLayerGroup);

      /* Deeper water zone */
      window.L.polygon(
        [[50, 120], [60, 118], [72, 116], [82, 118], [90, 122], [100, 128], [100, 160], [50, 160]],
        {
          renderer: vectorRenderer,
          stroke: false,
          fillColor: "#8CC8B8",
          fillOpacity: 0.55
        }
      ).addTo(decorLayerGroup);

      /* Water shimmer lines */
      [
        [[55, 125], [62, 123], [70, 124], [78, 126]],
        [[60, 132], [68, 130], [76, 131], [84, 133]],
        [[52, 140], [60, 138], [68, 139], [76, 141]],
        [[58, 148], [66, 146], [74, 147], [82, 149]]
      ].forEach(function (seg) {
        window.L.polyline(seg, {
          renderer: vectorRenderer,
          color: "#B5E5D8",
          weight: 1.2,
          opacity: 0.5,
          dashArray: "4 6"
        }).addTo(decorLayerGroup);
      });

      /* ====== LAYER 3: Coastal wetland / mudflat zone ====== */
      window.L.polygon(
        [[0, 55], [5, 62], [12, 70], [20, 76], [30, 80], [40, 83], [50, 85], [60, 87], [70, 90], [78, 93], [85, 97], [92, 102], [100, 108], [100, 115], [85, 108], [70, 100], [55, 95], [40, 92], [25, 93], [12, 97], [0, 105]],
        {
          renderer: vectorRenderer,
          stroke: false,
          fillColor: "#CFE9E1",
          fillOpacity: 0.85
        }
      ).addTo(decorLayerGroup);

      /* Tidal channel patterns */
      [
        [[15, 102], [22, 98], [30, 95], [38, 93], [46, 92]],
        [[20, 108], [28, 104], [36, 100], [44, 97], [52, 95]],
        [[10, 115], [18, 110], [26, 106], [34, 103]]
      ].forEach(function (seg) {
        window.L.polyline(seg, {
          renderer: vectorRenderer,
          color: "#95CFC2",
          weight: 2.5,
          lineCap: "round",
          lineJoin: "round",
          opacity: 0.6,
          dashArray: "6 8"
        }).addTo(decorLayerGroup);
      });

      /* ====== LAYER 4: Reed marsh / wetland vegetation ====== */
      window.L.polygon(
        [[18, 5], [22, 12], [28, 22], [34, 30], [40, 36], [48, 42], [55, 48], [60, 52], [62, 55], [58, 58], [50, 56], [42, 50], [34, 44], [26, 36], [20, 26], [16, 16]],
        {
          renderer: vectorRenderer,
          stroke: false,
          fillColor: "#7CC0A8",
          fillOpacity: 0.7
        }
      ).addTo(decorLayerGroup);

      /* Reed cluster 1 */
      window.L.polygon(
        [[22, 8], [28, 18], [34, 26], [42, 32], [48, 38], [50, 42], [46, 44], [38, 40], [30, 34], [24, 24], [20, 14]],
        {
          renderer: vectorRenderer,
          stroke: false,
          fillColor: "#8ED4B8",
          fillOpacity: 0.75
        }
      ).addTo(decorLayerGroup);

      /* Reed cluster 2 - denser */
      window.L.polygon(
        [[30, 35], [36, 42], [44, 48], [52, 53], [58, 57], [56, 60], [48, 58], [40, 54], [34, 48], [28, 40]],
        {
          renderer: vectorRenderer,
          stroke: false,
          fillColor: "#9BD8C0",
          fillOpacity: 0.65
        }
      ).addTo(decorLayerGroup);

      /* Sandy/grassland area (upper right) */
      window.L.polygon(
        [[10, 70], [15, 65], [22, 58], [30, 52], [38, 47], [46, 44], [55, 42], [62, 42], [68, 44], [70, 48], [66, 52], [58, 50], [48, 48], [38, 50], [28, 56], [20, 64], [14, 72]],
        {
          renderer: vectorRenderer,
          stroke: false,
          fillColor: "#F0E5C8",
          fillOpacity: 0.6
        }
      ).addTo(decorLayerGroup);

      /* ====== LAYER 5: Main Yellow River channel ====== */
      /* River shadow */
      window.L.polyline(
        [[0, 45], [6, 50], [12, 56], [18, 62], [24, 68], [30, 74], [36, 80], [42, 86], [48, 92], [54, 98], [60, 104], [66, 110], [72, 116], [78, 122], [84, 128], [90, 134], [96, 142], [100, 148]],
        {
          renderer: vectorRenderer,
          color: "rgba(108, 172, 152, 0.18)",
          weight: 30,
          lineCap: "round",
          lineJoin: "round",
          opacity: 0.9
        }
      ).addTo(decorLayerGroup);

      /* River main body */
      window.L.polyline(
        [[0, 45], [6, 50], [12, 56], [18, 62], [24, 68], [30, 74], [36, 80], [42, 86], [48, 92], [54, 98], [60, 104], [66, 110], [72, 116], [78, 122], [84, 128], [90, 134], [96, 142], [100, 148]],
        {
          renderer: vectorRenderer,
          color: "#6CC0B1",
          weight: 20,
          lineCap: "round",
          lineJoin: "round",
          opacity: 0.88
        }
      ).addTo(decorLayerGroup);

      /* River highlight core */
      window.L.polyline(
        [[0, 45], [6, 50], [12, 56], [18, 62], [24, 68], [30, 74], [36, 80], [42, 86], [48, 92], [54, 98], [60, 104], [66, 110], [72, 116], [78, 122], [84, 128], [90, 134], [96, 142], [100, 148]],
        {
          renderer: vectorRenderer,
          color: "#F5FFFC",
          weight: 7,
          lineCap: "round",
          lineJoin: "round",
          opacity: 0.95
        }
      ).addTo(decorLayerGroup);

      /* ====== LAYER 6: Roads & boardwalk paths ====== */
      /* Main park road */
      window.L.polyline(
        [[16, 20], [22, 30], [28, 40], [35, 50], [42, 58], [50, 66], [58, 74], [66, 82], [74, 90], [82, 100], [88, 110], [94, 120]],
        {
          renderer: vectorRenderer,
          color: "#74C8B8",
          weight: 4.5,
          lineCap: "round",
          lineJoin: "round",
          opacity: 0.75,
          dashArray: "10 12"
        }
      ).addTo(decorLayerGroup);

      /* Boardwalk path to estuary */
      window.L.polyline(
        [[56, 68], [62, 74], [68, 80], [74, 88], [80, 96], [86, 106], [92, 118]],
        {
          renderer: vectorRenderer,
          color: "#E8D8B0",
          weight: 3,
          lineCap: "round",
          lineJoin: "round",
          opacity: 0.7,
          dashArray: "6 8"
        }
      ).addTo(decorLayerGroup);

      /* Secondary trails */
      [
        [[24, 36], [30, 44], [38, 52], [44, 58]],
        [[38, 60], [46, 68], [54, 76], [62, 84]],
        [[48, 72], [56, 80], [64, 88], [72, 96]]
      ].forEach(function (seg) {
        window.L.polyline(seg, {
          renderer: vectorRenderer,
          color: "#FFFFFF",
          weight: 2.5,
          lineCap: "round",
          lineJoin: "round",
          opacity: 0.6
        }).addTo(decorLayerGroup);
      });

      /* ====== LAYER 7: Vegetation clusters ====== */
      /* Tree groves */
      [
        { points: [[28, 45], [30, 48], [32, 46], [34, 49], [31, 51]], color: "#5DB88C" },
        { points: [[44, 55], [46, 58], [48, 56], [50, 59], [47, 61]], color: "#6DC4A0" },
        { points: [[36, 70], [38, 73], [40, 71], [42, 74], [39, 76]], color: "#7BC8A8" }
      ].forEach(function (grove) {
        grove.points.forEach(function (pt) {
          window.L.circleMarker(pt, {
            renderer: vectorRenderer,
            radius: 2.5,
            stroke: false,
            fillColor: grove.color,
            fillOpacity: 0.85
          }).addTo(decorLayerGroup);
        });
      });

      /* Reed tufts (small green dots) */
      [
        { point: [26, 55], count: 6 },
        { point: [35, 65], count: 8 },
        { point: [42, 50], count: 5 },
        { point: [50, 60], count: 7 },
        { point: [30, 40], count: 4 }
      ].forEach(function (cluster) {
        var i;
        for (i = 0; i < cluster.count; i += 1) {
          window.L.circleMarker(
            [cluster.point[0] + i * 0.5, cluster.point[1] + (i % 3) * 0.8],
            {
              renderer: vectorRenderer,
              radius: 1.2,
              stroke: false,
              fillColor: "#9BCF96",
              fillOpacity: 0.85
            }
          ).addTo(decorLayerGroup);
        }
      });

      /* Flower accents */
      [
        { point: [32, 52], color: "#F4A261", radius: 1 },
        { point: [38, 62], color: "#E9C46A", radius: 0.9 },
        { point: [45, 56], color: "#F4A261", radius: 1.1 },
        { point: [55, 70], color: "#E9C46A", radius: 0.8 }
      ].forEach(function (dot) {
        window.L.circleMarker(dot.point, {
          renderer: vectorRenderer,
          radius: dot.radius,
          stroke: false,
          fillColor: dot.color,
          fillOpacity: 0.9
        }).addTo(decorLayerGroup);
      });

      /* ====== LAYER 8: Building structures ====== */
      /* Visitor center cluster */
      [
        { point: [78, 44], radius: 2.2, color: "#D4A870" },
        { point: [80, 46], radius: 1.8, color: "#C89868" }
      ].forEach(function (bld) {
        window.L.circleMarker(bld.point, {
          renderer: vectorRenderer,
          radius: bld.radius,
          stroke: true,
          color: "#B8905C",
          weight: 0.8,
          fillColor: bld.color,
          fillOpacity: 0.9
        }).addTo(decorLayerGroup);
      });

      /* ====== LAYER 9: Zone labels ====== */
      [
        { point: [86, 34], text: mapNarratives.serviceLabel }
      ].forEach(function (item) {
        window.L.marker(item.point, {
          interactive: false,
          icon: window.L.divIcon({
            className: "hhk-map-label illustrated-zone-label",
            html: '<div class="map-label-chip">' + escapeHtml(text(item.text)) + "</div>"
          })
        }).addTo(decorLayerGroup);
      });

      /* ====== LAYER 10: Animated decorative elements ====== */
      /* Birds (flying) */
      [
        { point: [22, 130], delay: 0 },
        { point: [25, 135], delay: 2 },
        { point: [20, 125], delay: 4 },
        { point: [28, 128], delay: 1 }
      ].forEach(function (bird) {
        window.L.marker(bird.point, {
          interactive: false,
          icon: window.L.divIcon({
            className: "hhk-map-label icon-only",
            html: '<div class="map-illustration-icon illustrated-bird" style="animation-delay:-' + bird.delay + 's">🕊️</div>'
          })
        }).addTo(decorLayerGroup);
      });

      /* Shell near shore */
      window.L.marker([72, 142], {
        interactive: false,
        icon: window.L.divIcon({
          className: "hhk-map-label icon-only",
          html: '<div class="map-illustration-icon">🐚</div>'
        })
      }).addTo(decorLayerGroup);

      /* Fish in water */
      window.L.marker([65, 130], {
        interactive: false,
        icon: window.L.divIcon({
          className: "hhk-map-label icon-only",
          html: '<div class="map-illustration-icon">🐟</div>'
        })
      }).addTo(decorLayerGroup);

      /* Clouds */
      [
        { point: [5, 30], size: "1.6rem" },
        { point: [8, 80], size: "1.3rem" },
        { point: [3, 110], size: "1.1rem" }
      ].forEach(function (cloud) {
        window.L.marker(cloud.point, {
          interactive: false,
          icon: window.L.divIcon({
            className: "hhk-map-label icon-only",
            html: '<div class="map-illustration-icon illustrated-cloud" style="font-size:' + cloud.size + ';opacity:0.4">☁️</div>'
          })
        }).addTo(decorLayerGroup);
      });

      /* Compass rose */
      window.L.marker([6, 10], {
        interactive: false,
        icon: window.L.divIcon({
          className: "hhk-map-label icon-only",
          html: '<div class="map-illustration-icon" style="font-size:1.4rem;background:rgba(255,255,255,0.6)">🧭</div>'
        })
      }).addTo(decorLayerGroup);

      /* Small waves */
      [
        { point: [56, 128] },
        { point: [62, 135] },
        { point: [68, 140] }
      ].forEach(function (w) {
        window.L.marker(w.point, {
          interactive: false,
          icon: window.L.divIcon({
            className: "hhk-map-label icon-only",
            html: '<div class="map-illustration-icon illustrated-river-animated" style="font-size:0.8rem;opacity:0.5">〰️</div>'
          })
        }).addTo(decorLayerGroup);
      });
    }

    function updateMapScale() {
      var zoom;
      var scale;
      var mapNode;

      if (!map) {
        return;
      }
      zoom = map.getZoom();
      scale = Math.max(0.84, Math.min(1.3, 0.98 + (zoom + 0.4) * 0.12));
      mapNode = document.getElementById("leaflet-map");
      if (mapNode) {
        mapNode.style.setProperty("--map-poi-scale", scale.toFixed(2));
        mapNode.style.setProperty(
          "--map-label-scale",
          Math.max(0.84, Math.min(1.08, 0.92 + (zoom + 0.6) * 0.08)).toFixed(2)
        );
      }
    }

    function drawRoute() {
      if (!window.L) {
        renderFallbackMap();
        window.requestAnimationFrame(syncMarkerStates);
        return;
      }

      var route = selectedRoute();
      var stops = route.stops.map(HHK.utils.getPlaceById).filter(Boolean);
      var points = stops.map(mapPoint);
      if (!routeLayerGroup) {
        return;
      }

      routeLayerGroup.clearLayers();
      if (!points.length) {
        return;
      }

      window.L.polyline(points, {
        renderer: vectorRenderer,
        color: route.color,
        weight: 18,
        opacity: 0.18,
        lineCap: "round",
        lineJoin: "round"
      }).addTo(routeLayerGroup);

      window.L.polyline(points, {
        renderer: vectorRenderer,
        color: route.color,
        weight: 6,
        opacity: 0.94,
        lineCap: "round",
        lineJoin: "round",
        dashArray: "1 0"
      }).addTo(routeLayerGroup);

      stops.forEach(function (place, index) {
        var point = mapPoint(place);
        window.L.circleMarker(point, {
          renderer: vectorRenderer,
          radius: 13,
          color: route.color,
          weight: 2,
          fillColor: "#ffffff",
          fillOpacity: 0.97
        }).addTo(routeLayerGroup);

        window.L.marker(point, {
          interactive: false,
          icon: window.L.divIcon({
            className: "map-route-stop-label",
            html:
              '<div class="map-route-stop">' +
              '<span class="map-route-stop-index" style="background:' +
              route.color +
              ';">' +
              (index + 1) +
              '</span><span class="map-route-stop-text">' +
              escapeHtml(text(place.title)) +
              "</span></div>"
          })
        }).addTo(routeLayerGroup);
      });

      syncMarkerStates();
    }

    function fitRoute(route) {
      if (!window.L) {
        return;
      }

      var points = routePoints(route);
      if (!map || points.length < 2) {
        return;
      }
      map.fitBounds(window.L.latLngBounds(points), {
        padding: [70, 70],
        maxZoom: 0.9
      });
    }

    function focusPlace(placeId, options) {
      var place = HHK.utils.getPlaceById(placeId);
      var marker = markers[placeId];
      var targetZoom;
      options = options || {};
      if (!place) {
        return;
      }

      if (!window.L || !map) {
        var fallbackButton = document.querySelector(
          '.fallback-map-marker-button[data-place-focus="' + placeId + '"]'
        );

        if (!options.skipPanel) {
          openInfoPanel(placeId);
        } else {
          activePlaceId = placeId;
          syncMarkerStates();
        }

        if (fallbackButton && fallbackButton.scrollIntoView) {
          fallbackButton.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
          });
        }
        return;
      }

      targetZoom = Math.max(map.getZoom(), 0.45);
      map.flyTo(mapPoint(place), targetZoom, { duration: 0.7 });

      if (!options.skipPanel) {
        openInfoPanel(placeId);
      }

      if (marker && marker.openTooltip) {
        marker.openTooltip();
        window.setTimeout(function () {
          if (marker.closeTooltip) {
            marker.closeTooltip();
          }
        }, 1600);
      }
    }

    function geoDistance(a, b) {
      var dx = (a.lat - b.lat) * 111;
      var dy = (a.lng - b.lng) * 88;
      return Math.sqrt(dx * dx + dy * dy);
    }

    function fallbackNearbyPlaces() {
      return HHK.data.places
        .slice()
        .sort(function (a, b) {
          return (b.popularity + b.rating * 2) - (a.popularity + a.rating * 2);
        })
        .slice(0, 3);
    }

    function renderUserMarker() {
      if (!window.L) {
        renderFallbackMap();
        return;
      }

      if (!userLayerGroup) {
        return;
      }
      userLayerGroup.clearLayers();
      if (!userLocationPoint) {
        return;
      }

      window.L.marker(mapPointFromRaw(userLocationPoint), {
        interactive: false,
        icon: window.L.divIcon({
          className: "map-user-location",
          html:
            '<div class="map-user-ring"></div>' +
            '<div class="map-user-pulse"></div>' +
            '<div class="map-user-core"></div>',
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        })
      }).addTo(userLayerGroup);
    }

    function locateUser() {
      function applyNearby(places, coordinates, usedFallback) {
        if (!places.length) {
          return;
        }

        currentNearby = places;
        userLocationPoint = coordinates ? geoToMapPoint(coordinates) : places[0].mapPoint;
        renderNearbyPanel();
        renderUserMarker();
        if (map) {
          map.flyTo(mapPointFromRaw(userLocationPoint), 0.55, { duration: 0.8 });
        }
        closeInfoPanel();
        HHK.utils.showToast(
          usedFallback ? text(mapNarratives.locateFallback) : text(mapNarratives.located),
          "success"
        );
      }

      if (!navigator.geolocation) {
        applyNearby(fallbackNearbyPlaces(), null, true);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        function (position) {
          var coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var sorted = HHK.data.places
            .slice()
            .sort(function (a, b) {
              var scoreA = geoDistance(coordinates, a.coordinates) * 0.72 + (100 - a.popularity) * 0.28;
              var scoreB = geoDistance(coordinates, b.coordinates) * 0.72 + (100 - b.popularity) * 0.28;
              return scoreA - scoreB;
            })
            .slice(0, 3);

          applyNearby(sorted, coordinates, false);
        },
        function () {
          applyNearby(fallbackNearbyPlaces(), null, true);
        },
        {
          enableHighAccuracy: true,
          timeout: 6000,
          maximumAge: 300000
        }
      );
    }

    function toggleFullscreen() {
      var shell = document.getElementById("map-stage-shell");
      if (!shell) {
        return;
      }

      if (!document.fullscreenElement) {
        if (shell.requestFullscreen) {
          shell.requestFullscreen();
        }
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }

    function sharePlace(placeId) {
      var place = HHK.utils.getPlaceById(placeId);
      var shareUrl;
      if (!place) {
        return;
      }

      shareUrl = new URL(HHK.utils.placeHref(place), window.location.href).href;

      if (navigator.share) {
        navigator
          .share({
            title: text(place.title),
            text: text(place.summary),
            url: shareUrl
          })
          .catch(function () {});
        return;
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).then(
          function () {
            HHK.utils.showToast(text(mapNarratives.copied), "success");
          },
          function () {
            HHK.utils.showToast(text(mapNarratives.copiedFailed), "warning");
          }
        );
        return;
      }

      HHK.utils.showToast(text(mapNarratives.copiedFailed), "warning");
    }

    function updateFullscreenButton() {
      var button = document.querySelector('[data-map-control="fullscreen"]');
      var icon = button ? button.querySelector("i") : null;
      var label = button ? button.querySelector("span:last-child") : null;

      if (!button || !icon || !label) {
        return;
      }

      icon.setAttribute("data-lucide", document.fullscreenElement ? "minimize" : "maximize");
      label.textContent = text(
        document.fullscreenElement
          ? mapNarratives.exitFullscreenButton
          : mapNarratives.fullscreenButton
      );
      HHK.utils.refreshIcons();
    }

    function handleFilterChange(filter) {
      currentFilter = filter;
      renderFilters();
      renderStats();
      renderVisibleStrip();
      renderMarkers();
      pulseStage();

      if (
        activePlaceId &&
        !filteredPlaces().some(function (place) {
          return place.id === activePlaceId;
        })
      ) {
        closeInfoPanel();
      }
    }

    function bindEvents() {
      root.addEventListener("click", function (event) {
        var filterButton = event.target.closest("[data-map-filter]");
        var placeButton = event.target.closest("[data-place-focus]");
        var routeButton = event.target.closest("[data-route-id]");
        var controlButton = event.target.closest("[data-map-control]");
        var closeButton = event.target.closest("[data-panel-close]");
        var shareButton = event.target.closest("[data-panel-share]");
        var galleryButton = event.target.closest("[data-panel-image-index]");

        if (filterButton) {
          handleFilterChange(filterButton.getAttribute("data-map-filter"));
          return;
        }

        if (placeButton) {
          focusPlace(placeButton.getAttribute("data-place-focus"));
          return;
        }

        if (routeButton) {
          selectedRouteId = routeButton.getAttribute("data-route-id");
          renderRoutes();
          drawRoute();
          fitRoute(selectedRoute());
          pulseStage();
          HHK.utils.showToast(text(mapNarratives.routeReady), "success");
          if (selectedRoute().stops[0]) {
            focusPlace(selectedRoute().stops[0]);
          }
          return;
        }

        if (controlButton) {
          if (controlButton.getAttribute("data-map-control") === "locate") {
            locateUser();
          } else {
            toggleFullscreen();
          }
          return;
        }

        if (closeButton) {
          closeInfoPanel();
          return;
        }

        if (shareButton) {
          sharePlace(shareButton.getAttribute("data-panel-share"));
          return;
        }

        if (galleryButton && activePlaceId) {
          activeGalleryIndex = Number(galleryButton.getAttribute("data-panel-image-index")) || 0;
          openInfoPanel(activePlaceId);
        }
      });

      document.getElementById("map-drawer-backdrop").addEventListener("click", closeInfoPanel);

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          closeInfoPanel();
        }
      });

      document.addEventListener("fullscreenchange", function () {
        updateFullscreenButton();

        function refreshMap() {
          if (map) {
            map.invalidateSize();
            updateMapScale();
          }
          updateFullscreenButton();
        }

        window.setTimeout(refreshMap, 120);
      });
    }

    function initMap() {
      if (!window.L) {
        renderFallbackMap();
        updateFullscreenButton();
        document.getElementById("map-loading").classList.add("is-hidden");
        return;
      }

      map = window.L.map("leaflet-map", {
        crs: window.L.CRS.Simple,
        zoomControl: false,
        scrollWheelZoom: true,
        touchZoom: true,
        dragging: true,
        minZoom: -1.35,
        maxZoom: 1.8,
        zoomSnap: 0.1,
        attributionControl: true,
        inertia: true
      });

      vectorRenderer = window.L.canvas({ padding: 0.5 });
      decorLayerGroup = window.L.layerGroup().addTo(map);
      routeLayerGroup = window.L.layerGroup().addTo(map);
      markerLayerGroup = window.L.layerGroup().addTo(map);
      userLayerGroup = window.L.layerGroup().addTo(map);

      drawBaseMap();
      map.fitBounds(imageBounds, { padding: [24, 24] });
      window.L.control.zoom({ position: "bottomright" }).addTo(map);
      map.on("zoomend", updateMapScale);
      updateMapScale();
      renderMarkers();
      drawRoute();
      updateFullscreenButton();

      window.setTimeout(function () {
        map.invalidateSize();
        updateMapScale();
        document.getElementById("map-loading").classList.add("is-hidden");
      }, 320);
    }

    renderFrame();
    renderFilters();
    renderStats();
    renderVisibleStrip();
    renderRoutes();
    renderNearbyPanel();
    bindEvents();
    initMap();
  };
})(window);
