document.addEventListener("DOMContentLoaded", () => {
  const nightToggle = document.getElementById("night-toggle");
  const messages = document.getElementById("messages");
  const input = document.getElementById("input");
  const sendBtn = document.getElementById("send-btn");

  // Initialize theme from localStorage with safe defaults
  const savedTheme = (typeof localStorage !== "undefined" && localStorage.getItem("theme")) || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("night-mode");
    if (nightToggle) nightToggle.checked = true;
  } else {
    document.body.classList.remove("night-mode");
    if (nightToggle) nightToggle.checked = false;
  }

  // Theme toggle listener (null-safe)
  if (nightToggle) {
    nightToggle.addEventListener("change", () => {
      const isDark = !!nightToggle.checked;
      document.body.classList.toggle("night-mode", isDark);
      try {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("theme", isDark ? "dark" : "light");
        }
      } catch (e) {
        // Fail silently if storage is unavailable
      }
    });
  }

  function appendMessage(text, role) {
    if (!messages) return;
    const el = document.createElement("div");
    el.className = `message ${role}`;
    el.textContent = text;
    messages.appendChild(el);
  }

  function send() {
    if (!messages || !input) return;
    const text = input.value.trim();
    if (!text) return;
    appendMessage(text, "user");
    appendMessage("This is a simulated response.", "assistant");
    messages.scrollTop = messages.scrollHeight;
    input.value = "";
  }

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
});
