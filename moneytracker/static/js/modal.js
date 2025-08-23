document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-modal-open]").forEach((btn) => {
    const targetId = btn.getAttribute("data-modal-open");
    const container = document.getElementById(targetId);
    if (!container) return;

    const modalType = container.dataset.modalType || "center";
    const closeBtn = container.querySelector(".data-modal-close");

    // ---- Open logic ----
    const open = () => {
      container.classList.remove("hidden");
      if (modalType === "dropdown" || modalType === "center") {
        document.addEventListener("click", outsideClick);
      }
      if (modalType === "dropdown") {
        positionDropdown(container, btn);
      }

    //   Populate year select 
      if (targetId === "monthSelectorModal") {
        populateYears();
      }
    };

    const close = () => {
        container.classList.add("hidden");
        if (modalType === "dropdown") {
            document.removeEventListener("click", outsideClick);
        }
        };

        // For center modals: close when clicking overlay
        if (modalType === "center") {
        const overlay = container.querySelector("[data-modal-overlay]");
        overlay?.addEventListener("click", (e) => {
            // prevent closing when clicking inside .modal-content
            if (e.target === overlay) {
            close();
            }
        });
    };

    // ---- Outside click handler ----
    const outsideClick = (e) => {
      if (!container.contains(e.target) && !btn.contains(e.target)) {
        close();
      }
    };

    // Toggle on button click
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (container.classList.contains("hidden")) open();
      else close();
    });

    // Close button (×)
    closeBtn?.addEventListener("click", close);

    // Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  });
});

// --- Helper to place dropdown under button ---
function positionDropdown(container, trigger) {
  const rect = trigger.getBoundingClientRect();
  container.style.top = `${rect.bottom + window.scrollY + 6}px`;
  container.style.left = `${rect.left + window.scrollX}px`;
}


// -----------------Transaction-----------------------

//Handle Type Button toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const incomeBtn = document.getElementById('incomeBtn');
    const expenseBtn = document.getElementById('expenseBtn');
    
    // Set initial state - income is default
    incomeBtn.classList.add('active', 'income');
    expenseBtn.classList.remove('active');
    
    incomeBtn.addEventListener('click', function() {
        this.classList.add('active', 'income');
        expenseBtn.classList.remove('active');
    });
    
    expenseBtn.addEventListener('click', function() {
        this.classList.add('active', 'expense');
        incomeBtn.classList.remove('active');
    });
});




// --------------------Month Selector----------------------------

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
    const selectedDate = ` ${selectedYear}  ${selectedMonthName}`;
    
    document.getElementById('openMonthYear').textContent = `${selectedDate}`;
    document.getElementById("monthSelectorModal").classList.add("hidden");
}



function closeModal() {
    document.getElementById("monthSelectorModal").classList.add("hidden");
}