(function (window) {
  var HHK = (window.HHK = window.HHK || {});

  HHK.pages.login = function () {
    var root = document.getElementById("page-root");
    var returnTo = HHK.utils.query("returnTo") || "index.html";
    var user = HHK.store.getCurrentUser();

    root.innerHTML =
      '<section class="container-shell pt-6 md:pt-10">' +
      '<div class="grid overflow-hidden rounded-[36px] border border-white/10 bg-white/70 shadow-glass dark:bg-slate-950/65 xl:grid-cols-[1fr_0.95fr]">' +
      '<div class="relative overflow-hidden bg-aurora p-8 md:p-12 dark:bg-nightfall">' +
      '<span class="mesh mesh-1"></span><span class="mesh mesh-2"></span>' +
      '<span class="badge-soft bg-white/80 dark:bg-slate-950/65">root / 123456</span>' +
      '<h1 class="mt-6 font-display text-4xl font-semibold text-slate-950 dark:text-white md:text-5xl">' +
      HHK.utils.escapeHtml(HHK.i18n.t("loginTitle")) +
      '</h1><p class="mt-4 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">' +
      HHK.utils.escapeHtml(HHK.i18n.t("loginDescription")) +
      '</p><div class="mt-8 grid gap-4 md:grid-cols-2">' +
      HHK.data.heroStats
        .slice(0, 4)
        .map(function (item) {
          return (
            '<div class="glass-card rounded-[24px] p-4">' +
            '<div class="font-display text-2xl font-semibold text-slate-900 dark:text-white">' +
            HHK.utils.escapeHtml(item.value) +
            '</div><div class="mt-2 text-sm text-slate-500 dark:text-slate-300">' +
            HHK.utils.escapeHtml(HHK.i18n.text(item.label)) +
            "</div></div>"
          );
        })
        .join("") +
      '</div></div><div class="p-8 md:p-12">' +
      (user
        ? '<div class="glass-card rounded-[28px] p-6"><span class="badge-soft">' +
          HHK.utils.escapeHtml(HHK.i18n.t("welcomeBack")) +
          '</span><h2 class="mt-4 font-display text-3xl font-semibold text-slate-900 dark:text-white">' +
          HHK.utils.escapeHtml(user.displayName) +
          '</h2><p class="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-300">' +
          HHK.utils.escapeHtml(HHK.i18n.t("signedInHint")) +
          '</p>' +
          '<div class="mt-6 flex flex-wrap gap-3"><a href="' +
          HHK.utils.escapeHtml(returnTo) +
          '" class="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white dark:bg-brand-300 dark:text-slate-950">' +
          HHK.utils.escapeHtml(HHK.i18n.t("continueAction")) +
          '</a>' +
          '<button type="button" data-action="logout" class="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-100">' +
          HHK.utils.escapeHtml(HHK.i18n.t("logout")) +
          "</button></div></div>"
        : '<form id="login-form" class="glass-card rounded-[28px] p-6"><div class="mb-6"><span class="badge-soft">' +
          HHK.utils.escapeHtml(HHK.i18n.t("demoCredentials")) +
          '</span></div><div class="space-y-5"><div><label class="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">' +
          HHK.utils.escapeHtml(HHK.i18n.t("username")) +
          '</label><input id="login-username" type="text" value="root" class="w-full rounded-[18px] border border-white/10 bg-white/70 px-4 py-3 text-sm outline-none dark:bg-slate-950/60" /></div>' +
          '<div><label class="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">' +
          HHK.utils.escapeHtml(HHK.i18n.t("password")) +
          '</label><input id="login-password" type="password" value="123456" class="w-full rounded-[18px] border border-white/10 bg-white/70 px-4 py-3 text-sm outline-none dark:bg-slate-950/60" /></div>' +
          '<button class="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white dark:bg-brand-300 dark:text-slate-950">' +
          HHK.utils.escapeHtml(HHK.i18n.t("submitLogin")) +
          '</button></div><div class="mt-5 text-xs leading-6 text-slate-400">' +
          HHK.utils.escapeHtml(HHK.i18n.t("returnToLabel")) +
          ": " +
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
          HHK.utils.showToast(HHK.i18n.t("loginSuccess"), "success");
          window.setTimeout(function () {
            window.location.href = returnTo;
          }, 500);
        } else {
          HHK.utils.showToast(HHK.i18n.t("loginError"), "warning");
        }
      });
    }
  };
})(window);
