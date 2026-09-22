/* AgentLive.Events. Progressive enhancement only: every page is complete without this file.
   Reads site.config.json and upgrades the pre-launch values already written into the HTML. */
(function () {
  "use strict";

  var CACHE_KEY = "al-experiences";
  var CACHE_MS = 60 * 60 * 1000;

  function fmt(count, suffix) {
    return Number(count).toLocaleString("en-US") + (suffix || "");
  }

  function paintCount(text) {
    var nodes = document.querySelectorAll("[data-experiences]");
    for (var i = 0; i < nodes.length; i++) nodes[i].textContent = text;
  }

  function liveCount(cfg) {
    var x = cfg.experiences || {};
    if (x.source !== "api" || !x.statusUrl) return;

    try {
      var hit = sessionStorage.getItem(CACHE_KEY);
      if (hit) {
        var c = JSON.parse(hit);
        if (c && c.t && Date.now() - c.t < CACHE_MS && c.n > 0) {
          paintCount(fmt(c.n, x.suffix));
          return;
        }
      }
    } catch (e) { /* sessionStorage unavailable: just fetch */ }

    fetch(x.statusUrl, { mode: "cors" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d) return;
        var n = Number(d.experiencesAvailable);
        // never show zero; on anything unexpected keep the static figure
        if (!isFinite(n) || n <= 0) return;
        paintCount(fmt(n, x.suffix));
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ n: n, t: Date.now() }));
        } catch (e) { /* ignore */ }
      })
      .catch(function () { /* keep the static figure */ });
  }

  function copyBox(cfg) {
    if (cfg.mode !== "live") return; // pre-launch: button stays disabled, does nothing
    var btn = document.getElementById("copy-btn");
    var line = document.getElementById("install-line");
    if (!btn || !line) return;

    // Replace the pre-launch two-label markup with a plain live button.
    btn.className = "btn";
    btn.removeAttribute("aria-disabled");
    btn.removeAttribute("aria-label");
    btn.removeAttribute("aria-describedby");
    btn.textContent = "Copy";
    var note = document.getElementById("soon-note");
    if (note) note.remove();

    btn.addEventListener("click", function () {
      var text = (line.getAttribute("data-copy") || line.textContent).trim();
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = "Copy"; }, 2000);
      }).catch(function () {
        btn.textContent = "Select and copy";
      });
    });
  }

  function waitlist(cfg) {
    var form = document.getElementById("waitlist-form");
    if (!form) return;

    // Launch removes the waitlist entirely.
    if (cfg.mode === "live") {
      var w = form.closest(".waitlist");
      if (w) w.remove();
      return;
    }
    if (!cfg.waitlistEndpoint) {
      var wrap = form.closest(".waitlist");
      if (wrap) wrap.remove();
      return;
    }

    form.setAttribute("action", cfg.waitlistEndpoint);

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var box = form.closest(".waitlist");
      var msg = document.getElementById("waitlist-msg");

      // no-cors means the response is opaque: a resolved fetch is success, a rejected one failure
      fetch(cfg.waitlistEndpoint, {
        method: "POST",
        mode: "no-cors",
        body: new FormData(form)
      }).then(function () {
        var done = document.createElement("p");
        done.className = "deck";
        done.setAttribute("role", "status");
        done.textContent = "You're on the list.";
        if (box) box.replaceWith(done);
      }).catch(function () {
        if (box) box.classList.add("error");
        if (msg) msg.textContent = "That didn't go through. Check the address and try again.";
      });
    });
  }

  fetch("site.config.json")
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (cfg) {
      if (!cfg) return;
      liveCount(cfg);
      copyBox(cfg);
      waitlist(cfg);
    })
    .catch(function () { /* HTML already carries the correct pre-launch state */ });
})();
