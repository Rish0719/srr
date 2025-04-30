const PASSWORD = "072009";

function checkPassword() {
  const input = document.getElementById("password").value;
  if (input === PASSWORD) {
    document.getElementById("login").style.display = "none";
    document.getElementById("chat-container").style.display = "flex";
    loadMessages();
  } else {
    alert("Wrong password!");
  }
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  if (message) {
    const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.push(message);
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    input.value = "";
    loadMessages();
  }
}

function loadMessages() {
  const chatBox = document.getElementById("chatBox");
  const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
  chatBox.innerHTML = "";
  messages.forEach(msg => {
    const div = document.createElement("div");
    div.className = "chat-message";
    div.textContent = msg;
    chatBox.appendChild(div);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}

function clearChat() {
  if (confirm("Clear all chat messages?")) {
    localStorage.removeItem("chatMessages");
    loadMessages();
  }
}