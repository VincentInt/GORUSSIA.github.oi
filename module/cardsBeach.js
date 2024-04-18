const beachsBaseArray = [
  {
    img: "./img/1648743696_46-vsegda-pomnim-com-p-ozero-donuzlav-foto-48.jpg",
    beachName: "Крымский пляж",
    locate: { region: "Крымский полуостров", beachLocate: "Коса Беляус" },
  },
  {
    img: "./img/005.jpg",
    beachName: "Звездный пляж",
    locate: { region: "Краснодарский край", beachLocate: "Сочи" },
  },
  {
    img: "./img/1649362158_5-vsegda-pomnim-com-p-plyazh-levoberezhnii-foto-6.jpg",
    beachName: "Левобереж пляж",
    locate: { region: "Чувашская республика", beachLocate: "Чебоксары" },
  },
  {
    img: "./img/WhatsApp-Image-2023-05-30-at-16.47.51.jpeg",
    beachName: "Балтийский пляж",
    locate: { region: "Калининградская область", beachLocate: "Балтийск" },
  },
];
export const cardsBeach = () => {
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
