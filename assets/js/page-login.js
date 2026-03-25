(function (window) {
  var HHK = (window.HHK = window.HHK || {});

  HHK.pages.login = function () {
    var root = document.getElementById("page-root");
    var returnTo = HHK.utils.query("returnTo") || "index.html";
    var user = HHK.store.getCurrentUser();

    root.innerHTML =
      '<section class="container-shell pt-6 md:pt-10">' +
      '<div class="premium-community-hero">' +
      '<div class="premium-community-hero-copy">' +
      '<span class="premium-eyebrow">Visitor Access</span>' +
      '<h1 class="premium-section-title">登录后即可收藏心动点位、发布旅行笔记，并保留你的黄河口游览偏好。</h1>' +
      '<p class="premium-section-description">为了让收藏、社区互动与路线浏览保持连贯，我们为游客准备了统一的访问入口。进入后，你的偏好与心动清单都会持续可见。</p>' +
      '</div><div class="premium-section-shell">' +
      (user
        ? '<div class="premium-section-head compact"><div><span class="premium-section-kicker">Welcome Back</span><h2 class="premium-section-title">你好，' +
          HHK.utils.escapeHtml(user.displayName) +
          '</h2><p class="premium-section-description">你的账号已经就绪，可以继续浏览社区、收藏点位或返回刚才的页面。</p></div></div>' +
          '<div class="premium-hero-actions mt-6"><a href="' +
          HHK.utils.escapeHtml(returnTo) +
          '" class="premium-primary-button">继续浏览</a><button type="button" data-action="logout" class="premium-secondary-button">退出登录</button></div>'
        : '<form id="login-form" class="community-compose-form">' +
          '<label class="community-compose-field"><span>账号</span><input id="login-username" type="text" value="root" /></label>' +
          '<label class="community-compose-field"><span>密码</span><input id="login-password" type="password" value="123456" /></label>' +
          '<button type="submit" class="premium-primary-button community-submit">进入黄河口旅程</button>' +
          '<div class="premium-note-copy">登录后返回：' +
          HHK.utils.escapeHtml(returnTo) +
          "</div></form>") +
      "</div></div></section>";

    var form = document.getElementById("login-form");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var session = HHK.store.login(
          document.getElementById("login-username").value.trim(),
          document.getElementById("login-password").value
        );
        if (session) {
          HHK.utils.showToast("登录成功，欢迎回来", "success");
          window.setTimeout(function () {
            window.location.href = returnTo;
          }, 400);
        } else {
          HHK.utils.showToast("账号或密码有误", "warning");
        }
      });
    }
  };
})(window);
