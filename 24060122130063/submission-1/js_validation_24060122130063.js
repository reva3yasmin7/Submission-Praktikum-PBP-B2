//     Nama: Keisya Intan Nabila
//     NIM: 24060122130063
//     Tanggal: Selasa, 27 Agustus 2024
//     Deskripsi: Bagian validasi form

function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let captcha = '';
    for (let i = 0; i < 5; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    document.getElementById('captchaText').innerText = captcha;
}

function toggleHargaGrosir(enable) {
    document.getElementById('hargaGrosir').disabled = !enable;
}

function SubKategori() {
    const kategori = document.getElementById('kategori').value;
    const subKategori = document.getElementById('subKategori');
    subKategori.innerHTML = '<option value="">--Pilih Sub Kategori--</option>';

    const subOptions = {
        'Baju': ['Baju Pria', 'Baju Wanita', 'Baju Anak'],
        'Elektronik': ['Mesin Cuci', 'Kulkas', 'AC'],
        'Alat Tulis': ['Kertas', 'Map', 'Pulpen']
    };

    if (kategori in subOptions) {
        subOptions[kategori].forEach(function(sub) {
            const option = document.createElement('option');
            option.value = sub;
            option.text = sub;
            subKategori.add(option);
        });
    }
}

function validateForm() {
    let valid = true;
    const nama = document.getElementById('nama').value.trim();
    const deskripsi = document.getElementById('deskripsi').value.trim();
    const kategori = document.getElementById('kategori').value;
    const subKategori = document.getElementById('subKategori').value;
    const hargaSatuan = document.getElementById('hargaSatuan').value.trim();
    const grosir = document.querySelector('input[name="grosir"]:checked');
    const hargaGrosir = document.getElementById('hargaGrosir').value.trim();
    const jasaKirim = document.querySelectorAll('input[name="jasaKirim"]:checked');
    const captcha = document.getElementById('captcha').value.trim();
    const captchaText = document.getElementById('captchaText').innerText;

    // Validasi Nama Produk
    if (nama.length < 5 || nama.length > 30) {
        alert("Nama produk harus diisi dan antara 5 hingga 30 karakter.");
        valid = false;
    }

    // Validasi Deskripsi
    if (deskripsi.length < 5 || deskripsi.length > 100) {
        alert("Deskripsi harus diisi dan antara 5 hingga 100 karakter.");
        valid = false;
    }

    // Validasi Kategori
    if (!kategori) {
        alert("Kategori harus dipilih.");
        valid = false;
    }

    // Validasi Sub Kategori
    if (!subKategori) {
        alert("Sub kategori harus dipilih sesuai kategori.");
        valid = false;
    }

    // Validasi Harga Satuan
    if (isNaN(hargaSatuan) || hargaSatuan === '') {
        alert("Harga satuan harus diisi dan berupa nilai numerik.");
        valid = false;
    }

    // Validasi Harga Grosir jika Grosir Ya
    if (grosir && grosir.value === 'Ya' && (isNaN(hargaGrosir) || hargaGrosir === '')) {
        alert("Harga grosir harus diisi jika Grosir adalah Ya dan berupa nilai numerik.");
        valid = false;
    }

    // Validasi Jasa Kirim
    if (jasaKirim.length < 3) {
        alert("Minimal 3 jasa kirim yang harus dipilih.");
        valid = false;
    }

    // Validasi Captcha
    if (captcha !== captchaText) {
        alert("Captcha tidak sesuai.");
        valid = false;
    }

    if(valid){
        alert("Terima kasih sudah mengisi form ini")
    }

    return valid;
}


// Generate Captcha saat halaman di-load
window.onload = generateCaptcha;