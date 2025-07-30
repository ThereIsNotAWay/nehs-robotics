/*const header = document.querySelector("header");
const footer = document.querySelector(".footer-section");

const loadElement = (element, fileName) => {
  fetch(`/common_layout/${fileName}.html`)
    .then(res => {
      return res.text();
    })
    .then(html => {
      element.innerHTML = html;
    })
};

loadElement(header, 'header');
loadElement(footer, 'footer');
loadElement(document.querySelector(".wip"), 'wip_page');*/

let backgrounds = document.querySelectorAll(".background");

let imageIndex = 0;

function changeBackground() {

  backgrounds[imageIndex].classList.remove("showing");
  imageIndex++;

  if (imageIndex >= backgrounds.length) {
    imageIndex = 0;
  }
  backgrounds[imageIndex].classList.add("showing");

}

setInterval(changeBackground, 4000);

const menuButton = document.querySelector('.menu-button');

function showMenu() {

  const menuItems = document.querySelector('.navlinks');
  const transformHeader = document.querySelector('header');

  menuItems.classList.toggle('active');
  transformHeader.classList.toggle('active');

}


//Slide images according to button clicks.
//Adapted from: https://youtu.be/PsNaoDhzQm0?si=ctjat-7dmmrXscrA
const initSlider = () => {

  const imageList = document.querySelector(".gallery-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".gallery-wrapper .slide-button");
  const sliderScrollbar = document.querySelector(".design-gallery-container .x-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scroll-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  scrollbarThumb.addEventListener("mousedown", (e) => {
    
    const startX = e.clientX;
    const thumbPos = scrollbarThumb.offsetLeft;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPos + deltaX;
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

      const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
      const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    }

    const handleMouseUp = (e) => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

  });

  slideButtons.forEach(button => {
    button.addEventListener("click", () =>  {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  const handleSlideButtons = () => {
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
    slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
  }

  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  }

  imageList.addEventListener("scroll", () => {
    handleSlideButtons();
    updateScrollThumbPosition();
  });

}

window.addEventListener("load", initSlider);