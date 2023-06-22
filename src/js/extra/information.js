const slider = document.querySelector("#info-slider");

const sliderSection = document.querySelectorAll(".information-slider-section");


const rightMovement = () =>{
  const sliderSectionFirst = document.querySelectorAll(".information-slider-section")[0];

  slider.style.marginLeft = "-200%";
  slider.style.transition = ".5s";
  setTimeout(() =>{
    slider.style.transition = "none"

    slider.insertAdjacentElement('beforeend', sliderSectionFirst);
    slider.style.marginLeft = "-100%";
  }, 500);
}

let sliderSectionLast = sliderSection[sliderSection.length - 1];

slider.insertAdjacentElement('afterbegin', sliderSectionLast);

  
setInterval(() => rightMovement(), 3500);