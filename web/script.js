let allJobs = []; // Menyimpan semua pekerjaan
let globalCurrentJob = null; // Menyimpan pekerjaan saat ini secara global

// Simpan referensi elemen DOM agar lebih efisien
const jobList = document.getElementById("job-list");
const currentJobLabel = document.getElementById("current-job-label");
const container = document.getElementById("job-container");
const escText = document.getElementById("esc-text");
const searchInput = document.getElementById("search-input");

// Fungsi untuk menampilkan daftar pekerjaan
function displayJobs(jobs, currentJob) {
    jobList.innerHTML = ""; // Kosongkan daftar pekerjaan sebelum menampilkan yang baru
    currentJobLabel.textContent = currentJob?.label || "Unemployed";

    if (!jobs.length) {
        jobList.innerHTML = `<p style="text-align:center; color:gray;">No jobs available.</p>`;
        return;
    }

    jobs.sort((a, b) => a.label.localeCompare(b.label));

    const fragment = document.createDocumentFragment();

    jobs.forEach((job) => {
        if (!job?.name || !job?.label || !job?.image) {
            return;
        }

        const card = document.createElement("div");
        card.className = "job-card";
        card.innerHTML = `
            <img src="${job.image}" alt="${job.label}" class="job-image">
            <h3>${job.label}</h3>
            <p class="job-description">${job.description || "No description available."}</p>
            <button class="job-button">APPLY JOB</button>
        `;

        card.querySelector(".job-button").addEventListener("click", () => applyJob(job.name));
        fragment.appendChild(card);
    });

    jobList.appendChild(fragment);
}

// Fungsi untuk mengirim permintaan pemilihan pekerjaan
function applyJob(jobName) {
    fetch(`https://${GetParentResourceName()}/selectJob`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobName }),
    }).then(() => closeUI()).catch(console.error);
}

// Fungsi untuk menyaring pekerjaan berdasarkan kata kunci
function filterJobs(keyword) {
    displayJobs(
        allJobs.filter((job) => job.label.toLowerCase().includes(keyword.toLowerCase())),
        globalCurrentJob
    );
}

// Fungsi untuk membuka UI
function openUI() {
    container.style.display = "block";
    container.classList.remove("fade-out");
    container.classList.add("fade-in");
    escText.classList.remove("hidden");
    document.body.classList.add("ui-active");

    document.addEventListener("keydown", escListener);
}

// Fungsi untuk menutup UI
function closeUI() {
    container.classList.remove("fade-in");
    container.classList.add("fade-out");
    document.body.classList.remove("ui-active");

    setTimeout(() => {
        container.style.display = "none";
        escText.classList.add("hidden");
    }, 300);

    document.removeEventListener("keydown", escListener);

    fetch(`https://${GetParentResourceName()}/closeUI`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    }).catch(console.error);
}

// Event listener untuk tombol ESC
function escListener(event) {
    if (event.key === "Escape") {
        closeUI();
    }
}

// Pastikan teks ESC tidak muncul saat awal
document.addEventListener("DOMContentLoaded", () => escText.classList.add("hidden"));

// Event listener untuk menerima pesan dari NUI
window.addEventListener("message", (event) => {
    if (event.data.type === "displayJobs") {
        allJobs = event.data.jobs || [];
        globalCurrentJob = event.data.currentJob || null;
        openUI();
        displayJobs(allJobs, globalCurrentJob);
    } else if (event.data.type === "hideUI") {
        closeUI();
    }
});

// Event listener untuk input pencarian
searchInput.addEventListener("input", (e) => filterJobs(e.target.value));
