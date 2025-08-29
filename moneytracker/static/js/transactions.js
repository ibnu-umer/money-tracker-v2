const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-button")

toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

// Close with close button
closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
});