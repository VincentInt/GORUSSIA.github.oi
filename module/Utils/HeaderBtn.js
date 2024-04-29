export const headerBtnNav = () => {
  const locateElemArray = [
    
  ] 
  const headerBtnNavArrayElem =  document.getElementsByClassName("btn_nav")
  const allSectionArrayElem = document.getElementsByClassName("section_elem")

  function addLocaleElem() {
    [...allSectionArrayElem].forEach(elem => {
      locateElemArray.push(elem.offsetTop)
    });
  }
  function addOnclickEventElem() {
    [...headerBtnNavArrayElem].forEach((elem,index)=>{
        elem.onclick = () => moveScreen(locateElemArray[index])
    })
  }
  function moveScreen(coordY) {
    window.scrollTo(0, coordY)
  }
  addLocaleElem()
  addOnclickEventElem()
};
