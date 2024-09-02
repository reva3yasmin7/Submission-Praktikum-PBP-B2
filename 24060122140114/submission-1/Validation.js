function generateCaptcha() {
    let captcha = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    document.getElementById('captchaCode').value = captcha;
}

document.addEventListener('DOMContentLoaded', function() {
    const kategori = document.getElementById('kategori');
    const subKategori = document.getElementById('subKategori');
    const resetButton = document.querySelector('button[type="reset"]'); // Definisikan resetButton

    kategori.addEventListener('change', function() {
        subKategori.innerHTML = '<option value="">--Pilih Sub Kategori--</option>';

        if (this.value === 'baju') {
            subKategori.innerHTML += '<option value="Baju Pria">Baju Pria</option>';
            subKategori.innerHTML += '<option value="Baju Wanita">Baju Wanita</option>';
            subKategori.innerHTML += '<option value="Baju Anak">Baju Anak</option>';
        } else if (this.value === 'elektronik') {
            subKategori.innerHTML += '<option value="Mesin Cuci">Mesin Cuci</option>';
            subKategori.innerHTML += '<option value="Kulkas">Kulkas</option>';
            subKategori.innerHTML += '<option value="AC">AC</option>';
        } else if (this.value === 'alatTulis') {
            subKategori.innerHTML += '<option value="Kertas">Kertas</option>';
            subKategori.innerHTML += '<option value="Map">Map</option>';
            subKategori.innerHTML += '<option value="Pulpen">Pulpen</option>';
        }
    });

    const grosirRadios = document.getElementsByName('grosir');
    grosirRadios.forEach(function(element) {
        element.addEventListener('change', function() {
            const hargaGrosir = document.getElementById('hargaGrosir');
            if (this.value.toLowerCase() === 'ya') {
                hargaGrosir.disabled = false;
                hargaGrosir.required = true;
            } else {
                hargaGrosir.disabled = true;
                hargaGrosir.required = false;
                hargaGrosir.value = '';
            }
        });
    });

    document.getElementById('productForm').addEventListener('submit', function(event) {
        const jasaKirim = document.querySelectorAll('input[name="jasaKirim"]:checked');
        if (jasaKirim.length < 3) {
            alert('Pilih minimal 3 jasa kirim.');
            event.preventDefault();
            return;
        }

        const captchaCode = document.getElementById('captchaCode').value;
        const captchaInput = document.getElementById('captchaInput').value;
        if (captchaCode !== captchaInput) {
            alert('Captcha tidak sesuai.');
            event.preventDefault();
            return;
        }
        alert('Form Berhasil disubmit!');
    });
    generateCaptcha();
    resetButton.addEventListener('click', function() {
        generateCaptcha();
    });
});
