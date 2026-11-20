// ===================================
// AI BUSINESS CHATBOT - PHASE 1
// ===================================

// Create chatbot HTML
document.body.insertAdjacentHTML("beforeend", `
<div id="ai-chatbot">

    <button id="ai-chat-toggle" aria-label="Open chat">
        💬
    </button>

    <div id="ai-chat-window">

        <div class="ai-chat-header">
            <div>
                <h3>Business Assistant 🤖</h3>
                <p>Here to help you!</p>
            </div>

            <button id="ai-chat-close" aria-label="Close chat">
                ×
            </button>
        </div>

        <div id="ai-chat-messages">
        </div>

        <div class="ai-chat-quick">
            <button data-question="What services do you offer?">
                Our Services
            </button>

            <button data-question="Tell me about digital visiting cards">
                Digital Cards
            </button>

            <button data-question="Tell me about NFC review stands">
                NFC Stands
            </button>

            <button data-question="How can I contact you?">
                Contact
            </button>
        </div>

        <div class="ai-chat-input-area">
            <input
                type="text"
                id="ai-chat-input"
                placeholder="Ask me anything..."
            >

            <button id="ai-chat-send" aria-label="Send message">
                ➤
            </button>
        </div>

    </div>
</div>
`);

// Select elements
const chatToggle = document.getElementById("ai-chat-toggle");
const chatWindow = document.getElementById("ai-chat-window");
const chatClose = document.getElementById("ai-chat-close");
const chatInput = document.getElementById("ai-chat-input");
const chatSend = document.getElementById("ai-chat-send");
const chatMessages = document.getElementById("ai-chat-messages");

// Open chatbot
chatToggle.addEventListener("click", () => {
    chatWindow.classList.add("active");
    chatInput.focus();
});

// Close chatbot
chatClose.addEventListener("click", () => {
    chatWindow.classList.remove("active");
});

// Display message
function addMessage(message, sender) {
    const messageElement = document.createElement("div");

    messageElement.className =
        "ai-chat-message " +
        (sender === "user" ? "ai-chat-user" : "ai-chat-bot");

    if (
        sender === "bot" &&
        /https:\/\/wa\.me\/916266438975/.test(message)
    ) {
        const cleanMessage = message.replace(
            /https:\/\/wa\.me\/916266438975/g,
            ""
        ).trim();

        messageElement.textContent = cleanMessage;

        const whatsappButton = document.createElement("a");
        whatsappButton.href = "https://wa.me/916266438975";
        whatsappButton.target = "_blank";
        whatsappButton.rel = "noopener noreferrer";
        whatsappButton.className = "ai-whatsapp-button";
        whatsappButton.textContent = "Chat with us on WhatsApp";

        messageElement.appendChild(whatsappButton);
    } else {
        messageElement.textContent = message;
    }

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
// Welcome message
addMessage(
    "Hello! 👋 Welcome to our business. I can help you explore our digital visiting cards, NFC review stands and marketing services. What would you like to know?",
    "bot"
);

// Temporary business responses
function getBotResponse(question) {

    const q = question.toLowerCase();

    if (q.includes("service") || q.includes("offer")) {
        return "We provide digital visiting cards, NFC review stands, automated review replies and business promotion and marketing services.";
    }

    if (q.includes("digital") || q.includes("visiting card")) {
        return "Our digital visiting cards let customers access your contact details, WhatsApp, social media and business information through one shareable link.";
    }

    if (q.includes("nfc") || q.includes("review")) {
        return "Our NFC review stands help customers access your business review page by tapping their NFC-enabled phone.";
    }

    if (q.includes("price") || q.includes("cost")) {
        return "Our pricing depends on the service and customization you need. Please contact us on WhatsApp for a quotation.";
    }

    if (q.includes("contact") || q.includes("whatsapp")) {
        return "You can contact our business directly through the WhatsApp button on this website.";
    }

    if (q.includes("marketing") || q.includes("promotion")) {
        return "We help businesses improve their online presence through digital promotion, marketing and customer engagement solutions.";
    }

    return "Thanks for your question! Please contact us through WhatsApp so we can help you with the details.";
}

async function sendChatMessage() {

    const message = chatInput.value.trim();

    if (!message) return;

    addMessage(message, "user");

    chatInput.value = "";

    // Show loading message
    const loading = document.createElement("div");
    loading.className = "ai-chat-message ai-chat-bot";
    loading.textContent = "Thinking...";

    chatMessages.appendChild(loading);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message
                })
            }
        );

        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }

        const data = await response.json();

        loading.remove();

        addMessage(data.reply, "bot");

    } catch (error) {

        loading.remove();

        console.error("Chatbot error:", error);

        addMessage(
            "Sorry! Our assistant is temporarily unavailable.",
            "bot"
        );
    }
}

// Send button
chatSend.addEventListener("click", sendChatMessage);

// Enter key
chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendChatMessage();
    }
});

// Quick question buttons
document.querySelectorAll(".ai-chat-quick button").forEach(button => {

    button.addEventListener("click", () => {

        chatInput.value = button.dataset.question;

        sendChatMessage();

    });

});