(function (window) {
  var HHK = (window.HHK = window.HHK || {});

  HHK.pages.home = function () {
    var root = document.getElementById("page-root");
    var filter = "all";
    var activePlaceId = "";
    var activeGalleryIndex = 0;

    function text(value) {
      return HHK.i18n.text(value);
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

    function premiumRoutes() {
      return [
        {
          id: "official-sunrise",
          title: { zh: "黄河入海观日出线", en: "Sunrise Estuary Route" },
          subtitle: {
            zh: "从第一缕天光开始，把木栈道、观鸟点和在地早餐串成最经典的一条线。",
            en: "The classic dawn route linking the boardwalk, birding tower, and a local breakfast."
          },
          accent: "#E9C46A",
          icon: "🌅",
          href: "route.html?mode=ai"
        },
        {
          id: "official-family",
          title: { zh: "湿地亲子科普线", en: "Family Wetland Route" },
          subtitle: {
            zh: "适合带孩子慢慢走的一条线，展馆、芦苇步道和轻松观鸟都安排得刚刚好。",
            en: "A family-paced route built around the museum, reed trail, and easy birdwatching."
          },
          accent: "#264653",
          icon: "🧭",
          href: "route.html"
        },
        {
          id: "official-slow",
          title: { zh: "黄河口慢享假日线", en: "Estuary Slow Escape" },
          subtitle: {
            zh: "住进湿地边的度假氛围，白天看景，傍晚看日落，夜里吃一顿精致晚餐。",
            en: "A slow holiday pairing wetland stays, sunset views, and refined local dining."
          },
          accent: "#2A9D8F",
          icon: "🏡",
          href: "route.html"
        }
      ];
    }

    function visiblePlaces() {
      return HHK.data.places.filter(function (place) {
        return filter === "all" ? true : place.type === filter;
      });
    }

    function statValues(items) {
      var avgRating =
        items.reduce(function (sum, item) {
          return sum + item.rating;
        }, 0) / (items.length || 1);

      return [
        {
          icon: "📍",
          label: text({ zh: "精选点位", en: "Curated spots" }),
          helper: text({ zh: "当前筛选可逛", en: "Available in this filter" }),
          value: items.length,
          decimals: 0
        },
        {
          icon: "⭐",
          label: text({ zh: "平均口碑", en: "Average rating" }),
          helper: text({ zh: "旅行者真实打分", en: "Rated by travelers" }),
          value: avgRating,
          decimals: 1
        },
        {
          icon: "🔥",
          label: text({ zh: "当季热度", en: "Travel heat" }),
          helper: text({ zh: "热门打卡指数", en: "Trending right now" }),
          value: Math.max.apply(
            null,
            items.map(function (item) {
              return item.popularity;
            })
          ),
          decimals: 0
        }
      ];
    }

    function animateValue(node, target, decimals) {
      var duration = 520;
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

    function modalGallery(place) {
      return (place.gallery && place.gallery.length ? place.gallery : [place.image]).slice(0, 4);
    }

    function activeGalleryImage(place) {
      var gallery = modalGallery(place);
      return gallery[activeGalleryIndex] || gallery[0];
    }

    // [新增] 读取首页专题内容（美食特产 / 特色景观），确保旧数据结构下也能安全渲染
    function curatedContent() {
      return HHK.data.curatedContent || {};
    }

    // [新增] 首页黄河口特色美食特产板块渲染
    function renderLocalFlavorsSection() {
      var section = curatedContent().localFlavors || {};
      var specialties = section.specialties || [];
      var recommendations = section.recommendations || [];
      var title = section.title || { zh: "黄河口特色美食特产", en: "Signature foods and local products" };
      var subtitle =
        section.subtitle ||
        {
          zh: "把伴手礼、地方名吃与非遗门店串成一条风味动线，补齐黄河口“可看、可吃、可带走”的在地体验。",
          en: "Bringing together take-home products, local bites, and heritage dining into one estuary flavor narrative."
        };
      var eyebrow = section.eyebrow || { zh: "黄河口风味", en: "Estuary flavors" };
      var note =
        section.note ||
        {
          zh: "文案依据公开权威资料整理，图片使用可公开访问资源。",
          en: "Copy is adapted from public authoritative sources and paired with openly accessible images."
        };

      if (!specialties.length && !recommendations.length) {
        return "";
      }

      return (
        '<section class="container-shell pb-8 md:pb-10">' +
        '<div class="premium-section-shell">' +
        '<div class="premium-section-head editorial-section-head">' +
        "<div>" +
        '<span class="premium-section-kicker">' +
        escapeHtml(text(eyebrow)) +
        "</span>" +
        '<h2 class="premium-section-title">' +
        escapeHtml(text(title)) +
        "</h2>" +
        '<p class="premium-section-description">' +
        escapeHtml(text(subtitle)) +
        "</p>" +
        "</div>" +
        '<aside class="curated-side-note rounded-[22px] p-4 text-sm leading-7 text-slate-600 dark:text-slate-300">' +
        escapeHtml(text(note)) +
        "</aside>" +
        "</div>" +
        '<div class="mt-6">' +
        '<div class="premium-modal-subtitle">' +
        escapeHtml(text({ zh: "基础特产与美食清单", en: "Core local specialties and foods" })) +
        "</div>" +
        '<div class="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">' +
        specialties
          .map(function (item) {
            var imageAlt = (item.name && (item.name.zh || item.name.en)) || text(item.name);
            return (
              '<article class="glass-card curated-card rounded-[24px] overflow-hidden">' +
              '<div class="curated-card-media">' +
              '<img ' +
              imageAttrs(item.image, imageAlt) +
              ' class="curated-card-image h-full w-full object-cover" />' +
              "</div>" +
              '<div class="p-5">' +
              '<h3 class="font-display text-xl font-semibold text-slate-900 dark:text-slate-50">' +
              escapeHtml(text(item.name)) +
              "</h3>" +
              '<p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">' +
              escapeHtml(text(item.description)) +
              "</p>" +
              "</div>" +
              "</article>"
            );
          })
          .join("") +
        "</div>" +
        "</div>" +
        '<div class="mt-8">' +
        '<div class="premium-modal-subtitle">' +
        escapeHtml(text({ zh: "推荐美食与非遗门店", en: "Recommended foods and heritage dining spots" })) +
        "</div>" +
        '<div class="mt-4 grid gap-4 xl:grid-cols-3">' +
        recommendations
          .map(function (item) {
            var imageAlt = (item.name && (item.name.zh || item.name.en)) || text(item.name);
            return (
              '<article class="glass-card rounded-[24px] overflow-hidden">' +
              '<div class="recommendation-media-shell">' +
              '<img ' +
              imageAttrs(item.image, imageAlt) +
              ' class="recommendation-media h-full w-full object-cover" />' +
              "</div>" +
              '<div class="p-5">' +
              '<div class="flex flex-wrap gap-2">' +
              (item.badges || [])
                .map(function (badge) {
                  return (
                    '<span class="badge-soft">' +
                    escapeHtml(text(badge)) +
                    "</span>"
                  );
                })
                .join("") +
              "</div>" +
              '<h3 class="mt-3 font-display text-xl font-semibold text-slate-900 dark:text-slate-50">' +
              escapeHtml(text(item.name)) +
              "</h3>" +
              '<p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">' +
              escapeHtml(text(item.description)) +
              "</p>" +
              "</div>" +
              "</article>"
            );
          })
          .join("") +
        "</div>" +
        "</div>" +
        "</div>" +
        "</section>"
      );
    }

    // [新增] 首页黄河口特色景观板块渲染
    function renderSignatureLandscapesSection() {
      var section = curatedContent().signatureLandscapes || {};
      var items = section.items || [];
      var title = section.title || { zh: "黄河口特色景观", en: "Signature estuary landscapes" };
      var subtitle =
        section.subtitle ||
        {
          zh: "从地方风味继续递进到河海湿地视觉高潮，自然过渡到黄河口最具辨识度的奇观。",
          en: "A natural progression from local flavor into the estuary's most iconic spectacles."
        };
      var eyebrow = section.eyebrow || { zh: "河海奇观", en: "River-sea spectacle" };
      var note =
        section.note ||
        {
          zh: "景观介绍依据公开保护与文旅资料整理，配图均为公开可访问实景图片。",
          en: "Landscape notes are adapted from public conservation and tourism materials with openly accessible real-scene images."
        };

      if (!items.length) {
        return "";
      }

      return (
        '<section class="container-shell pb-8 md:pb-10">' +
        '<div class="premium-section-shell">' +
        '<div class="premium-section-head editorial-section-head">' +
        "<div>" +
        '<span class="premium-section-kicker">' +
        escapeHtml(text(eyebrow)) +
        "</span>" +
        '<h2 class="premium-section-title">' +
        escapeHtml(text(title)) +
        "</h2>" +
        '<p class="premium-section-description">' +
        escapeHtml(text(subtitle)) +
        "</p>" +
        "</div>" +
        '<aside class="curated-side-note rounded-[22px] p-4 text-sm leading-7 text-slate-600 dark:text-slate-300">' +
        escapeHtml(text(note)) +
        "</aside>" +
        "</div>" +
        '<div class="mt-6 premium-route-list">' +
        items
          .map(function (item) {
            var gallery = (item.gallery || []).slice(0, 4);
            var imageAlt = (item.title && (item.title.zh || item.title.en)) || text(item.title);
            if (gallery.length === 1) {
              gallery.push(gallery[0]);
            }
            return (
              '<article class="glass-card rounded-[24px] p-5 landscape-feature">' +
              '<div class="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">' +
              "<div>" +
              '<h3 class="font-display text-2xl font-semibold text-slate-900 dark:text-slate-50">' +
              escapeHtml(text(item.title)) +
              "</h3>" +
              '<p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">' +
              escapeHtml(text(item.description)) +
              "</p>" +
              "</div>" +
              '<div class="grid gap-3 sm:grid-cols-2">' +
              gallery
                .map(function (image) {
                  return (
                    '<div class="landscape-gallery-item rounded-[20px] overflow-hidden">' +
                    '<img ' +
                    imageAttrs(image, imageAlt) +
                    ' class="h-full w-full object-cover" />' +
                    "</div>"
                  );
                })
                .join("") +
              "</div>" +
              "</div>" +
              "</article>"
            );
          })
          .join("") +
        "</div>" +
        "</div>" +
        "</section>"
      );
    }

    function renderFrame() {
      var heroPlace = HHK.utils.getPlaceById("delta-estuary-boardwalk") || HHK.data.places[0];
      var featurePlaces = [
        HHK.utils.getPlaceById("migration-observatory"),
        HHK.utils.getPlaceById("delta-museum")
      ].filter(Boolean);
      var commentsPreview = HHK.data.communitySeedComments
        .slice()
        .sort(function (left, right) {
          return (right.likes || 0) - (left.likes || 0);
        })
        .slice(0, 3);

      root.innerHTML =
        '<section class="container-shell pt-6 md:pt-10">' +
        '<div id="premium-hero" class="premium-hero-shell">' +
        '<div class="premium-hero-media">' +
        '<img ' +
        imageAttrs(heroPlace.image, text(heroPlace.title)) +
        ' class="premium-hero-cover" />' +
        '<div class="premium-hero-overlay"></div>' +
        '<div class="premium-hero-orb orb-a"></div><div class="premium-hero-orb orb-b"></div>' +
        "</div>" +
        '<div class="premium-hero-content">' +
        '<div class="premium-hero-copy">' +
        '<span class="premium-eyebrow">Yellow River Delta Reserve</span>' +
        '<h1 class="premium-hero-title">让黄河口从一张风景名片，升级成值得专程前往的度假目的地。</h1>' +
        '<p class="premium-hero-description">从黄河入海日出、滩涂湿地、候鸟观测到在地风味与度假民宿，我们把最值得体验的黄河口旅程，整理成一套更高级、更顺滑也更好看的官方探索入口。</p>' +
        '<div class="premium-hero-actions">' +
        '<a href="map.html" class="premium-primary-button">进入互动地图</a>' +
        '<a href="route.html" class="premium-secondary-button">查看路线推荐</a>' +
        '<a href="community.html" class="premium-secondary-button">浏览游客社区</a>' +
        "</div>" +
        '<div class="premium-hero-pills">' +
        '<span class="premium-soft-pill">🌊 黄河入海口</span>' +
        '<span class="premium-soft-pill">🕊️ 湿地观鸟季</span>' +
        '<span class="premium-soft-pill">🏡 轻奢度假感</span>' +
        "</div></div>" +
        '<div class="premium-hero-cards">' +
        featurePlaces
          .map(function (place, index) {
            return (
              '<button type="button" data-open-place="' +
              place.id +
              '" class="premium-floating-card ' +
              (index === 0 ? "is-large" : "") +
              '">' +
              '<div class="premium-floating-card-image">' +
              '<img ' +
              imageAttrs(place.image, text(place.title)) +
              ' class="h-full w-full object-cover" />' +
              "</div>" +
              '<div class="premium-floating-card-body">' +
              '<div class="premium-floating-card-top">' +
              '<span class="premium-score-tag">⭐ ' +
              place.rating.toFixed(1) +
              '</span><span class="premium-heat-tag">🔥 ' +
              place.popularity +
              "</span></div>" +
              '<div class="premium-floating-card-title">' +
              escapeHtml(text(place.title)) +
              '</div><p class="premium-floating-card-copy">' +
              escapeHtml(text(place.subtitle || place.summary)) +
              "</p></div></button>"
            );
          })
          .join("") +
        "</div></div></div></section>" +
        '<section class="container-shell pt-8">' +
        '<div id="home-stats" class="premium-stats-row"></div>' +
        "</section>" +
        '<section class="container-shell py-8 md:py-10">' +
        '<div class="premium-section-shell">' +
        '<div class="premium-section-head">' +
        "<div>" +
        '<span class="premium-section-kicker">Curated Spots</span>' +
        '<h2 class="premium-section-title">一条横向滑动的度假灵感流，把黄河口最值得去的点位排在你眼前。</h2>' +
        '<p class="premium-section-description">按景点、民宿或餐饮切换，横向滑动查看每一个高热度点位。卡片保留最重要的旅行信息，点击即可进入完整详情浮层。</p>' +
        '</div><div id="home-filters" class="premium-filter-row"></div></div>' +
        '<div class="travel-strip-shell">' +
        '<div class="travel-strip-controls">' +
        '<button type="button" data-spot-scroll="-1" class="travel-strip-nav" aria-label="' +
        escapeHtml(text({ zh: "鍚戝乏婊戝姩鏅偣", en: "Scroll spots left" })) +
        '">‹</button>' +
        '<button type="button" data-spot-scroll="1" class="travel-strip-nav" aria-label="' +
        escapeHtml(text({ zh: "鍚戝彸婊戝姩鏅偣", en: "Scroll spots right" })) +
        '">›</button>' +
        "</div>" +
        '<div id="home-spot-track" class="travel-spot-track"></div>' +
        "</div></div></section>" +
        '<section class="container-shell pb-8 md:pb-10">' +
        '<div class="premium-split-grid">' +
        '<article class="premium-section-shell">' +
        '<div class="premium-section-head compact">' +
        "<div>" +
        '<span class="premium-section-kicker">Featured Routes</span>' +
        '<h2 class="premium-section-title">把第一次来黄河口最值得安排的节奏，提前交给你。</h2>' +
        "</div>" +
        '<a href="route.html" class="premium-inline-link">全部路线</a>' +
        "</div>" +
        '<div class="premium-route-list">' +
        premiumRoutes()
          .map(function (route) {
            return (
              '<a href="' +
              route.href +
              '" class="premium-route-card" style="--route-accent:' +
              route.accent +
              ';">' +
              '<div class="premium-route-icon">' +
              route.icon +
              '</div><div class="premium-route-body">' +
              '<div class="premium-route-title">' +
              escapeHtml(text(route.title)) +
              '</div><p class="premium-route-copy">' +
              escapeHtml(text(route.subtitle)) +
              "</p></div></a>"
            );
          })
          .join("") +
        "</div></article>" +
        '<article class="premium-section-shell">' +
        '<div class="premium-section-head compact">' +
        "<div>" +
        '<span class="premium-section-kicker">Traveler Notes</span>' +
        '<h2 class="premium-section-title">最近被收藏最多的游客瞬间。</h2>' +
        "</div>" +
        '<a href="community.html" class="premium-inline-link">进入社区</a>' +
        "</div>" +
        '<div class="premium-note-list">' +
        commentsPreview
          .map(function (comment) {
            return (
              '<article class="premium-note-card">' +
              '<div class="premium-note-user">' +
              '<img src="' +
              escapeHtml(comment.avatar) +
              '" alt="' +
              escapeHtml(comment.author) +
              '" class="premium-note-avatar" />' +
              '<div><div class="premium-note-name">' +
              escapeHtml(comment.author) +
              '</div><div class="premium-note-meta">' +
              escapeHtml(HHK.utils.formatDate(comment.createdAt)) +
              "</div></div></div>" +
              '<p class="premium-note-copy">' +
              escapeHtml(comment.content) +
              '</p><div class="premium-note-actions">' +
              '<span>⭐ ' +
              comment.rating.toFixed(1) +
              '</span><span>❤ ' +
              (comment.likes || 0) +
              '</span></div></article>'
            );
          })
          .join("") +
        "</div></article></div></section>" +
        '<!-- [新增] 黄河口特色美食特产板块 -->' +
        renderLocalFlavorsSection() +
        '<!-- [新增] 黄河口特色景观板块 -->' +
        renderSignatureLandscapesSection() +
        '<div id="home-place-modal-backdrop" class="premium-modal-backdrop"></div>' +
        '<div id="home-place-modal" class="premium-place-modal"></div>';
    }

    function renderFilters() {
      var filterRoot = document.getElementById("home-filters");
      var options = [
        { id: "all", icon: "✨", label: HHK.i18n.t("all") },
        { id: "attraction", icon: "🌿", label: HHK.i18n.t("attraction") },
        { id: "homestay", icon: "🏡", label: HHK.i18n.t("homestay") },
        { id: "food", icon: "🍴", label: HHK.i18n.t("food") }
      ];

      filterRoot.innerHTML = options
        .map(function (item) {
          return (
            '<button type="button" data-filter="' +
            item.id +
            '" class="premium-filter-pill ' +
            (filter === item.id ? "is-active" : "") +
            '">' +
            '<span>' +
            item.icon +
            '</span><span>' +
            escapeHtml(item.label) +
            "</span></button>"
          );
        })
        .join("");
    }

    function renderStats() {
      var items = visiblePlaces();
      var rootNode = document.getElementById("home-stats");
      rootNode.innerHTML = statValues(items)
        .map(function (item) {
          return (
            '<article class="premium-stat-card">' +
            '<div class="premium-stat-icon">' +
            item.icon +
            '</div><div class="premium-stat-text">' +
            '<div class="premium-stat-label">' +
            escapeHtml(item.label) +
            '</div><div class="premium-stat-helper">' +
            escapeHtml(item.helper) +
            '</div></div><div data-stat-value="' +
            item.value +
            '" data-stat-decimals="' +
            item.decimals +
            '" class="premium-stat-value">0</div></article>'
          );
        })
        .join("");

      rootNode.querySelectorAll("[data-stat-value]").forEach(function (node) {
        animateValue(
          node,
          Number(node.getAttribute("data-stat-value")),
          Number(node.getAttribute("data-stat-decimals"))
        );
      });
    }

    function renderSpotTrack() {
      var track = document.getElementById("home-spot-track");
      var items = visiblePlaces();
      track.innerHTML = items
        .map(function (place) {
          return (
            '<button type="button" data-open-place="' +
            place.id +
            '" class="travel-spot-card">' +
            '<div class="travel-spot-media">' +
            '<img ' +
            imageAttrs(place.image, text(place.title)) +
            ' class="h-full w-full object-cover" />' +
            "</div>" +
            '<div class="travel-spot-body">' +
            '<div class="travel-spot-head">' +
            '<span class="premium-score-tag">⭐ ' +
            place.rating.toFixed(1) +
            '</span><span class="premium-heat-tag">🔥 ' +
            place.popularity +
            "</span></div>" +
            '<div class="travel-spot-title">' +
            escapeHtml(text(place.title)) +
            '</div><p class="travel-spot-slogan">' +
            escapeHtml(text(place.subtitle || place.summary)) +
            '</p><div class="travel-spot-footer">' +
            '<span class="travel-spot-region">' +
            escapeHtml(text(place.region)) +
            "</span>" +
            HHK.utils.renderFavoriteButton(place.id, true) +
            "</div></div></button>"
          );
        })
        .join("");
      HHK.utils.updateFavoriteButtons();
      HHK.utils.refreshIcons();
    }

    function scrollSpotTrack(direction) {
      var track = document.getElementById("home-spot-track");
      var card = track ? track.querySelector(".travel-spot-card") : null;
      var step = card
        ? card.getBoundingClientRect().width + 16
        : Math.max((track ? track.clientWidth : 320) * 0.85, 280);

      if (!track) {
        return;
      }

      track.scrollBy({
        left: step * (direction < 0 ? -1 : 1),
        behavior: "smooth"
      });
    }

    function bindSpotTrackInteractions() {
      var track = document.getElementById("home-spot-track");
      var dragState;

      if (!track || track.dataset.dragBound === "1") {
        return;
      }

      dragState = {
        active: false,
        moved: false,
        pointerId: null,
        startX: 0,
        startScrollLeft: 0
      };

      track.dataset.dragBound = "1";

      track.addEventListener(
        "wheel",
        function (event) {
          var atStart;
          var atEnd;

          if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
            return;
          }
          if (track.scrollWidth <= track.clientWidth + 1) {
            return;
          }

          atStart = track.scrollLeft <= 0;
          atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;

          if ((event.deltaY < 0 && atStart) || (event.deltaY > 0 && atEnd)) {
            return;
          }

          event.preventDefault();
          track.scrollLeft += event.deltaY;
        },
        { passive: false }
      );

      track.addEventListener("pointerdown", function (event) {
        if (
          event.button !== 0 ||
          (event.pointerType && event.pointerType !== "mouse" && event.pointerType !== "pen")
        ) {
          return;
        }

        dragState.active = true;
        dragState.moved = false;
        dragState.pointerId = event.pointerId;
        dragState.startX = event.clientX;
        dragState.startScrollLeft = track.scrollLeft;
        track.classList.add("is-grabbing");

        if (track.setPointerCapture) {
          track.setPointerCapture(event.pointerId);
        }
      });

      track.addEventListener("pointermove", function (event) {
        var delta;

        if (!dragState.active) {
          return;
        }

        delta = event.clientX - dragState.startX;
        if (Math.abs(delta) > 4) {
          dragState.moved = true;
        }
        track.scrollLeft = dragState.startScrollLeft - delta;

        if (event.cancelable) {
          event.preventDefault();
        }
      });

      function endDrag(event) {
        if (!dragState.active) {
          return;
        }

        dragState.active = false;
        track.classList.remove("is-grabbing");
        if (
          track.releasePointerCapture &&
          dragState.pointerId !== null &&
          track.hasPointerCapture &&
          track.hasPointerCapture(dragState.pointerId)
        ) {
          track.releasePointerCapture(dragState.pointerId);
        }
        dragState.pointerId = null;
      }

      track.addEventListener("pointerup", endDrag);
      track.addEventListener("pointercancel", endDrag);
      track.addEventListener("pointerleave", function (event) {
        if (!dragState.active) {
          return;
        }
        if ((event.buttons & 1) === 0) {
          endDrag(event);
        }
      });

      track.addEventListener(
        "click",
        function (event) {
          if (!dragState.moved) {
            return;
          }
          dragState.moved = false;
          event.preventDefault();
          event.stopPropagation();
        },
        true
      );
    }

    function modalMarkup(place) {
      var gallery = modalGallery(place);
      var heroImage = activeGalleryImage(place);
      var featureList = (place.features || [])
        .slice(0, 3)
        .map(function (item) {
          return (
            '<li class="premium-modal-feature-item">' +
            escapeHtml(text(item)) +
            "</li>"
          );
        })
        .join("");

      return (
        '<div class="premium-modal-card">' +
        '<button type="button" data-close-place-modal="true" class="premium-modal-close">×</button>' +
        '<div class="premium-modal-media">' +
        '<img ' +
        imageAttrs(heroImage, text(place.title)) +
        ' class="h-full w-full object-cover" />' +
        '<div class="premium-modal-overlay">' +
        '<span class="premium-score-tag">⭐ ' +
        place.rating.toFixed(1) +
        '</span><span class="premium-heat-tag">🔥 ' +
        place.popularity +
        "</span></div></div>" +
        '<div class="premium-modal-thumbs">' +
        gallery
          .map(function (image, index) {
            return (
              '<button type="button" data-gallery-index="' +
              index +
              '" class="premium-modal-thumb ' +
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
        '<div class="premium-modal-body">' +
        '<div class="premium-modal-header">' +
        '<div><span class="premium-section-kicker">' +
        escapeHtml(HHK.utils.getTypeKey(place.type)) +
        '</span><h3 class="premium-modal-title">' +
        escapeHtml(text(place.title)) +
        '</h3><p class="premium-modal-region">' +
        escapeHtml(text(place.region)) +
        "</p></div>" +
        HHK.utils.renderFavoriteButton(place.id) +
        "</div>" +
        '<p class="premium-modal-copy">' +
        escapeHtml(text(place.description || place.summary)) +
        '</p><div class="premium-modal-metrics">' +
        '<div class="premium-modal-metric"><span>建议停留</span><strong>' +
        escapeHtml(text({ zh: place.stayHours + " 小时", en: place.stayHours + "h" })) +
        '</strong></div><div class="premium-modal-metric"><span>开放时间</span><strong>' +
        escapeHtml(place.openHours) +
        '</strong></div><div class="premium-modal-metric"><span>参考价格</span><strong>' +
        escapeHtml(text(place.price)) +
        "</strong></div></div>" +
        '<div class="premium-modal-grid">' +
        '<div><div class="premium-modal-subtitle">推荐玩法</div><ul class="premium-modal-feature-list">' +
        featureList +
        '</ul></div><div><div class="premium-modal-subtitle">一句话亮点</div><p class="premium-modal-summary">' +
        escapeHtml(text(place.summary)) +
        '</p><div class="premium-modal-actions">' +
        '<a href="map.html" class="premium-primary-button small">地图查看</a>' +
        '<a href="' +
        HHK.utils.placeHref(place) +
        '" class="premium-secondary-button small">完整详情</a>' +
        "</div></div></div></div></div>"
      );
    }

    function openModal(placeId) {
      var place = HHK.utils.getPlaceById(placeId);
      var modal = document.getElementById("home-place-modal");
      var backdrop = document.getElementById("home-place-modal-backdrop");
      if (!place || !modal || !backdrop) {
        return;
      }

      if (activePlaceId !== placeId) {
        activeGalleryIndex = 0;
      }
      activePlaceId = placeId;
      modal.innerHTML = modalMarkup(place);
      modal.classList.add("is-open");
      backdrop.classList.add("is-visible");
      HHK.utils.updateFavoriteButtons();
      HHK.utils.refreshIcons();
    }

    function closeModal() {
      var modal = document.getElementById("home-place-modal");
      var backdrop = document.getElementById("home-place-modal-backdrop");
      activePlaceId = "";
      activeGalleryIndex = 0;
      if (modal) {
        modal.classList.remove("is-open");
      }
      if (backdrop) {
        backdrop.classList.remove("is-visible");
      }
    }

    function syncParallax() {
      var hero = document.getElementById("premium-hero");
      if (!hero) {
        return;
      }
      hero.style.setProperty("--hero-shift", Math.min(window.scrollY * 0.16, 60).toFixed(1) + "px");
    }

    function bindGlobalParallax() {
      if (window.__hhkHomeParallaxBound) {
        syncParallax();
        return;
      }
      window.__hhkHomeParallaxBound = true;
      window.addEventListener(
        "scroll",
        function () {
          syncParallax();
        },
        { passive: true }
      );
      syncParallax();
    }

    function bindEvents() {
      root.addEventListener("click", function (event) {
        var filterButton = event.target.closest("[data-filter]");
        var scrollButton = event.target.closest("[data-spot-scroll]");
        var cardButton = event.target.closest("[data-open-place]");
        var closeButton = event.target.closest("[data-close-place-modal]");
        var thumbButton = event.target.closest("[data-gallery-index]");
        var favoriteButton = event.target.closest('[data-action="favorite"]');

        if (favoriteButton) {
          return;
        }

        if (scrollButton) {
          scrollSpotTrack(Number(scrollButton.getAttribute("data-spot-scroll")) || 1);
          return;
        }

        if (filterButton) {
          filter = filterButton.getAttribute("data-filter");
          renderFilters();
          renderStats();
          renderSpotTrack();
          return;
        }

        if (cardButton) {
          openModal(cardButton.getAttribute("data-open-place"));
          return;
        }

        if (closeButton) {
          closeModal();
          return;
        }

        if (thumbButton && activePlaceId) {
          activeGalleryIndex = Number(thumbButton.getAttribute("data-gallery-index")) || 0;
          openModal(activePlaceId);
        }
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          closeModal();
        }
      });

      document
        .getElementById("home-place-modal-backdrop")
        .addEventListener("click", closeModal);
    }

    renderFrame();
    renderFilters();
    renderStats();
    renderSpotTrack();
    bindSpotTrackInteractions();
    bindEvents();
    bindGlobalParallax();

    HHK.app.onFavoriteChange = function () {
      renderSpotTrack();
      if (activePlaceId) {
        openModal(activePlaceId);
      }
    };
  };
})(window);
