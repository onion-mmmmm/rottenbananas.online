const translations = {
    vi: {
        // Thông tin cá nhân
        'Name:': 'TÊN:',
        'Age:': 'TUỔI:',
        'Date of birth:': 'NGÀY SINH:',
        'School:': 'TRƯỜNG:',
        'Class:': 'LỚP:',
        'Student code:': 'MÃ HỌC SINH:',
        'Email:': 'EMAIL:',
        
        // Nội dung mô tả
        '- A young boy with great interest in history of humankind, he has been craving on whatever discusses about events and evolutions since he was a child.':
            '- Một chàng trai trẻ đam mê lịch sử nhân loại, luôn khao khát tìm hiểu mọi sự kiện và tiến hóa từ thuở nhỏ.',
        '- Came across WWII history at the age of [REDACTED], falling in love with it since.':
            '- Tình cờ biết đến lịch sử Thế chiến II năm [THÔNG TIN ĐÃ ẨN] tuổi và yêu thích từ đó.',
        '- Desired to raise awareness of WWII history-one of the most important events that shaped the world as we know it today-among the younger generations.':
            '- Mong muốn nâng cao nhận thức về Thế chiến II - sự kiện quan trọng định hình thế giới hiện đại - cho thế hệ trẻ.',
        '- Wanted some free time, but [REDACTED] forced him to code this website.':
            '- Muốn có thời gian rảnh, nhưng [THÔNG TIN ĐÃ ẨN] bắt anh ấy lập trình trang web này.',
        
        // Quote
        '"The sultry sky of fury, war-mongering ambitions does not just burn down the remnants of human accomplishments, but also evaporates the rivers and lakes of justice and equality; only to be suppressed by the rains of justice and equality themselves."':
            '"Bầu trời cuồng nộ của những tham vọng chiến tranh không chỉ thiêu rụi tàn tích của thành tựu nhân loại, mà còn bốc hơi những dòng sông hồ của công lý và bình đẳng; để rồi bị chính những cơn mưa của công lý và bình đẳng dập tắt."',
        
        '"We shall no longer compete with AI, but with ourselves. As AI builds up the material civilization for us, we shall build up our own evolution - the evolution of ideas and spiritual enlightenment."':
            '"Chúng ta sẽ không còn cạnh tranh với AI, mà với chính mình. Khi AI xây dựng nền văn minh vật chất cho chúng ta, chúng ta sẽ xây dựng sự tiến hóa của riêng mình - sự tiến hóa của ý tưởng và giác ngộ tinh thần."',
        
        // Phần khác
        'FOUNDER:': 'NGƯỜI SÁNG LẬP:',
        '[THE ARCHIVIST]': '[NHÀ LƯU TRỮ]',
        'Special thanks to:': 'Chân thành cảm ơn:',
        '← Return to Letter': '← Quay lại Thư',
        '[REDACTED]': '[THÔNG TIN ĐÃ ẨN]',
        '[DECLASSIFIED]': '[ĐÃ GIẢI MẬT]',
        'About The Archivist - WWII War Victims Memorial': 'Về Nhà Lưu Trữ - Đài Tưởng Niệm Nạn Nhân Chiến Tranh WWII',
        'TOP SECRET': 'TUYỆT MẬT'

    }
};

const originalContents = new Map();

function normalizeText(text) {
    return text
        .replace(/<span class="redacted">\[(.*?)\]<\/span>/g, '[REDACTED]')
        .replace(/\s*([,.;])\s*/g, '$1 ')
        .replace(/\s+/g, ' ')
        .trim();
}

function translatePage(language) {
    if (!translations[language] && language !== 'en') {
        console.warn(`Language ${language} not supported`);
        return;
    }

    // Handle [DECLASSIFIED] background text
    const oldStyle = document.getElementById('declassified-style');
    if (oldStyle) oldStyle.remove();
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'declassified-style';
    styleSheet.textContent = `
        .notebook-page::before {
            content: '${language === 'vi' ? translations.vi['[DECLASSIFIED]'] : '[DECLASSIFIED]'}';
        }
        .notebook-page::after {
            content: '${language === 'vi' ? translations.vi['TOP SECRET'] : 'TOP SECRET'}';
        }
    `;
    document.head.appendChild(styleSheet);

    // Update page title
    document.title = translations[language]['About The Archivist - WWII War Victims Memorial'] || 
                     'About The Archivist - WWII War Victims Memorial';

    // Process all translatable elements
    const elements = document.querySelectorAll(`
        h1, .info-label, .info-text, .note p,
        .quote, .special-thanks, .back-link,
        [data-translate]
    `);

    elements.forEach(element => {
        if (!originalContents.has(element)) {
            originalContents.set(element, {
                html: element.innerHTML,
                text: element.textContent.trim()
            });
        }

        const original = originalContents.get(element);
        let translated = original.html;

        if (language === 'en') {
            // Restore original with proper redacted styling
            translated = original.html.replace(
                /\[REDACTED\]|\[THÔNG TIN ĐÃ ẨN\]/g,
                '<span class="redacted">[REDACTED]</span>'
            );
        } else {
            // Handle special cases
            if (element.tagName === 'H1') {
                translated = original.html
                    .replace('FOUNDER:', translations.vi['FOUNDER:'])
                    .replace(/\[?The Archivist\]?/g, translations.vi['[THE ARCHIVIST]']);
            }
            else if (element.classList.contains('info-text')) {
                translated = original.html.replace(
                    /<span class="redacted">\[(.*?)\]<\/span>/g,
                    `<span class="redacted">${translations.vi['[REDACTED]']}</span>`
                );
            }
            else if (element.classList.contains('quote')) {
                const quoteKey = normalizeText(original.text);
                if (translations.vi[quoteKey]) {
                    translated = translations.vi[quoteKey];
                }
            }
            else if (element.classList.contains('special-thanks')) {
                if (original.text === 'Special thanks to:') {
                    translated = translations.vi['Special thanks to:'];
                }
                // Keep other content as-is
            }
            else {
                const key = normalizeText(original.text);
                if (translations.vi[key]) {
                    translated = translations.vi[key];
                }
            }
        }

        element.innerHTML = translated;
    });
}