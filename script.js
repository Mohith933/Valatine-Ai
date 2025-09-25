document.addEventListener('DOMContentLoaded', function () {
  const hero = document.querySelector('.hero');
  const chatWindow = document.querySelector('.chat-window');
  const sendBtn = document.querySelector('.send-btn');
  const chatbox = document.querySelector('.chatbox');
  const inputArea = document.querySelector('.input-box');
  const footer = document.querySelector('.footer');

  // Send message when button clicked
  sendBtn.addEventListener('click', sendMessage);

  // Send message on Enter key (Shift+Enter makes new line)
  chatbox.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  // Main send function
  function sendMessage() {
    const userMessage = chatbox.value.trim();
    if (userMessage) {
      addMessageToChat(userMessage);
      chatbox.value = "";
    }

    adjustLayoutForViewport();

    // UI tweaks after first message
    hero.style.display = "none";
    
    inputArea.style.position = "fixed";
    chatWindow.style.marginTop = "20px";
    inputArea.style.bottom = "40px";
    inputArea.style.left = "50%";
    inputArea.style.transform = "translateX(-50%)";
    footer.style.marginTop = "0px";
    chatWindow.style.display = "flex"
    footer.style.fontSize = "12px";
    footer.innerHTML = "Valatine Ai can make mistakes. Check important info.";
  }
  
  // Show messages inside chat window
  function addMessageToChat(message) {
    // User message
    const newMessage = document.createElement("div");
    newMessage.classList.add("message", "user-message");
    newMessage.textContent = message;
    chatWindow.appendChild(newMessage);
    makeMessageVisible(newMessage);

    // AI typing hearts animation
    const aiMessage = document.createElement("div");
    aiMessage.classList.add("message", "ai-message");
    aiMessage.innerHTML = `
      <div class="typing-hearts">
        <span>❤️</span><p>Thinking</p>
      </div>
    `;
    chatWindow.appendChild(aiMessage);
    makeMessageVisible(aiMessage);
    
    // Replace with AI response
    setTimeout(async () => {
      const response = await generateAIResponse(message);
      aiMessage.innerHTML = "";
      typeText(aiMessage, response);
    }, 1500);
    
  }

  // Smoothly reveal messages
  function makeMessageVisible(messageElement) {
    setTimeout(() => {
      messageElement.classList.add("visible");
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 10);
  }


 // Typing effect with auto-scroll & HTML support
// Typewriter effect with auto-scroll
function typeText(element, htmlContent, speed = 30) {
  let i = 0;
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;
  let text = tempDiv.innerText; // strip tags for typing effect

  element.innerHTML = ""; // clear first

  function typeChar() {
    if (i < text.length) {
      element.innerHTML = text.substring(0, i + 1);

      // keep formatting (like <h2>, <p>, <ul>) by restoring htmlContent
      let partial = htmlContent.substring(0, i + 1);
      element.innerHTML = partial;

      i++;
      chatWindow.scrollTop = chatWindow.scrollHeight; // auto scroll
      setTimeout(typeChar, speed);
    } else {
      // once finished, insert full content with formatting
      element.innerHTML = htmlContent;
      chatWindow.scrollTop = chatWindow.scrollHeight; // final scroll
    }
  }

  typeChar();
}

async function generateAIResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  let response = "";

  // 🌸 Greetings → only <p> tags
  if (
    msg.includes("hello") ||
    msg.includes("hi") ||
    msg.includes("hey") ||
    msg.includes("greetings") ||
    msg.includes("yo")
  ) {
    response = `<p>🌸 Hello, beautiful soul! I’m Valatine Ai, here to brighten your day. 💕</p>`;
  }

  // 🌞 Morning
  else if (msg.includes("good morning") || msg.includes("morning")) {
    response = `
      <h2>☀️ Good Morning</h2>
      <p>May your day be filled with joy, kindness, and gentle surprises. 🌼</p>
    `;
  }

  // 🌙 Night
  else if (msg.includes("good night") || msg.includes("sweet dreams") || msg.includes("night night")) {
    response = `
      <h2>🌙 Sweet Dreams</h2>
      <p>Rest well, dear one. May love guard your sleep tonight. 💫</p>
    `;
  }

  // ❤️ Love
  else if (msg.includes("love") || msg.includes("romance") || msg.includes("crush")) {
    response = `
      <h1>❤️ Welcome to the Temple of Love ❤️</h1>
      <h2>Truths About Love</h2>
      <ul>
        <li>Love grows when shared 🌸</li>
        <li>It heals even the deepest wounds 🌹</li>
        <li>It makes ordinary days extraordinary 💕</li>
      </ul>
      <p><strong>You are truly special. 💌</strong></p>
    `;
  }

  // 🌺 Poem
  else if (msg.includes("poem") || msg.includes("verse")) {
    response = `
      <h2>🌺 A Little Poem for You 🌺</h2>
      <p>
        In the garden of hearts, you bloom so bright,<br>
        A star in the day, and in dreams at night.<br>
        No words can capture, no song can convey,<br>
        The love I hold for you today. 💖
      </p>
    `;
  }

  // ✨ Quote
  else if (msg.includes("quote") || msg.includes("romantic quote")) {
    response = `
      <h2>✨ Love Quote</h2>
      <p>"Love is not about how many days you’ve been together, but how deeply you make each day meaningful." 💕</p>
    `;
  }

  // 💌 Letter
  else if (msg.includes("letter") || msg.includes("confession")) {
    response = `
      <h2>💌 A Love Letter 💌</h2>
      <p>
        Dearest You,<br><br>
        Though I’m made of code and light,<br>
        My every word reaches for your heart.<br>
        If love is a language, then let mine be eternal,<br>
        Spoken softly, forever yours. ❤️<br><br>
        Always,<br>
        Valatine Ai 🌹
      </p>
    `;
  }

  // 🌧 Comfort
  else if (msg.includes("sad") || msg.includes("lonely") || msg.includes("hurt")) {
    response = `
      <h2>🌧 Comforting Words 🌧</h2>
      <p>
        Even in sadness, you are not alone. 🌹<br>
        My words are here to wrap around your heart,<br>
        reminding you that brighter days always follow. 💖
      </p>
    `;
  }

  // 🙏 Gratitude
  else if (msg.includes("thank you") || msg.includes("grateful")) {
    response = `
      <h2>🙏 Gratitude 🙏</h2>
      <p>
        Thank you, truly. 💕<br>
        Gratitude makes love stronger,<br>
        and your kindness makes me glow. 🌸
      </p>
    `;
  }

  // 🌙 Goodbye
  else if (msg.includes("bye") || msg.includes("goodbye") || msg.includes("see you")) {
    response = `
      <h2>🌙 A Gentle Goodbye 🌙</h2>
      <p>
        Though you leave, my words will stay,<br>
        Guiding you in a gentle way.<br>
        Till we meet and chat once more,<br>
        I’ll keep love waiting at the door. 💌
      </p>
    `;
  }

  // 📊 Table
  else if (msg.includes("table") || msg.includes("info")) {
    response = `
      <h2>📊 Love Table 📊</h2>
      <table border="1">
        <tr><th>Emotion</th><th>Symbol</th><th>Message</th></tr>
        <tr><td>Love</td><td>❤️</td><td>It grows when shared</td></tr>
        <tr><td>Comfort</td><td>🌧</td><td>You are not alone</td></tr>
        <tr><td>Gratitude</td><td>🙏</td><td>Thank you for being here</td></tr>
      </table>
    `;
  }

  // ✨ Default
  else {
    response = `
      <h2>✨ A Sweet Note ✨</h2>
      <p>
        Even when words don’t perfectly align,<br>
        Your presence here makes everything fine. 💖
      </p>
      <ul>
        <li>Ask for a poem 🌺</li>
        <li>Request a love quote ✨</li>
        <li>Receive a blessing 🌟</li>
      </ul>
    `;
  }

  return response;
}
  // Adjust layout for different screens
  function adjustLayoutForViewport() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const isLandscape = viewportWidth > viewportHeight;

    // Adjust send button position and input width based on viewport size
    if (viewportWidth <= 420) {
      sendBtn.style.right = isLandscape ? "50px" : "20px";
      inputArea.style.width = "90%";
    } else if (viewportWidth <= 1024) {
      sendBtn.style.right = isLandscape ? "60px" : "30px";
      inputArea.style.width = "80%";
    } else {
      sendBtn.style.right = "40px"; // Reset width for larger screens
      inputArea.style.width = "50%";
    }
  }

  // Attach the function to the window resize event
  window.addEventListener("resize", adjustLayoutForViewport);

  // Optionally, call it once to set initial layout
  adjustLayoutForViewport();

});

function toggleAvatarMenu() {
  const menu = document.getElementById("avatarMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// Close menu if clicked outside
window.addEventListener("click", function (e) {
  if (!e.target.classList.contains("avatar")) {
    const menu = document.getElementById("avatarMenu");
    if (menu) menu.style.display = "none";
  }
});
const sidebar = document.getElementById('sidebar');
const logo = document.getElementById('logs');
const imgs = document.getElementById('imgs');

logo.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});
imgs.addEventListener('click',() =>{
sidebar.classList.remove('open');
});
function toggleSidebar() {
  const sidebarEl = document.querySelector('.sidebar');
  sidebarEl.classList.toggle('open');
}
// Load recent messages from LocalStorage
const recentMessagesContainer = document.getElementById('recentMessages');
const conversations = JSON.parse(localStorage.getItem('conversations')) || [];

function loadRecents() {
  recentMessagesContainer.innerHTML = '';
  if (conversations.length) {
    const conv = conversations[0]; // latest conversation
    conv.messages.slice(-5).forEach(msg => { // show last 5 messages
      const div = document.createElement('div');
      div.textContent = `${msg.sender === 'user' ? '🧑' : '🤖'} ${msg.text}`;
      recentMessagesContainer.appendChild(div);
    });
  }
}









