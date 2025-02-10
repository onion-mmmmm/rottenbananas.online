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
  document
    .getElementById("nav-search-btn")
    .addEventListener("click", function () {
      const navQuery = document.getElementById("nav-search-input").value;
      document.getElementById("search-input").value = navQuery;
      searchMovies();
    });
  