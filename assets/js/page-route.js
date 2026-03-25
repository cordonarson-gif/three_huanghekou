(function (window) {
  var HHK = (window.HHK = window.HHK || {});

  HHK.pages.route = function () {
    var root = document.getElementById("page-root");
    var state = {
      duration: "half-day",
      preference: "nature"
    };

    function frame() {
      root.innerHTML =
        '<section class="container-shell pt-6 md:pt-10">' +
        '<div class="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">' +
        '<aside class="glass-panel rounded-[32px] p-6 md:p-8">' +
        '<span class="badge-soft">' +
        HHK.utils.escapeHtml(HHK.i18n.t("routeEngine")) +
        '</span>' +
        '<h1 class="mt-4 font-display text-3xl font-semibold text-slate-900 dark:text-white md:text-5xl">' +
        HHK.utils.escapeHtml(HHK.i18n.t("routeTitle")) +
        '</h1><p class="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-300">' +
        HHK.utils.escapeHtml(HHK.i18n.t("routeDescription")) +
        '</p><div class="mt-8 space-y-6">' +
        '<div><div class="mb-3 text-sm font-semibold text-slate-900 dark:text-white">' +
        HHK.utils.escapeHtml(HHK.i18n.t("durationLabel")) +
        '</div><div class="flex flex-wrap gap-2" id="duration-options"></div></div>' +
        '<div><div class="mb-3 text-sm font-semibold text-slate-900 dark:text-white">' +
        HHK.utils.escapeHtml(HHK.i18n.t("preferenceLabel")) +
        '</div><div class="flex flex-wrap gap-2" id="preference-options"></div></div>' +
        '<div class="grid gap-3 md:grid-cols-2 xl:grid-cols-1">' +
        '<button id="generate-route" class="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white dark:bg-brand-300 dark:text-slate-950">' +
        HHK.utils.escapeHtml(HHK.i18n.t("generateRoute")) +
        '</button><button id="generate-ai-route" class="rounded-full border border-white/20 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-900 dark:border-white/10 dark:bg-slate-950/65 dark:text-white">' +
        HHK.utils.escapeHtml(HHK.i18n.t("generateAiRoute")) +
        '</button></div></div></aside>' +
        '<section class="space-y-6"><div id="route-loader" class="glass-panel hidden rounded-[32px] p-6 text-sm text-slate-500 dark:text-slate-300"></div>' +
        '<div id="route-result"></div></section></div></section>';
    }

    function renderOptionGroup(rootId, items, selected, onClick) {
      var container = document.getElementById(rootId);
      container.innerHTML = items
        .map(function (item) {
          return (
            '<button type="button" data-value="' +
            item +
            '" class="filter-pill ' +
            (selected === item ? "is-active" : "") +
            '">' +
            HHK.utils.escapeHtml(HHK.i18n.t(item)) +
            "</button>"
          );
        })
        .join("");
      container.querySelectorAll("[data-value]").forEach(function (button) {
        button.addEventListener("click", function () {
          onClick(button.getAttribute("data-value"));
        });
      });
    }

    function scorePlace(place, preference) {
      var bonus = place.bestFor[preference] || 0;
      var typeBonus = 0;
      if (preference === "leisure" && (place.type === "food" || place.type === "homestay")) {
        typeBonus += 10;
      }
      if (preference === "photography" && place.type === "attraction") {
        typeBonus += 6;
      }
      return bonus + place.popularity * 0.18 + place.rating * 8 + typeBonus;
    }

    function uniquePush(list, item) {
      if (
        item &&
        !list.some(function (entry) {
          return entry.id === item.id;
        })
      ) {
        list.push(item);
      }
    }

    function buildRoute(duration, preference, aiMode) {
      var attractions = HHK.data.places
        .filter(function (place) {
          return place.type === "attraction";
        })
        .sort(function (left, right) {
          return scorePlace(right, preference) - scorePlace(left, preference);
        });
      var foods = HHK.data.places
        .filter(function (place) {
          return place.type === "food";
        })
        .sort(function (left, right) {
          return scorePlace(right, preference) - scorePlace(left, preference);
        });
      var stays = HHK.data.places
        .filter(function (place) {
          return place.type === "homestay";
        })
        .sort(function (left, right) {
          return scorePlace(right, preference) - scorePlace(left, preference);
        });

      var picks = [];
      if (duration === "half-day") {
        uniquePush(picks, attractions[0]);
        uniquePush(picks, preference === "leisure" ? foods[0] : attractions[1]);
        uniquePush(picks, preference === "photography" ? HHK.utils.getPlaceById("sunset-pier") : attractions[2] || foods[0]);
      } else {
        uniquePush(picks, HHK.utils.getPlaceById("delta-museum"));
        uniquePush(picks, attractions[0]);
        uniquePush(picks, foods[0]);
        uniquePush(picks, preference === "leisure" ? stays[0] : attractions[1]);
        uniquePush(picks, HHK.utils.getPlaceById("sunset-pier"));
      }

      var slots =
        duration === "half-day"
          ? ["08:10", "10:00", "11:40"]
          : ["08:30", "10:00", "12:10", "14:40", "17:10"];

      var reasons = {
        nature: {
          zh: "优先保留湿地肌理、观鸟窗口和步行舒适度。",
          en: "Prioritized habitat textures, birdwatching windows, and comfortable walking rhythms."
        },
        photography: {
          zh: "优先考虑逆光、景深层次和日出日落机位。",
          en: "Prioritized light direction, depth, and sunrise-sunset photo angles."
        },
        leisure: {
          zh: "优先保证节奏松弛、补给稳定和停留体验。",
          en: "Prioritized a slower pace, stable food stops, and relaxed stay quality."
        }
      };

      var title =
        (duration === "half-day" ? HHK.i18n.t("halfDay") : HHK.i18n.t("fullDay")) +
        " · " +
        HHK.i18n.t(preference);

      var items = picks.slice(0, slots.length).map(function (place, index) {
        return {
          time: slots[index],
          place: place,
          reason: HHK.i18n.text(reasons[preference])
        };
      });

      var summary =
        HHK.i18n.text({
          zh:
            "路线串联 " +
            items
              .map(function (item) {
                return HHK.i18n.text(item.place.title);
              })
              .join(" / ") +
            "，整体节奏更适合" +
            HHK.i18n.t(preference) +
            "导向玩法。",
          en:
            "This route links " +
            items
              .map(function (item) {
                return HHK.i18n.text(item.place.title);
              })
              .join(" / ") +
            " with a " +
            HHK.i18n.t(preference).toLowerCase() +
            "-first rhythm."
        });

      var tips = [
        HHK.i18n.text({
          zh: "建议提前 15 分钟到达首站，热门观景位容易被占满。",
          en: "Arrive 15 minutes early for the first stop, especially at popular viewpoints."
        }),
        HHK.i18n.text({
          zh: "园区风大时携带轻薄外套，湿地早晚温差更明显。",
          en: "Bring a light outer layer; temperature shifts are stronger around the wetland edge."
        }),
        HHK.i18n.text({
          zh: aiMode ? "AI 模拟推荐已结合热度、潮汐和用户偏好做权重调整。" : "当前结果由前端算法即时计算，可反复切换偏好重算。",
          en: aiMode
            ? "The AI simulation adjusted weights by heat, tide windows, and your selected preference."
            : "This result was computed locally in the browser and can be regenerated instantly."
        })
      ];

      return {
        title: title,
        summary: HHK.i18n.text(summary),
        tips: tips,
        items: items,
        aiMode: aiMode
      };
    }

    function renderResult(route) {
      HHK.store.setRouteCache({
        title: route.title,
        summary: route.summary,
        generatedAt: new Date().toISOString()
      });

      var timeline = route.items
        .map(function (item) {
          return (
            '<div class="timeline-item pb-8">' +
            '<span class="timeline-dot"></span>' +
            '<div class="rounded-[24px] border border-white/10 bg-white/70 p-5 dark:bg-slate-950/60">' +
            '<div class="flex flex-wrap items-center justify-between gap-3">' +
            '<div><div class="text-sm font-semibold text-brand-700 dark:text-brand-200">' +
            HHK.utils.escapeHtml(item.time) +
            '</div><h3 class="mt-2 font-display text-xl font-semibold text-slate-900 dark:text-white">' +
            HHK.utils.escapeHtml(HHK.i18n.text(item.place.title)) +
            '</h3><p class="mt-2 text-sm text-slate-500 dark:text-slate-300">' +
            HHK.utils.escapeHtml(HHK.i18n.text(item.place.region)) +
            '</p></div><span class="badge-soft">' +
            HHK.utils.escapeHtml(HHK.i18n.text(item.place.price)) +
            "</span></div>" +
            '<p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">' +
            HHK.utils.escapeHtml(HHK.i18n.text(item.place.summary)) +
            '</p><p class="mt-3 text-xs leading-6 text-slate-400">' +
            HHK.utils.escapeHtml(item.reason) +
            '</p><div class="mt-4 flex flex-wrap gap-2">' +
            '<a href="' +
            HHK.utils.placeHref(item.place) +
            '" class="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white dark:bg-brand-300 dark:text-slate-950">' +
            HHK.utils.escapeHtml(HHK.i18n.t("viewDetails")) +
            "</a>" +
            HHK.utils.renderFavoriteButton(item.place.id) +
            "</div></div></div>"
          );
        })
        .join("");

      var cards = route.items
        .map(function (item) {
          return HHK.utils.renderPlaceCard(item.place, { tagCount: 2 });
        })
        .join("");

      document.getElementById("route-result").innerHTML =
        '<div class="glass-panel rounded-[32px] p-6 md:p-8">' +
        '<div class="flex flex-wrap items-center justify-between gap-4">' +
        '<div><span class="badge-soft">' +
        HHK.utils.escapeHtml(route.aiMode ? HHK.i18n.t("generateAiRoute") : HHK.i18n.t("generateRoute")) +
        '</span><h2 class="mt-4 font-display text-3xl font-semibold text-slate-900 dark:text-white">' +
        HHK.utils.escapeHtml(route.title) +
        '</h2><p class="mt-3 max-w-3xl text-sm leading-7 text-slate-500 dark:text-slate-300">' +
        HHK.utils.escapeHtml(route.summary) +
        "</p></div></div>" +
        '<div class="mt-8 grid gap-8 xl:grid-cols-[1fr_0.9fr]"><div class="timeline">' +
        timeline +
        '</div><div class="space-y-6"><div class="glass-card rounded-[28px] p-5"><h3 class="font-display text-xl font-semibold text-slate-900 dark:text-white">' +
        HHK.utils.escapeHtml(HHK.i18n.t("routeTips")) +
        "</h3><ul class=\"mt-4 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300\">" +
        route.tips
          .map(function (tip) {
            return "<li>• " + HHK.utils.escapeHtml(tip) + "</li>";
          })
          .join("") +
        '</ul></div><div class="grid gap-5">' +
        cards +
        "</div></div></div></div>";
      HHK.utils.updateFavoriteButtons();
      HHK.utils.refreshIcons();
      HHK.utils.showToast(HHK.i18n.t("copiedRoute"), "success");
    }

    function generate(aiMode) {
      var loader = document.getElementById("route-loader");
      if (aiMode) {
        loader.classList.remove("hidden");
        loader.textContent = HHK.i18n.t("aiThinking");
        window.setTimeout(function () {
          loader.classList.add("hidden");
          renderResult(buildRoute(state.duration, state.preference, true));
        }, 1200);
      } else {
        loader.classList.add("hidden");
        renderResult(buildRoute(state.duration, state.preference, false));
      }
    }

    function renderDurationOptions() {
      renderOptionGroup("duration-options", ["half-day", "full-day"], state.duration, function (value) {
        state.duration = value;
        renderDurationOptions();
      });
    }

    function renderPreferenceOptions() {
      renderOptionGroup("preference-options", ["nature", "photography", "leisure"], state.preference, function (value) {
        state.preference = value;
        renderPreferenceOptions();
      });
    }

    frame();
    renderDurationOptions();
    renderPreferenceOptions();

    document.getElementById("generate-route").addEventListener("click", function () {
      generate(false);
    });
    document.getElementById("generate-ai-route").addEventListener("click", function () {
      generate(true);
    });

    generate(HHK.utils.query("mode") === "ai");
  };
})(window);
