function validateForm() {
    var form = document.forms['formProduk'];

    // Validasi Nama Produk
    var namaProduk = form['nama_produk'];
    if (namaProduk.value.length < 5 || namaProduk.value.length > 30) {
        document.getElementById('errNamaProduk').innerHTML = "Nama produk harus diisi, minimal 5 karakter, maksimal 30 karakter";
        namaProduk.focus();
        return false;
    } else {
        document.getElementById('errNamaProduk').innerHTML = "";
    }

    // Validasi Deskripsi Produk
    var deskripsiProduk = form['deskripsi'];
    if (deskripsiProduk.value.length < 5 || deskripsiProduk.value.length > 100) {
        document.getElementById('errDeskripsi').innerHTML = "Deskripsi produk harus diisi, minimal 5 karakter, maksimal 100 karakter";
        deskripsiProduk.focus();
        return false;
    } else {
        document.getElementById('errDeskripsi').innerHTML = "";
    }

    // Validasi Kategori
    var kategori = form['kategori'];
    if (kategori.value === "") {
        document.getElementById('errKategori').innerHTML = "Kategori harus diisi";
        kategori.focus();
        return false;
    } else {
        document.getElementById('errKategori').innerHTML = "";
    }

    // Validasi Sub Kategori
    var subKategori = form['sub_kategori'];
    if (subKategori.value === "") {
        document.getElementById('errSubKategori').innerHTML = "Sub kategori harus diisi sesuai dengan kategori yang dipilih";
        subKategori.focus();
        return false;
    } else {
        document.getElementById('errSubKategori').innerHTML = "";
    }

    // Validasi Harga Satuan
    var hargaSatuan = form['harga_satuan'];
    if (isNaN(hargaSatuan.value) || hargaSatuan.value === "") {
        document.getElementById('errHargaSatuan').innerHTML = "Harga satuan harus diisi, berupa nilai numerik";
        hargaSatuan.focus();
        return false;
    } else {
        document.getElementById('errHargaSatuan').innerHTML = "";
    }

    // Validasi Grosir dan Harga Grosir
    var grosirYa = form['grosir_ya'].checked;
    var hargaGrosir = form['harga_grosir'];

    if (grosirYa) {
        if (isNaN(hargaGrosir.value) || hargaGrosir.value === "") {
            document.getElementById('errHargaGrosir').innerHTML = "Harga grosir harus diisi jika pilihan Grosir adalah Ya, berupa nilai numerik";
            hargaGrosir.focus();
            return false;
        } else {
            document.getElementById('errHargaGrosir').innerHTML = "";
        }
    } else {
        hargaGrosir.value = ""; // Kosongkan harga grosir jika Grosir tidak dipilih
        document.getElementById('errHargaGrosir').innerHTML = "";
    }

    // Validasi Jasa Kirim
    var jasaKirim = document.querySelectorAll('input[name="jasa_kirim"]:checked');
    if (jasaKirim.length < 3) {
        document.getElementById('errJasaKirim').innerHTML = "Minimal jasa kirim yang dipilih adalah 3";
        return false;
    } else {
        document.getElementById('errJasaKirim').innerHTML = "";
    }

    // Validasi Captcha
    var captcha = form['captcha'].value;
    var inputCaptcha = form['input_captcha'].value;
    if (captcha !== inputCaptcha) {
        document.getElementById('errCaptcha').innerHTML = "Captcha tidak sesuai";
        form['input_captcha'].focus();
        return false;
    } else {
        document.getElementById('errCaptcha').innerHTML = "";
    }

    return true;
}

function generateCaptcha() {
    var captcha = '';
    for (var i = 0; i < 5; i++) {
        var randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        captcha += randomChar;
    }
    document.getElementById("captcha").value = captcha;
}

function updateSubKategori() {
    var kategori = document.getElementById("kategori").value;
    var subKategori = document.getElementById("sub_kategori");

    // Kosongkan sub kategori
    subKategori.innerHTML = '<option value="">--Pilih Sub Kategori--</option>';

    var options = [];

    if (kategori === "Baju") {
        options = ["Baju Pria", "Baju Wanita", "Baju Anak"];
    } else if (kategori === "Elektronik") {
        options = ["Mesin Cuci", "Kulkas", "AC"];
    } else if (kategori === "Alat Tulis") {
        options = ["Kertas", "Map", "Pulpen"];
    }

    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.value = options[i];
        option.text = options[i];
        subKategori.appendChild(option);
    }
}

window.onload = function() {
    generateCaptcha();
    document.getElementById("kategori").addEventListener("change", updateSubKategori);
}
