let allJobs = []; // Menyimpan semua pekerjaan
let globalCurrentJob = null; // Menyimpan pekerjaan saat ini secara global

function displayJobs(jobs, currentJob) {
    const jobList = document.getElementById("job-list");
    jobList.innerHTML = ""; // Kosongkan daftar pekerjaan sebelum menampilkan yang baru

    // Tampilkan pekerjaan saat ini pemain
    const currentJobLabel = document.getElementById("current-job-label");
    if (currentJob && currentJob.label) {
        currentJobLabel.textContent = currentJob.label;
    } else {
        currentJobLabel.textContent = "Unemployed";
    }

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

        const jobDescription = document.createElement("p");
        jobDescription.textContent = job.description || "No description available.";
        jobDescription.classList.add("job-description");

        const button = document.createElement("button");
        button.textContent = "APPLY JOB";
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
        card.appendChild(jobDescription);
        card.appendChild(button);

        jobList.appendChild(card);
    });
}

function filterJobs(keyword) {
    const filteredJobs = allJobs.filter((job) =>
        job.label.toLowerCase().includes(keyword.toLowerCase())
    );
    displayJobs(filteredJobs, globalCurrentJob); // Gunakan currentJob dari variabel global
}

// Fungsi untuk membuka UI
function openUI() {
    console.log("[DEBUG] Membuka UI dari NUI");
    const container = document.getElementById("job-container");
    container.style.display = "block";
    container.classList.remove("fade-out"); // Hapus kelas animasi menutup
    container.classList.add("fade-in"); // Tambahkan kelas animasi membuka
    document.getElementById("esc-text").classList.remove("hidden"); // Tampilkan ESC

    // Tambahkan class 'ui-active' ke body
    document.body.classList.add("ui-active");

    document.addEventListener("keydown", escListener);
}

// Fungsi untuk menutup UI
function closeUI() {
    console.log("[DEBUG] Menutup UI dari NUI");
    const container = document.getElementById("job-container");
    container.classList.remove("fade-in"); // Hapus kelas animasi membuka
    container.classList.add("fade-out"); // Tambahkan kelas animasi menutup

    // Hapus class 'ui-active' dari body
    document.body.classList.remove("ui-active");

    // Tunggu hingga animasi selesai sebelum menyembunyikan container
    setTimeout(() => {
        container.style.display = "none";
    }, 300); // Sesuaikan waktu dengan durasi animasi

    document.getElementById("esc-text").classList.add("hidden"); // Sembunyikan ESC
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

window.addEventListener("message", function (event) {
    if (event.data.type === "displayJobs") {
        allJobs = event.data.jobs; // Simpan semua pekerjaan
        globalCurrentJob = event.data.currentJob; // Simpan pekerjaan saat ini ke variabel global
        openUI();
        displayJobs(allJobs, globalCurrentJob); // Pastikan currentJob tidak berubah saat UI dibuka
    } else if (event.data.type === "hideUI") {
        closeUI();
    }
});

// Event listener untuk input pencarian
document.getElementById("search-input").addEventListener("input", function (e) {
    const keyword = e.target.value;
    filterJobs(keyword); // Filter pekerjaan berdasarkan kata kunci
});