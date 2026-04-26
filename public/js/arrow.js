const filters = document.getElementById("filters");
const leftBtn = document.getElementById("scrollLeft");
const rightBtn = document.getElementById("scrollRight");

if (filters && leftBtn && rightBtn) {
  const step = 260;

  const updateButtons = () => {
    const maxScrollLeft = filters.scrollWidth - filters.clientWidth;
    leftBtn.disabled = filters.scrollLeft <= 0;
    rightBtn.disabled = filters.scrollLeft >= maxScrollLeft - 1;
  };

  leftBtn.addEventListener("click", () => {
    filters.scrollBy({ left: -step, behavior: "smooth" });
  });

  rightBtn.addEventListener("click", () => {
    filters.scrollBy({ left: step, behavior: "smooth" });
  });

  filters.addEventListener("scroll", updateButtons);
  window.addEventListener("resize", updateButtons);
  updateButtons();
}