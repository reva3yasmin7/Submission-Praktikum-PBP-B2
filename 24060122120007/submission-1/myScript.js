const subKategoriOption ={
    baju:[
        {value:"bajuPria", text:"Baju Pria"},
        {value:"bajuWanita", text:"Baju Wanita"},
        {value:"bajuAnak", text:"Baju Anak"},
    ],
    elektronik:[
        {value:"mesinCuci", text:"Mesin Cuci"},
        {value:"kulkas", text:"Kulkas"},
        {value:"ac", text:"AC"},
    ],
    alatTulis:[
        {value:"kertas", text:"Kertas"},
        {value:"map", text:"Map"},
        {value:"pulpen", text:"Pulpen"},
    ]
};
function updateSubKategori(){
    const kategoriSelect = document.getElementById("fkategori");
    const subKategoriSelect = document.getElementById("fsubKategori");
    const selectedKategori = kategoriSelect.value;

    subKategoriSelect.innerHTML='<option value="">--Pilih Sub Kategori--</option>';

    if(selectedKategori){
        subKategoriOption[selectedKategori].forEach(option => {
            const newOption = document.createElement("option");
            newOption.value = option.value;
            newOption.textContent = option.text;
            subKategoriSelect.appendChild(newOption);
        });
    }
}
function generateCaptcha() {
    let captcha = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        captcha += characters.charAt(randomIndex);
    }

    document.getElementById('captcha').value = captcha;
}

function validateForm() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedCount = checkboxes.length;

    // Cek apakah jumlah checkbox yang dipilih kurang dari 3
    if (selectedCount < 3) {
        alert("Anda harus memilih setidaknya 3 dari 5 jasa kirim.");
        return false; // Mencegah form submit
    }

    const grosirYa = document.getElementById("ya").checked;
    const hargaGrosir = document.getElementById("fhargaGrosir").value;

    // Cek apakah radio "Ya" pada Grosir dipilih dan harga grosir tidak diisi
    if (grosirYa && hargaGrosir === "") {
        alert("Anda harus mengisi Harga Grosir jika memilih Ya pada Grosir.");
        return false; // Mencegah form submit
    }

    const inputCaptcha = document.getElementById('inputCaptcha').value;
    const captcha = document.getElementById('captcha').value;

    // Cek apakah CAPTCHA benar
    if (inputCaptcha !== captcha) {
        alert("CAPTCHA tidak sesuai. Silakan coba lagi.");
        return false; // Mencegah form submit
    }

    return true; // Melanjutkan submit form jika validasi lolos
}

// Fungsi untuk mereset form
function resetForm() {
    document.forms["formProduk"].reset(); // Mereset semua input form
    generateCaptcha(); // Generate CAPTCHA baru
}

// Panggil generateCaptcha saat halaman di-load
window.onload = generateCaptcha;