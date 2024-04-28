export class MainSliderUtils {
  constructor(
    leftBtn,
    rightBtn,
    sectionSlider,
    cotnainerSlider,
    containerImg,
    slideName,
    baseSlides,
    renderFunc
  ) {
    this.indexSlide = 0;
    this.leftBtn = leftBtn.onclick = () => this.moveSlider(false);
    this.rightBtn = rightBtn.onclick = () => this.moveSlider(true);
    this.sectionSlider = sectionSlider;
    this.cotnainerSlider = cotnainerSlider;
    this.containerImg = containerImg;
    this.slideName = slideName;
    this.baseSlides = baseSlides;
    this.renderFunc = renderFunc;
    this.itemSlide = this.baseSlides.banner[this.indexSlide];
  }
  moveSlider(move) {
    move ? (this.indexSlide += 1) : (this.indexSlide -= 1);
    if (this.indexSlide < 0)
      this.indexSlide = this.baseSlides.banner.length - 1;
    if (this.indexSlide >= this.baseSlides.banner.length) this.indexSlide = 0;

    this.itemSlide = this.baseSlides.banner[this.indexSlide];

    this.attenuationSlide();
    setTimeout(() => this.render(), 500);
  }
  attenuationSlide() {
    this.sectionSlider.style = "transition: opacity 0.5s ease-in; opacity: 0;";

    setTimeout(() => {
      this.containerImg.innerHTML = `<img class="img_slide" src="${
        this.baseSlides.banner[this.indexSlide].img
      }" alt="slide_img" />`;
      this.slideName.innerText = `${
        this.baseSlides.banner[this.indexSlide].titleName
      }`;

      this.sectionSlider.style =
        "transition: opacity 0.5s ease-in; opacity: 100;";
    }, 500);
  }
  render() {
    this.renderFunc();
  }
}
