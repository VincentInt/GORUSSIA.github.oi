import beachsBaseArray from "./data/Beach.json" assert { type: "json" };

export const cardsBeachFunc = () => {
  const beachCardsElem = document.getElementById("container_beach_cards");
  beachsBaseArray.forEach((elem) => {
    beachCardsElem.insertAdjacentHTML(
      "afterbegin",
      `
    <div class="beach_card">
    <div class="container_img_beach_card">
      <img
        class="img_beach_card"
        src="${elem.img}"
        alt="img_beach"
      />
    </div>
    <div class="container_text_beach_card">
      <h2 class="upper_text text_beach">${elem.beachName}</h2>
      <div class="container_text_location">
        <h4 class="text_location">${elem.locate.region}</h4>
        <h4 class="text_location">${elem.locate.beachLocate}</h4>
      </div>
    </div>
  </div>
    `
    );
  });
};
