(function () {
  var root = document.documentElement;

  /* Thème */
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) {}
  document.getElementById("theme").addEventListener("click", function () {
    var cur = root.getAttribute("data-theme") ||
      (window.matchMedia && matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    var next = cur === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* Filtre des projets */
  var buttons = document.querySelectorAll(".filters button");
  var cards = document.querySelectorAll(".card");
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var f = b.getAttribute("data-f");
      buttons.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      cards.forEach(function (c) { c.hidden = !(f === "all" || c.getAttribute("data-cat") === f); });
    });
  });

  /* Copier l'adresse e-mail */
  var out = document.getElementById("copied");
  document.getElementById("copy").addEventListener("click", function () {
    var el = document.getElementById("email");
    var txt = el.textContent;
    function fallback() {
      var r = document.createRange(); r.selectNodeContents(el);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      out.textContent = "Adresse sélectionnée, copie-la avec Ctrl+C.";
    }
    try {
      navigator.clipboard.writeText(txt).then(function () {
        out.textContent = "Adresse copiée.";
        setTimeout(function () { out.textContent = ""; }, 2500);
      }, fallback);
    } catch (e) { fallback(); }
  });

  /* Lien actif dans la navigation */
  var links = document.querySelectorAll("a.lnk");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.toggle("on", l.getAttribute("href") === "#" + en.target.id); });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("section[id]").forEach(function (s) { io.observe(s); });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
