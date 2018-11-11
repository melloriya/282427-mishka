var link = document.querySelector(".button--modal"),
    over = document.querySelector(".modal__overlay"),
    popup = document.querySelector(".modal");
link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal__open");
});
over.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal_open");
});
