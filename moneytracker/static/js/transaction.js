document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("transactionModal"); // outer wrapper
  const overlay   = container.querySelector(".modal");           // full-screen backdrop
  const closeBtn  = container.querySelector(".close");
  const openBtn   = document.getElementById("openTransactionPopup");

  const open  = () => container.classList.remove("hidden");
  const close = () => container.classList.add("hidden");

  openBtn?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);

  // close when clicking outside modal-content (i.e., on the overlay)
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  // optional: ESC to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
});
