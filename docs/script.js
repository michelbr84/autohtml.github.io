document.addEventListener("DOMContentLoaded", function () {
  var body = document.body;
  if (body && body.classList) {
    body.classList.add("dom-ready");
  }

  var yearSpans = document.querySelectorAll('span[data-js-hook="year"]');
  if (yearSpans && yearSpans.length) {
    var currentYear = new Date().getFullYear();
    for (var i = 0; i < yearSpans.length; i++) {
      if (yearSpans[i]) {
        yearSpans[i].textContent = currentYear;
      }
    }
  }

  var backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    backToTop.addEventListener("click", function (event) {
      if (event && typeof event.preventDefault === "function") {
        event.preventDefault();
      }

      if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    });
  }
});
