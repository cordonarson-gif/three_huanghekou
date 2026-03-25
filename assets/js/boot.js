(function () {
  var key = "hhk:preferences:v1";
  var defaults = { theme: "light", locale: "zh" };
  var preferences = defaults;

  try {
    var raw = window.localStorage.getItem(key);
    if (raw) {
      preferences = Object.assign({}, defaults, JSON.parse(raw));
    }
  } catch (error) {
    preferences = defaults;
  }

  document.documentElement.classList.toggle("dark", preferences.theme === "dark");
  document.documentElement.lang = preferences.locale === "en" ? "en" : "zh-CN";
})();
