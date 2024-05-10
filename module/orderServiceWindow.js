export const orderServiceWindowFunc = () => {
  let arrayInpt = [];

  let sectionWindowOrderServiceElem = null;
  let windowOrderServiceElem = null;
  let formOrderServiceElem = null;

  const arrayBtnOrderServiceElem =
    document.getElementsByClassName("btn_order_services");

  [...arrayBtnOrderServiceElem].forEach((elem) => {
    elem.onclick = () => createWindow();
    elem.touchend = () => createWindow();
  });

  function createWindow() {
    document.body.insertAdjacentHTML(
      "beforebegin",
      `<section class="section_window_order_service">
            <div class="window_order_service">
              <h2 class="upper_text">Получить предложение</h2>
              <form class="form_order_service">
                <input class="inpt_text_order" type="tel" placeholder="Ваш номер" />
                <input class="inpt_btn_order"  type="button" value="Отправить" />
              </form>
              <p class="text_consent">
                Отправляя форму, я даю согласие на обработку моих персональных данных
                и получение рекламы. С условиями обработки персональных данных и
                получения рекламы, изложенными на сайте (Согласие на обработку
                персональных данных и получение рекламы) — ознакомлен(а) и
                согласен(на).
              </p>
            </div>
        </section>`
    );
    document.body.style = "overflow: hidden";

    sectionWindowOrderServiceElem = document.getElementsByClassName(
      "section_window_order_service"
    )[0];
    windowOrderServiceElem = document.getElementsByClassName(
      "window_order_service"
    )[0];
    formOrderServiceElem =
      document.getElementsByClassName("form_order_service")[0];

    setTimeout(() => (sectionWindowOrderServiceElem.style.opacity = "1"), 0);
    sectionWindowOrderServiceElem.addEventListener("click", changeClick);

    const btnOrder = document.getElementsByClassName("inpt_btn_order")[0];
    const inptOrder = document.getElementsByClassName("inpt_text_order")[0];

    btnOrder.onclick = () => changeForm();
    inptOrder.oninput = (event) => changeInpt(event, inptOrder);
  }
  function changeClick({ target }) {
    if (target == sectionWindowOrderServiceElem) removeWindow();
  }
  function changeInpt(event, inpt) {
    if (!isNaN(+event.data) && event.data != null) {
      if (arrayInpt.length < 11) arrayInpt.push(event.data);
    } else if (event.data == null) arrayInpt.pop();

    let valueInpt = "";
    for (const key in arrayInpt) {
      const arraySymbol = { 0: "+", 1: "-(", 4: ")-(", 6: ")-(", 8: ")-(" };
      let symbolTel = arrayInpt[key];

      if (arraySymbol[key]) symbolTel = arraySymbol[key] + arrayInpt[key];
      if (key == 10) symbolTel = arrayInpt[key] + ")";

      valueInpt += symbolTel;
    }
    inpt.value = valueInpt;
  }
  function changeForm() {
    if (arrayInpt.length === 11) {
      windowOrderServiceElem.style.opacity = "0";
      setTimeout(() => {
        windowOrderServiceElem.innerHTML = `
        <div class="container_cheack_mark">
          <img class="icon icon_cheack_mark" src="./img/icon/tick_446191.png" alt="icon_cheack_mark"/>
        </div>
        <h2 class="upper_text">Заявка отправлена</h2>`;

        windowOrderServiceElem.style.opacity = "1";
      }, 500);

      setTimeout(() => {
        sectionWindowOrderServiceElem.style.opacity = "0";
        setTimeout(() => removeWindow(), 500);
      }, 2000);
    } else {
      document.getElementsByClassName("text_error_tel")[0]?.remove();

      formOrderServiceElem.insertAdjacentHTML(
        "afterbegin",
        `<p class="text_error_tel">Неправильный формат номера</p>`
      );
    }
  }
  function removeWindow() {
    sectionWindowOrderServiceElem.style.opacity = `0`;

    setTimeout(() => {
      sectionWindowOrderServiceElem.removeEventListener("click", changeClick);
      sectionWindowOrderServiceElem.remove();

      arrayInpt = [];
      sectionWindowOrderServiceElem = null;
      windowOrderServiceElem = null;
      formOrderServiceElem = null;

      document.body.style = "overflow: scroll";
    }, 500);
  }
};
