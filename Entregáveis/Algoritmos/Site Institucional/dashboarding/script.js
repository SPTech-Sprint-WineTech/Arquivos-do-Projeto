var container_menu = document.getElementsByClassName('container_menu_bar')[0];
var icone_menu = document.getElementsByClassName('ph-list')[0];

function ver_menu() {
  if (container_menu.style.display === 'flex') {
    container_menu.style.display = 'none';
    icone_menu.style.transform = 'rotate(0deg)';
  } else {
    container_menu.style.display = 'flex';
    icone_menu.style.transform = 'rotate(90deg)';
  }
}


