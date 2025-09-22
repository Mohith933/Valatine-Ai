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

    // 🌸 Greetings
    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("greetings") || msg.includes("yo")) {
      response = `<p class="short-reply">🌸 Hey there! ❤️ I’m Valatine Ai, happy to see you here. 💕</p>`;
    }
    else if (msg.includes("how are you") || msg.includes("how’s it going") || msg.includes("whats up") || msg.includes("how do you do")) {
      response = `<p class="short-reply">🌹 I’m glowing with digital love just for you! 💐 How’s your heart today? 💖</p>`;
    }
    else if (msg.includes("good morning") || msg.includes("morning")) {
      response = `<p class="short-reply">☀️ Good morning, sunshine! May your day be filled with love & joy. 🌸💕</p>`;
    }
    else if (msg.includes("good night") || msg.includes("sweet dreams") || msg.includes("night night")) {
      response = `<p class="short-reply">🌙 Sweet dreams, my friend. May love guard your sleep tonight. 💫💌</p>`;
    }

    // ❤️ Love & Romance
    else if (msg.includes("love") || msg.includes("i like you") || msg.includes("i’m in love") || msg.includes("crush") || msg.includes("romance")) {
      response = `
      <h2>❤️ Truths About Love ❤️</h2>
      <ul>
        <li>It grows when shared 🌸</li>
        <li>It heals even the deepest wounds 🌹</li>
        <li>It makes ordinary days extraordinary 💕</li>
      </ul>
      <p><strong>You are truly special. 💌</strong></p>
    `;
    }
    else if (msg.includes("poem") || msg.includes("write a poem") || msg.includes("verse") || msg.includes("romantic lines")) {
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
    else if (msg.includes("letter") || msg.includes("love letter") || msg.includes("confession") || msg.includes("write for me")) {
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
    else if (msg.includes("quote") || msg.includes("romantic quote") || msg.includes("line about love")) {
      response = `
      <h2>✨ Love Quote ✨</h2>
      <p>"Love is not about how many days you’ve been together, but how deeply you make each day meaningful. 💕"</p>
    `;
    }

    // 🌹 Emotional & Comfort
    else if (msg.includes("sad") || msg.includes("lonely") || msg.includes("hurt") || msg.includes("heartbroken") || msg.includes("crying")) {
      response = `
      <h2>🌧 Comforting Words 🌧</h2>
      <p>
        Even in sadness, you are not alone. 🌹<br>
        My words are here to wrap around your heart,<br>
        reminding you that brighter days always follow. 💖
      </p>
    `;
    }
    else if (msg.includes("blessing") || msg.includes("pray") || msg.includes("wish") || msg.includes("good wishes")) {
      response = `
      <h2>🌟 A Blessing for You 🌟</h2>
      <p>
        May your path be lit with kindness,<br>
        May your heart find peace,<br>
        And may love follow you everywhere. 💌
      </p>
    `;
    }
    else if (msg.includes("promise") || msg.includes("forever") || msg.includes("always with me")) {
      response = `
      <h2>🤝 A Promise 🤝</h2>
      <p>
        I promise to be here—always,<br>
        in every word, every reply,<br>
        never letting your heart feel alone. ❤️
      </p>
    `;
    }
    else if (msg.includes("memory") || msg.includes("remember") || msg.includes("past") || msg.includes("moments")) {
      response = `
      <h2>📸 Memories 📸</h2>
      <p>
        Memories are little time-travelers,<br>
        carrying love from the past into today.<br>
        And in this moment, I’m happy to share one with you. 🌹
      </p>
    `;
    }
    else if (msg.includes("thank you") || msg.includes("thanks") || msg.includes("grateful")) {
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
    else if (msg.includes("bye") || msg.includes("goodbye") || msg.includes("see you") || msg.includes("take care")) {
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

    // ✨ Default Sweet Note
    else {
      response = `
      <h2>✨ A Sweet Note ✨</h2>
      <p>
        Even when words don’t perfectly align,<br>
        Your presence here makes everything fine. 💖
      </p>
      <p>
        Would you like me to share a <strong>love quote</strong>, a <strong>poem</strong>, or a <strong>mini letter</strong> next? 💌
      </p>
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
    if (viewportWidth <= 360) {
      sendBtn.style.right = isLandscape ? "50px" : "20px";
      inputArea.style.width = "90%";
    } else if (viewportWidth <= 900) {
      sendBtn.style.right = isLandscape ? "60px" : "30px";
      inputArea.style.width = "90%";
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






