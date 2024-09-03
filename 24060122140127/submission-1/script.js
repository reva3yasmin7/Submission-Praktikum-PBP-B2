document.addEventListener('DOMContentLoaded', function() {
    const kategori = document.getElementById('category');
    const subKategori = document.getElementById('subCategory');
    const hargaGrosir = document.getElementById('wholesalePrice');
    const grosirYa = document.getElementById('grosirYes');
    const grosirTidak = document.getElementById('grosirNo');
    const captchaDisplay = document.getElementById('captchaValue');
    const captchaInput = document.getElementById('captchaInput');
    const form = document.getElementById('productForm');

    const namaProdukError = document.getElementById('namaProdukError');
    const deskripsiProdukError = document.getElementById('deskripsiProdukError');
    const jasaKirimError = document.getElementById('jasaKirimError');
    const captchaError = document.getElementById('captchaError');

    const subKategoriOptions = {
        'Baju': ['Baju Pria', 'Baju Wanita', 'Baju Anak'],
        'Elektronik': ['Mesin Cuci', 'Kulkas', 'AC'],
        'Alat Tulis': ['Kertas', 'Map', 'Pulpen']
    };
    
    // Mengisi subkategori berdasarkan kategori yang dipilih
    kategori.addEventListener('change', function() {
        const selectedKategori = this.value;
        subKategori.innerHTML = '<option value="">--Pilih Sub Kategori--</option>';
        subKategori.disabled = !selectedKategori;

        if (selectedKategori && subKategoriOptions[selectedKategori]) {
            subKategoriOptions[selectedKategori].forEach(function(subKategoriValue) {
                const option = document.createElement('option');
                option.value = subKategoriValue;
                option.text = subKategoriValue;
                subKategori.appendChild(option);
            });
        }
    });

    // Menonaktifkan dan mengaktifkan input harga grosir
    function toggleHargaGrosir() {
        if (grosirYa.checked) {
            hargaGrosir.disabled = false;
            hargaGrosir.required = true;
        } else {
            hargaGrosir.disabled = true;
            hargaGrosir.required = false;
            hargaGrosir.value = '';
        }
    }

    grosirYa.addEventListener('change', toggleHargaGrosir);
    grosirTidak.addEventListener('change', toggleHargaGrosir);

    // Fungsi untuk menghasilkan kode captcha
    function generateCaptcha() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 5; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return captcha;
    }

    // Menginisialisasi captcha saat halaman dimuat
    let captchaCode = generateCaptcha();
    captchaDisplay.value = captchaCode;

    // Validasi form saat disubmit
    form.addEventListener('submit', function(event) {
        let isValid = true;

        const namaProduk = document.getElementById('productName').value.trim();
        const deskripsiProduk = document.getElementById('description').value.trim();
        const jasaKirimSelected = document.querySelectorAll('input[name="shipping"]:checked').length;
        const captchaInputValue = captchaInput.value.trim();

        // Mengosongkan pesan error
        if (namaProdukError) namaProdukError.textContent = '';
        if (deskripsiProdukError) deskripsiProdukError.textContent = '';
        if (jasaKirimError) jasaKirimError.textContent = '';
        if (captchaError) captchaError.textContent = '';

        // Validasi Nama Produk
        if (namaProduk.length < 5 || namaProduk.length > 30) {
            if (namaProdukError) namaProdukError.textContent = 'Nama Produk harus antara 5 hingga 30 karakter.';
            isValid = false;
        }

        // Validasi Deskripsi Produk
        if (deskripsiProduk.length < 5 || deskripsiProduk.length > 100) {
            if (deskripsiProdukError) deskripsiProdukError.textContent = 'Deskripsi Produk harus antara 5 hingga 100 karakter.';
            isValid = false;
        }

        // Validasi minimal 3 jasa kirim
        if (jasaKirimSelected < 3) {
            if (jasaKirimError) jasaKirimError.textContent = 'Pilih minimal 3 jasa kirim.';
            isValid = false;
        }

        // Validasi Captcha
        if (captchaInputValue !== captchaCode) {
            if (captchaError) captchaError.textContent = 'Captcha tidak sesuai.';
            isValid = false;

            // Generate captcha baru jika salah
            captchaCode = generateCaptcha();
            captchaDisplay.value = captchaCode;
            captchaInput.value = '';
        }

        // Cegah pengiriman form jika tidak valid
        if (!isValid) {
            event.preventDefault();
        }
    });

    // Reset form dan captcha saat form di-reset
    form.addEventListener('reset', function() {
        // Mengatur ulang captcha
        captchaCode = generateCaptcha();
        captchaDisplay.value = captchaCode;
        captchaInput.value = '';
        
        // Mengosongkan pesan error
        if (namaProdukError) namaProdukError.textContent = '';
        if (deskripsiProdukError) deskripsiProdukError.textContent = '';
        if (jasaKirimError) jasaKirimError.textContent = '';
        if (captchaError) captchaError.textContent = '';

        // Mengatur ulang kategori dan subkategori
        kategori.selectedIndex = 0;
        subKategori.innerHTML = '<option value="">--Pilih Sub Kategori--</option>';
        subKategori.disabled = true;

        // Mengatur ulang pilihan grosir
        grosirYa.checked = false;
        grosirTidak.checked = true;
        toggleHargaGrosir();

        // Mengatur ulang pilihan jasa kirim
        document.querySelectorAll('input[name="shipping"]').forEach(checkbox => checkbox.checked = false);
    });
});
