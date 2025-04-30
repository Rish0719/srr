// Firebase config from your setup
const firebaseConfig = {
  apiKey: "AIzaSyBRN7k17JtwvbTJivpuPAdyv4NGR_J0tww",
  authDomain: "srchat-d9f03.firebaseapp.com",
  databaseURL: "https://srchat-d9f03-default-rtdb.firebaseio.com",
  projectId: "srchat-d9f03",
  storageBucket: "srchat-d9f03.appspot.com",
  messagingSenderId: "381081144538",
  appId: "1:381081144538:web:ecbfb57657bb80162f29e3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const PASSWORD = "072009";

function checkPassword() {
  const input = document.getElementById("password").value;
  if (input === PASSWORD) {
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
  if (msg) {
    db.ref("messages").push({
      text: msg,
      timestamp: Date.now()
    });
    input.value = "";
  }
}

function listenForMessages() {
  const chatBox = document.getElementById("chatBox");
  db.ref("messages").on("value", snapshot => {
    const data = snapshot.val();
    chatBox.innerHTML = "";
    for (let key in data) {
      const div = document.createElement("div");
      div.className = "chat-message";
      div.textContent = data[key].text;
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
