var container_menu = document.getElementsByClassName("container_menu_bar")[0];
var icone_menu = document.getElementsByClassName("ph-list")[0];

function ver_menu() {
	container_menu.style.display = "flex";
}

function fechar_menu() {
	container_menu.style.display = "none";
}

function sair() {
	sessionStorage.clear();
	window.location = "../login.html";
}
