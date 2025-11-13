document.addEventListener("DOMContentLoaded", () => {
  const nightToggle = document.getElementById("night-toggle");
  const messages = document.getElementById("messages");
  const input = document.getElementById("input");
  const sendBtn = document.getElementById("send-btn");

  // Read saved theme (null-safe, guarded)
  let savedTheme = "light";
  try {
    if (typeof localStorage !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        savedTheme = stored;
      }
    }
  } catch (e) {
    // Ignore storage errors; fallback to light
  }

  // Apply initial theme and sync toggle (null-safe)
  if (savedTheme === "dark") {
    if (document.body) {
      document.body.classList.add("night-mode");
    }
    if (nightToggle) {
      nightToggle.checked = true;
    }
  } else {
    if (document.body) {
      document.body.classList.remove("night-mode");
    }
    if (nightToggle) {
      nightToggle.checked = false;
    }
  }

  // Toggle theme on change (null-safe, guarded)
  if (nightToggle) {
    nightToggle.addEventListener("change", () => {
      const isDark = !!nightToggle.checked;
      if (document.body) {
        document.body.classList.toggle("night-mode", isDark);
      }
      try {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("theme", isDark ? "dark" : "light");
        }
      } catch (e) {
        // Ignore storage errors
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
