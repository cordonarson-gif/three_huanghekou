(function (window) {
  var HHK = (window.HHK = window.HHK || {});

  HHK.pages.community = function () {
    var root = document.getElementById("page-root");
    var sortMode = "latest";
    var currentPage = 1;
    var pageSize = 10;
    var previewPayload = null;

    function text(value) {
      return HHK.i18n.text(value);
    }

    function escapeHtml(value) {
      return HHK.utils.escapeHtml(value);
    }

    function sortDefinitions() {
      return [
        { id: "latest", label: { zh: "最新", en: "Latest" } },
        { id: "hottest", label: { zh: "最热", en: "Hottest" } },
        { id: "positive", label: { zh: "好评", en: "Top rated" } },
        { id: "with-image", label: { zh: "带图", en: "With photos" } }
      ];
    }

    function allComments() {
      return HHK.store.getComments().slice();
    }

    function sortedComments() {
      var comments = allComments();

      if (sortMode === "with-image") {
        comments = comments.filter(function (comment) {
          return comment.images && comment.images.length;
        });
      }

      comments.sort(function (left, right) {
        if (sortMode === "hottest") {
          return (
            (right.likes || 0) +
            (right.replies || 0) * 2 +
            (right.shares || 0) -
            ((left.likes || 0) + (left.replies || 0) * 2 + (left.shares || 0))
          );
        }

        if (sortMode === "positive") {
          return right.rating - left.rating || new Date(right.createdAt) - new Date(left.createdAt);
        }

        return new Date(right.createdAt) - new Date(left.createdAt);
      });

      return comments;
    }

    function pageItems() {
      var items = sortedComments();
      var start = (currentPage - 1) * pageSize;
      return items.slice(start, start + pageSize);
    }

    function totalPages() {
      return Math.max(1, Math.ceil(sortedComments().length / pageSize));
    }

    function averageScore() {
      var comments = allComments();
      return (
        comments.reduce(function (sum, comment) {
          return sum + comment.rating;
        }, 0) / (comments.length || 1)
      );
    }

    function imageRatio() {
      var comments = allComments();
      var withImages = comments.filter(function (comment) {
        return comment.images && comment.images.length;
      }).length;
      return Math.round((withImages / (comments.length || 1)) * 100);
    }

    function renderFrame() {
      var total = allComments().length;
      var avg = averageScore();
      var ratio = imageRatio();
      var user = HHK.store.getCurrentUser();

      root.innerHTML =
        '<section class="container-shell pt-6 md:pt-10">' +
        '<div class="premium-community-hero">' +
        '<div class="premium-community-hero-copy">' +
        '<span class="premium-eyebrow">Traveler Community</span>' +
        '<h1 class="premium-section-title">把游客真实体验、摄影灵感和住宿餐饮建议，汇成一份会持续更新的黄河口旅行现场。</h1>' +
        '<p class="premium-section-description">你可以按热度、时间、好评或带图笔记筛选，也可以直接翻页浏览每一批高质量旅行分享。整页保持轻量信息密度，让内容更像一本高级旅行杂志。</p>' +
        '<div id="community-sort" class="premium-filter-row mt-6"></div>' +
        '</div><div class="premium-community-hero-stats">' +
        '<article class="premium-stat-card"><div class="premium-stat-icon">📝</div><div class="premium-stat-text"><div class="premium-stat-label">旅行笔记</div><div class="premium-stat-helper">持续更新</div></div><div class="premium-stat-value">' +
        total +
        '</div></article>' +
        '<article class="premium-stat-card"><div class="premium-stat-icon">⭐</div><div class="premium-stat-text"><div class="premium-stat-label">平均评分</div><div class="premium-stat-helper">真实口碑</div></div><div class="premium-stat-value">' +
        avg.toFixed(1) +
        '</div></article>' +
        '<article class="premium-stat-card"><div class="premium-stat-icon">🖼️</div><div class="premium-stat-text"><div class="premium-stat-label">带图比例</div><div class="premium-stat-helper">可视化旅行记录</div></div><div class="premium-stat-value">' +
        ratio +
        '%</div></article>' +
        "</div></div></section>" +
        '<section class="container-shell py-8 md:py-10">' +
        '<div class="premium-community-grid">' +
        '<aside class="premium-community-sidebar">' +
        '<div class="premium-section-shell">' +
        '<div class="premium-section-head compact"><div><span class="premium-section-kicker">Posting</span><h2 class="premium-section-title">发布你的黄河口时刻</h2></div></div>' +
        (user
          ? '<form id="community-form" class="community-compose-form">' +
            '<label class="community-compose-field"><span>地点</span><select id="comment-place">' +
            HHK.data.places
              .map(function (place) {
                return (
                  '<option value="' +
                  place.id +
                  '">' +
                  escapeHtml(text(place.title)) +
                  "</option>"
                );
              })
              .join("") +
            '</select></label>' +
            '<label class="community-compose-field"><span>评分</span><select id="comment-rating"><option value="5">5 星</option><option value="4">4 星</option><option value="3">3 星</option><option value="2">2 星</option><option value="1">1 星</option></select></label>' +
            '<label class="community-compose-field"><span>内容</span><textarea id="comment-content" rows="5" placeholder="分享你最推荐的时间、视角、玩法或餐饮体验"></textarea></label>' +
            '<button type="submit" class="premium-primary-button community-submit">发布旅行笔记</button>' +
            '</form>'
          : '<div class="community-signin-card"><p>登录后可以收藏路线、发布旅行笔记，并参与社区互动。</p><a href="login.html?returnTo=community.html" class="premium-primary-button small">游客登录</a></div>') +
        '</div><div class="premium-section-shell">' +
        '<div class="premium-section-head compact"><div><span class="premium-section-kicker">Trending Topics</span><h2 class="premium-section-title">大家最近在聊什么</h2></div></div>' +
        '<div class="community-topic-list">' +
        '<div class="community-topic-pill">日出追光</div>' +
        '<div class="community-topic-pill">湿地观鸟</div>' +
        '<div class="community-topic-pill">亲子路线</div>' +
        '<div class="community-topic-pill">民宿窗景</div>' +
        '<div class="community-topic-pill">本地风味</div>' +
        '</div></div></aside>' +
        '<section class="premium-section-shell">' +
        '<div id="community-list" class="community-list-shell"></div>' +
        '<div id="community-pagination" class="community-pagination"></div>' +
        "</section></div></section>" +
        '<div id="community-lightbox-backdrop" class="premium-modal-backdrop"></div>' +
        '<div id="community-lightbox" class="community-lightbox"></div>';
    }

    function renderSort() {
      var container = document.getElementById("community-sort");
      container.innerHTML = sortDefinitions()
        .map(function (item) {
          return (
            '<button type="button" data-sort="' +
            item.id +
            '" class="premium-filter-pill ' +
            (sortMode === item.id ? "is-active" : "") +
            '">' +
            escapeHtml(text(item.label)) +
            "</button>"
          );
        })
        .join("");
    }

    function commentCardMarkup(comment) {
      var place = HHK.utils.getPlaceById(comment.placeId);
      var liked = HHK.store.hasLikedComment(comment.id);
      var images = comment.images || [];
      var imageMarkup = images.length
        ? '<div class="community-image-grid count-' +
          Math.min(images.length, 3) +
          '">' +
          images
            .map(function (image, index) {
              return (
                '<button type="button" data-preview-comment="' +
                comment.id +
                '" data-preview-index="' +
                index +
                '" class="community-image-tile">' +
                '<img src="' +
                escapeHtml(image) +
                '" alt="' +
                escapeHtml(comment.author) +
                '" loading="lazy" decoding="async" referrerpolicy="no-referrer" class="h-full w-full object-cover" />' +
                "</button>"
              );
            })
            .join("") +
          "</div>"
        : "";

      return (
        '<article class="community-card">' +
        '<div class="community-card-head">' +
        '<div class="community-user-block">' +
        '<img src="' +
        escapeHtml(comment.avatar) +
        '" alt="' +
        escapeHtml(comment.author) +
        '" class="community-avatar" />' +
        '<div><div class="community-user-name">' +
        escapeHtml(comment.author) +
        '</div><div class="community-user-meta">' +
        escapeHtml(HHK.utils.formatDate(comment.createdAt)) +
        (place ? " · " + escapeHtml(text(place.title)) : "") +
        "</div></div></div>" +
        '<div class="community-rating">' +
        HHK.utils.stars(comment.rating) +
        "</div></div>" +
        '<p class="community-copy">' +
        escapeHtml(comment.content) +
        "</p>" +
        imageMarkup +
        '<div class="community-card-actions">' +
        '<button type="button" data-like-comment="' +
        comment.id +
        '" class="community-action-button ' +
        (liked ? "is-active" : "") +
        '">❤ ' +
        escapeHtml(String(comment.likes || 0)) +
        '</button>' +
        '<button type="button" data-reply-comment="' +
        comment.id +
        '" class="community-action-button">↩ 回复 ' +
        escapeHtml(String(comment.replies || 0)) +
        '</button>' +
        '<button type="button" data-share-comment="' +
        comment.id +
        '" class="community-action-button">⤴ 分享 ' +
        escapeHtml(String(comment.shares || 0)) +
        "</button></div></article>"
      );
    }

    function renderPagination() {
      var total = totalPages();
      var pagination = document.getElementById("community-pagination");
      var buttons = [];
      var page;
      for (page = 1; page <= total; page += 1) {
        buttons.push(
          '<button type="button" data-page="' +
            page +
            '" class="community-page-button ' +
            (page === currentPage ? "is-active" : "") +
            '">' +
            page +
            "</button>"
        );
      }
      pagination.innerHTML = buttons.join("");
    }

    function renderList(animate) {
      var list = document.getElementById("community-list");
      var items = pageItems();

      function paint() {
        list.innerHTML = items.map(commentCardMarkup).join("");
        list.classList.remove("is-switching");
      }

      if (animate) {
        list.classList.add("is-switching");
        window.setTimeout(paint, 140);
      } else {
        paint();
      }

      renderPagination();
      HHK.utils.refreshIcons();
    }

    function openPreview(commentId, index) {
      var comment = commentId === "manual"
        ? { author: previewPayload ? previewPayload.title : "", images: previewPayload ? previewPayload.images : [] }
        : allComments().find(function (item) {
            return item.id === commentId;
          });
      var lightbox = document.getElementById("community-lightbox");
      var backdrop = document.getElementById("community-lightbox-backdrop");

      if (!comment || !comment.images || !comment.images.length) {
        return;
      }

      previewPayload = {
        images: comment.images,
        index: index || 0,
        title: comment.author
      };

      lightbox.innerHTML =
        '<div class="community-lightbox-card">' +
        '<button type="button" data-close-preview="true" class="premium-modal-close">×</button>' +
        '<img src="' +
        escapeHtml(previewPayload.images[previewPayload.index]) +
        '" alt="' +
        escapeHtml(previewPayload.title) +
        '" class="community-lightbox-image" />' +
        '<div class="community-lightbox-strip">' +
        previewPayload.images
          .map(function (image, idx) {
            return (
              '<button type="button" data-preview-step="' +
              idx +
              '" class="community-lightbox-thumb ' +
              (idx === previewPayload.index ? "is-active" : "") +
              '">' +
              '<img src="' +
              escapeHtml(image) +
              '" alt="' +
              escapeHtml(previewPayload.title) +
              '" class="h-full w-full object-cover" />' +
              "</button>"
            );
          })
          .join("") +
        "</div></div>";
      lightbox.classList.add("is-open");
      backdrop.classList.add("is-visible");
    }

    function closePreview() {
      var lightbox = document.getElementById("community-lightbox");
      var backdrop = document.getElementById("community-lightbox-backdrop");
      previewPayload = null;
      lightbox.classList.remove("is-open");
      backdrop.classList.remove("is-visible");
    }

    function shareComment(commentId) {
      var url = new URL("community.html#" + commentId, window.location.href).href;
      if (navigator.share) {
        navigator
          .share({
            title: "黄河口游客社区",
            text: "一条值得收藏的黄河口旅行笔记",
            url: url
          })
          .catch(function () {});
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          HHK.utils.showToast("分享链接已复制", "success");
        });
      }
    }

    function bindComposer() {
      var form = document.getElementById("community-form");
      var user = HHK.store.getCurrentUser();
      if (!form || !user) {
        return;
      }

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
        currentPage = 1;
        renderList(true);
        form.reset();
        HHK.utils.showToast("旅行笔记已发布", "success");
      });
    }

    function bindEvents() {
      root.addEventListener("click", function (event) {
        var sortButton = event.target.closest("[data-sort]");
        var pageButton = event.target.closest("[data-page]");
        var likeButton = event.target.closest("[data-like-comment]");
        var shareButton = event.target.closest("[data-share-comment]");
        var replyButton = event.target.closest("[data-reply-comment]");
        var previewButton = event.target.closest("[data-preview-comment]");
        var previewStepButton = event.target.closest("[data-preview-step]");
        var closePreviewButton = event.target.closest("[data-close-preview]");

        if (sortButton) {
          sortMode = sortButton.getAttribute("data-sort");
          currentPage = 1;
          renderSort();
          renderList(true);
          return;
        }

        if (pageButton) {
          currentPage = Number(pageButton.getAttribute("data-page")) || 1;
          renderPagination();
          renderList(true);
          return;
        }

        if (likeButton) {
          HHK.store.toggleCommentLike(likeButton.getAttribute("data-like-comment"));
          renderList(false);
          return;
        }

        if (shareButton) {
          shareComment(shareButton.getAttribute("data-share-comment"));
          return;
        }

        if (replyButton) {
          var formField = document.getElementById("comment-content");
          if (formField) {
            formField.focus();
            if (!formField.value) {
              formField.value = "回复这条笔记：";
            }
          } else {
            HHK.utils.showToast("登录后即可参与回复", "warning");
          }
          return;
        }

        if (previewButton) {
          openPreview(
            previewButton.getAttribute("data-preview-comment"),
            Number(previewButton.getAttribute("data-preview-index")) || 0
          );
          return;
        }

        if (previewStepButton && previewPayload) {
          openPreview("manual", Number(previewStepButton.getAttribute("data-preview-step")) || 0);
          return;
        }

        if (closePreviewButton) {
          closePreview();
        }
      });

      document
        .getElementById("community-lightbox-backdrop")
        .addEventListener("click", closePreview);

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          closePreview();
        }
      });
    }

    renderFrame();
    renderSort();
    renderList(false);
    bindComposer();
    bindEvents();
  };
})(window);
