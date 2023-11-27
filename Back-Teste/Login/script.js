function logar() {
    var username_saved = "winetech";
    var password_saved = "saoroque";

    var usuario = document.getElementById("username");
    var senha = document.getElementById("password");


    if (usuario.value == username_saved && senha.value == password_saved) {
        window.location.href = "../Dashboard/index.html"
    }
    else {
        alert(`Senha e/ou Usuário inválido!`)
    }

}


function toHome(){
    window.location.href='../Pagina-Principal/index.html';
}