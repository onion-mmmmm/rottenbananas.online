
    function showPopup(videoUrl) {
        const popup = document.getElementById('popup');
        const iframe = document.getElementById('popup-video');
        iframe.src = videoUrl;
        popup.style.display = 'flex';
    }

    function hidePopup() {
        const popup = document.getElementById('popup');
        const iframe = document.getElementById('popup-video');
        iframe.src = ''; // Ngừng video khi đóng
        popup.style.display = 'none';
    }

