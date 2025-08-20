document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("transactionModal"); // outer wrapper
    const overlay   = container.querySelector(".modal");           // full-screen backdrop
    const closeBtn  = container.querySelector(".close");
    const openBtn   = document.getElementById("openTransactionPopup");

    const open  = () => container.classList.remove("hidden");
    const close = () => container.classList.add("hidden");

    openBtn?.addEventListener("click", open);
    closeBtn?.addEventListener("click", close);

    // Close when clicked outside the popup
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });
});


//Handle Type Button the toggle functionality
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