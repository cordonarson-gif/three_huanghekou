(function (window) {
  var HHK = (window.HHK = window.HHK || {});

  HHK.pages.community = function () {
    var root = document.getElementById("page-root");
    var sortMode = "latest";

    function renderFrame() {
      root.innerHTML =
        '<section class="container-shell pt-6 md:pt-10">' +
        '<div class="glass-panel rounded-[34px] p-6 md:p-8">' +
        '<div class="flex flex-wrap items-center justify-between gap-4">' +
        '<div><span class="badge-soft">' +
        HHK.utils.escapeHtml(HHK.i18n.t("frontendCommunity")) +
        '</span>' +
        '<h1 class="mt-4 font-display text-3xl font-semibold text-slate-900 dark:text-white md:text-5xl">' +
        HHK.utils.escapeHtml(HHK.i18n.t("communityTitle")) +
        '</h1><p class="mt-3 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-300">' +
        HHK.utils.escapeHtml(HHK.i18n.t("communityDescription")) +
        '</p></div><div class="flex flex-wrap gap-2" id="community-sort"></div></div>' +
        '<div class="mt-8 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">' +
        '<aside id="community-composer"></aside><section id="community-list" class="space-y-5"></section>' +
        "</div></div></section>";
    }

    function renderSort() {
      var container = document.getElementById("community-sort");
      container.innerHTML = ["latest", "hottest"]
        .map(function (option) {
          return (
            '<button type="button" data-sort="' +
            option +
            '" class="filter-pill ' +
            (sortMode === option ? "is-active" : "") +
            '">' +
            HHK.utils.escapeHtml(HHK.i18n.t(option)) +
            "</button>"
          );
        })
        .join("");
      container.querySelectorAll("[data-sort]").forEach(function (button) {
        button.addEventListener("click", function () {
          sortMode = button.getAttribute("data-sort");
          renderSort();
          renderList();
        });
      });
    }

    function renderComposer() {
      var composer = document.getElementById("community-composer");
      var user = HHK.store.getCurrentUser();
      var options = HHK.data.places
        .map(function (place) {
          return (
            '<option value="' +
            place.id +
            '">' +
            HHK.utils.escapeHtml(HHK.i18n.text(place.title)) +
            "</option>"
          );
        })
        .join("");

      composer.innerHTML =
        '<div class="glass-card rounded-[28px] p-6">' +
        '<div class="flex items-center justify-between gap-4">' +
        '<div><h2 class="font-display text-2xl font-semibold text-slate-900 dark:text-white">' +
        HHK.utils.escapeHtml(HHK.i18n.t("shareMoment")) +
        '</h2>' +
        '<p class="mt-2 text-sm text-slate-500 dark:text-slate-300">' +
        (user
          ? HHK.utils.escapeHtml(HHK.i18n.t("welcomeBack")) + ": " + HHK.utils.escapeHtml(user.displayName)
          : HHK.utils.escapeHtml(HHK.i18n.t("loginDescription"))) +
        "</p></div>" +
        '<span class="badge-soft">' +
        (user ? "root" : HHK.i18n.t("guestLabel")) +
        "</span></div>" +
        (user
          ? '<form id="community-form" class="mt-6 space-y-4">' +
            '<div><label class="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">' +
            HHK.utils.escapeHtml(HHK.i18n.t("spotLabel")) +
            '</label>' +
            '<select id="comment-place" class="w-full rounded-[18px] border border-white/10 bg-white/70 px-4 py-3 text-sm outline-none dark:bg-slate-950/60">' +
            options +
            '</select></div><div><label class="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">' +
            HHK.utils.escapeHtml(HHK.i18n.t("ratingLabel")) +
            '</label>' +
            '<select id="comment-rating" class="w-full rounded-[18px] border border-white/10 bg-white/70 px-4 py-3 text-sm outline-none dark:bg-slate-950/60">' +
            '<option value="5">5</option><option value="4">4</option><option value="3">3</option><option value="2">2</option><option value="1">1</option></select></div>' +
            '<div><label class="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">' +
            HHK.utils.escapeHtml(HHK.i18n.t("commentLabel")) +
            '</label>' +
            '<textarea id="comment-content" rows="5" class="w-full rounded-[18px] border border-white/10 bg-white/70 px-4 py-3 text-sm outline-none dark:bg-slate-950/60" placeholder="' +
            HHK.utils.escapeHtml(HHK.i18n.t("commentPlaceholder")) +
            '"></textarea></div><button class="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white dark:bg-brand-300 dark:text-slate-950">' +
            HHK.utils.escapeHtml(HHK.i18n.t("publishComment")) +
            "</button></form>"
          : '<div class="empty-state mt-6 rounded-[22px] p-5 text-sm text-slate-500 dark:text-slate-300">' +
            HHK.utils.escapeHtml(HHK.i18n.t("loginRequired")) +
            '<div class="mt-4"><a href="login.html?returnTo=community.html" class="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white dark:bg-brand-300 dark:text-slate-950">' +
            HHK.utils.escapeHtml(HHK.i18n.t("login")) +
            "</a></div></div>") +
        "</div>";

      var form = document.getElementById("community-form");
      if (form) {
        form.addEventListener("submit", function (event) {
          event.preventDefault();
          var content = document.getElementById("comment-content").value.trim();
          if (!content) {
            return;
          }
          HHK.store.addComment({
            ownerId: user.id,
            author: user.displayName,
            placeId: document.getElementById("comment-place").value,
            rating: Number(document.getElementById("comment-rating").value),
            content: content
          });
          form.reset();
          HHK.utils.showToast(HHK.i18n.t("commentPublished"), "success");
          renderList();
        });
      }
    }

    function sortedComments() {
      return HHK.store
        .getComments()
        .sort(function (left, right) {
          if (sortMode === "hottest") {
            return (right.likes || 0) - (left.likes || 0);
          }
          return new Date(right.createdAt) - new Date(left.createdAt);
        });
    }

    function renderList() {
      var currentUser = HHK.store.getCurrentUser();
      var list = document.getElementById("community-list");
      list.innerHTML = sortedComments()
        .map(function (comment) {
          var place = HHK.utils.getPlaceById(comment.placeId);
          var liked = HHK.store.hasLikedComment(comment.id);
          var own = currentUser && currentUser.id === comment.ownerId;
          return (
            '<article class="glass-card rounded-[28px] p-5">' +
            '<div class="flex flex-wrap items-start justify-between gap-4">' +
            '<div class="flex items-center gap-4">' +
            '<div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-brand-300 dark:text-slate-950">' +
            HHK.utils.escapeHtml(comment.author.slice(0, 1).toUpperCase()) +
            "</div><div><div class=\"font-semibold text-slate-900 dark:text-white\">" +
            HHK.utils.escapeHtml(comment.author) +
            '</div><div class="text-xs text-slate-500 dark:text-slate-300">' +
            HHK.utils.escapeHtml(HHK.utils.formatDate(comment.createdAt)) +
            "</div></div></div>" +
            '<div class="flex items-center gap-1">' +
            HHK.utils.stars(comment.rating) +
            "</div></div>" +
            (place
              ? '<div class="mt-4 rounded-[22px] border border-white/10 bg-white/70 p-4 dark:bg-slate-950/60">' +
                '<div class="text-xs uppercase tracking-[0.18em] text-slate-400">' +
                HHK.utils.escapeHtml(HHK.utils.getTypeKey(place.type)) +
                '</div><div class="mt-2 font-semibold text-slate-900 dark:text-white">' +
                HHK.utils.escapeHtml(HHK.i18n.text(place.title)) +
                "</div></div>"
              : "") +
            '<p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">' +
            HHK.utils.escapeHtml(comment.content) +
            '</p><div class="mt-5 flex flex-wrap items-center gap-3">' +
            '<button type="button" data-like-comment="' +
            comment.id +
            '" class="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold ' +
            (liked
              ? "bg-slate-900 text-white dark:bg-brand-300 dark:text-slate-950"
              : "text-slate-700 dark:text-slate-100") +
            '">' +
            "♥ " +
            HHK.utils.escapeHtml(String(comment.likes || 0)) +
            "</button>" +
            (place
              ? '<a href="' +
                HHK.utils.placeHref(place) +
                '" class="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-100">' +
                HHK.utils.escapeHtml(HHK.i18n.t("viewDetails")) +
                "</a>"
              : "") +
            (own
              ? '<button type="button" data-delete-comment="' +
                comment.id +
                '" class="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 dark:border-rose-400/40 dark:text-rose-300">' +
                HHK.utils.escapeHtml(HHK.i18n.t("delete")) +
                "</button>"
              : "") +
            "</div></article>"
          );
        })
        .join("");

      document.querySelectorAll("[data-like-comment]").forEach(function (button) {
        button.addEventListener("click", function () {
          HHK.store.toggleCommentLike(button.getAttribute("data-like-comment"));
          renderList();
        });
      });

      document.querySelectorAll("[data-delete-comment]").forEach(function (button) {
        button.addEventListener("click", function () {
          HHK.store.deleteComment(button.getAttribute("data-delete-comment"));
          HHK.utils.showToast(HHK.i18n.t("commentDeleted"), "success");
          renderList();
        });
      });

      HHK.utils.refreshIcons();
    }

    renderFrame();
    renderSort();
    renderComposer();
    renderList();
  };
})(window);
