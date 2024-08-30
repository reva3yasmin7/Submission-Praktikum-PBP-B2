function validateForm(){
    if (document.forms["formProduk"]["productName"].value == "") {
        alert("Harap isi nama produk.");
        document.forms["formProduk"]["productName"].focus();
        return false;
    }

    if (document.forms["formProduk"]["deskripsi"].value == ""){
        alert("Harap isi deskripsi produk.");
        document.forms["formProduk"]["deskripsi"].focus();
        return false;
    }
    
    if (document.forms["formProduk"]["kategori"].value == ""){
        alert("Harap pilih kategori produk.");
        document.forms["formProduk"]["kategori"].focus();
        return false;
    }

    if (document.forms["formProduk"]["hargasatuan"].value == ""){
        alert("Harap isi harga satuan produk.");
        document.forms["formProduk"]["hargasatuan"].focus();
        return false;
    }

    if (document.forms["formProduk"]["grosir"].value==""){
        alert("Pilih ya atau tidak.");
        document.forms["formProduk"]["grosir"].focus();
        return false;
    }

    if (document.forms["formProduk"]["grosir"].value=="ya"){
        if (document.forms["formProduk"]["hargagrosir"].value == "") {
            alert("Harap isi harga grosir produk yang anda pilih.");
            document.forms["formProduk"]["hargagrosir"].focus();
            return false;
        }
    }
    
    var jasakirim = document.forms["formProduk"]["jasakirim"];
    var checkCount = 0;
    for (var i = 0 ; i < jasakirim.length; i++){
        if (jasakirim[i].checked){
            checkCount++;
        }
    }

    if (checkCount < 3){
        alert("Pilih minimal 3 jasa pengiriman!");
        return false;
    }
    var captchaInput = document.forms["formProduk"]["captcha_input"].value;
    var captchaSoal = document.forms["formProduk"]["captcha_soal"].value;
    if (captchaInput !== captchaSoal) {
        alert("Captcha salah! Mohon tuliskan captcha yang sesuai.");
        return false;
    }
    alert("Berhasil! Terima kasih telah mengisi form produk.");
    return true;
}

function get_kategori(){
    let kategori = document.forms["formProduk"]["kategori"].value;
    if (kategori == "Baju"){
        document.getElementById("sub-kategori").innerHTML =
            '<option value="BajuPria">Baju Pria</option>' +
            '<option value="BajuWanita">Baju Wanita</option>' +
            '<option value="BajuAnak">Baju Anak</option>';
    }

    if (kategori == "Elektronik"){
        document.getElementById("sub-kategori").innerHTML =
            '<option value="MesinCuci">Mesin Cuci</option>' +
            '<option value="Kulkas">Kulkas</option>' +
            '<option value="AC">AC</option>';
    }

    if (kategori == "Alat Tulis"){
        document.getElementById("sub-kategori").innerHTML =
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
    document.forms["formProduk"]["captcha_soal"].value = code;
}
