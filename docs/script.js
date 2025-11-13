document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  if (body) {
    body.classList.add("dom-ready");
  }

  // Theme toggle (if checkbox with id "night-toggle" exists)
  const nightToggle = document.getElementById("night-toggle");
  if (nightToggle && "checked" in nightToggle) {
    let savedTheme = "light";
    try {
      if (typeof localStorage !== "undefined") {
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") {
          savedTheme = stored;
        }
      }
    } catch (_) {}

    const applyTheme = (isDark) => {
      if (!body) return;
      body.classList.toggle("night-mode", isDark);
      try {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("theme", isDark ? "dark" : "light");
        }
      } catch (_) {}
    };

    const initialIsDark = savedTheme === "dark";
    nightToggle.checked = initialIsDark;
    applyTheme(initialIsDark);

    nightToggle.addEventListener("change", () => {
      applyTheme(!!nightToggle.checked);
    });
  }

  // Simple message demo (if structure exists)
  const messages = document.getElementById("messages");
  const input = document.getElementById("input");
  const sendBtn = document.getElementById("send-btn");

  const appendMessage = (text, role) => {
    if (!messages || !text) return;
    const el = document.createElement("div");
    el.className = role ? `message ${role}` : "message";
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  };

  const send = () => {
    if (!messages || !input) return;
    const text = input.value.trim();
    if (!text) return;
    appendMessage(text, "user");
    appendMessage("This is a simulated response.", "assistant");
    input.value = "";
  };

  if (sendBtn) {
    sendBtn.addEventListener("click", send);
  }

  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    });
  }

  // Optional "Back to top" button behavior
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
