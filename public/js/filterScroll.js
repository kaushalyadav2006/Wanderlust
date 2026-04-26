const filters = document.getElementById("filters");
const leftBtn = document.getElementById("scrollLeft");
const rightBtn = document.getElementById("scrollRight");

// Horizontal scroll buttons
if (filters && leftBtn && rightBtn) {
  const step = 260;

  const updateButtons = () => {
    const maxScrollLeft = filters.scrollWidth - filters.clientWidth;

    leftBtn.disabled = filters.scrollLeft <= 0;
    rightBtn.disabled = filters.scrollLeft >= maxScrollLeft - 2;
  };

  leftBtn.addEventListener("click", () => {
    filters.scrollBy({
      left: -step,
      behavior: "smooth"
    });

    setTimeout(updateButtons, 300);
  });

  rightBtn.addEventListener("click", () => {
    filters.scrollBy({
      left: step,
      behavior: "smooth"
    });

    setTimeout(updateButtons, 300);
  });

  filters.addEventListener("scroll", updateButtons);
  window.addEventListener("resize", updateButtons);

  updateButtons();
}

// Filter click navigation
document.querySelectorAll(".filter").forEach((filter) => {
  filter.addEventListener("click", function () {
    const category = this.querySelector("p").textContent.trim();

    window.location.href =
      `/listings?category=${encodeURIComponent(category)}`;
  });
});

// Clear filter
const clearBtn = document.getElementById("clearFilter");

if (clearBtn) {
  clearBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    window.location.href = "/listings";
  });
}

// Keyboard scrolling
document.addEventListener("keydown", (e) => {
  if (!filters) return;

  if (e.key === "ArrowRight") {
    filters.scrollBy({
      left: 120,
      behavior: "smooth"
    });
  }

  if (e.key === "ArrowLeft") {
    filters.scrollBy({
      left: -120,
      behavior: "smooth"
    });
  }
});

document.querySelectorAll(".filter").forEach((filter) => {
  filter.addEventListener("click", function () {
    const category = this.querySelector("p").textContent.trim();
    window.location.href = `/listings?category=${encodeURIComponent(category)}`;
  });
});