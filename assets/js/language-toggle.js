(function () {
  var STORAGE_KEY = "portfolioLanguage";
  var currentLang = window.siteLanguage === "zh-CN" ? "zh" : "en";
  var preferredLang = window.localStorage.getItem(STORAGE_KEY);
  var toggle = document.querySelector("[data-lang-toggle]");

  function equivalentPath(path, targetLang) {
    if (targetLang === "zh") {
      if (path === "/" || path === "/index.html" || path === "/en" || path === "/en/" || path === "/en/index.html") {
        return "/zh/";
      }
      if (path.indexOf("/en/") === 0) {
        return path.replace("/en/", "/zh/").replace(/\.html$/, "/");
      }
      return "/zh/";
    }

    if (path === "/zh" || path === "/zh/" || path === "/zh/index.html") {
      return "/";
    }
    if (path.indexOf("/zh/") === 0) {
      return path.replace("/zh/", "/en/").replace(/\.html$/, "/");
    }
    return "/";
  }

  function redirectTo(targetLang) {
    var nextPath = equivalentPath(window.location.pathname, targetLang);
    if (nextPath !== window.location.pathname) {
      window.location.href = nextPath + window.location.search + window.location.hash;
    }
  }

  if (preferredLang && preferredLang !== currentLang) {
    redirectTo(preferredLang);
    return;
  }

  if (toggle) {
    toggle.addEventListener("click", function (event) {
      event.preventDefault();
      var targetLang = toggle.getAttribute("data-target-lang");
      window.localStorage.setItem(STORAGE_KEY, targetLang);
      redirectTo(targetLang);
    });
  }
})();
