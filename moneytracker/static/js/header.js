const yearDropdown = document.getElementById("yearDropdown");
const currentYear = new Date().getFullYear();

for (let year = currentYear; year >= currentYear - 10; year--) {
  const option = document.createElement('option');
  option.value = year;
  option.textContent = year;
  yearDropdown.appendChild(option);
}
