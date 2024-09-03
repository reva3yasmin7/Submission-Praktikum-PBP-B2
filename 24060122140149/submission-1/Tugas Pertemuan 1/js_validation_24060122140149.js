// Nama: Demina Ayunda Chesara
// NIM: 24060122140149
// Tanggal: 1 September 2024
// Keterangan: Form Tambah Data Produk
// Praktikum Pemrograman Berbasis Objek B2 

function validateForm(){
    namaProduk = document.forms['formProduk']['namaProduk'].value;
    deskripsiProduk = document.forms['formProduk']['deskripsiProduk'].value;
    kategori = document.forms['formProduk']['kategori'].value;
    subKategori = document.forms['formProduk']['subKategori'].value;
    hargaSatuan = document.forms['formProduk']['hargaSatuan'].value;
    grosir = document.forms['formProduk']['grosir'].value;
    hargaGrosir = document.forms['formProduk']['hargaGrosir'].value;
    jasaKirim = document.forms['formProduk']['jasaKirim'].value;
    captcha = document.forms['formProduk']['captcha'].value;

    // Nama produk validation
    if (namaProduk.length < 5 || namaProduk.length > 30) {
        alert("Nama produk harus diisi dengan minimal 5 karakter dan maksimal 30 karakter.");
        return false;
    }

    // Deskripsi produk validation
    if (deskripsiProduk.length < 5 || deskripsiProduk.length > 100) {
        alert("Deskripsi produk harus diisi dengan minimal 5 karakter dan maksimal 100 karakter.");
        return false;
    }

    // Kategori validation
    if (kategori == "") {
        alert("Kategori harus dipilih.");
        return false;
    }

    // Sub Kategori validation
    if (subKategori == "" || subKategori == "--Pilih Sub Kategori--") {
        alert("Sub Kategori harus dipilih sesuai dengan kategori yang dipilih.");
        return false;
    }

    var validSubKategori = {
        "Baju": ["Baju Pria", "Baju Wanita", "Baju Anak"],
        "Elektronik": ["Mesin Cuci", "Kulkas", "AC"],
        "Alat Tulis": ["Kertas", "Map", "Pulpen"]
    };

    if (!(kategori in validSubKategori && validSubKategori[kategori].includes(subKategori))) {
        alert("Sub Kategori yang dipilih tidak valid untuk kategori yang dipilih.");
        return false;
    }
    
    // Harga Satuan validation
    if (isNaN(hargaSatuan) || hargaSatuan === "") {
        alert("Harga Satuan harus diisi dan berupa angka.");
        return false;
    }

    /// Validasi grosir dan harga grosir
    if (grosir == "Ya") {
        if (isNaN(hargaGrosir) || hargaGrosir == "") {
            alert("Harga grosir harus diisi dan harus berupa nilai numerik.");
            return false;
        }
    } else if (grosir == "Tidak") {
        document.forms['formProduk']['hargaGrosir'].value = ""; 
    }

    // validasi Jasa kirim
    let selectedJasaKirim = 0;
    let checkboxes = document.querySelectorAll('input[name="jasaKirim"]:checked');
    selectedJasaKirim = checkboxes.length;
    if (selectedJasaKirim < 3) {
        alert("Minimal jasa kirim yang dipilih adalah 3.");
        return false;
    }

    // Captcha validation
    var generatedCaptcha = document.getElementById("generatedCaptcha").value;
    if (captcha !== generatedCaptcha) {
        alert("Captcha tidak sesuai.");
        return false;
    }
    return true;
}


function updateSubKategori() {
    kategori = document.forms['formProduk']['kategori'].value;
    subKategori = document.forms['formProduk']['subKategori'];
    subKategoriOptions = {
        "Baju": ["Baju Pria", "Baju Wanita", "Baju Anak"],
        "Elektronik": ["Mesin Cuci", "Kulkas", "AC"],
        "Alat Tulis": ["Kertas", "Map", "Pulpen"]
    };

    // Menghapus semua opsi sub kategori saat ini
    subKategori.length = 0;

    // Tambahkan opsi default
    option = new Option("--Pilih Sub Kategori--", "");
    subKategori.options.add(option);

    if(kategori in subKategoriOptions){
        options = subKategoriOptions[kategori];
        for(i = 0; i < options.length; i++) {
            option = new Option(options[i], options[i]);
            subKategori.options.add(option);
        }
    }
}

function generateCaptcha() {
    var captcha = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 5; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    document.getElementById("generatedCaptcha").value = captcha;
    document.getElementById("captchaDisplay").innerText = captcha;
}

window.onload = function() {
    generateCaptcha();
};