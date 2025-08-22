


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

