// translator.js - Final Tested Version

const translations = {
    en: {
        // Quotes (without quotes for matching)
        "Nothing is more precious than independence and freedom": "Nothing is more precious than independence and freedom",
        "In the end, we will remember not the words of our enemies, but the silence of our friends.": "In the end, we will remember not the words of our enemies, but the silence of our friends.",

        // About section
        "About the Web": "About the Web",
        "Origins": "Origins",
        "The day when everything has begun: 27/3/2025": "The day when everything has begun: 27/3/2025",
        "Founder": "Founder",
        "Mission": "Mission",
        "Return to [Letter from the host]": "Return to [Letter from the host]",

        // Rules section
        "Our rules": "Our rules",
        "Provide innovations with authentic proof (statistics) images, source limit...": "Provide innovations with authentic proof (statistics, images, source limit...)",
        "Treat each other with kind and respect. We embrace equality and comparison.": "Treat each other with kind and respect. We embrace equality and comparison.",
        "Apply comments promoting extreme ideologies will be deleted, and their accounts may get penalized.": "Apply comments promoting extreme ideologies will be deleted, and their accounts may get penalized.",

        // Upgrades section
        "Future upgrades": "Future upgrades",
        "Watch more and \"Arts\" section in Movie Categories": "Watch more and \"Arts\" section in Movie Categories",
        "Historical background for each movies": "Historical background for each movies",
        "Chat box (AI chat and human chat)": "Chat box (AI chat and human chat)",

        // Navigation
        "Log In / Sign Up": "Log In / Sign Up",
        "Log In": "Log In",
        "Sign Up": "Sign Up",

        // Footer
        "© 2025 Kino of the 'Caust. All rights reserved.": "© 2025 Kino of the 'Caust. All rights reserved.",
        "Keep going -->": "Keep going -->"
    },
    vi: {
        // Quotes (without quotes for matching)
        "Nothing is more precious than independence and freedom": "Không có gì quý hơn độc lập, tự do",
        "In the end, we will remember not the words of our enemies, but the silence of our friends.": "Suy cho cùng, chúng ta sẽ không nhớ lời nói của kẻ thù, mà là sự im lặng của những người bạn kề cận ta.",

        // About section
        "About the Web": "Về Trang Web",
        "Origins": "Nguồn gốc",
        "The day when everything has begun: 27/3/2025": "Ngày mọi thứ bắt đầu: 27/3/2025",
        "Founder": "Người sáng lập",
        "Mission": "Sứ mệnh",
        "Return to [Letter from the host]": "Trở về [Thư từ chủ nhà]",

        // Rules section
        "Our rules": "Quy định của chúng tôi",
        "Provide innovations with authentic proof (statistics, images, source limit...)": "Cung cấp đổi mới với bằng chứng xác thực (thống kê hình ảnh, nguồn...)",
        "Treat each other with kind and respect. We embrace equality and comparison.": "Đối xử với nhau bằng sự tử tế và tôn trọng. Chúng tôi đề cao bình đẳng và sự cảm thông.",
        "Apply comments promoting extreme ideologies will be deleted, and their accounts may get penalized.": "Những bình luận cổ xúy tư tưởng cực đoan sẽ bị xóa và tài khoản có thể bị phạt.",

        // Upgrades section
        "Future upgrades": "Nâng cấp trong tương lai",
        "Watch more and \"Arts\" section in Movie Categories": "Xem thêm và mục \"Nghệ thuật\" trong Danh mục Phim",
        "Historical background for each movies": "Bối cảnh lịch sử cho từng bộ phim",
        "Chat box (AI chat and human chat)": "Hộp trò chuyện (trò chuyện AI và trò chuyện con người)",

        // Navigation
        "Log In / Sign Up": "Đăng Nhập / Đăng Ký",
        "Log In": "Đăng Nhập",
        "Sign Up": "Đăng Ký",

        // Footer
        "© 2025 Kino of the 'Caust. All rights reserved.": "© 2025 Kino of the 'Caust. Đã đăng ký bản quyền.",
        "Keep going -->": "Tiếp tục -->"
    }
};

// Improved translation function with quote handling
function translateTextContent(element, language) {
    if (!element || !element.textContent) return;

    let text = element.textContent.trim();
    let translatedText = text;

    // Special handling for quoted text
    const isQuoted = text.startsWith('"') && text.endsWith('"');
    const cleanText = isQuoted ? text.slice(1, -1).trim() : text;

    if (translations[language] && translations[language][cleanText]) {
        translatedText = translations[language][cleanText];
        if (isQuoted) {
            translatedText = `"${translatedText}"`;
        }
        element.textContent = translatedText;
    }
}

// Robust page translation function
function translatePage(language) {
    try {
        // Save preference
        localStorage.setItem('preferredLanguage', language);

        // Translate all sections
        document.querySelectorAll('.quote').forEach(el => translateTextContent(el, language));
        document.querySelectorAll('.section-title').forEach(el => translateTextContent(el, language));
        document.querySelectorAll('.about-item h3, .about-item p').forEach(el => translateTextContent(el, language));
        document.querySelectorAll('.roles-list li, .upgrades-list li').forEach(el => translateTextContent(el, language));

        // Footer
        const footer = document.querySelector('footer p');
        if (footer) translateTextContent(footer, language);

        // Navigation
        const userBtn = document.getElementById('userBtn');
        if (userBtn) {
            const translated = translations[language]?.["Log In / Sign Up"] || "Log In / Sign Up";
            userBtn.innerHTML = `${translated} <i class="fas fa-caret-down"></i>`;
        }

        const loginLink = document.querySelector('.dropdown a[href="login.html"]');
        if (loginLink) translateTextContent(loginLink, language);

        const signupLink = document.querySelector('.dropdown a[href="sign up.html"]');
        if (signupLink) translateTextContent(signupLink, language);

        // Translate "Keep going" button
        const keepGoingButton = document.querySelector('.keep-going-button');
        if (keepGoingButton) {
            translateTextContent(keepGoingButton, language);
        }

        // Update selector
        const langSelect = document.getElementById('languageSelect');
        if (langSelect) langSelect.value = language;

    } catch (error) {
        console.error("Translation error:", error);
    }
}

// Reliable initialization
function initTranslator() {
    const langSelect = document.getElementById('languageSelect');
    if (!langSelect) return;

    // Set initial language
    const defaultLang = localStorage.getItem('preferredLanguage') || 'en';
    translatePage(defaultLang);
    langSelect.value = defaultLang;

    // Event listener
    langSelect.addEventListener('change', () => translatePage(langSelect.value));
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTranslator);
} else {
    initTranslator();
}