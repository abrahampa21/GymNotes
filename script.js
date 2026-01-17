const modal = document.getElementById("modal");
const addButton = document.querySelectorAll(".btn-add");
const closeModal = document.getElementById("close-modal");

addButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.style.display = "flex";
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
