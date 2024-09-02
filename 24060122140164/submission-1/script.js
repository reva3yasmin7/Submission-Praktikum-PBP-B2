

function validateForm() {
    const form = document.forms["form_produksi"];

    if (form["nama_produk"].value == "") {
        alert("Harap isi nama produk.");
        form["nama_produk"].focus();
        return false;
    }

    if (form["deskripsi"].value == "") {
        alert("Harap isi deskripsi produk.");
        form["deskripsi"].focus();
        return false;
    }

    if (form["pilih_kategori"].value == "") {
        alert("Harap pilih kategori produk.");
        form["pilih_kategori"].focus();
        return false;
    }

    if (form["harga_satuan"].value == "") {
        alert("Harap isi harga satuan produk.");
        form["harga_satuan"].focus();
        return false;
    }

    if (!form["grosir"].value) {
        alert("Pilih ya atau tidak.");
        return false;
    }

    if (form["grosir"].value == "ya") {
        if (form["harga_grosir"].value == "") {
            alert("Harap isi harga grosir produk.");
            form["harga_grosir"].focus();
            return false;
        }
    }
    // let jasaKirim = document.querrySelectorAll('input[name="jasa_kirim"]:checked');

    let jasaKirim = form["jasa_kirim"];
    let checkCount = 0;
    for (let i = 0; i < jasaKirim.length; i++) {
        if (jasaKirim[i].checked) {
            checkCount++;
        }
    }

    if (checkCount < 3) {
        alert("Pilih minimal 3 jasa pengiriman!");
        return false;
    }

    let captchaInput = form["captcha_input"].value;
    let captchaSoal = form["captcha"].value;
    if (captchaInput !== captchaSoal) {
        alert("Captcha salah! Mohon tuliskan captcha yang sesuai.");
        return false;
    }
    alert("Berhasil! Terima kasih telah mengisi form produk.");
    return true;

}

function handleGrosirChange() {
    const grosir_ya = doc.getElementById("grosir_ya");
    const harga_grosir = doc.getElementById("harga_grosir");

    if (grosir_ya.checked) {
        harga_grosir.required = true;
        harga_grosir.disabled = false;
    } else {
        harga_grosir.required = false;
        harga_grosir.disabled = true;
        harga_grosir.value = "";
    }
}

function get_kategori() {
    const kategori = document.forms["form_produksi"]["pilih_kategori"].value;
    let subKategori = document.getElementById("subkategori");

    if (kategori == "Baju") {
        subKategori.innerHTML =
            '<option value="BajuPria">Baju Pria</option>' +
            '<option value="BajuWanita">Baju Wanita</option>' +
            '<option value="BajuAnak">Baju Anak</option>';
    }

    if (kategori == "Elektronik") {
        subKategori.innerHTML =
            '<option value="MesinCuci">Mesin Cuci</option>' +
            '<option value="Kulkas">Kulkas</option>' +
            '<option value="AC">AC</option>';
    }

    if (kategori == "AlatTulis") {
        subKategori.innerHTML =
            '<option value="Kertas">Kertas</option>' +
            '<option value="Map">Map</option>' +
            '<option value="Pulpen">Pulpen</option>';
    }
}

function generateCaptcha(length = 5) {
    let code = '';
    for (let i = 0; i < length; i++) {
        let isUpperCase = Math.random() < 0.5;
        let charCode = isUpperCase
            ? Math.floor(Math.random() * 26) + 65
            : Math.floor(Math.random() * 26) + 97;
        code += String.fromCharCode(charCode);
    }
    document.forms["form_produksi"]["captcha_soal"].value = code;
}
