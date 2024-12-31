import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppUtilService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Add event listener on multiple elements
   */
  addEventOnElements(elements: Element[], eventType: string, callback: (event: Event) => void): void {
    for (let i = 0; i < elements.length; i++) {
      this.renderer.listen(elements[i], eventType, callback);  // Kiểu callback đã được cập nhật
    }
  }

  /**
   * MOBILE NAVBAR TOGGLER
   */
  toggleNavbar(navbar: HTMLElement, body: HTMLElement) {
    navbar.classList.toggle("active");
    body.classList.toggle("nav-active");
  }

  /**
   * HEADER ANIMATION
   */
  handleScroll(header: HTMLElement, backTopBtn: HTMLElement) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
      } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
      }
    });
  }

  /**
   * SLIDER
   */
  handleSlider(slider: HTMLElement, sliderContainer: HTMLElement, sliderPrevBtn: HTMLElement, sliderNextBtn: HTMLElement) {
    let totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
    let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;
    let currentSlidePos = 0;

    const moveSliderItem = function () {
      const currentElement = sliderContainer.children[currentSlidePos] as HTMLElement;
      sliderContainer.style.transform = `translateX(-${currentElement.offsetLeft}px)`;
    }

    sliderNextBtn.addEventListener("click", () => {
      const slideEnd = currentSlidePos >= totalSlidableItems;
      if (slideEnd) {
        currentSlidePos = 0;
      } else {
        currentSlidePos++;
      }
      moveSliderItem();
    });

    sliderPrevBtn.addEventListener("click", () => {
      if (currentSlidePos <= 0) {
        currentSlidePos = totalSlidableItems;
      } else {
        currentSlidePos--;
      }
      moveSliderItem();
    });

    window.addEventListener("resize", () => {
      totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
      totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;
      moveSliderItem();
    });
  }
}
