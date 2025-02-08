// Fungsi untuk menampilkan daftar pekerjaan sebagai card
function displayJobs(jobs) {
    const jobList = document.getElementById("job-list");
    jobList.innerHTML = "";

    jobs.sort((a, b) => a.label.localeCompare(b.label));

    jobs.forEach((job) => {
        if (!job || typeof job.name !== "string" || typeof job.label !== "string" || typeof job.image !== "string") {
            console.error("[SECURITY] Data pekerjaan tidak valid!", job);
            return;
        }

        const card = document.createElement("div");
        card.classList.add("job-card");

        const img = document.createElement("img");
        img.src = job.image;
        img.alt = job.label;
        img.classList.add("job-image");

        const jobName = document.createElement("h3");
        jobName.textContent = job.label;

        const button = document.createElement("button");
        button.textContent = "Pilih Pekerjaan";
        button.classList.add("job-button");
        button.addEventListener("click", () => {
            fetch(`https://${GetParentResourceName()}/selectJob`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ jobName: job.name }),
            }).then(() => closeUI());
        });

        card.appendChild(img);
        card.appendChild(jobName);
        card.appendChild(button);

        jobList.appendChild(card);
    });
}

// Fungsi untuk membuka UI
function openUI() {
    console.log("[DEBUG] Membuka UI dari NUI");
    document.getElementById("job-container").style.display = "block";
    document.getElementById("esc-text").classList.remove("hidden"); // ✅ Tampilkan ESC

    document.addEventListener("keydown", escListener);
}

// Fungsi untuk menutup UI
function closeUI() {
    console.log("[DEBUG] Menutup UI dari NUI");
    document.getElementById("job-container").style.display = "none";
    document.getElementById("esc-text").classList.add("hidden"); // ✅ Sembunyikan ESC

    document.removeEventListener("keydown", escListener);

    fetch(`https://${GetParentResourceName()}/closeUI`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
}

// Fungsi untuk menangani tombol ESC
function escListener(event) {
    if (event.key === "Escape") {
        console.log("[DEBUG] ESC ditekan, menutup UI");
        closeUI();
    }
}

// Pastikan teks ESC tidak muncul saat awal
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("esc-text").classList.add("hidden");
});

// Menerima pesan dari Lua
window.addEventListener("message", function (event) {
    if (event.data.type === "displayJobs") {
        openUI();
        displayJobs(event.data.jobs);
    } else if (event.data.type === "hideUI") {
        closeUI();
    }
});
