const translations = {
    en: {
      title: "WWII War Victims Memorial - Best Movies info",
      nav_letter: "Letter from the host",
      nav_movies: "Movies",
      nav_login_signup: "Log In / Sign Up <i class='fas fa-caret-down'></i>",
      dropdown_login: "Log In",
      dropdown_signup: "Sign Up",
      lang_en: "English",
      lang_vi: "Tiếng Việt",
      hero_title: "WWII War Victims Memorial-Best movies and arts",
      hero_subtitle: "Dark side of humanity - Bright side of empathy - Reject extreme idealogy - Embrace equality",
      hero_cta: "Explore Now",
      chat_header: "Kino of the Caust Customer Service",
      chat_greeting: "Hi, how can I help you today?",
      chat_input_placeholder: "Enter your message...",
      dropdown_logout: "Log Out",
      footer: "© 2025 Kino of the 'Caust. All Rights Reserved."
    },
    vi: {
      title: "Tưởng niệm Nạn nhân Chiến tranh Thế giới II - Thông tin của những bộ phim xuất sắc nhất",
      nav_letter: "Thư từ người dẫn chương trình",
      nav_movies: "Phim",
      nav_login_signup: "Đăng nhập / Đăng ký <i class='fas fa-caret-down'></i>",
      dropdown_login: "Đăng nhập",
      dropdown_signup: "Đăng ký",
      lang_en: "Tiếng Anh",
      lang_vi: "Tiếng Việt",
      hero_title: "Tưởng niệm Nạn nhân Chiến tranh Thế giới II - Thông tin về những bộ phim xuất sắc nhất",
      hero_subtitle: "Mặt tối của nhân loại - Mặt sáng của lương tâm - Đả đảo cực đoan - Ủng hộ bình đẳng",
      hero_cta: "Khám phá ngay",
      chat_header: "Dịch vụ khách hàng Kino of the Caust",
      chat_greeting: "Xin chào, tôi có thể giúp gì cho bạn hôm nay?",
      chat_input_placeholder: "Nhập tin nhắn...",
      dropdown_logout: "Đăng xuất",
      footer: "© 2025 Kino of the 'Caust. Mọi quyền được bảo lưu."
    }
  };
  
  const elementMap = [
    { selector: "title", key: "title", type: "textContent" },
    { selector: "nav ul li:nth-child(1) a", key: "nav_letter", type: "innerHTML" },
    { selector: "nav ul li:nth-child(2) a", key: "nav_movies", type: "innerHTML" },
    { selector: "#userBtn", key: "nav_login_signup", type: "innerHTML" },
    { selector: "#userDropdown a:nth-child(1)", key: "dropdown_login", type: "innerHTML" },
    { selector: "#userDropdown a:nth-child(2)", key: "dropdown_signup", type: "innerHTML" },
    { selector: "#languageSelect option[value='en']", key: "lang_en", type: "innerHTML" },
    { selector: "#languageSelect option[value='vi']", key: "lang_vi", type: "innerHTML" },
    { selector: "header h1", key: "hero_title", type: "innerHTML" },
    { selector: "header p", key: "hero_subtitle", type: "innerHTML" },
    { selector: "header .cta-btn", key: "hero_cta", type: "innerHTML" },
    { selector: ".chat-header", key: "chat_header", type: "innerHTML", preserveChildren: true },
    { selector: ".chat-body p", key: "chat_greeting", type: "innerHTML" },
    { selector: "#chat-input", key: "chat_input_placeholder", type: "placeholder" },
    { selector: "footer p", key: "footer", type: "innerHTML" },
    { selector: "#userDropdown button#logoutBtn", key: "dropdown_logout", type: "innerHTML" }
  ];
  
  function translatePage(lang) {
    elementMap.forEach(({ selector, key, type, preserveChildren }) => {
      const element = document.querySelector(selector);
      if (element && translations[lang] && translations[lang][key]) {
        if (type === "textContent") {
          element.textContent = translations[lang][key];
        } else if (type === "innerHTML") {
          if (preserveChildren) {
            const childNodes = Array.from(element.childNodes);
            element.innerHTML = translations[lang][key];
            childNodes.forEach(child => {
              if (child.nodeType === Node.ELEMENT_NODE) {
                element.appendChild(child);
              }
            });
          } else {
            element.innerHTML = translations[lang][key];
          }
        } else if (type === "placeholder") {
          element.setAttribute("placeholder", translations[lang][key]);
        }
      }
    });
  
    // Special handling for user button (dynamic content from Firebase)
    const userBtn = document.getElementById("userBtn");
    if (userBtn && !userBtn.innerHTML.includes("fas fa-caret-down")) {
      const username = userBtn.textContent.trim().split(" ")[0];
      userBtn.innerHTML = `${username} <i class="fas fa-caret-down"></i>`;
    }
  
    // Update logout button if present
    const logoutBtn = document.querySelector("#userDropdown button#logoutBtn");
    if (logoutBtn) {
      logoutBtn.innerHTML = translations[lang].dropdown_logout;
    }
  }
  
  // Initialize translation on page load
  document.addEventListener("DOMContentLoaded", () => {
    const languageSelect = document.getElementById("languageSelect");
    translatePage(languageSelect.value);
  
    // Re-translate when user auth state changes (Firebase)
    import("https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js").then(({ getAuth, onAuthStateChanged }) => {
      const auth = getAuth();
      onAuthStateChanged(auth, () => {
        setTimeout(() => translatePage(languageSelect.value), 100);
      });
    });
  });