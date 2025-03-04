// Intersection Observer for Animate on Scroll
document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
  
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });
  });
  
  // Search functionality for filtering movie cards
  function searchMovies() {
    const query = document.getElementById("search-input").value.toLowerCase();
    const cards = document.querySelectorAll(".card-link");
    cards.forEach((card) => {
      const title = card.querySelector("h3").innerText.toLowerCase();
      card.style.display = title.indexOf(query) !== -1 ? "block" : "none";
    });
  }
  
  document.getElementById("search-btn").addEventListener("click", searchMovies);
  document.getElementById("search-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchMovies();
    }
  });
  
  // Nav search functionality triggers main search
  document.getElementById("nav-search-btn")
    .addEventListener("click", function () {
      const navQuery = document.getElementById("nav-search-input").value;
      document.getElementById("search-input").value = navQuery;
      searchMovies();
    });

    document.addEventListener("DOMContentLoaded", function () {
      const chatWidget = document.getElementById("chat-widget");
      const chatIcon = chatWidget.querySelector(".chat-icon");
      const chatClose = chatWidget.querySelector(".chat-close");
      const sendBtn = document.getElementById("send-btn");
      const chatInput = document.getElementById("chat-input");
      const chatBody = chatWidget.querySelector(".chat-body");
    
      // Mở chat box khi click vào icon
      chatIcon.addEventListener("click", function () {
        chatWidget.classList.remove("closed");
        chatWidget.classList.add("open");
      });
    
      // Đóng chat box khi click vào nút đóng
      chatClose.addEventListener("click", function () {
        chatWidget.classList.remove("open");
        chatWidget.classList.add("closed");
      });
    
      // Xử lý sự kiện gửi tin nhắn
      sendBtn.addEventListener("click", function () {
        const message = chatInput.value.trim();
        if (message !== "") {
          const messageElem = document.createElement("p");
          messageElem.textContent = message;
          chatBody.appendChild(messageElem);
          chatInput.value = "";
          // Tự động cuộn xuống cuối chat
          chatBody.scrollTop = chatBody.scrollHeight;
        }
      });
    
      // Gửi tin nhắn bằng phím Enter
      chatInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          sendBtn.click();
        }
      });
    });
    