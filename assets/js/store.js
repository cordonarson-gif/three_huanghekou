(function (window) {
  var HHK = (window.HHK = window.HHK || {});
  var memory = {};

  function safeStorage() {
    try {
      var testKey = "__hhk_test__";
      window.localStorage.setItem(testKey, "1");
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    } catch (error) {
      return {
        getItem: function (key) {
          return memory[key] || null;
        },
        setItem: function (key, value) {
          memory[key] = String(value);
        },
        removeItem: function (key) {
          delete memory[key];
        }
      };
    }
  }

  var storage = safeStorage();
  var keys = HHK.config.storageKeys;

  function read(key, fallback) {
    try {
      var raw = storage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function write(key, value) {
    storage.setItem(key, JSON.stringify(value));
    return value;
  }

  function ensurePreferences() {
    var preferences = read(keys.preferences, null);
    if (!preferences) {
      preferences = write(keys.preferences, {
        locale: HHK.config.defaults.locale,
        theme: HHK.config.defaults.theme
      });
    }
    return preferences;
  }

  function ensureComments() {
    var comments = read(keys.comments, null);
    if (
      !comments ||
      !comments.length ||
      comments.length < 20 ||
      !comments[0].avatar ||
      !comments[0].images
    ) {
      comments = write(keys.comments, HHK.data.communitySeedComments.slice());
    }
    return comments;
  }

  HHK.store = {
    init: function () {
      ensurePreferences();
      ensureComments();
      if (!read(keys.favorites, null)) {
        write(keys.favorites, []);
      }
      if (!read(keys.likedComments, null)) {
        write(keys.likedComments, []);
      }
      if (!read(keys.routeCache, null)) {
        write(keys.routeCache, null);
      }
    },
    getPreferences: function () {
      return ensurePreferences();
    },
    updatePreferences: function (partial) {
      var next = Object.assign({}, ensurePreferences(), partial);
      return write(keys.preferences, next);
    },
    getTheme: function () {
      return ensurePreferences().theme || HHK.config.defaults.theme;
    },
    setTheme: function (theme) {
      return this.updatePreferences({ theme: theme });
    },
    getLocale: function () {
      return ensurePreferences().locale || HHK.config.defaults.locale;
    },
    setLocale: function (locale) {
      return this.updatePreferences({ locale: locale });
    },
    getSession: function () {
      return read(keys.session, null);
    },
    getCurrentUser: function () {
      var session = this.getSession();
      return session && session.user ? session.user : null;
    },
    isLoggedIn: function () {
      return !!this.getCurrentUser();
    },
    login: function (username, password) {
      if (
        username === HHK.config.credentials.username &&
        password === HHK.config.credentials.password
      ) {
        return write(keys.session, {
          user: {
            id: "root",
            username: "root",
            displayName: "root"
          },
          loggedAt: new Date().toISOString()
        });
      }
      return null;
    },
    logout: function () {
      storage.removeItem(keys.session);
    },
    getFavorites: function () {
      return read(keys.favorites, []);
    },
    isFavorite: function (placeId) {
      return this.getFavorites().indexOf(placeId) > -1;
    },
    toggleFavorite: function (placeId) {
      var favorites = this.getFavorites().slice();
      var index = favorites.indexOf(placeId);
      if (index > -1) {
        favorites.splice(index, 1);
      } else {
        favorites.push(placeId);
      }
      write(keys.favorites, favorites);
      return favorites;
    },
    getComments: function () {
      return ensureComments().slice();
    },
    addComment: function (payload) {
      var comments = ensureComments().slice();
      comments.unshift({
        id: "comment-" + Date.now(),
        ownerId: payload.ownerId,
        author: payload.author,
        avatar:
          payload.avatar || HHK.createAvatarDataUri(payload.author || "guest"),
        placeId: payload.placeId,
        rating: payload.rating,
        likes: 0,
        replies: 0,
        shares: 0,
        createdAt: new Date().toISOString(),
        content: payload.content,
        images: payload.images || []
      });
      write(keys.comments, comments);
      return comments;
    },
    deleteComment: function (commentId) {
      var comments = ensureComments().filter(function (comment) {
        return comment.id !== commentId;
      });
      write(keys.comments, comments);
      return comments;
    },
    getLikedComments: function () {
      return read(keys.likedComments, []);
    },
    hasLikedComment: function (commentId) {
      return this.getLikedComments().indexOf(commentId) > -1;
    },
    toggleCommentLike: function (commentId) {
      var comments = ensureComments().slice();
      var liked = this.getLikedComments().slice();
      var comment = comments.find(function (item) {
        return item.id === commentId;
      });

      if (!comment) {
        return { comments: comments, liked: liked };
      }

      var index = liked.indexOf(commentId);
      if (index > -1) {
        liked.splice(index, 1);
        comment.likes = Math.max(0, (comment.likes || 0) - 1);
      } else {
        liked.push(commentId);
        comment.likes = (comment.likes || 0) + 1;
      }

      write(keys.comments, comments);
      write(keys.likedComments, liked);
      return { comments: comments, liked: liked };
    },
    getRouteCache: function () {
      return read(keys.routeCache, null);
    },
    setRouteCache: function (payload) {
      return write(keys.routeCache, payload);
    },
    resetDemoData: function () {
      var preferences = ensurePreferences();
      storage.removeItem(keys.session);
      storage.removeItem(keys.favorites);
      storage.removeItem(keys.comments);
      storage.removeItem(keys.likedComments);
      storage.removeItem(keys.routeCache);
      write(keys.preferences, preferences);
      this.init();
    }
  };
})(window);
