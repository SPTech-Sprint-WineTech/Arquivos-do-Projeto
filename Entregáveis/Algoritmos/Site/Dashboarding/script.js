document.addEventListener("DOMContentLoaded", function () {
  const arrowDownButton = document.getElementById("arrow-down-button");
  const infoBox = document.getElementById("info-box");

  arrowDownButton.addEventListener("click", function (e) {
    e.stopPropagation();

    if (infoBox.style.display === "block") {
      infoBox.style.display = "none";
    } else {
      infoBox.style.display = "block";
    }
  });

  document.addEventListener("click", function (e) {
    if (infoBox.style.display === "block" && e.target !== infoBox) {
      infoBox.style.display = "none";
    }
  });

  infoBox.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});
