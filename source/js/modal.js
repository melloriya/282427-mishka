var link = document.querySelector(".button--modal");
var popup = document.querySelector(".modal");
link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal__open");
});
