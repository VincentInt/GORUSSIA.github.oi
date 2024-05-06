export const dropMenuHeaderFunc = () => {
  let statusDrop = false;

  const containerDropNavElem = document.getElementById("container_drop_nav");
  const btnDropMenuElem = document.getElementById("btn_drop_menu");

  btnDropMenuElem.onclick = () => moveMenu();

  function moveMenu(status = statusDrop) {
    if (status) {
      status = false;

      document.body.style = "overflow: scroll";
      btnDropMenuElem.style = "display: block";
      containerDropNavElem.style = "transform: translateX(-100%)";

      document.removeEventListener("click", changeClick);
    } else {
      status = true;

      window.scrollTo(0, 0);

      document.body.style = "overflow: hidden";
      btnDropMenuElem.style = "display: none";
      containerDropNavElem.style = "transform: translateX(0%)";

      setTimeout(() => document.addEventListener("click", changeClick), 0);
    }
  }
  function changeClick(event) {
    let targetElem = event.target;
    if (targetElem !== containerDropNavElem) {
      while (true) {
        if (
          targetElem.className !== "header_container" &&
          targetElem.className !== "main_container"
        ) {
          if (targetElem.className === "btn_nav") {
            moveMenu(true);
            break;
          }
          if (targetElem === containerDropNavElem) break;
          targetElem = targetElem.parentElement;
        } else {
          moveMenu(true);
          break;
        }
      }
    }
  }
};
