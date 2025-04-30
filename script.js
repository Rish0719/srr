// Firebase config (your working config)
const firebaseConfig = {
  apiKey: "AIzaSyBRN7k17JtwvbTJivpuPAdyv4NGR_J0tww",
  authDomain: "srchat-d9f03.firebaseapp.com",
  databaseURL: "https://srchat-d9f03-default-rtdb.firebaseio.com",
  projectId: "srchat-d9f03",
  storageBucket: "srchat-d9f03.appspot.com",
  messagingSenderId: "381081144538",
  appId: "1:381081144538:web:ecbfb57657bb80162f29e3"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const PASSWORD = "0720";

function checkPassword() {
  const inputPass = document.getElementById("password").value;
  const username = document.getElementById("username").value.trim();

  if (!username) return alert("Enter your name.");
  localStorage.setItem("chatUser", username);

  if (inputPass === PASSWORD) {
    document.getElementById("login").style.display = "none";
    document.getElementById("chat-container").style.display = "flex";
    listenForMessages();
  } else {
    alert("Wrong password!");
  }
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const msg = input.value.trim();
  const user = localStorage.getItem("chatUser");

  if (msg && user) {
    db.ref("messages").push({
      text: msg,
      sender: user,
      timestamp: Date.now()
    });
    input.value = "";
  }
}

function listenForMessages() {
  const chatBox = document.getElementById("chatBox");
  const currentUser = localStorage.getItem("chatUser");

  db.ref("messages").on("value", snapshot => {
    const data = snapshot.val();
    chatBox.innerHTML = "";

    for (let key in data) {
      const msg = data[key];
      const div = document.createElement("div");
      div.className = "chat-message";
      div.classList.add(msg.sender === currentUser ? "self" : "other");
      div.textContent = `${msg.sender}: ${msg.text}`;
      chatBox.appendChild(div);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

function clearChat() {
  if (confirm("Clear chat for everyone?")) {
    db.ref("messages").remove();
  }
}
