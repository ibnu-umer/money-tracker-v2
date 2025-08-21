// Populate years dropdown (current year ± 10 years)
function populateYears() {
    const yearSelect = document.getElementById('yearSelect');
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 10;
    const endYear = currentYear + 10;
    
    yearSelect.innerHTML = ''; // Clear existing options
    
    for (let year = startYear; year <= endYear; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}


function openMonthYearPopup() {
    
    // Initialize dropdowns
    populateYears();
    
    // Set current month and year as selected
    const now = new Date();
    document.getElementById('monthSelect').value = now.getMonth();
    document.getElementById('yearSelect').value = now.getFullYear();
    
    // Show popup
    document.getElementById('monthSelectorModal').style.display = 'flex';
}

// Close popup
function closeMonthYearPopup() {
    document.getElementById('monthSelectorModal').style.display = 'none';
}

// Apply selected date
function applyDateSelection() {
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');
    
    const selectedMonth = parseInt(monthSelect.value);
    const selectedYear = parseInt(yearSelect.value);
    
    // Get month name
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    const selectedMonthName = monthNames[selectedMonth];
    const selectedDate = `${selectedMonthName} ${selectedYear}`;
    
    document.getElementById('selectedDateDisplay').textContent = `Selected: ${selectedDate}`;
    closeMonthYearPopup();
    
    // Here you can add your logic to use the selected month and year
    console.log('Selected:', selectedMonth + 1, selectedYear); // +1 because months are 0-indexed
}

// Close popup when clicking outside
window.addEventListener('click', function(event) {
    const popup = document.getElementById('monthSelectorModal');
    if (event.target === popup) {
        closeMonthYearPopup();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeMonthYearPopup();
    }
});