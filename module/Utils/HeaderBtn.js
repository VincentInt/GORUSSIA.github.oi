export const headerBtnNav = (navElem) => {
  const locateElemArray = [];
  const containerBthElem = document.getElementsByClassName("container_bth");
  const allSectionArrayElem = document.getElementsByClassName("section_elem");

  function addLocaleElem() {
    [...allSectionArrayElem].forEach((elem) => {
      locateElemArray.push(elem);
    });
  }
  function addOnclickEventElem() {
    [...containerBthElem].forEach((elem) => {
      [...elem.children].forEach((elem, index) => {
        elem.onclick = () => moveScreen(locateElemArray[index]);
      });
    });
  }
  function moveScreen(elem) {
    window.scrollTo(0, elem.offsetTop);
  }
  addLocaleElem();
  addOnclickEventElem();
};
