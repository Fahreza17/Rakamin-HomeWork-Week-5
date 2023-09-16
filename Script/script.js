class Pendaftar {
    constructor(nama, umur, uangSangu) {
        this.nama = nama;
        this.umur = umur;
        this.uangSangu = uangSangu;
    }
}

const pendaftarList = [];

// Fungsi untuk membuka tab
function openTab(evt, tabName) {
    const tabcontents = document.querySelectorAll(".tab-content");
    const tablinks = document.querySelectorAll(".btn-12");

    tabcontents.forEach((content) => {
        content.style.display = "none";
    });

    tablinks.forEach((link) => {
        link.classList.remove("active");
    });

    document.getElementById(tabName).style.display = "flex";
    evt.currentTarget.classList.add("active");

    // Jika tab "List Pendaftar" aktif, render data pendaftar
    if (tabName === "ListPendaftar") {
        renderData();
    }
}

// Fungsi untuk submit form
function submitForm() {
    const nama = document.getElementById("input-name").value;
    const umur = document.getElementById("input-age").value;
    const uangSangu = document.getElementById("input-money").value;

    // Cek kriteria
    if (nama.length < 10 || umur < 25 || uangSangu < 100000 || uangSangu > 1000000) {
        alert("Data tidak memenuhi kriteria!");
        return;
    }

    // Tambahkan data ke array
    const pendaftar = new Pendaftar(nama, umur, uangSangu);
    pendaftarList.push(pendaftar);

    // Reset form
    document.getElementById("input-name").value = "";
    document.getElementById("input-age").value = "";
    document.getElementById("input-money").value = "";

    // Jika tab "List Pendaftar" aktif, render data pendaftar
    const tabListPendaftar = document.getElementById("ListPendaftar");
    if (tabListPendaftar.style.display === "flex") {
        renderData();
    }
}

// Fungsi untuk menghitung rata-rata umur dan uang sangu pendaftar
function hitungRataRata() {
    let totalUmur = 0;
    let totalUangSangu = 0;
    const tableRows = document.querySelectorAll("#pendaftarData tr");

    tableRows.forEach((row, index) => {
        if (index !== -1) {
            const umur = parseInt(row.cells[1].textContent);
            const uangSangu = parseInt(row.cells[2].textContent);

            totalUmur += umur;
            totalUangSangu += uangSangu;
        }
    });

    const jumlahData = tableRows.length;
    const rataRataUmur = (totalUmur / jumlahData);
    const rataRataUangSangu = (totalUangSangu / jumlahData);

    return { rataRataUmur, rataRataUangSangu, totalUmur };
}

// Fungsi untuk merender data pendaftar ke dalam tabel
function renderData() {
    const tableBody = document.getElementById("pendaftarData");
    tableBody.innerHTML = "";

    for (let i = 0; i < pendaftarList.length; i++) {
        const pendaftar = pendaftarList[i];
        const row = tableBody.insertRow(i);

        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.innerHTML = pendaftar.nama;
        cell2.innerHTML = pendaftar.umur;
        cell3.innerHTML = pendaftar.uangSangu;
    }

    const { rataRataUmur, rataRataUangSangu} = hitungRataRata();
    const resumeText = document.getElementById("resumeText");

    resumeText.textContent = `Rata-rata pendaftar memiliki uang sangu sebesar ${rataRataUangSangu.toFixed(2)} dengan rata-rata umur ${rataRataUmur.toFixed(2)}`;
}
