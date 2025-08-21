document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-modal-open]").forEach((btn) => {
        const targetId  = btn.getAttribute("data-modal-open");
        const container = document.getElementById(targetId);
        if (!container) return;

        const overlay   = container.querySelector("[data-modal-overlay]");
        const closers   = container.querySelectorAll(".data-modal-close");

        const open = () => {
            container.classList.remove("hidden");
            container.dataset.opener = btn.id || "";
        };

        const close = () => {
            container.classList.add("hidden");
            const openerId = container.dataset.opener;
            if (openerId) document.getElementById(openerId)?.focus();
        };

        btn.addEventListener("click", open);
        closers.forEach((el) => el.addEventListener("click", close));
        overlay?.addEventListener("click", (e) => { if (e.target === overlay) close(); });

        closers.forEach((el) => el.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); el.click(); }
        }));
    });

    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        document.querySelectorAll(".modal-container:not(.hidden)")
        .forEach((m) => { m.classList.add("hidden"); });
    });
});
