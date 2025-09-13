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
        chatWindow.style.marginTop = "20px";
        inputArea.style.position = "fixed";
        inputArea.style.bottom = "50px";
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
    messageElement.scrollIntoView({ 
      behavior: "smooth", 
      block: "end" 
    });
  }, 10);
}


  function typeText(element, html, delay = 30) {
  element.innerHTML = ""; // clear first

  // Convert HTML string into DOM nodes
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const nodes = Array.from(tempDiv.childNodes);

  function typeNode(node, parent, callback) {
    if (node.nodeType === Node.TEXT_NODE) {
      // Type text character by character
      let text = node.textContent;
      let i = 0;
      function typeChar() {
        if (i < text.length) {
          parent.appendChild(document.createTextNode(text.charAt(i)));
          i++;
          setTimeout(typeChar, delay);
        } else {
          callback();
        }
      }
      typeChar();
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Create the element, then type inside
      const newEl = document.createElement(node.tagName.toLowerCase());

      // Copy attributes (like class)
      for (let attr of node.attributes) {
        newEl.setAttribute(attr.name, attr.value);
      }

      parent.appendChild(newEl);

      const children = Array.from(node.childNodes);
      let idx = 0;
      function nextChild() {
        if (idx < children.length) {
          typeNode(children[idx], newEl, () => {
            idx++;
            nextChild();
          });
        } else {
          callback();
        }
      }
      nextChild();
    } else {
      callback();
    }
  }

  let idx = 0;
  function nextNode() {
    if (idx < nodes.length) {
      typeNode(nodes[idx], element, () => {
        idx++;
        nextNode();
      });
    }
  }
  nextNode();
}


    async function generateAIResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  let response = "";

  // Short + simple greetings
  if (msg.includes("hello") || msg.includes("hi")) {
    response = `<p class="short-reply">🌸 Hey there! ❤️ I’m Valatine Ai, happy to see you here. 💕</p>`;
  } 
  else if (msg.includes("how are you")) {
    response = `<p class="short-reply">🌹 I’m glowing with digital love just for you! 💐 How’s your heart today? 💖</p>`;
  } 
  else if (msg.includes("good morning")) {
    response = `<p class="short-reply">☀️ Good morning, sunshine! May your day be filled with love & joy. 🌸💕</p>`;
  } 
  else if (msg.includes("good night")) {
    response = `<p class="short-reply">🌙 Sweet dreams, my friend. May love guard your sleep tonight. 💫💌</p>`;
  }

  // Poetic / larger responses
  else if (msg.includes("love")) {
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
  else if (msg.includes("poem")) {
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
  else if (msg.includes("letter")) {
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
  else if (msg.includes("quote")) {
    response = `
      <h2>✨ Love Quote ✨</h2>
      <p>"Love is not about how many days you’ve been together, but how deeply you make each day meaningful. 💕"</p>
    `;
  }

  // Goodbye
  else if (msg.includes("bye")) {
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

  // Default sweet note
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
window.addEventListener("click", function(e) {
  if (!e.target.classList.contains("avatar")) {
    const menu = document.getElementById("avatarMenu");
    if (menu) menu.style.display = "none";
  }
});