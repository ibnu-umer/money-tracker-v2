document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-modal-open]").forEach((btn) => {
        const targetId = btn.getAttribute("data-modal-open");
        const modal = document.getElementById(targetId);
        if (!modal) return;

        const modalType = modal.dataset.modalType || "center";
        const closeBtn = modal.querySelector("[data-modal-close]");
        const formTitle = modal.querySelector(".form-title")

        const open = (mode = null) => {
            if (targetId === "SGAddModal") {
                formTitle.innerText = btn.dataset.id === "new" ?  mode + " Goal" : mode + " Goal";
            } else if (targetId === "budgetModal") {
                formTitle.innerText = btn.dataset.id === "new" ? mode + " Budget" : mode + " Budget";
            } else if (targetId === "transactionModal") {
                formTitle.innerText = btn.dataset.id === "new" ? mode + " Transaction" : mode + " Transaction";
            } else if (targetId === "billModal") {
                formTitle.innerText = btn.dataset.id === "new" ? mode + " Bill" : mode + " Bill";
            }


            modal.classList.remove("hidden");
            document.addEventListener("keydown", escClose);
            document.addEventListener("click", outsideClick);
            if (targetId === "monthSelectorModal") {
                populateYears();
            }
        };

        const close = () => {
            modal.classList.add("hidden");
            document.removeEventListener("keydown", escClose);
            document.removeEventListener("click", outsideClick);
        };

        const outsideClick = (e) => {
            if (!modal.contains(e.target) && !btn.contains(e.target)) {
                close();
            }
        };

        const escClose = (e) => {
            if (e.key === "Escape") close();
        };

        if (modalType === "center") {
            const overlay = modal.querySelector("[data-modal-overlay]");
            overlay?.addEventListener("click", (e) => {
                if (e.target === overlay) close();
            });
        }

        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            let mode = btn.dataset.id === "new" ? "Add" : "Edit";
            modal.classList.contains("hidden") ? open(mode) : close();
        });

        closeBtn?.addEventListener("click", close);

        // Double click event for Transaction Modal
        if (modal.id === "transactionModal") {
            document.querySelectorAll(".transaction-item").forEach((item) => {
                item.addEventListener("dblclick", (e) => {
                    modal.classList.contains("hidden") ? open("Edit") : close();
                });
            });
        }
    });
});



// -------------Transaction Modal-----------------------
const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");

if (incomeBtn && expenseBtn) {
    incomeBtn.classList.add("active", "income");
    incomeBtn.addEventListener("click", () => {
        incomeBtn.classList.add("active", "income");
        expenseBtn.classList.remove("active", "expense");
    });
    expenseBtn.addEventListener("click", () => {
        expenseBtn.classList.add("active", "expense");
        incomeBtn.classList.remove("active", "income");
    });
}



/* -------------------- Month Selector -------------------- */

// Populate years dropdown (current year ± 10 years)
function populateYears() {
    const yearSelect = document.getElementById("yearSelect");
    if (!yearSelect) return;

    const currentYear = new Date().getFullYear();
    yearSelect.innerHTML = "";

    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

// Apply selected date
function applyMonthSelection() {
    const monthSelect = document.getElementById("monthSelect");
    const yearSelect = document.getElementById("yearSelect");
    if (!monthSelect || !yearSelect) return;

    const selectedMonth = parseInt(monthSelect.value);
    const selectedYear = parseInt(yearSelect.value);

    const monthNames = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    const selectedDate = `${selectedYear} ${monthNames[selectedMonth]}`;
    document.getElementById("openMonthYear").textContent = selectedDate;
    closeModal("monthSelectorModal");
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add("hidden");
}




// Saving Goals
// --------------------------------------------------

// Open drawer
const drawerOpen = document.getElementById("openDrawer");
const drawer = document.getElementById("SGDrawer");
const drawerClose = document.getElementById("closeDrawer")

drawerOpen.addEventListener("click", () => {
    drawer.classList.toggle("active");
});

drawerClose.addEventListener("click", () => {
    drawer.classList.remove("active");
});


